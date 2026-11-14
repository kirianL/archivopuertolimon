"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LayoutGroup, MotionConfig, motion } from "framer-motion";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke } from "@/components/ui/Shapes";
import { BuildingModalPage } from "./BuildingModalPage";
import { architectureStats, buildings, type Building } from "./buildings";
import { LimonMap } from "./LimonMap";

export default function Architecture() {
  const scrollRef = useRef<HTMLOListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

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

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

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
          className="overflow-hidden bg-cream py-14 text-ink md:py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            {/* Top block: Stats on the left + SVG Map of Limón on the right */}
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <h2
                  id="architecture-title"
                  className="font-display isolate text-5xl text-balance md:text-7xl"
                >
                  Arquitectura <Highlight color="text-sand">emblemática</Highlight>
                </h2>
                <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-pretty text-ink/75 md:text-base">
                  Del victoriano caribeño en madera al art déco: doce estructuras conectadas por una
                  ruta caminable frente al mar que narran más de un siglo de historia.
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

            {/* Carousel navigation controls aligned right (no section subtitle above) */}
            <div className="mt-12 flex justify-end gap-2 sm:mt-16">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Edificios anteriores"
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-ink/15 bg-ink/[0.03] text-ink transition-[background-color,color,transform,opacity] duration-150 ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-25 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink [@media(hover:hover)_and_(pointer:fine)]:hover:text-cream"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Siguientes edificios"
                className="grid size-10 cursor-pointer place-items-center rounded-full border border-ink/15 bg-ink/[0.03] text-ink transition-[background-color,color,transform,opacity] duration-150 ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-25 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink [@media(hover:hover)_and_(pointer:fine)]:hover:text-cream"
              >
                →
              </button>
            </div>
          </div>

          {/* Horizontal Carousel (Touch, Trackpad, Wheel & Buttons) */}
          <ol
            ref={scrollRef}
            className="mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pt-3 pb-6 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:gap-8 md:px-[calc((100vw-72rem)/2+1.5rem)]"
          >
            {buildings.map((item, index) => (
              <li
                key={item.id}
                className="relative isolate w-[78vw] max-w-[340px] shrink-0 snap-start sm:w-[340px] md:w-[370px]"
              >
                {/* Decorative brush stroke peeking behind featured cards */}
                {index % 4 === 0 && (
                  <BrushStroke className="pointer-events-none absolute -top-3 -left-3 -z-10 h-12 w-32 -rotate-6 text-moss/70" />
                )}

                <button
                  type="button"
                  onClick={() => openBuilding(item)}
                  className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  <motion.div
                    layoutId={`building-image-${item.id}`}
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

                  <h3 className="font-display mt-4 text-3xl text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-pretty text-ink/75">
                    {item.summary}
                  </p>
                  <p className="mt-3 text-xs font-bold tracking-wide text-moss uppercase">
                    {item.style} · Leer historia →
                  </p>
                </button>
              </li>
            ))}
          </ol>
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
