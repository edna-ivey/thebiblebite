import type { ReaderBibleBite } from "@/lib/types";
import { BiteExperience } from "@/components/BiteExperience";
import { getBiteReadingTime } from "@/lib/readingTime";

export function BitePage({ bite }: { bite: ReaderBibleBite }) {
  const readingMinutes = getBiteReadingTime(bite);

  return <BiteExperience bite={bite} readingMinutes={readingMinutes} />;
}
