import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-video video-glow-border group cursor-pointer"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      onClick={togglePlay}
    >
      {/* Video container with rounded corners */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-typing-on-a-laptop-1584/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Controls - appear on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        >
          {/* Center play/pause button */}
          <motion.button
            onClick={e => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-primary-foreground shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause size={28} />
            ) : (
              <Play size={28} className="ml-1" />
            )}
          </motion.button>
        </motion.div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.button
                onClick={e => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-9 h-9 rounded-lg bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </motion.button>
            </div>
            <motion.button
              onClick={e => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="w-9 h-9 rounded-lg bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Maximize2 size={16} />
            </motion.button>
          </div>
        </div>

        {/* Video label */}
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1.5 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50">
            <span className="text-xs font-medium text-foreground">
              Success Stories
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;
