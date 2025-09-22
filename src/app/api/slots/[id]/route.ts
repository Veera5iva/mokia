import { connect } from "@/dbConfig/dbConfig";
import { Slot } from "@/models/Slot";
import { NextResponse } from "next/server";

connect();

// PATCH /api/slots/:id/toggle
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const slot = await Slot.findById(params.id);
  if (!slot) return NextResponse.json({ error: "Slot not found" }, { status: 404 });

  // Check if path includes 'toggle'
  const url = new URL(req.url);
  if (url.pathname.endsWith("/toggle")) {
    slot.available = !slot.available;
    await slot.save();
    return NextResponse.json(slot);
  }

  return NextResponse.json({ error: "Invalid PATCH endpoint" }, { status: 400 });
}

// DELETE /api/slots/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const deleted = await Slot.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
