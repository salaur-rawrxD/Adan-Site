"use client";

import { CANVAS_CONFIG, COLORS } from "./config";

interface ConstraintNodeProps {
  id: string;
  label: string;
  x: number;
  y: number;
  isConstraint: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  phase: string;
  phaseProgress: number;
  throughput: number;
  nodeIndex: number;
  constraintIdx: number;
}

export function ConstraintNode({
  id,
  label,
  x,
  y,
  isConstraint,
  isHovered,
  onHover,
  onClick,
  phase,
  phaseProgress,
  throughput,
  nodeIndex,
  constraintIdx,
}: ConstraintNodeProps) {
  const r = CANVAS_CONFIG.nodeRadius;

  // Subtle vertical jitter for the constraint node during pressure/impact
  let jitterY = 0;
  if (isConstraint && (phase === "pressure" || phase === "impact")) {
    jitterY = Math.sin(phaseProgress * Math.PI * 10) * 1.5;
  }

  // ── Visual state ──────────────────────────────────────────────────────────
  let fillColor = COLORS.cardSurface;
  let strokeColor = COLORS.linePrimary;
  let strokeWidth = 1.5;
  let nodeOpacity = 1;
  let glowRadius = 0;
  let statusColor = "rgba(20, 83, 45, 0.9)"; // successGreen

  const isDownstream = nodeIndex > constraintIdx;
  const isUpstream = nodeIndex < constraintIdx;

  if (isConstraint) {
    statusColor = COLORS.goldBright;

    if (phase === "emerging") {
      strokeColor = COLORS.gold;
      strokeWidth = 2;
    } else if (phase === "pressure" || phase === "impact") {
      fillColor = "rgba(201, 150, 58, 0.15)";
      strokeColor = COLORS.gold;
      strokeWidth = 2.8 + phaseProgress * 1.2;
      glowRadius = r + 14 + phaseProgress * 12;
    } else if (phase === "technology") {
      fillColor = "rgba(201, 150, 58, 0.1)";
      strokeColor = COLORS.gold;
      strokeWidth = 2.2;
      glowRadius = r + 10 + (1 - phaseProgress) * 10;
    }
  } else if (isHovered) {
    strokeColor = COLORS.gold;
    strokeWidth = 2;
    glowRadius = r + 8;
  }

  // Dim downstream nodes when system is under constraint
  if (isDownstream && (phase === "pressure" || phase === "impact")) {
    nodeOpacity = Math.max(0.32, throughput * 0.75);
  }

  // Dim upstream-but-not-constraint nodes slightly during normal flow
  if (isUpstream && phase === "normal") {
    nodeOpacity = 0.82;
  }

  return (
    <g
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${label} — click to see constraint details`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      style={{ cursor: "pointer" }}
      transform={`translate(0, ${jitterY})`}
    >
      {/* Outer radial glow — only during active constraint states */}
      {glowRadius > 0 && (
        <circle
          cx={x}
          cy={y}
          r={glowRadius}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="1"
          opacity={isConstraint ? phaseProgress * 0.18 : 0.12}
        />
      )}

      {/* Secondary inner glow ring */}
      {isConstraint && (phase === "pressure" || phase === "impact") && (
        <circle
          cx={x}
          cy={y}
          r={r + 5}
          fill="none"
          stroke={COLORS.gold}
          strokeWidth="1.5"
          opacity={0.28 + phaseProgress * 0.2}
        />
      )}

      {/* Main node body */}
      <circle
        cx={x}
        cy={y}
        r={r}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={nodeOpacity}
        style={{
          filter: isConstraint && (phase === "pressure" || phase === "impact")
            ? `drop-shadow(0 0 ${10 + phaseProgress * 10}px ${COLORS.gold}66) drop-shadow(0 4px 12px rgba(0,0,0,0.6))`
            : isHovered
            ? `drop-shadow(0 0 10px ${COLORS.gold}55) drop-shadow(0 2px 8px rgba(0,0,0,0.4))`
            : "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
          transition: "stroke-width 400ms ease-out, opacity 400ms ease-out, filter 400ms ease-out",
        }}
      />

      {/* Status indicator dot — top-right of node */}
      <circle
        cx={x + r - 9}
        cy={y - r + 9}
        r={5}
        fill={statusColor}
        opacity={nodeOpacity}
        style={{
          filter: isConstraint ? `drop-shadow(0 0 4px ${COLORS.goldBright})` : "none",
          transition: "fill 400ms ease-out",
        }}
      />

      {/* Node label */}
      <text
        x={x}
        y={y + r + 22}
        textAnchor="middle"
        fill={COLORS.primaryText}
        fontSize="13"
        fontWeight="500"
        opacity={nodeOpacity}
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
        letterSpacing="0.01em"
        style={{ transition: "opacity 400ms ease-out" }}
      >
        {label}
      </text>

      {/* Hover tooltip */}
      {isHovered && (
        <g>
          <rect
            x={x - 82}
            y={y - r - 58}
            width="164"
            height="44"
            rx="6"
            fill={COLORS.panel}
            stroke={COLORS.gold}
            strokeWidth="1"
            opacity="0.96"
          />
          {/* Triangle pointer */}
          <polygon
            points={`${x - 6},${y - r - 14} ${x + 6},${y - r - 14} ${x},${y - r - 6}`}
            fill={COLORS.panel}
            stroke={COLORS.gold}
            strokeWidth="1"
          />
          <text
            x={x}
            y={y - r - 38}
            textAnchor="middle"
            fill={COLORS.goldBright}
            fontSize="11"
            fontWeight="700"
            letterSpacing="1.2"
            fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
          >
            CLICK TO EXPLORE
          </text>
          <text
            x={x}
            y={y - r - 22}
            textAnchor="middle"
            fill={COLORS.mutedText}
            fontSize="10"
            fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
          >
            See what breaks here
          </text>
        </g>
      )}
    </g>
  );
}
