import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HalfRing, PlusIcon } from "@/components/ui/Shapes";

const navLinks = [
  { href: "#historia", label: "Historia" },
  { href: "#cultura", label: "Cultura" },
  { href: "#archivo", label: "Archivo" },
  { href: "#blog", label: "Blog" },
];

function SiteNav() {
  return (
    <header className="relative z-10 flex items-start justify-between px-6 py-6 md:px-10">
      <Link href="/" className="font-display text-2xl">
        Puerto
        <br />
        LimÃ³n
      </Link>
      <nav aria-label="Principal" className="hidden gap-8 md:flex">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="font-display text-xl transition-opacity hover:opacity-60">
            {label}
          </Link>
        ))}
      </nav>
      <button type="button" aria-label="Abrir menÃº" className="grid size-10 place-items-center">
        <PlusIcon className="size-7" />
      </button>
    </header>
  );
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex h-svh flex-col overflow-hidden bg-moss text-ink">
      <SiteNav />

      <div className="animate-rise relative flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        {/* Half-rings frame the headline from the sides, never overlapping the copy */}
        <div className="flex w-full items-center justify-center gap-[clamp(1rem,4vw,4rem)]">
          <HalfRing side="right" className="h-[clamp(9rem,42svh,26rem)] shrink-0" />
          <h1
            id="hero-title"
            className="font-display max-w-[12ch] text-5xl text-balance text-cream sm:text-7xl lg:text-[8.5rem]"
          >
            El Caribe que hizo a Costa Rica
          </h1>
          <HalfRing side="left" className="h-[clamp(9rem,42svh,26rem)] shrink-0" />
        </div>
        <p className="mt-10 max-w-[40ch] text-base leading-snug font-medium text-pretty md:text-lg">
          Un archivo vivo de Puerto LimÃ³n: su gente afrocaribeÃ±a, el tren, el puerto, la cocina y
          el criollo limonense que todavÃ­a se habla en sus calles.
        </p>
        <Button href="#historia" className="mt-6">
          Explorar la historia
        </Button>
      </div>
    </section>
  );
}
