import { NextResponse } from "next/server";
import { getPublicBiteBySlug } from "@/lib/bites";
import {
  ASK_DIGBY_MAX_BODY_BYTES,
  validateAskDigbySubmission,
} from "@/lib/askDigby";
import {
  AskDigbyDeliveryError,
  sendAskDigbyNotification,
} from "@/lib/zeptomail";

function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  const requestUrl = new URL(request.url);
  const host = request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto ? `${forwardedProto}:` : requestUrl.protocol;
  const allowedOrigins = new Set([requestUrl.origin]);

  if (host) {
    allowedOrigins.add(`${protocol}//${host}`);
  }

  return allowedOrigins.has(origin);
}

async function readBoundedJson(request: Request) {
  const body = await request.text();
  const bodyBytes = new TextEncoder().encode(body).byteLength;

  if (bodyBytes > ASK_DIGBY_MAX_BODY_BYTES) {
    return { tooLarge: true, payload: null };
  }

  try {
    return { tooLarge: false, payload: JSON.parse(body) as unknown };
  } catch {
    return { tooLarge: false, payload: null };
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, fieldErrors: { form: "Please try again." } },
      { status: 403 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > ASK_DIGBY_MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, fieldErrors: { message: "Keep your message to 4000 characters or fewer." } },
      { status: 413 },
    );
  }

  const { tooLarge, payload } = await readBoundedJson(request);

  if (tooLarge) {
    return NextResponse.json(
      { ok: false, fieldErrors: { message: "Keep your message to 4000 characters or fewer." } },
      { status: 413 },
    );
  }

  const validation = validateAskDigbySubmission(payload);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, fieldErrors: validation.fieldErrors },
      { status: 400 },
    );
  }

  const biteContext = validation.data.biteSlug
    ? getPublicBiteBySlug(validation.data.biteSlug)
    : undefined;
  const sourceUrl = new URL("/ask-digby", request.url);

  if (biteContext) {
    sourceUrl.searchParams.set("bite", biteContext.slug);
    sourceUrl.searchParams.set("reason", validation.data.reason);
  }

  try {
    const result = await sendAskDigbyNotification({
      submission: validation.data,
      biteContext,
      sourceUrl: sourceUrl.toString(),
      submittedAt: new Date(),
    });

    return NextResponse.json({ ok: true, requestId: result.requestId ?? null });
  } catch (error) {
    if (error instanceof AskDigbyDeliveryError) {
      console.error("[Ask Digby] Delivery unavailable", { message: error.message });
    } else {
      console.error("[Ask Digby] Unexpected delivery error", { error });
    }

    return NextResponse.json(
      { ok: false, fieldErrors: { form: "Please try again." } },
      { status: 500 },
    );
  }
}
