import { previewClient } from "@/lib/sanity/client";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

export const { GET } = defineEnableDraftMode({
  client: previewClient.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
});
