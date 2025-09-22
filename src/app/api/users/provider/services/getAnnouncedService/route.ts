/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest) {
   try {
      const url = new URL(request.url);
      const providerId = url.searchParams.get("providerId");
      
      if (!providerId) return NextResponse.json({error: "Provider ID is required"}, {status: 400});
      
      const service = await Service.findOne({providerId});
            
      return NextResponse.json({message: "Service fetched successfully", success: true, data: service});
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
      
   }
}