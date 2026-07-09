import { getBibleTranslation } from "@/lib/sources";
import type { ReaderBibleBite } from "@/lib/types";

export function ScriptureBlock({ bite }: { bite: ReaderBibleBite }) {
  const source = getBibleTranslation(bite.translation);

  return (
    <figure className="rounded-3xl border border-teal-100 bg-teal-50 p-5">
      <figcaption className="mb-3 text-sm font-black uppercase tracking-wide text-[var(--teal-dark)]">
        {bite.scriptureReference}
      </figcaption>
      <blockquote className="text-xl font-black leading-snug text-[var(--ink)]">
        “{bite.scriptureText}”
      </blockquote>
      {source ? (
        <p className="mt-4 text-xs font-bold leading-relaxed text-[var(--muted)]">
          {source.attribution}
        </p>
      ) : null}
    </figure>
  );
}
