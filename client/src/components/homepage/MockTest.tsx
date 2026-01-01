import React from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ChevronRight } from 'lucide-react';

export default function MockTest() {
  const mockTests = [
    {
      bank: 'BRAC Bank',
      test: 'Officer (Cash) Mock Test 2025',
      questions: 200,
      duration: '2 Hours',
      attempts: '15,234',
      rating: 4.8,
    },
    {
      bank: 'DBBL',
      test: 'Probationary Officer Complete Pack',
      questions: 180,
      duration: '2.5 Hours',
      attempts: '22,145',
      rating: 4.9,
    },
    {
      bank: 'City Bank',
      test: 'Management Trainee Officer Pack',
      questions: 220,
      duration: '3 Hours',
      attempts: '8,567',
      rating: 4.7,
    },
    {
      bank: 'EBL',
      test: 'Senior Officer Assessment',
      questions: 180,
      duration: '2 Hours',
      attempts: '12,890',
      rating: 4.6,
    },
    {
      bank: 'Islami Bank',
      test: 'Corporate Officer Mock Set',
      questions: 150,
      duration: '90 Minutes',
      attempts: '19,876',
      rating: 4.8,
    },
    {
      bank: 'Prime Bank',
      test: 'Graduate Trainee Pack',
      questions: 210,
      duration: '2.5 Hours',
      attempts: '7,345',
      rating: 4.6,
    },
    {
      bank: 'Standard Chartered',
      test: 'International Officer Test',
      questions: 240,
      duration: '3 Hours',
      attempts: '3,594',
      rating: 4.9,
    },
    {
      bank: 'HSBC',
      test: 'Global Analyst Assessment',
      questions: 230,
      duration: '2.5 Hours',
      attempts: '4,122',
      rating: 4.8,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F5F7FA] to-[#E9EDF5]">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#2C3E50] mb-2">
              Popular Mock Test Series
            </h2>
            <p className="text-lg text-[#556270]">
              Practice using the most accurate and real-exam-based mock tests in
              Bangladesh
            </p>
          </div>

          <Button
            variant="link"
            className="text-[#79CBFA] hover:text-[#58B1E8] font-medium"
          >
            View All Mock Tests <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockTests.map((test, i) => (
            <Card
              key={i}
              className="bg-white border border-[#E3E8EF] hover:shadow-lg transition-all duration-300"
              style={{ borderRadius: '6px' }}
            >
              <CardHeader className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-[#79CBFA] text-white font-medium px-2.5 py-1">
                    {test.bank}
                  </Badge>

                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                    <span className="text-sm font-semibold text-[#2C3E50]">
                      {test.rating}
                    </span>
                  </div>
                </div>

                <CardTitle className="text-base font-semibold text-[#34495E] leading-snug mb-4">
                  {test.test}
                </CardTitle>

                <CardDescription className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                    <CheckCircle className="h-4 w-4 text-[#25cd71]" />
                    {test.questions} MCQ Questions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                    <CheckCircle className="h-4 w-4 text-[#25cd71]" />
                    {test.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                    <CheckCircle className="h-4 w-4 text-[#25cd71]" />
                    Real Exam Pattern
                  </div>
                </CardDescription>

                <p className="text-xs text-[#7F8C8D] mb-4">
                  {test.attempts}+ attempts
                </p>

                <Button
                  className="w-full bg-[#79CBFA] hover:bg-[#58B1E8] text-[#1B2A38] font-semibold transition-all"
                  style={{ borderRadius: '5px' }}
                >
                  Start Test
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
