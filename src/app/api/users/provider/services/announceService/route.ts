/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider, Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const { providerId, serviceType, description, startTime, endTime } = reqBody;
      console.log(reqBody);
      
      const service = await Service.create({ providerId, serviceType, description, startTime, endTime });
      await Provider.findByIdAndUpdate(providerId, { $push: { services: service._id } });
      return NextResponse.json({ message: "Service announced successfully", success: true });
      
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
      
   }
}