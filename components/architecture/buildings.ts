import type { StaticImageData } from "next/image";
import imgCorreos from "@/public/Limón - images/CorreosDeCostaRica.png";
import imgEpiscopal from "@/public/Limón - images/CasaEpiscopal.png";
import imgCultura from "@/public/Limón - images/Casa de la Cultura.png";
import imgBlackStar from "@/public/Limón - images/BlackStarLine.png";
import imgPalacio from "@/public/Limón - images/PalacioMunicipal.png";
import imgParque from "@/public/Limón - images/patrimonio/parque-vargas-quiosco.jpg";
import imgPortuaria from "@/public/Limón - images/AutoridadPortuaria.png";
import imgDomino from "@/public/Limón - images/patrimonio/casa-del-domino-cole-scarlett.jpg";
import imgEscuela from "@/public/Limón - images/EscuelaTomasGuardia.png";
import imgPension from "@/public/Limón - images/PensionCostaRica.png";
import imgBigBoy from "@/public/Limón - images/BigBoy.png";
import imgBautista from "@/public/Limón - images/patrimonio/arquitectura-caribena-madera-1.jpg";
import imgUfcEdificios from "@/public/Limón - images/patrimonio/ufc-exterior.jpg";
import imgPasajeCristal from "@/public/Limón - images/patrimonio/pasaje-cristal-pintores-limon.jpg";

export type AccentColor = "moss" | "sky" | "ember" | "sand";

export type Building = {
  id: string;
  name: string;
  year: string;
  style: string;
  summary: string;
  history: string[];
  highlights: { label: string; value: string }[];
  location: string;
  accent: AccentColor;
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
    history: [
      "Levantado a inicios del siglo XX en el corazón comercial del puerto, el Edificio de Correos y Telégrafos consolidó las comunicaciones de Limón con Europa, Norteamérica y el Valle Central. Su fachada ecléctica incorpora molduras de locomotoras y embarcaciones, un testimonio tallado del auge ferroviario y naviero que transformó la provincia.",
      "Más allá de su papel postal, su arquitectura simétrica, sus balcones perimetrales y amplios ventanales responden al clima húmedo del Caribe, permitiendo circulación constante de brisa marina. Hoy continúa siendo una de las postales más reconocibles del casco histórico limonense.",
    ],
    highlights: [
      { label: "Año de obra", value: "1911" },
      { label: "Estilo", value: "Ecléctico portuario" },
      { label: "Uso histórico", value: "Correos y telégrafo" },
    ],
    location: "Avenida 2, frente al Parque Vargas",
    accent: "sand",
    image: imgCorreos,
  },
  {
    id: "parque-vargas",
    name: "Parque Balvanero Vargas Molina",
    year: "1895",
    style: "Ecléctico, Art Nouveau y Neoclásico",
    summary:
      "Diseñado en 1895 por el francés Andrés Bonife en 16 800 m² donados por la United Fruit Company, con árboles traídos por capitanes desde Cuba y Jamaica y quiosco de César Rivaflecha.",
    history: [
      "Diseñado en 1895 por el francés Andrés Bonife y construido en un terreno de 16 800 m² donado por la United Fruit Company durante la gobernación de Balvanero Vargas. Sus especies tropicales —principalmente laureles de la India y crotones— fueron contribuciones de capitanes de barcos que trajeron árboles desde Cuba y Jamaica.",
      "Su quiosco de estilo ecléctico con influencia art nouveau y neoclásica fue construido por el arquitecto César Rivaflecha, quien incorporó decoraciones vegetales y animales. Bautizado en 1905 en honor al gobernador Balvanero Vargas, recibió la declaratoria de interés histórico arquitectónico el 26 de junio de 1995 según La Gaceta N° 121 (MCJ, 1995).",
    ],
    highlights: [
      { label: "Diseño", value: "1895 (Andrés Bonife)" },
      { label: "Quiosco", value: "Arq. César Rivaflecha" },
      { label: "Declaratoria", value: "La Gaceta N° 121 (1995)" },
    ],
    location: "Frente al malecón, calles 1 y 2 (16 800 m²)",
    accent: "sky",
    image: imgParque,
  },
  {
    id: "edificios-ufc",
    name: "Antiguos Edificios de la UFC",
    year: "1903",
    style: "Industrial portuario (Boston)",
    summary:
      "Construidos entre 1903 y 1904 al costado oeste del Parque Vargas con tipología elaborada en Boston: estructura metálica, ladrillo a tizón y soga, bahareque francés y monitor de ventilación.",
    history: [
      "Declarados patrimonio histórico arquitectónico según La Gaceta N° 34 del 18 de febrero de 1999, los antiguos edificios de la United Fruit Company fueron construidos entre 1903 y 1904 a un costado del Parque Vargas con una tipología arquitectónica elaborada por la compañía en Boston, Estados Unidos.",
      "El edificio norte se utilizó para el almacenaje de la producción bananera y el edificio sur albergó las oficinas administrativas (MCJ, 1999). Combinan estructura metálica principal, paredes exteriores de ladrillo a tizón y soga, interiores en bahareque francés o madera, balcones y un monitor en cubierta que facilita la ventilación de los mezanines. Hoy el segundo nivel del edificio sur acoge talleres, artesanías y esculturas.",
    ],
    highlights: [
      { label: "Construcción", value: "1903–1904" },
      { label: "Tipología", value: "UFC Boston, ladrillo y metal" },
      { label: "Declaratoria", value: "La Gaceta N° 34 (1999)" },
    ],
    location: "Costado oeste del Parque Balvanero Vargas",
    accent: "ember",
    image: imgUfcEdificios,
  },
  {
    id: "pasaje-cristal",
    name: "Edificio Pasaje Cristal",
    year: "1908",
    style: "Industrial comercial",
    summary:
      "Corredor arquitectónico peatonal en ladrillo y armadura metálica construido en la primera década del siglo XX por el Arq. César Rivaflecha Zavala; hoy galería viva de pintores limonenses.",
    history: [
      "Declarado patrimonio histórico arquitectónico de Costa Rica desde el 25 de enero de 1999 (La Gaceta N° 16), el Edificio Pasaje Cristal fue construido en la primera década del siglo XX por el arquitecto César Rivaflecha Zavala con tipología industrial en ladrillo y armadura metálica.",
      "Además de conservar su vocación de corredor comercial peatonal, desde hace varios años funciona como taller y galería donde artistas como Edgar León, William Durán, Germán Mora, Honorio Cabraca y Virginia Araya exhiben pintura sobre costumbres, oficios y paisajes afrocaribeños.",
    ],
    highlights: [
      { label: "Arquitecto", value: "César Rivaflecha Zavala" },
      { label: "Declaratoria", value: "La Gaceta N° 16 (1999)" },
      { label: "Vocación", value: "Corredor y galería de arte" },
    ],
    location: "Casco histórico de Puerto Limón",
    accent: "moss",
    image: imgPasajeCristal,
  },
  {
    id: "black-star-line",
    name: "Black Star Line / Liberty Hall",
    year: "1922",
    style: "Caribeño tradicional",
    summary:
      "Antigua sede de la UNIA fundada por Marcus Garvey y corazón comunitario afrocaribeño. Tras el incendio de 2016, permanece como símbolo de organización y derechos civiles.",
    history: [
      "Inaugurado en 1922, el Liberty Hall fue la sede en Limón de la Universal Negro Improvement Association (UNIA), impulsada por Marcus Garvey durante su visita al Caribe costarricense. En sus dos plantas de madera se celebraban asambleas, veladas musicales, escuelas comunitarias y redes de apoyo mutuo.",
      "El inmueble funcionó como epicentro de identidad, orgullo y organización social de la población afrodescendiente frente a las restricciones laborales y de movilidad de la época. Aunque un incendio en 2016 destruyó su estructura original, el sitio sigue siendo un símbolo vivo de dignidad y memoria.",
    ],
    highlights: [
      { label: "Inauguración", value: "1922" },
      { label: "Estilo", value: "Madera antillana" },
      { label: "Legado", value: "Sede histórica UNIA" },
    ],
    location: "Avenida 5, centro de Puerto Limón",
    accent: "ember",
    image: imgBlackStar,
  },
  {
    id: "casa-cultura",
    name: "Casa de la Cultura",
    year: "1938",
    style: "Art Déco",
    summary:
      "Nació como mercado de carnes y en los años 60 albergó el recordado bar El Oasis. Desde 1985 es Casa de la Cultura y escenario de la vida artística limonense.",
    history: [
      "Construida en 1938 con líneas geométricas propias del art déco tropical, esta edificación comenzó su vida como mercado municipal de carnes y punto de abasto del centro. Con el paso de las décadas se adaptó a la vida nocturna y social del puerto, recordada especialmente por el bar El Oasis en los años sesenta.",
      "En 1985 fue rescatada e inaugurada como Casa de la Cultura de Limón, albergando talleres de danza, pintura, música y archivos comunitarios. Su transformación ejemplifica cómo los espacios cotidianos del puerto se convirtieron en refugios para las artes caribeñas.",
    ],
    highlights: [
      { label: "Construcción", value: "1938" },
      { label: "Estilo", value: "Art Déco tropical" },
      { label: "Uso actual", value: "Centro cultural" },
    ],
    location: "Avenida 2, costado norte del Parque Vargas",
    accent: "moss",
    image: imgCultura,
  },
  {
    id: "palacio-municipal",
    name: "Palacio Municipal",
    year: "1942",
    style: "Neoclásico",
    summary:
      "Edificio institucional de planta en U cuya entrada principal resguarda la estatua de Pablo Presbere, líder indígena bribri y símbolo de resistencia anticolonial.",
    history: [
      "Edificado en 1942 en concreto armado con planta en forma de U, el Palacio Municipal reflejó la consolidación institucional del cantón central de Limón a mediados del siglo XX. Sus proporciones neoclásicas sobrias ordenan la manzana administrativa frente al eje cívico.",
      "En su acceso principal se levanta el monumento a Pablo Presbere, líder indígena bribri de Talamanca que encabezó la resistencia contra el dominio colonial en 1709. La convivencia entre la arquitectura republicana y la figura de Presbere resume la pluralidad histórica de la provincia.",
    ],
    highlights: [
      { label: "Año de obra", value: "1942" },
      { label: "Estilo", value: "Neoclásico institucional" },
      { label: "Símbolo", value: "Monumento a Pablo Presbere" },
    ],
    location: "Avenida 2, entre calles 1 y 3",
    accent: "sky",
    image: imgPalacio,
  },
  {
    id: "autoridad-portuaria",
    name: "Autoridad Portuaria",
    year: "1930",
    style: "Afrocaribeño funcional",
    summary:
      "Diseñado por César Rivaflecha con vigas de madera, ventilación cruzada y amplios balcones que sintetizan la arquitectura urbana del auge portuario.",
    history: [
      "Proyectado en la década de 1930 por el ingeniero y arquitecto César Rivaflecha, este edificio acogió oficinas de la Autoridad Portuaria, el Gobierno Provincial y despachos ligados al movimiento marítimo. Su diseño dialoga directamente con la carpintería antillana y las necesidades técnicas del puerto.",
      "Las vigas vistas, galerías sombreadas y celosías permiten ventilación cruzada natural frente al calor costero. Hasta 1986 centralizó operaciones administrativas portuarias, quedando como referencia del urbanismo limonense de entreguerras.",
    ],
    highlights: [
      { label: "Década", value: "1930" },
      { label: "Arquitecto", value: "César Rivaflecha" },
      { label: "Clima", value: "Ventilación cruzada" },
    ],
    location: "Calle 1, cercano al muelle histórico",
    accent: "ember",
    image: imgPortuaria,
  },
  {
    id: "pension-costa-rica",
    name: "Pensión Costa Rica",
    year: "1905",
    style: "Ecléctico / Neoclásico",
    summary:
      "Atribuida a César Rivaflecha Zavala, combina simetría neoclásica con carpintería y balcones antillanos propios del paisaje urbano de principios del siglo XX.",
    history: [
      "Construida en 1905 y vinculada al trazo de César Rivaflecha Zavala, la Pensión Costa Rica hospedó a comerciantes, marinos, funcionarios y familias que llegaban al Caribe en pleno auge ferroviario y bananero. Su volumen elevado y balcones corridos dominaban la calle comercial.",
      "Combina simetría ecléctica de aire neoclásico con detalles artesanales de madera calada que suavizan la luz del trópico. Tras pasar por distintas familias limonenses, permanece como uno de los inmuebles residenciales más antiguos del casco urbano.",
    ],
    highlights: [
      { label: "Año de obra", value: "1905" },
      { label: "Estilo", value: "Ecléctico antillano" },
      { label: "Vocación", value: "Hospedaje histórico" },
    ],
    location: "Centro urbano de Puerto Limón",
    accent: "sand",
    image: imgPension,
  },
  {
    id: "casa-episcopal",
    name: "Casa Episcopal",
    year: "1940",
    style: "Neocolonial",
    summary:
      "Sede de la Diócesis de Limón desde 1994. Su arquitectura reinterpreta los corredores y arcos tradicionales adaptados a la brisa y lluvias del Caribe.",
    history: [
      "Erigida alrededor de 1940 con rasgos neocoloniales hispanoamericanos adaptados a la costa atlántica, la Casa Episcopal forma parte del paisaje eclesiástico y educativo que acompañó el crecimiento de la ciudad durante el siglo XX.",
      "Desde la creación de la Diócesis de Limón en 1994 sirve como sede episcopal, preservando sus arcos, techos altos y corredores frescos que protegen del sol intenso y los aguaceros caribeños.",
    ],
    highlights: [
      { label: "Época", value: "1940" },
      { label: "Estilo", value: "Neocolonial tropical" },
      { label: "Sede", value: "Diócesis desde 1994" },
    ],
    location: "Avenida 4, entorno catedralicio",
    accent: "moss",
    image: imgEpiscopal,
  },
  {
    id: "casa-bautista",
    name: "Casa Misionera Bautista",
    year: "1890",
    style: "Victoriano caribeño",
    summary:
      "Construida a fines del siglo XIX como residencia de misioneros bautistas junto a la comunidad afrocaribeña, con corredores altos pensados para el clima tropical.",
    history: [
      "Levantada hacia 1890 en los albores del ferrocarril al Atlántico, la Casa Misionera Bautista alojó a pastores y maestros vinculados a las congregaciones protestantes que acompañaron a la inmigración angloparlante desde Jamaica y las Antillas.",
      "Junto con las iglesias y escuelas en inglés, estos espacios sostuvieron la cohesión espiritual, la alfabetización y el idioma mekatelyu. Su estructura elevada sobre pilotes y corredores de madera es un ejemplo puro del victoriano caribeño.",
    ],
    highlights: [
      { label: "Año estimado", value: "1890" },
      { label: "Estilo", value: "Victoriano sobre pilotes" },
      { label: "Comunidad", value: "Herencia anglo-caribeña" },
    ],
    location: "Barrio histórico de Limón centro",
    accent: "ember",
    image: imgBautista,
  },
  {
    id: "escuela-tomas-guardia",
    name: "Escuela General Tomás Guardia",
    year: "1940",
    style: "Racionalista escolar",
    summary:
      "Heredera de la primera institución educativa formal de Limón, su edificio de los años 40 representa la arquitectura escolar moderna de mediados del siglo XX.",
    history: [
      "Nombrada en homenaje al presidente Tomás Guardia Gutiérrez, impulsor de la primera escuela pública de Limón a finales del siglo XIX, esta institución formó a generaciones enteras de estudiantes limonenses en el corazón de la ciudad.",
      "Su pabellón principal de la década de 1940 adopta el racionalismo escolar costarricense: aulas amplias, iluminación generosa y pasillos abiertos al patio. Aún hoy mantiene viva su función educativa original.",
    ],
    highlights: [
      { label: "Pabellón actual", value: "1940" },
      { label: "Estilo", value: "Racionalista escolar" },
      { label: "Función", value: "Educación pública activa" },
    ],
    location: "Casco central de Puerto Limón",
    accent: "sky",
    image: imgEscuela,
  },
  {
    id: "big-boy",
    name: "Estadio de Béisbol Big Boy",
    year: "1897",
    style: "Patrimonio deportivo",
    summary:
      "Con cancha desde 1887 y terreno donado por la UFC en 1897, fue escenario del primer partido de béisbol en Costa Rica. Bautizado en honor a Bancroft «Big Boy» Scott Watson.",
    history: [
      "El béisbol llegó a Limón a finales del siglo XIX por influencia de empleados estadounidenses. Hacia 1887 se inauguró una cancha y en 1897 la United Fruit Company donó el terreno a la Municipalidad de Limón. El primer partido celebrado en Costa Rica enfrentó allí a los trabajadores de la United Fruit Company y de la compañía ferrocarrilera.",
      "En la década de 1940 las instalaciones se remodelaron y cerraron perimetralmente, bautizándose como Estadio de Béisbol «Big Boy» en homenaje al destacado pelotero Bancroft Scott Watson, donde también brilló Donald «Danny» Hayling Shaw (MCJ, 2000). El 18 de julio de 2002 (La Gaceta N° 138) fue declarado patrimonio histórico arquitectónico.",
    ],
    highlights: [
      { label: "Hitos", value: "1887 cancha, 1897 donación UFC" },
      { label: "Homenaje", value: "Bancroft «Big Boy» Scott Watson" },
      { label: "Declaratoria", value: "La Gaceta N° 138 (2002)" },
    ],
    location: "Casco histórico de Puerto Limón",
    accent: "moss",
    image: imgBigBoy,
  },
  {
    id: "casa-domino",
    name: "La Casa del Dominó",
    year: "1960",
    style: "Vernáculo caribeño en madera",
    summary:
      "Ubicada en Calle 5 frente a la Casa Misionera Bautista y dedicada al jugador Guillermo Cole Scarlett; punto de encuentro para partidas de dominó, ajedrez, tablero y tertulia política.",
    history: [
      "Los orígenes del dominó en Limón provienen de las primeras personas afrodescendientes originarias de Jamaica vinculadas a la construcción del ferrocarril. Frente a la Casa Misionera Bautista se levanta «La Casa del Dominó», obra dedicada al jugador Guillermo Cole Scarlett, donde los limonenses se reúnen a jugar dominó, ajedrez y tablero y a conversar sobre política nacional y fútbol.",
      "Las partidas en parejas pueden extenderse hasta ocho horas seguidas bajo un código propio de gestos y sonidos: un golpe fuerte con la ficha en la mesa avisa a la pareja que se tiene una ficha similar a la colocada, mientras que un golpe suave indica que no hay más fichas que ayuden a mejorar el juego.",
    ],
    highlights: [
      { label: "Dedicatoria", value: "Guillermo Cole Scarlett" },
      { label: "Ubicación", value: "Calle 5, frente a Casa Bautista" },
      { label: "Código", value: "Golpe fuerte y golpe suave" },
    ],
    location: "Calle 5, frente a la Casa Misionera Bautista",
    accent: "sand",
    image: imgDomino,
  },
];

export const architectureStats = [
  {
    value: "14",
    unit: "hitos",
    dotClass: "bg-moss",
    description:
      "Inmuebles y espacios patrimoniales documentados entre el Casco Histórico y Jamaica Town.",
  },
  {
    value: "1870",
    unit: "",
    dotClass: "bg-sky",
    description:
      "Primer trazado urbano en cuadrícula realizado por el Ing. Francisco Kurtze.",
  },
  {
    value: "16 800",
    unit: "m²",
    dotClass: "bg-ember",
    description:
      "Extensión del Parque Balvanero Vargas Molina, diseñado por Andrés Bonife en 1895.",
  },
  {
    value: "3",
    unit: "zonas",
    dotClass: "bg-sand",
    description:
      "Casco Histórico (1870), Jamaica Town (1880) y Zona Americana (1929).",
  },
];
