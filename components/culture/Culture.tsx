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
  EditorialArrow,
  HalfRing,
  PlusIcon,
} from "@/components/ui/Shapes";
import imgExpresion from "@/public/Limón - images/ExpresionCultura.png";
import imgCarnaval from "@/public/Limón - images/Carnaval.png";
import imgFerguson from "@/public/Limón - images/walter-ferguson.jpg";
import imgTapeVol1 from "@/public/Limón - images/ferguson-tape-vol1.jpg";
import imgTapeVol2 from "@/public/Limón - images/ferguson-tape-vol2.jpg";
import imgKryolBook from "@/public/Limón - images/limon-kryol-alfabet.jpg";
import imgGloriaThompson from "@/public/Limón - images/gloria-thompson.png";
import imgEunaEditorial from "@/public/Limón - images/euna-editorial.jpg";
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
  spotifyUrl: string;
  cover: StaticImageData;
  alt: string;
  accentClass: string;
};

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 0 1 .207.857Zm1.224-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.452-1.492c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 0 1 .256 1.072Zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.543-1.79c3.533-1.072 9.404-.865 13.115 1.338a.935.935 0 0 1-.954 1.609Z" />
    </svg>
  );
}

/**
 * Patrón geométrico caribeño con simetría matemática (inspirado directamente en el tejido
 * de rombos y espigas concéntricas de las portadas de Walter Ferguson y los calados limonenses).
 */
function CaribbeanWeavePattern() {
  const quadrantLines = (
    <g
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="butt"
      fill="none"
    >
      <path d="M2.5 5.5 L5.5 2.5" />
      <path d="M2.5 11.5 L11.5 2.5" />
      <path d="M2.5 17.5 L17.5 2.5" />
      <path d="M2.5 23.5 L23.5 2.5" />
      <path d="M6.5 25.5 L25.5 6.5" />
      <path d="M12.5 25.5 L25.5 12.5" />
      <path d="M18.5 25.5 L25.5 18.5" />
    </g>
  );

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 size-full text-sand/[0.18]"
    >
      <defs>
        <pattern
          id="limon-caribbean-weave"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          {quadrantLines}
          <g transform="translate(56, 0) scale(-1, 1)">{quadrantLines}</g>
          <g transform="translate(0, 56) scale(1, -1)">{quadrantLines}</g>
          <g transform="translate(56, 56) scale(-1, -1)">{quadrantLines}</g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#limon-caribbean-weave)" />
    </svg>
  );
}

/**
 * Transición nativa y serena de bloque completo (sin dividir por palabra ni usar rebotes elásticos):
 * desliza suavemente 5px en vertical con opacidad dentro de su celda CSS Grid estática.
 */
function SlotRollText({
  text,
  durationSec = 0.2,
}: {
  text: string;
  durationSec?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className="grid items-start">
      <AnimatePresence initial={false}>
        <motion.span
          key={text}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 5 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
          transition={{ duration: durationSec, ease: EASE_OUT }}
          className="col-start-1 row-start-1 block will-change-[transform,opacity]"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const fergusonAlbums: readonly TapeAlbum[] = [
  {
    id: "vol-1",
    volNumber: "1",
    volLabel: "Vol. 1",
    description:
      "Primer rescate de las cintas caseras que Mr. Gavitt grababa con guitarra acústica desde su porche.",
    format: "Casete C-60 grabado en Cahuita",
    spotifyUrl: "https://open.spotify.com/intl-es/album/5NtaY6RCEG2LVZ24bWMMVN",
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
    spotifyUrl: "https://open.spotify.com/intl-es/album/3oBCndnAMseBcWHckOJGQu",
    cover: imgTapeVol2,
    alt: "Portada del álbum Walter Gavitt Ferguson — King of Calypso Limonense, The Legendary Tape Recordings Vol. 2",
    accentClass: "bg-sky",
  },
] as const;

type MekatelyuPhrase = {
  id: string;
  number: string;
  phrase: string;
  translation: string;
  context: string;
  dotClass: string;
  barClass: string;
};

const mekatelyuPhrases: readonly MekatelyuPhrase[] = [
  {
    id: "yah-man",
    number: "01",
    phrase: "Yah man",
    translation: "Sí / Claro / De acuerdo",
    context: "Expresa afirmación con actitud positiva",
    dotClass: "bg-moss",
    barClass: "bg-moss",
  },
  {
    id: "what-a-gwaan",
    number: "02",
    phrase: "What a gwaan?",
    translation: "¿Qué tal? / ¿Qué pasa?",
    context: "Saludo casual",
    dotClass: "bg-sky",
    barClass: "bg-sky",
  },
  {
    id: "everything-irie",
    number: "03",
    phrase: "Everything irie",
    translation: "Todo está bien / Todo en orden",
    context: "Estado de ánimo positivo",
    dotClass: "bg-ember",
    barClass: "bg-ember",
  },
  {
    id: "we-deh-yah",
    number: "04",
    phrase: "We deh yah",
    translation: "Aquí estamos / Todo bien",
    context: "Resiliencia y presencia",
    dotClass: "bg-sand",
    barClass: "bg-sand",
  },
  {
    id: "likkle-more",
    number: "05",
    phrase: "Likkle more",
    translation: "Nos vemos luego",
    context: "Despedida",
    dotClass: "bg-moss",
    barClass: "bg-moss",
  },
  {
    id: "big-up",
    number: "06",
    phrase: "Big up",
    translation: "Respeto / Reconocimiento",
    context: "Mostrar aprecio",
    dotClass: "bg-sky",
    barClass: "bg-sky",
  },
  {
    id: "respect",
    number: "07",
    phrase: "Respect",
    translation: "Gracias / Aprecio",
    context: "Valor esencial en la comunidad",
    dotClass: "bg-ember",
    barClass: "bg-ember",
  },
  {
    id: "tek-it-easy",
    number: "08",
    phrase: "Tek it easy",
    translation: "Tómelo con calma",
    context: "Filosofía de vida",
    dotClass: "bg-sand",
    barClass: "bg-sand",
  },
  {
    id: "mek-wi-go",
    number: "09",
    phrase: "Mek wi go",
    translation: "Vámonos",
    context: "Acción conjunta",
    dotClass: "bg-moss",
    barClass: "bg-moss",
  },
] as const;

export default function Culture() {
  const shouldReduceMotion = useReducedMotion();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  const activePillar = carnivalPillars[activePillarIndex];
  const activeAlbum = fergusonAlbums[activeAlbumIndex];
  const activePhrase = mekatelyuPhrases[activePhraseIndex];

  const selectPrevPhrase = () => {
    setActivePhraseIndex(
      (prev) => (prev - 1 + mekatelyuPhrases.length) % mekatelyuPhrases.length,
    );
  };

  const selectNextPhrase = () => {
    setActivePhraseIndex((prev) => (prev + 1) % mekatelyuPhrases.length);
  };

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
              {/* Collage mobile-first con alturas explícitas para evitar colapso en iOS Safari */}
              <figure className="w-full">
                <div className="relative isolate grid grid-cols-2 gap-2.5 sm:grid-cols-[1.22fr_1fr] sm:gap-3.5">
                  <BrushStroke className="pointer-events-none absolute -top-3.5 left-[6%] -z-10 h-11 w-[46%] rotate-[-4deg] text-sand sm:-top-5 sm:h-14" />
                  <BrushStroke className="pointer-events-none absolute -bottom-3.5 left-[10%] -z-10 h-11 w-[42%] rotate-[-7deg] text-moss sm:-bottom-5 sm:h-14" />
                  <BrushStroke className="pointer-events-none absolute top-[32%] -right-4 -z-10 hidden h-12 w-[34%] rotate-[6deg] text-sky/80 sm:block" />

                  {/* Foto 1: Protagonista */}
                  <div className="relative col-span-2 h-[220px] w-full overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:col-span-1 sm:mt-6 sm:h-[340px]">
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
                    <div className="relative h-[130px] w-full overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:h-[163px]">
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

                    <div className="relative h-[130px] w-full overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:h-[163px] sm:w-[88%]">
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

                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-cream/20 pt-2.5 text-xs text-cream/75">
                  <span>Calipso, reggae y expresión de calle</span>
                  <span className="shrink-0">Foto: Xavier Sandí Castillo</span>
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
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <div className="relative isolate w-11 shrink-0 pl-1.5 sm:w-14 sm:pl-2">
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute top-0.5 left-0 -z-10 size-7 rounded-full transition-colors duration-200 sm:size-9 ${activePillar.dotClass}`}
                      />
                      <span className="font-display block text-3xl leading-none tabular-nums text-ink sm:text-5xl">
                        <SlotRollText
                          text={activePillar.number}
                          durationSec={0.18}
                        />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Fila 1 bloqueada: Título del pilar */}
                      <div className="grid items-start">
                        {carnivalPillars.map((pillar) => (
                          <p
                            key={pillar.id}
                            aria-hidden
                            className="font-display pointer-events-none invisible col-start-1 row-start-1 text-2xl leading-[1.06] select-none sm:text-3xl"
                          >
                            {pillar.title}
                          </p>
                        ))}
                        <p className="font-display col-start-1 row-start-1 text-2xl leading-[1.06] text-ink sm:text-3xl">
                          <SlotRollText text={activePillar.title} />
                        </p>
                      </div>

                      {/* Fila 2 bloqueada: Descripción del pilar */}
                      <div className="mt-2 grid items-start">
                        {carnivalPillars.map((pillar) => (
                          <p
                            key={pillar.id}
                            aria-hidden
                            className="pointer-events-none invisible col-start-1 row-start-1 max-w-[44ch] text-xs leading-[1.45] select-none sm:text-sm"
                          >
                            {pillar.detail}
                          </p>
                        ))}
                        <p className="col-start-1 row-start-1 max-w-[44ch] text-xs leading-[1.45] text-pretty text-ink/75 sm:text-sm">
                          <SlotRollText text={activePillar.detail} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Escenario fotográfico con alturas explícitas en ambas celdas para que nunca colapse en iOS Safari */}
              <figure className="w-full">
                <div className="relative isolate">
                  <BrushStroke className="pointer-events-none absolute -top-3.5 right-[6%] -z-10 h-11 w-[40%] rotate-[3deg] text-sky sm:-top-5 sm:h-14" />
                  <BrushStroke className="pointer-events-none absolute -bottom-3.5 left-[4%] -z-10 h-11 w-[36%] rotate-[-4deg] text-ember/75 sm:-bottom-5 sm:h-14" />

                  <div className="grid grid-cols-[1.45fr_0.55fr] gap-2 sm:gap-3.5">
                    <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-ink/10 ring-1 ring-black/10 ring-inset sm:h-[290px] md:h-[330px]">
                      <AnimatePresence initial={false}>
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
                        <p className="text-[11px] leading-snug font-medium text-cream/95 sm:text-xs">
                          <SlotRollText text={activePillar.caption} />
                        </p>
                      </div>
                    </div>

                    <div className="relative h-[220px] w-full overflow-hidden rounded-xl bg-ink/10 ring-1 ring-black/10 ring-inset sm:h-[290px] md:h-[330px]">
                      <AnimatePresence initial={false}>
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
                </div>

                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-ink/15 pt-2.5 text-xs text-ink/65">
                  <span>Octubre en Puerto Limón</span>
                  <span className="shrink-0">
                    <SlotRollText text={activePillar.credit} />
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
                  <BrushStroke className="pointer-events-none absolute -top-3.5 -left-3 -z-10 h-11 w-32 rotate-[-6deg] text-sand/80 sm:-top-5 sm:-left-5 sm:h-14 sm:w-44" />
                  <BrushStroke className="pointer-events-none absolute -right-2.5 -bottom-3.5 -z-10 h-11 w-32 rotate-[4deg] text-ember/80 sm:-right-4 sm:-bottom-5 sm:h-14 sm:w-44" />

                  <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/15 ring-inset sm:h-[430px]">
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
                <dl className="mt-7 grid grid-cols-3 border-t border-cream/15 pt-4">
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
                    {/* Carátulas físicas interactivas (Vol. 1 y Vol. 2) + link directo a Spotify debajo de cada álbum */}
                    <div
                      role="tablist"
                      aria-label="Álbumes The Legendary Tape Recordings de Walter Ferguson"
                      className="flex items-start gap-3"
                    >
                      {fergusonAlbums.map((album, index) => {
                        const isSelected = index === activeAlbumIndex;
                        return (
                          <div
                            key={album.id}
                            className="flex w-24 shrink-0 flex-col gap-2 sm:w-28"
                          >
                              <button
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                onClick={() => setActiveAlbumIndex(index)}
                                className={`group relative h-24 w-24 cursor-pointer overflow-hidden rounded-xl bg-cream/10 transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.96] focus:outline-none sm:h-28 sm:w-28 ${
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

                            <a
                              href={album.spotifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Escuchar ${album.volLabel} de Walter Ferguson en Spotify`}
                              className={`group/spotify mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase transition-[transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.97] ${
                                isSelected
                                  ? "text-sand [@media(hover:hover)_and_(pointer:fine)]:hover:text-cream"
                                  : "text-cream/55 [@media(hover:hover)_and_(pointer:fine)]:hover:text-cream/90"
                              }`}
                            >
                              <SpotifyIcon className="size-3.5 shrink-0" />
                              <span>Spotify</span>
                              <EditorialArrow
                                direction="right"
                                className="h-2.5 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/spotify:translate-x-0.5"
                              />
                            </a>
                          </div>
                        );
                      })}
                    </div>

                    {/* Columna de texto del álbum sin overflow-hidden: usa CSS Grid para mantener altura constante y mostrar todo el contenido completo */}
                    <div aria-live="polite" className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:items-start sm:gap-3">
                        <h4 className="font-display text-2xl leading-[0.98] text-cream sm:text-3xl">
                          The Legendary Tape Recordings Vol.{" "}
                          <span className="inline-grid w-[1.2ch] text-sand tabular-nums">
                            <SlotRollText
                              text={activeAlbum.volNumber}
                              durationSec={0.18}
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
                          <p className="max-w-[46ch] text-xs leading-[1.55] text-pretty text-cream/85 sm:text-sm">
                            <SlotRollText text={activeAlbum.description} />
                          </p>

                          <p className="mt-2 text-[11px] leading-[1.5] font-semibold tracking-wider text-sand uppercase">
                            <SlotRollText text={activeAlbum.format} />
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

        {/* =====================================================================
            BANDA 4: SPEAK LIKE A LIMONENSE (MEKATELYU) + LIBRO KRYOL ALFABET
           ===================================================================== */}
        <section
          aria-labelledby="mekatelyu-title"
          className="overflow-hidden bg-cream py-14 text-ink md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            {/* Encabezado: Título primero y contexto debajo */}
            <div className="grid gap-6 border-b border-ink/15 pb-8 sm:pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-14">
              <div>
                <h3
                  id="mekatelyu-title"
                  className="font-display isolate text-5xl text-balance sm:text-6xl md:text-8xl"
                >
                  Speak like a{" "}
                  <Highlight color="text-moss">Limonense</Highlight>
                </h3>
              </div>

              <p className="max-w-[50ch] text-sm leading-relaxed text-pretty text-ink/80 sm:text-base">
                En Limón conviven el español y el inglés criollo limonense
                (mekatelyu). Este idioma sigue vivo en conversaciones
                cotidianas, reflejando cercanía y respeto.
              </p>
            </div>

            {/* Explorador de las 9 expresiones: Póster sonoro interactivo + Matriz arquitectónica 3x3 */}
            <div className="mt-8 grid items-start gap-8 sm:mt-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              {/* Póster interactivo con patrón geométrico caribeño ordenado (inspirado en las portadas de Walter Ferguson) y rieles fijos */}
              <div
                aria-live="polite"
                className="relative isolate overflow-hidden rounded-2xl bg-moss p-6 text-cream ring-1 ring-black/15 ring-inset sm:p-9"
              >
                {/* Patrón geométrico caribeño con simetría matemática (rombos y espigas concéntricas) */}
                <CaribbeanWeavePattern />
                {/* Velo suave para preservar contraste en el centro y dejar respirar el patrón en los bordes */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_35%_48%,rgba(91,97,40,0.82)_0%,rgba(91,97,40,0.45)_65%,rgba(29,29,27,0.35)_100%)]"
                />

                {/* Controles superiores minimalistas: Número activo + Navegación anterior/siguiente */}
                <div className="flex items-center justify-between">
                  <span className="font-display inline-flex items-baseline gap-1.5 text-2xl text-sand tabular-nums sm:text-3xl">
                    <SlotRollText
                      text={activePhrase.number}
                      durationSec={0.18}
                    />
                    <span className="text-cream/55">/ 09</span>
                  </span>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={selectPrevPhrase}
                      aria-label="Frase anterior en mekatelyu"
                      className="group/nav inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-ink/35 text-cream ring-1 ring-cream/20 transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.95] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/55"
                    >
                      <EditorialArrow
                        direction="left"
                        className="h-3 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/nav:-translate-x-0.5"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={selectNextPhrase}
                      aria-label="Siguiente frase en mekatelyu"
                      className="group/nav inline-flex size-8 cursor-pointer items-center justify-center rounded-full bg-ink/35 text-cream ring-1 ring-cream/20 transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.95] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/55"
                    >
                      <EditorialArrow
                        direction="right"
                        className="h-3 w-3.5 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/nav:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>

                {/* Escenario tipográfico con 3 rieles CSS Grid independientes y SlotRollText sin reflujo horizontal */}
                <div className="mt-6 sm:mt-8">
                  {/* Riel 1: Expresión en Mekatelyu */}
                  <div className="grid items-center">
                    {mekatelyuPhrases.map((item) => (
                      <p
                        key={item.id}
                        aria-hidden
                        className="font-display pointer-events-none invisible col-start-1 row-start-1 text-4xl leading-[1.06] select-none sm:text-5xl md:text-6xl"
                      >
                        {`“${item.phrase}”`}
                      </p>
                    ))}
                    <p className="font-display col-start-1 row-start-1 text-4xl leading-[1.06] text-cream sm:text-5xl md:text-6xl">
                      <SlotRollText text={`“${activePhrase.phrase}”`} />
                    </p>
                  </div>

                  {/* Riel 2: Traducción al español */}
                  <div className="mt-4 grid items-start border-t border-cream/15 pt-3.5 sm:mt-5 sm:pt-4">
                    {mekatelyuPhrases.map((item) => (
                      <p
                        key={item.id}
                        aria-hidden
                        className="font-display pointer-events-none invisible col-start-1 row-start-1 text-2xl leading-[1.06] select-none sm:text-3xl"
                      >
                        {item.translation}
                      </p>
                    ))}
                    <p className="font-display col-start-1 row-start-1 text-2xl leading-[1.06] text-sand sm:text-3xl">
                      <SlotRollText text={activePhrase.translation} />
                    </p>
                  </div>

                  {/* Riel 3: Uso / Contexto */}
                  <div className="mt-1.5 grid items-start">
                    {mekatelyuPhrases.map((item) => (
                      <p
                        key={item.id}
                        aria-hidden
                        className="pointer-events-none invisible col-start-1 row-start-1 text-sm leading-[1.4] select-none sm:text-base"
                      >
                        {item.context}
                      </p>
                    ))}
                    <p className="col-start-1 row-start-1 text-sm leading-[1.4] text-cream/85 sm:text-base">
                      <SlotRollText text={activePhrase.context} />
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-cream/20 pt-4 sm:mt-8">
                  <Bay className="h-5 w-12 text-sand/70 sm:h-6 sm:w-14" />
                  <span className="text-xs font-semibold tracking-wider text-cream/85 uppercase">
                    Inglés criollo limonense
                  </span>
                </div>
              </div>

              {/* Matriz arquitectónica (2 columnas en móvil para evitar textos apretados y 3x3 desde sm) */}
              <div
                role="tablist"
                aria-label="Expresiones en inglés criollo limonense"
                className="grid grid-cols-2 border-t border-l border-ink/15 sm:grid-cols-3"
              >
                {mekatelyuPhrases.map((item, index) => {
                  const isSelected = index === activePhraseIndex;
                  const isLastItem = index === mekatelyuPhrases.length - 1;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActivePhraseIndex(index)}
                      className={`group relative isolate flex min-h-[100px] cursor-pointer flex-col justify-between border-r border-b border-ink/15 p-3.5 text-left transition-[transform,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.98] focus:outline-none focus-visible:bg-ink/[0.06] sm:min-h-[112px] sm:p-4 ${
                        isLastItem ? "col-span-2 sm:col-span-1" : ""
                      } ${
                        isSelected
                          ? "bg-ink/[0.05]"
                          : "[@media(hover:hover)_and_(pointer:fine)]:hover:bg-ink/[0.025]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          item.barClass
                        } ${
                          isSelected
                            ? "scale-x-100"
                            : "scale-x-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-x-45"
                        }`}
                      />

                      <div className="flex items-start justify-between gap-1">
                        <div className="relative isolate pl-1">
                          <span
                            aria-hidden
                            className={`pointer-events-none absolute -top-0.5 left-0 -z-10 size-5 rounded-full transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:size-6 ${
                              item.dotClass
                            } ${isSelected ? "scale-110" : "opacity-75"}`}
                          />
                          <span className="font-display text-lg tracking-tight text-ink sm:text-2xl">
                            {item.number}
                          </span>
                        </div>

                        <PlusIcon
                          className={`size-3 text-ink/45 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                            isSelected ? "rotate-45 text-ink" : ""
                          }`}
                        />
                      </div>

                      <div className="mt-2.5 sm:mt-3">
                        <p
                          className={`font-display text-base leading-[0.98] transition-colors duration-150 sm:text-xl ${
                            isSelected
                              ? "text-ink"
                              : "text-ink/80 [@media(hover:hover)_and_(pointer:fine)]:group-hover:text-ink"
                          }`}
                        >
                          “{item.phrase}”
                        </p>
                        <p className="mt-1 line-clamp-1 text-[11px] leading-snug text-ink/60 sm:text-xs">
                          {item.translation}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* =================================================================
                PIEZA EDITORIAL DESTACADA: LIBRO "MEK WI RAYT WI LANGWICH" + GLORIA THOMPSON D.
               ================================================================= */}
            <div className="mt-14 border-t border-ink/15 pt-12 sm:mt-20 sm:pt-16">
              <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                {/* Collage editorial: Portada del libro + recorte en B/N granulado de su coeditora Gloria Thompson D. emergiendo de la línea base */}
                <figure className="mx-auto w-full max-w-[360px] sm:max-w-[440px]">
                  <div className="relative isolate pt-2">
                    <BrushStroke className="pointer-events-none absolute top-0 left-0 -z-10 h-12 w-36 rotate-[-6deg] text-moss/85 sm:h-14 sm:w-44" />
                    <BrushStroke className="pointer-events-none absolute top-[28%] right-2 -z-10 h-14 w-44 rotate-[6deg] text-sand/90 sm:h-16 sm:w-56" />
                    <ChalkStrokes className="pointer-events-none absolute right-0 bottom-8 -z-10 h-20 w-48 text-ink/15 sm:h-24 sm:w-60" />

                    {/* Portada física del libro anclada arriba a la izquierda */}
                    <div className="relative z-10 ml-1 h-[248px] w-[186px] -rotate-2 overflow-hidden rounded-xl bg-ink shadow-md ring-1 ring-black/15 ring-inset sm:ml-2 sm:h-[312px] sm:w-[234px]">
                      <Image
                        src={imgKryolBook}
                        alt="Portada del libro Mek Wi Rayt Wi Langwich: Limon Kryol Alfabet — Alfabeto ilustrado del criollo limonense, editado por René Zúñiga A. y Gloria Thompson D."
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 186px, 234px"
                        className="object-cover"
                      />
                      {/* Sutil pliegue de lomo de libro a la izquierda */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/25 via-white/10 to-transparent"
                      />
                    </div>

                    {/* Recorte transparente en B/N granulado de Gloria Thompson D. apoyado sobre la línea editorial inferior */}
                    <div className="relative z-20 -mt-20 ml-auto h-[176px] w-[240px] sm:-mt-28 sm:h-[220px] sm:w-[300px]">
                      <BrushStroke className="pointer-events-none absolute right-2 bottom-3 -z-10 h-12 w-44 rotate-[-4deg] text-ember/80 sm:h-14 sm:w-52" />
                      <Image
                        src={imgGloriaThompson}
                        alt="Gloria Thompson D., coeditora de Limon Kryol Alfabet, presentando la obra con micrófono en mano"
                        fill
                        sizes="(max-width: 640px) 240px, 300px"
                        className="object-contain object-bottom drop-shadow-[0_10px_18px_rgba(29,29,27,0.22)]"
                      />
                    </div>
                  </div>

                  <figcaption className="relative z-30 flex items-center justify-between gap-3 border-t border-ink/20 pt-2.5 text-xs text-ink/70">
                    <span>Gloria Thompson D. presentando la obra</span>
                    <span className="shrink-0 font-medium text-ink/85">
                      Coeditora de la edición
                    </span>
                  </figcaption>
                </figure>

                {/* Reseña editorial del libro (Título primero, subtítulo y detalles debajo) */}
                <div>
                  <h4 className="font-display isolate text-4xl text-balance text-ink sm:text-5xl md:text-6xl">
                    Mek Wi Rayt Wi Langwich:{" "}
                    <Highlight color="text-ember">
                      Limon Kryol Alfabet
                    </Highlight>
                  </h4>
                  <p className="font-display mt-2 text-2xl text-moss sm:mt-3 sm:text-3xl">
                    Alfabeto ilustrado del criollo limonense
                  </p>

                  <p className="mt-4 max-w-[54ch] text-sm leading-relaxed text-pretty text-ink/80 sm:mt-5 sm:text-base">
                    Transmitido durante generaciones desde la oralidad, el canto
                    y los porches familiares, el inglés criollo limonense cuenta
                    también con su propio registro escrito. Esta obra reúne la
                    fonética, la grafía y el imaginario cotidiano de la
                    provincia para que el mekatelyu se lea y se escriba con voz
                    propia.
                  </p>

                  {/* Ficha bibliográfica en 2 bloques: Editores en 2 líneas + Bloque EUNA con fotografía de la editorial integrada de fondo */}
                  <dl className="mt-7 grid grid-cols-1 items-stretch gap-4 border-t border-ink/15 pt-5 sm:grid-cols-[auto_1fr] sm:gap-0">
                    <div className="flex flex-col justify-between py-1 sm:pr-7">
                      <dt className="sr-only">Editores</dt>
                      <dd className="font-display text-xl leading-[1.04] text-ink sm:text-2xl">
                        <span className="block whitespace-nowrap">
                          René Zúñiga A. &amp;
                        </span>
                        <span className="block whitespace-nowrap">
                          Gloria Thompson D.
                        </span>
                      </dd>
                      <p className="mt-2 text-xs leading-snug text-ink/65">
                        Editores de la publicación
                      </p>
                    </div>

                    <div className="relative isolate flex min-h-[88px] flex-col justify-between overflow-hidden rounded-xl border-t border-ink/15 p-3.5 sm:rounded-l-none sm:rounded-r-xl sm:border-t-0 sm:border-l sm:py-2.5 sm:pr-4 sm:pl-6">
                      <Image
                        src={imgEunaEditorial}
                        alt=""
                        aria-hidden="true"
                        fill
                        placeholder="blur"
                        sizes="(max-width: 640px) 90vw, 380px"
                        className="pointer-events-none -z-20 object-cover object-[72%_center] opacity-[0.24] contrast-115 saturate-[0.85] mix-blend-multiply"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-cream via-cream/70 to-cream/10"
                      />

                      <div>
                        <dt className="sr-only">Sello editorial</dt>
                        <dd className="font-display text-xl leading-[1.04] text-ember sm:text-2xl">
                          EUNA — UNA
                        </dd>
                      </div>
                      <p className="mt-2 text-xs leading-snug font-medium text-ink/75">
                        Editorial Universidad Nacional
                      </p>
                    </div>
                  </dl>

                  <div className="mt-5">
                    <a
                      href="https://euna.una.ac.cr/index.php/EUNA/catalog/book/211"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Adquirir el libro Mek Wi Rayt Wi Langwich: Limon Kryol Alfabet en la Editorial Universidad Nacional (EUNA)"
                      className="group/book inline-flex items-center gap-2 text-xs font-bold tracking-wider text-ember uppercase transition-[transform,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
                    >
                      <span>Disponible en el catálogo de EUNA</span>
                      <EditorialArrow
                        direction="right"
                        className="h-3 w-3.5 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover/book:translate-x-0.5"
                      />
                    </a>
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
