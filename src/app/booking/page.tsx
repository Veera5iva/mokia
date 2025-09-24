/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function BookingPage() {
   const router = useRouter();
   const { data: slots, mutate: mutateSlots, error: slotsError } = useSWR<TimeSlot[]>("/api/slots", fetcher);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      problem: "",
      problemType: "",
      selectedSlot: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
   const [loadingRazorpay, setLoadingRazorpay] = useState(false);

   // Load Razorpay script
   const loadRazorpayScript = (): Promise<boolean> => {
      return new Promise((resolve) => {
         if (window.Razorpay) {
            setRazorpayLoaded(true);
            resolve(true);
            return;
         }

         const script = document.createElement("script");
         script.src = "https://checkout.razorpay.com/v1/checkout.js";
         script.async = true;
         script.onload = () => {
            setRazorpayLoaded(true);
            resolve(true);
         };
         script.onerror = () => {
            console.error("Failed to load Razorpay script");
            resolve(false);
         };
         document.body.appendChild(script);
      });
   };

   // Load Razorpay on component mount
   useEffect(() => {
      loadRazorpayScript();
   }, []);

   const problemTypes = [
      "Love Failure / Breakup",
      "Depression",
      "Anxiety",
      "Self-Esteem Issues",
      "Relationship Problems",
      "Emotional Trauma",
      "Other",
   ];

   const handleInputChange = (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isSubmitting) return;

      if (!isFormValid) return;

      setIsSubmitting(true);
      setLoadingRazorpay(true);

      try {
         // Ensure Razorpay is loaded
         if (!razorpayLoaded) {
            const loaded = await loadRazorpayScript();
            if (!loaded) {
               throw new Error("Failed to load payment gateway. Please try again.");
            }
         }

         // Step 1: Create booking
         const res = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
               ...formData,
               slotId: formData.selectedSlot,
            }),
         });

         if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
         }

         const booking = await res.json();

         // Step 2: Create Razorpay order
         const orderRes = await fetch("/api/payments/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookingId: booking._id }),
         });

         if (!orderRes.ok) {
            const errorData = await orderRes.json();
            throw new Error(errorData.error || `Payment order creation failed! status: ${orderRes.status}`);
         }

         const orderData = await orderRes.json();
         setLoadingRazorpay(false);

         // Step 3: Open Razorpay popup
         const options = {
            key: orderData.key,
            amount: orderData.amount,
            currency: orderData.currency || "INR",
            name: "HeartHeal",
            description: "Healing Session Payment",
            order_id: orderData.orderId,
            prefill: {
               name: formData.name,
               email: formData.email,
               contact: formData.phone,
            },
            handler: async function (response: any) {
               try {
                  setIsSubmitting(true);

                  // Call update API on success
                  const updateRes = await fetch("/api/payments/update", {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                        status: "paid",
                        bookingId: booking._id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                     }),
                  });

                  if (!updateRes.ok) {
                     throw new Error("Payment update request failed");
                  }

                  const updateData = await updateRes.json();
                  if (updateData.success) {
                     // Redirect to success page
                     const paymentDetails = {
                        amount: orderData.amount / 100,
                        date: new Date().toLocaleString(),
                        reference: response.razorpay_payment_id,
                        bookingId: booking._id,
                     };

                     const queryString = new URLSearchParams({
                        amount: paymentDetails.amount.toString(),
                        date: paymentDetails.date,
                        reference: paymentDetails.reference,
                        bookingId: paymentDetails.bookingId,
                     }).toString();

                     router.push(`/booking/success?${queryString}`);
                  } else {
                     throw new Error(updateData.error || "Payment update failed");
                  }
               } catch (err: any) {
                  console.error("Payment update error:", err);
                  const queryString = new URLSearchParams({
                     error: err.message || "Payment update failed",
                     orderId: orderData.orderId,
                  }).toString();
                  router.push(`/booking/failure?${queryString}`);
               }
            },
            modal: {
               ondismiss: async function () {
                  setIsSubmitting(false);
                  await fetch("/api/payments/update", {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                        status: "failed",
                        bookingId: booking._id,
                     }),
                  });
                  router.push("/booking/failure?error=Payment cancelled by user");
               },
            },
            theme: {
               color: "#e11d48",
            },
            timeout: 300,
            retry: {
               enabled: false,
            },
         };

         if (!window.Razorpay) {
            throw new Error("Payment gateway failed to load. Please refresh the page and try again.");
         }

         const rzp = new window.Razorpay(options);

         rzp.on("payment.failed", async function (response: any) {
            // console.error("Payment failed:", response.error);

            await fetch("/api/payments/update", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({
                  status: "failed",
                  bookingId: booking._id,
               }),
            });

            const queryString = new URLSearchParams({
               error: response.error.description || "Payment failed",
               code: response.error.code || "",
               orderId: orderData.orderId,
            }).toString();

            router.push(`/booking/failure?${queryString}`);
         });

         rzp.open();
      } catch (err: any) {
         console.error("Booking error:", err);
         const queryString = new URLSearchParams({
            error: err.message || "Something went wrong. Please try again.",
         }).toString();
         router.push(`/booking/failure?${queryString}`);
      } finally {
         if (!loadingRazorpay) {
            setIsSubmitting(false);
         }
      }
   };

   const formatDate = (dateString: string) => {
      try {
         const date = new Date(dateString);
         if (isNaN(date.getTime())) {
            return "Invalid Date";
         }
         return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
         });
      } catch (error) {
         console.error("Date formatting error:", error);
         return "Invalid Date";
      }
   };

   const isFormValid = Boolean(
      formData.name.trim() &&
      formData.email.trim() &&
      formData.problem.trim() &&
      formData.problemType &&
      formData.selectedSlot
   );

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
         <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
               <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="Enter your phone number"
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
                                 {problemTypes.map((pt) => (
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
                        ) : !slots || slots.length === 0 ? (
                           <p className="text-center text-gray-500 py-12">No available slots at the moment</p>
                        ) : (
                           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {slots.map((slot: TimeSlot) => (
                                 <div
                                    key={slot._id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${!slot.available || isSubmitting
                                          ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
                                          : formData.selectedSlot === slot._id
                                             ? "border-rose-500 bg-rose-50 ring-2 ring-rose-200"
                                             : "border-gray-200 hover:border-rose-300 hover:bg-rose-25 hover:shadow-sm"
                                       }`}
                                    onClick={() =>
                                       slot.available &&
                                       !isSubmitting &&
                                       handleInputChange("selectedSlot", slot._id)
                                    }
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
                        className={`px-12 py-4 text-lg font-semibold ${isFormValid && !isSubmitting
                              ? "bg-rose-500 hover:bg-rose-600 text-white"
                              : "bg-gray-300 text-gray-600 cursor-not-allowed"
                           }`}
                        disabled={!isFormValid || isSubmitting}
                     >
                        {isSubmitting ? (
                           <>
                              <Loader2 className="h-5 w-5 animate-spin mr-2" />
                              {loadingRazorpay ? "Preparing Payment..." : "Processing..."}
                           </>
                        ) : (
                           "Proceed to Payment"
                        )}
                     </Button>
                     {!razorpayLoaded && <p className="text-sm text-gray-500 mt-2">Loading payment gateway...</p>}
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
