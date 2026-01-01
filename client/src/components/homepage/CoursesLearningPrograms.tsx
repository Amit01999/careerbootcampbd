import React from 'react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { Badge, CheckCircle, ChevronRight, Star, Users } from 'lucide-react';
import { Button } from '../ui/button';

export default function CoursesLearningPrograms() {
  return (
    <div>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1006px]">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#3b4a54]">
              Complete Course Programs
            </h2>
            <p className="text-lg text-[#646f79] max-w-3xl mx-auto">
              Structured learning paths for every private bank position
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
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
                color: '#0ad0f4',
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
                color: '#25cd71',
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
                color: '#ffcb00',
              },
            ].map((course, i) => (
              <Card
                key={i}
                className="card-hover bg-white relative"
                style={{
                  borderRadius: '5px',
                  boxShadow: '-1px 1px 4px rgba(117, 138, 172, 0.12)',
                }}
              >
                <div className="absolute top-0 right-0 m-4">
                  {course.badge ? (
                    <Badge
                      style={{
                        backgroundColor: '#ffcb00',
                        color: '#3b4a54',
                      }}
                    >
                      {course.badge}
                    </Badge>
                  ) : (
                    <Badge
                      style={{
                        backgroundColor: course.color,
                        color: 'white',
                      }}
                    >
                      {course.duration}
                    </Badge>
                  )}
                </div>
                <CardHeader className="p-5 pt-12">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-[#3b4a54]">
                        {course.price}
                      </span>
                      <span className="text-lg text-[#86a1ae] line-through">
                        {course.oldPrice}
                      </span>
                    </div>
                    <Badge
                      className="bg-[#25cd71] text-white"
                      style={{ borderRadius: '4px' }}
                    >
                      {course.discount}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold mb-4">
                    {course.title}
                  </CardTitle>
                  <div className="space-y-2 mb-4">
                    {course.features.slice(0, 6).map((feature, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-2 text-sm text-[#646f79]"
                      >
                        <CheckCircle className="h-4 w-4 text-[#25cd71] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#86a1ae] mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-[#ffcb00] text-[#ffcb00]" />
                      {course.rating} ({course.reviews})
                    </div>
                  </div>
                  <Button
                    className="w-full text-white"
                    style={{
                      backgroundColor: course.color,
                      borderRadius: '4px',
                    }}
                  >
                    Enroll Now
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="link"
              className="text-[#0ad0f4] hover:text-[#09bbdc]"
            >
              View All Courses <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
