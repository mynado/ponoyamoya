import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("siteSettings", "");
  revalidateTag("offering", "");
  revalidateTag("journalPost", "");
  revalidateTag("portfolioWork", "");
  return NextResponse.json({ revalidated: true });
}
