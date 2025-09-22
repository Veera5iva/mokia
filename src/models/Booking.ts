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
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Booking = models.Booking || model("Booking", bookingSchema);
