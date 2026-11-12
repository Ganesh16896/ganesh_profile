"use client";

import type { ReactNode } from "react";

export default function Marquee({
  children,
  duration = 34,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee relative overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        data-reverse={reverse ? "true" : "false"}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
