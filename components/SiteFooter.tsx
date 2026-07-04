import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="page-shell grid gap-8 pb-0 pt-8 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1.7fr]">
      <div>
        <Link className="focus-ring inline-flex items-center gap-3 rounded-xl no-underline" href="/">
          <span className="grid size-9 place-items-center rounded-lg border-[3px] border-[#7c420f] bg-gradient-to-br from-[#4b2217] to-[#8c461b] text-base font-black text-[#ffbf22] shadow-[4px_4px_0_#ffb20f]">
            ✝
          </span>
          <strong>The Bible Bite</strong>
        </Link>
        <p className="mt-4 max-w-64 text-sm font-bold leading-relaxed text-[var(--muted)]">
          Quick Bible quizzes, bite-sized lessons, and daily steps to grow in faith.
        </p>
      </div>

      <FooterNav
        title="Explore"
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/archive", label: "Archive" },
          { href: "/topics", label: "Topics" },
        ]}
      />
      <FooterNav
        title="Resources"
        links={[
          { href: "/#today", label: "Today’s Bite" },
          { href: "/#how-it-works", label: "How It Works" },
          { href: "/archive", label: "Share the Bite" },
          { href: "mailto:hello@thebiblebite.com", label: "Contact" },
        ]}
      />

      <div>
        <h2 className="mb-3 text-sm font-black">Sister Projects</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <a
            className="focus-ring rounded-2xl border border-[var(--line)] bg-white/60 p-4 no-underline hover:text-[var(--purple)]"
            href="https://wonderwhydaily.com"
            target="_blank"
            rel="noreferrer"
          >
            <b className="block text-sm">Wonder Why Daily</b>
            <span className="text-xs font-bold text-[var(--muted)]">Fun quizzes. Smart kids.</span>
          </a>
          <a
            className="focus-ring rounded-2xl border border-[var(--line)] bg-white/60 p-4 no-underline hover:text-[var(--purple)]"
            href="https://blackhistoryinrealtime.com"
            target="_blank"
            rel="noreferrer"
          >
            <b className="block text-sm">Black History In Real Time</b>
            <span className="text-xs font-bold text-[var(--muted)]">Real stories. Real impact.</span>
          </a>
        </div>
      </div>

      <div className="col-span-full flex flex-col gap-3 rounded-t-2xl bg-gradient-to-r from-[var(--purple)] to-[#6f2aa6] px-5 py-4 text-sm font-bold text-white sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 The Bible Bite. All rights reserved.</span>
        <Link className="focus-ring w-max rounded-full border border-white/70 px-3 py-2" href="/">
          Back to Top ↑
        </Link>
      </div>
    </footer>
  );
}

function FooterNav({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav className="grid content-start gap-2" aria-label={`Footer ${title}`}>
      <h2 className="mb-1 text-sm font-black">{title}</h2>
      {links.map((link) => (
        <Link
          className="focus-ring w-max rounded-lg text-sm font-bold text-[var(--muted)] hover:text-[var(--purple)]"
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
