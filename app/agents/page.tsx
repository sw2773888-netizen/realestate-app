import { Phone, Building2, Star } from "lucide-react";
import { properties } from "@/lib/data";

export default function AgentsPage() {
  // Gom nhóm môi giới duy nhất từ dữ liệu
  const map = new Map<string, { name: string; company: string; phone: string; count: number }>();
  for (const p of properties) {
    const key = p.agent.name;
    const existing = map.get(key);
    if (existing) existing.count += 1;
    else map.set(key, { ...p.agent, count: 1 });
  }
  const agents = [...map.values()];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
          Tìm môi giới bất động sản
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-lg text-gray-500">
          Kết nối với những chuyên viên môi giới uy tín để được tư vấn tận tình.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <div
            key={a.name}
            className="rounded-2xl border border-gray-200 p-6 text-center shadow-card"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-light text-2xl font-bold text-brand">
              {a.name.charAt(0)}
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">{a.name}</h3>
            <p className="flex items-center justify-center gap-1 text-sm text-gray-500">
              <Building2 className="h-3.5 w-3.5" /> {a.company}
            </p>
            <div className="mt-2 flex items-center justify-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-ink">4.{5 + (a.count % 5)}</span>
              <span className="text-gray-400">· {a.count} tin đăng</span>
            </div>
            <a
              href={`tel:${a.phone.replace(/\s/g, "")}`}
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-brand py-2.5 font-semibold text-white transition hover:bg-brand-dark"
            >
              <Phone className="h-4 w-4" /> Liên hệ
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
