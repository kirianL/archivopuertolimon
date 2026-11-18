import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke } from "@/components/ui/Shapes";
import imgBahiaAerea from "@/public/Limón - images/patrimonio/bahia-costa-limon-aerea.jpg";
import imgPlano1905 from "@/public/Limón - images/patrimonio/plano-general-limon-1905-peyroutet.jpg";
import imgPlano1929 from "@/public/Limón - images/patrimonio/plano-ciudad-limon-1929-ufc.jpg";
import Chronology from "./Chronology";

const studyZones = [
  {
    name: "Casco Histórico",
    year: "1870 · Plano 1905",
    detail:
      "Trazado en cuadrícula por el Ing. Francisco Kurtze (1870) y Ángel Miguel Velásquez, desde los talleres del ferrocarril en la avenida 7 hasta el conjunto portuario y el tajamar.",
    dotClass: "bg-ember",
  },
  {
    name: "Jamaica Town",
    year: "Década de 1880",
    detail:
      "Primer ensanche surgido en tierras de la Quinta Keith-Wilson, habitado por familias jamaiquinas junto a los talleres ferroviarios entre el Parque Asis Esna y la avenida 7.",
    dotClass: "bg-sky",
  },
  {
    name: "Zona Americana",
    year: "Plano UFC 1929",
    detail:
      "Sector norte (actual Hospital Tony Facio), entre la línea costera y la vía férrea de Moín, donde se levantó el barrio residencial para funcionarios de la United Fruit Company.",
    dotClass: "bg-sand",
  },
] as const;

function Intro() {
  return (
    <section id="historia" aria-labelledby="intro-title" className="overflow-hidden bg-cream py-14 text-ink md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 md:gap-14 lg:grid-cols-[1.1fr_1fr]">
          {/* Collage con fotografía aérea y los planos históricos de 1905 y 1929 del Archivo Nacional */}
          <div className="relative isolate mx-auto grid w-full max-w-sm grid-cols-[2fr_3fr] gap-2 md:max-w-none md:gap-3">
            <BrushStroke className="absolute -top-5 right-[8%] -z-10 h-16 w-[55%] rotate-[-4deg] text-sand" />
            <BrushStroke className="absolute bottom-[12%] -left-8 -z-10 h-16 w-[50%] rotate-[-8deg] text-moss" />
            <BrushStroke className="absolute -right-6 bottom-[30%] -z-10 h-12 w-[35%] rotate-[6deg] text-ember/80" />
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-xl bg-ink">
              <Image
                src={imgPlano1905}
                alt="Plano General de la Ciudad de Limón de 1905 por el Ing. H. Peyroutet (Archivo Nacional de Costa Rica)"
                fill
                placeholder="blur"
                sizes="25vw"
                className="object-cover"
              />
            </div>
            <div className="grid gap-2 md:gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink">
                <Image
                  src={imgBahiaAerea}
                  alt="Vista aérea de la bahía y costa de Puerto Limón"
                  fill
                  placeholder="blur"
                  sizes="35vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] w-4/5 overflow-hidden rounded-xl bg-ink">
                <Image
                  src={imgPlano1929}
                  alt="Plano de la Ciudad de Limón de 1929 de la United Fruit Company (Archivo Nacional de Costa Rica)"
                  fill
                  placeholder="blur"
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:text-right">
            <h2 id="intro-title" className="font-hero isolate text-4xl leading-[1.08] font-normal text-balance sm:text-5xl md:text-6xl">
              Un puerto que se hizo <Highlight color="text-sand">a pulso</Highlight>
            </h2>
            <p className="mt-4 leading-relaxed text-pretty text-ink/80 md:mt-6 lg:ml-auto lg:max-w-[48ch]">
              Del primer trazado urbano del ingeniero Francisco Kurtze en 1870 al
              primer ensanche afroantillano de Jamaica Town en 1880, Limón
              articuló tres tejidos históricos frente al mar Caribe.
            </p>
            <Button href="#cronologia" variant="dark" className="mt-7">
              Ver la cronología
            </Button>
          </div>
        </div>

        {/* Las 3 zonas históricas de estudio del TEC (Casco Histórico, Jamaica Town y Zona Americana) */}
        <div className="mt-12 grid gap-6 border-t border-ink/15 pt-8 md:mt-16 md:grid-cols-3 md:pt-10">
          {studyZones.map((zone) => (
            <article key={zone.name} className="relative isolate pl-3">
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-1 left-0 -z-10 size-6 rounded-full ${zone.dotClass}`}
              />
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl text-ink sm:text-3xl">
                  {zone.name}
                </h3>
                <span className="text-xs font-bold tracking-wider text-moss uppercase">
                  {zone.year}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-pretty text-ink/75 sm:text-sm">
                {zone.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Timeline() {
  return (
    <>
      <Intro />
      <Chronology />
    </>
  );
}
