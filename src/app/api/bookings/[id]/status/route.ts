import { connect } from "@/dbConfig/dbConfig";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";

connect();

// PATCH /api/bookings/[id]/status - update booking status
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { status } = await req.json();

    // Validate status
    const allowedStatuses = ["confirmed", "scheduled", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Allowed values: " + allowedStatuses.join(", ") },
        { status: 400 }
      );
    }

    // Find and update the booking
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('slot');

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // TODO: Add email notification logic here
    // You can add email sending logic based on the status
    // For example:
    // if (status === 'scheduled') {
    //   await sendScheduledEmail(booking.email, booking.name, booking.slot);
    // } else if (status === 'completed') {
    //   await sendCompletedEmail(booking.email, booking.name);
    // }

    return NextResponse.json({
      success: true,
      booking,
      message: `Booking status updated to ${status}`
    });

  } catch (error) {
    console.error("Error updating booking status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET /api/bookings/[id]/status - get specific booking
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    const booking = await Booking.findById(id).populate('slot');
    
    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}