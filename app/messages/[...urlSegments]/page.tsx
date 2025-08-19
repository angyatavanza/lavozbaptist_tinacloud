import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import MessageClientPage from "./client-page";
import { fetchFacebookVideos } from "../page";
import { MessageQuery } from "@/tina/__generated__/types";

export const dynamic = 'force-static';
export const dynamicParams = false;

export const revalidate = 300;

export default async function MessagePage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join("/");
  // First, try loading the MDX message (TinaCMS)
  try {
    const data = await client.queries.message({
      relativePath: `${filepath}.mdx`,
    });

    return (
      <Layout rawPageData={data}>
        <MessageClientPage {...data} />
      </Layout>
    );
  } catch (err) {
    console.warn(
      `MDX not found for slug ${filepath}, falling back to Facebook...`
    );
  }

  const facebookVideos = await fetchFacebookVideos();

  const fbVideo = facebookVideos.find((video) => {
    const dateSlug = video.date?.split("T")[0];
    const safeSlug = video.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);
    return `${dateSlug}-${safeSlug}` === filepath;
  });

  if (!fbVideo) return <div>Not Found</div>;

  const fbData: MessageQuery = {
    message: {
      __typename: "Message",
      id: fbVideo.id,
      title: fbVideo.title,
      date: fbVideo.date,
      excerpt: fbVideo.excerpt,
      _body: {
        type: "root",
        children: [],
      },
      image: {
        __typename: "MessageImage",
        videoUrl: fbVideo.videoUrl,
        src: fbVideo.thumbnailUrl,
        embeddable: fbVideo.embeddableUrl,
      },
      color: "blue",
      coordinator: {
        __typename: "Coordinator",
        name: "La Voz De La Esperanza was live",
        avatar: "/ve_logo.png",
        id: `fb-${fbVideo.id}`,
        _sys: {
          __typename: "SystemInfo",
          filename: `fb-${fbVideo.id}`,
          basename: `fb-${fbVideo.id}`,
          breadcrumbs: [filepath],
          path: `fb-${fbVideo.id}`,
          relativePath: `fb-${fbVideo.id}.mdx`,
          extension: "mdx",
        },
      },
      _sys: {
        __typename: "SystemInfo",
        filename: filepath,
        basename: filepath,
        path: filepath,
        relativePath: filepath + ".mdx",
        extension: "mdx",
        breadcrumbs: [filepath],
      },
    },
  };

  return (
    <Layout rawPageData={fbData}>
      <MessageClientPage
        data={fbData}
        query=""
        variables={{ relativePath: filepath + ".mdx" }}
      />
    </Layout>
  );
}

export async function generateStaticParams() {
  let messages = await client.queries.messageConnection();
  const allMessages = messages;

  if (!allMessages.data.messageConnection.edges) {
    return [];
  }

  while (messages.data?.messageConnection.pageInfo.hasNextPage) {
    messages = await client.queries.messageConnection({
      after: messages.data.messageConnection.pageInfo.endCursor,
    });

    if (!messages.data.messageConnection.edges) {
      break;
    }

    allMessages.data.messageConnection.edges.push(
      ...messages.data.messageConnection.edges
    );
  }

  const tinaParams =
    allMessages.data?.messageConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  // Facebook videos
  const facebookVideos = await fetchFacebookVideos();

  const facebookParams = facebookVideos.map((video) => {
    const dateSlug = video.date?.split("T")[0];
    const safeSlug = video.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 50);

    return {
      urlSegments: [`${dateSlug}-${safeSlug}`],
    };
  });

  return [...tinaParams, ...facebookParams];
}
