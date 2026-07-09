export type BiteStatus = "draft" | "approved" | "published";

export type BibleTranslationKey = "WEB" | (string & {});

export type TopicSlug =
  | "faith-and-god"
  | "jesus-and-the-gospel"
  | "people-and-stories"
  | "bible-and-history"
  | "prayer-and-worship"
  | "wisdom-and-life"
  | "hard-questions"
  | "weird-and-wonderful";
export type BibleBookKey = "genesis" | (string & {});
export type QuestionType =
  | "look-closer"
  | "context"
  | "big-meaning"
  | "hard-question"
  | "surprising-detail";
export type AnswerBasis =
  | "explicit-text"
  | "strong-contextual-inference"
  | "debated";
export type AnswerSatisfaction = "clear" | "strong" | "open";

export type AnswerChoice = {
  id: "A" | "B" | "C" | "D";
  text: string;
};

export type DeeperReading = {
  reference: string;
  prompt: string;
  book: BibleBookKey;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
};

export type BibleBite = {
  date: string;
  slug: string;
  title: string;
  curiosityHook: string;
  scriptureReference: string;
  scriptureText: string;
  translation: BibleTranslationKey;
  topic: TopicSlug;
  questionType: QuestionType;
  answerBasis: AnswerBasis;
  answerSatisfaction: AnswerSatisfaction;
  question: string;
  answerChoices: AnswerChoice[];
  correctAnswer: AnswerChoice["id"];
  explanation: string;
  bigTruth: string;
  takeTheBite: string;
  prayer: string;
  deeperReading: DeeperReading;
  tags: string[];
  status: BiteStatus;
};

export type ReaderBibleBite = Pick<
  BibleBite,
  | "date"
  | "slug"
  | "title"
  | "scriptureReference"
  | "scriptureText"
  | "translation"
  | "topic"
  | "question"
  | "answerChoices"
  | "correctAnswer"
  | "explanation"
  | "bigTruth"
  | "takeTheBite"
  | "prayer"
  | "deeperReading"
  | "tags"
>;

export type DailyBiteTeaser = Pick<
  BibleBite,
  | "date"
  | "slug"
  | "title"
  | "curiosityHook"
  | "scriptureReference"
  | "topic"
>;

export type BibleReadingSource =
  | {
      provider: "eBible";
      translationId: string;
      baseUrl: string;
    };

export type BibleTranslationSource = {
  key: BibleTranslationKey;
  name: string;
  edition?: string;
  publicDomain: boolean;
  attribution: string;
  sourceUrl: string;
  readingSource: BibleReadingSource;
  allowedUseNotes: string;
};

export type BibleBook = {
  key: BibleBookKey;
  name: string;
  ebibleCode: string;
};

export type SiteLink = {
  href: string;
  label: string;
};

export type SisterProject = SiteLink & {
  description: string;
};

export type Topic = {
  slug: TopicSlug;
  name: string;
  description: string;
  icon: string;
  accent: "purple" | "teal" | "gold" | "orange" | "rose" | "green" | "blue";
};
