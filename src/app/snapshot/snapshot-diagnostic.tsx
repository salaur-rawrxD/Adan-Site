"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Home, Mail } from "lucide-react";
import clsx from "clsx";

type Answer = 0 | 1 | 2;
type StepState = "intro" | "diagnostic" | "results";

const answerOptions: { label: string; value: Answer }[] = [
  { label: "Yes", value: 0 },
  { label: "Somewhat", value: 1 },
  { label: "No", value: 2 },
];

const categories = [
  {
    id: "customer-flow",
    title: "Customer Flow",
    description: "How easily customers move from interest to action.",
    questions: [
      "Can customers complete key actions without friction?",
      "Do you see drop-off in booking, checkout, intake, or onboarding?",
      "Are manual follow-ups needed to close or complete business?",
    ],
    interpretations: {
      low: "Customers can likely move through key actions with minimal friction.",
      medium: "Some customer friction may be slowing conversion or requiring extra effort.",
      high: "Customers may be dropping off before completing key actions.",
    },
  },
  {
    id: "team-workflow",
    title: "Team Workflow",
    description: "How efficiently your team gets work done.",
    questions: [
      "Are teams relying on spreadsheets or manual workarounds?",
      "Do processes change depending on who is doing the work?",
      "Are delays, duplicate entry, or bottlenecks common?",
    ],
    interpretations: {
      low: "Internal workflows appear relatively clear and manageable.",
      medium: "Manual work or inconsistent processes may be slowing execution.",
      high: "Your team may be losing significant time to workarounds, duplicate entry, or unclear ownership.",
    },
  },
  {
    id: "data-visibility",
    title: "Data Visibility",
    description: "How clearly you can see what is happening in the business.",
    questions: [
      "Can you clearly see performance across the business?",
      "Are reports pulled manually from multiple tools?",
      "Do decisions rely on guesswork instead of clear data?",
    ],
    interpretations: {
      low: "You likely have enough visibility to make timely decisions.",
      medium: "Gaps in reporting may be slowing decisions or hiding problems.",
      high: "Lack of visibility may be making it difficult to identify issues before they cost money.",
    },
  },
];

export function SnapshotDiagnostic() {
  const [mode, setMode] = useState<StepState>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const category = categories[step];
  const progress = mode === "results" ? 100 : ((step + 1) / categories.length) * 100;

  const results = useMemo(
    () =>
      categories.map((item) => {
        const score = item.questions.reduce((total, question) => total + (answers[keyFor(item.id, question)] ?? 0), 0);
        const level = getLevel(score);
        return {
          ...item,
          score,
          level,
          percent: Math.round((score / 6) * 100),
          interpretation: item.interpretations[level],
        };
      }),
    [answers],
  );

  const currentComplete = category.questions.every((question) => answers[keyFor(category.id, question)] !== undefined);
  const mailtoHref = useMemo(() => {
    const summary = results
      .map((result) => `${result.title}: ${result.score}/6 - ${labelForLevel(result.level)}`)
      .join("%0A");
    return `mailto:adan@withadan.com?subject=Revenue%20Friction%20Snapshot%20Results&body=${encodeURIComponent(
      `Hi Adan,\n\nHere are my Revenue Friction Snapshot results:\n\n${decodeURIComponent(summary)}\n\nI'd like a deeper breakdown.`,
    )}`;
  }, [results]);

  const start = () => {
    setMode("diagnostic");
    setStep(0);
  };

  const next = () => {
    if (step === categories.length - 1) {
      setMode("results");
      return;
    }
    setStep((current) => current + 1);
  };

  const back = () => {
    if (mode === "results") {
      setMode("diagnostic");
      setStep(categories.length - 1);
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  };

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-10 pt-24 sm:px-6 md:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(214,168,79,0.20),transparent_28%),radial-gradient(circle_at_12%_22%,rgba(100,116,139,0.20),transparent_30%),linear-gradient(135deg,#0A0D14_0%,#111827_54%,#05070B_100%)]" />
      <div className="noise-overlay" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-5 lg:grid-cols-[260px_1fr] lg:items-start">
        <SidePanel activeStep={mode === "intro" ? -1 : mode === "results" ? 3 : step} />
        <div className="mx-auto w-full max-w-4xl">
          {mode === "intro" ? <SnapshotIntro onStart={start} /> : null}
          {mode === "diagnostic" ? (
            <SnapshotStep
              category={category}
              step={step}
              answers={answers}
              progress={progress}
              canContinue={currentComplete}
              onAnswer={(question, value) =>
                setAnswers((current) => ({
                  ...current,
                  [keyFor(category.id, question)]: value,
                }))
              }
              onBack={back}
              onNext={next}
            />
          ) : null}
          {mode === "results" ? (
            <ResultsScreen results={results} mailtoHref={mailtoHref} onBack={back} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SnapshotIntro({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] p-6 shadow-[0_40px_160px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:p-8 md:p-12"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#D6A84F] to-transparent" />
      <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-[#D6A84F]">
            <BarChart3 size={16} />
            Diagnostic tool
          </div>
          <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-tight text-[#F8FAFC] sm:text-6xl md:text-7xl">
            Revenue Friction Snapshot
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-[#E2E8F0] md:text-2xl md:leading-9">
            Find where your business is losing time, revenue, and operational clarity.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#94A3B8]">
            Most businesses do not need more tools. They need better systems. This quick diagnostic
            helps identify where friction may be slowing growth and creating hidden costs.
          </p>
        </div>
        <div className="rounded-xl border border-white/12 bg-[#0A0D14]/70 p-5">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D6A84F]">Measures</p>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-[#E2E8F0]">
            {["Revenue leakage", "Time drag", "Operational clarity", "Customer trust"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={17} className="text-[#D6A84F]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <PremiumButton onClick={onStart}>Start Diagnostic</PremiumButton>
        <p className="text-sm font-semibold text-[#94A3B8]">Takes about 2 minutes.</p>
      </div>
    </motion.div>
  );
}

function SnapshotStep({
  category,
  step,
  answers,
  progress,
  canContinue,
  onAnswer,
  onBack,
  onNext,
}: {
  category: (typeof categories)[number];
  step: number;
  answers: Record<string, Answer>;
  progress: number;
  canContinue: boolean;
  onAnswer: (question: string, value: Answer) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_40px_160px_rgba(0,0,0,0.36)] backdrop-blur-xl"
    >
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D6A84F]">
            Step {step + 1} of 3
          </p>
          <p className="text-sm font-semibold text-[#94A3B8]">Revenue Friction Snapshot</p>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        <h2 className="text-4xl font-semibold tracking-tight text-[#F8FAFC] md:text-5xl">{category.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8] md:text-lg">{category.description}</p>

        <div className="mt-8 grid gap-5">
          {category.questions.map((question, index) => {
            const selected = answers[keyFor(category.id, question)];
            return (
              <motion.div
                key={question}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-xl border border-white/10 bg-[#0A0D14]/50 p-4 sm:p-5"
              >
                <p className="text-base font-semibold leading-7 text-[#F8FAFC]">{question}</p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {answerOptions.map((option) => (
                    <AnswerButton
                      key={option.label}
                      label={option.label}
                      selected={selected === option.value}
                      onClick={() => onAnswer(question, option.value)}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-white/10 bg-[#0A0D14]/90 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 0}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/12 px-5 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#D6A84F]/60 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft size={17} />
          Back
        </button>
        <PremiumButton onClick={onNext} disabled={!canContinue}>
          {step === 2 ? "View Results" : "Next"}
        </PremiumButton>
      </div>
    </motion.div>
  );
}

function AnswerButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        "min-h-14 rounded-lg border px-4 text-sm font-semibold transition",
        selected
          ? "border-[#D6A84F] bg-[#D6A84F]/14 text-[#F8FAFC] shadow-[0_0_40px_rgba(214,168,79,0.16)]"
          : "border-white/12 bg-white/[0.04] text-[#CBD5E1] hover:border-[#D6A84F]/60 hover:bg-white/[0.07]",
      )}
    >
      {label}
    </motion.button>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#94A3B8]"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function ResultsScreen({
  results,
  mailtoHref,
  onBack,
}: {
  results: Array<(typeof categories)[number] & { score: number; level: FrictionLevel; percent: number; interpretation: string }>;
  mailtoHref: string;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_40px_160px_rgba(0,0,0,0.36)] backdrop-blur-xl"
    >
      <div className="border-b border-white/10 p-5 sm:p-6 md:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D6A84F]">Results</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#F8FAFC] md:text-6xl">Your Friction Profile</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#94A3B8] md:text-lg">
          These signals can point to where revenue, time, or customer trust may be leaking from
          your business.
        </p>
      </div>

      <div className="grid gap-4 p-5 sm:p-6 md:p-8">
        {results.map((result, index) => (
          <ResultCard key={result.id} result={result} index={index} />
        ))}
      </div>

      <div className="border-t border-white/10 p-5 sm:p-6 md:p-8">
        <div className="rounded-xl border border-white/10 bg-[#0A0D14]/60 p-5">
          <p className="text-lg font-semibold leading-7 text-[#F8FAFC]">
            Most businesses do not need more software. They need better systems that reduce
            friction, improve visibility, and support how the business actually runs.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-[#F8FAFC]">Want a deeper breakdown?</h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#94A3B8]">
              Send your results and I&rsquo;ll take a look at where the biggest opportunities may be.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <motion.a
              href={mailtoHref}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-[#D6A84F] px-6 text-base font-semibold text-[#0A0D14] shadow-[0_18px_60px_rgba(214,168,79,0.28)] transition hover:bg-[#E8BE63]"
            >
              <Mail size={18} />
              Email My Results
            </motion.a>
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-md border border-white/12 px-6 text-base font-semibold text-[#F8FAFC] transition hover:border-[#D6A84F]/60 hover:bg-white/[0.06]"
            >
              <Home size={18} />
              Back to Home
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-[#F8FAFC]"
        >
          <ArrowLeft size={16} />
          Review answers
        </button>
      </div>
    </motion.div>
  );
}

function ResultCard({
  result,
  index,
}: {
  result: (typeof categories)[number] & { score: number; level: FrictionLevel; percent: number; interpretation: string };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-xl border border-white/10 bg-[#0A0D14]/55 p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#F8FAFC]">{result.title}</h3>
          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{result.interpretation}</p>
        </div>
        <div className="shrink-0 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3">
          <p className="font-mono text-2xl font-semibold text-[#F8FAFC]">{result.score}/6</p>
          <p className={clsx("mt-1 text-xs font-bold uppercase tracking-[0.16em]", colorForLevel(result.level).text)}>
            {labelForLevel(result.level)}
          </p>
        </div>
      </div>
      <FrictionBar percent={result.percent} level={result.level} />
    </motion.article>
  );
}

function FrictionBar({ percent, level }: { percent: number; level: FrictionLevel }) {
  return (
    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className={clsx("h-full rounded-full", colorForLevel(level).bar)}
        initial={{ width: "0%" }}
        animate={{ width: `${Math.max(percent, 8)}%` }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function SidePanel({ activeStep }: { activeStep: number }) {
  return (
    <aside className="hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl lg:block">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A84F]">Diagnostic path</p>
      <div className="mt-5 grid gap-2">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={clsx(
              "rounded-lg border px-4 py-3 text-sm font-semibold transition",
              activeStep === index
                ? "border-[#D6A84F]/70 bg-[#D6A84F]/10 text-[#F8FAFC]"
                : activeStep > index
                  ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-100"
                  : "border-white/10 bg-white/[0.03] text-[#94A3B8]",
            )}
          >
            {category.title}
          </div>
        ))}
      </div>
    </aside>
  );
}

function PremiumButton({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -3, scale: 1.01 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#D6A84F] px-6 text-base font-semibold text-[#0A0D14] shadow-[0_18px_60px_rgba(214,168,79,0.28)] transition hover:bg-[#E8BE63] disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto"
    >
      {children}
      <ArrowRight size={18} />
    </motion.button>
  );
}

type FrictionLevel = "low" | "medium" | "high";

function keyFor(categoryId: string, question: string) {
  return `${categoryId}:${question}`;
}

function getLevel(score: number): FrictionLevel {
  if (score <= 1) return "low";
  if (score <= 3) return "medium";
  return "high";
}

function labelForLevel(level: FrictionLevel) {
  return level === "low" ? "Low friction" : level === "medium" ? "Medium friction" : "High friction";
}

function colorForLevel(level: FrictionLevel) {
  if (level === "low") return { text: "text-emerald-300", bar: "bg-emerald-400" };
  if (level === "medium") return { text: "text-[#D6A84F]", bar: "bg-[#D6A84F]" };
  return { text: "text-orange-300", bar: "bg-orange-400" };
}
