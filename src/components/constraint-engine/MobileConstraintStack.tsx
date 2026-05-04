"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { constraintNodes, COLORS } from "./config";

interface MobileConstraintStackProps {
  onNodeClick: (nodeId: string) => void;
}

const SEVERITY_CONFIG = {
  High:   { bg: "rgba(127,29,29,0.3)",  border: "rgba(127,29,29,0.5)", text: "#FCA5A5" },
  Medium: { bg: "rgba(120,53,15,0.3)",  border: "rgba(120,53,15,0.5)", text: "#FCD34D" },
  Low:    { bg: "rgba(20,83,45,0.3)",   border: "rgba(20,83,45,0.5)",  text: "#6EE7B7" },
};

const NODE_INDEX_LABEL = ["01", "02", "03", "04", "05", "06"];

export function MobileConstraintStack({ onNodeClick }: MobileConstraintStackProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-2" role="list" aria-label="Constraint nodes">
      {constraintNodes.map((node, idx) => {
        const isOpen = expandedId === node.id;
        const sev = SEVERITY_CONFIG[node.severity];

        return (
          <motion.div
            key={node.id}
            layout
            role="listitem"
            className="overflow-hidden rounded-lg"
            style={{
              backgroundColor: COLORS.cardSurface,
              border: `1px solid ${isOpen ? COLORS.gold : "rgba(201,150,58,0.14)"}`,
              transition: "border-color 200ms ease-out",
            }}
          >
            {/* Row header */}
            <button
              onClick={() => toggle(node.id)}
              aria-expanded={isOpen}
              aria-controls={`node-detail-${node.id}`}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              {/* Index number */}
              <span
                className="shrink-0 font-mono text-xs font-bold"
                style={{ color: COLORS.goldDim }}
              >
                {NODE_INDEX_LABEL[idx]}
              </span>

              {/* Node label */}
              <span
                className="flex-1 text-sm font-semibold"
                style={{ color: COLORS.primaryText }}
              >
                {node.label}
              </span>

              {/* Severity chip */}
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                style={{
                  backgroundColor: sev.bg,
                  border: `1px solid ${sev.border}`,
                  color: sev.text,
                }}
              >
                {node.severity}
              </span>

              {/* Chevron */}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 text-xs"
                style={{ color: COLORS.gold }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
            </button>

            {/* Expanded detail */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`node-detail-${node.id}`}
                  key="detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="space-y-4 px-4 pb-4"
                    style={{ borderTop: `1px solid rgba(201,150,58,0.1)` }}
                  >
                    {/* What breaks */}
                    <div className="pt-3 space-y-2">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: COLORS.gold }}
                      >
                        What Breaks Here
                      </p>
                      <ul className="space-y-1.5">
                        {node.whatBreaks.slice(0, 2).map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-xs leading-snug"
                          >
                            <span
                              className="mt-0.5 shrink-0 font-bold"
                              style={{ color: COLORS.gold }}
                            >
                              →
                            </span>
                            <span style={{ color: COLORS.mutedText }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What it costs (condensed) */}
                    <div className="space-y-2">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: "#FCA5A5" }}
                      >
                        What It Costs
                      </p>
                      <ul className="space-y-1.5">
                        {node.whatItCosts.slice(0, 1).map((item, i) => (
                          <li
                            key={i}
                            className="flex gap-2 text-xs leading-snug"
                          >
                            <span
                              className="mt-0.5 shrink-0 font-bold"
                              style={{ color: "#FCA5A5" }}
                            >
                              →
                            </span>
                            <span style={{ color: COLORS.mutedText }}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        onNodeClick(node.id);
                        setExpandedId(null);
                      }}
                      className="w-full rounded-lg px-3 py-2.5 text-xs font-bold uppercase tracking-wide transition hover:opacity-90 active:scale-[0.98]"
                      style={{
                        backgroundColor: COLORS.gold,
                        color: COLORS.background,
                      }}
                    >
                      Diagnose This Constraint
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
