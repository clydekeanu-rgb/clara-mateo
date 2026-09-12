import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WeddingContent } from '../data/content';
import {
  Camera,
  UploadCloud,
  Hash,
  Copy,
  Check,
  QrCode,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface PhotoSharingSectionProps {
  content: WeddingContent;
}

export interface GuestPhoto {
  id: string;
  guestName: string;
  caption: string;
  imageUrl: string;
  timestamp: string;
  isNew?: boolean;
}

const STORAGE_KEY = 'clara_mateo_guest_photos_v1';

const SEED_GUEST_PHOTOS: GuestPhoto[] = [
  {
    id: 'seed-1',
    guestName: 'Sofia & Liam',
    caption: 'The sweetest ceremony under the Tagaytay breeze! Congratulations Mateo & Clara! 🥂💍',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Today, 3:45 PM',
  },
  {
    id: 'seed-2',
    guestName: 'Tita Elena & Family',
    caption: 'So blessed to witness your sacred union. Clara, you look ethereal! ❤️',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Today, 4:10 PM',
  },
  {
    id: 'seed-3',
    guestName: 'Marcus D.',
    caption: 'Sunset cocktails at Angelfields lawn. Best wedding vibes ever! 🌿✨',
    imageUrl: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Today, 5:15 PM',
  },
  {
    id: 'seed-4',
    guestName: 'Chloe & The Bridesmaids',
    caption: "Clara's walk down the aisle had us all in tears! Love you both so much! 🥹💕",
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Today, 5:30 PM',
  },
  {
    id: 'seed-5',
    guestName: 'Uncle Roberto',
    caption: 'Mateo, welcome to the married club! Beautiful evening at the pavilion. 🍷',
    imageUrl: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Today, 6:40 PM',
  },
  {
    id: 'seed-6',
    guestName: 'Dave & Nina',
    caption: 'Sparklers ready for the couple send-off! Best night! ✨',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80',
    timestamp: 'Today, 7:15 PM',
  },
];

// Client-side image resize and JPEG compression for fast performance and localStorage storage
const compressImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDimension = 1200;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.84);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load selected image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

export const PhotoSharingSection: React.FC<PhotoSharingSectionProps> = ({ content }) => {
  const { photo_sharing } = content;

  // Photos State: Seeds + User uploaded photos
  const [photos, setPhotos] = useState<GuestPhoto[]>(SEED_GUEST_PHOTOS);

  // Form State
  const [guestName, setGuestName] = useState('');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStage, setUploadStage] = useState<'idle' | 'compressing' | 'drive' | 'sheets' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Lightbox Modal State
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Interactive Tools State
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Marquee auto-scroll tracking
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load stored guest uploads on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: GuestPhoto[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos([...parsed, ...SEED_GUEST_PHOTOS]);
        }
      }
    } catch {
      // Graceful fallback if localStorage is disabled or corrupted
    }
  }, []);

  // Save new user upload to localStorage (keeping up to 8 recent user uploads)
  const persistUserUpload = (newPhoto: GuestPhoto) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const existing: GuestPhoto[] = stored ? JSON.parse(stored) : [];
      const updated = [newPhoto, ...existing].slice(0, 8);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage quota or privacy mode handling
    }
  };

  // Marquee Continuous Auto-Scroll Animation
  useEffect(() => {
    let lastTimestamp = performance.now();
    const speed = 0.55; // pixels per frame at 60fps

    const animateMarquee = (timestamp: number) => {
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const step = speed * (delta / 16.67);

      const track = marqueeTrackRef.current;
      if (track && !isMarqueePaused) {
        scrollPosRef.current += step;
        const oneThird = track.scrollWidth / 3;
        if (oneThird > 0 && scrollPosRef.current >= oneThird) {
          scrollPosRef.current -= oneThird;
        }
        track.scrollLeft = scrollPosRef.current;
      }

      animFrameIdRef.current = requestAnimationFrame(animateMarquee);
    };

    animFrameIdRef.current = requestAnimationFrame(animateMarquee);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isMarqueePaused, photos]);

  // Handle File Selection
  const handleFileChange = async (file: File) => {
    setFormError(null);
    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }

    try {
      setUploadStage('compressing');
      setFileName(file.name);
      const compressedDataUrl = await compressImageFile(file);
      setSelectedImage(compressedDataUrl);
      setUploadStage('idle');
    } catch {
      setFormError('Could not process the image. Please try another photo.');
      setUploadStage('idle');
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // Handle Form Submission (Simulating Google Drive & Google Sheets backend upload)
  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!guestName.trim()) {
      setFormError('Please enter your name or family name.');
      return;
    }

    if (!selectedImage) {
      setFormError('Please select a photo to share.');
      return;
    }

    // Step 1: Simulate uploading to Google Drive
    setUploadStage('drive');
    await new Promise((res) => setTimeout(res, 750));

    // Step 2: Simulate logging to Google Sheets guestbook
    setUploadStage('sheets');
    await new Promise((res) => setTimeout(res, 650));

    // Step 3: Create new Photo entry
    const newEntry: GuestPhoto = {
      id: `guest-${Date.now()}`,
      guestName: guestName.trim(),
      caption: caption.trim() || 'Shared with love for Clara & Mateo ✨',
      imageUrl: selectedImage,
      timestamp: 'Just now',
      isNew: true,
    };

    // Update state immediately & prepend to marquee
    setPhotos((prev) => [newEntry, ...prev]);
    persistUserUpload(newEntry);

    // Reset Form
    setGuestName('');
    setCaption('');
    setSelectedImage(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    // Step 4: Show success celebration toast
    setUploadStage('success');
    setSuccessToast(`Thank you, ${newEntry.guestName}! Your photo is live in the gallery.`);

    setTimeout(() => {
      setUploadStage('idle');
    }, 2800);

    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  // Hashtag copy
  const handleCopyHashtag = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(photo_sharing.hashtag);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Lightbox keyboard controls
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
      }
    },
    [activeLightboxIndex, photos.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Triple the photos array for a seamless infinite loop
  const marqueeItems = [...photos, ...photos, ...photos];

  return (
    <section
      id="guest-photo-sharing"
      className="w-full bg-cream paper-texture text-ink pt-16 sm:pt-24 pb-20 sm:pb-28 overflow-hidden"
    >
      <div className="w-full max-w-4xl mx-auto px-5 sm:px-6">
        {/* Top Gold & Emerald Divider */}
        <div className="w-16 h-[1px] bg-[#1B4332]/25 mx-auto mb-10" />

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="reveal-init text-[#574F44] text-xs sm:text-sm tracking-[0.25em] uppercase serif-title block mb-3">
            {photo_sharing.subtitle}
          </span>

          <h2
            data-reveal-delay="50"
            className="reveal-init serif-title text-3xl sm:text-4xl md:text-5xl text-[#1B4332] font-normal tracking-[0.15em] mb-4"
          >
            {photo_sharing.heading}
          </h2>

          <p
            data-reveal-delay="90"
            className="reveal-init font-body text-base sm:text-lg text-[#2B2620]/85 leading-relaxed font-light"
          >
            {photo_sharing.intro}
          </p>
        </div>

        {/* PRIMARY INTERACTIVE CARD: Direct In-Page Upload Form */}
        <div
          data-reveal-delay="130"
          className="reveal-scale-init relative p-6 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-xl border border-black/5 shadow-[0_16px_40px_rgba(27,67,50,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] mb-14"
        >
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#1B4332]/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="serif-title text-xl text-[#1B4332] font-semibold tracking-wider">
                  Post Your Photo
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#574F44] font-light">
                  Upload candids &amp; memories directly to our live wedding gallery
                </p>
              </div>
            </div>

            {/* Quick table QR button */}
            <button
              type="button"
              onClick={() => setShowQr(!showQr)}
              className="btn-press self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs serif-title tracking-wider text-[#1B4332] bg-[#1B4332]/8 hover:bg-[#1B4332]/12 border border-[#1B4332]/12 cursor-pointer transition-all"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{showQr ? 'Close QR' : 'Table QR Code'}</span>
            </button>
          </div>

          {/* Collapsible QR Code Card */}
          {showQr && (
            <div className="mb-8 p-6 rounded-2xl bg-[#EDE6D3]/40 border border-[#1B4332]/15 text-center max-w-sm mx-auto animate-fadeIn">
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-[#1B4332]/20 shadow-sm flex items-center justify-center">
                <svg className="w-full h-full text-[#1B4332]" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="10" y="10" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="18" y="18" width="10" height="10" rx="2" fill="currentColor" />
                  <rect x="64" y="10" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="72" y="18" width="10" height="10" rx="2" fill="currentColor" />
                  <rect x="10" y="64" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                  <rect x="18" y="72" width="10" height="10" rx="2" fill="currentColor" />
                  <rect x="44" y="14" width="8" height="8" rx="1" />
                  <rect x="44" y="28" width="8" height="8" rx="1" />
                  <rect x="14" y="44" width="8" height="8" rx="1" />
                  <rect x="28" y="44" width="8" height="8" rx="1" />
                  <rect x="44" y="44" width="12" height="12" rx="2" />
                  <rect x="64" y="44" width="8" height="8" rx="1" />
                  <rect x="78" y="44" width="8" height="8" rx="1" />
                  <rect x="44" y="64" width="8" height="8" rx="1" />
                  <rect x="58" y="64" width="8" height="8" rx="1" />
                  <rect x="44" y="78" width="8" height="8" rx="1" />
                  <rect x="64" y="72" width="10" height="10" rx="2" />
                  <rect x="78" y="64" width="8" height="8" rx="1" />
                  <rect x="78" y="78" width="8" height="8" rx="1" />
                </svg>
              </div>
              <p className="serif-title text-xs tracking-wider text-[#1B4332] font-semibold mt-3">
                Scan with Phone Camera
              </p>
              <p className="font-body text-xs text-[#574F44] font-light mt-0.5">
                Guests at reception tables can scan to instantly share on their phone
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmitPost} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Guest Name Field */}
              <div>
                <label className="block text-xs serif-title tracking-wider uppercase text-[#1B4332] font-semibold mb-2">
                  Your Name or Family Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g., Sofia & Liam, Auntie Maria"
                  className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#1B4332]/20 text-[#2B2620] placeholder-[#574F44]/50 focus:outline-hidden focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/15 text-sm font-body transition-all"
                />
              </div>

              {/* Message / Caption Field */}
              <div>
                <label className="block text-xs serif-title tracking-wider uppercase text-[#1B4332] font-semibold mb-2">
                  Heartfelt Caption or Wish <span className="text-[#574F44]/60 normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g., The most breathtaking vows! So happy for you two!"
                  className="w-full px-4 py-3 rounded-2xl bg-white/90 border border-[#1B4332]/20 text-[#2B2620] placeholder-[#574F44]/50 focus:outline-hidden focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/15 text-sm font-body transition-all"
                />
              </div>
            </div>

            {/* Photo Selection / Dropzone */}
            <div>
              <label className="block text-xs serif-title tracking-wider uppercase text-[#1B4332] font-semibold mb-2">
                Select Photo <span className="text-red-600">*</span>
              </label>

              {/* Hidden Native File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              {!selectedImage ? (
                /* Dropzone empty state */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-3xl p-7 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${
                    isDragging
                      ? 'border-[#1B4332] bg-[#1B4332]/10 scale-[1.01]'
                      : 'border-[#1B4332]/25 bg-[#FAF8F5] hover:bg-white hover:border-[#1B4332]/45'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center mb-3">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="serif-title text-sm text-[#1B4332] font-semibold tracking-wide mb-1">
                    Click to select a photo, or drag and drop
                  </p>
                  <p className="font-body text-xs text-[#574F44] font-light">
                    Supports high-resolution camera photos (JPG, PNG, HEIC, WebP)
                  </p>
                </div>
              ) : (
                /* Image Preview Card */
                <div className="relative p-4 rounded-2xl bg-[#FAF8F5] border border-[#1B4332]/20 flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/10 shrink-0 border border-black/10">
                    <img
                      src={selectedImage}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="serif-title text-sm text-[#1B4332] font-semibold truncate">
                      {fileName || 'Selected wedding photo'}
                    </p>
                    <p className="font-body text-xs text-emerald-700 font-light flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ready for live gallery
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setFileName('');
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="mt-2 text-xs serif-title text-red-600 hover:text-red-800 underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Remove or choose another
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-body animate-fadeIn">
                {formError}
              </div>
            )}

            {/* Submit Action Button with Simulated Upload States */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={uploadStage !== 'idle'}
                className="btn-press flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs serif-title tracking-widest uppercase font-semibold bg-gradient-to-r from-[#1B4332] via-[#255a43] to-[#2d6a4f] text-white border border-emerald-light/40 shadow-[0_8px_24px_rgba(27,67,50,0.3),inset_0_1px_0_rgba(255,255,255,0.3)] hover:scale-[1.01] active:scale-98 transition-all duration-200 disabled:opacity-85 disabled:cursor-not-allowed cursor-pointer"
              >
                {uploadStage === 'compressing' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Optimizing photo...</span>
                  </>
                )}
                {uploadStage === 'drive' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Syncing to Google Drive...</span>
                  </>
                )}
                {uploadStage === 'sheets' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging to Google Sheets...</span>
                  </>
                )}
                {uploadStage === 'success' && (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Added to Gallery!</span>
                  </>
                )}
                {uploadStage === 'idle' && (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Share to Live Gallery</span>
                  </>
                )}
              </button>

              <div className="text-right sm:text-left text-[11px] font-body text-[#574F44]/80">
                <span>Instant live feed • No login or app required</span>
              </div>
            </div>

            {/* Success Toast Banner */}
            {successToast && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-body flex items-center gap-3 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold serif-title text-xs tracking-wide text-emerald-950">
                    Uploaded Successfully!
                  </p>
                  <p className="text-xs text-emerald-800">{successToast}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* SECTION: Live Guest Shared Photo Marquee */}
        <div className="mt-16 pt-6">
          {/* Marquee Header & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 px-1">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600" />
              </span>
              <h3 className="serif-title text-xl sm:text-2xl text-[#1B4332] font-semibold tracking-wider">
                Live Guest Gallery
              </h3>
            </div>
            <span className="font-body text-xs text-[#574F44] tracking-wide">
              {photos.length} memories shared by loved ones • Tap any photo to enlarge
            </span>
          </div>

          {/* Marquee Carousel Track */}
          <div
            className="relative -mx-5 sm:-mx-8 overflow-hidden py-4"
            onMouseEnter={() => setIsMarqueePaused(true)}
            onMouseLeave={() => setIsMarqueePaused(false)}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
          >
            {/* Soft Edge Fade Vignettes */}
            <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-cream to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-cream to-transparent z-20 pointer-events-none" />

            <div
              ref={marqueeTrackRef}
              className="flex items-stretch gap-4 sm:gap-6 overflow-x-hidden no-scrollbar px-6 will-change-transform cursor-grab active:cursor-grabbing"
              style={{ scrollBehavior: 'auto' }}
            >
              {marqueeItems.map((photo, idx) => {
                const originalIndex = idx % photos.length;
                return (
                  <div
                    key={`${photo.id}-${idx}`}
                    onClick={() => setActiveLightboxIndex(originalIndex)}
                    className="shrink-0 w-64 sm:w-72 bg-white/90 backdrop-blur-md rounded-3xl p-3 sm:p-4 border border-black/5 shadow-[0_8px_24px_rgba(27,67,50,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_16px_36px_rgba(27,67,50,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo from ${photo.guestName}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveLightboxIndex(originalIndex);
                      }
                    }}
                  >
                    {/* Photo Container */}
                    <div className="w-full aspect-4/3 relative overflow-hidden rounded-2xl bg-black/5 mb-3.5 border border-black/5">
                      <img
                        src={photo.imageUrl}
                        alt={photo.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* NEW Badge if posted this session */}
                      {photo.isNew && (
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-emerald-700 text-white text-[10px] serif-title tracking-wider font-bold shadow-md uppercase">
                          New ✨
                        </div>
                      )}

                      {/* Hover Zoom Icon */}
                      <div className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-black/60 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-xs">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Guest & Caption Meta */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="serif-title text-sm text-[#1B4332] font-bold tracking-wide truncate">
                          {photo.guestName}
                        </span>
                        <span className="text-[11px] font-body text-[#574F44]/75 shrink-0">
                          {photo.timestamp}
                        </span>
                      </div>

                      <p className="font-body text-xs sm:text-sm text-[#2B2620]/85 italic line-clamp-2 leading-relaxed">
                        &ldquo;{photo.caption}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION: Supplementary Social Hashtag & Prompts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-12 text-left">
          {/* Card 1: Official Wedding Hashtag */}
          <div
            data-reveal-delay="160"
            className="reveal-scale-init p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-black/5 shadow-[0_12px_32px_rgba(27,67,50,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] mb-3.5">
                <Hash className="w-4 h-4" />
              </div>
              <h4 className="serif-title text-lg text-[#1B4332] font-bold tracking-wider mb-2">
                {photo_sharing.hashtag_title}
              </h4>
              <p className="font-body text-sm text-[#2B2620]/80 font-light leading-relaxed mb-6">
                {photo_sharing.hashtag_description}
              </p>
            </div>

            {/* Apple Pill Hashtag & Copy Button Dock */}
            <div className="inline-flex items-center justify-between gap-2 p-1.5 bg-[#EDE6D3]/60 border border-[#1B4332]/15 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]">
              <span className="serif-title text-xs sm:text-sm font-bold tracking-wider text-[#1B4332] px-3 select-all">
                {photo_sharing.hashtag}
              </span>
              <button
                type="button"
                onClick={handleCopyHashtag}
                className={`btn-press flex items-center gap-1.5 px-4 py-2 rounded-full text-xs serif-title tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  copied
                    ? 'bg-emerald-light text-white shadow-sm'
                    : 'bg-[#1B4332] text-white hover:bg-[#255a43] shadow-sm'
                }`}
                aria-label="Copy wedding hashtag"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Moments to Capture */}
          <div
            data-reveal-delay="190"
            className="reveal-scale-init p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-black/5 shadow-[0_12px_32px_rgba(27,67,50,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] mb-3.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="serif-title text-lg text-[#1B4332] font-bold tracking-wider mb-2">
                {photo_sharing.prompts_title}
              </h4>
              <div className="space-y-2.5 mt-3">
                {photo_sharing.prompts.map((prompt, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#2B2620]/85 font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] shrink-0" />
                    <span>{prompt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL: High-Resolution Guest Photo View */}
      {activeLightboxIndex !== null && photos[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged guest photo"
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[#F7F3E8] backdrop-blur-xl border border-white/20 transition-all cursor-pointer z-50 shadow-lg"
            aria-label="Close enlarged photo"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-[#F7F3E8] transition-all cursor-pointer z-50 active:scale-90 shadow-lg"
            aria-label="Previous guest photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-[#F7F3E8] transition-all cursor-pointer z-50 active:scale-90 shadow-lg"
            aria-label="Next guest photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Center Card Presentation */}
          <div
            className="relative max-w-lg w-full bg-[#FAF8F5] rounded-3xl p-4 sm:p-6 border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-[60vh] overflow-hidden rounded-2xl bg-black/10 flex items-center justify-center">
              <img
                src={photos[activeLightboxIndex].imageUrl}
                alt={photos[activeLightboxIndex].caption}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="mt-4 pt-2">
              <div className="flex items-center justify-between gap-3 mb-1.5">
                <h3 className="serif-title text-lg text-[#1B4332] font-bold tracking-wider">
                  {photos[activeLightboxIndex].guestName}
                </h3>
                <span className="text-xs font-body text-[#574F44]">
                  {photos[activeLightboxIndex].timestamp}
                </span>
              </div>
              <p className="font-body text-sm text-[#2B2620]/90 italic leading-relaxed">
                &ldquo;{photos[activeLightboxIndex].caption}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
