/**
 * Site-wide identity, links and in-page anchors.
 * UI labels live in `src/i18n/copy.ts`. Long-form content lives in `src/content/`.
 */

export const site = {
  name: "NK nikogulam",
  fullName: "Nicolás Martín Gulam",
  descriptor: "Web · Game Dev · QA",
} as const;

export const links = {
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicol%C3%A1s-mart%C3%ADn-gulam/",
  },
  ntk: {
    label: "NTK Solutions",
    href: "https://ntk.solutions",
    display: "ntk.solutions",
  },
  email: "nk@ntk.solutions" as string | null,
} as const;

export type NavSection = {
  key: "projects" | "career" | "about" | "contact";
  href: string;
};

/** In-page sections (href must match the section element id). */
export const sectionNav: readonly NavSection[] = [
  { key: "projects", href: "#proyectos" },
  { key: "career", href: "#trayectoria" },
  { key: "about", href: "#sobre-mi" },
  { key: "contact", href: "#contacto" },
];

export const externalNav = {
  href: links.ntk.href,
} as const;
