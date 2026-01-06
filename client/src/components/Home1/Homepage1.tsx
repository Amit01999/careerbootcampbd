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
  Play,
  Maximize2,
  ChevronRight,
  Sparkles,
  Target,
  Award,
  Clock,
  Users,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Zap,
  Shield,
  BarChart3,
  GraduationCap,
  Star,
  Menu,
  X,
  Cpu,
  Database,
  Activity,
  MonitorPlay,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FeatureShowcase from '../homepage/FeatureShowcase';
import MockTest from '../homepage/MockTest';
import CoursesLearningPrograms from '../homepage/CoursesLearningPrograms';
import AppPromotion from '../homepage/AppPromotion';
import WhyChooseUs from '../homepage/WhyChooseUs';
import RecruitmentProcesses from '../homepage/RecruitmentProcesses';
import CTA from '../homepage/CTA';
import FAQSection from '../homepage/FAQSection';
import SuccessStories from '../homepage/SuccessStories';
import HeroSection from './HeroSection1';
import Services from './Services';

const jobCirculars = [
  {
    id: 1,
    title: 'Bangladesh Bank Officer (General) - 2024',
    deadline: 'Dec 30, 2024',
    posts: 250,
  },
  {
    id: 2,
    title: 'Sonali Bank Senior Officer Recruitment',
    deadline: 'Jan 15, 2025',
    posts: 180,
  },
  {
    id: 3,
    title: 'Janata Bank Assistant Engineer Post',
    deadline: 'Jan 10, 2025',
    posts: 45,
  },
  {
    id: 4,
    title: 'Rupali Bank Limited - Officer (Cash)',
    deadline: 'Dec 28, 2024',
    posts: 120,
  },
  {
    id: 5,
    title: 'Agrani Bank PLC Junior Officer',
    deadline: 'Jan 20, 2025',
    posts: 200,
  },
  {
    id: 6,
    title: 'BASIC Bank Ltd - Senior Officer',
    deadline: 'Jan 05, 2025',
    posts: 75,
  },
  {
    id: 7,
    title: 'Investment Corporation - Assistant Director',
    deadline: 'Dec 25, 2024',
    posts: 30,
  },
  {
    id: 8,
    title: 'Krishi Bank - Agricultural Credit Officer',
    deadline: 'Jan 12, 2025',
    posts: 95,
  },
];

const stats = [
  { value: '50K+', label: 'Active Learners', icon: Users, suffix: '' },
  { value: '89', label: 'Success Rate', icon: TrendingUp, suffix: '%' },
  { value: '200+', label: 'Model Tests', icon: Target, suffix: '' },
  { value: '4.9', label: 'User Rating', icon: Star, suffix: '/5' },
];

export default function BankPrepHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const particles = useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  const floatingOrbs = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        id: i,
        size: Math.random() * 300 + 200,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'violet' : 'emerald',
        duration: Math.random() * 15 + 20,
      })),
    []
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#030712] text-white overflow-x-hidden mt-10"
    >
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-violet-900/15 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />

        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {floatingOrbs.map(orb => (
          <motion.div
            key={orb.id}
            className={`absolute rounded-full blur-[100px] ${
              orb.color === 'cyan'
                ? 'bg-cyan-500/20'
                : orb.color === 'violet'
                ? 'bg-violet-500/15'
                : 'bg-emerald-500/15'
            }`}
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
            }}
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/40"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}

        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      </div>

      <main>
        <HeroSection />

        <Services />

        <section className="relative py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-[2.5rem] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20" />
              <div className="absolute inset-0 bg-[#0a0f1a]/80 backdrop-blur-3xl" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50" />

              <div className="relative py-16 px-8 md:px-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mx-auto mb-5 flex items-center justify-center shadow-xl shadow-cyan-500/30"
                      >
                        <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1 + 0.2,
                          type: 'spring',
                        }}
                        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-2"
                      >
                        {stat.value}
                        {stat.suffix}
                      </motion.div>
                      <p className="text-white/50 font-medium">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Feature Showcase */}

      <FeatureShowcase />
      {/* Popular Mock Tests Slider */}
      <MockTest />
      {/* Courses & Learning Programs */}
      <CoursesLearningPrograms />

      {/* App Promotion Section */}
      <AppPromotion />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Bank Recruitment Processes */}
      <RecruitmentProcesses />

      {/* Footer CTA Strip */}
      <CTA />

      {/* FAQ Section */}
      <FAQSection />

      {/* Success Stories / Testimonials */}
      <SuccessStories />
    </div>
  );
}
