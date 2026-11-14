import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Archivo variable: width axis gives us the extra-condensed display cut
// and the regular body cut from a single family.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#5e6122",
};

export const metadata: Metadata = {
  title: "Puerto Limón — Historia y memoria del Caribe",
  description:
    "Historia, cultura y memoria viva de la costa caribeña de Costa Rica: el ferrocarril, el muelle, la herencia afrocaribeña, la gastronomía y el criollo limonense.",
  openGraph: {
    title: "Puerto Limón — Historia y memoria del Caribe",
    description: "Historia, cultura y memoria viva de la costa caribeña de Costa Rica.",
    type: "website",
    locale: "es_CR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
