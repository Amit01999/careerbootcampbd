import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Target,
  Trophy,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  ChevronRight,
  Download,
  MessageCircle,
  BarChart3,
  Play,
  Smartphone,
  ChevronDown,
  RefreshCw,
  Globe,
  Shield,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/homepage/HeroSection';
import FeatureShowcase from '@/components/homepage/FeatureShowcase';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';
import RecruitmentProcesses from '@/components/homepage/RecruitmentProcesses';
import MockTest from '@/components/homepage/MockTest';
import SuccessStories from '@/components/homepage/SuccessStories';
import FAQSection from '@/components/homepage/FAQSection';
import HeroSection1 from '@/components/homepage/HeroSection1';
import SetpSection from '@/components/homepage/StepSection';
import CTA from '@/components/homepage/CTA';
import AppPromotion from '@/components/homepage/AppPromotion';
import CoursesLearningPrograms from '@/components/homepage/CoursesLearningPrograms';

export default function Index() {
  return (
    <div
      className="w-full"
      style={
        {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        } as React.CSSProperties
      }
    >
      <style>{`
        :root {
          --primary-cyan: #0ad0f4;
          --primary-cyan-hover: #09bbdc;
          --success-green: #25cd71;
          --error-red: #e5174f;
          --gold: #ffcb00;
          --elite-purple: #5738b2;
          --dark-text: #3b4a54;
          --secondary-text: #646f79;
          --light-bg: #f6f8f9;
          --border-gray: #dfe4e8;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(46, 129, 247, 0.15);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-primary {
          background-color: var(--primary-cyan);
          color: white;
          border-radius: 4px;
          padding: 0.375rem 1.5rem;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background-color: var(--primary-cyan-hover);
        }

        .text-cyan {
          color: var(--primary-cyan);
        }

        .bg-cyan {
          background-color: var(--primary-cyan);
        }

        .border-cyan {
          border-color: var(--primary-cyan);
        }
      `}</style>

      {/* Hero Section - Modern Premium Design */}
      <HeroSection />
      {/* <SetpSection /> */}
      <HeroSection1 />

      {/* Feature Showcase */}

      <FeatureShowcase />
      {/* Popular Mock Tests Slider */}
      <MockTest />
      {/* Courses & Learning Programs */}
      <CoursesLearningPrograms />

      {/* App Promotion Section */}
      <AppPromotion />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Bank Recruitment Processes */}
      <RecruitmentProcesses />

      {/* Footer CTA Strip */}
      <CTA />

      {/* FAQ Section */}
      <FAQSection />

      {/* Success Stories / Testimonials */}
      <SuccessStories />
    </div>
  );
}
