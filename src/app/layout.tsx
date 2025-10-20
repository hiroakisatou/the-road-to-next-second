import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import { homePath, ticketsPath } from "@/path";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Road to Next",
  description: "My Road to Next application...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <nav
          className="
              supports-backdrop-blur:bg-background/60
              fixed left-0 right-0 top-0 z-20
              border-b bg-background/95 backdrop-blur
              w-full flex py-2.5 px-5 justify-betweenn
            "
        >
          <div>
            <Link
              href={homePath()}
              className={buttonVariants({ variant: "outline" })}
            >
              Home
            </Link>
          </div>
          <div>
            <Link href={ticketsPath()} className={buttonVariants({ variant: "outline" })}>
              Tickets
            </Link>
          </div>
        </nav>
        <main
          className="
            min-h-screen flex-1
            overflow-y-auto overflow-x-hidden
            py-24 px-4 md:px-8
            bg-secondary/20
            flex flex-col
            "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
