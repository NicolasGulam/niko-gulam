"use client";

import type { ReactNode } from "react";
import { CertificationsList } from "@/components/CertificationsList";
import { EducationCard } from "@/components/EducationCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getCertifications,
  getEducation,
  getExperience,
} from "@/data/career";
import { useLocale } from "@/i18n/provider";
import { cn } from "@/lib/cn";

type ColumnProps = {
  index: string;
  title: string;
  count: number;
  delay: number;
  className?: string;
  children: ReactNode;
};

function CareerColumn({ index, title, count, delay, className, children }: ColumnProps) {
  return (
    <Reveal delay={delay}
      className={cn("flex flex-col border border-line bg-black", className)}
    >
      <header className="flex items-center justify-between border-b border-line px-6 py-4 sm:px-7">
        <h3 className="label-mono flex items-center gap-3 text-paper">
          <span className="text-orange">{index}</span>
          {title}
        </h3>
        <span aria-hidden="true" className="label-mono text-muted">
          {String(count).padStart(2, "0")}
        </span>
      </header>
      <div className="flex-1 px-6 py-7 sm:px-7">{children}</div>
    </Reveal>
  );
}

export function CareerSection() {
  const { locale, t } = useLocale();
  const experience = getExperience(locale);
  const education = getEducation(locale);
  const certifications = getCertifications();

  return (
    <section
      id="trayectoria"
      aria-labelledby="trayectoria-title"
      className="section-y relative border-y border-line bg-black"
    >
      <div className="shell relative">
        <SectionHeader
          id="trayectoria-title"
          eyebrow={t.career.eyebrow}
          title={t.career.title}
          aside={
            <p className="label-mono text-muted">
              <span className="text-orange">02</span> / {t.career.aside}
            </p>
          }
        />

        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <CareerColumn
            index="01"
            title={t.career.experience}
            count={experience.length}
            delay={0}
          >
            <div role="list">
              {experience.map((item, i) => (
                <div role="listitem" key={item.id}>
                  <ExperienceCard
                    item={item}
                    isLast={i === experience.length - 1}
                    delay={0.2 + i * 0.15}
                  />
                </div>
              ))}
            </div>
          </CareerColumn>

          <CareerColumn
            index="02"
            title={t.career.education}
            count={education.length}
            delay={0.12}
          >
            <div role="list">
              {education.map((item, i) => (
                <div role="listitem" key={item.id}>
                  <EducationCard
                    item={item}
                    isLast={i === education.length - 1}
                    delay={0.3 + i * 0.15}
                  />
                </div>
              ))}
            </div>
          </CareerColumn>

          <CareerColumn
            index="03"
            title={t.career.certifications}
            count={certifications.length}
            delay={0.24}
            className="md:col-span-2 lg:col-span-1"
          >
            <CertificationsList items={certifications} delay={0.4} />
          </CareerColumn>
        </div>
      </div>
    </section>
  );
}
