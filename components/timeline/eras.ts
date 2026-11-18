import type { StaticImageData } from "next/image";
import img1890 from "@/public/Limón - images/1890.png";
import img1906 from "@/public/Limón - images/1906-limon.png";
import imgBlackStar from "@/public/Limón - images/BlackStarLine.png";
import imgCarnaval from "@/public/Limón - images/Carnaval.png";
import img1854 from "@/public/Limón - images/patrimonio/isla-quiribri-arrecife.jpg";
import imgParque from "@/public/Limón - images/patrimonio/parque-vargas-quiosco.jpg";

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
    image: img1906,
    alt: "Edificio histórico de la United Fruit Company en Puerto Limón",
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
    image: imgParque,
    alt: "Quiosco histórico del Parque Balvanero Vargas Molina en Puerto Limón",
  },
  {
    years: "2000–hoy",
    period: "Siglo XXI",
    title: "Patrimonio cultural vivo",
    summary:
      "Con el Estadio Big Boy declarado patrimonio (2002) y el Calipso Limonense como Patrimonio Cultural Inmaterial (2012), Limón proyecta sus dominios culturales, su cine y su gastronomía al mundo.",
    image: imgCarnaval,
    alt: "Sonrisa y vestimenta tradicional afrocaribeña en Puerto Limón",
  },
];
