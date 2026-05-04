export interface ConstraintNodeData {
  id: string;
  label: string;
  severity: "High" | "Medium" | "Low";
  examples: string[];
  whatBreaks: string[];
  whatItCosts: string[];
  whatFixesIt: string[];
  metrics: {
    timeLost: "High" | "Medium" | "Low";
    errorRisk: "High" | "Medium" | "Low";
    visibility: "High" | "Medium" | "Low";
    revenueDelay: "High" | "Medium" | "Low";
  };
}

export const constraintNodes: ConstraintNodeData[] = [
  {
    id: "demand",
    label: "Demand",
    severity: "High",
    examples: [
      "Inquiries come in, but follow-up is inconsistent",
      "Leads are not prioritized by value",
      "No clear intake path",
    ],
    whatBreaks: [
      "Inquiries come in, but follow-up is inconsistent",
      "Leads are not prioritized by value",
      "No clear intake path",
    ],
    whatItCosts: [
      "Good opportunities go cold",
      "Team chases low-value work",
      "Revenue leaks before sales begins",
    ],
    whatFixesIt: [
      "Lead intake routing",
      "Follow-up automation",
      "Value-based prioritization",
    ],
    metrics: {
      timeLost: "High",
      errorRisk: "Medium",
      visibility: "Low",
      revenueDelay: "High",
    },
  },
  {
    id: "sales",
    label: "Sales",
    severity: "High",
    examples: [
      "Quotes sit too long",
      "Handoffs are unclear",
      "Next steps are not tracked",
    ],
    whatBreaks: [
      "Quotes sit too long",
      "Handoffs are unclear",
      "Next steps are not tracked",
    ],
    whatItCosts: [
      "Deals stall",
      "Customers lose confidence",
      "Forecasting becomes guesswork",
    ],
    whatFixesIt: [
      "Quote workflows",
      "CRM cleanup",
      "Automated follow-up triggers",
    ],
    metrics: {
      timeLost: "High",
      errorRisk: "Medium",
      visibility: "Low",
      revenueDelay: "High",
    },
  },
  {
    id: "operations",
    label: "Operations",
    severity: "High",
    examples: [
      "Work waits on one person",
      "Approvals are manual",
      "Teams use workarounds",
    ],
    whatBreaks: [
      "Work waits on one person",
      "Approvals are manual",
      "Teams use workarounds",
    ],
    whatItCosts: [
      "Delivery slows down",
      "Staff gets frustrated",
      "Capacity is trapped",
    ],
    whatFixesIt: [
      "Role-based approvals",
      "Workflow automation",
      "Operational dashboards",
    ],
    metrics: {
      timeLost: "High",
      errorRisk: "High",
      visibility: "Low",
      revenueDelay: "High",
    },
  },
  {
    id: "tools",
    label: "Tools/Data",
    severity: "High",
    examples: [
      "Same data is entered multiple times",
      "Systems do not talk to each other",
      "Reports are outdated or manual",
    ],
    whatBreaks: [
      "Same data is entered multiple times",
      "Systems do not talk to each other",
      "Reports are outdated or manual",
    ],
    whatItCosts: [
      "Wasted admin time",
      "Bad decisions from stale information",
      "Tool sprawl cost",
    ],
    whatFixesIt: [
      "System integration",
      "Single source of truth",
      "Real-time dashboards",
    ],
    metrics: {
      timeLost: "High",
      errorRisk: "High",
      visibility: "Low",
      revenueDelay: "Medium",
    },
  },
  {
    id: "decisions",
    label: "Decisions",
    severity: "Medium",
    examples: [
      "Owner becomes the bottleneck",
      "Teams wait for direction",
      "Priorities change without visibility",
    ],
    whatBreaks: [
      "Owner becomes the bottleneck",
      "Teams wait for direction",
      "Priorities change without visibility",
    ],
    whatItCosts: [
      "Work pauses",
      "Leaders stay buried in details",
      "Teams guess instead of knowing",
    ],
    whatFixesIt: [
      "Decision rules",
      "Visibility dashboards",
      "Escalation paths",
    ],
    metrics: {
      timeLost: "High",
      errorRisk: "Medium",
      visibility: "Low",
      revenueDelay: "Medium",
    },
  },
  {
    id: "revenue",
    label: "Revenue",
    severity: "High",
    examples: [
      "Cash is delayed",
      "Capacity is underused",
      "Customers drop off before close",
    ],
    whatBreaks: [
      "Cash is delayed",
      "Capacity is underused",
      "Customers drop off before close",
    ],
    whatItCosts: [
      "Revenue gets trapped",
      "Margin shrinks",
      "Growth feels harder than it should",
    ],
    whatFixesIt: [
      "Revenue operations visibility",
      "Faster handoff paths",
      "Closing and collection workflows",
    ],
    metrics: {
      timeLost: "Medium",
      errorRisk: "Medium",
      visibility: "Low",
      revenueDelay: "High",
    },
  },
];

// Organic node positions — slight vertical variation for natural feel
// SVG coordinate space: 0 0 1000 400
export const NODE_LAYOUT = [
  { x: 88,  y: 212 }, // Demand
  { x: 252, y: 184 }, // Sales
  { x: 418, y: 224 }, // Operations
  { x: 582, y: 180 }, // Tools/Data
  { x: 742, y: 218 }, // Decisions
  { x: 900, y: 194 }, // Revenue
] as const;

export const CANVAS_CONFIG = {
  width: 1000,
  height: 400,
  nodeRadius: 30,
};

export const COLORS = {
  background: "#0B0B0C",
  panel: "#111114",
  cardSurface: "#18181B",
  primaryText: "#F5F5F5",
  mutedText: "#A1A1AA",
  gold: "#C9963A",
  goldBright: "#E8BE63",
  goldDim: "rgba(201, 150, 58, 0.22)",
  warningRed: "#7F1D1D",
  successGreen: "#14532D",
  linePrimary: "rgba(201, 150, 58, 0.28)",
  lineActive: "rgba(201, 150, 58, 0.75)",
};

// Phase durations in milliseconds — cinematic pacing optimized for drama
export const ANIMATION_TIMING = {
  normal:     3200,  // Let the system settle, feel normal
  emerging:   1800,  // Gradual buildup
  pressure:   2400,  // Build tension
  impact:     3400,  // Long, dramatic reveal — the money moment
  technology: 2100,  // Resolution
  reset:      1200,  // Quick return to normal
} as const;
