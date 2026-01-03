import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen,
  FileText,
  Mic,
  Play,
  Maximize2,
  ChevronRight,
  Sparkles,
  Target,
  Menu,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navber1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-cyan-500/5'
            : 'bg-[#030712]/80'
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"
              >
                <Target className="w-6 h-6 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Private Bank Bootcamp
                </span>
                {/* <span className="text-[10px] text-cyan-400 font-medium tracking-widest uppercase">
                  Pro Edition
                </span> */}
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {['Home', 'Packages', 'Books', 'About Us', 'Contact Us'].map(
                item => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                  >
                    <motion.span
                      whileHover={{ scale: 1.02 }}
                      className="relative px-4 py-2 text-base font-medium text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
                    >
                      {item}
                    </motion.span>
                  </Link>
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 text-base text-white/80 font-medium hover:text-white transition-colors"
                >
                  Sign In
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 py-2.5 text-sm font-semibold rounded-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[#030712]">
                    Start Free Trial
                  </span>
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 py-2.5 text-sm font-semibold rounded-xl overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-[#030712]">Get App</span>
                </motion.button>
              </Link>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#030712]/95 backdrop-blur-2xl border-t border-white/5"
            >
              <div className="px-6 py-6 space-y-4">
                {['Features', 'Model Tests', 'Circulars', 'Pricing'].map(
                  item => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                    >
                      <div className="block py-3 text-white/70 hover:text-white transition-colors">
                        {item}
                      </div>
                    </Link>
                  )
                )}
                <div className="pt-4 flex flex-col gap-3">
                  <Link to="/login">
                    <button className="w-full py-3 text-white/80 font-medium border border-white/10 rounded-xl">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="w-full py-3 font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-[#030712] rounded-xl">
                      Start Free Trial
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      ;
    </div>
  );
}
