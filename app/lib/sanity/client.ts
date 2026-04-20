import { createClient } from "@sanity/client";

// Client with token for draft mode access
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2025-10-06",
  useCdn: false,
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    enabled: true,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    filter: (props) => {
      if (
        props.sourcePath.at(-1) === "slug" ||
        props.sourcePath.at(-1) === "publishedAt" ||
        props.sourcePath.at(-1) === "_id" ||
        props.sourcePath.includes("categories")
      ) {
        return false;
      }
      return props.filterDefault(props);
    },
  },
});
