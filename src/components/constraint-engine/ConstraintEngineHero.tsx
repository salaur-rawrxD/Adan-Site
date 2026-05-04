"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { COLORS } from "./config";
import { useConstraintAnimation } from "./useConstraintAnimation";
import { ConstraintEngineCanvas } from "./ConstraintEngineCanvas";
import { ConstraintProfilePanel } from "./ConstraintProfilePanel";
import { MobileConstraintStack } from "./MobileConstraintStack";

interface ConstraintEngineHeroProps {
  onRunDiagnostic?: (nodeId: string) => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ConstraintEngineHero({ onRunDiagnostic }: ConstraintEngineHeroProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const animation = useConstraintAnimation();

  return (
    <>
      <section
        className="relative min-h-screen overflow-x-hidden"
        style={{ backgroundColor: COLORS.background }}
      >
        {/* Very subtle radial backdrop glow centered behind the canvas area */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 72% 52%, rgba(201,150,58,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* ── Two-column layout (desktop) ─────────────────────────────── */}
          <div className="grid gap-8 py-20 md:py-24 lg:grid-cols-[1fr_1.55fr] lg:items-center lg:gap-10 lg:py-32">
            {/* ── Left: Hero copy ───────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease }}
              className="space-y-8"
            >
              {/* Eyebrow */}
              <p
                className="text-xs font-bold uppercase tracking-[0.22em]"
                style={{ color: COLORS.gold }}
              >
                Theory of Constraints
              </p>

              {/* Headline */}
              <h1
                className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl"
                style={{ color: COLORS.primaryText }}
              >
                Most businesses don&apos;t have a productivity problem.
                <br />
                <span style={{ color: COLORS.gold }}>
                  They have a constraint.
                </span>
              </h1>

              {/* Subcopy */}
              <p
                className="max-w-lg text-base leading-relaxed sm:text-lg"
                style={{ color: COLORS.mutedText }}
              >
                I identify the bottleneck limiting your operation, then
                implement the technology that removes it.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/snapshot"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wide transition hover:opacity-90 active:scale-[0.98]"
                  style={{
                    backgroundColor: COLORS.gold,
                    color: COLORS.background,
                  }}
                >
                  Run the Diagnostic
                </Link>
                <button
                  onClick={() => setActiveNodeId("operations")}
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition hover:bg-white/5"
                  style={{
                    color: COLORS.gold,
                    border: `1px solid rgba(201,150,58,0.35)`,
                  }}
                >
                  Explore the Engine →
                </button>
              </div>

              {/* Credibility line */}
              <p
                className="text-xs font-medium"
                style={{ color: "rgba(161,161,170,0.6)" }}
              >
                Operator-led · Ex-Amazon · Veteran-owned · Technology
                implementation
              </p>
            </motion.div>

            {/* ── Right: Animated canvas (desktop only) ─────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease }}
              className="hidden lg:block"
            >
              <ConstraintEngineCanvas
                phase={animation.currentPhase}
                phaseProgress={animation.phaseProgress}
                constraintNodeId={animation.constraintNodeId}
                constraintNodeIndex={animation.constraintNodeIndex}
                throughput={animation.metrics.throughput}
                revenue={animation.metrics.revenue}
                onNodeClick={setActiveNodeId}
              />
              <p
                className="mt-3 text-center text-xs"
                style={{ color: "rgba(161,161,170,0.45)" }}
              >
                Click any node to see what breaks there
              </p>
            </motion.div>
          </div>

          {/* ── Mobile: card stack (below copy, hidden on desktop) ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="pb-16 lg:hidden"
          >
            <p
              className="mb-4 text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: COLORS.gold }}
            >
              System Nodes — tap to explore
            </p>
            <MobileConstraintStack onNodeClick={setActiveNodeId} />
          </motion.div>
        </div>
      </section>

      {/* ── Constraint Profile Panel ──────────────────────────────────────── */}
      <ConstraintProfilePanel
        nodeId={activeNodeId}
        onClose={() => setActiveNodeId(null)}
        onRunDiagnostic={(nodeId) => {
          onRunDiagnostic?.(nodeId);
          setActiveNodeId(null);
        }}
      />
    </>
  );
}
