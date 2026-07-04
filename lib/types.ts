export type BiteStatus = "draft" | "approved" | "published";

export type BibleTranslationKey = "WEB" | (string & {});

export type TopicSlug = string;

export type AnswerChoice = {
  id: "A" | "B" | "C" | "D";
  text: string;
};

export type BibleBite = {
  date: string;
  slug: string;
  title: string;
  scriptureReference: string;
  scriptureText: string;
  translation: BibleTranslationKey;
  topic: TopicSlug;
  question: string;
  answerChoices: AnswerChoice[];
  correctAnswer: AnswerChoice["id"];
  explanation: string;
  bigTruth: string;
  takeTheBite: string;
  prayer: string;
  deeperReading: string;
  tags: string[];
  status: BiteStatus;
};

export type BibleTranslationSource = {
  key: BibleTranslationKey;
  name: string;
  publicDomain: boolean;
  attribution: string;
  sourceUrl: string;
  allowedUseNotes: string;
};

export type Topic = {
  slug: TopicSlug;
  name: string;
  description: string;
  icon: string;
  accent: "purple" | "teal" | "gold" | "orange" | "rose" | "green" | "blue";
};
