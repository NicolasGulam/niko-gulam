/**
 * Featured projects. Edit `src/content/projects.json` (see that folder's README).
 *
 * Rules:
 *  - Only technologies verified in the real repositories are listed.
 *  - `href` is left undefined when there is no public URL.
 *  - All previews live in /public/projects.
 */

import raw from "@/content/projects.json";
import { tx, type Locale, type Localized } from "@/i18n/locale";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
  overlay?: { src: string; width: number; height: number };
  video?: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  kind: "web" | "game";
  meta: string;
  description: string;
  tags: readonly string[];
  image: ProjectImage;
  href?: string;
  note?: string;
};

type RawProject = {
  id: string;
  title: string;
  kind: "web" | "game";
  category: Localized;
  meta: Localized;
  description: Localized;
  tags: string[];
  image: {
    src: string;
    alt: Localized;
    width: number;
    height: number;
    position?: string;
    overlay?: { src: string; width: number; height: number };
    video?: string;
  };
  href?: string;
  note?: Localized;
};

const records = raw as RawProject[];

export function getProjects(locale: Locale): Project[] {
  return records.map((project, i) => ({
    id: project.id,
    index: String(i + 1).padStart(2, "0"),
    title: project.title,
    category: tx(locale, project.category),
    kind: project.kind,
    meta: tx(locale, project.meta),
    description: tx(locale, project.description),
    tags: project.tags,
    href: project.href,
    note: project.note ? tx(locale, project.note) : undefined,
    image: {
      src: project.image.src,
      alt: tx(locale, project.image.alt),
      width: project.image.width,
      height: project.image.height,
      position: project.image.position,
      overlay: project.image.overlay,
      video: project.image.video,
    },
  }));
}
