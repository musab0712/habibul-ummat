import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import JamiaGallery from "@/models/JamiaGallery";

export async function GET() {
  try {
    await dbConnect();
    const images = await JamiaGallery.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, imageUrl, publicId } = body;

    // Save to database
    const image = await JamiaGallery.create({
      title,
      imageUrl,
      publicId,
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
