import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import MessagesClientPage from './client-page';

export const revalidate = 300;

export default async function MessagesPage() {
  let messages = await client.queries.postConnection({
    sort: 'date',
    last: 1
  });
  const allMessages = messages;

  if (!allMessages.data.postConnection.edges) {
    return [];
  }

  while (messages.data?.postConnection.pageInfo.hasPreviousPage) {
    messages = await client.queries.postConnection({
      sort: 'date',
      before: messages.data.postConnection.pageInfo.endCursor,
    });

    if (!messages.data.postConnection.edges) {
      break;
    }

    allMessages.data.postConnection.edges.push(...messages.data.postConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allMessages.data}>
      <MessagesClientPage {...allMessages} />
    </Layout>
  );
}
