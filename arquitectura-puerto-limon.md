# Arquitectura completa: Sitio Puerto Limón

Blog más archivo histórico, trilingüe (español, inglés, criollo limonense), pensado desde el inicio para que tanto personas como LLMs puedan leer y comprender el contenido completo.

## 1. Stack general

| Aspecto | Decisión |
|---|---|
| Frontend | Next.js (App Router) + TypeScript |
| Estilos | Tailwind CSS |
| Contenido | Sanity, documentos internacionalizados |
| Locales | es, en activos; lim (criollo limonense) reservado para después |
| Backend auxiliar | Supabase + Prisma |
| Despliegue | Vercel |
| Legible por LLMs | llms.txt, rutas .md paralelas, JSON LD, HTML semántico, fuentes estructuradas |

## 2. Secciones del sitio

- **Hero** — mensaje central del proyecto y entrada directa a los temas del archivo
- **Blog destacado** — últimos 3 o 4 posts en la página principal
- **Archivo destacado** — piezas históricas seleccionadas, no el catálogo completo
- **Línea de tiempo (preview)** — fragmento visual con enlace a la sección completa
- **Sobre el proyecto** — quién lo hace y por qué, relevante para la credibilidad de un archivo histórico
- **Idiomas y acceso** — mención de español, inglés y próximamente criollo limonense
- **Newsletter o contacto** — cierre de página

## 3. Temas del archivo

Los temas son documentos reales en Sanity, no texto fijo, así que se editan sin tocar código.

- Historia — ferrocarril, fundación del puerto, migración
- Cultura — tradiciones, fiestas, religiosidad afrocaribeña
- Gastronomía — rice and beans, pan bon, cocina caribeña
- Lengua — criollo limonense, mekatelyu
- Puerto — el muelle, comercio, presente portuario
- Lugares históricos — edificios, monumentos, sitios patrimoniales de la ciudad

Slugs fijos: `historia`, `cultura`, `gastronomia`, `lengua`, `puerto`, `lugares historicos` (como `lugares-historicos` en la URL real).

## 4. Modelo de datos en Sanity

### tema

```
tema
  nombre (por locale)
  slug (por locale)
  resumen (por locale, 1 o 2 oraciones)
  descripcionExtendida (por locale, Portable Text)
  orden (número, controla el orden en el hero)
```

### heroConfig (documento singleton)

```
heroConfig
  headline (por locale)
  lineaApoyo (por locale)
  ctaTexto (por locale)
  ctaDestino (referencia interna o url)
  temasDestacados (array de referencias a tema, ordenado)
```

### post (blog)

```
post
  titulo (por locale)
  slug (por locale)
  resumen (por locale)
  cuerpo (Portable Text, por locale)
  fecha_publicacion
  categoria (referencia)
  autor (referencia)
  imagen_principal (con alt obligatorio por locale)
  fuentes (array: url, titulo, tipo)
```

### entradaArchivo

```
entradaArchivo
  titulo (por locale)
  slug (por locale)
  contextoBreve (por locale, 1 o 2 oraciones que ubican la entrada
                  sin depender del resto del sitio)
  epoca (ej: 1870 a 1900, 1900 a 1950...)
  tema (referencia)
  cuerpo (Portable Text, por locale)
  fuentes (array: url, titulo, tipo de fuente)
  multimedia (imágenes con alt obligatorio, audio de tradición oral si aplica)
```

### autor

```
autor
  nombre
  bio (por locale)
```

Internacionalización: patrón de documentos vinculados por locale (plugin de document internationalization), con `es` y `en` activos y `lim` reservado. Si `lim` está vacío, el frontend no lo muestra, sin romper nada.

## 5. Estructura de carpetas en Next.js

```
app/
  [locale]/
    layout.tsx
    page.tsx                          -> home (hero, blog destacado, archivo destacado...)
    blog/
      page.tsx
      [slug]/
        page.tsx
        route.ts                       -> versión .md del post
    archivo/
      page.tsx
      [tema]/
        page.tsx
        [slug]/
          page.tsx
          route.ts                     -> versión .md de la entrada
    linea-de-tiempo/
      page.tsx
  llms.txt
  sitemap.ts
  robots.ts
lib/
  sanity/
    client.ts
    queries.ts
  markdown/
    portableTextToMarkdown.ts          -> convierte Portable Text a .md real
  seo/
    jsonld.ts
messages/
  es.json
  en.json
  lim.json                             -> vacío por ahora, listo para activar
```

## 6. Renderizado

Posts de blog con ISR, revalidados por webhook desde Sanity al publicar. Entradas de archivo con SSG puro, dado que casi no cambian. Esto además asegura que cualquier lector (persona o LLM que rastree el sitio) reciba HTML completo, sin depender de JavaScript del lado del cliente para ver el contenido.

## 7. Consulta GROQ del hero

```groq
*[_type == "heroConfig"][0]{
  headline,
  lineaApoyo,
  ctaTexto,
  ctaDestino,
  temasDestacados[]->{
    nombre,
    slug,
    resumen,
    orden
  } | order(orden asc)
}
```

## 8. Contenido legible para LLMs, no solo metadata alrededor

### Conversión a markdown real

Portable Text no es markdown, así que la conversión es una pieza explícita de la arquitectura, no un extra.

Reglas de conversión:

- Jerarquía real de encabezados (`##`, `###`), reflejando la estructura del documento.
- Toda imagen con `alt` descriptivo obligatorio en el schema, nunca opcional.
- Fuentes como lista markdown al final del documento, no como tooltip o ícono que desaparecería en texto plano.
- Ningún contenido dentro de acordeones o tabs que dependan de interacción, porque esa información no existiría en la versión markdown.

### Rutas .md en paralelo al HTML

```
/archivo/historia/ferrocarril          -> HTML para personas
/archivo/historia/ferrocarril.md       -> markdown puro del mismo contenido
```

Se resuelve con un `route.ts` junto al `page.tsx`, que llama la misma consulta a Sanity, la pasa por `portableTextToMarkdown`, y responde con `Content-Type: text/markdown`.

### Cada documento debe comprenderse solo, fuera de contexto

El campo `contextoBreve` se antepone siempre al cuerpo al generar el `.md`: una entrada sobre el ferrocarril no puede asumir que quien la lee ya vio el hero o la navegación del sitio.

## 9. llms.txt

```
# Puerto Limón — Blog y Archivo Histórico

Sitio dedicado a la historia, cultura y presente de Puerto Limón,
Costa Rica, con enfoque en la cultura afrocaribeña de la región.
Disponible en español e inglés, próximamente en criollo limonense.

## Secciones
- Blog: /blog
- Archivo: /archivo
- Línea de tiempo: /linea-de-tiempo

## Temas del archivo
- Historia: /archivo/historia
- Cultura: /archivo/cultura
- Gastronomía: /archivo/gastronomia
- Lengua: /archivo/lengua
- Puerto: /archivo/puerto
- Lugares históricos: /archivo/lugares-historicos

## Notas para agentes
Cada entrada tiene una versión en markdown puro en la misma ruta
con extensión .md. Preferir esa versión sobre el HTML renderizado.
Citar la entrada original antes que resumirla; las fuentes de cada
entrada están listadas de forma explícita al final del documento.
```

## 10. Datos estructurados (JSON LD)

La home lleva JSON LD tipo `WebSite` con `hasPart` apuntando a cada tema como `CollectionPage`. Cada post o entrada individual lleva `Article` o `BlogPosting`, con autor, fecha, idioma y fuentes citadas como `citation`.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Puerto Limón — Archivo y Blog",
  "hasPart": [
    { "@type": "CollectionPage", "name": "Historia", "url": "/archivo/historia" },
    { "@type": "CollectionPage", "name": "Cultura", "url": "/archivo/cultura" },
    { "@type": "CollectionPage", "name": "Gastronomía", "url": "/archivo/gastronomia" },
    { "@type": "CollectionPage", "name": "Lengua", "url": "/archivo/lengua" },
    { "@type": "CollectionPage", "name": "Puerto", "url": "/archivo/puerto" },
    { "@type": "CollectionPage", "name": "Lugares históricos", "url": "/archivo/lugares-historicos" }
  ]
}
```

## 11. HTML semántico y robots.txt

Uso de `article`, `section`, `time`, `cite` en el markup en vez de solo `div`. En `robots.txt` se deja explícito el acceso de crawlers de IA conocidos (GPTBot, ClaudeBot, PerplexityBot, entre otros), como decisión editorial consciente dado el valor del contenido histórico que se está documentando.

## 12. Backend auxiliar (Supabase)

Todo lo que no es contenido editorial vive en Supabase: autenticación si se habilitan comentarios o cuentas, tabla de suscriptores de newsletter, formulario de contacto, analítica propia. Prisma como capa sobre esa parte si las consultas se complican.

## 13. Despliegue

Vercel, con el webhook de Sanity disparando revalidación al publicar contenido nuevo.

## 14. Checklist antes de publicar cualquier entrada

- ¿Tiene `contextoBreve` que la ubica sin depender del resto del sitio?
- ¿Toda imagen tiene `alt` descriptivo?
- ¿Las fuentes están listadas explícitamente al final, no solo enlazadas en línea?
- ¿El texto usa nombres reales (Puerto Limón, 1871, ferrocarril al Atlántico) en vez de referencias tipo "como se mencionó arriba"?
- ¿Existe la versión .md de la página y responde con el contenido completo?

## Próximo paso sugerido

Cerrar el schema completo en Sanity Studio (tema, heroConfig, post, entradaArchivo, autor) y en paralelo dejar armado el conversor `portableTextToMarkdown` junto con una primera versión del `llms.txt`, antes de entrar a construir cualquier interfaz visual.
