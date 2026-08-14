"use client";

import { useId, useMemo, useState } from "react";
import {
  ASK_DIGBY_MESSAGE_MAX_LENGTH,
  askDigbyReasons,
  type AskDigbyBiteContext,
  type AskDigbyFieldErrors,
  type AskDigbyReason,
} from "@/lib/askDigby";

type AskDigbyFormProps = {
  biteContext?: AskDigbyBiteContext;
  initialReason: AskDigbyReason;
};

type FormState = "idle" | "sending" | "success" | "error";

export function AskDigbyForm({ biteContext, initialReason }: AskDigbyFormProps) {
  const formId = useId();
  const [reason, setReason] = useState<AskDigbyReason>(initialReason);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<AskDigbyFieldErrors>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const startedAt = useMemo(() => Date.now(), []);
  const remainingCharacters = ASK_DIGBY_MESSAGE_MAX_LENGTH - message.length;
  const isSending = formState === "sending";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setFieldErrors({});

    try {
      const response = await fetch("/api/ask-digby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason,
          name,
          email,
          message,
          website,
          startedAt,
          biteSlug: biteContext?.slug ?? "",
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; fieldErrors?: AskDigbyFieldErrors }
        | null;

      if (response.ok && result?.ok) {
        setFormState("success");
        return;
      }

      setFieldErrors(result?.fieldErrors ?? {});
    } catch {
      setFieldErrors({});
    }

    setFormState("error");
  }

  if (formState === "success") {
    return (
      <section
        aria-live="polite"
        className="rounded-[2rem] border-2 border-purple-100 bg-white/80 p-6 shadow-sm md:p-8"
        role="status"
      >
        <h2 className="text-3xl font-black leading-tight text-[var(--ink)]">
          Digby got it. 💜
        </h2>
        <p className="mt-4 text-lg font-bold leading-relaxed text-[var(--muted)]">
          Thanks for reaching out. We&apos;ll take a closer look.
        </p>
        <p className="mt-3 text-base font-black leading-relaxed text-[var(--purple-dark)]">
          If you left your email, we may reply when we can.
        </p>
      </section>
    );
  }

  return (
    <form
      className="rounded-[2rem] border border-[var(--line)] bg-white/80 p-5 shadow-sm md:p-7"
      onSubmit={handleSubmit}
      noValidate
    >
      {biteContext ? (
        <section
          aria-labelledby={`${formId}-bite-context`}
          className="mb-6 rounded-2xl border-2 border-teal-100 bg-teal-50 p-4"
        >
          <p
            className="text-sm font-black uppercase tracking-[0.14em] text-[var(--teal-dark)]"
            id={`${formId}-bite-context`}
          >
            About this Bite
          </p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-[var(--ink)]">
            {biteContext.title}
          </h2>
          <p className="mt-2 text-base font-black text-[var(--muted)]">
            {biteContext.scriptureReference}
          </p>
        </section>
      ) : null}

      <fieldset
        aria-describedby={fieldErrors.reason ? `${formId}-reason-error` : undefined}
        className="grid gap-3"
      >
        <legend className="text-lg font-black text-[var(--ink)]">
          What brings you here? <span className="text-[var(--purple-dark)]">(required)</span>
        </legend>
        {askDigbyReasons.map((item) => (
          <label
            className={[
              "focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-purple-300 flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 font-black transition",
              reason === item.value
                ? "border-[var(--purple)] bg-purple-50 text-[var(--purple-dark)]"
                : "border-[#ead8c5] bg-[#fffdf8] text-[var(--ink)]",
            ].join(" ")}
            key={item.value}
          >
            <input
              checked={reason === item.value}
              className="mt-1 size-5 accent-[var(--purple)]"
              name="reason"
              onChange={() => setReason(item.value)}
              type="radio"
              value={item.value}
            />
            <span>{item.label}</span>
          </label>
        ))}
        {fieldErrors.reason ? (
          <p className="text-sm font-black text-[#9f2f21]" id={`${formId}-reason-error`}>
            {fieldErrors.reason}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-black text-[var(--ink)]" htmlFor={`${formId}-name`}>
            Name <span className="text-[var(--muted)]">(optional)</span>
          </label>
          <input
            aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
            aria-invalid={Boolean(fieldErrors.name)}
            autoComplete="name"
            className="focus-ring mt-2 w-full rounded-2xl border-2 border-[#ead8c5] bg-[#fffdf8] px-4 py-3 font-bold text-[var(--ink)]"
            id={`${formId}-name`}
            maxLength={100}
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          {fieldErrors.name ? (
            <p className="mt-2 text-sm font-black text-[#9f2f21]" id={`${formId}-name-error`}>
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-black text-[var(--ink)]" htmlFor={`${formId}-email`}>
            Email <span className="text-[var(--muted)]">(optional)</span>
          </label>
          <input
            aria-describedby={[
              `${formId}-email-help`,
              fieldErrors.email ? `${formId}-email-error` : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-invalid={Boolean(fieldErrors.email)}
            autoComplete="email"
            className="focus-ring mt-2 w-full rounded-2xl border-2 border-[#ead8c5] bg-[#fffdf8] px-4 py-3 font-bold text-[var(--ink)]"
            id={`${formId}-email`}
            maxLength={254}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
          <p className="mt-2 text-sm font-bold text-[var(--muted)]" id={`${formId}-email-help`}>
            Add your email if you&apos;d like a reply.
          </p>
          {fieldErrors.email ? (
            <p className="mt-2 text-sm font-black text-[#9f2f21]" id={`${formId}-email-error`}>
              {fieldErrors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-black text-[var(--ink)]" htmlFor={`${formId}-message`}>
          What&apos;s on your mind? <span className="text-[var(--purple-dark)]">(required)</span>
        </label>
        <textarea
          aria-describedby={[
            `${formId}-message-help`,
            fieldErrors.message ? `${formId}-message-error` : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={Boolean(fieldErrors.message)}
          className="focus-ring mt-2 min-h-48 w-full resize-y rounded-2xl border-2 border-[#ead8c5] bg-[#fffdf8] px-4 py-3 font-bold leading-relaxed text-[var(--ink)]"
          id={`${formId}-message`}
          maxLength={ASK_DIGBY_MESSAGE_MAX_LENGTH}
          name="message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell Digby what made you stop and wonder."
          required
          value={message}
        />
        <p className="mt-2 text-sm font-bold text-[var(--muted)]" id={`${formId}-message-help`}>
          {remainingCharacters} characters left.
        </p>
        {fieldErrors.message ? (
          <p className="mt-2 text-sm font-black text-[#9f2f21]" id={`${formId}-message-error`}>
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          autoComplete="off"
          id={`${formId}-website`}
          name="website"
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          value={website}
        />
      </div>

      <p className="mt-5 rounded-2xl bg-[#fff4e1] p-4 text-sm font-black leading-relaxed text-[var(--muted)]">
        Your message is private. Please don&apos;t include sensitive personal information.
      </p>

      {formState === "error" ? (
        <div
          aria-live="assertive"
          className="mt-5 rounded-2xl border-2 border-orange-200 bg-orange-50 p-4"
          role="alert"
        >
          <h2 className="text-xl font-black text-[var(--ink)]">That one didn&apos;t go through.</h2>
          <p className="mt-1 font-bold text-[var(--muted)]">Please try again.</p>
        </div>
      ) : null}

      {fieldErrors.form ? (
        <p className="mt-3 text-sm font-black text-[#9f2f21]">{fieldErrors.form}</p>
      ) : null}

      <button
        className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[var(--purple)] to-[#9b45c6] px-8 py-3 text-lg font-black text-white shadow-[0_14px_24px_rgba(114,40,154,0.22)] disabled:cursor-not-allowed disabled:opacity-60 max-sm:w-full"
        disabled={isSending}
        type="submit"
      >
        {isSending ? "Sending..." : "Send to Digby"}
      </button>
    </form>
  );
}
