import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BitePage } from "@/components/BitePage";
import { getPublicBiteBySlug } from "@/lib/bites";
import type { BibleBite, ReaderBibleBite } from "@/lib/types";

export const dynamic = "force-dynamic";

function toReaderBibleBite(bite: BibleBite): ReaderBibleBite {
  return {
    date: bite.date,
    slug: bite.slug,
    title: bite.title,
    scriptureReference: bite.scriptureReference,
    scriptureText: bite.scriptureText,
    translation: bite.translation,
    topic: bite.topic,
    question: bite.question,
    answerChoices: bite.answerChoices,
    correctAnswer: bite.correctAnswer,
    explanation: bite.explanation,
    bigTruth: bite.bigTruth,
    takeTheBite: bite.takeTheBite,
    prayer: bite.prayer,
    deeperReading: bite.deeperReading,
    tags: bite.tags,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bite = getPublicBiteBySlug(slug);

  if (!bite) {
    return {};
  }

  return {
    title: bite.title,
    description: bite.bigTruth,
    openGraph: {
      title: bite.title,
      description: bite.bigTruth,
      url: `/bites/${bite.slug}`,
    },
  };
}

export default async function BiteRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bite = getPublicBiteBySlug(slug);

  if (!bite) {
    notFound();
  }

  return <BitePage bite={toReaderBibleBite(bite)} />;
}
