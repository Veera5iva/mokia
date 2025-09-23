// app/api/payments/update/route.ts
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";

connect();

export async function POST(req: Request) {
   try {
      const { status, bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
         await req.json();

      if (!bookingId || !status) {
         return NextResponse.json({ error: "Missing bookingId or status" }, { status: 400 });
      }

      const booking = await Booking.findById(bookingId).populate("slot");
      if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

      if (status === "paid") {
         // Verify signature
         const body = razorpay_order_id + "|" + razorpay_payment_id;
         const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

         if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
         }

         // Optimistically mark paid
         booking.payment = {
            ...booking.payment,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            status: "paid",
         };

         booking.status = "confirmed"; // temporarily
         booking.slot.available = false;
         await booking.slot.save();
      } else if (status === "failed") {
         booking.payment = {
            ...booking.payment,
            status: "failed",
         };

         booking.status = "cancelled";
         if (booking.slot) {
            booking.slot.available = true;
            await booking.slot.save();
         }
      }

      await booking.save();
      return NextResponse.json({ success: true, bookingId: booking._id });
   } catch (error) {
      console.error("Error updating payment:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}
