import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronDown, HelpCircle } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-purple-500/10 backdrop-blur-sm border border-violet-500/20 text-violet-400 px-5 py-2.5 rounded-full mb-2">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">
              Questions
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
            Everything you need to know about Private Bank Bootcamp
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <motion.div whileHover={{ scale: 1.01 }} className="group">
                <Card className="bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 hover:border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                  <CardHeader
                    className="p-6 cursor-pointer relative z-10"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">
                        {faq.question}
                      </CardTitle>
                      <motion.div
                        animate={{ rotate: openFaq === i ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardDescription className="text-sm text-white/60 mt-4 leading-relaxed">
                            {faq.answer}
                          </CardDescription>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="link"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 mx-auto text-base font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              Still have questions? Talk to our counselors
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
