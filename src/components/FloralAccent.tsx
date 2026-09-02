import React from 'react';

interface FloralAccentProps {
  position?: 'hero-seam' | 'bottom-rsvp' | 'divider' | 'card-accent';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  id?: string;
}

/**
 * Realistic Emerald & White Rose Wedding Floral Garland Graphic
 * Features blooming white garden roses, deep dark emerald green velvet roses, and eucalyptus
 */
export const FloralAccent: React.FC<FloralAccentProps> = ({
  position = 'hero-seam',
  size = 'full',
  className = '',
  id,
}) => {
  return (
    <div
      id={id}
      className={`relative w-full flex items-center justify-center select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full transition-all duration-300 flex justify-center overflow-visible">
        <img
          src="/floral_bouquet.png"
          alt="Emerald green and ivory rose wedding floral garland"
          className="w-full min-w-full h-auto object-cover sm:object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.4)] scale-[1.02]"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};
