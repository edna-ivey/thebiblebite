import "server-only";
import {
  type AskDigbyBiteContext,
  type AskDigbySubmission,
  getAskDigbyReason,
} from "@/lib/askDigby";

const ZEPTOMAIL_EMAIL_ENDPOINT = "https://api.zeptomail.com/v1.1/email";

type SendAskDigbyNotificationInput = {
  submission: AskDigbySubmission;
  biteContext?: AskDigbyBiteContext;
  sourceUrl: string;
  submittedAt: Date;
};

type ZeptoMailAddress = {
  address: string;
  name?: string;
};

export class AskDigbyDeliveryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AskDigbyDeliveryError";
  }
}

function normalizeSendMailToken(value: string) {
  return value.replace(/^zoho-enczapikey\s+/i, "").trim();
}

function getDeliveryConfig() {
  const token = normalizeSendMailToken(process.env.ZEPTOMAIL_SEND_MAIL_TOKEN ?? "");
  const toEmail = process.env.ASK_DIGBY_TO_EMAIL?.trim();
  const fromEmail = process.env.ASK_DIGBY_FROM_EMAIL?.trim();

  if (!token || !toEmail || !fromEmail) {
    throw new AskDigbyDeliveryError("Missing Ask Digby email delivery configuration.");
  }

  return { token, toEmail, fromEmail };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatOptional(value: string) {
  return value || "Not provided";
}

function formatSubmittedAt(date: Date) {
  return date.toISOString();
}

function buildTextBody({
  submission,
  biteContext,
  sourceUrl,
  submittedAt,
}: SendAskDigbyNotificationInput) {
  const reason = getAskDigbyReason(submission.reason);
  const lines = [
    "Ask Digby submission",
    "",
    `Reason:`,
    reason.label,
    "",
    "Name:",
    formatOptional(submission.name),
    "",
    "Email:",
    formatOptional(submission.email),
    "",
  ];

  if (biteContext) {
    lines.push(
      "Bite:",
      biteContext.title,
      "",
      "Bite slug:",
      biteContext.slug,
      "",
      "Scripture:",
      biteContext.scriptureReference,
      "",
    );
  }

  lines.push(
    "Source page:",
    sourceUrl,
    "",
    "Message:",
    "",
    submission.message,
    "",
    "Submitted:",
    formatSubmittedAt(submittedAt),
  );

  return lines.join("\n");
}

function buildHtmlBody(input: SendAskDigbyNotificationInput) {
  const { submission, biteContext, sourceUrl, submittedAt } = input;
  const reason = getAskDigbyReason(submission.reason);
  const biteRows = biteContext
    ? `
      <tr><th align="left">Bite</th><td>${escapeHtml(biteContext.title)}</td></tr>
      <tr><th align="left">Bite slug</th><td>${escapeHtml(biteContext.slug)}</td></tr>
      <tr><th align="left">Scripture</th><td>${escapeHtml(biteContext.scriptureReference)}</td></tr>
    `
    : "";

  return `
    <div style="font-family:Arial,sans-serif;color:#2a160f;line-height:1.5">
      <h1>Ask Digby submission</h1>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr><th align="left">Reason</th><td>${escapeHtml(reason.label)}</td></tr>
        <tr><th align="left">Name</th><td>${escapeHtml(formatOptional(submission.name))}</td></tr>
        <tr><th align="left">Email</th><td>${escapeHtml(formatOptional(submission.email))}</td></tr>
        ${biteRows}
        <tr><th align="left">Source page</th><td>${escapeHtml(sourceUrl)}</td></tr>
        <tr><th align="left">Submitted</th><td>${escapeHtml(formatSubmittedAt(submittedAt))}</td></tr>
      </table>
      <h2>Message</h2>
      <div style="white-space:pre-wrap;border:1px solid #ead8c5;border-radius:12px;padding:16px;background:#fffdf8">${escapeHtml(submission.message)}</div>
    </div>
  `;
}

function buildSourceAddress(address: string): ZeptoMailAddress {
  return {
    address,
    name: "Digby",
  };
}

export async function sendAskDigbyNotification(input: SendAskDigbyNotificationInput) {
  const config = getDeliveryConfig();
  const reason = getAskDigbyReason(input.submission.reason);
  const payload: Record<string, unknown> = {
    from: buildSourceAddress(config.fromEmail),
    to: [
      {
        email_address: {
          address: config.toEmail,
          name: "Ask Digby",
        },
      },
    ],
    subject: reason.subject,
    textbody: buildTextBody(input),
    htmlbody: buildHtmlBody(input),
  };

  if (input.submission.email) {
    payload.reply_to = [
      {
        address: input.submission.email,
        name: input.submission.name || input.submission.email,
      },
    ];
  }

  const response = await fetch(ZEPTOMAIL_EMAIL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Zoho-enczapikey ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const requestId = response.headers.get("x-request-id") ?? response.headers.get("x-zm-requestid");
    console.error("[Ask Digby] ZeptoMail delivery failed", {
      status: response.status,
      requestId,
    });
    throw new AskDigbyDeliveryError("ZeptoMail delivery failed.");
  }

  const requestId = response.headers.get("x-request-id") ?? response.headers.get("x-zm-requestid");
  console.info("[Ask Digby] ZeptoMail delivery accepted", { requestId });

  return { requestId };
}
