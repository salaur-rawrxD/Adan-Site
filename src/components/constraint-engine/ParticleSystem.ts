import type { NODE_LAYOUT } from "./config";

export interface PathSegment {
  index: number;
  x0: number; y0: number; // start node position
  x1: number; y1: number; // bezier control point
  x2: number; y2: number; // end node position
}

type NodeLayout = (typeof NODE_LAYOUT)[number];

// Build quadratic bezier path segments from organic node positions.
// Control points alternate above/below to give the path a natural S-curve feel.
export function calculatePathSegments(
  layout: ReadonlyArray<NodeLayout>
): PathSegment[] {
  const segments: PathSegment[] = [];

  for (let i = 0; i < layout.length - 1; i++) {
    const a = layout[i];
    const b = layout[i + 1];

    // Alternate arc direction each segment for organic rhythm
    const dir = i % 2 === 0 ? 1 : -1;
    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2 + dir * 22;

    segments.push({
      index: i,
      x0: a.x, y0: a.y,
      x1: midX, y1: midY,
      x2: b.x, y2: b.y,
    });
  }

  return segments;
}

// Evaluate a quadratic bezier at parameter t ∈ [0, 1].
export function bezierPoint(
  t: number,
  seg: PathSegment
): { x: number; y: number } {
  const mt = 1 - t;
  return {
    x: mt * mt * seg.x0 + 2 * mt * t * seg.x1 + t * t * seg.x2,
    y: mt * mt * seg.y0 + 2 * mt * t * seg.y1 + t * t * seg.y2,
  };
}

// Approximate the length of a bezier segment for uniform particle distribution.
export function bezierLength(seg: PathSegment, steps = 20): number {
  let length = 0;
  let prev = bezierPoint(0, seg);
  for (let i = 1; i <= steps; i++) {
    const curr = bezierPoint(i / steps, seg);
    length += Math.hypot(curr.x - prev.x, curr.y - prev.y);
    prev = curr;
  }
  return length;
}
