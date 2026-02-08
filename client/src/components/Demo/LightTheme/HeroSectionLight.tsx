// import {
//   Zap,
//   ArrowRight,
//   Play,
//   Users,
//   Target,
//   Star,
//   BookOpen,
//   FileText,
//   ClipboardCheck,
//   MessageSquare,
//   Sparkles,
//   TrendingUp,
//   CheckCircle2,
//   Award,
// } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <section
//       className="relative w-full min-h-screen overflow-hidden flex items-center py-20"
//       style={{
//         background:
//           'linear-gradient(135deg, hsl(28 100% 98%) 0%, hsl(30 60% 96%) 100%)',
//       }}
//     >
//       {/* Enhanced Background */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-50"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 25% 25%, hsl(38 92% 50% / 0.1) 0%, transparent 50%),
//             radial-gradient(circle at 75% 75%, hsl(30 90% 55% / 0.08) 0%, transparent 50%)
//           `,
//         }}
//       />

//       {/* Decorative Elements */}
//       <div
//         className="absolute top-32 right-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
//         style={{
//           background:
//             'radial-gradient(circle, hsl(38 92% 50% / 0.5) 0%, transparent 70%)',
//         }}
//       />
//       <div
//         className="absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
//         style={{
//           background:
//             'radial-gradient(circle, hsl(30 90% 55% / 0.4) 0%, transparent 70%)',
//         }}
//       />

//       <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
//         <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             {/* Badge */}
//             <div
//               className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full w-fit"
//               style={{
//                 background: 'hsl(0 0% 100%)',
//                 border: '1px solid hsl(38 92% 50% / 0.3)',
//                 boxShadow:
//                   '0 4px 12px hsl(38 92% 50% / 0.15), inset 0 1px 0 hsl(0 0% 100%)',
//               }}
//             >
//               <div
//                 className="w-2 h-2 rounded-full"
//                 style={{
//                   background: 'hsl(38 92% 50%)',
//                   boxShadow: '0 0 8px hsl(38 92% 50% / 0.8)',
//                 }}
//               />
//               <span
//                 className="text-sm font-bold"
//                 style={{
//                   color: 'hsl(220 35% 15%)',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 Bangladesh's #1 Bank Job Platform
//               </span>
//             </div>

//             {/* Main Heading */}
//             <div>
//               <h1
//                 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
//                 style={{
//                   fontFamily: "'Cal Sans', 'DM Sans', sans-serif",
//                   color: 'hsl(220 35% 15%)',
//                   letterSpacing: '-0.03em',
//                 }}
//               >
//                 Dedicated bootcamp
//                 <br />
//                 for complete{' '}
//                 <span
//                   className="relative inline-block"
//                   style={{
//                     background:
//                       'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   private bank
//                 </span>
//                 <br />
//                 job preparation.
//               </h1>

//               <p
//                 className="text-xl lg:text-2xl max-w-2xl leading-relaxed"
//                 style={{
//                   color: 'hsl(220 10% 40%)',
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 Master MCQ, Written, and Viva with AI-powered practice, expert
//                 curated content, and real exam simulations.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-4">
//               <button
//                 className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
//                 style={{
//                   background:
//                     'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//                   color: 'hsl(0 0% 100%)',
//                   boxShadow:
//                     '0 8px 24px hsl(38 92% 50% / 0.35), inset 0 1px 2px hsl(0 0% 100% / 0.25)',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 <Zap className="w-5 h-5" />
//                 Start Free Model Test
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               <button
//                 className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02]"
//                 style={{
//                   background: 'hsl(0 0% 100%)',
//                   color: 'hsl(220 35% 15%)',
//                   border: '2px solid hsl(30 30% 88%)',
//                   boxShadow: '0 4px 16px hsl(220 25% 10% / 0.08)',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 <Play
//                   className="w-5 h-5"
//                   style={{ color: 'hsl(38 92% 50%)' }}
//                 />
//                 Get Premium
//               </button>
//             </div>

//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-8 pt-4">
//               <StatBadge icon={Users} value="310K+" label="Active Students" />
//               <StatBadge
//                 icon={Target}
//                 value="89%"
//                 label="Success Rate"
//                 color="hsl(152 60% 40%)"
//               />
//               <StatBadge icon={Star} value="4.9/5" label="User Rating" />
//             </div>
//           </div>

//           {/* Right Cards - Beautiful Modern Grid */}
//           <div className="relative">
//             <div className="grid grid-cols-2 gap-5">
//               {/* Card 1 - Preli & written (Featured) */}
//               <div className="col-span-2">
//                 <PremiumCard
//                   icon={BookOpen}
//                   title="Preli & written Module"
//                   description="Comprehensive MCQ & written exam preparation"
//                   features={['5000+ Questions', 'AI Analysis', 'Mock Tests']}
//                   featured
//                 />
//               </div>

//               {/* Card 2 - Job Solution */}
//               <CompactCard
//                 icon={FileText}
//                 title="Job Solution"
//                 description="Previous year solutions"
//                 accentColor="hsl(38 92% 50%)"
//               />

//               {/* Card 3 - Model Test */}
//               <CompactCard
//                 icon={ClipboardCheck}
//                 title="Model Test"
//                 description="Real exam simulations"
//                 accentColor="hsl(152 60% 40%)"
//               />

//               {/* Card 4 - Viva Module (Premium Dark) */}
//               <div className="col-span-2">
//                 <DarkPremiumCard
//                   icon={MessageSquare}
//                   title="Viva Module"
//                   description="Interview preparation with expert feedback"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Stat Badge Component
// function StatBadge({ icon: Icon, value, label, color = 'hsl(38 92% 50%)' }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div
//         className="w-12 h-12 rounded-xl flex items-center justify-center"
//         style={{
//           background: `${color}10`,
//           border: `1px solid ${color}20`,
//         }}
//       >
//         <Icon className="w-6 h-6" style={{ color, strokeWidth: 2.5 }} />
//       </div>
//       <div>
//         <div
//           className="text-2xl font-bold leading-none mb-1"
//           style={{
//             color: 'hsl(220 35% 15%)',
//             fontFamily: "'DM Sans', sans-serif",
//           }}
//         >
//           {value}
//         </div>
//         <div
//           className="text-sm font-medium"
//           style={{ color: 'hsl(220 10% 45%)' }}
//         >
//           {label}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Premium Featured Card Component
// function PremiumCard({ icon: Icon, title, description, features, featured }) {
//   return (
//     <div
//       className="relative group rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
//       style={{
//         background:
//           'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(38 85% 98%) 100%)',
//         border: '2px solid hsl(38 92% 50% / 0.2)',
//         boxShadow:
//           '0 12px 40px hsl(38 92% 50% / 0.15), 0 4px 12px hsl(220 25% 10% / 0.06)',
//       }}
//     >
//       {/* Gradient Overlay */}
//       <div
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//         style={{
//           background:
//             'radial-gradient(circle at top right, hsl(38 92% 50% / 0.08) 0%, transparent 60%)',
//         }}
//       />

//       {/* Featured Badge */}
//       <div
//         className="absolute top-5 right-5 px-3 py-1.5 rounded-lg text-xs font-black"
//         style={{
//           background:
//             'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//           color: 'hsl(0 0% 100%)',
//           boxShadow: '0 4px 16px hsl(38 92% 50% / 0.4)',
//           letterSpacing: '0.08em',
//         }}
//       >
//         ⭐ POPULAR
//       </div>

//       <div className="relative flex items-start gap-6">
//         {/* Icon */}
//         <div
//           className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
//           style={{
//             background:
//               'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//             boxShadow:
//               '0 8px 24px hsl(38 92% 50% / 0.35), inset 0 2px 4px hsl(0 0% 100% / 0.3)',
//           }}
//         >
//           <Icon
//             className="w-10 h-10"
//             style={{ color: 'hsl(0 0% 100%)', strokeWidth: 2 }}
//           />
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//           <h3
//             className="text-2xl font-bold mb-2"
//             style={{
//               color: 'hsl(220 35% 15%)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             {title}
//           </h3>
//           <p className="text-sm mb-4" style={{ color: 'hsl(220 10% 45%)' }}>
//             {description}
//           </p>

//           {/* Feature Tags */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             {features.map((feature, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1 rounded-lg text-xs font-semibold"
//                 style={{
//                   background: 'hsl(38 70% 95%)',
//                   color: 'hsl(220 35% 15%)',
//                 }}
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               className="flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
//               style={{
//                 background: 'hsl(0 0% 100%)',
//                 color: 'hsl(220 35% 15%)',
//                 border: '2px solid hsl(38 60% 85%)',
//                 boxShadow: '0 2px 8px hsl(220 25% 10% / 0.04)',
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               Try Free
//             </button>
//             <button
//               className="flex-1 py-3 px-5 rounded-xl font-black text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               style={{
//                 background:
//                   'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//                 color: 'hsl(0 0% 100%)',
//                 boxShadow: '0 4px 16px hsl(38 92% 50% / 0.35)',
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               Get Paid →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Compact Card Component
// function CompactCard({ icon: Icon, title, description, accentColor }) {
//   return (
//     <div
//       className="relative group rounded-2xl p-6 transition-all duration-500 hover:scale-[1.05] hover:shadow-xl"
//       style={{
//         background: 'hsl(0 0% 100%)',
//         border: `2px solid ${accentColor}15`,
//         boxShadow: '0 4px 20px hsl(220 25% 10% / 0.06)',
//       }}
//     >
//       {/* Decorative Glow */}
//       <div
//         className="absolute top-0 right-0 w-24 h-24 opacity-20 blur-2xl rounded-full"
//         style={{
//           background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
//         }}
//       />

//       <div className="relative space-y-4">
//         {/* Icon */}
//         <div
//           className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
//           style={{
//             background: `${accentColor}10`,
//             border: `1.5px solid ${accentColor}20`,
//           }}
//         >
//           <Icon
//             className="w-7 h-7"
//             style={{ color: accentColor, strokeWidth: 2.5 }}
//           />
//         </div>

//         {/* Title */}
//         <div>
//           <h3
//             className="text-lg font-bold mb-1"
//             style={{
//               color: 'hsl(220 35% 15%)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             {title}
//           </h3>
//           <p className="text-xs" style={{ color: 'hsl(220 10% 50%)' }}>
//             {description}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="space-y-2 pt-2">
//           <button
//             className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105"
//             style={{
//               background: 'hsl(0 0% 100%)',
//               color: 'hsl(220 35% 15%)',
//               border: '1.5px solid hsl(30 30% 88%)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Free
//           </button>
//           <button
//             className="w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg"
//             style={{
//               background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor} 100%)`,
//               color: 'hsl(0 0% 100%)',
//               boxShadow: `0 3px 12px ${accentColor}35`,
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Paid
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Dark Premium Card Component
// function DarkPremiumCard({ icon: Icon, title, description }) {
//   return (
//     <div
//       className="relative group rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
//       style={{
//         background:
//           'linear-gradient(135deg, hsl(220 35% 12%) 0%, hsl(220 35% 18%) 100%)',
//         border: '2px solid hsl(38 92% 50% / 0.25)',
//         boxShadow:
//           '0 12px 40px hsl(220 35% 5% / 0.4), 0 4px 12px hsl(38 92% 50% / 0.12)',
//       }}
//     >
//       {/* Pattern Overlay */}
//       <div
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle at 2px 2px, hsl(0 0% 100%) 1px, transparent 1px)',
//           backgroundSize: '24px 24px',
//         }}
//       />

//       {/* Premium Badge */}
//       <div
//         className="absolute top-5 right-5 px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5"
//         style={{
//           background: 'hsl(38 92% 50%)',
//           color: 'hsl(220 35% 15%)',
//           boxShadow: '0 4px 16px hsl(38 92% 50% / 0.5)',
//           letterSpacing: '0.08em',
//         }}
//       >
//         <Award className="w-3.5 h-3.5" />
//         PREMIUM
//       </div>

//       <div className="relative flex items-center justify-between gap-8">
//         {/* Left Content */}
//         <div className="flex items-center gap-5 flex-1">
//           <div
//             className="flex-shrink-0 w-18 h-18 rounded-2xl flex items-center justify-center"
//             style={{
//               background: 'hsl(38 92% 50%)',
//               boxShadow:
//                 '0 8px 24px hsl(38 92% 50% / 0.4), inset 0 1px 2px hsl(0 0% 100% / 0.3)',
//             }}
//           >
//             <Icon
//               className="w-9 h-9"
//               style={{ color: 'hsl(220 35% 15%)', strokeWidth: 2.5 }}
//             />
//           </div>

//           <div className="flex-1">
//             <h3
//               className="text-xl font-bold mb-2"
//               style={{
//                 color: 'hsl(0 0% 100%)',
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               {title}
//             </h3>
//             <p className="text-sm" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
//               {description}
//             </p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             className="py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
//             style={{
//               background: 'hsl(0 0% 100% / 0.1)',
//               color: 'hsl(0 0% 100%)',
//               border: '2px solid hsl(0 0% 100% / 0.2)',
//               backdropFilter: 'blur(10px)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Free
//           </button>
//           <button
//             className="py-3 px-6 rounded-xl font-black text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//             style={{
//               background: 'hsl(38 92% 50%)',
//               color: 'hsl(220 35% 15%)',
//               boxShadow: '0 6px 20px hsl(38 92% 50% / 0.4)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Paid
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import {
//   Zap,
//   ArrowRight,
//   Play,
//   Users,
//   Target,
//   Star,
//   BookOpen,
//   FileText,
//   ClipboardCheck,
//   MessageSquare,
//   Sparkles,
//   TrendingUp,
//   CheckCircle2,
//   Award,
// } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <section
//       className="relative w-full min-h-screen overflow-hidden flex items-center py-20"
//       style={{
//         background:
//           'linear-gradient(135deg, hsl(28 100% 98%) 0%, hsl(30 60% 96%) 100%)',
//       }}
//     >
//       {/* Enhanced Background */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-50"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at 25% 25%, hsl(38 92% 50% / 0.1) 0%, transparent 50%),
//             radial-gradient(circle at 75% 75%, hsl(30 90% 55% / 0.08) 0%, transparent 50%)
//           `,
//         }}
//       />

//       {/* Decorative Elements */}
//       <div
//         className="absolute top-32 right-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
//         style={{
//           background:
//             'radial-gradient(circle, hsl(38 92% 50% / 0.5) 0%, transparent 70%)',
//         }}
//       />
//       <div
//         className="absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-15 blur-3xl"
//         style={{
//           background:
//             'radial-gradient(circle, hsl(30 90% 55% / 0.4) 0%, transparent 70%)',
//         }}
//       />

//       <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
//         <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
//           {/* Left Content */}
//           <div className="space-y-8">
//             {/* Badge */}
//             <div
//               className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full w-fit"
//               style={{
//                 background: 'hsl(0 0% 100%)',
//                 border: '1px solid hsl(38 92% 50% / 0.3)',
//                 boxShadow:
//                   '0 4px 12px hsl(38 92% 50% / 0.15), inset 0 1px 0 hsl(0 0% 100%)',
//               }}
//             >
//               <div
//                 className="w-2 h-2 rounded-full"
//                 style={{
//                   background: 'hsl(38 92% 50%)',
//                   boxShadow: '0 0 8px hsl(38 92% 50% / 0.8)',
//                 }}
//               />
//               <span
//                 className="text-sm font-bold"
//                 style={{
//                   color: 'hsl(220 35% 15%)',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 Bangladesh's #1 Bank Job Platform
//               </span>
//             </div>

//             {/* Main Heading */}
//             <div>
//               <h1
//                 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
//                 style={{
//                   fontFamily: "'Cal Sans', 'DM Sans', sans-serif",
//                   color: 'hsl(220 35% 15%)',
//                   letterSpacing: '-0.03em',
//                 }}
//               >
//                 Dedicated bootcamp
//                 <br />
//                 for complete{' '}
//                 <span
//                   className="relative inline-block"
//                   style={{
//                     background:
//                       'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     backgroundClip: 'text',
//                   }}
//                 >
//                   private bank
//                 </span>
//                 <br />
//                 job preparation.
//               </h1>

//               <p
//                 className="text-xl lg:text-2xl max-w-2xl leading-relaxed"
//                 style={{
//                   color: 'hsl(220 10% 40%)',
//                   fontFamily: "'DM Sans', sans-serif",
//                   fontWeight: 400,
//                 }}
//               >
//                 Master MCQ, Written, and Viva with AI-powered practice, expert
//                 curated content, and real exam simulations.
//               </p>
//             </div>

//             {/* CTA Buttons */}
//             <div className="flex flex-wrap gap-4">
//               <button
//                 className="group inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
//                 style={{
//                   background:
//                     'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//                   color: 'hsl(0 0% 100%)',
//                   boxShadow:
//                     '0 8px 24px hsl(38 92% 50% / 0.35), inset 0 1px 2px hsl(0 0% 100% / 0.25)',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 <Zap className="w-5 h-5" />
//                 Start Free Model Test
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>

//               <button
//                 className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 hover:scale-[1.02]"
//                 style={{
//                   background: 'hsl(0 0% 100%)',
//                   color: 'hsl(220 35% 15%)',
//                   border: '2px solid hsl(30 30% 88%)',
//                   boxShadow: '0 4px 16px hsl(220 25% 10% / 0.08)',
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}
//               >
//                 <Play
//                   className="w-5 h-5"
//                   style={{ color: 'hsl(38 92% 50%)' }}
//                 />
//                 Get Premium
//               </button>
//             </div>

//             {/* Stats Row */}
//             <div className="flex flex-wrap gap-8 pt-4">
//               <StatBadge icon={Users} value="310K+" label="Active Students" />
//               <StatBadge
//                 icon={Target}
//                 value="89%"
//                 label="Success Rate"
//                 color="hsl(152 60% 40%)"
//               />
//               <StatBadge icon={Star} value="4.9/5" label="User Rating" />
//             </div>
//           </div>

//           {/* Right Cards - Beautiful Modern Grid */}
//           <div className="relative">
//             <div className="grid grid-cols-2 gap-5">
//               {/* Card 1 - Preli & written (Featured) */}
//               <div className="col-span-2">
//                 <PremiumCard
//                   icon={BookOpen}
//                   title="Preli & written Module"
//                   description="Comprehensive MCQ & written exam preparation"
//                   features={['5000+ Questions', 'AI Analysis', 'Mock Tests']}
//                   featured
//                 />
//               </div>

//               {/* Card 2 - Job Solution */}
//               <CompactCard
//                 icon={FileText}
//                 title="Job Solution"
//                 description="Previous year solutions"
//                 accentColor="hsl(38 92% 50%)"
//               />

//               {/* Card 3 - Model Test */}
//               <CompactCard
//                 icon={ClipboardCheck}
//                 title="Model Test"
//                 description="Real exam simulations"
//                 accentColor="hsl(152 60% 40%)"
//               />

//               {/* Card 4 - Viva Module (Premium Dark) */}
//               <div className="col-span-2">
//                 <DarkPremiumCard
//                   icon={MessageSquare}
//                   title="Viva Module"
//                   description="Interview preparation with expert feedback"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Stat Badge Component
// function StatBadge({ icon: Icon, value, label, color = 'hsl(38 92% 50%)' }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div
//         className="w-12 h-12 rounded-xl flex items-center justify-center"
//         style={{
//           background: `${color}10`,
//           border: `1px solid ${color}20`,
//         }}
//       >
//         <Icon className="w-6 h-6" style={{ color, strokeWidth: 2.5 }} />
//       </div>
//       <div>
//         <div
//           className="text-2xl font-bold leading-none mb-1"
//           style={{
//             color: 'hsl(220 35% 15%)',
//             fontFamily: "'DM Sans', sans-serif",
//           }}
//         >
//           {value}
//         </div>
//         <div
//           className="text-sm font-medium"
//           style={{ color: 'hsl(220 10% 45%)' }}
//         >
//           {label}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Premium Featured Card Component
// function PremiumCard({ icon: Icon, title, description, features, featured }) {
//   return (
//     <div
//       className="relative group rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
//       style={{
//         background:
//           'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(38 85% 98%) 100%)',
//         border: '2px solid hsl(38 92% 50% / 0.2)',
//         boxShadow:
//           '0 12px 40px hsl(38 92% 50% / 0.15), 0 4px 12px hsl(220 25% 10% / 0.06)',
//       }}
//     >
//       {/* Gradient Overlay */}
//       <div
//         className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//         style={{
//           background:
//             'radial-gradient(circle at top right, hsl(38 92% 50% / 0.08) 0%, transparent 60%)',
//         }}
//       />

//       {/* Featured Badge */}
//       <div
//         className="absolute top-5 right-5 px-3 py-1.5 rounded-lg text-xs font-black"
//         style={{
//           background:
//             'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//           color: 'hsl(0 0% 100%)',
//           boxShadow: '0 4px 16px hsl(38 92% 50% / 0.4)',
//           letterSpacing: '0.08em',
//         }}
//       >
//         ⭐ POPULAR
//       </div>

//       <div className="relative flex items-start gap-6">
//         {/* Icon */}
//         <div
//           className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
//           style={{
//             background:
//               'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//             boxShadow:
//               '0 8px 24px hsl(38 92% 50% / 0.35), inset 0 2px 4px hsl(0 0% 100% / 0.3)',
//           }}
//         >
//           <Icon
//             className="w-10 h-10"
//             style={{ color: 'hsl(0 0% 100%)', strokeWidth: 2 }}
//           />
//         </div>

//         {/* Content */}
//         <div className="flex-1">
//           <h3
//             className="text-2xl font-bold mb-2"
//             style={{
//               color: 'hsl(220 35% 15%)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             {title}
//           </h3>
//           <p className="text-sm mb-4" style={{ color: 'hsl(220 10% 45%)' }}>
//             {description}
//           </p>

//           {/* Feature Tags */}
//           <div className="flex flex-wrap gap-2 mb-5">
//             {features.map((feature, idx) => (
//               <span
//                 key={idx}
//                 className="px-3 py-1 rounded-lg text-xs font-semibold"
//                 style={{
//                   background: 'hsl(38 70% 95%)',
//                   color: 'hsl(220 35% 15%)',
//                 }}
//               >
//                 {feature}
//               </span>
//             ))}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3">
//             <button
//               className="flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
//               style={{
//                 background: 'hsl(0 0% 100%)',
//                 color: 'hsl(220 35% 15%)',
//                 border: '2px solid hsl(38 60% 85%)',
//                 boxShadow: '0 2px 8px hsl(220 25% 10% / 0.04)',
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               Try Free
//             </button>
//             <button
//               className="flex-1 py-3 px-5 rounded-xl font-black text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
//               style={{
//                 background:
//                   'linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(30 90% 55%) 100%)',
//                 color: 'hsl(0 0% 100%)',
//                 boxShadow: '0 4px 16px hsl(38 92% 50% / 0.35)',
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               Get Paid →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Compact Card Component
// function CompactCard({ icon: Icon, title, description, accentColor }) {
//   return (
//     <div
//       className="relative group rounded-2xl p-6 transition-all duration-500 hover:scale-[1.05] hover:shadow-xl"
//       style={{
//         background: 'hsl(0 0% 100%)',
//         border: `2px solid ${accentColor}15`,
//         boxShadow: '0 4px 20px hsl(220 25% 10% / 0.06)',
//       }}
//     >
//       {/* Decorative Glow */}
//       <div
//         className="absolute top-0 right-0 w-24 h-24 opacity-20 blur-2xl rounded-full"
//         style={{
//           background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
//         }}
//       />

//       <div className="relative space-y-4">
//         {/* Icon */}
//         <div
//           className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
//           style={{
//             background: `${accentColor}10`,
//             border: `1.5px solid ${accentColor}20`,
//           }}
//         >
//           <Icon
//             className="w-7 h-7"
//             style={{ color: accentColor, strokeWidth: 2.5 }}
//           />
//         </div>

//         {/* Title */}
//         <div>
//           <h3
//             className="text-lg font-bold mb-1"
//             style={{
//               color: 'hsl(220 35% 15%)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             {title}
//           </h3>
//           <p className="text-xs" style={{ color: 'hsl(220 10% 50%)' }}>
//             {description}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="space-y-2 pt-2">
//           <button
//             className="w-full py-2.5 px-4 rounded-lg font-semibold text-xs transition-all duration-300 hover:scale-105"
//             style={{
//               background: 'hsl(0 0% 100%)',
//               color: 'hsl(220 35% 15%)',
//               border: '1.5px solid hsl(30 30% 88%)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Free
//           </button>
//           <button
//             className="w-full py-2.5 px-4 rounded-lg font-bold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg"
//             style={{
//               background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor} 100%)`,
//               color: 'hsl(0 0% 100%)',
//               boxShadow: `0 3px 12px ${accentColor}35`,
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Paid
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Dark Premium Card Component
// function DarkPremiumCard({ icon: Icon, title, description }) {
//   return (
//     <div
//       className="relative group rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
//       style={{
//         background:
//           'linear-gradient(135deg, hsl(220 35% 12%) 0%, hsl(220 35% 18%) 100%)',
//         border: '2px solid hsl(38 92% 50% / 0.25)',
//         boxShadow:
//           '0 12px 40px hsl(220 35% 5% / 0.4), 0 4px 12px hsl(38 92% 50% / 0.12)',
//       }}
//     >
//       {/* Pattern Overlay */}
//       <div
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage:
//             'radial-gradient(circle at 2px 2px, hsl(0 0% 100%) 1px, transparent 1px)',
//           backgroundSize: '24px 24px',
//         }}
//       />

//       {/* Premium Badge */}
//       <div
//         className="absolute top-5 right-5 px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5"
//         style={{
//           background: 'hsl(38 92% 50%)',
//           color: 'hsl(220 35% 15%)',
//           boxShadow: '0 4px 16px hsl(38 92% 50% / 0.5)',
//           letterSpacing: '0.08em',
//         }}
//       >
//         <Award className="w-3.5 h-3.5" />
//         PREMIUM
//       </div>

//       <div className="relative flex items-center justify-between gap-8">
//         {/* Left Content */}
//         <div className="flex items-center gap-5 flex-1">
//           <div
//             className="flex-shrink-0 w-18 h-18 rounded-2xl flex items-center justify-center"
//             style={{
//               background: 'hsl(38 92% 50%)',
//               boxShadow:
//                 '0 8px 24px hsl(38 92% 50% / 0.4), inset 0 1px 2px hsl(0 0% 100% / 0.3)',
//             }}
//           >
//             <Icon
//               className="w-9 h-9"
//               style={{ color: 'hsl(220 35% 15%)', strokeWidth: 2.5 }}
//             />
//           </div>

//           <div className="flex-1">
//             <h3
//               className="text-xl font-bold mb-2"
//               style={{
//                 color: 'hsl(0 0% 100%)',
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               {title}
//             </h3>
//             <p className="text-sm" style={{ color: 'hsl(0 0% 100% / 0.7)' }}>
//               {description}
//             </p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-3">
//           <button
//             className="py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105"
//             style={{
//               background: 'hsl(0 0% 100% / 0.1)',
//               color: 'hsl(0 0% 100%)',
//               border: '2px solid hsl(0 0% 100% / 0.2)',
//               backdropFilter: 'blur(10px)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Free
//           </button>
//           <button
//             className="py-3 px-6 rounded-xl font-black text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
//             style={{
//               background: 'hsl(38 92% 50%)',
//               color: 'hsl(220 35% 15%)',
//               boxShadow: '0 6px 20px hsl(38 92% 50% / 0.4)',
//               fontFamily: "'DM Sans', sans-serif",
//             }}
//           >
//             Paid
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
