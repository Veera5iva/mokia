/* eslint-disable @typescript-eslint/no-explicit-any */
import User from "@/models/consumerModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest) {
   try {
      const reqBody = await request.json();
      console.log(reqBody);
      
      const {token, password} = reqBody;

      const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

      if(!user) return NextResponse.json({error: "User not found"}, {status: 400});

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt)

      user.password = hashedPassword;
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

      await user.save();

      return NextResponse.json({message: "Password reset successful", success: true})
      
   } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
   }
}
