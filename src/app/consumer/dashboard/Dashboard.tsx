/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { Bell, User } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface DashboardHeaderProps {
   consumerId?: string;
   notifications?: number;
}

interface AvailableService {
   _id: string;
   providerId: {
      _id: string;
   }
   serviceType: string;
   description: string;
   startTime: string;
   endTime: string;
   requests: {
      consumer: string;
      status: string;
      _id: string;
   }[]
}

interface RequestedService {
   serviceId: string;
   serviceType: string;
   description: string;
   requestId: string;
   status: string;
}

export default function Dashboard({ consumerId, notifications = 0 }: DashboardHeaderProps) {
   const [availableServices, setAvailableServices] = useState<AvailableService[]>([]);
   const [requestedServices, setRequestedServices] = useState<RequestedService[]>([]);

   const fetchAvailableServices = useCallback(async () => {
      try {
         const response = await axios.get(`/api/users/consumer/services/getAvailableServices`);
         const services: AvailableService[] = response.data?.data || [];
         // console.log(services);

         const filteredServices = services.filter(service => !service.requests.some(consumer => consumer.consumer === consumerId));

         setAvailableServices(filteredServices);
      } catch (error: any) {
         console.error("Error fetching services:", error);
         toast.error(error.message || "Failed to fetch services");
      }
   }, [consumerId]);

   const fetchRequestedServices = useCallback(async () => {
      try {

         const response2 = await axios.get(`/api/users/consumer/services/getRequestedServices`, {
            params: {
               consumerId: consumerId
            }
         });

         const requestedService: RequestedService[] = response2.data?.data || [];
         console.log(requestedService);
         setRequestedServices(requestedService);

      } catch (error: any) {
         console.error("Error fetching services:", error);
         toast.error(error.message || "Failed to fetch services");
      }
   }, [consumerId]);

   useEffect(() => {
      fetchAvailableServices();
      fetchRequestedServices();
      const interval = setInterval(() => {
         fetchAvailableServices();
         fetchRequestedServices();
      }, 4000);
      return () => clearInterval(interval);
   }, [fetchAvailableServices, fetchRequestedServices]);

   const handleRequestService = async (serviceId: string) => {
      try {
         const data = {
            serviceId,
            consumerId,
         }
         const response = await axios.post("/api/users/consumer/services/requestService", data);
         console.log(response.data);

         if (response.data.success) {
            toast.success("Service requested successfully");
            fetchAvailableServices();
            fetchRequestedServices();
         }

      } catch (error: any) {
         console.error("Error handling service request:", error);
         toast.error(error.message || "Failed to process the service request");
      }
   }

   const handleCancelRequest = async (serviceId: string, requestId: string) => {
      try {
         const data = {
            serviceId,
            requestId,
            consumerId
         }
         const response = await axios.post("/api/users/consumer/services/cancelRequest", data);
         console.log(response.data);
         if (response.data.success) {
            toast.success("Service request cancelled successfully");
            fetchAvailableServices();
            fetchRequestedServices();
         }
         
      } catch (error: any) {
         console.log(error);
         toast.error(error.message || "Failed to cancel the service request")
      }
   }

   return (
      <div>
         <Toaster position="top-right" reverseOrder={false} />
         {/* Header */}
         <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
               <h1 className="text-2xl font-semibold text-gray-800">Consumer Dashboard</h1>
               <div className="flex items-center space-x-4">
                  <button className="relative rounded-full p-2 hover:bg-gray-100 focus:outline-none">
                     <Bell className="h-6 w-6 text-gray-600" />
                     {notifications > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                           {notifications}
                        </span>
                     )}
                  </button>
                  <Link href="/consumer/profile" className="rounded-full hover:bg-gray-100">
                     <button className="p-2 focus:outline-none">
                        <User className="h-6 w-6 text-gray-600" />
                     </button>
                  </Link>
               </div>
            </div>
         </header>

         {/* Main Content */}
         <div className="min-h-screen bg-gray-50 text-black">
            <main className="container mx-auto p-4">
               <div className="grid gap-6 md:grid-cols-2">

                  {/* Available Services */}
                  <div className="border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Available Services</h2>
                     </div>
                     <div className="p-4">
                        {availableServices.length > 0 ? (
                           <div className="space-y-4">
                              {availableServices.map((service, index) => (
                                 <div key={index} className="rounded-lg border p-4">
                                    <h3 className="font-semibold">{service.serviceType}</h3>
                                    <p className="text-sm text-gray-500">{service.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                       <span className="text-sm">{service.startTime} - {service.endTime}</span>
                                       <button
                                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                          onClick={() => handleRequestService(service._id)}
                                       >Request Service
                                       </button>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <p className="text-gray-500 text-center">No services available at the moment.</p>
                        )}
                     </div>
                  </div>

                  {/* My Requests */}
                  <div className="border rounded-lg">
                     <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">My Requests</h2>
                     </div>
                     {requestedServices.length > 0 ? (
                        requestedServices.map((request, index) => (
                           <div key={index} className="p-4">
                              <div className="space-y-4">
                                 <div className="rounded-lg border p-4">
                                    <h3 className="font-semibold">{request.serviceType}</h3>
                                    <p className="text-sm text-gray-500">{request.description}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                       <span className="text-sm">Status: {request.status}</span>
                                       <button
                                          className="border px-3 py-1 rounded text-sm text-white bg-red-500 hover:bg-red-600"
                                          onClick={() => handleCancelRequest(request.serviceId, request.requestId)}

                                       >Cancel Request</button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <p className="text-gray-500 text-center p-4">No service requests available at the moment.</p>
                     )}
                  </div>

                  {/* Services Near Me */}
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
   );
}
