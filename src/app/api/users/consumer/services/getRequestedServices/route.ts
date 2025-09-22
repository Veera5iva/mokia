/* eslint-disable @typescript-eslint/no-explicit-any */
import { Consumer } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
   try {
      const url = new URL(request.url);
      const consumerId = url.searchParams.get("consumerId");

      const consumer = await Consumer.findById(consumerId).select("requestedServices");

      await consumer.populate({
         path: "requestedServices",
         select: "serviceType description requests"
      });

      const requestedServices = consumer.requestedServices.map((service: any) => {
         const request = service.requests.find((request: any) => request.consumer.toString() === consumerId);
         return {
            serviceId: service._id,
            serviceType: service.serviceType,
            description: service.description,
            requestId: request?._id,
            status: request?.status 
         }
      })
      console.log(requestedServices);
      
      
      return NextResponse.json({message: "Requested services fetched successfully", success: true, data: requestedServices});
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
      
   }
}