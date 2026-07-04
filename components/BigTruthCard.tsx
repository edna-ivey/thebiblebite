export function BigTruthCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-purple-100 bg-purple-50 p-5">
      <p className="mb-2 text-sm font-black uppercase tracking-wide text-[var(--purple-dark)]">
        Big Truth
      </p>
      <p className="text-2xl font-black leading-tight text-[var(--ink)]">{children}</p>
    </section>
  );
}
