import { Link } from 'react-router-dom';
import {
  BookOpen,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MailIcon,
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-[#0E1F1A] text-white">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: '#12D192' }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Private Bank Bootcamp</span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              Bangladesh's leading platform for private bank job preparation.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a
                href="https://facebook.com/profile.php?id=61581559084797"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition"
              >
                <Facebook className="w-4 h-4" style={{ color: '#12D192' }} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition"
              >
                <Instagram className="w-4 h-4" style={{ color: '#12D192' }} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition"
              >
                <Youtube className="w-4 h-4" style={{ color: '#12D192' }} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/exams"
                  className="text-gray-300 hover:text-[#12D192] transition"
                >
                  All Exams
                </Link>
              </li>
              <li>
                <Link
                  to="/circulars"
                  className="text-gray-300 hover:text-[#12D192] transition"
                >
                  Job Circulars
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-[#12D192] transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/demo"
                  className="text-gray-300 hover:text-[#12D192] transition"
                >
                  Free Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-lg">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="text-gray-300 hover:text-[#12D192] transition">
                  Study Materials
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-[#12D192] transition">
                  Exam Tips
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-[#12D192] transition">
                  FAQs
                </a>
              </li>
              <li>
                <a className="text-gray-300 hover:text-[#12D192] transition">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-white mb-5 text-lg">
              Contact Info
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="text-gray-300">
                GP. Gha -135/6 Mohakhali, Dhaka, Bangladesh, Dhaka -1212
              </li>

              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" style={{ color: '#12D192' }} />
                <span>01307-379623</span>
              </li>

              <li className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" style={{ color: '#12D192' }} />
                <span>+880 1307-379623 (WhatsApp)</span>
              </li>

              <li className="flex items-center space-x-2 text-gray-300">
                <MailIcon className="w-4 h-4" style={{ color: '#12D192' }} />
                <span>career.signaturepublication@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        © {currentYear} Private Bank Bootcamp. All rights reserved.
      </div>
    </footer>
  );
};
