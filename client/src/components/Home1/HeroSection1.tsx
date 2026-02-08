// import { useEffect, useRef, useState } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import {
//   ArrowRight,
//   BookOpen,
//   FileText,
//   ClipboardCheck,
//   MessageSquare,
//   Shield,
//   TrendingUp,
//   Award,
//   Lock,
//   Zap,
// } from 'lucide-react';

// // ─── Ambient Glow Canvas ────────────────────────────────────────────────
// function AmbientGlow() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let animId: number;
//     let t = 0;

//     const resize = () => {
//       const dpr = window.devicePixelRatio || 1;
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = rect.width * dpr;
//       canvas.height = rect.height * dpr;
//       ctx.scale(dpr, dpr);
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const draw = () => {
//       t += 0.0015;
//       const w = canvas.getBoundingClientRect().width;
//       const h = canvas.getBoundingClientRect().height;
//       ctx.clearRect(0, 0, w, h);

//       // Two large, soft, slow-drifting orbs — minimal and elegant
//       const orbs = [
//         {
//           x: w * 0.3,
//           y: h * 0.35,
//           r: 350,
//           color: [196, 155, 75],
//           opacity: 0.06,
//         },
//         {
//           x: w * 0.7,
//           y: h * 0.55,
//           r: 300,
//           color: [170, 135, 65],
//           opacity: 0.04,
//         },
//       ];

//       orbs.forEach((orb, i) => {
//         const ox = orb.x + Math.sin(t + i * 3) * 15;
//         const oy = orb.y + Math.cos(t + i * 2) * 12;
//         const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
//         gradient.addColorStop(
//           0,
//           `rgba(${orb.color.join(',')}, ${orb.opacity})`,
//         );
//         gradient.addColorStop(
//           0.6,
//           `rgba(${orb.color.join(',')}, ${orb.opacity * 0.3})`,
//         );
//         gradient.addColorStop(1, 'rgba(0,0,0,0)');
//         ctx.fillStyle = gradient;
//         ctx.beginPath();
//         ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       animId = requestAnimationFrame(draw);
//     };

//     draw();
//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener('resize', resize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full pointer-events-none"
//     />
//   );
// }

// // ─── 3D Tilt Card ───────────────────────────────────────────────────────
// function TiltCard({
//   children,
//   className = '',
//   style = {},
// }: {
//   children: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
//     stiffness: 200,
//     damping: 20,
//   });
//   const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
//     stiffness: 200,
//     damping: 20,
//   });

//   const handleMouse = (e: React.MouseEvent) => {
//     if (!ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     x.set((e.clientX - rect.left) / rect.width - 0.5);
//     y.set((e.clientY - rect.top) / rect.height - 0.5);
//   };

//   const handleLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouse}
//       onMouseLeave={handleLeave}
//       style={{ rotateX, rotateY, transformPerspective: 800, ...style }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ─── Animated Counter ───────────────────────────────────────────────────
// function AnimatedNumber({
//   value,
//   suffix = '',
// }: {
//   value: number;
//   suffix?: string;
// }) {
//   const [display, setDisplay] = useState(0);
//   const [hasStarted, setHasStarted] = useState(false);
//   const ref = useRef<HTMLSpanElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasStarted) {
//           setHasStarted(true);
//         }
//       },
//       { threshold: 0.5 },
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [hasStarted]);

//   useEffect(() => {
//     if (!hasStarted) return;
//     let start = 0;
//     const duration = 2000;
//     const startTime = Date.now();
//     const tick = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const eased = 1 - Math.pow(1 - progress, 3);
//       start = Math.floor(eased * value);
//       setDisplay(start);
//       if (progress < 1) requestAnimationFrame(tick);
//     };
//     tick();
//   }, [hasStarted, value]);

//   return (
//     <span ref={ref}>
//       {display.toLocaleString()}
//       {suffix}
//     </span>
//   );
// }

// // ─── Card Action Buttons ────────────────────────────────────────────────
// function CardButtons({
//   freeLink = '/exams',
//   premiumLink = '/auth',
// }: {
//   freeLink?: string;
//   premiumLink?: string;
// }) {
//   return (
//     <div className="flex items-center gap-2 relative z-10">
//       <Link
//         to={freeLink}
//         className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300"
//       >
//         <Zap className="w-3 h-3" />
//         Free
//       </Link>
//       <Link
//         to={premiumLink}
//         className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-gradient-to-r from-[#C49B4B]/15 to-[#D4AF5A]/10 border border-[#C49B4B]/20 text-[#D4AF5A] hover:from-[#C49B4B]/25 hover:to-[#D4AF5A]/15 hover:border-[#C49B4B]/35 transition-all duration-300"
//       >
//         <Lock className="w-3 h-3" />
//         Premium
//       </Link>
//     </div>
//   );
// }

// // ─── Trust Marquee ──────────────────────────────────────────────────────
// const trustBanks = [
//   'Bank Asia',
//   'Eastern Bank',
//   'BRAC Bank',
//   'City Bank',
//   'Prime Bank',
//   'DBBL',
//   'Islami Bank',
//   'IFIC Bank',
//   'Mutual Trust Bank',
//   'Pubali Bank',
//   'Southeast Bank',
//   'NCC Bank',
// ];

// function TrustMarquee() {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, delay: 1.2 }}
//       className="mt-6 pt-5 border-t border-white/[0.06]"
//     >
//       <p className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-medium text-center mb-3">
//         Trusted by aspirants of
//       </p>
//       <div className="relative overflow-hidden">
//         {/* Left fade */}
//         <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
//         {/* Right fade */}
//         <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

//         <div className="animate-marquee-horizontal flex w-max">
//           {[...trustBanks, ...trustBanks].map((bank, i) => (
//             <div key={`${bank}-${i}`} className="flex items-center shrink-0">
//               <div className="w-1 h-1 rounded-full bg-[#C49B4B]/40" />
//               <span className="text-[11px] font-medium text-[#D9B86B] tracking-widest uppercase whitespace-nowrap mx-3">
//                 {bank}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// // ─── Main Hero ──────────────────────────────────────────────────────────
// export default function HeroSection() {
//   return (
//     <section className="relative w-full min-h-screen overflow-hidden bg-[#09090B] pt-16">
//       <AmbientGlow />

//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49B4B]/20 to-transparent" />

//       <div
//         className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//         }}
//       />

//       <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-24 mt-1">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-3 items-center min-h-[calc(100vh-100px)]">
//           {/* ─── LEFT ──────────────────────────────────────────── */}
//           <div className="flex flex-col justify-center space-y-10 pt-16 lg:pt-0">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.4 }}
//               className="space-y-6"
//             >
//               <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-[0.95] tracking-[-0.04em] text-white">
//                 Your path to
//                 <br />
//                 <span className="relative inline-block mt-1">
//                   <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF5A] via-[#F0D48A] to-[#C49B4B]">
//                     private banking
//                   </span>
//                   <span className="absolute -inset-x-4 -inset-y-2 bg-[#C49B4B]/[0.07] blur-2xl rounded-full -z-10" />
//                 </span>
//                 <br />
//                 <span className="text-white/90">starts here.</span>
//               </h1>

//               <p className="text-lg md:text-xl max-w-[480px] text-white/35 leading-relaxed font-light">
//                 Precision-engineered exam preparation with AI-powered practice,
//                 curated question banks, and real-time performance analytics.
//               </p>
//             </motion.div>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.55 }}
//               className="flex flex-wrap items-center gap-4"
//             >
//               <Link
//                 to="/exams"
//                 className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-[15px] text-[#09090B] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(196,155,75,0.3)]"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF5A] via-[#F0D48A] to-[#C49B4B]" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#F0D48A] via-[#D4AF5A] to-[#F0D48A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                 <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-white/20 to-transparent opacity-50" />
//                 <span className="relative z-10 flex items-center gap-3">
//                   Start Free Practice
//                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </span>
//               </Link>

//               <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-[15px] text-white/60 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.15] hover:text-white/90 hover:bg-white/[0.04] transition-all duration-500">
//                 <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C49B4B]/30 transition-colors">
//                   <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white/50 ml-0.5 group-hover:border-l-[#C49B4B] transition-colors" />
//                 </div>
//                 Watch Demo
//               </button>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.7 }}
//               className="flex items-center gap-10 pt-4"
//             >
//               {[
//                 {
//                   value: 89,
//                   suffix: '%',
//                   label: 'Success Rate',
//                   icon: TrendingUp,
//                 },
//                 {
//                   value: 2400,
//                   suffix: '+',
//                   label: 'Questions',
//                   icon: BookOpen,
//                 },
//                 { value: 4.9, suffix: '', label: 'User Rating', icon: Award },
//               ].map((stat, i) => (
//                 <div key={i} className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
//                     <stat.icon className="w-4 h-4 text-[#C49B4B]/60" />
//                   </div>
//                   <div>
//                     <div className="text-xl font-bold text-white tracking-tight leading-none">
//                       {typeof stat.value === 'number' && stat.value > 10 ? (
//                         <AnimatedNumber
//                           value={stat.value}
//                           suffix={stat.suffix}
//                         />
//                       ) : (
//                         <>
//                           {stat.value}
//                           {stat.suffix}
//                         </>
//                       )}
//                     </div>
//                     <div className="text-[11px] text-white/25 font-medium mt-1 tracking-wide uppercase">
//                       {stat.label}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>

//           {/* ─── RIGHT: Premium Bento Grid ────────────────────── */}
//           <div className="flex items-center justify-center lg:justify-end mt-12">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, delay: 0.5 }}
//               className="relative w-full max-w-[520px]"
//             >
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C49B4B]/[0.06] blur-[100px] pointer-events-none" />

//               {/* Bento grid */}
//               <div className="grid grid-cols-2 gap-3">
//                 {/* Card 1 - Preli & Written (tall) */}
//                 <TiltCard className="col-span-1 row-span-1">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.6 }}
//                     className="relative group rounded-2xl p-6 h-[328px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700"
//                     style={{
//                       background:
//                         'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
//                       border: '1px solid rgba(255,255,255,0.06)',
//                       backdropFilter: 'blur(20px)',
//                     }}
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-b from-[#C49B4B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//                     <div>
//                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/10 flex items-center justify-center mb-4">
//                         <BookOpen className="w-5 h-5 text-[#C49B4B]" />
//                       </div>
//                       <h3 className="text-[15px] font-semibold text-white mb-1.5 tracking-tight">
//                         Preli & Written
//                       </h3>
//                       <p className="text-xs text-white/30 leading-relaxed">
//                         Full syllabus coverage with structured learning paths
//                       </p>
//                     </div>
//                     <div className="space-y-3">
//                       <div>
//                         <span className="text-2xl font-bold text-[#C49B4B] tracking-tight">
//                           2,400+
//                         </span>
//                         <span className="text-[10px] text-white/20 ml-1.5 uppercase tracking-wider">
//                           Questions
//                         </span>
//                       </div>
//                       <CardButtons freeLink="/exams" premiumLink="/auth" />
//                     </div>
//                   </motion.div>
//                 </TiltCard>

//                 {/* Card 2 + 3 stacked */}
//                 <div className="col-span-1 flex flex-col gap-3">
//                   {/* Card 2 - Job Solutions */}
//                   <TiltCard>
//                     <motion.div
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.7, delay: 0.7 }}
//                       className="relative group rounded-2xl p-5 h-[158px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700"
//                       style={{
//                         background:
//                           'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
//                         border: '1px solid rgba(255,255,255,0.06)',
//                         backdropFilter: 'blur(20px)',
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-b from-[#C49B4B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//                       <div className="flex items-start justify-between">
//                         <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
//                           <FileText className="w-4.5 h-4.5 text-white/50" />
//                         </div>
//                         <span className="text-[9px] font-semibold tracking-widest uppercase text-white/20 px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.04]">
//                           180+ Papers
//                         </span>
//                       </div>
//                       <div>
//                         <h3 className="text-[13px] font-semibold text-white tracking-tight">
//                           Job Solutions
//                         </h3>
//                         <p className="text-[11px] text-white/25 mt-0.5 mb-2">
//                           Past exams, fully solved
//                         </p>
//                         <CardButtons freeLink="/exams" premiumLink="/auth" />
//                       </div>
//                     </motion.div>
//                   </TiltCard>

//                   {/* Card 3 - Model Tests */}
//                   <TiltCard>
//                     <motion.div
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.7, delay: 0.8 }}
//                       className="relative group rounded-2xl p-5 h-[158px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700"
//                       style={{
//                         background:
//                           'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
//                         border: '1px solid rgba(255,255,255,0.06)',
//                         backdropFilter: 'blur(20px)',
//                       }}
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-b from-[#C49B4B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//                       <div className="flex items-start justify-between">
//                         <div className="w-10 h-10 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.1] flex items-center justify-center">
//                           <ClipboardCheck className="w-4.5 h-4.5 text-emerald-400/70" />
//                         </div>
//                         <div className="flex items-center gap-1.5">
//                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
//                           <span className="text-[9px] font-medium text-emerald-400/50 uppercase tracking-wider">
//                             Live
//                           </span>
//                         </div>
//                       </div>
//                       <div>
//                         <h3 className="text-[13px] font-semibold text-white tracking-tight">
//                           Model Tests
//                         </h3>
//                         <p className="text-[11px] text-white/25 mt-0.5 mb-2">
//                           50+ timed exam simulations
//                         </p>
//                         <CardButtons freeLink="/exams" premiumLink="/auth" />
//                       </div>
//                     </motion.div>
//                   </TiltCard>
//                 </div>

//                 {/* Card 4 - Viva Prep (wide) */}
//                 <TiltCard className="col-span-2">
//                   <motion.div
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.9 }}
//                     className="relative group rounded-2xl p-6 h-[150px] flex items-center overflow-hidden cursor-pointer transition-all duration-700"
//                     style={{
//                       background:
//                         'linear-gradient(135deg, #141210 0%, #1A1710 50%, #12110E 100%)',
//                       border: '1px solid rgba(196,155,75,0.1)',
//                     }}
//                   >
//                     <div
//                       className="absolute inset-0 opacity-[0.03]"
//                       style={{
//                         backgroundImage:
//                           'repeating-linear-gradient(105deg, transparent, transparent 20px, rgba(196,155,75,0.15) 20px, rgba(196,155,75,0.15) 21px)',
//                       }}
//                     />
//                     <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#C49B4B]/[0.04] blur-[60px]" />
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#C49B4B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

//                     <div className="flex items-center gap-5 w-full relative z-10">
//                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/15 flex items-center justify-center shrink-0">
//                         <MessageSquare className="w-5 h-5 text-[#C49B4B]" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center gap-2.5 mb-1">
//                           <h3 className="text-[14px] font-semibold text-white tracking-tight">
//                             Viva Preparation
//                           </h3>
//                           <span className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#C49B4B]/20 to-[#C49B4B]/10 text-[#D4AF5A] border border-[#C49B4B]/15">
//                             Premium
//                           </span>
//                         </div>
//                         <p className="text-[11px] text-white/25 leading-relaxed mb-2.5">
//                           AI-powered mock interviews with real-time feedback &
//                           scoring
//                         </p>
//                         <CardButtons freeLink="/exams" premiumLink="/auth" />
//                       </div>
//                     </div>
//                   </motion.div>
//                 </TiltCard>
//               </div>

//               {/* Trust Marquee */}
//               <TrustMarquee />
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none z-10" />

//       <style>{`
//         @keyframes marquee-horizontal {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee-horizontal {
//           animation: marquee-horizontal 20s linear infinite;
//         }
//         .animate-marquee-horizontal:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </section>
//   );
// }
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  FileText,
  ClipboardCheck,
  MessageSquare,
  Shield,
  TrendingUp,
  Award,
  Lock,
  Zap,
} from 'lucide-react';

// ─── Floating Orb Canvas ────────────────────────────────────────────────
function OrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.003;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const orbs = [
        { x: w * 0.35, y: h * 0.3, r: 220, color: [196, 155, 75] },
        { x: w * 0.65, y: h * 0.6, r: 180, color: [160, 120, 60] },
        { x: w * 0.5, y: h * 0.45, r: 260, color: [180, 140, 70] },
      ];

      orbs.forEach((orb, i) => {
        const ox = orb.x + Math.sin(t + i * 2.1) * 30;
        const oy = orb.y + Math.cos(t + i * 1.7) * 25;
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color.join(',')}, 0.12)`);
        gradient.addColorStop(0.5, `rgba(${orb.color.join(',')}, 0.04)`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      const cx = w * 0.5;
      const cy = h * 0.48;
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2 + t * 0.5;
        const rx = 160 + Math.sin(t + i * 0.3) * 20;
        const ry = 100 + Math.cos(t + i * 0.2) * 15;
        const px = cx + Math.cos(angle) * rx;
        const py = cy + Math.sin(angle) * ry;
        const alpha = 0.08 + Math.sin(t * 2 + i) * 0.06;
        const size = 1 + Math.sin(t + i * 0.5) * 0.5;
        ctx.fillStyle = `rgba(196, 155, 75, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2 - t * 0.3;
        const rx = 240 + Math.sin(t * 0.7 + i * 0.4) * 25;
        const ry = 150 + Math.cos(t * 0.7 + i * 0.3) * 20;
        const px = cx + Math.cos(angle) * rx;
        const py = cy + Math.sin(angle) * ry;
        const alpha = 0.05 + Math.sin(t * 1.5 + i) * 0.03;
        ctx.fillStyle = `rgba(196, 155, 75, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

// ─── 3D Tilt Card ───────────────────────────────────────────────────────
function TiltCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ───────────────────────────────────────────────────
function AnimatedNumber({
  value,
  suffix = '',
}: {
  value: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [hasStarted, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Card Action Buttons ────────────────────────────────────────────────
function CardButtons({
  freeLink = '/exams',
  premiumLink = '/auth',
}: {
  freeLink?: string;
  premiumLink?: string;
}) {
  return (
    <div className="flex items-center gap-2 relative z-10">
      <Link
        to={freeLink}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300"
      >
        <Zap className="w-3 h-3" />
        Free
      </Link>
      <Link
        to={premiumLink}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-semibold bg-gradient-to-r from-[#C49B4B]/15 to-[#D4AF5A]/10 border border-[#C49B4B]/20 text-[#D4AF5A] hover:from-[#C49B4B]/25 hover:to-[#D4AF5A]/15 hover:border-[#C49B4B]/35 transition-all duration-300"
      >
        <Lock className="w-3 h-3" />
        Premium
      </Link>
    </div>
  );
}

// ─── Trust Marquee ──────────────────────────────────────────────────────
const trustBanks = [
  'Bank Asia',
  'Eastern Bank',
  'BRAC Bank',
  'City Bank',
  'Prime Bank',
  'DBBL',
  'Islami Bank',
  'IFIC Bank',
  'Mutual Trust Bank',
  'Pubali Bank',
  'Southeast Bank',
  'NCC Bank',
];

function TrustMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="mt-6 pt-5 border-t border-white/[0.06]"
    >
      <p className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-medium text-center mb-3">
        Trusted by aspirants of
      </p>
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-horizontal flex w-max">
          {[...trustBanks, ...trustBanks].map((bank, i) => (
            <div key={`${bank}-${i}`} className="flex items-center shrink-0">
              <div className="w-1 h-1 rounded-full bg-[#C49B4B]/40" />
              <span className="text-[11px] font-medium text-[#D9B86B] tracking-widest uppercase whitespace-nowrap mx-3">
                {bank}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Hero ──────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#09090B] pt-16">
      <OrbCanvas />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C49B4B]/20 to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-24 mt-1">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-3 items-center min-h-[calc(100vh-100px)]">
          {/* ─── LEFT ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center space-y-10 pt-16 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-6"
            >
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                Your path to
                <br />
                <span className="relative inline-block mt-1">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF5A] via-[#F0D48A] to-[#C49B4B]">
                    private banking
                  </span>
                  <span className="absolute -inset-x-4 -inset-y-2 bg-[#C49B4B]/[0.07] blur-2xl rounded-full -z-10" />
                </span>
                <br />
                <span className="text-white/90">starts here.</span>
              </h1>

              <p className="text-lg md:text-xl max-w-[480px] text-white/35 leading-relaxed font-light">
                Precision-engineered exam preparation with AI-powered practice,
                curated question banks, and real-time performance analytics.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/exams"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-[15px] text-[#09090B] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(196,155,75,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF5A] via-[#F0D48A] to-[#C49B4B]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F0D48A] via-[#D4AF5A] to-[#F0D48A] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-[1px] rounded-[10px] bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                <span className="relative z-10 flex items-center gap-3">
                  Start Free Practice
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-[15px] text-white/60 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:border-white/[0.15] hover:text-white/90 hover:bg-white/[0.04] transition-all duration-500">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C49B4B]/30 transition-colors">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-white/50 ml-0.5 group-hover:border-l-[#C49B4B] transition-colors" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex items-center gap-10 pt-4"
            >
              {[
                {
                  value: 89,
                  suffix: '%',
                  label: 'Success Rate',
                  icon: TrendingUp,
                },
                {
                  value: 2400,
                  suffix: '+',
                  label: 'Questions',
                  icon: BookOpen,
                },
                { value: 4.9, suffix: '', label: 'User Rating', icon: Award },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-[#C49B4B]/60" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white tracking-tight leading-none">
                      {typeof stat.value === 'number' && stat.value > 10 ? (
                        <AnimatedNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      ) : (
                        <>
                          {stat.value}
                          {stat.suffix}
                        </>
                      )}
                    </div>
                    <div className="text-[11px] text-white/25 font-medium mt-1 tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: Premium Bento Grid ────────────────────── */}
          <div className="flex items-center justify-center lg:justify-end mt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative w-full max-w-[520px]"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C49B4B]/[0.06] blur-[100px] pointer-events-none" />

              {/* Bento grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Card 1 - Preli & Written (tall) */}
                <TiltCard className="col-span-1 row-span-1">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="relative group rounded-2xl p-6 h-[328px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700"
                    style={{
                      background:
                        'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#C49B4B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/10 flex items-center justify-center mb-4">
                        <BookOpen className="w-5 h-5 text-[#C49B4B]" />
                      </div>
                      <h3 className="text-[15px] font-semibold text-white mb-1.5 tracking-tight">
                        Preli & Written
                      </h3>
                      <p className="text-xs text-white/30 leading-relaxed">
                        Full syllabus coverage with structured learning paths
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-2xl font-bold text-[#C49B4B] tracking-tight">
                          2,400+
                        </span>
                        <span className="text-[10px] text-white/20 ml-1.5 uppercase tracking-wider">
                          Questions
                        </span>
                      </div>
                      <CardButtons freeLink="/exams" premiumLink="/auth" />
                    </div>
                  </motion.div>
                </TiltCard>

                {/* Card 2 + 3 stacked */}
                <div className="col-span-1 flex flex-col gap-3">
                  {/* Card 2 - Job Solutions */}
                  <TiltCard>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                      className="relative group rounded-2xl p-5 h-[158px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700"
                      style={{
                        background:
                          'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#C49B4B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                          <FileText className="w-4.5 h-4.5 text-white/50" />
                        </div>
                        <span className="text-[9px] font-semibold tracking-widest uppercase text-white/20 px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.04]">
                          180+ Papers
                        </span>
                      </div>
                      <div>
                        <h3 className="text-[13px] font-semibold text-white tracking-tight">
                          Job Solutions
                        </h3>
                        <p className="text-[11px] text-white/25 mt-0.5 mb-2">
                          Past exams, fully solved
                        </p>
                        <CardButtons freeLink="/exams" premiumLink="/auth" />
                      </div>
                    </motion.div>
                  </TiltCard>

                  {/* Card 3 - Model Tests */}
                  <TiltCard>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                      className="relative group rounded-2xl p-5 h-[158px] flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700"
                      style={{
                        background:
                          'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#C49B4B]/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/[0.1] flex items-center justify-center">
                          <ClipboardCheck className="w-4.5 h-4.5 text-emerald-400/70" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                          <span className="text-[9px] font-medium text-emerald-400/50 uppercase tracking-wider">
                            Live
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[13px] font-semibold text-white tracking-tight">
                          Model Tests
                        </h3>
                        <p className="text-[11px] text-white/25 mt-0.5 mb-2">
                          50+ timed exam simulations
                        </p>
                        <CardButtons freeLink="/exams" premiumLink="/auth" />
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>

                {/* Card 4 - Viva Prep (wide) */}
                <TiltCard className="col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="relative group rounded-2xl p-6 h-[150px] flex items-center overflow-hidden cursor-pointer transition-all duration-700"
                    style={{
                      background:
                        'linear-gradient(135deg, #141210 0%, #1A1710 50%, #12110E 100%)',
                      border: '1px solid rgba(196,155,75,0.1)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(105deg, transparent, transparent 20px, rgba(196,155,75,0.15) 20px, rgba(196,155,75,0.15) 21px)',
                      }}
                    />
                    <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-[#C49B4B]/[0.04] blur-[60px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#C49B4B]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="flex items-center gap-5 w-full relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/15 flex items-center justify-center shrink-0">
                        <MessageSquare className="w-5 h-5 text-[#C49B4B]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-1">
                          <h3 className="text-[14px] font-semibold text-white tracking-tight">
                            AI Viva Preparation
                          </h3>
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#C49B4B]/20 to-[#C49B4B]/10 text-[#D4AF5A] border border-[#C49B4B]/15">
                            Premium
                          </span>
                        </div>
                        <p className="text-[11px] text-white/25 leading-relaxed mb-2.5">
                          AI-powered mock interviews with real-time feedback &
                          scoring
                        </p>
                        <CardButtons freeLink="/exams" premiumLink="/auth" />
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>

              {/* Trust Marquee */}
              <TrustMarquee />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none z-10" />

      <style>{`
        @keyframes marquee-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 20s linear infinite;
        }
        .animate-marquee-horizontal:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
