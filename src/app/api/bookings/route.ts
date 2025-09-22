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
    status: "pending",
  });

  return NextResponse.json(booking);
}

// PATCH /api/bookings/:id - update booking status
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  const booking = await Booking.findById(params.id).populate("slot");
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  booking.status = status;
  await booking.save();

  return NextResponse.json(booking);
}

// DELETE /api/bookings/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const booking = await Booking.findById(params.id);
  if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  // Make slot available again
  const slot = await Slot.findById(booking.slot);
  if (slot) slot.available = true;
  await slot?.save();

  await Booking.findByIdAndDelete(params.id);

  return NextResponse.json({ success: true });
}
