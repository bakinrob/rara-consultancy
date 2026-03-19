import React from "react";

export function TextColorHero() {
  return (
    <section className="relative py-20 px-6 bg-slate-950 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="relative select-none text-center">
          <span
            className="text-color-word relative block text-[clamp(3rem,12vw,10rem)] font-display leading-none tracking-[-0.06em]"
            data-content="Build."
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent animate-gradient-foreground-1">
              Build.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#38bdf8] bg-clip-text text-transparent animate-gradient-foreground-2">
              Build.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#818cf8] to-[#2563eb] bg-clip-text text-transparent animate-gradient-foreground-3">
              Build.
            </span>
          </span>
          <span
            className="text-color-word relative block text-[clamp(3rem,12vw,10rem)] font-display leading-none tracking-[-0.06em]"
            data-content="Automate."
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent animate-gradient-foreground-2">
              Automate.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#818cf8] bg-clip-text text-transparent animate-gradient-foreground-3">
              Automate.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#818cf8] to-[#38bdf8] bg-clip-text text-transparent animate-gradient-foreground-1">
              Automate.
            </span>
          </span>
          <span
            className="text-color-word relative block text-[clamp(3rem,12vw,10rem)] font-display leading-none tracking-[-0.06em]"
            data-content="Engineer."
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#2563eb] bg-clip-text text-transparent animate-gradient-foreground-3">
              Engineer.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent animate-gradient-foreground-1">
              Engineer.
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#818cf8] to-[#06b6d4] bg-clip-text text-transparent animate-gradient-foreground-2">
              Engineer.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
