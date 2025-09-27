/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit } from "lucide-react"
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

interface BookingCardProps {
   booking: Booking
   onEdit: (booking: Booking) => void
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, onEdit }) => {
   const handleProblemClick = useCallback(() => {
      const newWindow = window.open("", "_blank")
      if (newWindow) {
         const doc = newWindow.document
         doc.open()
         doc.write(`
        <html>
          <head>
            <title>Problem Details</title>
            <style>
              body {
                font-family: sans-serif;
                line-height: 1.6;
                padding: 20px;
                max-width: 700px;
                margin: auto;
                background: #f9fafb;
                color: #111827;
              }
            </style>
          </head>
          <body>
            <h2>Problem Details</h2>
            <p>${booking.problem.replace(/\n/g, "<br/>")}</p>
          </body>
        </html>
      `)
         doc.close()
      }
   }, [booking.problem])

   return (
      <Card
         className={`border-rose-200${(booking as any).slot?.priority === "priority" ? " border-purple-400" : ""
            }`}
      >
         <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
               <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{booking.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                     <div>Email: {booking.email}</div>
                     <div>Phone: {booking.phone}</div>
                     <div>Issue: {booking.problemType}</div>
                  </div>
               </div>
               <div>
                  <h4 className="font-medium text-gray-900 mb-2">Session Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                     {booking.slot ? (
                        <>
                           <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate((booking as any).slot.date)}
                           </div>
                           <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {(booking as any).slot.time}
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-gray-500">Price:</span>
                              <span className="font-semibold text-gray-900">
                                 {formatINR((booking as any).slot.price)}
                              </span>
                           </div>
                        </>
                     ) : (
                        <div className="text-sm text-gray-500">Slot removed</div>
                     )}
                  </div>
               </div>
               <div>
                  <div className="flex items-center justify-between mb-2">
                     <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                     </Badge>
                     <div className="flex gap-2">
                        <Button
                           size="sm"
                           variant="outline"
                           onClick={() => onEdit(booking)}
                           className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                           <Edit className="h-4 w-4" />
                        </Button>
                     </div>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 mt-3">
                     <strong>Problem:</strong>
                     <span
                        className="text-sm text-blue-600 underline cursor-pointer"
                        onClick={handleProblemClick}
                     >
                        Click Here
                     </span>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}