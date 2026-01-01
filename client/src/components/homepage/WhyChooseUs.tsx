import React from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, FileText, BarChart3, Languages } from 'lucide-react';
import whychooseus from '@/assets/WhyChooseUs.svg';
export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Trophy,
      title: 'All Bangladesh Rank',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      icon: FileText,
      title: 'Latest Exam Patterns',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      icon: BarChart3,
      title: 'In-depth Performance Analysis',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      icon: Languages,
      title: 'Bengali & English Mock Tests',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section - Illustration */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative w-full max-w-lg">
              {/* SVG Illustration */}
              <img
                src={whychooseus}
                alt="Why Choose Us Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Enroll in Test Series for 40 banks with
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-4xl lg:text-5xl font-bold text-gray-900">
                  BankPrep
                </span>
                <div className="relative">
                  <div className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm transform rotate-12 shadow-lg">
                    PASS
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Get unlimited access to the most relevant Mock Tests, on
                Bangladesh's Structured Online Bank Exam preparation platform
              </p>
            </div>

            {/* What you get section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                What you get with BankPrep Pass
              </h3>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`${benefit.bgColor} rounded-xl p-6 flex items-start gap-4 transition-all hover:shadow-md hover:-translate-y-1 duration-200`}
                  >
                    <div className={`${benefit.iconColor} flex-shrink-0 mt-1`}>
                      <benefit.icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base leading-snug">
                        {benefit.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                size="lg"
                className="bg-[#00BCD4] hover:bg-[#00ACC1] text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              >
                Explore BankPrep Pass
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
