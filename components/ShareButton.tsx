"use client";

import { useState } from "react";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      className="focus-ring rounded-full border-2 border-purple-200 bg-white/80 px-4 py-2 text-sm font-black text-[var(--purple-dark)] shadow-sm"
      onClick={handleShare}
      type="button"
    >
      {copied ? "Link copied" : "Share this bite"}
    </button>
  );
}
