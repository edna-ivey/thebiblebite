import Image from "next/image";
import Link from "next/link";

export function HeroSection({ todayHref }: { todayHref: string }) {
  return (
    <section className="page-shell grid items-center gap-8 py-6 lg:grid-cols-[0.95fr_1.08fr] lg:gap-20 lg:py-10">
      <div>
        <p className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--purple-dark)]">
          The Bible Bite
        </p>
        <h1 className="max-w-3xl text-[clamp(3.1rem,12vw,5.9rem)] font-black leading-[0.9] tracking-normal text-[var(--ink)] lg:text-[clamp(4.4rem,6vw,6.8rem)]">
          Small bites.
          <span className="block text-[var(--purple)]">Big truths.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg font-black leading-relaxed text-[var(--ink)] md:text-xl">
          A quick daily Bible quiz, a bite-sized lesson, and one simple way to
          grow in faith today.
        </p>

        <div className="my-6 flex flex-wrap items-center gap-4 font-black md:gap-8">
          <span className="inline-flex items-center gap-3 text-lg">
            <b className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--purple)] to-[#ad58ca] text-white">
              ✿
            </b>
            Quiz.
          </span>
          <span className="inline-flex items-center gap-3 text-lg">
            <b className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--teal)] to-[#6ad0d2] text-white">
              ▣
            </b>
            Learn.
          </span>
          <span className="inline-flex items-center gap-3 text-lg">
            <b className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[#ff8c21] text-white">
              ♡
            </b>
            Grow.
          </span>
        </div>

        <Link
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[var(--purple)] to-[#9b45c6] px-8 py-3 text-lg font-black text-white no-underline shadow-[0_14px_24px_rgba(114,40,154,0.22)] max-sm:w-full"
          href={todayHref}
        >
          Start Today’s Bite
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-3xl">
        <Image
          alt="A cheerful bite character peeking over an open Bible with a gold cross and a speech bubble that says, Let’s dig into God’s Word!"
          className="h-auto w-full drop-shadow-2xl"
          height={1024}
          priority
          src="/images/hero-bible-bite.png"
          width={1456}
        />
      </div>
    </section>
  );
}
