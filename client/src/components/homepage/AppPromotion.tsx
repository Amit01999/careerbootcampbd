import React from 'react';
import { CheckCircle, Download, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';
import appScreen from '../../assets/mobile.png';

export default function AppPromotion() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1100px] relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Badge className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white border-0 w-fit font-medium px-4 py-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Smartphone className="w-4 h-4 inline mr-2" />
              Available Now
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              Prepare Anytime,{' '}
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                Anywhere
              </span>
            </h2>

            <p className="text-lg text-white/60 max-w-xl leading-relaxed">
              Download the Private Bank Bootcamp mobile app to access full
              courses, mock tests, and live classes anytime. Learn flexibly and
              stay exam-ready wherever you are.
            </p>

            {/* FEATURES */}
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 pt-2">
              {[
                'Offline video downloads',
                'Live class notifications',
                'Daily practice reminders',
                'Light & dark mode support',
                'Cross-device sync',
                'Low data usage mode',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* STATS */}
            <div className="flex gap-10 pt-6 border-t border-white/10">
              {[
                { value: '50,000+', label: 'Downloads' },
                { value: '4.8 ★', label: 'Play Store' },
                { value: '4.7 ★', label: 'App Store' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Download className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-gradient-to-r from-gray-900 to-black text-white hover:from-gray-800 hover:to-gray-900 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Download className="mr-2 h-5 w-5" />
                  App Store
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT – PHONE MOCKUP */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:flex justify-center"
          >
            {/* Glow */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 blur-3xl rounded-full" />

            {/* Phone Body */}
            <motion.div
              whileHover={{ y: -10, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative w-[280px] h-[560px] bg-gradient-to-br from-gray-900 to-black rounded-[42px] p-[10px] shadow-[0_0_80px_rgba(16,185,129,0.3)]"
            >
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-2xl z-20" />

              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                <img
                  src={appScreen}
                  alt="Private Bank Bootcamp App"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
