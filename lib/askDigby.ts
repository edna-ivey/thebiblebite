import type { BibleBite } from "@/lib/types";

export const ASK_DIGBY_MESSAGE_MIN_LENGTH = 10;
export const ASK_DIGBY_MESSAGE_MAX_LENGTH = 4000;
export const ASK_DIGBY_NAME_MAX_LENGTH = 100;
export const ASK_DIGBY_EMAIL_MAX_LENGTH = 254;
export const ASK_DIGBY_SLUG_MAX_LENGTH = 160;
export const ASK_DIGBY_MIN_DWELL_MS = 2500;
export const ASK_DIGBY_MAX_BODY_BYTES = 12000;

export const askDigbyReasons = [
  {
    value: "bible-question",
    label: "I have a Bible question",
    subject: "[Ask Digby] Bible question",
  },
  {
    value: "look-closer",
    label: "I think we should look closer at a Bite",
    subject: "[Ask Digby] Look closer at a Bite",
  },
  {
    value: "discuss-bite",
    label: "I want to discuss this Bite",
    subject: "[Ask Digby] Discuss a Bite",
  },
  {
    value: "future-bite-idea",
    label: "I have an idea for a future Bite",
    subject: "[Ask Digby] Future Bite idea",
  },
  {
    value: "general-note",
    label: "Just sending a note",
    subject: "[Ask Digby] Reader note",
  },
] as const;

export type AskDigbyReason = (typeof askDigbyReasons)[number]["value"];

export type AskDigbyBiteContext = Pick<
  BibleBite,
  "slug" | "title" | "scriptureReference"
>;

export type AskDigbySubmission = {
  reason: AskDigbyReason;
  name: string;
  email: string;
  message: string;
  biteSlug: string;
  startedAt: number;
  website: string;
};

export type AskDigbyFieldErrors = Partial<
  Record<"reason" | "name" | "email" | "message" | "biteSlug" | "form", string>
>;

export type AskDigbyValidationResult =
  | { ok: true; data: AskDigbySubmission }
  | { ok: false; fieldErrors: AskDigbyFieldErrors };

export function isAskDigbyReason(value: unknown): value is AskDigbyReason {
  return askDigbyReasons.some((reason) => reason.value === value);
}

export function getAskDigbyReason(value: AskDigbyReason) {
  return askDigbyReasons.find((reason) => reason.value === value) ?? askDigbyReasons[0];
}

export function normalizeAskDigbyReason(value: unknown): AskDigbyReason {
  return isAskDigbyReason(value) ? value : "bible-question";
}

export function getSingleSearchParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isReasonableEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isReasonableSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function validateAskDigbySubmission(
  payload: unknown,
  now = Date.now(),
): AskDigbyValidationResult {
  const fieldErrors: AskDigbyFieldErrors = {};

  if (!payload || typeof payload !== "object") {
    return { ok: false, fieldErrors: { form: "Please try again." } };
  }

  const data = payload as Record<string, unknown>;
  const reason = data.reason;
  const validatedReason = isAskDigbyReason(reason) ? reason : null;
  const name = stringValue(data.name);
  const email = stringValue(data.email);
  const message = stringValue(data.message);
  const biteSlug = stringValue(data.biteSlug);
  const website = stringValue(data.website);
  const startedAt = typeof data.startedAt === "number" ? data.startedAt : 0;

  if (!validatedReason) {
    fieldErrors.reason = "Choose what brings you here.";
  }

  if (name.length > ASK_DIGBY_NAME_MAX_LENGTH) {
    fieldErrors.name = `Name must be ${ASK_DIGBY_NAME_MAX_LENGTH} characters or fewer.`;
  }

  if (email.length > ASK_DIGBY_EMAIL_MAX_LENGTH) {
    fieldErrors.email = `Email must be ${ASK_DIGBY_EMAIL_MAX_LENGTH} characters or fewer.`;
  } else if (email && !isReasonableEmail(email)) {
    fieldErrors.email = "Enter a valid email address or leave it blank.";
  }

  if (message.length < ASK_DIGBY_MESSAGE_MIN_LENGTH) {
    fieldErrors.message = "Write at least 10 characters.";
  } else if (message.length > ASK_DIGBY_MESSAGE_MAX_LENGTH) {
    fieldErrors.message = "Keep your message to 4000 characters or fewer.";
  }

  if (biteSlug.length > ASK_DIGBY_SLUG_MAX_LENGTH) {
    fieldErrors.biteSlug = "That Bite link is too long.";
  } else if (biteSlug && !isReasonableSlug(biteSlug)) {
    fieldErrors.biteSlug = "That Bite link could not be used.";
  }

  if (website) {
    fieldErrors.form = "Please try again.";
  }

  if (!Number.isFinite(startedAt) || now - startedAt < ASK_DIGBY_MIN_DWELL_MS) {
    fieldErrors.form = "Please try again.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const safeReason = validatedReason ?? "bible-question";

  return {
    ok: true,
    data: {
      reason: safeReason,
      name,
      email,
      message,
      biteSlug,
      startedAt,
      website,
    },
  };
}
