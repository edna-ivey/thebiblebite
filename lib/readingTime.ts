import type { BibleBite } from "@/lib/types";

export function getBiteReadingTime(bite: BibleBite) {
  const words = [
    bite.scriptureText,
    bite.question,
    bite.explanation,
    bite.bigTruth,
    bite.takeTheBite,
    bite.prayer,
    bite.deeperReading.reference,
  ].join(" ");

  const wordCount = words.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 160));
}
