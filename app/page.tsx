import { DailyBiteCard } from "@/components/DailyBiteCard";
import { HeroSection } from "@/components/HeroSection";
import { TopicPill } from "@/components/TopicPill";
import { getTodayBite } from "@/lib/bites";
import { getTopics } from "@/lib/topics";

export const dynamic = "force-dynamic";

export default function Home() {
  const todayBite = getTodayBite();
  const topics = getTopics();

  return (
    <main>
      <HeroSection todayHref={`/bites/${todayBite.slug}`} />
      <DailyBiteCard bite={todayBite} />

      <section
        className="full-band page-shell py-12 before:bg-white/40"
        id="how-it-works"
      >
        <h2 className="text-center text-3xl font-black text-[var(--ink)]">
          <span className="text-[var(--gold)]">☀</span> How it works{" "}
          <span className="text-[var(--gold)]">☀</span>
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Step number="1" title="Take the Quiz" tone="bg-[var(--purple)]">
            A quick question to get you thinking about God’s Word.
          </Step>
          <Step number="2" title="Learn the Truth" tone="bg-[var(--teal)]">
            Read a short explanation that unpacks Scripture in a powerful way.
          </Step>
          <Step number="3" title="Grow in Faith" tone="bg-[#d88402]">
            Apply one simple truth today and talk to God in prayer.
          </Step>
        </div>
      </section>

      <section className="full-band page-shell py-12 before:bg-gradient-to-r before:from-teal-50 before:to-amber-50" id="topics">
        <h2 className="text-center text-3xl font-black text-[var(--ink)]">
          Browse by Topic
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {topics.map((topic) => (
            <TopicPill key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </main>
  );
}

function Step({
  children,
  number,
  title,
  tone,
}: {
  children: React.ReactNode;
  number: string;
  title: string;
  tone: string;
}) {
  return (
    <article className="rounded-3xl bg-white/65 p-5 shadow-sm">
      <span className={`grid size-9 place-items-center rounded-full text-sm font-black text-white ${tone}`}>
        {number}
      </span>
      <h3 className="mt-4 text-xl font-black">{title}</h3>
      <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--muted)]">
        {children}
      </p>
    </article>
  );
}
