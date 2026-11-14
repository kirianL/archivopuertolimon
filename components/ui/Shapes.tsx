import { useId } from "react";

type ShapeProps = { className?: string };

/** Rough chalk / dry-brush strokes. Texture comes from a turbulence displacement filter. */
export function ChalkStrokes({ className }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 140" className={className} aria-hidden fill="none">
      <defs>
        <filter id={id} x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.08" numOctaves="3" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="14" />
        </filter>
      </defs>
      <g filter={`url(#${id})`} stroke="currentColor" strokeLinecap="round" opacity="0.92">
        <path d="M14 34 C120 18 250 22 360 26" strokeWidth="26" />
        <path d="M40 74 C150 58 290 54 392 50" strokeWidth="22" />
        <path d="M8 112 C110 96 200 90 300 84" strokeWidth="18" />
      </g>
    </svg>
  );
}

/** Dry-brush paint swipe: stacked bristle lines, roughened by a turbulence filter. */
const bristles = [
  { y: 14, w: 10, o: 0.9 },
  { y: 24, w: 14, o: 1 },
  { y: 34, w: 12, o: 0.95 },
  { y: 44, w: 9, o: 0.8 },
  { y: 52, w: 5, o: 0.6 },
];

export function BrushStroke({ className }: ShapeProps) {
  const id = useId();
  return (
    <svg viewBox="0 0 300 64" className={className} aria-hidden fill="none" preserveAspectRatio="none">
      <defs>
        <filter id={id} x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.9" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="8" />
        </filter>
      </defs>
      <g filter={`url(#${id})`} stroke="currentColor" strokeLinecap="round">
        {bristles.map(({ y, w, o }, i) => (
          <path key={y} d={`M${6 + i * 4} ${y + 4} Q150 ${y - 6} ${294 - i * 10} ${y}`} strokeWidth={w} opacity={o} />
        ))}
      </g>
    </svg>
  );
}

/** A half-ring bulging toward `side`. Pair a "right" and a "left" to frame content, as in "sharing of stories". */
export function HalfRing({ className, side }: ShapeProps & { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 80 160"
      className={`${side === "left" ? "-scale-x-100" : ""} ${className ?? ""}`}
      aria-hidden
      fill="currentColor"
    >
      <path d="M0 0a80 80 0 0 1 0 160v-44a36 36 0 0 0 0-72z" />
    </svg>
  );
}

/** A half-ring opening upward — a smile, a bay, a horizon. */
export function Bay({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden fill="currentColor">
      <path d="M0 0h40a40 40 0 0 0 80 0h40a80 80 0 0 1-160 0z" />
    </svg>
  );
}

export function PlusIcon({ className }: ShapeProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2v20M2 12h20" />
    </svg>
  );
}

