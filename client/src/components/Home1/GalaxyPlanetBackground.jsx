import { motion } from 'framer-motion';

const services = [
  { label: 'Model Test', angle: 45 },
  { label: 'Job Solution', angle: 135 },
  { label: 'Viva', angle: 225 },
  { label: 'Written', angle: 315 },
];

export default function GalaxyPlanetBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:18px_18px] opacity-20" />

      {/* Orbit System */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[320px] h-[320px]"
        style={{ transform: 'translate(-50%, -50%)' }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: 'linear' }}
      >
        {/* Planet */}
        <div className="absolute left-1/2 top-1/2 w-[90px] h-[90px] -translate-x-1/2 -translate-y-1/2 rounded-full planet-core" />

        {/* Services */}
        {services.map((s, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${s.angle}deg) translateX(140px)` }}
          >
            <div className="w-[70px] h-[70px] relative">
              <div className="absolute inset-0 bg-white/5 border border-cyan-400/20 backdrop-blur-sm clip-hexagon flex items-center justify-center text-center px-1">
                <span className="text-[10px] text-white/80 leading-tight">
                  {s.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
