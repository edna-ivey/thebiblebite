export function MissionSection() {
  return (
    <section
      className="mx-auto my-8 grid w-[min(92rem,calc(100%_-_2rem))] items-center gap-6 rounded-[1.75rem] border-2 border-amber-100 bg-[var(--paper)]/80 p-5 shadow-[var(--shadow)] md:w-[min(92rem,calc(100%_-_6rem))] lg:grid-cols-[0.9fr_1.35fr_0.72fr] lg:p-8"
      id="mission"
    >
      <div className="rounded-[2rem] border border-purple-100 bg-gradient-to-br from-purple-100 via-white to-amber-50 p-6">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[var(--purple-dark)]">
          Quiz. Learn. Grow.
        </p>
        <p className="mt-4 text-4xl font-black leading-none text-[var(--ink)]">
          One small truth.
          <span className="block text-[var(--purple)]">One day at a time.</span>
        </p>
      </div>
      <div>
        <h2 className="text-3xl font-black leading-tight text-[var(--ink)]">
          Our Mission <span className="text-[var(--purple)]">♥</span>
        </h2>
        <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">
          The Bible Bite was created from a simple belief: meaningful learning
          does not have to be overwhelming.
        </p>
        <strong className="mt-4 block text-[var(--purple)]">
          One small truth. One question. One prayer. One day at a time.
        </strong>
        <p className="mt-3 text-base font-bold leading-relaxed text-[var(--muted)]">
          Each one, teach one. Let’s grow together.
        </p>
      </div>
      <aside className="-rotate-2 border border-amber-300 bg-amber-100 p-5 shadow-[6px_8px_0_rgba(167,105,16,0.25)]">
        <h3 className="font-black">Today’s Challenge</h3>
        <p className="mt-3 text-sm font-bold leading-relaxed">
          Share today’s bite with one person and invite them to grow with you!
        </p>
        <span className="mt-2 block text-right text-2xl text-[var(--purple)]">♡</span>
      </aside>
    </section>
  );
}
