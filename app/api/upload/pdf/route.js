// app/api/upload/pdf/route.js
export const runtime = "nodejs";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { r2 } from "@/lib/r2";

// ✅ Allowed origins list (yahan sirf apne domains + localhost)
const ALLOWED_ORIGINS = [
  "https://www.habibulummat.com",
  "https://habibulummat.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  // optional: vercel domain se bhi hit karna ho to
  "https://habibul-ummat.vercel.app",
];

// Helper: given request, decide CORS headers
function getCorsHeaders(req) {
  const origin = req.headers.get("origin");
  // console.log("Origin:", origin); // debug ke liye

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin, // 👈 reflect allowed origin
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };
  }

  // origin not allowed -> no CORS headers
  return null;
}

// Helper: JSON + CORS merge
function jsonWithCors(req, body, init = {}) {
  const cors = getCorsHeaders(req);
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(cors || {}),
    },
  });
}

// ✅ Preflight handler (OPTIONS)
export async function OPTIONS(req) {
  const cors = getCorsHeaders(req);

  if (!cors) {
    // Origin not allowed
    return new NextResponse("Origin not allowed", {
      status: 403,
    });
  }

  return new NextResponse(null, {
    status: 204,
    headers: cors,
  });
}

// ✅ Main upload handler
export async function POST(req) {
  try {
    const cors = getCorsHeaders(req);
    if (!cors) {
      return new NextResponse("Origin not allowed", {
        status: 403,
      });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || file.type !== "application/pdf") {
      return jsonWithCors(req, { error: "Invalid PDF" }, { status: 400 });
    }

    if (file.size > 50 * 1024 * 1024) {
      return jsonWithCors(
        req,
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

    return jsonWithCors(req, {
      success: true,
      pdfUrl: `/api/pdf/${key}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return jsonWithCors(req, { error: err.message }, { status: 500 });
  }
}
