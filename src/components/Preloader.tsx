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

    // Animate displayed progress smoothly with a minimum luxury duration
    const startTime = Date.now();
    const minDurationMs = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeFraction = Math.min(1, elapsed / minDurationMs);

      setDisplayedProgress((prev) => {
        // Progress cannot rush to 100% faster than minDurationMs
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
            }, 350);
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
      className={`fixed inset-0 z-[120] bg-[#0D1512] flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Dark ambient grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Monogram Wax Seal Circle */}
        <div className="relative mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#C5A869]/50 bg-[#1B4332]/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(82,183,136,0.25)]">
            <span className="serif-title text-lg sm:text-xl text-[#C5A869] tracking-widest font-medium">
              C &amp; M
            </span>
          </div>
          {/* Subtle pulse ring */}
          <div className="absolute -inset-1.5 rounded-full border border-[#52B788]/25 animate-pulse pointer-events-none" />
        </div>

        {/* Names & Event Date */}
        <h1 className="script-font text-3xl sm:text-4xl text-[#FFFDF9] mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Mateo &amp; Clara
        </h1>
        <p className="serif-title text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C5A869] mb-8">
          December 18, 2026
        </p>

        {/* Minimalist Gold Progress Bar */}
        <div className="w-48 sm:w-56 flex flex-col items-center gap-2.5">
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#52B788] via-[#C5A869] to-[#F7F3E8] transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(197,168,105,0.7)]"
              style={{ width: `${Math.min(100, Math.max(0, displayedProgress))}%` }}
            />
          </div>

          <div className="w-full flex justify-between items-center text-[10px] serif-title tracking-[0.2em] text-[#C2CEC2]/75 uppercase">
            <span>Loading Invitation</span>
            <span className="font-mono text-[#C5A869]">{Math.floor(displayedProgress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
