"use client";

import { type ReactNode, type RefObject, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, RotateCcw } from "lucide-react";
import clsx from "clsx";
import { ContactForm } from "@/components/site";

type Answer = 1 | 2 | 3 | 4 | 5;
type StepState = "intro" | "diagnostic" | "results";
type CategoryLevel = "low" | "moderate" | "high";
type OverallLevel = CategoryLevel | "critical";

const answerOptions: { value: Answer; label: string }[] = [
  { value: 1, label: "Never" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Often" },
  { value: 5, label: "Always" },
];

const categories = [
  {
    id: "customer-flow",
    title: "Customer Flow",
    description: "How easily customers move from interest to action.",
    questions: [
      {
        text: "Can customers complete key actions — booking, checkout, intake, or onboarding — without friction?",
        positive: true,
      },
      {
        text: "Do you see drop-off before customers complete a purchase or sign-up?",
        positive: false,
      },
      {
        text: "Are manual follow-ups needed to close or complete business?",
        positive: false,
      },
      {
        text: "How consistent is the customer experience across your team or locations?",
        positive: true,
      },
      {
        text: "Do customers get clear communication at every step of their journey?",
        positive: true,
      },
    ],
    interpretations: {
      low: "Customers move through your process with minimal friction.",
      moderate: "Some drop-off points are likely costing you revenue.",
      high: "Significant customer friction is reducing conversion and trust.",
    },
  },
  {
    id: "team-workflow",
    title: "Team Workflow",
    description: "How efficiently the team operates internally.",
    questions: [
      {
        text: "Do your team members rely on manual workarounds to get work done?",
        positive: false,
      },
      {
        text: "Is the same information entered into more than one system?",
        positive: false,
      },
      {
        text: "Do new hires take longer than 2 weeks to become productive?",
        positive: false,
      },
      {
        text: "Are there recurring tasks that could be automated but aren’t?",
        positive: false,
      },
      {
        text: "Does your team know exactly who owns each step of a process?",
        positive: true,
      },
    ],
    interpretations: {
      low: "Your team operates with reasonable efficiency.",
      moderate: "Manual workarounds are slowing execution speed.",
      high: "Workflow drag is a significant cost to your team’s capacity and output.",
    },
  },
  {
    id: "data-visibility",
    title: "Data Visibility",
    description: "How clearly leadership can see what’s happening.",
    questions: [
      {
        text: "Can you clearly see performance across the business in one place?",
        positive: true,
      },
      {
        text: "Are reports pulled manually from multiple tools?",
        positive: false,
      },
      {
        text: "Do decisions rely on guesswork instead of clear data?",
        positive: false,
      },
      {
        text: "Do you know in real time where revenue is coming from?",
        positive: true,
      },
      {
        text: "Can you quickly identify where a problem started when something goes wrong?",
        positive: true,
      },
    ],
    interpretations: {
      low: "You have reasonable visibility into business performance.",
      moderate: "Decision-making is slower than it needs to be.",
      high: "Lack of visibility is creating blind spots and slowing every decision.",
    },
  },
];

const overallInterpretations: Record<OverallLevel, string> = {
  low: "Your systems are relatively healthy. Small optimizations could still recover time and revenue.",
  moderate:
    "There are clear friction points slowing your business. Addressing them could meaningfully improve revenue and execution speed.",
  high: "Significant operational drag is costing you time, revenue, and team capacity. This is solvable.",
  critical:
    "Your business is running on friction. The cost in revenue, time, and team capacity is substantial and needs immediate attention.",
};

type SnapshotResults = {
  categories: Array<
    (typeof categories)[number] & { score: number; level: CategoryLevel; percent: number; interpretation: string }
  >;
  totalScore: number;
  overallLevel: OverallLevel;
  overallLabel: string;
  overallInterpretation: string;
};

export function SnapshotDiagnostic() {
  const [mode, setMode] = useState<StepState>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);
  const category = categories[step];
  const progress = mode === "results" ? 100 : ((step + 1) / (categories.length + 1)) * 100;

  const results = useMemo(() => {
    const categoryResults = categories.map((item) => {
      const score = item.questions.reduce((total, question) => {
        const answer = answers[keyFor(item.id, question.text)];
        if (!answer) return total;
        return total + scoreAnswer(answer, question.positive);
      }, 0);
      const level = getCategoryLevel(score);
      return {
        ...item,
        score,
        level,
        percent: Math.round((score / 20) * 100),
        interpretation: item.interpretations[level],
      };
    });
    const totalScore = categoryResults.reduce((total, item) => total + item.score, 0);
    const overallLevel = getOverallLevel(totalScore);
    return {
      categories: categoryResults,
      totalScore,
      overallLevel,
      overallLabel: labelForOverallLevel(overallLevel),
      overallInterpretation: overallInterpretations[overallLevel],
    };
  }, [answers]);

  const answeredInStep = category.questions.filter((question) => answers[keyFor(category.id, question.text)] !== undefined).length;
  const currentComplete = answeredInStep === category.questions.length;
  const prefilledMessage = useMemo(
    () =>
      [
        `Snapshot results: ${results.overallLabel}`,
        `Customer Flow: ${labelForCategoryLevel(results.categories[0].level)}`,
        `Team Workflow: ${labelForCategoryLevel(results.categories[1].level)}`,
        `Data Visibility: ${labelForCategoryLevel(results.categories[2].level)}`,
      ].join("\n"),
    [results],
  );
  const defaultNeed = useMemo(() => needForHighestCategory(results.categories), [results.categories]);

  const start = () => {
    setMode("diagnostic");
    setStep(0);
    setShowContact(false);
  };

  const next = () => {
    if (step === categories.length - 1) {
      setMode("results");
      setShowContact(false);
      return;
    }
    setStep((current) => current + 1);
  };

  const back = () => {
    if (mode === "results") {
      setMode("diagnostic");
      setStep(categories.length - 1);
      setShowContact(false);
      return;
    }
    setStep((current) => Math.max(0, current - 1));
  };

  const retake = () => {
    setAnswers({});
    setStep(0);
    setMode("diagnostic");
    setShowContact(false);
  };

  const openContact = () => {
    setShowContact(true);
    window.setTimeout(() => contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
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
              answeredInStep={answeredInStep}
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
            <ResultsScreen
              results={results}
              defaultNeed={defaultNeed}
              prefilledMessage={prefilledMessage}
              showContact={showContact}
              contactRef={contactRef}
              onBack={back}
              onContact={openContact}
              onRetake={retake}
            />
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
  answeredInStep,
  canContinue,
  onAnswer,
  onBack,
  onNext,
}: {
  category: (typeof categories)[number];
  step: number;
  answers: Record<string, Answer>;
  progress: number;
  answeredInStep: number;
  canContinue: boolean;
  onAnswer: (question: string, value: Answer) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const remainingCount = category.questions.length - answeredInStep;

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_24px_90px_rgba(0,0,0,0.32)] md:shadow-[0_40px_160px_rgba(0,0,0,0.36)] md:backdrop-blur-xl"
    >
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#D6A84F]">
            Step {step + 1} of 3
          </p>
          <p className="text-sm font-semibold text-[#94A3B8]">{answeredInStep} of 5 answered</p>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="p-5 sm:p-6 md:p-8">
        <h2 className="text-4xl font-semibold tracking-tight text-[#F8FAFC] md:text-5xl">{category.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#94A3B8] md:text-lg">{category.description}</p>

        <div className="mt-8 grid gap-5">
          {category.questions.map((question, index) => {
            const selected = answers[keyFor(category.id, question.text)];
            return (
              <motion.div
                key={question.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: index * 0.025 }}
                className="rounded-xl border border-white/10 bg-[#0A0D14]/50 p-4 sm:p-5"
              >
                <p className="text-base font-semibold leading-7 text-[#F8FAFC]">{question.text}</p>
                <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
                  {answerOptions.map((option) => (
                    <AnswerButton
                      key={option.value}
                      option={option}
                      selected={selected === option.value}
                      onClick={() => onAnswer(question.text, option.value)}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-white/10 bg-[#0A0D14] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5 md:bg-[#0A0D14]/90 md:backdrop-blur-xl">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 0}
          className="inline-flex h-12 touch-manipulation items-center justify-center gap-2 rounded-md border border-white/12 px-5 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#D6A84F]/60 hover:bg-white/[0.06] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 sm:h-14"
        >
          <ArrowLeft size={17} />
          Back
        </button>
        <div className="grid gap-2 sm:justify-items-end">
          {!canContinue ? (
            <p className="text-center text-xs font-semibold text-[#94A3B8] sm:text-right" aria-live="polite">
              Answer {remainingCount} more {remainingCount === 1 ? "question" : "questions"} to continue.
            </p>
          ) : null}
          <PremiumButton onClick={onNext} disabled={!canContinue}>
            {step === 2 ? "View Results" : "Next"}
          </PremiumButton>
        </div>
      </div>
    </motion.div>
  );
}

function AnswerButton({
  option,
  selected,
  onClick,
}: {
  option: { value: Answer; label: string };
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex min-h-16 touch-manipulation flex-col items-center justify-center gap-1 rounded-lg border px-1 text-center transition-[transform,background-color,border-color,color,box-shadow] duration-150 hover:-translate-y-0.5 active:scale-[0.99] sm:min-h-20 sm:px-2",
        selected
          ? "border-[#D6A84F] bg-[#D6A84F]/16 text-[#F8FAFC] shadow-[0_0_22px_rgba(214,168,79,0.14)]"
          : "border-white/12 bg-white/[0.04] text-[#CBD5E1] hover:border-[#D6A84F]/60 hover:bg-white/[0.07]",
      )}
    >
      <span className="font-mono text-lg font-semibold sm:text-2xl">{option.value}</span>
      <span className="text-[10px] font-semibold leading-tight sm:text-xs">{option.label}</span>
    </button>
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
  defaultNeed,
  prefilledMessage,
  showContact,
  contactRef,
  onBack,
  onContact,
  onRetake,
}: {
  results: SnapshotResults;
  defaultNeed: string;
  prefilledMessage: string;
  showContact: boolean;
  contactRef: RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onContact: () => void;
  onRetake: () => void;
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

      <div className="grid gap-5 p-5 sm:p-6 md:p-8">
        <section className="rounded-xl border border-white/10 bg-[#0A0D14]/60 p-5 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#94A3B8]">Overall score</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-4xl font-semibold tracking-tight text-[#D6A84F] md:text-6xl">
                {results.overallLabel}
              </p>
              <p className="mt-3 max-w-3xl text-base leading-7 text-[#CBD5E1]">{results.overallInterpretation}</p>
            </div>
            <p className="font-mono text-3xl font-semibold text-white/60">{results.totalScore}/60</p>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {results.categories.map((result, index) => (
            <ResultCard key={result.id} result={result} index={index} />
          ))}
        </section>

        <section className="rounded-xl border border-white/10 bg-[#0A0D14]/60 p-5 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#D6A84F]">
            What happens with your results
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#CBD5E1]">
            Your answers give me a clear starting point. I&rsquo;ll review what you shared and
            respond within 1 business day with an honest read — what I see, what&rsquo;s worth addressing
            first, and whether there&rsquo;s a clear path forward.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#94A3B8]">
            No automated response. No generic follow-up. Just a direct reply from me.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onContact}
              className="inline-flex h-14 touch-manipulation items-center justify-center gap-2 rounded-md bg-[#D6A84F] px-6 text-base font-semibold text-[#0A0D14] shadow-[0_14px_42px_rgba(214,168,79,0.24)] transition hover:bg-[#E8BE63] active:scale-[0.985]"
            >
              Send My Results to Adan
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={onContact}
              className="inline-flex h-14 items-center justify-center text-sm font-semibold text-[#D6A84F] transition hover:text-[#E8BE63]"
            >
              Prefer to talk through it directly? Start a conversation →
            </button>
          </div>
        </section>

        {showContact ? (
          <section ref={contactRef} className="rounded-xl border border-white/10 bg-white/[0.07] p-5 sm:p-6">
            <ContactForm
              key={`${results.overallLabel}-${defaultNeed}`}
              variant="dark"
              source="Snapshot results inquiry"
              submitLabel="Send My Results to Adan"
              successMessage="Thanks. I’ll review your snapshot and respond within 1 business day."
              defaultNeed={defaultNeed}
              defaultMessage={prefilledMessage}
              expectationText="After you send this: I’ll review your results and respond within 1 business day with an honest read. No pitch. No obligation. Just a straight answer."
            />
          </section>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-[#F8FAFC]"
          >
            <ArrowLeft size={16} />
            Review answers
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] transition hover:text-[#F8FAFC]"
          >
            <RotateCcw size={16} />
            Retake the diagnostic →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ResultCard({
  result,
  index,
}: {
  result: (typeof categories)[number] & { score: number; level: CategoryLevel; percent: number; interpretation: string };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-xl border border-white/10 bg-[#0A0D14]/55 p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#F8FAFC]">{result.title}</h3>
          <div className="mt-3 flex items-center gap-2">
            <span className={clsx("h-2.5 w-2.5 rounded-full", colorForLevel(result.level).dot)} />
            <p className={clsx("text-xs font-bold uppercase tracking-[0.16em]", colorForLevel(result.level).text)}>
              {labelForCategoryLevel(result.level)}
            </p>
          </div>
        </div>
        <p className="font-mono text-xl font-semibold text-white/60">{result.score}/20</p>
      </div>
      <FrictionBar percent={result.percent} level={result.level} />
      <p className="mt-4 text-sm leading-6 text-[#94A3B8]">{result.interpretation}</p>
    </motion.article>
  );
}

function FrictionBar({ percent, level }: { percent: number; level: CategoryLevel }) {
  return (
    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
      <motion.div
        className={clsx("h-full rounded-full", colorForLevel(level).bar)}
        initial={{ width: "0%" }}
        animate={{ width: `${Math.max(percent, 6)}%` }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function SidePanel({ activeStep }: { activeStep: number }) {
  const steps = [...categories.map((category) => category.title), "Results"];

  return (
    <aside className="hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl lg:block">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D6A84F]">Diagnostic path</p>
      <div className="mt-5 grid gap-2">
        {steps.map((title, index) => (
          <div
            key={title}
            className={clsx(
              "rounded-lg border px-4 py-3 text-sm font-semibold transition",
              activeStep === index
                ? "border-[#D6A84F]/70 bg-[#D6A84F]/10 text-[#F8FAFC]"
                : activeStep > index
                  ? "border-[#D6A84F]/25 bg-[#D6A84F]/5 text-[#F8FAFC]"
                  : "border-white/10 bg-white/[0.03] text-[#94A3B8]",
            )}
          >
            {title}
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
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-14 w-full touch-manipulation items-center justify-center gap-2 rounded-md bg-[#D6A84F] px-6 text-base font-semibold text-[#0A0D14] shadow-[0_14px_42px_rgba(214,168,79,0.24)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#E8BE63] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 sm:min-w-40 sm:w-auto"
    >
      {children}
      <ArrowRight size={18} />
    </button>
  );
}

function keyFor(categoryId: string, question: string) {
  return `${categoryId}:${question}`;
}

function scoreAnswer(answer: Answer, positive: boolean) {
  return positive ? 5 - answer : answer - 1;
}

function getCategoryLevel(score: number): CategoryLevel {
  if (score <= 5) return "low";
  if (score <= 11) return "moderate";
  return "high";
}

function getOverallLevel(score: number): OverallLevel {
  if (score <= 14) return "low";
  if (score <= 29) return "moderate";
  if (score <= 44) return "high";
  return "critical";
}

function labelForCategoryLevel(level: CategoryLevel) {
  if (level === "low") return "Low";
  if (level === "moderate") return "Moderate";
  return "High";
}

function labelForOverallLevel(level: OverallLevel) {
  if (level === "low") return "Low Friction";
  if (level === "moderate") return "Moderate Friction";
  if (level === "high") return "High Friction";
  return "Critical Friction";
}

function colorForLevel(level: CategoryLevel | OverallLevel) {
  if (level === "low") return { text: "text-[#64748B]", dot: "bg-[#64748B]", bar: "bg-[#64748B]" };
  if (level === "moderate") return { text: "text-[#B8922A]", dot: "bg-[#B8922A]", bar: "bg-[#B8922A]" };
  if (level === "high") return { text: "text-[#D6A84F]", dot: "bg-[#D6A84F]", bar: "bg-[#D6A84F]" };
  return { text: "text-[#F0C060]", dot: "bg-[#F0C060]", bar: "bg-[#F0C060]" };
}

function needForHighestCategory(
  categoryResults: Array<{ title: string; score: number }>,
) {
  const maxScore = Math.max(...categoryResults.map((item) => item.score));
  const highest = categoryResults.filter((item) => item.score === maxScore);
  if (highest.length !== 1) return "";
  if (highest[0].title === "Customer Flow") return "Revenue friction";
  if (highest[0].title === "Team Workflow") return "Workflow optimization";
  if (highest[0].title === "Data Visibility") return "SaaS/tool consolidation";
  return "";
}
