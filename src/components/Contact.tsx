"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/resume";
import Marquee from "./ui/Marquee";
import { Reveal, RevealWords, SectionLabel } from "./ui/Reveal";

const details = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phoneHref}` },
  { label: "LinkedIn", value: "/in/dasari-ganesh", href: profile.linkedin },
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative z-20 overflow-hidden bg-ink pt-24 md:pt-32"
    >
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,106,43,0.14),transparent_65%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <SectionLabel index="04">Contact</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <div>
            <h2 className="font-display text-[12vw] leading-[0.85] tracking-[-0.05em] text-bone sm:text-6xl md:text-7xl lg:text-[6rem]">
              <RevealWords text="Have a build" />
              <span className="font-serif-italic ember-text">
                <RevealWords text="in mind?" delay={0.1} />
              </span>
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-bone/60">
                {profile.availability}. I&apos;m always up for a conversation
                about frontend architecture, motion design or a product that
                needs to ship.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative mt-10 inline-flex items-center gap-4 overflow-hidden rounded-full border border-bone/25 px-8 py-4 text-sm uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:border-ember hover:text-ink"
              >
                <span className="absolute inset-0 -translate-y-full bg-ember transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative z-10">Send a message</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end gap-px">
            {details.map((item, index) => (
              <Reveal key={item.label} delay={0.05 * index}>
                <a
                  href={item.href}
                  target={item.label === "LinkedIn" ? "_blank" : undefined}
                  rel={item.label === "LinkedIn" ? "noreferrer" : undefined}
                  className="group flex items-center justify-between border-b border-bone/10 py-5 transition-colors hover:border-ember/40"
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-bone/35">
                    {item.label}
                  </span>
                  <span className="flex items-center gap-3 text-sm text-bone/75 transition-colors group-hover:text-bone md:text-[15px]">
                    {item.value}
                    <span className="text-bone/25 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember">
                      ↗
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-bone/35">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-ice" />
                  <span className="absolute inset-0 animate-[pulse-ring_2.4s_ease-out_infinite] rounded-full bg-ice" />
                </span>
                Open for full-time &amp; contract
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Oversized moving name */}
      <div className="relative mt-24 border-t border-bone/10 py-8 select-none">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,#07070a,transparent_10%,transparent_90%,#07070a)]" />
        <Marquee duration={40}>
          <span className="flex items-center">
            <span
              className="whitespace-nowrap px-6 font-display text-[16vw] leading-[0.9] tracking-[-0.04em]"
              style={{ color: "transparent", WebkitTextStroke: "1px rgba(237,234,228,0.22)" }}
            >
              DASARI GANESH
            </span>
            <span className="px-4 font-serif-italic text-[10vw] leading-none text-ember/80">
              ✳
            </span>
          </span>
        </Marquee>
      </div>

      <div className="relative border-t border-bone/10 px-6 py-7 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[10px] uppercase tracking-[0.24em] text-bone/35 sm:flex-row">
          <span>© 2026 {profile.name}</span>
          <span className="hidden sm:block">
            React.js · Next.js · Tailwind CSS
          </span>
          <a
            href="#top"
            className="group flex items-center gap-2 text-bone/50 transition-colors hover:text-ember"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
