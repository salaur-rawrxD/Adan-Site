# Constraint Engine Hero — System Documentation

## Overview

The Constraint Engine is a highly animated, cinematic interactive system that visualizes business bottlenecks and their impact on flow. It's designed to feel premium, intentional, and organic — not template-like or generic.

This is **not a diagram**. This is a **system simulation** that shows:
- How constraints restrict flow through a business
- The visible congestion and slowdown at bottlenecks
- How technology intervention clears constraints
- The return to healthy throughput

---

## Architecture

### Core Components

#### 1. **ConstraintEngineHero** (`ConstraintEngineHero.tsx`)
Main container component. Handles:
- Two-column layout (text left, canvas right)
- Hero copy and CTAs
- Mobile fallback with card stack
- Panel state management for node details
- Animation orchestration via `useConstraintAnimation`

**Props:**
```typescript
interface ConstraintEngineHeroProps {
  onRunDiagnostic?: (nodeId: string) => void;
}
```

**Key Features:**
- Responsive layout: desktop grid, mobile stack
- Credibility line with operator credentials
- Link to Snapshot diagnostic
- Integration with ConstraintProfilePanel

---

#### 2. **ConstraintEngineCanvas** (`ConstraintEngineCanvas.tsx`)
SVG + Canvas hybrid visualization. Renders:
- Subtle background grid
- Connection paths between nodes (quadratic bezier)
- Node circles with labels and status indicators
- Cinematic text overlays
- Revenue flow meter (top-right)
- Edge vignette for seamless blending

**Props:**
```typescript
interface ConstraintEngineCanvasProps {
  phase: string;
  phaseProgress: number;
  constraintNodeId: string;
  constraintNodeIndex: number;
  throughput: number;
  revenue: number;
  onNodeClick: (nodeId: string) => void;
  fillParent?: boolean;
}
```

**Rendering Strategy:**
- SVG for paths and nodes (clean, scalable, interactive)
- Canvas layer for particles (60fps performance)
- Background grid with 0.055 opacity for subtle depth

---

#### 3. **CanvasParticleLayer** (`CanvasParticleLayer.tsx`)
High-performance particle system. Renders **105 particles** flowing through the network.

**Features:**
- Independent 60fps RAF loop (decoupled from React state)
- Quadratic bezier path following
- Depth layering (5 layers) for parallax
- Constraint-aware physics:
  - **Normal**: Free flow at full speed
  - **Emerging**: Particles begin to slow upstream
  - **Pressure**: Dramatic slowdown before constraint, visible stacking
  - **Impact**: Nearly frozen flow, maximum congestion
  - **Technology**: Smooth acceleration as constraint resolves
- Organic micro-jitter for lifelike movement
- Glow effects on stacking particles

**Particle Properties:**
```typescript
interface Particle {
  segIdx: number;          // Which path segment (0-4)
  t: number;               // Position along segment (0-1)
  speedMult: number;       // Individual speed variance (0.45-1.55)
  radius: number;          // 1.4-4.6px for size variation
  baseOpacity: number;     // 0.4-1.0 for transparency variance
  life: number;            // Pulses for organic opacity
  jitter: number;          // Random offset for micro-movement
  depth: number;           // z-layer for layering (0-1)
}
```

**Performance Optimizations:**
- Canvas 2D context (faster than SVG for 100+ particles)
- Letterbox transform matching SVG viewBox
- Depth sorting once per frame (not per-particle)
- Clamped delta time (max 50ms) to prevent physics jumps
- Cleanup on unmount (RAF cancellation)

---

#### 4. **ConstraintNode** (`ConstraintNode.tsx`)
Interactive SVG node circle. Renders:
- Main node circle (30px radius)
- Status indicator dot (top-right)
- Label text below
- Hover tooltip with "CLICK TO EXPLORE"
- Glowing rings during constraint phases
- Drop shadow with phase-based intensity

**Visual States:**
- **Normal**: Subtle fill, 1.5px stroke
- **Hovered**: Gold outline, 2px stroke, glow ring
- **Constraint + Emerging**: Gold border thickening
- **Constraint + Pressure/Impact**: Large glow ring, pulsing fill, dramatic shadow
- **Constraint + Technology**: Fading glow, gradual return to normal
- **Downstream (Pressure/Impact)**: Dimmed to show throughput loss

**Interaction:**
- Hover reveals tooltip
- Click triggers node detail panel
- Keyboard accessible (Enter key)

---

#### 5. **ConstraintCinematicText** (`ConstraintCinematicText.tsx`)
Overlaid text that appears at key moments in the animation cycle.

**Moments:**
1. **Impact Phase (15%-55% progress)**
   - "Everything slows down here." (gold text, appears near constraint node)
   
2. **Impact Phase (52%+ progress)**
   - "This is where your business loses money."
   - "{Node} constraint restricts throughput" (subtext)

3. **Technology Phase (12%+ progress)**
   - "Technology applied where it matters" (pill badge with pulsing dot)

**Animation Details:**
- Staggered entry with 0.6-0.7s easing
- Positioned relative to constraint node X coordinate
- Edge clamping prevents overflow (18%-82% bounds)
- Smooth exit fades

---

### System Configuration

#### **config.ts**
Central configuration hub.

**Colors:**
```typescript
{
  background: "#0B0B0C",      // Very dark, premium
  panel: "#111114",           // Slightly lighter panels
  cardSurface: "#18181B",     // Card backgrounds
  primaryText: "#F5F5F5",     // Main text
  mutedText: "#A1A1AA",       // Secondary text
  gold: "#C9963A",            // Primary accent
  goldBright: "#E8BE63",      // Highlighted accent
  goldDim: "rgba(201,150,58,0.22)", // Subtle backgrounds
  linePrimary: "rgba(201,150,58,0.28)",
  lineActive: "rgba(201,150,58,0.75)",
}
```

**Node Layout** (SVG coordinates, 1000×400):
```typescript
[
  { x: 88,  y: 212 }, // Demand
  { x: 252, y: 184 }, // Sales
  { x: 418, y: 224 }, // Operations
  { x: 582, y: 180 }, // Tools/Data
  { x: 742, y: 218 }, // Decisions
  { x: 900, y: 194 }, // Revenue
]
```

**Animation Timing** (total ~14.3 seconds):
```typescript
{
  normal:     3200ms,  // Baseline flow
  emerging:   1800ms,  // Constraint building
  pressure:   2400ms,  // Visible slowdown
  impact:     3400ms,  // Dramatic peak (money moment)
  technology: 2100ms,  // Resolution
  reset:      1200ms,  // Return to start
}
```

---

### Animation Flow

#### **Phase: Normal** (3.2s)
- Full throughput (particles at 100% speed)
- All nodes at normal opacity
- Relaxed particle distribution
- System feels healthy

#### **Phase: Emerging** (1.8s)
- Constraint node begins to highlight
- Upstream particles slow to 32-68% speed
- Line opacity increases
- First signs of trouble

#### **Phase: Pressure** (2.4s)
- Dramatic upstream slowdown (1-99% speed reduction)
- Visible particle stacking before constraint
- Lines thicken, glow intensifies
- Downstream becomes sparse (throughput × 0.3)
- System feels tight

#### **Phase: Impact** (3.4s)
- **THE CINEMATIC MOMENT**
- Upstream particles nearly frozen (0.5% speed)
- Massive visible congestion
- Constraint node maximum glow (18px + 6px progression)
- Cinematic text reveals: "Everything slows down here."
- Pause for impact
- Second reveal: "This is where your business loses money."
- Revenue drops to 52%
- **This is the hero moment** — user sees their problem visualized

#### **Phase: Technology** (2.1s)
- Gold pulse effect
- Particles accelerate smoothly (15%-130% speed)
- "Technology applied where it matters" badge appears
- Glow fades gradually
- Throughput recovers
- Revenue climbs back to normal
- System feels healed

#### **Phase: Reset** (1.2s)
- Quick fade back to normal
- Prep for next constraint node
- Loop cycles to different constraint

---

## Customization Guide

### Tweaking Particle Behavior

**Particle Density:**
```typescript
// In CanvasParticleLayer.tsx
const PARTICLE_COUNT = 105; // Increase for denser flow, decrease for cleaner look
```

**Base Speed:**
```typescript
const BASE_SPEED = 0.125; // Segments per second. 0.1 = slower, 0.15 = faster
```

**Speed Variance:**
```typescript
// In makeParticles()
speedMult: 0.45 + Math.random() * 1.1, // Range: 0.45–1.55
// Increase range (e.g., 0.3–1.8) for wilder variation
```

**Particle Size:**
```typescript
radius: 1.4 + Math.random() * 3.2, // Range: 1.4–4.6px
// Smaller particles: 1.2 + Math.random() * 2.0
// Larger particles: 2.0 + Math.random() * 5.0
```

**Glow Intensity:**
```typescript
// In canvas rendering loop, pressure phase:
const glowIntensity = phase === "impact" ? 18 : 12; // Increase for brighter glow
```

### Tweaking Constraint Physics

**Slowdown Curves:**
```typescript
// Pressure phase upstream slowdown
speed *= Math.max(0.01, 1 - phaseProgress * 0.99);
// Increase 0.99 to 0.95 = less dramatic slowdown
// Increase 0.01 to 0.05 = never fully stops

// Impact phase upstream
speed *= 0.005; // Nearly frozen. 0.01 = more movement, 0.001 = completely still
```

**Stacking Offset:**
```typescript
const stackAmount = (8 + Math.sin(p.jitter * 2) * 4) * (1 + phaseProgress * 0.4);
// Decrease base 8 for tighter clustering
// Increase multiplier (0.4) for more spread over time
```

**Downstream Throughput:**
```typescript
speed *= Math.max(0.02, throughput * 0.3); // In pressure
// Increase multiplier (0.3) to 0.5 = more particles visible downstream
// Decrease to 0.15 = almost nothing downstream
```

### Tweaking Animation Timing

**Change Phase Duration:**
```typescript
export const ANIMATION_TIMING = {
  normal:     3200,  // Increase for longer baseline
  emerging:   1800,  // Faster buildup = 1200
  pressure:   2400,  // More time for tension = 3000
  impact:     3400,  // MOST IMPORTANT - longer = more dramatic
  technology: 2100,  // Resolution speed
  reset:      1200,  // Quick return
};
```

**Constraint Node Glow Growth:**
```typescript
// In ConstraintNode.tsx
glowRadius = r + 14 + phaseProgress * 12; // 14 = base radius, 12 = max growth
// Larger values = more dramatic rings
```

### Tweaking Visual Polish

**Grid Opacity:**
```typescript
// In ConstraintEngineCanvas.tsx
style={{ opacity: 0.055 }} // Range: 0.02 (subtle) to 0.12 (prominent)
```

**Text Timing:**
```typescript
// In ConstraintCinematicText.tsx
{phase === "impact" && phaseProgress >= 0.15 && phaseProgress < 0.55}
// Change 0.15 to 0.25 = later reveal
// Change 0.55 to 0.65 = longer display

transition={{ duration: 0.6, ease }} // Increase to 0.8 for slower reveal
```

**Revenue Meter Color Thresholds:**
```typescript
// In ConstraintEngineCanvas.tsx
color:
  revenue > 0.8
    ? COLORS.primaryText   // Green zone
    : revenue > 0.6
    ? COLORS.gold          // Warning zone
    : COLORS.goldBright    // Critical zone
```

---

## Performance Considerations

### Budget
- **Target**: 60fps on desktop, 30fps acceptable on mobile
- **Particle Count**: 105 (optimized for smooth 60fps)
- **Canvas Resolution**: Matches device pixel ratio
- **RAF Loop**: Independent from React state updates (throttled to ~30fps)

### Optimization Techniques
1. **Canvas 2D rendering** instead of SVG for particles
2. **Depth-sorted batch rendering** (5 layers)
3. **Ref-based state** for particle array (no re-renders)
4. **Independent RAF loop** (decoupled from React 30fps throttle)
5. **Letterbox transform** reuses SVG viewBox scaling
6. **Clamped delta time** (max 50ms) prevents physics discontinuities

### Mobile Strategy
- Disabled on small screens (max-width: 1024px)
- `MobileConstraintStack` component renders card-based fallback
- Static visualization with tap-to-explore interaction
- No particle animation (saves ~40% battery drain)

### Profiling
```javascript
// In browser DevTools Performance tab:
// 1. Open /constraint
// 2. Record for 5 seconds
// 3. Look for 60fps (16ms frame budget)
// 4. Canvas rendering should take <5ms per frame
// 5. React updates should take <3ms at 30fps throttle

// Flame graph should show:
// - Canvas 2D operations (majority)
// - bezierPoint() calculations (small)
// - React state updates (minimal, throttled)
```

---

## Responsive Behavior

### Desktop (1024px+)
- Full canvas animation with 105 particles
- SVG nodes with interactive states
- Hover tooltips
- Click to explore node details
- Revenue meter visible

### Tablet (768px-1023px)
- ⚠️ Animation may be reduced or disabled
- Fallback card stack
- Tap-to-explore nodes
- Simplified visualization

### Mobile (<768px)
- **No particle animation** (performance)
- `MobileConstraintStack` renders 6 cards
- Each card tap opens node details
- Static constraint engine visualization (if needed)
- Full-width CTA buttons

---

## Integration

### Using ConstraintEngineHero

```typescript
import { ConstraintEngineHero } from "@/components/constraint-engine";

export default function Page() {
  const handleDiagnostic = (nodeId: string) => {
    // Route to snapshot or trigger diagnostic
    router.push(`/snapshot?focus=${nodeId}`);
  };

  return (
    <ConstraintEngineHero onRunDiagnostic={handleDiagnostic} />
  );
}
```

### Standalone Canvas

```typescript
import { ConstraintEngineCanvas } from "@/components/constraint-engine";
import { useConstraintAnimation } from "@/components/constraint-engine";

export default function CustomHero() {
  const animation = useConstraintAnimation();

  return (
    <div className="w-full aspect-[5/2]">
      <ConstraintEngineCanvas
        phase={animation.currentPhase}
        phaseProgress={animation.phaseProgress}
        constraintNodeId={animation.constraintNodeId}
        constraintNodeIndex={animation.constraintNodeIndex}
        throughput={animation.metrics.throughput}
        revenue={animation.metrics.revenue}
        onNodeClick={(nodeId) => console.log(nodeId)}
      />
    </div>
  );
}
```

---

## Browser Support

- **Chrome/Edge**: Full support (Canvas 2D, SVG)
- **Firefox**: Full support
- **Safari**: Full support (iOS 14+)
- **Mobile Safari**: Reduced animation (iOS perf)

---

## Accessibility

- **keyboard Navigation**: Tab to nodes, Enter to select
- **Screen Readers**: Aria labels on interactive elements
- **Motion**: Respects `prefers-reduced-motion` media query
- **High Contrast**: Sufficient color contrast maintained (WCAG AA)

---

## Future Enhancements

1. **Custom Constraint Selection**: Allow users to manually select which node is the constraint
2. **Animation Presets**: Add preset animation styles (fast, slow, dramatic, minimal)
3. **Data Integration**: Connect to real business metrics
4. **Sharing**: Generate shareable constraint snapshots
5. **Theme Modes**: Add light mode option
6. **Advanced Physics**: Realistic fluid dynamics simulation
7. **Multi-Constraint**: Show cascading constraints

---

## Common Issues & Troubleshooting

**Particles flickering or stuttering:**
- Check frame rate in DevTools
- Reduce `PARTICLE_COUNT` to 80
- Verify canvas size matches display size

**Glow not visible:**
- Check `COLORS.gold` is correct hex (#C9963A)
- Verify shadow blur values in render loop
- Ensure `shadowColor` is set before drawing

**Text overlays cut off:**
- Check `anchorLeft` clamping logic (18%-82%)
- Verify viewport width
- Test on different screen sizes

**Mobile animation disabled unexpectedly:**
- Check `max-width: 1024px` breakpoint in `ConstraintEngineHero`
- Verify `prefers-reduced-motion` not enabled
- Check browser DevTools for performance warnings

---

## File Structure

```
src/components/constraint-engine/
├── ConstraintEngineHero.tsx          # Main hero container
├── ConstraintEngineCanvas.tsx        # SVG + Canvas hybrid
├── CanvasParticleLayer.tsx           # Particle animation
├── ConstraintNode.tsx                # Individual node
├── ConstraintCinematicText.tsx       # Text overlays
├── ConstraintProfilePanel.tsx        # Node detail panel
├── MobileConstraintStack.tsx         # Mobile fallback
├── FlowParticleLayer.tsx             # Deprecated/alternate
├── ParticleSystem.ts                 # Path and bezier utils
├── useConstraintAnimation.ts         # Animation state hook
├── config.ts                         # Colors, timing, layout
├── index.tsx                         # Main export
└── DOCUMENTATION.md                  # This file
```

---

## Credits & Inspiration

- **Theory of Constraints (TOC)**: Eliyahu M. Goldratt
- **System Dynamics**: Jay Forrester, Dennis Meadows
- **Cinematic Animation**: Apple Keynote, Tesla design language
- **Particle Systems**: Processing, Three.js community

---

**Last Updated**: 2026-05-04
**Version**: 1.0
**Author**: Custom implementation for withadan.com
