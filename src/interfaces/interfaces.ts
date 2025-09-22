// src/interfaces/interfaces.ts
export interface TimeSlot {
  _id: string;
  date: string; // or Date (ISO string is fine)
  time: string;
  available: boolean;
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt?: string;
}
