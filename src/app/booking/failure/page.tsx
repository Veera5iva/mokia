"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart, XCircle, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PaymentFailure() {
   const searchParams = useSearchParams();
   const error = searchParams.get('error') || 'Payment failed';
   const code = searchParams.get('code') || '';
   const orderId = searchParams.get('orderId') || '';

   const getErrorMessage = () => {
      if (error.includes('cancelled')) {
         return 'Payment was cancelled. You can try booking again whenever you\'re ready.';
      }
      return error || 'Something went wrong with your payment. Please try again.';
   };

   return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
         <header className="flex items-center justify-between px-4 py-6 border-b border-red-100">
            <Link href="/" className="flex items-center gap-2">
               <Heart className="h-8 w-8 text-rose-500" />
               <span className="text-2xl font-bold text-gray-900">HeartHeal</span>
            </Link>
         </header>

         <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
            <div className="bg-red-100 rounded-full p-4 mb-6">
               <XCircle className="h-16 w-16 text-red-600" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
               Payment Failed
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-md">
               {getErrorMessage()}
            </p>

            {(code || orderId) && (
               <Card className="w-full max-w-md mb-8 border-red-200">
                  <CardContent className="p-6">
                     <h3 className="font-semibold text-gray-900 mb-4 text-left">Error Details</h3>

                     <div className="space-y-3 text-sm">
                        {code && (
                           <div className="flex justify-between items-center">
                              <span className="text-gray-600">Error Code:</span>
                              <span className="font-medium text-gray-900">{code}</span>
                           </div>
                        )}

                        {orderId && (
                           <div className="flex justify-between items-center">
                              <span className="text-gray-600">Order ID:</span>
                              <span className="font-medium text-gray-900 text-xs">{orderId}</span>
                           </div>
                        )}

                        <div className="flex justify-between items-center">
                           <span className="text-gray-600">Time:</span>
                           <span className="font-medium text-gray-900">{new Date().toLocaleString()}</span>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            )}

            <div className="space-y-4">
               <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/booking" prefetch={false}>
                     <Button size="lg" className="bg-rose-500 hover:bg-rose-600 text-white px-8">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Try Again
                     </Button>
                  </Link>

                  <Link href="/" prefetch={false}>
                     <Button variant="outline" size="lg" className="px-8">
                        Return Home
                     </Button>
                  </Link>
               </div>

               <p className="text-sm text-gray-500">
                  Need help? <Link href="/contact" className="text-rose-500 hover:text-rose-600 underline">Contact us</Link>
               </p>
            </div>
         </main>

         <footer className="flex items-center justify-center h-14 border-t border-red-100 bg-white/50">
            <p className="text-sm text-gray-500">
               &copy; 2024 HeartHeal. All rights reserved.
            </p>
         </footer>
      </div>
   );
}