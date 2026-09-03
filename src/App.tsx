import React from 'react';
import { weddingContent } from './data/content';
import { Hero } from './components/Hero';
import { Welcome } from './components/Welcome';
import { Countdown } from './components/Countdown';
import { GalleryMarquee } from './components/GalleryMarquee';
import { Timing } from './components/Timing';
import { DressCode } from './components/DressCode';
import { LocationSection } from './components/LocationSection';
import { DetailsSection } from './components/DetailsSection';
import { RSVPSection } from './components/RSVPSection';
import { TornDivider } from './components/TornDivider';

export default function App() {
  const content = weddingContent;

  return (
    <main
      id="main-content"
      className="w-full min-h-screen bg-[#0D1512] text-[#F7F3E8] flex flex-col items-center justify-start selection:bg-emerald selection:text-ivory relative"
    >
      {/* Elegant Dark ambient grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* 
        Responsive Architecture:
        - Mobile & Tablet Portrait (< lg): Elegant single-column layout with uncropped hero portrait and full width.
        - Desktop (lg+): 2-Column split screen with sticky left Hero column & scrolling right content column.
      */}
      <div className="w-full lg:flex lg:flex-row items-start relative z-10">
        
        {/* Left Column: Sticky Hero on Desktop / Full Width Top Section on Mobile & Tablet */}
        <aside className="w-full max-w-[480px] sm:max-w-[560px] md:max-w-[640px] mx-auto lg:max-w-none lg:mx-0 lg:w-[42%] xl:w-[38%] lg:sticky lg:top-0 lg:self-start lg:h-screen lg:min-h-screen z-20 lg:border-r lg:border-[#1B4332]/30 lg:shadow-[8px_0_30px_rgba(0,0,0,0.45)]">
          <Hero content={content} isStickyColumn={true} />
        </aside>

        {/* Right Column: Scrollable Wedding Details & Information */}
        <div className="w-full max-w-[480px] sm:max-w-[560px] md:max-w-[640px] mx-auto lg:max-w-none lg:mx-0 lg:w-[58%] xl:w-[62%] flex flex-col relative z-10 bg-[#0D1512] min-h-screen">
          
          {/* Section 2: Welcome (Night #0D1512 background) */}
          <Welcome content={content} />

          {/* Section 2.5: Countdown Timer (Night #0D1512 background) */}
          <Countdown targetDate={content.event_iso_date} />

          {/* Section 2.7: Gallery Marquee (Pure Black #000000 background) */}
          <GalleryMarquee images={content.gallery_images} />

          {/* Transition: Black Gallery to Cream Timing */}
          <TornDivider
            fromColor="#000000"
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
