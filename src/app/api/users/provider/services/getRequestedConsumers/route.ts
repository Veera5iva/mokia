/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
   try {
      const url = new URL(request.url);
      const providerId = url.searchParams.get("providerId");
      console.log(providerId);
      if (!providerId) return NextResponse.json({error: "Provider ID is required"}, {status: 400});
      
      const service = await Service.findOne({providerId}).select("requests");

      const consumers = await service.populate({
         path: "requests.consumer",
         select: "username phone"
      })
      console.log(consumers.requests);
      
      return NextResponse.json({message: "Requested consumers fetched successfully", success: true, data: consumers});

   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
      
   }
}