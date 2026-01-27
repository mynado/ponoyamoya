import { getAllJournalPosts } from "@/lib/sanity/queries";
import { draftMode } from "next/headers";

export default async function Journal() {
  const { isEnabled } = await draftMode();
  const allPosts = await getAllJournalPosts(isEnabled);
  console.log("All Journal Posts:", allPosts);
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <h1 className="text-center text-4xl font-bold">Journal</h1>
        <ul>
          {allPosts.map((post) => (
            <li key={post._id} className="mb-4">
              <a
                href={`/journal/${post.slug.current}`}
                className="text-2xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </a>
              <p className="text-gray-600">{post.publishedAt}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
