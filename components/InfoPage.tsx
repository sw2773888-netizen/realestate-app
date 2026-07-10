import Link from "next/link";

export default function InfoPage({
  title,
  subtitle,
  bullets,
  cta,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
  cta: { label: string; href: string };
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500">{subtitle}</p>

      <div className="mx-auto mt-10 grid max-w-xl gap-4 text-left">
        {bullets.map((b, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-gray-200 p-4"
          >
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-brand text-sm font-bold text-white">
              {i + 1}
            </span>
            <span className="text-ink">{b}</span>
          </div>
        ))}
      </div>

      <Link
        href={cta.href}
        className="mt-10 inline-block rounded-lg bg-brand px-8 py-3 font-semibold text-white transition hover:bg-brand-dark"
      >
        {cta.label}
      </Link>
    </div>
  );
}
