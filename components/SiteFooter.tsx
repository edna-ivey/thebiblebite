import Link from "next/link";
import { getTodayBite } from "@/lib/bites";
import { getMainMenuLinks, sisterProjects } from "@/lib/siteLinks";

export function SiteFooter() {
  const footerLinks = getMainMenuLinks(`/bites/${getTodayBite().slug}`);

  return (
    <footer className="page-shell grid gap-7 pb-0 pt-8 md:grid-cols-[1.2fr_1fr_1.1fr]">
      <div>
        <Link className="focus-ring inline-flex items-center gap-3 rounded-xl no-underline" href="/">
          <span className="grid size-9 place-items-center rounded-lg border-[3px] border-[#7c420f] bg-gradient-to-br from-[#4b2217] to-[#8c461b] text-base font-black text-[#ffbf22] shadow-[4px_4px_0_#ffb20f]">
            ✝
          </span>
          <strong>The Bible Bite</strong>
        </Link>
        <p className="mt-4 max-w-64 text-sm font-bold leading-relaxed text-[var(--muted)]">
          Small bites. Big truths.
        </p>
      </div>

      <FooterNav title="Menu" links={footerLinks} />

      <div>
        <h2 className="mb-3 text-sm font-black">Sister Projects</h2>
        <div className="grid gap-2">
          {sisterProjects.map((project) => (
            <a
              className="focus-ring w-max rounded-lg text-sm font-bold no-underline hover:text-[var(--purple)]"
              href={project.href}
              key={project.href}
              target="_blank"
              rel="noreferrer"
            >
              {project.label}
              <span className="ml-2 text-xs text-[var(--muted)]">{project.description}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="col-span-full rounded-t-2xl bg-gradient-to-r from-[var(--purple)] to-[#6f2aa6] px-5 py-4 text-sm font-bold text-white">
        <span>© 2026 The Bible Bite. All rights reserved.</span>
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
