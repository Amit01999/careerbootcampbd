import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { banksData } from '@/data/banksData';

export default function RecruitmentProcesses() {
  const navigate = useNavigate();

  // Show first 8 banks (2 rows of 4)
  const displayedBanks = banksData.slice(0, 8);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Bank Recruitment Programs
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Explore Bank Recruitment Processes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive step-by-step guides for Bangladesh's top bank
            recruitment programs
          </p>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayedBanks.map(bank => (
            <button
              key={bank.id}
              onClick={() => navigate(`/recruitment-process/${bank.id}`)}
              className="group relative bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:-translate-y-2 text-left overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${bank.color}08 0%, ${bank.color}03 100%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Bank Logo */}
                <div
                  className={`w-16 h-16 ${bank.bgColor} rounded-2xl flex items-center justify-center mb-4 text-3xl transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                >
                  {bank.logo}
                </div>

                {/* Bank Short Name */}
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: bank.color }}
                >
                  {bank.shortName}
                </div>

                {/* Bank Full Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary transition-colors min-h-[3.5rem]">
                  {bank.name}
                </h3>

                {/* Positions Badge */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {bank.positions.slice(0, 1).map((position, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {position}
                    </Badge>
                  ))}
                  {bank.positions.length > 1 && (
                    <Badge variant="secondary" className="text-xs font-medium">
                      +{bank.positions.length - 1} more
                    </Badge>
                  )}
                </div>

                {/* View Details */}
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Bottom Accent */}
                {/* <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transition-all duration-300 scale-x-0 group-hover:scale-x-50"
                  style={{ backgroundColor: bank.color }}
                /> */}
              </div>
            </button>
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/recruitment-processes')}
            size="lg"
            className="group relative px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              View All Bank Recruitment Processes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Explore {banksData.length}+ bank recruitment programs
          </p>
        </div>
      </div>
    </section>
  );
}
