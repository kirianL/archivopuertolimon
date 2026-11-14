import type { ReactNode } from "react";
import { BrushStroke } from "@/components/ui/Shapes";

/** A word with a paint swipe behind it, as in the editorial references. */
export function Highlight({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="relative isolate inline-block">
      <BrushStroke className={`absolute -inset-x-[0.12em] top-[30%] -z-10 h-[0.6em] ${color}`} />
      {children}
    </span>
  );
}

