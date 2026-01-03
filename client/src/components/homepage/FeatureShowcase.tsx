import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeatureShowcase() {
  const features = [
    {
      icon: BookOpen,
      title: 'Updated Study Content',
      desc: '1000+ video lessons, PDF notes, and practice questions covering all major private banks - BRAC Bank, DBBL, City Bank, Eastern Bank, Prime Bank, and more.',
      badge: 'Bilingual',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      icon: Target,
      title: 'Bank-Specific Mock Tests',
      desc: '50+ full-length mock exams replicating actual bank recruitment patterns. Practice MCQ, written, and analytical sections with instant results.',
      badge: 'Updated 2025',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Users,
      title: 'Expert-Led Sessions',
      desc: 'Daily live classes by former bankers and exam toppers. Clear doubts in real-time and learn exam strategies from industry professionals.',
      badge: 'Interactive',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics Dashboard',
      desc: 'Track your preparation progress, identify weak areas, and get personalized recommendations to improve faster than competition.',
      badge: 'AI-Powered',
      color: 'from-violet-400 to-purple-500',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">
              Succeed
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            A complete preparation ecosystem designed for Bangladesh's private
            bank exams
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative h-full"
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                />
                <Card className="relative h-full bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 group-hover:border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="p-7 space-y-5">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className="h-7 w-7 text-white" strokeWidth={2} />
                    </motion.div>

                    {/* Badge */}
                    <Badge className={`w-fit text-xs font-medium px-3 py-1 rounded-md bg-gradient-to-r ${feature.color} text-white border-0`}>
                      {feature.badge}
                    </Badge>

                    {/* Title */}
                    <CardTitle className="text-xl font-semibold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-sm text-white/60 leading-relaxed font-normal">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-blue-400 text-[#030712] font-semibold px-12 py-6 text-base rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300">
              Get Started Today
            </Button>
          </motion.div>
          <p className="mt-6 text-sm text-white/50">
            Free 7-day trial • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
