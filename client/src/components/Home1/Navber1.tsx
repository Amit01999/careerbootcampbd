import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Menu, X } from 'lucide-react';

export default function Navber1() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Packages', 'Books', 'About Us', 'Contact Us'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/95 backdrop-blur-lg border-b border-gray-800 shadow-lg'
          : 'bg-[#030712]'
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo on left */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white">
                Private Bank Bootcamp
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Right aligned */}
          <div className="flex-1 flex justify-end">
            <div className="hidden lg:flex items-center gap-6">
              {/* Navigation items */}
              <div className="flex items-center gap-6 ">
                {navItems.map(item => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="relative group"
                  >
                    <span className="text-base font-medium text-gray-300 hover:text-[#0A8BB5] transition-colors duration-200">
                      {item}
                    </span>
                  </Link>
                ))}
                <Link to="/login">
                  <button className="py-2.5 text-base font-medium text-gray-300 hover:text-[#0A8BB5] transition-colors duration-200 ">
                    Login
                  </button>
                </Link>

                <Link to="/signup">
                  <button
                    className=" ml-1 relative px-5 py-2.5 text-sm font-semibold text-white 
                     bg-gradient-to-r from-cyan-600 to-blue-700 
                     rounded-3xl overflow-hidden group 
                     transition-all duration-300 
                     hover:scale-105 hover:brightness-110"
                  >
                    <span className="relative flex items-center gap-2">
                      Sign Up
                      <span className="text-xs opacity-80 transform group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </span>
                  </button>
                </Link>

                <Link to="/signup">
                  <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-cyan-500/30 transition-all duration-300 rounded-3xl flex items-center gap-2">
                    <span>Get App</span>
                    <span className="text-xs">↓</span>
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-4"></div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-cyan-500/50 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
          <div className="px-6 py-6 space-y-1">
            {navItems.map(item => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                  {item}
                </div>
              </Link>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-800 space-y-3">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 text-gray-300 font-medium border border-gray-700 hover:border-cyan-500/50 hover:text-white rounded-lg transition-colors">
                  Sign In
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 rounded-lg transition-all">
                  Start Free Trial
                </button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-3 font-medium text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center gap-2">
                  Get App
                  <span className="text-xs">↓</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
