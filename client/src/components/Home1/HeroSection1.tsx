import { motion } from 'framer-motion';
import {
  Play,
  Maximize2,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import video from '../../assets/herovideo.mp4';
import heroAspirant from '../../assets/heroimg.png';
import Typewriter from 'typewriter-effect';

const videoSrc = video;

export default function HeroSection() {
  const videoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      videoRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden space-y-3">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient backgrounds */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />

        {/* Left Side - Advanced Futuristic Interface */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 overflow-hidden">
          {/* Hexagonal Grid Pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 600 900"
            fill="none"
          >
            <defs>
              <linearGradient
                id="hex-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
              </linearGradient>
            </defs>
            {/* Hexagon pattern */}
            {[...Array(4)].map((_, row) =>
              [...Array(3)].map((_, col) => {
                const x = 100 + col * 150;
                const y = 150 + row * 130 + (col % 2) * 65;
                const size = 40;
                return (
                  <motion.path
                    key={`hex-${row}-${col}`}
                    d={`M ${x + size},${y} L ${x + size * 0.5},${
                      y - size * 0.866
                    } L ${x - size * 0.5},${y - size * 0.866} L ${
                      x - size
                    },${y} L ${x - size * 0.5},${y + size * 0.866} L ${
                      x + size * 0.5
                    },${y + size * 0.866} Z`}
                    stroke="url(#hex-gradient)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 0.7, 0.2] }}
                    transition={{
                      duration: 4 + (row + col) * 0.5,
                      repeat: Infinity,
                      delay: (row + col) * 0.3,
                    }}
                  />
                );
              })
            )}
          </svg>

          {/* Futuristic Data Bars (Analytics Visualization) */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`bar-${i}`}
              className="absolute left-[10%]"
              style={{
                top: `${20 + i * 15}%`,
                width: '150px',
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            >
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-400/10">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${
                      i % 3 === 0
                        ? 'rgba(6, 182, 212, 0.6)'
                        : i % 3 === 1
                        ? 'rgba(139, 92, 246, 0.6)'
                        : 'rgba(16, 185, 129, 0.6)'
                    }, transparent)`,
                  }}
                  animate={{
                    width: ['20%', `${50 + i * 10}%`, '20%'],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              {/* Bar label */}
              <motion.div
                className="absolute -right-12 top-0 text-[10px] font-mono text-cyan-400/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {50 + i * 10}%
              </motion.div>
            </motion.div>
          ))}

          {/* Holographic Panels */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`panel-${i}`}
              className="absolute"
              style={{
                left: `${75 + i * 5}%`,
                top: `${25 + i * 20}%`,
                width: '80px',
                height: '60px',
              }}
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 10, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative w-full h-full border border-cyan-400/30 rounded-lg bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-sm">
                {/* Panel content lines */}
                <div className="absolute top-2 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400/50 to-transparent" />
                <div className="absolute top-4 left-2 right-2 h-[2px] bg-gradient-to-r from-violet-400/40 to-transparent" />
                <div className="absolute top-6 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400/30 to-transparent" />

                {/* Glowing corner */}
                <motion.div
                  className="absolute top-0 right-0 w-2 h-2 rounded-full bg-cyan-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))}

          {/* Advanced Particle System */}
          {[...Array(25)].map((_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            return (
              <motion.div
                key={`adv-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  width: i % 5 === 0 ? '4px' : '2px',
                  height: i % 5 === 0 ? '4px' : '2px',
                  background:
                    i % 4 === 0
                      ? 'rgba(6, 182, 212, 0.7)'
                      : i % 4 === 1
                      ? 'rgba(139, 92, 246, 0.6)'
                      : i % 4 === 2
                      ? 'rgba(16, 185, 129, 0.5)'
                      : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 0 10px currentColor',
                }}
                animate={{
                  y: [0, -200, -400],
                  x: [0, Math.sin(i) * 50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: Math.random() * 8,
                }}
              />
            );
          })}

          {/* Digital Code Rain Effect */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`code-${i}`}
              className="absolute w-[2px] font-mono text-[8px] text-cyan-400/30"
              style={{
                left: `${15 + i * 12}%`,
                top: '-20%',
              }}
              animate={{
                y: ['0%', '120%'],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1.5,
              }}
            >
              {['0', '1', '0', '1', '1', '0'].map((bit, idx) => (
                <div key={idx} className="leading-3">
                  {bit}
                </div>
              ))}
            </motion.div>
          ))}

          {/* Connection Lines Between Nodes */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 600 900"
          >
            {[
              { x1: 100, y1: 200, x2: 250, y2: 300 },
              { x1: 250, y1: 300, x2: 180, y2: 450 },
              { x1: 180, y1: 450, x2: 300, y2: 550 },
            ].map((line, i) => (
              <motion.line
                key={`connect-${i}`}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="url(#hex-gradient)"
                strokeWidth="1"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 h-full items-center py-6">
          {/* LEFT — Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-center h-full"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 via-cyan-500/10 to-blue-500/15 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.2)] mb-6 w-fit"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">
                Best Bank Exam Platform in Bangladesh
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="block text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Dedicated bootcamp
              </span>
              <span className="block mt-2 text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                for complete
              </span>
              <span className="block mt-2 text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                private bank
              </span>
              <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_60px_rgba(6,182,212,0.5)]">
                <Typewriter
                  options={{
                    strings: [
                      'job preparation',
                      'written preparation.',
                      'MCQ preparation.',
                      'viva preparation.',
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 70,
                    deleteSpeed: 40,
                  }}
                />
              </span>
            </motion.h1>

            {/* Description */}
            {/* <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl text-white/60 mb-8 max-w-xl leading-relaxed"
            >
              Join <span className="text-cyan-400 font-semibold">50,000+</span>{' '}
              successful aspirants who cleared Bangladesh Bank, Sonali Bank &
              more with our AI-powered preparation system.
            </motion.p> */}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4"
            >
              <Link to="/model-tests" className="group">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 60px rgba(6, 182, 212, 0.6)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 py-4 rounded-xl overflow-hidden font-semibold text-base bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-[#030712] shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all w-full sm:w-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Start Free Model Test
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link to="/demo" className="group">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl font-semibold text-base border border-white/20 bg-white/[0.08] backdrop-blur-xl text-white shadow-lg hover:border-white/30 transition-all w-full sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-5 h-5 text-cyan-400" />
                    Get Premium
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center gap-8 mt-8 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-2xl font-bold text-white">310K+</div>
                <div className="text-sm text-white/50">Active Students</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-sm text-white/50">Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-sm text-white/50">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Video */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full h-full max-h-[calc(100vh-8rem)] flex items-center"
          >
            {/* Corner Accent Frames (Holographic style) */}
            <div className="absolute -inset-4 pointer-events-none">
              {/* Top-left corner */}
              <motion.div
                className="absolute top-0 left-0 w-20 h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-cyan-400 to-transparent" />
              </motion.div>

              {/* Top-right corner */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-violet-400 to-transparent" />
                <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-violet-400 to-transparent" />
              </motion.div>

              {/* Bottom-left corner */}
              <motion.div
                className="absolute bottom-0 left-0 w-20 h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-transparent" />
                <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-emerald-400 to-transparent" />
              </motion.div>

              {/* Bottom-right corner */}
              <motion.div
                className="absolute bottom-0 right-0 w-20 h-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-cyan-400 to-transparent" />
                <div className="absolute bottom-0 right-0 w-[2px] h-full bg-gradient-to-t from-cyan-400 to-transparent" />
              </motion.div>
            </div>

            {/* Holographic Scan Line Effect */}
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, rgba(6, 182, 212, 0.03) 50%, transparent 100%)',
                height: '100px',
              }}
              animate={{
                y: ['-100px', 'calc(100% + 100px)'],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Enhanced Circuit Network Background */}
            <div className="absolute -inset-8 opacity-70 z-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 700 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  {/* Enhanced Glow filter */}
                  <filter
                    id="circuit-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Enhanced Animated gradients */}
                  <linearGradient
                    id="circuit-pulse1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0)">
                      <animate
                        attributeName="offset"
                        values="0;1;0"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="rgba(6, 182, 212, 1)">
                      <animate
                        attributeName="offset"
                        values="0.5;1;0.5"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0)">
                      <animate
                        attributeName="offset"
                        values="1;1;1"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>

                  <linearGradient
                    id="circuit-pulse2"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0)">
                      <animate
                        attributeName="offset"
                        values="0;1;0"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 1)">
                      <animate
                        attributeName="offset"
                        values="0.5;1;0.5"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)">
                      <animate
                        attributeName="offset"
                        values="1;1;1"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>

                  <linearGradient
                    id="circuit-pulse3"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0)">
                      <animate
                        attributeName="offset"
                        values="0;1;0"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="50%" stopColor="rgba(16, 185, 129, 0.9)">
                      <animate
                        attributeName="offset"
                        values="0.5;1;0.5"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0)">
                      <animate
                        attributeName="offset"
                        values="1;1;1"
                        dur="3.5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                </defs>

                {/* Circuit Grid Pattern */}
                <g filter="url(#circuit-glow)">
                  {/* Main horizontal circuit lines */}
                  <path
                    d="M 50 120 L 280 120"
                    stroke="url(#circuit-pulse1)"
                    strokeWidth="2.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M 320 120 L 650 120"
                    stroke="rgba(6, 182, 212, 0.5)"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M 50 250 L 220 250"
                    stroke="rgba(139, 92, 246, 0.4)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 280 250 L 650 250"
                    stroke="url(#circuit-pulse2)"
                    strokeWidth="2.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="0.8s"
                    />
                  </path>

                  <path
                    d="M 50 380 L 400 380"
                    stroke="url(#circuit-pulse3)"
                    strokeWidth="2.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="3.5s"
                      repeatCount="indefinite"
                      begin="1.2s"
                    />
                  </path>
                  <path
                    d="M 450 380 L 650 380"
                    stroke="rgba(16, 185, 129, 0.4)"
                    strokeWidth="1.5"
                  />

                  {/* Vertical circuit lines */}
                  <path
                    d="M 180 50 L 180 200"
                    stroke="rgba(139, 92, 246, 0.4)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 180 270 L 180 450"
                    stroke="url(#circuit-pulse2)"
                    strokeWidth="2.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="3s"
                      repeatCount="indefinite"
                      begin="0.4s"
                    />
                  </path>

                  <path
                    d="M 400 50 L 400 350"
                    stroke="url(#circuit-pulse1)"
                    strokeWidth="2.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="2.8s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </path>
                  <path
                    d="M 400 400 L 400 450"
                    stroke="rgba(6, 182, 212, 0.5)"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M 550 50 L 550 200"
                    stroke="rgba(16, 185, 129, 0.4)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 550 270 L 550 450"
                    stroke="url(#circuit-pulse3)"
                    strokeWidth="2.5"
                    opacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.4;0.9;0.4"
                      dur="3.2s"
                      repeatCount="indefinite"
                      begin="1.8s"
                    />
                  </path>

                  {/* Diagonal accent lines */}
                  <path
                    d="M 280 120 L 320 120"
                    stroke="rgba(6, 182, 212, 0.6)"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                  <path
                    d="M 220 250 L 280 250"
                    stroke="rgba(139, 92, 246, 0.6)"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur="1.5s"
                      repeatCount="indefinite"
                      begin="0.7s"
                    />
                  </path>
                  <path
                    d="M 400 380 L 450 380"
                    stroke="rgba(16, 185, 129, 0.6)"
                    strokeWidth="1.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur="1.5s"
                      repeatCount="indefinite"
                      begin="0.3s"
                    />
                  </path>

                  {/* Enhanced Circuit nodes with glowing effect */}
                  {[
                    { x: 180, y: 120, color: 'cyan', delay: '0s' },
                    { x: 280, y: 120, color: 'cyan', delay: '0.8s' },
                    { x: 400, y: 120, color: 'cyan', delay: '1.6s' },
                    { x: 550, y: 120, color: 'cyan', delay: '2.4s' },
                    { x: 180, y: 250, color: 'violet', delay: '0.4s' },
                    { x: 400, y: 250, color: 'violet', delay: '1.2s' },
                    { x: 550, y: 250, color: 'violet', delay: '2s' },
                    { x: 280, y: 380, color: 'emerald', delay: '0.6s' },
                    { x: 400, y: 380, color: 'emerald', delay: '1.4s' },
                    { x: 550, y: 380, color: 'emerald', delay: '2.2s' },
                  ].map((node, i) => {
                    const fillColor =
                      node.color === 'cyan'
                        ? 'rgba(6, 182, 212, 0.9)'
                        : node.color === 'violet'
                        ? 'rgba(139, 92, 246, 0.9)'
                        : 'rgba(16, 185, 129, 0.9)';
                    const glowColor =
                      node.color === 'cyan'
                        ? 'rgba(6, 182, 212, 0.3)'
                        : node.color === 'violet'
                        ? 'rgba(139, 92, 246, 0.3)'
                        : 'rgba(16, 185, 129, 0.3)';

                    return (
                      <g key={i}>
                        {/* Outer glow */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="8"
                          fill={glowColor}
                          opacity="0.4"
                        >
                          <animate
                            attributeName="r"
                            values="8;12;8"
                            dur="2s"
                            repeatCount="indefinite"
                            begin={node.delay}
                          />
                          <animate
                            attributeName="opacity"
                            values="0.4;0.1;0.4"
                            dur="2s"
                            repeatCount="indefinite"
                            begin={node.delay}
                          />
                        </circle>
                        {/* Middle ring */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="5"
                          fill={glowColor}
                          opacity="0.6"
                        />
                        {/* Core */}
                        <circle cx={node.x} cy={node.y} r="3" fill={fillColor}>
                          <animate
                            attributeName="r"
                            values="3;4.5;3"
                            dur="2s"
                            repeatCount="indefinite"
                            begin={node.delay}
                          />
                          <animate
                            attributeName="opacity"
                            values="0.9;0.5;0.9"
                            dur="2s"
                            repeatCount="indefinite"
                            begin={node.delay}
                          />
                        </circle>
                      </g>
                    );
                  })}

                  {/* Data flow particles */}
                  {[...Array(8)].map((_, i) => (
                    <circle
                      key={`particle-${i}`}
                      r="2"
                      fill={
                        i % 3 === 0
                          ? 'rgba(6, 182, 212, 0.9)'
                          : i % 3 === 1
                          ? 'rgba(139, 92, 246, 0.9)'
                          : 'rgba(16, 185, 129, 0.9)'
                      }
                    >
                      <animateMotion
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                        path={
                          i % 2 === 0
                            ? 'M 50 120 L 650 120'
                            : 'M 180 50 L 180 450'
                        }
                      />
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              </svg>
            </div>

            {/* Video Container with Enhanced Border */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              {/* Animated border shimmer */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl opacity-50"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)',
                }}
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Main video container */}
              <div className="relative w-full h-full bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] border border-white/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.3)] rounded-2xl overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-xl border border-white/20 rounded-lg text-white shadow-lg">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    How it works
                  </span>
                </div>

                {/* Fullscreen button */}
                <motion.button
                  onClick={toggleFullscreen}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-black/70 transition-all shadow-lg"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </motion.button>

                {/* Video */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom info bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Complete preparation guides
                      </p>
                      {/* <p className="text-white/60 text-xs">
                        Bangladesh Bank Officer 2024
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
