"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../LayoutContext";
import { Container } from "../../Container";
import { FadeIn } from "../../FadeIn";
import { FooterNavigation } from "../../FooterNavigation";
import { Logo } from "../../Logo";

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
          <Link href="/" aria-label="go home">
            <Icon
              parentColor={header!.color!}
              data={header!.icon}
            />
          </Link>
          <Link href="/" aria-label="Home">
            <Logo className="h-8" //to-do: fix fillOnHover
            >
              La Voz
            </Logo>
          </Link>
          <p className="text-sm text-neutral-700">
            © {new Date().getFullYear()} La Voz De La Esperanza, All rights reserved
          </p>
        </div>
      </FadeIn>
    </Container>
    /*
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mt-12 flex flex-wrap items-center gap-6 border-t py-6 flex-col md:flex-row md:justify-between">

          <div className="order-last flex justify-center md:order-first md:justify-start">
            <Link href="/" aria-label="go home">
              <Icon
                parentColor={header!.color!}
                data={header!.icon}
              />
            </Link>
            <span className="self-center text-muted-foreground text-sm ml-2">© {new Date().getFullYear()} {header?.name}, All rights reserved</span>
          </div>

          <div className="order-first flex justify-center gap-6 text-sm md:order-last md:justify-end">
            {footer?.social?.map((link, index) => (
              <Link key={`${link!.icon}${index}`} href={link!.url!} target="_blank" rel="noopener noreferrer" >
                <Icon data={{ ...link!.icon, size: 'small' }} className="text-muted-foreground hover:text-primary block" />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
    */
  );
}
