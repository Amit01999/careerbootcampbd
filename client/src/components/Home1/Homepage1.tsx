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

const features = [
  {
    icon: Cpu,
    title: 'Smart MCQ Engine',
    description:
      'AI-powered adaptive learning that identifies your weak areas and creates personalized practice sessions',
    color: 'from-cyan-400 to-blue-500',
    stats: '10,000+ MCQs',
    highlight: 'AI Powered',
  },
  {
    icon: Database,
    title: 'Written Mastery',
    description:
      'Expert-crafted essay templates, letter formats & comprehension strategies with instant feedback',
    color: 'from-violet-400 to-purple-600',
    stats: '500+ Topics',
    highlight: 'Expert Curated',
  },
  {
    icon: Activity,
    title: 'Real Exam Simulation',
    description:
      'Full-length timed tests replicating actual bank recruitment exam patterns and difficulty',
    color: 'from-amber-400 to-orange-500',
    stats: '200+ Tests',
    highlight: 'Exam Pattern',
  },
  {
    icon: MonitorPlay,
    title: 'Viva Excellence',
    description:
      'Interview simulations, body language tips, and confidence-building modules for final selection',
    color: 'from-rose-400 to-pink-600',
    stats: '1000+ Q&A',
    highlight: 'Mock Sessions',
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
        {/* <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden px-4 sm:px-6 lg:px-16">
          <div className="max-w-8xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-10"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    Latest Job Circulars
                  </h2>
                  <p className="text-sm sm:text-base text-white/50">
                    Don&apos;t miss any opportunity
                  </p>
                </div>
              </div>
              <Link to="/circulars" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 text-cyan-400 font-medium hover:text-cyan-300 transition-colors text-sm sm:text-base"
                >
                  View All Circulars
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

              <div className="overflow-hidden">
                <motion.div
                  animate={{ x: [0, -1920] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="flex gap-3 sm:gap-4"
                >
                  {[...jobCirculars, ...jobCirculars, ...jobCirculars].map(
                    (circular, index) => (
                      <Link to={`/circulars/${circular.id}`} key={index}>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="group relative flex-shrink-0 w-64 sm:w-72 md:w-80 h-[160px] sm:h-[180px] p-4 sm:p-5 rounded-xl sm:rounded-2xl
                          bg-gradient-to-br from-white/5 to-white/[0.02]
                        border border-white/10 hover:border-cyan-500/30
                          transition-all cursor-pointer flex flex-col justify-between"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity" />
                          <div className="relative">
                            <div className="flex items-center gap-2 mb-2 sm:mb-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-xs text-emerald-400 font-medium">
                                New
                              </span>
                              <span className="text-xs text-white/40 ml-auto">
                                {circular.posts} posts
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2 sm:mb-3">
                              {circular.title}
                            </h3>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs text-white/40 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 truncate">
                                Deadline: {circular.deadline}
                              </span>
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    )
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-violet-400">
                  Why Choose Us
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Everything You Need to{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-lg text-white/50">
                Comprehensive tools designed by exam toppers and bank officers
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="group relative h-full min-h-[420px]"
                  >
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                    />
                    <div className="relative h-full bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-7 border border-white/10 group-hover:border-white/20 transition-colors flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                          style={{
                            boxShadow: `0 10px 40px -10px ${
                              feature.color.includes('cyan')
                                ? 'rgba(6, 182, 212, 0.5)'
                                : feature.color.includes('violet')
                                ? 'rgba(139, 92, 246, 0.5)'
                                : feature.color.includes('amber')
                                ? 'rgba(245, 158, 11, 0.5)'
                                : 'rgba(244, 63, 94, 0.5)'
                            }`,
                          }}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                          {feature.highlight}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-white/50 mb-6 flex-grow leading-relaxed">
                        {feature.description}
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <span className="text-sm font-bold text-cyan-400">
                          {feature.stats}
                        </span>
                        <motion.div
                          whileHover={{ x: 5, scale: 1.1 }}
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500 transition-colors cursor-pointer"
                        >
                          <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-[#030712] transition-colors" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

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
