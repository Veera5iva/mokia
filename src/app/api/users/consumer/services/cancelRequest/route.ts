/* eslint-disable @typescript-eslint/no-explicit-any */
import { Consumer, Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {serviceId, requestId, consumerId} = reqBody;

      await Service.findByIdAndUpdate(serviceId, { $pull: { requests: { _id: requestId } } });
      await Consumer.findByIdAndUpdate(consumerId, { $pull: { requestedServices: serviceId } });
      
      return NextResponse.json({message: "Service canceled successfully", success: true});
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
      
   }
}