import React from 'react';
import {
  ArrowRight,
  Briefcase,
  BookOpen,
  Target,
  Users,
  Trophy,
  CheckCircle2,
  TrendingUp,
  Star,
  ArrowUpRight,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Discover Opportunities',
    description:
      'Browse 40+ updated bank job circulars from DBBL, Brac Bank, City Bank & more.',
    icon: Briefcase,
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 2,
    title: 'Master the Syllabus',
    description:
      'Topic-wise smart lessons for MCQ & Written exams designed by experts.',
    icon: BookOpen,
    gradient: 'from-lime-500 to-lime-600',
  },
  {
    id: 3,
    title: 'Practice & Improve',
    description:
      'Unlimited real exam-style model tests for MTO, PO & TAO positions.',
    icon: Target,
    gradient: 'from-yellow-400 to-yellow-500',
  },
  {
    id: 4,
    title: 'Crack the Interview',
    description:
      'Viva questions, bank-wise interview guides and mock sessions.',
    icon: Users,
    gradient: 'from-amber-400 to-amber-500',
  },
  {
    id: 5,
    title: 'Get Selected',
    description: 'Join 5000+ candidates who already secured jobs in top banks.',
    icon: Trophy,
    gradient: 'from-orange-400 to-orange-500',
  },
];

const stats = [
  { icon: Briefcase, label: 'Active Jobs', value: '40+' },
  { icon: BookOpen, label: 'Study Materials', value: '500+' },
  { icon: Target, label: 'Practice Tests', value: '1000+' },
  { icon: TrendingUp, label: 'Success Rate', value: '95%' },
];

const StepSection = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-2 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust badge */}

        {/* ===== PROFESSIONAL STEP FLOW ===== */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-slate-900">
              Your Career Roadmap
            </h2>
            <p className="text-slate-600 text-lg">
              5 clear steps trusted by 10,000+ candidates
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 via-lime-500 to-yellow-400"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
              {steps.map(step => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="text-center group">
                    <div
                      className={`w-14 h-14 mx-auto mb-5 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl group-hover:scale-110 transition`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition">
                      <div
                        className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${step.gradient} mb-3`}
                      >
                        Step {step.id}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            '10,000+ Students',
            'Daily Updates',
            'Expert Content',
            'Free Resources',
          ].map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 font-semibold text-slate-700"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepSection;
