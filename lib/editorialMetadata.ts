import type { AnswerBasis, QuestionType } from "@/lib/types";

export const questionTypeDefinitions: Record<QuestionType, string> = {
  "look-closer":
    "An interesting question raised directly by details in the biblical text.",
  context:
    "Historical, literary, cultural, sequence, or surrounding-passage context meaningfully changes understanding.",
  "big-meaning":
    "A familiar statement, verse, image, or biblical moment needs to be unpacked beyond the surface.",
  "hard-question":
    "A sincere difficult Bible or faith question that deserves a careful answer.",
};

export const answerBasisDefinitions: Record<AnswerBasis, string> = {
  "explicit-text":
    "The answer is directly stated or unambiguously established in Scripture.",
  "strong-contextual-inference":
    "The answer is strongly supported by the passage and biblical context, but the exact conclusion is an interpretation or inference rather than an explicit statement.",
  debated:
    "Faithful Christian interpreters or major Christian traditions meaningfully disagree about the answer.",
};

export const questionTypes = Object.keys(questionTypeDefinitions) as QuestionType[];
export const answerBases = Object.keys(answerBasisDefinitions) as AnswerBasis[];
