"use client";

import { motion, AnimatePresence } from "framer-motion";
import { COLORS } from "./config";

interface ConstraintCinematicTextProps {
  phase: string;
  phaseProgress: number;
  constraintLabel: string;
  // Normalized X position of the constraint node (0–1) for local anchoring
  constraintXRatio: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ConstraintCinematicText({
  phase,
  phaseProgress,
  constraintLabel,
  constraintXRatio,
}: ConstraintCinematicTextProps) {
  // Clamp horizontal anchor so text never overflows edges
  const anchorLeft = `${Math.min(Math.max(constraintXRatio * 100, 18), 82)}%`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── Impact: first message ─────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === "impact" && phaseProgress >= 0.15 && phaseProgress < 0.55 && (
          <motion.div
            key="msg1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease }}
            className="absolute bottom-[36%]"
            style={{ left: anchorLeft, transform: "translateX(-50%)" }}
          >
            <p
              className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: COLORS.gold }}
            >
              Everything slows down here.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Impact: second message ────────────────────────────────────────── */}
      <AnimatePresence>
        {phase === "impact" && phaseProgress >= 0.52 && (
          <motion.div
            key="msg2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease }}
            className="absolute bottom-[24%] left-1/2 -translate-x-1/2 text-center space-y-2 px-4"
          >
            <p
              className="text-sm font-semibold"
              style={{ color: COLORS.primaryText }}
            >
              This is where your business loses money.
            </p>
            <p
              className="text-xs"
              style={{ color: COLORS.mutedText }}
            >
              {constraintLabel} constraint restricts throughput
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Technology: intervention label ────────────────────────────────── */}
      <AnimatePresence>
        {phase === "technology" && phaseProgress >= 0.12 && (
          <motion.div
            key="tech"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease }}
            className="absolute bottom-[30%]"
            style={{ left: anchorLeft, transform: "translateX(-50%)" }}
          >
            <div
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest whitespace-nowrap"
              style={{
                backgroundColor: "rgba(201, 150, 58, 0.15)",
                border: `1px solid ${COLORS.gold}`,
                color: COLORS.gold,
                boxShadow: "0 0 12px rgba(201, 150, 58, 0.2)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: COLORS.gold }}
              />
              Technology applied where it matters
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
