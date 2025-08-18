import { defineConfig } from "tinacms";
import nextConfig from "../next.config";
import Message from "./collection/message";
import Event from "./collection/event";
import Global from "./collection/global";
import Coordinator from "./collection/coordinator";
import Page from "./collection/page";
import Tag from "./collection/tag";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  "";

export default defineConfig({
  branch,
  token: process.env.TINA_TOKEN!,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
    basePath: nextConfig.basePath?.replace(/^\//, "") || "", // The base path of the app (could be /blog)
  },
  schema: {
    collections: [Page, Message, Event, Coordinator, Tag, Global],
  },
  ui: {
    previewUrl: (context) => {
      // Use Vercel preview deployments based on branch names
      return { url: `https://lavozbaptist-tinacloud-git-${context.branch}.vercel.app` };
    },
  },
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
});
