import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "next-snap",
  description: "create stunning screenshots for your applications",
  twitter: {
    card: "summary_large_image",
    site: "https://next-snapper.vercel.app/",
    creator: "@ducaswtf",
    title: "next-snap - create stunning screenshots for your applications",
    images: ["/snap.png"],
  },
  openGraph: {
    locale: "pt_BR",
    url: "https://next-snapper.vercel.app/",
    title: "next-snap - create stunning screenshots for your applications",
    type: "website",
    images: ["/snap.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-black`}>
        {children} <Analytics />
      </body>
    </html>
  );
}
