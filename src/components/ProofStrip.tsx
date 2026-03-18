import { stats } from '@/content/homeContent';

export default function ProofStrip() {
  return (
    <section className="relative z-10 border-y border-slate-200 bg-white px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.8rem] border border-slate-200 bg-slate-50 px-5 py-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{stat.label}</p>
            <p className="mt-3 font-display text-[clamp(1.9rem,3vw,3rem)] leading-none text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
