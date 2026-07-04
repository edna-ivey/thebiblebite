import Link from "next/link";
import type { BibleBite } from "@/lib/types";
import { BigTruthCard } from "@/components/BigTruthCard";
import { PrayerCard } from "@/components/PrayerCard";
import { QuizReveal } from "@/components/QuizReveal";
import { ScriptureBlock } from "@/components/ScriptureBlock";
import { ShareButton } from "@/components/ShareButton";
import { TakeTheBiteCard } from "@/components/TakeTheBiteCard";
import { getTopicName } from "@/lib/topics";

export function BitePage({ bite }: { bite: BibleBite }) {
  return (
    <main>
      <section className="page-shell grid gap-8 py-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-12">
        <div>
          <Link
            className="focus-ring mb-6 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-black text-[var(--purple-dark)] no-underline"
            href="/archive"
          >
            ← Back to archive
          </Link>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
            {getTopicName(bite.topic)}
          </p>
          <h1 className="mt-3 text-[clamp(2.8rem,12vw,5rem)] font-black leading-[0.95] text-[var(--ink)] lg:text-[clamp(4rem,5vw,5.8rem)]">
            {bite.title}
          </h1>
          <p className="mt-5 text-lg font-black text-[var(--muted)]">
            {new Date(`${bite.date}T00:00:00`).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" · "}
            {bite.scriptureReference}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {bite.tags.map((tag) => (
              <span
                className="rounded-full bg-white/70 px-3 py-2 text-xs font-black text-[var(--muted)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <ShareButton title={bite.title} />
          </div>
        </div>

        <div className="grid gap-5">
          <ScriptureBlock bite={bite} />
          <QuizReveal bite={bite} />
          <BigTruthCard>{bite.bigTruth}</BigTruthCard>
          <TakeTheBiteCard>{bite.takeTheBite}</TakeTheBiteCard>
          <PrayerCard>{bite.prayer}</PrayerCard>
          <section className="rounded-3xl border border-amber-200 bg-[var(--paper)] p-5">
            <p className="mb-2 text-sm font-black uppercase tracking-wide text-amber-900">
              Go Deeper
            </p>
            <p className="text-lg font-black leading-snug text-[var(--ink)]">
              Read {bite.deeperReading} and watch how the scene moves from hiding to honesty.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
