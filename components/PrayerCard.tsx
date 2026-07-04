export function PrayerCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
      <p className="mb-2 text-sm font-black uppercase tracking-wide text-orange-900">
        Prayer
      </p>
      <p className="text-lg font-black leading-snug text-[var(--ink)]">{children}</p>
    </section>
  );
}
