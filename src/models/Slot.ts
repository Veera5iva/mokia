// src/models/Slot.ts
import { Schema, model, models } from "mongoose";

const slotSchema = new Schema({
  date: { type: String, required: true },  // format YYYY-MM-DD
  time: { type: String, required: true },  // format HH:MM AM/PM
  available: { type: Boolean, default: true },
  // new fields:
  priority: {
    type: String,
    enum: ["normal", "priority"],
    default: "normal",
  },
  price: { type: Number, default: 0 }, // stored in INR (integer or float)
});

export const Slot = models.Slot || model("Slot", slotSchema);
