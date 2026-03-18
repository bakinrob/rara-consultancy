import { stats } from '@/content/homeContent';

export default function ProofStrip() {
  return (
    <section className="relative z-10 -mt-8 border-y border-white/8 bg-slate-950 px-6 py-8 text-white md:-mt-12">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] px-5 py-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">{stat.label}</p>
            <p className="mt-3 font-display text-[clamp(1.9rem,3vw,3rem)] leading-none text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
