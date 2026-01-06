import React from 'react';
import heroBG from '../../assets/pl.jpeg';
import {
  Activity,
  ArrowRight,
  Cpu,
  Database,
  MonitorPlay,
  Sparkles,
} from 'lucide-react';
const features = [
  {
    icon: Cpu,
    title: 'Smart MCQ Engine',
    description:
      'AI-powered adaptive learning that identifies your weak areas and creates personalized practice sessions',
    color: 'from-cyan-400 to-blue-500',
    stats: '10,000+ MCQs',
    highlight: 'AI Powered',
  },
  {
    icon: Database,
    title: 'Written Mastery',
    description:
      'Expert-crafted essay templates, letter formats & comprehension strategies with instant feedback',
    color: 'from-violet-400 to-purple-600',
    stats: '500+ Topics',
    highlight: 'Expert Curated',
  },
  {
    icon: Activity,
    title: 'Real Exam Simulation',
    description:
      'Full-length timed tests replicating actual bank recruitment exam patterns and difficulty',
    color: 'from-amber-400 to-orange-500',
    stats: '200+ Tests',
    highlight: 'Exam Pattern',
  },
  {
    icon: MonitorPlay,
    title: 'Viva Excellence',
    description:
      'Interview simulations, body language tips, and confidence-building modules for final selection',
    color: 'from-rose-400 to-pink-600',
    stats: '1000+ Q&A',
    highlight: 'Mock Sessions',
  },
];
export default function GalaxyHero() {
  return (
    <section className="relative w-full overflow-hidden px-20">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroBG}
          alt="Galaxy Glow"
          className="w-full h-full object-cover object-top pointer-events-none select-none"
        />

        {/* Top Glow Overlay ONLY */}
        <div className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4 mt-20">
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                 bg-gradient-to-r from-violet-500/10 to-purple-500/10
                 border border-violet-500/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-violet-400">
            Why Choose Us
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Everything You Need to{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Succeed
          </span>
        </h2>

        <p className="text-lg text-white/70">
          Comprehensive tools designed by exam toppers and bank officers
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="group relative h-full min-h-[420px]"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div
              className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
            />
            <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-7 border border-white/10 group-hover:border-white/20 transition-all duration-300 flex flex-col group-hover:-translate-y-3">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}
                  style={{
                    boxShadow: `0 10px 40px -10px ${
                      feature.color.includes('cyan')
                        ? 'rgba(6, 182, 212, 0.5)'
                        : feature.color.includes('violet')
                        ? 'rgba(139, 92, 246, 0.5)'
                        : feature.color.includes('amber')
                        ? 'rgba(245, 158, 11, 0.5)'
                        : 'rgba(244, 63, 94, 0.5)'
                    }`,
                  }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                  {feature.highlight}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-white/50 mb-6 flex-grow leading-relaxed">
                {feature.description}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-white/10">
                <span className="text-sm font-bold text-cyan-400">
                  {feature.stats}
                </span>
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-all duration-300 cursor-pointer group-hover:translate-x-1">
                  <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-gray-950 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
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
    </section>
  );
}
