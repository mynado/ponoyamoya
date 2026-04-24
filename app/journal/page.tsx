import { draftMode } from "next/headers";
import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import { PortableText } from "next-sanity";
import { getJournalPage, getJournalPosts } from "@/lib/sanity/queries/index";
import { JournalPost, JournalPostPreview } from "@/lib/sanity/types/index";
import Card from "@/components/ui/Card";

export default async function Journal() {
  const { isEnabled } = await draftMode();
  console.log("Draft Mode Enabled:", isEnabled);
  const [page, allPosts] = await Promise.all([
    getJournalPage(),
    getJournalPosts(isEnabled),
  ]);
  console.log("All Journal Posts:", allPosts);
  // TODO: fix journalPost type
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          {page?.title || "Journal"}
        </h1>
        {page?.intro && <PortableText value={page.intro} />}
        {allPosts ? (
          <ul className="mt-8">
            {allPosts.map((post: JournalPostPreview | JournalPost) => (
              <li key={post._id} className="my-12">
                <Card postData={post}>
                  <Link href={`/journal/${post.slug.current}`}>
                    <h2 className="text-2xl md:text-3xl font-medium my-4 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <div>{post.excerpt && <p>{stegaClean(post.excerpt)}</p>}</div>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p>Could not load content</p>
        )}
      </div>
    </div>
  );
}
