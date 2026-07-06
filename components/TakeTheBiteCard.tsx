export function TakeTheBiteCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] border-2 border-amber-200 bg-amber-50 p-6">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-amber-900">
        TAKE THE BITE
      </p>
      <p className="text-xl font-black leading-snug text-[var(--ink)]">{children}</p>
    </section>
  );
}
