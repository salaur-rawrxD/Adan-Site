import { Footer, Navbar, SnapshotTool } from "@/components/site";

export default function SnapshotPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0A0D14]">
      <Navbar />
      <section className="relative overflow-hidden bg-[#0A0D14] px-4 pb-14 pt-28 text-white sm:px-6 md:pb-20 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(214,168,79,0.24),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(100,116,139,0.22),transparent_34%),linear-gradient(135deg,#0A0D14_0%,#111827_54%,#05070B_100%)]" />
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
            Lead diagnostic
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
            Revenue Friction Snapshot
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E2E8F0] md:text-xl">
            A quick diagnostic to identify where your business may be losing revenue due to
            broken workflows, poor systems, or hidden operational inefficiencies.
          </p>
        </div>
      </section>
      <SnapshotTool />
      <Footer />
    </main>
  );
}
