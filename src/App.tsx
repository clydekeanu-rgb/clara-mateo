import React from 'react';
import { weddingContent } from './data/content';
import { Hero } from './components/Hero';
import { FloralAccent } from './components/FloralAccent';
import { Welcome } from './components/Welcome';
import { Countdown } from './components/Countdown';
import { GalleryMarquee } from './components/GalleryMarquee';
import { Timing } from './components/Timing';
import { DressCode } from './components/DressCode';
import { LocationSection } from './components/LocationSection';
import { PhotoSharingSection } from './components/PhotoSharingSection';
import { RSVPSection } from './components/RSVPSection';
import { TornDivider } from './components/TornDivider';
import { Preloader } from './components/Preloader';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { useScrollReveal } from './hooks/useScrollReveal';
import { weddingAudio } from './utils/audio';

export default function App() {
  const content = weddingContent;
  useScrollReveal();

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [showEnvelopeIntro, setShowEnvelopeIntro] = React.useState<boolean>(true);

  return (
    <>
      {/* Luxury Asset Preloader Screen */}
      {isLoading && (
        <Preloader onLoaded={() => setIsLoading(false)} />
      )}

      {/* Interactive Envelope Intro Animation Overlay */}
      {showEnvelopeIntro && (
        <EnvelopeIntro
          onComplete={() => {
            setShowEnvelopeIntro(false);
            weddingAudio.play();
          }}
        />
      )}

      <main
        id="main-content"
        className="w-full min-h-screen bg-[#0D1512] text-[#F7F3E8] flex flex-col items-center justify-start selection:bg-emerald selection:text-ivory relative"
      >
        {/* Elegant Dark ambient grain texture overlay */}
        <div className="grain" aria-hidden="true" />

        {/* 
          Sticky Hero Section:
          Stays pinned in place at top-0 while scrolling down.
        */}
        <aside className="sticky top-0 w-full h-screen h-[100dvh] z-0 overflow-hidden">
          <Hero content={content} />
        </aside>

        {/* 
          Scrolling Page Content:
          Slides ON TOP of the sticky hero image as you scroll down.
          Led by the floral bouquet garland at the seam.
        */}
        <div className="relative z-10 w-full bg-[#0D1512] shadow-[0_-25px_60px_rgba(0,0,0,0.85)] flex flex-col min-h-screen">
          
          {/* Full-width Floral Bouquet Garland: Sits at the seam and slides up over the hero image */}
          <div className="relative z-30 w-full flex items-center justify-center pointer-events-none -mt-14 sm:-mt-18 md:-mt-22 lg:-mt-24 overflow-visible">
            <FloralAccent position="hero-seam" size="full" className="w-full px-0 drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]" />
          </div>

          {/* Section 2: Welcome (Night #0D1512 background) */}
          <Welcome content={content} />

          {/* Section 2.5: Countdown Timer (Night #0D1512 background) */}
          <Countdown targetDate={content.event_iso_date} />

          {/* Section 2.7: Gallery Marquee (Pure Black #000000 background) */}
          <GalleryMarquee images={content.gallery_images} />

          {/* Transition: Black Gallery to Cream Timing (Program) */}
          <TornDivider
            fromColor="#000000"
            toColor="#EDE6D3"
            flipped={false}
            variant={2}
            height={80}
            className="!z-10"
          />

          {/* Section 3: Timing (Cream background) */}
          <Timing content={content} />

          {/* Transition: Cream Timing (Program) to Dress Code with Right Floral Flank */}
          <div className="relative w-full">
            <TornDivider
              fromColor="#EDE6D3"
              toColor="#0D1512"
              flipped={false}
              variant={1}
              height={80}
            />

            {/* Right Floral Flank (In between Program and Dress Code sections) */}
            <div
              className="absolute -top-24 sm:-top-36 md:-top-48 right-0 z-20 pointer-events-none select-none w-44 sm:w-64 md:w-80 lg:w-[26rem] max-w-[48vw] overflow-visible"
              aria-hidden="true"
            >
              <img
                src={`${import.meta.env.BASE_URL}floral_flank.png`}
                alt=""
                className="w-full h-auto object-contain rotate-180 drop-shadow-[0_16px_32px_rgba(0,0,0,0.35)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Section 4: Dress Code (Black/Night background) */}
          <DressCode content={content} />

          {/* Section 5: Location (Night/Black background) */}
          <LocationSection content={content} />

          {/* Transition: Night Location to Cream Photo Sharing */}
          <TornDivider
            fromColor="#0D1512"
            toColor="#EDE6D3"
            flipped={false}
            variant={3}
            height={80}
          />

          {/* Section 6: Guest Photo Sharing (Cream background) */}
          <PhotoSharingSection content={content} />

          {/* Transition: Cream Photo Sharing to Night/Black RSVP & Footer */}
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
      </main>
    </>
  );
}
