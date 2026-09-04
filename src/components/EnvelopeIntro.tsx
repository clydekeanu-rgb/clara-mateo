import React, { useState, useRef, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isTextFaded, setIsTextFaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenEnvelope = () => {
    if (hasStarted) return;
    setHasStarted(true);

    // Automatic romantic soundtrack start on interaction
    weddingAudio.play();

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch((err) => {
        console.warn('Video playback prevented:', err);
      });
    }

    // Safety fallback timer: slowly fade text away ~2 seconds into playback
    timerRef.current = setTimeout(() => {
      setIsTextFaded(true);
    }, 2000);
  };

  const handleVideoComplete = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
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
          onEnded={handleVideoComplete}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover sm:object-contain border-none outline-none shadow-none"
        />

        {/* 
          "You Are Cordially Invited" and "Mateo & Clara"
          Displayed cleanly over the first frame without any tint background.
          Slowly fades away about 2 seconds in the video.
        */}
        <div
          className={`absolute top-10 sm:top-14 inset-x-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none transition-opacity duration-1000 ease-out ${
            isTextFaded ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="serif-title text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#E5D7B7] block mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
            You Are Cordially Invited
          </span>
          <h1 className="script-font text-4xl sm:text-5xl md:text-6xl text-[#FFFDF9] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Mateo & Clara
          </h1>
        </div>
      </div>
    </div>
  );
};
