/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
   try {
      const reqBody = await request.json();
      const {providerId, requestId, status} = reqBody;

      const service = await Service.findOne({providerId});

      const requestToUpdate = service.requests.id(requestId);

      if (requestToUpdate) {

         requestToUpdate.status = status;
         await service.save();
      }
      
      return NextResponse.json({message: "Service status updated successfully", success: true});
      
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
   }
}