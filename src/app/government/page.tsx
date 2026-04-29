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
  Footer,
  ContactForm,
  Hero,
  Navbar,
  SectionHeader,
  StaggerGrid,
} from "@/components/site";

const operatingBackground = [
  {
    title: "Field and mission operations",
    body: "Experience in military environments where unclear workflows, handoffs, and fragmented information can slow coordination and affect readiness.",
    icon: ShieldCheck,
  },
  {
    title: "Public service delivery",
    body: "Experience around programs, service access, and stakeholder coordination where systems need to support reliable outcomes under real constraints.",
    icon: Building2,
  },
  {
    title: "Federal and health technology",
    body: "Experience with web and mobile technology in environments where reliability, usability, and governance matter as much as the interface.",
    icon: FileCheck2,
  },
  {
    title: "Enterprise systems execution",
    body: "Experience translating operational problems into product direction, workflow improvements, and systems that teams can actually use.",
    icon: Network,
  },
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
  "Support change management and stakeholder buy-in",
  "Create process documentation and knowledge transfer",
];

const publicSectorConstraints = [
  {
    title: "Documentation first",
    body: "Every engagement produces clear, auditable documentation that survives personnel transitions and audit cycles.",
  },
  {
    title: "Stakeholder alignment built in",
    body: "Process changes are reviewed with affected stakeholders before implementation — not after.",
  },
  {
    title: "No shortcuts on compliance",
    body: "Work is scoped within existing regulatory, procurement, and security frameworks. Not around them.",
  },
  {
    title: "Sustainment by design",
    body: "Solutions are built so your internal team can own and maintain them without ongoing outside support.",
  },
];

export default function GovernmentPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0A0D14]">
      <Navbar />
      <Hero
        eyebrow="Government + public sector"
        title="Operational and system improvements designed for real-world constraints."
        subtitle="Improving workflows, system integration, and operational visibility in environments where constraints are real—and outcomes directly impact citizens and service members."
        primary={{ label: "Start a Conversation", href: "#government-contact" }}
        signals={["Operational", "Mission-aware", "Reliable", "Practical"]}
        restrained
      />

      <section className="bg-white px-4 pb-6 sm:px-6 md:pb-10">
        <p className="mx-auto max-w-7xl text-base leading-7 text-[#475569]">
          Government and public sector work moves differently. Procurement takes time.
          Stakeholders multiply. Documentation is not optional. I&rsquo;ve worked in these
          environments and build engagements around those realities — not despite them.
        </p>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              eyebrow="Background"
              title="Built from operating in constrained systems."
              body="Experience operating within military, federal, and enterprise environments where systems, workflows, and data directly impact execution and outcomes."
            />
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#475569]">
              Built from experience inside the systems, workflows, and constraints that public
              sector and military teams operate in. Not from the outside looking in.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-[#64748B]">
              Background includes U.S. Army, U.S. Air Force, Defense Health Agency, U.S. Census
              Bureau, Amazon, and product strategy work with technical delivery teams.
            </p>
          </div>
          <StaggerGrid className="grid gap-4 sm:grid-cols-2">
            {operatingBackground.map((item) => (
              <Card key={item.title} title={item.title} body={item.body} icon={item.icon} compact />
            ))}
          </StaggerGrid>
        </div>
        <div className="mx-auto mt-8 grid max-w-7xl gap-4 md:grid-cols-2">
          <Card
            title="Where systems break down"
            body="This experience provides a practical understanding of how systems break down in real environments—where legacy tools, fragmented workflows, and limited visibility create friction that slows execution. These issues do not just create inefficiency; they affect coordination, program delivery, outcomes, and timely access to services and resources for citizens."
            icon={Workflow}
          />
          <Card
            title="Where the work focuses now"
            body="The focus now is on identifying those breakdowns and designing systems that improve clarity, reduce manual effort, and enable faster, more reliable outcomes. In military environments, the same challenges can affect operational effectiveness and readiness for service members, where clarity and speed are critical."
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="bg-[#0A0D14] px-4 py-16 text-white sm:px-6 md:py-24">
        <SectionHeader
          eyebrow="Operational context"
          title="I understand the constraints."
          body="Public sector and military environments need practical systems that can survive compliance, legacy infrastructure, handoffs, and real operational pressure. Work is grounded in environments where outcomes are tied to serving the public effectively and maintaining readiness across teams and operations."
          dark
        />
        <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {constraints.map((item) => (
            <Card key={item} title={item} icon={FileCheck2} dark compact />
          ))}
        </StaggerGrid>
      </section>

      <section id="government-approach" className="px-4 py-16 sm:px-6 md:py-24">
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
        <p className="mx-auto mt-8 max-w-4xl text-base leading-7 text-[#475569]">
          Improvements are designed to support more reliable service delivery, clearer
          decision-making, and stronger operational readiness, ensuring both citizens and service
          members are better supported by the systems they rely on.
        </p>
      </section>

      <section className="bg-[#0A0D14] px-4 py-16 text-white sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
              Public sector constraints
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl">
              Built for the constraints of public sector work.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#E2E8F0] md:text-lg md:leading-8">
              Practical systems work needs to reduce risk as much as it improves speed. The goal is
              clarity that can be reviewed, adopted, and sustained.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {publicSectorConstraints.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.18)]"
              >
                <div className="border-l-2 border-[#D6A84F] pl-4">
                  <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#CBD5E1]">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EEF2F7] px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            eyebrow="Engagement pathways"
            title="Structured for practical partnership conversations."
            body="For engagements that benefit from formal procurement vehicles, I work through qualified partner pathways that meet compliance and certification requirements."
          />
          <div className="grid gap-4">
            <Card
              title="Careful by design"
              body="This page does not imply personal certification ownership, guarantee awards, or suggest procurement shortcuts. It is designed for qualified, partner-led conversations where the pathway fits the work."
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
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#94A3B8]">
              All engagements are scoped to respect procurement timelines, compliance documentation
              requirements, stakeholder review cycles, and sustainment planning. Work is structured
              to complement your existing processes — not shortcut them.
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
          <p className="relative z-10 text-xs leading-6 text-[#94A3B8] lg:col-span-2">
            Engagements are scoped individually. Work does not include legal, regulatory, or
            acquisition advisory services. For compliance-sensitive programs, all work is
            coordinated with your designated compliance and procurement leads.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
