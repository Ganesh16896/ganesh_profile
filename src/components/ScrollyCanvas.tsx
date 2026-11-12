"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 38;

// Helper to format frame numbers (e.g., 00, 01 ... 37)
const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(2, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const percentRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const railScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // Preload images
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_COUNT && !cancelled) setImagesLoaded(true);
      };
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;

    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height,
    );
    const x = canvas.width / 2 - (img.width / 2) * scale;
    const y = canvas.height / 2 - (img.height / 2) * scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT),
    );
    // Write HUD labels straight to the DOM — no re-render per scroll tick
    if (percentRef.current) {
      percentRef.current.textContent = String(Math.round(latest * 100)).padStart(2, "0");
    }
    if (frameRef.current) {
      frameRef.current.textContent = String(
        Math.min(FRAME_COUNT, Math.floor(latest * FRAME_COUNT) + 1),
      ).padStart(2, "0");
    }
    const img = imagesRef.current[frameIndex];
    if (img) drawFrame(img);
  });

  // Handle resize & initial paint
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (imagesRef.current[0]) drawFrame(imagesRef.current[0]);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} id="top" className="relative h-[520vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading veil */}
        {!imagesLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-ink">
            <motion.span
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="font-display text-[11px] uppercase tracking-[0.42em] text-bone/60"
            >
              Developing
            </motion.span>
            <div className="h-px w-40 overflow-hidden bg-bone/15">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-ember to-transparent"
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="h-full w-full object-cover" />

        {/* Cinematic grading + scrims */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(120%_90%_at_50%_35%,transparent_35%,rgba(7,7,10,0.55)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-40 bg-gradient-to-b from-ink/85 via-ink/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[55%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[6] mix-blend-overlay bg-[linear-gradient(115deg,rgba(90,210,200,0.10),transparent_45%,rgba(255,106,43,0.12))]" />

        <Overlay scrollYProgress={scrollYProgress} />

        {/* HUD: right rail */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
          <span className="text-[9px] uppercase tracking-[0.3em] text-bone/40 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <div className="relative h-32 w-px bg-bone/15">
            <motion.div
              style={{ scaleY: railScale }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-ember to-ice"
            />
          </div>
          <span
            ref={percentRef}
            className="font-display text-[10px] tracking-[0.16em] text-bone/50 tabular-nums"
          >
            00
          </span>
        </div>

        {/* HUD: bottom frame counter */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 text-[9px] uppercase tracking-[0.32em] text-bone/35 md:flex">
          <span>Sequence</span>
          <span className="h-px w-8 bg-bone/25" />
          <span ref={frameRef} className="tabular-nums">
            01
          </span>
          <span className="text-bone/20">/ {FRAME_COUNT}</span>
        </div>
      </div>
    </div>
  );
}
