"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ArrowRight, Mail, Phone } from "lucide-react"
import { InfiniteMovingMarquee } from "@/components/ui/infinite-moving-cards"
import { TimelineDemo } from "@/components/timelineDemo"
import Link from "next/link"
import testimonials from "@/data/testimonials"
import { SiInstagram, SiYoutube } from "react-icons/si"

export default function HomePage() {
   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
      setIsVisible(true)
   }, [])

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
         {/* Header */}
         <header className="container max-w-7xl mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Heart className="h-8 w-8 text-rose-500" />
                  <Link href="/" className="text-2xl font-bold text-neutral-800 cursor-pointer hover:text-yellow-600 transition">
                     Mokia
                  </Link>
               </div>
               <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.mokia@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <Button
                     variant="outline"
                     className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 bg-transparent"
                  >
                     Contact Us
                  </Button>
               </a>
            </nav>
         </header>

         {/* Hero Section */}
         <section className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
               <div
                  className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
               >
                  <h1 className="text-5xl md:text-7xl font-bold text-neutral-700 mb-6 text-balance">
                     Heal Your Heart,{" "}
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                        Rebuild Your Life
                     </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
                     Professional 1:1 counseling sessions to help you overcome love failure, depression, and build a stronger,
                     more confident version of yourself.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button
                        size="lg"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg w-[260px] self-center md:w-auto"
                        onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                     >
                        Book Your Session
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </Button>
                     <Button
                        size="lg"
                        variant="outline"
                        className="border-yellow-200 text-yellow-600 hover:bg-yellow-50 px-8 py-6 text-lg bg-transparent w-[260px] self-center md:w-auto"
                        onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                     >
                        Learn More
                     </Button>
                  </div>
               </div>
            </div>
         </section>


         {/* Features Section */}
         <div id="features" className="relative w-full overflow-clip">
            <TimelineDemo />
         </div>


         {/* Testimonials */}
         <section>
            <div className="container mx-auto px-4">
               <div className="h-[35rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                  <div className="text-center mb-16">
                     <h2 className="text-4xl font-bold text-neutral-600 mb-4">Success Stories</h2>
                     <p className="text-xl text-gray-600">Real people, real transformations</p>
                  </div>
                  <InfiniteMovingMarquee items={testimonials} direction="right" speed="slow" />
               </div>
            </div>
         </section>

         {/* Process Section */}
         <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-neutral-600 mb-4">How It Works</h2>
               <p className="text-xl text-gray-600">Simple steps to start your healing journey</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {[
                  {
                     step: "1",
                     title: "Book Your Session",
                     description: "Choose a convenient time slot and tell us about your situation",
                  },
                  {
                     step: "2",
                     title: "Secure Payment",
                     description: "Complete your booking with our secure payment system",
                  },
                  {
                     step: "3",
                     title: "Start Healing",
                     description: "Join your personalized 1:1 session and begin your transformation",
                  },
               ].map((step, index) => (
                  <div
                     key={index}
                     className="text-center p-4 md:p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-auto 
                 max-w-xs mx-auto md:max-w-full md:mx-0"
                  >
                     <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-3 md:mb-4 shadow-lg">
                        {step.step}
                     </div>
                     <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                     <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
               ))}
            </div>

         </section>

         {/* CTA Section */}
         <section id="booking" className="bg-gradient-to-r from-yellow-500 to-orange-600 py-20">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Next Chapter?</h2>
               <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
                  Take the first step towards emotional freedom and personal growth. Book your session today.
               </p>
               <Button
                  size="lg"
                  className="bg-white text-yellow-600 hover:bg-yellow-50 hover:text-bla px-8 py-6 text-lg font-semibold"
                  onClick={() => (window.location.href = "/booking")}
               >
                  Book Your Session Now
                  <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
               {/* Responsive Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-20">
                  {/* Brand */}
                  <div>
                     <div className="flex items-center gap-2 mb-4">
                        <Heart className="h-6 w-6 text-rose-500" />
                        <span className="text-xl font-bold">Mokia</span>
                     </div>
                     <p className="text-gray-400">Professional counseling for love failure, depression, and personal growth.</p>
                  </div>

                  {/* Services */}
                  <div>
                     <h4 className="font-semibold mb-4">Services</h4>
                     <ul className="space-y-2 text-gray-400">
                        <li>1:1 Counseling</li>
                        <li>Depression Support</li>
                        <li>Relationship Guidance</li>
                        <li>Self-Improvement</li>
                     </ul>
                  </div>

                  {/* Social */}
                  <div>
                     <h4 className="font-semibold mb-4">Social</h4>
                     <div className="flex flex-col space-y-3 text-gray-400">
                        <a href="#"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="Instagram"
                           className="flex items-center gap-2 hover:text-yellow-500 transition">
                           <SiInstagram className="h-5 w-5" />
                           Instagram
                        </a>
                        <a href="#"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="Instagram"
                           className="flex items-center gap-2 hover:text-yellow-500 transition">
                           <SiYoutube className="h-5 w-5" />
                           YouTube
                        </a>
                     </div>
                  </div>


                  {/* Contact */}
                  <div>
                     <h4 className="font-semibold mb-4">Contact</h4>
                     <ul className="space-y-2 text-gray-400">
                        {/* Gmail Compose */}
                        <li>
                           <a
                              href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.mokia@gmail.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-yellow-500 transition"
                           >
                              <Mail className="h-5 w-5" />
                              contact.mokia@gmail.com
                           </a>
                        </li>

                        {/* Phone Number */}
                        <li>
                           <a
                              href="tel:+918778904546"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-yellow-500 transition"
                           >
                              <Phone className="h-5 w-5" />
                              +91 87789 04546
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>

               {/* Bottom Bar */}
               <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-md">
                  <p>&copy; 2025 Mokia. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </div>
   )
}
