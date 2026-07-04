import Link from "next/link";
import { getPublishedBites } from "@/lib/bites";
import { getTopicName } from "@/lib/topics";

export const metadata = {
  title: "Archive",
  description: "Browse published Bible Bite quizzes and bite-sized lessons.",
};

export default function ArchivePage() {
  const bites = getPublishedBites();

  return (
    <main className="page-shell py-12">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
        Archive
      </p>
      <h1 className="mt-3 text-[clamp(3rem,10vw,5.5rem)] font-black leading-[0.95]">
        Every published bite.
      </h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {bites.map((bite) => (
          <Link
            className="focus-ring rounded-3xl border border-[var(--line)] bg-white/70 p-5 no-underline shadow-sm hover:border-purple-200"
            href={`/bites/${bite.slug}`}
            key={bite.slug}
          >
            <p className="text-sm font-black text-[var(--muted)]">
              {new Date(`${bite.date}T00:00:00`).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              {" · "}
              {getTopicName(bite.topic)}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight">{bite.title}</h2>
            <p className="mt-3 text-base font-bold leading-relaxed text-[var(--muted)]">
              {bite.bigTruth}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
