// app/api/payments/webhook/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";

connect();

export async function POST(req: Request) {
   try {
      const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
      const rawBody = await req.text(); // raw request body
      const signature = req.headers.get("x-razorpay-signature");

      // console.log("🔔 Webhook received");
      // console.log("Raw body:", rawBody);
      // console.log("Signature header:", signature);

      // Verify webhook signature
      const expectedSignature = crypto
         .createHmac("sha256", secret)
         .update(rawBody)
         .digest("hex");

      if (signature !== expectedSignature) {
         console.error("❌ Invalid webhook signature");
         return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }

      const event = JSON.parse(rawBody);

      // console.log("📦 Event parsed:", JSON.stringify(event, null, 2));

      // Handle specific events
      if (event.event === "payment.captured") {
         const { order_id, id: payment_id } = event.payload.payment.entity;

         const booking = await Booking.findOne({ "payment.razorpay_order_id": order_id }).populate("slot");
         if (booking) {
            booking.payment.razorpay_payment_id = payment_id;
            booking.payment.status = "paid";
            booking.status = "confirmed";
            booking.slot.available = false;
            await booking.slot.save();
            await booking.save();
            // console.log(`✅ Booking ${booking._id} marked as paid via webhook`);
         }
      }

      if (event.event === "payment.failed") {
         const { order_id } = event.payload.payment.entity;
         const booking = await Booking.findOne({ "payment.razorpay_order_id": order_id }).populate("slot");
         if (booking) {
            booking.payment.status = "failed";
            booking.status = "cancelled";
            booking.slot.available = true;
            await booking.slot.save();
            await booking.save();
            // console.log(`⚠️ Booking ${booking._id} marked as failed via webhook`);
         }
      }

      return NextResponse.json({ success: true });
   } catch (err) {
      console.error("Webhook error:", err);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}
