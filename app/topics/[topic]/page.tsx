import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicBitesByTopic } from "@/lib/bites";
import { getTopicBySlug } from "@/lib/topics";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {};
  }

  return {
    title: topic.name,
    description: topic.description,
  };
}

export default async function TopicRoute({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const bites = getPublicBitesByTopic(topic.slug);

  return (
    <main className="page-shell py-12">
      <p className="text-5xl" aria-hidden="true">
        {topic.icon}
      </p>
      <h1 className="mt-4 text-[clamp(3rem,10vw,5.5rem)] font-black leading-[0.95]">
        {topic.name}
      </h1>
      <p className="mt-5 max-w-2xl text-xl font-bold leading-relaxed text-[var(--muted)]">
        {topic.description}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bites.length > 0 ? (
          bites.map((bite) => (
            <Link
              className="focus-ring rounded-3xl border border-[var(--line)] bg-white/70 p-5 no-underline shadow-sm hover:border-purple-200"
              href={`/bites/${bite.slug}`}
              key={bite.slug}
            >
              <p className="text-sm font-black text-[var(--muted)]">
                {bite.scriptureReference}
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight">{bite.title}</h2>
              <p className="mt-3 text-base font-bold leading-relaxed text-[var(--muted)]">
                {bite.curiosityHook}
              </p>
            </Link>
          ))
        ) : (
          <p className="rounded-3xl border border-[var(--line)] bg-white/70 p-5 text-base font-bold text-[var(--muted)]">
            No Bites here yet.
          </p>
        )}
      </div>
    </main>
  );
}
