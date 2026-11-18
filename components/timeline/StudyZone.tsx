"use client";

import Image from "next/image";
import { useState } from "react";
import imgZonaEstudioCompleta from "@/public/Limón - images/patrimonio/zona-de-estudio-mapa-completo.jpg";
import { STUDY_ZONE_PATHS, STUDY_ZONE_VIEWBOX } from "./studyZonePaths";

type ZoneId = "jamaica-town" | "casco-historico" | "zona-americana";

const ZONES: {
  id: ZoneId;
  title: string;
  titleColor: string;
  strokeHex: string;
  fillActive: string;
  description: string;
}[] = [
  {
    id: "jamaica-town",
    title: "JAMAICA TOWN",
    titleColor: "text-[#21A5A5]",
    strokeHex: "#0E6B6B",
    fillActive: "rgba(33, 165, 165, 0.22)",
    description:
      "Zona de la ciudad que en su origen tuvo una ocupación no planificada, en tierras cercanas al centro urbano, como parte de la llamada «Quinta Keith-Wilson». Se conoce con este nombre desde la década de 1880 por la numerosa población jamaiquina que ocupó estas tierras. Limita al norte con el Parque Asis Esna y el Colegio Diurno de Limón; al sur, con los talleres del ferrocarril, a lo largo de la avenida 7; al este, con el paseo Dr. Rubén Umaña Chavarría que lo articula con la Zona Americana; y por último, al oeste, con un trazado irregular producto de zonas urbanas consolidadas en diferentes períodos, abarcando el final de la calle 9, avenida 7 y partes de las calles 6 y 7. Para esta última delimitación, se utilizó el Mapa pictórico de la ciudad de Limón preparado por el Instituto Geográfico Nacional, a solicitud de la Municipalidad en 1967.",
  },
  {
    id: "casco-historico",
    title: "CASCO HISTÓRICO",
    titleColor: "text-[#F37360]",
    strokeHex: "#B83B28",
    fillActive: "rgba(243, 115, 96, 0.22)",
    description:
      "Se considera como la trama urbana que surge con la conformación de los primeros asentamientos formales y del lineamiento de los cuadrantes, calles y divisiones de lotes realizados por el Ing. Ángel Miguel Velásquez; con base en un primer trazado urbano de la ciudad de Limón que realizó el Ing. Francisco Kurtze en 1870. Esta zona contempla como límites, al norte, los elementos urbanos que integran el conjunto de los talleres del ferrocarril; es decir, la avenida 7 en conjunto con la calle Tomás Guardia hasta la avenida 8 y el paseo Dr. Rubén Umaña Chavarría. El punto más al sur es el conjunto portuario, donde se localizaba la antigua estación de ferrocarril. Al este, toda la línea costera delineada por el tajamar y al oeste, la calle 9, la cual marca el inicio del barrio Siglo XXI que se desarrolló posteriormente. Esta delimitación se refleja en el Plano General de la Ciudad de Limón de 1905, del ingeniero H. Peyroutet.",
  },
  {
    id: "zona-americana",
    title: "ZONA AMERICANA",
    titleColor: "text-[#D9A726]",
    strokeHex: "#8F7B0B",
    fillActive: "rgba(223, 216, 93, 0.26)",
    description:
      "Se ubicó al norte de la ciudad de Limón en el área que hoy ocupan las instalaciones del Hospital Tony Facio; esta zona se encuentra entre la línea costera y el paseo Dr. Rubén Umaña Chavarría, vía sobre la cual antiguamente transcurría el ferrocarril procedente de Moín. En esta zona se construyó el barrio residencial y equipamientos urbanos destinados a funcionarios de la United Fruit Company, según el Plano de la Ciudad de Limón de 1929, perteneciente a esta compañía.",
  },
];

export default function StudyZone() {
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null);

  return (
    <section
      id="zona-estudio"
      aria-labelledby="study-zone-title"
      className="relative flex flex-col justify-between overflow-hidden bg-[#FDFBF7] text-[#263459] lg:h-svh lg:max-h-svh"
    >
      {/* Barra tricolor superior original */}
      <div aria-hidden="true" className="grid h-2.5 w-full shrink-0 grid-cols-3">
        <div className="bg-[#F37360]" />
        <div className="bg-[#21A5A5]" />
        <div className="bg-[#FABE66]" />
      </div>

      {/* Contenido en una sola pantalla */}
      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 items-center gap-8 px-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 lg:py-4">
        {/* Columna tipográfica minimalista */}
        <div
          className="flex flex-col justify-center"
          onMouseLeave={() => setActiveZone(null)}
        >
          <h2
            id="study-zone-title"
            className="font-hero text-4xl leading-none font-normal tracking-wide text-[#F37360] sm:text-5xl"
          >
            ZONA DE ESTUDIO
          </h2>

          <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
            {ZONES.map((z) => {
              const isDimmed = activeZone !== null && activeZone !== z.id;
              return (
                <article
                  key={z.id}
                  onMouseEnter={() => setActiveZone(z.id)}
                  onClick={() =>
                    setActiveZone((prev) => (prev === z.id ? null : z.id))
                  }
                  className={`cursor-pointer border-t border-[#263459]/12 pt-3.5 transition-opacity duration-200 first:border-t-0 first:pt-0 ${
                    isDimmed ? "opacity-40" : "opacity-100"
                  }`}
                >
                  <h3
                    className={`font-hero text-xl tracking-wide sm:text-2xl ${z.titleColor}`}
                  >
                    {z.title}
                  </h3>
                  <p className="mt-1 text-justify text-[0.74rem] leading-[1.52] text-[#263459]/90 sm:text-xs sm:leading-[1.55]">
                    {z.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Columna del mapa limpia, ajustada al alto de la sección */}
        <div
          className="relative mx-auto flex h-full min-h-0 w-full items-center justify-center"
          onMouseLeave={() => setActiveZone(null)}
        >
          <div className="relative max-h-[82svh] w-auto overflow-hidden rounded-lg">
            <Image
              src={imgZonaEstudioCompleta}
              alt="Mapa de la Zona de Estudio de Puerto Limón: Jamaica Town, Casco Histórico y Zona Americana"
              placeholder="blur"
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="block h-auto max-h-[82svh] w-auto object-contain select-none"
            />

            {/* Polígonos vectoriales limpios sin etiquetas ni puntos flotantes */}
            <svg
              viewBox={STUDY_ZONE_VIEWBOX}
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d={STUDY_ZONE_PATHS.sigloXXI}
                onMouseEnter={() => setActiveZone("casco-historico")}
                onClick={() =>
                  setActiveZone((prev) =>
                    prev === "casco-historico" ? null : "casco-historico"
                  )
                }
                className="cursor-pointer transition-all duration-200"
                fill={
                  activeZone === "casco-historico"
                    ? "rgba(243, 115, 96, 0.2)"
                    : activeZone !== null
                      ? "rgba(255, 255, 255, 0.42)"
                      : "transparent"
                }
                stroke={
                  activeZone === "casco-historico" ? "#B83B28" : "transparent"
                }
                strokeWidth={activeZone === "casco-historico" ? 4 : 0}
              />

              <path
                d={STUDY_ZONE_PATHS.cascoHistorico}
                onMouseEnter={() => setActiveZone("casco-historico")}
                onClick={() =>
                  setActiveZone((prev) =>
                    prev === "casco-historico" ? null : "casco-historico"
                  )
                }
                className="cursor-pointer transition-all duration-200"
                fill={
                  activeZone === "casco-historico"
                    ? "rgba(243, 115, 96, 0.2)"
                    : activeZone !== null
                      ? "rgba(255, 255, 255, 0.42)"
                      : "transparent"
                }
                stroke={
                  activeZone === "casco-historico" ? "#B83B28" : "transparent"
                }
                strokeWidth={activeZone === "casco-historico" ? 5 : 0}
              />

              <path
                d={STUDY_ZONE_PATHS.zonaAmericana}
                onMouseEnter={() => setActiveZone("zona-americana")}
                onClick={() =>
                  setActiveZone((prev) =>
                    prev === "zona-americana" ? null : "zona-americana"
                  )
                }
                className="cursor-pointer transition-all duration-200"
                fill={
                  activeZone === "zona-americana"
                    ? "rgba(223, 216, 93, 0.25)"
                    : activeZone !== null
                      ? "rgba(255, 255, 255, 0.42)"
                      : "transparent"
                }
                stroke={
                  activeZone === "zona-americana" ? "#8F7B0B" : "transparent"
                }
                strokeWidth={activeZone === "zona-americana" ? 5 : 0}
              />

              <path
                d={STUDY_ZONE_PATHS.jamaicaTown}
                onMouseEnter={() => setActiveZone("jamaica-town")}
                onClick={() =>
                  setActiveZone((prev) =>
                    prev === "jamaica-town" ? null : "jamaica-town"
                  )
                }
                className="cursor-pointer transition-all duration-200"
                fill={
                  activeZone === "jamaica-town"
                    ? "rgba(33, 165, 165, 0.22)"
                    : activeZone !== null
                      ? "rgba(255, 255, 255, 0.42)"
                      : "transparent"
                }
                stroke={
                  activeZone === "jamaica-town" ? "#0E6B6B" : "transparent"
                }
                strokeWidth={activeZone === "jamaica-town" ? 5 : 0}
              />

              {/* Números originales de la escala gráfica (0, 100, 500) */}
              <g
                fill="#2C3963"
                fontSize="24"
                fontWeight="600"
                className="pointer-events-none select-none"
              >
                <text x="175" y="2010">
                  0
                </text>
                <text x="238" y="2010">
                  100
                </text>
                <text x="528" y="2010">
                  500
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Barra tricolor inferior original */}
      <div aria-hidden="true" className="grid h-2.5 w-full shrink-0 grid-cols-3">
        <div className="bg-[#F37360]" />
        <div className="bg-[#21A5A5]" />
        <div className="bg-[#FABE66]" />
      </div>
    </section>
  );
}
