"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke, HalfRing } from "@/components/ui/Shapes";
import type { AccentColor, Building } from "./buildings";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const IMAGE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 32,
  mass: 0.85,
} as const;

const ACCENT_STYLES: Record<
  AccentColor,
  { text: string; bg: string; brush: string; ring: string }
> = {
  moss: {
    text: "text-moss",
    bg: "bg-moss",
    brush: "text-moss/85",
    ring: "text-moss/35",
  },
  sky: {
    text: "text-sky",
    bg: "bg-sky",
    brush: "text-sky/80",
    ring: "text-sky/25",
  },
  ember: {
    text: "text-ember",
    bg: "bg-ember",
    brush: "text-ember/85",
    ring: "text-ember/25",
  },
  sand: {
    text: "text-sand",
    bg: "bg-sand",
    brush: "text-sand/85",
    ring: "text-sand/30",
  },
};

const HIGHLIGHT_DOT_COLORS = ["bg-moss", "bg-sky", "bg-ember"] as const;

function splitTitle(title: string): { head: string; tail: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { head: "", tail: title };
  const tail = words.pop() ?? "";
  return { head: words.join(" "), tail };
}

type BuildingNavPreviewProps = {
  item: Building;
  direction: "prev" | "next";
  onNavigate: (building: Building) => void;
};

function BuildingNavPreview({
  item,
  direction,
  onNavigate,
}: BuildingNavPreviewProps) {
  const isNext = direction === "next";

  return (
    <button
      type="button"
      onClick={() => onNavigate(item)}
      className={`group block w-full cursor-pointer text-left transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 ${
        isNext ? "sm:text-right" : ""
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ink/10 sm:rounded-2xl">
        <Image
          src={item.image}
          alt={item.name}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 320px, 46vw"
          className="object-cover"
        />
        <span className="font-display absolute top-2.5 left-2.5 rounded bg-cream px-2 py-0.5 text-sm text-ink shadow-xs sm:top-3 sm:left-3 sm:px-2.5 sm:text-base">
          {item.year}
        </span>
        <span
          aria-hidden
          className={`absolute bottom-2.5 grid size-8 place-items-center rounded-full bg-ink text-sm text-cream transition-[background-color,transform] duration-150 ease-out group-active:scale-95 sm:bottom-3 sm:size-9 [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-moss ${
            isNext ? "right-2.5 sm:right-3" : "left-2.5 sm:left-3"
          }`}
        >
          <span
            className={`transition-transform duration-200 ease-out ${
              isNext
                ? "[@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                : "[@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-x-0.5"
            }`}
          >
            {isNext ? "→" : "←"}
          </span>
        </span>
      </div>

      <span className="font-display mt-3 block text-xl leading-none text-ink sm:text-2xl md:text-3xl">
        {item.name}
      </span>

      <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-moss uppercase sm:mt-2 sm:text-xs">
        {isNext ? (
          <>
            <span>Siguiente · {item.year}</span>
            <span
              aria-hidden
              className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
            >
              →
            </span>
          </>
        ) : (
          <>
            <span
              aria-hidden
              className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-x-1"
            >
              ←
            </span>
            <span>Anterior · {item.year}</span>
          </>
        )}
      </span>
    </button>
  );
}

type BuildingModalPageProps = {
  building: Building | null;
  buildings: Building[];
  onClose: () => void;
  onNavigate: (building: Building) => void;
};

export function BuildingModalPage({
  building,
  buildings,
  onClose,
  onNavigate,
}: BuildingModalPageProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevOverflowRef = useRef<string | null>(null);
  const prevBuildingIdRef = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  const buildingId = building?.id ?? null;

  const restoreBodyOverflow = useCallback(() => {
    if (prevOverflowRef.current !== null) {
      document.body.style.overflow = prevOverflowRef.current;
      prevOverflowRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (buildingId && prevOverflowRef.current === null) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }, [buildingId]);

  useEffect(() => {
    return () => {
      restoreBodyOverflow();
    };
  }, [restoreBodyOverflow]);

  useEffect(() => {
    if (!buildingId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buildingId, onClose]);

  useEffect(() => {
    const prevId = prevBuildingIdRef.current;
    prevBuildingIdRef.current = buildingId;

    if (prevId && buildingId && prevId !== buildingId) {
      scrollContainerRef.current?.scrollTo({
        top: 0,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }
  }, [buildingId, reduceMotion]);

  const currentIndex = building
    ? buildings.findIndex((item) => item.id === building.id)
    : -1;
  const prevBuilding =
    currentIndex >= 0
      ? buildings[(currentIndex - 1 + buildings.length) % buildings.length]
      : null;
  const nextBuilding =
    currentIndex >= 0
      ? buildings[(currentIndex + 1) % buildings.length]
      : null;

  const accent = building ? ACCENT_STYLES[building.accent] : ACCENT_STYLES.sand;
  const { head, tail } = building
    ? splitTitle(building.name)
    : { head: "", tail: "" };

  return (
    <AnimatePresence onExitComplete={restoreBodyOverflow}>
      {building && (
        <motion.div
          key="building-backdrop"
          aria-hidden
          className="fixed inset-0 z-50 bg-ink/75 backdrop-blur-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          onClick={onClose}
        />
      )}

      {building && (
        <motion.div
          key="building-page"
          ref={scrollContainerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="building-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-ink text-cream [scrollbar-width:none] [-webkit-overflow-scrolling:touch]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease: EASE_OUT }}
        >
          {/* Sticky top bar */}
          <header className="sticky top-0 z-20 border-b border-cream/10 bg-ink/90 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <span className="font-display text-lg leading-none text-cream sm:text-xl">
                Puerto
                <br />
                Limón
              </span>
              <button
                type="button"
                onClick={onClose}
                className="font-display inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-[5px] bg-cream px-3.5 text-base text-ink transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:h-10 sm:px-4 sm:text-lg [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px"
              >
                <span>← Volver</span>
                <span className="hidden sm:inline">a arquitectura</span>
              </button>
            </div>
          </header>

          <article key={building.id}>
            {/* Building Hero */}
            <div className="relative overflow-hidden py-7 sm:py-10 md:py-16">
              <HalfRing
                side="left"
                className={`pointer-events-none absolute top-8 -right-12 h-36 sm:top-12 sm:h-48 md:h-72 ${accent.ring}`}
              />

              <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-5">
                <motion.h1
                  id="building-modal-title"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "translate3d(0, 16px, 0)" }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, transform: "translate3d(0, 0px, 0)" }
                  }
                  transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.06 }}
                  className="font-display isolate text-4xl text-balance text-cream sm:text-6xl md:text-7xl lg:col-start-1 lg:row-start-1 lg:self-end"
                >
                  {head ? (
                    <>
                      {head} <Highlight color={accent.brush}>{tail}</Highlight>
                    </>
                  ) : (
                    <Highlight color={accent.brush}>{tail}</Highlight>
                  )}
                </motion.h1>

                {/* Framed Photograph */}
                <div className="relative isolate my-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:my-0">
                  <BrushStroke
                    className={`pointer-events-none absolute -top-3 -right-2 -z-10 h-10 w-32 rotate-[-4deg] sm:-top-5 sm:-right-4 sm:h-14 sm:w-44 ${accent.brush}`}
                  />
                  <BrushStroke
                    className="pointer-events-none absolute -bottom-3 -left-3 -z-10 h-10 w-36 rotate-[5deg] text-sand/70 sm:-bottom-5 sm:-left-6 sm:h-14 sm:w-48"
                  />

                  <motion.div
                    layoutId={`building-image-${building.id}`}
                    style={{ borderRadius: 16 }}
                    transition={IMAGE_SPRING}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-cream/10 shadow-xl ring-1 ring-cream/15"
                  >
                    <Image
                      src={building.image}
                      alt={`${building.name} (${building.year})`}
                      fill
                      priority
                      placeholder="blur"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <span className="font-display absolute top-3 left-3 rounded bg-cream px-2.5 py-0.5 text-lg text-ink shadow-xs sm:px-3 sm:py-1 sm:text-xl">
                      {building.year}
                    </span>
                  </motion.div>
                </div>

                {/* Summary, 3 Key Highlights & Location */}
                <motion.div
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, transform: "translate3d(0, 16px, 0)" }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, transform: "translate3d(0, 0px, 0)" }
                  }
                  transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.06 }}
                  className="lg:col-start-1 lg:row-start-2 lg:self-start"
                >
                  <p className="max-w-[46ch] text-sm leading-relaxed text-pretty text-cream/80 sm:text-base md:text-lg">
                    {building.summary}
                  </p>

                  <dl className="mt-6 grid grid-cols-3 gap-3 sm:mt-8 sm:gap-6">
                    {building.highlights.map((item, idx) => (
                      <div
                        key={item.label}
                        className="relative isolate pl-1.5 sm:pl-2"
                      >
                        <dt className="text-[10px] font-semibold tracking-wide text-cream/55 uppercase sm:text-xs">
                          {item.label}
                        </dt>
                        <dd className="relative mt-1 text-xs leading-snug font-bold text-cream sm:mt-1.5 sm:text-base">
                          <span
                            aria-hidden
                            className={`pointer-events-none absolute -top-0.5 -left-1.5 -z-10 size-4 rounded-full sm:-top-1 sm:-left-2.5 sm:size-6 ${HIGHLIGHT_DOT_COLORS[idx % HIGHLIGHT_DOT_COLORS.length]}`}
                          />
                          <SlotText
                            text={item.value}
                            options={{ rollBy: "word", duration: 280 }}
                          />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 text-xs font-medium text-cream/65 sm:mt-7 sm:text-sm">
                    Ubicación:{" "}
                    <span className="text-cream">{building.location}</span>
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Modern History Narrative Body */}
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, transform: "translate3d(0, 16px, 0)" }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, transform: "translate3d(0, 0px, 0)" }
              }
              transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.06 }}
              className="bg-cream py-10 text-ink sm:py-14 md:py-20"
            >
              <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="grid gap-5 md:grid-cols-[0.45fr_1fr] md:gap-12">
                  <aside className="relative isolate">
                    <span
                      aria-hidden
                      className={`font-display block text-5xl leading-none sm:text-7xl ${accent.text}`}
                    >
                      “
                    </span>
                    <p className="mt-1 text-base leading-snug font-bold text-ink text-pretty sm:mt-2 sm:text-lg">
                      {building.style} · {building.year}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink/70 sm:mt-2 sm:text-sm">
                      {building.location}
                    </p>
                  </aside>

                  <div className="space-y-4 text-sm leading-relaxed text-pretty text-ink/85 sm:space-y-6 sm:text-base md:text-lg">
                    {building.history.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation between buildings */}
                <nav
                  aria-label="Navegación entre edificios"
                  className="mt-12 grid grid-cols-2 items-start gap-4 border-t border-ink/15 pt-8 sm:gap-8 md:mt-16 md:pt-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12"
                >
                  {prevBuilding ? (
                    <BuildingNavPreview
                      item={prevBuilding}
                      direction="prev"
                      onNavigate={onNavigate}
                    />
                  ) : (
                    <div />
                  )}

                  <div className="order-last col-span-2 flex justify-center pt-2 lg:order-none lg:col-span-1 lg:pt-0">
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-display inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-[5px] bg-ink px-5 text-lg text-cream transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:w-auto [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px"
                    >
                      Volver al recorrido
                    </button>
                  </div>

                  {nextBuilding ? (
                    <BuildingNavPreview
                      item={nextBuilding}
                      direction="next"
                      onNavigate={onNavigate}
                    />
                  ) : (
                    <div />
                  )}
                </nav>
              </div>
            </motion.div>
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
