import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DigbyMascot } from "@/components/DigbyMascot";

export const metadata = {
  title: "Digby Mascot Review",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function BrandIconReviewPage() {
  if (process.env.VERCEL === "1") {
    notFound();
  }

  return (
    <main className="page-shell py-10">
      <section className="rounded-[2rem] border border-[var(--line)] bg-[var(--paper)]/80 p-5 shadow-[var(--shadow)] lg:p-8">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
          Mascot identity
        </p>
        <h1 className="mt-3 max-w-4xl text-[clamp(2.8rem,9vw,5.4rem)] font-black leading-[0.95] text-[var(--ink)]">
          Digby the Bite
        </h1>
        <p className="mt-5 max-w-3xl text-lg font-bold leading-relaxed text-[var(--muted)]">
          Digby is the approved The Bible Bite mascot: a golden smiling Bite
          with a shallow upper-left nibble, small purple bow tie, and centered
          gold cross.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] border-2 border-amber-100 bg-white/80 p-5 shadow-sm lg:p-8">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
            Approved mascot
          </p>
          <div className="mt-6 grid place-items-center rounded-[1.5rem] bg-[var(--background)] p-8">
            <DigbyMascot
              className="w-full max-w-[22rem]"
              label="Digby the Bite mascot"
            />
          </div>
        </article>

        <article className="rounded-[1.75rem] border border-[var(--line)] bg-white/75 p-5 shadow-sm lg:p-8">
          <h2 className="text-2xl font-black text-[var(--ink)]">Size honesty</h2>
          <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--muted)]">
            The face carries first, then the golden Bite shape, then the bowtie.
            The cross stays intentionally small at favicon scale.
          </p>
          <div className="mt-6 grid gap-5">
            <SizeSample label="128px" size="size-32" />
            <SizeSample label="64px" size="size-16" />
            <SizeSample label="32px" size="size-8" />
            <SizeSample label="16px" size="size-4" />
          </div>
        </article>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <PreviewPanel title="Cream background" tone="bg-[var(--background)]">
          <DigbyMascot className="size-40" label="Digby on cream" />
        </PreviewPanel>
        <PreviewPanel title="White background" tone="bg-white">
          <DigbyMascot className="size-40" label="Digby on white" />
        </PreviewPanel>
        <PreviewPanel title="Brand teal background" tone="bg-[var(--teal)]">
          <DigbyMascot className="size-40" label="Digby on teal" />
        </PreviewPanel>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-5 shadow-sm">
          <h2 className="text-2xl font-black text-[var(--ink)]">Social avatar crop</h2>
          <div className="mt-5 grid place-items-center">
            <div className="grid aspect-square w-full max-w-72 place-items-center overflow-hidden rounded-full border-4 border-white bg-[var(--background)] shadow-[var(--shadow)]">
              <DigbyMascot className="size-[88%]" label="Digby in social avatar crop" />
            </div>
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-5 shadow-sm">
          <h2 className="text-2xl font-black text-[var(--ink)]">Wordmark and tagline</h2>
          <div className="mt-5 grid gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3">
              <DigbyMascot className="size-12 shrink-0" />
              <strong className="text-xl leading-none text-[var(--ink)]">
                The Bible Bite
              </strong>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3">
              <DigbyMascot className="size-14 shrink-0" />
              <div>
                <p className="text-xl font-black leading-none text-[var(--ink)]">
                  The Bible Bite
                </p>
                <p className="mt-1 text-sm font-bold text-[var(--muted)]">
                  Small bites. Big truths.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-5 shadow-sm">
        <h2 className="text-2xl font-black text-[var(--ink)]">Header preview</h2>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-[var(--background)] px-4 py-3">
          <a className="focus-ring inline-flex items-center gap-3 rounded-xl no-underline" href="#">
            <DigbyMascot className="size-10" />
            <strong className="text-lg leading-none text-[var(--ink)]">
              The Bible Bite
            </strong>
          </a>
          <button className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-purple-200 bg-white/70 px-4 py-2 text-sm font-black text-[var(--purple-dark)] shadow-[0_12px_24px_rgba(104,61,20,0.1)]">
            Menu
            <span aria-hidden="true">⌄</span>
          </button>
        </div>
      </section>
    </main>
  );
}

function PreviewPanel({
  children,
  title,
  tone,
}: {
  children: ReactNode;
  title: string;
  tone: string;
}) {
  return (
    <article className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-5 shadow-sm">
      <h2 className="text-2xl font-black text-[var(--ink)]">{title}</h2>
      <div className={`mt-5 grid min-h-56 place-items-center rounded-3xl p-6 ${tone}`}>
        {children}
      </div>
    </article>
  );
}

function SizeSample({ label, size }: { label: string; size: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-[var(--background)] p-4">
      <div className="grid w-36 justify-items-center gap-2">
        <DigbyMascot className={size} label={`Digby at ${label}`} />
        <span className="text-xs font-black text-[var(--muted)]">{label}</span>
      </div>
      <p className="text-sm font-bold leading-relaxed text-[var(--muted)]">
        {label === "16px"
          ? "Smallest-use preview. Shape and face still read; bowtie cross becomes a warm gold accent."
          : "Clean read for product surfaces and social contexts."}
      </p>
    </div>
  );
}
