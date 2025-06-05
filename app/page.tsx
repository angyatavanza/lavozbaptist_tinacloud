import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";
//import RootLayout from "@/components/layout/RootLayout";
export const revalidate = 300;

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  const eventRes = await client.queries.eventConnection();
  const events = eventRes.data.eventConnection.edges!
    .map((edge) => edge!.node!)
    .filter((event) => !!event.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} 
       events={events}/>
    </Layout>
  );
}
