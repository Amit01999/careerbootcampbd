import { motion } from 'framer-motion';
import { VideoIcon } from 'lucide-react';
import video1 from '../../assets/videoCourse/1.jpeg';
import video2 from '../../assets/videoCourse/2.jpeg';
import video3 from '../../assets/videoCourse/3.jpeg';
export default function VideoCourses() {
  const videoThumbnails = [video1, video2, video3];

  return (
    <section className="w-full py-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#C49B4B]/10 border border-[#C49B4B]/20 mb-4 md:mb-6 justify-center mx-auto">
          <VideoIcon className="w-4 h-4 text-[#C49B4B]" />
          <span className="text-xs md:text-sm font-semibold text-[#D4AF5A]">
            Featured Collection
          </span>
        </div>

        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-3 md:mb-4">
          Complete <span className="text-gradient-gold">Video Courses</span>
        </h2>

        <p className="text-sm md:text-lg text-white/40 max-w-2xl mx-auto font-light mb-8 md:mb-12 px-4 md:px-0">
          Access high-quality video courses covering all key topics, designed
          for focused learning.
        </p>
      </div>

      {/* Video Thumbnails */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {videoThumbnails.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{
              background:
                'linear-gradient(135deg, rgba(196,155,75,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <img
              src={src}
              alt={`Video ${i + 1}`}
              className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
