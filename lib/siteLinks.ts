import type { SisterProject, SiteLink } from "@/lib/types";

export function getMainMenuLinks(todayHref: string): SiteLink[] {
  return [
    { href: todayHref, label: "Today's Bite" },
    { href: "/topics", label: "Browse Topics" },
    { href: "/archive", label: "Past Bites" },
    { href: "/about", label: "Our Mission" },
  ];
}

export const sisterProjects: SisterProject[] = [
  {
    href: "https://wonderwhydaily.com",
    label: "Wonder Why Daily",
    description: "Fun quizzes. Smart kids.",
  },
  {
    href: "https://blackhistoryinrealtime.com",
    label: "Black History In Real Time",
    description: "Real stories. Real impact.",
  },
];
