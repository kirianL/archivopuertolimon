"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import "slot-text/style.css";
import { SlotText } from "slot-text/react";
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
import imgFerguson from "@/public/Limón - images/walter-ferguson.jpg";
import imgTapeVol1 from "@/public/Limón - images/ferguson-tape-vol1.jpg";
import imgTapeVol2 from "@/public/Limón - images/ferguson-tape-vol2.jpg";
import imgPatty from "@/public/Limón - images/patty.jpg";
import imgCalypsonian from "@/public/Limón - images/Parade/Musicos y cantantes/539902822_754962860647126_9178661086593066020_n.jpg";
import imgMaracas from "@/public/Limón - images/Parade/Musicos y cantantes/540004486_754962117313867_1346397361303001633_n.jpg";
import imgComparsaFeather from "@/public/Limón - images/Parade/Trajes/540455199_759706376839441_6626957489670622357_n.jpg";
import imgGalaCrown from "@/public/Limón - images/Parade/Trajes/540589295_759705376839541_8886161950268267501_n.jpg";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type CarnivalPillar = {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  detail: string;
  caption: string;
  credit: string;
  dotClass: string;
  accentBarClass: string;
  image: StaticImageData;
  secondaryImage: StaticImageData;
  alt: string;
  secondaryAlt: string;
  filterClass: string;
  tintClass: string;
};

const carnivalPillars: readonly CarnivalPillar[] = [
  {
    id: "comparsas",
    number: "01",
    shortLabel: "Comparsas y desfiles",
    title: "Comparsas y desfiles",
    detail:
      "Tambores, penachos y coreografías que toman las avenidas del puerto cada octubre.",
    caption:
      "Recorrido principal del Carnaval alrededor del Día de las Culturas.",
    credit: "Foto: Xavier Sandí Castillo",
    dotClass: "bg-moss",
    accentBarClass: "bg-moss",
    image: imgCarnaval,
    secondaryImage: imgComparsaFeather,
    alt: "Sonrisa y traje tradicional durante el desfile del Carnaval de Limón",
    secondaryAlt:
      "Integrante de comparsa con penacho de plumas y bastón ceremonial",
    filterClass: "contrast-[1.08] saturate-[1.14] sepia-[0.06]",
    tintClass: "bg-sand/10 mix-blend-multiply",
  },
  {
    id: "musica",
    number: "02",
    shortLabel: "Música en vivo",
    title: "Música en vivo (calipso, reggae, soca)",
    detail:
      "Tarimas abiertas y esquinas donde el bajo caribeño y las maracas marcan el paso.",
    caption:
      "Calipseros y percusión en vivo durante las jornadas culturales del puerto.",
    credit: "Foto: Xavier Sandí Castillo",
    dotClass: "bg-sky",
    accentBarClass: "bg-sky",
    image: imgCalypsonian,
    secondaryImage: imgMaracas,
    alt: "Calipsero limonense cantando con guitarra en vivo",
    secondaryAlt: "Músico tocando maracas en tarima durante el carnaval",
    filterClass: "grayscale contrast-125 brightness-95",
    tintClass: "bg-sky/15 mix-blend-multiply",
  },
  {
    id: "baile",
    number: "03",
    shortLabel: "Baile, color y tradición",
    title: "Baile, color y tradición",
    detail:
      "Vestuarios de gala, turbantes y herencia afrocaribeña transmitida entre generaciones.",
    caption:
      "Indumentaria tradicional y coronas artesanales en las calles de Limón.",
    credit: "Foto: Xavier Sandí Castillo",
    dotClass: "bg-ember",
    accentBarClass: "bg-ember",
    image: imgGalaCrown,
    secondaryImage: imgCarnaval,
    alt: "Joven con corona artesanal y vestido tradicional en el desfile",
    secondaryAlt: "Vestimenta colorida en las calles de Puerto Limón",
    filterClass: "contrast-[1.1] saturate-[1.08] sepia-[0.12]",
    tintClass: "bg-ember/10 mix-blend-multiply",
  },
  {
    id: "gastronomia",
    number: "04",
    shortLabel: "Gastronomía local",
    title: "Gastronomía local",
    detail:
      "Patty recién horneado con chile panameño, plantain tart, rice & beans y agua de sapo.",
    caption:
      "Sabores afrocaribeños que acompañan cada esquina de la fiesta limonense.",
    credit: "Archivo gastronómico de Limón",
    dotClass: "bg-sand",
    accentBarClass: "bg-sand",
    image: imgPatty,
    secondaryImage: imgExpresion,
    alt: "Patty limonense recién horneado junto a chiles panameños",
    secondaryAlt: "Ambiente festivo en las calles del centro de Limón",
    filterClass: "contrast-[1.12] saturate-[1.15]",
    tintClass: "bg-sand/15 mix-blend-multiply",
  },
] as const;

type TapeAlbum = {
  id: string;
  volNumber: string;
  volLabel: string;
  description: string;
  format: string;
  cover: StaticImageData;
  alt: string;
  accentClass: string;
};

const fergusonAlbums: readonly TapeAlbum[] = [
  {
    id: "vol-1",
    volNumber: "1",
    volLabel: "Vol. 1",
    description:
      "Primer rescate de las cintas caseras que Mr. Gavitt grababa con guitarra acústica desde su porche.",
    format: "Casete C-60 grabado en Cahuita",
    cover: imgTapeVol1,
    alt: "Portada del álbum Walter Gavitt Ferguson — King of Calypso Limonense, The Legendary Tape Recordings Vol. 1",
    accentClass: "bg-ember",
  },
  {
    id: "vol-2",
    volNumber: "2",
    volLabel: "Vol. 2",
    description:
      "Segunda entrega de crónicas humorísticas y cotidianas del Caribe sur preservadas de sus casetes.",
    format: "Archivo sonoro de cintas originales",
    cover: imgTapeVol2,
    alt: "Portada del álbum Walter Gavitt Ferguson — King of Calypso Limonense, The Legendary Tape Recordings Vol. 2",
    accentClass: "bg-sky",
  },
] as const;

export default function Culture() {
  const shouldReduceMotion = useReducedMotion();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);

  const activePillar = carnivalPillars[activePillarIndex];
  const activeAlbum = fergusonAlbums[activeAlbumIndex];

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
            <div className="grid gap-6 border-b border-cream/20 pb-10 sm:gap-8 sm:pb-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-14 lg:pb-20">
              <div>
                <h2
                  id="culture-title"
                  className="font-display isolate text-5xl text-balance sm:text-6xl md:text-8xl"
                >
                  Cultura y <Highlight color="text-sand">vida local</Highlight>
                </h2>
              </div>

              <div className="relative isolate">
                <ChalkStrokes className="pointer-events-none absolute -top-4 -left-2 -z-10 h-16 w-48 text-sand/20 sm:-top-6 sm:-left-4 sm:h-24 sm:w-64" />
                <p className="font-display text-3xl text-sand sm:text-4xl md:text-5xl">
                  “Limón no se resume: se vive.”
                </p>
                <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-pretty text-cream/90 sm:mt-4 sm:text-base">
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
            <div className="mt-10 grid items-center gap-8 sm:mt-12 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
              {/* Collage mobile-first */}
              <figure className="w-full">
                <div className="relative isolate grid grid-cols-2 gap-2.5 sm:grid-cols-[1.22fr_1fr] sm:gap-3.5">
                  <BrushStroke className="pointer-events-none absolute -top-4 left-[6%] -z-10 h-12 w-[48%] rotate-[-4deg] text-sand sm:-top-5 sm:h-14" />
                  <BrushStroke className="pointer-events-none absolute -bottom-4 left-[10%] -z-10 h-12 w-[44%] rotate-[-7deg] text-moss sm:-bottom-5 sm:h-14" />
                  <BrushStroke className="pointer-events-none absolute top-[32%] -right-4 -z-10 hidden h-12 w-[34%] rotate-[6deg] text-sky/80 sm:block" />

                  {/* Foto 1: Protagonista */}
                  <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:col-span-1 sm:mt-6 sm:aspect-[3/4]">
                    <Image
                      src={imgExpresion}
                      alt="Joven música con platillos en las calles de Puerto Limón"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 52vw, 30vw"
                      className="object-cover contrast-[1.08] saturate-[1.12] sepia-[0.08]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-sand/10 mix-blend-multiply"
                    />
                  </div>

                  {/* Fotos 2 y 3 */}
                  <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:col-span-1 sm:grid-cols-1 sm:gap-3.5">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset">
                      <Image
                        src={imgCalypsonian}
                        alt="Calipsero limonense interpretando con su guitarra"
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 45vw, 24vw"
                        className="object-cover grayscale contrast-125 brightness-95"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-sand/20 mix-blend-multiply"
                      />
                    </div>

                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:w-[88%]">
                      <Image
                        src={imgMaracas}
                        alt="Percusionista con maracas en celebración comunitaria"
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 45vw, 20vw"
                        className="object-cover contrast-[1.1] saturate-[1.15] sepia-[0.1]"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-ink/15 mix-blend-multiply"
                      />
                    </div>
                  </div>
                </div>

                <figcaption className="mt-3.5 flex items-center justify-between border-t border-cream/20 pt-2.5 text-xs text-cream/75">
                  <span>Calipso, reggae y expresión de calle</span>
                  <span>Foto: Xavier Sandí Castillo</span>
                </figcaption>
              </figure>

              {/* Columna editorial + Tarjeta póster (sin subtítulo encima de la frase) */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-display isolate text-4xl text-balance sm:text-5xl md:text-6xl">
                    Ritmo, música y{" "}
                    <Highlight color="text-moss">expresión cultural</Highlight>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-cream/90 sm:mt-4 sm:text-base">
                    La música es una extensión del carácter limonense. El
                    calipso, el reggae y otros ritmos caribeños acompañan
                    celebraciones, reuniones familiares y actividades
                    comunitarias.
                  </p>
                </div>

                <div className="relative isolate overflow-hidden rounded-2xl bg-moss px-5 py-6 text-cream ring-1 ring-white/15 ring-inset sm:px-8 sm:py-8">
                  <HalfRing
                    side="left"
                    className="pointer-events-none absolute top-1/2 -left-14 -z-10 h-36 -translate-y-1/2 text-ink/20 sm:-left-10 sm:h-44"
                  />
                  <HalfRing
                    side="right"
                    className="pointer-events-none absolute top-1/2 -right-14 -z-10 h-36 -translate-y-1/2 text-ink/20 sm:-right-10 sm:h-44"
                  />

                  <div className="flex justify-end text-ink">
                    <PlusIcon className="size-3.5 text-ink sm:size-4" />
                  </div>

                  <blockquote className="mt-2 text-center sm:mt-3">
                    <p className="font-display mx-auto max-w-[18ch] text-2xl leading-[0.96] text-balance text-cream sm:text-4xl">
                      “En Limón, la música no se programa: simplemente sucede.”
                    </p>
                  </blockquote>

                  <div className="mt-5 flex justify-center sm:mt-6">
                    <Bay className="h-5 w-12 text-ink/35 sm:h-6 sm:w-14" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            BANDA 2: CARNAVAL DE LIMÓN (ALTURA ESTRICTAMENTE BLOQUEADA + SLOTTEXT)
           ===================================================================== */}
        <div className="bg-cream py-14 text-ink md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
              <div>
                <h3 className="font-display isolate text-4xl text-balance sm:text-6xl md:text-7xl">
                  Carnaval de Limón:{" "}
                  <Highlight color="text-ember">orgullo que se baila</Highlight>
                </h3>
                <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-pretty text-ink/80 sm:mt-4 sm:text-base">
                  Celebrado en octubre alrededor del Día de las Culturas, es la
                  mayor expresión cultural de la provincia. El carnaval no es
                  solo una fiesta: es memoria, identidad y resistencia cultural.
                </p>

                {/* Panel de lectura con altura natural bloqueada por CSS Grid (sin recortar texto ni mover el layout) */}
                <div
                  aria-live="polite"
                  className="mt-6 border-t border-ink/15 pt-5 sm:mt-8 sm:pt-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative isolate shrink-0 pr-1">
                      <BrushStroke className="pointer-events-none absolute top-1/2 -left-2 -z-10 h-9 w-16 -translate-y-1/2 rotate-[-6deg] text-sand sm:h-10 sm:w-20" />
                      <span className="font-display block text-4xl text-ink sm:text-5xl">
                        <SlotText
                          text={activePillar.number}
                          options={{ rollBy: "character", duration: 260 }}
                        />
                      </span>
                    </div>

                    <div className="grid flex-1">
                      {/* Reservadores invisibles en la misma celda del grid para fijar el alto al pilar más largo sin overflow-hidden */}
                      {carnivalPillars.map((pillar) => (
                        <div
                          key={pillar.id}
                          aria-hidden
                          className="pointer-events-none invisible col-start-1 row-start-1 select-none"
                        >
                          <p className="font-display text-2xl leading-[1.08] sm:text-3xl">
                            {pillar.title}
                          </p>
                          <p className="mt-2 max-w-[44ch] text-xs leading-relaxed sm:text-sm">
                            {pillar.detail}
                          </p>
                        </div>
                      ))}

                      {/* Contenido activo visible en la misma celda */}
                      <div className="col-start-1 row-start-1">
                        <p className="font-display slot-text-multiline text-2xl leading-[0.98] text-ink sm:text-3xl">
                          <SlotText
                            text={activePillar.title}
                            options={{
                              rollBy: "word",
                              duration: 300,
                              stagger: 10,
                            }}
                          />
                        </p>
                        <div className="slot-text-multiline mt-2 max-w-[44ch] text-xs leading-relaxed text-pretty text-ink/75 sm:text-sm">
                          <SlotText
                            text={activePillar.detail}
                            options={{
                              rollBy: "word",
                              duration: 320,
                              stagger: 10,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Escenario fotográfico */}
              <figure className="relative isolate w-full">
                <BrushStroke className="pointer-events-none absolute -top-4 right-[6%] -z-10 h-12 w-[42%] rotate-[3deg] text-sky sm:-top-5 sm:h-14" />
                <BrushStroke className="pointer-events-none absolute -bottom-4 left-[4%] -z-10 h-12 w-[38%] rotate-[-4deg] text-ember/75 sm:-bottom-5 sm:h-14" />

                <div className="grid grid-cols-[1.45fr_0.55fr] items-stretch gap-2 sm:gap-3.5">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink/10 ring-1 ring-black/10 ring-inset">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={activePillar.id}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                filter: "blur(3px)",
                                transform: "scale(1.03)",
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
                        transition={{ duration: 0.26, ease: EASE_OUT }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activePillar.image}
                          alt={activePillar.alt}
                          fill
                          placeholder="blur"
                          sizes="(max-width: 1024px) 65vw, 38vw"
                          className={`object-cover ${activePillar.filterClass}`}
                        />
                        <div
                          aria-hidden
                          className={`pointer-events-none absolute inset-0 ${activePillar.tintClass}`}
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent"
                        />
                      </motion.div>
                    </AnimatePresence>

                    <div className="pointer-events-none absolute inset-x-3 bottom-2.5 z-10 text-cream sm:inset-x-4 sm:bottom-3.5">
                      <div className="slot-text-multiline text-[11px] leading-snug font-medium text-cream/95 sm:text-xs">
                        <SlotText
                          text={activePillar.caption}
                          options={{
                            rollBy: "word",
                            duration: 280,
                            stagger: 8,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-ink/10 ring-1 ring-black/10 ring-inset">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={`${activePillar.id}-secondary`}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                filter: "blur(2px)",
                                transform: "scale(1.04)",
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
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.24, ease: EASE_OUT }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activePillar.secondaryImage}
                          alt={activePillar.secondaryAlt}
                          fill
                          placeholder="blur"
                          sizes="(max-width: 1024px) 30vw, 16vw"
                          className="object-cover grayscale contrast-125"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-sand/20 mix-blend-multiply"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <figcaption className="mt-3 flex h-5 items-center justify-between overflow-hidden text-xs text-ink/65">
                  <span>Octubre en Puerto Limón</span>
                  <span className="slot-text-multiline">
                    <SlotText
                      text={activePillar.credit}
                      options={{ rollBy: "word", duration: 240 }}
                    />
                  </span>
                </figcaption>
              </figure>
            </div>

            {/* Selector de los 4 pilares */}
            <div
              role="tablist"
              aria-label="Pilares del Carnaval de Limón"
              className="mt-8 grid grid-cols-2 border-t border-ink/15 sm:mt-12 lg:mt-14 lg:grid-cols-4"
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
                    className={`group relative isolate flex min-h-[108px] cursor-pointer flex-col justify-between border-b border-ink/15 p-3.5 text-left transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.98] focus:outline-none focus-visible:bg-ink/[0.06] sm:min-h-[124px] sm:p-5 odd:border-r odd:border-ink/15 lg:border-r lg:border-b-0 lg:last:border-r-0 ${
                      isSelected
                        ? "bg-ink/[0.045]"
                        : "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/[0.025]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        pillar.accentBarClass
                      } ${
                        isSelected
                          ? "scale-x-100"
                          : "scale-x-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-x-45"
                      }`}
                    />

                    <div className="flex items-start justify-between gap-2">
                      <div className="relative isolate pl-1.5">
                        <span
                          aria-hidden
                          className={`pointer-events-none absolute -top-0.5 left-0 -z-10 size-6 rounded-full transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:size-8 ${
                            pillar.dotClass
                          } ${isSelected ? "scale-110" : "opacity-80"}`}
                        />
                        <span className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                          {pillar.number}
                        </span>
                      </div>

                      <PlusIcon
                        className={`size-3.5 text-ink/55 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isSelected ? "rotate-45 text-ink" : ""
                        }`}
                      />
                    </div>

                    <p
                      className={`font-display mt-3 text-lg leading-[0.98] text-balance transition-colors duration-150 sm:text-2xl ${
                        isSelected
                          ? "text-ink"
                          : "text-ink/70 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-ink"
                      }`}
                    >
                      {pillar.shortLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================================
            BANDA 3: HOMENAJE A WALTER FERGUSON + THE LEGENDARY TAPE RECORDINGS
           ===================================================================== */}
        <section
          aria-labelledby="ferguson-title"
          className="relative overflow-hidden bg-ink py-14 text-cream md:py-28"
        >
          <HalfRing
            side="left"
            className="pointer-events-none absolute top-10 -right-16 h-48 text-sand/15 md:h-80"
          />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            {/* items-start en todas las resoluciones para que NUNCA se recentre ni mueva la columna izquierda */}
            <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              {/* Columna izquierda: Retrato limpio + Ficha con título ARRIBA y descripción ABAJO */}
              <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                <div className="relative isolate">
                  <BrushStroke className="pointer-events-none absolute -top-4 -left-4 -z-10 h-12 w-36 rotate-[-6deg] text-sand/80 sm:-top-5 sm:-left-5 sm:h-14 sm:w-44" />
                  <BrushStroke className="pointer-events-none absolute -right-3 -bottom-4 -z-10 h-12 w-36 rotate-[4deg] text-ember/80 sm:-right-4 sm:-bottom-5 sm:h-14 sm:w-44" />

                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black ring-1 ring-white/15 ring-inset sm:aspect-[4/5]">
                    <Image
                      src={imgFerguson}
                      alt="Walter Ferguson con sombrero cantando frente a un micrófono de estudio"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 88vw, 38vw"
                      className="object-cover object-center contrast-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent"
                    />
                  </div>
                </div>

                {/* Ficha en 3 columnas: Valor display ARRIBA y explicación ABAJO (como Architecture.tsx) */}
                <dl className="mt-6 grid grid-cols-3 border-t border-cream/15 pt-4">
                  <div className="pr-3">
                    <dt className="sr-only">Nombre artístico</dt>
                    <dd className="font-display text-xl text-cream sm:text-2xl">
                      Mr. Gavitt
                    </dd>
                    <p className="mt-1 text-[11px] leading-snug text-cream/55">
                      1919 – 2023
                    </p>
                  </div>
                  <div className="border-l border-cream/15 px-3">
                    <dt className="sr-only">Hogar</dt>
                    <dd className="font-display text-xl text-sand sm:text-2xl">
                      Cahuita
                    </dd>
                    <p className="mt-1 text-[11px] leading-snug text-cream/55">
                      Caribe sur
                    </p>
                  </div>
                  <div className="border-l border-cream/15 pl-3">
                    <dt className="sr-only">Lengua</dt>
                    <dd className="font-display text-xl text-cream sm:text-2xl">
                      Mekatelyu
                    </dd>
                    <p className="mt-1 text-[11px] leading-snug text-cream/55">
                      Inglés criollo
                    </p>
                  </div>
                </dl>
              </div>

              {/* Columna derecha: Narrativa + Cita + Discografía de casetes */}
              <div>
                <h3
                  id="ferguson-title"
                  className="font-display isolate text-4xl text-balance sm:text-6xl md:text-7xl"
                >
                  El Rey del Calipso:{" "}
                  <Highlight color="text-ember">Walter Ferguson</Highlight>
                </h3>
                <p className="font-display mt-2 text-2xl text-sand sm:mt-3 sm:text-3xl">
                  La voz eterna de Cahuita
                </p>

                <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-pretty text-cream/85 sm:mt-5 sm:text-base">
                  Walter Ferguson no buscó la fama; la fama lo encontró a él en
                  su porche en Cahuita. Durante décadas, grabó sus composiciones
                  en casetes caseros, vendiéndolos a los turistas que pasaban.
                  Sus canciones no son solo música: son crónicas humorísticas y
                  críticas de la vida caribeña, cantadas en un inglés criollo
                  auténtico.
                </p>

                {/* Cita monumental */}
                <blockquote className="relative isolate mt-7 border-t border-cream/15 pt-6 sm:mt-8 sm:pt-7">
                  <ChalkStrokes className="pointer-events-none absolute top-2 right-0 -z-10 h-20 w-52 text-sand/15 sm:h-24 sm:w-72" />

                  <div className="flex items-start gap-3 sm:gap-4">
                    <span
                      aria-hidden
                      className="font-display -mt-2 text-5xl leading-none text-ember select-none sm:text-7xl"
                    >
                      “
                    </span>
                    <p className="font-display text-3xl leading-[0.95] text-balance text-cream sm:text-5xl">
                      I no go nowhere, I stay{" "}
                      <Highlight color="text-sand">
                        right here in Cahuita.
                      </Highlight>
                    </p>
                  </div>
                </blockquote>

                {/* Escaparate minimalista de los 2 álbumes: CERO subtítulos arriba del título y CERO cambio de altura */}
                <div className="mt-7 border-t border-cream/15 pt-6 sm:mt-9 sm:pt-7">
                  <div className="grid items-start gap-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                    {/* Carátulas físicas interactivas (Vol. 1 y Vol. 2) */}
                    <div
                      role="tablist"
                      aria-label="Álbumes The Legendary Tape Recordings de Walter Ferguson"
                      className="flex items-center gap-3"
                    >
                      {fergusonAlbums.map((album, index) => {
                        const isSelected = index === activeAlbumIndex;
                        return (
                          <button
                            key={album.id}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setActiveAlbumIndex(index)}
                            className={`group relative aspect-square w-24 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-cream/10 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.96] focus:outline-none sm:w-28 ${
                              isSelected
                                ? "scale-100 opacity-100 ring-2 ring-sand"
                                : "scale-[0.94] opacity-55 ring-1 ring-white/15 ring-inset [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-85"
                            }`}
                          >
                            <Image
                              src={album.cover}
                              alt={album.alt}
                              fill
                              placeholder="blur"
                              sizes="112px"
                              className="object-cover"
                            />
                            <span
                              aria-hidden
                              className={`pointer-events-none absolute inset-x-0 bottom-0 h-1 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                                album.accentClass
                              } ${isSelected ? "scale-x-100" : "scale-x-0"}`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* Columna de texto del álbum sin overflow-hidden: usa CSS Grid para mantener altura constante y mostrar todo el contenido completo */}
                    <div aria-live="polite" className="min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="font-display text-2xl leading-[0.98] text-cream sm:text-3xl">
                          The Legendary Tape Recordings Vol.{" "}
                          <span className="inline-block w-[1.2ch] text-sand">
                            <SlotText
                              text={activeAlbum.volNumber}
                              options={{ rollBy: "character", duration: 240 }}
                            />
                          </span>
                        </h4>

                        <div className="flex shrink-0 items-center gap-1">
                          {fergusonAlbums.map((album, index) => {
                            const isSelected = index === activeAlbumIndex;
                            return (
                              <button
                                key={album.id}
                                type="button"
                                onClick={() => setActiveAlbumIndex(index)}
                                className={`cursor-pointer rounded px-2 py-0.5 font-display text-sm transition-colors duration-150 select-none active:scale-[0.96] ${
                                  isSelected
                                    ? "bg-cream text-ink"
                                    : "text-cream/55 [@media(hover:hover)_and_(pointer:fine)]:hover:text-cream"
                                }`}
                              >
                                {album.volLabel}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Grid stack para fijar el alto exacto al texto más largo sin tapar ni recortar nada */}
                      <div className="mt-2.5 grid">
                        {fergusonAlbums.map((album) => (
                          <div
                            key={album.id}
                            aria-hidden
                            className="pointer-events-none invisible col-start-1 row-start-1 select-none"
                          >
                            <p className="max-w-[46ch] text-xs leading-[1.55] sm:text-sm">
                              {album.description}
                            </p>
                            <p className="mt-2 text-[11px] leading-[1.5] font-semibold tracking-wider uppercase">
                              {album.format}
                            </p>
                          </div>
                        ))}

                        <div className="col-start-1 row-start-1">
                          <div className="slot-text-multiline max-w-[46ch] text-xs leading-relaxed text-pretty text-cream/85 sm:text-sm">
                            <SlotText
                              text={activeAlbum.description}
                              options={{
                                rollBy: "word",
                                duration: 280,
                                stagger: 8,
                              }}
                            />
                          </div>

                          <p className="slot-text-multiline mt-2 text-[11px] font-semibold tracking-wider text-sand uppercase">
                            <SlotText
                              text={activeAlbum.format}
                              options={{ rollBy: "word", duration: 240 }}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </MotionConfig>
  );
}
