# Mateo & Clara — Wedding Invitation & RSVP

A responsive, editorial wedding invitation and RSVP web application for **Mateo & Clara**, celebrating their holy matrimony at **Angelfields Nature Sanctuary** in Tagaytay on **December 18, 2026**.

Crafted with a botanical garden aesthetic blending deep forest emerald (`#0D1512`, `#1B4332`), antique parchment cream (`#EDE6D3`), warm ivory (`#F7F3E8`), inscriptional **Cinzel** serif display typography, and romantic script calligraphy.

---

## ✨ Features

- **Split & Full-Width Hero Presentation**:
  - Natural, uncropped portrait framing on mobile and tablet devices.
  - Two-column split layout on desktop with the couple's portrait on the left and invitation on the right.
  - Floating calligraphy script with white & emerald botanical rose garland framing.
- **Background Music Player**:
  - Floating audio button with sound wave feedback playing the couple's soundtrack (*"Clara & Mateo"*).
  - Background audio state listener with persistent playback across sections.
- **Live Nuptial Countdown**:
  - Real-time ticking days, hours, minutes, and seconds countdown to the ceremony on December 18, 2026 at 3:30 PM PST.
- **Polaroid Gallery Marquee**:
  - Continuous 60fps auto-scrolling photo marquee with pause-on-hover and touch drag support.
  - Authentic Polaroid print styling: white cardstock frame, equal side borders, thicker top, and classic 4× wide bottom chin.
  - Dynamic center lens magnification effect (scales up to 1.18× with elevated drop shadow as photos pass the center viewport).
  - Built-in full-screen lightbox modal with keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
  - Preloaded with the couple's prenup photoshoot photos.
- **Deckled Torn Paper Section Dividers**:
  - Organic, handcrafted torn paper edge transitions between dark night, pure black, and parchment cream sections using SVG turbulence filters and layered drop shadows.
- **Program (Schedule of the Day)**:
  - Vertical timeline with hover-reactive emerald node markers, timestamps, and milestone descriptions.
- **Attire & Dress Code Guidelines**:
  - Interactive circular color swatches representing the forest-inspired evening palette (Forest Emerald, Olive Moss, Sage Green, Champagne Cream, Deep Velvet Black).
  - Spring-scale hover animations with origin-aware name tooltips.
- **Location & Venue Showcase**:
  - Angelfields Nature Sanctuary overview with direct Google Maps integration.
- **Calendar Integration**:
  - One-click export for **Google Calendar** and **Apple / iCal** (`.ics` generation).
- **Interactive RSVP System**:
  - In-page form with "Joyfully Accept" and "Regretfully Decline" attendance selectors.
  - Guest count, dietary restrictions, and personal wishes message box.
  - Client-side persistence and confirmation screen.
- **Bidirectional Scroll Reveals & Micro-interactions**:
  - GPU-accelerated scroll reveals using `IntersectionObserver` with smooth entry and exit transitions.
  - Emil Kowalski-standard tactile press feedback (`.btn-press`, `active:scale-[0.97]`).
  - Full support for `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Cinzel](https://fonts.google.com/specimen/Cinzel), [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Great Vibes](https://fonts.google.com/specimen/Great+Vibes)
- **Deployment Target**: Google Firebase Hosting / Static Web Hosting

---

## 📁 Project Structure

```
Wedding-invitation/
├── public/
│   ├── Couple_posing_for_portrait_outdoors_202609020934.jpeg  # Hero couple portrait
│   ├── floral_bouquet.png                                    # Garland accent graphic
│   └── prenup/                                               # Prenup gallery photos
├── src/
│   ├── assets/
│   │   └── audio/
│   │       └── clara-mateo.mp3                               # Wedding soundtrack
│   ├── components/
│   │   ├── Countdown.tsx                                     # Live countdown timer
│   │   ├── DetailsSection.tsx                                # Registry & footwear advice
│   │   ├── DressCode.tsx                                     # Color palette & attire guidelines
│   │   ├── FloralAccent.tsx                                  # Botanical floral garland clusters
│   │   ├── GalleryMarquee.tsx                                # Continuous Polaroid marquee & modal
│   │   ├── Hero.tsx                                          # Hero section & audio control
│   │   ├── LocationSection.tsx                               # Venue details & Google Maps
│   │   ├── RSVPSection.tsx                                   # In-page RSVP form & success state
│   │   ├── Timing.tsx                                        # Program & schedule timeline
│   │   ├── TornDivider.tsx                                   # Organic deckled paper SVG divider
│   │   └── Welcome.tsx                                       # Welcome message & calendar buttons
│   ├── data/
│   │   └── content.ts                                        # Single source of truth for all content
│   ├── hooks/
│   │   └── useScrollReveal.ts                                # Bidirectional scroll reveal hook
│   ├── utils/
│   │   └── audio.ts                                          # Audio playback singleton manager
│   ├── App.tsx                                               # Main page layout & orchestrator
│   ├── index.css                                             # Design tokens, fonts, & motion classes
│   └── main.tsx                                              # Application entry point
├── firebase.json                                             # Firebase Hosting configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/clydekeanu-rgb/clara-mateo.git
   cd clara-mateo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

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

## 🚀 Deployment (Google Firebase Hosting)

1. **Login to Firebase (one-time):**
   ```bash
   firebase login
   ```

2. **Link your Firebase project:**
   ```bash
   firebase use --add
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

---

## 🎨 Content Customization

All text, dates, schedule items, dress code swatches, venue details, and gallery photos are centralized in:

👉 **[`src/data/content.ts`](src/data/content.ts)**

- **Couple Names & Date**: Edit `couple_names` and `event_date`.
- **Hero Image**: Update `hero_image` path.
- **Gallery Photos**: Modify `gallery_images` array with photo sources and captions.
- **Schedule**: Add, remove, or modify items in `schedule`.
- **Dress Code Swatches**: Update colors, hex values, and labels in `dress_code_swatches`.
- **Venue Details**: Update `venue_name`, `venue_address`, and `venue_google_maps_url`.

---

## 📄 License

Private and personal project for Mateo & Clara's Wedding. All rights reserved.
