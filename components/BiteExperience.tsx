"use client";

import Link from "next/link";
import { useState } from "react";
import { BigTruthCard } from "@/components/BigTruthCard";
import { PrayerCard } from "@/components/PrayerCard";
import { QuizReveal } from "@/components/QuizReveal";
import { ScriptureBlock } from "@/components/ScriptureBlock";
import { ShareButton } from "@/components/ShareButton";
import { TakeTheBiteCard } from "@/components/TakeTheBiteCard";
import type { ReaderBibleBite } from "@/lib/types";
import { formatBibleReadingReference, getBibleReadingUrl } from "@/lib/sources";
import { getTopicName } from "@/lib/topics";

type BiteExperienceProps = {
  bite: ReaderBibleBite;
  readingMinutes: number;
};

export function BiteExperience({ bite, readingMinutes }: BiteExperienceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const deeperReadingReference = formatBibleReadingReference(bite.deeperReading);
  const deeperReadingUrl = getBibleReadingUrl(bite.translation, bite.deeperReading);

  return (
    <main>
      <section className="page-shell py-8 lg:py-12">
        <div className="mx-auto grid max-w-4xl gap-5">
          <Link
            className="focus-ring w-max rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[var(--purple-dark)] no-underline"
            href="/archive"
          >
            ← Back to archive
          </Link>

          <header className="rounded-[2rem] border border-[var(--line)] bg-white/60 p-5 shadow-sm md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
              {getTopicName(bite.topic)}
            </p>
            <h1 className="mt-3 text-[clamp(2.6rem,10vw,5rem)] font-black leading-[0.95] text-[var(--ink)] lg:text-[clamp(4rem,6.2vw,6rem)]">
              {bite.title}
            </h1>
            <p className="mt-5 text-base font-black leading-relaxed text-[var(--muted)] sm:text-lg">
              {new Date(`${bite.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              {" · "}
              {bite.scriptureReference}
              {" · "}
              {readingMinutes} min read
            </p>
          </header>

          <ScriptureBlock bite={bite} />
          <QuizReveal
            bite={bite}
            revealed={revealed}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            onReveal={() => setRevealed(true)}
          />
          {revealed ? (
            <div className="grid gap-5" aria-live="polite">
              <BigTruthCard>{bite.bigTruth}</BigTruthCard>
              <TakeTheBiteCard>{bite.takeTheBite}</TakeTheBiteCard>
              <PrayerCard>{bite.prayer}</PrayerCard>
              <section className="rounded-[2rem] border-2 border-teal-100 bg-teal-50 p-6">
                <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[var(--teal-dark)]">
                  GO DEEPER
                </p>
                <p className="text-xl font-black leading-snug text-[var(--ink)]">
                  Read {deeperReadingReference}
                </p>
                <p className="mt-3 text-base font-bold leading-relaxed text-[var(--muted)]">
                  {bite.deeperReading.prompt}
                </p>
                {deeperReadingUrl ? (
                  <a
                    className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--teal-dark)] px-5 py-3 text-base font-black text-white no-underline"
                    href={deeperReadingUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read {deeperReadingReference} →
                  </a>
                ) : null}
              </section>
              <section className="rounded-[2rem] border border-[var(--line)] bg-white/70 p-5">
                <p className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
                  Topic & Tags
                </p>
                <p className="mb-4 text-lg font-black text-[var(--ink)]">
                  {getTopicName(bite.topic)}
                </p>
                <div className="flex flex-wrap gap-3">
                  {bite.tags.map((tag) => (
                    <span
                      className="rounded-full bg-[#fff4e1] px-3 py-2 text-sm font-black text-[var(--muted)]"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <ShareButton title={bite.title} />
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
