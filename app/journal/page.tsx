import { getAllJournalPosts } from "@/lib/sanity/queries";
import { draftMode } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import getImageUrl from "@/lib/sanity/utils";

export default async function Journal() {
  const { isEnabled } = await draftMode();
  console.log("Draft Mode Enabled:", isEnabled);
  const allPosts = await getAllJournalPosts(isEnabled);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-center text-4xl font-bold">Journal</h1>
        <ul className="mt-8">
          {allPosts.map((post) => (
            <li key={post._id} className="mb-4">
              {post.thumbnail && (
                <Image
                  src={getImageUrl(post.thumbnail.asset._ref)}
                  alt={post.thumbnail.alt}
                  width={400}
                  height={300}
                />
              )}
              <h3>
                <Link
                  href={`/journal/${post.slug.current}`}
                  className="text-2xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </h3>
              <span className="text-gray-600">
                {new Date(post.publishedAt).toLocaleDateString("en-SE", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {post.excerpt && <p>{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
