export function TakeTheBiteCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
      <p className="mb-2 text-sm font-black uppercase tracking-wide text-amber-900">
        Take the Bite
      </p>
      <p className="text-lg font-black leading-snug text-[var(--ink)]">{children}</p>
    </section>
  );
}
