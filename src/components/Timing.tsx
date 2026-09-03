import React from 'react';
import { WeddingContent } from '../data/content';
import { Clock } from 'lucide-react';

interface TimingProps {
  content: WeddingContent;
}

export const Timing: React.FC<TimingProps> = ({ content }) => {
  return (
    <section className="w-full bg-cream paper-texture text-ink pt-16 sm:pt-24 pb-16 sm:pb-24">
      <div className="w-full max-w-[680px] mx-auto px-6 text-center">
        {/* Section Subtitle */}
        <span className="reveal-init text-[#574F44] text-xs sm:text-sm tracking-[0.25em] uppercase serif-title block mb-3">
          {content.schedule_subtitle}
        </span>

        {/* Section Heading */}
        <h2
          data-reveal-delay="50"
          className="reveal-init serif-title text-3xl sm:text-4xl md:text-5xl text-[#1B4332] font-normal tracking-[0.15em] mb-14"
        >
          {content.schedule_heading}
        </h2>

        {/* Timeline List */}
        <div className="relative border-l border-[#1B4332]/30 ml-4 sm:ml-32 md:ml-36 space-y-12 sm:space-y-14 text-left">
          {content.schedule.map((item, index) => (
            <div
              key={index}
              data-reveal-delay={`${100 + index * 75}`}
              className="reveal-init relative pl-8 sm:pl-10 group cursor-default transition-all duration-300"
            >
              {/* Emerald Timeline Marker Dot with Hover Ring */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#EDE6D3] border-2 border-[#1B4332] shadow-xs transition-all duration-300 group-hover:scale-135 group-hover:border-emerald-light group-hover:bg-[#1B4332]" />

              {/* Time Stamp */}
              <div className="sm:absolute sm:-left-36 sm:top-0 sm:w-28 sm:text-right transition-transform duration-300 group-hover:-translate-x-1">
                <span className="inline-block serif-title text-sm sm:text-base font-bold tracking-wider text-[#1B4332]">
                  {item.time}
                </span>
              </div>

              {/* Script Event Title */}
              <h3 className="script-font text-3xl sm:text-4xl text-[#1B4332] tracking-wide leading-tight mb-2 transition-transform duration-300 group-hover:translate-x-1">
                {item.title}
              </h3>

              {/* Event Description */}
              <p className="font-body text-base sm:text-lg text-[#2B2620]/85 leading-relaxed font-light max-w-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
