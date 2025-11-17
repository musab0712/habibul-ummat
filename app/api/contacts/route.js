import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contacts from "@/models/Contacts";

export async function GET() {
  await dbConnect();
  try {
    const contacts = await Contacts.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
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

    // Add IP address and user agent
    const ipAddress = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const contactData = {
      ...body,
      ipAddress,
      userAgent,
    };

    const contact = await Contacts.create(contactData);
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
