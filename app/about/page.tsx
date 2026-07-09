import { DigbyMascot } from "@/components/DigbyMascot";
import { MissionSection } from "@/components/MissionSection";

export const metadata = {
  title: "About",
  description:
    "Why The Bible Bite exists: to make Scripture approachable, memorable, and joyful.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-shell py-12">
        <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
          About
        </p>
        <h1 className="mt-3 max-w-4xl text-[clamp(3rem,10vw,5.5rem)] font-black leading-[0.95]">
          Bible learning should taste good.
        </h1>
        <p className="mt-6 max-w-3xl text-xl font-bold leading-relaxed text-[var(--muted)]">
          The Bible Bite is for busy believers, families, curious Christians, and
          new Bible readers who want Scripture to feel approachable. One question.
          One truth. One prayer. One small step toward God.
        </p>
      </section>
      <MissionSection />
      <section className="mx-auto my-8 grid w-[min(78rem,calc(100%_-_2rem))] items-center gap-6 rounded-[1.75rem] border-2 border-purple-100 bg-white/75 p-5 shadow-sm md:w-[min(78rem,calc(100%_-_6rem))] md:grid-cols-[12rem_1fr] lg:p-8">
        <div className="grid place-items-center rounded-[1.5rem] bg-[var(--background)] p-5">
          <DigbyMascot className="size-36" />
        </div>
        <div>
          <h2 className="text-3xl font-black leading-tight text-[var(--ink)]">
            Meet Digby. He asks a lot of questions.
          </h2>
          <div className="mt-4 grid gap-3 text-base font-bold leading-relaxed text-[var(--muted)]">
            <p>So do we.</p>
            <p>
              Digby is The Bible Bite&apos;s curious little guide. He likes to slow
              down, look closer, and ask the question you were already thinking.
            </p>
            <p>
              Around here, questions are not something to be embarrassed by.
              Sometimes they are where understanding begins.
            </p>
            <p className="font-black text-[var(--purple-dark)]">
              Let&apos;s dig into God&apos;s Word.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
