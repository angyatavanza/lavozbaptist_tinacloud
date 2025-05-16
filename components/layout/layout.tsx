import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./LayoutContext";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/Header";
import { Footer } from "./nav/Footer";
import { RootLayout } from "./RootLayout";
type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  },
    {
      fetchOptions: {
        next: {
          revalidate: 60,
        },
      }
    }
  );

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <RootLayout>{children}</RootLayout>
    </LayoutProvider>
  );
}