import { didJacobReallyWrestleWithGod } from "@/content/bites/did-jacob-really-wrestle-with-god";
import { didTheSerpentActuallyLieToEve } from "@/content/bites/did-the-serpent-actually-lie-to-eve";
import { whyDidGodAskAdamWhereAreYou } from "@/content/bites/why-did-god-ask-adam-where-are-you";
import { whyDidGodAskAbrahamToSacrificeIsaac } from "@/content/bites/why-did-god-ask-abraham-to-sacrifice-isaac";
import { whyDidGodAcceptAbelsOffering } from "@/content/bites/why-did-god-accept-abels-offering";
import { whyDidGodRestOnTheSeventhDay } from "@/content/bites/why-did-god-rest-on-the-seventh-day";
import { whyDidJesusAskQuestionsHeKnewTheAnswersTo } from "@/content/bites/why-did-jesus-ask-questions-he-knew-the-answers-to";
import { whyDidJesusCryIfLazarusWouldLive } from "@/content/bites/why-did-jesus-cry-if-lazarus-would-live";
import { whyDidJesusPrayIfHeIsGod } from "@/content/bites/why-did-jesus-pray-if-he-is-god";
import { whatDidJesusMeanByTurnTheOtherCheek } from "@/content/bites/what-did-jesus-mean-by-turn-the-other-cheek";
import { doesGodWontGiveYouMoreThanYouCanHandleComeFromTheBible } from "@/content/bites/does-god-wont-give-you-more-than-you-can-handle-come-from-the-bible";
import { whyWasRahabIncludedInJesusFamilyLine } from "@/content/bites/why-was-rahab-included-in-jesus-family-line";
import { whyDoesGodSeemDifferentInTheOldTestament } from "@/content/bites/why-does-god-seem-different-in-the-old-testament";
import { whyDidPeopleInGenesisLiveSoLong } from "@/content/bites/why-did-people-in-genesis-live-so-long";
import { answerBases, questionTypes } from "@/lib/editorialMetadata";
import { siteConfig } from "@/lib/siteConfig";
import type { AnswerBasis, AnswerChoice, BibleBite, BiteStatus, QuestionType } from "@/lib/types";
import { getBibleReadingUrl, hasBibleBook, hasBibleTranslation } from "@/lib/sources";
import { hasTopic } from "@/lib/topics";

const VALID_STATUSES: BiteStatus[] = ["draft", "approved", "published"];
const EM_DASH = "—";

const allBites: BibleBite[] = [
  whyDidGodAskAdamWhereAreYou,
  whyDidGodRestOnTheSeventhDay,
  didTheSerpentActuallyLieToEve,
  whyDidGodAcceptAbelsOffering,
  whyDidPeopleInGenesisLiveSoLong,
  whyDidGodAskAbrahamToSacrificeIsaac,
  didJacobReallyWrestleWithGod,
  whyDidJesusAskQuestionsHeKnewTheAnswersTo,
  whyDidJesusCryIfLazarusWouldLive,
  whatDidJesusMeanByTurnTheOtherCheek,
  doesGodWontGiveYouMoreThanYouCanHandleComeFromTheBible,
  whyDidJesusPrayIfHeIsGod,
  whyWasRahabIncludedInJesusFamilyLine,
  whyDoesGodSeemDifferentInTheOldTestament,
];

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[Bible Bite content] ${message}`);
  }
}

function validateRequiredString(bite: BibleBite, field: keyof BibleBite) {
  const value = bite[field];
  assert(typeof value === "string" && value.trim().length > 0, `${bite.slug || "unknown"} is missing ${String(field)}.`);
}

function isValidDateOnly(date: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(`${date}T00:00:00`));
}

function validateAnswerChoices(bite: BibleBite) {
  assert(Array.isArray(bite.answerChoices), `${bite.slug} is missing answerChoices.`);
  assert(bite.answerChoices.length === 4, `${bite.slug} must have exactly 4 answer choices.`);

  const ids = new Set<string>();
  const validIds = new Set(["A", "B", "C", "D"]);

  bite.answerChoices.forEach((choice: AnswerChoice) => {
    assert(validIds.has(choice.id), `${bite.slug} has invalid answer choice id ${choice.id}.`);
    assert(!ids.has(choice.id), `${bite.slug} has duplicate answer choice id ${choice.id}.`);
    assert(choice.text.trim().length > 0, `${bite.slug} has an empty answer choice.`);
    ids.add(choice.id);
  });

  assert(ids.has(bite.correctAnswer), `${bite.slug} correctAnswer must match one answer choice id.`);
}

function validateNoEmDash(value: string, field: string, slug: string) {
  assert(!value.includes(EM_DASH), `${slug} uses an em dash in ${field}. Use periods, commas, colons, semicolons, parentheses, or sentence breaks instead.`);
}

function validateEditorialStyle(bite: BibleBite) {
  [
    ["title", bite.title],
    ["curiosityHook", bite.curiosityHook],
    ["question", bite.question],
    ["explanation", bite.explanation],
    ["bigTruth", bite.bigTruth],
    ["takeTheBite", bite.takeTheBite],
    ["prayer", bite.prayer],
    ["deeperReading.prompt", bite.deeperReading.prompt],
  ].forEach(([field, value]) => validateNoEmDash(value, field, bite.slug));

  bite.answerChoices.forEach((choice) => {
    validateNoEmDash(choice.text, `answerChoices.${choice.id}`, bite.slug);
  });
}

function validateQuestionType(bite: BibleBite) {
  assert(
    questionTypes.includes(bite.questionType as QuestionType),
    `${bite.slug} has invalid questionType ${bite.questionType}.`,
  );
}

function validateAnswerBasis(bite: BibleBite) {
  assert(
    answerBases.includes(bite.answerBasis as AnswerBasis),
    `${bite.slug} has invalid answerBasis ${bite.answerBasis}.`,
  );
}

function validateDeeperReading(bite: BibleBite) {
  const reading = bite.deeperReading;

  assert(typeof reading === "object" && reading !== null, `${bite.slug} is missing deeperReading.`);
  assert(typeof reading.reference === "string" && reading.reference.trim().length > 0, `${bite.slug} is missing deeperReading.reference.`);
  assert(typeof reading.prompt === "string" && reading.prompt.trim().length > 0, `${bite.slug} is missing deeperReading.prompt.`);
  assert(typeof reading.book === "string" && reading.book.trim().length > 0, `${bite.slug} is missing deeperReading.book.`);
  assert(hasBibleBook(reading.book), `${bite.slug} uses unknown deeperReading book ${reading.book}.`);
  assert(Number.isInteger(reading.chapter) && reading.chapter > 0, `${bite.slug} has invalid deeperReading chapter.`);

  if (reading.verseStart !== undefined) {
    assert(Number.isInteger(reading.verseStart) && reading.verseStart > 0, `${bite.slug} has invalid deeperReading verseStart.`);
  }

  if (reading.verseEnd !== undefined) {
    assert(Number.isInteger(reading.verseEnd) && reading.verseEnd > 0, `${bite.slug} has invalid deeperReading verseEnd.`);
  }

  if (reading.verseStart !== undefined && reading.verseEnd !== undefined) {
    assert(reading.verseStart <= reading.verseEnd, `${bite.slug} deeperReading verseStart must be before verseEnd.`);
  }

  assert(Boolean(getBibleReadingUrl(bite.translation, reading)), `${bite.slug} deeperReading cannot produce a source URL.`);
}

function validateBite(bite: BibleBite) {
  [
    "date",
    "slug",
    "title",
    "curiosityHook",
    "scriptureReference",
    "scriptureText",
    "translation",
    "topic",
    "questionType",
    "answerBasis",
    "question",
    "correctAnswer",
    "explanation",
    "bigTruth",
    "takeTheBite",
    "prayer",
    "status",
  ].forEach((field) => validateRequiredString(bite, field as keyof BibleBite));

  assert(VALID_STATUSES.includes(bite.status), `${bite.slug} has invalid status ${bite.status}.`);
  assert(hasTopic(bite.topic), `${bite.slug} uses unknown topic ${bite.topic}.`);
  assert(hasBibleTranslation(bite.translation), `${bite.slug} uses unknown translation ${bite.translation}.`);
  assert(Array.isArray(bite.tags) && bite.tags.length > 0, `${bite.slug} must have at least one tag.`);
  assert(isValidDateOnly(bite.date), `${bite.slug} has invalid date ${bite.date}. Use YYYY-MM-DD.`);

  validateAnswerChoices(bite);
  validateQuestionType(bite);
  validateAnswerBasis(bite);
  validateEditorialStyle(bite);
  validateDeeperReading(bite);
}

function validateBites(bites: BibleBite[]) {
  const slugs = new Set<string>();
  const dates = new Set<string>();

  bites.forEach((bite) => {
    validateBite(bite);
    assert(!slugs.has(bite.slug), `Duplicate bite slug: ${bite.slug}.`);
    assert(!dates.has(bite.date), `Duplicate bite date: ${bite.date}.`);
    slugs.add(bite.slug);
    dates.add(bite.date);
  });
}

validateBites(allBites);

function sortByDateDesc(a: BibleBite, b: BibleBite) {
  return b.date.localeCompare(a.date);
}

export function getAllBites() {
  return [...allBites].sort(sortByDateDesc);
}

export function getPublicationDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.publicationTimeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  assert(Boolean(year && month && day), "Unable to determine publication date.");

  return `${year}-${month}-${day}`;
}

export function isPubliclyAvailableBite(bite: BibleBite, now = new Date()) {
  return bite.status === "published" && bite.date <= getPublicationDate(now);
}

export function getPublicBites(now = new Date()) {
  return getAllBites().filter((bite) => isPubliclyAvailableBite(bite, now));
}

export function getPublicBiteBySlug(slug: string, now = new Date()) {
  return getPublicBites(now).find((bite) => bite.slug === slug);
}

export function getPublicBitesByTopic(topic: string, now = new Date()) {
  return getPublicBites(now).filter((bite) => bite.topic === topic);
}

export function getTodayBite(now = new Date()) {
  const publicBites = getPublicBites(now);
  const today = getPublicationDate(now);
  const bite = publicBites.find((item) => item.date === today) ?? publicBites[0];

  assert(Boolean(bite), "No publicly available Bible Bites.");

  return bite;
}

export function getRelatedBites(currentSlug: string, limit = 3, now = new Date()) {
  const current = getPublicBiteBySlug(currentSlug, now);
  if (!current) {
    return [];
  }

  return getPublicBites(now)
    .filter((bite) => bite.slug !== current.slug && bite.topic === current.topic)
    .slice(0, limit);
}

export { validateBite };
