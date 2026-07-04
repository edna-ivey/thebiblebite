import { whyDidGodAskAdamWhereAreYou } from "@/content/bites/why-did-god-ask-adam-where-are-you";
import type { AnswerChoice, BibleBite, BiteStatus } from "@/lib/types";
import { hasBibleTranslation } from "@/lib/sources";
import { hasTopic } from "@/lib/topics";

const VALID_STATUSES: BiteStatus[] = ["draft", "approved", "published"];

const allBites: BibleBite[] = [whyDidGodAskAdamWhereAreYou];

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[Bible Bite content] ${message}`);
  }
}

function validateRequiredString(bite: BibleBite, field: keyof BibleBite) {
  const value = bite[field];
  assert(typeof value === "string" && value.trim().length > 0, `${bite.slug || "unknown"} is missing ${String(field)}.`);
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

function validateBite(bite: BibleBite) {
  [
    "date",
    "slug",
    "title",
    "scriptureReference",
    "scriptureText",
    "translation",
    "topic",
    "question",
    "correctAnswer",
    "explanation",
    "bigTruth",
    "takeTheBite",
    "prayer",
    "deeperReading",
    "status",
  ].forEach((field) => validateRequiredString(bite, field as keyof BibleBite));

  assert(VALID_STATUSES.includes(bite.status), `${bite.slug} has invalid status ${bite.status}.`);
  assert(hasTopic(bite.topic), `${bite.slug} uses unknown topic ${bite.topic}.`);
  assert(hasBibleTranslation(bite.translation), `${bite.slug} uses unknown translation ${bite.translation}.`);
  assert(Array.isArray(bite.tags) && bite.tags.length > 0, `${bite.slug} must have at least one tag.`);
  assert(!Number.isNaN(Date.parse(`${bite.date}T00:00:00`)), `${bite.slug} has invalid date ${bite.date}.`);

  validateAnswerChoices(bite);
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

export function getPublishedBites() {
  return getAllBites().filter((bite) => bite.status === "published");
}

export function getPublishedBiteBySlug(slug: string) {
  return getPublishedBites().find((bite) => bite.slug === slug);
}

export function getPublishedBitesByTopic(topic: string) {
  return getPublishedBites().filter((bite) => bite.topic === topic);
}

export function getTodayBite(now = new Date()) {
  const published = getPublishedBites();
  const today = now.toISOString().slice(0, 10);
  return published.find((bite) => bite.date === today) ?? published[0];
}

export function getRelatedBites(currentSlug: string, limit = 3) {
  const current = getPublishedBiteBySlug(currentSlug);
  if (!current) {
    return [];
  }

  return getPublishedBites()
    .filter((bite) => bite.slug !== current.slug && bite.topic === current.topic)
    .slice(0, limit);
}
