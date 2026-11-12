"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { profile } from "@/lib/resume";
import { lockScroll } from "@/lib/smooth-scroll";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 80);
  });

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[64]">
        <motion.div
          animate={{
            backgroundColor: scrolled ? "rgba(7,7,10,0.72)" : "rgba(7,7,10,0)",
            borderColor: scrolled ? "rgba(237,234,228,0.08)" : "rgba(237,234,228,0)",
            backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between border-b px-6 py-5 md:px-10"
        >
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-bone/20 text-[10px] font-medium tracking-[0.18em] text-bone/80 transition-colors group-hover:border-ember/60 group-hover:text-ember">
              DG
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.34em] text-bone/45 sm:block">
              {profile.role}
            </span>
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[12px] uppercase tracking-[0.2em] text-bone/60 transition-colors hover:text-bone"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ember transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="group relative overflow-hidden rounded-full border border-bone/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-ink"
            >
              <span className="absolute inset-0 -z-0 translate-y-full bg-ember transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative z-10">Let&apos;s talk</span>
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-[66] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-bone"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              className="block h-px w-6 bg-bone"
            />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[63] flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.07 }}
                  className="flex items-baseline gap-4 border-b border-bone/10 py-5 font-display text-4xl tracking-tight text-bone"
                >
                  <span className="text-[10px] tracking-[0.3em] text-ember/70">
                    0{index + 1}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="space-y-2 text-sm text-bone/50">
              <a href={`mailto:${profile.email}`} className="block text-bone">
                {profile.email}
              </a>
              <a href={`tel:${profile.phoneHref}`} className="block">
                {profile.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
