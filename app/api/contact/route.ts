// app/api/contact/route.ts
import type { NextRequest } from "next/server";
import emailjs from "@emailjs/browser";

export async function POST(req: NextRequest) {
  const { name, email, reason, message } = await req.json();

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID!,
      { name, email, reason, message },
      process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY!,
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err }), {
      status: 500,
    });
  }
}
