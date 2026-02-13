import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  FileText,
  BookOpen,
  ClipboardList,
  Lock,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Target,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { banksData } from '@/data/banksData';

export default function RecruitmentProcessDetail() {
  const params = useParams();
  const navigate = useNavigate();

  // Mock authentication state - replace with actual auth context
  const isAuthenticated = false; // TODO: Replace with actual auth check

  const handleResourceClick = (resourceType: string) => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      // Handle authenticated resource access
      console.log(`Accessing ${resourceType}`);
    }
  };

  // Get bank data based on ID
  const bank = banksData.find(b => b.id === params.id);

  if (!bank) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Bank Not Found
          </h1>
          <p className="text-gray-400 font-medium mb-6">
            We couldn't find the bank you're looking for.
          </p>
          <Button
            onClick={() => navigate('/recruitment-processes')}
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
          >
            View All Banks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090B] mt-20">
      {/* ─── HERO HEADER ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Background with bank color accent */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${bank.color}12 0%, transparent 40%, ${bank.color}08 100%)`,
          }}
        />
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ backgroundColor: bank.color }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
          style={{ backgroundColor: bank.color }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${bank.color}40, transparent)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 pb-14">
          {/* Back button */}
          <button
            onClick={() => navigate('/recruitment-processes')}
            className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-all duration-300 group text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="border-b border-transparent group-hover:border-gray-500 pb-0.5">
              Back to All Banks
            </span>
          </button>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Logo */}
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0 text-5xl shadow-2xl border"
              style={{
                background: `linear-gradient(145deg, ${bank.color}15, ${bank.color}08)`,
                borderColor: `${bank.color}25`,
              }}
            >
              {bank.logo}
            </div>

            <div className="flex-1 min-w-0">
              {/* Short name badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-[0.15em] mb-4"
                style={{
                  backgroundColor: `${bank.color}12`,
                  borderColor: `${bank.color}30`,
                  color: bank.color,
                }}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                {bank.shortName}
              </div>

              {/* Bank name */}
              <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                {bank.name}
              </h1>

              {/* Positions */}
              <div className="flex flex-wrap gap-2.5">
                {bank.positions.map((position, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold border backdrop-blur-sm"
                    style={{
                      backgroundColor: `${bank.color}10`,
                      borderColor: `${bank.color}20`,
                      color: bank.color,
                    }}
                  >
                    <Target className="w-3.5 h-3.5 mr-2 opacity-70" />
                    {position}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent" />
      </div>

      {/* ─── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* ─── LEFT COLUMN ─────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Program Overview */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(135deg, ${bank.color}20, ${bank.color}08)`,
                    borderColor: `${bank.color}25`,
                  }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: bank.color }} />
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Program Overview
                </h2>
              </div>
              <div
                className="rounded-2xl p-6 lg:p-8 border backdrop-blur-sm"
                style={{
                  background:
                    'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <p className="text-gray-300 leading-[1.85] text-[15px]">
                  {bank.overview}
                </p>
              </div>
            </section>

            {/* Eligibility Criteria */}
            <section>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(135deg, ${bank.color}20, ${bank.color}08)`,
                    borderColor: `${bank.color}25`,
                  }}
                >
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: bank.color }}
                  />
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Eligibility Criteria
                </h2>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-6 ml-[52px]">
                Ensure you meet these requirements before applying
              </p>
              <div className="space-y-3">
                {bank.eligibility.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:border-opacity-50 group"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      borderColor: 'rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        `${bank.color}30`;
                      (e.currentTarget as HTMLDivElement).style.background =
                        `${bank.color}06`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        'rgba(255,255,255,0.06)';
                      (e.currentTarget as HTMLDivElement).style.background =
                        'rgba(255,255,255,0.02)';
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${bank.color}18` }}
                    >
                      <CheckCircle
                        className="w-3.5 h-3.5"
                        style={{ color: bank.color }}
                      />
                    </div>
                    <span className="text-gray-300 leading-relaxed text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── RECRUITMENT JOURNEY (Timeline) ────────────────── */}
            <section>
              <div className="flex items-center gap-3 mb-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    background: `linear-gradient(135deg, ${bank.color}20, ${bank.color}08)`,
                    borderColor: `${bank.color}25`,
                  }}
                >
                  <ClipboardList
                    className="w-5 h-5"
                    style={{ color: bank.color }}
                  />
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">
                  Recruitment Journey
                </h2>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div
                  className="absolute left-[27px] top-0 bottom-0 w-px"
                  style={{
                    background: `linear-gradient(to bottom, ${bank.color}40, ${bank.color}15)`,
                  }}
                />

                <div className="space-y-8">
                  {bank.stages.map((stage, index) => (
                    <div key={index} className="relative pl-16">
                      {/* Timeline dot */}
                      <div
                        className="absolute left-0 top-0 w-[55px] h-[55px] rounded-2xl flex items-center justify-center font-extrabold text-white text-lg shadow-lg z-10"
                        style={{
                          background: `linear-gradient(135deg, ${bank.color} 0%, ${bank.color}cc 100%)`,
                          boxShadow: `0 4px 20px ${bank.color}30`,
                        }}
                      >
                        {stage.number}
                      </div>

                      {/* Stage card */}
                      <div
                        className="rounded-2xl border overflow-hidden transition-all duration-300"
                        style={{
                          background:
                            'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                          borderColor: 'rgba(255,255,255,0.08)',
                        }}
                        onMouseEnter={e => {
                          (
                            e.currentTarget as HTMLDivElement
                          ).style.borderColor = `${bank.color}25`;
                        }}
                        onMouseLeave={e => {
                          (
                            e.currentTarget as HTMLDivElement
                          ).style.borderColor = 'rgba(255,255,255,0.08)';
                        }}
                      >
                        <div className="p-6 lg:p-7">
                          {/* Stage header */}
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                              {stage.title}
                            </h3>
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border"
                              style={{
                                backgroundColor: `${bank.color}12`,
                                borderColor: `${bank.color}25`,
                                color: bank.color,
                              }}
                            >
                              <Clock className="w-3 h-3" />
                              {stage.duration}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-gray-400 leading-[1.8] text-[15px] mb-5">
                            {stage.description}
                          </p>

                          {/* Pro Tips */}
                          {stage.tips.length > 0 && (
                            <div
                              className="rounded-xl p-5 border"
                              style={{
                                backgroundColor: `${bank.color}08`,
                                borderColor: `${bank.color}18`,
                              }}
                            >
                              <div className="font-bold mb-4 flex items-center gap-2 text-sm">
                                <span className="text-lg">💡</span>
                                <span className="text-white">Pro Tips</span>
                              </div>
                              <ul className="space-y-3">
                                {stage.tips.map((tip, tipIndex) => (
                                  <li
                                    key={tipIndex}
                                    className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed"
                                  >
                                    <span
                                      className="font-extrabold text-base mt-px"
                                      style={{ color: bank.color }}
                                    >
                                      •
                                    </span>
                                    <span className="flex-1">{tip}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ─── RIGHT SIDEBAR ───────────────────────────────────── */}
          <div className="space-y-6">
            {/* Mock Tests */}
            <SidebarResourceCard
              icon={<ClipboardList className="w-5 h-5" />}
              title="Mock Tests"
              subtitle="Practice with real exam patterns"
              bankColor={bank.color}
            >
              {bank.resources.mockTests.map(test => (
                <ResourceItem
                  key={test.id}
                  onClick={() => handleResourceClick('mock-test')}
                  bankColor={bank.color}
                  isAuthenticated={isAuthenticated}
                >
                  <h4 className="font-semibold text-white text-sm leading-snug mb-2">
                    {test.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span>{test.questions} questions</span>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span>{test.duration}</span>
                  </div>
                </ResourceItem>
              ))}
            </SidebarResourceCard>

            {/* Previous Year Questions */}
            <SidebarResourceCard
              icon={<FileText className="w-5 h-5" />}
              title="Previous Year Questions"
              subtitle="Analyze past exam papers"
              bankColor={bank.color}
            >
              {bank.resources.previousYears.map(paper => (
                <ResourceItem
                  key={paper.id}
                  onClick={() => handleResourceClick('previous-year')}
                  bankColor={bank.color}
                  isAuthenticated={isAuthenticated}
                >
                  <h4 className="font-semibold text-white text-sm leading-snug mb-1.5">
                    {paper.title}
                  </h4>
                  <div className="text-xs text-gray-500 font-medium">
                    Year: {paper.year}
                  </div>
                </ResourceItem>
              ))}
            </SidebarResourceCard>

            {/* Recommended Books */}
            <SidebarResourceCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Recommended Books"
              subtitle="Essential study materials"
              bankColor={bank.color}
            >
              {bank.resources.books.map(book => (
                <ResourceItem
                  key={book.id}
                  onClick={() => handleResourceClick('book')}
                  bankColor={bank.color}
                  isAuthenticated={isAuthenticated}
                >
                  <h4 className="font-semibold text-white text-sm leading-snug mb-1.5">
                    {book.title}
                  </h4>
                  <div className="text-xs text-gray-500 font-medium">
                    by {book.author}
                  </div>
                </ResourceItem>
              ))}
            </SidebarResourceCard>

            {/* CTA Card */}
            {!isAuthenticated && (
              <div
                className="rounded-2xl overflow-hidden sticky top-24 shadow-2xl border"
                style={{
                  background: `linear-gradient(135deg, ${bank.color} 0%, ${bank.color}dd 100%)`,
                  borderColor: `${bank.color}60`,
                }}
              >
                <div className="p-7 relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-[0.06] rounded-full -mr-20 -mt-20" />
                  <div className="absolute bottom-0 left-0 w-28 h-28 bg-white opacity-[0.04] rounded-full -ml-14 -mb-14" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-extrabold text-xl text-white">
                        Unlock Full Access
                      </h3>
                    </div>
                    <p className="text-sm text-white/85 mb-6 leading-relaxed font-medium">
                      Get instant access to all mock tests, previous year
                      questions, and premium study materials
                    </p>
                    <Button
                      onClick={() => navigate('/auth')}
                      className="w-full bg-white hover:bg-gray-50 shadow-xl font-bold text-base py-6 transition-all duration-300 hover:scale-[1.02]"
                      style={{ color: bank.color }}
                    >
                      Login Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar Card Component ────────────────────────────────────── */
function SidebarResourceCard({
  icon,
  title,
  subtitle,
  bankColor,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bankColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        background:
          'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div
        className="p-5 pb-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-3 mb-1.5">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center border"
            style={{
              background: `linear-gradient(135deg, ${bankColor}20, ${bankColor}08)`,
              borderColor: `${bankColor}25`,
              color: bankColor,
            }}
          >
            {icon}
          </div>
          <h3 className="text-[15px] font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
        <p className="text-xs text-gray-500 font-medium ml-12">{subtitle}</p>
      </div>
      <div className="p-4 space-y-3">{children}</div>
    </div>
  );
}

/* ─── Resource Item Component ───────────────────────────────────── */
function ResourceItem({
  children,
  onClick,
  bankColor,
  isAuthenticated,
}: {
  children: React.ReactNode;
  onClick: () => void;
  bankColor: string;
  isAuthenticated: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl transition-all duration-300 border group relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          `${bankColor}25`;
        (e.currentTarget as HTMLButtonElement).style.background =
          `${bankColor}08`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          'rgba(255,255,255,0.06)';
        (e.currentTarget as HTMLButtonElement).style.background =
          'rgba(255,255,255,0.02)';
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">{children}</div>
        {!isAuthenticated && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border"
            style={{
              backgroundColor: `${bankColor}10`,
              borderColor: `${bankColor}20`,
            }}
          >
            <Lock className="w-3.5 h-3.5" style={{ color: bankColor }} />
          </div>
        )}
      </div>
    </button>
  );
}
