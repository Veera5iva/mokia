import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";

connect();

const razorpay = new Razorpay({
   key_id: process.env.RAZORPAY_KEY_ID,
   key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: Request) {
   try {
      const { bookingId } = await req.json();
      if (!bookingId) return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });

      const booking = await Booking.findById(bookingId).populate("slot");
      if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

      const slot = booking.slot;
      if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });
      
      // if (!slot.available) return NextResponse.json({ error: "Slot not available" }, { status: 400 });


      const order = await razorpay.orders.create({
         amount: Math.round(slot.price * 100), // amount in paise
         currency: "INR",
         receipt: `booking_${booking._id}`,

      });
      if (!order) return NextResponse.json({ error: "Razorpay order creation failed" }, { status: 500 });

      // persist order id and amount to booking
      booking.payment = {
         ...booking.payment,
         razorpay_order_id: order.id,
         amount: slot.price,
         currency: "INR",
         status: "created",
      };
      // Mark slot temporarily unavailable (reserved) to avoid double booking while payment completes
      slot.available = false;
      await slot.save();
      await booking.save();

      // return order details to client
      return NextResponse.json({
         orderId: order.id,
         bookingId: booking._id,
         amount: order.amount,
         currency: order.currency
      });



   } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}