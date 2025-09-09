// app/api/uplode/image.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { file } = req.body;

    const uploadResponse = await cloudinary.uploader.upload(file, {
      folder: "admin_page",
      resource_type: "image",
      transformation: [
        { width: 1920, height: 1080, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });

    res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
}
