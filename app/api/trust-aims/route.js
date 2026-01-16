import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import TrustAim from "@/models/TrustAim";

// Force Node.js runtime
export const runtime = "nodejs";

export async function GET() {
  try {
    await dbConnect();

    // Find the about document (there should only be one)
    const trustAimData = await TrustAim.findOne();

    return NextResponse.json({
      success: true,
      data: trustAimData || null,
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
    const existingDoc = await TrustAim.findOne();

    let result;
    if (existingDoc) {
      // Update existing document
      result = await TrustAim.findByIdAndUpdate(
        existingDoc._id,
        { $set: body },
        { new: true, runValidators: true }
      );
    } else {
      // Create new document
      result = await TrustAim.create(body);
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
