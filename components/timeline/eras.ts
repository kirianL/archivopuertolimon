import type { StaticImageData } from "next/image";
import img1854 from "@/public/Limón - images/1854.png";
import img1890 from "@/public/Limón - images/1890.png";
import img1906 from "@/public/Limón - images/1906-limon.png";
import imgBlackStar from "@/public/Limón - images/BlackStarLine.png";
import imgCommunity from "@/public/Limón - images/Comunidad-vidacotidiana.png";
import imgCarnival from "@/public/Limón - images/Carnaval.png";

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
    years: "1854",
    period: "Mediados del s. XIX",
    title: "Nace el puerto",
    summary:
      "Limón surge como salida estratégica del café hacia Europa. En 1870 se traza como ciudad, en cuadrícula, mirando al mar.",
    image: img1854,
    alt: "Vista antigua del puerto de Limón a mediados del siglo XIX",
  },
  {
    years: "1871–1890",
    period: "Finales del s. XIX",
    title: "El tren al Atlántico",
    summary:
      "El ferrocarril une el Valle Central con el Caribe y trae a miles de trabajadores de Jamaica y otras islas. Con ellos llega una nueva identidad.",
    image: img1890,
    alt: "Construcción del ferrocarril al Atlántico",
  },
  {
    years: "1900–1930",
    period: "Inicios del s. XX",
    title: "El reino del banano",
    summary:
      "La United Fruit Company define el urbanismo de la ciudad y consolida un Limón multiétnico, bilingüe y abierto al mundo.",
    image: img1906,
    alt: "Puerto Limón en 1906, durante el auge bananero",
  },
  {
    years: "1900–1949",
    period: "Primera mitad del s. XX",
    title: "Exclusión y resistencia",
    summary:
      "Frente a leyes que limitaban su movilidad, la comunidad afrocaribeña levantó sus propias escuelas en inglés, iglesias y organizaciones.",
    image: imgBlackStar,
    alt: "Edificio de la Black Star Line, sede de la UNIA en Limón",
  },
  {
    years: "1950–2000",
    period: "Segunda mitad del s. XX",
    title: "Ciudadanía y sacudidas",
    summary:
      "La Constitución de 1949 reconoce la ciudadanía plena. Llegan décadas de auge y crisis, y el terremoto de 1991 que marcó a toda la provincia.",
    image: imgCommunity,
    alt: "Vida cotidiana en las calles de Limón",
  },
  {
    years: "2000–hoy",
    period: "Siglo XXI",
    title: "Limón hoy",
    summary:
      "Un crisol caribeño que celebra su historia: calypso, carnaval, rice and beans y un orgullo que se escucha en tres idiomas.",
    image: imgCarnival,
    alt: "Desfile del Carnaval de Limón",
  },
];
