import React, { useState, useRef, useEffect } from 'react';
import { weddingAudio } from '../utils/audio';
import { Volume2, VolumeX, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

interface InvitationOpeningProps {
  onNavigateToMain?: () => void;
}

export const InvitationOpening: React.FC<InvitationOpeningProps> = ({ onNavigateToMain }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Listen to audio status
    const unsubscribe = weddingAudio.subscribe((playing) => {
      setAudioPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenEnvelope = () => {
    if (hasStarted) return;
    setHasStarted(true);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Video play prevented:', err);
          setIsPlaying(true);
        });
    }

    // Start background romantic music if not already playing
    if (!weddingAudio.getStatus()) {
      weddingAudio.play();
    }
  };

  const handleReplay = () => {
    setIsCompleted(false);
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(console.warn);
      setIsPlaying(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsCompleted(true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration && video.currentTime >= video.duration - 0.3) {
      setIsCompleted(true);
    }
  };

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.toggle();
  };

  const handleGoToDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigateToMain) {
      onNavigateToMain();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060A08] text-[#F7F3E8] flex flex-col items-center justify-center overflow-hidden selection:bg-[#1B4332] selection:text-[#F7F3E8] py-4 px-4 sm:py-8">
      {/* Ambient glowing radial backdrop */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1B4332]/25 via-[#0A120E] to-[#040705] pointer-events-none"
        aria-hidden="true"
      />
      <div className="grain" aria-hidden="true" />

      {/* Top Floating Navigation Bar */}
      <header className="absolute top-4 inset-x-0 max-w-2xl mx-auto px-6 flex items-center justify-between z-40 pointer-events-auto">
        <button
          onClick={handleGoToDetails}
          className="btn-press flex items-center gap-2 text-xs sm:text-sm tracking-[0.2em] uppercase serif-title text-[#C2CEC2] hover:text-[#EDE6D3] transition-colors py-2 px-3 rounded-full bg-black/40 backdrop-blur-md border border-[#1B4332]/40"
        >
          <span>←</span>
          <span>Full Invitation</span>
        </button>

        <button
          onClick={handleToggleAudio}
          aria-label={audioPlaying ? 'Mute Music' : 'Play Music'}
          className="btn-press flex items-center gap-2 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-[#1B4332]/40 text-[#EDE6D3] hover:text-[#52B788] transition-colors"
        >
          {audioPlaying ? (
            <Volume2 className="w-4 h-4 text-[#52B788]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#C2CEC2]/70" />
          )}
        </button>
      </header>

      {/* Main Interactive Stage */}
      <div className="relative w-full max-w-[440px] aspect-[9/16] max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_80px_rgba(27,67,50,0.3)] border border-[#C5A869]/25 bg-black z-20">
        
        {/* Video Element */}
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}envelope_animation.mp4`}
          poster={`${import.meta.env.BASE_URL}envelope_poster.png`}
          playsInline
          webkit-playsinline="true"
          onEnded={handleVideoEnded}
          onTimeUpdate={handleTimeUpdate}
          onClick={!hasStarted ? handleOpenEnvelope : undefined}
          className="w-full h-full object-cover select-none cursor-pointer"
        />

        {/* Initial Overlay: Prompt to Open Envelope */}
        {!hasStarted && (
          <div
            onClick={handleOpenEnvelope}
            className="absolute inset-0 z-30 flex flex-col items-center justify-between p-8 bg-gradient-to-t from-black/80 via-transparent to-black/60 cursor-pointer select-none transition-opacity duration-500 hover:bg-black/30"
          >
            {/* Top Eyebrow */}
            <div className="text-center pt-8">
              <span className="serif-title text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A869] block mb-2 drop-shadow-md">
                You Are Cordially Invited
              </span>
              <h1 className="script-font text-4xl sm:text-5xl text-[#F7F3E8] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                Mateo & Clara
              </h1>
            </div>

            {/* Center Pulsing Call to Action Button */}
            <div className="flex flex-col items-center gap-4 pb-6">
              <div className="relative group">
                {/* Glowing ring pulse */}
                <div className="absolute -inset-2 rounded-full bg-[#52B788]/30 blur-md animate-pulse" />
                
                <button
                  type="button"
                  className="btn-press relative flex items-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#1B4332] to-[#255a43] text-[#F7F3E8] border border-[#C5A869]/40 shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:border-[#C5A869] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A869]" />
                  <span className="serif-title text-xs sm:text-sm tracking-[0.2em] uppercase font-medium">
                    Tap to Open Envelope
                  </span>
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-[#C2CEC2]/80 tracking-wider font-light drop-shadow">
                Click anywhere on the seal to break and open
              </p>
            </div>
          </div>
        )}

        {/* End Overlay: Once video finished, reveal the celebratory invitation card */}
        {isCompleted && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-between p-6 sm:p-8 bg-gradient-to-b from-black/85 via-black/80 to-[#0A120E]/95 backdrop-blur-[2px] transition-all duration-700 animate-in fade-in zoom-in-95">
            
            {/* Top Monogram */}
            <div className="text-center pt-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-[#C5A869]/40 flex items-center justify-center bg-[#1B4332]/40 shadow-inner">
                <span className="serif-title text-xs text-[#C5A869] tracking-widest">
                  C & M
                </span>
              </div>
              <span className="serif-title text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#9CAF9A] block mb-1">
                Holy Matrimony
              </span>
              <h2 className="script-font text-3xl sm:text-4xl text-[#F7F3E8] leading-tight">
                Mateo & Clara
              </h2>
            </div>

            {/* Center Event Highlights */}
            <div className="text-center space-y-3 px-4 py-4 rounded-xl bg-black/40 border border-[#1B4332]/30 w-full max-w-[320px]">
              <div className="serif-title text-xs sm:text-sm tracking-[0.2em] text-[#C5A869] uppercase font-medium">
                December 18, 2026
              </div>
              <div className="text-xs text-[#C2CEC2] tracking-wide">
                Friday at 3:30 in the Afternoon
              </div>
              <div className="w-8 h-[1px] bg-[#1B4332] mx-auto my-2" />
              <div className="text-xs text-[#F7F3E8]/90 font-light">
                Angelfields Nature Sanctuary
              </div>
              <div className="text-[11px] text-[#9CAF9A] tracking-wider uppercase serif-title">
                Tagaytay, Philippines
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-[320px] flex flex-col gap-2.5 pb-4">
              <button
                type="button"
                onClick={handleGoToDetails}
                className="btn-press w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#1B4332] to-[#2a684e] text-[#F7F3E8] border border-[#C5A869]/50 shadow-[0_8px_20px_rgba(0,0,0,0.6)] hover:border-[#C5A869] transition-all"
              >
                <span className="serif-title text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
                  View Full Invitation
                </span>
                <ArrowRight className="w-4 h-4 text-[#C5A869]" />
              </button>

              <button
                type="button"
                onClick={handleReplay}
                className="btn-press w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-black/40 hover:bg-black/60 text-[#C2CEC2] hover:text-[#F7F3E8] border border-white/10 transition-colors text-xs tracking-wider uppercase serif-title"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Animation</span>
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Bottom Sub-caption */}
      <footer className="mt-4 text-center z-20">
        <p className="text-[11px] sm:text-xs text-[#7A7062] tracking-[0.2em] uppercase serif-title">
          Celebrate with us • December 18, 2026
        </p>
      </footer>
    </div>
  );
};
