/* eslint-disable @typescript-eslint/no-explicit-any */
import { Consumer, Service } from "@/models";
// import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const { serviceId, consumerId } = reqBody;


      await Service.findByIdAndUpdate(serviceId, { $addToSet: { requests: {consumer: consumerId} } });
      await Consumer.findByIdAndUpdate(consumerId, { $addToSet: { requestedServices: serviceId } });

      return NextResponse.json({ message: "Service requested successfully", success: true });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 })

   }
}