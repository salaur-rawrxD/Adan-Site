import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Government & Public Sector Operations | Adan Aispuro",
  description:
    "Operations and systems consulting for government contractors and public sector programs. Scoped for procurement, compliance, stakeholder alignment, and sustainment.",
  alternates: {
    canonical: "https://www.withadan.com/government/",
  },
  openGraph: {
    type: "website",
    title: "Government & Public Sector Operations | Adan Aispuro",
    description:
      "Operations and systems consulting for government contractors and public sector programs. Scoped for procurement, compliance, and sustainment.",
    url: "https://www.withadan.com/government/",
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
    title: "Government & Public Sector Operations | Adan Aispuro",
    description:
      "Operations and systems consulting for government contractors and public sector programs. Scoped for procurement, compliance, and sustainment.",
    images: ["https://www.withadan.com/og-image.png"],
  },
};

export default function GovernmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
