import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
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
  let messages = await client.queries.postConnection();
  const allMessages = messages;

  if (!allMessages.data.postConnection.edges) {
    return [];
  }

  while (messages.data?.postConnection.pageInfo.hasNextPage) {
    messages = await client.queries.postConnection({
      after: messages.data.postConnection.pageInfo.endCursor,
    });

    if (!messages.data.postConnection.edges) {
      break;
    }

    allMessages.data.postConnection.edges.push(...messages.data.postConnection.edges);
  }

  const params =
    allMessages.data?.postConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
