import React from 'react';
import Layout from "@/components/layout/layout";
import client from "@/tina/__generated__/client";
import EventClientPage from "./client-page";
import type { EventQuery } from "@/tina/__generated__/types";

export const revalidate = 300;

export default async function EventPage({
  params,
}: {
  params: { urlSegments: string[] };
}) {
  const slugParts = params.urlSegments;
  const lastPart = slugParts[slugParts.length - 1];

  // Detect if this is a recurring instance
  const isRecurringInstance = lastPart.startsWith("rec-");
  const recurrenceIndex = isRecurringInstance
    ? parseInt(lastPart.split("-")[1], 10) - 1
    : null;

  // Strip recurring slug to get base event path
  const eventSlug = isRecurringInstance ? slugParts.slice(0, -1) : slugParts;
  const relativePath = `${eventSlug.join("/")}.mdx`;

  // Fetch the event from Tina
  const data = await client.queries.event({ relativePath });
  const event = data.data.event;

  // Get recurrence detail if this is a recurring instance
  let recurrenceDetail: NonNullable<
    EventQuery["event"]["reccuringeventdetails"]
  >[number] | null = null;

  if (
    isRecurringInstance &&
    recurrenceIndex !== null &&
    event.reccuringeventdetails &&
    event.reccuringeventdetails.length > recurrenceIndex
  ) {
    recurrenceDetail = event.reccuringeventdetails[recurrenceIndex] || null;
  }
  return (
    <Layout rawPageData={data}>
      <EventClientPage
      recurrenceDetail={recurrenceDetail}
      {...data} 
    />
    </Layout>
  );
}

export async function generateStaticParams() {
    const { data } = await client.queries.eventConnection({ first: 100 });

  // Flatten all events into base + recurring params
  const params =
    data.eventConnection.edges
      ?.map((edge) => {
        const event = edge?.node;
        if (!event) return [];

        // Base param from Tina's breadcrumbs
        const baseParam = [{ urlSegments: event._sys.breadcrumbs }];

        // Recurring params
        const recurringParams =
          event.reccuringeventdetails
            ?.filter((d) => d?.recurring)
            .map((_, idx) => ({
              urlSegments: [...event._sys.breadcrumbs, `rec-${idx + 1}`],
            })) || [];

        return [...baseParam, ...recurringParams];
      })
      .flat() || [];

  return params;
}
