"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  LucideIcon,
  Menu,
  Send,
  X,
} from "lucide-react";
import clsx from "clsx";

const contactEmail = "adan@withadan.com";
const contactEndpoint = "/api/send-email";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Tacoma", href: "/tacoma" },
  { label: "Snapshot", href: "/snapshot" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

type ButtonVariant = "primary" | "secondary";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E2E8F0]/80 bg-[#F8FAFC]/92 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Adan Aispuro home">
            <LogoMark className="h-9 w-9" />
            <span className="truncate text-sm font-bold uppercase tracking-[0.18em] text-[#0A0D14] sm:text-base">
              Adan Aispuro
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-semibold transition",
                  pathname === link.href ? "text-[#0A0D14]" : "text-[#64748B] hover:text-[#0A0D14]",
                )}
              >
                {link.label}
              </Link>
            ))}
            <ContactButton compact onClick={() => setContactOpen(true)}>
              Let&rsquo;s Talk
            </ContactButton>
          </div>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border border-[#CBD5E1] bg-white text-[#0A0D14] md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 rounded-lg border border-[#E2E8F0] bg-white p-2 shadow-2xl md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "block rounded-md px-4 py-3 text-sm font-semibold",
                  pathname === link.href ? "bg-[#F8FAFC] text-[#0A0D14]" : "text-[#334155]",
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setContactOpen(true);
              }}
              className="mt-2 flex h-12 w-full items-center justify-center rounded-md bg-[#0A0D14] px-4 text-sm font-semibold text-white"
            >
              Let&rsquo;s Talk
            </button>
          </motion.div>
        ) : null}
      </header>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#0A0D14]/70 px-4 py-6 backdrop-blur-sm">
      <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative w-full rounded-xl border border-white/10 bg-[#0A0D14] p-5 text-white shadow-[0_40px_140px_rgba(0,0,0,0.36)] sm:p-6"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-white/10 text-white transition hover:bg-white/15"
            aria-label="Close contact form"
          >
            <X size={18} />
          </button>
          <div className="pr-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Start a conversation</h2>
            <p className="mt-3 text-base leading-7 text-[#CBD5E1]">
              Send a little context and I&rsquo;ll review it directly.
            </p>
          </div>
          <div className="mt-6">
            <ContactForm
              variant="dark"
              submitLabel="Send Inquiry"
              successMessage="Thanks. I’ll review your inquiry and get back to you shortly."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ContactButton({
  children,
  onClick,
  variant = "primary",
  compact = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
  compact?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "group inline-flex w-full items-center justify-center gap-2 rounded-md font-semibold transition sm:w-auto",
        compact ? "h-11 px-5 text-sm" : "h-14 px-6 text-base",
        variant === "primary"
          ? "bg-[#D6A84F] text-[#0A0D14] shadow-[0_18px_60px_rgba(214,168,79,0.28)] hover:bg-[#E8BE63]"
          : "border border-white/15 text-white hover:border-[#D6A84F]/70 hover:bg-white/10",
      )}
    >
      {children}
      <ArrowRight size={compact ? 16 : 18} className="transition group-hover:translate-x-1" />
    </motion.button>
  );
}

export function ContactForm({
  variant = "light",
  submitLabel = "Send",
  successMessage = "Thanks. I’ll review your inquiry and get back to you shortly.",
  source = "Website contact form",
  context,
  defaultMessage = "",
}: {
  variant?: "light" | "dark";
  submitLabel?: string;
  successMessage?: string;
  source?: string;
  context?: string;
  defaultMessage?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [need, setNeed] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [additionalContext, setAdditionalContext] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isDark = variant === "dark";
  const fieldClass = clsx(
    "mt-2 h-12 w-full rounded-md border px-4 text-base outline-none transition",
    isDark
      ? "border-white/10 bg-white text-[#0A0D14] focus:border-[#D6A84F]"
      : "border-[#CBD5E1] bg-white text-[#0A0D14] focus:border-[#D6A84F]",
  );
  const areaClass = clsx(
    "mt-2 min-h-32 w-full resize-y rounded-md border px-4 py-3 text-base outline-none transition",
    isDark
      ? "border-white/10 bg-white text-[#0A0D14] focus:border-[#D6A84F]"
      : "border-[#CBD5E1] bg-white text-[#0A0D14] focus:border-[#D6A84F]",
  );
  const labelClass = clsx("block text-sm font-semibold", isDark ? "text-white" : "text-[#0A0D14]");

  const resetFields = () => {
    setName("");
    setEmail("");
    setBusiness("");
    setNeed("");
    setMessage("");
    setAdditionalContext("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting" || status === "success") return;

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("submitting");
    const formData = new FormData(form);
    if (context) formData.set("context", context);
    formData.set("source", source);
    formData.set("_subject", `Website inquiry: ${source}`);
    formData.set("slowdown", message);
    const currentContext = [additionalContext, context].filter(Boolean).join("\n\n");
    formData.set("context", currentContext);
    const payload = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") payload.append(key, value);
    });

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        body: payload,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (!response.ok) throw new Error("Contact request failed");

      setStatus("success");
      window.setTimeout(() => {
        resetFields();
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form action={contactEndpoint} method="POST" onSubmit={handleSubmit} className="grid gap-4">
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="source" value={source} />
      {context ? <input type="hidden" name="context" value={context} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            required
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Business / Organization
        <input
          type="text"
          name="business"
          value={business}
          onChange={(event) => setBusiness(event.target.value)}
          placeholder="Company, agency, or organization"
          className={fieldClass}
        />
      </label>

      <label className={labelClass}>
        What best describes your need?
        <select
          name="need"
          value={need}
          onChange={(event) => setNeed(event.target.value)}
          required
          className={fieldClass}
        >
          <option value="">Select one</option>
          <option value="Revenue friction">Revenue friction</option>
          <option value="Workflow optimization">Workflow optimization</option>
          <option value="SaaS/tool consolidation">SaaS/tool consolidation</option>
          <option value="Systems build or execution">Systems build or execution</option>
          <option value="Government or partnership inquiry">Government or partnership inquiry</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>

      <label className={labelClass}>
        What&rsquo;s the biggest thing slowing your business?
        <textarea
          name="slowdown"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell me about your situation"
          required
          className={areaClass}
        />
      </label>

      <label className={labelClass}>
        Additional Context <span className={isDark ? "text-[#CBD5E1]" : "text-[#64748B]"}>(optional)</span>
        <textarea
          name="additional_context"
          value={additionalContext}
          onChange={(event) => setAdditionalContext(event.target.value)}
          placeholder="Any additional details about your situation?"
          className={clsx(areaClass, "min-h-24")}
        />
      </label>

      {status === "success" ? (
        <p className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
          {successMessage}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
          Something went wrong. Try again or email {contactEmail}
        </p>
      ) : null}

      <motion.button
        type="submit"
        disabled={status === "submitting" || status === "success"}
        whileHover={status === "idle" || status === "error" ? { y: -3, scale: 1.01 } : undefined}
        whileTap={status === "idle" || status === "error" ? { scale: 0.98 } : undefined}
        className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#D6A84F] px-6 text-base font-semibold text-[#0A0D14] shadow-[0_18px_60px_rgba(214,168,79,0.28)] transition hover:bg-[#E8BE63] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            {submitLabel}
          </>
        )}
      </motion.button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-[#E2E8F0] pt-8 text-sm text-[#64748B] md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-10 w-10" />
          <div>
            <p className="font-bold uppercase tracking-[0.22em] text-[#0A0D14]">Adan Aispuro</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-[#D6A84F]">
              Strategy. Systems. Results.
            </p>
          </div>
        </div>
        <p className="max-w-xl">
          Product strategy, systems execution, and operator-focused ROI improvement for{" "}
          <Link href="/tacoma" className="font-semibold text-[#0A0D14] transition hover:text-[#D6A84F]">
            Tacoma and Pierce County businesses
          </Link>
          .
        </p>
        <div className="flex flex-col gap-2 font-semibold text-[#0A0D14] md:items-end">
          <Link href="/snapshot" className="transition hover:text-[#D6A84F]">
            Run the Snapshot
          </Link>
          <span>{contactEmail}</span>
        </div>
      </div>
    </footer>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  signals,
  localSignal,
  restrained = false,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  signals?: string[];
  localSignal?: { text: string; href: string };
  restrained?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0A0D14] px-4 pb-16 pt-28 text-white sm:px-6 md:pb-24 md:pt-36">
      <div
        className={clsx(
          "absolute inset-0",
          restrained
            ? "bg-[radial-gradient(circle_at_18%_12%,rgba(214,168,79,0.16),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(100,116,139,0.18),transparent_34%),linear-gradient(135deg,#0A0D14_0%,#111827_58%,#05070B_100%)]"
            : "bg-[radial-gradient(circle_at_18%_12%,rgba(214,168,79,0.28),transparent_30%),radial-gradient(circle_at_78%_20%,rgba(59,130,246,0.16),transparent_34%),linear-gradient(135deg,#0A0D14_0%,#111827_52%,#05070B_100%)]",
        )}
      />
      <div className="noise-overlay" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#D6A84F]">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#E2E8F0] md:text-2xl md:leading-9">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={primary.href}>{primary.label}</CTAButton>
            {secondary ? (
              <CTAButton href={secondary.href} variant="secondary">
                {secondary.label}
              </CTAButton>
            ) : null}
          </div>
          {localSignal ? (
            <Link
              href={localSignal.href}
              className="mt-5 inline-flex max-w-2xl rounded-md border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold leading-6 text-[#E2E8F0] transition hover:border-[#D6A84F]/60 hover:text-white"
            >
              {localSignal.text}
            </Link>
          ) : null}
          {signals ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {signals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-md border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-[#E2E8F0]"
                >
                  {signal}
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  compact = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  compact?: boolean;
}) {
  const className = clsx(
    "group inline-flex w-full items-center justify-center gap-2 rounded-md font-semibold transition sm:w-auto",
    compact ? "h-11 px-5 text-sm" : "h-14 px-6 text-base",
    variant === "primary"
      ? "bg-[#D6A84F] text-[#0A0D14] shadow-[0_18px_60px_rgba(214,168,79,0.28)] hover:bg-[#E8BE63]"
      : "border border-white/15 text-white hover:border-[#D6A84F]/70 hover:bg-white/10",
  );

  const content = (
    <>
      {children}
      <ArrowRight size={compact ? 16 : 18} className="transition group-hover:translate-x-1" />
    </>
  );

  if (href.startsWith("/")) {
    return (
      <motion.span whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="block sm:inline-block">
        <Link href={href} className={className}>
          {content}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.a href={href} whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={className}>
      {content}
    </motion.a>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mx-auto max-w-7xl"
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#D6A84F]">{eyebrow}</p>
      <h2
        className={clsx(
          "mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-6xl",
          dark ? "text-white" : "text-[#0A0D14]",
        )}
      >
        {title}
      </h2>
      <p className={clsx("mt-5 max-w-3xl text-base leading-7 md:text-lg md:leading-8", dark ? "text-[#E2E8F0]" : "text-[#64748B]")}>
        {body}
      </p>
    </motion.div>
  );
}

export function StaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className={className}>
      {children}
    </motion.div>
  );
}

export function Card({
  title,
  body,
  icon: Icon,
  index,
  compact = false,
  dark = false,
}: {
  title: string;
  body?: string;
  icon?: LucideIcon;
  index?: number;
  compact?: boolean;
  dark?: boolean;
}) {
  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.48, delay: typeof index === "number" ? index * 0.05 : 0 }}
      whileHover={{ y: -5 }}
      className={clsx(
        "rounded-lg border p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)] transition",
        compact ? "min-h-28" : "min-h-52",
        dark
          ? "border-white/10 bg-white/[0.07] text-white shadow-[0_28px_90px_rgba(0,0,0,0.18)]"
          : "border-[#E2E8F0] bg-white text-[#0A0D14]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {Icon ? (
          <div className={clsx("grid h-11 w-11 shrink-0 place-items-center rounded-md", dark ? "bg-[#D6A84F] text-[#0A0D14]" : "bg-[#0A0D14] text-[#D6A84F]")}>
            <Icon size={21} />
          </div>
        ) : null}
        {typeof index === "number" ? (
          <span className={clsx("font-mono text-4xl font-semibold", dark ? "text-white/12" : "text-[#CBD5E1]")}>
            0{index}
          </span>
        ) : null}
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-tight tracking-tight">{title}</h3>
      {body ? (
        <p className={clsx("mt-3 text-base leading-7", dark ? "text-[#CBD5E1]" : "text-[#64748B]")}>{body}</p>
      ) : null}
    </motion.article>
  );
}

export function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)]"
    >
      <p className="font-mono text-4xl font-semibold text-[#0A0D14]">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[#64748B]">{label}</p>
    </motion.div>
  );
}

export function ExperienceList({ items }: { items: string[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid gap-3"
    >
      {items.map((item, index) => (
        <motion.div
          key={item}
          variants={fadeUp}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="flex items-start gap-3 rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.05)]"
        >
          <CheckCircle2 className="mt-0.5 shrink-0 text-[#D6A84F]" size={18} />
          <p className="font-semibold leading-6 text-[#0A0D14]">{item}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

const snapshotCategories = [
  {
    name: "Customer Flow",
    questions: [
      "Can customers complete key actions without friction?",
      "Do you see drop-off in booking, checkout, intake, or onboarding?",
      "Are you relying on manual follow-ups to close business?",
    ],
    explanation: "Customer flow friction usually means people want to buy or move forward, but the path makes it harder than it should be.",
  },
  {
    name: "Team Workflow",
    questions: [
      "Are teams relying on spreadsheets or manual workarounds?",
      "Do processes change depending on who is doing the work?",
      "Are delays, duplicate entry, or bottlenecks common?",
    ],
    explanation: "Team workflow friction shows up as repeated manual effort, uneven execution, and too much dependency on individual workarounds.",
  },
  {
    name: "Data Visibility",
    questions: [
      "Can you clearly see performance across the business?",
      "Are reports pulled manually from multiple tools?",
      "Do decisions rely on guesswork instead of clear data?",
    ],
    explanation: "Data visibility friction limits decision speed because the business cannot clearly see what is happening across tools and teams.",
  },
];

const answerOptions = [
  { label: "Yes", value: 0 },
  { label: "Somewhat", value: 1 },
  { label: "No", value: 2 },
];

export function SnapshotTool() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const totalQuestions = snapshotCategories.reduce((count, category) => count + category.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === totalQuestions;

  const results = useMemo(
    () =>
      snapshotCategories.map((category) => {
        const score = category.questions.reduce((total, question) => total + (answers[question] ?? 0), 0);
        const max = category.questions.length * 2;
        const level = score <= 1 ? "Low friction" : score <= 3 ? "Medium friction" : "High friction";
        return { ...category, score, max, level, percent: Math.round((score / max) * 100) };
      }),
    [answers],
  );

  const snapshotContext = useMemo(() => {
    const lines = snapshotCategories.flatMap((category) => [
      category.name,
      ...category.questions.map((question) => {
        const option = answerOptions.find((answer) => answer.value === answers[question]);
        return `- ${question} ${option?.label ?? "No answer"}`;
      }),
      "",
    ]);
    return `Revenue Friction Snapshot results:\n\n${lines.join("\n")}`;
  }, [answers]);

  return (
    <section className="px-4 py-12 sm:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeader
            eyebrow="Snapshot tool"
            title="Find the friction before it compounds."
            body="Answer nine quick prompts across customer flow, team workflow, and data visibility. Your results will show where the business may be leaking revenue, time, or trust."
          />
          <div className="mt-6 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-[#64748B]">
                {answeredCount} of {totalQuestions} answered
              </p>
              <p className="text-sm font-bold text-[#0A0D14]">{complete ? "Results ready" : "In progress"}</p>
            </div>
            <div className="mt-4 h-2 rounded-full bg-[#E2E8F0]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#64748B]"
                animate={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {snapshotCategories.map((category) => (
            <div key={category.name} className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-semibold tracking-tight text-[#0A0D14]">{category.name}</h2>
              <div className="mt-5 grid gap-5">
                {category.questions.map((question) => (
                  <fieldset key={question} className="grid gap-3">
                    <legend className="text-base font-semibold leading-6 text-[#0A0D14]">{question}</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {answerOptions.map((option) => {
                        const selected = answers[question] === option.value;
                        return (
                          <button
                            key={option.label}
                            type="button"
                            onClick={() => setAnswers((current) => ({ ...current, [question]: option.value }))}
                            className={clsx(
                              "min-h-12 rounded-md border px-3 text-sm font-semibold transition",
                              selected
                                ? "border-[#D6A84F] bg-[#FFF8E7] text-[#0A0D14]"
                                : "border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-[#D6A84F]",
                            )}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-[#0A0D14]/10 bg-[#0A0D14] p-5 text-white shadow-[0_30px_100px_rgba(10,13,20,0.22)]">
            <h2 className="text-2xl font-semibold tracking-tight">Your snapshot results</h2>
            <div className="mt-5 grid gap-4">
              {results.map((result) => (
                <FrictionBar key={result.name} label={result.name} percent={result.percent} level={result.level} explanation={result.explanation} active={complete} />
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.07] p-4">
              <p className="text-lg font-semibold">Most businesses don&rsquo;t need more tools. They need better systems.</p>
              <p className="mt-3 text-base leading-7 text-[#E2E8F0]">
                If friction appears in any of these areas, there is likely revenue, time, or
                customer trust being lost every day.
              </p>
              <p className="mt-3 text-base leading-7 text-[#E2E8F0]">
                Once I see your results, I&apos;ll usually have an initial read within 48 hours and
                can let you know if a focused audit would be valuable.
              </p>
            </div>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-[#D6A84F]">
                Send me your results and I&rsquo;ll take a look.
              </p>
              {complete ? (
                <ContactForm
                  variant="dark"
                  submitLabel="Send Results"
                  source="Revenue Friction Snapshot"
                  context={snapshotContext}
                  defaultMessage="I completed the Revenue Friction Snapshot and would like you to take a look."
                  successMessage="Thanks. I’ll review your snapshot and get back to you shortly."
                />
              ) : (
                <p className="rounded-md border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-semibold text-[#CBD5E1]">
                  Answer all nine questions to send a complete snapshot.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FrictionBar({
  label,
  percent,
  level,
  explanation,
  active,
}: {
  label: string;
  percent: number;
  level: string;
  explanation: string;
  active: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold text-white">{label}</p>
        <p className="text-sm font-bold text-[#D6A84F]">{active ? level : "Pending"}</p>
      </div>
      <div className="mt-3 h-3 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#94A3B8]"
          initial={{ width: "0%" }}
          animate={{ width: active ? `${Math.max(percent, 8)}%` : "0%" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-[#CBD5E1]">{explanation}</p>
    </div>
  );
}

function LogoMark({ className }: { className?: string }) {
  return (
    <span className={clsx("grid shrink-0 place-items-center rounded-md bg-[#0A0D14] shadow-[0_14px_40px_rgba(10,13,20,0.22)]", className)} aria-hidden="true">
      <svg viewBox="0 0 84 84" className="h-[78%] w-[78%]" role="img">
        <defs>
          <linearGradient id="adan-gold" x1="54" y1="30" x2="76" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1C76A" />
            <stop offset="1" stopColor="#D6A84F" />
          </linearGradient>
        </defs>
        <path d="M18 68L42 14L55 42" fill="none" stroke="#F8FAFC" strokeWidth="12" />
        <path d="M18 68L56 42" fill="none" stroke="#F8FAFC" strokeWidth="10" />
        <path d="M48 68H72L56 36L43 50" fill="none" stroke="url(#adan-gold)" strokeWidth="12" />
      </svg>
    </span>
  );
}
