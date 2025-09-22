/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/consumerModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST (request: NextRequest) {
   try {
      const reqBody = await request.json()
            
      const {email} = reqBody
      const user = await User.findOne({email})
      if(!user) return NextResponse.json({error: "User not found"}, {status: 400});

      await sendEmail({email: user.email, emailType: "RESET", userId: user._id})

      console.log(user);
      return NextResponse.json({
         message: "email sent successfully",
         success: true,
         data: user
      });
      
   } catch (error: any) {
      return NextResponse.json({error: error.message}, {status: 400})
      
   }
}