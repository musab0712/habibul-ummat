// app/api/slides/[id]/route.js (Updated API route for individual slide)
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Slide from "@/models/Slide";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET a specific slide
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const slide = await Slide.findById(id);

    if (!slide) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    console.error("Error fetching slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch slide" },
      { status: 500 }
    );
  }
}

// DELETE a slide
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    // Find the slide first to get the publicId
    const slide = await Slide.findById(params.id);
    if (!slide) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    await cloudinary.v2.uploader.destroy(slide.publicId);

    // Delete slide from database
    await Slide.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Slide deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete slide" },
      { status: 500 }
    );
  }
}

// UPDATE a slide
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();

    const slide = await Slide.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!slide) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: slide });
  } catch (error) {
    console.error("Error updating slide:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update slide" },
      { status: 500 }
    );
  }
}
