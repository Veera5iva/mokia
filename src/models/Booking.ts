// src/models/Booking.ts
import mongoose, { Schema, model, models } from "mongoose";

const bookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  problemType: { type: String, required: true },
  problem: { type: String, required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "scheduled", "completed", "cancelled"],
    default: "pending", // pending before payment
  },
  payment: {
    // payment metadata
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    razorpay_signature: { type: String },
    amount: { type: Number }, // amount in INR (or store paise)
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
  },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = models.Booking || model("Booking", bookingSchema);
