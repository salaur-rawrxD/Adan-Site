"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CANVAS_CONFIG, COLORS, NODE_LAYOUT, constraintNodes } from "./config";
import { calculatePathSegments } from "./ParticleSystem";
import { ConstraintNode } from "./ConstraintNode";
import { CanvasParticleLayer } from "./CanvasParticleLayer";
import { ConstraintCinematicText } from "./ConstraintCinematicText";

const NODE_ID_TO_INDEX: Record<string, number> = {
  demand: 0,
  sales: 1,
  operations: 2,
  tools: 3,
  decisions: 4,
  revenue: 5,
};

interface ConstraintEngineCanvasProps {
  phase: string;
  phaseProgress: number;
  constraintNodeId: string;
  constraintNodeIndex: number;
  throughput: number;
  revenue: number;
  onNodeClick: (nodeId: string) => void;
  /** Fill the parent container instead of enforcing the 5:2 aspect ratio */
  fillParent?: boolean;
}

export function ConstraintEngineCanvas({
  phase,
  phaseProgress,
  constraintNodeId,
  constraintNodeIndex,
  throughput,
  revenue,
  onNodeClick,
}: ConstraintEngineCanvasProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const pathSegments = useMemo(
    () => calculatePathSegments(NODE_LAYOUT),
    []
  );

  // ── Path line styling ─────────────────────────────────────────────────────

  const getSegmentStyle = (segIndex: number) => {
    const isUpstream = segIndex < constraintNodeIndex;
    const isAtConstraint =
      segIndex === constraintNodeIndex - 1 || segIndex === constraintNodeIndex;

    let width = 1.5;
    let opacity = 0.32;

    if (phase === "normal") {
      width = 1.5;
      opacity = 0.3 + Math.sin(phaseProgress * Math.PI * 2) * 0.06;
    } else if (phase === "emerging") {
      if (isUpstream) {
        width = 1.5 + phaseProgress * 0.8;
        opacity = 0.32 + phaseProgress * 0.18;
      } else {
        width = 1.5;
        opacity = 0.28;
      }
    } else if (phase === "pressure" || phase === "impact") {
      if (isUpstream) {
        width = 2 + phaseProgress * 1.5;
        opacity = 0.5 + phaseProgress * 0.3;
      } else if (isAtConstraint) {
        width = 2.5 + phaseProgress * 0.8;
        opacity = 0.55 + phaseProgress * 0.2;
      } else {
        width = 1.5;
        opacity = Math.max(0.06, throughput * 0.28);
      }
    } else if (phase === "technology") {
      width = 1.8 + (1 - phaseProgress) * 0.8;
      opacity = 0.35 + phaseProgress * 0.15;
    } else if (phase === "reset") {
      width = 1.5;
      opacity = 0.3 + phaseProgress * 0.04;
    }

    return { width, opacity };
  };

  const constraintNode = constraintNodes[constraintNodeIndex];
  const constraintX = NODE_LAYOUT[constraintNodeIndex]?.x ?? 500;
  const constraintXRatio = constraintX / CANVAS_CONFIG.width;

  return (
    // aspect-ratio matches the SVG viewBox (1000:400 = 5:2)
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "5 / 2" }}
    >
      {/* ── Dark background ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: COLORS.background }}
      />

      {/* ── Subtle engineering grid ───────────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
        style={{ opacity: 0.055 }}
      >
        <defs>
          <pattern
            id="ce-grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke={COLORS.gold}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ce-grid)" />
      </svg>

      {/* ── Animated energy field centered on constraint ───────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${CANVAS_CONFIG.width} ${CANVAS_CONFIG.height}`}
        style={{ opacity: phase === "pressure" || phase === "impact" ? 0.12 : 0.04 }}
      >
        <circle
          cx={constraintX}
          cy={NODE_LAYOUT[constraintNodeIndex]?.y ?? 200}
          r={45 + Math.sin(phaseProgress * Math.PI * 2) * 8}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="1"
          opacity={0.4}
        />
      </svg>

      {/* ── Canvas particle layer (independent 60-fps RAF loop) ───────────── */}
      <CanvasParticleLayer
        phase={phase}
        phaseProgress={phaseProgress}
        constraintIdx={constraintNodeIndex}
        throughput={throughput}
        pathSegments={pathSegments}
      />

      {/* ── SVG: connection paths + nodes ────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${CANVAS_CONFIG.width} ${CANVAS_CONFIG.height}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Business system flow diagram"
      >
        {/* Connection paths */}
        {pathSegments.map((seg) => {
          const { width, opacity } = getSegmentStyle(seg.index);
          const d = `M ${seg.x0},${seg.y0} Q ${seg.x1},${seg.y1} ${seg.x2},${seg.y2}`;

          const isUpstream = seg.index < constraintNodeIndex;
          const shouldGlow =
            (phase === "pressure" || phase === "impact") && isUpstream;

          return (
            <g key={seg.index}>
              {/* Glow duplicate behind the main path */}
              {shouldGlow && (
                <path
                  d={d}
                  fill="none"
                  stroke={COLORS.gold}
                  strokeWidth={width + 5}
                  opacity={opacity * 0.15}
                  strokeLinecap="round"
                />
              )}
              <path
                d={d}
                fill="none"
                stroke={COLORS.gold}
                strokeWidth={width}
                opacity={opacity}
                strokeLinecap="round"
                style={{
                  transition:
                    "stroke-width 350ms ease-out, opacity 350ms ease-out",
                }}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {constraintNodes.map((node, i) => (
          <ConstraintNode
            key={node.id}
            id={node.id}
            label={node.label}
            x={NODE_LAYOUT[i].x}
            y={NODE_LAYOUT[i].y}
            isConstraint={node.id === constraintNodeId}
            isHovered={hoveredNodeId === node.id}
            onHover={setHoveredNodeId}
            onClick={() => onNodeClick(node.id)}
            phase={phase}
            phaseProgress={phaseProgress}
            throughput={throughput}
            nodeIndex={i}
            constraintIdx={constraintNodeIndex}
          />
        ))}

        {/* Constraint detected badge — appears during impact phase */}
        {(phase === "impact" || phase === "technology") && (
          <g
            opacity={
              phase === "impact"
                ? Math.min(1, phaseProgress * 3)
                : Math.max(0, 1 - phaseProgress * 3)
            }
          >
            <rect
              x={constraintX - 96}
              y={NODE_LAYOUT[constraintNodeIndex].y - 88}
              width="192"
              height="52"
              rx="6"
              fill={COLORS.panel}
              stroke={COLORS.goldDim}
              strokeWidth="1"
            />
            <text
              x={constraintX}
              y={NODE_LAYOUT[constraintNodeIndex].y - 66}
              textAnchor="middle"
              fill={COLORS.gold}
              fontSize="10"
              fontWeight="700"
              letterSpacing="1.8"
              fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            >
              ⚠ CONSTRAINT DETECTED
            </text>
            <text
              x={constraintX}
              y={NODE_LAYOUT[constraintNodeIndex].y - 50}
              textAnchor="middle"
              fill={COLORS.mutedText}
              fontSize="9.5"
              fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            >
              {constraintNode?.label} · flow restricted
            </text>
          </g>
        )}
      </svg>

      {/* ── Cinematic text overlays ───────────────────────────────────────── */}
      <ConstraintCinematicText
        phase={phase}
        phaseProgress={phaseProgress}
        constraintLabel={constraintNode?.label ?? ""}
        constraintXRatio={constraintXRatio}
      />

      {/* ── Revenue throughput meter ──────────────────────────────────────── */}
      <div
        className="absolute right-4 top-4 space-y-2 rounded-lg p-3"
        style={{
          backgroundColor: "rgba(17, 17, 20, 0.82)",
          border: `1px solid ${COLORS.goldDim}`,
          backdropFilter: "blur(8px)",
        }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: COLORS.mutedText }}
        >
          Revenue Flow
        </p>
        <div
          className="h-1.5 w-28 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(201, 150, 58, 0.12)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: COLORS.gold }}
            animate={{ width: `${revenue * 100}%` }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />
        </div>
        <p
          className="text-xs font-bold tabular-nums"
          style={{
            color:
              revenue > 0.8
                ? COLORS.primaryText
                : revenue > 0.6
                ? COLORS.gold
                : COLORS.goldBright,
          }}
        >
          {Math.round(revenue * 100)}%
        </p>
      </div>

      {/* ── Edge vignette — makes the canvas bleed into the hero ─────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 120% 110% at 50% 50%, transparent 55%, rgba(11,11,12,0.55) 100%),
            linear-gradient(to right, rgba(11,11,12,0.55) 0%, transparent 10%, transparent 90%, rgba(11,11,12,0.55) 100%),
            linear-gradient(to bottom, rgba(11,11,12,0.4) 0%, transparent 18%, transparent 80%, rgba(11,11,12,0.65) 100%)
          `,
        }}
      />
    </div>
  );
}
