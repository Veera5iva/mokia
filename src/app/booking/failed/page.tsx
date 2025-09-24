"use client";

import { useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookingFailedPage() {
   const searchParams = useSearchParams();
   const bookingId = searchParams.get("bookingId");

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex flex-col items-center justify-center px-4">
         <div className="max-w-lg w-full text-center">
            <XCircle className="mx-auto h-20 w-20 text-red-500 mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Failed</h1>
            <p className="text-lg text-gray-700 mb-6">
               Oops, your payment could not be processed.
               {bookingId && <> <br />Your booking ID is <span className="font-medium">{bookingId}</span>.</>}
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
