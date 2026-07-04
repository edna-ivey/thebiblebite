import Link from "next/link";
import type { Topic } from "@/lib/types";

const accentClasses: Record<Topic["accent"], string> = {
  purple: "bg-purple-100 text-purple-900",
  teal: "bg-teal-100 text-teal-900",
  gold: "bg-amber-100 text-amber-900",
  orange: "bg-orange-100 text-orange-900",
  rose: "bg-pink-100 text-pink-900",
  green: "bg-lime-100 text-lime-900",
  blue: "bg-blue-100 text-blue-900",
};

export function TopicPill({ topic }: { topic: Topic }) {
  return (
    <Link
      className={`focus-ring inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-black no-underline ${accentClasses[topic.accent]}`}
      href={`/topics/${topic.slug}`}
    >
      <span aria-hidden="true">{topic.icon}</span>
      {topic.name}
    </Link>
  );
}
