import { getAllJournalPosts } from "@/lib/sanity/queries";
import { draftMode } from "next/headers";
import Link from "next/link";
import Card from "@/components/Card";

export default async function Journal() {
  const { isEnabled } = await draftMode();
  console.log("Draft Mode Enabled:", isEnabled);
  const allPosts = await getAllJournalPosts(isEnabled);
  console.log("All Journal Posts:", allPosts);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-4xl font-bold">Journal</h1>
        <ul className="mt-8">
          {allPosts.map((post) => (
            <li key={post._id} className="mb-8">
              <Card postData={post}>
                <h3>
                  <Link
                    href={`/journal/${post.slug}`}
                    className="text-2xl font-semibold hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <div>{post.excerpt && <p>{post.excerpt}</p>}</div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
