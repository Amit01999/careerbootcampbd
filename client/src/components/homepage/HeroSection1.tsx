import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  FileText,
  BookOpen,
  ClipboardCheck,
  MessageSquare,
  ChevronRight,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

const journeySteps = [
  {
    id: 1,
    number: '01',
    title: 'Job Circulars',
    description:
      'Live updates from all major banks with deadline tracking and notification alerts',
    icon: FileText,
    link: '/bank-jobs',
    features: ['Live Updates', 'Deadline Alerts', 'Bank Filter'],
    stats: { value: '500+', label: 'Active Jobs' },
  },
  {
    id: 2,
    number: '02',
    title: 'Written Preparation',
    description:
      'Structured syllabus, smart study plans, and comprehensive resources for optimal learning',
    icon: BookOpen,
    link: '/preparation',
    features: ['Syllabus Coverage', 'Smart Plan', 'Study Materials'],
    stats: { value: '1000+', label: 'Resources' },
  },
  {
    id: 3,
    number: '03',
    title: 'Model Tests',
    description:
      'Practice exams with detailed performance analytics and adaptive difficulty levels',
    icon: ClipboardCheck,
    link: '/model-tests',
    features: ['Mock Tests', 'Analytics Dashboard', 'Scorecards'],
    stats: { value: '200+', label: 'Practice Tests' },
  },
  {
    id: 4,
    number: '04',
    title: 'Viva Preparation',
    description:
      'Post-wise interview questions, mock viva sessions, and expert feedback',
    icon: MessageSquare,
    link: '/viva-preparation',
    features: ['Interview Q&A', 'Mock Viva', 'Expert Tips'],
    stats: { value: '95%', label: 'Success Rate' },
  },
];

export default function JourneyProcess() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative py-12 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold text-emerald-700">
              Professional Career Pathway
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Systematic Journey to{' '}
            <span className="text-emerald-600">Banking Success</span>
          </h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Follow this proven 4-step framework used by 10,000+ successful
            banking professionals
          </p>
        </motion.div>

        {/* Desktop Timeline - Compact */}
        <div
          ref={timelineRef}
          className="hidden lg:block relative max-w-5xl mx-auto"
        >
          <div className="relative z-30 bg-white border border-emerald-200 rounded-lg px-4 py-2 shadow-sm w-fit mx-auto mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                Start your banking career journey
              </span>
            </div>
          </div>

          {/* Central Vertical Line with Scroll Progress */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200">
            <motion.div
              className="absolute left-0 right-0 w-0.5 bg-gradient-to-b from-emerald-500 via-green-500 to-emerald-600 origin-top"
              style={{ height: lineProgress }}
            />
          </div>

          {/* Timeline Steps - Reduced Spacing */}
          <div className="space-y-3">
            {journeySteps.map((step, index) => (
              <TimelineStep key={step.id} step={step} index={index} />
            ))}
          </div>

          {/* Success Endpoint */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative flex justify-center mt-8 mb-4"
          >
            <div className="absolute left-1/2 -translate-x-1/2 -top-4">
              <div className="w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-md" />
            </div>
            <div className="bg-white border border-emerald-200 rounded-lg px-4 py-2 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-700">
                  Career Success
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Timeline - Compact */}
        <div className="lg:hidden space-y-3">
          {journeySteps.map((step, index) => (
            <MobileCard key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-5 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
              <span>Start Your Journey</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-5 text-xs text-gray-500">
            Free 7-day trial • No credit card required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }) {
  const Icon = step.icon;
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Calculate connection line length (consistent for both sides)
  const lineLength = 170; // pixels

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLeft ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Central Dot */}
      <div className="absolute left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="relative w-3 h-3 rounded-full bg-emerald-600 border-2 border-white shadow-md"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.1 }}
            className="absolute inset-0 bg-emerald-500 rounded-full scale-150"
          />
        </motion.div>
      </div>

      {/* Horizontal Connection Line - Fixed for Both Sides */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-px z-10"
        style={{
          width: `${lineLength}px`,
          [isLeft ? 'right' : 'left']: '50%',
          transformOrigin: isLeft ? 'right center' : 'left center',
        }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.1 + 0.1,
          ease: 'easeOut',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500" />
      </motion.div>

      {/* Compact Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={
          isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }
        }
        transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
        className={`relative ${
          isLeft ? `pr-[${lineLength + 8}px]` : `pl-[${lineLength + 8}px]`
        }`}
        style={{
          [isLeft ? 'paddingRight' : 'paddingLeft']: `${lineLength + 8}px`,
        }}
      >
        <Link to={step.link} className="block">
          <div className="group relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 w-[340px]">
            {/* Accent Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-l-lg" />

            {/* Content - Compact Padding */}
            <div className="pl-4 pr-4 py-3.5">
              {/* Header - Compact */}
              <div className="flex items-start justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <div className="text-[20px] font-bold text-emerald-700 uppercase tracking-wider">
                      Step {step.number}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-100">
                  {step.number}
                </div>
              </div>

              {/* Description - Compact */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {step.description}
              </p>

              {/* Features - Compact */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {step.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-100"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs text-gray-700 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats & CTA - Compact */}
              <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-emerald-50 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-gray-900 leading-tight">
                      {step.stats.value}
                    </div>
                    <div className="text-[10px] text-gray-500 leading-tight">
                      {step.stats.label}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                  <span>Explore</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>

            {/* Subtle Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

function MobileCard({ step, index }) {
  const Icon = step.icon;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
      className="relative"
    >
      <Link to={step.link} className="block">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          {/* Left Accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-l-lg" />

          {/* Content - Compact */}
          <div className="pl-4 pr-3 py-3">
            <div className="flex items-start gap-2.5">
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4.5 h-4.5 text-white" />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex-1">
                    <div className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                      Step {step.number}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <div className="text-lg font-bold text-gray-100 ml-2">
                    {step.number}
                  </div>
                </div>

                <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                  {step.description}
                </p>

                {/* Features - Compact */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {step.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-emerald-50 text-emerald-700 rounded border border-emerald-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats - Compact */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded bg-emerald-50 flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 leading-tight">
                        {step.stats.value}
                      </div>
                      <div className="text-[9px] text-gray-500 leading-tight">
                        {step.stats.label}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
