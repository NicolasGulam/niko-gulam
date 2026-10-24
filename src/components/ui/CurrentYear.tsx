import { cacheLife } from "next/cache";

/**
 * Renders the current year.
 *
 * With Cache Components, reading `new Date()` during a prerender is an error
 * unless the value is deliberately cached. Caching it for a day keeps the
 * static shell fast while the year still rolls over on its own.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
