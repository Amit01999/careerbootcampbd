import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, ChevronRight, Loader2, Zap } from 'lucide-react';
import { examService } from '@/services/exam.service';
import { motion } from 'framer-motion';

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
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#09090B]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#C49B4B]/[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1200px] relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center sm:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Popular Mock Test Series
            </h2>
            <p className="text-base sm:text-lg text-white/40 max-w-md sm:max-w-xl">
              Practice using the most accurate and real-exam-based mock tests in
              Bangladesh
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center sm:justify-end"
          >
            <Button
              variant="link"
              className="text-sm sm:text-base text-[#C49B4B] hover:text-[#D4AF5A] font-medium"
              onClick={() => navigate('/exams')}
            >
              View All Mock Tests <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex flex-col sm:flex-row items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#C49B4B]" />
            <span className="text-lg text-white/40">Loading exams...</span>
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-white/40">
              No exams available at this time
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {exams.map((exam, index) => (
              <motion.div
                key={exam._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative h-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C49B4B]/20 to-[#D4AF5A]/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card
                    className="relative h-full border border-white/[0.06] group-hover:border-[#C49B4B]/20 shadow-lg transition-all duration-300"
                    style={{
                      background:
                        'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    }}
                  >
                    <CardHeader className="p-4 sm:p-5">
                      <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                        <Badge className="bg-[#C49B4B]/10 text-[#D4AF5A] font-medium px-2.5 py-1 border border-[#C49B4B]/20 shadow-sm text-xs sm:text-sm">
                          {exam.examType || 'Mock Test'}
                        </Badge>

                        <div className="flex items-center gap-1 text-xs sm:text-sm">
                          <Star className="h-4 w-4 fill-[#D4AF5A] text-[#D4AF5A]" />
                          <span className="text-white/60 font-semibold">
                            4.5
                          </span>
                        </div>
                      </div>

                      <CardTitle className="text-sm sm:text-base font-semibold text-white leading-snug mb-3 sm:mb-4 group-hover:text-[#D4AF5A] transition-colors">
                        {exam.title}
                      </CardTitle>

                      <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/40">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {exam.totalQuestions || 0} MCQ Questions
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/40">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {exam.duration || 0} Minutes
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-white/40">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {exam.totalMarks || 0} Marks
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-xs text-white/20 mb-3 sm:mb-4">
                        {exam.attemptCount || 0}+ attempts
                      </p>

                      <Button
                        className="w-full btn-premium shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm py-2 sm:py-3 transition-transform hover:scale-105"
                        onClick={() =>
                          navigate(`/exam/${exam._id || exam.slug}/start`)
                        }
                      >
                        <Zap className="w-4 h-4" />
                        Start Test
                      </Button>
                    </CardHeader>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
