// app/api/payments/verify/route.ts
import crypto from "crypto";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";

connect();

export async function POST(req: Request) {
   try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } =
         await req.json();

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
         .update(body.toString())
         .digest("hex");

      if (expectedSignature !== razorpay_signature) {
         return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }

      // Update booking as paid
      const booking = await Booking.findById(bookingId).populate("slot");
      if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

      booking.payment = {
         razorpay_order_id,
         razorpay_payment_id,
         razorpay_signature,
         amount: booking.slot.price,
         currency: "INR",
         status: "paid",
      };
      booking.status = "confirmed";

      // Make slot unavailable now
      booking.slot.available = false;
      await booking.slot.save();
      await booking.save();

      return NextResponse.json({ success: true, bookingId: booking._id });
   } catch (error) {
      console.error("Error verifying Razorpay payment:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
   }
}
