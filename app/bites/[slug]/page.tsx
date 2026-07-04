import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BitePage } from "@/components/BitePage";
import { getPublishedBiteBySlug, getPublishedBites } from "@/lib/bites";

export function generateStaticParams() {
  return getPublishedBites().map((bite) => ({ slug: bite.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bite = getPublishedBiteBySlug(slug);

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
  const bite = getPublishedBiteBySlug(slug);

  if (!bite) {
    notFound();
  }

  return <BitePage bite={bite} />;
}
