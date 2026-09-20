import { draftMode } from "next/headers";
import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import { PortableText } from "next-sanity";
import {
  getJournalPage,
  getJournalPosts,
  getSiteSettings,
} from "@/lib/sanity/queries/index";
import { JournalPost, JournalPostPreview } from "@/lib/sanity/types/index";
import { buildMetadata } from "@/lib/sanity/seo";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const [pageData, settings] = await Promise.all([
    getJournalPage(isEnabled),
    getSiteSettings(),
  ]);

  const siteSettings = settings ?? ({} as NonNullable<typeof settings>);

  return buildMetadata({
    seo: pageData?.seo,
    settings: siteSettings,
    slug: "ndumba",
  });
}

export default async function Journal() {
  const { isEnabled } = await draftMode();
  const [pageData, allPosts] = await Promise.all([
    getJournalPage(isEnabled),
    getJournalPosts(isEnabled),
  ]);
  // TODO: fix journalPost type
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          {pageData?.title || "Journal"}
        </h1>
        {pageData?.intro ? (
          <PortableText value={pageData.intro} />
        ) : (
          "Coming soon..."
        )}
        {allPosts && allPosts.length > 0 ? (
          <ul className="mt-8">
            {allPosts.map((post: JournalPostPreview | JournalPost) => (
              <li key={post._id} className="my-12">
                <Link
                  href={`/journal/${post.slug.current}`}
                  className="group animate-fade-in"
                >
                  <article>
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                      {post.coverImage && (
                        <div className="w-full md:w-1/3 overflow-hidden">
                          <Image
                            src={urlFor(post.coverImage)
                              .width(800)
                              .height(800)
                              .url()}
                            alt={post.coverImage.alt ? post.coverImage.alt : ""}
                            width={400}
                            height={400}
                            loading="eager"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        {post.publishedAt && (
                          <span className="text-gray-600 text-sm">
                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-SE",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        )}
                        <h2 className="text-2xl md:text-3xl font-medium text-foreground group-hover:opacity-80 transition-colors mb-2">
                          {post.title}
                        </h2>
                        <div>
                          {post.excerpt && <p>{stegaClean(post.excerpt)}</p>}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="my-12 w-full text-center">Could not load content</p>
        )}
      </div>
    </div>
  );
}
