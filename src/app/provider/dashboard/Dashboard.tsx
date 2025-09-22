/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useEffect, useState } from 'react';
import { Bell, User } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

interface DashboardProps {
   providerId: string;
   initialService: {
      serviceType: string;
      description: string;
      startTime: string;
      endTime: string;
   } | null;
   error?: string;
   notifications?: number;
}
interface requests {
   consumer: {
      username: string;
      phone: string;
   };
   _id: string;
   status: string;
}

export default function Dashboard({ providerId, initialService, error, notifications = 0 }: DashboardProps) {
   const [announceService, setAnnounceService] = useState(
      initialService || {
         serviceType: '',
         description: '',
         startTime: '',
         endTime: '',
      }
   );
   const [serviceAnnounced, setServiceAnnounced] = useState(!!initialService);
   const [requests, setRequests] = useState<requests[]>([]);

   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
   const [tempStatus, setTempStatus] = useState<string>("");


   const requestedConsumersData = useCallback(async () => {
      if (!serviceAnnounced) return;
      try {
         const response = await axios.get("/api/users/provider/services/getRequestedConsumers", {
            params: { providerId }
         });
         console.log(response.data.data.requests);
         const consumer: requests[] = response.data?.data.requests || [];
         setRequests(consumer);
      } catch (error: any) {
         console.error(error);
      }
   }, [providerId, serviceAnnounced]);

   useEffect(() => {
      if (!serviceAnnounced) return;
      requestedConsumersData();
      const interval = setInterval(requestedConsumersData, 5000);
      return () => clearInterval(interval);
   }, [requestedConsumersData, serviceAnnounced])

   const handleRejectRequest = async (requestId: string) => {
      try {
         const response = await axios.post("/api/users/provider/services/updateStatus", {
            providerId,
            requestId,
            status: "Rejected"
         });

         if (response.data.success) {
            toast.success("Request rejected successfully");
         }

      } catch (error: any) {
         console.log(error);
         toast.error(error.message)
      }
   }

   const handleAcceptRequest = async (requestId: string) => {
      try {
         const response = await axios.post("/api/users/provider/services/updateStatus", {
            providerId,
            requestId,
            status: "Accepted"
         });

         if (response.data.success) {
            toast.success("Request accepted successfully");
         }

      } catch (error: any) {
         console.log(error);
         toast.error(error.message)
      }
   }

   const handleToggleStatusDropdown = (requestId: string) => {
      setOpenDropdownId(requestId);
   };

   const handleConfirmStatusUpdate = async (requestId: string) => {
      if (!tempStatus) {
         return toast.error("Please select a status before updating.");
      }
      try {
         await axios.post("/api/users/provider/services/updateStatus", {
            providerId,
            requestId,
            status: tempStatus,
         });
         toast.success("Request status updated successfully.");

         setOpenDropdownId(null);
         setTempStatus("");

      } catch (error: any) {
         toast.error(error.response?.data?.message || "An error occurred while updating the status.");
      }
   };
   const handleCancelStatusUpdate = () => {
      setOpenDropdownId(null);
      setTempStatus("");
   };

   const handleAnnounceService = async (e: any) => {
      e.preventDefault();
      if (!announceService.serviceType || !announceService.description || !announceService.startTime || !announceService.endTime) {
         return toast.error("Please fill in all service details.");
      }

      try {
         if (serviceAnnounced) {
            await axios.delete("/api/users/provider/services/cancelService", {
               data: { providerId, serviceType: announceService.serviceType },
            });
            setAnnounceService({ serviceType: "", description: "", startTime: "", endTime: "" });
            toast.success("Service canceled successfully.");
         } else {
            await axios.post("/api/users/provider/services/announceService", {
               providerId,
               ...announceService,
            });
            toast.success("Service announced successfully.");
         }
         setServiceAnnounced(!serviceAnnounced);
      } catch (error: any) {
         toast.error(error.response?.data?.message || "An error occurred.");
      }
   };

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div>
         <Toaster position="top-right" reverseOrder={false} />
         <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
               <Link href="/provider/dashboard">
                  <h1 className="text-2xl font-semibold text-gray-800 cursor-pointer">Service Provider Dashboard</h1>
               </Link>
               <div className="flex items-center space-x-4">
                  <button className="relative rounded-full p-2 hover:bg-gray-100 focus:outline-none">
                     <Bell className="h-6 w-6 text-gray-600" />
                     {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                           {notifications}
                        </span>
                     )}
                  </button>
                  <Link href="/provider/profile" className="rounded-full hover:bg-gray-100">
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
                        <h2 className="text-lg font-semibold">Announce Service</h2>
                     </div>
                     <div className="p-4">
                        <form className="space-y-4">
                           <div className="space-y-2">
                              <label className="block text-sm font-medium">Service Type</label>
                              <input
                                 className="w-full p-2 border rounded"
                                 placeholder="e.g. Plumbing, Food Delivery"
                                 value={announceService.serviceType}
                                 onChange={(e) => setAnnounceService({ ...announceService, serviceType: e.target.value })}
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="block text-sm font-medium">Description</label>
                              <textarea
                                 className="w-full p-2 border rounded"
                                 placeholder="Describe your service..."
                                 value={announceService.description}
                                 onChange={(e) => setAnnounceService({ ...announceService, description: e.target.value })}
                              />
                           </div>
                           <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium">Start Time</label>
                                 <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={announceService.startTime}
                                    onChange={(e) => setAnnounceService({ ...announceService, startTime: e.target.value })}
                                 />
                              </div>
                              <div className="space-y-2">
                                 <label className="block text-sm font-medium">End Time</label>
                                 <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={announceService.endTime}
                                    onChange={(e) => setAnnounceService({ ...announceService, endTime: e.target.value })}
                                 />
                              </div>
                           </div>
                           <button
                              className={`w-full ${serviceAnnounced ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded`}
                              onClick={handleAnnounceService}
                           > {serviceAnnounced ? "Cancel Service" : "Announce Service"}
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
                           {requests.length > 0 ? (
                              requests.map((request) => (
                                 <div key={request._id} className="rounded-lg border p-4">
                                    <h3 className="font-semibold mb-2">{request.consumer.username}</h3>
                                    <div className="space-y-2 text-sm">
                                       <p className="flex items-center">📱 {request.consumer.phone}</p>
                                       <p className="flex items-center">📍 {request._id}</p>
                                       <p className="flex items-center font-semibold">Status: {request.status}</p>
                                    </div>
                                    <div className="mt-4 flex flex-col md:flex-row md:justify-between">
                                       <button className="border px-3 py-1 rounded text-sm mb-2 md:mb-0">
                                          Get Directions
                                       </button>

                                       {request.status === "Requested" && (
                                          <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
                                             <button
                                                className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm md:mr-2"
                                                onClick={() => handleRejectRequest(request._id)}
                                             >
                                                Reject
                                             </button>
                                             <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                                onClick={() => handleAcceptRequest(request._id)}
                                             >
                                                Accept
                                             </button>
                                          </div>
                                       )}

                                       {request.status === "Rejected" && (
                                          <div></div>
                                       )}

                                       {(request.status !== "Requested" && request.status !== "Rejected" &&
                                          request.status !== "Completed" && openDropdownId !== request._id) && (
                                             <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0">
                                                <button
                                                   className="bg-blue-500 text-white px-3 py-1 rounded text-sm md:mr-1"
                                                   onClick={() => handleToggleStatusDropdown(request._id)}
                                                >
                                                   Update Status
                                                </button>
                                                <button
                                                   className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm"
                                                   onClick={() => handleRejectRequest(request._id)}
                                                >
                                                   Reject
                                                </button>
                                             </div>
                                          )}

                                       {openDropdownId === request._id && request.status !== "Rejected" && (
                                          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
                                             <select
                                                className="p-1 border rounded w-full md:w-auto"
                                                value={tempStatus}
                                                onChange={(e) => setTempStatus(e.target.value)}
                                             >
                                                <option value="">Select status</option>
                                                <option value="On My Way">On My Way</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                             </select>

                                             <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full md:w-auto"
                                                onClick={() => handleConfirmStatusUpdate(request._id)}
                                             >Update Status
                                             </button>

                                             <button
                                                className="border border-red-500 text-red-500 px-3 py-1 rounded text-sm w-full md:w-auto"
                                                onClick={handleCancelStatusUpdate}
                                             >Cancel
                                             </button>

                                          </div>
                                       )}
                                    </div>

                                 </div>
                              ))
                           ) : (
                              <p className="text-gray-500 text-center">No service announced at the moment or no active requests.</p>
                           )}
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

      </div>
   );
}