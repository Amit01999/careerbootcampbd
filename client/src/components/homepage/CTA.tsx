import { ArrowRight, CheckCircle, Sparkles, Users, Award } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0C]">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[#C49B4B]/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#C49B4B]/[0.03] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C49B4B]/[0.02] rounded-full blur-[160px]" />
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
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C49B4B]/10 border border-[#C49B4B]/20 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C49B4B]" />
              <span className="text-sm font-semibold text-[#D4AF5A]">
                Join 1+ Successful Candidates
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Start Your Banking{' '}
              <span className="text-gradient-gold">Career Journey</span> Today
            </h2>

            {/* Description */}
            <p className="text-lg text-white/40 leading-relaxed max-w-xl font-light">
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
                  className="flex items-center gap-3 text-white/50"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/10 flex items-center justify-center">
                    <feature.icon
                      className="w-4 h-4 text-[#C49B4B]"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="text-base font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
              {[
                { value: '10K+', label: 'Students Enrolled' },
                { value: '95%', label: 'Success Rate' },
                { value: '40+', label: 'Banks' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-[#D4AF5A]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/30">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CTA CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:ml-auto w-full max-w-md"
          >
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C49B4B]/15 to-[#D4AF5A]/10 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

              <div
                className="relative rounded-3xl p-10 space-y-8 border border-white/[0.06] hover:border-[#C49B4B]/20 transition-all duration-300"
                style={{
                  background:
                    'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                }}
              >
                {/* Title */}
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-bold text-white">
                    Ready to Begin?
                  </h3>
                  <p className="text-white/30 text-sm font-light">
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
                      <CheckCircle className="w-5 h-5 text-[#C49B4B] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/40">{item}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                  <Link to="/auth" className="block">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-premium rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <span>Start Free Trial Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>

                {/* Guarantee */}
                <div className="text-center pt-6 border-t border-white/[0.06]">
                  <p className="text-xs text-white/20">
                    No credit card required &bull; Cancel anytime &bull;
                    Money-back guarantee
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
