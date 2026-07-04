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
    </main>
  );
}
