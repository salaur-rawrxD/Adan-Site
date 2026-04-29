"use client";

import {
  Building2,
  CheckCircle2,
  FileCheck2,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  Card,
  ExperienceList,
  Footer,
  ContactForm,
  Hero,
  Navbar,
  SectionHeader,
  StaggerGrid,
} from "@/components/site";

const background = [
  "U.S. Army — Infantry & Civil Affairs",
  "U.S. Air Force — Standardization & Evaluations, C-17 Operations",
  "Defense Health Agency — Web & Mobile Technology",
  "U.S. Census Bureau — Military & Veteran Liaison, Washington State",
  "Amazon — Customer Service Technology",
  "Seamgen — Product Strategy & Systems Execution",
];

const constraints = [
  "Fragmented systems across teams and tools",
  "Manual workarounds that slow execution",
  "Data that is difficult to access, trust, or act on",
  "Procurement, compliance, and legacy infrastructure constraints",
  "Teams expected to deliver despite limited visibility",
];

const approach = [
  "Simplify workflows",
  "Improve system integration",
  "Increase operational visibility",
  "Reduce manual effort and process friction",
  "Build practical solutions that work within real-world constraints",
];

export default function GovernmentPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0A0D14]">
      <Navbar />
      <Hero
        eyebrow="Government + public sector"
        title="Operational and system improvements designed for real-world constraints."
        subtitle="Focused on state, local, and military environments where execution, clarity, and reliability matter."
        primary={{ label: "Start a Conversation", href: "#government-contact" }}
        signals={["Operational", "Mission-aware", "Reliable", "Practical"]}
        restrained
      />

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Background"
              title="Built from inside the operating environment."
              body="Experience operating within military, federal, and enterprise environments where systems, workflows, and data directly impact execution and outcomes."
            />
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#475569]">
              Built from experience inside the systems, workflows, and constraints that public
              sector and military teams operate in. Not from the outside looking in.
            </p>
          </div>
          <ExperienceList items={background} />
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-2">
          <Card
            title="Where systems break down"
            body="This experience provides a practical understanding of how systems break down in real environments—where legacy tools, fragmented workflows, and limited visibility create friction that slows execution."
            icon={Workflow}
          />
          <Card
            title="Where the work focuses now"
            body="The focus now is on identifying those breakdowns and designing systems that improve clarity, reduce manual effort, and enable faster, more reliable outcomes."
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="bg-[#0A0D14] px-4 py-16 text-white sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="Operational context"
          title="I understand the constraints."
          body="Public sector and military environments need practical systems that can survive compliance, legacy infrastructure, handoffs, and real operational pressure."
          dark
        />
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {constraints.map((item) => (
            <Card key={item} title={item} icon={FileCheck2} dark compact />
          ))}
        </StaggerGrid>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="Approach"
          title="Solutions designed for the environment they must operate in."
          body="The work starts with operational reality: what teams need to do, what systems currently allow, and where practical improvements can create durable clarity."
        />
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approach.map((item) => (
            <Card key={item} title={item} icon={CheckCircle2} compact />
          ))}
        </StaggerGrid>
      </section>

      <section className="bg-[#EEF2F7] px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Engagement pathways"
            title="Structured for practical partnership conversations."
            body="Engagements can be structured through strategic partnerships, veteran-aligned participation models, Tribal 8(a) partner pathways, set-aside opportunities, and partner-led contracting approaches where appropriate."
          />
          <div className="grid gap-4">
            <Card
              title="Careful by design"
              body="This page does not imply personal 8(a) ownership, guarantee awards, or suggest procurement shortcuts. It is designed for qualified, partner-led conversations where the pathway fits the work."
              icon={Building2}
            />
            <Card
              title="Partnership-ready"
              body="The strongest opportunities are those where operational experience, product strategy, and systems execution can support teams already positioned to serve public-sector needs."
              icon={Network}
            />
            <Card
              title="Representative systems improvement"
              body="In a prior operational environment, fragmented reporting was consolidated into a clearer workflow, reducing repeated manual effort and giving leaders faster visibility into what needed attention."
              icon={CheckCircle2}
            />
          </div>
        </div>
      </section>

      <section id="government-contact" className="px-4 py-16 sm:px-6 md:py-24">
        <div className="relative mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-xl bg-[#0A0D14] p-6 text-white shadow-[0_30px_100px_rgba(10,13,20,0.25)] sm:p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(214,168,79,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(100,116,139,0.22),transparent_34%)]" />
          <div className="relative z-10">
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              For public sector, military, or partnership discussions
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#E2E8F0]">
              Share the environment, constraint, or partnership path you want to discuss. I&rsquo;ll
              review the inquiry and respond with the right next step.
            </p>
          </div>
          <div className="relative z-10 rounded-lg border border-white/10 bg-white/[0.07] p-5 backdrop-blur">
            <ContactForm
              variant="dark"
              source="Government page inquiry"
              submitLabel="Send Inquiry"
              successMessage="Thanks. I’ll review your inquiry and get back to you shortly."
              defaultMessage="I would like to discuss a public sector, military, or partnership opportunity."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
