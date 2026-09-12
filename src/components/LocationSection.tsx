import React, { useState } from 'react';
import { WeddingContent } from '../data/content';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface LocationSectionProps {
  content: WeddingContent;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ content }) => {
  const [isMapOpen, setIsMapOpen] = useState(true);

  return (
    <section className="w-full bg-night dark-texture text-ivory pt-16 sm:pt-24 pb-0 text-center">
      {/* Content wrapper constrained to ~680px */}
      <div className="max-w-[680px] mx-auto px-6 mb-8 sm:mb-12">
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

        {/* Venue Name & City Highlight — Apple Card Frame */}
        <div data-reveal-delay="130" className="reveal-scale-init my-6 p-6 sm:p-8 rounded-3xl bg-[#141F1A]/70 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] max-w-md mx-auto">
          <h3 className="serif-title text-lg sm:text-xl text-emerald-light font-bold tracking-wider">
            {content.venue_name}
          </h3>
          <p className="font-body text-base sm:text-lg text-[#C2CEC2] mt-2 font-light">
            {content.venue_address}
          </p>
        </div>

        {/* Navigation Action Buttons — Apple Pill Buttons */}
        <div data-reveal-delay="160" className="reveal-init mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={content.venue_google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs serif-title tracking-widest font-semibold bg-gradient-to-r from-[#1B4332] to-[#255a43] hover:from-[#255a43] hover:to-[#2d6a4f] text-[#F7F3E8] border border-emerald-light/40 shadow-[0_6px_24px_rgba(37,90,67,0.4),inset_0_1px_0_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
          <a
            href="https://waze.com/ul?q=Angelfields%20Nature%20Sanctuary%20Silang%20Cavite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs serif-title tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-[#EDE6D3] border border-white/15 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A869]" />
            <span>Open in Waze</span>
          </a>
          <button
            type="button"
            onClick={() => setIsMapOpen(!isMapOpen)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs serif-title tracking-widest font-semibold bg-white/10 hover:bg-white/15 text-[#EDE6D3] border border-white/15 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-light" />
            <span>{isMapOpen ? 'Hide Google Map' : 'View Google Map'}</span>
          </button>
        </div>

        {/* Embedded Google Maps View (Collapsible / Expandable) */}
        {isMapOpen && (
          <div data-reveal-delay="190" className="reveal-scale-init mt-8 overflow-hidden rounded-3xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] bg-[#141F1A]">
            <iframe
              title="Angelfields Nature Sanctuary Google Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(content.venue_name + ', ' + content.venue_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-[280px] sm:h-[340px] border-0 filter contrast-[1.02]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>

      {/* Full-width Photo of the Venue Exterior — Reverted to original edge-to-edge bleed frame */}
      <div className="w-full relative mt-12 sm:mt-16 overflow-hidden max-h-[480px] sm:max-h-[580px]">
        <img
          src={content.venue_image}
          alt={content.venue_image_alt}
          className="w-full h-full object-cover object-[center_65%] filter brightness-[0.96] contrast-[1.02] hover:scale-105 transition-transform duration-1000 ease-out"
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
