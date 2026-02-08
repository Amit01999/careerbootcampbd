import React, { useEffect, useRef, useState } from 'react';
import { BookOpen } from 'lucide-react';
import p1 from '../../assets/pub/1.jpeg';
import p2 from '../../assets/pub/2.jpeg';
import p3 from '../../assets/pub/3.jpeg';
import p4 from '../../assets/pub/4.jpeg';
import p5 from '../../assets/pub/5.jpeg';
import p6 from '../../assets/pub/6.jpeg';

export default function PublicationsShowcase() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let start = null;

    const scroll = timestamp => {
      if (!start) start = timestamp;

      if (!isPaused) {
        scrollContainer.scrollLeft += 1;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }

      start = timestamp;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const publications = [
    {
      id: 1,
      title: 'Math',
      subtitle: 'Quantitative Aptitude for Private Bank Exams',
      cover: p1,
      year: '2026',
      category: 'Aptitude',
    },
    {
      id: 2,
      title: 'Model test',
      subtitle: 'Full-Length Practice Tests (Latest Pattern)',
      cover: p2,
      year: '2026',
      category: 'Mock Tests',
    },
    {
      id: 3,
      title: 'Vocabulary',
      subtitle: 'High-Frequency Banking & Exam Words',
      cover: p3,
      year: '2026',
      category: 'English',
    },
    {
      id: 4,
      title: 'English',
      subtitle: 'Grammar, Reading Comprehension & Error Spotting',
      cover: p4,
      year: '2026',
      category: 'Language Skills',
    },
    {
      id: 5,
      title: 'Model test',
      subtitle: 'Advanced-Level Questions for Top Private Banks',
      cover: p5,
      year: '2026',
      category: 'Exam Practice',
    },
    {
      id: 6,
      title: 'Viva',
      subtitle: 'Interview, HR Questions & Banking Awareness',
      cover: p6,
      year: '2026',
      category: 'Interview',
    },
  ];

  const duplicatedPublications = [
    ...publications,
    ...publications,
    ...publications,
  ];

  return (
    <section className="relative w-full bg-[#09090B] overflow-hidden py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C49B4B] via-transparent to-[#C49B4B]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C49B4B 1px, transparent 0)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 ">
        {/* Header Section - centered, compact */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C49B4B]/10 border border-[#C49B4B]/20 mb-6">
            <BookOpen className="w-4 h-4 text-[#C49B4B]" />
            <span className="text-sm font-semibold text-[#D4AF5A]">
              Featured Collection
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Our <span className="text-gradient-gold">Publications</span>
          </h2>

          <p className="text-lg text-white/40 max-w-2xl mx-auto font-light mb-10">
            Discover our curated selection of premium publications, featuring
            cutting-edge insights and timeless perspectives.
          </p>

          {/* Stats row */}
          {/* <div className="flex items-center justify-center gap-10">
            {[
              { value: '50+', label: 'Publications' },
              { value: '15', label: 'Categories' },
              { value: '100K+', label: 'Readers' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#D4AF5A]">
                  {stat.value}
                </div>
                <div className="text-xs text-white/25 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Scrolling Publications */}
        <div className="relative">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-r from-[#09090B] via-[#09090B]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 lg:w-48 bg-gradient-to-l from-[#09090B] via-[#09090B]/80 to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-hidden py-6 px-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {duplicatedPublications.map((pub, index) => (
              <div
                key={`${pub.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="relative w-52 h-72 md:w-56 md:h-80">
                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#C49B4B] to-[#D4AF5A] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700" />

                  {/* Card */}
                  <div
                    className="relative h-full rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-[#C49B4B]/30 transition-all duration-500 shadow-xl"
                    style={{
                      background:
                        'linear-gradient(165deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    }}
                  >
                    {/* Cover image */}
                    <div className="absolute inset-0">
                      <img
                        src={pub.cover}
                        alt={pub.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                    </div>

                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49B4B] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-[#C49B4B]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#D4AF5A]/30">
                        <span className="text-[10px] font-bold text-[#09090B] uppercase tracking-widest">
                          {pub.category}
                        </span>
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center group-hover:bg-[#C49B4B]/10 group-hover:border-[#C49B4B]/30 transition-all duration-500">
                        <span className="text-[10px] font-bold text-[#C49B4B]">
                          {pub.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[#D4AF5A] text-[10px] font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-1">
                        {pub.subtitle}
                      </p>
                      <h3 className="text-white text-lg font-bold tracking-tight leading-snug">
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-2 pt-2">
                        <div className="h-px w-10 bg-gradient-to-r from-[#C49B4B] to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
                        <span className="text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                          Read More
                        </span>
                      </div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-[#C49B4B]/0 group-hover:border-[#C49B4B]/30 transition-all duration-500 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-[#C49B4B]/0 group-hover:border-[#C49B4B]/30 transition-all duration-500 rounded-bl-2xl" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
