"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { SiteLink } from "@/lib/types";

export function SiteMenu({ links }: { links: SiteLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (target instanceof Node && menuRef.current?.contains(target)) {
        return;
      }

      setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      setIsOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="focus-ring inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-purple-200 bg-white/70 px-4 py-2 text-sm font-black text-[var(--purple-dark)] shadow-[0_12px_24px_rgba(104,61,20,0.1)]"
        onClick={() => setIsOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        Menu
        <span aria-hidden="true">⌄</span>
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 z-20 mt-2 grid min-w-48 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-2 shadow-[var(--shadow)]"
          id={panelId}
        >
          {links.map((link) => (
            <Link
              className="rounded-xl px-3 py-2 text-sm font-black hover:bg-purple-100 hover:text-[var(--purple-dark)]"
              href={link.href}
              key={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
