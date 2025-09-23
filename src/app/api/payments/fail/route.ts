// app/api/payments/fail/route.ts
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";

connect();

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    const booking = await Booking.findById(bookingId).populate("slot");
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    booking.payment = {
      ...booking.payment,
      status: "failed",
    };
    booking.status = "cancelled";

    // free the slot back for booking
    if (booking.slot) {
      booking.slot.available = true;
      await booking.slot.save();
    }

    await booking.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Payment fail route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
