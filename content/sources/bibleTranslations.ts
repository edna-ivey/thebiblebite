import type { BibleTranslationSource } from "@/lib/types";

export const bibleTranslations: BibleTranslationSource[] = [
  {
    key: "WEB",
    name: "World English Bible",
    edition: "Classic",
    publicDomain: true,
    attribution:
      "Scripture quotations are from the Classic World English Bible, public domain.",
    sourceUrl: "https://ebible.org/eng-web/",
    readingSource: {
      provider: "eBible",
      translationId: "eng-web",
      baseUrl: "https://ebible.org",
    },
    allowedUseNotes:
      "Public domain modern English Bible translation suitable for copied Scripture text. This project uses the Classic World English Bible wording.",
  },
];
