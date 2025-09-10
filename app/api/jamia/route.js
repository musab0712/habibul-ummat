// app/api/jamia/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Jamia from "@/models/Jamia";

// Force Node.js runtime
export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();

    // Find the about document (there should only be one)
    const jamiaData = await Jamia.findOne();

    return NextResponse.json({
      success: true,
      data: jamiaData || null,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();

    // Check if document already exists
    const existingDoc = await Jamia.findOne();

    let result;
    if (existingDoc) {
      // Update existing document
      result = await Jamia.findByIdAndUpdate(
        existingDoc._id,
        { $set: body },
        { new: true, runValidators: true }
      );
    } else {
      // Create new document
      result = await Jamia.create(body);
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Database error" },
      { status: 500 }
    );
  }
}
