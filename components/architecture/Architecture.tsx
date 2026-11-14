"use client";

import Image from "next/image";
import { useState } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke } from "@/components/ui/Shapes";
import { architectureStats, buildings } from "./buildings";
import { LimonMap } from "./LimonMap";

const INITIAL_MOBILE_COUNT = 6;

export default function Architecture() {
  const [showAllMobile, setShowAllMobile] = useState(false);

  return (
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
              Del victoriano caribeño en madera al art déco: doce estructuras
              conectadas por una ruta caminable frente al mar que narran más de
              un siglo de historia.
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

        {/* Bottom block: Vertical list on mobile, 3-column editorial grid on desktop */}
        <ol className="mt-12 grid gap-6 border-t border-ink/10 pt-10 sm:mt-20 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 sm:pt-14 lg:grid-cols-3">
          {buildings.map((item, index) => {
            const hiddenOnMobile =
              !showAllMobile && index >= INITIAL_MOBILE_COUNT;
            return (
              <li
                key={item.id}
                className={`reveal relative isolate grid grid-cols-[112px_1fr] items-start gap-4 sm:block ${
                  hiddenOnMobile ? "hidden sm:block" : ""
                }`}
              >
                {/* Decorative brush accent behind featured cards on desktop */}
                {index % 4 === 0 && (
                  <BrushStroke className="pointer-events-none absolute -top-3 -left-4 -z-10 hidden h-10 w-28 -rotate-6 text-moss/70 sm:block" />
                )}

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink/10">
                  <Image
                    src={item.image}
                    alt={`${item.name} (${item.year})`}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 120px"
                    className="object-cover"
                  />
                  <span className="font-display absolute top-2 left-2 rounded bg-cream/95 px-2 py-0.5 text-sm text-ink shadow-xs sm:top-3 sm:left-3 sm:px-2.5 sm:py-1 sm:text-lg">
                    {item.year}
                  </span>
                </div>

                <div className="min-w-0 sm:mt-4">
                  <p className="text-[11px] font-bold tracking-wide text-moss uppercase sm:text-xs">
                    {item.style}
                  </p>
                  <h3 className="mt-0.5 text-base leading-snug font-bold text-ink sm:mt-1 sm:text-lg">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-pretty text-ink/75 sm:mt-2 sm:text-sm">
                    {item.summary}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Mobile-only progressive disclosure button so vertical scrolling stays fast */}
        <div className="mt-8 flex justify-center sm:hidden">
          <button
            type="button"
            onClick={() => setShowAllMobile((v) => !v)}
            className="font-display inline-flex h-10 cursor-pointer items-center rounded-[5px] bg-ink px-5 text-lg text-cream transition-transform duration-150 ease-out active:scale-[0.97]"
          >
            {showAllMobile
              ? "Mostrar menos"
              : `Ver los ${buildings.length} edificios`}
          </button>
        </div>
      </div>
    </section>
  );
}
