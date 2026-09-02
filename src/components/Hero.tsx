import React, { useState, useEffect, useRef } from 'react';
import { WeddingContent } from '../data/content';
import { FloralAccent } from './FloralAccent';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface HeroProps {
  content: WeddingContent;
  isStickyColumn?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ content, isStickyColumn = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(weddingAudio);

  const toggleAudio = () => {
    const playing = audioRef.current.toggle();
    setIsPlaying(playing);
  };

  // Init audio state on mount (browsers block autoplay until interaction)
  useEffect(() => {
    setIsPlaying(audioRef.current.getStatus());
  }, []);

  return (
    <header
      className={`relative w-full overflow-visible bg-[#0D1512] text-ivory flex flex-col justify-between ${
        isStickyColumn
          ? 'h-full min-h-screen'
          : 'min-h-screen'
      }`}
    >
      {/* Audio toggle button — top right, persistent */}
      <button
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[#1B4332]/60 border border-emerald-light/30 text-[#F7F3E8]/80 hover:text-[#F7F3E8] hover:bg-[#1B4332] hover:border-emerald-light/60 transition-all duration-300 backdrop-blur-sm"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* Background Image: Cropped significantly more at top (~70px) and positioned for clear focus */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={content.hero_image}
          alt={content.hero_image_alt}
          className="w-full h-[calc(100%+70px)] -mt-[70px] sm:h-[calc(100%+85px)] sm:-mt-[85px] object-cover object-[center_top]"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        {/* Soft bottom gradient fade focused on the lower portion for the names */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0D1512] via-[#0D1512]/65 to-transparent pointer-events-none" />
      </div>

      {/* Spacer to push names to the lower third */}
      <div className="flex-1" />

      {/* Hero Content: Couple Names — constrained to fit within sticky column */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-0 sm:pb-1 md:pb-2 translate-y-[10px] mx-auto">
        <h1 className="flex flex-col select-none">
          {/* First Partner (Mateo) — left-aligned */}
          <span className="text-left pl-1 sm:pl-2 md:pl-3">
            <span className="script-font text-[clamp(1.8rem,5vw,4rem)] text-[#F7F3E8] leading-[0.9] drop-shadow-2xl inline-block">
              {content.partner_1}
            </span>
          </span>

          {/* Ampersand & Second Partner (Clara) — right-aligned, staggered up */}
          <span className="text-right pr-1 sm:pr-2 md:pr-3 -mt-1 sm:-mt-2 md:-mt-3">
            <span className="script-font font-light text-[clamp(1rem,3vw,2.5rem)] text-emerald-light/90 mr-1 drop-shadow-xl inline-block align-middle">
              &amp;
            </span>
            <span className="script-font text-[clamp(1.8rem,5vw,4rem)] text-[#F7F3E8] leading-[0.9] drop-shadow-2xl inline-block">
              {content.partner_2}
            </span>
          </span>
        </h1>

        {/* Date and Venue Subtitle */}
        <div className="mt-2 sm:mt-3 text-center">
          <p className="text-sage/90 text-xs sm:text-sm md:text-base serif-title tracking-[0.22em] uppercase drop-shadow-md whitespace-nowrap">
            {content.event_date_short} &nbsp;•&nbsp; {content.venue_city}
          </p>
        </div>
      </div>

      {/* Full-width Floral Bouquet Garland: Positioned lower over the section division seam */}
      <div className="relative z-30 w-full flex items-end justify-center pointer-events-none -mb-20 sm:-mb-24 md:-mb-28 translate-y-[38px] sm:translate-y-[50px] md:translate-y-[60px]">
        <FloralAccent position="hero-seam" size="full" className="w-full px-0" />
      </div>
    </header>
  );
};
