import CreativeBlock from "@/components/ui/CreativeBlock";
import {
  getPortfolioWorkBySlug,
  getSiteSettings,
} from "@/lib/sanity/queries/index";
import { buildMetadata } from "@/lib/sanity/seo";
import { CreativeBlockData } from "@/lib/sanity/types/index";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [work, settings] = await Promise.all([
    getPortfolioWorkBySlug(slug, false),
    getSiteSettings(),
  ]);

  const siteSettings = settings ?? ({} as NonNullable<typeof settings>);

  if (!work) return {};

  return buildMetadata({
    seo: work.seo,
    settings: siteSettings,
    slug: `abyss/${slug}`,
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const pageData = await getPortfolioWorkBySlug(slug, isEnabled);
  if (!pageData) notFound();
  // TODO: Arrow icon
  return (
    <div className="mt-16 p-4 flex flex-col w-full items-center justify-center gap-8 mx-auto">
      <div className="max-w-5xl w-full">
        <Link
          href="/abyss"
          className="hover:underline mb-12 inline-block uppercase text-xs"
        >
          &larr; Abyss
        </Link>
        <div className="flex justify-between items-center gap-4 w-full text-xs mb-4">
          <div className="flex items-center gap-4 uppercase">
            <span>{pageData.status}</span>
            {pageData.tags?.map((tag) => (
              <span key={tag._id}>{tag.label}</span>
            ))}
          </div>
          <span>{pageData.year}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{pageData.title}</h1>
        <p className="text-lg italic">{pageData.excerpt}</p>
      </div>
      {pageData.page?.map((item: CreativeBlockData) => (
        <CreativeBlock key={item._key} block={item} />
      ))}
    </div>
  );
}
