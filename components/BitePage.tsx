import type { BibleBite } from "@/lib/types";
import { BiteExperience } from "@/components/BiteExperience";
import { getBiteReadingTime } from "@/lib/readingTime";

export function BitePage({ bite }: { bite: BibleBite }) {
  const readingMinutes = getBiteReadingTime(bite);

  return <BiteExperience bite={bite} readingMinutes={readingMinutes} />;
}
