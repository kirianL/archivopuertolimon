"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke, HalfRing } from "@/components/ui/Shapes";
import type { AccentColor, Building } from "./buildings";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

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

function splitTitle(title: string): { head: string; tail: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { head: "", tail: title };
  const tail = words.pop() ?? "";
  return { head: words.join(" "), tail };
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
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!building) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [building]);

  useEffect(() => {
    if (!building) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [building, onClose]);

  useEffect(() => {
    if (building && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [building]);

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
    <AnimatePresence>
      {building && (
        <>
          <motion.div
            key="building-backdrop"
            aria-hidden
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            onClick={onClose}
          />

          <motion.div
            key="building-page"
            ref={scrollContainerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="building-modal-title"
            className="fixed inset-0 z-50 overflow-y-auto bg-ink text-cream [scrollbar-width:none]"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: "translateY(32px) scale(0.98)" }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transform: "translateY(0px) scale(1)" }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: "translateY(24px) scale(0.98)" }
            }
            transition={{ duration: 0.36, ease: EASE_DRAWER }}
          >
            {/* Sticky top bar */}
            <header className="sticky top-0 z-20 border-b border-cream/10 bg-ink/90 backdrop-blur-md">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <span className="font-display text-xl text-cream">
                  Puerto
                  <br />
                  Limón
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="font-display inline-flex h-10 cursor-pointer items-center gap-2 rounded-[5px] bg-cream px-4 text-lg text-ink transition-transform duration-150 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px"
                >
                  ← Volver a arquitectura
                </button>
              </div>
            </header>

            {/* Building Hero */}
            <div className="relative overflow-hidden py-12 md:py-20">
              <HalfRing
                side="left"
                className={`pointer-events-none absolute top-12 -right-12 h-48 md:h-72 ${accent.ring}`}
              />

              <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
                <div>
                  <h1
                    id="building-modal-title"
                    className="font-display isolate text-5xl text-balance text-cream sm:text-6xl md:text-7xl"
                  >
                    {head ? (
                      <>
                        {head}{" "}
                        <Highlight color={accent.brush}>{tail}</Highlight>
                      </>
                    ) : (
                      <Highlight color={accent.brush}>{tail}</Highlight>
                    )}
                  </h1>

                  <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-pretty text-cream/80 md:text-lg">
                    {building.summary}
                  </p>

                  {/* 3 Key Highlights with colored accent circles */}
                  <dl className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {building.highlights.map((item, idx) => {
                      const dotColors = [
                        "bg-moss",
                        "bg-sky",
                        "bg-ember",
                      ] as const;
                      return (
                        <div key={item.label} className="relative isolate pl-2">
                          <dt className="text-xs font-semibold tracking-wide text-cream/55 uppercase">
                            {item.label}
                          </dt>
                          <dd className="relative mt-1.5 text-base font-bold text-cream">
                            <span
                              aria-hidden
                              className={`pointer-events-none absolute -top-1 -left-2.5 -z-10 size-6 rounded-full ${dotColors[idx % dotColors.length]}`}
                            />
                            <SlotText
                              text={item.value}
                              options={{ rollBy: "word", duration: 280 }}
                            />
                          </dd>
                        </div>
                      );
                    })}
                  </dl>

                  <p className="mt-7 text-sm font-medium text-cream/65">
                    Ubicación: <span className="text-cream">{building.location}</span>
                  </p>
                </div>

                {/* Framed Photograph */}
                <div className="relative isolate">
                  <BrushStroke
                    className={`pointer-events-none absolute -top-5 -right-4 -z-10 h-14 w-44 rotate-[-4deg] ${accent.brush}`}
                  />
                  <BrushStroke
                    className="pointer-events-none absolute -bottom-5 -left-6 -z-10 h-14 w-48 rotate-[5deg] text-sand/70"
                  />

                  <motion.div
                    layoutId={`building-image-${building.id}`}
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
                    <span className="font-display absolute top-3 left-3 rounded bg-cream px-3 py-1 text-xl text-ink shadow-xs">
                      {building.year}
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Modern History Narrative Body */}
            <div className="bg-cream py-14 text-ink md:py-24">
              <div className="mx-auto max-w-4xl px-6">
                <div className="grid gap-10 md:grid-cols-[0.45fr_1fr] md:gap-12">
                  <aside className="relative isolate">
                    <span
                      aria-hidden
                      className={`font-display block text-7xl leading-none ${accent.text}`}
                    >
                      “
                    </span>
                    <p className="mt-2 text-lg leading-snug font-bold text-ink text-pretty">
                      {building.style} · {building.year}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {building.location}
                    </p>
                  </aside>

                  <div className="space-y-6 text-base leading-relaxed text-pretty text-ink/85 md:text-lg">
                    {building.history.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation between buildings */}
                <nav
                  aria-label="Navegación entre edificios"
                  className="mt-14 grid gap-4 border-t border-ink/15 pt-10 sm:grid-cols-3 sm:items-center"
                >
                  {prevBuilding ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(prevBuilding)}
                      className="group flex cursor-pointer flex-col items-start rounded-xl border border-ink/15 p-4 text-left transition-colors duration-150 active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/[0.04]"
                    >
                      <span className="text-xs font-bold tracking-wide text-ink/55 uppercase">
                        ← Anterior
                      </span>
                      <span className="font-display mt-1 text-2xl text-ink">
                        {prevBuilding.name}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="font-display inline-flex h-11 cursor-pointer items-center rounded-[5px] bg-ink px-5 text-lg text-cream transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-px"
                    >
                      Volver al recorrido
                    </button>
                  </div>

                  {nextBuilding ? (
                    <button
                      type="button"
                      onClick={() => onNavigate(nextBuilding)}
                      className="group flex cursor-pointer flex-col items-end rounded-xl border border-ink/15 p-4 text-right transition-colors duration-150 active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/[0.04]"
                    >
                      <span className="text-xs font-bold tracking-wide text-ink/55 uppercase">
                        Siguiente →
                      </span>
                      <span className="font-display mt-1 text-2xl text-ink">
                        {nextBuilding.name}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}
                </nav>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
