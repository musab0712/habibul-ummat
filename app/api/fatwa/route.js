// app/api/fatwa/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Fatwa from "@/models/Fatwa";

export async function GET() {
  await dbConnect();
  try {
    const fatwa = await Fatwa.find({}).sort({ uploadDate: -1 });
    return NextResponse.json({ success: true, data: fatwa });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const fatwa = await Fatwa.create(body);
    return NextResponse.json({ success: true, data: fatwa }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
