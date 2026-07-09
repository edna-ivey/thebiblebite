import Link from "next/link";
import { DigbyMascot } from "@/components/DigbyMascot";
import { getTodayBite } from "@/lib/bites";
import { getMainMenuLinks } from "@/lib/siteLinks";

export function SiteHeader() {
  const menuLinks = getMainMenuLinks(`/bites/${getTodayBite().slug}`);

  return (
    <header className="page-shell flex items-center justify-between gap-4 py-5">
      <Link className="focus-ring inline-flex items-center gap-3 rounded-xl no-underline" href="/">
        <DigbyMascot className="size-9 shrink-0" label="The Bible Bite mascot" />
        <strong className="text-lg leading-none text-[var(--ink)]">The Bible Bite</strong>
      </Link>

      <details className="group relative">
        <summary className="focus-ring inline-flex cursor-pointer list-none items-center gap-2 rounded-full border-2 border-purple-200 bg-white/70 px-4 py-2 text-sm font-black text-[var(--purple-dark)] shadow-[0_12px_24px_rgba(104,61,20,0.1)] marker:hidden">
          Menu
          <span aria-hidden="true">⌄</span>
        </summary>
        <div className="absolute right-0 z-20 mt-2 grid min-w-48 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-2 shadow-[var(--shadow)]">
          {menuLinks.map((link) => (
            <Link
              className="rounded-xl px-3 py-2 text-sm font-black hover:bg-purple-100 hover:text-[var(--purple-dark)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </details>
    </header>
  );
}
