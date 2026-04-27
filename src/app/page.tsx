"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Blocks,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Gauge,
  Layers3,
  Menu,
  MousePointer2,
  Network,
  PanelTop,
  PlugZap,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import clsx from "clsx";

const emailHref = "mailto:aispuro.adan.r@gmail.com";

const navLinks = [
  { label: "Problems", href: "#problems" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

const proofPoints = [
  "Product strategy + systems execution",
  "Fortune 500 product experience",
  "Trusted network of engineers and designers",
  "SaaS consolidation + owned systems",
  "Built for speed, clarity, and ROI",
];

const problems = [
  {
    title: "Customers drop off",
    body: "Ordering, intake, service, or customer flows create friction that quietly kills revenue.",
    icon: MousePointer2,
  },
  {
    title: "Teams rely on manual workarounds",
    body: "Spreadsheets, duplicate entry, disconnected tools, and tribal knowledge slow everything down.",
    icon: Workflow,
  },
  {
    title: "Systems don't talk to each other",
    body: "Data gets trapped, decisions get slower, and customers feel the pain.",
    icon: Network,
  },
  {
    title: "Good businesses look less capable online",
    body: "A weak digital experience can make a strong operation look average.",
    icon: PanelTop,
  },
  {
    title: "Over-reliance on expensive SaaS",
    body: "Multiple subscription tools can become costly, disconnected, and poorly matched to how the business actually runs.",
    icon: PlugZap,
  },
];

const services = [
  {
    title: "Revenue Experience Audit",
    body: "Identify where customers drop off, where revenue is leaking, and what should be fixed first.",
    stat: "01",
    icon: CircleDollarSign,
  },
  {
    title: "Workflow Optimization Sprint",
    body: "Map how the business actually runs, find bottlenecks, reduce tool sprawl, and design better internal systems.",
    stat: "02",
    icon: Gauge,
  },
  {
    title: "Digital Product Strategy",
    body: "Define the right portal, dashboard, ordering flow, internal tool, or customer experience before spending heavily on development.",
    stat: "03",
    icon: Compass,
  },
  {
    title: "Build Partner Support",
    body: "When execution is needed, I help assemble trusted designers and engineers to move quickly and deliver high-quality results.",
    stat: "04",
    icon: Blocks,
  },
];

const outcomes = [
  "Increase direct revenue",
  "Reduce operational waste",
  "Improve customer conversion",
  "Modernize outdated workflows",
  "Reduce SaaS spend and tool sprawl",
  "Consolidate fragmented systems",
  "Increase control over core workflows",
  "Improve long-term operational efficiency",
  "Replace unreliable tools with stable systems",
  "Replace manual workarounds",
  "Give owners better visibility",
  "Improve customer trust",
  "Create scalable digital systems",
];

const experience = [
  "Former Amazon product and design operations experience",
  "Veteran operator mindset",
  "Experience leading complex product initiatives",
  "Strong network of designers, engineers, and specialists",
  "Focused on revenue, workflow, SaaS consolidation, and customer experience",
];

const metrics = [
  { label: "Revenue and workflow lens", value: 3, suffix: "x" },
  { label: "Core engagement tracks", value: 4, suffix: "" },
  { label: "Specialist network model", value: 1, suffix: ":1" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 28 });
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A]">
      <motion.div
        className="fixed left-0 top-0 z-50 h-1 bg-[#D6A84F]"
        style={{ width: progressScale }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-10 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),rgba(214,168,79,0.14)_45%,transparent_70%)] blur-2xl md:block"
        style={{ left: springX, top: springY }}
      />
      <NavBar />
      <HeroSection />
      <CredibilityStrip />
      <ProblemsSection />
      <ServicesSection />
      <ExecutionSection />
      <MidPageCTA />
      <HowItWorks />
      <OutcomesSection />
      <CredibilitySection />
      <CTASection />
      <Footer />
    </main>
  );
}

function NavBar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 120], ["rgba(248,250,252,0.92)", "rgba(248,250,252,0.96)"]);
  const borderColor = useTransform(scrollY, [0, 120], ["rgba(15,23,42,0.08)", "rgba(15,23,42,0.12)"]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl"
      style={{ background, borderColor }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#" className="group flex items-center gap-3" aria-label="Adan Aispuro home">
          <LogoMark className="h-10 w-10" />
          <span className="block leading-none">
            <span className="block text-[0.7rem] font-semibold tracking-[0.24em] text-[#0A0D14] uppercase md:text-sm md:tracking-[0.32em]">
              Adan
            </span>
            <span className="mt-1 block text-[0.7rem] font-semibold tracking-[0.24em] text-[#0A0D14] uppercase md:text-sm md:tracking-[0.32em]">
              Aispuro
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#475569] transition hover:text-[#0A0D14]"
            >
              {link.label}
            </a>
          ))}
          <AnimatedButton href={emailHref} label="Let’s Talk" compact />
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-[#CBD5E1] bg-white/75 text-[#0A0D14] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-5 mb-4 rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xl md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-md px-4 py-3 text-sm font-semibold text-[#0F172A]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={emailHref}
            className="mt-2 flex items-center justify-center rounded-md bg-[#0A0D14] px-4 py-3 text-sm font-semibold text-white"
          >
            Let&rsquo;s Talk
          </a>
        </motion.div>
      ) : null}
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0A0D14] px-5 pb-14 pt-24 text-white md:min-h-[92vh] md:px-8 md:pb-20 md:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.26),transparent_28%),radial-gradient(circle_at_82%_22%,rgba(214,168,79,0.26),transparent_28%),linear-gradient(135deg,#0A0D14_0%,#111827_48%,#05070B_100%)]" />
      <div className="noise-overlay" />
      <motion.div
        aria-hidden
        className="absolute right-8 top-28 hidden w-[30rem] rotate-[-8deg] rounded-xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur md:block"
        animate={{ y: [0, -16, 0], rotate: [-8, -5, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="grid gap-3">
          <FloatingRow label="Customer flow" value="Drop-off detected" />
          <FloatingRow label="Manual intake" value="Workflow drag" />
          <FloatingRow label="Revenue path" value="Priority fix" highlight />
        </div>
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-8 hidden items-center gap-5 md:flex"
          >
            <LogoMark className="h-16 w-16 md:h-20 md:w-20" onDark />
            <div className="h-14 w-px bg-[#D6A84F]" />
            <div>
              <p className="text-2xl font-semibold uppercase leading-none tracking-[0.42em] text-white md:text-4xl">
                Adan
              </p>
              <p className="mt-3 text-2xl font-semibold uppercase leading-none tracking-[0.42em] text-white md:text-4xl">
                Aispuro
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.5em] text-[#D6A84F] md:text-sm">
                Strategy. Systems. Results.
              </p>
            </div>
          </motion.div>
          <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-[#F1F5F9] backdrop-blur md:mb-7 md:px-4">
            <Sparkles size={16} className="text-[#D6A84F]" />
            <span className="md:hidden">Strategy. Systems. Results.</span>
            <span className="hidden md:inline">
              Product strategist and systems builder for regional and multi-location businesses
            </span>
          </div>
          <h1 className="max-w-5xl text-[2.65rem] font-semibold leading-[0.98] tracking-tight text-white md:text-7xl md:leading-[0.94] lg:text-8xl">
            Fix what&apos;s costing your business money&mdash;fast.
          </h1>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-white md:hidden">
            {["Increase revenue", "Streamline ops", "Build quickly"].map((item) => (
              <div key={item} className="rounded-md border border-white/12 bg-white/[0.07] px-2 py-2">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#E2E8F0] md:mt-8 md:text-xl md:leading-8">
            <span className="md:hidden">
              I identify revenue leaks, simplify messy tools, and help build digital systems that
              improve ROI.
            </span>
            <span className="hidden md:inline">
              I help growing businesses and operator-led teams increase revenue, streamline
              operations, reduce tool sprawl, and build better digital systems. I don&apos;t just
              advise&mdash;I identify what&apos;s broken, design the solution, and help execute
              quickly with a trusted network of engineers and designers.
            </span>
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-10 md:gap-4">
            <AnimatedButton href={emailHref} label="Start a Conversation" />
            <a
              href="#approach"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/15 px-6 text-base font-semibold text-white transition hover:border-[#D6A84F]/70 hover:bg-white/10"
            >
              See How I Work
              <ChevronRight size={18} className="transition group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl">
            <div className="rounded-lg bg-[#F8FAFC] p-4 text-[#0F172A]">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#475569]">
                    Systems snapshot
                  </p>
                  <p className="mt-1 text-lg font-semibold">Revenue friction map</p>
                </div>
                <BarChart3 className="text-[#D6A84F]" size={26} />
              </div>
              <div className="mt-5 grid gap-3">
                {["Customer flow", "Team workflow", "Data visibility"].map((label, index) => (
                  <div key={label} className="rounded-md border border-[#E2E8F0] bg-white p-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold">{label}</span>
                      <span className="text-xs font-semibold text-[#475569]">0{index + 1}</span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-[#E2E8F0]">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#64748B]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${82 - index * 14}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.12 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between rounded-md border px-4 py-3 text-sm",
        highlight
          ? "border-[#D6A84F]/40 bg-[#D6A84F]/15 text-white"
          : "border-white/10 bg-white/[0.06] text-[#E2E8F0]",
      )}
    >
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const goldId = `mark-gold-${useId().replace(/:/g, "")}`;

  return (
    <span
      className={clsx(
        "grid shrink-0 place-items-center rounded-md shadow-[0_18px_60px_rgba(10,13,20,0.22)]",
        onDark ? "bg-white/[0.03]" : "bg-[#0A0D14]",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 84 84" className="h-[78%] w-[78%]" role="img">
        <defs>
          <linearGradient id={goldId} x1="54" y1="30" x2="76" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1C76A" />
            <stop offset="1" stopColor="#D6A84F" />
          </linearGradient>
        </defs>
        <path
          d="M18 68L42 14L55 42"
          fill="none"
          stroke={onDark ? "#FFFFFF" : "#F1F3F6"}
          strokeWidth="12"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
        <path
          d="M18 68L56 42"
          fill="none"
          stroke={onDark ? "#FFFFFF" : "#F1F3F6"}
          strokeWidth="10"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
        <path
          d="M48 68H72L56 36L43 50"
          fill="none"
          stroke={`url(#${goldId})`}
          strokeWidth="12"
          strokeLinejoin="miter"
          strokeLinecap="butt"
        />
      </svg>
    </span>
  );
}

function CredibilityStrip() {
  const marqueeItems = useMemo(() => [...proofPoints, ...proofPoints], []);

  return (
    <section className="border-y border-[#E2E8F0] bg-white py-5">
      <div className="overflow-hidden">
        <motion.div
          className="flex min-w-max gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="mx-2 inline-flex items-center gap-3 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-3 text-sm font-semibold text-[#334155]"
            >
              <CheckCircle2 size={17} className="text-[#D6A84F]" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemsSection() {
  return (
    <section id="problems" className="px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        kicker="Revenue leaks"
        title="Where businesses lose money (beyond the obvious)"
        body="Small points of friction compound into lost revenue, slower teams, weak customer trust, subscription waste, and owners making decisions without the right visibility."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-4 md:grid-cols-2 xl:grid-cols-5">
        {problems.map((problem, index) => (
          <ProblemCard key={problem.title} {...problem} index={index} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, delay: 0.12 }}
        className="mx-auto mt-5 max-w-7xl rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)]"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "This creates",
              items: ["Hidden monthly costs", "Operational friction", "Lack of control over core systems"],
            },
            {
              title: "Better systems can",
              items: [
                "Reduce unnecessary SaaS spend",
                "Consolidate workflows",
                "Create more reliable, scalable solutions",
              ],
            },
            {
              title: "The goal",
              items: [
                "Keep the tools that work",
                "Simplify the ones that do not",
                "Own the workflows that matter most",
              ],
            },
          ].map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-semibold text-[#0A0D14]">{group.title}</h3>
              <div className="mt-4 grid gap-3">
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm font-semibold text-[#475569]">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#D6A84F]" size={17} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ProblemCard({ title, body, icon: Icon, index }: (typeof problems)[number] & { index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
      className="group min-h-72 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition hover:border-[#D6A84F]/45"
    >
      <div className="mb-8 grid h-12 w-12 place-items-center rounded-md bg-[#EEF2F7] text-[#0A0D14] transition group-hover:bg-[#0A0D14] group-hover:text-[#D6A84F]">
        <Icon size={23} />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-[#0A0D14]">{title}</h3>
      <p className="mt-4 text-base leading-7 text-[#475569]">{body}</p>
    </motion.article>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="bg-[#111827] px-5 py-24 text-white md:px-8 md:py-32">
      <SectionHeading
        dark
        kicker="Strategy to execution"
        title="Strategy is only useful when it gets built."
        body="Focused engagements designed to diagnose the right problem, shape the right system, reduce unnecessary tool dependency, and help move execution forward with speed, clarity, and ROI."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-5 lg:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ title, body, stat, icon: Icon, index }: (typeof services)[number] & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.16)] backdrop-blur"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-6">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-[#D6A84F] text-[#0A0D14]">
          <Icon size={23} />
        </div>
        <span className="font-mono text-5xl font-semibold text-white/10">{stat}</span>
      </div>
      <h3 className="mt-8 text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-[#E2E8F0]">{body}</p>
      <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#D6A84F]">
        Map the opportunity
        <ArrowRight size={17} className="transition group-hover:translate-x-1" />
      </div>
    </motion.article>
  );
}

function ExecutionSection() {
  const steps = [
    "Diagnose the revenue and workflow drag",
    "Design the system or product path",
    "Reduce tool sprawl where it hurts ROI",
    "Coordinate fast build support when needed",
  ];

  return (
    <section className="relative overflow-hidden bg-[#0A0D14] px-5 py-24 text-white md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_78%_36%,rgba(214,168,79,0.18),transparent_28%)]" />
      <div className="noise-overlay" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
            Execution-focused
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            I don&apos;t just hand over recommendations.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-xl border border-white/10 bg-white/[0.07] p-6 shadow-[0_34px_110px_rgba(0,0,0,0.24)] backdrop-blur md:p-10"
        >
          <div className="grid gap-7 text-xl leading-9 text-[#E2E8F0]">
            <p>
              A lot of businesses don&apos;t need more ideas. They need the right solution
              executed well and quickly.
            </p>
            <p>
              I work hands-on to identify where revenue is being lost, where workflows break down,
              and what systems need to change. Then I help design and execute those solutions.
            </p>
            <p>
              In many cases, improving ROI is not about adding more tools, but reducing dependency
              on expensive or unreliable SaaS platforms. I help identify where tools are creating
              friction and where custom, owned, or simplified systems can deliver better long-term
              value.
            </p>
            <p>
              When needed, I collaborate with a trusted network of engineers, designers, and
              specialists to move fast without unnecessary overhead.
            </p>
          </div>
          <div className="mt-9 grid gap-3">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.14 + index * 0.08 }}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.06] px-4 py-3"
              >
                <span className="font-mono text-sm font-semibold text-[#D6A84F]">
                  0{index + 1}
                </span>
                <span className="font-semibold text-white">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MidPageCTA() {
  return (
    <section className="bg-[#0A0D14] px-5 pb-20 md:px-8 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="mx-auto flex max-w-7xl flex-col gap-5 rounded-lg border border-white/10 bg-white/[0.07] p-6 text-white shadow-[0_34px_110px_rgba(0,0,0,0.2)] backdrop-blur md:flex-row md:items-center md:justify-between md:p-8"
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
            Ready to simplify the system?
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-4xl">
            The goal is not more software&mdash;it&apos;s better systems.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#E2E8F0]">
            Send a note and I&apos;ll help you look at where revenue, workflow, or tool spend is
            creating drag.
          </p>
        </div>
        <AnimatedButton href={emailHref} label="Let’s Talk" />
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="approach" className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Approach</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#0A0D14] md:text-6xl">
            Built for speed, clarity, and ROI.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric, index) => (
              <MetricCounter key={metric.label} {...metric} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.08)] md:p-10"
        >
          <div className="grid gap-8 text-xl leading-9 text-[#334155]">
            <p>
              I work directly with business owners and operators to identify where revenue is
              being lost and where systems are creating friction.
            </p>
            <p>
              I&apos;ve led cross-functional teams of designers and engineers to deliver complex
              systems at scale&mdash;driving measurable improvements in revenue, efficiency, and
              user experience.
            </p>
            <p>
              I don&apos;t just define the strategy&mdash;I help execute it. This approach keeps
              engagements focused, fast-moving, and built around real business outcomes, not just
              deliverables.
            </p>
            <p>
              The goal is not more software&mdash;it&apos;s better systems: fewer disconnected tools,
              stronger ownership of core workflows, and clearer long-term ROI.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricCounter({
  label,
  value,
  suffix,
  index,
}: {
  label: string;
  value: number;
  suffix: string;
  index: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDisplay(value), 350 + index * 150);
    return () => window.clearTimeout(timeout);
  }, [index, value]);

  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white p-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-mono text-4xl font-semibold text-[#0A0D14]"
      >
        {display}
        {suffix}
      </motion.div>
      <p className="mt-2 text-sm font-semibold text-[#475569]">{label}</p>
    </div>
  );
}

function OutcomesSection() {
  return (
    <section className="bg-[#EEF2F7] px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        kicker="Outcomes"
        title="Built around measurable business impact."
        body="Every engagement connects back to the business: revenue improvement, operational speed, customer conversion, lower tool friction, stronger trust, and clearer owner visibility."
      />
      <div className="mx-auto mt-12 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {outcomes.map((outcome, index) => (
          <OutcomeCard key={outcome} title={outcome} index={index} />
        ))}
      </div>
    </section>
  );
}

function OutcomeCard({ title, index }: { title: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="flex min-h-32 items-start gap-4 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#0A0D14] text-[#D6A84F]">
        <CheckCircle2 size={20} />
      </div>
      <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#0A0D14]">{title}</h3>
    </motion.div>
  );
}

function CredibilitySection() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Credibility</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#0A0D14] md:text-6xl">
            Built from product, operations, and execution experience.
          </h2>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#475569]">
            My background combines product strategy, design operations, enterprise delivery, and
            hands-on operational experience. I&apos;ve led teams through complex digital initiatives,
            worked across UX and engineering, and helped turn messy business problems into systems
            people can actually use.
          </p>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#0A0D14]">
            The goal is simple: move fast, solve the right problem, reduce unnecessary complexity,
            and create meaningful ROI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4"
        >
          {experience.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
            >
              <Layers3 className="shrink-0 text-[#D6A84F]" size={22} />
              <p className="font-semibold leading-6 text-[#0F172A]">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="contact" className="px-5 pb-10 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto overflow-hidden rounded-xl bg-[#0A0D14] px-6 py-16 text-white shadow-[0_40px_130px_rgba(7,17,31,0.25)] md:px-12 md:py-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,168,79,0.28),transparent_30%),radial-gradient(circle_at_88%_28%,rgba(59,130,246,0.32),transparent_30%)]" />
        <div className="noise-overlay" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
            Have a business process that feels more painful than it should?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#E2E8F0]">
            Let&apos;s look at where revenue, time, or customer trust is leaking&mdash;and what a
            better, simpler system could look like.
          </p>
          <div className="mt-9 flex justify-center">
            <AnimatedButton href={emailHref} label="Start a Conversation" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-[#E2E8F0] pt-8 text-sm text-[#475569] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-[#0A0D14]">Adan Aispuro</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.32em] text-[#D6A84F]">
              Strategy. Systems. Results.
            </p>
          </div>
        </div>
        <p>Product strategy, systems execution, and operator-focused ROI improvement.</p>
        <a href={emailHref} className="font-semibold text-[#0A0D14] hover:text-[#D6A84F]">
          aispuro.adan.r@gmail.com
        </a>
      </div>
    </footer>
  );
}

function SectionHeading({
  kicker,
  title,
  body,
  dark = false,
}: {
  kicker: string;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-7xl"
    >
      <p className={clsx("text-sm font-bold uppercase tracking-[0.2em]", dark ? "text-[#D6A84F]" : "text-[#D6A84F]")}>
        {kicker}
      </p>
      <h2
        className={clsx(
          "mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl",
          dark ? "text-white" : "text-[#0A0D14]",
        )}
      >
        {title}
      </h2>
      <p className={clsx("mt-6 max-w-3xl text-lg leading-8", dark ? "text-[#E2E8F0]" : "text-[#475569]")}>
        {body}
      </p>
    </motion.div>
  );
}

function AnimatedButton({
  href,
  label,
  compact = false,
}: {
  href: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 rounded-md bg-[#D6A84F] font-semibold text-[#0A0D14] shadow-[0_18px_60px_rgba(214,168,79,0.28)] transition hover:bg-[#E8BE63]",
        compact ? "h-11 px-5 text-sm" : "h-14 px-6 text-base",
      )}
    >
      {label}
      <ArrowRight size={compact ? 16 : 18} className="transition group-hover:translate-x-1" />
    </motion.a>
  );
}
