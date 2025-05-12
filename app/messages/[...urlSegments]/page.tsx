import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/Layout';
import MessageClientPage from './client-page';

export const revalidate = 300;

export default async function MessagePage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.message({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <MessageClientPage {...data} />
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

    allMessages.data.messageConnection.edges.push(...messages.data.messageConnection.edges);
  }

  const params =
    allMessages.data?.messageConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
