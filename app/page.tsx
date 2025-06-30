import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";
import { fetchFacebookVideos } from "./messages/page";
import {
  loadTokenFromEnv,
  isTokenValid,
  daysUntilExpiration,
} from "@/lib/token-helper";

const token = loadTokenFromEnv();
export const revalidate = 300;

export default async function Home() {
  if (token && isTokenValid(token)) {
    console.log(`Token is valid with ${daysUntilExpiration(token)} days left`);
  } else {
    console.warn("Facebook token is expired or missing!");
  }
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  const eventRes = await client.queries.eventConnection();
  const events = eventRes.data.eventConnection
    .edges!.map((edge) => edge!.node!)
    .filter((event) => !!event.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

  const messageRes = await client.queries.messageConnection();
  const tinaMessages = messageRes.data.messageConnection
    .edges!.map((edge) => ({
      ...edge!.node!,
      type: "tina",
    }))
    .filter((message) => !!message.date);

  const facebookVideos = await fetchFacebookVideos();

  const facebookMessages = facebookVideos.map((video) => {
    const dateSlug = video.date?.split("T")[0];
    const safeSlug = video.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);
    const customSlug = `${dateSlug}-${safeSlug}`;

    return {
      id: video.id,
      title: video.title,
      date: video.date,
      image: {
        videoUrl: video.videoUrl,
        src: video.thumbnailUrl,
        embeddable: video.embeddableURL,
      },
      excerpt: video.excerpt,
      tags: [],
      _sys: {
        breadcrumbs: [customSlug],
      },
      coordinator: {
        name: "Facebook",
        avatar: null,
      },
      type: "facebook",
    };
  });

  // Merge and sort
  const hybridMessages = [...tinaMessages, ...facebookMessages].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Take latest 3
  const messages = hybridMessages.slice(0, 3);

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} events={events ?? []} messages={messages ?? []}/>
    </Layout>
  );
}
