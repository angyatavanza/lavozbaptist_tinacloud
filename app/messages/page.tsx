import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import MessagesClientPage from './client-page';

export const revalidate = 300;

export default async function MessagesPage() {
  let messages = await client.queries.messageConnection({
    sort: 'date',
    last: 1
  });
  const allMessages = messages;

  if (!allMessages.data.messageConnection.edges) {
    return [];
  }

  while (messages.data?.messageConnection.pageInfo.hasPreviousPage) {
    messages = await client.queries.messageConnection({
      sort: 'date',
      before: messages.data.messageConnection.pageInfo.endCursor,
    });

    if (!messages.data.messageConnection.edges) {
      break;
    }

    allMessages.data.messageConnection.edges.push(...messages.data.messageConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allMessages.data}>
      <MessagesClientPage {...allMessages} />
    </Layout>
  );
}
