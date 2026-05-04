"use client";

import { useEffect, useRef } from "react";
import { bezierPoint, type PathSegment } from "./ParticleSystem";

// ─── Particle ────────────────────────────────────────────────────────────────

interface Particle {
  segIdx: number;
  t: number;
  speedMult: number;
  radius: number;
  baseOpacity: number;
  life: number; // 0–1, used for fade in/out and glow intensity
  jitter: number; // random micro-movement
  depth: number; // z-layer for parallax (0–1)
}

const PARTICLE_COUNT = 105; // Increased for denser, more cinematic flow
const BASE_SPEED = 0.125; // slightly increased for brisker normal flow
const GOLD = "#C9963A";
const GOLD_BRIGHT = "#E8BE63";
const SVG_W = 1000;
const SVG_H = 400;

function makeParticles(segCount: number): Particle[] {
  const ps: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    ps.push({
      segIdx: Math.floor(Math.random() * segCount),
      t: Math.random(),
      speedMult: 0.45 + Math.random() * 1.1, // Increased variation
      radius: 1.4 + Math.random() * 3.2, // More variety in size
      baseOpacity: 0.4 + Math.random() * 0.6,
      life: Math.random(),
      jitter: Math.random() * 2,
      depth: Math.random(), // Each particle at different "depth"
    });
  }
  return ps;
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface CanvasParticleLayerProps {
  phase: string;
  phaseProgress: number;
  constraintIdx: number;
  throughput: number;
  pathSegments: PathSegment[];
}

export function CanvasParticleLayer(props: CanvasParticleLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const stateRef = useRef(props);
  const rafRef = useRef(0);

  stateRef.current = props;

  useEffect(() => {
    const count = props.pathSegments.length;
    if (count > 0) particlesRef.current = makeParticles(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pathSegments.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let lastTime: number | null = null;

    const frame = (now: number) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const { phase, phaseProgress, constraintIdx, throughput, pathSegments } =
        stateRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx || pathSegments.length === 0) {
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      // Resize canvas buffer to match its displayed size (handles full-bleed)
      const dw = canvas.clientWidth || SVG_W;
      const dh = canvas.clientHeight || SVG_H;
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
      }

      ctx.clearRect(0, 0, dw, dh);

      // Letterbox transform — mirrors SVG preserveAspectRatio="xMidYMid meet"
      const scale = Math.min(dw / SVG_W, dh / SVG_H);
      const ox = (dw - SVG_W * scale) / 2;
      const oy = (dh - SVG_H * scale) / 2;

      ctx.save();
      ctx.translate(ox, oy);
      ctx.scale(scale, scale);

      // Sort particles by depth for proper layering
      const particles = particlesRef.current;
      const depths: Map<number, Particle[]> = new Map();
      for (const p of particles) {
        const d = Math.floor(p.depth * 4); // 5 depth layers
        if (!depths.has(d)) depths.set(d, []);
        depths.get(d)!.push(p);
      }

      // Draw each depth layer
      for (let d = 0; d <= 4; d++) {
        const layer = depths.get(d) || [];
        for (const p of layer) {
          // ── Speed ─────────────────────────────────────────────────────
          let speed = BASE_SPEED * p.speedMult;
          let isStacking = false;

          if (phase === "emerging") {
            if (p.segIdx < constraintIdx)
              speed *= Math.max(0.32, 1 - phaseProgress * 0.68);
          } else if (phase === "pressure") {
            if (p.segIdx < constraintIdx) {
              // Particles slow dramatically as they approach constraint
              speed *= Math.max(0.01, 1 - phaseProgress * 0.99);
              isStacking = phaseProgress > 0.35; // Visible congestion starts early
            } else {
              speed *= Math.max(0.02, throughput * 0.3);
            }
          } else if (phase === "impact") {
            if (p.segIdx < constraintIdx) {
              speed *= 0.005; // Nearly frozen for maximum effect
              isStacking = true;
            } else {
              speed *= Math.max(0.01, throughput * 0.15);
            }
          } else if (phase === "technology") {
            // Accelerate particles smoothly as flow resumes
            speed *= Math.max(0.15, phaseProgress * 1.3);
          }

          // Add organic micro-jitter for aliveness
          if (phase !== "technology" && phase !== "reset") {
            speed += (Math.sin(Date.now() * 0.001 + p.jitter) * 0.012 - 0.006);
          }

          p.t += speed * dt;
          if (p.t >= 1) {
            p.t -= 1;
            p.segIdx = (p.segIdx + 1) % pathSegments.length;
          }

          // ── Position ──────────────────────────────────────────────────
          const seg = pathSegments[p.segIdx];
          if (!seg) continue;
          const pos = bezierPoint(p.t, seg);

          // Add stacking offset when congested — more dramatic spread
          let stackOffset = { x: 0, y: 0 };
          if (isStacking) {
            const stackAmount = (8 + Math.sin(p.jitter * 2) * 4) * (1 + phaseProgress * 0.4);
            stackOffset.x = Math.cos(p.jitter) * stackAmount;
            stackOffset.y = Math.sin(p.jitter) * stackAmount;
          }

          // ── Opacity & Life ───────────────────────────────────────────
          p.life = (p.life + dt * 0.8) % 1;
          let opacity = p.baseOpacity;

          if (phase === "pressure" || phase === "impact") {
            if (p.segIdx < constraintIdx) {
              // Brighten particles piling up
              opacity = Math.min(1, opacity * (1.2 + phaseProgress * 0.6));
            } else {
              opacity *= Math.max(0.05, throughput * 0.4);
            }
          } else if (phase === "technology") {
            opacity *= Math.max(0.8, phaseProgress);
          }

          // Fade particles at path edges
          const edge =
            p.t < 0.1 ? p.t / 0.1 : p.t > 0.9 ? (1 - p.t) / 0.1 : 1;
          opacity = Math.min(1, Math.max(0, opacity * edge));

          // ── Draw ──────────────────────────────────────────────────────
          // Upstream particles scale up during constraint phases
          const upstream =
            (phase === "pressure" || phase === "impact") &&
            p.segIdx < constraintIdx;
          const scaleMult = upstream && isStacking ? 1.3 + phaseProgress * 0.5 : 1;
          const scaledRadius = p.radius * scaleMult * (0.78 + Math.sin(p.life * Math.PI * 2) * 0.18);

          ctx.save();
          ctx.globalAlpha = opacity;

          // Glow effect for particles upstream of constraint — more dramatic
          if (upstream) {
            const glowIntensity = phase === "impact" ? 18 : 12;
            ctx.shadowBlur = glowIntensity + phaseProgress * 6;
            ctx.shadowColor = phase === "impact"
              ? `rgba(232, 190, 99, 0.8)`
              : GOLD;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          }

          ctx.fillStyle = GOLD;
          ctx.beginPath();
          ctx.arc(
            pos.x + stackOffset.x,
            pos.y + stackOffset.y,
            scaledRadius,
            0,
            Math.PI * 2
          );
          ctx.fill();

          ctx.restore();
        }
      }

      ctx.restore(); // undo letterbox transform

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []); // intentionally empty

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
