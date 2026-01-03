import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { Star } from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
const testimonials = [
  {
    name: 'Rafiq Ahmed',
    role: 'Bangladesh Bank Officer',
    image: 'https://i.pravatar.cc/150?img=11',
    quote:
      "BankPrep's model tests were incredibly accurate. The actual exam felt familiar!",
    rating: 5,
  },
  {
    name: 'Fatima Khatun',
    role: 'Sonali Bank Senior Officer',
    image: 'https://i.pravatar.cc/150?img=5',
    quote:
      'The MCQ explanations helped me understand concepts I struggled with for years.',
    rating: 5,
  },
  {
    name: 'Kamal Hossain',
    role: 'Janata Bank Officer',
    image: 'https://i.pravatar.cc/150?img=12',
    quote:
      'Viva preparation module gave me the confidence I needed. Highly recommended!',
    rating: 5,
  },
];

export default function SuccessStories() {
  const [isScrolled, setIsScrolled] = useState(false);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const particles = useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  const floatingOrbs = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        id: i,
        size: Math.random() * 300 + 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'violet' : 'emerald',
        duration: Math.random() * 15 + 20,
      })),
    []
  );
  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Success{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-lg text-white/50">
              Real results from real aspirants who achieved their dreams
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-amber-500/20 rounded-3xl blur-xl" />
                <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full blur-lg opacity-50" />
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#030712]"
                        />
                      </div>
                    </div>
                    <div className="flex-grow text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonials[activeTestimonial].rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 fill-amber-400 text-amber-400"
                            />
                          )
                        )}
                      </div>
                      <p className="text-xl md:text-2xl text-white/90 italic mb-6 leading-relaxed">
                        &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                      </p>
                      <div>
                        <p className="text-lg font-bold text-white">
                          {testimonials[activeTestimonial].name}
                        </p>
                        <p className="text-cyan-400">
                          {testimonials[activeTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? 'bg-cyan-400 w-8'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
