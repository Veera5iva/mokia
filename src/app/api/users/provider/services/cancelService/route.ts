/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {providerId, serviceType} = reqBody;

      await Service.findOneAndDelete({providerId, serviceType});
      return NextResponse.json({message: "Service canceled successfully", success: true});
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
      
   }
}