import { bibleBooks } from "@/content/sources/bibleBooks";
import { bibleTranslations } from "@/content/sources/bibleTranslations";
import type { BibleTranslationKey, DeeperReading } from "@/lib/types";

export function getBibleTranslations() {
  return bibleTranslations;
}

export function getBibleTranslation(key: string) {
  return bibleTranslations.find((translation) => translation.key === key);
}

export function hasBibleTranslation(key: string) {
  return Boolean(getBibleTranslation(key));
}

export function getBibleBooks() {
  return bibleBooks;
}

export function getBibleBook(key: string) {
  return bibleBooks.find((book) => book.key === key);
}

export function hasBibleBook(key: string) {
  return Boolean(getBibleBook(key));
}

export function formatBibleReadingReference(reading: DeeperReading) {
  return reading.reference;
}

export function getBibleReadingUrl(
  translationKey: BibleTranslationKey,
  reading: DeeperReading,
) {
  const translation = getBibleTranslation(translationKey);
  const book = getBibleBook(reading.book);

  if (!translation || !book) {
    return null;
  }

  if (translation.readingSource.provider === "eBible") {
    const chapter = String(reading.chapter).padStart(2, "0");
    const anchor = reading.verseStart ? `#V${reading.verseStart}` : "";

    return `${translation.readingSource.baseUrl}/${translation.readingSource.translationId}/${book.ebibleCode}${chapter}.htm${anchor}`;
  }

  return null;
}
