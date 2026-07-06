export function PrayerCard({ children }: { children: React.ReactNode }) {
  const paragraphs =
    typeof children === "string" ? children.split(/\n{2,}/).filter(Boolean) : null;

  return (
    <section className="rounded-[2rem] border-2 border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-orange-900">
        PRAY
      </p>
      {paragraphs ? (
        <div className="grid gap-4">
          {paragraphs.map((paragraph) => (
            <p
              className="text-xl font-black leading-relaxed text-[var(--ink)]"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-xl font-black leading-relaxed text-[var(--ink)]">{children}</p>
      )}
    </section>
  );
}
