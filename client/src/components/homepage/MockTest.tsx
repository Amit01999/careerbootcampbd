import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ChevronRight, Loader2 } from 'lucide-react';
import { examService } from '@/services/exam.service';

export default function MockTest() {
  const navigate = useNavigate();
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await examService.getExams({ page: 1, limit: 8 });
        setExams(response.data || []);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

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
            onClick={() => navigate('/exams')}
          >
            View All Mock Tests <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-[#79CBFA]" />
            <span className="ml-3 text-lg text-[#556270]">Loading exams...</span>
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-[#556270]">No exams available at this time</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {exams.map((exam) => (
              <Card
                key={exam._id}
                className="bg-white border border-[#E3E8EF] hover:shadow-lg transition-all duration-300"
                style={{ borderRadius: '6px' }}
              >
                <CardHeader className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-[#79CBFA] text-white font-medium px-2.5 py-1">
                      {exam.examType || 'Mock Test'}
                    </Badge>

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                      <span className="text-sm font-semibold text-[#2C3E50]">
                        4.5
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-base font-semibold text-[#34495E] leading-snug mb-4">
                    {exam.title}
                  </CardTitle>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                      <CheckCircle className="h-4 w-4 text-[#25cd71]" />
                      {exam.totalQuestions || 0} MCQ Questions
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                      <CheckCircle className="h-4 w-4 text-[#25cd71]" />
                      {exam.duration || 0} Minutes
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#6C7A89]">
                      <CheckCircle className="h-4 w-4 text-[#25cd71]" />
                      {exam.totalMarks || 0} Marks
                    </div>
                  </div>

                  <p className="text-xs text-[#7F8C8D] mb-4">
                    {exam.attemptCount || 0}+ attempts
                  </p>

                  <Button
                    className="w-full bg-[#79CBFA] hover:bg-[#58B1E8] text-[#1B2A38] font-semibold transition-all"
                    style={{ borderRadius: '5px' }}
                    onClick={() => navigate(`/exam/${exam._id || exam.slug}/start`)}
                  >
                    Start Test
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
