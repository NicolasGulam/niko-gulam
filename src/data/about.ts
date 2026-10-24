/** About-section content. Edit `src/content/about.json`. */

import raw from "@/content/about.json";
import { tx, type Locale, type Localized } from "@/i18n/locale";

export type Specialization = {
  id: string;
  index: string;
  title: string;
  description: string;
  focus: readonly string[];
};

export type StackGroup = {
  id: string;
  label: string;
  items: readonly string[];
};

export type SpokenLanguage = {
  label: string;
  level: string;
};

type RawAbout = {
  paragraphs: Localized[];
  specializations: {
    id: string;
    index: string;
    title: Localized;
    description: Localized;
    focus: string[];
  }[];
  stack: {
    id: string;
    label: Localized;
    items: string[];
  }[];
  languages: {
    label: Localized;
    level: Localized;
  }[];
};

const data = raw as RawAbout;

export function getAbout(locale: Locale) {
  return {
    paragraphs: data.paragraphs.map((p) => tx(locale, p)),
    specializations: data.specializations.map((spec) => ({
      id: spec.id,
      index: spec.index,
      title: tx(locale, spec.title),
      description: tx(locale, spec.description),
      focus: spec.focus,
    })),
    stack: data.stack.map((group) => ({
      id: group.id,
      label: tx(locale, group.label),
      items: group.items,
    })),
    languages: data.languages.map((lang) => ({
      label: tx(locale, lang.label),
      level: tx(locale, lang.level),
    })),
  };
}
