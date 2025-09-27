/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useCallback, useMemo } from "react"
import useSWR from "swr"
import toast, { Toaster } from "react-hot-toast"
import { signOut } from "next-auth/react"
import type { TimeSlot, Booking } from "@/interfaces/interfaces"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Heart } from "lucide-react"
import Link from "next/link"
// Import the separated components
import { SlotCard } from "@/components/admin/SlotCard"
import { BookingCard } from "@/components/admin/BookingCard"
import { HistoryCard } from "@/components/admin/HistoryCard"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Memoized status utilities
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

  // Memoized filtered bookings to prevent unnecessary re-renders
  const activeBookings = useMemo(() =>
    bookings?.filter(b => b.status === "confirmed" || b.status === "pending" || b.status === "scheduled") || [],
    [bookings]
  )

  const historyBookings = useMemo(() =>
    bookings?.filter(b => b.status === "completed" || b.status === "cancelled") || [],
    [bookings]
  )

  // Slot CRUD operations
  const handleAddSlot = useCallback(async () => {
    if (!newSlot.date || !newSlot.time) return

    const payload = {
      date: newSlot.date,
      time: newSlot.time,
      priority: newSlot.priority || "normal",
      price: Number(newSlot.price || 0)
    }

    try {
      const res = await fetch("/api/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        toast.error(err.error || "Failed to add slot")
        return
      }

      await mutateSlots()
      setNewSlot({ date: "", time: "", priority: "normal", price: "" })
      setShowAddSlot(false)
      toast.success("Slot added successfully!")
    } catch (error) {
      toast.error("Failed to add slot")
    }
  }, [newSlot, mutateSlots])

  const toggleSlotAvailability = useCallback(async (id: string) => {
    try {
      await fetch(`/api/slots/${id}`, { method: "PATCH" })
      await mutateSlots()
      toast.success("Slot updated successfully!")
    } catch (error) {
      toast.error("Failed to update slot")
    }
  }, [mutateSlots])

  const handleDeleteSlot = useCallback(async (id: string) => {
    try {
      await fetch(`/api/slots/${id}`, { method: "DELETE" })
      await mutateSlots()
      toast.success("Slot deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete slot")
    }
  }, [mutateSlots])

  // Booking status update
  const handleEditBooking = useCallback((booking: Booking) => {
    setSelectedBooking(booking)
    setShowStatusDialog(true)
  }, [])

  const handleStatusSelect = useCallback((status: string) => {
    setSelectedStatus(status)
    setShowStatusDialog(false)
    setShowConfirmation(true)
  }, [])

  const confirmStatusUpdate = useCallback(async () => {
    if (!selectedBooking || !selectedStatus) return
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/bookings/${selectedBooking._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      })

      if (response.ok) {
        await mutateBookings()
        setShowConfirmation(false)
        setSelectedBooking(null)
        setSelectedStatus("")
        toast.success("Booking status updated successfully!")
      } else {
        const error = await response.json()
        toast.error(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error(error)
      toast.error("Error updating booking status")
    } finally {
      setIsUpdating(false)
    }
  }, [selectedBooking, selectedStatus, mutateBookings])

  const cancelStatusUpdate = useCallback(() => {
    setShowConfirmation(false)
    setShowStatusDialog(false)
    setSelectedBooking(null)
    setSelectedStatus("")
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut({ redirect: false })
    toast.success("Signed out successfully!")
    window.location.href = "/"
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Toaster position="top-right" reverseOrder={false} />

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
                  <Button
                    key={status.value}
                    onClick={() => handleStatusSelect(status.value)}
                    className={`w-full ${status.color} text-white font-medium py-3`}
                  >
                    {status.label}
                  </Button>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No status changes available for {selectedBooking.status} bookings.
                </div>
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
              <Button
                onClick={confirmStatusUpdate}
                disabled={isUpdating}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white"
              >
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
            <span className="text-2xl font-bold text-gray-900">Mokia</span>
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-lg md:text-xl text-gray-600">Manage your availability and client bookings</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm border border-rose-100">
              {["slots", "bookings", "history"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "ghost"}
                  className={activeTab === tab ? "bg-rose-500 text-white" : "text-gray-600"}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                >
                  {tab === "slots" ? "Time Slots" : tab === "bookings" ? "Bookings" : "History"}
                </Button>
              ))}
            </div>
          </div>

          {/* Slots Tab */}
          {activeTab === "slots" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Manage Time Slots</h2>
                <Button onClick={() => setShowAddSlot(true)} className="bg-rose-500 hover:bg-rose-600 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Add New Slot
                </Button>
              </div>

              {showAddSlot && (
                <Card className="border-rose-200">
                  <CardHeader><CardTitle>Add New Time Slot</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={newSlot.date}
                          onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={newSlot.time}
                          onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={newSlot.priority}
                          onValueChange={(value) => setNewSlot({ ...newSlot, priority: value as "normal" | "priority" })}
                        >
                          <SelectTrigger id="priority" className="h-10 px-3 text-sm">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="priority">Priority (Gold)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Price (INR)</Label>
                        <Input
                          type="number"
                          min={0}
                          step={1}
                          value={String(newSlot.price ?? "")}
                          onChange={(e) => setNewSlot({ ...newSlot, price: e.target.value })}
                          placeholder="e.g. 1500"
                        />
                      </div>
                      <div className="md:col-span-4 flex gap-2 justify-end mt-2">
                        <Button onClick={handleAddSlot} className="bg-rose-500 hover:bg-rose-600">
                          Add Slot
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddSlot(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots?.map((slot) => (
                  <SlotCard
                    key={slot._id}
                    slot={slot}
                    onToggle={toggleSlotAvailability}
                    onDelete={handleDeleteSlot}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Client Bookings</h2>
              {activeBookings.length === 0 ? (
                <p className="text-center text-gray-500 italic">No bookings available</p>
              ) : (
                activeBookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} onEdit={handleEditBooking} />
                ))
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Booking History</h2>
              {historyBookings.length === 0 ? (
                <p className="text-center text-gray-500 italic">No history available</p>
              ) : (
                historyBookings.map((booking) => (
                  <HistoryCard key={booking._id} booking={booking} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}