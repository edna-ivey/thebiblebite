"use client";

import { useState } from "react";
import type { BibleBite } from "@/lib/types";

export function QuizReveal({ bite }: { bite: BibleBite }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

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
            const isCorrect = choice.id === bite.correctAnswer;
            const isWrong = revealed && selectedAnswer === choice.id && !isCorrect;
            const isSelected = selectedAnswer === choice.id;

            return (
              <button
                className={[
                  "focus-ring grid min-h-14 grid-cols-[2.4rem_1fr_1.5rem] items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-base font-black transition",
                  revealed && isCorrect
                    ? "border-[var(--teal)] bg-gradient-to-r from-[#28b9b2] to-[#0d9698] text-white"
                    : "border-[#ead8c5] bg-[#fffdf8] text-[var(--ink)] hover:border-[var(--teal)]",
                  isSelected && !revealed ? "border-[var(--teal)] bg-teal-50" : "",
                  isWrong ? "border-[#f06b58] bg-orange-50" : "",
                ].join(" ")}
                disabled={revealed}
                key={choice.id}
                onClick={() => setSelectedAnswer(choice.id)}
                type="button"
              >
                <span className="grid size-7 place-items-center rounded-full bg-[#fff4e1] text-sm text-[var(--ink)]">
                  {choice.id}
                </span>
                <span>{choice.text}</span>
                <span className="text-right">{revealed && isCorrect ? "✓" : ""}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            className="focus-ring rounded-full border-2 border-teal-100 bg-teal-50 px-5 py-3 text-sm font-black text-[var(--teal-dark)] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!selectedAnswer || revealed}
            onClick={() => setRevealed(true)}
            type="button"
          >
            {revealed ? "Explanation opened" : "Check my answer"}
          </button>
          <span className="text-3xl leading-none text-[var(--teal-dark)]" aria-hidden="true">
            ⌁
          </span>
        </div>

        {revealed ? (
          <div className="mt-5 border-t border-[var(--line)] pt-5">
            <h3 className="mb-3 text-2xl font-black leading-tight text-[var(--ink)]">
              Here is the beautiful twist.
            </h3>
            <p className="text-base font-bold leading-relaxed text-[var(--muted)]">
              {bite.explanation}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
