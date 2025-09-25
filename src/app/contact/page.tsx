"use client";

import { Mail } from "lucide-react";
import { SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";

export default function ContactPage() {
   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4">
         <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 border border-rose-100">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
               Contact Us
            </h1>
            <p className="text-center text-gray-600 mb-8">
               Have questions or need help? Reach out to us anytime.
            </p>

            {/* Email */}
            <div className="flex items-center justify-center mb-8">
               <Link
                  href="mailto:admin@mokia.com"
                  className="flex items-center gap-3 text-rose-600 hover:text-rose-700 text-lg font-medium"
               >
                  <Mail className="h-6 w-6" />
                  admin@mokia.com
               </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 text-gray-600">
               <Link
                  href="https://instagram.com/"
                  target="_blank"
                  className="hover:text-rose-500 transition-colors"
               >
                  <SiInstagram className="h-6 w-6" />
               </Link>
               <Link
                  href="https://linkedin.com/"
                  target="_blank"
                  className="hover:text-rose-500 transition-colors"
               >
                  <SiLinkedin className="h-6 w-6" />
               </Link>
               <Link
                  href="https://twitter.com/"
                  target="_blank"
                  className="hover:text-rose-500 transition-colors"
               >
                  <SiX className="h-6 w-6" />
               </Link>
            </div>
         </div>
      </div>
   );
}
