// app/api/fatwa/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Fatwa from "@/models/Fatwa";

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const fatwa = await Fatwa.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!fatwa) {
      return NextResponse.json(
        { success: false, error: "Fatwa not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: fatwa });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const deletedFatwa = await Fatwa.deleteOne({ _id: params.id });
    if (!deletedFatwa) {
      return NextResponse.json(
        { success: false, error: "fatwa not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
