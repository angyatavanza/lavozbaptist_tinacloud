"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, ReactNode, RefObject } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { Container } from "../container";
import client from "../../tina/__generated__/client";
import Link from "next/link";
import { LayoutProvider } from "./layout-context";
import { useLayout } from "./layout-context";
import { TinaIcon } from "../icon";
import { Logo } from "../logo";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/second-button";
import clsx from "clsx";
import { ServiceTimes } from "../service-times";
import { SocialMedia } from "../social-media";
import { Footer } from "./footer";


//done : remove tina icon 
/*
<Link href="/" aria-label="home" className="flex items-center space-x-2">
  <TinaIcon
  parentColor={header.color!}
  data={{
  name: header.icon!.name,
  color: header.icon!.color,
  style: header.icon!.style,
  }}
  />{" "}
  <span>
  {header.name}
  </span>
 </Link>
*/
//to-do 25a: add contact page to /app and add la voz logo png or svg
//to-do 25b: replace images for all templates

interface HeaderProps {
  panelId: string;
  invert?: boolean;
  icon: React.ElementType;
  expanded: boolean;
  onToggle: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

const Header = ({ panelId, invert = false, icon: Icon, expanded, onToggle, toggleRef }: HeaderProps) => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="home" className="flex items-center space-x-2">
          <Logo invert={invert}>{header.name}</Logo>
        </Link>
        <div className="hidden lg:block">
          <ul className="flex gap-8 text-sm">
            {header.nav!.map((item, index) => (
              <li key={index}>
                <Link
                  href={item!.href!}
                  className="text-muted-foreground hover:text-accent-foreground block duration-150">
                  <span>{item!.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-x-8">
          <Button href="/contact" invert={invert}>Contacto</Button>
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={panelId}
            className={clsx(
              "group -m-2.5 rounded-full p-2.5 transition",
              invert ? "hover:bg-white/10" : "hover:bg-purple-800/10"
            )}
            aria-label="Toggle navigation"
          >
            <Icon className={clsx(
              "h-6 w-6",
              invert ? "fill-white group-hover:fill-neutral-200" : "fill-purple-800 group-hover:fill-neutral-500"
            )} />
          </button>
        </div>
      </div>
    </Container>
  );
};

const NavigationRow = ({ children }: { children: ReactNode }) => {
  return (
    <div className="even:mt-px sm:bg-purple-800">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  );
};

const NavigationItem = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-purple-800 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-purple-600 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-purple-700 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  );
};

const Navigation = () => {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/events">Eventos</NavigationItem>
        <NavigationItem href="/serve">Servir</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/resources">Recursos</NavigationItem>
        <NavigationItem href="/give">Haz tu Donación</NavigationItem>
      </NavigationRow>
    </nav>
  );
};

type RootLayoutInnerProps = {
  children: ReactNode;
};

const RootLayoutInner = ({ children }: RootLayoutInnerProps) => {
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if ((event.target as HTMLElement).closest("a")?.getAttribute("href") === window.location.href) {
        setExpanded(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div className="absolute left-0 right-0 top-2 z-40 pt-14" aria-hidden={expanded ? true : undefined} inert={expanded ? true : undefined}>
          <Header
            panelId={panelId}
            icon={HiMenuAlt4}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((prev) => !prev);
              window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }));
            }}
          />
        </div>
        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? "auto" : "0.5rem" }}
          className="relative z-50 overflow-hidden bg-purple-800 pt-2"
          aria-hidden={expanded ? undefined : true}
          inert={expanded ? undefined : true}
        >
          <motion.div layout className="bg-purple-600">
            <div ref={navRef} className="bg-purple-800 pb-16 pt-14">
              <Header
                invert
                panelId={panelId}
                icon={IoMdClose}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((prev) => !prev);
                  window.setTimeout(() => openRef.current?.focus({ preventScroll: true }));
                }}
              />
            </div>
            <Navigation />
            <div className="relative bg-purple-800 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-purple-600">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      Nuestra ubicacion y tiempos de servicios
                    </h2>
                    <ServiceTimes invert className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" />
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      Síguenos
                    </h2>
                    <SocialMedia className="mt-6" invert />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>
      <motion.div layout style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="relative flex flex-auto overflow-hidden bg-white pt-14">
        <motion.div layout className="relative isolate flex w-full flex-col pt-9">
          <main className="w-full flex-auto">{children}</main>
          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

type RootLayoutProps = {
  children: ReactNode;
};

export const RootLayout = ({ children }: RootLayoutProps) => {
  const pathName = usePathname();
  return (
      <RootLayoutInner key={pathName}>{children}</RootLayoutInner>
  );
};
