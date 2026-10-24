"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProjects } from "@/data/projects";
import { useLocale } from "@/i18n/provider";

export function ProjectsSection() {
  const { locale, t } = useLocale();
  const projects = getProjects(locale);

  return (
    <section
      id="proyectos"
      aria-labelledby="proyectos-title"
      className="relative bg-carbon pb-[clamp(4.5rem,10vw,9rem)] pt-[clamp(2.5rem,5vw,4.5rem)]"
    >
      <div className="shell">
        <SectionHeader
          id="proyectos-title"
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          aside={
            <p className="label-mono text-muted">
              <span className="text-orange">01</span> / {t.projects.aside}
            </p>
          }
        />

        <ul
          role="list"
          className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-6 xl:grid-cols-3"
        >
          {projects.map((project, i) => {
            const spansRow =
              i === projects.length - 1 && projects.length % 2 === 1;
            return (
              <Reveal
                as="li"
                key={project.id}
                delay={i * 0.1}
                className={spansRow ? "md:col-span-2 xl:col-span-1" : undefined}
              >
                <ProjectCard project={project} order={i} wide={spansRow} />
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
