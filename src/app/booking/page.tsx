/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import useSWR from "swr";
import { TimeSlot } from "@/interfaces/interfaces";
import { Input, Label, Textarea, Button } from "@/components/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Heart, ArrowLeft, User, MessageSquare, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(res => res.json());

declare global {
   interface Window {
      Razorpay: any;
   }
}

// Constants moved outside component to prevent recreation
const PROBLEM_TYPES = [
   "Love Failure / Breakup",
   "Depression",
   "Anxiety",
   "Self-Esteem Issues",
   "Relationship Problems",
   "Emotional Trauma",
   "Other",
] as const;

const RAZORPAY_CONFIG = {
   timeout: 300,
   theme: { color: "#e11d48" },
   retry: { enabled: false },
} as const;

// Utility functions moved outside component
const formatDate = (dateString: string): string => {
   try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date";
      return date.toLocaleDateString("en-US", {
         weekday: "long",
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   } catch {
      return "Invalid Date";
   }
};

const loadRazorpayScript = (): Promise<boolean> => {
   return new Promise((resolve) => {
      if (window.Razorpay) {
         resolve(true);
         return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
         console.error("Failed to load Razorpay script");
         resolve(false);
      };
      document.body.appendChild(script);
   });
};

interface FormData {
   name: string;
   email: string;
   phone: string;
   problem: string;
   problemType: string;
   selectedSlot: string;
}

const INITIAL_FORM_STATE: FormData = {
   name: "",
   email: "",
   phone: "",
   problem: "",
   problemType: "",
   selectedSlot: "",
};

// Memoized slot card component
interface SlotCardProps {
   slot: TimeSlot;
   isSelected: boolean;
   isDisabled: boolean;
   onClick: () => void;
}

const SlotCard: React.FC<SlotCardProps> = ({ slot, isSelected, isDisabled, onClick }) => {
   const cardClasses = useMemo(() => {
      if (!slot.available || isDisabled) {
         return "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50";
      }
      if (isSelected) {
         return "border-rose-500 bg-rose-50 ring-2 ring-rose-200";
      }
      return "border-gray-200 hover:border-rose-300 hover:bg-rose-25 hover:shadow-sm";
   }, [slot.available, isDisabled, isSelected]);

   return (
      <div
         className={`border rounded-lg p-4 cursor-pointer transition-all ${cardClasses}`}
         onClick={slot.available && !isDisabled ? onClick : undefined}
      >
         <div className="text-sm font-medium text-gray-900">{formatDate(slot.date)}</div>
         <div className="flex items-center gap-1 mt-1">
            <Clock className="h-4 w-4 text-rose-500" />
            <span className="text-sm text-gray-600">{slot.time}</span>
         </div>
         {!slot.available && (
            <div className="text-xs text-red-500 mt-1 font-medium">Unavailable</div>
         )}
      </div>
   );
};

export default function BookingPage() {
   const { data: slots, mutate: mutateSlots, error: slotsError } = useSWR<TimeSlot[]>("/api/slots", fetcher);

   const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
   const [loadingRazorpay, setLoadingRazorpay] = useState(false);

   // Memoized form validation
   const isFormValid = useMemo(() => {
      return Boolean(
         formData.name.trim() &&
         formData.email.trim() &&
         formData.phone.trim() &&
         formData.problem.trim() &&
         formData.problemType &&
         formData.selectedSlot
      );
   }, [formData]);

   // Memoized available slots
   const availableSlots = useMemo(() => {
      return slots?.filter(slot => slot.available) || [];
   }, [slots]);

   // Load Razorpay script on mount
   useEffect(() => {
      loadRazorpayScript().then(setRazorpayLoaded);
   }, []);

   const handleInputChange = useCallback((field: keyof FormData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
   }, []);

   const handleSlotSelect = useCallback((slotId: string) => {
      handleInputChange("selectedSlot", slotId);
   }, [handleInputChange]);

   const createBooking = useCallback(async () => {
      const res = await fetch("/api/bookings", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ ...formData, slotId: formData.selectedSlot }),
      });
      if (!res.ok) throw new Error("Booking creation failed");
      return await res.json();
   }, [formData]);

   const createPaymentOrder = useCallback(async (bookingId: string) => {
      const orderRes = await fetch("/api/payments/create-order", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ bookingId }),
      });
      if (!orderRes.ok) throw new Error("Payment order creation failed");
      return await orderRes.json();
   }, []);

   const updatePaymentStatus = useCallback(async (status: string, bookingId: string, paymentData?: any) => {
      await fetch("/api/payments/update", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            status,
            bookingId,
            ...paymentData,
         }),
      });
   }, []);

   const handlePaymentSuccess = useCallback(async (response: any, bookingId: string) => {
      try {
         setLoadingRazorpay(true);
         setIsSubmitting(true);

         await updatePaymentStatus("paid", bookingId, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
         });

         window.location.href = `/booking/confirmed?bookingId=${bookingId}`;
      } catch (err: any) {
         window.location.href = `/booking/failed?bookingId=${bookingId}&error=${encodeURIComponent(err.message || "Payment update failed")}`;
      }
   }, [updatePaymentStatus]);

   const handlePaymentFailure = useCallback(async (bookingId: string, error: string) => {
      setIsSubmitting(true);
      setLoadingRazorpay(true);

      await updatePaymentStatus("failed", bookingId);
      window.location.href = `/booking/failed?bookingId=${bookingId}&error=${encodeURIComponent(error)}`;
   }, [updatePaymentStatus]);

   const initializeRazorpay = useCallback(async (orderData: any, bookingId: string) => {
      const options = {
         key: orderData.key,
         amount: orderData.amount,
         currency: orderData.currency || "INR",
         name: "Mokia",
         description: "Healing Session Payment",
         order_id: orderData.orderId,
         prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone
         },
         handler: (response: any) => handlePaymentSuccess(response, bookingId),
         modal: {
            ondismiss: () => handlePaymentFailure(bookingId, "Payment cancelled by user"),
         },
         ...RAZORPAY_CONFIG,
      };

      if (!window.Razorpay) throw new Error("Payment gateway failed to load.");

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: any) => {
         handlePaymentFailure(bookingId, response.error.description || "Payment failed");
      });

      rzp.open();
   }, [formData.name, formData.email, formData.phone, handlePaymentSuccess, handlePaymentFailure]);

   const handleSubmit = useCallback(async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting || !isFormValid) return;

      setIsSubmitting(true);
      setLoadingRazorpay(true);

      try {
         if (!razorpayLoaded) {
            const loaded = await loadRazorpayScript();
            if (!loaded) throw new Error("Failed to load payment gateway. Please try again.");
            setRazorpayLoaded(true);
         }

         const booking = await createBooking();
         const orderData = await createPaymentOrder(booking._id);
         await initializeRazorpay(orderData, booking._id);

      } catch (err: any) {
         console.error("Booking error:", err);
         window.location.href = `/booking/failed?error=${encodeURIComponent(err.message || "Something went wrong")}`;
      }
   }, [isSubmitting, isFormValid, razorpayLoaded, createBooking, createPaymentOrder, initializeRazorpay]);

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
         <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
               <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
                  <ArrowLeft className="h-5 w-5 text-rose-500" />
                  <Heart className="h-8 w-8 text-rose-500" />
                  <span className="text-2xl font-bold text-gray-900">Mokia</span>
               </Link>
            </nav>
         </header>

         <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Healing Session</h1>
                  <p className="text-lg md:text-xl text-gray-600">Take the first step towards emotional freedom</p>
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
                                 onChange={(e) => handleInputChange("name", e.target.value)}
                                 placeholder="Enter your full name"
                                 required
                                 disabled={isSubmitting}
                              />
                           </div>
                           <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                 id="email"
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => handleInputChange("email", e.target.value)}
                                 placeholder="Enter your email"
                                 required
                                 disabled={isSubmitting}
                              />
                           </div>
                        </div>
                        <div>
                           <Label htmlFor="phone">Phone *</Label>
                           <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
                              required
                              disabled={isSubmitting}
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
                           <Select
                              onValueChange={(v) => handleInputChange("problemType", v)}
                              disabled={isSubmitting}
                              value={formData.problemType}
                           >
                              <SelectTrigger>
                                 <SelectValue placeholder="Select issue type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {PROBLEM_TYPES.map((pt) => (
                                    <SelectItem key={pt} value={pt}>
                                       {pt}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                        <div>
                           <Label htmlFor="problem">Describe Your Situation *</Label>
                           <Textarea
                              id="problem"
                              value={formData.problem}
                              onChange={(e) => handleInputChange("problem", e.target.value)}
                              placeholder="Please describe your situation in detail..."
                              required
                              className="mt-1 min-h-[120px]"
                              disabled={isSubmitting}
                           />
                        </div>
                     </CardContent>
                  </Card>

                  {/* Time Slots */}
                  <Card>
                     <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Calendar className="h-5 w-5 text-rose-500" /> Choose Time Slot *
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        {!slots && !slotsError ? (
                           <div className="text-center py-12">
                              <Loader2 className="h-8 w-8 animate-spin text-rose-500 mx-auto mb-4" />
                              <p className="text-gray-600">Loading available slots...</p>
                           </div>
                        ) : slotsError ? (
                           <div className="text-center py-12">
                              <p className="text-red-600 mb-4">Failed to load booking slots</p>
                              <Button onClick={() => mutateSlots()} variant="outline" size="sm">
                                 Retry
                              </Button>
                           </div>
                        ) : !availableSlots.length ? (
                           <p className="text-center text-gray-500 py-12">No available slots at the moment</p>
                        ) : (
                           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {availableSlots.map((slot: TimeSlot) => (
                                 <SlotCard
                                    key={slot._id}
                                    slot={slot}
                                    isSelected={formData.selectedSlot === slot._id}
                                    isDisabled={isSubmitting}
                                    onClick={() => handleSlotSelect(slot._id)}
                                 />
                              ))}
                           </div>
                        )}
                     </CardContent>
                  </Card>

                  {/* Submit */}
                  <div className="text-center">
                     <Button
                        type="submit"
                        size="lg"
                        className={`px-12 py-4 text-lg font-semibold transition-colors duration-200 ${isFormValid && !isSubmitting
                              ? "bg-rose-500 hover:bg-rose-600 text-white"
                              : "bg-gray-300 text-gray-600 cursor-not-allowed"
                           }`}
                        disabled={!isFormValid || isSubmitting}
                     >
                        {isSubmitting ? (
                           <>
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              {loadingRazorpay ? "Processing Payment..." : "Processing..."}
                           </>
                        ) : (
                           "Proceed to Payment"
                        )}
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}