import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Check,
  X,
  ChevronDown,
  ArrowUp,
  ArrowLeft,
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Play,
  Pause,
  Film,
  Eye,
  Layers,
  Upload,
  Trash2,
  SlidersHorizontal,
} from 'lucide-react';

/**
 * ============================================================================
 * HOLIDAY THEME CONFIGURATIONS — NOEL & CO. EDITORIAL SUITE
 * ============================================================================
 * Curated color tokens, typography accents, particle modes, and bespoke copy
 * used inside the interactive 3D Living Envelope experience.
 */
const HOLIDAY_THEMES = {
  christmas: {
    id: 'christmas',
    label: 'Christmas',
    badge: 'Winter Edition',
    title: 'A Candlelit Christmas Soirée',
    subtitle: 'AN INTIMATE EVENING OF WINTER WARMTH & REVELRY',
    hostNote:
      'As winter settles softly over the city, Noel & Co. warmly invites you to gather by candlelight for seasonal tasting courses, aged vintages, and fireside conversation.',
    date: 'December 20, 2026',
    time: '7:30 PM until Midnight',
    location: 'The Conservatory, 14 Mercer St.',
    dressCode: 'Black Tie & Velvet Accents',
    colors: {
      pageBg: '#FAF7F2',
      pageText: '#1C1917',
      mutedText: '#4A5D58',
      primary: '#1B3B2B', // Deep Pine Green
      secondary: '#8B2635', // Crimson
      accent: '#C5A059', // Antique Champagne Gold
      accentLight: '#E6D2A6',
      envelopeBody: '#1B3B2B',
      envelopeFlap: '#234B37',
      envelopePocket: '#142D20',
      waxSeal: '#8B2635',
      waxSealRim: '#A62F41',
      cardBg: '#FFFDF9',
      cardBorder: '#C5A059',
      particleColors: ['#FFFFFF', '#F3E5C2', '#C5A059'],
    },
    particleMode: 'snow',
    crestSymbol: '✦',
  },
  nye: {
    id: 'nye',
    label: "New Year's Eve",
    badge: 'Midnight Edition',
    title: 'Midnight Champagne Gala',
    subtitle: 'RINGING IN A NEW CHAPTER IN BRUSHED GOLD & STARLIGHT',
    hostNote:
      'Join Noel & Co. above the skyline as the final hours of the year slip away. Expect vintage cuvées, live chamber strings, and a midnight toast beneath the glass atrium.',
    date: 'December 31, 2026',
    time: '9:00 PM — Midnight Toast',
    location: 'The Astral Penthouse, Fifth Ave.',
    dressCode: 'Midnight Formal & Metallic Foil',
    colors: {
      pageBg: '#F6F4EF',
      pageText: '#1C1917',
      mutedText: '#4B5262',
      primary: '#141822', // Midnight Obsidian
      secondary: '#2A3042', // Slate Indigo
      accent: '#C5A059', // Champagne Gold
      accentLight: '#E5D3A8',
      envelopeBody: '#141822',
      envelopeFlap: '#1E2433',
      envelopePocket: '#0E1118',
      waxSeal: '#9E7B34',
      waxSealRim: '#C5A059',
      cardBg: '#FFFDF8',
      cardBorder: '#C5A059',
      particleColors: ['#C5A059', '#E2E8F0', '#FDE68A'],
    },
    particleMode: 'sparkle',
    crestSymbol: '✧',
  },
  diwali: {
    id: 'diwali',
    label: 'Diwali',
    badge: 'Festival of Lights',
    title: 'Festival of Lights Celebration',
    subtitle: 'AN EVENING OF GOLDEN LAMPS, SPICE & RADIANT HARMONY',
    hostNote:
      'In celebration of light triumphing over shadow, Noel & Co. welcomes you to a courtyard illuminated by a thousand hand-poured diyas, artisanal sweets, and celebratory music.',
    date: 'November 8, 2026',
    time: '7:00 PM onwards',
    location: 'The Lotus Courtyard, Heritage Quarter',
    dressCode: 'Festive Silk & Royal Jewel Tones',
    colors: {
      pageBg: '#FDF8F1',
      pageText: '#1C1917',
      mutedText: '#5E3A58',
      primary: '#2D132C', // Royal Plum
      secondary: '#B45309', // Marigold Saffron
      accent: '#C5A059', // Warm Antique Gold
      accentLight: '#F3D899',
      envelopeBody: '#2D132C',
      envelopeFlap: '#3D1A3B',
      envelopePocket: '#220E21',
      waxSeal: '#8B2635',
      waxSealRim: '#A62F41',
      cardBg: '#FFFDF9',
      cardBorder: '#C5A059',
      particleColors: ['#F59E0B', '#FDE68A', '#FB923C'],
    },
    particleMode: 'diya',
    crestSymbol: '❖',
  },
  autumn: {
    id: 'autumn',
    label: 'Autumn Harvest',
    badge: 'Harvest Table',
    title: 'The Harvest Table Gathering',
    subtitle: 'A SEASONAL FEAST OF GRATITUDE, HEARTH & OAK',
    hostNote:
      'Gathered around a single long cedar table dressed in linen and heirloom botanicals, Noel & Co. invites you to share an unhurried evening of harvest fare and warm fellowship.',
    date: 'November 26, 2026',
    time: '5:30 PM — Fireside Supper',
    location: 'Meadowbrook Orchard House',
    dressCode: 'Autumnal Tailored & Cashmere',
    colors: {
      pageBg: '#FAF6F0',
      pageText: '#1C1917',
      mutedText: '#5C4D45',
      primary: '#6E2B19', // Rich Terracotta
      secondary: '#8B2635', // Crimson Berry
      accent: '#C5A059', // Antique Gold
      accentLight: '#E5CFA3',
      envelopeBody: '#6E2B19',
      envelopeFlap: '#82341F',
      envelopePocket: '#582113',
      waxSeal: '#1B3B2B',
      waxSealRim: '#28543E',
      cardBg: '#FFFDF9',
      cardBorder: '#C5A059',
      particleColors: ['#C26D38', '#D4A03E', '#9A4624'],
    },
    particleMode: 'leaves',
    crestSymbol: '❦',
  },
};

/**
 * ============================================================================
 * CATEGORY METADATA & DYNAMIC HERO HEADINGS
 * ============================================================================
 */
const CATEGORY_META = {
  all: {
    id: 'all',
    label: 'All Templates',
    eyebrow: 'STATIONERY & DIGITAL ATELIER • NOEL & CO.',
    heading: 'All Invitation Templates',
    subtitle:
      'Explore our complete collection of interactive 3D living-envelope stationery across Holiday, Kids Birthday, Adult Birthday, and Wedding suites.',
    defaultTags: 'Holiday, Celebration',
  },
  holiday: {
    id: 'holiday',
    label: 'Holiday',
    eyebrow: 'SEASONAL & FESTIVE COLLECTION • NOEL & CO.',
    heading: 'Holiday Invitations',
    subtitle:
      'Tactile candlelit stationery crafted for Christmas soirées, New Year’s Eve midnight toasts, Diwali festivals of light, and Autumn Harvest gatherings.',
    defaultTags: "Christmas, New Year's Eve, Diwali",
  },
  'kids-bday': {
    id: 'kids-bday',
    label: 'Kids Bday',
    eyebrow: 'WHIMSICAL MILESTONES & PARTIES • NOEL & CO.',
    heading: 'Kids Birthday Invitations',
    subtitle:
      'Playful keepsake cards bursting with pastel balloons, golden birthday crowns, festive bunting, and joyful confetti for little milestone celebrations.',
    defaultTags: 'Kids Birthday, Milestone Party',
  },
  'adult-bday': {
    id: 'adult-bday',
    label: 'Adult Bday',
    eyebrow: 'COCKTAIL HOURS & MILESTONE TOASTS • NOEL & CO.',
    heading: 'Adult Birthday Invitations',
    subtitle:
      'Editorial illustrated stationery and spirited cocktail-hour suites designed for milestone birthdays, rooftop dinners, and late-night toasts.',
    defaultTags: 'Milestone Birthday, Cocktail Soirée',
  },
  wedding: {
    id: 'wedding',
    label: 'Wedding',
    eyebrow: 'FINE STATIONERY & BRIDAL SUITE • NOEL & CO.',
    heading: 'Wedding Invitations',
    subtitle:
      'Architectural cotton-paper suites, debossed portrait cameos, and heirloom monogrammed envelopes curated for timeless ceremonies and receptions.',
    defaultTags: 'Classic Wedding, Reception',
  },
};

const VALID_CATEGORY_IDS = ['all', 'holiday', 'kids-bday', 'adult-bday', 'wedding'];

/**
 * ============================================================================
 * DATA-DRIVEN TEMPLATE LIBRARY ARRAY (`INITIAL_INVITATION_TEMPLATES`)
 * ============================================================================
 * Each category holds its signature interactive invitation in Slot 01 plus
 * two extensible empty template slots (Slots 02 & 03) ready for new designs.
 */
const INITIAL_INVITATION_TEMPLATES = [
  // --- HOLIDAY CATEGORY ---
  {
    id: 'holiday-01',
    category: 'holiday',
    slotNumber: '01',
    status: 'active',
    isBuiltIn: true,
    templateType: 'holiday',
    title: 'Noel & Co. Holiday Inbox Invitation',
    editionLabel: 'Signature Festive Suite',
    description:
      'Tactile 3D inbox envelope with embossed gold wax seal, multi-holiday themes (Christmas, NYE, Diwali, Harvest), Sample Video preview, and RSVP.',
    tags: ['Christmas', "New Year's Eve", 'Diwali', 'Harvest'],
    themeColor: '#1B3B2B',
    accentColor: '#C5A059',
    sealColor: '#8B2635',
    videoSrc: '',
    defaultHolidayId: 'christmas',
  },
  {
    id: 'holiday-02',
    category: 'holiday',
    slotNumber: '02',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#1B3B2B',
    accentColor: '#C5A059',
    sealColor: '#8B2635',
    videoSrc: '',
  },
  {
    id: 'holiday-03',
    category: 'holiday',
    slotNumber: '03',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#8B2635',
    accentColor: '#C5A059',
    sealColor: '#1B3B2B',
    videoSrc: '',
  },

  // --- KIDS BIRTHDAY CATEGORY ---
  {
    id: 'kids-01',
    category: 'kids-bday',
    slotNumber: '01',
    status: 'active',
    isBuiltIn: true,
    templateType: 'kids-bday',
    title: 'Balloon & Crown Jamboree',
    editionLabel: 'Playful Milestone Edition',
    description:
      'Scalloped ivory cardstock adorned with pastel bunting flags, helium balloons, tiered birthday cake, striped envelope liner, and golden star seal.',
    tags: ['Kids Birthday', '5th Birthday', 'Balloons & Cake', 'Confetti'],
    themeColor: '#1f4e78',
    accentColor: '#f4b942',
    sealColor: '#f4b942',
    videoSrc: '',
  },
  {
    id: 'kids-02',
    category: 'kids-bday',
    slotNumber: '02',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#1f4e78',
    accentColor: '#C5A059',
    sealColor: '#f4b942',
    videoSrc: '',
  },
  {
    id: 'kids-03',
    category: 'kids-bday',
    slotNumber: '03',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#7a2048',
    accentColor: '#C5A059',
    sealColor: '#f4b942',
    videoSrc: '',
  },

  // --- ADULT BIRTHDAY CATEGORY ---
  {
    id: 'adult-01',
    category: 'adult-bday',
    slotNumber: '01',
    status: 'active',
    isBuiltIn: true,
    templateType: 'birthday',
    title: 'Another Round — Adult Birthday',
    editionLabel: 'Milestone Birthday Suite',
    description:
      'Hand-drawn ink bottle & cocktail illustration on warm peach cardstock over a matte charcoal terrazzo backdrop with 3D envelope reveal.',
    tags: ['40th Birthday', 'Milestone', 'Cocktail Soirée', 'Terrazzo'],
    themeColor: '#222220',
    accentColor: '#edc6a8',
    sealColor: '#181818',
    videoSrc: '',
  },
  {
    id: 'adult-02',
    category: 'adult-bday',
    slotNumber: '02',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#1C1917',
    accentColor: '#C5A059',
    sealColor: '#8B2635',
    videoSrc: '',
  },
  {
    id: 'adult-03',
    category: 'adult-bday',
    slotNumber: '03',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#2D132C',
    accentColor: '#C5A059',
    sealColor: '#8B2635',
    videoSrc: '',
  },

  // --- WEDDING CATEGORY ---
  {
    id: 'wedding-01',
    category: 'wedding',
    slotNumber: '01',
    status: 'active',
    isBuiltIn: true,
    templateType: 'wedding',
    title: 'Glimpse Into Forever — Classic Wedding',
    editionLabel: 'Architectural Cameo Suite',
    description:
      'Scalloped-corner cotton cardstock with double-stepped debossed frame, vertical oval couple portrait cameo, and champagne-lined 3D envelope.',
    tags: ['Classic Wedding', 'Cameo Portrait', 'Ivory Linen', '1920s Editorial'],
    themeColor: '#2c2a27',
    accentColor: '#C5A059',
    sealColor: '#dcd3c3',
    videoSrc: '',
  },
  {
    id: 'wedding-02',
    category: 'wedding',
    slotNumber: '02',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#1B3B2B',
    accentColor: '#C5A059',
    sealColor: '#8B2635',
    videoSrc: '',
  },
  {
    id: 'wedding-03',
    category: 'wedding',
    slotNumber: '03',
    status: 'empty',
    isBuiltIn: false,
    title: '',
    editionLabel: '',
    description: '',
    tags: [],
    themeColor: '#1C1917',
    accentColor: '#C5A059',
    sealColor: '#8B2635',
    videoSrc: '',
  },
];

/**
 * Curated luxury color swatches for the "+ Add Design to Slot" builder modal.
 */
const STUDIO_SWATCHES = [
  { name: 'Deep Pine Green', value: '#1B3B2B', seal: '#8B2635' },
  { name: 'Festive Crimson', value: '#8B2635', seal: '#1B3B2B' },
  { name: 'Crisp Charcoal', value: '#1C1917', seal: '#8B2635' },
  { name: 'Royal Plum', value: '#2D132C', seal: '#C5A059' },
  { name: 'Autumn Terracotta', value: '#6E2B19', seal: '#1B3B2B' },
];

/**
 * ============================================================================
 * ORNATE CORNER FILIGREE SVG COMPONENT
 * ============================================================================
 */
const CornerFiligree = ({ color = '#C5A059', positionClass = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`nc-filigree ${positionClass}`}
    aria-hidden="true"
  >
    <path
      d="M4 60V16C4 9.37258 9.37258 4 16 4H60"
      stroke={color}
      strokeWidth="1.2"
      strokeOpacity="0.85"
    />
    <path
      d="M10 52V20C10 14.4772 14.4772 10 20 10H52"
      stroke={color}
      strokeWidth="0.75"
      strokeOpacity="0.55"
    />
    <circle cx="16" cy="16" r="2.2" fill={color} fillOpacity="0.85" />
    <path
      d="M22 10C22 14.5 18.5 18 14 18"
      stroke={color}
      strokeWidth="0.9"
      strokeOpacity="0.75"
    />
  </svg>
);

/**
 * ============================================================================
 * SUBTLE PRINTMAKER CORNER REGISTRATION MARKS (FOR EMPTY TEMPLATE SLOTS)
 * ============================================================================
 */
const RegistrationMarks = ({ color = '#C5A059' }) => (
  <>
    <svg
      viewBox="0 0 24 24"
      className="nc-reg-mark nc-reg-tl"
      aria-hidden="true"
    >
      <path d="M12 2V10M2 12H10" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke={color} strokeWidth="0.9" />
    </svg>
    <svg
      viewBox="0 0 24 24"
      className="nc-reg-mark nc-reg-tr"
      aria-hidden="true"
    >
      <path d="M12 2V10M14 12H22" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke={color} strokeWidth="0.9" />
    </svg>
    <svg
      viewBox="0 0 24 24"
      className="nc-reg-mark nc-reg-bl"
      aria-hidden="true"
    >
      <path d="M12 14V22M2 12H10" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke={color} strokeWidth="0.9" />
    </svg>
    <svg
      viewBox="0 0 24 24"
      className="nc-reg-mark nc-reg-br"
      aria-hidden="true"
    >
      <path d="M12 14V22M14 12H22" stroke={color} strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke={color} strokeWidth="0.9" />
    </svg>
  </>
);

/**
 * ============================================================================
 * MATTE CHARCOAL TERRAZZO BACKDROP SVG PATTERN ("ANOTHER ROUND" EDITION)
 * ============================================================================
 */
const TerrazzoBackdrop = ({ patternId = 'noel-terrazzo-pattern', className = '' }) => (
  <svg
    className={`nc-no-pointer ${className}`}
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern
        id={patternId}
        width="320"
        height="320"
        patternUnits="userSpaceOnUse"
      >
        <rect width="320" height="320" fill="#222220" />
        {/* Large & Medium Organic Terrazzo Chips */}
        <polygon points="24,18 46,12 54,29 33,38 19,31" fill="#f3f0e8" />
        <polygon points="108,26 126,19 135,34 118,44" fill="#e8c3a5" />
        <polygon points="196,14 222,22 214,42 190,35" fill="#8c8e8a" />
        <polygon points="274,28 298,20 306,41 285,49 268,39" fill="#f3f0e8" />
        <polygon points="62,68 79,61 86,77 68,84" fill="#3c3c3a" />
        <polygon points="148,64 174,58 180,79 156,88 143,76" fill="#f3f0e8" />
        <polygon points="236,72 254,66 260,84 240,91" fill="#b5ada2" />
        <polygon points="18,116 42,108 50,129 27,139 14,128" fill="#8c8e8a" />
        <polygon points="94,112 119,104 128,124 106,134 91,123" fill="#f3f0e8" />
        <polygon points="186,118 205,110 212,128 192,135" fill="#e8c3a5" />
        <polygon points="268,114 294,108 302,131 276,140 262,127" fill="#3c3c3a" />
        <polygon points="54,168 76,160 84,179 62,188" fill="#e8c3a5" />
        <polygon points="134,164 162,156 170,178 146,189 129,176" fill="#b5ada2" />
        <polygon points="218,168 244,161 251,182 226,190" fill="#f3f0e8" />
        <polygon points="292,174 312,167 316,186 296,192" fill="#8c8e8a" />
        <polygon points="22,224 48,216 55,238 30,247 16,236" fill="#f3f0e8" />
        <polygon points="104,220 124,213 132,231 112,240" fill="#3c3c3a" />
        <polygon points="178,226 206,218 214,241 188,250 173,238" fill="#f3f0e8" />
        <polygon points="262,224 286,216 293,237 269,246" fill="#e8c3a5" />
        <polygon points="66,274 92,266 99,288 74,297 60,285" fill="#b5ada2" />
        <polygon points="146,276 168,269 175,289 152,296" fill="#e8c3a5" />
        <polygon points="224,272 252,265 259,287 233,296 218,284" fill="#8c8e8a" />
        <polygon points="294,278 313,272 318,290 298,296" fill="#f3f0e8" />

        {/* Small Fine Terrazzo Flecks */}
        <polygon points="78,24 88,20 91,30 81,33" fill="#b5ada2" />
        <polygon points="164,26 173,22 176,31 167,34" fill="#3c3c3a" />
        <polygon points="248,32 257,28 260,37 251,40" fill="#e8c3a5" />
        <polygon points="36,78 45,74 48,83 39,86" fill="#e8c3a5" />
        <polygon points="118,76 127,72 130,81 121,84" fill="#8c8e8a" />
        <polygon points="204,78 214,74 217,84 207,87" fill="#f3f0e8" />
        <polygon points="288,82 297,78 300,87 291,90" fill="#b5ada2" />
        <polygon points="68,132 77,128 80,137 71,140" fill="#f3f0e8" />
        <polygon points="154,128 164,124 167,134 157,137" fill="#3c3c3a" />
        <polygon points="236,134 246,130 249,140 239,143" fill="#f3f0e8" />
        <polygon points="24,182 34,178 37,188 27,191" fill="#3c3c3a" />
        <polygon points="104,180 113,176 116,185 107,188" fill="#f3f0e8" />
        <polygon points="192,184 201,180 204,189 195,192" fill="#8c8e8a" />
        <polygon points="272,186 281,182 284,191 275,194" fill="#e8c3a5" />
        <polygon points="76,238 85,234 88,243 79,246" fill="#8c8e8a" />
        <polygon points="148,236 157,232 160,241 151,244" fill="#b5ada2" />
        <polygon points="234,240 243,236 246,245 237,248" fill="#3c3c3a" />
        <polygon points="32,286 42,282 45,292 35,295" fill="#e8c3a5" />
        <polygon points="118,288 128,284 131,294 121,297" fill="#f3f0e8" />
        <polygon points="196,286 205,282 208,291 199,294" fill="#3c3c3a" />
        <polygon points="274,292 283,288 286,297 277,300" fill="#b5ada2" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${patternId})`} />
  </svg>
);

/**
 * ============================================================================
 * HAND-DRAWN INK ILLUSTRATION SVG ("ANOTHER ROUND" COCKTAIL & BOTTLE ART)
 * ============================================================================
 */
const AnotherRoundInkIllustration = ({ milestoneAge = '40' }) => (
  <svg
    viewBox="0 0 360 390"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-100 h-auto nc-no-select"
    aria-label={`Hand-drawn ink illustration of a serving tray with drinks and bottle labeled ${milestoneAge}`}
  >
    {/* Left & Right Hand-Drawn Ink Starbursts */}
    <g stroke="#181818" strokeWidth="1.5" strokeLinecap="round">
      <path d="M52 178L52 190M46 184L58 184M48 180L56 188M56 180L48 188" />
      <path d="M312 198L312 212M305 205L319 205M307 200L317 210M317 200L307 210" />
      <circle cx="282" cy="96" r="1.4" fill="#181818" />
      <circle cx="294" cy="88" r="1.8" fill="#181818" />
      <circle cx="275" cy="84" r="1.2" fill="#181818" />
    </g>

    {/* Central Wine / Champagne Bottle ("40") */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M167 16C174 14.5 186 14.5 193 16C194.5 19 193.5 22.5 191.5 24C185 25 175 25 168.5 24C166.5 22.5 165.5 19 167 16Z"
        strokeWidth="2.1"
      />
      <path d="M169 20C176 21 184 21 191 20" strokeWidth="1.3" />
      <path d="M169.5 24C169 48 168 72 165.5 92" strokeWidth="2.2" />
      <path d="M171.5 26C171 50 170 72 167.5 92" strokeWidth="1.1" />
      <path d="M190.5 24C191 48 192 72 194.5 92" strokeWidth="2.2" />
      <path d="M188.5 26C189 50 190 72 192.5 92" strokeWidth="1.1" />
      <path d="M168.5 48C176 50 184 50 191.5 48" strokeWidth="1.8" />
      <path d="M168 53C176 55 184 55 192 53" strokeWidth="1.3" />
      <path d="M172 25L171 47M177 25L176 48M185 25L186 48" strokeWidth="1.1" />
      <path
        d="M165.5 92C151 103 145 118 145.5 142L147 238C147.2 243 151 245 156 245H204C209 245 212.8 243 213 238L214.5 142C215 118 209 103 194.5 92"
        strokeWidth="2.4"
      />
      <path d="M163 96C152 107 148 122 148.5 145L149.5 236" strokeWidth="1.15" />
      <path d="M197 96C208 107 212 122 211.5 145L210.5 236" strokeWidth="1.15" />
      <path
        d="M153 111C157 104 162 99 167 96M150 120C153 114 157 109 162 105M205 112C201 105 196 100 191 97"
        strokeWidth="1.2"
      />
      <path
        d="M152 136C168 134.5 192 134.5 208 136L207.5 196C191 197.5 169 197.5 152.5 196Z"
        strokeWidth="1.9"
      />
      <path d="M155 140C170 139 190 139 205 140" strokeWidth="1" />
      <path d="M155 192C170 193 190 193 205 192" strokeWidth="1" />
      <text
        x="180"
        y="175"
        textAnchor="middle"
        fill="#181818"
        stroke="#181818"
        strokeWidth="0.6"
        style={{
          fontFamily: "'Caveat', cursive",
          fontSize: milestoneAge && String(milestoneAge).length > 2 ? '30px' : '36px',
          fontWeight: 700,
          letterSpacing: '0.02em',
        }}
      >
        {milestoneAge || '40'}
      </text>
      <path
        d="M150 228C168 230 192 230 210 228M151 235C169 237 191 237 209 235M154 240L159 230M162 241L166 231M198 241L194 231M205 240L201 230"
        strokeWidth="1.2"
      />
    </g>

    {/* Left Stemmed Wine Glass (Cross-Hatched Red) */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="98" cy="108" rx="23" ry="4.5" strokeWidth="1.8" />
      <path d="M75 108C72 132 76 164 98 168C120 164 124 132 121 108" strokeWidth="2.1" />
      <path d="M77 112C75 134 79 161 98 165" strokeWidth="1" />
      <path d="M76 131C87 134 109 134 120 131" strokeWidth="1.8" />
      <path
        d="M76 135L119 137M77 140L118 142M79 145L117 147M81 150L115 152M84 155L112 156M88 160L108 161"
        strokeWidth="1.55"
      />
      <path
        d="M82 132L95 164M89 132L103 164M96 132L109 161M104 132L114 155M112 132L86 160M105 132L81 153M97 132L77 146"
        strokeWidth="1.35"
      />
      <path d="M97 168L96.5 234M99.5 168L99 234" strokeWidth="1.9" />
      <path d="M78 242C84 235 112 235 118 242C110 245 86 245 78 242Z" strokeWidth="1.9" />
    </g>

    {/* Small Bowl of Olives / Grapes */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <path d="M114 218C115 232 122 238 132 238C142 238 149 232 150 218Z" strokeWidth="1.8" />
      <path d="M122 238L120 243H144L142 238" strokeWidth="1.6" />
      <circle cx="123" cy="214" r="4.2" strokeWidth="1.6" />
      <circle cx="132" cy="212" r="4.5" strokeWidth="1.6" />
      <circle cx="141" cy="215" r="4" strokeWidth="1.6" />
      <circle cx="128" cy="206" r="3.8" strokeWidth="1.5" />
      <circle cx="136" cy="207" r="3.6" strokeWidth="1.5" />
      <path d="M144 212C151 206 156 207 158 210C153 213 148 213 144 212Z" strokeWidth="1.3" />
      <circle cx="163" cy="240" r="3.2" strokeWidth="1.4" />
      <circle cx="170" cy="241" r="3.4" strokeWidth="1.4" />
      <circle cx="177" cy="240" r="3" strokeWidth="1.4" />
    </g>

    {/* Right Coupe Glass */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="236" cy="160" rx="22" ry="4" strokeWidth="1.7" />
      <path d="M214 160C215 178 224 188 236 189C248 188 257 178 258 160" strokeWidth="1.9" />
      <path d="M217 169C228 171 244 171 255 169" strokeWidth="1.3" />
      <path d="M222 175C230 176.5 242 176.5 250 175" strokeWidth="1" />
      <path d="M235 189L235 235M237.5 189L237.5 235" strokeWidth="1.8" />
      <path d="M220 242C225 236 247 236 252 242C245 244.5 227 244.5 220 242Z" strokeWidth="1.8" />
    </g>

    {/* Far Right Tall Bubbly Champagne Flute */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="277" cy="112" rx="12" ry="3" strokeWidth="1.7" />
      <path d="M265 112C264 142 266 172 277 178C288 172 290 142 289 112" strokeWidth="1.9" />
      <path d="M266 130C273 131.5 281 131.5 288 130" strokeWidth="1.3" />
      <circle cx="275" cy="142" r="1.3" fill="#181818" />
      <circle cx="280" cy="150" r="1.1" fill="#181818" />
      <circle cx="276" cy="160" r="1.2" fill="#181818" />
      <circle cx="278" cy="122" r="1.2" fill="#181818" />
      <circle cx="273" cy="105" r="1.2" fill="#181818" />
      <path d="M276 178L276 235M278.5 178L278.5 235" strokeWidth="1.8" />
      <path d="M263 242C267 236 287 236 291 242C285 244.5 269 244.5 263 242Z" strokeWidth="1.8" />
    </g>

    {/* Horizontal Serving Tray */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 242C96 244 264 244 316 242" strokeWidth="2.3" />
      <path d="M48 247C102 250 258 250 312 247" strokeWidth="2" />
      <path d="M44 242C44 245 46 246.5 48 247" strokeWidth="1.8" />
      <path d="M316 242C316 245 314 246.5 312 247" strokeWidth="1.8" />
    </g>

    {/* Outstretched Server Hand & Cross-Hatched Cuff */}
    <g stroke="#181818" strokeLinecap="round" strokeLinejoin="round">
      <path d="M118 250C114 254 118 259 126 259L164 259" strokeWidth="1.9" />
      <path d="M124 259C120 264 124 269 133 269L166 268" strokeWidth="1.9" />
      <path d="M132 269C129 274 134 278 142 278L170 277" strokeWidth="1.9" />
      <path d="M142 278C141 283 146 287 154 286L176 285" strokeWidth="1.8" />
      <path
        d="M174 250C184 253 194 258 202 266C210 274 216 286 222 300"
        strokeWidth="2.1"
      />
      <path d="M168 286C176 293 184 302 190 313" strokeWidth="2.1" />
      <path
        d="M166 263C176 265 184 269 190 275M172 273C180 275 187 279 192 284"
        strokeWidth="1.15"
      />
      <path
        d="M185 315L226 297L244 338L202 357Z"
        fill="#181818"
        stroke="#181818"
        strokeWidth="2.2"
      />
      <path d="M182 311L224 293" stroke="#181818" strokeWidth="2.2" />
      <path
        d="M204 356L216 382M242 338L255 372M214 352L224 378M226 346L236 374M234 342L245 370"
        strokeWidth="1.8"
      />
    </g>
  </svg>
);

/**
 * ============================================================================
 * WARM PEACH CARDSTOCK ARTWORK ("ANOTHER ROUND" INVITATION CARD)
 * ============================================================================
 */
const AnotherRoundCardArtwork = ({
  honoreeTitle = "Sarah's Birthday",
  milestoneAge = '40',
  eventDate = 'June 25th',
  eventTime = '7 p.m.',
  venueText = '12th Knot\nSea Containers,\nLondon',
  compact = false,
}) => {
  const titleLines = String(honoreeTitle || "Sarah's Birthday")
    .split('\n')
    .filter(Boolean);
  const venueLines = String(venueText || '12th Knot\nSea Containers,\nLondon')
    .split('\n')
    .filter(Boolean);

  return (
    <div className="position-relative w-100 h-100 overflow-hidden nc-no-select nc-peach-paper">
      {/* Fine Tactile Paper Grain Overlay */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 nc-no-pointer nc-paper-grain" />

      {/* Top-Left Handwritten Script: "Sarah's Birthday" */}
      <div
        className={`position-absolute z-2 text-start ${
          compact ? 'nc-bday-title-compact' : 'nc-bday-title-full'
        }`}
      >
        {titleLines.length > 1 ? (
          titleLines.map((line, idx) => (
            <p
              key={idx}
              className={`nc-font-handwritten fw-semibold mb-0 nc-ink-text ${
                compact ? 'nc-bday-text-xs' : 'nc-bday-heading'
              }`}
            >
              {line}
            </p>
          ))
        ) : (
          <p
            className={`nc-font-handwritten fw-semibold mb-0 nc-ink-text ${
              compact ? 'nc-bday-text-xs' : 'nc-bday-heading nc-bday-heading-wrap'
            }`}
          >
            {honoreeTitle}
          </p>
        )}
      </div>

      {/* Centerpiece Hand-Drawn Ink Illustration */}
      <div
        className={`position-relative z-1 mx-auto d-flex align-items-center justify-content-center ${
          compact ? 'nc-bday-art-compact' : 'nc-bday-art-full'
        }`}
      >
        <AnotherRoundInkIllustration milestoneAge={milestoneAge} />
      </div>

      {/* Bottom-Left Handwritten Venue */}
      <div
        className={`position-absolute z-2 text-start ${
          compact ? 'nc-bday-venue-compact' : 'nc-bday-venue-full'
        }`}
      >
        {venueLines.map((line, i) => (
          <p
            key={i}
            className={`nc-font-handwritten fw-medium mb-0 nc-ink-text ${
              compact ? 'nc-bday-sub-xs' : 'nc-bday-subtext'
            }`}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Bottom-Right Handwritten Date & Time */}
      <div
        className={`position-absolute z-2 text-start ${
          compact ? 'nc-bday-date-compact' : 'nc-bday-date-full'
        }`}
      >
        <p
          className={`nc-font-handwritten fw-medium mb-0 nc-ink-text ${
            compact ? 'nc-bday-sub-xs' : 'nc-bday-subtext'
          }`}
        >
          {eventDate}
        </p>
        <p
          className={`nc-font-handwritten fw-medium mb-0 nc-ink-text ${
            compact ? 'nc-bday-sub-xs' : 'nc-bday-subtext'
          }`}
        >
          {eventTime}
        </p>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * PAPER COLORWAY PRESETS ("GLIMPSE INTO FOREVER" CLASSIC WEDDING)
 * ============================================================================
 */
const WEDDING_COLORWAYS = {
  ivory: {
    id: 'ivory',
    label: 'Ivory Linen',
    swatchBg: '#f6f4ee',
    swatchRing: '#1f1e1c',
    backdropBg: '#eceae4',
    cardBg: '#f6f4ee',
    inkColor: '#232220',
    mutedInk: '#4d4a44',
    debossOuter: 'rgba(130, 122, 108, 0.34)',
    debossInner: 'rgba(165, 156, 140, 0.28)',
    debossHighlight: 'rgba(255, 255, 255, 0.85)',
    envelopeBody: '#f4f1e8',
    envelopeFlap: '#ebe6d9',
    envelopePocket: '#e5dfd0',
    envelopeLiner: '#dcd3c3',
    sealBg: '#e2dacb',
    sealText: '#3b3731',
    sealBorder: '#c5b9a5',
    isDark: false,
  },
  noir: {
    id: 'noir',
    label: 'Noir Velvet',
    swatchBg: '#1c1c1a',
    swatchRing: '#c5a059',
    backdropBg: '#141413',
    cardBg: '#1c1c1a',
    inkColor: '#f3efe6',
    mutedInk: '#c8c1b4',
    debossOuter: 'rgba(243, 239, 230, 0.28)',
    debossInner: 'rgba(197, 160, 89, 0.34)',
    debossHighlight: 'rgba(255, 255, 255, 0.08)',
    envelopeBody: '#222220',
    envelopeFlap: '#2a2a27',
    envelopePocket: '#191917',
    envelopeLiner: '#383530',
    sealBg: '#2e2c28',
    sealText: '#e6d2a6',
    sealBorder: '#c5a059',
    isDark: true,
  },
  sage: {
    id: 'sage',
    label: 'Sage Mist',
    swatchBg: '#cbd7c6',
    swatchRing: '#3e4d3b',
    backdropBg: '#dde4da',
    cardBg: '#cbd7c6',
    inkColor: '#1e261d',
    mutedInk: '#3d493b',
    debossOuter: 'rgba(42, 56, 40, 0.3)',
    debossInner: 'rgba(62, 77, 59, 0.24)',
    debossHighlight: 'rgba(255, 255, 255, 0.55)',
    envelopeBody: '#c5d2bf',
    envelopeFlap: '#bccab6',
    envelopePocket: '#b3c2ad',
    envelopeLiner: '#e4ebe1',
    sealBg: '#b8c6b2',
    sealText: '#1e261d',
    sealBorder: '#7d8e77',
    isDark: false,
  },
};

/**
 * Helper to extract 2-letter couple monogram (e.g., "RENÉE & GÉRARD" -> "R & G")
 */
const getCoupleMonogram = (coupleNames = 'RENÉE & GÉRARD') => {
  const parts = String(coupleNames)
    .split(/&|\+|and/i)
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0].toUpperCase()} & ${parts[1][0].toUpperCase()}`;
  }
  return 'R & G';
};

/**
 * ============================================================================
 * EDITORIAL MONOCHROME COUPLE PORTRAIT ILLUSTRATION ("GLIMPSE INTO FOREVER")
 * ============================================================================
 * Detailed black-and-white outdoor embrace portrait featuring a groom in a
 * wide-brim Western hat and bride with flowing wavy hair & airy white dress.
 */
const WeddingCoupleCameoIllustration = ({ uniqueId = 'cameo-art' }) => (
  <svg
    viewBox="0 0 220 290"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-100 h-100 nc-cameo-svg"
    aria-label="Monochrome editorial portrait of couple embracing outdoors"
  >
    <defs>
      <linearGradient id={`${uniqueId}-sky`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d9d9d7" />
        <stop offset="58%" stopColor="#ededeb" />
        <stop offset="72%" stopColor="#c9c9c6" />
        <stop offset="100%" stopColor="#7c7c79" />
      </linearGradient>
      <radialGradient id={`${uniqueId}-glow`} cx="52%" cy="42%" r="55%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#9e9e9b" stopOpacity="0.15" />
      </radialGradient>
      <linearGradient id={`${uniqueId}-dress`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f5f5f3" />
        <stop offset="55%" stopColor="#dcdcd9" />
        <stop offset="100%" stopColor="#a8a8a4" />
      </linearGradient>
      <linearGradient id={`${uniqueId}-denim`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#353534" />
        <stop offset="55%" stopColor="#525250" />
        <stop offset="100%" stopColor="#262625" />
      </linearGradient>
    </defs>

    {/* Misty Open Sky & Horizon Meadow */}
    <rect width="220" height="290" fill={`url(#${uniqueId}-sky)`} />
    <rect width="220" height="290" fill={`url(#${uniqueId}-glow)`} />

    {/* Distant Soft Hills & Meadow Texture */}
    <path
      d="M0 192 Q58 184 115 190 T220 186 L220 290 L0 290 Z"
      fill="#8b8b88"
      opacity="0.72"
    />
    <path
      d="M0 206 Q80 198 155 205 T220 202 L220 290 L0 290 Z"
      fill="#6f6f6c"
      opacity="0.82"
    />

    {/* Bride's Flowing Airy White Skirt & Sleeve Drapery */}
    <path
      d="M112 132 C136 122 174 114 202 124 C214 129 216 144 204 152 C186 163 166 166 154 176 C168 202 176 244 178 290 L108 290 L106 164 Z"
      fill={`url(#${uniqueId}-dress)`}
    />
    {/* Soft Drape Folds on Bridal Dress */}
    <path
      d="M150 132 C168 128 186 129 198 136M148 144 C166 142 184 143 196 148M136 184 C144 216 149 252 151 288M124 192 C129 224 132 256 133 288"
      stroke="#969692"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.75"
    />

    {/* Groom's Torso, Rolled Sleeve & Denim Jeans */}
    <path
      d="M54 134 C50 156 52 182 58 204 L112 204 C116 180 116 154 110 132 Z"
      fill="#474745"
    />
    {/* Groom's Jeans & Belt */}
    <path
      d="M58 202 L112 202 L116 290 L55 290 Z"
      fill={`url(#${uniqueId}-denim)`}
    />
    <rect x="57" y="199" width="56" height="6" rx="2" fill="#1e1e1d" />
    <rect x="81" y="198" width="9" height="8" rx="1.5" fill="#9c9c98" />

    {/* Groom's Back & Shoulder Shadow */}
    <path
      d="M52 136 C44 152 46 174 56 190 L76 184 L74 136 Z"
      fill="#383836"
    />

    {/* Bride's Flowing Wavy Dark Hair */}
    <path
      d="M116 92 C128 84 148 88 158 104 C168 120 176 144 186 160 C174 166 158 164 148 154 C140 166 128 172 118 166 Z"
      fill="#262625"
    />
    <path
      d="M144 96 C154 110 162 130 174 152M136 102 C145 118 152 136 160 156"
      stroke="#161615"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    {/* Bride's Profile & Joyful Tilt */}
    <path
      d="M114 96 C124 94 133 101 134 112 C135 122 128 130 119 131 C111 131 106 124 106 114 C106 104 109 98 114 96 Z"
      fill="#d6d6d3"
    />
    {/* Bride's Smile & Eye Detail */}
    <path
      d="M113 111 Q116 109 119 111M112 120 Q116 123 120 120"
      stroke="#3b3b39"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Groom's Neck & Profile Leaning In */}
    <path d="M74 116 L96 116 L98 136 L70 136 Z" fill="#b8b8b4" />
    <path
      d="M74 92 C86 90 100 96 103 108 C105 118 99 127 89 128 C79 128 72 120 72 108 Z"
      fill="#c9c9c5"
    />
    {/* Groom's Beard/Jaw Shadow */}
    <path
      d="M78 115 C84 123 95 124 101 117 C99 125 91 129 83 127 C78 125 76 120 78 115 Z"
      fill="#52524f"
      opacity="0.7"
    />

    {/* Groom's Wide-Brim Western Hat (Signature Silhouette) */}
    {/* Hat Crown */}
    <path
      d="M52 84 C54 64 64 56 76 57 C82 58 86 60 92 58 C100 56 106 65 106 82 Z"
      fill="#4c4c49"
    />
    <path
      d="M54 80 C68 83 92 82 105 79"
      stroke="#242423"
      strokeWidth="2.4"
    />
    {/* Wide Curved Hat Brim */}
    <path
      d="M32 86 C46 77 78 75 114 82 C121 84 123 88 116 90 C84 92 52 94 33 91 C29 90 29 88 32 86 Z"
      fill="#5e5e5b"
    />
    <path
      d="M34 89 C60 92 92 90 117 88"
      stroke="#2b2b29"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Embracing Arms Around Waist */}
    <path
      d="M66 146 C82 156 102 162 122 160 C127 160 129 166 123 168 C100 171 78 166 60 156 Z"
      fill="#c7c7c3"
    />
    <path
      d="M134 134 C124 146 112 154 98 156 C94 157 94 162 99 162 C115 161 129 152 141 139 Z"
      fill="#deded9"
    />

    {/* Subtle Vintage Film Vignette */}
    <rect
      width="220"
      height="290"
      fill="none"
      stroke="#2b2b29"
      strokeWidth="6"
      strokeOpacity="0.14"
    />
  </svg>
);

/**
 * ============================================================================
 * SCALLOPED-CORNER WEDDING CARD ARTWORK ("GLIMPSE INTO FOREVER")
 * ============================================================================
 * Architectural card shape with inverted-curve (concave scalloped) corners,
 * double-stepped debossed inner frame lines, wide-tracked couple header,
 * vertical oval portrait cameo frame, italic serif invitation line,
 * uppercase date/time, and bottom venue signature.
 */
const GlimpseIntoForeverCardArtwork = ({
  coupleNames = 'RENÉE & GÉRARD',
  invitationLine = 'invite you to celebrate their marriage',
  eventDate = 'TUESDAY, JULY 21, 1925',
  eventTime = 'AT FOUR IN THE AFTERNOON',
  venueName = 'ANSONIA HOTEL',
  colorwayId = 'ivory',
  photoUrl = '',
  bwFilter = true,
  compact = false,
  instanceId = 'full',
}) => {
  const palette = WEDDING_COLORWAYS[colorwayId] || WEDDING_COLORWAYS.ivory;
  const clipId = `nc-scallop-clip-${instanceId}-${compact ? 'sm' : 'lg'}`;

  // Concave scalloped-corner path on a 360x510 coordinate grid
  // Outer card boundary (normalized in clipPath using scale 1/360 and 1/510)
  const outerSvgPath =
    'M 34 0 L 326 0 A 34 34 0 0 0 360 34 L 360 476 A 34 34 0 0 0 326 510 L 34 510 A 34 34 0 0 0 0 476 L 0 34 A 34 34 0 0 0 34 0 Z';
  // First debossed frame step (inset 10px, concave radius 29)
  const frameStep1Path =
    'M 39 10 L 321 10 A 29 29 0 0 0 350 39 L 350 471 A 29 29 0 0 0 321 500 L 39 500 A 29 29 0 0 0 10 471 L 10 39 A 29 29 0 0 0 39 10 Z';
  // Second debossed frame step (inset 16px, concave radius 26)
  const frameStep2Path =
    'M 42 16 L 318 16 A 26 26 0 0 0 344 42 L 344 468 A 26 26 0 0 0 318 494 L 42 494 A 26 26 0 0 0 16 468 L 16 42 A 26 26 0 0 0 42 16 Z';

  return (
    <div
      className="position-relative w-100 h-100 nc-no-select"
      style={{
        filter: compact
          ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.12))'
          : 'drop-shadow(0 22px 42px rgba(24, 22, 18, 0.22))',
      }}
    >
      {/* Hidden SVG ClipPath Definition for True Inverted-Corner Die-Cut */}
      <svg width="0" height="0" className="position-absolute" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.00277778, 0.00196078)"
              d={outerSvgPath}
            />
          </clipPath>
        </defs>
      </svg>

      {/* Die-Cut Scalloped Card Surface */}
      <div
        className="position-relative w-100 h-100 d-flex flex-column align-items-center justify-content-between overflow-hidden"
        style={{
          backgroundColor: palette.cardBg,
          color: palette.inkColor,
          clipPath: `url(#${clipId})`,
          padding: compact ? '10% 10% 8%' : '9.5% 11% 8.5%',
          transition: 'background-color 0.45s ease, color 0.45s ease',
        }}
      >
        {/* Fine Cotton Paper Grain Texture */}
        <div className="position-absolute top-0 start-0 end-0 bottom-0 nc-no-pointer nc-paper-grain" />

        {/* Double-Stepped Debossed Inner Frame Border */}
        <svg
          viewBox="0 0 360 510"
          preserveAspectRatio="none"
          className="position-absolute top-0 start-0 w-100 h-100 nc-no-pointer"
          aria-hidden="true"
        >
          {/* Highlight bevel */}
          <path
            d={frameStep1Path}
            fill="none"
            stroke={palette.debossHighlight}
            strokeWidth="1.6"
            transform="translate(0.7, 0.8)"
          />
          {/* Outer deboss line */}
          <path
            d={frameStep1Path}
            fill="none"
            stroke={palette.debossOuter}
            strokeWidth="1.15"
          />
          {/* Inner deboss line */}
          <path
            d={frameStep2Path}
            fill="none"
            stroke={palette.debossInner}
            strokeWidth="1"
          />
        </svg>

        {/* 1. Top Wide-Tracked Uppercase Couple Header */}
        <div className="position-relative z-1 w-100 text-center pt-1">
          <p
            className="mb-0 text-uppercase fw-medium"
            style={{
              color: palette.inkColor,
              fontSize: compact ? '0.42rem' : 'clamp(0.72rem, 1.8vw, 0.92rem)',
              letterSpacing: '0.26em',
              paddingLeft: '0.26em',
            }}
          >
            {coupleNames || 'RENÉE & GÉRARD'}
          </p>
        </div>

        {/* 2. Centerpiece Vertical Oval Portrait Cameo Frame */}
        <div
          className="position-relative z-1 my-auto d-flex align-items-center justify-content-center"
          style={{
            width: compact ? '44%' : '45.5%',
            aspectRatio: '3 / 4.05',
            borderRadius: '50%',
            padding: compact ? '2px' : '4px',
            border: `1px solid ${palette.debossOuter}`,
            boxShadow: `inset 0 2px 6px rgba(0,0,0,0.12), 0 1px 0 ${palette.debossHighlight}`,
            backgroundColor: palette.cardBg,
          }}
        >
          <div
            className="w-100 h-100 overflow-hidden position-relative"
            style={{
              borderRadius: '50%',
              border: `1px solid ${palette.debossInner}`,
            }}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={coupleNames}
                className="w-100 h-100"
                style={{
                  objectFit: 'cover',
                  filter: bwFilter ? 'grayscale(100%) contrast(1.08)' : 'none',
                }}
              />
            ) : (
              <div
                className="w-100 h-100"
                style={{
                  filter: bwFilter ? 'grayscale(100%) contrast(1.04)' : 'sepia(18%)',
                }}
              >
                <WeddingCoupleCameoIllustration
                  uniqueId={`${instanceId}-${compact ? 'c' : 'f'}`}
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. Lower Invitation Typography & Venue */}
        <div className="position-relative z-1 w-100 text-center pb-1">
          {/* Classic Italic Serif Line */}
          <p
            className="nc-font-serif fst-italic mb-1"
            style={{
              color: palette.inkColor,
              fontSize: compact ? '0.46rem' : 'clamp(0.95rem, 2.3vw, 1.2rem)',
              lineHeight: 1.2,
            }}
          >
            {invitationLine || 'invite you to celebrate their marriage'}
          </p>

          {/* Date & Time in Wide-Tracked Uppercase */}
          <p
            className="mb-0 text-uppercase fw-medium"
            style={{
              color: palette.inkColor,
              fontSize: compact ? '0.32rem' : 'clamp(0.56rem, 1.35vw, 0.68rem)',
              letterSpacing: '0.2em',
              paddingLeft: '0.2em',
              lineHeight: 1.55,
            }}
          >
            {eventDate || 'TUESDAY, JULY 21, 1925'}
          </p>
          <p
            className="mb-0 text-uppercase fw-medium"
            style={{
              color: palette.inkColor,
              fontSize: compact ? '0.32rem' : 'clamp(0.56rem, 1.35vw, 0.68rem)',
              letterSpacing: '0.2em',
              paddingLeft: '0.2em',
              lineHeight: 1.55,
            }}
          >
            {eventTime || 'AT FOUR IN THE AFTERNOON'}
          </p>

          {/* Bottom Venue in Wide-Tracked Small Uppercase */}
          <p
            className="mb-0 text-uppercase fw-semibold"
            style={{
              color: palette.mutedInk,
              marginTop: compact ? '4px' : '14px',
              fontSize: compact ? '0.28rem' : 'clamp(0.5rem, 1.2vw, 0.6rem)',
              letterSpacing: '0.24em',
              paddingLeft: '0.24em',
            }}
          >
            {venueName || 'ANSONIA HOTEL'}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * COLORWAY PRESETS ("BALLOON & CROWN JAMBOREE" KIDS BIRTHDAY EDITION)
 * ============================================================================
 */
const KIDS_BDAY_COLORWAYS = {
  sunny: {
    id: 'sunny',
    label: 'Sunny Sky',
    swatchBg: '#bfe3f7',
    backdropBg: '#fffaf0',
    cardBg: '#fffdf8',
    scallopBorder: '#7ec4e8',
    innerBorder: '#f4b942',
    headlineColor: '#1f4e78',
    subtitleColor: '#e06d3b',
    metaColor: '#365875',
    envelopeBody: '#bfe3f7',
    envelopeFlap: '#add7f0',
    envelopePocket: '#a2d0ec',
    linerStripeA: '#fff8de',
    linerStripeB: '#d9effc',
    sealBg: '#f4b942',
    sealBorder: '#ffe28a',
    sealText: '#4a2e00',
    buntingColors: ['#ff7b7b', '#ffd166', '#6ec6ff', '#8ce0a8', '#c89bff'],
    balloonColors: ['#ff7b7b', '#6ec6ff', '#ffd166'],
    cakeFrosting: '#ff9eb5',
    cakeBase: '#ffe39f',
    confettiColors: ['#ff7b7b', '#ffd166', '#6ec6ff', '#8ce0a8', '#c89bff'],
  },
  berry: {
    id: 'berry',
    label: 'Berry Sorbet',
    swatchBg: '#f9c5d5',
    backdropBg: '#fff7fa',
    cardBg: '#fffdf9',
    scallopBorder: '#f29cb8',
    innerBorder: '#f4b942',
    headlineColor: '#7a2048',
    subtitleColor: '#d94e78',
    metaColor: '#69344c',
    envelopeBody: '#f9c5d5',
    envelopeFlap: '#f4b3c7',
    envelopePocket: '#efa4bc',
    linerStripeA: '#fff0f5',
    linerStripeB: '#ffe2ec',
    sealBg: '#eab338',
    sealBorder: '#ffe599',
    sealText: '#4a2500',
    buntingColors: ['#ff6f91', '#ffc75f', '#ff9671', '#d65db1', '#845ec2'],
    balloonColors: ['#ff6f91', '#ffc75f', '#d65db1'],
    cakeFrosting: '#ff7597',
    cakeBase: '#ffd6e0',
    confettiColors: ['#ff6f91', '#ffc75f', '#ff9671', '#d65db1', '#845ec2'],
  },
  mint: {
    id: 'mint',
    label: 'Mint Safari',
    swatchBg: '#bce8d3',
    backdropBg: '#f7fcf9',
    cardBg: '#fffef9',
    scallopBorder: '#7ccca6',
    innerBorder: '#f4b942',
    headlineColor: '#1c523c',
    subtitleColor: '#e07a35',
    metaColor: '#355c4b',
    envelopeBody: '#bce8d3',
    envelopeFlap: '#a9dec5',
    envelopePocket: '#9ad5b9',
    linerStripeA: '#fefae8',
    linerStripeB: '#daf3e7',
    sealBg: '#eab338',
    sealBorder: '#fce39c',
    sealText: '#3b2800',
    buntingColors: ['#52b788', '#ffb703', '#fb8500', '#4ea8de', '#9b5de5'],
    balloonColors: ['#52b788', '#ffb703', '#4ea8de'],
    cakeFrosting: '#74c69d',
    cakeBase: '#ffe8a3',
    confettiColors: ['#52b788', '#ffb703', '#fb8500', '#4ea8de', '#9b5de5'],
  },
};

/**
 * ============================================================================
 * PLAYFUL SCALLOPED KIDS BIRTHDAY CARD ("BALLOON & CROWN JAMBOREE")
 * ============================================================================
 */
const KidsBirthdayCardArtwork = ({
  childName = 'Leo',
  age = '5',
  headline = 'LEO TURNS 5!',
  subtitle = "You're invited to a birthday bash!",
  eventDate = 'SATURDAY, JUNE 14',
  eventTime = '2:00 PM',
  venueName = 'SUNSHINE GARDEN PAVILION',
  colorwayId = 'sunny',
  compact = false,
}) => {
  const palette = KIDS_BDAY_COLORWAYS[colorwayId] || KIDS_BDAY_COLORWAYS.sunny;
  const displayHeadline =
    headline && headline.trim()
      ? headline
      : `${String(childName || 'LEO').toUpperCase()} TURNS ${age || '5'}!`;

  return (
    <div
      className="position-relative w-100 h-100 overflow-hidden nc-no-select d-flex flex-column align-items-center justify-content-between"
      style={{
        backgroundColor: palette.cardBg,
        borderRadius: compact ? '10px' : '24px',
        padding: compact ? '7% 7% 6%' : '7.5% 8% 6.5%',
        boxShadow: compact
          ? '0 3px 10px rgba(31,78,120,0.12)'
          : '0 24px 48px rgba(31, 78, 120, 0.16)',
        border: `${compact ? '1.5px' : '2px'} solid ${palette.scallopBorder}`,
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Playful Scalloped SVG Border & Festive Confetti Specks */}
      <svg
        viewBox="0 0 360 480"
        preserveAspectRatio="none"
        className="position-absolute top-0 start-0 w-100 h-100 nc-no-pointer"
        aria-hidden="true"
      >
        <rect
          x="10"
          y="10"
          width="340"
          height="460"
          rx="18"
          fill="none"
          stroke={palette.innerBorder}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        {/* Confetti Dots & Stars */}
        <circle cx="34" cy="86" r="3.5" fill={palette.confettiColors[0]} />
        <circle cx="326" cy="92" r="3.5" fill={palette.confettiColors[1]} />
        <circle cx="42" cy="240" r="3" fill={palette.confettiColors[2]} />
        <circle cx="318" cy="250" r="3.5" fill={palette.confettiColors[3]} />
        <circle cx="52" cy="395" r="3" fill={palette.confettiColors[4]} />
        <circle cx="308" cy="390" r="3" fill={palette.confettiColors[0]} />
        <rect
          x="28"
          y="150"
          width="6"
          height="3"
          rx="1.5"
          transform="rotate(28 28 150)"
          fill={palette.confettiColors[1]}
        />
        <rect
          x="324"
          y="165"
          width="6"
          height="3"
          rx="1.5"
          transform="rotate(-24 324 165)"
          fill={palette.confettiColors[2]}
        />
      </svg>

      {/* Top Bunting Flags & Golden Birthday Crown */}
      <div className="position-relative z-1 w-100">
        <svg
          viewBox="0 0 320 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-100 h-auto"
          aria-hidden="true"
        >
          {/* Draped Bunting String */}
          <path
            d="M4 6 Q160 32 316 6"
            stroke="#94a3b8"
            strokeWidth="1.5"
            fill="none"
          />
          {/* 7 Colorful Bunting Pennants */}
          <polygon points="22,11 48,15 32,34" fill={palette.buntingColors[0]} />
          <polygon points="58,16 86,19 70,39" fill={palette.buntingColors[1]} />
          <polygon points="96,20 124,21 109,42" fill={palette.buntingColors[2]} />
          <polygon points="146,22 174,22 160,44" fill={palette.buntingColors[3]} />
          <polygon points="196,21 224,20 211,42" fill={palette.buntingColors[4]} />
          <polygon points="234,19 262,16 250,39" fill={palette.buntingColors[0]} />
          <polygon points="272,15 298,11 288,34" fill={palette.buntingColors[1]} />
        </svg>
      </div>

      {/* Centerpiece: Floating Balloons + Golden Crown + Rounded Fredoka Headline + Tiered Cake */}
      <div className="position-relative z-1 w-100 my-auto d-flex flex-column align-items-center text-center">
        {/* Golden Birthday Crown Icon */}
        <svg
          viewBox="0 0 64 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: compact ? '22px' : '44px', height: 'auto', marginBottom: compact ? '2px' : '6px' }}
          aria-hidden="true"
        >
          <path
            d="M8 32L4 12L19 21L32 7L45 21L60 12L56 32H8Z"
            fill="#f4b942"
            stroke="#d48c1c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="8" y="32" width="48" height="5" rx="2.5" fill="#e59e24" />
          <circle cx="4" cy="10" r="2.5" fill="#ff7b7b" />
          <circle cx="32" cy="5" r="3" fill="#6ec6ff" />
          <circle cx="60" cy="10" r="2.5" fill="#8ce0a8" />
        </svg>

        {/* Bold Rounded Fredoka Headline ("LEO TURNS 5!") */}
        <h2
          className="nc-font-fredoka fw-bold mb-1 text-uppercase"
          style={{
            color: palette.headlineColor,
            fontSize: compact ? '0.68rem' : 'clamp(1.45rem, 3.8vw, 2.05rem)',
            lineHeight: 1.08,
            letterSpacing: '0.03em',
          }}
        >
          {displayHeadline}
        </h2>

        {/* Playful Handwritten Caveat Subtitle */}
        <p
          className="nc-font-handwritten fw-semibold mb-1"
          style={{
            color: palette.subtitleColor,
            fontSize: compact ? '0.52rem' : 'clamp(1.1rem, 2.7vw, 1.45rem)',
            lineHeight: 1.1,
          }}
        >
          {subtitle || "You're invited to a birthday bash!"}
        </p>

        {/* Balloons & Tiered Birthday Cake Illustration */}
        <svg
          viewBox="0 0 280 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: compact ? '78%' : '84%', height: 'auto', marginTop: compact ? '2px' : '6px' }}
          aria-label="Festive birthday balloons and tiered birthday cake with lit candles"
        >
          {/* Left Balloon Bunch */}
          <path d="M46 66 Q38 98 50 132" stroke="#94a3b8" strokeWidth="1.4" fill="none" />
          <path d="M68 54 Q62 92 52 132" stroke="#94a3b8" strokeWidth="1.4" fill="none" />
          <ellipse cx="44" cy="44" rx="18" ry="22" fill={palette.balloonColors[0]} />
          <ellipse cx="38" cy="36" rx="4" ry="7" fill="#ffffff" fillOpacity="0.45" />
          <polygon points="44,66 40,71 48,71" fill={palette.balloonColors[0]} />

          <ellipse cx="68" cy="32" rx="19" ry="23" fill={palette.balloonColors[1]} />
          <ellipse cx="62" cy="24" rx="4" ry="7" fill="#ffffff" fillOpacity="0.45" />
          <polygon points="68,55 64,60 72,60" fill={palette.balloonColors[1]} />

          {/* Right Balloon Bunch */}
          <path d="M234 66 Q242 98 230 132" stroke="#94a3b8" strokeWidth="1.4" fill="none" />
          <path d="M212 54 Q218 92 228 132" stroke="#94a3b8" strokeWidth="1.4" fill="none" />
          <ellipse cx="236" cy="44" rx="18" ry="22" fill={palette.balloonColors[2]} />
          <ellipse cx="230" cy="36" rx="4" ry="7" fill="#ffffff" fillOpacity="0.45" />
          <polygon points="236,66 232,71 240,71" fill={palette.balloonColors[2]} />

          <ellipse cx="212" cy="32" rx="19" ry="23" fill={palette.balloonColors[0]} />
          <ellipse cx="206" cy="24" rx="4" ry="7" fill="#ffffff" fillOpacity="0.45" />
          <polygon points="212,55 208,60 216,60" fill={palette.balloonColors[0]} />

          {/* Cake Pedestal Stand */}
          <rect x="92" y="128" width="96" height="6" rx="3" fill="#cbd5e1" />
          <path d="M128 134H152L158 142H122L128 134Z" fill="#94a3b8" />

          {/* Bottom Cake Tier */}
          <rect x="98" y="96" width="84" height="32" rx="8" fill={palette.cakeBase} />
          <path
            d="M98 104 Q108 113 119 104 Q130 113 140 104 Q150 113 161 104 Q172 113 182 104 V98 C182 95 179 94 176 94 H104 C101 94 98 95 98 98 Z"
            fill={palette.cakeFrosting}
          />

          {/* Top Cake Tier */}
          <rect x="112" y="68" width="56" height="28" rx="7" fill="#fff3d6" />
          <path
            d="M112 75 Q121 83 131 75 Q140 83 149 75 Q159 83 168 75 V70 C168 67 165 66 162 66 H118 C115 66 112 67 112 70 Z"
            fill={palette.balloonColors[1]}
          />

          {/* Three Lit Birthday Candles */}
          <rect x="124" y="48" width="5" height="18" rx="2" fill="#ff7b7b" />
          <rect x="137.5" y="45" width="5" height="21" rx="2" fill="#f4b942" />
          <rect x="151" y="48" width="5" height="18" rx="2" fill="#8ce0a8" />

          {/* Candle Flames */}
          <path d="M126.5 38 Q130 43 126.5 47 Q123 43 126.5 38 Z" fill="#ff9f1c" />
          <path d="M140 35 Q143.5 40 140 44 Q136.5 40 140 35 Z" fill="#ff9f1c" />
          <path d="M153.5 38 Q157 43 153.5 47 Q150 43 153.5 38 Z" fill="#ff9f1c" />
        </svg>
      </div>

      {/* Bottom Event Date, Time & Venue */}
      <div className="position-relative z-1 w-100 text-center pt-1">
        <p
          className="nc-font-fredoka fw-semibold mb-0 text-uppercase"
          style={{
            color: palette.headlineColor,
            fontSize: compact ? '0.35rem' : 'clamp(0.68rem, 1.6vw, 0.85rem)',
            letterSpacing: '0.12em',
          }}
        >
          {eventDate || 'SATURDAY, JUNE 14'} &bull; {eventTime || '2:00 PM'}
        </p>
        <p
          className="mb-0 text-uppercase fw-semibold"
          style={{
            color: palette.metaColor,
            marginTop: compact ? '1px' : '4px',
            fontSize: compact ? '0.3rem' : 'clamp(0.56rem, 1.3vw, 0.72rem)',
            letterSpacing: '0.16em',
          }}
        >
          {venueName || 'SUNSHINE GARDEN PAVILION'}
        </p>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * SLOT PREVIEW STAGE: LIVE LOOPING ENVELOPE "SAMPLE VIDEO" + REAL VIDEO PLAYER
 * ============================================================================
 */
const TemplatePreviewStage = ({ template, onUpdateVideoSrc, onOpenInteractive }) => {
  const [isPlayingLoop, setIsPlayingLoop] = useState(true);
  const [loopOpenState, setLoopOpenState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [videoUrlDraft, setVideoUrlDraft] = useState(template.videoSrc || '');
  const [useVideoMode, setUseVideoMode] = useState(Boolean(template.videoSrc));

  useEffect(() => {
    if (template.videoSrc) {
      setUseVideoMode(true);
      setVideoUrlDraft(template.videoSrc);
    }
  }, [template.videoSrc]);

  useEffect(() => {
    if (useVideoMode || !isPlayingLoop) return;

    const initialTimer = setTimeout(() => {
      setLoopOpenState(true);
    }, 850);

    const interval = setInterval(() => {
      setLoopOpenState((prev) => !prev);
    }, 3400);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isPlayingLoop, useVideoMode]);

  const effectiveOpen = isHovered ? true : loopOpenState;

  const handleSaveVideoUrl = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const trimmed = videoUrlDraft.trim();
    onUpdateVideoSrc(template.id, trimmed);
    setUseVideoMode(Boolean(trimmed));
    setShowVideoInput(false);
  };

  const handleLocalVideoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setVideoUrlDraft(objectUrl);
    onUpdateVideoSrc(template.id, objectUrl);
    setUseVideoMode(true);
    setShowVideoInput(false);
  };

  const isBirthday = template.templateType === 'birthday';
  const isKidsBday = template.templateType === 'kids-bday';
  const isWedding = template.templateType === 'wedding';
  const envelopeColor = isBirthday
    ? '#edc6a8'
    : isKidsBday
    ? '#bfe3f7'
    : isWedding
    ? '#f4f1e8'
    : template.themeColor || '#1B3B2B';
  const sealColor = isBirthday
    ? '#181818'
    : isKidsBday
    ? '#f4b942'
    : isWedding
    ? '#e2dacb'
    : template.sealColor || '#8B2635';
  const goldColor = isBirthday
    ? '#edc6a8'
    : isKidsBday
    ? '#f4b942'
    : isWedding
    ? '#c5b9a5'
    : template.accentColor || '#C5A059';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="position-relative w-100 overflow-hidden border-bottom nc-no-select nc-preview-stage"
      style={{
        backgroundColor: isBirthday
          ? '#222220'
          : isKidsBday
          ? '#fffaf0'
          : isWedding
          ? '#eceae4'
          : '#F3EDE2',
        borderColor: 'rgba(197, 160, 89, 0.35)',
      }}
    >
      {/* Matte Terrazzo, Sunlit Confetti, Woven Linen, or Warm Spotlight Backdrop */}
      {isBirthday ? (
        <TerrazzoBackdrop
          patternId={`preview-terrazzo-${template.id}`}
          className="position-absolute top-0 start-0 w-100 h-100"
        />
      ) : isKidsBday ? (
        <div className="position-absolute top-0 start-0 end-0 bottom-0 nc-no-pointer nc-kids-confetti-bg" />
      ) : isWedding ? (
        <div className="position-absolute top-0 start-0 end-0 bottom-0 nc-no-pointer nc-linen-texture" />
      ) : (
        <div className="position-absolute top-0 start-0 end-0 bottom-0 nc-no-pointer nc-warm-spotlight" />
      )}

      {/* Top Overlay Badges & Video Toggle */}
      <div className="position-absolute top-0 start-0 end-0 p-3 z-3 d-flex align-items-center justify-content-between gap-2">
        <span className="badge rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 nc-stage-badge">
          <span className="nc-pulse-dot" style={{ backgroundColor: '#8B2635' }} />
          Slot {template.slotNumber} •{' '}
          {useVideoMode && template.videoSrc ? 'Sample Video' : 'Live Motion'}
        </span>

        <div className="d-flex align-items-center gap-2">
          {!useVideoMode && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlayingLoop((p) => !p);
              }}
              className="btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center nc-icon-circle-btn"
              title={isPlayingLoop ? 'Pause animated preview' : 'Play animated preview'}
              aria-label={isPlayingLoop ? 'Pause animated preview' : 'Play animated preview'}
            >
              {isPlayingLoop ? <Pause size={12} /> : <Play size={12} />}
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowVideoInput((prev) => !prev);
            }}
            className={`btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1 nc-video-toggle-btn ${
              useVideoMode ? 'nc-video-toggle-active' : ''
            }`}
            title="Attach or preview a sample invitation video"
          >
            <Film size={12} style={{ color: '#C5A059' }} />
            <span>{template.videoSrc ? 'Video' : 'Sample Video'}</span>
          </button>
        </div>
      </div>

      {/* Inline Sample Video Loader Drawer */}
      {showVideoInput && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="position-absolute start-0 end-0 mx-3 p-3 rounded-3 shadow-lg nc-video-drawer nc-fade-in-up"
        >
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="nc-micro-label text-dark">Sample Invitation Video</span>
            <button
              type="button"
              onClick={() => setShowVideoInput(false)}
              className="btn btn-sm p-0 border-0 text-secondary"
              aria-label="Close video loader"
            >
              <X size={15} />
            </button>
          </div>

          <form onSubmit={handleSaveVideoUrl}>
            <div className="mb-2">
              <input
                type="text"
                value={videoUrlDraft}
                onChange={(e) => setVideoUrlDraft(e.target.value)}
                placeholder="Paste .mp4 / .webm video URL..."
                className="form-control form-control-sm nc-input-cream"
              />
            </div>
            <div className="d-flex align-items-center justify-content-between gap-2">
              <label className="btn btn-sm rounded-2 d-inline-flex align-items-center gap-1 nc-btn-outline-pine mb-0">
                <Upload size={12} />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleLocalVideoFile}
                  className="d-none"
                />
              </label>

              <div className="d-flex align-items-center gap-1">
                {template.videoSrc && (
                  <button
                    type="button"
                    onClick={() => {
                      setUseVideoMode((v) => !v);
                      setShowVideoInput(false);
                    }}
                    className="btn btn-sm rounded-2 nc-btn-outline-gold"
                  >
                    {useVideoMode ? 'Show 3D Loop' : 'Play Video'}
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-sm rounded-2 nc-btn-pine"
                >
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* VIEW A: REAL HTML5 VIDEO PLAYER */}
      {useVideoMode && template.videoSrc ? (
        <div
          onClick={onOpenInteractive}
          className="position-relative w-100 h-100 bg-dark nc-pointer nc-video-wrapper"
        >
          <video
            src={template.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-100 h-100 nc-video-cover"
          />
          <div className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center nc-video-hover-overlay">
            <span className="badge rounded-pill px-3 py-2 shadow nc-launch-pill">
              Launch Full Interactive Card
            </span>
          </div>
        </div>
      ) : (
        /* VIEW B: LIVING 3D ENVELOPE MOTION PREVIEW */
        <div
          onClick={onOpenInteractive}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpenInteractive();
            }
          }}
          aria-label={`Preview ${template.title}`}
          className="position-relative w-100 h-100 d-flex align-items-center justify-content-center pt-4 nc-pointer nc-perspective-900"
        >
          {/* Floating Gold Dust Sparkles */}
          <span
            className="nc-sparkle-dot nc-sparkle-1"
            style={{ backgroundColor: goldColor }}
          />
          <span
            className="nc-sparkle-dot nc-sparkle-2"
            style={{ backgroundColor: goldColor }}
          />

          {/* Miniature 3D Envelope Assembly */}
          <div className="position-relative nc-mini-envelope">
            {/* Ground Shadow */}
            <div
              className="nc-mini-shadow"
              style={{
                backgroundColor: isWedding
                  ? '#3b3731'
                  : isKidsBday
                  ? '#1f4e78'
                  : envelopeColor,
              }}
            />

            {/* Envelope Back & Inner Liner */}
            <div
              className={`position-absolute top-0 start-0 end-0 bottom-0 rounded-3 shadow border ${
                isKidsBday ? 'nc-kids-striped-liner' : ''
              }`}
              style={{
                backgroundColor: isBirthday
                  ? '#f5f2e9'
                  : isWedding
                  ? '#dcd3c3'
                  : envelopeColor,
                borderColor: isBirthday
                  ? 'rgba(237, 198, 168, 0.65)'
                  : isKidsBday
                  ? '#7ec4e8'
                  : isWedding
                  ? 'rgba(197, 185, 165, 0.7)'
                  : `${goldColor}60`,
              }}
            />

            {/* Rising Miniature Invitation Card */}
            <div
              className="position-absolute rounded-2 overflow-hidden nc-mini-card"
              style={{
                backgroundColor: isBirthday
                  ? '#f1ccb0'
                  : isKidsBday || isWedding
                  ? 'transparent'
                  : '#FFFDF9',
                border:
                  isWedding || isKidsBday
                    ? 'none'
                    : `1px solid ${isBirthday ? '#d8ae8e' : goldColor}`,
                boxShadow:
                  isWedding || isKidsBday ? 'none' : '0 2px 6px rgba(0,0,0,0.12)',
                transform: effectiveOpen ? 'translateY(-44%)' : 'translateY(0%)',
                zIndex: effectiveOpen ? 15 : 2,
              }}
            >
              {isBirthday ? (
                <AnotherRoundCardArtwork compact />
              ) : isKidsBday ? (
                <KidsBirthdayCardArtwork compact />
              ) : isWedding ? (
                <GlimpseIntoForeverCardArtwork compact instanceId={template.id} />
              ) : (
                <div className="px-2 pt-2 text-center">
                  <p
                    className="mb-0 fw-semibold text-uppercase nc-mini-brand"
                    style={{ color: goldColor }}
                  >
                    Noel &amp; Co.
                  </p>
                  <p className="nc-font-serif fw-semibold mb-1 nc-mini-title">
                    {template.isBuiltIn ? 'Candlelit Christmas Soirée' : template.title}
                  </p>
                  <div
                    className="mx-auto my-1 nc-mini-rule"
                    style={{ backgroundColor: goldColor }}
                  />
                  <p className="mb-0 text-uppercase nc-mini-loc">
                    Dec 20 &bull; The Conservatory
                  </p>
                </div>
              )}
            </div>

            {/* Envelope Front Pocket */}
            <div
              className="position-absolute top-0 start-0 end-0 bottom-0 rounded-3 overflow-hidden nc-no-pointer"
              style={{ zIndex: 10 }}
            >
              <div
                className="position-absolute top-0 start-0 end-0 bottom-0 nc-pocket-left"
                style={{
                  backgroundColor: envelopeColor,
                  filter:
                    isBirthday || isWedding || isKidsBday
                      ? 'brightness(0.96)'
                      : 'brightness(0.86)',
                }}
              />
              <div
                className="position-absolute top-0 start-0 end-0 bottom-0 nc-pocket-right"
                style={{
                  backgroundColor: envelopeColor,
                  filter:
                    isBirthday || isWedding || isKidsBday
                      ? 'brightness(0.96)'
                      : 'brightness(0.86)',
                }}
              />
              <div
                className="position-absolute top-0 start-0 end-0 bottom-0 nc-pocket-bottom"
                style={{ backgroundColor: envelopeColor }}
              />
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="position-absolute top-0 start-0 w-100 h-100"
              >
                <polyline
                  points="0,100 50,44 100,100"
                  fill="none"
                  stroke={
                    isBirthday
                      ? '#c99f7e'
                      : isKidsBday
                      ? '#7ec4e8'
                      : isWedding
                      ? '#c5b9a5'
                      : goldColor
                  }
                  strokeWidth="0.6"
                  strokeOpacity="0.8"
                />
              </svg>
            </div>

            {/* Top Hinged Envelope Flap */}
            <div
              className="position-absolute top-0 start-0 end-0 nc-mini-flap nc-no-pointer"
              style={{
                zIndex: effectiveOpen ? 1 : 20,
                transform: effectiveOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              }}
            >
              <div
                className="w-100 h-100 rounded-top-3 nc-flap-triangle"
                style={{
                  backgroundColor: envelopeColor,
                  filter:
                    isBirthday || isKidsBday
                      ? 'brightness(1.02)'
                      : isWedding
                      ? 'brightness(0.98)'
                      : 'brightness(1.12)',
                }}
              />
            </div>

            {/* Embossed Wax / Monogram / Star Crown Seal */}
            <div
              className={`position-absolute nc-mini-seal-wrap ${
                effectiveOpen ? 'nc-seal-hidden' : 'nc-seal-visible'
              }`}
              style={{ zIndex: 30 }}
            >
              <div
                className="rounded-circle d-flex align-items-center justify-content-center shadow border nc-mini-seal"
                style={{
                  backgroundColor: sealColor,
                  borderColor: isBirthday
                    ? '#f1ccb0'
                    : isKidsBday
                    ? '#ffe28a'
                    : isWedding
                    ? '#c5b9a5'
                    : goldColor,
                }}
              >
                <span
                  className={`${
                    isBirthday
                      ? 'nc-font-handwritten fs-6'
                      : isKidsBday
                      ? 'nc-font-fredoka nc-mini-seal-text'
                      : 'nc-font-serif nc-mini-seal-text'
                  } fw-semibold`}
                  style={{
                    color: isBirthday
                      ? '#f1ccb0'
                      : isKidsBday
                      ? '#4a2e00'
                      : isWedding
                      ? '#3b3731'
                      : '#F3E5C2',
                  }}
                >
                  {isBirthday ? '40' : isKidsBday ? '★ 5' : isWedding ? 'R&G' : 'N&C'}
                </span>
              </div>
            </div>
          </div>

          {/* Subtle Bottom Caption */}
          <span
            className="position-absolute bottom-0 mb-2 px-3 py-1 rounded-pill nc-stage-caption"
            style={{
              color: isBirthday
                ? '#f3f0e8'
                : isKidsBday
                ? '#1f4e78'
                : isWedding
                ? '#3b3731'
                : '#4A5D58',
              backgroundColor: isBirthday
                ? 'rgba(34, 34, 32, 0.72)'
                : isKidsBday
                ? 'rgba(255, 253, 248, 0.9)'
                : isWedding
                ? 'rgba(246, 244, 238, 0.85)'
                : 'transparent',
            }}
          >
            {effectiveOpen ? 'Invitation Revealed • Click to Launch' : 'Opening Envelope Preview...'}
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * ============================================================================
 * GRID CARD COMPONENT: ACTIVE TEMPLATE CARD
 * ============================================================================
 */
const ActiveTemplateCard = ({
  template,
  showCategoryBadge = false,
  onOpenInteractive,
  onUpdateVideoSrc,
  onClearCustomSlot,
}) => {
  const categoryInfo = CATEGORY_META[template.category];

  return (
    <article className="card h-100 rounded-4 shadow-sm overflow-hidden nc-template-card">
      {/* Top Animated / Video Preview Stage */}
      <TemplatePreviewStage
        template={template}
        onUpdateVideoSrc={onUpdateVideoSrc}
        onOpenInteractive={() => onOpenInteractive(template)}
      />

      {/* Card Body */}
      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <div>
          {/* Edition Overline, Category Pill & Optional Reset Control */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
            <span className="nc-micro-label" style={{ color: '#C5A059' }}>
              {template.editionLabel || 'Bespoke Edition'}
            </span>

            <div className="d-flex align-items-center gap-2">
              {showCategoryBadge && categoryInfo && (
                <span className="badge rounded-pill nc-category-chip">
                  {categoryInfo.label}
                </span>
              )}

              {!template.isBuiltIn && (
                <button
                  type="button"
                  onClick={() => onClearCustomSlot(template.id)}
                  className="btn btn-sm p-0 border-0 d-inline-flex align-items-center gap-1 nc-reset-slot-btn"
                  title="Reset slot back to empty placeholder"
                >
                  <Trash2 size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Template Title */}
          <h3 className="nc-font-serif fs-3 fw-semibold text-dark mb-2 lh-sm">
            {template.title}
          </h3>

          {/* Concise Description */}
          <p className="small mb-3 nc-muted-copy">
            {template.description}
          </p>

          {/* Holiday / Occasion Tags */}
          {template.tags && template.tags.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-4">
              {template.tags.map((tag) => (
                <span key={tag} className="badge rounded-pill fw-medium nc-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={() => onOpenInteractive(template)}
          className="btn w-100 py-2 px-3 rounded-3 d-inline-flex align-items-center justify-content-center gap-2 nc-launch-card-btn"
          style={{
            backgroundColor: template.themeColor || '#1B3B2B',
            color: '#FAF7F2',
            borderColor: 'rgba(197, 160, 89, 0.55)',
          }}
        >
          <Eye size={15} style={{ color: '#C5A059' }} />
          <span>Open Live Invitation</span>
        </button>
      </div>
    </article>
  );
};

/**
 * ============================================================================
 * GRID CARD COMPONENT: EMPTY TEMPLATE PLACEHOLDER SLOT
 * ============================================================================
 */
const EmptyTemplateSlotCard = ({ slot, onAddDesignClick }) => {
  const categoryLabel = CATEGORY_META[slot.category]?.label || 'Suite';

  return (
    <div className="card h-100 rounded-4 p-4 d-flex flex-column align-items-center justify-content-between text-center position-relative nc-empty-slot">
      {/* Printmaker Corner Registration Marks */}
      <RegistrationMarks color="#C5A059" />

      {/* Top Category & Slot Index Pill */}
      <div className="pt-2">
        <span className="badge rounded-pill px-3 py-2 nc-slot-index-pill">
          {categoryLabel.toUpperCase()} &bull; SLOT {slot.slotNumber}
        </span>
      </div>

      {/* Center Architectural Placeholder Content */}
      <div className="my-auto d-flex flex-column align-items-center py-4 nc-empty-body">
        <div className="rounded-circle d-flex align-items-center justify-content-center mb-3 nc-empty-icon-ring">
          <Layers size={20} style={{ color: '#C5A059' }} />
        </div>

        <p className="nc-micro-label mb-1" style={{ color: '#C5A059' }}>
          Available {categoryLabel} Slot
        </p>

        <h3 className="nc-font-serif fs-3 fw-medium text-dark mb-2">
          Future {categoryLabel} Design
        </h3>

        <p className="small mb-0 nc-muted-copy">
          Reserved modular slot in the Noel &amp; Co. {categoryLabel.toLowerCase()} collection.
          Add a bespoke stationery card here.
        </p>
      </div>

      {/* Bottom "+ Add Design to Slot" CTA */}
      <div className="w-100 pb-1">
        <button
          type="button"
          onClick={() => onAddDesignClick(slot)}
          className="btn w-100 py-2 px-3 rounded-3 d-inline-flex align-items-center justify-content-center gap-2 nc-add-slot-btn"
        >
          <Plus size={15} style={{ color: '#8B2635' }} />
          <span>Add Design to Slot</span>
        </button>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * MODAL: "+ ADD DESIGN TO SLOT" TEMPLATE BUILDER (BOOTSTRAP 5 STYLED)
 * ============================================================================
 */
const AddDesignModal = ({ isOpen, targetSlot, emptySlots, onClose, onSaveDesign }) => {
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [title, setTitle] = useState('');
  const [occasionInput, setOccasionInput] = useState('Christmas, Winter Gala');
  const [selectedSwatch, setSelectedSwatch] = useState(STUDIO_SWATCHES[0]);
  const [videoSrc, setVideoSrc] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const initialSlot = targetSlot || emptySlots[0] || null;
    if (initialSlot) {
      setSelectedSlotId(initialSlot.id);
      const catMeta = CATEGORY_META[initialSlot.category];
      setOccasionInput(catMeta?.defaultTags || 'Holiday Edition');
    }
    setTitle('');
    setSelectedSwatch(STUDIO_SWATCHES[0]);
    setVideoSrc('');
    setDescription('');
    setErrorMsg('');
  }, [isOpen, targetSlot, emptySlots]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setErrorMsg('Please enter an invitation template title.');
      return;
    }
    if (!selectedSlotId) {
      setErrorMsg('No empty slot selected.');
      return;
    }

    const parsedTags = occasionInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSaveDesign(selectedSlotId, {
      title: cleanTitle,
      editionLabel: `${parsedTags[0] || 'Seasonal'} Edition`,
      description:
        description.trim() ||
        'Bespoke Noel & Co. digital stationery card with tactile envelope reveal and interactive guest RSVP.',
      tags: parsedTags.length > 0 ? parsedTags : ['Holiday Edition'],
      themeColor: selectedSwatch.value,
      accentColor: '#C5A059',
      sealColor: selectedSwatch.seal,
      videoSrc: videoSrc.trim(),
    });
    onClose();
  };

  return (
    <div
      className="position-fixed top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center p-3 nc-modal-overlay nc-fade-in-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-design-modal-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card w-100 rounded-4 p-4 p-sm-5 shadow-lg position-relative overflow-auto nc-builder-modal-card"
      >
        <CornerFiligree color="#C5A059" positionClass="nc-filigree-tl nc-opacity-60" />
        <CornerFiligree
          color="#C5A059"
          positionClass="nc-filigree-tr nc-rotate-90 nc-opacity-60"
        />

        {/* Modal Header */}
        <div className="position-relative z-1 d-flex align-items-start justify-content-between gap-3 mb-4">
          <div>
            <span className="nc-micro-label" style={{ color: '#C5A059' }}>
              Noel &amp; Co. Template Studio
            </span>
            <h2
              id="add-design-modal-title"
              className="nc-font-serif fs-2 fw-semibold text-dark mt-1 mb-0"
            >
              Add New Invitation Design
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center nc-icon-circle-btn"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="position-relative z-1">
          {/* Target Slot Selector */}
          <div className="mb-3">
            <label className="form-label nc-micro-label text-dark">
              Target Grid Slot
            </label>
            <select
              value={selectedSlotId}
              onChange={(e) => {
                const nextId = e.target.value;
                setSelectedSlotId(nextId);
                const found = emptySlots.find((s) => s.id === nextId);
                if (found && CATEGORY_META[found.category]) {
                  setOccasionInput(CATEGORY_META[found.category].defaultTags);
                }
              }}
              className="form-select rounded-3 nc-input-ivory"
            >
              {emptySlots.map((s) => {
                const catName = CATEGORY_META[s.category]?.label || 'Suite';
                return (
                  <option key={s.id} value={s.id}>
                    [{catName}] SLOT {s.slotNumber} — Available Placeholder
                  </option>
                );
              })}
            </select>
          </div>

          {/* Template Title */}
          <div className="mb-3">
            <label className="form-label nc-micro-label text-dark">
              Invitation Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="e.g., Winter Solstice Velvet Dinner"
              className="form-control rounded-3 nc-input-ivory"
            />
          </div>

          {/* Occasion / Holiday Tags */}
          <div className="mb-3">
            <label className="form-label nc-micro-label text-dark">
              Occasion / Holiday Tags (comma separated)
            </label>
            <input
              type="text"
              value={occasionInput}
              onChange={(e) => setOccasionInput(e.target.value)}
              placeholder="Christmas, New Year, Cocktail Soirée"
              className="form-control rounded-3 nc-input-ivory"
            />
          </div>

          {/* Theme Color Swatch Picker */}
          <div className="mb-3">
            <label className="form-label nc-micro-label text-dark">
              Envelope &amp; Stationery Palette
            </label>
            <div className="row g-2">
              {STUDIO_SWATCHES.map((swatch) => {
                const isSelected = selectedSwatch.value === swatch.value;
                return (
                  <div key={swatch.value} className="col-6 col-sm-4">
                    <button
                      type="button"
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`btn w-100 d-flex align-items-center gap-2 px-2 py-2 rounded-3 text-start nc-swatch-btn ${
                        isSelected ? 'nc-swatch-selected' : ''
                      }`}
                    >
                      <span
                        className="rounded-circle flex-shrink-0 nc-swatch-dot"
                        style={{ backgroundColor: swatch.value }}
                      />
                      <span className="text-truncate small fw-medium text-dark">
                        {swatch.name}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Optional Sample Video URL */}
          <div className="mb-3">
            <label className="form-label nc-micro-label text-dark">
              Optional Sample Video URL (.mp4 / .webm)
            </label>
            <input
              type="text"
              value={videoSrc}
              onChange={(e) => setVideoSrc(e.target.value)}
              placeholder="Leave blank to use the 3D animated envelope preview"
              className="form-control rounded-3 nc-input-ivory"
            />
          </div>

          {/* Optional Editorial Description */}
          <div className="mb-3">
            <label className="form-label nc-micro-label text-dark">
              Card Summary (optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short editorial description displayed on the grid card..."
              className="form-control rounded-3 nc-input-ivory nc-no-resize"
            />
          </div>

          {errorMsg && (
            <div className="alert alert-danger py-2 px-3 small mb-3" role="alert">
              {errorMsg}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 d-flex align-items-center justify-content-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn px-4 py-2 rounded-3 nc-btn-outline-gold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn px-4 py-2 rounded-3 d-inline-flex align-items-center gap-2 nc-btn-pine"
            >
              <Check size={14} style={{ color: '#C5A059' }} />
              <span>Publish to Grid</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * AMBIENT PARTICLE CANVAS FOR FULL INTERACTIVE PREVIEW MODAL
 * ============================================================================
 */
const AmbientParticleCanvas = ({ theme, burstTrigger }) => {
  const canvasRef = useRef(null);
  const burstParticlesRef = useRef([]);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    if (!burstTrigger) return;
    const { x, y } = burstTrigger;
    const palette = ['#C5A059', '#E6D2A6', themeRef.current.colors.primary, '#8B2635', '#FFFFFF'];

    for (let i = 0; i < 46; i++) {
      const angle = (Math.PI * 2 * i) / 46 + (Math.random() - 0.5) * 0.25;
      const speed = 2.2 + Math.random() * 5.5;
      burstParticlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.8,
        size: 2.5 + Math.random() * 3.5,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        decay: 0.015 + Math.random() * 0.012,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
      });
    }
  }, [burstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = width < 640 ? 26 : 44;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 3.2,
      speedY: 0.25 + Math.random() * 0.65,
      speedX: (Math.random() - 0.5) * 0.45,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.25 + Math.random() * 0.45,
      colorIndex: Math.floor(Math.random() * 3),
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const currentTheme = themeRef.current;
      const mode = currentTheme.particleMode;
      const colors = currentTheme.colors.particleColors;

      particles.forEach((p) => {
        p.phase += 0.02;
        const color = colors[p.colorIndex % colors.length];

        if (mode === 'snow') {
          p.y += p.speedY;
          p.x += Math.sin(p.phase) * 0.35 + p.speedX * 0.2;
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = p.alpha * 0.75;
          ctx.fill();
          ctx.restore();
        } else if (mode === 'sparkle') {
          p.y -= p.speedY * 0.9;
          p.x += Math.sin(p.phase * 1.4) * 0.25;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(p.phase * 1.6));
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.fillStyle = color;
          ctx.globalAlpha = p.alpha * twinkle;
          ctx.beginPath();
          const s = p.r * 1.4;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
          ctx.restore();
        } else if (mode === 'diya') {
          p.y -= p.speedY * 0.55;
          p.x += Math.sin(p.phase * 0.8) * 0.4;
          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          const glow = 0.6 + 0.4 * Math.sin(p.phase * 1.5);
          const radius = p.r * 2.4;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2);
          grad.addColorStop(0, color);
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.save();
          ctx.globalAlpha = p.alpha * glow * 0.7;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (mode === 'leaves') {
          p.y += p.speedY * 0.8;
          p.x += Math.sin(p.phase) * 0.7 + 0.2;
          if (p.y > height + 15) {
            p.y = -15;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.phase) * 0.8);
          ctx.fillStyle = color;
          ctx.globalAlpha = p.alpha * 0.65;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.8, p.r * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (mode === 'confetti') {
          p.y += p.speedY * 0.85;
          p.x += Math.sin(p.phase * 1.3) * 0.65;
          if (p.y > height + 15) {
            p.y = -15;
            p.x = Math.random() * width;
          }
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.phase * 1.8);
          ctx.fillStyle = color;
          ctx.globalAlpha = 0.78;
          ctx.fillRect(-p.r * 1.4, -p.r * 0.7, p.r * 2.8, p.r * 1.4);
          ctx.restore();
        }
      });

      for (let i = burstParticlesRef.current.length - 1; i >= 0; i--) {
        const bp = burstParticlesRef.current[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += 0.12;
        bp.vx *= 0.98;
        bp.alpha -= bp.decay;
        bp.rotation += bp.vRot;

        if (bp.alpha <= 0) {
          burstParticlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(bp.x, bp.y);
        ctx.rotate(bp.rotation);
        ctx.globalAlpha = Math.max(0, bp.alpha);
        ctx.fillStyle = bp.color;
        ctx.fillRect(-bp.size / 2, -bp.size / 2, bp.size, bp.size * 0.65);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="position-fixed top-0 start-0 nc-no-pointer nc-particle-canvas"
      aria-hidden="true"
    />
  );
};

/**
 * ============================================================================
 * FULL INTERACTIVE INVITATION PREVIEW MODAL (BOOTSTRAP 5 + CUSTOM 3D CSS)
 * ============================================================================
 */
const FullInteractivePreviewModal = ({
  template,
  categoryHeading = 'All Invitation Templates',
  onClose,
}) => {
  const isBirthday = template?.templateType === 'birthday';
  const isKidsBday = template?.templateType === 'kids-bday';
  const isWedding = template?.templateType === 'wedding';

  // Holiday switcher state
  const [activeHolidayId, setActiveHolidayId] = useState(
    template?.defaultHolidayId || 'christmas'
  );

  // Living 3D Envelope & Scroll states
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [cardElevated, setCardElevated] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [rsvpStatus, setRsvpStatus] = useState(null); // 'yes' | 'no' | null
  const [guestName, setGuestName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [burstTrigger, setBurstTrigger] = useState(null);
  const [modalScrollProgress, setModalScrollProgress] = useState(0);

  // Live Inline Customizer state for "Balloon & Crown Jamboree" Kids Birthday
  const [kidsColorwayId, setKidsColorwayId] = useState('sunny');
  const [kidsChildName, setKidsChildName] = useState('Leo');
  const [kidsAge, setKidsAge] = useState('5');
  const [kidsHeadline, setKidsHeadline] = useState('LEO TURNS 5!');
  const [kidsSubtitle, setKidsSubtitle] = useState("You're invited to a birthday bash!");
  const [kidsDate, setKidsDate] = useState('SATURDAY, JUNE 14');
  const [kidsTime, setKidsTime] = useState('2:00 PM');
  const [kidsVenue, setKidsVenue] = useState('SUNSHINE GARDEN PAVILION');

  // Live Inline Customizer state for "Another Round" Adult Birthday
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [bdayHonoree, setBdayHonoree] = useState("Sarah's Birthday");
  const [bdayAge, setBdayAge] = useState('40');
  const [bdayDate, setBdayDate] = useState('June 25th');
  const [bdayTime, setBdayTime] = useState('7 p.m.');
  const [bdayVenue, setBdayVenue] = useState('12th Knot\nSea Containers,\nLondon');

  // Live Inline Customizer state for "Glimpse Into Forever" Classic Wedding
  const [weddingColorwayId, setWeddingColorwayId] = useState('ivory');
  const [wedCouple, setWedCouple] = useState('RENÉE & GÉRARD');
  const [wedInviteLine, setWedInviteLine] = useState('invite you to celebrate their marriage');
  const [wedDate, setWedDate] = useState('TUESDAY, JULY 21, 1925');
  const [wedTime, setWedTime] = useState('AT FOUR IN THE AFTERNOON');
  const [wedVenue, setWedVenue] = useState('ANSONIA HOTEL');
  const [wedPhotoUrl, setWedPhotoUrl] = useState('');
  const [wedBwFilter, setWedBwFilter] = useState(true);

  const scrollContainerRef = useRef(null);
  const rsvpSectionRef = useRef(null);

  useEffect(() => {
    setIsEnvelopeOpen(false);
    setCardElevated(false);
    setRsvpStatus(null);
    setSavedName('');
    setShowCustomizer(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0 });
    }
  }, [template?.id]);

  const wedPalette = WEDDING_COLORWAYS[weddingColorwayId] || WEDDING_COLORWAYS.ivory;
  const kidsPalette = KIDS_BDAY_COLORWAYS[kidsColorwayId] || KIDS_BDAY_COLORWAYS.sunny;
  const coupleMonogram = getCoupleMonogram(wedCouple);

  const handleWeddingPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setWedPhotoUrl(objectUrl);
  };

  const baseTheme = HOLIDAY_THEMES[activeHolidayId] || HOLIDAY_THEMES.christmas;
  const theme = isBirthday
    ? {
        id: 'birthday',
        label: 'Milestone Birthday',
        badge: 'Another Round Edition',
        title: bdayHonoree || "Sarah's Birthday",
        subtitle: 'ANOTHER ROUND • MILESTONE BIRTHDAY COCKTAIL SOIRÉE',
        colors: {
          pageBg: '#222220',
          pageText: '#f3f0e8',
          mutedText: '#d6cfc4',
          primary: '#edc6a8',
          secondary: '#8B2635',
          accent: '#C5A059',
          accentLight: '#f5f2e9',
          envelopeBody: '#edc6a8',
          envelopeFlap: '#e5ba99',
          envelopePocket: '#e2b593',
          waxSeal: '#181818',
          cardBg: '#f1ccb0',
          cardBorder: '#edc6a8',
          particleColors: ['#edc6a8', '#f3f0e8', '#C5A059'],
        },
        particleMode: 'sparkle',
      }
    : isKidsBday
    ? {
        id: 'kids-bday',
        label: 'Kids Birthday',
        badge: 'Balloon & Crown Jamboree',
        title: kidsHeadline || `${String(kidsChildName || 'LEO').toUpperCase()} TURNS ${kidsAge || '5'}!`,
        subtitle: kidsSubtitle || "You're invited to a birthday bash!",
        colors: {
          pageBg: kidsPalette.backdropBg,
          pageText: kidsPalette.headlineColor,
          mutedText: kidsPalette.metaColor,
          primary: kidsPalette.headlineColor,
          secondary: '#e06d3b',
          accent: '#f4b942',
          accentLight: '#fffdf8',
          envelopeBody: kidsPalette.envelopeBody,
          envelopeFlap: kidsPalette.envelopeFlap,
          envelopePocket: kidsPalette.envelopePocket,
          waxSeal: kidsPalette.sealBg,
          cardBg: kidsPalette.cardBg,
          cardBorder: kidsPalette.scallopBorder,
          particleColors: kidsPalette.confettiColors,
        },
        particleMode: 'confetti',
      }
    : isWedding
    ? {
        id: 'wedding',
        label: 'Classic Wedding',
        badge: 'Glimpse Into Forever',
        title: wedCouple || 'RENÉE & GÉRARD',
        subtitle: 'ARCHITECTURAL CAMEO EDITION',
        colors: {
          pageBg: wedPalette.backdropBg,
          pageText: wedPalette.inkColor,
          mutedText: wedPalette.mutedInk,
          primary: wedPalette.isDark ? '#e6d2a6' : '#2c2a27',
          secondary: '#8B2635',
          accent: '#C5A059',
          accentLight: '#f6f4ee',
          envelopeBody: wedPalette.envelopeBody,
          envelopeFlap: wedPalette.envelopeFlap,
          envelopePocket: wedPalette.envelopePocket,
          waxSeal: wedPalette.sealBg,
          cardBg: wedPalette.cardBg,
          cardBorder: wedPalette.sealBorder,
          particleColors: wedPalette.isDark
            ? ['#e6d2a6', '#ffffff', '#C5A059']
            : ['#ffffff', '#e6d2a6', '#d8cfbe'],
        },
        particleMode: 'sparkle',
      }
    : template?.isBuiltIn
    ? baseTheme
    : {
        ...baseTheme,
        title: template?.title || baseTheme.title,
        subtitle: (template?.editionLabel || baseTheme.subtitle).toUpperCase(),
        hostNote: template?.description || baseTheme.hostNote,
        colors: {
          ...baseTheme.colors,
          primary: template?.themeColor || baseTheme.colors.primary,
          envelopeBody: template?.themeColor || baseTheme.colors.envelopeBody,
          envelopeFlap: template?.themeColor || baseTheme.colors.envelopeFlap,
          envelopePocket: template?.themeColor || baseTheme.colors.envelopePocket,
          waxSeal: template?.sealColor || baseTheme.colors.waxSeal,
        },
      };

  useEffect(() => {
    let timer;
    if (isEnvelopeOpen) {
      timer = setTimeout(() => {
        setCardElevated(true);
      }, 360);
    } else {
      setCardElevated(false);
    }
    return () => clearTimeout(timer);
  }, [isEnvelopeOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showCustomizer) {
          setShowCustomizer(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showCustomizer]);

  const handleContainerScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, el.scrollTop / maxScroll)) : 0;
    setModalScrollProgress(progress);
  };

  const handleMouseMove = (e) => {
    if (isEnvelopeOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 8, rotateY: x * 10 });
  };

  const handleMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });

  const handleSelectRsvp = (choice, event) => {
    setRsvpStatus(choice);
    if (choice === 'yes' && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setBurstTrigger({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        timestamp: Date.now(),
      });
    }
  };

  const scrollToRsvp = () => {
    rsvpSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const holidays = Object.values(HOLIDAY_THEMES);
  const bottomFactor = Math.max(0, Math.min(1, (modalScrollProgress - 0.62) / 0.38));

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleContainerScroll}
      role="dialog"
      aria-modal="true"
      aria-label={`Interactive Preview: ${template?.title}`}
      className="position-fixed top-0 start-0 end-0 bottom-0 overflow-auto nc-interactive-modal"
      style={{
        backgroundColor: theme.colors.pageBg,
        color: theme.colors.pageText,
      }}
    >
      {/* Ambient Holiday Particles & RSVP Celebration Burst */}
      <AmbientParticleCanvas theme={theme} burstTrigger={burstTrigger} />

      {/* Terrazzo Matte Charcoal Background (Fixed across scroll stages for Birthday Edition) */}
      {isBirthday && (
        <div className="position-fixed top-0 start-0 end-0 bottom-0 nc-no-pointer nc-z-0">
          <TerrazzoBackdrop patternId="fullscreen-terrazzo-pattern" className="w-100 h-100" />
          <div className="position-absolute top-0 start-0 end-0 bottom-0 nc-terrazzo-vignette" />
        </div>
      )}

      {/* Soft Woven Linen / Plaster Studio Texture (Fixed for Wedding Edition) */}
      {isWedding && (
        <div
          className="position-fixed top-0 start-0 end-0 bottom-0 nc-no-pointer nc-z-0 nc-linen-texture"
          style={{
            opacity: wedPalette.isDark ? 0.25 : 0.9,
          }}
        />
      )}

      {/* Scroll Progress Hairline */}
      <div
        className="position-fixed top-0 start-0 nc-scroll-progress"
        style={{
          width: `${modalScrollProgress * 100}%`,
          backgroundColor: isBirthday ? '#edc6a8' : theme.colors.accent,
        }}
      />

      {/* Sticky Top Control Bar */}
      <header
        className="position-sticky top-0 w-100 px-3 py-3 border-bottom nc-sticky-topbar"
        style={{
          backgroundColor: isBirthday
            ? 'rgba(28, 28, 26, 0.92)'
            : isKidsBday
            ? 'rgba(255, 250, 240, 0.94)'
            : isWedding
            ? wedPalette.isDark
              ? 'rgba(20, 20, 19, 0.92)'
              : 'rgba(246, 244, 238, 0.92)'
            : 'rgba(250, 247, 242, 0.92)',
          borderColor: isBirthday
            ? 'rgba(237, 198, 168, 0.28)'
            : isKidsBday
            ? 'rgba(126, 196, 232, 0.45)'
            : 'rgba(197, 160, 89, 0.38)',
        }}
      >
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2">
          {/* Prominent Back to [Category Heading] Button */}
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 nc-topbar-back-btn"
            style={{
              backgroundColor: isBirthday
                ? '#2c2c29'
                : isWedding && wedPalette.isDark
                ? '#242421'
                : '#FFFDF9',
              borderColor: isBirthday
                ? 'rgba(237, 198, 168, 0.55)'
                : isKidsBday
                ? 'rgba(126, 196, 232, 0.7)'
                : 'rgba(197, 160, 89, 0.6)',
              color:
                isBirthday || (isWedding && wedPalette.isDark)
                  ? '#f3f0e8'
                  : isKidsBday
                  ? kidsPalette.headlineColor
                  : '#1C1917',
            }}
          >
            <ArrowLeft
              size={14}
              style={{
                color: isBirthday
                  ? '#edc6a8'
                  : isKidsBday
                  ? '#e06d3b'
                  : '#8B2635',
              }}
            />
            <span>Back to {categoryHeading}</span>
          </button>

          {/* Right Controls: Kids Bday / Birthday Customizer / Wedding Swatches / Holiday Switcher */}
          {isKidsBday ? (
            <div className="d-flex flex-wrap align-items-center gap-3">
              {/* 3 Circular Pastel Colorway Swatches */}
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border"
                style={{
                  backgroundColor: 'rgba(255, 253, 248, 0.94)',
                  borderColor: 'rgba(126, 196, 232, 0.6)',
                }}
                aria-label="Kids Party Color Swatches"
              >
                <span
                  className="nc-micro-label d-none d-sm-inline"
                  style={{ color: kidsPalette.metaColor, fontSize: '0.6rem' }}
                >
                  Palette
                </span>
                {Object.values(KIDS_BDAY_COLORWAYS).map((cw) => {
                  const selected = kidsColorwayId === cw.id;
                  return (
                    <button
                      key={cw.id}
                      type="button"
                      onClick={() => setKidsColorwayId(cw.id)}
                      title={cw.label}
                      aria-label={`Select ${cw.label} palette`}
                      className="btn p-0 rounded-circle nc-colorway-dot"
                      style={{
                        backgroundColor: cw.swatchBg,
                        boxShadow: selected
                          ? '0 0 0 2px #FFFDF8, 0 0 0 3.5px #f4b942'
                          : 'inset 0 0 0 1px rgba(0,0,0,0.18)',
                      }}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowCustomizer((prev) => !prev)}
                className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 nc-topbar-back-btn"
                style={{
                  backgroundColor: showCustomizer ? kidsPalette.headlineColor : '#FFFDF8',
                  borderColor: '#f4b942',
                  color: showCustomizer ? '#FFFDF8' : kidsPalette.headlineColor,
                }}
              >
                <SlidersHorizontal size={14} style={{ color: '#f4b942' }} />
                <span>{showCustomizer ? 'Done Customizing' : 'Customize Card'}</span>
              </button>
            </div>
          ) : isBirthday ? (
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCustomizer((prev) => !prev)}
                className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 nc-topbar-back-btn"
                style={{
                  backgroundColor: showCustomizer ? '#edc6a8' : '#2c2c29',
                  borderColor: 'rgba(237, 198, 168, 0.65)',
                  color: showCustomizer ? '#181818' : '#f3f0e8',
                }}
              >
                <SlidersHorizontal
                  size={14}
                  style={{ color: showCustomizer ? '#181818' : '#edc6a8' }}
                />
                <span>{showCustomizer ? 'Done Customizing' : 'Customize Card'}</span>
              </button>
            </div>
          ) : isWedding ? (
            <div className="d-flex flex-wrap align-items-center gap-3">
              {/* 3 Circular Paper Colorway Swatches */}
              <div
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border"
                style={{
                  backgroundColor: wedPalette.isDark
                    ? 'rgba(28, 28, 26, 0.92)'
                    : 'rgba(255, 253, 249, 0.92)',
                  borderColor: 'rgba(197, 160, 89, 0.5)',
                }}
                aria-label="Wedding Paper Color Swatches"
              >
                <span
                  className="nc-micro-label d-none d-sm-inline"
                  style={{ color: wedPalette.mutedInk, fontSize: '0.6rem' }}
                >
                  Paper
                </span>
                {Object.values(WEDDING_COLORWAYS).map((cw) => {
                  const selected = weddingColorwayId === cw.id;
                  return (
                    <button
                      key={cw.id}
                      type="button"
                      onClick={() => setWeddingColorwayId(cw.id)}
                      title={cw.label}
                      aria-label={`Select ${cw.label} paper colorway`}
                      className="btn p-0 rounded-circle nc-colorway-dot"
                      style={{
                        backgroundColor: cw.swatchBg,
                        boxShadow: selected
                          ? `0 0 0 2px ${wedPalette.backdropBg}, 0 0 0 3.5px #C5A059`
                          : 'inset 0 0 0 1px rgba(0,0,0,0.22)',
                      }}
                    />
                  );
                })}
              </div>

              {/* Live Customize Card Toggle */}
              <button
                type="button"
                onClick={() => setShowCustomizer((prev) => !prev)}
                className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 nc-topbar-back-btn"
                style={{
                  backgroundColor: showCustomizer
                    ? '#C5A059'
                    : wedPalette.isDark
                    ? '#242421'
                    : '#FFFDF9',
                  borderColor: 'rgba(197, 160, 89, 0.65)',
                  color: showCustomizer
                    ? '#181818'
                    : wedPalette.isDark
                    ? '#f3f0e8'
                    : '#1C1917',
                }}
              >
                <SlidersHorizontal
                  size={14}
                  style={{ color: showCustomizer ? '#181818' : '#C5A059' }}
                />
                <span>{showCustomizer ? 'Done Customizing' : 'Customize Card'}</span>
              </button>
            </div>
          ) : (
            /* Holiday Theme Switcher Pill Bar */
            <nav
              aria-label="Holiday Invitation Themes"
              className="d-inline-flex align-items-center gap-1 p-1 rounded-pill border shadow-sm nc-holiday-switcher"
            >
              {holidays.map((item) => {
                const isActive = item.id === activeHolidayId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveHolidayId(item.id)}
                    aria-pressed={isActive}
                    className="btn btn-sm rounded-pill px-3 py-1 nc-holiday-pill"
                    style={{
                      backgroundColor: isActive ? item.colors.primary : 'transparent',
                      color: isActive ? '#FAF7F2' : '#1C1917',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Toggleable Live Inline Customizer Drawer for "Balloon & Crown Jamboree" Kids Birthday */}
        {isKidsBday && showCustomizer && (
          <div
            className="container mt-3 pt-3 border-top nc-fade-in-up"
            style={{ borderColor: 'rgba(126, 196, 232, 0.45)' }}
          >
            <div className="row g-3 text-start">
              <div className="col-12 col-sm-6 col-lg-3">
                <label
                  className="form-label nc-micro-label mb-1"
                  style={{ color: kidsPalette.headlineColor }}
                >
                  Child&apos;s Name &amp; Age
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={kidsChildName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKidsChildName(val);
                      setKidsHeadline(
                        `${String(val || 'LEO').toUpperCase()} TURNS ${kidsAge || '5'}!`
                      );
                    }}
                    placeholder="Name"
                    className="form-control form-control-sm w-75 nc-input-ivory"
                  />
                  <input
                    type="text"
                    maxLength={3}
                    value={kidsAge}
                    onChange={(e) => {
                      const val = e.target.value;
                      setKidsAge(val);
                      setKidsHeadline(
                        `${String(kidsChildName || 'LEO').toUpperCase()} TURNS ${val || '5'}!`
                      );
                    }}
                    placeholder="Age"
                    className="form-control form-control-sm w-25 nc-input-ivory"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label
                  className="form-label nc-micro-label mb-1"
                  style={{ color: kidsPalette.headlineColor }}
                >
                  Headline &amp; Party Note
                </label>
                <input
                  type="text"
                  value={kidsHeadline}
                  onChange={(e) => setKidsHeadline(e.target.value)}
                  className="form-control form-control-sm mb-1 nc-input-ivory"
                />
                <input
                  type="text"
                  value={kidsSubtitle}
                  onChange={(e) => setKidsSubtitle(e.target.value)}
                  className="form-control form-control-sm nc-input-ivory"
                />
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label
                  className="form-label nc-micro-label mb-1"
                  style={{ color: kidsPalette.headlineColor }}
                >
                  Date &amp; Time
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={kidsDate}
                    onChange={(e) => setKidsDate(e.target.value)}
                    placeholder="Date"
                    className="form-control form-control-sm w-50 nc-input-ivory"
                  />
                  <input
                    type="text"
                    value={kidsTime}
                    onChange={(e) => setKidsTime(e.target.value)}
                    placeholder="Time"
                    className="form-control form-control-sm w-50 nc-input-ivory"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label
                  className="form-label nc-micro-label mb-1"
                  style={{ color: kidsPalette.headlineColor }}
                >
                  Party Venue
                </label>
                <input
                  type="text"
                  value={kidsVenue}
                  onChange={(e) => setKidsVenue(e.target.value)}
                  className="form-control form-control-sm nc-input-ivory"
                />
              </div>
            </div>
          </div>
        )}

        {/* Toggleable Live Inline Customizer Drawer for "Another Round" Birthday */}
        {isBirthday && showCustomizer && (
          <div className="container mt-3 pt-3 border-top border-secondary nc-fade-in-up">
            <div className="row g-3 text-start">
              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#edc6a8' }}>
                  Honoree Title
                </label>
                <input
                  type="text"
                  value={bdayHonoree}
                  onChange={(e) => setBdayHonoree(e.target.value)}
                  className="form-control form-control-sm nc-input-dark"
                />
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#edc6a8' }}>
                  Bottle Milestone Age
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={bdayAge}
                  onChange={(e) => setBdayAge(e.target.value)}
                  className="form-control form-control-sm nc-input-dark"
                />
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#edc6a8' }}>
                  Date &amp; Time
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={bdayDate}
                    onChange={(e) => setBdayDate(e.target.value)}
                    placeholder="Date"
                    className="form-control form-control-sm w-50 nc-input-dark"
                  />
                  <input
                    type="text"
                    value={bdayTime}
                    onChange={(e) => setBdayTime(e.target.value)}
                    placeholder="Time"
                    className="form-control form-control-sm w-50 nc-input-dark"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#edc6a8' }}>
                  Venue (3 lines)
                </label>
                <textarea
                  rows={2}
                  value={bdayVenue}
                  onChange={(e) => setBdayVenue(e.target.value)}
                  className="form-control form-control-sm nc-input-dark nc-no-resize"
                />
              </div>
            </div>
          </div>
        )}

        {/* Toggleable Live Inline Customizer Drawer for "Glimpse Into Forever" Classic Wedding */}
        {isWedding && showCustomizer && (
          <div
            className="container mt-3 pt-3 border-top nc-fade-in-up"
            style={{ borderColor: 'rgba(197, 160, 89, 0.35)' }}
          >
            <div className="row g-3 text-start">
              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#C5A059' }}>
                  Couple Names
                </label>
                <input
                  type="text"
                  value={wedCouple}
                  onChange={(e) => setWedCouple(e.target.value)}
                  className={`form-control form-control-sm ${
                    wedPalette.isDark ? 'nc-input-dark' : 'nc-input-ivory'
                  }`}
                />
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#C5A059' }}>
                  Invitation Line
                </label>
                <input
                  type="text"
                  value={wedInviteLine}
                  onChange={(e) => setWedInviteLine(e.target.value)}
                  className={`form-control form-control-sm ${
                    wedPalette.isDark ? 'nc-input-dark' : 'nc-input-ivory'
                  }`}
                />
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#C5A059' }}>
                  Date &amp; Time
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    value={wedDate}
                    onChange={(e) => setWedDate(e.target.value)}
                    placeholder="Date"
                    className={`form-control form-control-sm w-50 ${
                      wedPalette.isDark ? 'nc-input-dark' : 'nc-input-ivory'
                    }`}
                  />
                  <input
                    type="text"
                    value={wedTime}
                    onChange={(e) => setWedTime(e.target.value)}
                    placeholder="Time"
                    className={`form-control form-control-sm w-50 ${
                      wedPalette.isDark ? 'nc-input-dark' : 'nc-input-ivory'
                    }`}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label nc-micro-label mb-1" style={{ color: '#C5A059' }}>
                  Venue &amp; Cameo Photo
                </label>
                <input
                  type="text"
                  value={wedVenue}
                  onChange={(e) => setWedVenue(e.target.value)}
                  className={`form-control form-control-sm mb-2 ${
                    wedPalette.isDark ? 'nc-input-dark' : 'nc-input-ivory'
                  }`}
                />
                <div className="d-flex flex-wrap align-items-center gap-2">
                  <label className="btn btn-sm rounded-2 d-inline-flex align-items-center gap-1 nc-btn-outline-pine mb-0">
                    <Upload size={12} />
                    <span>{wedPhotoUrl ? 'Change Photo' : 'Upload Portrait'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleWeddingPhotoUpload}
                      className="d-none"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setWedBwFilter((prev) => !prev)}
                    className="btn btn-sm rounded-2 nc-btn-outline-gold"
                    style={{ fontSize: '0.64rem', padding: '0.25rem 0.55rem' }}
                  >
                    {wedBwFilter ? 'B&W: On' : 'B&W: Off'}
                  </button>

                  {wedPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => setWedPhotoUrl('')}
                      className="btn btn-sm p-0 border-0 nc-reset-slot-btn"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          STAGE 0: LIVING 3D INBOX ENVELOPE & EXPANDING INVITATION CARD
         ==================================================================== */}
      <section className="position-relative w-100 d-flex flex-column align-items-center justify-content-between pt-4 pb-5 px-3 nc-stage-hero nc-z-2">
        {/* Delivery Status Pill */}
        <div
          className="badge rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 border nc-delivery-pill"
          style={{
            borderColor: isBirthday
              ? 'rgba(237, 198, 168, 0.45)'
              : isKidsBday
              ? 'rgba(126, 196, 232, 0.65)'
              : `${theme.colors.accent}60`,
            color: isBirthday ? '#f3f0e8' : theme.colors.mutedText,
            backgroundColor: isBirthday
              ? 'rgba(34, 34, 32, 0.82)'
              : isWedding && wedPalette.isDark
              ? 'rgba(28, 28, 26, 0.85)'
              : 'rgba(255,253,249,0.88)',
          }}
        >
          <span
            className="nc-pulse-dot"
            style={{ backgroundColor: isBirthday ? '#edc6a8' : theme.colors.accent }}
          />
          <span>
            {isEnvelopeOpen
              ? `Noel & Co. • ${theme.badge}`
              : isBirthday
              ? 'Another Round • Tap Seal or Envelope to Open'
              : isKidsBday
              ? 'Balloon & Crown Jamboree • Tap Golden Star Seal to Open'
              : isWedding
              ? 'Glimpse Into Forever • Tap Monogram Seal to Open'
              : 'Private Digital Delivery • Tap Envelope to Open'}
          </span>
        </div>

        {/* Center 3D Envelope or Expanded Card */}
        <div className="position-relative w-100 d-flex align-items-center justify-content-center my-auto py-4 nc-hero-stage-box">
          {/* STATE A: SEALED / OPENING 3D ENVELOPE */}
          <div
            className={`w-100 d-flex flex-column align-items-center nc-envelope-state ${
              cardElevated ? 'nc-state-hidden position-absolute' : 'nc-state-visible position-relative'
            }`}
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={`Open ${theme.title} envelope`}
              onClick={() => setIsEnvelopeOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsEnvelopeOpen(true);
                }
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`position-relative nc-pointer nc-no-select nc-hero-envelope ${
                !isEnvelopeOpen ? 'nc-animate-float' : ''
              }`}
            >
              {/* Ground Shadow */}
              <div
                className="nc-hero-shadow"
                style={{
                  backgroundColor: isBirthday ? '#000000' : theme.colors.primary,
                  opacity: isBirthday ? 0.55 : 0.25,
                }}
              />

              <div
                className="position-relative w-100 h-100 rounded-4 nc-preserve-3d nc-tilt-transition"
                style={{
                  transform: isEnvelopeOpen
                    ? 'rotateX(0deg) rotateY(0deg)'
                    : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                }}
              >
                {/* Envelope Back & Liner */}
                <div
                  className={`position-absolute top-0 start-0 end-0 bottom-0 rounded-4 shadow-lg border ${
                    isKidsBday ? 'nc-kids-striped-liner' : ''
                  }`}
                  style={{
                    backgroundColor: isBirthday
                      ? '#f5f2e9'
                      : isWedding
                      ? wedPalette.envelopeLiner
                      : theme.colors.envelopeBody,
                    borderColor: isBirthday
                      ? 'rgba(237, 198, 168, 0.7)'
                      : isKidsBday
                      ? kidsPalette.scallopBorder
                      : isWedding
                      ? `${wedPalette.sealBorder}90`
                      : `${theme.colors.accent}45`,
                  }}
                />

                {/* Rising Invitation Card Preview */}
                <div
                  className="position-absolute rounded-3 overflow-hidden nc-hero-rising-card"
                  style={{
                    backgroundColor: isWedding || isKidsBday ? 'transparent' : theme.colors.cardBg,
                    border:
                      isWedding || isKidsBday
                        ? 'none'
                        : `1px solid ${isBirthday ? '#d8ae8e' : theme.colors.cardBorder}`,
                    boxShadow:
                      isWedding || isKidsBday ? 'none' : '0 4px 14px rgba(0,0,0,0.14)',
                    transform: isEnvelopeOpen ? 'translateY(-44%)' : 'translateY(0%)',
                    zIndex: isEnvelopeOpen ? 15 : 2,
                  }}
                >
                  {isBirthday ? (
                    <AnotherRoundCardArtwork
                      honoreeTitle={bdayHonoree}
                      milestoneAge={bdayAge}
                      eventDate={bdayDate}
                      eventTime={bdayTime}
                      venueText={bdayVenue}
                      compact
                    />
                  ) : isKidsBday ? (
                    <KidsBirthdayCardArtwork
                      childName={kidsChildName}
                      age={kidsAge}
                      headline={kidsHeadline}
                      subtitle={kidsSubtitle}
                      eventDate={kidsDate}
                      eventTime={kidsTime}
                      venueName={kidsVenue}
                      colorwayId={kidsColorwayId}
                      compact
                    />
                  ) : isWedding ? (
                    <GlimpseIntoForeverCardArtwork
                      coupleNames={wedCouple}
                      invitationLine={wedInviteLine}
                      eventDate={wedDate}
                      eventTime={wedTime}
                      venueName={wedVenue}
                      colorwayId={weddingColorwayId}
                      photoUrl={wedPhotoUrl}
                      bwFilter={wedBwFilter}
                      compact
                      instanceId="hero-rising"
                    />
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-start pt-4 px-3 text-center">
                      <span
                        className="nc-micro-label"
                        style={{ color: theme.colors.accent }}
                      >
                        Noel &amp; Co.
                      </span>
                      <p
                        className="nc-font-serif fs-4 mt-1 mb-0 fw-semibold"
                        style={{ color: theme.colors.pageText }}
                      >
                        {theme.title}
                      </p>
                      <div
                        className="mt-2 nc-mini-rule"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                    </div>
                  )}
                </div>

                {/* Envelope Front Pocket */}
                <div
                  className="position-absolute top-0 start-0 end-0 bottom-0 rounded-4 overflow-hidden nc-no-pointer"
                  style={{ zIndex: 10 }}
                >
                  <div
                    className="position-absolute top-0 start-0 end-0 bottom-0 nc-pocket-left"
                    style={{ backgroundColor: theme.colors.envelopePocket }}
                  />
                  <div
                    className="position-absolute top-0 start-0 end-0 bottom-0 nc-pocket-right"
                    style={{ backgroundColor: theme.colors.envelopePocket }}
                  />
                  <div
                    className="position-absolute top-0 start-0 end-0 bottom-0 nc-pocket-bottom"
                    style={{ backgroundColor: theme.colors.envelopeBody }}
                  />
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="position-absolute top-0 start-0 w-100 h-100"
                  >
                    <polyline
                      points="0,100 50,44 100,100"
                      fill="none"
                      stroke={
                        isBirthday
                          ? '#c59877'
                          : isKidsBday
                          ? kidsPalette.scallopBorder
                          : isWedding
                          ? wedPalette.sealBorder
                          : theme.colors.accent
                      }
                      strokeWidth="0.45"
                      strokeOpacity="0.75"
                    />
                  </svg>
                  <div className="position-absolute bottom-0 start-0 p-3 p-sm-4 text-start">
                    <p
                      className="mb-0 nc-envelope-overlabel"
                      style={{
                        color: isBirthday
                          ? '#5a4334'
                          : isKidsBday
                          ? kidsPalette.metaColor
                          : isWedding
                          ? wedPalette.mutedInk
                          : theme.colors.accentLight,
                      }}
                    >
                      You&apos;re Invited
                    </p>
                    <p
                      className={`mb-0 ${
                        isBirthday
                          ? 'nc-font-handwritten fs-5 nc-ink-text'
                          : isKidsBday
                          ? 'nc-font-fredoka small fw-semibold'
                          : isWedding
                          ? 'nc-font-serif fst-italic small'
                          : 'nc-font-serif fst-italic small text-white'
                      }`}
                      style={
                        isKidsBday
                          ? { color: kidsPalette.headlineColor }
                          : isWedding
                          ? { color: wedPalette.inkColor }
                          : undefined
                      }
                    >
                      {isBirthday
                        ? bdayHonoree
                        : isKidsBday
                        ? `${kidsChildName}'s ${kidsAge}th Birthday`
                        : isWedding
                        ? wedCouple
                        : `${theme.label} Edition`}
                    </p>
                  </div>
                </div>

                {/* Top Triangular Flap */}
                <div
                  className="position-absolute top-0 start-0 end-0 nc-hero-flap nc-no-pointer"
                  style={{
                    zIndex: isEnvelopeOpen ? 1 : 20,
                    transform: isEnvelopeOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                  }}
                >
                  <div
                    className="w-100 h-100 rounded-top-4 nc-flap-triangle"
                    style={{ backgroundColor: theme.colors.envelopeFlap }}
                  />
                </div>

                {/* Embossed Seal */}
                <div
                  className={`position-absolute nc-hero-seal-wrap ${
                    isEnvelopeOpen ? 'nc-seal-hidden nc-no-pointer' : 'nc-seal-visible'
                  }`}
                  style={{ zIndex: 30 }}
                >
                  <span
                    className="nc-seal-ping"
                    style={{
                      backgroundColor: isBirthday
                        ? '#181818'
                        : isWedding
                        ? wedPalette.sealBorder
                        : theme.colors.accent,
                    }}
                  />
                  <div
                    className="position-relative rounded-circle d-flex align-items-center justify-content-center shadow-lg nc-hero-seal"
                    style={{
                      backgroundColor: theme.colors.waxSeal,
                      borderColor: isBirthday
                        ? '#f1ccb0'
                        : isWedding
                        ? wedPalette.sealBorder
                        : theme.colors.accent,
                    }}
                  >
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center nc-hero-seal-inner"
                      style={{
                        borderColor: isBirthday
                          ? 'rgba(241, 204, 176, 0.65)'
                          : isWedding
                          ? `${wedPalette.sealBorder}95`
                          : `${theme.colors.accent}85`,
                      }}
                    >
                      <span
                        className={`${
                          isBirthday
                            ? 'nc-font-handwritten fs-4'
                            : isKidsBday
                            ? 'nc-font-fredoka small'
                            : 'nc-font-serif small'
                        } fw-semibold`}
                        style={{
                          color: isBirthday
                            ? '#f1ccb0'
                            : isKidsBday
                            ? kidsPalette.sealText
                            : isWedding
                            ? wedPalette.sealText
                            : theme.colors.accentLight,
                        }}
                      >
                        {isBirthday
                          ? bdayAge || '40'
                          : isKidsBday
                          ? `★ ${kidsAge || '5'}`
                          : isWedding
                          ? coupleMonogram
                          : 'N&C'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEnvelopeOpen(true)}
              className="btn btn-sm mt-4 rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 nc-seal-prompt-btn"
              style={{
                color: isBirthday ? '#f3f0e8' : theme.colors.mutedText,
                backgroundColor: isBirthday ? 'rgba(34, 34, 32, 0.78)' : 'transparent',
              }}
            >
              <Sparkles
                size={14}
                style={{ color: isBirthday ? '#edc6a8' : theme.colors.accent }}
              />
              <span>
                {isBirthday
                  ? `Tap the "${bdayAge || '40'}" seal to open your invitation`
                  : isKidsBday
                  ? `Tap the golden "★ ${kidsAge || '5'}" star seal to open your party invite`
                  : isWedding
                  ? `Tap the "${coupleMonogram}" seal to open your invitation`
                  : 'Click the wax seal to open your invitation'}
              </span>
            </button>
          </div>

          {/* STATE B: EXPANDED INVITATION CARD */}
          <article
            aria-live="polite"
            className={`w-100 nc-expanded-card-wrap ${
              cardElevated ? 'nc-card-shown position-relative' : 'nc-card-hidden position-absolute nc-no-pointer'
            }`}
          >
            {isBirthday ? (
              /* "ANOTHER ROUND" WARM PEACH & HAND-DRAWN INK BIRTHDAY CARD */
              <div className="d-flex flex-column align-items-center">
                <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-1 nc-bday-topbar">
                  <span className="nc-micro-label" style={{ color: '#edc6a8' }}>
                    Another Round &bull; Pulp Edition
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEnvelopeOpen(false)}
                    className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1 nc-seal-replay-btn"
                    style={{
                      borderColor: 'rgba(237, 198, 168, 0.5)',
                      color: '#f3f0e8',
                      backgroundColor: 'rgba(28, 28, 26, 0.85)',
                    }}
                  >
                    <RotateCcw size={12} style={{ color: '#edc6a8' }} />
                    <span>Seal Envelope</span>
                  </button>
                </div>

                <div className="position-relative w-100 rounded-2 overflow-hidden nc-bday-card">
                  <AnotherRoundCardArtwork
                    honoreeTitle={bdayHonoree}
                    milestoneAge={bdayAge}
                    eventDate={bdayDate}
                    eventTime={bdayTime}
                    venueText={bdayVenue}
                  />
                </div>
              </div>
            ) : isKidsBday ? (
              /* "BALLOON & CROWN JAMBOREE" PLAYFUL SCALLOPED KIDS BIRTHDAY CARD */
              <div className="d-flex flex-column align-items-center">
                <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-1 nc-kids-topbar">
                  <span
                    className="nc-micro-label"
                    style={{ color: kidsPalette.headlineColor }}
                  >
                    Balloon &amp; Crown &bull; {kidsPalette.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEnvelopeOpen(false)}
                    className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1 nc-seal-replay-btn"
                    style={{
                      borderColor: kidsPalette.scallopBorder,
                      color: kidsPalette.headlineColor,
                      backgroundColor: 'rgba(255, 253, 248, 0.94)',
                    }}
                  >
                    <RotateCcw size={12} style={{ color: '#f4b942' }} />
                    <span>Seal Envelope</span>
                  </button>
                </div>

                <div className="position-relative w-100 nc-kids-card-box">
                  <KidsBirthdayCardArtwork
                    childName={kidsChildName}
                    age={kidsAge}
                    headline={kidsHeadline}
                    subtitle={kidsSubtitle}
                    eventDate={kidsDate}
                    eventTime={kidsTime}
                    venueName={kidsVenue}
                    colorwayId={kidsColorwayId}
                  />
                </div>
              </div>
            ) : isWedding ? (
              /* "GLIMPSE INTO FOREVER" SCALLOPED-CORNER WEDDING INVITATION CARD */
              <div className="d-flex flex-column align-items-center">
                <div className="w-100 d-flex align-items-center justify-content-between mb-3 px-1 nc-wed-topbar">
                  <span
                    className="nc-micro-label"
                    style={{ color: wedPalette.mutedInk }}
                  >
                    Glimpse Into Forever &bull; {wedPalette.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEnvelopeOpen(false)}
                    className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1 nc-seal-replay-btn"
                    style={{
                      borderColor: 'rgba(197, 160, 89, 0.55)',
                      color: wedPalette.inkColor,
                      backgroundColor: wedPalette.isDark
                        ? 'rgba(28, 28, 26, 0.85)'
                        : 'rgba(255, 253, 249, 0.88)',
                    }}
                  >
                    <RotateCcw size={12} style={{ color: '#C5A059' }} />
                    <span>Seal Envelope</span>
                  </button>
                </div>

                <div className="position-relative w-100 nc-wed-card-box">
                  <GlimpseIntoForeverCardArtwork
                    coupleNames={wedCouple}
                    invitationLine={wedInviteLine}
                    eventDate={wedDate}
                    eventTime={wedTime}
                    venueName={wedVenue}
                    colorwayId={weddingColorwayId}
                    photoUrl={wedPhotoUrl}
                    bwFilter={wedBwFilter}
                    instanceId="expanded-modal"
                  />
                </div>
              </div>
            ) : (
              /* NOEL & CO. ORNATE HOLIDAY INVITATION CARD */
              <div
                className="card rounded-4 p-4 p-sm-5 shadow-lg border overflow-hidden position-relative nc-holiday-card"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: `${theme.colors.cardBorder}80`,
                }}
              >
                <div
                  className="position-absolute rounded-3 nc-no-pointer nc-card-inner-frame"
                  style={{ borderColor: `${theme.colors.accent}45` }}
                />
                <CornerFiligree color={theme.colors.accent} positionClass="nc-filigree-tl" />
                <CornerFiligree
                  color={theme.colors.accent}
                  positionClass="nc-filigree-tr nc-rotate-90"
                />
                <CornerFiligree
                  color={theme.colors.accent}
                  positionClass="nc-filigree-bl nc-rotate-n90"
                />
                <CornerFiligree
                  color={theme.colors.accent}
                  positionClass="nc-filigree-br nc-rotate-180"
                />

                {/* Seal Envelope Replay Button */}
                <div className="position-relative z-1 d-flex justify-content-end mb-2">
                  <button
                    type="button"
                    onClick={() => setIsEnvelopeOpen(false)}
                    className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 px-3 py-1 nc-seal-replay-btn"
                    style={{
                      borderColor: `${theme.colors.accent}55`,
                      color: theme.colors.mutedText,
                      backgroundColor: `${theme.colors.pageBg}90`,
                    }}
                  >
                    <RotateCcw size={12} style={{ color: theme.colors.accent }} />
                    <span>Seal Envelope</span>
                  </button>
                </div>

                {/* Invitation Typography & Logistics */}
                <div className="position-relative z-1 d-flex flex-column align-items-center text-center px-2 px-sm-4 pt-1 pb-2">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span
                      className="nc-crest-line"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                    <span
                      className="nc-font-serif fs-6 text-uppercase fw-semibold nc-crest-brand"
                      style={{ color: theme.colors.accent }}
                    >
                      Noel &amp; Co.
                    </span>
                    <span
                      className="nc-crest-line"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>

                  <p
                    className="mb-3 nc-micro-label"
                    style={{ color: theme.colors.mutedText }}
                  >
                    {theme.subtitle}
                  </p>

                  <h1
                    className="nc-font-serif display-6 fw-semibold mb-3 lh-sm"
                    style={{ color: theme.colors.pageText }}
                  >
                    {theme.title}
                  </h1>

                  <div className="d-flex align-items-center gap-2 my-2">
                    <span
                      className="nc-crest-line"
                      style={{ backgroundColor: `${theme.colors.accent}70` }}
                    />
                    <span className="small" style={{ color: theme.colors.accent }}>
                      {theme.crestSymbol}
                    </span>
                    <span
                      className="nc-crest-line"
                      style={{ backgroundColor: `${theme.colors.accent}70` }}
                    />
                  </div>

                  <p
                    className="nc-font-serif fst-italic fs-5 lh-base mt-2 mb-4 nc-host-note"
                    style={{ color: theme.colors.mutedText }}
                  >
                    &ldquo;{theme.hostNote}&rdquo;
                  </p>

                  <div
                    className="w-100 row g-3 pt-4 border-top text-start"
                    style={{ borderColor: `${theme.colors.accent}40` }}
                  >
                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-start gap-2">
                        <Calendar
                          size={16}
                          className="mt-1 flex-shrink-0"
                          style={{ color: theme.colors.accent }}
                        />
                        <div>
                          <p
                            className="mb-0 nc-micro-label"
                            style={{ color: theme.colors.mutedText }}
                          >
                            Date
                          </p>
                          <p
                            className="nc-font-serif fs-5 fw-semibold mb-0"
                            style={{ color: theme.colors.pageText }}
                          >
                            {theme.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-start gap-2">
                        <Clock
                          size={16}
                          className="mt-1 flex-shrink-0"
                          style={{ color: theme.colors.accent }}
                        />
                        <div>
                          <p
                            className="mb-0 nc-micro-label"
                            style={{ color: theme.colors.mutedText }}
                          >
                            Time
                          </p>
                          <p
                            className="nc-font-serif fs-5 fw-semibold mb-0"
                            style={{ color: theme.colors.pageText }}
                          >
                            {theme.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-start gap-2">
                        <MapPin
                          size={16}
                          className="mt-1 flex-shrink-0"
                          style={{ color: theme.colors.accent }}
                        />
                        <div>
                          <p
                            className="mb-0 nc-micro-label"
                            style={{ color: theme.colors.mutedText }}
                          >
                            Location
                          </p>
                          <p
                            className="nc-font-serif fs-5 fw-semibold mb-0"
                            style={{ color: theme.colors.pageText }}
                          >
                            {theme.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="d-flex align-items-start gap-2">
                        <Sparkles
                          size={16}
                          className="mt-1 flex-shrink-0"
                          style={{ color: theme.colors.accent }}
                        />
                        <div>
                          <p
                            className="mb-0 nc-micro-label"
                            style={{ color: theme.colors.mutedText }}
                          >
                            Attire
                          </p>
                          <p
                            className="nc-font-serif fs-5 fw-semibold mb-0"
                            style={{ color: theme.colors.pageText }}
                          >
                            {theme.dressCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Scroll Prompt */}
        <button
          type="button"
          onClick={scrollToRsvp}
          className="btn btn-sm d-flex flex-column align-items-center gap-1 pt-2 pb-1 text-center border-0"
        >
          <span
            className="px-3 py-1 rounded-pill nc-micro-label"
            style={{
              color: isBirthday ? '#f3f0e8' : theme.colors.mutedText,
              backgroundColor: isBirthday ? 'rgba(34, 34, 32, 0.78)' : 'transparent',
            }}
          >
            Scroll down to respond ↓
          </span>
          <ChevronDown
            size={18}
            className="nc-bounce"
            style={{ color: isBirthday ? '#edc6a8' : theme.colors.accent }}
          />
        </button>
      </section>

      {/* ====================================================================
          STAGE 1: COMPACT TWO-BUTTON RSVP ("I'll Come" / "I Won't Come")
         ==================================================================== */}
      <section
        ref={rsvpSectionRef}
        aria-label="RSVP Response"
        className="position-relative w-100 d-flex flex-column align-items-center justify-content-center px-3 py-5 nc-stage-rsvp nc-z-2"
      >
        <div
          className="w-100 d-flex flex-column align-items-center text-center rounded-4 p-4 p-sm-5 nc-rsvp-box"
          style={{
            backgroundColor: isBirthday ? 'rgba(28, 28, 26, 0.88)' : 'transparent',
            border: isBirthday ? '1px solid rgba(237, 198, 168, 0.28)' : 'none',
          }}
        >
          <div
            className="mb-4 nc-vertical-hairline"
            style={{
              background: `linear-gradient(to bottom, transparent, ${
                isBirthday ? '#edc6a8' : theme.colors.accent
              })`,
            }}
          />

          <span
            className="nc-micro-label mb-2"
            style={{ color: isBirthday ? '#edc6a8' : theme.colors.accent }}
          >
            Kindly Respond
          </span>

          <h2
            className="nc-font-serif fs-2 fw-semibold mb-4"
            style={{ color: theme.colors.pageText }}
          >
            {isKidsBday
              ? `Will you join ${kidsChildName}'s birthday celebration?`
              : 'Will you raise a glass with us?'}
          </h2>

          {/* Compact Two-Button RSVP */}
          <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-3">
            <button
              type="button"
              onClick={(e) => handleSelectRsvp('yes', e)}
              className="btn rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 nc-rsvp-btn"
              style={{
                backgroundColor:
                  rsvpStatus === 'yes'
                    ? isBirthday
                      ? '#f1ccb0'
                      : theme.colors.primary
                    : isBirthday
                    ? '#262624'
                    : 'rgba(255, 253, 249, 0.92)',
                color:
                  rsvpStatus === 'yes'
                    ? isBirthday
                      ? '#181818'
                      : '#FAF7F2'
                    : isBirthday
                    ? '#f1ccb0'
                    : theme.colors.primary,
                borderColor: isBirthday ? '#edc6a8' : `${theme.colors.primary}45`,
              }}
            >
              <Check size={15} />
              <span>I&apos;ll Come</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleSelectRsvp('no', e)}
              className="btn rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 nc-rsvp-btn"
              style={{
                backgroundColor:
                  rsvpStatus === 'no'
                    ? theme.colors.secondary
                    : isBirthday
                    ? '#262624'
                    : 'rgba(255, 253, 249, 0.92)',
                color:
                  rsvpStatus === 'no'
                    ? '#FAF7F2'
                    : isBirthday
                    ? '#d6cfc4'
                    : theme.colors.mutedText,
                borderColor:
                  rsvpStatus === 'no'
                    ? theme.colors.secondary
                    : isBirthday
                    ? 'rgba(237, 198, 168, 0.35)'
                    : `${theme.colors.mutedText}40`,
              }}
            >
              <X size={15} />
              <span>I Won&apos;t Come</span>
            </button>
          </div>

          {/* Interactive Confirmation Card */}
          <div className="w-100 mt-4 d-flex flex-column align-items-center nc-rsvp-feedback-slot">
            {rsvpStatus === 'yes' && (
              <div
                className="card w-100 rounded-4 p-4 border shadow-sm nc-fade-in-up"
                style={{
                  backgroundColor: isBirthday ? '#f1ccb0' : theme.colors.cardBg,
                  borderColor: isBirthday ? '#edc6a8' : `${theme.colors.accent}65`,
                }}
              >
                <p
                  className={`mb-0 ${
                    isBirthday
                      ? 'nc-font-handwritten fs-3'
                      : isKidsBday
                      ? 'nc-font-fredoka fs-5 fw-semibold'
                      : 'nc-font-serif fst-italic fs-5'
                  }`}
                  style={{ color: isBirthday ? '#181818' : theme.colors.pageText }}
                >
                  {isBirthday
                    ? `Cheers! Another round poured for ${bdayHonoree}.`
                    : isKidsBday
                    ? `Hooray! A party hat and slice of cake are saved for you at ${kidsChildName}'s bash!`
                    : 'Delighted to have you join us at the Noel & Co. table.'}
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (guestName.trim()) setSavedName(guestName.trim());
                  }}
                  className="mt-3 d-flex align-items-center gap-2"
                >
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Your name for the guest list (optional)"
                    className="form-control form-control-sm rounded-3 bg-transparent"
                    style={{
                      borderColor: isBirthday
                        ? 'rgba(24, 24, 24, 0.35)'
                        : `${theme.colors.accent}60`,
                      color: isBirthday ? '#181818' : theme.colors.pageText,
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm rounded-3 px-3 py-2 flex-shrink-0 nc-micro-label"
                    style={{
                      backgroundColor: isBirthday ? '#181818' : theme.colors.accent,
                      color: isBirthday ? '#f1ccb0' : '#FFFDF9',
                    }}
                  >
                    Save
                  </button>
                </form>

                {savedName && (
                  <p
                    className="mt-2 mb-0 nc-micro-label"
                    style={{ color: isBirthday ? '#181818' : theme.colors.accent }}
                  >
                    {isKidsBday
                      ? `Party favor reserved for ${savedName} ★`
                      : `Toast reserved for ${savedName} ✦`}
                  </p>
                )}
              </div>
            )}

            {rsvpStatus === 'no' && (
              <div
                className="card w-100 rounded-4 p-4 border shadow-sm nc-fade-in-up"
                style={{
                  backgroundColor: isBirthday ? '#f1ccb0' : theme.colors.cardBg,
                  borderColor: `${theme.colors.accent}45`,
                }}
              >
                <p
                  className={`mb-0 ${
                    isBirthday ? 'nc-font-handwritten fs-3' : 'nc-font-serif fst-italic fs-5'
                  }`}
                  style={{ color: isBirthday ? '#181818' : theme.colors.pageText }}
                >
                  You will be warmly missed — we&apos;ll raise a glass in your honor.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          STAGE 2: EDITORIAL WEBSITE BRAND REVEAL ("NOEL & CO.")
         ==================================================================== */}
      <footer
        aria-label="Noel and Co. Brand Signature"
        className="position-relative w-100 d-flex flex-column align-items-center justify-content-center px-3 py-5 overflow-hidden nc-stage-brand nc-z-2"
      >
        <div
          className="container d-flex flex-column align-items-center text-center rounded-4 px-4 py-5 nc-brand-reveal-card"
          style={{
            backgroundColor: isBirthday ? 'rgba(26, 26, 24, 0.9)' : 'transparent',
            border: isBirthday ? '1px solid rgba(197, 160, 89, 0.35)' : 'none',
            transform: `translateY(${(1 - bottomFactor) * 24}px) scale(${
              0.95 + bottomFactor * 0.05
            })`,
          }}
        >
          <div
            className="rounded-circle border d-flex align-items-center justify-content-center mb-4 nc-monogram-badge"
            style={{
              borderColor: `${theme.colors.accent}80`,
              color: theme.colors.accent,
            }}
          >
            <span className="nc-font-serif small fw-semibold">N&amp;C</span>
          </div>

          <div
            className="w-100 mb-4 nc-gold-rule-gradient"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
            }}
          />

          <h2
            className="nc-font-serif fw-medium text-uppercase nc-no-select mb-0 nc-brand-title"
            style={{ color: theme.colors.pageText }}
          >
            NOEL &amp; CO.
          </h2>

          <div
            className="w-100 mt-4 mb-4 nc-gold-rule-gradient"
            style={{
              background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
            }}
          />

          <p
            className="mb-0 nc-micro-label"
            style={{ color: theme.colors.mutedText }}
          >
            CURATED GATHERINGS &amp; TIMELESS CELEBRATIONS &bull; EST. NOEL &amp; CO.
          </p>

          <div className="mt-5 d-flex flex-wrap align-items-center justify-content-center gap-3">
            <button
              type="button"
              onClick={scrollToTop}
              className="btn btn-sm rounded-pill border px-4 py-2 d-inline-flex align-items-center gap-2 nc-micro-label"
              style={{
                borderColor: `${theme.colors.accent}55`,
                color: theme.colors.mutedText,
              }}
            >
              <ArrowUp size={14} style={{ color: theme.colors.accent }} />
              <span>Return to Invitation</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm rounded-pill border px-4 py-2 d-inline-flex align-items-center gap-2 nc-micro-label"
              style={{
                backgroundColor: isBirthday ? '#edc6a8' : theme.colors.primary,
                borderColor: theme.colors.accent,
                color: isBirthday ? '#181818' : '#FAF7F2',
              }}
            >
              <ArrowLeft
                size={14}
                style={{ color: isBirthday ? '#181818' : theme.colors.accent }}
              />
              <span>Back to {categoryHeading}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * ============================================================================
 * SHARED HOOK: BOOTSTRAP 5.3.3 & GOOGLE FONTS INJECTION
 * ============================================================================
 * Ensures Bootstrap 5.3.3 and editorial fonts are loaded regardless of which
 * individual route page component is mounted first.
 */
function useNoelAssets() {
  useEffect(() => {
    const existingBootstrap = document.querySelector(
      'link[data-nc-bootstrap="true"], link[href*="bootstrap"]'
    );
    if (!existingBootstrap) {
      const linkEl = document.createElement('link');
      linkEl.rel = 'stylesheet';
      linkEl.href =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      linkEl.integrity =
        'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
      linkEl.crossOrigin = 'anonymous';
      linkEl.setAttribute('data-nc-bootstrap', 'true');
      document.head.appendChild(linkEl);
    }

    const existingFonts = document.querySelector(
      'link[data-nc-fonts="true"], link[href*="Cormorant+Garamond"]'
    );
    if (!existingFonts) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href =
        'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap';
      fontLink.setAttribute('data-nc-fonts', 'true');
      document.head.appendChild(fontLink);
    }
  }, []);
}

/**
 * ============================================================================
 * SHARED SCOPED STYLES FOR ALL ROUTE PAGES (BOOTSTRAP 5 + CUSTOM 3D CSS)
 * ============================================================================
 */
const NoelScopedStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Fredoka:wght@500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

    .nc-app-root {
      background-color: #FAF7F2;
      color: #1C1917;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .nc-font-serif {
      font-family: 'Cormorant Garamond', Georgia, serif;
    }

    .nc-font-handwritten {
      font-family: 'Caveat', cursive;
    }

    .nc-font-fredoka {
      font-family: 'Fredoka', 'Plus Jakarta Sans', sans-serif;
    }

    .nc-no-select {
      user-select: none;
    }

    .nc-no-pointer {
      pointer-events: none;
    }

    .nc-pointer {
      cursor: pointer;
    }

    .nc-no-resize {
      resize: none;
    }

    .nc-z-0 { z-index: 0; }
    .nc-z-2 { z-index: 2; }
    .nc-opacity-60 { opacity: 0.6; }

    .nc-paper-overlay {
      z-index: 30;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* Editorial Typography & Micro Labels */
    .nc-micro-label {
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 600;
    }

    .nc-atelier-overline {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.3em;
      font-weight: 600;
      color: #C5A059;
    }

    .nc-main-wordmark {
      letter-spacing: 0.16em;
      color: #1C1917;
    }

    .nc-subtitle-bar {
      font-size: 0.92rem;
      color: #4A5D58;
      max-width: 660px;
      line-height: 1.65;
    }

    .nc-muted-copy {
      color: #4A5D58;
      line-height: 1.6;
    }

    .nc-gold-line-sm {
      display: inline-block;
      height: 1px;
      width: 44px;
      background-color: #C5A059;
    }

    .nc-category-chip {
      background-color: #FAF7F2;
      border: 1px solid rgba(197, 160, 89, 0.6);
      color: #8B2635;
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    /* Kids Birthday Festive Background, Striped Envelope Liner & Card Sizing */
    .nc-kids-confetti-bg {
      background-color: #fffaf0;
      background-image:
        radial-gradient(circle at 18% 24%, rgba(255, 123, 123, 0.24) 0 4px, transparent 5px),
        radial-gradient(circle at 82% 28%, rgba(110, 198, 255, 0.26) 0 5px, transparent 6px),
        radial-gradient(circle at 26% 78%, rgba(255, 209, 102, 0.32) 0 4.5px, transparent 5.5px),
        radial-gradient(circle at 76% 74%, rgba(140, 224, 168, 0.28) 0 4px, transparent 5px),
        radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 244, 222, 0.45) 100%);
    }

    .nc-kids-striped-liner {
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(255, 253, 248, 0.85) 0px,
        rgba(255, 253, 248, 0.85) 8px,
        rgba(255, 226, 138, 0.42) 8px,
        rgba(255, 226, 138, 0.42) 16px
      );
    }

    .nc-kids-topbar {
      max-width: 420px;
    }

    .nc-kids-card-box {
      max-width: 420px;
      aspect-ratio: 360 / 480;
    }

    /* Header & Filter Tabs */
    .nc-studio-header {
      border-bottom: 1px solid rgba(197, 160, 89, 0.35);
      background-color: rgba(255, 253, 249, 0.78);
    }

    .nc-header-divider {
      border-top: 1px solid rgba(197, 160, 89, 0.28);
    }

    .nc-filter-tabs {
      background-color: #FAF7F2;
      border-color: rgba(197, 160, 89, 0.48) !important;
    }

    .nc-filter-pill {
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      border: none;
      transition: all 0.25s ease;
    }

    /* Buttons */
    .nc-btn-pine {
      background-color: #1B3B2B;
      color: #FAF7F2;
      border: 1px solid #C5A059;
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 600;
      transition: all 0.25s ease;
    }

    .nc-btn-pine:hover:not(:disabled) {
      background-color: #142D20;
      color: #FAF7F2;
      border-color: #C5A059;
    }

    .nc-btn-outline-gold {
      background-color: #FAF7F2;
      color: #1C1917;
      border: 1px solid rgba(197, 160, 89, 0.65);
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      font-weight: 600;
    }

    .nc-btn-outline-gold:hover {
      background-color: #FFFDF9;
      color: #1C1917;
    }

    .nc-btn-outline-pine {
      background-color: #FFFDF9;
      color: #1B3B2B;
      border: 1px solid rgba(27, 59, 43, 0.35);
      font-size: 0.68rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 600;
    }

    /* Grid Template Cards */
    .nc-template-card {
      background-color: #FFFDF9;
      border: 1px solid rgba(197, 160, 89, 0.55);
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }

    .nc-template-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 1rem 2.25rem rgba(28, 25, 23, 0.12) !important;
    }

    .nc-tag-pill {
      background-color: #FAF7F2;
      border: 1px solid rgba(197, 160, 89, 0.45);
      color: #1B3B2B;
      font-size: 0.7rem;
      padding: 0.35em 0.75em;
    }

    .nc-launch-card-btn {
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 600;
      border-width: 1px;
      border-style: solid;
      transition: opacity 0.25s ease, transform 0.2s ease;
    }

    .nc-launch-card-btn:hover {
      opacity: 0.92;
    }

    .nc-reset-slot-btn {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: rgba(139, 38, 53, 0.8);
    }

    .nc-reset-slot-btn:hover {
      color: #8B2635;
    }

    /* Empty Slot Card & Registration Marks */
    .nc-empty-slot {
      min-height: 435px;
      border: 2px dashed rgba(197, 160, 89, 0.55);
      background-color: rgba(255, 253, 249, 0.5);
      transition: background-color 0.25s ease;
    }

    .nc-empty-slot:hover {
      background-color: rgba(255, 253, 249, 0.9);
    }

    .nc-slot-index-pill {
      border: 1px solid rgba(197, 160, 89, 0.55);
      color: #8B2635;
      background-color: #FAF7F2;
      font-size: 0.65rem;
      letter-spacing: 0.22em;
    }

    .nc-empty-body {
      max-width: 250px;
    }

    .nc-empty-icon-ring {
      width: 56px;
      height: 56px;
      border: 1px dashed #C5A059;
      background-color: #FAF7F2;
    }

    .nc-add-slot-btn {
      border: 1px solid #C5A059;
      background-color: #FAF7F2;
      color: #1B3B2B;
      font-size: 0.74rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 600;
    }

    .nc-add-slot-btn:hover {
      background-color: #1B3B2B;
      color: #FAF7F2;
    }

    .nc-reg-mark {
      width: 16px;
      height: 16px;
      position: absolute;
      pointer-events: none;
      opacity: 0.65;
    }
    .nc-reg-tl { top: 14px; left: 14px; }
    .nc-reg-tr { top: 14px; right: 14px; }
    .nc-reg-bl { bottom: 14px; left: 14px; }
    .nc-reg-br { bottom: 14px; right: 14px; }

    /* Preview Stage inside Grid Cards */
    .nc-preview-stage {
      height: 250px;
    }

    .nc-warm-spotlight {
      background: radial-gradient(circle at 50% 42%, rgba(255, 253, 249, 0.92) 0%, rgba(243, 237, 226, 0.45) 65%, rgba(228, 218, 201, 0.68) 100%);
    }

    .nc-linen-texture {
      background-color: #eceae4;
      background-image:
        repeating-linear-gradient(0deg, rgba(160, 152, 138, 0.045) 0px, rgba(160, 152, 138, 0.045) 1px, transparent 1px, transparent 4px),
        repeating-linear-gradient(90deg, rgba(160, 152, 138, 0.045) 0px, rgba(160, 152, 138, 0.045) 1px, transparent 1px, transparent 4px),
        radial-gradient(circle at 50% 40%, rgba(255, 255, 255, 0.45) 0%, rgba(210, 204, 192, 0.25) 100%);
    }

    .nc-colorway-dot {
      width: 20px;
      height: 20px;
      border: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .nc-colorway-dot:hover {
      transform: scale(1.12);
    }

    .nc-cameo-svg {
      display: block;
      object-fit: cover;
    }

    .nc-wed-topbar {
      max-width: 420px;
    }

    .nc-wed-card-box {
      max-width: 420px;
      aspect-ratio: 360 / 510;
    }

    .nc-stage-badge {
      background-color: rgba(255, 253, 249, 0.9);
      border: 1px solid rgba(197, 160, 89, 0.55);
      color: #1C1917;
      font-size: 0.62rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .nc-pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      display: inline-block;
      animation: ncPulse 1.8s infinite;
    }

    .nc-icon-circle-btn {
      width: 30px;
      height: 30px;
      background-color: rgba(255, 253, 249, 0.9);
      border: 1px solid rgba(197, 160, 89, 0.55);
      color: #1C1917;
    }

    .nc-video-toggle-btn {
      background-color: rgba(255, 253, 249, 0.92);
      border: 1px solid rgba(197, 160, 89, 0.6);
      color: #1C1917;
      font-size: 0.62rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-weight: 600;
    }

    .nc-video-toggle-active {
      background-color: #1B3B2B !important;
      color: #FAF7F2 !important;
    }

    .nc-video-drawer {
      top: 48px;
      z-index: 40;
      background-color: rgba(255, 253, 249, 0.98);
      border: 1px solid #C5A059;
    }

    .nc-input-cream {
      background-color: #FAF7F2;
      border-color: rgba(197, 160, 89, 0.65);
      color: #1C1917;
    }

    .nc-input-ivory {
      background-color: #FFFDF9;
      border-color: rgba(197, 160, 89, 0.65);
      color: #1C1917;
    }

    .nc-input-dark {
      background-color: #181818;
      border-color: rgba(237, 198, 168, 0.45);
      color: #f3f0e8;
    }

    .nc-input-dark:focus {
      background-color: #181818;
      color: #f3f0e8;
      border-color: #edc6a8;
      box-shadow: 0 0 0 0.2rem rgba(237, 198, 168, 0.2);
    }

    .nc-video-cover {
      object-fit: cover;
    }

    .nc-video-hover-overlay {
      background-color: rgba(0, 0, 0, 0.25);
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .nc-video-wrapper:hover .nc-video-hover-overlay {
      opacity: 1;
    }

    .nc-launch-pill {
      background-color: #FAF7F2;
      color: #1C1917;
      font-size: 0.68rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    /* Miniature 3D Envelope inside Grid Card */
    .nc-perspective-900 {
      perspective: 900px;
    }

    .nc-mini-envelope {
      width: 220px;
      height: 142px;
      transition: transform 0.4s ease;
    }

    .nc-mini-envelope:hover {
      transform: scale(1.04);
    }

    .nc-mini-shadow {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 82%;
      height: 16px;
      border-radius: 50%;
      filter: blur(8px);
      opacity: 0.25;
    }

    .nc-mini-card {
      left: 7%;
      right: 7%;
      bottom: 7%;
      height: 86%;
      transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nc-mini-brand {
      font-size: 0.45rem;
      letter-spacing: 0.24em;
    }

    .nc-mini-title {
      font-size: 0.85rem;
      color: #1C1917;
      line-height: 1.15;
    }

    .nc-mini-rule {
      width: 32px;
      height: 1px;
    }

    .nc-mini-loc {
      font-size: 0.45rem;
      letter-spacing: 0.14em;
      color: #4A5D58;
    }

    .nc-mini-flap {
      height: 58%;
      transform-origin: top;
      transform-style: preserve-3d;
      transition: transform 0.7s ease-in-out;
    }

    .nc-mini-seal-wrap {
      left: 50%;
      top: 53%;
      transform: translate(-50%, -50%);
      transition: opacity 0.45s ease, transform 0.45s ease;
    }

    .nc-mini-seal {
      width: 36px;
      height: 36px;
    }

    .nc-mini-seal-text {
      font-size: 0.62rem;
      letter-spacing: 0.08em;
    }

    .nc-stage-caption {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-weight: 600;
    }

    .nc-sparkle-dot {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      opacity: 0.65;
      animation: ncPulse 2.4s infinite;
    }
    .nc-sparkle-1 { top: 58px; left: 44px; }
    .nc-sparkle-2 { bottom: 42px; right: 52px; animation-delay: 0.8s; }

    /* Shared Envelope Polygon Geometry */
    .nc-pocket-left {
      clip-path: polygon(0 0, 52% 54%, 0 100%);
      opacity: 0.96;
    }
    .nc-pocket-right {
      clip-path: polygon(100% 0, 48% 54%, 100% 100%);
      opacity: 0.96;
    }
    .nc-pocket-bottom {
      clip-path: polygon(0 100%, 50% 44%, 100% 100%);
    }
    .nc-flap-triangle {
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }

    .nc-seal-visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    .nc-seal-hidden {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }

    /* Add Design Builder Modal */
    .nc-modal-overlay {
      z-index: 1060;
      background-color: rgba(28, 25, 23, 0.65);
      backdrop-filter: blur(4px);
    }

    .nc-builder-modal-card {
      max-width: 540px;
      max-height: 92vh;
      background-color: #FAF7F2;
      border: 1px solid #C5A059;
    }

    .nc-swatch-btn {
      background-color: rgba(255, 253, 249, 0.65);
      border: 1px solid rgba(197, 160, 89, 0.45);
    }

    .nc-swatch-selected {
      background-color: #FFFDF9;
      border-color: #1B3B2B;
      box-shadow: 0 2px 8px rgba(27, 59, 43, 0.15);
    }

    .nc-swatch-dot {
      width: 16px;
      height: 16px;
      border: 1px solid #C5A059;
    }

    /* Full Interactive Preview Modal */
    .nc-interactive-modal {
      z-index: 1050;
      transition: background-color 0.6s ease, color 0.6s ease;
    }

    .nc-particle-canvas {
      z-index: 1;
    }

    .nc-terrazzo-vignette {
      background: radial-gradient(circle at 50% 45%, rgba(34, 34, 32, 0.08) 0%, rgba(18, 18, 16, 0.55) 100%);
    }

    .nc-scroll-progress {
      height: 3px;
      z-index: 1055;
      transition: width 0.15s ease;
    }

    .nc-sticky-topbar {
      z-index: 1040;
      backdrop-filter: blur(8px);
    }

    .nc-topbar-back-btn {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-weight: 600;
    }

    .nc-holiday-switcher {
      background-color: #FFFDF9;
      border-color: rgba(197, 160, 89, 0.48) !important;
      max-width: 100%;
      overflow-x: auto;
    }

    .nc-holiday-pill {
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
      border: none;
    }

    .nc-stage-hero {
      min-height: 90vh;
    }

    .nc-delivery-pill {
      font-size: 0.66rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 600;
    }

    .nc-hero-stage-box {
      max-width: 540px;
    }

    .nc-envelope-state {
      transition: opacity 0.65s ease, transform 0.65s ease;
    }

    .nc-state-visible {
      opacity: 1;
      transform: scale(1);
    }

    .nc-state-hidden {
      opacity: 0;
      transform: scale(0.95);
      pointer-events: none;
    }

    .nc-hero-envelope {
      width: min(90vw, 450px);
      aspect-ratio: 1.48 / 1;
      perspective: 1400px;
    }

    .nc-animate-float {
      animation: ncEnvelopeFloat 4.6s ease-in-out infinite;
    }

    .nc-hero-shadow {
      position: absolute;
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%);
      width: 84%;
      height: 30px;
      border-radius: 50%;
      filter: blur(18px);
    }

    .nc-preserve-3d {
      transform-style: preserve-3d;
    }

    .nc-tilt-transition {
      transition: transform 0.3s ease-out;
    }

    .nc-hero-rising-card {
      left: 6%;
      right: 6%;
      bottom: 6%;
      height: 86%;
      transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .nc-envelope-overlabel {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.22em;
    }

    .nc-hero-flap {
      height: 58%;
      transform-origin: top;
      transform-style: preserve-3d;
      transition: transform 0.7s ease-in-out;
    }

    .nc-hero-seal-wrap {
      left: 50%;
      top: 53%;
      transition: opacity 0.45s ease, transform 0.45s ease;
    }

    .nc-seal-ping {
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      opacity: 0.25;
      animation: ncPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    }

    .nc-hero-seal {
      width: 62px;
      height: 62px;
      border-width: 2px;
      border-style: solid;
      transition: transform 0.25s ease;
    }

    .nc-hero-envelope:hover .nc-hero-seal {
      transform: scale(1.08);
    }

    .nc-hero-seal-inner {
      width: 46px;
      height: 46px;
      border-width: 1px;
      border-style: solid;
    }

    .nc-seal-prompt-btn {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-weight: 500;
      border: none;
    }

    /* Expanded Card Reveal */
    .nc-expanded-card-wrap {
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    .nc-card-shown {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .nc-card-hidden {
      opacity: 0;
      transform: translateY(28px) scale(0.95);
    }

    .nc-bday-topbar {
      max-width: 430px;
    }

    .nc-bday-card {
      max-width: 430px;
      aspect-ratio: 3 / 4.05;
      border: 1px solid rgba(255, 236, 220, 0.35);
      box-shadow: 0 28px 60px rgba(0, 0, 0, 0.65);
    }

    .nc-seal-replay-btn {
      font-size: 0.66rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
    }

    .nc-card-inner-frame {
      inset: 12px;
      border: 1px solid;
    }

    .nc-filigree {
      width: 44px;
      height: 44px;
      position: absolute;
      pointer-events: none;
    }
    .nc-filigree-tl { top: 14px; left: 14px; }
    .nc-filigree-tr { top: 14px; right: 14px; }
    .nc-filigree-bl { bottom: 14px; left: 14px; }
    .nc-filigree-br { bottom: 14px; right: 14px; }
    .nc-rotate-90 { transform: rotate(90deg); }
    .nc-rotate-n90 { transform: rotate(-90deg); }
    .nc-rotate-180 { transform: rotate(180deg); }

    .nc-crest-line {
      display: inline-block;
      height: 1px;
      width: 40px;
    }

    .nc-crest-brand {
      letter-spacing: 0.28em;
    }

    .nc-host-note {
      max-width: 440px;
    }

    /* "Another Round" Peach Cardstock & Handwritten Positions */
    .nc-peach-paper {
      background-color: #f1ccb0;
      background-image:
        radial-gradient(circle at 25% 20%, rgba(255, 245, 235, 0.35) 0%, transparent 55%),
        linear-gradient(165deg, rgba(255,255,255,0.18) 0%, rgba(198,148,112,0.16) 100%);
    }

    .nc-paper-grain {
      opacity: 0.06;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperGrain)'/%3E%3C/svg%3E");
    }

    .nc-ink-text {
      color: #181818;
    }

    .nc-bday-title-full {
      top: 22px;
      left: 26px;
      transform: rotate(-3.5deg);
    }

    .nc-bday-title-compact {
      top: 8px;
      left: 10px;
      transform: rotate(-3.5deg);
    }

    .nc-bday-heading {
      font-size: clamp(1.55rem, 4vw, 2.1rem);
      line-height: 0.95;
    }

    .nc-bday-heading-wrap {
      max-width: 175px;
    }

    .nc-bday-text-xs {
      font-size: 0.72rem;
      line-height: 0.95;
    }

    .nc-bday-art-full {
      width: 83%;
      padding-top: 14px;
    }

    .nc-bday-art-compact {
      width: 75%;
      padding-top: 4px;
    }

    .nc-bday-venue-full {
      bottom: 22px;
      left: 26px;
      transform: rotate(-2deg);
    }

    .nc-bday-venue-compact {
      bottom: 6px;
      left: 10px;
      transform: rotate(-2deg);
    }

    .nc-bday-date-full {
      bottom: 34px;
      right: 28px;
      transform: rotate(-2.5deg);
    }

    .nc-bday-date-compact {
      bottom: 8px;
      right: 10px;
      transform: rotate(-2.5deg);
    }

    .nc-bday-subtext {
      font-size: clamp(1.1rem, 3vw, 1.42rem);
      line-height: 1.04;
    }

    .nc-bday-sub-xs {
      font-size: 0.5rem;
      line-height: 1.02;
    }

    /* Stage 1: Compact RSVP Section */
    .nc-stage-rsvp {
      min-height: 70vh;
    }

    .nc-rsvp-box {
      max-width: 460px;
      backdrop-filter: blur(10px);
    }

    .nc-vertical-hairline {
      width: 1px;
      height: 48px;
    }

    .nc-rsvp-btn {
      min-height: 44px;
      font-size: 0.76rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 600;
      border-width: 1.5px;
      border-style: solid;
      transition: transform 0.2s ease, box-shadow 0.25s ease;
    }

    .nc-rsvp-btn:active {
      transform: scale(0.96);
    }

    .nc-rsvp-feedback-slot {
      min-height: 120px;
    }

    /* Stage 2: Editorial Website Name Reveal */
    .nc-stage-brand {
      min-height: 82vh;
    }

    .nc-brand-reveal-card {
      max-width: 880px;
      backdrop-filter: blur(10px);
      transition: transform 0.6s ease-out;
    }

    .nc-monogram-badge {
      width: 46px;
      height: 46px;
    }

    .nc-gold-rule-gradient {
      max-width: 640px;
      height: 1px;
    }

    .nc-brand-title {
      font-size: clamp(2.75rem, 9.5vw, 6.75rem);
      letter-spacing: 0.22em;
      padding-left: 0.22em;
      line-height: 1.05;
    }

    .nc-footer-rule {
      width: 128px;
      height: 1px;
      background-color: rgba(197, 160, 89, 0.45);
    }

    .nc-route-footer-link {
      font-size: 0.66rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border: 1px solid rgba(197, 160, 89, 0.45);
      color: #4A5D58;
      background-color: #FFFDF9;
      text-decoration: none;
    }

    .nc-route-footer-link.active {
      background-color: #1B3B2B;
      color: #FAF7F2;
      border-color: #C5A059;
    }

    /* Keyframe Animations */
    @keyframes ncEnvelopeFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-7px); }
    }

    @keyframes ncFadeInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .nc-fade-in-up {
      animation: ncFadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes ncPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.45; transform: scale(0.85); }
    }

    @keyframes ncPing {
      75%, 100% {
        transform: scale(1.65);
        opacity: 0;
      }
    }

    .nc-bounce {
      animation: ncBounce 1.8s infinite;
    }

    @keyframes ncBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(5px); }
    }
  `}</style>
);

/**
 * ============================================================================
 * REUSABLE ROUTE PAGE SHELL (NO COMMON TOP CATEGORY NAVBAR)
 * ============================================================================
 * Renders the respective category heading, subtitle, slot filter bar,
 * 3-column template grid, and full interactive living-envelope preview modal.
 */
function CategoryTemplatesPage({ category = 'all', onNavigate }) {
  useNoelAssets();

  const [templates, setTemplates] = useState(INITIAL_INVITATION_TEMPLATES);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'empty'
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [addModalState, setAddModalState] = useState({ isOpen: false, targetSlot: null });

  // Reset slot filter when route category changes
  useEffect(() => {
    setActiveFilter('all');
    setPreviewTemplate(null);
  }, [category]);

  const categoryTemplates =
    category === 'all'
      ? [
          ...templates.filter((t) => t.status === 'active'),
          ...templates.filter((t) => t.status === 'empty'),
        ]
      : templates.filter((t) => t.category === category);

  const activeTemplates = categoryTemplates.filter((t) => t.status === 'active');
  const emptyTemplates = categoryTemplates.filter((t) => t.status === 'empty');

  const filteredTemplates = categoryTemplates.filter((t) => {
    if (activeFilter === 'active') return t.status === 'active';
    if (activeFilter === 'empty') return t.status === 'empty';
    return true;
  });

  const currentCategoryMeta = CATEGORY_META[category] || CATEGORY_META.all;

  const handleUpdateVideoSrc = useCallback((slotId, newVideoSrc) => {
    setTemplates((prev) =>
      prev.map((item) => (item.id === slotId ? { ...item, videoSrc: newVideoSrc } : item))
    );
  }, []);

  const handleSaveNewDesign = useCallback((slotId, newDesignData) => {
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === slotId
          ? {
              ...item,
              ...newDesignData,
              status: 'active',
            }
          : item
      )
    );
  }, []);

  const handleClearCustomSlot = useCallback((slotId) => {
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === slotId && !item.isBuiltIn
          ? {
              ...item,
              status: 'empty',
              title: '',
              editionLabel: '',
              description: '',
              tags: [],
              videoSrc: '',
            }
          : item
      )
    );
  }, []);

  const routeLinks = [
    { path: '/', catId: 'all', label: 'All Templates (/)' },
    { path: '/holiday', catId: 'holiday', label: 'Holiday (/holiday)' },
    { path: '/kids-bday', catId: 'kids-bday', label: 'Kids Bday (/kids-bday)' },
    { path: '/adult-bday', catId: 'adult-bday', label: 'Adult Bday (/adult-bday)' },
    { path: '/wedding', catId: 'wedding', label: 'Wedding (/wedding)' },
  ];

  return (
    <div className="min-vh-100 w-100 nc-app-root">
      <NoelScopedStyles />

      {/* Subtle Fine-Paper Texture Overlay */}
      <div
        className="position-fixed top-0 start-0 end-0 bottom-0 nc-no-pointer nc-paper-overlay"
        aria-hidden="true"
      />

      {/* ====================================================================
          1. ROUTE-SPECIFIC HEADING & SLOT FILTER BAR
         ==================================================================== */}
      <header className="nc-studio-header">
        <div className="container py-5">
          {/* Dynamic Category Crest, Heading & Subtitle */}
          <div className="d-flex flex-column align-items-center text-center mb-4">
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="nc-gold-line-sm" />
              <span className="nc-atelier-overline">
                {currentCategoryMeta.eyebrow}
              </span>
              <span className="nc-gold-line-sm" />
            </div>

            <h1 className="nc-font-serif display-4 fw-semibold mb-2 nc-main-wordmark">
              {currentCategoryMeta.heading}
            </h1>

            <p className="mb-0 nc-subtitle-bar">
              {currentCategoryMeta.subtitle}
            </p>
          </div>

          {/* Slot Status Filter Pills & "+ Add New Design" Action Bar */}
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 pt-4 nc-header-divider">
            {/* Slot Status Tabs */}
            <div
              role="tablist"
              aria-label="Filter invitation template slots"
              className="d-inline-flex flex-wrap align-items-center justify-content-center gap-1 p-1 rounded-pill border nc-filter-tabs"
            >
              {[
                { id: 'all', label: `All (${categoryTemplates.length})` },
                { id: 'active', label: `Active Invitations (${activeTemplates.length})` },
                { id: 'empty', label: `Empty Slots (${emptyTemplates.length})` },
              ].map((pill) => {
                const isSelected = activeFilter === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveFilter(pill.id)}
                    className="btn btn-sm rounded-pill px-3 py-2 nc-filter-pill"
                    style={{
                      backgroundColor: isSelected ? '#1B3B2B' : 'transparent',
                      color: isSelected ? '#FAF7F2' : '#1C1917',
                    }}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>

            {/* "+ Add New Design" Button */}
            <button
              type="button"
              onClick={() =>
                setAddModalState({
                  isOpen: true,
                  targetSlot: emptyTemplates[0] || null,
                })
              }
              disabled={emptyTemplates.length === 0}
              className="btn rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 shadow-sm nc-btn-pine"
            >
              <Plus size={15} style={{ color: '#C5A059' }} />
              <span>
                {emptyTemplates.length > 0
                  ? category === 'all'
                    ? 'Add New Design'
                    : `Add ${currentCategoryMeta.label} Design`
                  : 'All Category Slots Populated'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. BOOTSTRAP 5 RESPONSIVE 3-COLUMN INVITATION TEMPLATE GRID
         ==================================================================== */}
      <main className="container py-5">
        <div className="row g-4">
          {filteredTemplates.map((slot) => (
            <div key={slot.id} className="col-12 col-md-6 col-lg-4">
              {slot.status === 'active' ? (
                <ActiveTemplateCard
                  template={slot}
                  showCategoryBadge={category === 'all'}
                  onOpenInteractive={(tpl) => setPreviewTemplate(tpl)}
                  onUpdateVideoSrc={handleUpdateVideoSrc}
                  onClearCustomSlot={handleClearCustomSlot}
                />
              ) : (
                <EmptyTemplateSlotCard
                  slot={slot}
                  onAddDesignClick={(target) =>
                    setAddModalState({ isOpen: true, targetSlot: target })
                  }
                />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ====================================================================
          FOOTER SIGNATURE & ROUTE ENDPOINTS
         ==================================================================== */}
      <footer className="container pb-5 pt-3 text-center">
        <div className="mx-auto mb-3 nc-footer-rule" />
        <p className="mb-0 nc-micro-label" style={{ color: '#4A5D58' }}>
          NOEL &amp; CO. &bull; Modular Holiday, Birthday &amp; Wedding Invitation Architecture
        </p>

        {/* Discreet Route Switcher Links when rendered via standalone App router */}
        {typeof onNavigate === 'function' && (
          <div className="mt-3 d-flex flex-wrap align-items-center justify-content-center gap-2">
            {routeLinks.map((rt) => (
              <a
                key={rt.path}
                href={rt.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(rt.path);
                }}
                className={`badge rounded-pill px-3 py-2 nc-route-footer-link ${
                  category === rt.catId ? 'active' : ''
                }`}
              >
                {rt.label}
              </a>
            ))}
          </div>
        )}
      </footer>

      {/* ====================================================================
          3. MODALS: "+ ADD DESIGN TO SLOT" & FULL INTERACTIVE PREVIEW
         ==================================================================== */}
      <AddDesignModal
        isOpen={addModalState.isOpen}
        targetSlot={addModalState.targetSlot}
        emptySlots={
          emptyTemplates.length > 0
            ? emptyTemplates
            : templates.filter((t) => t.status === 'empty')
        }
        onClose={() => setAddModalState({ isOpen: false, targetSlot: null })}
        onSaveDesign={handleSaveNewDesign}
      />

      {previewTemplate && (
        <FullInteractivePreviewModal
          template={previewTemplate}
          categoryHeading={currentCategoryMeta.heading}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </div>
  );
}

/**
 * ============================================================================
 * DEDICATED ROUTE PAGE COMPONENTS (EXPORTED FOR SEPARATE ROUTE FILES)
 * ============================================================================
 * Map these directly inside your React Router <Routes>:
 *   <Route path="/" element={<AllTemplatesPage />} />
 *   <Route path="/holiday" element={<HolidayPage />} />
 *   <Route path="/kids-bday" element={<KidsBirthdayPage />} />
 *   <Route path="/adult-bday" element={<AdultBirthdayPage />} />
 *   <Route path="/wedding" element={<WeddingPage />} />
 */
export function AllTemplatesPage(props) {
  return <CategoryTemplatesPage category="all" {...props} />;
}

export function HolidayPage(props) {
  return <CategoryTemplatesPage category="holiday" {...props} />;
}

export function KidsBirthdayPage(props) {
  return <CategoryTemplatesPage category="kids-bday" {...props} />;
}

export function AdultBirthdayPage(props) {
  return <CategoryTemplatesPage category="adult-bday" {...props} />;
}

export function WeddingPage(props) {
  return <CategoryTemplatesPage category="wedding" {...props} />;
}

/**
 * Normalize browser pathname or initialRoute prop to a known route path
 */
const normalizeRoutePath = (rawPath) => {
  const cleaned = String(rawPath || '/')
    .toLowerCase()
    .replace(/\/+$/, '') || '/';

  switch (cleaned) {
    case '/holiday':
      return '/holiday';
    case '/kids-bday':
    case '/kids-birthday':
      return '/kids-bday';
    case '/adult-bday':
    case '/adult-birthday':
      return '/adult-bday';
    case '/wedding':
      return '/wedding';
    default:
      return '/';
  }
};

/**
 * ============================================================================
 * MAIN APPLICATION ROUTER (SWITCH / CASE ROUTE DISPATCHER)
 * ============================================================================
 */
export default function App({ initialRoute }) {
  const [currentRoute, setCurrentRoute] = useState(() =>
    normalizeRoutePath(
      initialRoute || (typeof window !== 'undefined' ? window.location.pathname : '/')
    )
  );

  useEffect(() => {
    if (initialRoute) {
      setCurrentRoute(normalizeRoutePath(initialRoute));
    }
  }, [initialRoute]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeRoutePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToRoute = useCallback((targetPath) => {
    const normalized = normalizeRoutePath(targetPath);
    setCurrentRoute(normalized);
    if (typeof window !== 'undefined' && window.history?.pushState) {
      window.history.pushState({}, '', normalized);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  switch (currentRoute) {
    case '/holiday':
      return <HolidayPage onNavigate={navigateToRoute} />;
    case '/kids-bday':
      return <KidsBirthdayPage onNavigate={navigateToRoute} />;
    case '/adult-bday':
      return <AdultBirthdayPage onNavigate={navigateToRoute} />;
    case '/wedding':
      return <WeddingPage onNavigate={navigateToRoute} />;
    case '/':
    default:
      return <AllTemplatesPage onNavigate={navigateToRoute} />;
  }
}