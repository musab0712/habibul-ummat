import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function GET(req, context) {
  // 👇 Next.js 15: context ko await karo
  const { params } = await context;

  // [...key] array hoga: ["books", "file.pdf"]
  const rawKey = Array.isArray(params.key) ? params.key.join("/") : params.key;
  const key = decodeURIComponent(rawKey);

  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  const data = await r2.send(command);

  return new Response(data.Body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline", // inline = browser me open, attachment = force download
      "Cache-Control": "private, max-age=3600",
    },
  });
}
