import { founder } from '@/content/homeContent';

export default function FounderSection() {
  return (
    <section className="bg-[#eef3fb] px-6 py-24 text-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(148,163,184,0.16)]">
          <img src={founder.image} alt={founder.name} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="grid gap-6 lg:grid-rows-[auto_1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(148,163,184,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Founder perspective</p>
            <h2 className="mt-5 font-display text-[clamp(2.2rem,3.8vw,4rem)] leading-[0.95] tracking-[-0.04em]">
              {founder.name}
            </h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700/70">{founder.title}</p>
            <p className="mt-6 text-lg leading-8 text-slate-600">{founder.quote}</p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(148,163,184,0.16)]">
            <img
              src={founder.supportingImage}
              alt="RARA client reviews collage"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
