"use client";
import React from "react";
import Link from "next/link";
import { Container } from "../container";
import { FadeIn } from "@/components/motion-primitives/fade-in";
import { Button } from "@/components/ui/button";
import { TinaIcon } from "@/components/ui/icon";
import { useLayout } from "../layout-context";
import { FooterNavigation } from "./footer-navigation";
import { Logo } from "@/components/ui/logo";

//to-do 66: remove tina icon from footer and add privacy policy: We care about the protection of your data. Read our [Privacy Policy](http://example.com).
//to-do 66b: add heading and contact to footer

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  return (
    <Container
      as="footer"
      className="mt-24 w-full sm:mt-32 lg:mt-40 py-12"
    >
      <FadeIn>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-12 lg:grid-cols-12 3xl:grid-cols-12 px-6 gap-x-4 gap-y-16">
            <div className="col-span-2 sm:col-span-4 lg:col-span-4 3xl:col-span-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Logo className="w-5 h-5 text-white fill-current" />
                </div>
                <span className="font-playfair font-bold text-lg">
                  Red Cross
                </span>
              </div>
              <p className="text-gray-400">
                Preventing and alleviating human suffering wherever it may be
                found.
              </p>
            </div>
             <div className="col-span-2 sm:col-span-8 lg:col-span-8 3xl:col-span-8">
              <FooterNavigation />
             </div>
          </div>
          <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-primary/10 pt-12">
            <Link href="/" aria-label="Home">
              <Logo
                className="h-8" //fillOnHover
              ></Logo>
            </Link>
            <Link href="/" aria-label="go home">
              <TinaIcon parentColor={header!.color!} data={header!.icon} />
            </Link>
            <p className="text-sm text-neutral-700">
              © {new Date().getFullYear()} Iglesia La Voz de la Esperanza. All
              Rights Reserved.
            </p>
            <Link href="/privacy-policy">Política de Privacidad</Link>
            <div className="order-first flex justify-center gap-6 text-sm md:order-last md:justify-end">
              {footer?.social?.map((link, index) => (
                <Link
                  key={`${link!.icon}${index}`}
                  href={link!.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TinaIcon
                    data={{ ...link!.icon, size: "small" }}
                    className="text-muted-foreground hover:text-primary block"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};
