import type { StaticImageData } from "next/image";
import img1854 from "@/public/Limón - images/patrimonio/isla-quiribri-arrecife.jpg";
import img1890 from "@/public/Limón - images/1890.png";
import img1905Plano from "@/public/Limón - images/patrimonio/plano-general-limon-1905-peyroutet.jpg";
import imgBlackStar from "@/public/Limón - images/BlackStarLine.png";
import imgMapa1967 from "@/public/Limón - images/patrimonio/mapa-pictorico-limon-1967.jpg";
import imgParadeGala from "@/public/Limón - images/patrimonio/grand-parade-trajes-limon.jpg";

export type Era = {
  years: string;
  period: string;
  title: string;
  summary: string;
  image: StaticImageData;
  alt: string;
};

export const eras: Era[] = [
  {
    years: "1502–1870",
    period: "Quiribrí y trazo fundacional",
    title: "De Quiribrí al puerto",
    summary:
      "Frente a la isla Quiribrí (visitada en 1502), Limón surge en 1854 como salida del café. En 1870 el Ing. Francisco Kurtze y Ángel Miguel Velásquez trazan sus primeros cuadrantes frente al mar.",
    image: img1854,
    alt: "Arrecife coralino de la Isla Quiribrí (Uvita) frente a la costa de Puerto Limón",
  },
  {
    years: "1871–1890",
    period: "Ferrocarril y Jamaica Town",
    title: "El tren y Jamaica Town",
    summary:
      "El ferrocarril al Atlántico atrae a miles de trabajadores jamaiquinos y antillanos. Desde 1880 nace el primer ensanche en la Quinta Keith-Wilson, conocido como Jamaica Town.",
    image: img1890,
    alt: "Construcción del ferrocarril al Atlántico y primeros barrios de Limón",
  },
  {
    years: "1895–1929",
    period: "Casco histórico y enclave",
    title: "Planos de 1905 y Zona Americana",
    summary:
      "El Plano General de 1905 del Ing. H. Peyroutet consolida el casco histórico junto al Parque Vargas (1895), mientras la United Fruit Company levanta sus edificios (1903) y la Zona Americana (1929).",
    image: img1905Plano,
    alt: "Plano General de la Ciudad de Limón de 1905 por el ingeniero H. Peyroutet",
  },
  {
    years: "1912–1948",
    period: "Prensa, UNIA y resistencia",
    title: "Voz escrita y Liberty Hall",
    summary:
      "Florece la prensa en inglés liderada por Samuel Charles Nation (1912–1942), se levanta el Black Star Line (1922) como sede de la UNIA y en 1948 nace Radio Casino, La Reina del Caribe.",
    image: imgBlackStar,
    alt: "Edificio histórico del Black Star Line, sede de la UNIA en Puerto Limón",
  },
  {
    years: "1949–1999",
    period: "Ciudadanía y declaratorias",
    title: "Patrimonio y reconocimiento",
    summary:
      "Tras la ciudadanía plena de 1949, el Estado declara Monumento Nacional la Isla Quiribrí (1985) y protege como patrimonio histórico el Parque Vargas (1995), Pasaje Cristal y los edificios de la UFC (1999).",
    image: imgMapa1967,
    alt: "Mapa pictórico del centenario de la apertura de la bahía de Limón (1867–1967, IGN)",
  },
  {
    years: "2000–hoy",
    period: "Siglo XXI",
    title: "Patrimonio cultural vivo",
    summary:
      "Con el Estadio Big Boy declarado patrimonio (2002) y el Calipso Limonense como Patrimonio Cultural Inmaterial (2012), Limón proyecta sus dominios culturales, su cine y su gastronomía al mundo.",
    image: imgParadeGala,
    alt: "Trajes tradicionales en el Grand Parade de Gala de Puerto Limón",
  },
];
