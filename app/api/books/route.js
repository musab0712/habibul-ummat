// app/api/books/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Book from "@/models/Book";

export async function GET() {
  await dbConnect();
  try {
    const books = await Book.find({}).sort({ uploadDate: -1 });
    return NextResponse.json({ success: true, data: books });
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
    const book = await Book.create(body);
    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
