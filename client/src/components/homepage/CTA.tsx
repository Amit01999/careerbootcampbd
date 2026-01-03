import { ArrowRight, CheckCircle, Sparkles, Users, Award } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400">
                Join 1+ Successful Candidates
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Start Your Banking{' '}
              <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">
                Career Journey
              </span>{' '}
              Today
            </h2>

            {/* Description */}
            <p className="text-lg text-white/60 leading-relaxed max-w-xl font-light">
              Get access to comprehensive preparation materials, expert
              guidance, and a proven pathway to success in Bangladesh's banking
              sector.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle,
                  text: 'Free 7-day trial with full access',
                },
                { icon: Users, text: 'Expert mentorship & community support' },
                { icon: Award, text: 'Proven success rate of 95%' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-center gap-3 text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
                    <feature.icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-base font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/20">
              {[
                { value: '10K+', label: 'Students Enrolled' },
                { value: '95%', label: 'Success Rate' },
                { value: '40+', label: 'Partner Banks' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CTA CARD — GLASSMORPHIC */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:ml-auto w-full max-w-md"
          >
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 hover:border-white/30 rounded-3xl p-10 space-y-8 shadow-2xl">
                {/* Title */}
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Ready to Begin?
                  </h3>
                  <p className="text-white/60 text-sm font-light">
                    Start your free trial today—no credit card required.
                  </p>
                </div>

                {/* Checklist */}
                <div className="space-y-4">
                  {[
                    'Full access to all courses & materials',
                    'Live mock tests & performance analytics',
                    'Expert viva preparation & feedback',
                    'Exclusive job circular updates',
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/80">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                  <Link to="/auth" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-blue-400 text-[#030712] font-semibold rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Start Free Trial Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>

                {/* Guarantee */}
                <div className="text-center pt-6 border-t border-white/20">
                  <p className="text-xs text-white/50">
                    ✓ No credit card required • ✓ Cancel anytime • ✓ Money-back
                    guarantee
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
