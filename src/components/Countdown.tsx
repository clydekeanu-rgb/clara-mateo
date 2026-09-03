import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface CountdownProps {
  targetDate?: string;
  title?: string;
  subtitle?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDate = '2026-12-18T15:30:00+08:00',
  title = 'Until We Say "I Do"',
  subtitle = 'Counting Down',
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown-section" className="relative w-full bg-[#0D1512] dark-texture text-[#F7F3E8] py-12 sm:py-16 px-6 text-center overflow-hidden">
      <div className="max-w-[640px] mx-auto relative z-10">
        {/* Subtitle */}
        <span className="text-[#9CAF9A] text-xs sm:text-sm tracking-[0.25em] uppercase serif-title block mb-2">
          {subtitle}
        </span>

        {/* Title */}
        <h3 className="serif-title text-2xl sm:text-3xl text-[#F7F3E8] font-medium tracking-[0.14em] mb-8 drop-shadow-sm">
          {title}
        </h3>

        {/* 4-Column Timer Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-[500px] mx-auto">
          {units.map((unit, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xs bg-[#141F1A]/85 border border-[#1B4332]/60 shadow-[0_4px_16px_rgba(0,0,0,0.35)] backdrop-blur-xs transition-all duration-300 hover:border-emerald-light/40 hover:-translate-y-0.5"
            >
              <span className="serif-title text-2xl sm:text-3xl md:text-4xl font-medium text-[#F7F3E8] leading-none mb-1.5 tabular-nums">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#9CAF9A] serif-title tracking-[0.2em] uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Delicate Heart Flourish */}
        <div className="flex items-center justify-center space-x-3 mt-10 text-[#EDE6D3]/30">
          <span className="w-10 h-[1px] bg-[#EDE6D3]/25" />
          <Heart className="w-3.5 h-3.5 fill-[#EDE6D3]/15 text-[#EDE6D3]/40" />
          <span className="w-10 h-[1px] bg-[#EDE6D3]/25" />
        </div>
      </div>
    </section>
  );
};
