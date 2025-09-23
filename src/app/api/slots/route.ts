// src/app/api/slots/route.ts
import { connect } from "@/dbConfig/dbConfig";
import { Slot } from "@/models/Slot";
import { NextResponse } from "next/server";

connect();

// GET /api/slots
export async function GET() {
  // return all slots including price & priority
  const slots = await Slot.find({}).sort({ date: 1, time: 1 });
  return NextResponse.json(slots);
}

// POST /api/slots
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, time, priority = "normal", price = 0 } = body;

    if (!date || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // validate priority
    if (!["normal", "priority"].includes(priority)) {
      return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
    }

    // coerce price to number and validate
    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const newSlot = await Slot.create({
      date,
      time,
      priority,
      price: parsedPrice,
      available: true,
    });

    return NextResponse.json(newSlot);
  } catch (err) {
    console.error("POST /api/slots error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
