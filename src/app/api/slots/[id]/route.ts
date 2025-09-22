import { connect } from "@/dbConfig/dbConfig";
import { Slot } from "@/models/Slot";
import { NextResponse } from "next/server";

connect();

// PATCH /api/slots/:id - toggle availability
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const slot = await Slot.findById(params.id);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });

  // Toggle availability
  slot.available = !slot.available;

  await slot.save();
  return NextResponse.json(slot);
}

// DELETE /api/slots/:id - delete a slot
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const slot = await Slot.findByIdAndDelete(params.id);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
