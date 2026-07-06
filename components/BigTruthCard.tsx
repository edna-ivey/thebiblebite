export function BigTruthCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border-2 border-purple-200 bg-gradient-to-br from-purple-100 via-white to-amber-50 p-6 shadow-[0_18px_45px_rgba(104,61,20,0.1)]">
      <div className="absolute -right-8 -top-8 size-24 rounded-full bg-purple-200/50" />
      <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[var(--purple-dark)]">
        BIG TRUTH
      </p>
      <p className="relative text-2xl font-black leading-tight text-[var(--ink)] md:text-3xl">
        {children}
      </p>
    </section>
  );
}
