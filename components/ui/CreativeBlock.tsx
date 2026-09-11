import { CreativeBlockData, MediaBlock } from "@/lib/sanity/types/index";
import { urlFor } from "@/lib/sanity/utils";
import clsx from "clsx";
import { PortableText } from "next-sanity";
import Image from "next/image";

const contentLayout: { [key: string]: string } = {
  full: "w-full max-w-7xl mx-auto",
  narrow: "max-w-3xl mx-auto w-full px-4",
  left: "mr-auto max-w-[60%]",
  right: "ml-auto max-w-[60%]",
  twoCol: "grid grid-cols-2 gap-4 w-full max-w-7xl",
  collage: "", // TODO: be creative with the collage
};

const spaceStyle: { [key: string]: string } = {
  small: "h-1 w-1/4",
  medium: "h-1 w-1/2",
  large: "h-1 w-full",
};

const creativeBlockComponents = {
  types: {
    mediaBlock: ({ value }: { value: MediaBlock }) => {
      if (value.type === "image" && value.image) {
        const width = value.image.asset.metadata.dimensions.width;
        const height = value.image.asset.metadata.dimensions.height;
        return (
          <Image
            src={urlFor(value.image.asset._id)
              .width(width)
              .height(height)
              .url()}
            alt={value.alt || "Creative Block Image"}
            width={width}
            height={height}
            loading="eager"
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
    spacer: ({ value }: { value: { size: string } }) => (
      <hr className={clsx(spaceStyle[value.size], "bg-spiritblue")}></hr>
    ),
  },
};

export default function CreativeBlock({ block }: { block: CreativeBlockData }) {
  return (
    <div className={clsx(contentLayout[block.layout], "prose")}>
      {block.content?.length > 0 && (
        <PortableText
          value={block.content}
          components={creativeBlockComponents}
        />
      )}
    </div>
  );
}
