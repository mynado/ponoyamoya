import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET!);

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const { _type, slug } = body;

    revalidateTag(_type, "");

    if (slug?.current) {
      revalidateTag(`${_type}:${slug.current}`, "");
    }

    return NextResponse.json({ revalidated: true, type: _type });
  } catch (err) {
    console.error(err);
    return new NextResponse("Revalidation error", { status: 500 });
  }
}
