// app/api/books/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book";

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const book = await Book.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: book });
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
    const deletedBook = await Book.deleteOne({ _id: params.id });
    if (!deletedBook) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
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
