import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(next: Lenis | null) {
  instance = next;
}

export function lockScroll(locked: boolean) {
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
}
