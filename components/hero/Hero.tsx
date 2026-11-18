"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  BrushStroke,
  EditorialArrow,
  HalfRing,
  PlusIcon,
} from "@/components/ui/Shapes";
import img1890 from "@/public/Limón - images/1890.png";
import imgBlackStar from "@/public/Limón - images/BlackStarLine.png";
import imgFerguson from "@/public/Limón - images/walter-ferguson.jpg";
import imgCommunity from "@/public/Limón - images/Comunidad-vidacotidiana.png";
import imgCarnival from "@/public/Limón - images/Carnaval.png";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

type HeroGalleryItem = {
  src: StaticImageData;
  alt: string;
  clipPath: string;
  edgeRadiusClass?: string;
};

const heroGallery: readonly HeroGalleryItem[] = [
  {
    src: img1890,
    alt: "Construcción del ferrocarril al Atlántico y trabajadores caribeños",
    clipPath: "polygon(0% 0%, 100% 5.5%, 100% 94.5%, 0% 100%)",
    edgeRadiusClass: "rounded-l-2xl",
  },
  {
    src: imgBlackStar,
    alt: "Edificio histórico del Black Star Line en Puerto Limón",
    clipPath: "polygon(0% 5.5%, 100% 11.8%, 100% 88.2%, 0% 94.5%)",
  },
  {
    src: imgFerguson,
    alt: "Walter Ferguson, maestro del calipso limonense",
    clipPath:
      "polygon(0% 12.7%, 50% 15.4%, 100% 12.7%, 100% 87.3%, 50% 84.6%, 0% 87.3%)",
  },
  {
    src: imgCommunity,
    alt: "Vida cotidiana y comunidad afrocaribeña en las calles de Limón",
    clipPath: "polygon(0% 11.8%, 100% 5.5%, 100% 94.5%, 0% 88.2%)",
  },
  {
    src: imgCarnival,
    alt: "Comparsas y música en el Carnaval de Puerto Limón",
    clipPath: "polygon(0% 5.5%, 100% 0%, 100% 100%, 0% 94.5%)",
    edgeRadiusClass: "rounded-r-2xl",
  },
];

const navLinks = [
  { href: "#inicio", label: "Inicio", note: "Puerto Limón · Archivo vivo" },
  {
    href: "#historia",
    label: "Historia",
    note: "Un puerto que se hizo a pulso",
  },
  {
    href: "#cronologia",
    label: "Cronología",
    note: "1854 hasta hoy · 6 épocas",
  },
  {
    href: "#arquitectura",
    label: "Arquitectura",
    note: "12 hitos del casco histórico",
  },
  {
    href: "#cultura",
    label: "Cultura",
    note: "Calipso, carnaval y vida local",
  },
];

function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const prevOverflowRef = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  const restoreBodyOverflow = useCallback(() => {
    if (prevOverflowRef.current !== null) {
      document.body.style.overflow = prevOverflowRef.current;
      prevOverflowRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isOpen && prevOverflowRef.current === null) {
      prevOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      restoreBodyOverflow();
    };
  }, [restoreBodyOverflow]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="relative z-30 flex items-start justify-between px-6 pt-[max(1.25rem,env(safe-area-inset-top))] pb-4 md:px-10 md:py-6">
        <Link href="#inicio" className="font-display text-2xl">
          Puerto
          <br />
          Limón
        </Link>

        <nav aria-label="Principal" className="hidden gap-8 md:flex">
          {navLinks.slice(1).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-xl transition-opacity duration-150 [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-60"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-controls="site-menu-overlay"
          aria-label="Abrir menú"
          className="grid size-10 cursor-pointer place-items-center transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <PlusIcon
            className={`size-7 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
      </header>

      <AnimatePresence onExitComplete={restoreBodyOverflow}>
        {isOpen && (
          <motion.div
            key="menu-backdrop"
            aria-hidden
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: EASE_OUT }}
            onClick={closeMenu}
          />
        )}

        {isOpen && (
          <motion.div
            id="site-menu-overlay"
            key="menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-ink text-cream [scrollbar-width:none]"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: "translate3d(0, -24px, 0)" }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, transform: "translate3d(0, 0px, 0)" }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: "translate3d(0, -18px, 0)" }
            }
            transition={{ duration: 0.34, ease: EASE_DRAWER }}
          >
            {/* Decorative framing shapes */}
            <HalfRing
              side="left"
              className="pointer-events-none absolute top-1/2 -right-8 h-56 -translate-y-1/2 text-moss/25 sm:h-72"
            />
            <BrushStroke className="pointer-events-none absolute bottom-16 -left-6 h-14 w-52 -rotate-6 text-sand/20" />

            <div className="relative z-10 flex items-start justify-between px-6 py-6 md:px-10">
              <Link
                href="#inicio"
                onClick={closeMenu}
                className="font-display text-2xl text-cream"
              >
                Puerto
                <br />
                Limón
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                aria-label="Cerrar menú"
                className="grid size-10 cursor-pointer place-items-center text-cream transition-transform duration-150 ease-out active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <PlusIcon className="size-7 rotate-45" />
              </button>
            </div>

            <nav
              aria-label="Navegación principal"
              className="relative z-10 mx-auto w-full max-w-4xl px-6 py-6"
            >
              <ol className="divide-y divide-cream/10">
                {navLinks.map(({ href, label, note }, index) => (
                  <motion.li
                    key={href}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, transform: "translate3d(0, 14px, 0)" }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, transform: "translate3d(0, 0px, 0)" }
                    }
                    transition={{
                      duration: 0.28,
                      ease: EASE_OUT,
                      delay: reduceMotion ? 0 : 0.05 + index * 0.04,
                    }}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between gap-4 py-5 transition-colors duration-150 active:opacity-75 sm:py-6"
                    >
                      <div>
                        <span className="font-display block text-4xl text-cream transition-transform duration-200 ease-out sm:text-6xl [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-2">
                          {label}
                        </span>
                        <span className="mt-1.5 block text-xs font-medium tracking-wide text-cream/60 sm:text-sm">
                          {note}
                        </span>
                      </div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/20 text-cream transition-[background-color,color,border-color] duration-200 [@media(hover:hover)_and_(pointer:fine)]:group-hover:border-moss [@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-moss">
                        <EditorialArrow
                          direction="right"
                          className="h-3 w-4 transition-transform duration-200 ease-out [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ol>
            </nav>

            <div className="relative z-10 px-6 pb-8 text-xs font-medium tracking-wide text-cream/50 md:px-10">
              Costa Caribeña · Costa Rica
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Mural SVG orgánico que cubre el escenario inferior del Hero
 * y conecta al ras con el borde inferior (y=235 -> bottom-0).
 * En móvil se ensancha (w-[156%]) para mantener la proporción circular de las flores sin aplastarlas.
 */
function HeroGalleryBackdrop() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/hero-backdrop.svg?v=3"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute top-0 bottom-0 left-1/2 -z-10 h-full w-[156%] max-w-none -translate-x-1/2 opacity-[0.13] [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_100%)] select-none sm:w-[118%] lg:w-full"
    />
  );
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="relative flex min-h-lvh flex-col justify-between overflow-hidden bg-moss text-ink"
      >
        <SiteNav />

        {/* Bloque central de texto y botones con tamaños amplios en móvil y escritorio */}
        <div className="animate-rise relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pt-1 pb-2 text-center sm:px-8">
          <h1
            id="hero-title"
            className="font-hero max-w-[16ch] text-[clamp(2.35rem,9.2vw,3.35rem)] leading-[1.06] font-normal text-balance text-cream sm:max-w-[18ch] sm:text-[clamp(3rem,min(5.8vw,7.4svh),5.1rem)]"
          >
            El Caribe que hizo a
            <br />
            Costa Rica
          </h1>

          <p className="mt-3.5 max-w-[38ch] text-sm leading-relaxed font-medium text-pretty text-cream/90 sm:mt-4 sm:max-w-[54ch] sm:text-base md:text-lg">
            Un archivo vivo de Puerto Limón: su gente afrocaribeña, el tren, el
            puerto, la cocina y el criollo limonense que todavía se habla en sus
            calles.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-7 sm:gap-4">
            <Button href="#historia" variant="dark" className="h-11 px-5 text-base sm:h-11 sm:px-6 sm:text-lg">
              Explorar la historia
            </Button>
            <Button href="#cultura" variant="light" className="h-11 px-5 text-base sm:h-11 sm:px-6 sm:text-lg">
              Recorrer cultura
            </Button>
          </div>
        </div>

        {/* Escenario inferior más grande y conectado al ras con el borde inferior del Hero */}
        <div className="animate-rise relative isolate mx-auto w-full max-w-[96rem] pt-[clamp(2.25rem,7svh,5.25rem)] pb-[clamp(2.5rem,7.5svh,5rem)]">
          <HeroGalleryBackdrop />

          <div className="mx-auto grid h-[clamp(9.25rem,23svh,12.5rem)] w-[94%] grid-cols-[0.76fr_1fr_1fr_1fr_0.76fr] gap-1.5 sm:h-[clamp(11rem,26svh,18rem)] sm:w-[88%] sm:gap-2.5 md:gap-3">
            {heroGallery.map((item, idx) => (
              <div
                key={item.alt}
                style={{ clipPath: item.clipPath }}
                className={`relative h-full w-full overflow-hidden bg-ink/30 ${
                  item.edgeRadiusClass ?? ""
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={idx < 3}
                  placeholder="blur"
                  sizes="(max-width: 640px) 22vw, 260px"
                  className="object-cover grayscale contrast-115"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
