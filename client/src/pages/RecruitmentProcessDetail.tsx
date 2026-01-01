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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      <div className="min-h-screen bg-gradient-to-b from-[#F2F6FF] to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bank Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find the bank you're looking for.
          </p>
          <Button onClick={() => navigate('/recruitment-processes')}>
            View All Banks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F6FF] to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/recruitment-processes')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Banks
          </button>

          <div className="flex items-start gap-6">
            <div
              className={`w-20 h-20 ${bank.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 text-4xl shadow-lg`}
            >
              {bank.logo}
            </div>
            <div className="flex-1">
              <div
                className="text-sm font-bold uppercase tracking-wider mb-2"
                style={{ color: bank.color }}
              >
                {bank.shortName}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {bank.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {bank.positions.map((position, index) => (
                  <Badge
                    key={index}
                    className="px-4 py-1.5 text-sm"
                    style={{ backgroundColor: bank.color }}
                  >
                    {position}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <Card className="border-2 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${bank.color}15` }}
                  >
                    <Sparkles
                      className="w-6 h-6"
                      style={{ color: bank.color }}
                    />
                  </div>
                  Program Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-base">
                  {bank.overview}
                </p>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card className="border-2 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${bank.color}15` }}
                  >
                    <CheckCircle
                      className="w-6 h-6"
                      style={{ color: bank.color }}
                    />
                  </div>
                  Eligibility Criteria
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Ensure you meet these requirements before applying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {bank.eligibility.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <CheckCircle
                        className="w-5 h-5 flex-shrink-0 mt-0.5"
                        style={{ color: bank.color }}
                      />
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recruitment Stages */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-1.5 h-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: bank.color }}
                />
                <h2 className="text-3xl font-bold text-gray-900">
                  Recruitment Journey
                </h2>
              </div>
              <div className="space-y-6">
                {bank.stages.map((stage, index) => (
                  <Card
                    key={index}
                    className="border-l-4 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    style={{ borderLeftColor: bank.color }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-5">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-xl flex-shrink-0 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, ${bank.color} 0%, ${bank.color}dd 100%)`,
                          }}
                        >
                          {stage.number}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-3 text-gray-900">
                            {stage.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="text-xs font-semibold px-3 py-1"
                            style={{
                              borderColor: bank.color,
                              color: bank.color,
                            }}
                          >
                            Duration: {stage.duration}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {stage.description}
                      </p>

                      {stage.tips.length > 0 && (
                        <div
                          className="rounded-xl p-5 border-2"
                          style={{
                            backgroundColor: `${bank.color}08`,
                            borderColor: `${bank.color}25`,
                          }}
                        >
                          <div className="font-semibold mb-4 flex items-center gap-2 text-gray-900 text-base">
                            <span className="text-xl">💡</span>
                            Pro Tips
                          </div>
                          <ul className="space-y-3">
                            {stage.tips.map((tip, tipIndex) => (
                              <li
                                key={tipIndex}
                                className="text-sm text-gray-800 flex items-start gap-3 leading-relaxed"
                              >
                                <span
                                  className="font-bold mt-0.5 text-lg"
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Resources Sidebar */}
          <div className="space-y-8">
            {/* Mock Tests */}
            <Card className="border-2 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${bank.color}15` }}
                  >
                    <ClipboardList
                      className="w-5 h-5"
                      style={{ color: bank.color }}
                    />
                  </div>
                  <span>Mock Tests</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  Practice with real exam patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bank.resources.mockTests.map(test => (
                  <button
                    key={test.id}
                    onClick={() => handleResourceClick('mock-test')}
                    className="w-full text-left p-4 bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md group relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${bank.color}08 0%, transparent 100%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h4
                          className="font-semibold text-gray-900 text-sm leading-snug group-hover:translate-x-0.5 transition-transform"
                          style={{
                            color: 'inherit',
                          }}
                        >
                          {test.title}
                        </h4>
                        {!isAuthenticated && (
                          <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                        <span>{test.questions} questions</span>
                        <span>•</span>
                        <span>{test.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Previous Year Questions */}
            <Card className="border-2 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${bank.color}15` }}
                  >
                    <FileText
                      className="w-5 h-5"
                      style={{ color: bank.color }}
                    />
                  </div>
                  <span>Previous Year Questions</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  Analyze past exam papers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bank.resources.previousYears.map(paper => (
                  <button
                    key={paper.id}
                    onClick={() => handleResourceClick('previous-year')}
                    className="w-full text-left p-4 bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md group relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${bank.color}08 0%, transparent 100%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:translate-x-0.5 transition-transform">
                          {paper.title}
                        </h4>
                        {!isAuthenticated && (
                          <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        Year: {paper.year}
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Books */}
            <Card className="border-2 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${bank.color}15` }}
                  >
                    <BookOpen
                      className="w-5 h-5"
                      style={{ color: bank.color }}
                    />
                  </div>
                  <span>Recommended Books</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  Essential study materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bank.resources.books.map(book => (
                  <button
                    key={book.id}
                    onClick={() => handleResourceClick('book')}
                    className="w-full text-left p-4 bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 hover:shadow-md group relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${bank.color}08 0%, transparent 100%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:translate-x-0.5 transition-transform">
                          {book.title}
                        </h4>
                        {!isAuthenticated && (
                          <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        by {book.author}
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            {!isAuthenticated && (
              <Card
                className="border-0 shadow-2xl overflow-hidden sticky top-20"
                style={{
                  background: `linear-gradient(135deg, ${bank.color} 0%, ${bank.color}dd 100%)`,
                }}
              >
                <CardContent className="p-8 text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-6 h-6" />
                      <h3 className="font-bold text-xl">Unlock Full Access</h3>
                    </div>
                    <p className="text-sm opacity-95 mb-6 leading-relaxed">
                      Get instant access to all mock tests, previous year
                      questions, and premium study materials
                    </p>
                    <Button
                      onClick={() => navigate('/auth')}
                      className="w-full bg-white hover:bg-gray-50 shadow-xl font-semibold text-base py-6 transition-all duration-300 hover:scale-105"
                      style={{ color: bank.color }}
                    >
                      Login Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
