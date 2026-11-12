"use client";

import Marquee from "./ui/Marquee";
import { marqueeWords } from "@/lib/resume";

function Row({ reverse = false, duration = 42 }: { reverse?: boolean; duration?: number }) {
  return (
    <Marquee duration={duration} reverse={reverse}>
      {marqueeWords.map((word, index) => (
        <span key={`${word}-${index}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl font-medium tracking-tight text-bone/85 md:text-4xl">
            {word}
          </span>
          <span className="text-xl text-ember/70 md:text-2xl">✳</span>
        </span>
      ))}
    </Marquee>
  );
}

export default function MarqueeStrip() {
  return (
    <section className="relative z-20 border-y border-bone/10 bg-ink py-7">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#07070a_0%,transparent_12%,transparent_88%,#07070a_100%)] z-10" />
      <div className="space-y-4">
        <Row />
        <Row reverse duration={54} />
      </div>
    </section>
  );
}
