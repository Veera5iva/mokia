"use client"

import { useState } from "react"
import useSWR from "swr"
import { TimeSlot } from "@/interfaces/interfaces"
import { Input, Label, Textarea, Button } from "@/components/ui"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Heart, ArrowLeft, User, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function BookingPage() {
   const { data: slots } = useSWR<TimeSlot[]>("/api/slots", fetcher)
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      problem: "",
      problemType: "",
      selectedSlot: "",
   })

   const problemTypes = [
      "Love Failure / Breakup",
      "Depression",
      "Anxiety",
      "Self-Esteem Issues",
      "Relationship Problems",
      "Emotional Trauma",
      "Other",
   ]

   const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const res = await fetch("/api/bookings", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ ...formData, slotId: formData.selectedSlot }),
      })
      const data = await res.json()
      console.log("Booking saved:", data)
      window.location.href = "/payment" // or show confirmation page
   }

   const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
      })
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
         <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
               <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5 text-rose-500" />
                  <Heart className="h-8 w-8 text-rose-500" />
                  <span className="text-2xl font-bold text-gray-900">HeartHeal</span>
               </Link>
            </nav>
         </header>

         <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Healing Session</h1>
                  <p className="text-xl text-gray-600">Take the first step towards emotional freedom</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <User className="h-5 w-5 text-rose-500" /> Personal Information
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                           <div>
                              <Label htmlFor="name">Full Name *</Label>
                              <Input
                                 id="name"
                                 type="text"
                                 value={formData.name}
                                 onChange={e => handleInputChange("name", e.target.value)}
                                 required
                              />
                           </div>
                           <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                 id="email"
                                 type="email"
                                 value={formData.email}
                                 onChange={e => handleInputChange("email", e.target.value)}
                                 required
                              />
                           </div>
                        </div>
                        <div>
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={e => handleInputChange("phone", e.target.value)}
                           />
                        </div>
                     </CardContent>
                  </Card>

                  {/* Problem */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <MessageSquare className="h-5 w-5 text-rose-500" /> Your Situation
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div>
                           <Label htmlFor="problemType">Issue Type *</Label>
                           <Select onValueChange={v => handleInputChange("problemType", v)}>
                              <SelectTrigger>
                                 <SelectValue placeholder="Select issue type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {problemTypes.map(pt => (
                                    <SelectItem key={pt} value={pt}>
                                       {pt}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                        <div>
                           <Label htmlFor="problem">Describe *</Label>
                           <Textarea
                              value={formData.problem}
                              onChange={e => handleInputChange("problem", e.target.value)}
                              required
                              className="mt-1 min-h-[120px]"
                           />
                        </div>
                     </CardContent>
                  </Card>

                  {/* Time Slots */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Calendar className="h-5 w-5 text-rose-500" /> Choose Slot
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {slots?.map((slot: TimeSlot) => (
                           <div
                              key={slot._id}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${!slot.available
                                    ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                                    : formData.selectedSlot === slot._id
                                       ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200"
                                       : "border-gray-200 hover:border-rose-300 hover:bg-rose-25"
                                 }`}
                              onClick={() => slot.available && handleInputChange("selectedSlot", slot._id)}
                           >
                              <div className="text-sm font-medium text-gray-900">{formatDate(slot.date)}</div>
                              <div className="flex items-center gap-1 mt-1">
                                 <Clock className="h-4 w-4 text-rose-500" />
                                 <span className="text-sm text-gray-600">{slot.time}</span>
                              </div>
                              {!slot.available && <div className="text-xs text-gray-500 mt-1">Unavailable</div>}
                           </div>
                        ))}
                     </CardContent>
                  </Card>

                  {/* Submit */}
                  <div className="text-center">
                     <Button
                        type="submit"
                        size="lg"
                        className="bg-rose-500 hover:bg-rose-600 text-white px-12 py-4 text-lg"
                        disabled={
                           !formData.name ||
                           !formData.email ||
                           !formData.problem ||
                           !formData.problemType ||
                           !formData.selectedSlot
                        }
                     >
                        Proceed to Payment
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}
