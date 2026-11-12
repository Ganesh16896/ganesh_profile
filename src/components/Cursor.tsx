"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });
  const glowX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setHovering(
        Boolean(target?.closest("a, button, [data-cursor='hover']")),
      );
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="cursor-layer pointer-events-none fixed left-0 top-0 z-50 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,106,43,0.16),rgba(90,210,200,0.06)_45%,transparent_70%)] blur-2xl" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="cursor-layer pointer-events-none fixed left-0 top-0 z-[70]"
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 12,
            height: hovering ? 56 : 12,
            opacity: hovering ? 1 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/60 mix-blend-difference"
        />
      </motion.div>
    </>
  );
}
