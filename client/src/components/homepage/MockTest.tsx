import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1200px] relative z-10">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Popular Mock Test Series
            </h2>
            <p className="text-lg text-white/60">
              Practice using the most accurate and real-exam-based mock tests in
              Bangladesh
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="link"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
              onClick={() => navigate('/exams')}
            >
              View All Mock Tests <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            <span className="ml-3 text-lg text-white/60">Loading exams...</span>
          </div>
        ) : exams.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-white/60">No exams available at this time</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {exams.map((exam, index) => (
              <motion.div
                key={exam._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="group relative h-full"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card className="relative h-full bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 group-hover:border-cyan-400/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium px-2.5 py-1 border-0">
                          {exam.examType || 'Mock Test'}
                        </Badge>

                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-white">
                            4.5
                          </span>
                        </div>
                      </div>

                      <CardTitle className="text-base font-semibold text-white leading-snug mb-4 group-hover:text-cyan-400 transition-colors">
                        {exam.title}
                      </CardTitle>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {exam.totalQuestions || 0} MCQ Questions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {exam.duration || 0} Minutes
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          {exam.totalMarks || 0} Marks
                        </div>
                      </div>

                      <p className="text-xs text-white/50 mb-4">
                        {exam.attemptCount || 0}+ attempts
                      </p>

                      <Button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold transition-all shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2"
                        onClick={() => navigate(`/exam/${exam._id || exam.slug}/start`)}
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
