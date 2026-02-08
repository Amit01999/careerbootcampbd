import React from 'react';
import {
  Activity,
  ArrowRight,
  Cpu,
  Database,
  MonitorPlay,
  Sparkles,
  Users,
  Target,
  Star,
  TrendingUp,
} from 'lucide-react';

const stats = [
  { value: '50K+', label: 'Active Learners', icon: Users, suffix: '' },
  { value: '89', label: 'Success Rate', icon: TrendingUp, suffix: '%' },
  { value: '200+', label: 'Model Tests', icon: Target, suffix: '' },
  { value: '4.9', label: 'User Rating', icon: Star, suffix: '/5' },
];

const features = [
  {
    icon: Cpu,
    title: 'Smart MCQ Engine',
    description:
      'AI-powered adaptive learning that identifies your weak areas and creates personalized practice sessions',
    stats: '10,000+ MCQs',
    highlight: 'AI Powered',
  },
  {
    icon: Database,
    title: 'Written Mastery',
    description:
      'Expert-crafted essay templates, letter formats & comprehension strategies with instant feedback',
    stats: '500+ Topics',
    highlight: 'Expert Curated',
  },
  {
    icon: Activity,
    title: 'Real Exam Simulation',
    description:
      'Full-length timed tests replicating actual bank recruitment exam patterns and difficulty',
    stats: '200+ Tests',
    highlight: 'Exam Pattern',
  },
  {
    icon: MonitorPlay,
    title: 'Viva Excellence',
    description:
      'Interview simulations, body language tips, and confidence-building modules for final selection',
    stats: '1000+ Q&A',
    highlight: 'Mock Sessions',
  },
];

export default function Services() {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-20 py-20 lg:py-32 bg-[#09090B]">
      {/* Background mesh */}
      <div className="absolute inset-0 w-full h-full bg-mesh-dark pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C49B4B]/10 border border-[#C49B4B]/20 mb-8">
          <Sparkles className="w-4 h-4 text-[#C49B4B]" />
          <span className="text-sm font-semibold text-[#D4AF5A]">
            Why Choose Us
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
          Everything You Need to{' '}
          <span className="text-gradient-gold">Succeed</span>
        </h2>

        <p className="text-lg text-white/40 max-w-2xl mx-auto">
          Comprehensive tools designed by exam toppers and bank officers
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="group relative h-full min-h-[420px]"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              className="relative h-full rounded-3xl p-7 border border-white/[0.06] backdrop-blur-xl transition-all duration-300 flex flex-col group-hover:-translate-y-3 group-hover:border-[#C49B4B]/20"
              style={{
                background:
                  'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              }}
            >
              {/* Hover glow */}
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-[#C49B4B]/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/10 flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-[#C49B4B]" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40">
                    {feature.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF5A] transition-colors font-display">
                  {feature.title}
                </h3>

                <p className="text-white/30 mb-6 flex-grow leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
                  <span className="text-sm font-bold text-[#C49B4B]">
                    {feature.stats}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-[#C49B4B]/10 group-hover:border-[#C49B4B]/20 transition-all duration-300 cursor-pointer group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#C49B4B] transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      {/* Stats Section */}
      <section className="relative py-16 bg-[#0A0A0C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at top right, rgba(196, 155, 75, 0.08) 0%, transparent 50%)',
              }}
            />

            <div className="relative py-16 px-8 md:px-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                {stats.map(stat => (
                  <div key={stat.label} className="text-center">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, #D4AF5A 0%, #C49B4B 100%)',
                        boxShadow: '0 8px 24px rgba(196, 155, 75, 0.35)',
                      }}
                    >
                      <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#09090B]" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <p className="font-medium text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
