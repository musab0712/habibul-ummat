// app/api/books/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book";

export async function PUT(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id } = await params;
    const updateData = {
      titleEnglish: body.titleEnglish,
      titleUrdu: body.titleUrdu,
      pdfUrl: body.pdfUrl,
    };

    if (body.coverImage) updateData.coverImage = body.coverImage;
    if (body.detailsImage) updateData.detailsImage = body.detailsImage;

    const book = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: book });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    const deletedBook = await Book.deleteOne({ _id: id });
    if (!deletedBook) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
