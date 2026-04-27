import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adan Aispuro | Product Strategy and Systems Execution",
  description:
    "Product strategy and systems execution for growing, regional, and multi-location businesses that need revenue improvement, workflow optimization, SaaS consolidation, and digital systems that get built.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
