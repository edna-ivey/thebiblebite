import Link from "next/link";
import { DigbyMascot } from "@/components/DigbyMascot";
import { SiteMenu } from "@/components/SiteMenu";
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

      <SiteMenu links={menuLinks} />
    </header>
  );
}
