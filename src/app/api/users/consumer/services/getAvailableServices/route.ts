/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from "@/models";
import { NextResponse } from "next/server";

export async function GET () {
   try {
      const services = await Service.find({}).populate("providerId", "_id").exec();
      
      return NextResponse.json({message: "Services fetched successfully", success: true, data: services});
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 500});
      
   }
}