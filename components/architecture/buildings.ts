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
    name: "Parque Vargas y Quiosco",
    year: "1895",
    style: "Victoriano",
    summary:
      "Espacio público frente al mar Caribe, célebre por su quiosco victoriano y sus palmas reales. Punto de encuentro social, musical y festivo de Limón desde finales del siglo XIX.",
    history: [
      "Trazado a finales del siglo XIX en honor al gobernador Balvanero Vargas, este parque frente al mar Caribe nació como el salón al aire libre de la ciudad portuaria. Sus palmas reales, jardines tropicales y el muro del malecón enmarcan el horizonte hacia Isla Uvita.",
      "En el centro se alza su icónico quiosco victoriano de hierro y madera, escenario histórico de retretas, discursos cívicos y celebraciones del Carnaval. Durante más de un siglo ha sido punto de encuentro cotidiano entre familias, músicos de calypso y viajeros.",
    ],
    highlights: [
      { label: "Año de trazo", value: "1895" },
      { label: "Estilo", value: "Victoriano caribeño" },
      { label: "Rol urbano", value: "Plaza y retreta costera" },
    ],
    location: "Frente al malecón, calles 1 y 2",
    accent: "sky",
    image: imgParque,
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
    style: "Funcional deportivo",
    summary:
      "Cuna del béisbol limonense impulsado por trabajadores ferroviarios y bananeros. Bautizado en honor al legendario jugador local Bancroft “Big Boy” Scott.",
    history: [
      "Desde 1897 los trabajadores del ferrocarril y las plantaciones bananeras llevaron el béisbol a los diamantes limonenses, convirtiendo el deporte en una pasión popular única frente al resto del país. El terreno evolucionó hasta consolidarse como estadio en la década de 1940.",
      "Lleva el nombre de Bancroft “Big Boy” Scott, referente histórico de la pelota caribeña. Sus graderías han sido semillero de selecciones nacionales, rivalidades barriales y orgullo deportivo de la provincia.",
    ],
    highlights: [
      { label: "Origen", value: "1897" },
      { label: "Homenaje", value: "Bancroft “Big Boy” Scott" },
      { label: "Identidad", value: "Catedral del béisbol" },
    ],
    location: "Sector sur del centro de Limón",
    accent: "moss",
    image: imgBigBoy,
  },
  {
    id: "casa-domino",
    name: "Casa del Dominó",
    year: "1960",
    style: "Espacio social tradicional",
    summary:
      "Punto de reunión de ferroviarios y estibadores desde los años 60, donde el dominó se convirtió en patrimonio vivo de conversación e identidad limonense.",
    history: [
      "Nacida en la década de 1960 como refugio cotidiano tras las jornadas en el muelle y los vagones del tren, la Casa del Dominó institucionalizó un juego que en Limón es rito social, música de fichas sobre la mesa y encuentro intergeneracional.",
      "Restaurada en 2017 para preservar el espacio comunitario, demuestra que el patrimonio arquitectónico también vive en los lugares modestos donde la conversación, el humor y la memoria oral se transmiten día a día.",
    ],
    highlights: [
      { label: "Década", value: "1960" },
      { label: "Restauración", value: "2017" },
      { label: "Patrimonio", value: "Tradición oral y juego" },
    ],
    location: "Entorno portuario de Limón",
    accent: "sand",
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
