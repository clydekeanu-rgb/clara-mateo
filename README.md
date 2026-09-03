# Mateo & Clara — Wedding Invitation & RSVP

A modern, responsive, and elegant wedding invitation web application for **Mateo & Clara**, celebrating their holy matrimony at **Angelfields Nature Sanctuary** in Tagaytay on **December 18, 2026**.

Crafted with an editorial botanical aesthetic combining deep forest emerald (`#0D1512`, `#1B4332`), antique parchment cream (`#EDE6D3`), warm ivory (`#F7F3E8`), inscriptional **Cinzel** typography, and romantic script calligraphy.

---

## ✨ Key Features

- **Split & Full-Width Hero Presentation**:
  - Uncropped, natural portrait framing on mobile and tablet devices.
  - Two-column split layout on desktop with the couple's portrait on the left and content on the right.
  - Delicate botanical floral garland framing the couple's names.
- **Background Music Player**:
  - Persistent floating audio toggle in the top corner playing the romantic soundtrack (*"Clara & Mateo"*).
  - Smooth pause/play state listener with tactile press feedback.
- **Live Nuptial Countdown**:
  - Real-time precision countdown ticking Days, Hours, Minutes, and Seconds until December 18, 2026 at 3:30 PM PST.
- **Polaroid Gallery Marquee**:
  - Continuous 60fps auto-scrolling photo marquee with pause-on-hover and touch drag support.
  - Authentic Polaroid print styling: crisp white frame, equal side margins, thicker top, and classic 4× wide bottom chin.
  - Dynamic center magnification lens effect (scales up to 1.18× with elevated drop shadow as photos glide through center).
  - Built-in full-screen lightbox modal with keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
  - Preloaded with authentic prenup photoshoot photos.
- **Deckled Torn Paper Section Dividers**:
  - Organic, handcrafted deckled paper edge transitions between dark night, pure black, and cream sections using SVG turbulence filters and layered drop shadows.
- **Program (Schedule of the Day)**:
  - Vertical timeline with hover-reactive node markers and event descriptions.
- **Attire & Dress Code Guidelines**:
  - Interactive circular color swatches representing the forest-inspired evening palette (Forest Emerald, Olive Moss, Sage Green, Champagne Cream, Deep Velvet Black).
  - Spring-scale hover animations with origin-aware name tooltips.
- **Location & Venue Showcase**:
  - Angelfields Nature Sanctuary overview with direct Google Maps integration.
- **Calendar Integrations**:
  - Instant one-click export for **Google Calendar** and **Apple / iCal** (`.ics` generation).
- **Interactive RSVP System**:
  - Seamless in-page form with "Joyfully Accept" and "Regretfully Decline" attendance pills.
  - Guest count, dietary restrictions, and personal wishes message box.
  - Client-side persistence and instant feedback.
- **Bidirectional Scroll Reveals & Micro-interactions**:
  - GPU-accelerated scroll reveals using `IntersectionObserver` with smooth entry/exit transitions.
  - Emil Kowalski-standard tactile press feedback (`.btn-press`, `active:scale-[0.97]`).
  - Full support for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom typography and color tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Cinzel](https://fonts.google.com/specimen/Cinzel), [Alex Brush](https://fonts.google.com/specimen/Alex+Brush), [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)

---

## 📁 Project Structure

```
Wedding-invitation/
├── public/
│   ├── Couple_posing_for_portrait_outdoors_202609020934.jpeg  # Hero couple photo
│   ├── floral_bouquet.png                                    # Garland accent asset
│   └── prenup/                                               # Prenup gallery photos
├── src/
│   ├── assets/
│   │   └── audio/
│   │       └── clara-mateo.mp3                               # Wedding soundtrack
│   ├── components/
│   │   ├── Countdown.tsx                                     # Live countdown timer
│   │   ├── DetailsSection.tsx                                # Registry & footwear notes
│   │   ├── DressCode.tsx                                     # Color palette & attire guidelines
│   │   ├── FloralAccent.tsx                                  # Botanical floral clusters
│   │   ├── GalleryMarquee.tsx                                # Continuous Polaroid marquee & modal
│   │   ├── Hero.tsx                                          # Hero section & audio control
│   │   ├── LocationSection.tsx                               # Venue details & Google Maps
│   │   ├── RSVPSection.tsx                                   # In-page RSVP form & success view
│   │   ├── Timing.tsx                                        # Program & schedule timeline
│   │   ├── TornDivider.tsx                                   # Organic torn paper SVG divider
│   │   └── Welcome.tsx                                       # Welcome message & calendar links
│   ├── data/
│   │   └── content.ts                                        # Single source of truth for all text & images
│   ├── hooks/
│   │   └── useScrollReveal.ts                                # Bidirectional scroll reveal hook
│   ├── utils/
│   │   └── audio.ts                                          # Audio playback singleton manager
│   ├── App.tsx                                               # Main page layout & orchestrator
│   ├── index.css                                             # Design tokens, fonts, & motion classes
│   └── main.tsx                                              # Application entry point
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (or `pnpm` / `yarn`)

### Installation & Local Development

1. **Clone or navigate to the repository:**
   ```bash
   cd Wedding-invitation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to preview the invitation.

4. **Type Check & Lint:**
   ```bash
   npm run lint
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

6. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🎨 Customizing Content

All text, dates, schedule milestones, dress code swatches, venue details, and gallery photos are centralized in a single file:

👉 **[`src/data/content.ts`](src/data/content.ts)**

- **Couple Names & Date**: Modify `couple_names` and `event_date`.
- **Hero Image**: Update `hero_image` path.
- **Gallery Photos**: Edit `gallery_images` with paths to your photos and custom captions.
- **Program Milestones**: Add or modify events in the `schedule` array.
- **Dress Code**: Update colors, hex values, and labels in `dress_code_swatches`.
- **Venue & Map**: Change `venue_name`, `venue_address`, and `venue_google_maps_url`.

---

## 📄 License

Private and personal project for Mateo & Clara's Wedding. All rights reserved.
