"use client";
import React from "react";
import Link from "next/link";
import { Container } from "../container";
import { FadeIn } from "@/components/motion-primitives/fade-in";
import { TinaIcon } from "@/components/ui/icon";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { useLayout } from "../layout-context";
import { FooterNavigation } from "./footer-navigation";
import { Logo } from "@/components/ui/logo";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  return (
    <Container as="footer" className="mt-24 w-full md:mt-32 lg:mt-40 py-12">
      <FadeIn>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-5 px-4 md:px-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-4 3xl:col-span-4 flex flex-col gap-5 items-start">
              <Link href="/" aria-label="Home">
                <Logo className="h-16" />
              </Link>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="font-semibold text-balance text-left text-base leading-[24px] md:text-xl md:leading-[28px] max-w-md text-nav-foreground"
              >
                Nos apasiona alcanzar personas para Cristo
              </TextEffect>
            </div>
            <div className="col-span-2 md:col-span-8 lg:col-span-8 3xl:col-span-8">
              <FooterNavigation />
            </div>
          </div>
          <div className="mb-20 mt-24 flex flex-col items-center gap-3 border-t border-primary/10 pt-12">
            <div className="flex justify-center gap-5 text-sm">
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
            <p className="text-sm text-neutral-700 text-center">
              © {new Date().getFullYear()} Iglesia La Voz de la Esperanza. Todos los derechos reservados.
            </p>
            <Link href="/privacy-policy" className="text-sm underline text-neutral-700 hover:text-primary">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};
