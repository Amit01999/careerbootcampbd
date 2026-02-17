import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer1() {
  const socialIcons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.428.403a4.92 4.92 0 0 1 1.675 1.091 4.92 4.92 0 0 1 1.091 1.675c.163.458.347 1.258.403 2.428.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.428a4.92 4.92 0 0 1-1.091 1.675 4.92 4.92 0 0 1-1.675 1.091c-.458.163-1.258.347-2.428.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.428-.403a4.92 4.92 0 0 1-1.675-1.091 4.92 4.92 0 0 1-1.091-1.675c-.163-.458-.347-1.258-.403-2.428C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.428a4.92 4.92 0 0 1 1.091-1.675A4.92 4.92 0 0 1 5.402 2.636c.458-.163 1.258-.347 2.428-.403C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.163 0-3.537.012-4.787.069-1.033.049-1.59.217-1.964.362-.488.19-.84.418-1.209.788-.37.37-.597.721-.788 1.209-.145.374-.313.93-.362 1.964-.057 1.25-.069 1.624-.069 4.787s.012 3.537.069 4.787c.049 1.033.217 1.59.362 1.964.19.488.418.84.788 1.209.37.37.721.597 1.209.788.374.145.93.313 1.964.362 1.25.057 1.624.069 4.787.069s3.537-.012 4.787-.069c1.033-.049 1.59-.217 1.964-.362.488-.19.84-.418 1.209-.788.37-.37.597-.721.788-1.209.145-.374.313-.93.362-1.964.057-1.25.069-1.624.069-4.787s-.012-3.537-.069-4.787c-.049-1.033-.217-1.59-.362-1.964-.19-.488-.418-.84-.788-1.209-.37-.37-.721-.597-1.209-.788-.374-.145-.93-.313-1.964-.362-1.25-.057-1.624-.069-4.787-.069zM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    whatsapp: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.52 3.48A11.88 11.88 0 0 0 12 .002 11.88 11.88 0 0 0 3.48 3.48 11.88 11.88 0 0 0 0 12c0 2.09.545 4.14 1.58 5.96L0 24l6.24-1.58A11.88 11.88 0 0 0 12 24c2.09 0 4.14-.545 5.96-1.58A11.88 11.88 0 0 0 24 12c0-3.19-1.24-6.19-3.48-8.52zM12 21.5c-1.85 0-3.66-.5-5.24-1.45l-.38-.23L4 20l.18-2.38-.23-.38A8.5 8.5 0 1 1 20.5 12 8.47 8.47 0 0 1 12 21.5zM17.6 14.3c-.28-.14-1.66-.82-1.92-.92s-.46-.14-.66.14-.75.92-.92 1.11-.34.21-.62.07a8.09 8.09 0 0 1-2.38-1.48 8.6 8.6 0 0 1-1.6-1.98c-.17-.3 0-.46.13-.6.14-.14.31-.38.46-.57.15-.19.2-.33.3-.5.1-.17.05-.31-.02-.45-.07-.14-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.51l-.56-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.46s1.03 2.85 1.17 3.04c.14.19 2.03 3.12 4.92 4.37 1.47.63 2.08.7 2.83.58.46-.08 1.66-.68 1.9-1.33.24-.65.24-1.21.17-1.33-.07-.12-.28-.19-.56-.34z" />
      </svg>
    ),
  };

  const socialLinks: Record<keyof typeof socialIcons, string> = {
    facebook: 'https://www.facebook.com/share/1E7j45JB1t/',
    instagram:
      'https://www.instagram.com/privatebankbootcamp?igsh=MzBydjRjbnVvcmts',
    whatsapp: 'https://wa.me/message/U4NIBFONAR26H1',
  };

  return (
    <div>
      <footer className="relative py-20 border-t border-white/[0.06] bg-[#09090B]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Logo" className="w-12 h-12 " />
                <span className="text-lg font-semibold tracking-tight text-white">
                  Private Bank Bootcamp
                </span>
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
                    href={socialLinks[social]}
                    target="_blank"
                    rel="noopener noreferrer"
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
