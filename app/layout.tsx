import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://thebiblebite.com"),
  title: {
    default: "The Bible Bite | Small Bites. Big Truths.",
    template: "%s | The Bible Bite",
  },
  description:
    "A quick daily Bible quiz, bite-sized lesson, and simple faith application for each day.",
  openGraph: {
    title: "The Bible Bite",
    description: "Small bites. Big truths.",
    url: "https://thebiblebite.com",
    siteName: "The Bible Bite",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
