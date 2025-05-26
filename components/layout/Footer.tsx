"use client";
import React from "react";
import Link from "next/link";
import { Container } from "../container";
import { FadeIn } from "../fade-in";
import { TinaIcon } from "../icon";
import { useLayout } from "./layout-context";
import { FooterNavigation } from "./footer-navigation";
import { Logo } from "../logo";

type SVGProps = React.SVGProps<SVGSVGElement>;

const ArrowIcon = (props: SVGProps) => {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  );
};

const NewsletterForm = () => {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get the latest design news, articles, resources and inspiration.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-purple-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-purple-800 focus:outline-none focus:ring-purple-800/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-purple-800 text-white transition hover:bg-purple-600"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  );
};

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;
  
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <FooterNavigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
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