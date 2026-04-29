"use client";

import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Gauge,
  PlugZap,
  Search,
  Wrench,
  Workflow,
  Zap,
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

const engagementTracks = [
  {
    number: "01",
    label: "Audit",
    tagline: "Find what’s costing you",
    timeline: "2–3 weeks",
    icon: Search,
    who:
      "You know something is off but can’t pinpoint where the time, money, or momentum is going.",
    happens: [
      "Full workflow and systems review",
      "Interviews with key team members",
      "Map of where the friction, gaps, and redundancies are",
      "Written findings with clear prioritized recommendations",
    ],
    takeaway:
      "A clear picture of what to fix first and why — not a generic report, a working diagnosis.",
  },
  {
    number: "02",
    label: "Sprint",
    tagline: "Fix the biggest drag",
    timeline: "4–6 weeks",
    icon: Zap,
    who:
      "You’ve identified the problem. Now you need someone to come in and actually fix it alongside your team.",
    happens: [
      "Focus on one high-impact workflow or system problem",
      "Redesign the process with the team, not around them",
      "Implement the changes and confirm they hold",
      "Train whoever owns it going forward",
    ],
    takeaway:
      "A working solution your team understands, owns, and can sustain without outside help.",
  },
  {
    number: "03",
    label: "Build",
    tagline: "Build the operating system",
    timeline: "6–12 weeks",
    icon: Wrench,
    who:
      "You’re growing and need the infrastructure to support it — roles, systems, workflows, and handoffs that actually work at scale.",
    happens: [
      "Full operating system design for the current stage",
      "Tool integration and workflow automation where it makes sense",
      "Documented processes and clear ownership at every step",
      "Onboarding paths so new hires ramp fast",
    ],
    takeaway:
      "A business that runs like it has twice the team — without adding headcount.",
  },
];

const caseStudies = [
  {
    category: "Revenue & Workflow Audit",
    tag: "Operations",
    timeline: "8-week engagement (Audit → Sprint)",
    headline: "$400K in annual revenue was leaking through a workflow nobody questioned.",
    environment: "Regional service company, 45 employees, 3 locations",
    situation:
      "A multi-location service business had grown from 12 to 45 people in three years. Revenue was up but margins were shrinking and nobody could explain why. The owner was working 70-hour weeks and still getting blindsided by missed jobs, billing errors, and customer complaints.",
    found:
      "The company was losing approximately $400K annually across three areas no one was tracking: unbilled labor from manual time entry gaps, revenue leakage from inconsistent quoting, and customer churn from slow follow-up on service issues. The root cause was not people — it was a patchwork of systems bolted together during growth.",
    changed:
      "Mapped every workflow from customer inquiry to final invoice. Eliminated 3 redundant tools. Consolidated job tracking, quoting, and billing into one system with clean handoffs and clear ownership at every stage. Rebuilt the quoting workflow from a 4-day manual process to a same-day response.",
    results: [
      "$400K in identified revenue leakage addressed in the first 90 days",
      "Quoting turnaround: 4 days → same day",
      "Owner’s weekly hours: 70 → 45",
      "Team handled 30% more job volume without adding headcount",
      "One system replaced six",
    ],
  },
  {
    category: "Government Operations",
    tag: "Government",
    timeline: "6-week engagement (Audit → Sprint)",
    headline:
      "22-day approval cycle. 11 stakeholders. Zero documented process. We fixed it without breaking compliance.",
    environment: "Federal contractor supporting a mid-size defense program",
    situation:
      "A government contractor supporting a Department of Defense program had an intake and approval process that averaged 22 days per request. Leadership was getting weekly escalations. The team was frustrated. Deadlines were slipping.",
    found:
      "The 22-day cycle contained roughly 8 days of actual work and 14 days of waiting — requests sitting in inboxes, bouncing between reviewers who were not sure if they were the decision-maker, and cycling through redundant compliance checks added over time.",
    changed:
      "Mapped the actual process against the intended process. Consolidated two redundant review stages. Assigned clear ownership at every step with defined SLAs. Created a single-source process document that all 11 stakeholders reviewed and approved. Built in sustainment so the team could maintain it without outside support.",
    results: [
      "Approval cycle: 22 days → 8 days",
      "Weekly escalations to leadership eliminated within 60 days",
      "Zero compliance gaps introduced — same standards, less friction",
      "Process survived a 40% staff turnover without breaking",
      "Contractor received positive performance review citing operational improvement",
    ],
  },
  {
    category: "Systems Build",
    tag: "Systems Build",
    timeline: "10-week engagement (Audit → Build)",
    headline: "They were about to hire 6 people into a company that couldn’t onboard one.",
    environment: "Professional services firm, founder + 4 people, preparing to triple headcount",
    situation:
      "A founder had closed a large contract that required scaling from 5 people to 12 within six months. Nothing was documented. Every process lived in the founder’s head. The CRM, project management tool, invoicing system, and communication channels were all disconnected.",
    found:
      "The company did not have a systems problem — it had a founder-dependency problem disguised as a systems problem. The founder was the router for every decision, every client update, and every internal handoff. They had the right tools, just no connections between them and no defined workflows.",
    changed:
      "Built a lightweight operating system before the first new hire started. Defined roles, decision rights, and handoff points. Connected existing tools so data flowed without manual re-entry. Created a 30/60/90 onboarding path and documented the 5 core workflows the business runs on.",
    results: [
      "First 3 new hires fully productive in 11 days, down from 7 weeks",
      "Founder removed as bottleneck for day-to-day decisions",
      "Systems held through the full scale from 5 to 14 people",
      "Zero tools added — existing stack was connected properly",
      "Revenue per employee increased 35% within 6 months",
    ],
    framing: "They hired into a system, not into chaos.",
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

      <section id="engagement-model" className="bg-[#111827] px-4 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Engagement model</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              How an engagement works.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#E2E8F0] md:text-lg md:leading-8">
              Every situation is different. Most engagements fall into one of three tracks —
              sometimes one, sometimes a sequence.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {engagementTracks.map((track) => {
              const Icon = track.icon;

              return (
                <article
                  key={track.label}
                  className="relative flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-[#D6A84F]/40 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-md bg-[#D6A84F] text-[#0A0D14]">
                      <Icon size={22} />
                    </div>
                    <div className="text-right">
                      <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#CBD5E1]">
                        {track.timeline}
                      </span>
                      <p className="mt-4 font-mono text-4xl font-semibold text-white/12">{track.number}</p>
                    </div>
                  </div>

                  <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-white">
                    {track.label}
                  </h3>
                  <p className="mt-2 text-base font-semibold text-[#D6A84F]">{track.tagline}</p>
                  <p className="mt-5 text-sm italic leading-6 text-[#94A3B8]">{track.who}</p>

                  <div className="mt-6">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
                      What happens
                    </p>
                    <ul className="mt-4 grid gap-3">
                      {track.happens.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-[#E2E8F0]">
                          <CheckCircle2 size={17} className="mt-1 shrink-0 text-[#D6A84F]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 border-l-2 border-[#D6A84F] bg-[#0A0D14]/60 p-4">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
                      You walk away with
                    </p>
                    <p className="mt-3 text-base font-semibold leading-7 text-white">{track.takeaway}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-5 rounded-xl border border-white/10 bg-white/[0.05] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="max-w-3xl text-base leading-7 text-[#E2E8F0]">
              Not sure which track fits? The Snapshot diagnostic is a good starting point. Or reach
              out directly — most conversations start with a straightforward question about
              what&rsquo;s slowing you down.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <CTAButton href="#contact">Start the Conversation</CTAButton>
              <Link
                href="/snapshot"
                className="inline-flex h-14 items-center justify-center rounded-md px-2 text-sm font-semibold text-[#D6A84F] transition hover:text-[#E8BE63]"
              >
                Take the Snapshot first →
              </Link>
            </div>
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
              Representative Engagements
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#E2E8F0] md:text-lg md:leading-8">
              Details composited and anonymized. The patterns are real.
            </p>
          </div>

          <div className="mt-10 grid gap-5">
            {caseStudies.map((study) => (
              <details
                key={study.headline}
                className="group rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)] transition hover:border-[#D6A84F]/40 sm:p-6 md:open:bg-white/[0.08]"
              >
                <summary className="flex cursor-pointer list-none flex-col gap-5 marker:hidden md:flex-row md:items-start md:justify-between [&::-webkit-details-marker]:hidden">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
                        {study.tag}
                      </span>
                      <span className="text-sm font-semibold text-[#94A3B8]">{study.category}</span>
                    </div>
                    <h3 className="mt-5 max-w-5xl text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                      “{study.headline}”
                    </h3>
                    <p className="mt-4 text-sm font-semibold text-[#CBD5E1]">{study.environment}</p>
                  </div>
                  <div className="flex shrink-0 items-center justify-between gap-4 md:flex-col md:items-end">
                    <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#CBD5E1]">
                      {study.timeline}
                    </span>
                    <ChevronDown
                      size={22}
                      className="text-[#D6A84F] transition group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </div>
                </summary>

                <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-[1fr_0.9fr]">
                  <div className="grid gap-6">
                    <CaseStudyBlock title="The situation" body={study.situation} />
                    <CaseStudyBlock title="What I found" body={study.found} />
                    <CaseStudyBlock title="What changed" body={study.changed} />
                  </div>

                  <div className="rounded-lg border border-white/10 bg-[#0A0D14]/70 p-5">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
                      The result
                    </p>
                    <ul className="mt-5 grid gap-3">
                      {study.results.map((result) => (
                        <li key={result} className="flex gap-3 text-base font-semibold leading-7 text-white">
                          <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#D6A84F]" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                    {study.framing ? (
                      <p className="mt-6 border-t border-white/10 pt-5 text-base font-semibold leading-7 text-[#D6A84F]">
                        Framing: “{study.framing}”
                      </p>
                    ) : null}
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="text-xl font-semibold leading-7 text-white">Dealing with something similar?</p>
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
              expectationText="After you send this: I’ll review your situation and respond within 1 business day with an honest read on whether an audit, sprint, or build path makes sense. No pitch. No obligation. Just a straight answer."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function CaseStudyBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">{title}</p>
      <p className="mt-3 text-base leading-7 text-[#CBD5E1]">{body}</p>
    </div>
  );
}
