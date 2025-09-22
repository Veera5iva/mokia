/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import useSWR from "swr"
import { TimeSlot, Booking } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, Edit, Trash2, Heart, Settings, Users } from "lucide-react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function AdminPage() {
  const { data: slots, mutate: mutateSlots } = useSWR<TimeSlot[]>("/api/slots", fetcher)
  const { data: bookings, mutate: mutateBookings } = useSWR<Booking[]>("/api/bookings", fetcher)

  const [activeTab, setActiveTab] = useState<"slots" | "bookings" | "history">("slots")
  const [showAddSlot, setShowAddSlot] = useState(false)
  const [newSlot, setNewSlot] = useState({ date: "", time: "" })

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.time) return
    await fetch("/api/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSlot),
    })
    mutateSlots()
    setNewSlot({ date: "", time: "" })
    setShowAddSlot(false)
  }

  // PATCH now toggles availability
  const toggleSlotAvailability = async (id: string) => {
    await fetch(`/api/slots/${id}`, { method: "PATCH" })
    mutateSlots()
  }

  const handleDeleteSlot = async (id: string) => {
    await fetch(`/api/slots/${id}`, { method: "DELETE" })
    mutateSlots()
  }

  const updateBookingStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    mutateBookings()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-blue-100 text-blue-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold text-gray-900">HeartHeal</span>
            <Badge variant="secondary" className="ml-2">Admin</Badge>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 bg-transparent">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </Button>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600">Manage your availability and client bookings</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-rose-100">
              <Button
                variant={activeTab === "slots" ? "default" : "ghost"}
                className={activeTab === "slots" ? "bg-rose-500 text-white" : "text-gray-600"}
                onClick={() => setActiveTab("slots")}
              >
                <Calendar className="h-4 w-4 mr-2" /> Time Slots
              </Button>
              <Button
                variant={activeTab === "bookings" ? "default" : "ghost"}
                className={activeTab === "bookings" ? "bg-rose-500 text-white" : "text-gray-600"}
                onClick={() => setActiveTab("bookings")}
              >
                <Users className="h-4 w-4 mr-2" /> Bookings
              </Button>
              <Button
                variant={activeTab === "history" ? "default" : "ghost"}
                className={activeTab === "history" ? "bg-rose-500 text-white" : "text-gray-600"}
                onClick={() => setActiveTab("history")}
              >
                <Clock className="h-4 w-4 mr-2" /> History
              </Button>
            </div>
          </div>

          {/* Time Slots Tab */}
          {activeTab === "slots" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Manage Time Slots</h2>
                <Button onClick={() => setShowAddSlot(true)} className="bg-rose-500 hover:bg-rose-600 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add New Slot
                </Button>
              </div>

              {showAddSlot && (
                <Card className="border-rose-200">
                  <CardHeader>
                    <CardTitle>Add New Time Slot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Date</Label>
                        <Input type="date" value={newSlot.date} onChange={e => setNewSlot({ ...newSlot, date: e.target.value })} />
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input type="time" value={newSlot.time} onChange={e => setNewSlot({ ...newSlot, time: e.target.value })} />
                      </div>
                      <div className="flex items-end gap-2">
                        <Button onClick={handleAddSlot} className="bg-rose-500 hover:bg-rose-600">Add Slot</Button>
                        <Button variant="outline" onClick={() => setShowAddSlot(false)}>Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots?.map(slot => (
                  <Card key={slot._id} className={`${slot.booked ? "border-green-200 bg-green-50" : slot.available ? "border-rose-200" : "border-gray-200 bg-gray-50"}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{formatDate(slot.date)}</div>
                          <div className="flex items-center gap-1 text-sm text-gray-600"><Clock className="h-4 w-4" /> {slot.time}</div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => toggleSlotAvailability(slot._id)}
                            className={slot.available ? "border-red-200 text-red-600 hover:bg-red-50" : "border-green-200 text-green-600 hover:bg-green-50"}>
                            {slot.available ? "Disable" : "Enable"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteSlot(slot._id)} className="border-red-200 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            slot.booked
                              ? "default"
                              : slot.available
                                ? "available"
                                : "disabled"
                          }
                        >
                          {slot.booked ? "Booked" : slot.available ? "Available" : "Disabled"}
                        </Badge>

                        {slot.clientName && (
                          <span className="text-sm text-gray-600">Client: {slot.clientName}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Client Bookings</h2>
              {bookings?.filter(b => b.status !== "completed").map(booking => (
                <Card key={booking._id} className="border-rose-200">
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
                            </>
                          ) : (
                            <>
                              <div className="text-sm text-gray-500">Slot removed</div>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getStatusColor(booking.status)}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => updateBookingStatus(booking._id, "completed")}><Edit className="h-4 w-4" /></Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600"><strong>Problem:</strong> <p className="mt-1 text-xs">{booking.problem.substring(0, 100)}...</p></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              {bookings
                ?.filter(b => b.status === "completed")
                .map(booking => (
                  <Card key={booking._id} className="border-rose-200">
                    <CardContent className="p-4 space-y-2">
                      <div className="font-semibold text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-600">{booking.email}</div>

                      {booking.slot ? (
                        <div className="text-sm text-gray-600">
                          {formatDate((booking as any).slot.date)}{" "}
                          {(booking as any).slot.time}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          Slot removed
                        </div>
                      )}

                      <Badge className={getStatusColor("completed")}>Completed</Badge>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
