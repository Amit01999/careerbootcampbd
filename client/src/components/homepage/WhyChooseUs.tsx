import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, FileText, BarChart3, Languages } from 'lucide-react';
import whychooseus from '@/assets/WhyChooseUs.svg';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Trophy,
      title: 'All Bangladesh Rank',
    },
    {
      icon: FileText,
      title: 'Latest Exam Patterns',
    },
    {
      icon: BarChart3,
      title: 'In-depth Performance Analysis',
    },
    {
      icon: Languages,
      title: 'Bengali & English Mock Tests',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0C]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-[#C49B4B]/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#C49B4B]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-lg">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-[#C49B4B]/[0.06] blur-3xl rounded-full" />
              {/* SVG Illustration */}
              <img
                src={whychooseus}
                alt="Why Choose Us Illustration"
                className="w-full h-auto relative z-10"
              />
            </div>
          </motion.div>

          {/* Right Section - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                Enroll in Test Series for 40 banks with
              </h2>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-4xl lg:text-5xl font-bold text-gradient-gold">
                  BankPrep
                </span>
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 12 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-r from-[#C49B4B] to-[#D4AF5A] text-[#09090B] px-4 py-2 rounded-xl font-bold text-sm transform shadow-md">
                    PASS
                  </div>
                </motion.div>
              </div>
              <p className="text-lg text-white/40 leading-relaxed max-w-xl font-light">
                Get unlimited access to the most relevant Mock Tests, on
                Bangladesh's Structured Online Bank Exam preparation platform
              </p>
            </div>

            {/* What you get section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">
                What you get with BankPrep Pass
              </h3>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group relative rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 border border-white/[0.06] hover:border-[#C49B4B]/20"
                      style={{
                        background: 'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                      }}
                    >
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#C49B4B]/10 to-[#D4AF5A]/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Icon */}
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="w-12 h-12 bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/10 rounded-xl flex items-center justify-center flex-shrink-0"
                        >
                          <benefit.icon className="w-6 h-6 text-[#C49B4B]" strokeWidth={2} />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <div className="relative z-10 flex-1">
                        <h4 className="font-semibold text-white text-base leading-snug group-hover:text-[#D4AF5A] transition-colors">
                          {benefit.title}
                        </h4>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="btn-premium px-8 py-6 text-lg rounded-2xl shadow-lg transition-all duration-300 font-semibold hover:scale-105"
                >
                  Explore BankPrep Pass
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
