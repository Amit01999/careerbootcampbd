import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, ChevronRight, Star, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from 'framer-motion';

export default function CoursesLearningPrograms() {
  const courses = [
    {
      title: 'Private Bank Officer - Foundation to Advanced',
      duration: '4 Months',
      price: '৳ 3,999',
      oldPrice: '৳ 6,999',
      discount: '43% OFF',
      features: [
        '150+ Video Lessons (Bengali + English)',
        '30 Chapter-wise Tests',
        '10 Full Mock Exams',
        'Downloadable PDF Notes',
        'Live Doubt Solving Sessions',
        'Interview Preparation Guide',
        'Job Alert Notifications',
        'Lifetime Access',
      ],
      students: '18,234',
      rating: 4.8,
      reviews: '3,456',
      color: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'PO Complete Preparation - Premium Program',
      duration: '6 Months',
      price: '৳ 6,999',
      oldPrice: '৳ 12,999',
      discount: '46% OFF',
      features: [
        '250+ Video Masterclasses',
        '50 Mock Exams (MCQ + Written)',
        'Personal Mentor Assignment',
        'Written Answer Evaluation',
        'Group Discussion Practice',
        '100+ Case Studies',
        'Weekly Performance Review',
        'Interview Boot Camp',
      ],
      students: '12,567',
      rating: 4.9,
      reviews: '2,890',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      title: 'MTO/MT Complete Preparation - Elite Track',
      duration: '9 Months',
      price: '৳ 14,999',
      oldPrice: '৳ 24,999',
      discount: '40% OFF',
      badge: 'BEST SELLER',
      features: [
        '400+ Hours of Content',
        'Advanced Analytics Training',
        'Business Case Solving',
        '75 Full-Length Tests',
        'One-on-One Mentorship',
        'Resume Building Workshop',
        'Mock Interview Sessions',
        'Placement Assistance',
      ],
      students: '5,234',
      rating: 5.0,
      reviews: '1,234',
      color: 'from-amber-400 to-orange-500',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto max-w-[1006px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Complete Course Programs
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Structured learning paths for every private bank position
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative h-full"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${course.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                <Card className="relative h-full bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 group-hover:border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="absolute top-4 right-4">
                    {course.badge ? (
                      <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 font-bold">
                        {course.badge}
                      </Badge>
                    ) : (
                      <Badge className={`bg-gradient-to-r ${course.color} text-white border-0`}>
                        {course.duration}
                      </Badge>
                    )}
                  </div>

                  <CardHeader className="p-6 pt-14">
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-white">
                          {course.price}
                        </span>
                        <span className="text-lg text-white/40 line-through">
                          {course.oldPrice}
                        </span>
                      </div>
                      <Badge className="bg-emerald-500 text-white border-0">
                        {course.discount}
                      </Badge>
                    </div>

                    <CardTitle className="text-lg font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                      {course.title}
                    </CardTitle>

                    <div className="space-y-2 mb-4">
                      {course.features.slice(0, 6).map((feature, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-2 text-sm text-white/70"
                        >
                          <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/50 mb-5 pb-5 border-t border-white/10 pt-4">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        {course.rating} ({course.reviews})
                      </div>
                    </div>

                    <Button className={`w-full text-white font-semibold bg-gradient-to-r ${course.color} hover:opacity-90 shadow-lg transition-all`}>
                      Enroll Now
                    </Button>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="link"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            View All Courses <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
