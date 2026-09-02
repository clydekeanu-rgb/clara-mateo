import React from 'react';
import { WeddingContent } from '../data/content';
import { Calendar, Heart } from 'lucide-react';

interface WelcomeProps {
  content: WeddingContent;
}

export const Welcome: React.FC<WelcomeProps> = ({ content }) => {
  // Generate Google Calendar Link (Philippine Time UTC+8: 2026-12-18 15:30 -> 07:30 UTC)
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${content.partner_1} & ${content.partner_2}'s Wedding`
  )}&dates=20261218T073000Z/20261218T160000Z&details=${encodeURIComponent(
    `Wedding celebration of ${content.partner_1} and ${content.partner_2} at ${content.venue_name}, ${content.venue_city}`
  )}&location=${encodeURIComponent(`${content.venue_name}, ${content.venue_address}`)}`;

  // Generate .ics calendar download
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Curated Pages//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${content.partner_1} & ${content.partner_2}'s Wedding`,
      `DESCRIPTION:Celebrating the wedding of ${content.partner_1} and ${content.partner_2}`,
      `LOCATION:${content.venue_name}, ${content.venue_address}`,
      'DTSTART:20261218T153000',
      'DTEND:20261218T233000',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${content.partner_1}_and_${content.partner_2}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative w-full bg-[#0D1512] dark-texture text-[#F7F3E8] pt-40 pb-20 sm:pt-52 sm:pb-28 md:pt-60 md:pb-32 px-6 overflow-hidden">
      {/* Decorative content container constrained to max 640px */}
      <div className="max-w-[640px] mx-auto text-center relative z-10">
        {/* Salutation / Section Title */}
        <h2 className="serif-title font-moglan text-3xl sm:text-4xl md:text-5xl text-[#F7F3E8] font-normal tracking-[0.14em] mb-6 drop-shadow-sm">
          {content.welcome.salutation}
        </h2>

        {/* Lead Paragraph */}
        <p className="font-body text-base sm:text-lg text-[#EDE6D3]/90 leading-relaxed mb-6 max-w-[540px] mx-auto">
          {content.welcome.intro} {content.welcome.sentiment}
        </p>

        {/* Date Highlight Badge */}
        <div className="inline-block my-4 py-3 px-8 sm:px-12 border-y border-[#EDE6D3]/30 bg-[#141F1A]/50 shadow-xs">
          <p className="serif-title text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] text-[#52B788]">
            {content.event_date}
          </p>
          <p className="serif-title text-[11px] sm:text-xs text-[#C2CEC2] tracking-[0.2em] mt-1">
            {content.venue_city}
          </p>
        </div>

        {/* Closing Sentiment */}
        <p className="font-body text-base sm:text-lg text-[#EDE6D3] italic leading-relaxed font-light mt-6 mb-8">
          "{content.welcome.closing}"
        </p>

        {/* Subtle Calendar Action */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs text-[11px] sm:text-xs serif-title tracking-wider border border-[#EDE6D3]/40 text-[#EDE6D3] hover:bg-[#EDE6D3] hover:text-[#0D1512] transition-all duration-300 shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Google Calendar</span>
          </a>
          <button
            type="button"
            onClick={handleDownloadICS}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xs text-[11px] sm:text-xs serif-title tracking-wider border border-[#EDE6D3]/40 text-[#EDE6D3] hover:bg-[#EDE6D3] hover:text-[#0D1512] transition-all duration-300 shadow-xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Apple / iCal</span>
          </button>
        </div>

        {/* Romantic flourish separator */}
        <div className="flex items-center justify-center space-x-3 mt-12 text-[#EDE6D3]/35">
          <span className="w-12 h-[1px] bg-[#EDE6D3]/30" />
          <Heart className="w-4 h-4 fill-[#EDE6D3]/20 text-[#EDE6D3]/50" />
          <span className="w-12 h-[1px] bg-[#EDE6D3]/30" />
        </div>
      </div>
    </section>
  );
};
