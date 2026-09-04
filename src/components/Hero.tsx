import React, { useState, useEffect, useRef } from 'react';
import { WeddingContent } from '../data/content';
import { FloralAccent } from './FloralAccent';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface HeroProps {
  content: WeddingContent;
  isStickyColumn?: boolean;
  onReopenEnvelope?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, isStickyColumn = false, onReopenEnvelope }) => {
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
        className="btn-press absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[#1B4332]/60 border border-emerald-light/30 text-[#F7F3E8]/80 hover:text-[#F7F3E8] hover:bg-[#1B4332] hover:border-emerald-light/60 transition-all duration-300 backdrop-blur-sm cursor-pointer"
      >
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </button>

      {/* Animated Envelope Intro Button — top left */}
      <button
        type="button"
        onClick={() => {
          if (onReopenEnvelope) {
            onReopenEnvelope();
          } else {
            window.location.reload();
          }
        }}
        title="Open Animated Envelope"
        className="btn-press absolute top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#1B4332]/70 border border-[#C5A869]/40 text-[#EDE6D3] hover:text-[#F7F3E8] hover:bg-[#1B4332] hover:border-[#C5A869] text-xs serif-title uppercase tracking-widest backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer"
      >
        <span className="text-sm leading-none">✉️</span>
        <span className="hidden sm:inline">Envelope</span>
      </button>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={content.hero_image}
          alt={content.hero_image_alt}
          className="w-full h-[calc(100%+70px)] -mt-[70px] sm:h-[calc(100%+85px)] sm:-mt-[85px] object-cover object-[center_top]"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        {/* Soft bottom gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0D1512] via-[#0D1512]/65 to-transparent pointer-events-none" />
      </div>

      {/* Spacer to push names to the lower third */}
      <div className="flex-1" />

      {/* Hero Content: Centered staggered lockup — Mateo slightly left, Clara slightly right, 5px padding from bouquet */}
      <div className="relative z-10 w-full px-4 sm:px-6 pb-0 translate-y-[44px] sm:translate-y-[48px] lg:translate-y-[22px] mx-auto text-center">
        <h1 className="inline-flex flex-col items-center select-none">
          {/* First line: Mateo (slightly left of center) */}
          <div className="self-center -translate-x-6 sm:-translate-x-8 lg:-translate-x-6">
            <span className="script-font text-[clamp(4.5rem,11.5vw,8rem)] lg:text-[clamp(2.5rem,3.1vw,3.2rem)] text-[#F7F3E8] leading-[0.88] drop-shadow-2xl inline-block">
              {content.partner_1}
            </span>
          </div>

          {/* Second line: & Clara (slightly right of center, vertical spacing) */}
          <div className="self-center translate-x-5 sm:translate-x-7 lg:translate-x-5 mt-2 sm:mt-3 lg:mt-1.5">
            <span className="script-font font-light text-[clamp(2.4rem,6.8vw,4.8rem)] lg:text-[clamp(1.5rem,1.8vw,1.9rem)] text-emerald-light/90 mr-2 sm:mr-3 lg:mr-2 drop-shadow-xl inline-block align-middle">
              &amp;
            </span>
            <span className="script-font text-[clamp(4.5rem,11.5vw,8rem)] lg:text-[clamp(2.5rem,3.1vw,3.2rem)] text-[#F7F3E8] leading-[0.88] drop-shadow-2xl inline-block">
              {content.partner_2}
            </span>
          </div>
        </h1>
      </div>

      {/* Full-width Floral Bouquet Garland */}
      <div className="relative z-30 w-full flex items-end justify-center pointer-events-none -mb-16 sm:-mb-20 md:-mb-24 lg:-mb-14 translate-y-[32px] sm:translate-y-[42px] md:translate-y-[48px] lg:translate-y-[22px]">
        <FloralAccent position="hero-seam" size="full" className="w-full px-0" />
      </div>
    </header>
  );
};
