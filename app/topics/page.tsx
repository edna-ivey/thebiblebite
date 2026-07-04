import { TopicPill } from "@/components/TopicPill";
import { getPublishedBitesByTopic } from "@/lib/bites";
import { getTopics } from "@/lib/topics";

export const metadata = {
  title: "Topics",
  description: "Browse Bible Bite quizzes by topic.",
};

export default function TopicsPage() {
  const topics = getTopics();

  return (
    <main className="page-shell py-12">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
        Topics
      </p>
      <h1 className="mt-3 text-[clamp(3rem,10vw,5.5rem)] font-black leading-[0.95]">
        Pick a path.
      </h1>
      <div className="mt-8 flex flex-wrap gap-3">
        {topics.map((topic) => (
          <TopicPill key={topic.slug} topic={topic} />
        ))}
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {topics.map((topic) => (
          <section
            className="rounded-3xl border border-[var(--line)] bg-white/70 p-5 shadow-sm"
            key={topic.slug}
          >
            <p className="text-3xl" aria-hidden="true">
              {topic.icon}
            </p>
            <h2 className="mt-3 text-2xl font-black">{topic.name}</h2>
            <p className="mt-2 text-base font-bold leading-relaxed text-[var(--muted)]">
              {topic.description}
            </p>
            <p className="mt-4 text-sm font-black text-[var(--purple-dark)]">
              {getPublishedBitesByTopic(topic.slug).length} published bites
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
