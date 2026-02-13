import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Target, Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import logo from '../../assets/logo.png';

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
    {
      label: 'WhatsApp',
      external: true,
      url: 'https://wa.me/message/U4NIBFONAR26H1',
    },
    {
      label: 'Facebook',
      external: true,
      url: 'https://www.facebook.com/share/1E7j45JB1t/',
    },
    { label: 'Contact', dropdown: true },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled
          ? 'bg-[#0B0C10]/90 backdrop-blur-xl'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12 " />
            <span className="text-lg font-semibold tracking-tight text-white/90">
              Private Bank Bootcamp
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              // External links (WhatsApp, Facebook)
              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition"
                  >
                    {item.label}
                  </a>
                );
              }

              // Contact dropdown (hover-stable, no flicker)
              if (item.dropdown) {
                return (
                  <div key={item.label} className="relative group">
                    <button className="flex items-center gap-1 px-4 py-2 text-sm rounded-lg text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition">
                      Contact
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* Invisible hover bridge to prevent gap flicker */}
                    <div className="absolute top-full left-0 w-full h-3" />

                    {/* Dropdown */}
                    <div
                      className="
    absolute top-full left-0 mt-1 w-72
    rounded-xl border border-white/10
    bg-[#0B0C10]/95 backdrop-blur-xl shadow-xl
    p-3 space-y-2

    opacity-0 invisible translate-y-2
    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
    transition-all duration-200
  "
                    >
                      {/* Phone */}
                      <a
                        href="tel:+8801307379623"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/[0.05]"
                      >
                        <Phone className="w-4 h-4 text-white/80 shrink-0" />
                        <span className="whitespace-nowrap">
                          +880 1307-379623
                        </span>
                      </a>

                      {/* Email */}
                      <a
                        href="mailto:career.signaturepublication@gmail.com"
                        className="flex items-start gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/[0.05]"
                      >
                        <Mail className="w-4 h-4 text-white/80 mt-[2px] shrink-0" />
                        <span className="break-all leading-tight">
                          career.signaturepublication@gmail.com
                        </span>
                      </a>
                    </div>
                  </div>
                );
              }

              // Internal route (Home)
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm rounded-lg transition ${
                      isActive
                        ? 'text-[#C49B4B] bg-white/[0.04]'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/[0.03]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}

            <div className="w-px h-5 bg-white/10 mx-3" />

            {/* Login */}
            <Link
              to="/auth"
              className="px-5 py-2 text-sm font-medium text-[#C49B4B] border border-[#C49B4B]/20 rounded-lg hover:bg-[#C49B4B]/5 transition"
            >
              Login
            </Link>

            {/* Sign Up */}
            <Link
              to="/auth"
              className="ml-2 px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-br from-[#C49B4B] to-[#A07830] text-[#0B0C10] hover:opacity-90 transition"
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
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/[0.04]"
            >
              Home
            </NavLink>

            <a
              href="https://wa.me/message/U4NIBFONAR26H1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/[0.04]"
            >
              WhatsApp
            </a>

            <a
              href="https://www.facebook.com/share/1E7j45JB1t/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium text-white/70 hover:bg-white/[0.04]"
            >
              Facebook
            </a>

            {/* Mobile Contact */}
            <div className="px-4 py-3 rounded-lg text-sm text-white/70">
              <div className="mb-2 font-medium">Contact</div>
              <a
                href="tel:+8801307379623"
                className="flex items-center gap-2 py-1 text-white/80"
              >
                <Phone className="w-4 h-4" />
                +880 1307-379623
              </a>
              <a
                href="mailto:career.signaturepublication@gmail.com"
                className="flex items-center gap-2 py-1 text-white/80"
              >
                <Mail className="w-4 h-4" />
                career.signaturepublication@gmail.com
              </a>
            </div>

            <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <button className="w-full py-3 rounded-lg border border-[#C49B4B]/30 text-[#C49B4B] font-medium hover:bg-[#C49B4B]/5 transition">
                  Login
                </button>
              </Link>

              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <button className="w-full mt-5 py-3 rounded-lg bg-gradient-to-br from-[#C49B4B] to-[#A07830] text-[#0B0C10] font-semibold">
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
