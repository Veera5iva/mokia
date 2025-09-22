import { connect } from "@/dbConfig/dbConfig";
import { Slot } from "@/models/Slot";
import { NextResponse } from "next/server";

connect();

// GET /api/slots
export async function GET() {
  const slots = await Slot.find({});
  return NextResponse.json(slots);
}

// POST /api/slots
export async function POST(req: Request) {
  const { date, time } = await req.json();
  if (!date || !time) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const newSlot = await Slot.create({ date, time });
  return NextResponse.json(newSlot);
}
