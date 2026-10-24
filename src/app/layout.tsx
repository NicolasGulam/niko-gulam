import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { LocaleProvider } from "@/i18n/provider";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/data/site";
import "./globals.css";

/** Variable font with a width axis: used wide for NK and condensed for the wordmark. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} — ${site.descriptor}`;
const description =
  "Portfolio de NK nikogulam: desarrollo web, desarrollo de videojuegos y control de calidad. Proyectos, trayectoria y NTK Solutions.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: site.fullName }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_AR",
    alternateLocale: "en_US",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Without JavaScript, never leave scroll-reveal content hidden. */}
        <noscript>
          <style>{`.mo{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider>
          <SkipLink />
          <MotionProvider>{children}</MotionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
