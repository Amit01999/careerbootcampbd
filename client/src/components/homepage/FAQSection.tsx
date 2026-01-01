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

export default function FAQSection() {
  const faqs = [
    {
      question: 'Which private bank exams are covered in your courses?',
      answer:
        'We cover all major private banks in Bangladesh including BRAC Bank, Dutch-Bangla Bank (DBBL), City Bank, Eastern Bank, Prime Bank, Islami Bank, Bank Asia, IFIC Bank, Mutual Trust Bank, and more. Our courses are designed for positions like Officer (Cash), Senior Officer, Probationary Officer, Management Trainee, IT Officer, and Assistant Manager.',
    },
    {
      question: 'Are the video lectures available in Bengali?',
      answer:
        'Yes! All our video lectures are available in both Bengali and English. You can choose your preferred language from settings. Study materials and notes also include Bengali explanations for better understanding.',
    },
    {
      question: 'How many mock tests are included?',
      answer:
        'Our courses include 50+ full-length mock tests, 100+ chapter-wise practice tests, and 200+ topic-specific quizzes. All tests follow actual bank exam patterns with instant evaluation and detailed solutions.',
    },
    {
      question: 'Can I access courses on mobile?',
      answer:
        'Absolutely! Our platform works seamlessly on mobile, tablet, and desktop. You can also download our Android and iOS apps for offline video access and on-the-go learning.',
    },
    {
      question: 'What if I need help during preparation?',
      answer:
        'We offer 24/7 doubt support via chat, daily live doubt-solving sessions, discussion forums with 50,000+ students, and weekly one-on-one mentorship calls for premium members.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes! You can access 3 free mock tests, 10 sample video lectures, and basic study materials without any payment. Start your free trial today and experience the quality.',
    },
    {
      question: 'How long do I have access to the course?',
      answer:
        'Once you enroll, you get lifetime access to all course materials including future updates. Even after you get the job, you can continue accessing resources.',
    },
    {
      question: 'Do you provide job alerts?',
      answer:
        'Yes! All enrolled students receive instant notifications about new bank job circulars, application deadlines, exam dates, and result announcements via email and app push notifications.',
    },
  ];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-[1006px]">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-[#3b4a54]">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#646f79] max-w-3xl mx-auto">
              Everything you need to know about Private Bank Bootcamp
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className="bg-white"
                style={{
                  borderRadius: '5px',
                  boxShadow: '-1px 1px 4px rgba(117, 138, 172, 0.12)',
                }}
              >
                <CardHeader
                  className="p-5 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle className="text-base font-semibold text-[#3b4a54]">
                      {faq.question}
                    </CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 text-[#646f79] flex-shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  {openFaq === i && (
                    <CardDescription className="text-sm text-[#646f79] mt-3">
                      {faq.answer}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="link"
              className="text-[#0ad0f4] hover:text-[#09bbdc] flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="h-4 w-4" />
              Still have questions? Talk to our counselors
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
