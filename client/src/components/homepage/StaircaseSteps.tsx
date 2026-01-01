import React from 'react';
import { Briefcase, BookOpen, Target, Users, Trophy } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Discover Opportunities',
    description: 'Latest Bank Job Circulars from 40+ banks',
    color: 'from-emerald-400 to-emerald-600',
    icon: Briefcase,
  },
  {
    id: 2,
    title: 'Master the Syllabus',
    description: 'Complete study materials and expert guidance',
    color: 'from-blue-400 to-blue-600',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Practice & Perfect',
    description: 'Bank-specific model tests for all posts',
    color: 'from-indigo-400 to-indigo-600',
    icon: Target,
  },
  {
    id: 4,
    title: 'Ace the Interview',
    description: 'Bank-wise viva preparation and tips',
    color: 'from-purple-400 to-purple-600',
    icon: Users,
  },
  {
    id: 5,
    title: 'Achieve Success',
    description: 'Land your dream bank job position',
    color: 'from-amber-400 to-amber-600',
    icon: Trophy,
  },
];

const StaircaseSteps = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-sky-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Your Journey to Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these 5 simple steps to land your dream bank job
          </p>
        </div> */}

        {/* Staircase Container */}
        <div className="relative flex items-end justify-center min-h-[420px] md:min-h-[480px]">
          {/* Trophy at the top */}
          <div className="absolute right-[10%] top-[-8%] z-20">
            <Trophy className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 drop-shadow-lg" />
          </div>

          {/* Steps */}
          <div className="flex items-end gap-4 relative">
            {steps.map((step, index) => {
              const height = 120 + index * 50;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="relative group transition-transform duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`bg-gradient-to-br ${step.color} flex flex-col justify-between rounded-2xl shadow-xl text-white`}
                    style={{
                      width: 'clamp(100px, 16vw, 160px)',
                      height: `${height}px`,
                    }}
                  >
                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 p-4">
                      <Icon className="w-6 h-6 md:w-8 md:h-8" />
                      <p className="font-semibold text-sm md:text-base">
                        {step.title}
                      </p>
                    </div>

                    {/* Description */}
                    <div className="px-4 pb-6 text-xs md:text-sm opacity-90 leading-snug">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaircaseSteps;
