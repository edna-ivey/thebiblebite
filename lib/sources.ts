import { bibleTranslations } from "@/content/sources/bibleTranslations";

export function getBibleTranslations() {
  return bibleTranslations;
}

export function getBibleTranslation(key: string) {
  return bibleTranslations.find((translation) => translation.key === key);
}

export function hasBibleTranslation(key: string) {
  return Boolean(getBibleTranslation(key));
}
