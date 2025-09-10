// app/api/slides/route.js (Updated API route for slides)
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Slide from "@/models/Slide";

// GET all slides
export async function GET() {
  try {
    await dbConnect();
    const slides = await Slide.find({}).select("-__v").sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: slides,
      count: slides.length,
    });
  } catch (error) {
    console.error("Error fetching slides:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch slides" },
      { status: 500 }
    );
  }
}

// POST a new slide
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { imageUrl, publicId } = body;

    // Validate required fields
    if (!imageUrl || !publicId) {
      return NextResponse.json(
        { success: false, error: "imageUrl, and publicId are required" },
        { status: 400 }
      );
    }

    // Save to database
    const slide = await Slide.create({
      imageUrl,
      publicId,
    });

    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    console.error("Error creating slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create slide" },
      { status: 500 }
    );
  }
}
