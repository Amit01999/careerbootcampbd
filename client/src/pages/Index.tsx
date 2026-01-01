import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Target,
  Trophy,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  ChevronRight,
  Download,
  MessageCircle,
  BarChart3,
  Play,
  Smartphone,
  ChevronDown,
  RefreshCw,
  Globe,
  Shield,
} from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/homepage/HeroSection';
import FeatureShowcase from '@/components/homepage/FeatureShowcase';
import WhyChooseUs from '@/components/homepage/WhyChooseUs';
import RecruitmentProcesses from '@/components/homepage/RecruitmentProcesses';
import MockTest from '@/components/homepage/MockTest';
import SuccessStories from '@/components/homepage/SuccessStories';
import FAQSection from '@/components/homepage/FAQSection';
import HeroSection1 from '@/components/homepage/HeroSection1';
import SetpSection from '@/components/homepage/StepSection';
import CTA from '@/components/homepage/CTA';

export default function Index() {
  return (
    <div
      className="w-full"
      style={
        {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        } as React.CSSProperties
      }
    >
      <style>{`
        :root {
          --primary-cyan: #0ad0f4;
          --primary-cyan-hover: #09bbdc;
          --success-green: #25cd71;
          --error-red: #e5174f;
          --gold: #ffcb00;
          --elite-purple: #5738b2;
          --dark-text: #3b4a54;
          --secondary-text: #646f79;
          --light-bg: #f6f8f9;
          --border-gray: #dfe4e8;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(46, 129, 247, 0.15);
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-primary {
          background-color: var(--primary-cyan);
          color: white;
          border-radius: 4px;
          padding: 0.375rem 1.5rem;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          background-color: var(--primary-cyan-hover);
        }

        .text-cyan {
          color: var(--primary-cyan);
        }

        .bg-cyan {
          background-color: var(--primary-cyan);
        }

        .border-cyan {
          border-color: var(--primary-cyan);
        }
      `}</style>

      {/* Hero Section - Modern Premium Design */}
      <HeroSection />
      {/* <SetpSection /> */}
      <HeroSection1 />

      {/* Feature Showcase */}

      <FeatureShowcase />
      {/* Popular Mock Tests Slider */}
      <MockTest />
      {/* Courses & Learning Programs */}
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

      {/* App Promotion Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1006px]">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#25cd71] text-white hover:bg-[#25cd71]">
                Available Now
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-[#3b4a54]">
                Prepare Anytime, Anywhere
              </h2>
              <p className="text-lg text-[#646f79]">
                Download Private Bank Bootcamp mobile app and access all
                courses, tests, and live classes on the go. Study during your
                commute, practice during breaks, succeed everywhere.
              </p>

              <div className="space-y-3">
                {[
                  'Offline video download',
                  'Push notifications for live classes',
                  'Daily practice reminders',
                  'Light mode & dark mode',
                  'Syncs across all devices',
                  'Low data consumption mode',
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[#646f79]"
                  >
                    <CheckCircle className="h-5 w-5 text-[#25cd71]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-2xl font-bold text-[#3b4a54]">
                    50,000+
                  </div>
                  <div className="text-sm text-[#86a1ae]">Downloads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#3b4a54]">
                    4.8 ⭐
                  </div>
                  <div className="text-sm text-[#86a1ae]">Play Store</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#3b4a54]">
                    4.7 ⭐
                  </div>
                  <div className="text-sm text-[#86a1ae]">App Store</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="bg-black text-white hover:bg-gray-800 border-0"
                  style={{ borderRadius: '4px' }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download on Google Play
                </Button>
                <Button
                  variant="outline"
                  className="bg-black text-white hover:bg-gray-800 border-0"
                  style={{ borderRadius: '4px' }}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download on App Store
                </Button>
              </div>
            </div>

            <div className="relative lg:h-[500px] hidden lg:flex items-center justify-center">
              <div className="w-64 h-[500px] bg-gradient-to-br from-[#0ad0f4] to-[#25cd71] rounded-3xl flex items-center justify-center shadow-2xl">
                <Smartphone className="h-32 w-32 text-white opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Bank Recruitment Processes */}
      <RecruitmentProcesses />

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer CTA Strip */}
      <CTA />

      {/* Success Stories / Testimonials */}
      <SuccessStories />
    </div>
  );
}
