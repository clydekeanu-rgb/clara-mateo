import React from 'react';
import { WeddingContent } from '../data/content';
import { Wine, Gift, Sparkles } from 'lucide-react';

interface DetailsSectionProps {
  content: WeddingContent;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({ content }) => {
  return (
    <section className="w-full bg-cream paper-texture text-ink pt-16 sm:pt-24 pb-20 sm:pb-28 text-center">
      <div className="w-full max-w-[680px] mx-auto px-6">
        {/* Delicate divider from top */}
        <div className="w-16 h-[1px] bg-[#1B4332]/25 mx-auto mb-12" />

        {/* Section Subtitle */}
        <span className="text-[#574F44] text-xs sm:text-sm tracking-[0.25em] uppercase serif-title block mb-3">
          {content.details_subtitle}
        </span>

        {/* Section Heading */}
        <h2 className="serif-title text-3xl sm:text-4xl md:text-5xl text-[#1B4332] font-normal tracking-[0.15em] mb-14">
          {content.details_heading}
        </h2>

        {/* Notes Cards / Paragraphs */}
        <div className="space-y-10 sm:space-y-12">
          {/* Paragraph 1: Flowers & Wine */}
          <div className="relative p-8 sm:p-10 rounded-xs bg-[#F7F3E8] border border-[#1B4332]/20 shadow-sm transition-all duration-300 hover:border-[#1B4332]/40">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/15 mb-4">
              <Wine className="w-5 h-5" />
            </div>
            <h3 className="serif-title text-sm sm:text-base text-[#1B4332] font-bold tracking-wider mb-3">
              Flowers &amp; Spirits
            </h3>
            <p className="font-body text-base sm:text-lg text-[#2B2620]/85 leading-relaxed font-light">
              {content.details_paragraphs[0]}
            </p>
          </div>

          {/* Paragraph 2: Gifts & Registry */}
          <div className="relative p-8 sm:p-10 rounded-xs bg-[#F7F3E8] border border-[#1B4332]/20 shadow-sm transition-all duration-300 hover:border-[#1B4332]/40">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1B4332]/10 text-[#1B4332] border border-[#1B4332]/15 mb-4">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="serif-title text-sm sm:text-base text-[#1B4332] font-bold tracking-wider mb-3">
              Wedding Registry
            </h3>
            <p className="font-body text-base sm:text-lg text-[#2B2620]/85 leading-relaxed font-light">
              {content.details_paragraphs[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
