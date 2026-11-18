import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke } from "@/components/ui/Shapes";
import imgBahiaAerea from "@/public/Limón - images/patrimonio/bahia-costa-limon-aerea.jpg";
import imgPlano1905 from "@/public/Limón - images/patrimonio/plano-general-limon-1905-peyroutet.jpg";
import imgPlano1929 from "@/public/Limón - images/patrimonio/plano-ciudad-limon-1929-ufc.jpg";
import Chronology from "./Chronology";
import StudyZone from "./StudyZone";

const historicalMilestones = [
  {
    name: "Decreto Portuario",
    year: "1852 · 1865",
    detail:
      "Juan Rafael Mora Porras habilita Moín y Limón como puertos del Caribe (1852) y en 1865 se decreta Limón como puerto principal de la República.",
    dotClass: "bg-ember",
  },
  {
    name: "Trazado y Tajamar",
    year: "1870 · 1905",
    detail:
      "Salvador Lara, Francisco Kurtze y Ángel Miguel Velásquez diseñan la cuadrícula con calles de 20 m de ancho, tajamar y relleno sanitario sobre el arrecife.",
    dotClass: "bg-sky",
  },
  {
    name: "Ferrocarril y Enclave",
    year: "1890 · 1929",
    detail:
      "Con el ferrocarril al Atlántico (1890) y la United Fruit Company (1899), el puerto articula su centro comercial con Jamaica Town y la Zona Americana.",
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
            <div className="mt-7 flex flex-wrap gap-3 lg:justify-end">
              <Button href="#zona-estudio" variant="dark">
                Explorar Zona de Estudio
              </Button>
              <Button href="#cronologia" variant="light">
                Ver la cronología
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-ink/15 pt-8 md:mt-16 md:grid-cols-3 md:pt-10">
          {historicalMilestones.map((zone) => (
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
      <StudyZone />
      <Chronology />
    </>
  );
}
