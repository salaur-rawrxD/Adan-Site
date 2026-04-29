"use client";

import {
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  PlugZap,
  Workflow,
} from "lucide-react";
import {
  CTAButton,
  Card,
  Footer,
  ContactForm,
  Hero,
  MetricCard,
  Navbar,
  SectionHeader,
  StaggerGrid,
} from "@/components/site";

const proofPoints = [
  "Revenue leaks",
  "Workflow drag",
  "Tool sprawl",
  "Owned systems",
  "Fast execution",
  "Measurable ROI",
];

const problems = [
  {
    title: "Customers drop off",
    body: "Booking, intake, ordering, or onboarding friction quietly turns demand into lost revenue.",
    icon: CircleDollarSign,
  },
  {
    title: "Teams work around the system",
    body: "Manual steps, duplicate entry, and tribal knowledge slow down the people doing the work.",
    icon: Workflow,
  },
  {
    title: "Tools do not talk",
    body: "Disconnected SaaS platforms trap data, increase cost, and make decisions slower than they should be.",
    icon: PlugZap,
  },
  {
    title: "Owners lack visibility",
    body: "When performance lives across too many tools, it gets harder to see what is working and what is leaking.",
    icon: BarChart3,
  },
];

const services = [
  {
    title: "Revenue Experience Audit",
    body: "Find where customers drop off, where revenue leaks, and what should be fixed first.",
  },
  {
    title: "Workflow Optimization Sprint",
    body: "Map how the business actually runs, identify bottlenecks, and simplify the internal system.",
  },
  {
    title: "Digital Product Strategy",
    body: "Define the right portal, dashboard, booking flow, internal tool, or customer experience before building.",
  },
  {
    title: "Build Partner Support",
    body: "When execution is needed, I collaborate with a trusted network of designers and engineers to move quickly.",
  },
];

const outcomes = [
  "Increase direct revenue",
  "Reduce operational waste",
  "Improve customer conversion",
  "Reduce SaaS spend and tool sprawl",
  "Consolidate fragmented systems",
  "Increase control over core workflows",
];

const caseStudies = [
  {
    tag: "Operations",
    title: "From Manual Chaos to a System That Runs Without You",
    summary:
      "An 8-15 person service business was growing, but jobs lived across spreadsheets, text messages, and the owner’s memory.",
    changed: [
      "Mapped the full workflow from intake to job completion",
      "Identified 3 bottlenecks causing repeated rework",
      "Consolidated 4 tools into 1 connected operating system",
      "Built a simple ops playbook the team could actually follow",
    ],
    results: [
      "Onboarding time cut from 3 weeks to 5 days",
      "Owner reclaimed 10+ hours per week",
      "Team handled 40% higher job volume without adding headcount",
    ],
    frame: "The business finally worked without the owner in every conversation.",
  },
  {
    tag: "Government",
    title: "Cutting Approval Time Without Cutting Corners",
    summary:
      "A small contractor supporting an agency program had an intake and approval process taking 3-4 weeks per request.",
    changed: [
      "Audited the approval chain and mapped actual versus intended flow",
      "Identified 2 review stages duplicating work",
      "Rebuilt intake with clear ownership at each step",
      "Created a single-source process document stakeholders agreed to use",
    ],
    results: [
      "Average approval time dropped from 22 days to 8 days",
      "Escalations dropped significantly within 60 days",
      "Process sustained without ongoing consulting support",
    ],
    frame: "The same compliance standards, half the friction.",
  },
  {
    tag: "Systems Build",
    title: "Building the Operating System Before the Next Hire",
    summary:
      "A founder-led professional services team was preparing to hire, but roles, tools, and handoffs still lived in the founder’s head.",
    changed: [
      "Conducted a systems audit before hiring started",
      "Built lightweight roles, workflows, tools, and handoff points",
      "Integrated existing tools so data moved without manual entry",
      "Created a 30/60/90 onboarding path for new hires",
    ],
    results: [
      "First 2 hires onboarded in under 2 weeks",
      "Founder stopped being the bottleneck for day-to-day decisions",
      "Systems held through growth without needing a rebuild",
    ],
    frame: "They hired into a system, not into chaos.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0A0D14]">
      <Navbar />
      <Hero
        eyebrow="Commercial systems strategy"
        title="Where is your business losing money right now?"
        subtitle="I identify revenue leaks, fix broken workflows, and help build systems that actually work."
        primary={{ label: "Run the Snapshot", href: "/snapshot" }}
        secondary={{ label: "Let’s Talk", href: "#contact" }}
        localSignal={{
          text: "Based in Tacoma, helping businesses across Pierce County simplify operations and reduce inefficiency.",
          href: "/tacoma",
        }}
        signals={["Revenue", "Workflows", "Systems", "ROI"]}
      />

      <section className="border-y border-[#E2E8F0] bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto [scrollbar-width:none]">
          {proofPoints.map((point) => (
            <div
              key={point}
              className="flex shrink-0 items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#334155]"
            >
              <CheckCircle2 size={16} className="text-[#D6A84F]" />
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="Business friction"
          title="The expensive problems rarely announce themselves."
          body="Revenue loss often hides inside customer flow, team workflow, fragmented tools, and missing visibility."
        />
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {problems.map((problem) => (
            <Card key={problem.title} title={problem.title} body={problem.body} icon={problem.icon} />
          ))}
        </StaggerGrid>
      </section>

      <section className="bg-[#0A0D14] px-4 py-16 text-white sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="What I do"
          title="Strategy only matters when it turns into better systems."
          body="I help diagnose the right problem, design the solution, and support fast execution through a trusted specialist network when build work is needed."
          dark
        />
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={service.title} title={service.title} body={service.body} index={index + 1} dark />
          ))}
        </StaggerGrid>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader
            eyebrow="Execution lens"
            title="Built for speed, clarity, and ROI."
            body="The goal is not more software. It is better systems: fewer disconnected tools, stronger control over core workflows, and clearer business visibility."
          />
          <div className="grid gap-4 sm:grid-cols-3 lg:pt-12">
            <MetricCard value="10+" label="Years revenue & systems optimization" />
            <MetricCard value="4" label="Core engagement tracks" />
            <MetricCard value="1:1" label="Specialist network model" />
          </div>
        </div>
      </section>

      <section className="bg-[#EEF2F7] px-4 py-16 sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="Outcomes"
          title="Work tied to measurable business impact."
          body="Every engagement connects back to revenue improvement, operational speed, customer trust, lower tool friction, and stronger owner visibility."
        />
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((outcome) => (
            <Card key={outcome} title={outcome} icon={Gauge} compact />
          ))}
        </StaggerGrid>
      </section>

      <section className="bg-[#0A0D14] px-4 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Representative engagements</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Work that speaks for itself.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#E2E8F0] md:text-lg md:leading-8">
              Composite examples of how workflow drag, tool sprawl, and unclear ownership get
              turned into systems people can actually run.
            </p>
            <p className="mt-3 text-sm font-semibold text-[#94A3B8]">
              Details anonymized and composited from real engagement patterns.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-[#D6A84F]/40 sm:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
                    {study.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold leading-tight tracking-tight text-white">
                  {study.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[#CBD5E1]">{study.summary}</p>

                <div className="mt-6">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
                    What changed
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {study.changed.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-[#E2E8F0]">
                        <CheckCircle2 size={17} className="mt-1 shrink-0 text-[#D6A84F]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-lg border border-white/10 bg-[#0A0D14]/70 p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">Result</p>
                  <ul className="mt-4 grid gap-2">
                    {study.results.map((result) => (
                      <li key={result} className="text-sm font-semibold leading-6 text-white">
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 border-t border-white/10 pt-5 text-base font-semibold leading-7 text-white">
                  “{study.frame}”
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-xl font-semibold leading-7 text-white">Have a similar situation? Let&rsquo;s talk.</p>
            <CTAButton href="#contact">Start the Conversation</CTAButton>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="relative mx-auto overflow-hidden rounded-xl bg-[#0A0D14] p-6 text-white shadow-[0_30px_100px_rgba(10,13,20,0.25)] sm:p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(214,168,79,0.28),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(100,116,139,0.28),transparent_34%)]" />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Start here</p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                See where revenue, time, or customer trust may be leaking.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <CTAButton href="/snapshot">Run the Snapshot</CTAButton>
              <CTAButton href="#contact" variant="secondary">
                Let’s Talk
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-16 sm:px-6 md:pb-24">
        <div className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-xl bg-[#0A0D14] p-6 text-white shadow-[0_30px_100px_rgba(10,13,20,0.25)] sm:p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(214,168,79,0.22),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(100,116,139,0.22),transparent_34%)]" />
          <div className="relative z-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Contact</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Tell me what is slowing the business down.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#E2E8F0]">
              Share the workflow, revenue, customer experience, or tool problem that feels heavier
              than it should. I&rsquo;ll review it directly.
            </p>
          </div>
          <div className="relative z-10 rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
            <ContactForm
              variant="dark"
              source="Homepage contact form"
              submitLabel="Send Inquiry"
              successMessage="Thanks. I’ll review your inquiry and get back to you shortly."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
