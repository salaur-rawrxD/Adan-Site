import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CTAButton, Footer, ContactForm, Navbar, SectionHeader } from "@/components/site";

export const metadata: Metadata = {
  title: "Operations & Systems Consultant | Tacoma & Pierce County",
  description:
    "Help for Tacoma businesses with broken workflows, manual processes, and tool sprawl. Fix inefficiency. Improve revenue.",
  alternates: {
    canonical: "https://www.withadan.com/tacoma/",
  },
};

const focusAreas = [
  "Service businesses: home services, HVAC, plumbing, logistics, healthcare support",
  "Multi-location operations: regional franchises, branch operations",
  "Operations-heavy SMBs: manufacturing, fulfillment, field services",
  "Businesses with internal teams: staffing challenges drive efficiency needs",
  "Growing companies that have outgrown their original systems",
];

const approach = [
  {
    title: "Diagnose the revenue and workflow drag",
    body: "Identify where customers drop off, where teams waste time, and where tools create friction.",
  },
  {
    title: "Design the system path",
    body: "Map what needs to change, what can consolidate, and what should be owned versus outsourced.",
  },
  {
    title: "Reduce unnecessary SaaS and tool sprawl",
    body: "Cut tools that do not earn their place. Consolidate what remains.",
  },
  {
    title: "Support execution",
    body: "When systems are needed, coordinate with trusted designers and engineers to move fast.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Adan Aispuro",
  description: "Operations and systems consultant in Tacoma & Pierce County",
  url: "https://www.withadan.com/tacoma/",
  areaServed: [
    {
      "@type": "City",
      name: "Tacoma",
      address: {
        "@type": "PostalAddress",
        addressRegion: "WA",
        addressCountry: "US",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Pierce County",
      address: {
        "@type": "PostalAddress",
        addressRegion: "WA",
        addressCountry: "US",
      },
    },
  ],
  serviceType: ["Business Consulting", "Operations Improvement", "Systems Design"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "adan@withadan.com",
    contactType: "Sales",
  },
};

export default function TacomaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0A0D14]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />

      <section className="relative overflow-hidden bg-[#0A0D14] px-4 pb-16 pt-28 text-white sm:px-6 md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(214,168,79,0.24),transparent_30%),radial-gradient(circle_at_82%_16%,rgba(100,116,139,0.22),transparent_34%),linear-gradient(135deg,#0A0D14_0%,#111827_54%,#05070B_100%)]" />
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
            Tacoma operations consultant
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl">
            Operations Systems Consultant Serving Tacoma &amp; Pierce County
          </h1>
          <div className="mt-7 grid max-w-4xl gap-5 text-lg leading-8 text-[#E2E8F0] md:text-xl md:leading-9">
            <p>
              Many Tacoma and Pierce County businesses operate with systems that have grown
              without structure, creating friction that silently costs revenue.
            </p>
            <p>
              Most friction in a growing business is not mysterious. It is disconnected tools,
              unclear ownership, and processes that made sense at 5 people but break at 15.
              That is what I fix.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="/snapshot">Run the Snapshot</CTAButton>
            <CTAButton href="#tacoma-contact" variant="secondary">
              Start a Conversation
            </CTAButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="Local business friction"
          title="Growth creates drag when the system cannot keep up."
          body="Most small and mid-size businesses in the area do not have an operations problem. They have a growth problem that looks like an operations problem."
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
          <LocalSeoCard title="Growing businesses inherit system complexity">
            <p>
              Regional businesses often inherit disconnected tools and manual processes as they
              scale. A home services company might use one tool for scheduling, another for
              invoicing, a spreadsheet for inventory, and tribal knowledge for pricing. A
              multi-location operation runs different workflows in different locations.
            </p>
            <p>
              This works until it does not. Revenue leaks. Customers drop off. Teams spend time on
              workarounds instead of high-value work. The goal is to make the system visible,
              simplify what is messy, and give operators a clearer way to run the business.
            </p>
          </LocalSeoCard>

          <LocalSeoCard title="Too Many Tools, Invisible Costs">
            <p>
              Pierce County businesses often operate with eight to fifteen different SaaS
              platforms. Each is helpful individually. Together, they trap data, duplicate work,
              and create decision paralysis.
            </p>
            <p>
              The owner cannot see performance clearly because insights live across platforms. The
              team wastes time pulling reports manually. And every month, the business pays for
              tools that do not talk to each other. The point is not to reject software. It is to
              keep what works, cut what does not, and organize the tools around the workflow.
            </p>
          </LocalSeoCard>

          <LocalSeoCard title="Lack of Visibility Leads to Slow Decisions">
            <p>
              When performance data is fragmented, decisions slow down. A logistics business cannot
              see which routes are most profitable. A service business cannot see where customers
              drop off in the intake process. A retail operation cannot quickly spot inventory or
              cash flow problems.
            </p>
            <p>
              Better systems give owners and teams the visibility they need to move fast. Business
              visibility systems should make the important parts of the operation easier to see,
              not bury them inside disconnected dashboards or reports that require constant manual
              cleanup.
            </p>
          </LocalSeoCard>
        </div>
      </section>

      <section className="bg-[#EEF2F7] px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeader
            eyebrow="Who this helps"
            title="This work focuses on operations-heavy businesses."
            body="The strongest fit is a business where customer experience, internal process, and business systems all touch revenue."
          />
          <div className="grid gap-3">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.05)]"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#D6A84F]" size={18} />
                <p className="font-semibold leading-6 text-[#0A0D14]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0D14] px-4 py-16 text-white sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="How operations improvement works"
          title="A practical path from diagnosis to execution."
          body="An operations consultant should help clarify what is broken, what needs to change, and how the business can move without creating another layer of complexity."
          dark
        />
        <div className="mx-auto mt-10 grid max-w-7xl gap-4 md:grid-cols-2">
          {approach.map((item, index) => (
            <article
              key={item.title}
              className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.16)]"
            >
              <p className="font-mono text-sm font-semibold text-[#D6A84F]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-[#CBD5E1]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <SectionHeader
            eyebrow="Background"
            title="Product strategy, systems execution, and operational experience."
            body="My background combines product strategy, systems execution, and operational experience inside complex environments: military, government, and enterprise."
          />
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-8">
            <div className="grid gap-5 text-base leading-8 text-[#475569]">
              <p>
                I have worked inside the U.S. Army, U.S. Air Force, Defense Health Agency, Census
                Bureau, and Amazon on systems where efficiency directly impacts outcomes.
              </p>
              <p>
                The same discipline that works inside complex government programs works for a
                12-person service business trying to stop losing revenue to bad handoffs.
              </p>
              <p>
                That experience informs how I approach regional business problems: practical,
                execution-focused, and tied to real business impact. For a Tacoma owner, that means
                translating complex operations into systems people can actually use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="tacoma-contact" className="px-4 pb-16 sm:px-6 md:pb-24">
        <div className="relative mx-auto overflow-hidden rounded-xl bg-[#0A0D14] p-6 text-white shadow-[0_30px_100px_rgba(10,13,20,0.25)] sm:p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(214,168,79,0.24),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(100,116,139,0.24),transparent_34%)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
                Tacoma &amp; Pierce County
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                See Where Your Business May Be Losing Efficiency
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#E2E8F0]">
                This page is built for{" "}
                <Link href="/" className="font-semibold text-white underline decoration-[#D6A84F] underline-offset-4">
                  commercial businesses
                </Link>{" "}
                that need clearer operations, better business systems, and faster execution.
              </p>
            </div>
            <div className="grid gap-4">
              <CtaPanel
                title="Run the Snapshot"
                body="Take a quick diagnostic to identify workflow and revenue friction."
                href="/snapshot"
              />
              <div className="rounded-lg border border-white/10 bg-white/[0.07] p-5">
                <p className="mb-4 text-lg font-semibold text-white">Start a Conversation</p>
                <ContactForm
                  variant="dark"
                  source="Tacoma local SEO page inquiry"
                  submitLabel="Send Inquiry"
                  successMessage="Thanks. I’ll review your inquiry and get back to you shortly."
                  defaultMessage="I would like to talk about what is slowing my operation."
                />
              </div>
              <CtaPanel
                title="Commercial homepage"
                body="See the broader business systems and revenue positioning."
                href="/"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function LocalSeoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] md:p-6">
      <h2 className="text-2xl font-semibold leading-tight tracking-tight text-[#0A0D14]">{title}</h2>
      <div className="mt-5 grid gap-4 text-base leading-7 text-[#475569]">{children}</div>
    </article>
  );
}

function CtaPanel({ title, body, href }: { title: string; body: string; href: string }) {
  const content = (
    <span className="flex items-center justify-between gap-4">
      <span>
        <span className="block text-lg font-semibold text-white">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-[#CBD5E1]">{body}</span>
      </span>
      <ArrowRight className="shrink-0 text-[#D6A84F]" size={20} />
    </span>
  );

  const className =
    "rounded-lg border border-white/10 bg-white/[0.07] p-4 transition hover:border-[#D6A84F]/70 hover:bg-white/[0.1]";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}
