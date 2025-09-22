/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { Consumer, Provider } from "@/models";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request: NextRequest) {
   try {
      const data = getDataFromToken(request);
      console.log(data);
      let user;

      if (data?.role === "provider") {
         user = await Provider.findById(data?.id).select("-password");
      } else {
         user = await Consumer.findById(data?.id).select("-password");
      }

      return NextResponse.json({
         message: "User data fetched successfully",
         data: user,
      });
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}