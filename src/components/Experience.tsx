"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { education, experiences } from "@/lib/resume";
import { Reveal, SectionLabel } from "./ui/Reveal";

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 75%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      className="relative z-20 overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-36"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <SectionLabel index="02">Experience</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 font-display text-[10vw] leading-[0.9] tracking-[-0.04em] text-bone sm:text-5xl md:text-6xl">
                Four years
                <br />
                <span className="font-serif-italic ember-text">in the field.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-bone/55">
                From a React internship to full-stack work with Next.js and
                Python — each role added a layer to how I ship product.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-bone/35">
                <span className="h-px w-8 bg-ember/60" />
                <span>{experiences.length} roles · 2022 — present</span>
              </div>
            </Reveal>
          </div>

          <div ref={railRef} className="relative">
            {/* Timeline rail */}
            <div className="absolute left-[7px] top-2 hidden h-full w-px bg-bone/12 md:block">
              <motion.div
                style={{ scaleY: lineScale }}
                className="h-full w-full origin-top bg-gradient-to-b from-ember via-ember-soft to-ice"
              />
              <motion.div
                style={{ top: glowY }}
                className="absolute -left-[3px] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_14px_4px_rgba(255,106,43,0.5)]"
              />
            </div>

            <div className="space-y-4 md:pl-12">
              {experiences.map((exp, index) => (
                <motion.article
                  key={exp.company}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative rounded-2xl border border-bone/10 bg-ink-soft/60 p-6 transition-all duration-500 hover:border-ember/30 hover:bg-ink-soft md:p-8"
                >
                  {/* node */}
                  <span className="absolute -left-[47px] top-9 hidden h-[9px] w-[9px] rounded-full border border-bone/25 bg-ink transition-all duration-500 group-hover:border-ember group-hover:bg-ember md:block" />

                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ember/80">
                        {index === 0 ? "Current" : `0${experiences.length - index}`}
                      </p>
                      <h3 className="mt-2 font-display text-xl tracking-tight text-bone md:text-2xl">
                        {exp.company}
                      </h3>
                      <p className="mt-1 text-sm text-bone/60">{exp.role}</p>
                    </div>
                    <div className="flex flex-col items-start gap-1 md:items-end">
                      <span className="rounded-full border border-bone/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-bone/55">
                        {exp.period}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-bone/30">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 border-t border-bone/8 pt-5">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-[13.5px] leading-relaxed text-bone/55"
                      >
                        <span className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-ember/60" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}

              {/* Education */}
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-ice/20 bg-[linear-gradient(135deg,rgba(90,210,200,0.07),rgba(7,7,10,0.2))] p-6 md:p-8"
              >
                <span className="absolute -left-[47px] top-9 hidden h-[9px] w-[9px] rounded-full border border-ice/40 bg-ink md:block" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-[10px] uppercase tracking-[0.3em] text-ice/80">
                      Education
                    </p>
                    <h3 className="mt-2 font-display text-xl tracking-tight text-bone md:text-2xl">
                      {education.degree}
                    </h3>
                    <p className="mt-1 text-sm text-bone/60">
                      {education.institution}
                    </p>
                  </div>
                  <span className="rounded-full border border-bone/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-bone/55">
                    {education.period}
                  </span>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
