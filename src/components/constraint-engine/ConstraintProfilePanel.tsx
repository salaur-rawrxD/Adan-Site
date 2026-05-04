"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { COLORS, constraintNodes } from "./config";

interface ConstraintProfilePanelProps {
  nodeId: string | null;
  onClose: () => void;
  onRunDiagnostic?: (nodeId: string) => void;
}

const SEVERITY_CONFIG = {
  High:   { bg: "rgba(127, 29, 29, 0.35)", border: "rgba(127,29,29,0.6)", text: "#FCA5A5" },
  Medium: { bg: "rgba(120, 53, 15, 0.35)", border: "rgba(120,53,15,0.6)", text: "#FCD34D" },
  Low:    { bg: "rgba(20, 83, 45, 0.35)",  border: "rgba(20,83,45,0.6)",  text: "#6EE7B7" },
};

const METRIC_LABELS = {
  timeLost:     "Time Lost",
  errorRisk:    "Error Risk",
  visibility:   "Visibility",
  revenueDelay: "Revenue Delay",
};

const METRIC_SEVERITY_COLOR = {
  High:   "#FCA5A5",
  Medium: "#FCD34D",
  Low:    "#6EE7B7",
};

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: "High" | "Medium" | "Low";
}) {
  const color = METRIC_SEVERITY_COLOR[value];
  const filled = value === "High" ? 3 : value === "Medium" ? 2 : 1;

  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className="text-xs font-medium"
        style={{ color: COLORS.mutedText }}
      >
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: dot <= filled ? color : "rgba(255,255,255,0.1)",
            }}
          />
        ))}
        <span
          className="ml-1 text-xs font-semibold"
          style={{ color }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function SectionList({
  items,
  accentColor = COLORS.gold,
}: {
  items: string[];
  accentColor?: string;
}) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2.5 text-sm leading-snug">
          <span
            className="mt-0.5 shrink-0 text-xs font-bold"
            style={{ color: accentColor }}
          >
            →
          </span>
          <span style={{ color: COLORS.mutedText }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ConstraintProfilePanel({
  nodeId,
  onClose,
  onRunDiagnostic,
}: ConstraintProfilePanelProps) {
  const node = nodeId ? constraintNodes.find((n) => n.id === nodeId) : null;

  useEffect(() => {
    if (!nodeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [nodeId, onClose]);

  const isOpen = !!node;
  const severity = node?.severity ?? "High";
  const sevConfig = SEVERITY_CONFIG[severity];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto"
        style={{
          backgroundColor: COLORS.panel,
          borderLeft: `1px solid rgba(201,150,58,0.2)`,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={node ? `Constraint Profile: ${node.label}` : undefined}
      >
        {node && (
          <div className="flex h-full flex-col">
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div
              className="flex items-start justify-between p-6"
              style={{ borderBottom: `1px solid rgba(201,150,58,0.12)` }}
            >
              <div className="space-y-2">
                <p
                  className="text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ color: COLORS.gold }}
                >
                  Constraint Profile
                </p>
                <h2
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: COLORS.primaryText }}
                >
                  {node.label}
                </h2>
                {/* Severity badge */}
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor: sevConfig.bg,
                    border: `1px solid ${sevConfig.border}`,
                    color: sevConfig.text,
                  }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sevConfig.text }} />
                  Severity: {severity}
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-white/8"
                aria-label="Close panel"
              >
                <X size={18} style={{ color: COLORS.mutedText }} />
              </button>
            </div>

            {/* ── Insight line ───────────────────────────────────────────── */}
            <div
              className="px-6 py-4"
              style={{ borderBottom: `1px solid rgba(201,150,58,0.08)` }}
            >
              <p className="text-sm leading-relaxed" style={{ color: COLORS.mutedText }}>
                This is where your operation slows down.
              </p>
            </div>

            {/* ── Micro-metrics grid ─────────────────────────────────────── */}
            <div
              className="px-6 py-5 space-y-3"
              style={{ borderBottom: `1px solid rgba(201,150,58,0.08)` }}
            >
              <p
                className="text-xs font-bold uppercase tracking-[0.14em]"
                style={{ color: COLORS.gold }}
              >
                System Readings
              </p>
              <div className="space-y-2.5">
                {(Object.entries(METRIC_LABELS) as [keyof typeof METRIC_LABELS, string][]).map(
                  ([key, label]) => (
                    <MetricRow
                      key={key}
                      label={label}
                      value={node.metrics[key]}
                    />
                  )
                )}
              </div>
            </div>

            {/* ── Content sections ───────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
              <section>
                <p
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: COLORS.gold }}
                >
                  What Breaks Here
                </p>
                <SectionList items={node.whatBreaks} />
              </section>

              <section>
                <p
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#FCA5A5" }}
                >
                  What It Costs
                </p>
                <SectionList items={node.whatItCosts} accentColor="#FCA5A5" />
              </section>

              <section>
                <p
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#6EE7B7" }}
                >
                  What Fixes It
                </p>
                <SectionList items={node.whatFixesIt} accentColor="#6EE7B7" />
              </section>
            </div>

            {/* ── Footer CTA ─────────────────────────────────────────────── */}
            <div
              className="p-6 space-y-2"
              style={{ borderTop: `1px solid rgba(201,150,58,0.12)` }}
            >
              <button
                onClick={() => {
                  if (nodeId) onRunDiagnostic?.(nodeId);
                }}
                className="w-full rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wide transition hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: COLORS.gold,
                  color: COLORS.background,
                }}
              >
                Diagnose This Constraint
              </button>
              <button
                onClick={onClose}
                className="w-full rounded-lg px-4 py-3 text-sm font-semibold transition hover:bg-white/5"
                style={{
                  color: COLORS.mutedText,
                  border: `1px solid rgba(255,255,255,0.08)`,
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
