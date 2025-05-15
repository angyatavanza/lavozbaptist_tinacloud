"use client";
import React, { useEffect, useId, useRef, useState, PropsWithChildren, ReactNode, } from "react";
import { LayoutProvider } from "./LayoutContext";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/Header";
import { Footer } from "./nav/Footer";
import { HiMenuAlt4 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import { Container } from "../Container";
import { ServiceTimes } from "../ServiceTimes";
import { SocialMedia } from "../SocialMedia";
import Link from "next/link";

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
      <Header />
      <main className="overflow-x-hidden pt-20">
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
