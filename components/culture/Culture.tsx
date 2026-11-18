"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
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
import imgDomino from "@/public/Limón - images/patrimonio/partida-domino-manos-fichas.jpg";
import imgBigBoy from "@/public/Limón - images/BigBoy.png";
import imgBoxeo from "@/public/Limón - images/Boxeo.jpg";
import imgComunidad from "@/public/Limón - images/Comunidad-vidacotidiana.png";
import imgArteLimon from "@/public/Limón - images/arteLimon.png";
import imgPasajeCristal from "@/public/Limón - images/patrimonio/pasaje-cristal-pintores-limon.jpg";
import imgGaleriaPintura from "@/public/Limón - images/patrimonio/galeria-pintura-limon.jpg";
import imgTeatro from "@/public/Limón - images/teatro.png";
import imgDosAguas from "@/public/Limón - images/DosAguas.png";
import imgCenizaNegra from "@/public/Limón - images/CenizaNegra.png";
import imgVhsCaribe from "@/public/Limón - images/catalogo/vhs-caribe-2004.jpg";
import imgLibroPuertoLimon from "@/public/Limón - images/catalogo/libro-puerto-limon-1950.jpg";
import imgLibroCocori from "@/public/Limón - images/catalogo/libro-cocori-joaquin-gutierrez.jpg";
import imgLibroNegroCR from "@/public/Limón - images/catalogo/libro-el-negro-en-costa-rica.jpg";
import imgLibroLimonBlues from "@/public/Limón - images/catalogo/libro-limon-blues-rossi.jpg";
import imgFergusonPortrait from "@/public/Limón - images/a-Ferguson1.jpg";
import imgEsculturaGemelo from "@/public/Limón - images/patrimonio/esculturas-reciclaje-gemelo-ballestero.jpg";
import imgTurbantes from "@/public/Limón - images/patrimonio/artesania-turbantes-afrocaribenos.jpg";
import imgCocoTortuga from "@/public/Limón - images/patrimonio/artesania-coco-tortuga-limon.jpg";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type CarnivalPillar = {
  id: string;
  number: string;
  shortLabel: string;
  title: string;
  detail: string;
  caption: string;
  credit: string;
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
    credit: "Archivo cultural de Puerto Limón",
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
    credit: "Escena musical de Limón",
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
    credit: "Tradición afrocaribeña limonense",
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

type MediaShelfItem = {
  id: string;
  kind: "vhs" | "book";
  title: string;
  spineTitle: string;
  year: string;
  creator: string;
  roleLabel: string;
  code: string;
  synopsis: string;
  awards: readonly string[];
  image: StaticImageData;
  alt: string;
  spineBg: string;
  spineText: string;
  spineAccent: string;
  desktopHeightClass: string;
  desktopWidthClass: string;
  mobileHeightClass: string;
  mobileWidthClass: string;
};

const mediaShelfItems: readonly MediaShelfItem[] = [
  {
    id: "dos-aguas",
    kind: "vhs",
    title: "Dos Aguas",
    spineTitle: "DOS AGUAS",
    year: "2015",
    creator: "Patricia Velásquez",
    roleLabel: "Dirección",
    code: "VHS HI-FI",
    synopsis:
      "Un retrato de la fraternidad y el entorno, donde Limón no es solo paisaje, sino protagonista.",
    awards: [
      "Premio Centroamérica Concluye (Ícaro)",
      "Selección Oficial IFF Panamá",
    ],
    image: imgDosAguas,
    alt: "Portada de la película Dos Aguas (2015) de Patricia Velásquez",
    spineBg: "#1c2833",
    spineText: "#faf3d9",
    spineAccent: "#7a9bd1",
    desktopHeightClass: "h-72",
    desktopWidthClass: "w-11",
    mobileHeightClass: "h-36",
    mobileWidthClass: "w-8",
  },
  {
    id: "ceniza-negra",
    kind: "vhs",
    title: "Ceniza Negra",
    spineTitle: "CENIZA NEGRA",
    year: "2019",
    creator: "Sofía Quirós Úbeda",
    roleLabel: "Dirección",
    code: "CANNES VHS",
    synopsis:
      "Una mirada a la infancia y el duelo envuelta en la atmósfera sensorial del Caribe Sur.",
    awards: [
      "Nominada Cámara de Oro (Cannes)",
      "Mejor Película (Semana Crítica El Cairo)",
      "Representante Oscar 2021",
    ],
    image: imgCenizaNegra,
    alt: "Portada de la película Ceniza Negra (2019) de Sofía Quirós Úbeda",
    spineBg: "#1e2f52",
    spineText: "#faf3d9",
    spineAccent: "#dc5a32",
    desktopHeightClass: "h-72",
    desktopWidthClass: "w-11",
    mobileHeightClass: "h-36",
    mobileWidthClass: "w-8",
  },
  {
    id: "caribe-2004",
    kind: "vhs",
    title: "Caribe",
    spineTitle: "CARIBE",
    year: "2004",
    creator: "Esteban Ramírez",
    roleLabel: "Dirección",
    code: "35MM VHS",
    synopsis:
      "Drama ambiental y humano filmado en el litoral atlántico sobre la defensa del territorio frente a la exploración petrolera.",
    awards: [
      "Mejor Director (Festival de Trieste)",
      "Muestra Oficial Festival de Huelva",
    ],
    image: imgVhsCaribe,
    alt: "Portada de la película Caribe (2004) dirigida por Esteban Ramírez",
    spineBg: "#173026",
    spineText: "#faf3d9",
    spineAccent: "#d4ca6a",
    desktopHeightClass: "h-72",
    desktopWidthClass: "w-11",
    mobileHeightClass: "h-36",
    mobileWidthClass: "w-8",
  },
  {
    id: "puerto-limon-1950",
    kind: "book",
    title: "Puerto Limón",
    spineTitle: "PUERTO LIMÓN",
    year: "1950",
    creator: "Joaquín Gutiérrez Mangel",
    roleLabel: "Autor limonense",
    code: "NASCIMENTO",
    synopsis:
      "Novela fundacional del escritor nacido en Puerto Limón (1918) sobre la juventud de Silvano, el enclave bananero y la huelga de 1934.",
    awards: [
      "Edición original Nascimento (1950)",
      "Premio Nacional de Cultura Magón",
    ],
    image: imgLibroPuertoLimon,
    alt: "Portada de la edición original de Puerto Limón (1950) de Joaquín Gutiérrez",
    spineBg: "#b5673b",
    spineText: "#faf3d9",
    spineAccent: "#d4ca6a",
    desktopHeightClass: "h-68",
    desktopWidthClass: "w-11",
    mobileHeightClass: "h-34",
    mobileWidthClass: "w-8",
  },
  {
    id: "cocori-1947",
    kind: "book",
    title: "Cocorí",
    spineTitle: "COCORÍ",
    year: "1947",
    creator: "Joaquín Gutiérrez Mangel",
    roleLabel: "Autor limonense",
    code: "NOVELA",
    synopsis:
      "Obra nacida de los recuerdos de infancia costera de su autor en Limón, traducida a más de diez idiomas durante el siglo XX.",
    awards: [
      "Premio Rapa Nui (1947)",
      "Clásico de las letras limonenses",
    ],
    image: imgLibroCocori,
    alt: "Portada ilustrada del libro Cocorí de Joaquín Gutiérrez",
    spineBg: "#49692d",
    spineText: "#faf3d9",
    spineAccent: "#dc5a32",
    desktopHeightClass: "h-60",
    desktopWidthClass: "w-9",
    mobileHeightClass: "h-30",
    mobileWidthClass: "w-7",
  },
  {
    id: "el-negro-en-costa-rica",
    kind: "book",
    title: "El negro en Costa Rica",
    spineTitle: "EL NEGRO EN CR",
    year: "1972",
    creator: "Quince Duncan y Carlos Meléndez",
    roleLabel: "Autoría limonense",
    code: "ECR",
    synopsis:
      "Obra histórica y antológica indispensable para comprender las raíces antillanas, el ferrocarril, la prensa en inglés y la ciudadanía afrocostarricense.",
    awards: [
      "Editorial Costa Rica (1972)",
      "Doctorado Honoris Causa (Quince Duncan)",
    ],
    image: imgLibroNegroCR,
    alt: "Portada original de El negro en Costa Rica de Carlos Meléndez y Quince Duncan",
    spineBg: "#8dc2b9",
    spineText: "#191919",
    spineAccent: "#191919",
    desktopHeightClass: "h-64",
    desktopWidthClass: "w-10",
    mobileHeightClass: "h-32",
    mobileWidthClass: "w-8",
  },
  {
    id: "limon-blues",
    kind: "book",
    title: "Limón Blues",
    spineTitle: "LIMÓN BLUES",
    year: "2002",
    creator: "Anacristina Rossi",
    roleLabel: "Novela histórica",
    code: "ALFAGUARA",
    synopsis:
      "Reconstruye la vida de Orlandus Robinson en Puerto Limón entre 1904 y 1927, el Liberty Hall y el movimiento de Marcus Garvey.",
    awards: [
      "Premio Nacional Aquileo J. Echeverría (2002)",
      "Premio Latinoamericano José María Arguedas",
    ],
    image: imgLibroLimonBlues,
    alt: "Portada de Limón Blues de Anacristina Rossi",
    spineBg: "#2a7c62",
    spineText: "#faf3d9",
    spineAccent: "#d4ca6a",
    desktopHeightClass: "h-70",
    desktopWidthClass: "w-12",
    mobileHeightClass: "h-35",
    mobileWidthClass: "w-8",
  },
  {
    id: "limon-kryol-alfabet",
    kind: "book",
    title: "Limon Kryol Alfabet",
    spineTitle: "KRYOL ALFABET",
    year: "2018",
    creator: "Gloria Thompson D. y René Zúñiga A.",
    roleLabel: "Edición limonense",
    code: "EUNA",
    synopsis:
      "Alfabeto ilustrado del criollo limonense elaborado desde la comunidad para preservar la escritura, fonética y memoria oral del mekatelyu.",
    awards: [
      "Editorial Universidad Nacional (EUNA)",
      "Patrimonio lingüístico del Caribe",
    ],
    image: imgKryolBook,
    alt: "Portada de Mek Wi Rayt Wi Langwich: Limon Kryol Alfabet",
    spineBg: "#c4302b",
    spineText: "#faf3d9",
    spineAccent: "#faf3d9",
    desktopHeightClass: "h-64",
    desktopWidthClass: "w-10",
    mobileHeightClass: "h-32",
    mobileWidthClass: "w-7",
  },
] as const;

const radioStations = [
  {
    id: "radio-casino",
    freq: "98.3 FM",
    dialPercent: "28%",
    name: "Radio Casino",
    tagline: "La Reina del Caribe, fundada en 1948",
    description:
      "Emisora histórica fundada en 1948, pilar de la comunicación y difusión cultural en la provincia.",
    streamUrl: "https://host.rowrigo.com/listen/radiocasino/radiocasino",
    externalUrl: "https://radiocasino.net/",
  },
  {
    id: "radio-bahia",
    freq: "107.9 FM",
    dialPercent: "76%",
    name: "Radio Bahía Limón",
    tagline: "Voz cotidiana de la comunidad",
    description:
      "La voz cotidiana de la comunidad, espacio de opinión y compañía indispensable.",
    streamUrl: "https://s44.myradiostream.com/8368/;",
    externalUrl: "https://onlineradiobox.com/cr/bahialimon/",
  },
] as const;

const keyDates = [
  {
    date: "7 de mayo",
    title: "Día Nacional del Calipso Limonense",
    note: "Declarado Patrimonio Cultural Inmaterial el 12 de diciembre de 2012 (La Gaceta N° 240); homenaje a los calypsonians como cronistas en inglés criollo.",
    image: imgFergusonPortrait,
    alt: "Walter Ferguson interpretando calipso limonense",
    tiltClass: "-rotate-3",
    accentClass: "bg-sand text-ink",
  },
  {
    date: "31 de agosto",
    title: "Día de la Persona Negra y la Cultura Afrocostarricense",
    note: "Celebrado con el Grand Parade de Gala en conmemoración de la Primera Convención Internacional sobre la Situación de los Negros en Nueva York.",
    image: imgGalaCrown,
    alt: "Gala y trajes tradicionales afrocostarricenses en Limón",
    tiltClass: "rotate-2",
    accentClass: "bg-ember text-cream",
  },
  {
    date: "Octubre",
    title: "Carnaval de Limón e Isla Quiribrí",
    note: "Mes de comparsas frente al mar y de memoria frente a la Isla Quiribrí (Uvita), declarada Monumento Nacional el 26 de setiembre de 1985 (La Gaceta N° 183).",
    image: imgCarnaval,
    alt: "Comparsas en el Carnaval de Puerto Limón",
    tiltClass: "-rotate-2",
    accentClass: "bg-moss text-cream",
  },
] as const;

export default function Culture() {
  const shouldReduceMotion = useReducedMotion();
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
  const [creoleMode, setCreoleMode] = useState<"mekatelyu" | "english">(
    "mekatelyu",
  );
  const [activeStampQuote, setActiveStampQuote] = useState<0 | 1>(0);
  const [shelfFilter, setShelfFilter] = useState<"all" | "vhs" | "book">("all");
  const [activeShelfId, setActiveShelfId] = useState<string>("dos-aguas");
  const [activeRadioIndex, setActiveRadioIndex] = useState(0);
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [isRadioLoading, setIsRadioLoading] = useState(false);
  const radioAudioRef = useRef<HTMLAudioElement | null>(null);

  const activePillar = carnivalPillars[activePillarIndex];
  const activeAlbum = fergusonAlbums[activeAlbumIndex];
  const visibleShelfItems =
    shelfFilter === "all"
      ? mediaShelfItems
      : mediaShelfItems.filter((item) => item.kind === shelfFilter);
  const activeShelfItem =
    visibleShelfItems.find((item) => item.id === activeShelfId) ??
    visibleShelfItems[0];
  const activeShelfIndex = Math.max(
    0,
    visibleShelfItems.findIndex((item) => item.id === activeShelfItem.id),
  );
  const activeRadio = radioStations[activeRadioIndex];

  function stepShelf(delta: -1 | 1) {
    const len = visibleShelfItems.length;
    const next = visibleShelfItems[(activeShelfIndex + delta + len) % len];
    setActiveShelfId(next.id);
  }

  function selectShelfFilter(nextFilter: "all" | "vhs" | "book") {
    setShelfFilter(nextFilter);
    const nextList =
      nextFilter === "all"
        ? mediaShelfItems
        : mediaShelfItems.filter((item) => item.kind === nextFilter);
    if (!nextList.some((item) => item.id === activeShelfId)) {
      setActiveShelfId(nextList[0].id);
    }
  }


  useEffect(() => {
    const audio = radioAudioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
      }
    };
  }, []);

  const playStation = async (index: number) => {
    const station = radioStations[index];
    const audio = radioAudioRef.current;
    if (!audio) return;

    setIsRadioLoading(true);
    try {
      audio.src = station.streamUrl;
      audio.load();
      await audio.play();
      setIsRadioPlaying(true);
    } catch {
      setIsRadioPlaying(false);
    } finally {
      setIsRadioLoading(false);
    }
  };

  const toggleRadioPlayback = () => {
    const audio = radioAudioRef.current;
    if (!audio) return;

    if (isRadioPlaying) {
      audio.pause();
      setIsRadioPlaying(false);
      setIsRadioLoading(false);
    } else {
      void playStation(activeRadioIndex);
    }
  };

  const selectRadioStation = (index: number) => {
    setActiveRadioIndex(index);
    if (isRadioPlaying || isRadioLoading) {
      void playStation(index);
    }
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
                  className="font-hero isolate text-4xl leading-[1.08] font-normal text-balance sm:text-5xl md:text-7xl"
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
                  <div className="relative col-span-2 h-[13.75rem] w-full overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:col-span-1 sm:mt-6 sm:h-[21.25rem]">
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
                    <div className="relative h-[8.125rem] w-full overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:h-[10.1875rem]">
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

                    <div className="relative h-[8.125rem] w-full overflow-hidden rounded-xl bg-ink/30 ring-1 ring-white/15 ring-inset sm:h-[10.1875rem] sm:w-[88%]">
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
                  <span className="shrink-0">Puerto Limón</span>
                </figcaption>
              </figure>

              {/* Columna editorial + Tarjeta póster (sin subtítulo encima de la frase) */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-hero isolate text-3xl leading-[1.08] font-normal text-balance sm:text-4xl md:text-5xl">
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
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-20 size-full object-cover"
                  >
                    <source src="/video-cultura.mp4" type="video/mp4" />
                  </video>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-moss/65"
                  />
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
                <h3 className="font-hero isolate text-3xl leading-[1.08] font-normal text-balance sm:text-5xl md:text-6xl">
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
                    <div className="w-11 shrink-0 sm:w-14">
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
                    <div className="relative h-[13.75rem] w-full overflow-hidden rounded-xl bg-ink/10 ring-1 ring-black/10 ring-inset sm:h-[18.125rem] md:h-[20.625rem]">
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

                    <div className="relative h-[13.75rem] w-full overflow-hidden rounded-xl bg-ink/10 ring-1 ring-black/10 ring-inset sm:h-[18.125rem] md:h-[20.625rem]">
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
                      <div>
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

                  <div className="relative h-[22.5rem] w-full overflow-hidden rounded-2xl bg-black ring-1 ring-white/15 ring-inset sm:h-[26.875rem]">
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
                  className="font-hero isolate text-3xl leading-[1.08] font-normal text-balance sm:text-5xl md:text-6xl"
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
            {/* Encabezado limpio */}
            <div className="border-b border-ink/15 pb-6 sm:pb-10">
              <h3
                id="mekatelyu-title"
                className="font-hero isolate text-4xl leading-[1.08] font-normal text-balance sm:text-5xl md:text-7xl"
              >
                Speak like a{" "}
                <Highlight color="text-moss">Limonense</Highlight>
              </h3>
            </div>

            {/* Dato curioso compacto */}
            <div className="mt-8 grid items-center gap-8 sm:mt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              {/* Espécimen fonético interactivo */}
              <div
                aria-live="polite"
                className="rounded-2xl bg-ink p-6 text-cream sm:p-9"
              >
                <div className="flex items-center justify-end">
                  <div
                    role="group"
                    aria-label="Comparar pronunciación"
                    className="inline-flex rounded-full bg-cream/10 p-1 text-xs font-semibold"
                  >
                    <button
                      type="button"
                      onClick={() => setCreoleMode("mekatelyu")}
                      aria-pressed={creoleMode === "mekatelyu"}
                      className={`cursor-pointer rounded-full px-3 py-1 transition-colors duration-150 ${
                        creoleMode === "mekatelyu"
                          ? "bg-cream text-ink"
                          : "text-cream/70 hover:text-cream"
                      }`}
                    >
                      Mekatelyu
                    </button>
                    <button
                      type="button"
                      onClick={() => setCreoleMode("english")}
                      aria-pressed={creoleMode === "english"}
                      className={`cursor-pointer rounded-full px-3 py-1 transition-colors duration-150 ${
                        creoleMode === "english"
                          ? "bg-cream text-ink"
                          : "text-cream/70 hover:text-cream"
                      }`}
                    >
                      Inglés
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid items-center">
                  <p
                    aria-hidden
                    className="font-display pointer-events-none invisible col-start-1 row-start-1 text-4xl leading-[0.98] select-none sm:text-6xl"
                  >
                    “Make I tell you”
                  </p>
                  <p className="font-display col-start-1 row-start-1 text-4xl leading-[0.98] text-cream sm:text-6xl">
                    <SlotRollText
                      text={
                        creoleMode === "mekatelyu"
                          ? "“Mek a tel yu”"
                          : "“Make I tell you”"
                      }
                    />
                  </p>
                </div>

                <p className="mt-2 text-sm font-medium text-sand sm:text-base">
                  Déjame decirte.
                </p>

                <div className="mt-5 border-t border-cream/15 pt-4 font-display text-lg text-cream/85 sm:text-xl">
                  <SlotRollText
                    text={
                      creoleMode === "mekatelyu"
                        ? "Tree ting / Dis / Dat"
                        : "Three things / This / That"
                    }
                  />
                </div>
              </div>

              {/* Dato directo sin relleno */}
              <div>
                <p className="font-display text-2xl leading-[1.05] text-ink sm:text-4xl">
                  De «Make I tell you» nació la palabra mekatelyu.
                </p>
                <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-pretty text-ink/75 sm:text-base">
                  Llegó con trabajadores jamaicanos del ferrocarril en el siglo
                  XIX y mezcla vocabulario inglés con gramática de África
                  occidental.
                </p>
              </div>
            </div>

            {/* =================================================================
                PIEZA EDITORIAL DESTACADA: LIBRO "MEK WI RAYT WI LANGWICH" + GLORIA THOMPSON D.
               ================================================================= */}
            <div className="mt-14 border-t border-ink/15 pt-12 sm:mt-20 sm:pt-16">
              <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
                {/* Collage editorial: Portada del libro + recorte en B/N granulado de su coeditora Gloria Thompson D. emergiendo de la línea base */}
                <figure className="mx-auto w-full max-w-[22.5rem] sm:max-w-[27.5rem]">
                  <div className="relative isolate pt-2">
                    <BrushStroke className="pointer-events-none absolute top-0 left-0 -z-10 h-12 w-36 rotate-[-6deg] text-moss/85 sm:h-14 sm:w-44" />
                    <BrushStroke className="pointer-events-none absolute top-[28%] right-2 -z-10 h-14 w-44 rotate-[6deg] text-sand/90 sm:h-16 sm:w-56" />
                    <ChalkStrokes className="pointer-events-none absolute right-0 bottom-8 -z-10 h-20 w-48 text-ink/15 sm:h-24 sm:w-60" />

                    {/* Portada física del libro anclada arriba a la izquierda */}
                    <div className="relative z-10 ml-1 h-[15.5rem] w-[11.625rem] -rotate-2 overflow-hidden rounded-xl bg-ink shadow-md ring-1 ring-black/15 ring-inset sm:ml-2 sm:h-[19.5rem] sm:w-[14.625rem]">
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
                    <div className="relative z-20 -mt-20 ml-auto h-[11rem] w-[15rem] sm:-mt-28 sm:h-[13.75rem] sm:w-[18.75rem]">
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
                  <h4 className="font-hero isolate text-3xl leading-[1.08] font-normal text-balance text-ink sm:text-4xl md:text-5xl">
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

        {/* =====================================================================
            BANDA 5: DOMINÓ, BÉISBOL Y COMUNIDAD (INSPIRADO EN REFERENCIAS 2 Y 3)
           ===================================================================== */}
        <section
          aria-labelledby="comunidad-deporte-title"
          className="overflow-hidden bg-moss py-16 text-cream md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            {/* Tipografía monumental con fotografías incrustadas en línea (Referencia 2: Research) */}
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-bold tracking-widest text-sand uppercase">
                Tradición de esquina y barrio
              </p>

              <h3
                id="comunidad-deporte-title"
                className="font-hero mt-4 text-3xl leading-[1.18] font-normal text-cream sm:text-5xl md:text-6xl"
              >
                <span>El dominó </span>
                <span className="group relative mx-1 inline-block h-[2.2rem] w-[3.8rem] translate-y-1.5 overflow-hidden rounded-lg bg-ink ring-1 ring-cream/25 transition-transform duration-200 ease-out sm:h-[3.1rem] sm:w-[5.4rem] sm:translate-y-2 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110">
                  <Image
                    src={imgDomino}
                    alt="Partida de dominó en Puerto Limón"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </span>
                <span> en la esquina, el </span>
                <span className="text-sand">béisbol </span>
                <span className="group relative mx-1 inline-block h-[2.2rem] w-[3.8rem] translate-y-1.5 overflow-hidden rounded-lg bg-ink ring-1 ring-cream/25 transition-transform duration-200 ease-out sm:h-[3.1rem] sm:w-[5.4rem] sm:translate-y-2 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110">
                  <Image
                    src={imgBigBoy}
                    alt="Estadio Big Boy de Puerto Limón"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </span>
                <span> en el Big Boy y el </span>
                <span className="group relative mx-1 inline-block h-[2.2rem] w-[3.8rem] translate-y-1.5 overflow-hidden rounded-lg bg-ink ring-1 ring-cream/25 transition-transform duration-200 ease-out sm:h-[3.1rem] sm:w-[5.4rem] sm:translate-y-2 [@media(hover:hover)_and_(pointer:fine)]:hover:scale-110">
                  <Image
                    src={imgBoxeo}
                    alt="Boxeo y deporte barrial en Limón"
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </span>
                <span> pulso del barrio</span>
              </h3>
            </div>

            {/* =================================================================
                3 TARJETAS CON MARCO FOTOGRÁFICO Y VENTANA RECORTADA (FIEL A REFERENCIA 3)
               ================================================================= */}
            <div className="mt-12 grid gap-6 border-t border-cream/15 pt-12 md:grid-cols-3">
              {/* Tarjeta 1: Dominó */}
              <article className="relative overflow-hidden rounded-xl p-3.5 sm:p-4">
                <Image
                  src={imgDomino}
                  alt="Casa del Dominó en Puerto Limón"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 360px, 92vw"
                  className="pointer-events-none -z-10 object-cover brightness-75"
                />
                <div className="flex h-full flex-col justify-between rounded-lg bg-cream p-5 text-ink shadow-md">
                  <h4 className="font-display text-2xl text-ink sm:text-3xl">
                    Dominó: más que un juego
                  </h4>

                  {/* Ventana recortada en silueta orgánica que deja ver la fotografía */}
                  <div
                    style={{
                      clipPath:
                        "polygon(12% 8%, 48% 0%, 88% 10%, 100% 48%, 86% 92%, 52% 100%, 14% 88%, 0% 46%)",
                    }}
                    className="relative my-5 aspect-[4/3] w-full overflow-hidden bg-ink"
                  >
                    <Image
                      src={imgDomino}
                      alt="Partida de dominó en esquina limonense"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 320px, 80vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs leading-relaxed text-ink/80 sm:text-sm">
                      En La Casa del Dominó (Club Guillermo Cole Scarlett, Calle
                      5) las partidas en parejas duran hasta 8 horas: un golpe
                      fuerte avisa que se lleva ficha similar y uno suave que no
                      hay más juego.
                    </p>
                    <span className="mt-3 block text-right text-xs font-bold tracking-wider text-moss underline underline-offset-4 uppercase">
                      Club Guillermo Cole Scarlett
                    </span>
                  </div>
                </div>
              </article>

              {/* Tarjeta 2: Béisbol */}
              <article className="relative overflow-hidden rounded-xl p-3.5 sm:p-4">
                <Image
                  src={imgBigBoy}
                  alt="Estadio Big Boy de Puerto Limón"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 360px, 92vw"
                  className="pointer-events-none -z-10 object-cover brightness-75"
                />
                <div className="flex h-full flex-col justify-between rounded-lg bg-cream p-5 text-ink shadow-md">
                  <h4 className="font-display text-2xl text-ink sm:text-3xl">
                    Béisbol: orgullo histórico
                  </h4>

                  <div
                    style={{
                      clipPath:
                        "polygon(50% 0%, 92% 14%, 100% 54%, 82% 94%, 50% 100%, 18% 94%, 0% 54%, 8% 14%)",
                    }}
                    className="relative my-5 aspect-[4/3] w-full overflow-hidden bg-ink"
                  >
                    <Image
                      src={imgBigBoy}
                      alt="Diamante del Estadio Big Boy en Limón"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 320px, 80vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs leading-relaxed text-ink/80 sm:text-sm">
                      Con cancha desde 1887 y terreno donado por la UFC en 1897,
                      honra a Bancroft «Big Boy» Scott Watson y Danny Hayling
                      Shaw. Patrimonio desde 2002 (La Gaceta N° 138).
                    </p>
                    <span className="mt-3 block text-right text-xs font-bold tracking-wider text-moss underline underline-offset-4 uppercase">
                      Estadio Big Boy (1897)
                    </span>
                  </div>
                </div>
              </article>

              {/* Tarjeta 3: Boxeo y fútbol barrial */}
              <article className="relative overflow-hidden rounded-xl p-3.5 sm:p-4">
                <Image
                  src={imgBoxeo}
                  alt="Boxeo y deporte barrial en Puerto Limón"
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 360px, 92vw"
                  className="pointer-events-none -z-10 object-cover brightness-75"
                />
                <div className="flex h-full flex-col justify-between rounded-lg bg-cream p-5 text-ink shadow-md">
                  <h4 className="font-display text-2xl text-ink sm:text-3xl">
                    Deporte y vida barrial
                  </h4>

                  <div
                    style={{
                      clipPath:
                        "polygon(16% 4%, 84% 4%, 100% 42%, 88% 96%, 12% 96%, 0% 42%)",
                    }}
                    className="relative my-5 aspect-[4/3] w-full overflow-hidden bg-ink"
                  >
                    <Image
                      src={imgBoxeo}
                      alt="Entrenamiento de boxeo en gimnasio limonense"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 768px) 320px, 80vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-xs leading-relaxed text-ink/80 sm:text-sm">
                      Junto al diamante, el boxeo y el fútbol forman escuelas de
                      disciplina, encuentro y orgullo en cada barrio.
                    </p>
                    <span className="mt-3 block text-right text-xs font-bold tracking-wider text-moss underline underline-offset-4 uppercase">
                      Cancha y gimnasio
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* =================================================================
              ESCENARIO FOTOGRÁFICO CON SELLO POSTAL ONDULADO IDÉNTICO A REFERENCIA 3
             ================================================================= */}
          <div className="relative isolate mt-14 flex min-h-[34rem] w-full items-center justify-center overflow-hidden py-14 sm:mt-20 sm:py-20">
            <Image
              src={imgComunidad}
              alt="Comunidad y vida cotidiana en las calles de Limón"
              fill
              placeholder="blur"
              sizes="100vw"
              className="pointer-events-none -z-20 object-cover brightness-[0.65] contrast-105"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-ink/30"
            />

            <div className="mx-auto w-full max-w-[29rem] px-4 sm:px-6">
              {/* Sello postal cuadrado con borde ondulado crema real en SVG y centro naranja (Referencia 3) */}
              <div className="relative isolate px-7 py-9 text-center text-cream sm:px-11 sm:py-11">
                <svg
                  viewBox="0 0 480 450"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full drop-shadow-[0_20px_38px_rgba(0,0,0,0.45)]"
                >
                  <path
                    fill="#faf3d9"
                    d="M 14.0 14.0 Q 21.5 8.5 29.1 14.0 Q 36.6 16.5 44.1 14.0 Q 51.7 8.5 59.2 14.0 Q 66.7 16.5 74.3 14.0 Q 81.8 8.5 89.3 14.0 Q 96.9 16.5 104.4 14.0 Q 111.9 8.5 119.5 14.0 Q 127.0 16.5 134.5 14.0 Q 142.1 8.5 149.6 14.0 Q 157.1 16.5 164.7 14.0 Q 172.2 8.5 179.7 14.0 Q 187.3 16.5 194.8 14.0 Q 202.3 8.5 209.9 14.0 Q 217.4 16.5 224.9 14.0 Q 232.5 8.5 240.0 14.0 Q 247.5 16.5 255.1 14.0 Q 262.6 8.5 270.1 14.0 Q 277.7 16.5 285.2 14.0 Q 292.7 8.5 300.3 14.0 Q 307.8 16.5 315.3 14.0 Q 322.9 8.5 330.4 14.0 Q 337.9 16.5 345.5 14.0 Q 353.0 8.5 360.5 14.0 Q 368.1 16.5 375.6 14.0 Q 383.1 8.5 390.7 14.0 Q 398.2 16.5 405.7 14.0 Q 413.3 8.5 420.8 14.0 Q 428.3 16.5 435.9 14.0 Q 443.4 8.5 450.9 14.0 Q 458.5 16.5 466.0 14.0 Q 471.5 21.5 466.0 29.1 Q 463.5 36.6 466.0 44.1 Q 471.5 51.7 466.0 59.2 Q 463.5 66.8 466.0 74.3 Q 471.5 81.8 466.0 89.4 Q 463.5 96.9 466.0 104.4 Q 471.5 112.0 466.0 119.5 Q 463.5 127.0 466.0 134.6 Q 471.5 142.1 466.0 149.6 Q 463.5 157.2 466.0 164.7 Q 471.5 172.3 466.0 179.8 Q 463.5 187.3 466.0 194.9 Q 471.5 202.4 466.0 209.9 Q 463.5 217.5 466.0 225.0 Q 471.5 232.5 466.0 240.1 Q 463.5 247.6 466.0 255.1 Q 471.5 262.7 466.0 270.2 Q 463.5 277.8 466.0 285.3 Q 471.5 292.8 466.0 300.4 Q 463.5 307.9 466.0 315.4 Q 471.5 323.0 466.0 330.5 Q 463.5 338.0 466.0 345.6 Q 471.5 353.1 466.0 360.6 Q 463.5 368.2 466.0 375.7 Q 471.5 383.3 466.0 390.8 Q 463.5 398.3 466.0 405.9 Q 471.5 413.4 466.0 420.9 Q 463.5 428.5 466.0 436.0 Q 458.5 441.5 450.9 436.0 Q 443.4 433.5 435.9 436.0 Q 428.3 441.5 420.8 436.0 Q 413.3 433.5 405.7 436.0 Q 398.2 441.5 390.7 436.0 Q 383.1 433.5 375.6 436.0 Q 368.1 441.5 360.5 436.0 Q 353.0 433.5 345.5 436.0 Q 337.9 441.5 330.4 436.0 Q 322.9 433.5 315.3 436.0 Q 307.8 441.5 300.3 436.0 Q 292.7 433.5 285.2 436.0 Q 277.7 441.5 270.1 436.0 Q 262.6 433.5 255.1 436.0 Q 247.5 441.5 240.0 436.0 Q 232.5 433.5 224.9 436.0 Q 217.4 441.5 209.9 436.0 Q 202.3 433.5 194.8 436.0 Q 187.3 441.5 179.7 436.0 Q 172.2 433.5 164.7 436.0 Q 157.1 441.5 149.6 436.0 Q 142.1 433.5 134.5 436.0 Q 127.0 441.5 119.5 436.0 Q 111.9 433.5 104.4 436.0 Q 96.9 441.5 89.3 436.0 Q 81.8 433.5 74.3 436.0 Q 66.7 441.5 59.2 436.0 Q 51.7 433.5 44.1 436.0 Q 36.6 441.5 29.1 436.0 Q 21.5 433.5 14.0 436.0 Q 8.5 428.5 14.0 420.9 Q 16.5 413.4 14.0 405.9 Q 8.5 398.3 14.0 390.8 Q 16.5 383.3 14.0 375.7 Q 8.5 368.2 14.0 360.6 Q 16.5 353.1 14.0 345.6 Q 8.5 338.0 14.0 330.5 Q 16.5 323.0 14.0 315.4 Q 8.5 307.9 14.0 300.4 Q 16.5 292.8 14.0 285.3 Q 8.5 277.8 14.0 270.2 Q 16.5 262.7 14.0 255.1 Q 8.5 247.6 14.0 240.1 Q 16.5 232.5 14.0 225.0 Q 8.5 217.5 14.0 209.9 Q 16.5 202.4 14.0 194.9 Q 8.5 187.3 14.0 179.8 Q 16.5 172.3 14.0 164.7 Q 8.5 157.2 14.0 149.6 Q 16.5 142.1 14.0 134.6 Q 8.5 127.0 14.0 119.5 Q 16.5 112.0 14.0 104.4 Q 8.5 96.9 14.0 89.4 Q 16.5 81.8 14.0 74.3 Q 8.5 66.7 14.0 59.2 Q 16.5 51.7 14.0 44.1 Q 8.5 36.6 14.0 29.1 Q 16.5 21.5 14.0 14.0 Z"
                  />
                  <rect
                    x="18"
                    y="18"
                    width="444"
                    height="414"
                    rx="14"
                    fill="#dc5a32"
                  />
                </svg>

                {/* Emblema superior en crema (idéntico al icono superior del sello en Referencia 3) */}
                <svg
                  viewBox="0 0 64 28"
                  fill="none"
                  aria-hidden="true"
                  className="mx-auto h-6 w-14 text-cream"
                >
                  <path
                    d="M6 20 C14 6, 50 6, 58 20 C46 25, 18 25, 6 20 Z"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 12 L24 21 M31 10 L36 21 M44 12 L47 20"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>

                <h4 className="font-hero mt-3 text-3xl leading-[1.06] font-normal text-cream sm:text-4xl">
                  <span className="block">Comunidad</span>
                  <span className="block">y vida</span>
                  <span className="block">cotidiana</span>
                </h4>

                <p className="mx-auto mt-3 max-w-[38ch] text-xs leading-relaxed text-pretty text-cream/95 sm:text-sm">
                  La cultura limonense se construye desde la convivencia barrial
                  y el respeto en las aceras, los porches y los espacios
                  compartidos.
                </p>

                {/* Barra delineada redondeada igual a la referencia */}
                <div className="mt-5 rounded-full border border-cream/65 px-5 py-2.5 text-center text-xs font-medium text-cream/95 sm:text-sm">
                  <SlotRollText
                    text={
                      activeStampQuote === 0
                        ? "“Lo mejor de Limón es su gente” — Hospitalidad de porche"
                        : "“Cho!” — Exclamación clásica de asombro y complicidad"
                    }
                  />
                </div>

                {/* Botón píldora crema de ancho completo igual al pie del sello en Referencia 3 */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveStampQuote((prev) => (prev === 0 ? 1 : 0))
                  }
                  className="font-display mt-3.5 w-full cursor-pointer rounded-full bg-cream py-3 text-center text-base tracking-wide text-ember shadow-sm transition-transform duration-150 active:scale-[0.98] sm:text-lg"
                >
                  {activeStampQuote === 0
                    ? "Escuchar otra expresión: “Cho!”"
                    : "Volver a: “Lo mejor de Limón es su gente”"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            BANDA 6A: ARTE, ESCENA Y MEMORIA (COMPOSICIÓN MUSEÍSTICA)
           ===================================================================== */}
        <section
          aria-labelledby="arte-teatro-title"
          className="overflow-hidden bg-cream py-16 text-ink md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            {/* BLOQUE 1: Introducción editorial estilo catálogo de museo (2 láminas + declaración tipográfica) */}
            <div className="grid items-start gap-8 lg:grid-cols-[9rem_1fr] lg:gap-12">
              <p className="text-xs font-semibold tracking-wide text-ink/70">
                Arte y creatividad
              </p>

              <div className="grid items-end gap-6 md:grid-cols-[0.95fr_1.05fr] lg:gap-8">
                <div className="grid grid-cols-2 gap-3">
                  <figure className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <Image
                      src={imgPasajeCristal}
                      alt="Corredor del Pasaje Cristal con obras y retratos de pintores limonenses"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 220px, 45vw"
                      className="object-cover"
                    />
                  </figure>
                  <figure className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <Image
                      src={imgGaleriaPintura}
                      alt="Sala de exposición de pintura afrocaribeña en los antiguos edificios de la UFC"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 220px, 45vw"
                      className="object-cover"
                    />
                  </figure>
                </div>

                <div>
                  <p className="text-[0.72rem] leading-relaxed text-ink/65 sm:text-xs">
                    Corredor de 1908 diseñado por César Rivaflecha (La Gaceta N°
                    16 de 1999) donde exhiben Edgar León, William Durán, Germán
                    Mora, Honorio Cabraca y Virginia Araya; junto al legado
                    literario de Samuel Charles Nation (1912–1942) y Quince
                    Duncan.
                  </p>
                  <p className="font-display mt-3 text-xl leading-[1.18] text-ink sm:text-2xl md:text-[1.7rem]">
                    Con sus talleres abiertos en el Pasaje Cristal, el edificio
                    sur de la antigua UFC y la Casa de la Cultura, Limón
                    articula un circuito vivo que preserva y exhibe la creación
                    plástica, artesanal y escénica del Caribe.
                  </p>
                </div>
              </div>
            </div>

            {/* BLOQUE 2: Pieza tipográfica central con miniaturas fotográficas intercaladas coherentes con cada término */}
            <div className="mt-16 grid items-start gap-6 border-t border-ink/12 pt-14 sm:mt-24 sm:pt-18 lg:grid-cols-[9rem_1fr]">
              <p className="text-xs font-semibold tracking-wide text-ink/70">
                Creación colectiva
              </p>

              <div className="mx-auto max-w-3xl text-center">
                <p className="text-2xl leading-[1.18] tracking-tight text-ink sm:text-4xl md:text-5xl">
                  <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <span className="relative inline-block h-7 w-14 shrink-0 overflow-hidden bg-ink align-middle sm:h-9 sm:w-20">
                      <Image
                        src={imgArteLimon}
                        alt="Galería de pintura en el Pasaje Cristal"
                        fill
                        placeholder="blur"
                        sizes="90px"
                        className="object-cover"
                      />
                    </span>
                    <span className="font-light">Corredor del</span>
                    <strong className="font-hero font-normal tracking-wide uppercase">
                      Pasaje Cristal
                    </strong>
                  </span>
                  <span className="mt-1 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <span className="font-light">escultura de</span>
                    <span className="font-light text-ember">«Gemelo»</span>
                    <span className="relative inline-block h-7 w-14 shrink-0 overflow-hidden bg-ink align-middle sm:h-9 sm:w-20">
                      <Image
                        src={imgEsculturaGemelo}
                        alt="Escultura en metal reciclado de Gemelo"
                        fill
                        placeholder="blur"
                        sizes="90px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                  <span className="mt-1 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <span className="font-light">talla en cáscara de coco</span>
                    <span className="relative inline-block h-7 w-14 shrink-0 overflow-hidden bg-ink align-middle sm:h-9 sm:w-20">
                      <Image
                        src={imgCocoTortuga}
                        alt="Artesanía limonense tallada en coco"
                        fill
                        placeholder="blur"
                        sizes="90px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                  <span className="mt-1 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <strong className="font-hero font-normal tracking-wide text-ember uppercase">
                      Teatro y Escena
                    </strong>
                  </span>
                  <span className="mt-1 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
                    <strong className="font-hero font-normal tracking-wide text-ember uppercase">
                      Comunitaria
                    </strong>
                    <span className="relative inline-block h-7 w-14 shrink-0 overflow-hidden bg-ink align-middle sm:h-9 sm:w-20">
                      <Image
                        src={imgTeatro}
                        alt="Obra de teatro y escena comunitaria en la Casa de la Cultura"
                        fill
                        placeholder="blur"
                        sizes="90px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                </p>
              </div>
            </div>

            {/* BLOQUE 3: Galería editorial asimétrica de 3 columnas con pieza central extendida */}
            <div className="mt-16 border-t border-ink/12 pt-12 sm:mt-24 sm:pt-14">
              <h3
                id="arte-teatro-title"
                className="text-sm font-semibold tracking-wide text-ink"
              >
                Arte, escena y memoria
              </h3>

              <div className="mt-6 grid items-start gap-8 lg:grid-cols-[0.95fr_1.45fr_0.95fr] lg:gap-7">
                {/* Columna 1: Pasaje Cristal y pintura */}
                <article>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <Image
                      src={imgArteLimon}
                      alt="Exposición de pintura y arte afrocaribeño en Limón"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 320px, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mt-3 text-xs font-bold tracking-wider text-ink uppercase sm:text-sm">
                    Pasaje Cristal, pintura y narrativa visual
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                    Corredor de 1908 (César Rivaflecha, La Gaceta N° 16 de 1999)
                    donde exhiben Edgar León, William Durán, Germán Mora,
                    Honorio Cabraca y Virginia Araya.
                  </p>
                  <p className="mt-2.5 border-t border-ink/12 pt-2 text-[0.68rem] text-ink/55">
                    Murales con símbolos afrocaribeños y talleres abiertos
                  </p>
                </article>

                {/* Columna 2 (pieza central de mayor formato): Teatro y escena comunitaria */}
                <article>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <Image
                      src={imgTeatro}
                      alt="Obra de teatro y escena comunitaria en Limón"
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 520px, 92vw"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mt-3 text-xs font-bold tracking-wider text-ink uppercase sm:text-sm">
                    Teatro y escena comunitaria en la Casa de la Cultura
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75 sm:text-sm">
                    El teatro y las artes escénicas en Limón son herramientas de
                    reflexión social y cohesión. En espacios como la Casa de la
                    Cultura, el teatro estudiantil y comunitario narra historias
                    vinculadas a la identidad afrocaribeña y la memoria local.
                  </p>
                  <p className="mt-2.5 border-t border-ink/12 pt-2 text-[0.68rem] text-ink/55">
                    Casa de la Cultura, teatro estudiantil, poesía oral y danza
                  </p>
                </article>

                {/* Columna 3: Escultura reciclada, turbantes y talla en coco */}
                <article>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-[4/3] col-span-2 w-full overflow-hidden bg-ink">
                      <Image
                        src={imgEsculturaGemelo}
                        alt="Esculturas en metal reciclado del artista limonense Ballestero (Gemelo) en el edificio sur de la UFC"
                        fill
                        placeholder="blur"
                        sizes="(min-width: 1024px) 320px, 92vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                      <Image
                        src={imgTurbantes}
                        alt="Artesanías y turbantes afrocaribeños en los antiguos edificios de la UFC"
                        fill
                        placeholder="blur"
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                      <Image
                        src={imgCocoTortuga}
                        alt="Artesanía limonense tallada en cáscara de coco"
                        fill
                        placeholder="blur"
                        sizes="160px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h4 className="mt-3 text-xs font-bold tracking-wider text-ink uppercase sm:text-sm">
                    Escultura «Gemelo», turbantes y talla en coco
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75">
                    En el segundo nivel del edificio sur de la UFC, Ballestero
                    («Gemelo») forja esculturas en metal reciclado junto a
                    artesanos de turbantes, bambú y cáscara de coco.
                  </p>
                  <p className="mt-2.5 border-t border-ink/12 pt-2 text-[0.68rem] text-ink/55">
                    Edificio Sur de la UFC y letras de S. C. Nation y Quince Duncan
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            BANDA 6B: CINE Y LETRAS LIMONENSES (ÍNDICE + DATOS AL CENTRO + PORTADA)
           ===================================================================== */}
        <section
          aria-labelledby="cine-caribe-title"
          className="flex min-h-svh flex-col justify-center overflow-hidden bg-cream py-12 text-ink md:py-16"
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/15 pb-4 sm:pb-5">
              <div>
                <h3
                  id="cine-caribe-title"
                  className="font-hero text-3xl leading-[1.05] font-normal text-ink sm:text-5xl"
                >
                  Cine y <Highlight color="text-sky">letras</Highlight>
                </h3>
                <p className="mt-2 max-w-[46ch] text-xs leading-relaxed text-pretty text-ink/70 sm:text-sm">
                  Películas filmadas en el Caribe y libros que contaron Limón
                  desde adentro.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Filtrar obras"
                className="flex gap-5 text-xs font-medium tracking-wide sm:text-sm"
              >
                {(
                  [
                    { id: "all", label: "Todo" },
                    { id: "vhs", label: "Cine" },
                    { id: "book", label: "Literatura" },
                  ] as const
                ).map((tab) => {
                  const isSelected = shelfFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => selectShelfFilter(tab.id)}
                      className={`cursor-pointer border-b pb-1.5 transition-colors duration-150 ${
                        isSelected
                          ? "border-ink text-ink"
                          : "border-transparent text-ink/40 hover:text-ink/80"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selector horizontal compacto solo en móvil (sin acordeón que brinque) */}
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 md:hidden">
              {visibleShelfItems.map((item) => {
                const isSelected = item.id === activeShelfItem.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveShelfId(item.id)}
                    className={`shrink-0 cursor-pointer border px-3 py-1.5 text-xs transition-colors duration-150 ${
                      isSelected
                        ? "border-ink bg-ink text-cream"
                        : "border-ink/15 bg-transparent text-ink/65"
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Estructura estable de 3 columnas: Lista | Datos al centro | Portada */}
            <div className="mt-6 grid items-start gap-8 md:mt-10 md:grid-cols-[15.5rem_1fr_12.5rem] md:gap-10 lg:grid-cols-[17.5rem_1fr_14rem] lg:gap-12">
              {/* Columna izquierda (escritorio): Lista limpia con indicador cromático fijo */}
              <ul className="hidden border-t border-ink/10 md:block">
                {visibleShelfItems.map((item) => {
                  const isSelected = item.id === activeShelfItem.id;
                  return (
                    <li key={item.id} className="border-b border-ink/10">
                      <button
                        type="button"
                        onMouseEnter={() => setActiveShelfId(item.id)}
                        onFocus={() => setActiveShelfId(item.id)}
                        onClick={() => setActiveShelfId(item.id)}
                        className="flex w-full cursor-pointer items-center justify-between gap-3 py-2.5 text-left"
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            style={{ backgroundColor: item.spineBg }}
                            className={`h-3.5 w-1 shrink-0 transition-opacity duration-150 ${
                              isSelected ? "opacity-100" : "opacity-0"
                            }`}
                          />
                          <span
                            className={`truncate text-sm font-medium transition-colors duration-150 ${
                              isSelected
                                ? "text-ink"
                                : "text-ink/45 hover:text-ink/80"
                            }`}
                          >
                            {item.title}
                          </span>
                        </span>
                        <span className="shrink-0 text-xs text-ink/40 tabular-nums">
                          {item.year}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Columna central: Datos editoriales de la obra activa */}
              <div className="relative min-w-0 border-t border-ink/15 pt-5 md:border-t-0 md:border-x md:border-ink/10 md:px-8 md:pt-0 lg:px-10">
                {/* Barra de progreso cromática fija en la parte superior */}
                <div
                  aria-hidden="true"
                  className="mb-4 h-0.5 w-full overflow-hidden bg-ink/10"
                >
                  <div
                    className="h-full transition-all duration-200 ease-out"
                    style={{
                      width: `${((activeShelfIndex + 1) / visibleShelfItems.length) * 100}%`,
                      backgroundColor: activeShelfItem.spineBg,
                    }}
                  />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-medium tracking-widest text-ink/50 uppercase">
                      {activeShelfItem.kind === "vhs"
                        ? "Cine del Caribe"
                        : "Literatura limonense"}
                    </span>
                    <h4 className="font-display mt-1.5 text-3xl leading-[1.02] text-ink sm:text-4xl">
                      {activeShelfItem.title}
                    </h4>
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-display shrink-0 text-3xl leading-none text-ink/15 tabular-nums sm:text-4xl"
                  >
                    {activeShelfItem.year}
                  </span>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-ink/10 py-3.5 text-xs">
                  <div>
                    <dt className="text-[10px] tracking-widest text-ink/45 uppercase">
                      {activeShelfItem.roleLabel}
                    </dt>
                    <dd className="mt-1 font-medium text-ink">
                      {activeShelfItem.creator}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] tracking-widest text-ink/45 uppercase">
                      Referencia
                    </dt>
                    <dd className="mt-1 font-medium text-ink">
                      {activeShelfItem.code}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 min-h-[4.25rem] text-sm leading-relaxed text-pretty text-ink/80">
                  {activeShelfItem.synopsis}
                </p>

                <div className="mt-4 border-t border-ink/10 pt-3">
                  <span className="block text-[10px] tracking-widest text-ink/45 uppercase">
                    Reconocimientos
                  </span>
                  <p className="mt-1 min-h-[2.25rem] text-xs leading-relaxed text-ink/70">
                    {activeShelfItem.awards.join(" / ")}
                  </p>
                </div>

                {/* Pie con contador y navegación por flechas */}
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-ink/55">
                  <span className="tabular-nums">
                    {String(activeShelfIndex + 1).padStart(2, "0")} /{" "}
                    {String(visibleShelfItems.length).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => stepShelf(-1)}
                      aria-label="Obra anterior"
                      className="inline-flex h-7 w-7 cursor-pointer items-center justify-center border border-ink/20 text-ink/70 transition-colors hover:border-ink hover:text-ink"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => stepShelf(1)}
                      aria-label="Siguiente obra"
                      className="inline-flex h-7 w-7 cursor-pointer items-center justify-center border border-ink/20 text-ink/70 transition-colors hover:border-ink hover:text-ink"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna derecha: Portada compacta con marco editorial */}
              <div className="mx-auto w-full max-w-[11rem] md:max-w-none">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xs bg-ink/10 shadow-[6px_6px_0_0_rgba(25,25,25,0.1)] ring-1 ring-ink/15">
                  <Image
                    key={activeShelfItem.id}
                    src={activeShelfItem.image}
                    alt={activeShelfItem.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 224px, 180px"
                    className="object-cover"
                  />
                  {activeShelfItem.kind === "book" && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/30 via-white/15 to-transparent"
                    />
                  )}
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] tracking-widest text-ink/45 uppercase">
                  <span>
                    {activeShelfItem.kind === "vhs"
                      ? "Edición fílmica"
                      : "Edición impresa"}
                  </span>
                  <span className="tabular-nums">{activeShelfItem.year}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            BANDA 7: MEDIOS / RADIO FM + FECHAS PARA NO OLVIDAR CON COLLAGE INCLINADO (REFERENCIA 3)
           ===================================================================== */}
        <section
          aria-labelledby="medios-fechas-title"
          className="overflow-hidden bg-ink py-16 text-cream md:py-28"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-6">
            {/* Bloque superior: Sintonizador FM en vivo para Radio Casino y Radio Bahía */}
            <div className="grid items-center gap-8 rounded-2xl bg-cream/[0.05] p-6 ring-1 ring-cream/12 sm:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
              <audio
                ref={radioAudioRef}
                preload="none"
                onPlaying={() => {
                  setIsRadioPlaying(true);
                  setIsRadioLoading(false);
                }}
                onPause={() => setIsRadioPlaying(false)}
                onWaiting={() => setIsRadioLoading(true)}
                onError={() => {
                  setIsRadioPlaying(false);
                  setIsRadioLoading(false);
                }}
              />

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold tracking-widest text-sand uppercase">
                    Medios y nuevas narrativas
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wider uppercase ${
                      isRadioPlaying
                        ? "bg-ember/20 text-ember ring-1 ring-ember/40"
                        : "bg-cream/10 text-cream/70"
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        isRadioPlaying
                          ? "animate-pulse bg-ember"
                          : "bg-cream/45"
                      }`}
                    />
                    {isRadioLoading
                      ? "Sintonizando..."
                      : isRadioPlaying
                        ? "Al aire en vivo"
                        : "Radio abierta"}
                  </span>
                </div>

                <h3
                  id="medios-fechas-title"
                  className="font-hero mt-2.5 text-3xl leading-[1.08] font-normal text-cream sm:text-5xl"
                >
                  La radio que acompaña al{" "}
                  <Highlight color="text-moss">Caribe</Highlight>
                </h3>

                {/* Botones de emisoras */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {radioStations.map((station, idx) => {
                    const isSelected = idx === activeRadioIndex;
                    return (
                      <button
                        key={station.id}
                        type="button"
                        onClick={() => selectRadioStation(idx)}
                        aria-pressed={isSelected}
                        className={`font-display cursor-pointer rounded-full px-4 py-2 text-lg transition-colors duration-150 sm:text-xl ${
                          isSelected
                            ? "bg-sand text-ink"
                            : "border border-cream/25 text-cream/80 hover:border-cream/55 hover:text-cream"
                        }`}
                      >
                        {station.name} ({station.freq})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Escala analógica de dial FM con reproductor en vivo */}
              <div className="rounded-xl bg-ink p-5 ring-1 ring-cream/15 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="font-display block text-3xl text-sand sm:text-4xl">
                      <SlotRollText text={activeRadio.freq} />
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold tracking-wider text-cream/65 uppercase">
                      <SlotRollText text={activeRadio.tagline} />
                    </span>
                  </div>

                  {/* Botón principal de reproducir / pausar transmisión en vivo */}
                  <button
                    type="button"
                    onClick={toggleRadioPlayback}
                    className={`font-display inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full px-5 text-base transition-transform duration-150 active:scale-95 sm:text-lg ${
                      isRadioPlaying
                        ? "bg-ember text-cream shadow-lg"
                        : "bg-cream text-ink hover:bg-sand"
                    }`}
                  >
                    {isRadioPlaying ? (
                      <>
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="size-4 shrink-0"
                        >
                          <rect x="4.5" y="4" width="3.8" height="12" rx="1" />
                          <rect x="11.7" y="4" width="3.8" height="12" rx="1" />
                        </svg>
                        <span>Pausar en vivo</span>
                      </>
                    ) : (
                      <>
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="size-4 shrink-0"
                        >
                          <polygon points="5,3.5 16.5,10 5,16.5" />
                        </svg>
                        <span>
                          {isRadioLoading
                            ? "Conectando..."
                            : "Escuchar en vivo"}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Regla graduada del dial FM */}
                <div className="relative mt-4 h-8 w-full overflow-hidden rounded-lg bg-cream/[0.06] px-4">
                  <div className="flex h-full items-center justify-between opacity-35">
                    {Array.from({ length: 29 }).map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-px bg-cream ${
                          idx % 4 === 0 ? "h-4" : "h-2"
                        }`}
                      />
                    ))}
                  </div>
                  <motion.span
                    aria-hidden="true"
                    animate={{ left: activeRadio.dialPercent }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className={`pointer-events-none absolute inset-y-1 w-0.5 ${
                      isRadioPlaying
                        ? "bg-ember shadow-[0_0_10px_#dc5a32]"
                        : "bg-sand"
                    }`}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                  <p className="max-w-[44ch] text-sm leading-relaxed text-cream/85 sm:text-base">
                    <SlotRollText text={activeRadio.description} />
                  </p>

                  <a
                    href={activeRadio.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-semibold tracking-wider text-sand/85 uppercase underline-offset-4 hover:text-cream hover:underline"
                  >
                    Señal externa ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Bloque inferior: Fechas para no olvidar con tarjetas fotográficas inclinadas (Referencia 3) */}
            <div className="mt-16 sm:mt-24">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-cream/15 pb-6">
                <h3 className="font-hero text-3xl leading-[1.08] font-normal text-cream sm:text-5xl">
                  Fechas para no <Highlight color="text-ember">olvidar</Highlight>
                </h3>
                <span className="text-xs font-bold tracking-widest text-sand uppercase">
                  Calendario vivo de la provincia
                </span>
              </div>

              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {keyDates.map((item) => (
                  <article
                    key={item.date}
                    className="group relative flex flex-col justify-between rounded-2xl border border-cream/15 bg-cream/[0.04] p-6 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:border-cream/35 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-cream/[0.07]"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`font-display inline-block rounded-full px-3.5 py-1 text-xl sm:text-2xl ${item.accentClass}`}
                        >
                          {item.date}
                        </span>

                        {/* Fotografía tipo polaroid inclinada que se endereza al pasar el cursor (Referencia 3) */}
                        <div
                          className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ink shadow-lg ring-2 ring-cream/20 transition-transform duration-300 ease-out sm:h-24 sm:w-24 ${item.tiltClass} [@media(hover:hover)_and_(pointer:fine)]:group-hover:rotate-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105`}
                        >
                          <Image
                            src={item.image}
                            alt={item.alt}
                            fill
                            placeholder="blur"
                            sizes="110px"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <h4 className="font-display mt-5 text-2xl leading-[1.02] text-cream sm:text-3xl">
                        {item.title}
                      </h4>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-cream/75">
                      {item.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </MotionConfig>
  );
}
