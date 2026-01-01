import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  BookOpen, 
  Home, 
  FileText, 
  BarChart3, 
  User, 
  Bell,
  LogOut,
  Globe
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  const navigate = useNavigate();
  
  // Mock auth state - replace with real auth later
  const isAuthenticated = false;

  const navLinks = [
    { label: language === 'en' ? 'Home' : 'হোম', path: '/', icon: Home },
    { label: language === 'en' ? 'Exams' : 'পরীক্ষা', path: '/exams', icon: BookOpen },
    { label: language === 'en' ? 'Job Circulars' : 'চাকরির বিজ্ঞপ্তি', path: '/circulars', icon: FileText },
    { label: language === 'en' ? 'Dashboard' : 'ড্যাশবোর্ড', path: '/dashboard', icon: BarChart3 },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              {language === 'en' ? 'Private Bank Bootcamp' : 'প্রাইভেট ব্যাংক বুটক্যাম্প'}
            </span>
            <span className="text-xl font-bold text-foreground sm:hidden">
              PBB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="hidden sm:flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'BN' : 'EN'}</span>
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    {language === 'en' ? 'Login' : 'লগইন'}
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="bg-primary hover:bg-primary-hover">
                    {language === 'en' ? 'Sign Up' : 'সাইন আপ'}
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <link.icon className="w-5 h-5 text-muted-foreground" />
                <span>{link.label}</span>
              </Link>
            ))}
            <Button 
              variant="ghost" 
              onClick={toggleLanguage} 
              className="w-full justify-start px-4"
            >
              <Globe className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
