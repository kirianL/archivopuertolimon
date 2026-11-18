"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      prevent: (node) =>
        node.getAttribute("role") === "dialog" ||
        node.hasAttribute("data-lenis-prevent"),
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
