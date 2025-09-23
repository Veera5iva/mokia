"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
   const searchParams = useSearchParams();
   const amount = searchParams.get('amount') || '0';
   const date = searchParams.get('date') || new Date().toLocaleString();
   const reference = searchParams.get('reference') || 'N/A';
   const bookingId = searchParams.get('bookingId') || 'N/A';

   return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
         <header className="flex items-center justify-between px-4 py-6 border-b border-rose-100">
            <Link href="/" className="flex items-center gap-2">
               <Heart className="h-8 w-8 text-rose-500" />
               <span className="text-2xl font-bold text-gray-900">HeartHeal</span>
            </Link>
         </header>

         <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
            <div className="bg-green-100 rounded-full p-4 mb-6">
               <CheckCircle className="h-16 w-16 text-green-600" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Payment Successful!
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-md">
               Thank you for booking your healing session. You will receive a confirmation email shortly.
            </p>

            <Card className="w-full max-w-md mb-8 border-green-200">
               <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-left">Payment Details</h3>

                  <div className="space-y-3 text-sm">
                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount Paid:</span>
                        <span className="font-medium text-gray-900">₹{amount}</span>
                     </div>

                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Date & Time:</span>
                        <span className="font-medium text-gray-900">{date}</span>
                     </div>

                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Payment ID:</span>
                        <span className="font-medium text-gray-900 text-xs">{reference}</span>
                     </div>

                     <div className="flex justify-between items-center">
                        <span className="text-gray-600">Booking ID:</span>
                        <span className="font-medium text-gray-900 text-xs">{bookingId}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <div className="space-y-4">
               <Link href="/" prefetch={false}>
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
                     Return to Homepage
                  </Button>
               </Link>

               <p className="text-sm text-gray-500">
                  Need help? <Link href="/contact" className="text-rose-500 hover:text-rose-600 underline">Contact us</Link>
               </p>
            </div>
         </main>

         <footer className="flex items-center justify-center h-14 border-t border-rose-100 bg-white/50">
            <p className="text-sm text-gray-500">
               &copy; 2024 HeartHeal. All rights reserved.
            </p>
         </footer>
      </div>
   );
}