"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Highlight } from "@/components/ui/Highlight";
import {
  Bay,
  BrushStroke,
  ChalkStrokes,
  HalfRing,
  PlusIcon,
} from "@/components/ui/Shapes";
import imgExpresion from "@/public/Limón - images/ExpresionCultura.png";
import imgCarnaval from "@/public/Limón - images/Carnaval.png";
import imgFerguson from "@/public/Limón - images/a-Ferguson1.jpg";
import imgPatty from "@/public/Limón - images/patty.jpg";
import imgCalypsonian from "@/public/Limón - images/Parade/Musicos y cantantes/539902822_754962860647126_9178661086593066020_n.jpg";
import imgMaracas from "@/public/Limón - images/Parade/Musicos y cantantes/540004486_754962117313867_1346397361303001633_n.jpg";
import imgComparsaFeather from "@/public/Limón - images/Parade/Trajes/540455199_759706376839441_6626957489670622357_n.jpg";
import imgGalaCrown from "@/public/Limón - images/Parade/Trajes/540589295_759705376839541_8886161950268267501_n.jpg";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type CarnivalPillar = {
  id: string;
  number: string;
  title: string;
  detail: string;
  caption: string;
  credit?: string;
  dotClass: string;
  image: StaticImageData;
  secondaryImage: StaticImageData;
  alt: string;
  secondaryAlt: string;
  filterClass: string;
  tintClass: string;
  filterLabel: string;
};

const carnivalPillars: readonly CarnivalPillar[] = [
  {
    id: "comparsas",
    number: "01",
    title: "Comparsas y desfiles",
    detail: "Tambores, penachos y coreografías que toman las avenidas del puerto en octubre.",
    caption: "Recorrido principal del Carnaval de Limón alrededor del Día de las Culturas.",
    credit: "Foto: Xavier Sandí Castillo",
    dotClass: "bg-moss",
    image: imgCarnaval,
    secondaryImage: imgComparsaFeather,
    alt: "Sonrisa y traje tradicional durante el desfile del Carnaval de Limón",
    secondaryAlt: "Integrante de comparsa con penacho de plumas y bastón ceremonial",
    filterClass: "contrast-[1.08] saturate-[1.14] sepia-[0.06]",
    tintClass: "bg-sand/10 mix-blend-multiply",
    filterLabel: "Cálido Kodachrome",
  },
  {
    id: "musica",
    number: "02",
    title: "Música en vivo (calipso, reggae, soca)",
    detail: "Tarimas abiertas y esquinas donde el bajo caribeño y las maracas marcan el paso.",
    caption: "Músicos y calipseros en vivo durante las jornadas culturales del puerto.",
    credit: "Foto: Xavier Sandí Castillo",
    dotClass: "bg-sky",
    image: imgCalypsonian,
    secondaryImage: imgMaracas,
    alt: "Calipsero limonense cantando con guitarra en vivo",
    secondaryAlt: "Músico tocando maracas en tarima durante el carnaval",
    filterClass: "grayscale contrast-125 brightness-95",
    tintClass: "bg-sky/15 mix-blend-multiply",
    filterLabel: "Archivo monocromo",
  },
  {
    id: "baile",
    number: "03",
    title: "Baile, color y tradición",
    detail: "Vestuarios de gala, turbantes y herencia afrocaribeña transmitida entre generaciones.",
    caption: "Indumentaria tradicional y coronas artesanales en las calles de Limón.",
    credit: "Foto: Xavier Sandí Castillo",
    dotClass: "bg-ember",
    image: imgGalaCrown,
    secondaryImage: imgCarnaval,
    alt: "Joven con corona artesanal y vestido tradicional en el desfile",
    secondaryAlt: "Vestimenta colorida en las calles de Puerto Limón",
    filterClass: "contrast-[1.1] saturate-[1.08] sepia-[0.12]",
    tintClass: "bg-ember/10 mix-blend-multiply",
    filterLabel: "Dorado editorial",
  },
  {
    id: "gastronomia",
    number: "04",
    title: "Gastronomía local",
    detail: "Patty recién horneado con chile panameño, plantain tart, rice & beans y agua de sapo.",
    caption: "Sabores afrocaribeños que acompañan cada esquina de la fiesta limonense.",
    dotClass: "bg-sand",
    image: imgPatty,
    secondaryImage: imgExpresion,
    alt: "Patty limonense recién horneado junto a chiles panameños",
    secondaryAlt: "Ambiente festivo en las calles del centro de Limón",
    filterClass: "contrast-[1.12] saturate-[1.15]",
    tintClass: "bg-sand/15 mix-blend-multiply",
    filterLabel: "Alto contraste",
  },
] as const;

export default function Culture() {
  const shouldReduceMotion = useReducedMotion();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [archivalMono, setArchivalMono] = useState(true);

  const activePillar = carnivalPillars[activePillarIndex];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="cultura"
        aria-labelledby="culture-title"
        className="overflow-hidden"
      >
        {/* =====================================================================
            BANDA 1: MANIFIESTO + RITMO, MÚSICA Y EXPRESIÓN CULTURAL (TERRACOTA)
           ===================================================================== */}
        <div className="bg-clay py-14 text-cream md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            {/* Manifiesto de apertura */}
            <div className="grid gap-8 border-b border-cream/20 pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-14 lg:pb-20">
              <div>
                <h2
                  id="culture-title"
                  className="font-display isolate text-5xl text-balance sm:text-6xl md:text-8xl"
                >
                  Cultura y <Highlight color="text-sand">vida local</Highlight>
                </h2>
              </div>

              <div className="relative isolate">
                <ChalkStrokes className="pointer-events-none absolute -top-6 -left-4 -z-10 h-20 w-56 text-sand/25 sm:h-24 sm:w-64" />
                <p className="font-display text-3xl text-sand sm:text-4xl md:text-5xl">
                  “Limón no se resume: se vive.”
                </p>
                <p className="mt-4 max-w-[50ch] text-sm leading-relaxed text-pretty text-cream/90 sm:text-base">
                  La cultura de Puerto Limón no se muestra: se vive. Está en la
                  música que suena desde una casa, en una partida de dominó bajo
                  la sombra, en el saludo entre vecinos y en frases que reflejan
                  una forma distinta y orgullosa de ver la vida. Limón es
                  identidad afrocaribeña viva, transmitida en ritmo, palabra y
                  convivencia diaria.
                </p>
              </div>
            </div>

            {/* Historia 1: Ritmo, música y expresión cultural */}
            <div className="mt-12 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
              {/* Collage asimétrico de 3 fotografías con filtros contrastados (Color analógico + B&N de archivo) */}
              <div className="relative isolate mx-auto grid w-full max-w-md grid-cols-[1.25fr_1fr] gap-2.5 sm:max-w-xl sm:gap-3.5 lg:max-w-none">
                <BrushStroke className="pointer-events-none absolute -top-5 left-[6%] -z-10 h-14 w-[52%] rotate-[-4deg] text-sand" />
                <BrushStroke className="pointer-events-none absolute -bottom-5 left-[12%] -z-10 h-14 w-[48%] rotate-[-7deg] text-moss" />
                <BrushStroke className="pointer-events-none absolute top-[28%] -right-5 -z-10 h-12 w-[36%] rotate-[6deg] text-sky/80" />

                {/* Foto principal vertical: Cálido analógico */}
                <figure className="relative mt-6 aspect-[3/4] overflow-hidden rounded-2xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:mt-8">
                  <Image
                    src={imgExpresion}
                    alt="Joven música con platillos en las calles de Puerto Limón"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1024px) 55vw, 30vw"
                    className="object-cover contrast-[1.08] saturate-[1.12] sepia-[0.08]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-sand/10 mix-blend-multiply"
                  />
                  <figcaption className="absolute bottom-2.5 left-2.5 rounded bg-ink/85 px-2.5 py-1 text-[11px] font-medium tracking-wide text-cream/95">
                    Foto: Xavier Sandí Castillo
                  </figcaption>
                </figure>

                {/* Columna derecha del collage: B&N de alto contraste + Duotono cálido */}
                <div className="grid gap-2.5 sm:gap-3.5">
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/30 ring-1 ring-white/15 ring-inset">
                    <Image
                      src={imgCalypsonian}
                      alt="Calipsero limonense interpretando con su guitarra"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 45vw, 24vw"
                      className="object-cover grayscale contrast-125 brightness-95"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-sand/20 mix-blend-multiply"
                    />
                    <span className="font-display absolute top-2.5 right-2.5 rounded bg-cream px-2 py-0.5 text-xs text-ink">
                      Calipso
                    </span>
                  </figure>

                  <figure className="relative aspect-[4/3] w-[88%] overflow-hidden rounded-2xl bg-ink/30 ring-1 ring-white/15 ring-inset">
                    <Image
                      src={imgMaracas}
                      alt="Percusionista con maracas en celebración comunitaria"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 40vw, 20vw"
                      className="object-cover contrast-[1.1] saturate-[1.15] sepia-[0.1]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-ink/15 mix-blend-multiply"
                    />
                  </figure>
                </div>
              </div>

              {/* Columna editorial + Tarjeta póster estilo referencia "ID. Know Yourself" */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-display isolate text-4xl text-balance sm:text-5xl md:text-6xl">
                    Ritmo, música y{" "}
                    <Highlight color="text-moss">expresión cultural</Highlight>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-pretty text-cream/90 sm:text-base">
                    La música es una extensión del carácter limonense. El
                    calipso, el reggae y otros ritmos caribeños acompañan
                    celebraciones, reuniones familiares y actividades
                    comunitarias.
                  </p>
                </div>

                {/* Póster tipográfico inspirado en la referencia "ID. Know Yourself" */}
                <div className="relative isolate overflow-hidden rounded-2xl bg-moss px-6 py-7 text-cream ring-1 ring-white/15 ring-inset sm:px-8 sm:py-9">
                  <HalfRing
                    side="left"
                    className="pointer-events-none absolute top-1/2 -left-10 -z-10 h-40 -translate-y-1/2 text-ink/25 sm:h-48"
                  />
                  <HalfRing
                    side="right"
                    className="pointer-events-none absolute top-1/2 -right-10 -z-10 h-40 -translate-y-1/2 text-ink/25 sm:h-48"
                  />

                  <div className="flex items-center justify-between text-ink">
                    <span className="font-display text-sm tracking-wider uppercase">
                      Puerto Limón · Sonido vivo
                    </span>
                    <PlusIcon className="size-4 text-ink" />
                  </div>

                  <blockquote className="mt-6 text-center sm:mt-8">
                    <p className="font-display mx-auto max-w-[18ch] text-3xl leading-[0.95] text-balance text-cream sm:text-4xl">
                      “En Limón, la música no se programa: simplemente sucede.”
                    </p>
                  </blockquote>

                  <div className="mt-6 flex justify-center">
                    <Bay className="h-6 w-14 text-ink/35" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            BANDA 2: CARNAVAL DE LIMÓN (CREMA EDITORIAL + GRILLA ARQUITECTÓNICA)
           ===================================================================== */}
        <div className="bg-cream py-14 text-ink md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            {/* Encabezado + Escenario visual interactivo con filtros */}
            <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
              <div>
                <h3 className="font-display isolate text-4xl text-balance sm:text-6xl md:text-7xl">
                  Carnaval de Limón:{" "}
                  <Highlight color="text-ember">orgullo que se baila</Highlight>
                </h3>
                <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-pretty text-ink/80 sm:text-base">
                  Celebrado en octubre alrededor del Día de las Culturas, es la
                  mayor expresión cultural de la provincia. El carnaval no es
                  solo una fiesta: es memoria, identidad y resistencia cultural.
                </p>

                {/* Tarjeta flotante de contexto activo (inspirada en referencia 2 y 4) */}
                <div className="mt-7 border-t border-ink/15 pt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-2xl text-ember sm:text-3xl">
                      {activePillar.number} · {activePillar.title}
                    </span>
                    <span className="rounded-full bg-ink/8 px-3 py-1 text-[11px] font-bold tracking-wider text-ink/70 uppercase">
                      Filtro: {activePillar.filterLabel}
                    </span>
                  </div>
                  <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-pretty text-ink/75">
                    {activePillar.detail}
                  </p>
                </div>
              </div>

              {/* Escenario fotográfico doble con cambio de filtro e imagen por pilar */}
              <div className="relative isolate mx-auto w-full max-w-xl lg:max-w-none">
                <BrushStroke className="pointer-events-none absolute -top-5 right-[8%] -z-10 h-14 w-[48%] rotate-[4deg] text-sky" />
                <BrushStroke className="pointer-events-none absolute -bottom-5 -left-5 -z-10 h-14 w-[45%] rotate-[-6deg] text-ember/80" />

                <div className="grid grid-cols-[1fr_0.42fr] items-end gap-2.5 sm:gap-3.5">
                  {/* Imagen principal del pilar activo */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-black/10 ring-inset">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={activePillar.id}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                filter: "blur(2px)",
                                transform: "scale(0.97)",
                              }
                        }
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : {
                                opacity: 1,
                                filter: "blur(0px)",
                                transform: "scale(1)",
                              }
                        }
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                filter: "blur(2px)",
                                transform: "scale(0.98)",
                              }
                        }
                        transition={{ duration: 0.24, ease: EASE_OUT }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activePillar.image}
                          alt={activePillar.alt}
                          fill
                          placeholder="blur"
                          sizes="(max-width: 1024px) 68vw, 38vw"
                          className={`object-cover ${activePillar.filterClass}`}
                        />
                        <div
                          aria-hidden
                          className={`pointer-events-none absolute inset-0 ${activePillar.tintClass}`}
                        />
                      </motion.div>
                    </AnimatePresence>

                    <span className="font-display absolute top-3 left-3 z-10 rounded bg-cream px-2.5 py-0.5 text-base text-ink shadow-xs">
                      Octubre · Día de las Culturas
                    </span>

                    {activePillar.credit && (
                      <span className="absolute bottom-2.5 left-2.5 z-10 rounded bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-cream">
                        {activePillar.credit}
                      </span>
                    )}
                  </div>

                  {/* Segunda fotografía en monocromo de contraste (inspirado en referencias 2 y 3) */}
                  <div className="flex flex-col gap-2.5 sm:gap-3">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-black/10 ring-inset">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={`${activePillar.id}-secondary`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.22, ease: EASE_OUT }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={activePillar.secondaryImage}
                            alt={activePillar.secondaryAlt}
                            fill
                            placeholder="blur"
                            sizes="(max-width: 1024px) 28vw, 16vw"
                            className="object-cover grayscale contrast-125"
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-sand/20 mix-blend-multiply"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="rounded-xl bg-ink p-3 text-cream sm:p-3.5">
                      <p className="text-[11px] leading-snug text-cream/85 sm:text-xs">
                        {activePillar.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grilla editorial de 4 pilares (Sin cajas AI-slop; columnas arquitectónicas con círculos desplazados como Architecture.tsx y Referencias 2, 3 y 4) */}
            <div
              role="tablist"
              aria-label="Pilares del Carnaval de Limón"
              className="mt-10 grid grid-cols-2 border-t border-ink/15 lg:mt-16 lg:grid-cols-4"
            >
              {carnivalPillars.map((pillar, index) => {
                const isSelected = index === activePillarIndex;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActivePillarIndex(index)}
                    className={`group relative isolate flex cursor-pointer flex-col justify-between border-b border-ink/15 p-4 text-left transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none [touch-action:manipulation] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink sm:p-6 odd:border-r odd:border-ink/15 lg:border-r lg:border-b-0 lg:last:border-r-0 ${
                      isSelected
                        ? "bg-ink/[0.04]"
                        : "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/[0.025]"
                    }`}
                  >
                    {/* Indicador superior activo */}
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-ink transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        isSelected
                          ? "scale-x-100"
                          : "scale-x-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-x-50"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-2">
                      <div className="relative isolate pl-1.5">
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute -top-1 left-0 -z-10 size-7 rounded-full transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:size-9 ${
                            pillar.dotClass
                          } ${isSelected ? "scale-110" : "opacity-85"}`}
                        />
                        <span className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                          {pillar.number}
                        </span>
                      </div>

                      <PlusIcon
                        className={`size-3.5 text-ink/60 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isSelected ? "rotate-45 text-ink" : ""
                        }`}
                      />
                    </div>

                    <div className="mt-5 sm:mt-7">
                      <p className="font-display text-xl leading-[0.98] text-balance text-ink sm:text-2xl">
                        {pillar.title}
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-pretty text-ink/70 sm:text-sm">
                        {pillar.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================================
            BANDA 3: HOMENAJE A WALTER FERGUSON (ARCHIVO NOCTURNO + CITA MONUMENTAL)
           ===================================================================== */}
        <section
          aria-labelledby="ferguson-title"
          className="relative overflow-hidden bg-ink py-16 text-cream md:py-28"
        >
          <HalfRing
            side="left"
            className="pointer-events-none absolute top-10 -right-14 h-56 text-sand/15 md:h-80"
          />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              {/* Retrato de archivo con filtro gelatina de plata / color conmutable + tarjeta editorial flotante */}
              <div className="relative isolate mx-auto w-full max-w-md lg:max-w-none">
                <BrushStroke className="pointer-events-none absolute -top-5 -left-5 -z-10 h-14 w-44 rotate-[-6deg] text-sand/85" />
                <BrushStroke className="pointer-events-none absolute -right-4 -bottom-5 -z-10 h-14 w-44 rotate-[4deg] text-ember/80" />

                <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream/10 ring-1 ring-white/15 ring-inset">
                  <Image
                    src={imgFerguson}
                    alt="Retrato de Walter Ferguson, El Rey del Calipso limonense, junto a su guitarra"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className={`object-cover object-top transition-[filter] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      archivalMono
                        ? "grayscale contrast-125 brightness-95"
                        : "contrast-[1.06] saturate-[1.08] sepia-[0.08]"
                    }`}
                  />
                  {/* Tinte duotono cálido de papel de archivo */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 mix-blend-multiply transition-opacity duration-300 ${
                      archivalMono
                        ? "bg-sand/25 opacity-100"
                        : "bg-sand/10 opacity-60"
                    }`}
                  />

                  {/* Sello superior e interruptor de filtro de archivo */}
                  <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between gap-2">
                    <span className="font-display rounded bg-cream px-2.5 py-0.5 text-sm text-ink shadow-xs">
                      1919 – 2023 · Cahuita
                    </span>

                    <button
                      type="button"
                      onClick={() => setArchivalMono((prev) => !prev)}
                      aria-pressed={archivalMono}
                      className="cursor-pointer rounded-full bg-ink/85 px-3 py-1 text-[11px] font-semibold tracking-wider text-cream uppercase ring-1 ring-cream/25 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none [touch-action:manipulation] active:scale-[0.96] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink"
                    >
                      {archivalMono ? "Filtro: Archivo B&N" : "Filtro: Cálido"}
                    </button>
                  </div>
                </figure>

                {/* Tarjeta flotante de archivo (inspirada en Chronology.tsx y Referencia 2) */}
                <div className="relative z-10 -mt-10 ml-auto max-w-[270px] rounded-xl bg-cream p-4 text-ink shadow-md sm:-mt-14 sm:mr-3 sm:max-w-[290px] sm:p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xs tracking-wider text-ember uppercase">
                      Casete C-60 · Porche de Cahuita
                    </span>
                    <PlusIcon className="size-3.5 text-ink" />
                  </div>
                  <p className="mt-2 text-xs leading-snug font-medium text-ink/85 sm:text-sm">
                    Grabaciones caseras vendidas de mano en mano que hoy son
                    patrimonio sonoro del Caribe centroamericano.
                  </p>
                </div>
              </div>

              {/* Historia y monumento tipográfico para la cita */}
              <div>
                <h3
                  id="ferguson-title"
                  className="font-display isolate text-4xl text-balance sm:text-6xl md:text-7xl"
                >
                  El Rey del Calipso:{" "}
                  <Highlight color="text-ember">Walter Ferguson</Highlight>
                </h3>
                <p className="mt-3 text-xs font-bold tracking-[0.14em] text-sand uppercase sm:text-sm">
                  Mr. Gavitt · La voz eterna de Cahuita · Leyenda cultural
                </p>

                <p className="mt-5 max-w-[50ch] text-sm leading-relaxed text-pretty text-cream/85 sm:text-base">
                  Walter Ferguson no buscó la fama; la fama lo encontró a él en
                  su porche en Cahuita. Durante décadas, grabó sus composiciones
                  en casetes caseros, vendiéndolos a los turistas que pasaban.
                  Sus canciones no son solo música: son crónicas humorísticas y
                  críticas de la vida caribeña, cantadas en un inglés criollo
                  auténtico.
                </p>

                {/* Cita rediseñada como pieza tipográfica monumental (Cero border-l-4 AI-slop) */}
                <figure className="relative isolate mt-8 border-t border-cream/15 pt-7 sm:mt-10 sm:pt-9">
                  <ChalkStrokes className="pointer-events-none absolute top-4 right-0 -z-10 h-24 w-64 text-sand/15 sm:h-28 sm:w-80" />

                  <div className="flex items-start gap-3 sm:gap-5">
                    <span
                      aria-hidden
                      className="font-display -mt-2 text-6xl leading-none text-ember select-none sm:text-8xl"
                    >
                      “
                    </span>
                    <div>
                      <blockquote className="font-display text-3xl leading-[0.95] text-balance text-cream sm:text-5xl md:text-6xl">
                        I no go nowhere, I stay{" "}
                        <Highlight color="text-sand">
                          right here in Cahuita.
                        </Highlight>
                      </blockquote>
                      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold tracking-wider text-cream/65 uppercase">
                        <span>Walter Gavitt Ferguson</span>
                        <span aria-hidden className="text-ember">
                          ·
                        </span>
                        <span>Inglés criollo limonense (Mekatelyu)</span>
                      </figcaption>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </section>
      </section>
    </MotionConfig>
  );
}
