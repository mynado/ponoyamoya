import type { NextRequest } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(req: NextRequest) {
  const templateParams = await req.json();

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!,
        privateKey: process.env.NEXT_PUBLIC_EMAIL_JS_PRIVATE_KEY!,
      },
    );
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
}
