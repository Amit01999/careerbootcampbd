import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer1() {
  const socialIcons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };

  return (
    <div>
      <footer className="relative py-20 border-t border-white/[0.06] bg-[#09090B]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C49B4B] to-[#D4AF5A] flex items-center justify-center shadow-lg shadow-[#C49B4B]/20">
                  <Target className="w-6 h-6 text-[#09090B]" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">BankPrep</span>
                </div>
              </Link>
              <p className="text-white/35 mb-6 max-w-sm leading-relaxed">
                Bangladesh&apos;s most trusted platform for bank exam
                preparation. Join 50,000+ successful aspirants.
              </p>
              <div className="flex gap-4">
                {(
                  Object.keys(socialIcons) as Array<keyof typeof socialIcons>
                ).map(social => (
                  <motion.a
                    key={social}
                    href={`#${social}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 hover:text-[#C49B4B] hover:border-[#C49B4B]/20 hover:bg-[#C49B4B]/5 transition-all"
                  >
                    <span className="sr-only">{social}</span>
                    {socialIcons[social]}
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Preparation',
                items: [
                  'MCQ Practice',
                  'Written Exams',
                  'Model Tests',
                  'Viva Prep',
                ],
              },
              {
                title: 'Resources',
                items: [
                  'Job Circulars',
                  'Study Materials',
                  'Previous Papers',
                  'Success Stories',
                ],
              },
              {
                title: 'Support',
                items: [
                  'Help Center',
                  'Contact Us',
                  'Privacy Policy',
                  'Terms of Service',
                ],
              },
            ].map(column => (
              <div key={column.title}>
                <h4 className="font-bold text-white mb-5">{column.title}</h4>
                <ul className="space-y-3">
                  {column.items.map(item => (
                    <li key={item}>
                      <Link
                        to="#"
                        className="text-white/35 hover:text-[#C49B4B] transition-colors text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm">
              © 2026 careerbootcampbd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
