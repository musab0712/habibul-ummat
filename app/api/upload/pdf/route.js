export const runtime = "nodejs";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// ✅ TEMP: sab origins allow (sirf debug ke liye, baad me tighten karenge)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// common helper
function jsonWithCors(body, init = {}) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...corsHeaders,
    },
  });
}

// ✅ R2 client yahin banayenge (taaki error try/catch me aaye)
function createR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error(
      "R2 env vars missing. Please check Vercel Environment Variables."
    );
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

// ✅ OPTIONS handler (preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// ✅ POST handler
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || file.type !== "application/pdf") {
      return jsonWithCors({ error: "Invalid PDF" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return jsonWithCors(
        { error: "PDF size should be less than 50MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const key = `books/${Date.now()}-${file.name}`;

    const r2 = createR2Client();

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: "application/pdf",
      })
    );

    return jsonWithCors({
      success: true,
      pdfUrl: `/api/pdf/${key}`,
    });
  } catch (err) {
    console.error("Upload error (server):", err);
    return jsonWithCors(
      { error: err.message || "Upload failed on server" },
      { status: 500 }
    );
  }
}
