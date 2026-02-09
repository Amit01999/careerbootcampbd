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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let start = null;

    const scroll = timestamp => {
      if (!start) start = timestamp;

      if (!isPaused) {
        // Slower scroll speed on mobile for better UX
        const scrollSpeed = isMobile ? 0.5 : 1;
        scrollContainer.scrollLeft += scrollSpeed;

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
  }, [isPaused, isMobile]);

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
    <section className="relative w-full bg-[#09090B] overflow-hidden py-4 md:py-10">
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

      <div className="relative z-10">
        {/* Header Section - centered, compact */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-6 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#C49B4B]/10 border border-[#C49B4B]/20 mb-4 md:mb-6">
            <BookOpen className="w-3 h-3 md:w-4 md:h-4 text-[#C49B4B]" />
            <span className="text-xs md:text-sm font-semibold text-[#D4AF5A]">
              Featured Collection
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3 md:mb-4">
            Our <span className="text-gradient-gold">Publications</span>
          </h2>

          <p className="text-sm md:text-lg text-white/40 max-w-2xl mx-auto font-light mb-6 md:mb-10 px-4 md:px-0">
            Discover our curated selection of premium publications, featuring
            cutting-edge insights and timeless perspectives.
          </p>
        </div>

        {/* Scrolling Publications */}
        <div className="relative">
          {/* Edge fades - smaller on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 lg:w-32 xl:w-48 bg-gradient-to-r from-[#09090B] via-[#09090B]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 lg:w-32 xl:w-48 bg-gradient-to-l from-[#09090B] via-[#09090B]/80 to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-5 overflow-x-hidden py-4 md:py-6 px-4 md:px-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
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
                <div className="relative w-36 h-52 sm:w-44 sm:h-64 md:w-56 md:h-80">
                  {/* Glow */}
                  <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-br from-[#C49B4B] to-[#D4AF5A] rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-0 group-hover:opacity-20 transition-all duration-700" />

                  {/* Card */}
                  <div
                    className="relative h-full rounded-2xl md:rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-[#C49B4B]/30 transition-all duration-500 shadow-lg md:shadow-xl"
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
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 md:group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B]/70 via-[#09090B]/30 to-transparent" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
                    </div>

                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49B4B] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                      <div className="bg-[#C49B4B]/90 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-[#D4AF5A]/30">
                        <span className="text-[9px] md:text-[10px] font-bold text-[#09090B] uppercase tracking-widest">
                          {pub.category}
                        </span>
                      </div>
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/[0.08] flex items-center justify-center group-hover:bg-[#C49B4B]/10 group-hover:border-[#C49B4B]/30 transition-all duration-500">
                        <span className="text-[9px] md:text-[10px] font-bold text-[#C49B4B]">
                          {pub.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[#D4AF5A] text-[9px] md:text-[10px] font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-1 line-clamp-1">
                        {pub.subtitle}
                      </p>
                      <h3 className="text-white text-base md:text-lg font-bold tracking-tight leading-snug line-clamp-2 md:line-clamp-none">
                        {pub.title}
                      </h3>
                      <div className="flex items-center gap-2 pt-1 md:pt-2">
                        <div className="h-px w-8 md:w-10 bg-gradient-to-r from-[#C49B4B] to-transparent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-200" />
                        <span className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                          Read More
                        </span>
                      </div>
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-0 right-0 w-8 h-8 md:w-12 md:h-12 border-t border-r border-[#C49B4B]/0 group-hover:border-[#C49B4B]/30 transition-all duration-500 rounded-tr-xl md:rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 md:w-12 md:h-12 border-b border-l border-[#C49B4B]/0 group-hover:border-[#C49B4B]/30 transition-all duration-500 rounded-bl-xl md:rounded-bl-2xl" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile indicator dots (optional) */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex space-x-2">
            {publications.slice(0, 3).map((_, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-white/20"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
