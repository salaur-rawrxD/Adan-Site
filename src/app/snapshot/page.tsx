import type { Metadata } from "next";
import { Navbar } from "@/components/site";
import { SnapshotDiagnostic } from "./snapshot-diagnostic";

export const metadata: Metadata = {
  title: "Revenue Friction Snapshot | Adan Aispuro",
  description:
    "Quick diagnostic to find where your business is losing time, revenue, and operational clarity. Takes about 2 minutes.",
  alternates: {
    canonical: "https://www.withadan.com/snapshot/",
  },
  openGraph: {
    type: "website",
    title: "Revenue Friction Snapshot | Free Diagnostic",
    description:
      "Find where your business is losing time, revenue, and operational clarity. Quick 2-minute diagnostic.",
    url: "https://www.withadan.com/snapshot/",
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
    title: "Revenue Friction Snapshot | Free Diagnostic",
    description:
      "Find where your business is losing time, revenue, and operational clarity. Quick 2-minute diagnostic.",
    images: ["https://www.withadan.com/og-image.png"],
  },
};

export default function SnapshotPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0A0D14] text-[#F8FAFC]">
      <Navbar />
      <SnapshotDiagnostic />
    </main>
  );
}
