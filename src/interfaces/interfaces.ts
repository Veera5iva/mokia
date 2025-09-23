// src/interfaces/interfaces.ts
export interface TimeSlot {
  _id: string;
  date: string; // "YYYY-MM-DD" or ISO
  time: string; // "10:00 AM" etc
  available: boolean;
  priority?: "normal" | "priority";
  price?: number; // INR
  booked?: boolean;
  clientName?: string;
}

export interface Booking {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  problemType: string;
  problem: string;
  slot: TimeSlot | string; // either populated or ObjectId
  status: "confirmed" | "scheduled" | "completed" | "cancelled";
  createdAt?: string;
}
