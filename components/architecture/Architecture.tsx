"use client";

import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";
import {
  LayoutGroup,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke, EditorialArrow } from "@/components/ui/Shapes";
import { BuildingModalPage } from "./BuildingModalPage";
import { architectureStats, buildings, type Building } from "./buildings";
import { LimonMap } from "./LimonMap";

type BuildingCardProps = {
  item: Building;
  index: number;
  isActive: boolean;
  onOpen: (building: Building) => void;
  snap?: boolean;
};

function BuildingCard({
  item,
  index,
  isActive,
  onOpen,
  snap = false,
}: BuildingCardProps) {
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
          layoutId={isActive ? `building-image-${item.id}` : undefined}
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
        </motion.div>

        <h3 className="font-display mt-4 text-3xl text-ink">{item.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-pretty text-ink/75">
          {item.summary}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-moss uppercase">
          <span>{item.style} · Leer historia</span>
          <EditorialArrow
            direction="right"
            className="h-3 w-4 transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-1"
          />
        </p>
      </button>
    </li>
  );
}

type ScrollDrivenBuildingsProps = {
  activeBuildingId: string | null;
  scrollTrackRef: RefObject<HTMLDivElement | null>;
  maxScroll: number;
  onMaxScrollChange: (maxScroll: number) => void;
  onOpen: (building: Building) => void;
};

function ScrollDrivenBuildings({
  activeBuildingId,
  scrollTrackRef,
  maxScroll,
  onMaxScrollChange,
  onOpen,
}: ScrollDrivenBuildingsProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const listEl = listRef.current;
    const viewportEl = viewportRef.current;
    if (!listEl || !viewportEl) return;

    let lastWidth = 0;
    let lastScrollWidth = 0;

    const measure = () => {
      const viewportWidth = viewportEl.clientWidth;
      const scrollWidth = listEl.scrollWidth;
      // Ignore vertical-only iOS Safari address-bar resize events where widths did not change
      if (viewportWidth === lastWidth && scrollWidth === lastScrollWidth) {
        return;
      }
      lastWidth = viewportWidth;
      lastScrollWidth = scrollWidth;
      onMaxScrollChange(Math.max(0, scrollWidth - viewportWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(listEl);
    observer.observe(viewportEl);

    return () => {
      observer.disconnect();
    };
  }, [onMaxScrollChange]);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <div
      ref={scrollTrackRef}
      className="relative hidden w-full md:block"
      style={{
        height:
          maxScroll > 0
            ? `calc(560px + ${Math.round(maxScroll * 0.85)}px)`
            : "240svh",
      }}
    >
      <div className="sticky top-10 w-full overflow-hidden md:top-16">
        <div
          ref={viewportRef}
          className="relative w-full max-w-full overflow-hidden pt-3 pb-12 touch-pan-y md:pt-4 md:pb-20"
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
                isActive={activeBuildingId === null}
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
    </div>
  );
}

type NativeHorizontalBuildingsProps = {
  activeBuildingId: string | null;
  onOpen: (building: Building) => void;
  className?: string;
};

function NativeHorizontalBuildings({
  activeBuildingId,
  onOpen,
  className = "",
}: NativeHorizontalBuildingsProps) {
  const scrollerRef = useRef<HTMLOListElement>(null);
  const { scrollXProgress } = useScroll({ container: scrollerRef });

  return (
    <div className={`pt-3 pb-14 md:pb-24 ${className}`}>
      <ol
        ref={scrollerRef}
        className="flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-3 pb-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:scroll-px-6 sm:gap-8 sm:px-6 md:scroll-px-[calc((100vw-72rem)/2+1.5rem)] md:px-[calc((100vw-72rem)/2+1.5rem)]"
      >
        {buildings.map((item, index) => (
          <BuildingCard
            key={item.id}
            item={item}
            index={index}
            isActive={activeBuildingId === null}
            onOpen={onOpen}
            snap
          />
        ))}
      </ol>

      <div className="mx-auto mt-4 w-full max-w-6xl px-4 sm:px-6">
        <div className="h-1 w-36 overflow-hidden rounded-full bg-ink/10 sm:w-48">
          <motion.div
            aria-hidden
            className="h-full w-full origin-left bg-moss"
            style={{ scaleX: scrollXProgress }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Architecture() {
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
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

    const trackEl = scrollTrackRef.current;
    if (trackEl && maxScroll > 0) {
      const index = buildings.findIndex((b) => b.id === building.id);
      if (index >= 0) {
        const trackTop =
          trackEl.getBoundingClientRect().top + window.scrollY;
        const scrollableDistance = Math.max(
          0,
          trackEl.offsetHeight - window.innerHeight,
        );
        const targetTop =
          trackTop +
          (index / Math.max(1, buildings.length - 1)) * scrollableDistance;
        window.scrollTo({ top: targetTop, behavior: "instant" });
      }
    }
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
        className="overflow-x-clip bg-cream pt-14 text-ink md:pt-28"
      >
        {/* Top block wrapped in overflow-hidden so decorative strokes clip without breaking sticky below */}
        <div className="overflow-hidden pb-2 md:pb-6">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <h2
                  id="architecture-title"
                  className="font-hero isolate text-4xl leading-[1.08] font-normal text-balance sm:text-5xl md:text-6xl"
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

        {/* Mobile: native horizontal swipeable carousel (no vertical scroll-jacking or empty space). Desktop: scroll-driven horizontal gallery (or native horizontal scroll when reduced motion is enabled). */}
        {reduceMotion ? (
          <NativeHorizontalBuildings
            activeBuildingId={activeBuilding?.id ?? null}
            onOpen={openBuilding}
          />
        ) : (
          <>
            <NativeHorizontalBuildings
              activeBuildingId={activeBuilding?.id ?? null}
              onOpen={openBuilding}
              className="md:hidden"
            />
            <ScrollDrivenBuildings
              activeBuildingId={activeBuilding?.id ?? null}
              scrollTrackRef={scrollTrackRef}
              maxScroll={maxScroll}
              onMaxScrollChange={setMaxScroll}
              onOpen={openBuilding}
            />
          </>
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
