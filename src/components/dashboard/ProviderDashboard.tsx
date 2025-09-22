export default function ProviderDashboard() {
   return (
      <div className="min-h-screen bg-gray-50 text-black">
         
         <main className="container mx-auto p-4">
            <div className="grid gap-6 md:grid-cols-2">
               <div className="border rounded-lg">
                  <div className="p-4 border-b">
                     <h2 className="text-lg font-semibold">Announce Service</h2>
                  </div>
                  <div className="p-4">
                     <form className="space-y-4">
                        <div className="space-y-2">
                           <label className="block text-sm font-medium">Service Type</label>
                           <input 
                              className="w-full p-2 border rounded" 
                              placeholder="e.g. Plumbing, Food Delivery" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="block text-sm font-medium">Description</label>
                           <textarea 
                              className="w-full p-2 border rounded" 
                              placeholder="Describe your service..." 
                           />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                           <div className="space-y-2">
                              <label className="block text-sm font-medium">Start Time</label>
                              <input 
                                 type="datetime-local" 
                                 className="w-full p-2 border rounded" 
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="block text-sm font-medium">End Time</label>
                              <input 
                                 type="datetime-local" 
                                 className="w-full p-2 border rounded" 
                              />
                           </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white p-2 rounded">
                           Announce Service
                        </button>
                     </form>
                  </div>
               </div>

               <div className="border rounded-lg">
                  <div className="p-4 border-b">
                     <h2 className="text-lg font-semibold">Active Requests</h2>
                  </div>
                  <div className="p-4">
                     <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                           <h3 className="font-semibold">Service Type</h3>
                           <p className="text-sm text-gray-500 mb-2">Service Description</p>
                           <div className="space-y-2 text-sm">
                              <p className="flex items-center">👤 Consumer Name</p>
                              <p className="flex items-center">📱 Contact Number</p>
                              <p className="flex items-center">📍 Location</p>
                           </div>
                           <div className="mt-4 flex justify-between">
                              <button className="border px-3 py-1 rounded text-sm">
                                 Get Directions
                              </button>
                              <div>
                                 <button className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm mr-2">
                                    Reject
                                 </button>
                                 <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                                    Accept
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="md:col-span-2 border rounded-lg">
                  <div className="p-4 border-b">
                     <h2 className="text-lg font-semibold">Service Area Map</h2>
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
   )
}