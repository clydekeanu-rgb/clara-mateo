import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryMarqueeProps {
  images?: GalleryImage[];
}

export const GalleryMarquee: React.FC<GalleryMarqueeProps> = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // If no images provided, provide default curated set
  const photoList = images.length > 0 ? images : [
    {
      src: "/prenup/Couple_posing_for_photos_2K_2026090320384.jpeg",
      alt: "Mateo & Clara walking hand-in-hand and laughing on the sunlit veranda",
    },
    {
      src: "/prenup/Couple_posing_for_photos_2K_2026090320382.jpeg",
      alt: "Intimate forehead embrace framed by gentle garden blossoms",
    },
    {
      src: "/prenup/Couple_in_photo_collage_mood_2K_20260903204623.jpeg",
      alt: "Playful jump together along the open scenic mountain road",
    },
    {
      src: "/prenup/Couple_posing_for_photos_2K_2026090320381.jpeg",
      alt: "Loving embrace beneath the floral garden wedding arch",
    },
    {
      src: "/prenup/Couple_in_photo_collage_mood_2K_2026090320463.jpeg",
      alt: "Golden hour hilltop embrace holding delicate wildflowers",
    },
    {
      src: "/prenup/232342.jpeg",
      alt: "Joyful laughter as Mateo lifts Clara on the open countryside trail",
    },
    {
      src: "/prenup/Couple_posing_for_portrait_outdoors_202609031806.jpeg",
      alt: "Tender moment holding each other in the rustic pavilion with hanging ribbons",
    },
    {
      src: "/prenup/Couple_posing_for_photos_2K_2026090320383.jpeg",
      alt: "Sunset glow overlooking the verdant countryside from the porch",
    },
  ];

  // Triplicate list for infinite seamless marquee loop
  const displayPhotos = [...photoList, ...photoList, ...photoList];

  // Auto-scroll loop with center detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastTimestamp = performance.now();
    const speed = 0.55; // Pixels per frame at 60fps

    const updateCenterCards = () => {
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const cards = container.querySelectorAll<HTMLElement>('.gallery-card');

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distFromCenter = Math.abs(containerCenterX - cardCenterX);
        const maxDist = containerRect.width * 0.45;

        // Calculate proximity ratio: 1.0 at center, 0 at edges
        const proximity = Math.max(0, 1 - distFromCenter / maxDist);

        // Dynamic scale: 0.92 at edge to 1.18 at center
        const scale = 0.92 + proximity * 0.26;
        const opacity = 0.65 + proximity * 0.35;
        const zIndex = Math.round(proximity * 10);

        card.style.transform = `scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(2);
        card.style.zIndex = `${zIndex}`;
        if (proximity > 0.6) {
          card.classList.add('shadow-[0_22px_50px_rgba(0,0,0,0.95)]', 'ring-1', 'ring-emerald-light/40');
          card.classList.remove('shadow-[0_10px_25px_rgba(0,0,0,0.7)]');
        } else {
          card.classList.remove('shadow-[0_22px_50px_rgba(0,0,0,0.95)]', 'ring-1', 'ring-emerald-light/40');
          card.classList.add('shadow-[0_10px_25px_rgba(0,0,0,0.7)]');
        }
      });
    };

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isPaused && container) {
        scrollPosRef.current += (speed * (delta / 16.67));
        const halfScroll = container.scrollWidth / 3;

        if (scrollPosRef.current >= halfScroll) {
          scrollPosRef.current -= halfScroll;
        }

        container.scrollLeft = scrollPosRef.current;
      }

      updateCenterCards();
      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isPaused, displayPhotos.length]);

  // Handle keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') {
        setSelectedImage((prev) => (prev !== null ? (prev + 1) % photoList.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) => (prev !== null ? (prev - 1 + photoList.length) % photoList.length : null));
      }
    },
    [selectedImage, photoList.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      id="gallery-section"
      className="relative w-full bg-black text-[#F7F3E8] overflow-hidden select-none"
      aria-label="Photo Gallery"
    >
      {/* Smooth Gradient Transition from Countdown (#0D1512) to Black (#000000) */}
      <div
        className="w-full h-16 sm:h-24 bg-gradient-to-b from-[#0D1512] via-[#060A08] to-black pointer-events-none"
        aria-hidden="true"
      />

      {/* Marquee Carousel Container */}
      <div
        className="reveal-init relative w-full py-8 sm:py-12 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Subtle Edge Vignettes to softly fade edges into the black background */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

        {/* Scrollable Track */}
        <div
          ref={containerRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-hidden no-scrollbar px-6 py-6 will-change-transform cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayPhotos.map((photo, index) => {
            const originalIndex = index % photoList.length;
            return (
              <div
                key={`${originalIndex}-${index}`}
                onClick={() => setSelectedImage(originalIndex)}
                className="gallery-card shrink-0 w-48 sm:w-56 md:w-60 bg-[#FAF8F5] px-3 pt-4 pb-12 sm:px-3.5 sm:pt-5 sm:pb-14 rounded-xs border border-[#E5E0D8] shadow-[0_10px_25px_rgba(0,0,0,0.7)] cursor-pointer transition-[transform,opacity,box-shadow] duration-200 group relative select-none"
                role="button"
                tabIndex={0}
                aria-label={`View photo ${originalIndex + 1}: ${photo.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedImage(originalIndex);
                  }
                }}
              >
                {/* 1:1 Square Photo Area */}
                <div className="w-full aspect-square relative overflow-hidden bg-[#1c1c1c] border border-black/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                  />
                  {/* Subtle Emulsion Sheen */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Hover Zoom Icon */}
                  <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Full size photo modal"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F3E8] transition-colors cursor-pointer z-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-light"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev !== null ? (prev - 1 + photoList.length) % photoList.length : null));
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-[#F7F3E8] transition-all cursor-pointer z-50 focus:outline-hidden"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage((prev) => (prev !== null ? (prev + 1) % photoList.length : null));
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/15 text-[#F7F3E8] transition-all cursor-pointer z-50 focus:outline-hidden"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Active Photo Container: Polaroid Presentation in Lightbox */}
          <div
            className="relative max-w-md sm:max-w-lg w-full px-3.5 pt-4 pb-12 sm:px-4 sm:pt-5 sm:pb-16 bg-[#FAF8F5] rounded-xs border border-[#E5E0D8] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full aspect-square relative overflow-hidden bg-[#1c1c1c] border border-black/10 shadow-inner">
              <img
                src={photoList[selectedImage].src}
                alt={photoList[selectedImage].alt}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-xs sm:text-sm text-[#574F44] font-body italic tracking-wide">
              {photoList[selectedImage].alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
