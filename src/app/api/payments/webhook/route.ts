// app/api/payments/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";
import { sendAdminBookingEmail } from "@/lib/mailer"; // <-- import

connect();

export async function POST(req: Request) {
   try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
      const rawBody = await req.text();
      const signature = req.headers.get("x-razorpay-signature");

      const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
      if (signature !== expectedSignature) {
         console.error("❌ Invalid webhook signature");
         return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }

      const event = JSON.parse(rawBody);

      if (event.event === "payment.captured") {
         const { order_id, id: payment_id } = event.payload.payment.entity;

         const booking = await Booking.findOne({ "payment.razorpay_order_id": order_id }).populate("slot");
         if (booking) {
            booking.payment.razorpay_payment_id = payment_id;
            booking.payment.status = "paid";
            booking.status = "confirmed";

            if (booking.slot) {
               booking.slot.available = false;
               await booking.slot.save();
            }

            await booking.save();
            console.log(`✅ Booking ${booking._id} marked as paid via webhook`);

            // Fire-and-forget email (do not block the webhook response)
            sendAdminBookingEmail(booking)
               .then(() => console.log("Admin email queued/sent"))
               .catch((err) => console.error("Error sending admin email:", err));
         } else {
            console.warn("Booking not found for order:", order_id);
         }
      }

      if (event.event === "payment.failed") {
         const { order_id } = event.payload.payment.entity;
         const booking = await Booking.findOne({ "payment.razorpay_order_id": order_id }).populate("slot");
         if (booking) {
            booking.payment.status = "failed";
            booking.status = "cancelled";
            if (booking.slot) {
               booking.slot.available = true;
               await booking.slot.save();
            }
            await booking.save();
            // Optionally notify admin about failed payments
            sendAdminBookingEmail({
               ...booking.toObject(),
               // override body for failed payment, or create a separate function sendAdminFailureEmail
            }).catch((err) => console.error("Failed send admin email for failed payment", err));
         }
      }

      return NextResponse.json({ success: true });
   } catch (err) {
      console.error("Webhook error:", err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}
