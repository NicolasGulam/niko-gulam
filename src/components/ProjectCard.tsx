"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { PreviewVideo } from "@/components/PreviewVideo";
import { cn, externalLinkProps } from "@/lib/cn";
import type { Project } from "@/data/projects";
import { useLocale } from "@/i18n/provider";

type ProjectCardProps = {
  project: Project;
  /** Position in the grid, used to stagger the preview reveal. */
  order: number;
  /** On tablet the card spans two columns: use a wider preview ratio there. */
  wide?: boolean;
};

export function ProjectCard({ project, order, wide = false }: ProjectCardProps) {
  const { t } = useLocale();
  const { kind, href } = project;
  const isGame = kind === "game";
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col border border-line transition-colors duration-500",
        isGame ? "bg-black" : "bg-surface",
      )}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
        <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-orange transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-within:scale-x-100" />
        <span className="absolute inset-y-0 right-0 w-px origin-top scale-y-0 bg-orange transition-transform delay-100 duration-500 ease-out-expo group-hover:scale-y-100 group-focus-within:scale-y-100" />
        <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-orange transition-transform delay-200 duration-500 ease-out-expo group-hover:scale-x-100 group-focus-within:scale-x-100" />
        <span className="absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-orange transition-transform delay-300 duration-500 ease-out-expo group-hover:scale-y-100 group-focus-within:scale-y-100" />
      </span>

      <ClipReveal delay={order * 0.12}>
        <div
          className={cn(
            "relative aspect-[16/9] overflow-hidden border-b border-line",
            wide && "md:aspect-[21/9] xl:aspect-[16/9]",
            isGame ? "bg-black" : "bg-carbon",
          )}
        >
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.045]">
            {project.image.video ? (
              <PreviewVideo
                src={project.image.video}
                poster={project.image.src}
                label={project.image.alt}
              />
            ) : (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 92vw"
                quality={92}
                loading={order === 0 ? "eager" : "lazy"}
                className="size-full object-cover object-top"
                style={
                  project.image.position
                    ? { objectPosition: project.image.position }
                    : undefined
                }
              />
            )}
          </div>

          {project.image.overlay ? (
            <>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
              />
              <Image
                src={project.image.overlay.src}
                alt=""
                aria-hidden="true"
                width={project.image.overlay.width}
                height={project.image.overlay.height}
                sizes="(min-width: 1280px) 16vw, 40vw"
                quality={92}
                className="pointer-events-none absolute left-[6%] top-1/2 w-[46%] -translate-y-1/2"
              />
            </>
          ) : null}

          <span className="label-mono absolute left-4 top-4 z-10 bg-black px-2.5 py-1.5 text-[0.625rem] text-paper">
            {project.index}
          </span>
          <span className="label-mono absolute right-4 top-4 z-10 max-w-[70%] truncate bg-black px-2.5 py-1.5 text-[0.625rem] text-muted">
            {project.meta}
          </span>
        </div>
      </ClipReveal>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="label-mono inline-flex w-fit items-center gap-2 border border-orange px-2.5 py-1.5 text-[0.625rem] text-orange transition-colors duration-300 group-hover:bg-orange group-hover:text-black">
          {project.category}
        </p>

        <h3
          id={titleId}
          className="mt-5 font-display text-[clamp(1.5rem,2.2vw,2rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-paper"
        >
          {href ? (
            <a
              href={href}
              {...externalLinkProps}
              className="outline-offset-8 after:absolute after:inset-0 after:z-30 after:content-['']"
            >
              {project.title}
              <span className="sr-only"> ({t.newTab})</span>
            </a>
          ) : (
            project.title
          )}
        </h3>

        <p className="mt-4 max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul aria-label={t.projects.tech} className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="label-mono border border-line px-2.5 py-1.5 text-[0.625rem] text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between border-t border-line pt-5">
            {href ? (
              <>
                <span className="label-mono text-paper transition-colors duration-300 group-hover:text-orange">
                  {t.projects.visit}
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 text-orange transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </>
            ) : (
              <span className="label-mono flex items-center gap-2 text-muted">
                <span aria-hidden="true" className="size-1.5 bg-line" />
                {project.note}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
