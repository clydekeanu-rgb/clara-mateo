import React, { useState, useEffect } from 'react';
import { WeddingContent } from '../data/content';
import { FloralAccent } from './FloralAccent';
import { CheckCircle2, Send, AlertCircle, Heart, User, Users, Utensils, MessageSquare } from 'lucide-react';

interface RSVPSectionProps {
  content: WeddingContent;
}

interface RSVPFormData {
  fullName: string;
  attending: 'yes' | 'no' | '';
  guestCount: number;
  dietaryNotes: string;
  message: string;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ content }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    fullName: '',
    attending: 'yes',
    guestCount: 1,
    dietaryNotes: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Load existing RSVP from localStorage if user previously submitted
  useEffect(() => {
    try {
      const savedRSVP = localStorage.getItem('curated_pages_wedding_rsvp');
      if (savedRSVP) {
        const parsed = JSON.parse(savedRSVP);
        setFormData(parsed);
        setStatus('success');
      }
    } catch {
      // Ignore local storage read errors
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.attending) {
      setStatus('error');
      setErrorMessage('Please select whether you will be attending.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulate reliable dispatch & store locally for demo
    setTimeout(() => {
      try {
        localStorage.setItem('curated_pages_wedding_rsvp', JSON.stringify(formData));
      } catch {
        // Safe fallback
      }
      setStatus('success');
    }, 800);
  };

  const handleEditResponse = () => {
    setStatus('idle');
  };

  return (
    <section className="relative w-full bg-[#0D1512] dark-texture text-[#F7F3E8] pt-20 sm:pt-28 md:pt-32 pb-24 sm:pb-32 px-6 overflow-hidden">
      <div className="max-w-[640px] mx-auto text-center relative z-10">
        {/* Section Subtitle */}
        <span className="text-[#9CAF9A] text-xs sm:text-sm tracking-[0.25em] uppercase serif-title block mb-3">
          {content.rsvp_subtitle}
        </span>

        {/* Section Heading */}
        <h2 className="serif-title text-3xl sm:text-4xl md:text-5xl text-[#F7F3E8] font-normal tracking-[0.15em] mb-4">
          {content.rsvp_heading}
        </h2>

        {/* Date & Time Recap */}
        <div className="inline-flex items-center justify-center space-x-2 text-emerald-light text-xs sm:text-sm serif-title tracking-wider mb-6">
          <span>{content.event_date}</span>
          <span className="opacity-60">•</span>
          <span>{content.event_time_ceremony}</span>
        </div>

        {/* Instruction copy */}
        <p className="font-body text-base sm:text-lg text-[#F7F3E8]/85 leading-relaxed font-light mb-12 max-w-lg mx-auto">
          {content.rsvp_instructions}
        </p>

        {/* In-page RSVP Form or Success State */}
        {status === 'success' ? (
          <div className="bg-[#141F1A]/90 border border-[#1B4332] rounded-xs p-8 sm:p-12 text-center shadow-xl relative backdrop-blur-xs">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1B4332]/40 text-emerald-light border border-emerald-light/30 mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <h3 className="serif-title text-xl sm:text-2xl text-[#F7F3E8] font-normal mb-3">
              {formData.attending === 'yes' ? 'Response Received with Joy!' : 'Response Received'}
            </h3>
            
            <p className="font-body text-base sm:text-lg text-[#F7F3E8]/85 font-light leading-relaxed mb-6">
              {formData.attending === 'yes'
                ? `Thank you, ${formData.fullName}. We look forward to celebrating together with you (Party of ${formData.guestCount}).`
                : `Thank you, ${formData.fullName}. We will miss you dearly and appreciate you letting us know.`}
            </p>

            <button
              type="button"
              onClick={handleEditResponse}
              className="text-[11px] sm:text-xs serif-title uppercase tracking-widest text-[#9CAF9A] hover:text-[#F7F3E8] underline transition-colors cursor-pointer"
            >
              Update or Change Response
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#141F1A]/90 border border-[#1B4332] rounded-xs p-6 sm:p-10 text-left shadow-2xl backdrop-blur-xs space-y-6"
            noValidate
          >
            {/* Error banner */}
            {status === 'error' && errorMessage && (
              <div className="flex items-center gap-3 p-4 rounded bg-red-950/60 border border-red-800/60 text-red-200 text-sm font-body">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Field: Full Name */}
            <div>
              <label
                htmlFor="rsvp-full-name"
                className="block text-xs sm:text-sm serif-title tracking-widest uppercase text-[#9CAF9A] mb-2"
              >
                Full Name <span className="text-emerald-light">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CAF9A]/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="rsvp-full-name"
                  type="text"
                  required
                  placeholder="e.g. Katherine & Jonathan Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#0D1512]/90 border border-[#1B4332] rounded-xs text-[#F7F3E8] placeholder:text-[#F7F3E8]/30 focus:outline-none focus:border-emerald-light focus:ring-1 focus:ring-emerald-light transition-all font-body text-base sm:text-lg"
                />
              </div>
            </div>

            {/* Field: Attending? Yes / No */}
            <div>
              <label className="block text-xs sm:text-sm serif-title tracking-widest uppercase text-[#9CAF9A] mb-2">
                Will you be attending? <span className="text-emerald-light">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`py-3 px-4 rounded-xs border text-center serif-title text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                    formData.attending === 'yes'
                      ? 'bg-[#1B4332] border-emerald-light text-[#F7F3E8] shadow-[0_0_12px_rgba(27,67,50,0.5)]'
                      : 'bg-[#0D1512]/60 border-[#1B4332]/60 text-[#F7F3E8]/70 hover:border-emerald-light/50'
                  }`}
                >
                  Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`py-3 px-4 rounded-xs border text-center serif-title text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                    formData.attending === 'no'
                      ? 'bg-[#1B4332] border-emerald-light text-[#F7F3E8] shadow-[0_0_12px_rgba(27,67,50,0.5)]'
                      : 'bg-[#0D1512]/60 border-[#1B4332]/60 text-[#F7F3E8]/70 hover:border-emerald-light/50'
                  }`}
                >
                  Regretfully Declines
                </button>
              </div>
            </div>

            {/* Field: Number of Guests (Only if attending) */}
            {formData.attending === 'yes' && (
              <div>
                <label
                  htmlFor="rsvp-guest-count"
                  className="block text-xs sm:text-sm serif-title tracking-widest uppercase text-[#9CAF9A] mb-2"
                >
                  Total Number of Guests in Party
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CAF9A]/60">
                    <Users className="w-4 h-4" />
                  </div>
                  <select
                    id="rsvp-guest-count"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) || 1 })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0D1512]/90 border border-[#1B4332] rounded-xs text-[#F7F3E8] focus:outline-none focus:border-emerald-light focus:ring-1 focus:ring-emerald-light transition-all font-body text-base sm:text-lg cursor-pointer"
                  >
                    <option value={1}>1 Guest (Just Myself)</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>
              </div>
            )}

            {/* Field: Dietary Notes */}
            {formData.attending === 'yes' && (
              <div>
                <label
                  htmlFor="rsvp-dietary"
                  className="block text-xs sm:text-sm serif-title tracking-widest uppercase text-[#9CAF9A] mb-2"
                >
                  Dietary Preferences or Allergies <span className="text-[#9CAF9A]/60 text-xs font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-[#9CAF9A]/60">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <input
                    id="rsvp-dietary"
                    type="text"
                    placeholder="e.g. Vegetarian, Gluten-free, Nut allergy"
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#0D1512]/90 border border-[#1B4332] rounded-xs text-[#F7F3E8] placeholder:text-[#F7F3E8]/30 focus:outline-none focus:border-emerald-light focus:ring-1 focus:ring-emerald-light transition-all font-body text-base sm:text-lg"
                  />
                </div>
              </div>
            )}

            {/* Field: Message / Note */}
            <div>
              <label
                htmlFor="rsvp-message"
                className="block text-xs sm:text-sm serif-title tracking-widest uppercase text-[#9CAF9A] mb-2"
              >
                Message for the Couple <span className="text-[#9CAF9A]/60 text-xs font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-3.5 pointer-events-none text-[#9CAF9A]/60">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  placeholder="Share a wish or sweet memory..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-[#0D1512]/90 border border-[#1B4332] rounded-xs text-[#F7F3E8] placeholder:text-[#F7F3E8]/30 focus:outline-none focus:border-emerald-light focus:ring-1 focus:ring-emerald-light transition-all font-body text-base sm:text-lg resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto min-w-[200px] inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1B4332] hover:bg-[#255a43] border border-emerald-light/40 text-[#F7F3E8] serif-title text-xs sm:text-sm tracking-[0.2em] uppercase rounded-xs transition-all duration-300 shadow-lg hover:shadow-[#1B4332]/40 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <span>Sending RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{content.rsvp_button_text}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Closing Line in Script */}
        <p className="script-font text-4xl sm:text-5xl md:text-6xl text-[#F7F3E8]/95 tracking-wide mt-16 sm:mt-20 leading-tight">
          "{content.rsvp_closing_script}"
        </p>

        {/* Floral Cluster at the bottom */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <FloralAccent position="bottom-rsvp" size="lg" />
        </div>

        {/* Footer Credit & Template Information */}
        <div className="mt-14 pt-8 border-t border-[#1B4332]/40 text-[#9CAF9A]/70 text-[11px] sm:text-xs serif-title tracking-[0.22em] uppercase flex flex-col items-center justify-center gap-1.5">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-4 h-[1px] bg-[#1B4332]" />
            <span>A Curated Pages Invitation</span>
            <span className="inline-block w-4 h-[1px] bg-[#1B4332]" />
          </div>
          <span className="text-[#9CAF9A]/50 text-[10px] tracking-[0.25em]">
            {content.event_date_short}
          </span>
        </div>
      </div>
    </section>
  );
};
