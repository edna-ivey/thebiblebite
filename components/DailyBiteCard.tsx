import Link from "next/link";
import type { BibleBite } from "@/lib/types";
import { getTopicName } from "@/lib/topics";

export function DailyBiteCard({ bite }: { bite: BibleBite }) {
  return (
    <section
      className="page-shell grid gap-6 rounded-[1.75rem] border-2 border-amber-100 bg-[var(--paper)]/80 p-5 shadow-[var(--shadow)] lg:grid-cols-[0.72fr_1.2fr_0.48fr] lg:p-8"
      id="today"
    >
      <article className="border-[var(--line)] lg:border-r lg:pr-6">
        <time className="text-sm font-black text-[var(--muted)]" dateTime={bite.date}>
          {new Date(`${bite.date}T00:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <h2 className="mt-4 max-w-md text-[clamp(2.1rem,8vw,3.3rem)] font-black leading-[0.98] text-[var(--ink)] lg:text-[clamp(2.4rem,3.5vw,3.65rem)]">
          {bite.title}
        </h2>
        <p className="mt-4 text-lg font-black text-[var(--ink)]">
          <span className="mr-2 text-[var(--orange)]" aria-hidden="true">
            ✿
          </span>
          {bite.scriptureReference}
        </p>
        <p className="mt-4 max-w-sm text-base font-bold leading-relaxed text-[var(--muted)]">
          A question from the first hiding place in Scripture.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[var(--purple)] to-[#9b45c6] px-8 py-3 text-lg font-black text-white no-underline shadow-[0_14px_24px_rgba(114,40,154,0.22)]"
            href={`/bites/${bite.slug}`}
          >
            Take the Bite
            <span aria-hidden="true">→</span>
          </Link>
          <span className="text-sm font-black">2 min read</span>
        </div>
      </article>

      <article className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-[var(--teal)] to-[#11b9b6] px-5 py-4 text-lg font-black uppercase text-white">
          ❖ Quick Quiz
        </div>
        <div className="p-5">
          <p className="mb-4 text-xl font-black leading-snug text-[var(--ink)]">
            {bite.question}
          </p>
          <div className="grid gap-3">
            {bite.answerChoices.map((choice) => (
              <div
                className="grid min-h-12 grid-cols-[2.4rem_1fr] items-center gap-3 rounded-xl border-2 border-[#ead8c5] bg-[#fffdf8] px-4 py-3 text-base font-black"
                key={choice.id}
              >
                <span className="grid size-7 place-items-center rounded-full bg-[#fff4e1] text-sm">
                  {choice.id}
                </span>
                <span>{choice.text}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-right text-sm font-black text-[var(--teal-dark)]">
            Answer, explanation, prayer, and deeper reading inside.
          </p>
        </div>
      </article>

      <aside className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1" aria-label="Today’s extras">
        <RailCard label="Read" title={bite.deeperReading}>
          The scene moves from hiding to honesty.
        </RailCard>
        <RailCard label="Pray">{bite.prayer}</RailCard>
        <RailCard label="Topic" title={getTopicName(bite.topic)}>
          A bite about beginnings, shame, honesty, and God’s pursuit.
        </RailCard>
      </aside>
    </section>
  );
}

function RailCard({
  children,
  label,
  title,
}: {
  children: React.ReactNode;
  label: string;
  title?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-4 shadow-[0_14px_30px_rgba(104,61,20,0.08)]">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--purple-dark)]">
        {label}
      </span>
      {title ? <strong className="mt-2 block">{title}</strong> : null}
      <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--muted)]">{children}</p>
    </div>
  );
}
