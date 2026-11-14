"use client";

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

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

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
      <header className="relative z-30 flex items-start justify-between px-6 py-6 md:px-10">
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

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="inicio"
        aria-labelledby="hero-title"
        className="relative flex min-h-svh h-dvh flex-col justify-between overflow-hidden bg-moss text-ink"
      >
        <SiteNav />

        <div className="animate-rise relative flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center sm:pb-14">
          {/* Half-rings hug viewport edges on mobile so the title stays 3 lines, and flank inline on sm+ */}
          <div className="relative flex w-full items-center justify-center sm:gap-[clamp(1rem,4vw,4rem)]">
            <HalfRing
              side="right"
              className="pointer-events-none absolute top-1/2 left-0 h-40 -translate-x-1/2 -translate-y-1/2 sm:static sm:h-[clamp(11rem,38svh,26rem)] sm:shrink-0 sm:translate-x-0 sm:translate-y-0"
            />
            <h1
              id="hero-title"
              className="font-display relative z-10 text-[clamp(3.2rem,13.5vw,8.5rem)] leading-[0.94] text-cream"
            >
              <span className="block whitespace-nowrap">El Caribe</span>
              <span className="block whitespace-nowrap">que hizo a</span>
              <span className="block whitespace-nowrap">Costa Rica</span>
            </h1>
            <HalfRing
              side="left"
              className="pointer-events-none absolute top-1/2 right-0 h-40 translate-x-1/2 -translate-y-1/2 sm:static sm:h-[clamp(11rem,38svh,26rem)] sm:shrink-0 sm:translate-x-0 sm:translate-y-0"
            />
          </div>

          <p className="mt-7 max-w-[38ch] text-base leading-snug font-medium text-pretty sm:mt-10 sm:max-w-[40ch] md:text-lg">
            Un archivo vivo de Puerto Limón: su gente afrocaribeña, el tren, el
            puerto, la cocina y el criollo limonense que todavía se habla en sus
            calles.
          </p>

          <Button href="#historia" className="mt-6">
            Explorar la historia
          </Button>
        </div>
      </section>
    </MotionConfig>
  );
}
