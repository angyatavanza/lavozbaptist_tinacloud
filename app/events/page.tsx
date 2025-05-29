import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import EventsClientPage from './client-page';

export const revalidate = 300;

export default async function EventsPage() {
  let events = await client.queries.eventConnection({
    sort: 'date',
    last: 1
  });
  const allEvents = events;

  if (!allEvents.data.eventConnection.edges) {
    return [];
  }

  while (events.data?.eventConnection.pageInfo.hasPreviousPage) {
    events = await client.queries.eventConnection({
      sort: 'date',
      before: events.data.eventConnection.pageInfo.endCursor,
    });

    if (!events.data.eventConnection.edges) {
      break;
    }

    allEvents.data.eventConnection.edges.push(...events.data.eventConnection.edges.reverse());
  }

  return (
    <Layout rawPageData={allEvents.data}>
      <EventsClientPage {...allEvents} />
    </Layout>
  );
}
