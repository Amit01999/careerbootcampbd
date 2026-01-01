import { ArrowRight, CheckCircle, Sparkles, Users, Award } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#0A402D] via-[#0F6F50] to-[#0A402D]">
      {/* Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[550px] h-[550px] bg-[#12D192]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#12D192]/10 rounded-full blur-[140px]" />
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
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
            bg-white/10 backdrop-blur-md border border-white/20 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Join 1+ Successful Candidates
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-sm">
              Start Your Banking Career Journey Today
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 leading-relaxed max-w-xl">
              Get access to comprehensive preparation materials, expert
              guidance, and a proven pathway to success in Bangladesh’s banking
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
                  className="flex items-center gap-3 text-white/95"
                >
                  <div
                    className="w-7 h-7 rounded-full bg-white/15 backdrop-blur-xl 
                  border border-white/20 flex items-center justify-center"
                  >
                    <feature.icon className="w-4 h-4 text-[#12D192]" />
                  </div>
                  <span className="text-base font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex items-center gap-8 pt-6 border-t border-white/15">
              {[
                { value: '10K+', label: 'Students Enrolled' },
                { value: '95%', label: 'Success Rate' },
                { value: '40+', label: 'Partner Banks' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-[#12D192] drop-shadow-sm">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80">{stat.label}</div>
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
            <div
              className="
              bg-white/10 backdrop-blur-2xl 
              border border-white/20 
              rounded-2xl p-10 space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            "
            >
              {/* Title */}
              <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold text-white">
                  Ready to Begin?
                </h3>
                <p className="text-white/80 text-sm">
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
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#12D192] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white/90">{item}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="space-y-4">
                <Link to="/auth" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3.5 bg-[#12D192] text-gray-900 
                    font-semibold rounded-lg shadow-lg hover:shadow-xl 
                    transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Start Free Trial Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>

              {/* Guarantee */}
              <div className="text-center pt-5 border-t border-white/10">
                <p className="text-xs text-white/70">
                  ✓ No credit card required • ✓ Cancel anytime • ✓ Money-back
                  guarantee
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
