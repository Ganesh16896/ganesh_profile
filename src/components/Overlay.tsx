"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { profile } from "@/lib/resume";

const outline = {
  color: "transparent",
  WebkitTextStroke: "1px rgba(237,234,228,0.35)",
} as const;

export default function Overlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Stage 1 — Introduction
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.22], [0, -90]);
  const blur1 = useTransform(scrollYProgress, [0.12, 0.22], ["blur(0px)", "blur(8px)"]);

  // Stage 2 — Craft
  const opacity2 = useTransform(
    scrollYProgress,
    [0.16, 0.26, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(scrollYProgress, [0.16, 0.5], [80, -80]);
  const x2 = useTransform(scrollYProgress, [0.16, 0.5], [40, -40]);

  // Stage 3 — Motion / UX
  const opacity3 = useTransform(
    scrollYProgress,
    [0.46, 0.56, 0.7, 0.79],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(scrollYProgress, [0.46, 0.79], [80, -80]);
  const x3 = useTransform(scrollYProgress, [0.46, 0.79], [-40, 40]);

  // Stage 4 — Availability
  const opacity4 = useTransform(
    scrollYProgress,
    [0.76, 0.86, 0.96, 1],
    [0, 1, 1, 0],
  );
  const y4 = useTransform(scrollYProgress, [0.76, 1], [80, -60]);

  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {/* ---------- Stage 1 : Name ---------- */}
      <motion.div
        style={{ opacity: opacity1, y: y1, filter: blur1 }}
        className="absolute inset-0 flex flex-col justify-between px-6 pb-24 pt-28 md:px-12 md:pb-16 md:pt-32"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-bone/55">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-ember" />
              <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-ember" />
            </span>
            Portfolio — 2026
          </div>
          <div className="hidden text-right text-[10px] uppercase tracking-[0.34em] text-bone/40 md:block">
            {profile.availability}
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div>
            <p className="mb-5 font-display text-[11px] uppercase tracking-[0.36em] text-ember-soft/90">
              {profile.role} · {profile.years} years
            </p>
            <h1 className="font-display text-[15vw] font-medium leading-[0.82] tracking-[-0.045em] text-bone md:text-[9.5vw]">
              <span className="block">Dasari</span>
              <span className="block" style={outline}>
                Ganesh
              </span>
            </h1>
          </div>

          <div className="max-w-sm md:pb-3">
            <p className="text-balance text-sm leading-relaxed text-bone/70 md:text-[15px]">
              Frontend developer building responsive, high-performance products
              with <span className="text-bone">React.js</span>,{" "}
              <span className="text-bone">Next.js</span> and a builder&apos;s
              eye for detail.
            </p>
            <div className="mt-6 hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-bone/40 md:flex">
              <motion.span style={{ opacity: hintOpacity }} className="flex items-center gap-3">
                Scroll to explore
                <span className="h-px w-10 bg-bone/30" />
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stage counter */}
      <div className="absolute bottom-16 right-6 hidden flex-col items-end gap-2 text-[9px] uppercase tracking-[0.3em] md:right-14 md:flex">
        {[
          { id: "01", opacity: opacity1 },
          { id: "02", opacity: opacity2 },
          { id: "03", opacity: opacity3 },
          { id: "04", opacity: opacity4 },
        ].map((stage) => (
          <motion.span
            key={stage.id}
            style={{ opacity: stage.opacity }}
            className="text-bone/45"
          >
            {stage.id}
          </motion.span>
        ))}
      </div>

      {/* ---------- Stage 2 : Craft ---------- */}
      <motion.div
        style={{ opacity: opacity2, y: y2, x: x2 }}
        className="absolute inset-x-0 bottom-0 px-6 pb-20 md:bottom-auto md:left-auto md:right-14 md:top-1/2 md:w-[42%] md:-translate-y-1/2 md:px-0 md:pb-0"
      >
        <div className="border-l border-bone/15 pl-6">
          <span className="font-display text-[10px] uppercase tracking-[0.34em] text-ice/80">
            01 — Craft
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
            React.js &amp;{" "}
            <span className="font-serif-italic text-ember-soft">Next.js</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/65 md:text-base">
            Component-driven interfaces built on clean, reusable code — SSR,
            SSG and code splitting tuned for fast first paint and steady
            runtime performance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React.js", "Next.js", "Gatsby.js", "TypeScript"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-bone/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---------- Stage 3 : Motion & UX ---------- */}
      <motion.div
        style={{ opacity: opacity3, y: y3, x: x3 }}
        className="absolute inset-x-0 bottom-0 px-6 pb-20 md:bottom-auto md:left-14 md:right-auto md:top-1/2 md:w-[42%] md:-translate-y-1/2 md:px-0 md:pb-0"
      >
        <div className="border-l border-bone/15 pl-6">
          <span className="font-display text-[10px] uppercase tracking-[0.34em] text-ember/85">
            02 — Interface
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-bone md:text-6xl">
            Motion with{" "}
            <span className="font-serif-italic text-ice">intent</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/65 md:text-base">
            Interfaces that feel alive but never get in the way. Tailwind CSS
            and Material UI systems, refined into layouts that stay usable on
            every screen.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Tailwind CSS", "Material UI", "SASS", "UI/UX"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-bone/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-bone/55"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ---------- Stage 4 : Availability ---------- */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-6 px-6 pb-20 md:pb-24"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.34em] text-ice/80">
          03 — Next
        </span>
        <h2 className="max-w-2xl font-display text-3xl leading-[1.05] tracking-tight text-bone md:text-5xl">
          Let&apos;s build something{" "}
          <span className="font-serif-italic ember-text">worth scrolling</span>{" "}
          for.
        </h2>
        <a
          href={`mailto:${profile.email}`}
          className="pointer-events-auto group inline-flex items-center gap-3 rounded-full border border-bone/25 bg-ink/30 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-bone backdrop-blur transition-colors hover:border-ember/60 hover:text-ember-soft"
        >
          Start a conversation
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </motion.div>
    </div>
  );
}
