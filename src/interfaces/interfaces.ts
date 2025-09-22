export interface TimeSlot {
  _id: string
  date: string
  time: string
  available: boolean
  booked?: boolean
  clientName?: string
}

export interface Booking {
  _id: string
  clientName: string
  email: string
  phone: string
  problemType: string
  problem: string
  slotId: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}