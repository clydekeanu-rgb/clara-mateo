import React from 'react';
import { WeddingContent } from '../data/content';
import { FloralAccent } from './FloralAccent';

interface HeroProps {
  content: WeddingContent;
  isStickyColumn?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ content, isStickyColumn = false }) => {
  return (
    <header
      className={`relative w-full overflow-visible bg-[#0D1512] text-ivory flex flex-col justify-between ${
        isStickyColumn
          ? 'h-full min-h-screen'
          : 'min-h-screen'
      }`}
    >
      {/* Background Image: Cropped significantly more at top (~70px) and positioned for clear focus */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={content.hero_image}
          alt={content.hero_image_alt}
          className="w-full h-[calc(100%+70px)] -mt-[70px] sm:h-[calc(100%+85px)] sm:-mt-[85px] object-cover object-[center_top]"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Soft bottom gradient fade focused on the lower portion for the names */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0D1512] via-[#0D1512]/65 to-transparent pointer-events-none" />
      </div>

      {/* Spacer to push names to the lower third */}
      <div className="flex-1" />

      {/* Hero Content: Couple Names moved lower down, subtly staggered closer to center, with larger font and date/location */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 pb-0 sm:pb-1 md:pb-2 translate-y-[15px] max-w-3xl sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
        <h1 className="flex flex-col select-none">
          {/* First Partner (Mateo) - Aligned slightly to the left */}
          <span className="text-left pl-4 sm:pl-8 md:pl-12">
            <span className="script-font text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] text-[#F7F3E8] leading-[0.8] drop-shadow-2xl inline-block">
              {content.partner_1}
            </span>
          </span>

          {/* Ampersand & Second Partner (Clara) - Aligned slightly to the right */}
          <span className="text-right pr-4 sm:pr-8 md:pr-12 -mt-3 sm:-mt-5 md:-mt-8">
            <span className="script-font font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-emerald-light/90 mr-2 sm:mr-3 drop-shadow-xl inline-block align-middle">
              &amp;
            </span>
            <span className="script-font text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] text-[#F7F3E8] leading-[0.8] drop-shadow-2xl inline-block">
              {content.partner_2}
            </span>
          </span>
        </h1>

        {/* Date and Venue Subtitle - Single Line */}
        <div className="mt-2 sm:mt-3 text-center">
          <p className="text-sage/90 text-xs sm:text-sm md:text-base serif-title tracking-[0.22em] uppercase drop-shadow-md whitespace-nowrap">
            12|18|2026 &nbsp;•&nbsp; Tagaytay, Philippines
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
