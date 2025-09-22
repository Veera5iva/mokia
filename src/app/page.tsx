"use client"

import { useState, useEffect } from "react"
import { Heart, Users, Clock, Shield, Star, ArrowRight } from "lucide-react"

export default function HomePage() {
   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
      setIsVisible(true)
   }, [])

   return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
         {/* Header */}
         <header className="container mx-auto px-4 py-6">
            <nav className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Heart className="h-8 w-8 text-rose-500" />
                  <span className="text-2xl font-bold text-gray-900">HeartHeal</span>
               </div>
               <button className="px-4 py-2 border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 bg-transparent">
                  Contact Us
               </button>
            </nav>
         </header>

         {/* Hero Section */}
         <section className="container mx-auto px-4 py-20 relative">
            <div className="text-center max-w-4xl mx-auto">
               <div
                  className={`transition-all duration-1000 ${
                     isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
               >
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance">
                     Heal Your Heart,{" "}
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">
                        Rebuild Your Life
                     </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
                     Professional 1:1 counseling sessions to help you overcome love failure, depression, and build a
                     stronger, more confident version of yourself.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <button
                        className="flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg rounded-lg"
                        onClick={() =>
                           document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
                        }
                     >
                        Book Your Session
                        <ArrowRight className="ml-2 h-5 w-5" />
                     </button>
                     <button className="px-8 py-4 text-lg border border-rose-200 text-rose-600 rounded-lg hover:bg-rose-50 bg-transparent">
                        Learn More
                     </button>
                  </div>
               </div>
            </div>

            {/* Floating Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               {[...Array(6)].map((_, i) => (
                  <Heart
                     key={i}
                     className={`absolute text-rose-200 opacity-20 animate-float-${(i % 3) + 1}`}
                     style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 20}%`,
                        fontSize: `${20 + i * 5}px`,
                        animationDelay: `${i * 0.5}s`,
                     }}
                  />
               ))}
            </div>
         </section>

         {/* Features */}
         <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose HeartHeal?</h2>
               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Professional support tailored to your unique journey of healing and growth
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  {
                     icon: Users,
                     title: "1:1 Personal Sessions",
                     description: "Individual attention focused entirely on your specific needs and challenges",
                  },
                  {
                     icon: Shield,
                     title: "Safe & Confidential",
                     description: "A judgment-free space where you can share openly and heal at your own pace",
                  },
                  {
                     icon: Clock,
                     title: "Flexible Scheduling",
                     description: "Book sessions that fit your schedule with easy online appointment management",
                  },
                  {
                     icon: Heart,
                     title: "Proven Methods",
                     description: "Evidence-based techniques to help you overcome heartbreak and build resilience",
                  },
               ].map((feature, index) => (
                  <div
                     key={index}
                     className="p-6 text-center border border-rose-100 rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                     <feature.icon className="h-12 w-12 text-rose-500 mx-auto mb-4" />
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                     <p className="text-gray-600">{feature.description}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* Testimonials */}
         <section className="bg-rose-50 py-20">
            <div className="container mx-auto px-4">
               <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
                  <p className="text-xl text-gray-600">Real people, real transformations</p>
               </div>

               <div className="grid md:grid-cols-3 gap-8">
                  {[
                     {
                        name: "Sarah M.",
                        text: "After my breakup, I felt lost and hopeless. The sessions helped me rediscover my worth and build a better relationship with myself.",
                        rating: 5,
                     },
                     {
                        name: "Michael R.",
                        text: "Professional, compassionate, and effective. I learned coping strategies that I still use today. Highly recommended!",
                        rating: 5,
                     },
                     {
                        name: "Emma L.",
                        text: "The support I received was exactly what I needed during my darkest time. I'm now stronger and more confident than ever.",
                        rating: 5,
                     },
                  ].map((testimonial, index) => (
                     <div key={index} className="p-6 bg-white border border-rose-100 rounded-xl">
                        <div className="flex mb-4">
                           {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                           ))}
                        </div>
                        <p className="text-gray-600 mb-4 italic">`{testimonial.text}`</p>
                        <p className="font-semibold text-gray-900">- {testimonial.name}</p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* Process */}
         <section className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
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
                  <div key={index} className="text-center">
                     <div className="w-16 h-16 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.step}
                     </div>
                     <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                     <p className="text-gray-600">{step.description}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* CTA */}
         <section id="booking" className="bg-gradient-to-r from-rose-500 to-pink-600 py-20">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Healing Journey?</h2>
               <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
                  Take the first step towards emotional freedom and personal growth. Book your session today.
               </p>
               <button
                  className="flex items-center justify-center bg-white text-rose-600 hover:bg-rose-50 px-8 py-4 text-lg font-semibold rounded-lg mx-auto"
                  onClick={() => (window.location.href = "/booking")}
               >
                  Book Your Session Now
                  <ArrowRight className="ml-2 h-5 w-5" />
               </button>
            </div>
         </section>

         {/* Footer */}
         <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
               <div className="grid md:grid-cols-4 gap-8">
                  <div>
                     <div className="flex items-center gap-2 mb-4">
                        <Heart className="h-6 w-6 text-rose-500" />
                        <span className="text-xl font-bold">HeartHeal</span>
                     </div>
                     <p className="text-gray-400">
                        Professional counseling for love failure, depression, and personal growth.
                     </p>
                  </div>
                  <div>
                     <h4 className="font-semibold mb-4">Services</h4>
                     <ul className="space-y-2 text-gray-400">
                        <li>1:1 Counseling</li>
                        <li>Depression Support</li>
                        <li>Relationship Guidance</li>
                        <li>Self-Improvement</li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-semibold mb-4">Support</h4>
                     <ul className="space-y-2 text-gray-400">
                        <li>FAQ</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                     </ul>
                  </div>
                  <div>
                     <h4 className="font-semibold mb-4">Contact</h4>
                     <ul className="space-y-2 text-gray-400">
                        <li>support@heartheal.com</li>
                        <li>+1 (555) 123-4567</li>
                        <li>Available 24/7</li>
                     </ul>
                  </div>
               </div>
               <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 HeartHeal. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </div>
   )
}
