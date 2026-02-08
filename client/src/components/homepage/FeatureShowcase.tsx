import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, Users, BarChart3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeatureShowcase() {
  const features = [
    {
      icon: BookOpen,
      title: 'Updated Study Content',
      desc: '1000+ video lessons, PDF notes, and practice questions covering all major private banks including BRAC Bank, DBBL, City Bank, and more.',
      badge: 'Bilingual',
    },
    {
      icon: Target,
      title: 'Bank-Specific Mock Tests',
      desc: '50+ full-length mock exams aligned with real recruitment patterns. MCQ, written, and analytical sections included.',
      badge: 'Updated 2025',
    },
    {
      icon: Users,
      title: 'Expert-Led Sessions',
      desc: 'Daily live classes by former bankers and exam toppers with real-time doubt clearing and proven strategies.',
      badge: 'Interactive',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics Dashboard',
      desc: 'Track performance, identify weak areas, and get personalized recommendations to improve faster.',
      badge: 'AI-Powered',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0A0C] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] bg-[#C49B4B]/[0.035] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#C49B4B]/[0.025] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-5"
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
            bg-[#C49B4B]/10 border border-[#C49B4B]/20 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-[#C49B4B]" />
            <span className="text-sm font-semibold text-[#D4AF5A]">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Everything You Need to{' '}
            <span className="text-gradient-gold">Succeed</span>
          </h2>

          <p className="text-lg text-white/40">
            A complete preparation ecosystem for private bank exams
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="group relative h-full">
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl
                  bg-gradient-to-r from-[#C49B4B]/15 to-[#D4AF5A]/10
                  opacity-0 group-hover:opacity-100
                  blur-xl transition-opacity duration-500"
                />

                <Card
                  className="
                    relative h-full rounded-2xl
                    border border-white/[0.06]
                    bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]
                    transition-all duration-300
                    group-hover:border-[#C49B4B]/30
                    group-hover:shadow-[0_12px_40px_-18px_rgba(196,155,75,0.4)]
                  "
                >
                  <CardHeader className="p-6 space-y-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl
                      bg-[#C49B4B]/10 border border-[#C49B4B]/15
                      flex items-center justify-center"
                    >
                      <feature.icon className="w-6 h-6 text-[#C49B4B]" />
                    </div>

                    {/* Badge */}
                    <Badge
                      className="w-fit text-xs px-3 py-1
                      bg-[#C49B4B]/10 text-[#D4AF5A]
                      border border-[#C49B4B]/20"
                    >
                      {feature.badge}
                    </Badge>

                    {/* Title */}
                    <CardTitle
                      className="text-lg font-semibold text-white
                      transition-colors duration-300
                      group-hover:text-[#D4AF5A]"
                    >
                      {feature.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-sm text-white/35 leading-relaxed">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button className="btn-premium text-base shadow-md hover:opacity-90">
            Get Started Today
          </Button>
          <p className="mt-4 text-sm text-white/25">
            Free 7-day trial • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
