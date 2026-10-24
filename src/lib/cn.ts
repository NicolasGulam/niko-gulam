type ClassValue = string | false | null | undefined;

/** Minimal class-name joiner (avoids pulling in extra dependencies). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Safe attributes for links that open in a new tab. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
