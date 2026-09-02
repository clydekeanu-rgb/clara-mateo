import React from 'react';
import { weddingContent } from './data/content';
import { Hero } from './components/Hero';
import { Welcome } from './components/Welcome';
import { Timing } from './components/Timing';
import { DressCode } from './components/DressCode';
import { LocationSection } from './components/LocationSection';
import { DetailsSection } from './components/DetailsSection';
import { RSVPSection } from './components/RSVPSection';
import { TornDivider } from './components/TornDivider';

export default function App() {
  const content = weddingContent;

  return (
    <main className="w-full min-h-screen bg-[#0D1512] text-ink flex flex-col items-center justify-start selection:bg-emerald selection:text-ivory relative">
      {/* Elegant Dark ambient grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* 
        Responsive Architecture:
        - Mobile (< md): Locked max-w-[480px] centered mobile column.
        - Tablet & Desktop (md+): 2-Column split screen with sticky left Hero column & scrolling right content column.
      */}
      <div className="w-full md:flex md:flex-row items-start relative z-10">
        
        {/* Left Column: Sticky Hero on Tablet & Desktop / Standard Top Section on Mobile */}
        <aside className="w-full max-w-[480px] mx-auto md:max-w-none md:mx-0 md:w-5/12 lg:w-[42%] xl:w-[38%] md:sticky md:top-0 md:self-start md:h-screen md:min-h-screen z-20 md:border-r md:border-[#1B4332]/30 md:shadow-[8px_0_30px_rgba(0,0,0,0.45)]">
          <Hero content={content} isStickyColumn={true} />
        </aside>

        {/* Right Column: Scrollable Wedding Details & Information */}
        <div className="w-full max-w-[480px] mx-auto md:max-w-none md:mx-0 md:w-7/12 lg:w-[58%] xl:w-[62%] flex flex-col relative z-10 bg-[#0D1512] min-h-screen">
          
          {/* Section 2: Welcome (Night #0D1512 background) */}
          <Welcome content={content} />

          {/* Transition: Night to Cream */}
          <TornDivider
            fromColor="#0D1512"
            toColor="#EDE6D3"
            flipped={false}
            variant={2}
            height={80}
          />

          {/* Section 3: Timing (Cream background) */}
          <Timing content={content} />

          {/* Transition: Cream Timing to Black Dress Code */}
          <TornDivider
            fromColor="#EDE6D3"
            toColor="#0D1512"
            flipped={false}
            variant={1}
            height={80}
          />

          {/* Section 4: Dress Code (Black/Night background) */}
          <DressCode content={content} />

          {/* Section 5: Location (Night/Black background) */}
          <LocationSection content={content} />

          {/* Transition: Night Location to Cream Details */}
          <TornDivider
            fromColor="#0D1512"
            toColor="#EDE6D3"
            flipped={false}
            variant={3}
            height={80}
          />

          {/* Section 6: Details (Cream background) */}
          <DetailsSection content={content} />

          {/* Transition: Cream Details to Night/Black RSVP & Footer */}
          <TornDivider
            fromColor="#EDE6D3"
            toColor="#0D1512"
            flipped={false}
            variant={4}
            height={80}
          />

          {/* Section 7: RSVP (Night background with bottom floral accent & footer) */}
          <RSVPSection content={content} />
        </div>
      </div>
    </main>
  );
}
