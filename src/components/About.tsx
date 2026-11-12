"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { profile, skillGroups, stats } from "@/lib/resume";
import { Reveal, RevealWords, SectionLabel } from "./ui/Reveal";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      <span className="text-ember">{suffix}</span>
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-36"
    >
      {/* ambient light */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,106,43,0.13),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(90,210,200,0.10),transparent_65%)] blur-2xl" />

      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <SectionLabel index="01">Profile</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[8.5vw] leading-[0.92] tracking-[-0.04em] text-bone sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              <RevealWords text="I turn design intent into interfaces that" />
              <span className="font-serif-italic ember-text">
                <RevealWords text="feel inevitable." delay={0.15} />
              </span>
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-bone/65 md:text-base">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group bg-ink-soft px-5 py-6 transition-colors duration-300 hover:bg-ink"
                  >
                    <p className="font-display text-3xl tracking-tight text-bone md:text-4xl">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-[11px] leading-snug tracking-wide text-bone/45">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="group relative overflow-hidden rounded-2xl border border-bone/10">
              <Image
                src="/sequence/frame_00_delay-0.066s.png"
                alt="Portrait of Dasari Ganesh"
                width={1280}
                height={720}
                priority={false}
                className="h-full w-full scale-[1.02] object-cover grayscale-[35%] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-display text-lg tracking-tight text-bone">
                    {profile.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-bone/50">
                    India · Remote friendly
                  </p>
                </div>
                <span className="rounded-full border border-bone/20 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-bone/60">
                  Available
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-bone/10 pt-4 text-[10px] uppercase tracking-[0.24em] text-bone/40">
              <span>Python · GCP literate</span>
              <span className="text-ember/70">↗</span>
            </div>
          </Reveal>
        </div>

        {/* Skills */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <div className="flex items-end justify-between gap-6 border-b border-bone/10 pb-6">
              <h3 className="font-display text-2xl tracking-tight text-bone md:text-3xl">
                Toolkit
              </h3>
              <span className="text-[10px] uppercase tracking-[0.28em] text-bone/35">
                Daily drivers &amp; working knowledge
              </span>
            </div>
          </Reveal>

          <div className="grid gap-px bg-bone/10 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: groupIndex * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative bg-ink px-6 py-8 transition-colors duration-500 hover:bg-ink-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.2em] text-ember/70">
                    0{groupIndex + 1}
                  </span>
                  <h4 className="font-display text-lg tracking-tight text-bone">
                    {group.title}
                  </h4>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-bone/12 px-3 py-1.5 text-[11px] tracking-wide text-bone/60 transition-colors duration-300 hover:border-ember/50 hover:text-bone"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <div className="relative flex flex-col justify-between bg-ink px-6 py-8">
              <p className="font-serif-italic text-2xl leading-snug text-bone/80">
                Always shipping, always refactoring.
              </p>
              <span className="mt-6 text-[10px] uppercase tracking-[0.28em] text-bone/35">
                — Working philosophy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
