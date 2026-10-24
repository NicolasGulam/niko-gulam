"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type PreviewVideoProps = {
  src: string;
  poster: string;
  /** Accessible description of what the video shows. */
  label: string;
  className?: string;
};

/**
 * Muted, looping preview. It only plays while visible and never when the user
 * prefers reduced motion (the poster is shown instead).
 */
export function PreviewVideo({ src, poster, label, className }: PreviewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* autoplay can be blocked: the poster simply stays visible */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={cn("size-full object-cover", className)}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      role="img"
      aria-label={label}
    />
  );
}
