"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function BookingConfirmedPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const bookingId = searchParams.get("bookingId");

   // Redirect to /booking if no bookingId is present
   useEffect(() => {
      if (!bookingId) {
         router.replace("/booking");
      }
   }, [bookingId, router]);

   if (!bookingId) return null; // Do not render anything until redirect happens

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center px-4">
         <div className="max-w-md w-full text-center">
            <CheckCircle className="mx-auto h-20 w-20 text-rose-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-700 mb-6">
               Thank you for booking your session with us.
               <br />
               Your booking ID is <span className="font-medium">{bookingId}</span>.
            </p>

            {/* Email notification section */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5 md:w-[390px] mx-auto">
               <div className="flex items-center justify-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Check Your Email</h3>
               </div>
               <p className="text-blue-800 text-sm">
                  A confirmation email has been sent to your inbox.
                  <br />
                  <span className="font-medium">Don&apos;t see it? Please check your spam folder.</span>
               </p>
            </div>

            <div className="space-y-5">
               <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 w-full max-w-52 px-6 py-3 text-base font-semibold bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-md transition-all"
               >
                  <ArrowLeft className="h-5 w-5" /> Go to Home
               </Link>
               
               {/* Contact section */}
               <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm">
                     <span className="text-gray-600">Need help?</span>
                     <Link
                        href="mailto:contact.mokia@gmail.com"
                        className="inline-flex items-center gap-1 font-medium text-rose-600 hover:text-rose-700 hover:underline transition-all"
                     >
                        <MessageCircle className="h-4 w-4" />
                        Contact Us
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}