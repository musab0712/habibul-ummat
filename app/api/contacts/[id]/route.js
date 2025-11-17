import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contacts from "@/models/Contacts";

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id } = await params;
    const contact = await Contacts.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!contact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: contact });
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
    const { id } = await params;
    const deletedContact = await Contacts.deleteOne({ _id: id });
    if (!deletedContact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
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
