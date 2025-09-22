"use client"
import { useRouter } from "next/navigation"
export default function Home() {
   const router = useRouter();

   return (
      <div className="min-h-screen bg-gray-50">
         <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
               <h1 className="text-2xl font-bold text-gray-800">ServeBridge</h1>
               <div>
                  <button
                     onClick={() => router.push('/login')}
                     className="mr-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                  >
                     Login
                  </button>
                  <button
                     onClick={() => router.push('/signup')}
                     className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                     Sign Up
                  </button>
               </div>
            </div>
         </header>
         <main className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-gray-900 mb-4">Connect with Local Service Providers</h2>
               <p className="text-xl text-gray-600 mb-8">Find reliable services or offer your expertise to those in need</p>
               <button
                  onClick={() => router.push('/signup')}
                  className="px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600">
                  Get Started
               </button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
               <div>
                  <div className="bg-gray-200 rounded-lg shadow-md h-[400px] w-full"></div>
               </div>
               <div className="text-black">
                  <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
                  <ul className="space-y-4">
                     <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                           1
                        </span>
                        <p>Sign up as a service provider or consumer</p>
                     </li>
                     <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                           2
                        </span>
                        <p>Providers announce services, consumers browse and request</p>
                     </li>
                     <li className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                           3
                        </span>
                        <p>Connect and get the job done</p>
                     </li>
                  </ul>
               </div>
            </div>
         </main>
      </div>

   )
}
