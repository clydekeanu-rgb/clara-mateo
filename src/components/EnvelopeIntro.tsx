import React, { useState, useRef } from 'react';
import { weddingAudio } from '../utils/audio';
import { Sparkles } from 'lucide-react';

interface EnvelopeIntroProps {
  onComplete: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({ onComplete }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    if (video && video.duration && video.currentTime >= video.duration - 0.25) {
      handleVideoComplete();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center select-none transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Skip button in top corner for fast navigation */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleVideoComplete();
        }}
        className="btn-press absolute top-5 right-5 z-30 text-xs sm:text-sm tracking-[0.2em] uppercase serif-title text-[#EDE6D3]/70 hover:text-[#F7F3E8] py-1.5 px-3.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-colors"
      >
        Skip to Invite →
      </button>

      {/* Video stage — completely borderless, edge-to-edge on mobile */}
      <div
        onClick={!hasStarted ? handleOpenEnvelope : undefined}
        className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}envelope_animation.mp4`}
          poster={`${import.meta.env.BASE_URL}envelope_poster.png`}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onEnded={handleVideoComplete}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full max-w-[540px] max-h-screen object-cover sm:object-contain border-none outline-none shadow-none"
        />

        {/* Initial Overlay: Floating invitation prompt */}
        {!hasStarted && (
          <div
            onClick={handleOpenEnvelope}
            className="absolute inset-0 z-20 flex flex-col items-center justify-between p-8 bg-gradient-to-t from-black/85 via-black/30 to-black/75 cursor-pointer transition-opacity duration-500 hover:bg-black/40"
          >
            {/* Top Text */}
            <div className="text-center pt-8 sm:pt-12">
              <span className="serif-title text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A869] block mb-2 drop-shadow-md">
                You Are Cordially Invited
              </span>
              <h1 className="script-font text-4xl sm:text-5xl md:text-6xl text-[#F7F3E8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Mateo & Clara
              </h1>
            </div>

            {/* Bottom Call to Action */}
            <div className="flex flex-col items-center gap-3 pb-8 sm:pb-12">
              <div className="relative group">
                {/* Glowing ring pulse */}
                <div className="absolute -inset-2 rounded-full bg-[#52B788]/35 blur-md animate-pulse" />

                <button
                  type="button"
                  className="btn-press relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#1B4332] to-[#255a43] text-[#F7F3E8] border border-[#C5A869]/50 shadow-[0_10px_25px_rgba(0,0,0,0.8)] hover:border-[#C5A869] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A869]" />
                  <span className="serif-title text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                    Tap to Open Envelope
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-[#C2CEC2]/75 tracking-wider font-light drop-shadow">
                Click anywhere on the seal to open
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
