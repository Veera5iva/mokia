/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import useSWR from "swr"
import { signOut } from "next-auth/react"
import type { TimeSlot, Booking } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus, Edit, Trash2, Heart } from "lucide-react"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const formatINR = (n: number | string | undefined) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    typeof n === "string" ? Number(n || 0) : n ?? 0,
  )

export default function AdminPage() {
  const { data: slots, mutate: mutateSlots } = useSWR<TimeSlot[]>("/api/slots", fetcher)
  const { data: bookings, mutate: mutateBookings } = useSWR<Booking[]>("/api/bookings", fetcher)

  const [activeTab, setActiveTab] = useState<"slots" | "bookings" | "history">("slots")
  const [showAddSlot, setShowAddSlot] = useState(false)
  const [newSlot, setNewSlot] = useState({ date: "", time: "", priority: "normal", price: "" })
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })

  // Slot CRUD
  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.time) return

    const payload = { date: newSlot.date, time: newSlot.time, priority: newSlot.priority || "normal", price: Number(newSlot.price || 0) }

    const res = await fetch("/api/slots", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      alert(err.error || "Failed to add slot")
      return
    }
    mutateSlots()
    setNewSlot({ date: "", time: "", priority: "normal", price: "" })
    setShowAddSlot(false)
  }

  const toggleSlotAvailability = async (id: string) => {
    await fetch(`/api/slots/${id}`, { method: "PATCH" })
    mutateSlots()
  }

  const handleDeleteSlot = async (id: string) => {
    await fetch(`/api/slots/${id}`, { method: "DELETE" })
    mutateSlots()
  }

  // Booking status update
  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowStatusDialog(true)
  }

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status)
    setShowStatusDialog(false)
    setShowConfirmation(true)
  }

  const confirmStatusUpdate = async () => {
    if (!selectedBooking || !selectedStatus) return
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/bookings/${selectedBooking._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      })
      if (response.ok) {
        mutateBookings()
        setShowConfirmation(false)
        setSelectedBooking(null)
        setSelectedStatus("")
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error(error)
      alert("Error updating booking status")
    } finally {
      setIsUpdating(false)
    }
  }

  const cancelStatusUpdate = () => {
    setShowConfirmation(false)
    setShowStatusDialog(false)
    setSelectedBooking(null)
    setSelectedStatus("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  const getAvailableStatuses = (currentStatus: string) => {
    if (currentStatus === "confirmed") {
      return [
        { value: "scheduled", label: "Mark as Scheduled", color: "bg-purple-500 hover:bg-purple-600" },
        { value: "completed", label: "Mark as Completed", color: "bg-blue-500 hover:bg-blue-600" },
        { value: "cancelled", label: "Mark as Cancelled", color: "bg-red-500 hover:bg-red-600" },
      ]
    }
    if (currentStatus === "scheduled") {
      return [
        { value: "completed", label: "Mark as Completed", color: "bg-blue-500 hover:bg-blue-600" },
        { value: "cancelled", label: "Mark as Cancelled", color: "bg-red-500 hover:bg-red-600" },
      ]
    }
    return []
  }

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Status Dialog */}
      {showStatusDialog && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Update Booking Status</h3>
            <div className="text-gray-600 mb-4">
              Change status for <strong>{selectedBooking.name}</strong>
            </div>
            <div className="text-sm text-gray-500 mb-6">
              Current status: <Badge className={getStatusColor(selectedBooking.status)}>{selectedBooking.status.toUpperCase()}</Badge>
            </div>
            <div className="space-y-3">
              {getAvailableStatuses(selectedBooking.status).length > 0 ? (
                getAvailableStatuses(selectedBooking.status).map((status) => (
                  <Button key={status.value} onClick={() => handleStatusSelect(status.value)} className={`w-full ${status.color} text-white font-medium py-3`}>
                    {status.label}
                  </Button>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">No status changes available for {selectedBooking.status} bookings.</div>
              )}
            </div>
            <Button onClick={() => setShowStatusDialog(false)} variant="outline" className="w-full mt-4">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmation && selectedBooking && selectedStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Status Update</h3>
            <div className="text-gray-600 mb-4">
              Are you sure you want to change <strong>{selectedBooking.name}</strong>&apos;s status to:
            </div>
            <div className="text-center mb-6">
              <Badge className={getStatusColor(selectedStatus)} style={{ fontSize: "14px", padding: "6px 12px" }}>
                {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
              </Badge>
            </div>
            <div className="flex gap-3">
              <Button onClick={confirmStatusUpdate} disabled={isUpdating} className="flex-1 bg-rose-500 hover:bg-rose-600 text-white">
                {isUpdating ? "Updating..." : "Confirm"}
              </Button>
              <Button onClick={cancelStatusUpdate} variant="outline" className="flex-1" disabled={isUpdating}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-rose-500" />
            <span className="text-2xl font-bold text-gray-900">HeartHeal</span>
            <Badge variant="secondary" className="ml-2">Admin</Badge>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </nav>
      </header>

      {/* Tabs and content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-600">Manage your availability and client bookings</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-rose-100">
              <Button variant={activeTab === "slots" ? "default" : "ghost"} className={activeTab === "slots" ? "bg-rose-500 text-white" : "text-gray-600"} onClick={() => setActiveTab("slots")}>
                <Calendar className="h-4 w-4 mr-2" /> Time Slots
              </Button>
              <Button variant={activeTab === "bookings" ? "default" : "ghost"} className={activeTab === "bookings" ? "bg-rose-500 text-white" : "text-gray-600"} onClick={() => setActiveTab("bookings")}>
                Bookings
              </Button>
              <Button variant={activeTab === "history" ? "default" : "ghost"} className={activeTab === "history" ? "bg-rose-500 text-white" : "text-gray-600"} onClick={() => setActiveTab("history")}>
                History
              </Button>
            </div>
          </div>

          {/* Slots Tab */}
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
                  <CardHeader><CardTitle>Add New Time Slot</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div><Label>Date</Label><Input type="date" value={newSlot.date} onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })} /></div>
                      <div><Label>Time</Label><Input type="time" value={newSlot.time} onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })} /></div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={newSlot.priority} onValueChange={(value) => setNewSlot({ ...newSlot, priority: value as "normal" | "priority" })}>
                          <SelectTrigger id="priority" className="h-10 px-3 text-sm"><SelectValue placeholder="Select priority" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="priority">Priority (Gold)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div><Label>Price (INR)</Label><Input type="number" min={0} step={1} value={String(newSlot.price ?? "")} onChange={(e) => setNewSlot({ ...newSlot, price: e.target.value })} placeholder="e.g. 1500" /></div>
                      <div className="md:col-span-4 flex gap-2 justify-end mt-2">
                        <Button onClick={handleAddSlot} className="bg-rose-500 hover:bg-rose-600">Add Slot</Button>
                        <Button variant="outline" onClick={() => setShowAddSlot(false)}>Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots?.map((slot) => (
                  <Card key={slot._id} className={`${slot.booked ? "border-green-200 bg-green-50" : slot.available ? "border-rose-200" : "border-gray-200 bg-gray-50"}${slot.priority === "priority" ? " border-purple-400" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium text-gray-900">{formatDate(slot.date)}</div>
                          <div className="flex items-center gap-1 text-sm text-gray-600"><Clock className="h-4 w-4" /> {slot.time}</div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => toggleSlotAvailability(slot._id)} className={slot.available ? "border-red-200 text-red-600 hover:bg-red-50" : "border-green-200 text-green-600 hover:bg-green-50"}>
                            {slot.available ? "Disable" : "Enable"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteSlot(slot._id)} className="border-red-200 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant={slot.booked ? "default" : slot.available ? "available" : "disabled"}>{slot.booked ? "Booked" : slot.available ? "Available" : "Disabled"}</Badge>
                        <div className="text-sm font-semibold text-gray-900">{formatINR((slot as any).price)}</div>
                      </div>
                      {slot.clientName && <div className="mt-2 text-sm text-gray-600">Client: {slot.clientName}</div>}
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
              {bookings
                ?.filter((b) => b.status !== "completed")
                .map((booking) => (
                  <Card
                    key={booking._id}
                    className={`border-rose-200${(booking as any).slot?.priority === "priority" ? " border-purple-400" : ""}`}
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
                              <>
                                <div className="text-sm text-gray-500">Slot removed</div>
                              </>
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
                                onClick={() => handleEditBooking(booking)}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Problem:</strong>
                            <div className="mt-1 text-xs">{booking.problem.substring(0, 100)}...</div>
                          </div>
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
                ?.filter((b) => b.status === "completed")
                .map((booking) => (
                  <Card
                    key={booking._id}
                    className={`border-rose-200${(booking as any).slot?.priority === "priority" ? " border-purple-400" : ""}`}
                  >
                    <CardContent className="p-4 space-y-2">
                      {/* Client name with status badge */}
                      <div className="flex justify-between items-center">
                        <div className="font-semibold text-gray-900">{booking.name}</div>
                        <Badge className={getStatusColor("completed")}>Completed</Badge>
                      </div>

                      <div className="text-sm text-gray-600">{booking.email}</div>

                      {/* Date/time with price */}
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
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
