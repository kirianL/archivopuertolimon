"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke } from "@/components/ui/Shapes";
import { BuildingModalPage } from "./BuildingModalPage";
import { architectureStats, buildings, type Building } from "./buildings";
import { LimonMap } from "./LimonMap";

type BuildingCardProps = {
  item: Building;
  index: number;
  onOpen: (building: Building) => void;
  snap?: boolean;
};

function BuildingCard({ item, index, onOpen, snap = false }: BuildingCardProps) {
  return (
    <li
      className={`relative isolate w-[78vw] max-w-[340px] shrink-0 sm:w-[340px] md:w-[370px] ${
        snap ? "snap-start" : ""
      }`}
    >
      {/* Decorative brush stroke peeking behind featured cards */}
      {index % 4 === 0 && (
        <BrushStroke className="pointer-events-none absolute -top-3 -left-3 -z-10 h-12 w-32 -rotate-6 text-moss/70" />
      )}

      <button
        type="button"
        onClick={() => onOpen(item)}
        className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <motion.div
          layoutId={`building-image-${item.id}`}
          style={{ borderRadius: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 32, mass: 0.85 }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink/10"
        >
          <Image
            src={item.image}
            alt={`${item.name} (${item.year})`}
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 370px, 78vw"
            className="object-cover"
          />
          <span className="font-display absolute top-3 left-3 rounded bg-cream px-2.5 py-0.5 text-lg text-ink shadow-xs">
            {item.year}
          </span>
          <span
            aria-hidden
            className="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-ink text-base text-cream transition-[background-color,transform] duration-150 ease-out group-active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-moss"
          >
            <span className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5 [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </motion.div>

        <h3 className="font-display mt-4 text-3xl text-ink">{item.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-pretty text-ink/75">
          {item.summary}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-moss uppercase">
          <span>{item.style} · Leer historia</span>
          <span
            aria-hidden
            className="transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </button>
    </li>
  );
}

function ScrollDrivenBuildings({
  onOpen,
}: {
  onOpen: (building: Building) => void;
}) {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const listEl = listRef.current;
    const viewportEl = viewportRef.current;
    if (!listEl || !viewportEl) return;

    const measure = () => {
      setMaxScroll(Math.max(0, listEl.scrollWidth - viewportEl.clientWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(listEl);
    observer.observe(viewportEl);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <div
      ref={scrollTrackRef}
      className="relative"
      style={{
        height: maxScroll > 0 ? `calc(100svh + ${maxScroll}px)` : "300svh",
      }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-8"
      >
        <motion.ol
          ref={listRef}
          style={{ x }}
          className="flex w-max gap-5 px-4 pt-3 pb-4 will-change-transform sm:gap-8 sm:px-6 md:px-[calc((100vw-72rem)/2+1.5rem)]"
        >
          {buildings.map((item, index) => (
            <BuildingCard
              key={item.id}
              item={item}
              index={index}
              onOpen={onOpen}
            />
          ))}
        </motion.ol>

        <div className="mx-auto mt-6 w-full max-w-6xl px-4 sm:px-6">
          <div className="h-1 w-36 overflow-hidden rounded-full bg-ink/10 sm:w-48">
            <motion.div
              aria-hidden
              className="h-full w-full origin-left bg-moss"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Architecture() {
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onPopState = () => {
      const match = window.location.hash.match(/^#edificio-(.+)$/);
      if (match) {
        const found = buildings.find((b) => b.id === match[1]) ?? null;
        setActiveBuilding(found);
      } else {
        setActiveBuilding(null);
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openBuilding = (building: Building) => {
    setActiveBuilding(building);
    window.history.pushState(
      { buildingId: building.id },
      "",
      `#edificio-${building.id}`,
    );
  };

  const navigateBuilding = (building: Building) => {
    setActiveBuilding(building);
    window.history.replaceState(
      { buildingId: building.id },
      "",
      `#edificio-${building.id}`,
    );
  };

  const closeBuilding = () => {
    if (window.location.hash.startsWith("#edificio-")) {
      window.history.back();
    } else {
      setActiveBuilding(null);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <LayoutGroup>
        <section
        id="arquitectura"
        aria-labelledby="architecture-title"
        className="bg-cream pt-14 text-ink md:pt-28"
      >
        {/* Top block wrapped in overflow-hidden so decorative strokes clip without breaking sticky below */}
        <div className="overflow-hidden pb-6 md:pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <h2
                  id="architecture-title"
                  className="font-display isolate text-5xl text-balance md:text-7xl"
                >
                  Arquitectura{" "}
                  <Highlight color="text-sand">emblemática</Highlight>
                </h2>
                <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-pretty text-ink/75 md:text-base">
                  Del victoriano caribeño en madera al art déco: doce
                  estructuras conectadas por una ruta caminable frente al mar
                  que narran más de un siglo de historia.
                </p>

                {/* 2x2 Stats Grid with colored circles behind the numbers */}
                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7 sm:mt-10 sm:gap-x-12 sm:gap-y-10">
                  {architectureStats.map((stat) => (
                    <div key={stat.value} className="relative isolate pl-2">
                      <dt className="sr-only">{stat.description}</dt>
                      <dd className="flex items-baseline gap-1.5">
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute -top-1.5 left-0 -z-10 size-8 rounded-full md:-top-2 md:size-11 ${stat.dotClass}`}
                        />
                        <span className="font-display text-4xl tracking-tight md:text-5xl">
                          {stat.value}
                        </span>
                        {stat.unit && (
                          <span className="text-xs font-bold text-ink/80 md:text-base">
                            {stat.unit}
                          </span>
                        )}
                      </dd>
                      <p className="mt-2 max-w-[24ch] text-xs leading-relaxed text-pretty text-ink/70 md:text-sm">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </dl>
              </div>

              <LimonMap />
            </div>
          </div>
        </div>

        {/* Scroll-driven horizontal gallery (or accessible horizontal scroll when reduced motion is enabled) */}
        {reduceMotion ? (
          <ol className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-3 pb-14 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:gap-8 sm:px-6 md:px-[calc((100vw-72rem)/2+1.5rem)] md:pb-24">
            {buildings.map((item, index) => (
              <BuildingCard
                key={item.id}
                item={item}
                index={index}
                onOpen={openBuilding}
                snap
              />
            ))}
          </ol>
        ) : (
          <ScrollDrivenBuildings onOpen={openBuilding} />
        )}
      </section>

        <BuildingModalPage
          building={activeBuilding}
          buildings={buildings}
          onClose={closeBuilding}
          onNavigate={navigateBuilding}
        />
      </LayoutGroup>
    </MotionConfig>
  );
}
