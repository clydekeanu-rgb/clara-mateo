import React, { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onLoaded: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const targetProgressRef = useRef(0);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    const assetsToLoad: string[] = [
      // Splash screen assets
      `${import.meta.env.BASE_URL}crumpled_paper_bg.jpg`,
      `${import.meta.env.BASE_URL}curated_pages_logo.png`,

      // Primary envelope & intro assets
      `${import.meta.env.BASE_URL}envelope_poster.png`,
      `${import.meta.env.BASE_URL}envelope_animation.mp4`,
      `${import.meta.env.BASE_URL}Couple_posing_for_portrait_outdoors_202609020934.jpeg`,
      `${import.meta.env.BASE_URL}floral_bouquet.png`,
      `${import.meta.env.BASE_URL}floral_flank.png`,

      // Prenup gallery photos
      `${import.meta.env.BASE_URL}prenup/Couple_posing_for_photos_2K_2026090320384.jpeg`,
      `${import.meta.env.BASE_URL}prenup/Couple_posing_for_photos_2K_2026090320382.jpeg`,
      `${import.meta.env.BASE_URL}prenup/Couple_in_photo_collage_mood_2K_20260903204623.jpeg`,
      `${import.meta.env.BASE_URL}prenup/Couple_posing_for_photos_2K_2026090320381.jpeg`,
      `${import.meta.env.BASE_URL}prenup/Couple_in_photo_collage_mood_2K_2026090320463.jpeg`,
      `${import.meta.env.BASE_URL}prenup/232342.jpeg`,
      `${import.meta.env.BASE_URL}prenup/Couple_posing_for_portrait_outdoors_202609031806.jpeg`,
      `${import.meta.env.BASE_URL}prenup/Couple_posing_for_photos_2K_2026090320383.jpeg`,
    ];

    let completed = 0;
    const totalCount = assetsToLoad.length + 1; // +1 for fonts

    const updateProgress = () => {
      completed += 1;
      targetProgressRef.current = Math.min(100, Math.round((completed / totalCount) * 100));
    };

    // Preload web fonts
    if ('fonts' in document) {
      document.fonts.ready.then(updateProgress).catch(updateProgress);
    } else {
      updateProgress();
    }

    // Preload image/video assets
    assetsToLoad.forEach((src) => {
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = src;
        const onReady = () => {
          video.removeEventListener('canplaythrough', onReady);
          video.removeEventListener('error', onReady);
          updateProgress();
        };
        video.addEventListener('canplaythrough', onReady, { once: true });
        video.addEventListener('error', onReady, { once: true });
        // Fallback for video in case event takes too long
        setTimeout(onReady, 2500);
        video.load();
      } else {
        const img = new Image();
        img.src = src;
        if (img.complete) {
          updateProgress();
        } else {
          img.onload = updateProgress;
          img.onerror = updateProgress;
        }
      }
    });

    // Animate displayed progress smoothly with a luxury duration
    const startTime = Date.now();
    const minDurationMs = 1800;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeFraction = Math.min(1, elapsed / minDurationMs);

      setDisplayedProgress((prev) => {
        const maxAllowedByTime = timeFraction * 100;
        const target = Math.min(targetProgressRef.current, maxAllowedByTime);

        if (targetProgressRef.current >= 100 && timeFraction >= 1) {
          clearInterval(interval);
          if (!hasFinishedRef.current) {
            hasFinishedRef.current = true;
            setTimeout(() => {
              setIsFadingOut(true);
              setTimeout(() => {
                onLoaded();
              }, 700);
            }, 300);
          }
          return 100;
        }

        // Smoothly interpolate toward target
        const step = Math.max(0.5, (target - prev) * 0.25);
        const next = Math.min(target, prev + step);
        return Math.max(prev, Number(next.toFixed(1)));
      });
    }, 25);

    // Safety timeout: force completion after 6 seconds max
    const safetyTimeout = setTimeout(() => {
      targetProgressRef.current = 100;
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onLoaded]);

  return (
    <div
      aria-hidden={isFadingOut}
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center select-none transition-opacity duration-700 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 
        1. BACKGROUND: Authentic Crumpled Paper Background
        Asset: public/crumpled_paper_bg.jpg
      */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}crumpled_paper_bg.jpg')`,
        }}
        aria-hidden="true"
      >
        {/* Subtle warm artisanal lighting vignette to enhance paper creases */}
        <div className="absolute inset-0 bg-radial from-transparent via-amber-950/[0.02] to-amber-950/[0.09]" />
      </div>

      {/* 
        2. CENTERED SPLASH CONTENT:
        Logo in the middle of the screen at least 70% of screen width
        + Bottom Ring Circling Loading Animation
      */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-8">
        
        {/* 
          LOGO:
          - Centered in the middle of the screen
          - Mobile: at least 70% of screen width (w-[75vw])
          - Tablet & Desktop: 50% of screen width (md:w-[50vw])
          - mix-blend-mode: multiply for authentic ink-on-paper impression
        */}
        <div className="relative w-[75vw] md:w-[50vw] max-w-[650px] aspect-[1024/724] flex items-center justify-center">
          <img
            src={`${import.meta.env.BASE_URL}curated_pages_logo.png`}
            alt="Curated Pages"
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
            loading="eager"
          />
        </div>

        {/* 
          3. CIRCLING LOADING ANIMATION:
          - Bottom ring style positioned directly beneath the logo
          - Smooth spinning rotation with circular track, active arc, and subtle accent
        */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center justify-center" aria-label="Loading Curated Pages">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center">
            {/* Subtle background circular track */}
            <svg className="w-full h-full" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <circle
                cx="22"
                cy="22"
                r="18"
                stroke="#2B2620"
                strokeWidth="2"
                className="opacity-15"
              />
            </svg>

            {/* Circling active arc */}
            <svg
              className="absolute inset-0 w-full h-full animate-[spin_1.15s_cubic-bezier(0.4,0,0.2,1)_infinite]"
              viewBox="0 0 44 44"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="22"
                cy="22"
                r="18"
                stroke="#2B2620"
                strokeWidth="2.5"
                strokeDasharray="32 80"
                strokeLinecap="round"
              />
            </svg>

            {/* Inner subtle pulse accent dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#2B2620]/60 animate-ping" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
  );
};
