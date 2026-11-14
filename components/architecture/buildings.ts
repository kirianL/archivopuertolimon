import type { StaticImageData } from "next/image";
import imgCorreos from "@/public/Limón - images/CorreosDeCostaRica.png";
import imgEpiscopal from "@/public/Limón - images/CasaEpiscopal.png";
import imgCultura from "@/public/Limón - images/Casa de la Cultura.png";
import imgBlackStar from "@/public/Limón - images/BlackStarLine.png";
import imgPalacio from "@/public/Limón - images/PalacioMunicipal.png";
import imgParque from "@/public/Limón - images/ParqueVargas.png";
import imgPortuaria from "@/public/Limón - images/AutoridadPortuaria.png";
import imgDomino from "@/public/Limón - images/CasaDomino.png";
import imgEscuela from "@/public/Limón - images/EscuelaTomasGuardia.png";
import imgPension from "@/public/Limón - images/PensionCostaRica.png";
import imgBigBoy from "@/public/Limón - images/BigBoy.png";
import imgBautista from "@/public/Limón - images/CasaMisioneraBautista.png";

export type Building = {
  id: string;
  name: string;
  year: string;
  style: string;
  summary: string;
  image: StaticImageData;
};

export const buildings: Building[] = [
  {
    id: "correos",
    name: "Edificio de Correos y Telégrafos",
    year: "1911",
    style: "Ecléctico",
    summary:
      "Fachada simétrica con balcones y relieves de locomotoras y barcos, emblemas del ferrocarril y del comercio marítimo que impulsaron la ciudad a inicios del siglo XX.",
    image: imgCorreos,
  },
  {
    id: "parque-vargas",
    name: "Parque Vargas y Quiosco",
    year: "1895",
    style: "Victoriano",
    summary:
      "Espacio público frente al mar Caribe, célebre por su quiosco victoriano y sus palmas reales. Punto de encuentro social, musical y festivo de Limón desde finales del siglo XIX.",
    image: imgParque,
  },
  {
    id: "black-star-line",
    name: "Black Star Line / Liberty Hall",
    year: "1922",
    style: "Caribeño tradicional",
    summary:
      "Antigua sede de la UNIA fundada por Marcus Garvey y corazón comunitario afrocaribeño. Tras el incendio de 2016, permanece como símbolo de organización y derechos civiles.",
    image: imgBlackStar,
  },
  {
    id: "casa-cultura",
    name: "Casa de la Cultura",
    year: "1938",
    style: "Art Déco",
    summary:
      "Nació como mercado de carnes y en los años 60 albergó el recordado bar El Oasis. Desde 1985 es Casa de la Cultura y escenario de la vida artística limonense.",
    image: imgCultura,
  },
  {
    id: "palacio-municipal",
    name: "Palacio Municipal",
    year: "1942",
    style: "Neoclásico",
    summary:
      "Edificio institucional de planta en U cuya entrada principal resguarda la estatua de Pablo Presbere, líder indígena bribri y símbolo de resistencia anticolonial.",
    image: imgPalacio,
  },
  {
    id: "autoridad-portuaria",
    name: "Autoridad Portuaria",
    year: "1930",
    style: "Afrocaribeño funcional",
    summary:
      "Diseñado por César Rivaflecha con vigas de madera, ventilación cruzada y amplios balcones que sintetizan la arquitectura urbana del auge portuario.",
    image: imgPortuaria,
  },
  {
    id: "pension-costa-rica",
    name: "Pensión Costa Rica",
    year: "1905",
    style: "Ecléctico / Neoclásico",
    summary:
      "Atribuida a César Rivaflecha Zavala, combina simetría neoclásica con carpintería y balcones antillanos propios del paisaje urbano de principios del siglo XX.",
    image: imgPension,
  },
  {
    id: "casa-episcopal",
    name: "Casa Episcopal",
    year: "1940",
    style: "Neocolonial",
    summary:
      "Sede de la Diócesis de Limón desde 1994. Su arquitectura reinterpreta los corredores y arcos tradicionales adaptados a la brisa y lluvias del Caribe.",
    image: imgEpiscopal,
  },
  {
    id: "casa-bautista",
    name: "Casa Misionera Bautista",
    year: "1890",
    style: "Victoriano caribeño",
    summary:
      "Construida a fines del siglo XIX como residencia de misioneros bautistas junto a la comunidad afrocaribeña, con corredores altos pensados para el clima tropical.",
    image: imgBautista,
  },
  {
    id: "escuela-tomas-guardia",
    name: "Escuela General Tomás Guardia",
    year: "1940",
    style: "Racionalista escolar",
    summary:
      "Heredera de la primera institución educativa formal de Limón, su edificio de los años 40 representa la arquitectura escolar moderna de mediados del siglo XX.",
    image: imgEscuela,
  },
  {
    id: "big-boy",
    name: "Estadio de Béisbol Big Boy",
    year: "1897",
    style: "Funcional deportivo",
    summary:
      "Cuna del béisbol limonense impulsado por trabajadores ferroviarios y bananeros. Bautizado en honor al legendario jugador local Bancroft “Big Boy” Scott.",
    image: imgBigBoy,
  },
  {
    id: "casa-domino",
    name: "Casa del Dominó",
    year: "1960",
    style: "Espacio social tradicional",
    summary:
      "Punto de reunión de ferroviarios y estibadores desde los años 60, donde el dominó se convirtió en patrimonio vivo de conversación e identidad limonense.",
    image: imgDomino,
  },
];

export const architectureStats = [
  {
    value: "12",
    unit: "hitos",
    dotClass: "bg-moss",
    description:
      "Inmuebles y espacios patrimoniales preservados en el corazón histórico del puerto.",
  },
  {
    value: "1,5",
    unit: "km",
    dotClass: "bg-sky",
    description:
      "Ruta caminable continua que conecta los monumentos frente a la costa caribeña.",
  },
  {
    value: "1890",
    unit: "",
    dotClass: "bg-ember",
    description:
      "Año de las estructuras más antiguas aún en pie desde el auge ferroviario.",
  },
  {
    value: "6",
    unit: "estilos",
    dotClass: "bg-sand",
    description:
      "Del victoriano antillano y afrocaribeño en madera al neoclásico y art déco.",
  },
];
