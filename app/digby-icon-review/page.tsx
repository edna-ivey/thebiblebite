/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DigbySiteIcon } from "@/components/DigbySiteIcon";

export const metadata = {
  title: "Digby Site Icon Review",
};

const browserIcons = [
  {
    displaySizes: [16, 32],
    label: "Actual 32px browser icon",
    naturalSize: 32,
    src: "/icon/32?review=m10-micro",
  },
  {
    displaySizes: [16, 32, 48, 64],
    label: "Actual 64px browser icon",
    naturalSize: 64,
    src: "/icon/64?review=m10-standard",
  },
];

export default function DigbyIconReviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="page-shell py-12">
      <section className="space-y-3">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--purple-dark)]">
          Development review
        </p>
        <h1 className="text-5xl font-black leading-none text-[var(--ink)]">
          Digby site icon
        </h1>
        <p className="max-w-2xl text-lg font-bold text-[var(--muted)]">
          The actual generated 32px browser icon, 64px browser icon, and Apple icon
          resources, checked at tiny and home-screen sizes.
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <PreviewPanel title="White">
          <IconSizeRow backgroundClass="bg-white" />
        </PreviewPanel>
        <PreviewPanel title="Cream">
          <IconSizeRow backgroundClass="bg-[var(--cream)]" />
        </PreviewPanel>
        <PreviewPanel title="Dark tab">
          <IconSizeRow backgroundClass="bg-[#221713]" isDark />
        </PreviewPanel>
      </section>

      <section className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow)]">
        <h2 className="text-2xl font-black text-[var(--ink)]">Browser tab simulation</h2>
        <div className="mt-5 inline-flex max-w-full items-center gap-2 rounded-t-xl border border-[#3a302d] bg-[#1f1f1f] px-4 py-2 text-sm font-bold text-white">
          <img alt="" height="16" src="/icon/32?review=m10-tab" width="16" />
          <span>The Bible Bite</span>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <PreviewPanel title="Actual Apple icon resource">
          <div className="flex items-center gap-6">
            <img
              alt="Generated Digby Apple icon"
              className="rounded-[28px] shadow-[0_18px_34px_rgba(104,61,20,0.18)]"
              height="180"
              src="/apple-icon?review=m10-apple"
              width="180"
            />
            <div>
              <p className="text-sm font-black text-[var(--purple-dark)]">180px</p>
              <p className="mt-2 max-w-xs font-bold text-[var(--muted)]">
                Cream-backed home-screen treatment with Digby dominant and the bow tie
                preserved.
              </p>
            </div>
          </div>
        </PreviewPanel>

        <PreviewPanel title="Vector source preview">
          <div className="grid grid-cols-[96px_1fr] items-center gap-5">
            <div className="size-24">
              <DigbySiteIcon title="Digby site icon vector source" />
            </div>
            <p className="font-bold text-[var(--muted)]">
              The icon derivative reuses canonical Digby body geometry and keeps the
              approved face, purple bow tie, and centered gold cross.
            </p>
          </div>
        </PreviewPanel>
      </section>
    </main>
  );
}

function PreviewPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow)]">
      <h2 className="text-2xl font-black text-[var(--ink)]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function IconSizeRow({
  backgroundClass,
  isDark = false,
}: {
  backgroundClass: string;
  isDark?: boolean;
}) {
  return (
    <div className={`grid gap-5 rounded-xl p-4 ${backgroundClass}`}>
      {browserIcons.map((icon) => (
        <section className="grid gap-3" key={icon.src}>
          <h3 className={`text-xs font-black uppercase tracking-[0.12em] ${isDark ? "text-white" : "text-[var(--purple-dark)]"}`}>
            {icon.label}
          </h3>
          <div className="flex flex-wrap items-end gap-5">
            {icon.displaySizes.map((size) => (
              <figure className="grid gap-2 text-center" key={`${icon.src}-${size}`}>
                <img
                  alt={`${icon.label} displayed at ${size}px`}
                  height={size}
                  src={icon.src}
                  style={{ height: size, width: size }}
                  width={size}
                />
                <figcaption
                  className={`text-xs font-black ${isDark ? "text-white" : "text-[var(--muted)]"}`}
                >
                  {size}px display
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={`text-xs font-bold ${isDark ? "text-white/75" : "text-[var(--muted)]"}`}>
            Resource: {icon.naturalSize}px PNG
          </p>
        </section>
      ))}
    </div>
  );
}
