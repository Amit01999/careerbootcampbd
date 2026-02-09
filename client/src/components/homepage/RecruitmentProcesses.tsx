import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { banksData } from '@/data/banksData';
import { motion } from 'framer-motion';

export default function RecruitmentProcesses() {
  const navigate = useNavigate();

  // Show first 8 banks (2 rows of 4)
  const displayedBanks = banksData.slice(0, 8);

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#09090B]">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C49B4B]/[0.04] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#C49B4B]/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-5"
        >
          <div className="inline-flex items-center gap-2 bg-[#C49B4B]/10 border border-[#C49B4B]/20 text-[#D4AF5A] px-5 py-2.5 rounded-full mb-2">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Bank Recruitment Programs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Explore Bank{' '}
            <span className="text-gradient-gold">Recruitment Processes</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto font-light">
            Comprehensive step-by-step guides for Bangladesh's top bank
            recruitment programs
          </p>
        </motion.div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayedBanks.map((bank, i) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <motion.button
                onClick={() => navigate(`/recruitment-process/${bank.id}`)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="group relative w-full h-full rounded-3xl p-6 shadow-lg transition-all duration-300 text-left overflow-hidden border border-white/[0.06] hover:border-[#C49B4B]/20"
                style={{
                  background:
                    'linear-gradient(165deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                }}
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C49B4B]/10 to-[#D4AF5A]/5 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Bank Logo */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#C49B4B]/20 to-[#C49B4B]/5 border border-[#C49B4B]/10 rounded-2xl flex items-center justify-center mb-4 text-3xl transition-transform duration-300"
                  >
                    {bank.logo}
                  </motion.div>

                  {/* Bank Short Name */}
                  <div className="text-xs font-bold uppercase tracking-wider mb-2 text-[#C49B4B]">
                    {bank.shortName}
                  </div>

                  {/* Bank Full Name */}
                  <h3 className="text-lg font-semibold text-white mb-3 leading-tight group-hover:text-[#D4AF5A] transition-colors min-h-[3.5rem]">
                    {bank.name}
                  </h3>

                  {/* Positions Badge */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bank.positions.slice(0, 1).map((position, index) => (
                      <Badge
                        key={index}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06] shadow-sm"
                      >
                        {position}
                      </Badge>
                    ))}
                    {bank.positions.length > 1 && (
                      <Badge className="text-xs font-medium px-3 py-1 rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06] shadow-sm">
                        +{bank.positions.length - 1} more
                      </Badge>
                    )}
                  </div>

                  {/* View Details */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#C49B4B]">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Show All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center px-4 sm:px-0"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center"
          >
            <Button
              onClick={() => navigate('/recruitment-processes')}
              className="
        btn-premium
        w-full sm:w-auto
        px-6 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-6
        text-sm sm:text-base
        rounded-xl sm:rounded-2xl
        shadow-lg
        transition-all duration-300
        hover:scale-105
      "
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-center leading-snug">
                  View All Bank Recruitment Processes
                </span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Button>
          </motion.div>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-white/30">
            Explore {banksData.length}+ bank recruitment programs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
