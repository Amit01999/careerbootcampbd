import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Rafiq Ahmed',
    role: 'Bangladesh Bank Officer',
    quote:
      "BankPrep's model tests were incredibly accurate. The actual exam felt familiar!",
    rating: 5,
  },
  {
    name: 'Fatima Khatun',
    role: 'Sonali Bank Senior Officer',
    quote:
      'The MCQ explanations helped me understand concepts I struggled with for years.',
    rating: 5,
  },
  {
    name: 'Kamal Hossain',
    role: 'Janata Bank Officer',
    quote:
      'Viva preparation module gave me the confidence I needed. Highly recommended!',
    rating: 5,
  },
];

export default function SuccessStories() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-[#0A0A0C] overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[600px] h-[600px] bg-[#C49B4B]/[0.025] rounded-full blur-[160px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Success <span className="text-gradient-gold">Stories</span>
          </h2>
          <p className="text-white/40 text-base">
            Real outcomes from successful candidates
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Glow border */}
              <div
                className="absolute -inset-px rounded-2xl
                bg-gradient-to-r from-[#C49B4B]/10 to-[#D4AF5A]/5
                blur-xl opacity-60"
              />

              <div
                className="
                  relative rounded-2xl
                  border border-white/[0.06]
                  px-8 py-7
                  bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]
                "
              >
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#D4AF5A] text-[#D4AF5A]"
                      />
                    ),
                  )}
                </div>

                {/* Quote */}
                <p className="text-base md:text-lg text-white/60 italic text-center leading-relaxed mb-5">
                  “{testimonials[activeTestimonial].quote}”
                </p>

                {/* Author */}
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p className="text-sm text-[#C49B4B]/80">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? 'w-6 bg-[#C49B4B]'
                    : 'w-2 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
