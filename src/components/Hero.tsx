import React, { useState, useEffect, useRef } from 'react';
import { WeddingContent } from '../data/content';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface HeroProps {
  content: WeddingContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(weddingAudio);

  const toggleAudio = () => {
    const playing = audioRef.current.toggle();
    setIsPlaying(playing);
  };

  // Sync audio state on mount and across state changes
  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe(setIsPlaying);
    return unsubscribe;
  }, []);

  return (
    <header className="relative w-full h-screen h-[100dvh] overflow-hidden bg-[#0D1512] text-ivory flex flex-col justify-between select-none">
      {/* Audio toggle button — fixed top right, persistent across entire invitation */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        className="btn-press fixed top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 active:scale-90 border border-white/20 text-[#EDE6D3] transition-all duration-200 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] cursor-pointer"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* Background Image — Pinned in place underneath */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={content.hero_image}
          alt={content.hero_image_alt}
          className="hero-sticky-img w-full h-full object-cover object-[center_top]"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        {/* Soft bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0D1512] via-[#0D1512]/60 to-transparent pointer-events-none" />
      </div>

      {/* Spacer to push names to the lower third */}
      <div className="flex-1" />

      {/* Hero Content: Centered staggered lockup — Mateo slightly left, Clara slightly right */}
      <div className="relative z-10 w-full px-4 sm:px-6 pb-20 sm:pb-24 md:pb-28 mx-auto text-center pointer-events-none">
        <h1 className="inline-flex flex-col items-center select-none">
          {/* First line: Mateo (slightly left of center) */}
          <div className="self-center -translate-x-6 sm:-translate-x-8">
            <span className="script-font text-[clamp(4.5rem,12vw,8.5rem)] text-[#F7F3E8] leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] inline-block">
              {content.partner_1}
            </span>
          </div>

          {/* Second line: & Clara (slightly right of center, vertical spacing) */}
          <div className="self-center translate-x-5 sm:translate-x-7 mt-2 sm:mt-3">
            <span className="script-font font-light text-[clamp(2.4rem,7vw,5rem)] text-emerald-light/95 mr-2 sm:mr-3 drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)] inline-block align-middle">
              &amp;
            </span>
            <span className="script-font text-[clamp(4.5rem,12vw,8.5rem)] text-[#F7F3E8] leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] inline-block">
              {content.partner_2}
            </span>
          </div>
        </h1>
      </div>
    </header>
  );
};
