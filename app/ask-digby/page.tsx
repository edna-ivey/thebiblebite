import type { Metadata } from "next";
import { AskDigbyForm } from "@/components/AskDigbyForm";
import { DigbyMascot } from "@/components/DigbyMascot";
import { getPublicBiteBySlug } from "@/lib/bites";
import {
  getSingleSearchParam,
  normalizeAskDigbyReason,
} from "@/lib/askDigby";

export const metadata: Metadata = {
  title: "Ask Digby",
  description: "Send a private Bible question, Bite thought, or note to The Bible Bite.",
};

export const dynamic = "force-dynamic";

export default async function AskDigbyPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const biteSlug = getSingleSearchParam(params.bite);
  const reason = normalizeAskDigbyReason(getSingleSearchParam(params.reason));
  const biteContext = biteSlug ? getPublicBiteBySlug(biteSlug) : undefined;

  return (
    <main>
      <section className="page-shell grid gap-8 py-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:py-12">
        <div className="rounded-[2rem] border border-[var(--line)] bg-white/60 p-6 shadow-sm md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--purple-dark)]">
            ASK DIGBY
          </p>
          <h1 className="mt-4 text-[clamp(2.6rem,10vw,5.2rem)] font-black leading-[0.95] text-[var(--ink)]">
            Got a question? Let&apos;s look closer.
          </h1>
          <p className="mt-5 text-xl font-black leading-relaxed text-[var(--muted)]">
            Bible question, confusing verse, thought about a Bite, or one of those &quot;wait, hold up&quot; moments?
          </p>
          <p className="mt-4 text-xl font-black leading-relaxed text-[var(--muted)]">
            Send it our way.
          </p>
          <p className="mt-5 text-lg font-black text-[var(--purple-dark)]">
            Questions are welcome here.
          </p>
          <DigbyMascot className="mx-auto mt-8 size-44" label="Digby" />
        </div>

        <AskDigbyForm biteContext={biteContext} initialReason={reason} />
      </section>
    </main>
  );
}
