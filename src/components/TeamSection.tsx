import { team } from '@/content/homeContent';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number] },
  },
};

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <motion.div variants={itemVariants} className="group relative">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_8px_40px_rgba(59,130,246,0.08)]">
        {/* Avatar */}
        <div className="flex justify-center pt-10 pb-6">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 transition-all duration-500 group-hover:border-primary/40 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-6 pb-10 text-center">
          <h3 className="font-display text-xl font-semibold tracking-tight text-white">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
            {member.role}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="relative overflow-hidden bg-[#0A0A0B] px-6 py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">
            The people
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.2vw,4.4rem)] leading-[0.95] tracking-[-0.04em] text-white">
            Meet the Team
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-400">
            A tight-knit crew building brands, systems, and platforms that help businesses grow.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
