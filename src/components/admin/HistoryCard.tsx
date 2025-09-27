/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Booking } from "@/interfaces/interfaces"

const formatDate = (dateString: string) =>
   new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
   })

const formatINR = (n: number | string | undefined) =>
   new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
   }).format(typeof n === "string" ? Number(n || 0) : n ?? 0)

const getStatusColor = (status: string) => {
   switch (status) {
      case "confirmed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "scheduled": return "bg-purple-100 text-purple-800"
      default: return "bg-green-100 text-green-800"
   }
}

interface HistoryCardProps {
   booking: Booking
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ booking }) => {
   return (
      <Card
         className={`border-rose-200${(booking as any).slot?.priority === "priority" ? " border-purple-400" : ""
            }`}
      >
         <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
               <div className="font-semibold text-gray-900">{booking.name}</div>
               <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
               </Badge>
            </div>
            <div className="text-sm text-gray-600">{booking.email}</div>
            <div className="flex justify-between items-center">
               {booking.slot ? (
                  <div className="text-sm text-gray-600">
                     {formatDate((booking as any).slot.date)} {(booking as any).slot.time}
                  </div>
               ) : (
                  <div className="text-sm text-gray-500 italic">Slot removed</div>
               )}
               {(booking as any).slot && (
                  <div className="text-sm font-semibold text-gray-900">
                     {formatINR((booking as any).slot.price)}
                  </div>
               )}
            </div>
         </CardContent>
      </Card>
   )
}