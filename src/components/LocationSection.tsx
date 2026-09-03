import React from 'react';
import { WeddingContent } from '../data/content';
import { MapPin, Navigation } from 'lucide-react';

interface LocationSectionProps {
  content: WeddingContent;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ content }) => {
  return (
    <section className="w-full bg-night dark-texture text-ivory pt-16 sm:pt-24 pb-0 text-center">
      {/* Content wrapper constrained to ~680px */}
      <div className="max-w-[680px] mx-auto px-6 mb-12 sm:mb-16">
        {/* Section Subtitle */}
        <span className="reveal-init text-[#9CAF9A] text-xs sm:text-sm tracking-[0.25em] uppercase serif-title block mb-3">
          {content.location_subtitle}
        </span>

        {/* Section Heading */}
        <h2
          data-reveal-delay="50"
          className="reveal-init serif-title text-3xl sm:text-4xl md:text-5xl text-[#F7F3E8] font-normal tracking-[0.15em] mb-6"
        >
          {content.location_heading}
        </h2>

        {/* Lead sentence with merge fields */}
        <p
          data-reveal-delay="90"
          className="reveal-init font-body text-lg sm:text-xl text-[#F7F3E8]/85 leading-relaxed font-light mb-4"
        >
          {content.location_intro}
        </p>

        {/* Venue Name & City Highlight */}
        <div data-reveal-delay="130" className="reveal-init my-6">
          <h3 className="serif-title text-lg sm:text-xl text-emerald-light font-bold tracking-wider">
            {content.venue_name}
          </h3>
          <p className="font-body text-base sm:text-lg text-[#C2CEC2] mt-1 font-light">
            {content.venue_address}
          </p>
        </div>

        {/* Map Directions Button */}
        <div data-reveal-delay="170" className="reveal-init mt-8">
          <a
            href={content.venue_google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-xs text-[11px] sm:text-xs serif-title tracking-widest bg-[#1B4332] text-[#F7F3E8] hover:bg-[#255a43] border border-emerald-light/40 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Full-width Photo of the Venue Exterior at Dusk */}
      <div className="w-full relative mt-8 sm:mt-12 overflow-hidden max-h-[480px] sm:max-h-[580px]">
        <img
          src={content.venue_image}
          alt={content.venue_image_alt}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03] hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Soft edge blend into dark background */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0D1512] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D1512] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
