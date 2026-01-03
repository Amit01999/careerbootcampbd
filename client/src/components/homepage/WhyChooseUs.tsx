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
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      icon: FileText,
      title: 'Latest Exam Patterns',
      gradient: 'from-violet-400 to-purple-500',
    },
    {
      icon: BarChart3,
      title: 'In-depth Performance Analysis',
      gradient: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Languages,
      title: 'Bengali & English Mock Tests',
      gradient: 'from-cyan-400 to-blue-500',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
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
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full" />
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
                <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">
                  BankPrep
                </span>
                <motion.div
                  initial={{ rotate: 0 }}
                  whileInView={{ rotate: 12 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-xl font-bold text-sm transform shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                    PASS
                  </div>
                </motion.div>
              </div>
              <p className="text-lg text-white/60 leading-relaxed max-w-xl font-light">
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
                      className="group relative bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 hover:border-white/30 rounded-2xl p-6 flex items-start gap-4 transition-all shadow-lg hover:shadow-2xl duration-300"
                    >
                      {/* Glow effect */}
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${benefit.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      />

                      {/* Icon */}
                      <div className="relative z-10">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          <benefit.icon className="w-6 h-6 text-white" strokeWidth={2} />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <div className="relative z-10 flex-1">
                        <h4 className="font-semibold text-white text-base leading-snug group-hover:text-cyan-400 transition-colors">
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-blue-400 text-[#030712] px-8 py-6 text-lg rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300 font-semibold"
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
