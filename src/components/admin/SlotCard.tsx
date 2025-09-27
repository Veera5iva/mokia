/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Trash2 } from "lucide-react"
import type { TimeSlot } from "@/interfaces/interfaces"

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

interface SlotCardProps {
   slot: TimeSlot
   onToggle: (id: string) => void
   onDelete: (id: string) => void
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, onToggle, onDelete }) => {
   return (
      <Card
         className={`${slot.booked
               ? "border-green-200 bg-green-50"
               : slot.available
                  ? "border-rose-200"
                  : "border-gray-200 bg-gray-50"
            }${slot.priority === "priority" ? " border-purple-400" : ""}`}
      >
         <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <div className="font-medium text-gray-900">{formatDate(slot.date)}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                     <Clock className="h-4 w-4" /> {slot.time}
                  </div>
               </div>
               <div className="flex gap-1">
                  <Button
                     size="sm"
                     variant="outline"
                     onClick={() => onToggle(slot._id)}
                     className={
                        slot.available
                           ? "border-red-200 text-red-600 hover:bg-red-50"
                           : "border-green-200 text-green-600 hover:bg-green-50"
                     }
                  >
                     {slot.available ? "Disable" : "Enable"}
                  </Button>
                  <Button
                     size="sm"
                     variant="outline"
                     onClick={() => onDelete(slot._id)}
                     className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                     <Trash2 className="h-4 w-4" />
                  </Button>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <Badge variant={slot.booked ? "default" : slot.available ? "available" : "disabled"}>
                  {slot.booked ? "Booked" : slot.available ? "Available" : "Disabled"}
               </Badge>
               <div className="text-sm font-semibold text-gray-900">
                  {formatINR((slot as any).price)}
               </div>
            </div>
            {slot.clientName && (
               <div className="mt-2 text-sm text-gray-600">Client: {slot.clientName}</div>
            )}
         </CardContent>
      </Card>
   )
}