import { Schema, model, models } from "mongoose";

const slotSchema = new Schema({
  date: { type: String, required: true },  // format YYYY-MM-DD
  time: { type: String, required: true },  // format HH:MM AM/PM
  available: { type: Boolean, default: true },
});

export const Slot = models.Slot || model("Slot", slotSchema);
