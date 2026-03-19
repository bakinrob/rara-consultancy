import React from 'react';
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

const TestimonialsColumn = ({ className, testimonials, duration = 15 }: TestimonialsColumnProps) => {
  return (
    <div className={`overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] ${className ?? ''}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${index}-${i}`}
                className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-[0_8px_40px_rgba(148,163,184,0.1)]"
              >
                <p className="text-base leading-7 text-slate-600">"{text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

interface ScrollingTestimonialsProps {
  testimonials: Testimonial[];
}

export function ScrollingTestimonials({ testimonials }: ScrollingTestimonialsProps) {
  const firstColumn = testimonials.slice(0, Math.ceil(testimonials.length / 3));
  const secondColumn = testimonials.slice(Math.ceil(testimonials.length / 3), Math.ceil((testimonials.length * 2) / 3));
  const thirdColumn = testimonials.slice(Math.ceil((testimonials.length * 2) / 3));

  return (
    <div className="flex justify-center gap-6 mt-10 max-h-[740px]">
      <TestimonialsColumn testimonials={firstColumn} duration={18} />
      <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
      <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={16} />
    </div>
  );
}
