import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visometer",
  description:
    "a app that shows how the visibility will look at certain places in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-primary m-0 + text-tersiary"}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
