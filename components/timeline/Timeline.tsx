import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { BrushStroke } from "@/components/ui/Shapes";
import Chronology from "./Chronology";
import { eras } from "./eras";

function Intro() {
  const [first, second, third] = eras;

  return (
    <section id="historia" aria-labelledby="intro-title" className="overflow-hidden bg-cream py-14 text-ink md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:gap-14 lg:grid-cols-[1.1fr_1fr]">
        {/* Collage; paint swipes peek out from behind the photo corners */}
        <div className="relative isolate mx-auto grid w-full max-w-sm grid-cols-[2fr_3fr] gap-2 md:max-w-none md:gap-3">
          <BrushStroke className="absolute -top-5 right-[8%] -z-10 h-16 w-[55%] rotate-[-4deg] text-sand" />
          <BrushStroke className="absolute bottom-[12%] -left-8 -z-10 h-16 w-[50%] rotate-[-8deg] text-moss" />
          <BrushStroke className="absolute -right-6 bottom-[30%] -z-10 h-12 w-[35%] rotate-[6deg] text-ember/80" />
          <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-xl">
            <Image src={first.image} alt={first.alt} fill placeholder="blur" sizes="25vw" className="object-cover" />
          </div>
          <div className="grid gap-2 md:gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={second.image} alt={second.alt} fill placeholder="blur" sizes="35vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] w-4/5 overflow-hidden rounded-xl">
              <Image src={third.image} alt={third.alt} fill placeholder="blur" sizes="30vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="lg:text-right">
          <h2 id="intro-title" className="font-display isolate text-5xl text-balance md:text-7xl">
            Un puerto que se hizo <Highlight color="text-sand">a pulso</Highlight>
          </h2>
          <p className="mt-4 leading-relaxed text-pretty text-ink/80 md:mt-6 lg:ml-auto lg:max-w-[46ch]">
            Limón no nació de un decreto: lo levantaron el café, el tren y las manos de miles de
            familias que cruzaron el Caribe. Esta es su historia, época por época.
          </p>
          <Button href="#cronologia" variant="dark" className="mt-8">
            Ver la cronología
          </Button>
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
