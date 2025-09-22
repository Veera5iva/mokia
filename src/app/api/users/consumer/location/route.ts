/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { Consumer } from "@/models";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function PATCH(request: NextRequest) {
    try {
        const consumer = getDataFromToken(request);
        const consumerId = consumer?.id;
        
        const reqBody = await request.json();
        const { lat, lng } = reqBody;

        // Update user with new location
        const user = await Consumer.findByIdAndUpdate(
            consumerId, {"location.coordinates": [lat, lng]}, { new: true }
        );

        return NextResponse.json({
            message: "Location updated successfully",
            success: true,
            data: user
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}