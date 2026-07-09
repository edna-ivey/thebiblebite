import Link from "next/link";
import type { DailyBiteTeaser } from "@/lib/types";
import { getTopicName } from "@/lib/topics";

export function DailyBiteCard({
  bite,
  readingMinutes,
}: {
  bite: DailyBiteTeaser;
  readingMinutes: number;
}) {
  return (
    <section
      className="page-shell rounded-[1.75rem] border-2 border-amber-100 bg-[var(--paper)]/80 p-5 shadow-[var(--shadow)] lg:p-8"
      id="today"
    >
      <article className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-gradient-to-r from-[#ffe98a] to-[#ffd159] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--ink)]">
              Today&apos;s Bible Bite
            </span>
            <time className="text-sm font-black text-[var(--muted)]" dateTime={bite.date}>
              {new Date(`${bite.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="text-sm font-black text-[var(--purple-dark)]">
              {getTopicName(bite.topic)}
            </span>
          </div>
          <h2 className="mt-5 max-w-2xl text-[clamp(2.25rem,8vw,3.8rem)] font-black leading-[0.98] text-[var(--ink)] lg:text-[clamp(3.2rem,4.6vw,5.1rem)]">
            {bite.title}
          </h2>
        </div>

        <div className="rounded-[2rem] border border-teal-100 bg-white/80 p-5 shadow-sm lg:p-7">
          <p className="text-lg font-black text-[var(--ink)]">
            <span className="mr-2 text-[var(--orange)]" aria-hidden="true">
              ✿
            </span>
            {bite.scriptureReference}
            <span className="mx-2 text-[var(--muted)]">·</span>
            {readingMinutes} min read
          </p>
          <p className="mt-5 text-[clamp(1.45rem,5vw,2.2rem)] font-black leading-tight text-[var(--ink)]">
            {bite.curiosityHook}
          </p>
          <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">
            Quick quiz · bite-sized truth · simple prayer
          </p>
          <Link
            className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[var(--purple)] to-[#9b45c6] px-8 py-3 text-lg font-black text-white no-underline shadow-[0_14px_24px_rgba(114,40,154,0.22)]"
            href={`/bites/${bite.slug}`}
          >
            Take Today&apos;s Bite
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </section>
  );
}
