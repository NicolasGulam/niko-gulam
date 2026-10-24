"use client";

import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { externalLinkProps } from "@/lib/cn";
import { links } from "@/data/site";
import { useLocale } from "@/i18n/provider";

const externalLinks = [links.linkedin, links.ntk] as const;

export function ContactSection() {
  const { t } = useLocale();

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="section-y relative bg-carbon"
    >
      <div className="shell">
        <SectionHeader
          id="contacto-title"
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          aside={
            <p className="label-mono text-muted">
              <span className="text-orange">04</span> / {t.contact.aside}
            </p>
          }
        />

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
            {links.email ? (
              <div>
                <p className="label-mono text-muted">{t.contact.email}</p>
                <a
                  href={`mailto:${links.email}`}
                  className="group mt-3 inline-flex items-center gap-3 break-all border-b border-orange pb-2 font-mono text-[clamp(0.9rem,2vw,1.125rem)] tracking-[0.02em] text-paper transition-colors duration-300 hover:text-orange"
                >
                  {links.email}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-orange transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            ) : null}

            <nav aria-label={t.contact.links} className="mt-10">
              <p className="label-mono mb-3 text-muted">{t.contact.links}</p>
              <ul className="border-t border-line">
                {externalLinks.map((link) => (
                  <li key={link.href} className="border-b border-line">
                    <a
                      href={link.href}
                      {...externalLinkProps}
                      className="group flex min-h-14 items-center justify-between font-mono text-xs tracking-[0.16em] text-paper transition-colors duration-300 hover:text-orange"
                    >
                      {link.label.toUpperCase()}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 text-muted transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange"
                      />
                      <span className="sr-only"> ({t.newTab})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
