/**
 * Centralized Wedding Content & Template Configuration
 * 
 * Reusable template for Curated Pages portfolio.
 * Future client weddings can be swapped in by simply updating these values
 * without modifying any component or layout code.
 */

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface SwatchItem {
  name: string;
  hex: string;
  border?: string;
}

export interface WeddingContent {
  // Couple & Branding
  partner_1: string;
  partner_2: string;
  site_tagline: string;
  
  // Date & Time
  event_date: string;
  event_date_short: string;
  event_time_ceremony: string;
  event_iso_date: string; // YYYY-MM-DD for calendar links
  
  // Venue
  venue_name: string;
  venue_city: string;
  venue_address: string;
  venue_google_maps_url: string;
  
  // Media Assets
  hero_image: string;
  hero_image_alt: string;
  table_setting_image: string;
  table_setting_image_alt: string;
  venue_image: string;
  venue_image_alt: string;
  
  // Sections Copy
  welcome: {
    salutation: string;
    intro: string;
    sentiment: string;
    closing: string;
  };
  
  schedule_heading: string;
  schedule_subtitle: string;
  schedule: ScheduleItem[];
  
  dress_code_heading: string;
  dress_code_subtitle: string;
  dress_code_intro: string;
  dress_code_swatches: SwatchItem[];
  
  location_heading: string;
  location_subtitle: string;
  location_intro: string;
  
  details_heading: string;
  details_subtitle: string;
  details_paragraphs: string[];
  
  rsvp_heading: string;
  rsvp_subtitle: string;
  rsvp_instructions: string;
  rsvp_button_text: string;
  rsvp_closing_script: string;
  
  // Contact & Registry links (optional)
  registry_link?: string;
  contact_email?: string;
}

export const weddingContent: WeddingContent = {
  partner_1: "Mateo",
  partner_2: "Clara",
  site_tagline: "A Curated Pages Invitation",
  
  event_date: "December 18, 2026",
  event_date_short: "12.18.2026",
  event_time_ceremony: "3:30 PM",
  event_iso_date: "2026-12-18T15:30:00",
  
  venue_name: "Angelfields Nature Sanctuary",
  venue_city: "Tagaytay, Cavite, Philippines",
  venue_address: "Santa Rosa - Tagaytay Road, Silang, Cavite 4118, Philippines",
  venue_google_maps_url: "https://maps.google.com/?q=Angelfields+Nature+Sanctuary+Tagaytay+Philippines",
  
  // Curated moody aesthetic photography from Unsplash & couple portrait
  hero_image: "/Couple_posing_for_portrait_outdoors_202609020934.jpeg",
  hero_image_alt: "Mateo & Clara smiling together outdoors in romantic porch setting",
  
  table_setting_image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80",
  table_setting_image_alt: "Elegant wedding banquet table with deep emerald accents and gold tableware",
  
  venue_image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1600&q=80",
  venue_image_alt: "Angelfields Nature Sanctuary grounds and grand estate in Tagaytay at dusk",
  
  welcome: {
    salutation: "Dear family and friends,",
    intro: "With joyful hearts, we invite you to join us as we exchange our vows and celebrate our holy matrimony.",
    sentiment: "It would mean the world to us to share this sacred day surrounded by the people we love most.",
    closing: "We cannot wait to celebrate with you amidst the cool garden breeze of Tagaytay.",
  },
  
  schedule_heading: "Timing",
  schedule_subtitle: "Schedule of the Day",
  schedule: [
    {
      time: "3:00 PM",
      title: "Guest Arrival",
      description: "Join us for welcome refreshments at the sanctuary garden while taking in the serene surroundings before the ceremony begins.",
    },
    {
      time: "3:30 PM",
      title: "Nuptial Ceremony",
      description: "The moment we exchange our sacred vows, rings, and say our heartfelt \"I do\" before God and our dearest loved ones.",
    },
    {
      time: "5:00 PM",
      title: "Sunset Cocktails & Photos",
      description: "Enjoy sunset canapés and cocktails on the lawn while our photographers capture memories of our shared celebration.",
    },
    {
      time: "6:30 PM",
      title: "Grand Reception",
      description: "We gather for our grand entrance, heartfelt family toasts, dinner banquet, and celebratory traditions.",
    },
    {
      time: "9:30 PM",
      title: "Party & Send-off",
      description: "Cutting the cake, music, dancing, and celebratory send-off under the starlit Tagaytay sky.",
    },
  ],
  
  dress_code_heading: "Dress Code",
  dress_code_subtitle: "Attire",
  dress_code_intro: "We would be honored if you dressed in Formal Filipiniana / Barong Tagalog or evening formal wear in our palette:",
  dress_code_swatches: [
    { name: "Barong Ecru", hex: "#F7F3E8", border: "rgba(27, 67, 50, 0.2)" },
    { name: "Forest Emerald", hex: "#1B4332", border: "rgba(247, 243, 232, 0.2)" },
    { name: "Sage Mist", hex: "#9CAF9A", border: "rgba(247, 243, 232, 0.3)" },
    { name: "Warm Cream", hex: "#EDE6D3", border: "rgba(27, 67, 50, 0.2)" },
    { name: "Midnight Black", hex: "#0D1512", border: "rgba(247, 243, 232, 0.3)" },
  ],
  
  location_heading: "Location",
  location_subtitle: "Venue",
  location_intro: "We will be celebrating our special day at:",
  
  details_heading: "Details",
  details_subtitle: "A Few Kind Reminders",
  details_paragraphs: [
    "In lieu of boxed gifts, a monetary blessing toward our new home and the start of our married life together would be deeply appreciated.",
    "The venue features garden walkways and Tagaytay evenings can be pleasantly breezy. We recommend comfortable footwear and a light wrap or blazer for the outdoor reception.",
  ],
  
  rsvp_heading: "RSVP",
  rsvp_subtitle: "Kindly Respond",
  rsvp_instructions: "Please let us know if you will be joining our celebration by filling out the form below on or before November 15, 2026.",
  rsvp_button_text: "Send RSVP",
  rsvp_closing_script: "We can't wait to celebrate with you in Tagaytay!",
  
  contact_email: "rsvp@mateoandclara.ph",
};
