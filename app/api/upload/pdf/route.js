import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { r2 } from "@/lib/r2";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Invalid PDF" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "PDF size should be less than 50MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `books/${Date.now()}-${file.name}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: "application/pdf",
      })
    );

    return NextResponse.json({
      success: true,
      pdfUrl: `/api/pdf/${key}`,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
