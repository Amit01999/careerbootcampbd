import React, { useState } from 'react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#09090B] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-[#C49B4B]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[#C49B4B]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-5"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
            bg-[#C49B4B]/10 border border-[#C49B4B]/20 text-[#D4AF5A]"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">FAQ</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Frequently Asked{' '}
            <span className="text-gradient-gold">Questions</span>
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-white/40 font-light">
            Everything you need to know about Private Bank Bootcamp
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="group relative">
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl
                  bg-gradient-to-r from-[#C49B4B]/15 to-[#D4AF5A]/10
                  opacity-0 group-hover:opacity-100
                  blur-xl transition-opacity duration-500"
                />

                <Card
                  className="
                    relative z-10 rounded-2xl overflow-hidden
                    border border-white/[0.06]
                    bg-[linear-gradient(165deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]
                    transition-all duration-300
                    group-hover:border-[#C49B4B]/30
                    group-hover:shadow-[0_10px_40px_-15px_rgba(196,155,75,0.35)]
                  "
                >
                  <CardHeader
                    className="p-6 cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle
                        className="text-base font-semibold text-white
                        transition-colors duration-300
                        group-hover:text-[#D4AF5A]"
                      >
                        {faq.question}
                      </CardTitle>

                      <motion.div
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <ChevronDown className="w-5 h-5 text-white/30" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                          <CardDescription className="mt-4 text-sm leading-relaxed text-white/40">
                            {faq.answer}
                          </CardDescription>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardHeader>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button
            variant="link"
            className="text-[#C49B4B] hover:text-[#D4AF5A]
            flex items-center gap-2 mx-auto text-base font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Still have questions? Talk to our counselors
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
