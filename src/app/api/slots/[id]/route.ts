import { connect } from "@/dbConfig/dbConfig";
import { Slot } from "@/models/Slot";
import { NextResponse } from "next/server";

connect();

// PATCH /api/slots/:id - toggle availability
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ Await params before accessing properties
  const { id } = await context.params;

  // Find the slot
  const slot = await Slot.findById(id);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });

  // Toggle availability
  slot.available = !slot.available;
  await slot.save();

  return NextResponse.json(slot);
}

// DELETE /api/slots/:id - delete a slot
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // ✅ Await params before accessing properties
  const { id } = await context.params;

  const slot = await Slot.findByIdAndDelete(id);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}