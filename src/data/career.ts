/**
 * Experience, education and certifications.
 * Edit `src/content/career.json`. Anything not verified stays out.
 */

import raw from "@/content/career.json";
import { tx, type Locale, type Localized } from "@/i18n/locale";

export type Experience = {
  id: string;
  organization: string;
  role: string;
  period?: string;
  summary: string;
};

export type Education = {
  id: string;
  institution: string;
  program: string;
  period?: string;
  status?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year?: string;
};

type RawExperience = {
  id: string;
  organization: string;
  role: Localized;
  period?: Localized;
  summary: Localized;
};

type RawEducation = {
  id: string;
  institution: string;
  program: Localized;
  period?: Localized;
  status?: Localized;
};

type RawCertification = {
  id: string;
  name: string;
  issuer: string;
  year?: string;
};

const data = raw as {
  experience: RawExperience[];
  education: RawEducation[];
  certifications: RawCertification[];
};

export function getExperience(locale: Locale): Experience[] {
  return data.experience.map((item) => ({
    id: item.id,
    organization: item.organization,
    role: tx(locale, item.role),
    period: item.period ? tx(locale, item.period) : undefined,
    summary: tx(locale, item.summary),
  }));
}

export function getEducation(locale: Locale): Education[] {
  return data.education.map((item) => ({
    id: item.id,
    institution: item.institution,
    program: tx(locale, item.program),
    period: item.period ? tx(locale, item.period) : undefined,
    status: item.status ? tx(locale, item.status) : undefined,
  }));
}

export function getCertifications(): Certification[] {
  return data.certifications;
}
