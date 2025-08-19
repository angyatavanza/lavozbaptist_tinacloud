import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import MessageClientPage from "./client-page";
import { notFound } from "next/navigation";

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
    return notFound();
  }

}

export async function generateStaticParams() {
  try {
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
      allMessages.data?.messageConnection.edges
        .map((edge) => ({
          urlSegments: edge?.node?._sys.breadcrumbs || [],
        }))
        .filter((p) => p.urlSegments.length > 0) || [];

    // Omit Facebook slugs for static export
    return tinaParams;
  } catch {
    return [];
  }
}
