"use client";
import React from "react";
import Link from "next/link";
import { Container } from "../container";
import { FadeIn } from "../fade-in";
import { Button } from "../ui/button";
import { TinaIcon } from "../icon";
import { useLayout } from "./layout-context";
import { FooterNavigation } from "./footer-navigation";
import { Logo } from "../logo";

//to-do 66: remove tina icon from footer and add privacy policy: We care about the protection of your data. Read our [Privacy Policy](http://example.com).
//to-do 66b: add heading and contact to footer 

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;
  
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="flex lg:justify-end">
            <FooterNavigation />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-purple-800/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" //fillOnHover
            >
              La Voz
            </Logo>
          </Link>
           <Link href="/" aria-label="go home">
              <TinaIcon
                parentColor={header!.color!}
                data={header!.icon}
              />
            </Link>
          <p className="text-sm text-neutral-700">
            © {new Date().getFullYear()} Iglesia La Voz de la Esperanza. All Rights Reserved.
          </p>
          <div className="order-first flex justify-center gap-6 text-sm md:order-last md:justify-end">
            {footer?.social?.map((link, index) => (
              <Link key={`${link!.icon}${index}`} href={link!.url!} target="_blank" rel="noopener noreferrer" >
                <TinaIcon data={{ ...link!.icon, size: 'small' }} className="text-muted-foreground hover:text-primary block" />
              </Link>
            ))}
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};