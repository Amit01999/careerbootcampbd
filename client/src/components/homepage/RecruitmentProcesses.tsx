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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
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
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 px-5 py-2.5 rounded-full mb-2">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Bank Recruitment Programs
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Explore Bank{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.4)]">
              Recruitment Processes
            </span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
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
                className="group relative w-full h-full bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/20 hover:border-white/30 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-left overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Bank Logo */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className={`w-16 h-16 bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600  rounded-2xl flex items-center justify-center mb-4 text-3xl transition-transform duration-300 shadow-lg`}
                  >
                    {bank.logo}
                  </motion.div>

                  {/* Bank Short Name */}
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: bank.color }}
                  >
                    {bank.shortName}
                  </div>

                  {/* Bank Full Name */}
                  <h3 className="text-lg font-semibold text-white mb-3 leading-tight group-hover:text-cyan-400 transition-colors min-h-[3.5rem]">
                    {bank.name}
                  </h3>

                  {/* Positions Badge */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bank.positions.slice(0, 1).map((position, index) => (
                      <Badge
                        key={index}
                        className="text-xs font-medium px-3 py-1 rounded-md bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
                      >
                        {position}
                      </Badge>
                    ))}
                    {bank.positions.length > 1 && (
                      <Badge className="text-xs font-medium px-3 py-1 rounded-md bg-white/10 text-white/80 border-white/20 hover:bg-white/20">
                        +{bank.positions.length - 1} more
                      </Badge>
                    )}
                  </div>

                  {/* View Details */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
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
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate('/recruitment-processes')}
              className="bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 hover:from-cyan-400 hover:via-cyan-300 hover:to-blue-400 text-[#030712] font-semibold px-12 py-6 text-base rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                View All Bank Recruitment Processes
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </motion.div>
          <p className="text-sm text-white/50 mt-6">
            Explore {banksData.length}+ bank recruitment programs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
