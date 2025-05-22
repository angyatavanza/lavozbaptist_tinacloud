"use client";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, ReactNode, RefObject } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { Container } from "../Container";
import client from "../../tina/__generated__/client";
import Link from "next/link";
import { LayoutProvider } from "../layout/LayoutContext";
import { useLayout } from "../layout/LayoutContext";
import { TinaIcon } from "../icon";
import { Logo } from "../Logo";
import { Button } from "../ui_version2/Button2";
import clsx from "clsx";

interface HeaderProps {
  panelId: string;
  invert?: boolean;
  icon: React.ElementType;
  expanded: boolean;
  onToggle: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
};

export const Header = ({ panelId, invert = false, icon: Icon, expanded, onToggle, toggleRef }: HeaderProps) => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <Logo invert={invert}>La Voz</Logo>
        </Link>
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
