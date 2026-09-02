import React, { useState } from 'react';
import { WeddingContent } from '../data/content';
import { Sparkles } from 'lucide-react';

interface DressCodeProps {
  content: WeddingContent;
}

export const DressCode: React.FC<DressCodeProps> = ({ content }) => {
  const [activeSwatch, setActiveSwatch] = useState<number | null>(null);

  return (
    <section className="w-full bg-night dark-texture text-ivory pt-16 sm:pt-24 pb-0 text-center">
      {/* Content wrapper constrained to ~680px */}
      <div className="max-w-[680px] mx-auto px-6 mb-12 sm:mb-16">
        {/* Subtle decorative divider */}
        <div className="w-16 h-[1px] bg-emerald-accent/40 mx-auto mb-12" />

        {/* Section Subtitle */}
        <span className="text-sage text-xs sm:text-sm tracking-[0.3em] uppercase serif-title block mb-3">
          {content.dress_code_subtitle}
        </span>

        {/* Section Heading */}
        <h2 className="serif-title font-bold text-3xl sm:text-4xl md:text-5xl text-[#F7F3E8] font-normal tracking-[0.15em] mb-6">
          {content.dress_code_heading}
        </h2>

        {/* Intro sentence */}
        <p className="font-body text-lg sm:text-xl text-ivory/85 leading-relaxed font-light mb-10 max-w-md mx-auto">
          {content.dress_code_intro}
        </p>

        {/* Five Overlapping Circular Color Swatches */}
        <div className="flex items-center justify-center -space-x-3 sm:-space-x-4 my-8 py-4">
          {content.dress_code_swatches.map((swatch, index) => {
            const isHovered = activeSwatch === index;
            return (
              <div
                key={index}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveSwatch(index)}
                onMouseLeave={() => setActiveSwatch(null)}
                onClick={() => setActiveSwatch(activeSwatch === index ? null : index)}
                onFocus={() => setActiveSwatch(index)}
                onBlur={() => setActiveSwatch(null)}
                tabIndex={0}
                role="button"
                aria-label={`${swatch.name} — ${swatch.hex}`}
              >
                {/* Circular Swatch */}
                <div
                  className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-115 group-hover:z-30 group-hover:-translate-y-2 relative border focus:outline-none focus:ring-2 focus:ring-emerald-light focus:ring-offset-2 focus:ring-offset-[#0D1512]`}
                  style={{
                    backgroundColor: swatch.hex,
                    borderColor: swatch.border || 'rgba(255, 255, 255, 0.25)',
                    zIndex: isHovered ? 30 : index + 1,
                  }}
                />

                {/* Swatch Label Tooltip */}
                <div
                  className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded bg-[#141F1A] border border-emerald-deep/60 text-[#F7F3E8] text-xs serif-title tracking-wider uppercase transition-all duration-200 pointer-events-none shadow-md ${
                    isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  }`}
                >
                  {swatch.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Swatch Names Guide */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-10 text-xs sm:text-sm text-sage/80 serif-title tracking-widest uppercase">
          {content.dress_code_swatches.map((swatch, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full border border-white/20" style={{ backgroundColor: swatch.hex }} />
              {swatch.name}
              {i < content.dress_code_swatches.length - 1 && <span className="opacity-40 ml-2">•</span>}
            </span>
          ))}
        </div>

        <p className="font-body italic text-base sm:text-lg text-ivory/70 mt-6 font-light">
          Formal &amp; Black-Tie Optional. We kindly encourage attire inspired by these natural evening tones.
        </p>
      </div>

      {/* Full-width Photo of Elegant Table Setting */}
      <div className="w-full relative mt-8 sm:mt-12 overflow-hidden max-h-[480px] sm:max-h-[580px]">
        <img
          src={content.table_setting_image}
          alt={content.table_setting_image_alt}
          className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Top and Bottom soft dark fades */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-night to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
