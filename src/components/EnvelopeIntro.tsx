import React, { useState, useRef, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isWaxSealVanished, setIsWaxSealVanished] = useState(false);
  const [isTextFaded, setIsTextFaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenEnvelope = () => {
    if (hasStarted) return;
    setHasStarted(true);

    // Wax seal vanishes immediately upon click
    setIsWaxSealVanished(true);

    // Brief delay so the seal vanishes cleanly before the opening animation starts
    setTimeout(() => {
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.muted = true;
        video.play().catch((err) => {
          console.warn('Video playback prevented:', err);
        });
      }
    }, 180);

    // Safety fallback timer: slowly fade text away ~2 seconds into playback
    timerRef.current = setTimeout(() => {
      setIsTextFaded(true);
    }, 2000);
  };

  const handleVideoComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    // Start romantic song as main invitation page begins to emerge
    weddingAudio.play();

    // Smooth transition to main invitation page on last frame
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // Trigger text fade-out at ~2 seconds into the video
    if (video.currentTime >= 2.0 && !isTextFaded) {
      setIsTextFaded(true);
    }

    // Smooth transition on final frame
    if (video.duration && video.currentTime >= video.duration - 0.25) {
      handleVideoComplete();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      onClick={!hasStarted ? handleOpenEnvelope : undefined}
      className={`fixed inset-0 z-[100] bg-[#0D1512] flex items-center justify-center select-none cursor-pointer transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Video stage — completely borderless, edge-to-edge, zero tint overlay */}
      <div className="relative w-full h-full max-w-[540px] max-h-screen flex items-center justify-center overflow-hidden">
        {/* Base first frame image - guarantees exact first frame is displayed before interaction */}
        <img
          src={`${import.meta.env.BASE_URL}envelope_poster.png`}
          alt="Wedding Invitation Envelope"
          className={`absolute inset-0 w-full h-full object-cover sm:object-contain border-none outline-none shadow-none transition-opacity duration-300 ${
            hasStarted ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* Video element — borderless, natural colors with no tint */}
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}envelope_animation.mp4`}
          poster={`${import.meta.env.BASE_URL}envelope_poster.png`}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          muted
          onEnded={handleVideoComplete}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover sm:object-contain border-none outline-none shadow-none"
        />

        {/* 
          "You Are Cordially Invited" and "Mateo & Clara"
          Displayed cleanly over the top floral area with elegant contrast against the light paper.
          Slowly fades away about 2 seconds into the video.
        */}
        {/* 
          "You Are Cordially Invited" and "Mateo & Clara"
          Displayed cleanly over the top floral area with enhanced scale and luxury contrast.
          Slowly fades away about 2 seconds into the video.
        */}
        <div
          className={`absolute top-[11%] sm:top-[12%] inset-x-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-opacity duration-1000 ease-out ${
            isTextFaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="serif-title text-[19px] sm:text-[21px] md:text-[23px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8C7853] font-semibold block mb-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
            You Are Cordially Invited
          </span>
          <h1 className="script-font text-[63px] sm:text-[84px] md:text-[98px] leading-[1.05] text-[#1B4332] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
            Mateo & Clara
          </h1>
        </div>

        {/* 
          PULSATING WAX SEAL:
          Positioned on the corner/tip of the top flap (in the middle of the envelope).
          Vanishes cleanly before the opening animation starts when clicked.
        */}
        <div
          className={`absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[15px] z-30 transition-all duration-200 ease-out pointer-events-none ${
            isWaxSealVanished ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
          aria-hidden={isWaxSealVanished}
        >
          {/* Subtle pulse ripple ring */}
          <div className="absolute -inset-2.5 rounded-full border border-[#C5A869]/50 animate-ping opacity-60 pointer-events-none" />

          {/* Realistic Gold Wax Seal Stamp */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#E8D196] via-[#C5A869] to-[#8C6D32] p-1 shadow-[0_8px_25px_rgba(0,0,0,0.55),inset_0_2px_4px_rgba(255,255,255,0.65),inset_0_-2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center animate-pulse">
            {/* Inner embossed circular ring */}
            <div className="w-full h-full rounded-full border border-[#7D5E24]/60 bg-gradient-to-br from-[#D4B36A] to-[#A07C35] flex items-center justify-center shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.4)]">
              {/* Monogram Seal Stamp */}
              <span className="serif-title text-[11px] sm:text-xs tracking-wider text-[#473614] font-bold drop-shadow-[0_1px_0.5px_rgba(255,255,255,0.5)] select-none">
                M &amp; C
              </span>
            </div>
          </div>
        </div>

        {/* 
          "Click the envelope" prompt at the bottom of the envelope
        */}
        <div
          className={`absolute bottom-[9%] sm:bottom-[11%] inset-x-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-opacity duration-700 ease-out ${
            isTextFaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#1B4332]/20 shadow-[0_2px_10px_rgba(0,0,0,0.06)] animate-pulse">
            <span className="serif-title text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#1B4332] font-semibold">
              Click the envelope
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
