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

export default function FeatureShowcase() {
  const features = [
    {
      icon: BookOpen,
      title: 'Updated Study Content',
      desc: '1000+ video lessons, PDF notes, and practice questions covering all major private banks - BRAC Bank, DBBL, City Bank, Eastern Bank, Prime Bank, and more.',
      badge: 'Bilingual',
      color: '#0ad0f4',
    },
    {
      icon: Target,
      title: 'Bank-Specific Mock Tests',
      desc: '50+ full-length mock exams replicating actual bank recruitment patterns. Practice MCQ, written, and analytical sections with instant results.',
      badge: 'Updated 2025',
      color: '#25cd71',
    },
    {
      icon: Users,
      title: 'Expert-Led Sessions',
      desc: 'Daily live classes by former bankers and exam toppers. Clear doubts in real-time and learn exam strategies from industry professionals.',
      badge: 'Interactive',
      color: '#ffcb00',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics Dashboard',
      desc: 'Track your preparation progress, identify weak areas, and get personalized recommendations to improve faster than competition.',
      badge: 'AI-Powered',
      color: '#5738b2',
    },
  ];

  return (
    <div>
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F2F6FF] to-[#E7EEFF]">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center space-y-5 mb-10">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              A complete preparation ecosystem designed for Bangladesh's private
              bank exams
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="group relative bg-white border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl"
                style={{ borderRadius: '12px' }}
              >
                <CardHeader className="p-8 space-y-5">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon
                      className="h-7 w-7"
                      style={{ color: feature.color, strokeWidth: 2 }}
                    />
                  </div>

                  {/* Badge */}
                  <Badge
                    className="w-fit text-xs font-medium px-3 py-1 rounded-md"
                    style={{
                      backgroundColor: `${feature.color}15`,
                      color: feature.color,
                      border: `1px solid ${feature.color}30`,
                    }}
                  >
                    {feature.badge}
                  </Badge>

                  {/* Title */}
                  <CardTitle className="text-xl font-semibold text-slate-900 leading-snug">
                    {feature.title}
                  </CardTitle>

                  {/* Description */}
                  <CardDescription className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.desc}
                  </CardDescription>
                </CardHeader>

                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ backgroundColor: feature.color }}
                />
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <Button className="bg-primary hover:Primary-hover text-white font-medium px-10 py-6 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started Today
            </Button>
            <p className="mt-5 text-sm text-slate-500">
              Free 7-day trial • No credit card required
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
