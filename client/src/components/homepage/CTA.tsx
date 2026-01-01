import { ArrowRight, CheckCircle, Sparkles, Users, Award } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                Join 10,000+ Successful Candidates
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Start Your Banking Career Journey Today
            </h2>

            {/* Description */}
            <p className="text-lg text-white/90 leading-relaxed">
              Get access to comprehensive preparation materials, expert guidance, and a proven pathway to success in Bangladesh's banking sector.
            </p>

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: CheckCircle, text: 'Free 7-day trial with full access' },
                { icon: Users, text: 'Expert mentorship & community support' },
                { icon: Award, text: 'Proven success rate of 95%' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white/95"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/80">Students Enrolled</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-3xl font-bold text-white">40+</div>
                <div className="text-sm text-white/80">Partner Banks</div>
              </div>
            </div>
          </motion.div>

          {/* Right CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:ml-auto w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              {/* Card Header */}
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  Ready to Begin?
                </h3>
                <p className="text-gray-600">
                  Start your free trial today. No credit card required.
                </p>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3 py-4">
                {[
                  'Full access to all courses & materials',
                  'Live mock tests & performance analytics',
                  'Expert viva preparation & feedback',
                  'Exclusive job circular updates',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <Link to="/auth" className="block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span>Start Free Trial Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>

                <button className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  View Sample Course
                </button>
              </div>

              {/* Trust Badge */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  ✓ No credit card required • ✓ Cancel anytime • ✓ Money-back guarantee
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
