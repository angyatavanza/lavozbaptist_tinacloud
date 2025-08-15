import React from "react";
import { Metadata } from "next";
import {
  Inter as FontSans,
  Lato,
  Nunito,
  Roboto,
  Libre_Baskerville,
  Libre_Franklin,
} from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoDialogProvider } from "@/components/ui/video-dialog-context";
import VideoDialog from "@/components/ui/video-dialog";
import "@/styles.css";
import "video.js/dist/video-js.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  weight: ["400", "700"],
});

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "La Voz de la Esperanza",
  description: "Iglesia La Voz de La Esperanza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        fontSans.variable,
        nunito.variable,
        lato.variable,
        libre_franklin.variable,
        libre_baskerville.variable,
        roboto.variable
      )}
    >
      <body className="min-h-screen bg-primary-background font-roboto antialiased">
        <VideoDialogProvider>
          {children}
          <VideoDialog />
        </VideoDialogProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
