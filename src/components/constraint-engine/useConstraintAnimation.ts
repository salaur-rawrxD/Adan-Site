"use client";

import { useEffect, useRef, useState } from "react";
import { constraintNodes, ANIMATION_TIMING } from "./config";

export type AnimationPhase =
  | "normal"
  | "emerging"
  | "pressure"
  | "impact"
  | "technology"
  | "reset";

export interface AnimationState {
  currentPhase: AnimationPhase;
  phaseProgress: number; // 0–1 within the current phase
  constraintNodeId: string;
  constraintNodeIndex: number;
  metrics: {
    throughput: number; // 0–1
    revenue: number;    // 0–1
  };
}

const PHASES: AnimationPhase[] = [
  "normal",
  "emerging",
  "pressure",
  "impact",
  "technology",
  "reset",
];

const TOTAL_CYCLE = (Object.values(ANIMATION_TIMING) as number[]).reduce(
  (a, b) => a + b,
  0
);

function computeMetrics(
  phase: AnimationPhase,
  progress: number
): { throughput: number; revenue: number } {
  switch (phase) {
    case "emerging":
      return {
        throughput: Math.max(0.6, 1 - progress * 0.4),
        revenue: 1,
      };
    case "pressure":
      return {
        throughput: Math.max(0.3, 0.6 - progress * 0.3),
        revenue: Math.max(0.82, 1 - progress * 0.18),
      };
    case "impact":
      return {
        throughput: Math.max(0.2, 0.3 - progress * 0.1),
        revenue: Math.max(0.52, 0.82 - progress * 0.3),
      };
    case "technology":
      return {
        throughput: Math.min(1, 0.2 + progress * 0.8),
        revenue: Math.min(1, 0.52 + progress * 0.48),
      };
    default:
      return { throughput: 1, revenue: 1 };
  }
}

export function useConstraintAnimation(): AnimationState {
  const constraintIdxRef = useRef(2); // Start on Operations
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const lastSetStateRef = useRef(0);

  const [state, setState] = useState<AnimationState>(() => ({
    currentPhase: "normal",
    phaseProgress: 0,
    constraintNodeId: constraintNodes[2].id,
    constraintNodeIndex: 2,
    metrics: { throughput: 1, revenue: 1 },
  }));

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let rafId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const delta = Math.min(now - lastTimeRef.current, 100);
      lastTimeRef.current = now;

      elapsedRef.current += delta;
      if (elapsedRef.current >= TOTAL_CYCLE) {
        elapsedRef.current = 0;
        constraintIdxRef.current =
          (constraintIdxRef.current + 1) % constraintNodes.length;
      }

      // Throttle React state updates to ~30 fps — the canvas RAF loop is independent
      if (now - lastSetStateRef.current >= 33) {
        lastSetStateRef.current = now;

        let cumulative = 0;
        let phase: AnimationPhase = "normal";
        let progress = 0;

        for (const p of PHASES) {
          const dur = ANIMATION_TIMING[p as keyof typeof ANIMATION_TIMING];
          if (elapsedRef.current < cumulative + dur) {
            phase = p;
            progress = (elapsedRef.current - cumulative) / dur;
            break;
          }
          cumulative += dur;
        }

        const idx = constraintIdxRef.current;
        setState({
          currentPhase: phase,
          phaseProgress: progress,
          constraintNodeId: constraintNodes[idx].id,
          constraintNodeIndex: idx,
          metrics: computeMetrics(phase, progress),
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return state;
}
