import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, error: "Only PDF allowed" },
        { status: 400 }
      );
    }

    const MAX_PDF_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "PDF size should be less than 50MB",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `books/${Date.now()}-${file.name}`;

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: "application/pdf",
      })
    );

    const fileUrl = `${process.env.R2_PUBLIC_BASE}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: fileUrl,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
