import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChangebleThemeProvider } from "@/components/thmes/changeble-theme-provider";
import "./globals.css";


import { Header } from "@/components/header";

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
    <html suppressHydrationWarning lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ChangebleThemeProvider>
        <Header />
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
        </ChangebleThemeProvider>
      </body>
    </html>
  );
}
