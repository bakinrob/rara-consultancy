import { stats } from '@/content/homeContent';

export default function ProofStrip() {
  return (
    <section className="relative z-10 bg-slate-950 px-6 py-14">
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-12 md:gap-20">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-12 md:gap-20">
            {i > 0 && (
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-slate-600 to-transparent" />
            )}
            <div className="text-center">
              <p className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none tracking-[-0.04em] text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
