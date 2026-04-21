import { CreativeBlockData, MediaBlock } from "@/lib/sanity/types/shared";
import { urlFor } from "@/lib/sanity/utils";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import Image from "next/image";

const contentLayout: { [key: string]: string } = {
  full: "w-full",
  narrow: "max-w-7xl mx-auto w-full px-4",
  left: "mr-auto max-w-[60%]",
  right: "ml-auto max-w-[60%]",
  twoCol: "grid grid-cols-2 gap-4",
  collage: "relative", // TODO: be creative with the collage
};

const creativeBlockComponents = {
  types: {
    mediaBlock: ({ value }: { value: MediaBlock }) => {
      if (value.type === "image" && value.image) {
        return (
          <Image
            src={urlFor(value.image.asset._ref).width(1200).height(630).url()}
            alt={value.image.alt}
            width={1200} //TODO: What size?? Maybe from cms?
            height={600}
            className="w-full"
          />
        );
      }
      if (value.type === "embed" && value.embedUrl) {
        return <iframe src={value.embedUrl} allowFullScreen />;
      }
      if (value.type === "audio" && value.audioFile?.asset?.url) {
        return <audio controls src={value.audioFile.asset.url} />;
      }
      if (value.type === "video" && value.videoFile?.asset?.url) {
        return <video controls src={value.videoFile.asset.url} />;
      }
      return null;
    },
    pullQuote: ({ value }: { value: { text: string } }) => (
      <blockquote>
        <cite>{value.text}</cite>
      </blockquote>
    ),
    size: () => <hr></hr>,
  },
};

export default function CreativeBlock({ block }: { block: CreativeBlockData }) {
  console.log("CreativeBlockData: ", block);
  return (
    <div className={clsx(contentLayout[block.layout])}>
      {block.content?.length > 0 && (
        <PortableText
          value={block.content}
          components={creativeBlockComponents}
        />
      )}
    </div>
  );
}
