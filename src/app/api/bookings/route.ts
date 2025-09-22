import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";
import { Slot } from "@/models/Slot";
import { NextResponse } from "next/server";

connect();

// GET /api/bookings - all bookings
export async function GET() {
  const bookings = await Booking.find({}).populate("slot");
  return NextResponse.json(bookings);
}

// POST /api/bookings - create a booking
export async function POST(req: Request) {
  try {
    const { name, email, phone, problemType, problem, slotId } = await req.json();

    if (!name || !email || !problemType || !problem || !slotId)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const slot = await Slot.findById(slotId);
    if (!slot || !slot.available)
      return NextResponse.json({ error: "Slot not available" }, { status: 400 });

    // Mark slot unavailable
    slot.available = false;
    await slot.save();

    const booking = await Booking.create({
      name,
      email,
      phone,
      problemType,
      problem,
      slot: slot._id,
      status: "confirmed",
    });

    // populate the slot before returning
    await booking.populate("slot");

    return NextResponse.json(booking);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
