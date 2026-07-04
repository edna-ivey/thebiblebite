import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="page-shell flex items-center justify-between gap-4 py-5">
      <Link className="focus-ring inline-flex items-center gap-3 rounded-xl no-underline" href="/">
        <span className="grid size-10 place-items-center rounded-lg border-[3px] border-[#7c420f] bg-gradient-to-br from-[#4b2217] to-[#8c461b] text-lg font-black text-[#ffbf22] shadow-[4px_4px_0_#ffb20f]">
          ✝
        </span>
        <strong className="text-lg leading-none text-[var(--ink)]">The Bible Bite</strong>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-black md:flex" aria-label="Primary">
        <Link className="focus-ring rounded-lg px-1 py-2 hover:text-[var(--purple)]" href="/">
          Home
        </Link>
        <Link className="focus-ring rounded-lg px-1 py-2 hover:text-[var(--purple)]" href="/about">
          About
        </Link>
        <Link className="focus-ring rounded-lg px-1 py-2 hover:text-[var(--purple)]" href="/archive">
          Archive
        </Link>
        <Link className="focus-ring rounded-lg px-1 py-2 hover:text-[var(--purple)]" href="/topics">
          Topics
        </Link>
      </nav>

      <details className="group relative">
        <summary className="focus-ring inline-flex cursor-pointer list-none items-center gap-2 rounded-full border-2 border-purple-200 bg-white/70 py-1.5 pl-1.5 pr-3 text-sm font-black text-[var(--purple-dark)] shadow-[0_12px_24px_rgba(104,61,20,0.1)] marker:hidden">
          <span className="relative inline-block size-8 rounded-full border-2 border-[#a55f10] bg-[radial-gradient(circle_at_40%_34%,#ffd66b_0_15%,#f5a623_16%_100%)] shadow-[inset_-3px_-4px_0_rgba(110,57,14,0.16)] before:absolute before:left-2 before:top-3 before:size-1 before:rounded-full before:bg-[#3a1c13] after:absolute after:right-2 after:top-3 after:size-1 after:rounded-full after:bg-[#3a1c13]" />
          Menu
          <span aria-hidden="true">⌄</span>
        </summary>
        <div className="absolute right-0 z-20 mt-2 grid min-w-48 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-2 shadow-[var(--shadow)]">
          <Link className="rounded-xl px-3 py-2 text-sm font-black hover:bg-purple-100 hover:text-[var(--purple-dark)]" href="/#today">
            Today’s quiz
          </Link>
          <Link className="rounded-xl px-3 py-2 text-sm font-black hover:bg-purple-100 hover:text-[var(--purple-dark)]" href="/topics">
            Browse topics
          </Link>
          <Link className="rounded-xl px-3 py-2 text-sm font-black hover:bg-purple-100 hover:text-[var(--purple-dark)]" href="/about">
            Why we made this
          </Link>
          <Link className="rounded-xl px-3 py-2 text-sm font-black hover:bg-purple-100 hover:text-[var(--purple-dark)]" href="/archive">
            Coming soon
          </Link>
        </div>
      </details>
    </header>
  );
}
