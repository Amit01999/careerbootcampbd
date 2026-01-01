import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  FileText,
  BookOpen,
  ClipboardList,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  // Mock data - in production, fetch based on params?.id
  const processData = {
    'mtb-mto': {
      title: 'Your MTB MTO Journey',
      bank: 'Mutual Trust Bank',
      position: 'Management Trainee Officer',
      color: '#2E81F7',
      stages: [
        {
          number: 1,
          title: 'Application Submission',
          description: 'Submit your application through MTB\'s official career portal. Ensure all required documents are uploaded including your CV, academic certificates, and national ID.',
          duration: '2 weeks',
          tips: [
            'Double-check all information before submission',
            'Use a professional email address',
            'Keep your CV concise and relevant (max 2 pages)',
          ],
        },
        {
          number: 2,
          title: 'Written Examination',
          description: 'MCQ-based test covering General Knowledge, English, Mathematics, Analytical Ability, and Banking Awareness. The exam typically consists of 100 questions to be completed in 90 minutes.',
          duration: '1 day',
          tips: [
            'Practice time management - allocate 50 seconds per question',
            'Focus on current affairs and Bangladesh banking sector',
            'Review basic math formulas and shortcuts',
          ],
        },
        {
          number: 3,
          title: 'Viva Voce',
          description: 'Face-to-face interview with a panel of senior MTB executives. Topics include your background, banking knowledge, current affairs, and behavioral questions.',
          duration: '15-20 minutes',
          tips: [
            'Research MTB\'s recent initiatives and financial performance',
            'Prepare answers for common behavioral questions',
            'Dress professionally and arrive 15 minutes early',
          ],
        },
        {
          number: 4,
          title: 'Final Selection',
          description: 'Successful candidates will receive an offer letter via email and phone call. Medical examination and background verification will be conducted before joining.',
          duration: '2-3 weeks',
          tips: [
            'Keep your phone and email accessible',
            'Prepare all original documents for verification',
            'Be ready to join within the specified timeframe',
          ],
        },
      ],
      overview: 'The Mutual Trust Bank Management Trainee Officer (MTO) program is designed to develop future banking leaders. MTOs undergo comprehensive training across various departments and are fast-tracked for managerial positions.',
      eligibility: [
        'Bachelor\'s degree in any discipline with minimum CGPA 3.0',
        'No third division/class in academic career',
        'Age limit: Maximum 27 years',
        'Excellent communication skills in English and Bangla',
      ],
      resources: {
        mockTests: [
          { id: 1, title: 'MTB MTO Full Mock Test 2025', questions: 100, duration: '90 min' },
          { id: 2, title: 'Banking Awareness Practice Set', questions: 50, duration: '45 min' },
          { id: 3, title: 'Analytical Ability Test', questions: 40, duration: '40 min' },
        ],
        previousYears: [
          { id: 1, title: 'MTB MTO Question 2024', year: 2024 },
          { id: 2, title: 'MTB MTO Question 2023', year: 2023 },
          { id: 3, title: 'MTB MTO Question 2022', year: 2022 },
        ],
        books: [
          { id: 1, title: 'Banking Recruitment Guide Bangladesh', author: 'Prof. Rahman' },
          { id: 2, title: 'Competitive Exam Preparation', author: 'Dr. Ahmed' },
          { id: 3, title: 'Current Affairs 2025', author: 'BankPrep Editorial' },
        ],
      },
    },
  };

  const process = processData[(params.id as keyof typeof processData) || 'mtb-mto'] || processData['mtb-mto'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F6FF] to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate('/recruitment-processes')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Processes
          </button>

          <div className="flex items-start gap-6">
            <div
              className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0"
            >
              <Building2 className="w-8 h-8" style={{ color: process.color }} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                {process.bank}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                {process.title}
              </h1>
              <Badge className="bg-primary text-white px-4 py-1 text-sm">
                {process.position}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Program Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{process.overview}</p>
              </CardContent>
            </Card>

            {/* Eligibility */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {process.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recruitment Stages */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recruitment Journey - Step by Step
              </h2>
              <div className="space-y-6">
                {process.stages.map((stage, index) => (
                  <Card key={index} className="border-l-4" style={{ borderLeftColor: process.color }}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: process.color }}
                          >
                            {stage.number}
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-2">{stage.title}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {stage.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{stage.description}</p>

                      {stage.tips.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            Pro Tips
                          </div>
                          <ul className="space-y-2">
                            {stage.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-amber-900 flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                {tip}
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mock Tests */}
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ClipboardList className="w-5 h-5 text-primary" />
                  Mock Tests
                </CardTitle>
                <CardDescription>Practice with real exam patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {process.resources.mockTests.map((test) => (
                  <button
                    key={test.id}
                    onClick={() => handleResourceClick('mock-test')}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-primary group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary">
                        {test.title}
                      </h4>
                      {!isAuthenticated && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{test.questions} questions</span>
                      <span>•</span>
                      <span>{test.duration}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Previous Year Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  Previous Year Questions
                </CardTitle>
                <CardDescription>Analyze past exam papers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {process.resources.previousYears.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => handleResourceClick('previous-year')}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-primary group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary">
                        {paper.title}
                      </h4>
                      {!isAuthenticated && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="text-xs text-gray-600">Year: {paper.year}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Books */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Recommended Books
                </CardTitle>
                <CardDescription>Essential study materials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {process.resources.books.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleResourceClick('book')}
                    className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-primary group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary">
                        {book.title}
                      </h4>
                      {!isAuthenticated && <Lock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="text-xs text-gray-600">by {book.author}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            {!isAuthenticated && (
              <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">Unlock Full Access</h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Login to access mock tests, previous year questions, and study materials
                  </p>
                  <Button
                    onClick={() => navigate('/auth')}
                    className="w-full bg-white text-primary hover:bg-gray-100"
                  >
                    Login Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
