"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  type PanInfo,
} from "framer-motion";
import { eras } from "./eras";

const AUTOPLAY_MS = 4500;
const SWIPE_THRESHOLD = 50;

const ease = [0.23, 1, 0.32, 1] as const;

/** Six-point asterisk silhouette used as an image mask. */
function AsteriskMask({ id }: { id: string }) {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <clipPath id={id} clipPathUnits="objectBoundingBox">
        {[0, 60, 120].map((angle) => (
          <rect
            key={angle}
            x="0.36"
            y="0"
            width="0.28"
            height="1"
            transform={`rotate(${angle} 0.5 0.5)`}
          />
        ))}
      </clipPath>
    </svg>
  );
}

function AsteriskIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      {[0, 60, 120].map((angle) => (
        <rect
          key={angle}
          x="10"
          y="1"
          width="4"
          height="22"
          rx="1"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}

/** Curved ribbon matching the continuous edge-to-edge text of the original reference */
function Ribbon() {
  const id = useId();
  const phrase = Array.from(
    { length: 8 },
    () => "Lo mejor de Limón es su gente.",
  ).join("  ");

  return (
    <svg
      viewBox="0 0 1200 400"
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-1/2 w-[190vw] max-w-none -translate-x-1/2 -translate-y-[45%] text-sky sm:w-[145vw] md:w-[106vw]"
    >
      <path
        id={id}
        d="M -40 292 C 180 290, 360 275, 520 220 C 660 170, 780 95, 940 70 C 1060 52, 1150 68, 1240 102"
        fill="none"
        stroke="currentColor"
        strokeWidth="56"
        strokeLinecap="butt"
      />
      <text
        className="fill-ink font-sans text-[24px] font-bold tracking-tight"
        dy="8"
      >
        <textPath href={`#${id}`} startOffset="0%">
          {phrase}
        </textPath>
      </text>
    </svg>
  );
}

export default function Chronology() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const maskId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const era = eras[active];
  const progress = active / (eras.length - 1);

  // Advance on its own while visible; any manual interaction hands control to the user.
  useEffect(() => {
    if (!autoplay || !inView) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % eras.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(timer);
  }, [autoplay, inView]);

  // Keep the active year centered in the scrollable rail on small screens.
  useEffect(() => {
    const rail = railRef.current;
    const item = rail?.querySelectorAll("li")[active];
    if (!rail || !item) return;
    rail.scrollTo({
      left: item.offsetLeft - (rail.clientWidth - item.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive((index + eras.length) % eras.length);
  };

  const onSwipe = (_: unknown, { offset }: PanInfo) => {
    if (Math.abs(offset.x) > SWIPE_THRESHOLD)
      select(active + (offset.x < 0 ? 1 : -1));
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="cronologia"
        aria-labelledby="chronology-title"
        className="flex min-h-svh flex-col justify-center overflow-hidden bg-ink py-8 text-cream md:py-10"
      >
        <h2
          id="chronology-title"
          className="font-hero px-6 text-center text-4xl leading-[1.08] font-normal sm:text-5xl md:text-[clamp(2.75rem,5.6svh,4.4rem)]"
        >
          Cronología viva
        </h2>

        {/* Stage: ribbon, masked portrait and floating notes. Swipe to change era on touch. */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={onSwipe}
          className="relative mx-auto mt-3 grid h-[15rem] w-full max-w-6xl touch-pan-y place-items-center md:mt-[clamp(0.75rem,2svh,1.75rem)] md:h-[clamp(17.5rem,42svh,24.5rem)]"
        >
          <Ribbon />
          <AsteriskMask id={maskId} />

          <div
            className="relative aspect-square w-[11.25rem] md:w-[clamp(13.5rem,28svh,17.5rem)]"
            style={{ clipPath: `url(#${maskId})` }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={era.years}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <Image
                  src={era.image}
                  alt={era.alt}
                  fill
                  sizes="300px"
                  className="object-cover grayscale"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Period chip + quote mark (desktop) */}
          <div className="absolute top-6 left-6 hidden items-center gap-3 rounded-full bg-cream/10 py-2 pr-5 pl-2 lg:flex">
            <span className="grid size-8 place-items-center rounded-full bg-sky text-ink">
              <AsteriskIcon className="size-4" />
            </span>
            <span className="grid items-center text-sm font-medium">
              <AnimatePresence initial={false}>
                <motion.span
                  key={era.period}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, ease }}
                  className="col-start-1 row-start-1 block"
                >
                  {era.period}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <span
            aria-hidden
            className="font-display absolute top-28 left-[22%] hidden text-8xl text-sky lg:block"
          >
            “
          </span>

          {/* Note card (desktop) */}
          <div className="absolute right-8 bottom-0 hidden h-[12.25rem] w-64 flex-col justify-start rounded-xl bg-cream p-5 text-ink shadow-sm lg:flex">
            <AsteriskIcon className="size-7 shrink-0 text-moss" />
            <div className="mt-2.5 grid text-sm leading-snug font-medium">
              <AnimatePresence initial={false}>
                <motion.p
                  key={era.years}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease }}
                  className="col-start-1 row-start-1"
                >
                  {era.summary}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Mobile summary replaces the floating card — height locked via CSS Grid so autoplay never shifts page scroll */}
        <div
          className="mx-auto mt-4 grid max-w-md px-6 text-center lg:hidden"
          aria-live="polite"
        >
          {eras.map((item) => (
            <div
              key={item.years}
              aria-hidden
              className="pointer-events-none invisible col-start-1 row-start-1 select-none"
            >
              <p className="font-display text-2xl sm:text-3xl">
                {item.years} {item.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{item.summary}</p>
            </div>
          ))}

          <AnimatePresence initial={false}>
            <motion.div
              key={era.years}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease }}
              className="col-start-1 row-start-1"
            >
              <p className="font-display flex flex-wrap items-baseline justify-center gap-x-2.5 text-2xl sm:text-3xl">
                <span className="text-sky">{era.years}</span>
                <span>{era.title}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-cream/80">
                {era.summary}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline rail */}
        <div
          ref={railRef}
          className="mt-5 overflow-x-auto [scrollbar-width:none] md:mt-[clamp(1.25rem,3.5svh,2.75rem)]"
        >
          <ol className="relative mx-auto grid w-[45rem] grid-cols-6 px-6 md:w-auto md:max-w-6xl">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-6 top-[2.3125rem] h-px bg-cream/15"
            />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute top-[2.3125rem] left-6 h-px origin-left bg-sky"
              // From the first dot to the last one (dots sit at each column's start)
              style={{ width: "calc((100% - 3rem) * 5 / 6)" }}
              animate={{ scaleX: progress }}
              transition={{ duration: 0.5, ease }}
            />
            {eras.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.years} className="relative z-10 pr-4">
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-pressed={isActive}
                    className="group w-full cursor-pointer py-1 text-left transition-transform duration-150 ease-out active:scale-[0.98] focus-visible:outline-none"
                  >
                    <time
                      className={`block text-xs font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-sky"
                          : "text-cream/60 group-hover:text-cream"
                      }`}
                    >
                      {item.years}
                    </time>
                    <span className="mt-3 flex h-5 items-center">
                      <span
                        className={`size-3 rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-out group-focus-visible:ring-2 group-focus-visible:ring-cream ${
                          isActive
                            ? "scale-150 bg-sky ring-4 ring-sky/25"
                            : "bg-cream/40 group-hover:scale-125 group-hover:bg-sky/80"
                        }`}
                      />
                    </span>
                    <span
                      className={`mt-4 block text-sm leading-tight font-semibold transition-colors duration-200 ${
                        isActive
                          ? "text-cream"
                          : "text-cream/55 group-hover:text-cream/90"
                      }`}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-6 flex justify-center px-6 md:mt-[clamp(1.25rem,3.5svh,2.75rem)]">
          <Link
            href="/historia"
            className="inline-flex items-center gap-3 rounded-full bg-cream py-2 pr-2 pl-5 text-sm font-semibold text-ink transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            Recorrer toda la historia
            <span
              aria-hidden
              className="grid size-6 place-items-center rounded-full bg-ink text-xs text-cream"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </MotionConfig>
  );
}
