import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import KhanaqahGallery from "@/models/KhanaqahGallery";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    // Find the image in the database
    const image = await KhanaqahGallery.findById(id);
    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from database
    await KhanaqahGallery.findByIdAndDelete(id);

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
