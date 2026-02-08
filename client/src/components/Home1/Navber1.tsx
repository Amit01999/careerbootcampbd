import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Target, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Exams', path: '/exams' },
    { label: 'Circulars', path: '/circulars' },
    { label: 'Recruitment', path: '/recruitment-processes' },
    { label: 'Publications', path: '/publications' },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
    border-b border-white/10
    ${
      isScrolled
        ? 'bg-[#0B0C10]/90 backdrop-blur-xl'
        : 'bg-transparent border-transparent'
    }
  `}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C49B4B] to-[#A07830] flex items-center justify-center">
              <Target className="w-4 h-4 text-[#0B0C10]" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white/90">
              Private Bank Bootcamp
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm rounded-lg transition-colors
                  ${
                    isActive
                      ? 'text-[#C49B4B] bg-white/[0.04]'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="w-px h-5 bg-white/10 mx-3" />

            <Link
              to="/auth"
              className="px-5 py-2 text-sm font-medium text-[#C49B4B] border border-[#C49B4B]/20 rounded-lg hover:bg-[#C49B4B]/5 transition-all"
            >
              Login
            </Link>

            <Link
              to="/auth"
              className="ml-2 px-5 py-2 text-sm font-semibold rounded-lg
              bg-gradient-to-br from-[#C49B4B] to-[#A07830]
              text-[#0B0C10] hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2.5 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] transition"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0B0C10]/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-6 py-6 space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? 'bg-white/[0.06] text-[#C49B4B]'
                      : 'text-white/70 hover:bg-white/[0.04]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <button className="w-full py-3 rounded-lg border border-[#C49B4B]/30 text-[#C49B4B] font-medium hover:bg-[#C49B4B]/5 transition mb-4">
                  Login
                </button>
              </Link>

              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <button className="w-full py-3 rounded-lg bg-gradient-to-br from-[#C49B4B] to-[#A07830] text-[#0B0C10] font-semibold">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
