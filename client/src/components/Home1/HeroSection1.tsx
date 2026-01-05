import {
  Play,
  Maximize2,
  Zap,
  ArrowRight,
  ChevronRight,
  Briefcase,
  Users,
  Target,
  Star,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import heroVideo from '../../assets/herovideo.mp4';

const videoSrc = heroVideo;

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
];

export default function HeroSection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    'Job preparation.',
    'Written preparation.',
    'MCQ preparation.',
    'Viva preparation.',
  ];

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          videoRef.current.muted = true;
          await videoRef.current.play();
        } catch (error) {
          console.error('Video autoplay failed:', error);
        }
      }
    };
    const timer = setTimeout(playVideo, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timeout;
    const currentText = texts[textIndex];

    if (typewriterText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypewriterText(currentText.slice(0, typewriterText.length + 1));
      }, 70);
    } else {
      timeout = setTimeout(() => {
        setTypewriterText('');
        setTextIndex((textIndex + 1) % texts.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, textIndex]);

  // Galaxy Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star particles
    const stars = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: (Math.random() - 0.5) * 0.3,
      });
    }

    // Bright stars with glow
    const brightStars = [];
    for (let i = 0; i < 8; i++) {
      brightStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.5,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        color: i % 3 === 0 ? '#00BFFF' : i % 3 === 1 ? '#9D4EDD' : '#FF00FF',
      });
    }

    // Nebula particles
    const nebulaParticles = [];
    for (let i = 0; i < 80; i++) {
      nebulaParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 120 + 60,
        opacity: Math.random() * 0.15 + 0.05,
        color:
          i % 3 === 0
            ? 'rgba(138, 43, 226, 0.4)'
            : i % 3 === 1
            ? 'rgba(0, 191, 255, 0.3)'
            : 'rgba(255, 0, 255, 0.35)',
        driftX: (Math.random() - 0.5) * 0.1,
        driftY: (Math.random() - 0.5) * 0.1,
        pulseSpeed: Math.random() * 0.008 + 0.002,
      });
    }

    // Floating light particles
    const floatingLights = [];
    for (let i = 0; i < 25; i++) {
      floatingLights.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 2,
        opacity: 0,
        color:
          i % 3 === 0
            ? 'rgba(0, 191, 255, 0.9)'
            : i % 3 === 1
            ? 'rgba(138, 43, 226, 0.9)'
            : 'rgba(255, 0, 255, 0.9)',
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        lifespan: Math.random() * 300 + 200,
        age: 0,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw large planet on left side
      const planetX = canvas.width * 0.15;
      const planetY = canvas.height * 0.35;
      const planetRadius = 180;
      const planetPulse = Math.sin(time * 0.5) * 0.05 + 1;

      // Planet glow
      const planetGlow = ctx.createRadialGradient(
        planetX,
        planetY,
        planetRadius * 0.5,
        planetX,
        planetY,
        planetRadius * 1.8
      );
      planetGlow.addColorStop(0, 'rgba(138, 43, 226, 0)');
      planetGlow.addColorStop(0.5, 'rgba(138, 43, 226, 0.15)');
      planetGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = planetGlow;
      ctx.beginPath();
      ctx.arc(
        planetX,
        planetY,
        planetRadius * 1.8 * planetPulse,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Planet body
      const planetGradient = ctx.createRadialGradient(
        planetX - planetRadius * 0.3,
        planetY - planetRadius * 0.3,
        0,
        planetX,
        planetY,
        planetRadius
      );
      planetGradient.addColorStop(0, 'rgba(150, 100, 255, 0.7)');
      planetGradient.addColorStop(0.4, 'rgba(100, 50, 200, 0.6)');
      planetGradient.addColorStop(0.7, 'rgba(50, 20, 100, 0.5)');
      planetGradient.addColorStop(1, 'rgba(20, 10, 50, 0.3)');

      ctx.fillStyle = planetGradient;
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius * planetPulse, 0, Math.PI * 2);
      ctx.fill();

      // Planet rings
      ctx.save();
      ctx.translate(planetX, planetY);
      ctx.rotate(Math.PI / 6);
      ctx.scale(1, 0.3);
      const ringGradient = ctx.createRadialGradient(
        0,
        0,
        planetRadius * 1.2,
        0,
        0,
        planetRadius * 2
      );
      ringGradient.addColorStop(0, 'rgba(138, 43, 226, 0)');
      ringGradient.addColorStop(0.3, 'rgba(138, 43, 226, 0.3)');
      ringGradient.addColorStop(0.5, 'rgba(100, 50, 200, 0.2)');
      ringGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ringGradient;
      ctx.beginPath();
      ctx.arc(0, 0, planetRadius * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw floating light particles
      floatingLights.forEach(light => {
        light.age++;
        light.x += Math.cos(light.angle) * light.speed;
        light.y += Math.sin(light.angle) * light.speed;

        // Fade in and out based on lifespan
        if (light.age < 50) {
          light.opacity = light.age / 50;
        } else if (light.age > light.lifespan - 50) {
          light.opacity = (light.lifespan - light.age) / 50;
        } else {
          light.opacity = 1;
        }

        // Reset particle
        if (light.age > light.lifespan) {
          light.x = Math.random() * canvas.width;
          light.y = Math.random() * canvas.height;
          light.age = 0;
          light.angle = Math.random() * Math.PI * 2;
        }

        // Draw light with glow
        const lightGradient = ctx.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          light.radius * 2
        );
        lightGradient.addColorStop(
          0,
          light.color.replace(/[\d.]+\)$/, `${light.opacity})`)
        );
        lightGradient.addColorStop(
          0.5,
          light.color.replace(/[\d.]+\)$/, `${light.opacity * 0.5})`)
        );
        lightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = lightGradient;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw regular stars with slow drift
      stars.forEach(star => {
        star.x += star.driftX;
        star.y += star.driftY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.opacity += (Math.random() - 0.5) * star.twinkleSpeed;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw bright stars with cross flare
      brightStars.forEach(star => {
        const pulse = Math.sin(time * star.pulseSpeed) * 0.3 + 0.7;

        // Glow
        const starGradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 4
        );
        starGradient.addColorStop(
          0,
          star.color.replace(
            /#(.{2})(.{2})(.{2})/,
            (_, r, g, b) =>
              `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
                b,
                16
              )}, ${star.opacity * pulse})`
          )
        );
        starGradient.addColorStop(
          0.5,
          star.color.replace(
            /#(.{2})(.{2})(.{2})/,
            (_, r, g, b) =>
              `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
                b,
                16
              )}, ${star.opacity * pulse * 0.3})`
          )
        );
        starGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = starGradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Cross flare
        ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * pulse * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(star.x - star.size * 6, star.y);
        ctx.lineTo(star.x + star.size * 6, star.y);
        ctx.moveTo(star.x, star.y - star.size * 6);
        ctx.lineTo(star.x, star.y + star.size * 6);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

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
    <>
      <section className="lg:mt-3 relative w-full min-h-screen overflow-hidden py-16">
        {/* Animated Galaxy Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(to bottom, #000814 0%, #001233 50%, #000814 100%)',
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-16 h-full relative z-10 ">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 h-full items-center py-4">
            {/* LEFT — Content */}
            <div className="animate-fadeInLeft opacity-0 relative flex flex-col justify-center h-full">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
                <span className="block text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  Dedicated bootcamp
                </span>
                <span className="block mt-2 text-white/90 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  for complete private bank
                </span>

                <span
                  className="block mt-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 
             font-bold leading-[1.1]
             bg-gradient-to-r from-yellow-500 via-amber-300 to-amber-500
             bg-clip-text text-transparent
             drop-shadow-[0_0_40px_rgba(255,215,0,0.35)]
             min-h-[1.2em]"
                >
                  {typewriterText}

                  {/* Blinking cursor without external CSS */}
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: '4px',
                      animation: 'blink 1s step-start infinite',
                    }}
                  >
                    |
                  </span>
                </span>
              </h1>
              <div className="animate-fadeInUp-delay2 opacity-0 flex flex-col sm:flex-row gap-4 mb-6">
                <button className="group relative px-6 py-3 rounded-3xl overflow-hidden font-semibold text-sm sm:text-base bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-[#030712] shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:scale-105">
                  <span className="relative flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> Start Free Model
                    Test
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover-translate transition-transform" />
                  </span>
                </button>
                <button className="px-6 py-3 rounded-3xl font-semibold text-sm sm:text-base border border-white/20 bg-white/[0.08] backdrop-blur-xl text-white shadow-lg hover:border-white/30 hover:bg-white/10 transition-all hover:scale-105">
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" /> Get
                    Premium
                  </span>
                </button>
              </div>
              {/* Stats Cards */}
              <div className="animate-fadeInUp-delay3 opacity-0 grid grid-cols-3 gap-4 mt-4 mb-6">
                <div className="group relative p-4 rounded-xl bg-gradient-to-br from-white/8 via-white/5 to-white/3 border border-white/15 backdrop-blur-xl hover:border-cyan-400/40 transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <div className="text-2xl font-bold text-white">310K+</div>
                    </div>
                    <div className="text-xs text-white/60 font-medium">
                      Active Students
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  </div>
                </div>
                <div className="group relative p-4 rounded-xl bg-gradient-to-br from-white/8 via-white/5 to-white/3 border border-white/15 backdrop-blur-xl hover:border-emerald-400/40 transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-emerald-400" />
                      <div className="text-2xl font-bold text-white">89%</div>
                    </div>
                    <div className="text-xs text-white/60 font-medium">
                      Success Rate
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  </div>
                </div>
                <div className="group relative p-4 rounded-xl bg-gradient-to-br from-white/8 via-white/5 to-white/3 border border-white/15 backdrop-blur-xl hover:border-amber-400/40 transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-amber-400" />
                      <div className="text-2xl font-bold text-white">4.9/5</div>
                    </div>
                    <div className="text-xs text-white/60 font-medium">
                      Rating
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Video */}
            <div className="animate-fadeInRight opacity-0 relative w-full flex items-center justify-center">
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Removed the shimmer div that was here */}

                <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px] xl:h-[400px] bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.04] border border-white/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.3)] rounded-2xl overflow-hidden">
                  <div className="absolute top-3 left-3 z-20 px-2 py-1 text-xs font-semibold bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-xl border border-white/20 rounded-lg text-white shadow-lg">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      How it works
                    </span>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="absolute top-3 right-3 z-20 p-2 bg-black/50 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-black/70 hover:scale-110 transition-all shadow-lg"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-black/50 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Play className="w-3 h-3 text-white ml-0.5" />
                    </div>
                    <p className="text-white font-semibold text-xs">
                      Complete preparation guides
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Job Circulars Section */}
          <section className="">
            <div className="max-w-8xl mx-auto">
              <div className="animate-fadeInUp-delay4 opacity-0 flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* LEFT SIDE – HEADER */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 pulse-glow">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      Latest Job Circulars
                    </h2>
                    <p className="text-xs sm:text-sm text-white/60">
                      Don't miss any opportunity
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE – SCROLLING CIRCULARS */}
                <div className="relative flex-1 min-w-0 w-full">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#000814] via-[#000814]/95 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#000814] via-[#000814]/95 to-transparent z-10 pointer-events-none" />

                  <div className="overflow-hidden">
                    <div className="scroll-circulars flex gap-4">
                      {[...jobCirculars, ...jobCirculars].map(
                        (circular, index) => (
                          <div
                            key={index}
                            className="group relative flex-shrink-0 w-72 h-24 p-4 rounded-xl bg-gradient-to-br from-white/8 to-white/[0.03] border border-white/15 hover:border-cyan-500/40 transition-all cursor-pointer hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                            <div className="relative flex items-start justify-between h-full">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="text-xs text-emerald-400 font-semibold">
                                    New
                                  </span>
                                  <span className="text-xs text-white/50">
                                    {circular.posts} posts
                                  </span>
                                </div>
                                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 mb-2 leading-snug">
                                  {circular.title}
                                </h3>
                                <span className="text-xs text-white/50 px-3 py-1 rounded-full bg-white/10 border border-white/15 inline-block">
                                  Deadline: {circular.deadline}
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-1920px); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
        }

        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out 0.2s forwards; }
        .animate-fadeInUp-delay2 { animation: fadeInUp 0.8s ease-out 0.5s forwards; }
        .animate-fadeInUp-delay3 { animation: fadeInUp 0.8s ease-out 0.7s forwards; }
        .animate-fadeInUp-delay4 { animation: fadeInUp 0.6s ease-out 1s forwards; }
        
        .scroll-circulars { animation: scroll 30s linear infinite; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        .group:hover .group-hover-translate { transform: translateX(4px); }
      `}</style>
    </>
  );
}
