"use client";

import { useEffect, useRef } from "react";
import { DigbyMascot } from "@/components/DigbyMascot";
import type { ReaderBibleBite } from "@/lib/types";

type QuizRevealProps = {
  bite: ReaderBibleBite;
  revealed: boolean;
  selectedAnswer: string | null;
  setSelectedAnswer: (answerId: string) => void;
  onReveal: () => void;
};

export function QuizReveal({
  bite,
  revealed,
  selectedAnswer,
  setSelectedAnswer,
  onReveal,
}: QuizRevealProps) {
  const feedbackRef = useRef<HTMLDivElement>(null);
  const isCorrect = selectedAnswer === bite.correctAnswer;
  const explanationParagraphs = bite.explanation.split(/\n{2,}/).filter(Boolean);

  useEffect(() => {
    if (!revealed || !feedbackRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    feedbackRef.current.focus({ preventScroll: true });
    feedbackRef.current.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [revealed]);

  return (
    <section className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-sm">
      <h2 className="flex items-center gap-2 bg-gradient-to-r from-[var(--teal)] to-[#11b9b6] px-5 py-4 text-lg font-black uppercase text-white">
        <span aria-hidden="true">❖</span>
        Quick Quiz
      </h2>
      <div className="p-5">
        <p className="mb-4 text-xl font-black leading-snug text-[var(--ink)]">
          {bite.question}
        </p>
        <div className="grid gap-3">
          {bite.answerChoices.map((choice) => {
            const isCorrectChoice = choice.id === bite.correctAnswer;
            const isWrong = revealed && selectedAnswer === choice.id && !isCorrectChoice;
            const isSelected = selectedAnswer === choice.id;
            const resultLabel = revealed
              ? isCorrectChoice
                ? "Correct answer"
                : isWrong
                  ? "Your answer"
                  : null
              : null;

            return (
              <button
                className={[
                  "focus-ring grid min-h-14 grid-cols-[2.4rem_1fr] items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-base font-black transition",
                  revealed && isCorrectChoice
                    ? "border-[var(--teal)] bg-gradient-to-r from-[#28b9b2] to-[#0d9698] text-white"
                    : "border-[#ead8c5] bg-[#fffdf8] text-[var(--ink)] hover:border-[var(--teal)]",
                  isSelected && !revealed ? "border-[var(--teal)] bg-teal-50" : "",
                  isWrong ? "border-[#f06b58] bg-orange-50 text-[var(--ink)]" : "",
                  revealed && !isCorrectChoice && !isWrong ? "opacity-75" : "",
                ].join(" ")}
                disabled={revealed}
                aria-pressed={isSelected}
                key={choice.id}
                onClick={() => setSelectedAnswer(choice.id)}
                type="button"
              >
                <span className="grid size-7 place-items-center rounded-full bg-[#fff4e1] text-sm text-[var(--ink)]">
                  {choice.id}
                </span>
                <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span>{choice.text}</span>
                  {resultLabel ? (
                    <span
                      className={[
                        "rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-[0.08em]",
                        isCorrectChoice
                          ? "bg-white/90 text-[var(--teal-dark)]"
                          : "bg-white text-[#9f2f21]",
                      ].join(" ")}
                    >
                      {resultLabel}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {!revealed ? (
          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              className="focus-ring rounded-full border-2 border-teal-100 bg-teal-50 px-5 py-3 text-sm font-black text-[var(--teal-dark)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!selectedAnswer}
              onClick={onReveal}
              type="button"
            >
              Check my answer
            </button>
            <span className="text-3xl leading-none text-[var(--teal-dark)]" aria-hidden="true">
              ⌁
            </span>
          </div>
        ) : null}

        {revealed ? (
          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <div
              aria-live="polite"
              className={[
                "mb-5 flex items-center gap-4 rounded-2xl border-2 p-4",
                isCorrect ? "border-teal-200 bg-teal-50" : "border-amber-200 bg-amber-50",
              ].join(" ")}
              ref={feedbackRef}
              role="status"
              tabIndex={-1}
            >
              <DigbyMascot
                className="size-20 shrink-0"
                expression={isCorrect ? "celebrate" : "look-closer"}
              />
              <div>
                <h3 className="text-xl font-black leading-tight text-[var(--ink)]">
                  {isCorrect ? "You got it!" : "Not quite. Let's look closer."}
                </h3>
                <p className="mt-1 text-base font-bold leading-relaxed text-[var(--muted)]">
                  {isCorrect
                    ? "Now let's look at why."
                    : "The correct answer is highlighted above."}
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#fffdf8] p-4">
              <p className="mb-2 text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
                Explanation
              </p>
              <h3 className="mb-3 text-2xl font-black leading-tight text-[var(--ink)]">
                Here is the beautiful twist.
              </h3>
              <div className="grid gap-4">
                {explanationParagraphs.map((paragraph) => (
                  <p
                    className="text-lg font-bold leading-relaxed text-[var(--muted)]"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
