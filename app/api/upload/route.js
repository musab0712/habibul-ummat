// app/api/upload/route.js (Memory-based upload)
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

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const imageFile = formData.get("image");

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Convert the file to buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64 for Cloudinary upload
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${imageFile.type};base64,${base64Image}`;

    // Upload image to Cloudinary directly from memory
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        dataURI,
        {
          folder: "hero-slider",
          transformation: [
            { width: 1920, height: 1080, crop: "limit", quality: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    // Create slide in database
    const slide = await Slide.create({
      imageUrl: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id,
    });

    return NextResponse.json({ success: true, data: slide }, { status: 201 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
