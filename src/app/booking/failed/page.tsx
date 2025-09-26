"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingFailedPage() {
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
         <div className="max-w-lg w-full text-center">
            <XCircle className="mx-auto h-20 w-20 text-red-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Failed</h1>
            <p className="text-lg text-gray-700 mb-6">
               Oops, your payment could not be processed.
               <br />
               Your booking ID is <span className="font-medium">{bookingId}</span>.
            </p>

            <div className="space-y-4">
               <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 max-w-md px-6 py-3 text-base font-semibold bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-md transition-all"
               >
                  <ArrowLeft className="h-5 w-5" /> Go to Home
               </Link>
            </div>
         </div>
      </div>
   );
}
