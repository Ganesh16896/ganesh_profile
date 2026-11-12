"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/resume";
import { Reveal, RevealWords, SectionLabel } from "./ui/Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

function Card({
  project,
  index,
  featured = false,
}: {
  project: (typeof projects)[number];
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay: index * 0.06, ease }}
      whileHover="hover"
      data-cursor="hover"
      className={`group relative overflow-hidden rounded-2xl border border-bone/10 bg-ink-soft ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"
        }`}
      >
        <motion.div
          variants={{ hover: { scale: 1.06 } }}
          transition={{ duration: 0.9, ease }}
          className="absolute inset-0 bg-cover bg-center opacity-55 saturate-[0.8] transition-[filter,opacity] duration-700 group-hover:opacity-80 group-hover:saturate-100"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(90,210,200,0.08),transparent_50%,rgba(255,106,43,0.10))] mix-blend-screen" />

        {/* index */}
        <span className="absolute left-5 top-5 font-display text-[10px] uppercase tracking-[0.3em] text-bone/50">
          0{index + 1}
        </span>

        {/* stack */}
        <div className="absolute right-5 top-5 flex flex-wrap justify-end gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-bone/20 bg-ink/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-bone/65 backdrop-blur"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* arrow */}
        <motion.span
          variants={{ hover: { opacity: 1, rotate: 0, y: 0 } }}
          initial={{ opacity: 0, rotate: -20, y: 8 }}
          transition={{ duration: 0.45, ease }}
          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 text-bone"
        >
          ↗
        </motion.span>

        <div className={`absolute inset-x-0 bottom-0 p-5 md:p-7 ${featured ? "max-w-3xl" : ""}`}>
          <p className="text-[10px] uppercase tracking-[0.28em] text-ember-soft/80">
            {project.category}
          </p>
          <h3
            className={`mt-2 font-display tracking-tight text-bone ${
              featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
            }`}
          >
            {project.title}
          </h3>
          <motion.p
            variants={{ hover: { height: "auto", opacity: 1, marginTop: 12 } }}
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden text-[13px] leading-relaxed text-bone/65 md:text-sm"
          >
            {project.description}
          </motion.p>
          <p className="mt-3 hidden text-[10px] uppercase tracking-[0.24em] text-bone/35 sm:block">
            Case study on request
          </p>
        </div>
      </div>

      {/* bottom accent */}
      <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-ember to-ice transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-20 overflow-hidden bg-ink px-6 py-24 md:px-12 md:py-36"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,106,43,0.08),transparent_65%)] blur-3xl" />

      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <SectionLabel index="03">Selected Work</SectionLabel>
            </Reveal>
            <h2 className="mt-8 max-w-3xl font-display text-[10vw] leading-[0.9] tracking-[-0.04em] text-bone sm:text-5xl md:text-6xl lg:text-7xl">
              <RevealWords text="Products, not just pages." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-bone/50">
              Booking flows, storefronts and discovery apps — shipped with
              React.js and Next.js, measured on load time and clarity.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              project={project}
              index={index}
              featured={project.featured}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
