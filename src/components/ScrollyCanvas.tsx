"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 38;

// Helper to format frame numbers (e.g., 00, 01 ... 89)
const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(2, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Framer motion scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current) return;

    // Calculate which frame to display based on scroll progress (0 to 1)
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT),
    );

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw image with object-fit: cover logic
    const img = images[frameIndex];
    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = canvasWidth / 2 - (imgWidth / 2) * scale;
    const y = canvasHeight / 2 - (imgHeight / 2) * scale;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  });

  // Handle Resize & Initial Draw
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;

    // Set internal resolution of canvas to match display size for crispness
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initial draw
      const ctx = canvas.getContext("2d");
      if (!ctx || !images[0]) return;

      const img = images[0];
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [imagesLoaded, images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-50 bg-[#121212]">
            <p className="animate-pulse">Loading experience...</p>
          </div>
        )}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
