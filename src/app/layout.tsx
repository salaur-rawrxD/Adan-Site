import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.withadan.com"),
  title: "Adan Aispuro | Operations & Systems Consultant — Tacoma, WA",
  description:
    "Operations and systems consulting for growing businesses. I find revenue leaks, fix broken workflows, and build systems that actually work. Based in Tacoma, serving Pierce County.",
  alternates: {
    canonical: "https://www.withadan.com/",
  },
  openGraph: {
    type: "website",
    title: "Adan Aispuro | Operations & Systems Consultant",
    description:
      "I find revenue leaks, fix broken workflows, and build systems that actually work. Based in Tacoma, serving Pierce County.",
    url: "https://www.withadan.com/",
    siteName: "Adan Aispuro",
    images: [
      {
        url: "https://www.withadan.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adan Aispuro | Operations & Systems Consultant",
    description:
      "I find revenue leaks, fix broken workflows, and build systems that actually work. Based in Tacoma, serving Pierce County.",
    images: ["https://www.withadan.com/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260429" },
      { url: "/icon.png?v=20260429", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png?v=20260429", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=20260429", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico?v=20260429" }],
    apple: [{ url: "/apple-icon.png?v=20260429", sizes: "180x180", type: "image/png" }],
  },
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
