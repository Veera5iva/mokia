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
  status: "pending" | "confirmed" | "scheduled" | "completed" | "cancelled";
  payment: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    amount: number; // amount in INR (or store paise)
    currency: string;
    status: "created" | "paid" | "failed";
  };
  createdAt?: Date;
}
