import { Bell, Link, User } from "lucide-react";

interface DashboardHeaderProps {
   role: "provider" | "consumer"
   notifications?: number
 }

export default function ConsumerDashboard({ role, notifications = 0 }: DashboardHeaderProps) {
   return (
      <div>
         <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {role === "provider" ? "Service Provider Dashboard" : "Consumer Dashboard"}
        </h1>
        <div className="flex items-center space-x-4">
          <button className="relative rounded-full p-2 hover:bg-gray-100 focus:outline-none">
            <Bell className="h-6 w-6 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {notifications}
              </span>
            )}
          </button>
          <Link href="/profile" className="rounded-full hover:bg-gray-100">
            <button className="p-2 focus:outline-none">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </Link>
        </div>
      </div>
    </header>
         <div className="min-h-screen bg-gray-50 text-black">

            <main className="container mx-auto p-4">
               <div className="grid gap-6 md:grid-cols-2">
                  <div className="border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Available Services</h2>
                     </div>
                     <div className="p-4">
                        <div className="space-y-4">
                           <div className="rounded-lg border p-4">
                              <h3 className="font-semibold">Service Type</h3>
                              <p className="text-sm text-gray-500">Service Description</p>
                              <div className="mt-2 flex items-center justify-between">
                                 <span className="text-sm">10:00 AM - 12:00 PM</span>
                                 <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Request Service</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">My Requests</h2>
                     </div>
                     <div className="p-4">
                        <div className="space-y-4">
                           <div className="rounded-lg border p-4">
                              <h3 className="font-semibold">Service Type</h3>
                              <p className="text-sm text-gray-500">Service Description</p>
                              <div className="mt-2 flex items-center justify-between">
                                 <span className="text-sm">Status: Pending</span>
                                 <button className="border px-3 py-1 rounded text-sm">Cancel Request</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="md:col-span-2 border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Services Near Me</h2>
                     </div>
                     <div className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                           <p className="text-gray-500">Map View</p>
                        </div>
                     </div>
                  </div>
               </div>
            </main>
         </div>
      </div>
      
   )
}