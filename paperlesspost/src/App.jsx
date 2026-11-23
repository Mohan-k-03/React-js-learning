import React, { useState, useEffect, useRef } from "react";
import AdultBirthdayInvitation from "./adult_bday.jsx";

/**
 * Navigation Menu Categories (Left Offcanvas Drawer)
 * Head 1: Browse Invitations by Event (8 subheads)
 * Head 2: Greeting Cards (4 subheads)
 */
// App.jsx (using react-router-dom)
const MENU_CATEGORIES = [
  {
    id: "browse-events",
    head: "Browse Invitations by Event",
    icon: "bi-envelope-paper-heart",
    subheads: [
      "Holiday",
      "Kids' Bday",
      "Adult Bday",
      "Wedding",
      "Baby",
      "Parties",
      "Seasonal and Holiday",
      "Business",
    ],
  },
  {
    id: "greeting-cards",
    head: "Greeting Cards",
    icon: "bi-postcard-heart",
    subheads: [
      "Thanksgiving",
      "Christmas Card",
      "Holiday Card",
      "New Year Card",
    ],
  },
];

/**
 * Combined 12 subheads displayed as horizontal overflowing rectangular boxes
 * inside the expandable Search Panel.
 */
const ALL_SEARCH_SUBHEADS = [
  { label: "Holiday", group: "Invitations", icon: "bi-stars" },
  { label: "Kids' Bday", group: "Invitations", icon: "bi-balloon" },
  { label: "Adult Bday", group: "Invitations", icon: "bi-cup-straw" },
  { label: "Wedding", group: "Invitations", icon: "bi-suit-heart" },
  { label: "Baby", group: "Invitations", icon: "bi-brightness-high" },
  { label: "Parties", group: "Invitations", icon: "bi-music-note-beamed" },
  { label: "Seasonal and Holiday", group: "Invitations", icon: "bi-snow" },
  { label: "Business", group: "Invitations", icon: "bi-briefcase" },
  { label: "Thanksgiving", group: "Greeting Cards", icon: "bi-flower1" },
  { label: "Christmas Card", group: "Greeting Cards", icon: "bi-gift" },
  { label: "Holiday Card", group: "Greeting Cards", icon: "bi-envelope-heart" },
  {
    label: "New Year Card",
    group: "Greeting Cards",
    icon: "bi-champagne-glass",
  },
];

/**
 * Hero Horizontal Sliding / Overflow Invitation Rectangles
 */
const HERO_RECTANGLES = [
  {
    id: "Kids' Bday",
    title: "Kids' Bday",
    subtitle: "Whimsical & Colorful",
    icon: "bi-balloon-fill",
    badge: "48 Designs",
  },
  {
    id: "Adult Bday",
    title: "Adult Bday",
    subtitle: "Soirées & Milestones",
    icon: "bi-sparkles",
    badge: "62 Designs",
  },
  {
    id: "Wedding",
    title: "Wedding",
    subtitle: "Letterpress & Gold Foil",
    icon: "bi-hearts",
    badge: "94 Suites",
  },
  {
    id: "Upload Your Own",
    title: "Upload Your Own",
    subtitle: "Custom Artwork & PDF",
    icon: "bi-cloud-arrow-up-fill",
    badge: "Custom Studio",
    isUpload: true,
  },
  {
    id: "Christmas Party",
    title: "Christmas Party",
    subtitle: "Candlelit & Festive",
    icon: "bi-tree-fill",
    badge: "Featured",
  },
  {
    id: "Baby Shower",
    title: "Baby Shower",
    subtitle: "Soft Botanicals & Keepsakes",
    icon: "bi-moon-stars-fill",
    badge: "36 Designs",
  },
  {
    id: "Greeting Card",
    title: "Greeting Card",
    subtitle: "Season’s Greetings & Notes",
    icon: "bi-envelope-open-heart-fill",
    badge: "54 Cards",
  },
];

/**
 * Dynamic curated details for Grid Item 1 based on active category
 */
const COLLECTION_CATALOG = {
  "Christmas Party": {
    eyebrow: "Signature Winter Suite",
    title: "Candlelit Crimson & Gold Foil Invitations",
    description:
      "Rich mahogany borders, embossed champagne-gold calligraphy, and crimson wax-seal envelopes crafted for intimate holiday dinners and festive soirées.",
    paperSpec: "350gsm Cotton Ivory • Gold Foil Stamp",
    count: "32 Curated Suites",
    accentBg: "#8B1E24",
  },
  Holiday: {
    eyebrow: "Seasonal Collection",
    title: "Winter Solstice & Holiday Gathering Suites",
    description:
      "Timeless evergreen motifs, warm candlelight palettes, and digital RSVP tracking tailored for family feasts and year-end celebrations.",
    paperSpec: "Textured Linen Finish • Matching Liners",
    count: "44 Curated Suites",
    accentBg: "#8B1E24",
  },
  "Kids' Bday": {
    eyebrow: "Playful Keepsakes",
    title: "Kids' Birthday Adventure & Storybook Invites",
    description:
      "Illustrated watercolor animals, celestial themes, and interactive birthday countdowns designed to delight little guests and parents alike.",
    paperSpec: "Matte Velvet Cardstock • Rounded Corners",
    count: "48 Curated Suites",
    accentBg: "#B45309",
  },
  "Adult Bday": {
    eyebrow: "Milestone Soirées",
    title: "Cocktail Hour & Milestone Birthday Invitations",
    description:
      "Editorial typography, champagne-gold accents, and sleek dark-mahogany layouts built for rooftop dinners, tastings, and milestone toasts.",
    paperSpec: "Heavyweight Ecru • Metallic Foil",
    count: "62 Curated Suites",
    accentBg: "#23140E",
  },
  Wedding: {
    eyebrow: "Bridal & Formal",
    title: "Heirloom Wedding & Rehearsal Dinner Suites",
    description:
      "Fine-art monograms, deckled-edge aesthetic, and coordinated save-the-dates, ceremony cards, and digital guest management.",
    paperSpec: "100% Pure Cotton • Blind Deboss",
    count: "94 Curated Suites",
    accentBg: "#7C2D12",
  },
  Baby: {
    eyebrow: "New Arrivals",
    title: "Baby Shower & Sip-and-See Keepsake Cards",
    description:
      "Gentle botanical sprigs, warm ivory tones, and tender hand-lettered scripts celebrating new beginnings.",
    paperSpec: "Warm Pearl Paper • Illustrated Liners",
    count: "36 Curated Suites",
    accentBg: "#6B4423",
  },
  "Baby Shower": {
    eyebrow: "New Arrivals",
    title: "Baby Shower & Sip-and-See Keepsake Cards",
    description:
      "Gentle botanical sprigs, warm ivory tones, and tender hand-lettered scripts celebrating new beginnings.",
    paperSpec: "Warm Pearl Paper • Illustrated Liners",
    count: "36 Curated Suites",
    accentBg: "#6B4423",
  },
  Parties: {
    eyebrow: "Host & Gather",
    title: "Dinner Party, Gala & Celebration Invitations",
    description:
      "Effortless yet elevated invitations for garden suppers, anniversary toasts, housewarmings, and private gatherings.",
    paperSpec: "Archival Ivory • Custom Monogram",
    count: "51 Curated Suites",
    accentBg: "#8B1E24",
  },
  "Seasonal and Holiday": {
    eyebrow: "Year-Round Festivities",
    title: "Seasonal & Holiday Entertaining Suites",
    description:
      "From autumn harvest tables to winter festivities and spring brunches, explore cohesive suites for every calendar moment.",
    paperSpec: "350gsm Cotton • Foil Accents",
    count: "58 Curated Suites",
    accentBg: "#8B1E24",
  },
  Business: {
    eyebrow: "Corporate & Brand",
    title: "Executive Gala, Launch & Client Appreciation",
    description:
      "Understated luxury stationery and branded digital invitations for gallery openings, holiday client dinners, and summits.",
    paperSpec: "Heavy Mahogany & Gold Foil",
    count: "28 Curated Suites",
    accentBg: "#23140E",
  },
  Thanksgiving: {
    eyebrow: "Autumn Gratitude",
    title: "Thanksgiving Table & Gratitude Greeting Cards",
    description:
      "Warm amber foliage, copper foil script, and heartfelt notes of thanks ready to send or print.",
    paperSpec: "Warm Kraft & Ivory • Copper Foil",
    count: "24 Greeting Cards",
    accentBg: "#9A3412",
  },
  "Christmas Card": {
    eyebrow: "Merry & Bright",
    title: "Classic Candlelit Christmas Greeting Cards",
    description:
      "Inspired by wax-sealed holiday letters, pine garlands, and gold-rimmed festive typography.",
    paperSpec: "Crimson & Ivory • Gold Wax Seal",
    count: "40 Greeting Cards",
    accentBg: "#8B1E24",
  },
  "Holiday Card": {
    eyebrow: "Season’s Greetings",
    title: "Warm Wishes & Holiday Photo Greeting Cards",
    description:
      "Frame your favorite family moments inside bespoke gold-foil borders and warm editorial layouts.",
    paperSpec: "Archival Matte • Custom Photo Frame",
    count: "38 Greeting Cards",
    accentBg: "#8B1E24",
  },
  "New Year Card": {
    eyebrow: "Midnight Toast",
    title: "Champagne & Starlight New Year Greeting Cards",
    description:
      "Ring in the new year with shimmering champagne-gold typography, starburst motifs, and celebratory wishes.",
    paperSpec: "Deep Mahogany & Gold Shimmer",
    count: "29 Greeting Cards",
    accentBg: "#23140E",
  },
  "Greeting Card": {
    eyebrow: "Correspondence",
    title: "Artisanal Greeting Cards & Wax-Sealed Notes",
    description:
      "Send thoughtful Thanksgiving, Christmas, Holiday, and New Year cards crafted with heirloom detail.",
    paperSpec: "Folded Cotton Note • Gold Envelope",
    count: "54 Greeting Cards",
    accentBg: "#8B1E24",
  },
};

/**
 * Rich warm candlelit fallback poster SVG (matching the mahogany, crimson, and gold video aesthetic)
 * so the hero looks atmospheric even before video_1.mp4 is placed in public/.
 */
const CANDLELIT_POSTER_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="candleGlow" cx="72%" cy="38%" r="48%">
      <stop offset="0%" stop-color="#F6C86E" stop-opacity="0.55"/>
      <stop offset="35%" stop-color="#C89B3C" stop-opacity="0.22"/>
      <stop offset="75%" stop-color="#3B1E14" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#1A0E0A" stop-opacity="1"/>
    </radialGradient>
    <radialGradient id="bokeh1" cx="25%" cy="22%" r="22%">
      <stop offset="0%" stop-color="#E5B95C" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#E5B95C" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tableWood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3A1F14"/>
      <stop offset="100%" stop-color="#1E0F0A"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="900" fill="#1C0F0B"/>
  <rect width="1600" height="900" fill="url(#candleGlow)"/>
  <circle cx="380" cy="190" r="140" fill="url(#bokeh1)"/>
  <circle cx="520" cy="130" r="90" fill="url(#bokeh1)"/>
  <circle cx="1290" cy="210" r="160" fill="url(#bokeh1)"/>
  <rect y="560" width="1600" height="340" fill="url(#tableWood)"/>
  <line x1="0" y1="560" x2="1600" y2="50" stroke="#C89B3C" stroke-opacity="0.25" stroke-width="2"/>
  <g transform="translate(715, 595)">
    <rect x="0" y="25" width="170" height="115" rx="6" fill="#8B1E24" stroke="#C89B3C" stroke-width="2"/>
    <polygon points="0,25 85,88 170,25" fill="#A3262D" stroke="#C89B3C" stroke-width="1.5"/>
    <circle cx="85" cy="84" r="16" fill="#C89B3C"/>
  </g>
</svg>
`)}`;

export default function App() {
  // Navigation & Drawer States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Christmas Party");

  // Auth & Profile Modal States
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState(null); // null = logged out, object = logged in
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Custom Upload & Greeting Card Preview States
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedPreviewUrl, setUploadedPreviewUrl] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedGreetingTab, setSelectedGreetingTab] =
    useState("Christmas Card");

  // Optional local video file override so user can test video_1.mp4 directly in preview
  const [customVideoUrl, setCustomVideoUrl] = useState(null);

  // Refs for immediate focus and horizontal slider scrolling
  const searchInputRef = useRef(null);
  const heroSliderRef = useRef(null);
  const videoInputRef = useRef(null);
  const cardUploadInputRef = useRef(null);

  // Inject Bootstrap 5.3.3 CSS, Bootstrap Icons 1.11.3, and Google Fonts into <head>
  useEffect(() => {
    const stylesheets = [
      {
        id: "bootstrap-5-css",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      },
      {
        id: "bootstrap-icons-css",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
      },
      {
        id: "google-fonts-editorial",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ];

    stylesheets.forEach(({ id, href }) => {
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);

  // Close open drawers/modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        setSearchOpen(false);
        setLoginModalOpen(false);
        setProfileModalOpen(false);
        setUploadModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /**
   * Search Toggle Handler:
   * Immediately calls .focus() on the text <input> inside the click handler
   * so mobile/tablet on-screen keyboards open automatically.
   */
  const handleToggleSearch = () => {
    const nextState = !searchOpen;
    setSearchOpen(nextState);
    setDrawerOpen(false);

    if (nextState && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Scroll smoothly to very top when clicking center brand headline
  const handleScrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Select category from Offcanvas Drawer, Search Bar, or Hero Rectangle
  const handleSelectCategory = (categoryName, options = {}) => {
    setActiveCategory(categoryName);
    if (options.closeDrawer) setDrawerOpen(false);
    if (options.closeSearch) setSearchOpen(false);

    if (
      [
        "Thanksgiving",
        "Christmas Card",
        "Holiday Card",
        "New Year Card",
      ].includes(categoryName)
    ) {
      setSelectedGreetingTab(categoryName);
    }

    if (categoryName === "Upload Your Own") {
      setUploadModalOpen(true);
    }
  };

  // Horizontal scroll helper for the hero invitation rectangles
  const scrollHeroSlider = (direction) => {
    if (!heroSliderRef.current) return;
    const distance = direction === "left" ? -280 : 280;
    heroSliderRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  // Handle local video selection (for previewing video_1.mp4 immediately)
  const handleLocalVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setCustomVideoUrl(objectUrl);
    }
  };

  // Handle custom card image upload
  const handleCustomCardUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUploadedPreviewUrl(objectUrl);
      setUploadedFileName(file.name);
      setActiveCategory("Upload Your Own");
    }
  };

  // Handle Login Form Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setLoginError(
        "Please enter your email and password, or use Instant Demo Sign-In.",
      );
      return;
    }
    const namePart = loginForm.email.split("@")[0];
    const formattedName =
      namePart.charAt(0).toUpperCase() +
      namePart.slice(1).replace(/[._-]/g, " ");
    setUser({
      name: formattedName || "Clara Vance",
      email: loginForm.email.trim(),
      tier: "Atelier Member",
      savedCount: 6,
    });
    setLoginError("");
    setLoginModalOpen(false);
  };

  const handleDemoLogin = () => {
    setUser({
      name: "Clara Vance",
      email: "clara.vance@noelandco.com",
      tier: "Atelier Member",
      savedCount: 6,
    });
    setLoginError("");
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setProfileModalOpen(false);
  };

  // Filter the 12 subhead rectangles inside the Search Panel based on user typing
  const filteredSearchSubheads = ALL_SEARCH_SUBHEADS.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      item.group.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  // Resolve current featured collection data for Grid Slot 1
  const currentCollection =
    COLLECTION_CATALOG[activeCategory] || COLLECTION_CATALOG["Christmas Party"];

  if (["Kids' Bday", "Holiday", "Adult Bday"].includes(activeCategory)) {
    return (
      <>
        <button
          type="button"
          onClick={() => setActiveCategory("Christmas Party")}
          className="btn shadow-sm"
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            zIndex: 1100,
            border: "1px solid rgba(200, 155, 60, 0.6)",
            borderRadius: "999px",
            backgroundColor: "#FAF6F0",
            color: "#23140E",
            fontWeight: 600,
          }}
        >
          <i className="bi bi-arrow-left me-2" />
          Back to collections
        </button>
        <AdultBirthdayInvitation />
      </>
    );
  }

  return (
    <div className="noel-app-root">
      {/* Inline Bootstrap + Editorial Design System Styles */}
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        :root {
          --noel-ivory: #FAF6F0;
          --noel-ivory-deep: #F2EBE0;
          --noel-mahogany: #23140E;
          --noel-mahogany-soft: #3D261C;
          --noel-crimson: #8B1E24;
          --noel-crimson-dark: #6E151A;
          --noel-gold: #C89B3C;
          --noel-gold-light: #E6C77E;
        }

        .noel-app-root {
          background-color: var(--noel-ivory);
          color: var(--noel-mahogany);
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .font-serif-editorial {
          font-family: 'Playfair Display', Georgia, serif;
        }

        /* Sticky 3-Part Editorial Navbar */
        .noel-navbar {
          position: sticky;
          top: 0;
          background-color: rgba(250, 246, 240, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(200, 155, 60, 0.35);
          z-index: 1030;
        }

        .noel-nav-icon-btn {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          border: 1px solid rgba(35, 20, 14, 0.14);
          background-color: #FFFFFF;
          color: var(--noel-mahogany);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .noel-nav-icon-btn:hover,
        .noel-nav-icon-btn.active {
          background-color: var(--noel-mahogany);
          color: var(--noel-ivory);
          border-color: var(--noel-mahogany);
        }

        .noel-desktop-nav {
          display: flex;
          justify-content: center;
          gap: clamp(0.25rem, 1.5vw, 1.25rem);
          border-top: 1px solid rgba(200, 155, 60, 0.2);
        }

        .noel-desktop-nav-link {
          padding: 0.55rem 0.45rem;
          border: 0;
          background: transparent;
          color: var(--noel-mahogany-soft);
          font-size: 0.82rem;
          font-weight: 600;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .noel-desktop-nav-link:hover,
        .noel-desktop-nav-link.active {
          color: var(--noel-crimson);
        }

        .noel-login-icon {
          display: inline;
        }

        .noel-brand-headline {
          color: var(--noel-mahogany);
          text-decoration: none;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .noel-brand-headline:hover {
          opacity: 0.82;
          color: var(--noel-crimson);
        }

        .noel-brand-main {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          letter-spacing: 0.18em;
          font-size: clamp(1.1rem, 2.3vw, 1.65rem);
        }

        .noel-brand-sub {
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--noel-gold);
          font-weight: 700;
          margin-top: 4px;
        }

        .noel-login-btn {
          background-color: var(--noel-crimson);
          color: #FFFFFF;
          border: 1px solid var(--noel-crimson);
          border-radius: 10px;
          padding: 0.45rem 0.95rem;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .noel-login-btn:hover {
          background-color: var(--noel-crimson-dark);
          border-color: var(--noel-crimson-dark);
          color: #FFFFFF;
        }

        .noel-profile-btn {
          background-color: #FFFFFF;
          color: var(--noel-mahogany);
          border: 1px solid rgba(200, 155, 60, 0.55);
          border-radius: 10px;
          padding: 0.42rem 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          transition: all 0.2s ease;
        }

        .noel-profile-btn:hover {
          background-color: var(--noel-ivory-deep);
          border-color: var(--noel-gold);
        }

        /* Expandable Search Bar & Overflowing Rectangular Subheads */
        .noel-search-drawer {
          background-color: #FFFFFF;
          border-bottom: 1px solid rgba(200, 155, 60, 0.4);
          box-shadow: 0 14px 30px rgba(35, 20, 14, 0.08);
          transition: max-height 0.28s ease, opacity 0.22s ease, padding 0.22s ease;
        }

        .noel-search-drawer.closed {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
          border-bottom-width: 0;
          pointer-events: none;
        }

        .noel-search-drawer.open {
          max-height: 280px;
          opacity: 1;
          pointer-events: auto;
        }

        .noel-overflow-row {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 0.75rem;
          padding-bottom: 0.45rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--noel-gold) transparent;
        }

        .noel-overflow-row::-webkit-scrollbar {
          height: 5px;
        }

        .noel-overflow-row::-webkit-scrollbar-thumb {
          background-color: rgba(200, 155, 60, 0.55);
          border-radius: 999px;
        }

        .noel-search-rect-box {
          flex: 0 0 auto;
          scroll-snap-align: start;
          min-width: 148px;
          padding: 0.65rem 0.95rem;
          border-radius: 10px;
          border: 1.5px solid rgba(35, 20, 14, 0.14);
          background-color: var(--noel-ivory);
          color: var(--noel-mahogany);
          text-align: left;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .noel-search-rect-box:hover,
        .noel-search-rect-box.active {
          border-color: var(--noel-crimson);
          background-color: var(--noel-crimson);
          color: #FFFFFF;
          transform: translateY(-1px);
        }

        .noel-search-rect-box:hover .rect-group-tag,
        .noel-search-rect-box.active .rect-group-tag {
          color: var(--noel-gold-light);
        }

        /* Hero Section with Background Video video_1.mp4 */
        .noel-hero-section {
          position: relative;
          min-height: 560px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #1C0F0A;
          overflow: hidden;
        }

        .hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .hero-candlelit-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(35, 20, 14, 0.72) 0%,
            rgba(35, 20, 14, 0.52) 45%,
            rgba(35, 20, 14, 0.9) 100%
          );
          z-index: 1;
        }

        .hero-content-layer {
          position: relative;
          z-index: 2;
        }

        /* Hero Horizontal Sliding Invitation Rectangles */
        .noel-hero-rect-card {
          flex: 0 0 auto;
          scroll-snap-align: start;
          width: 185px;
          min-height: 112px;
          border-radius: 14px;
          padding: 0.95rem 1.05rem;
          background: rgba(250, 246, 240, 0.93);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(200, 155, 60, 0.45);
          color: var(--noel-mahogany);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          transition: all 0.24s ease;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.24);
        }

        .noel-hero-rect-card:hover {
          transform: translateY(-4px);
          background: #FFFFFF;
          border-color: var(--noel-gold);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.34);
        }

        .noel-hero-rect-card.active {
          background: linear-gradient(145deg, #8B1E24 0%, #5C1216 100%);
          color: #FFFFFF;
          border-color: var(--noel-gold-light);
          transform: translateY(-4px);
        }

        .noel-hero-rect-card.upload-card {
          border-style: dashed;
          border-width: 2px;
          border-color: var(--noel-gold);
          background: rgba(35, 20, 14, 0.82);
          color: var(--noel-ivory);
        }

        .noel-hero-rect-card.upload-card:hover {
          background: rgba(35, 20, 14, 0.96);
          border-color: var(--noel-gold-light);
        }

        /* 2-by-1 3-Grid Cards Below Hero */
        .noel-grid-card {
          background-color: #FFFFFF;
          border: 1px solid rgba(200, 155, 60, 0.35);
          border-radius: 18px;
          box-shadow: 0 10px 30px rgba(35, 20, 14, 0.05);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .noel-grid-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(35, 20, 14, 0.09);
        }

        /* 3rd Slot Empty Anchor Link */
        .noel-empty-slot-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 150px;
          border-radius: 18px;
          border: 2px dashed rgba(200, 155, 60, 0.65);
          background-color: rgba(255, 255, 255, 0.55);
          color: var(--noel-mahogany);
          text-decoration: none;
          transition: all 0.22s ease;
          padding: 1.75rem;
        }

        .noel-empty-slot-link:hover {
          background-color: #FFFFFF;
          border-color: var(--noel-crimson);
          color: var(--noel-crimson);
        }

        /* Offcanvas & Modal Editorial Styling */
        .noel-offcanvas {
          background-color: var(--noel-ivory);
          color: var(--noel-mahogany);
          border-right: 1px solid rgba(200, 155, 60, 0.45);
          width: 340px !important;
          max-width: 88vw;
        }

        .noel-drawer-subhead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.62rem 0.9rem;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--noel-mahogany);
          font-size: 0.93rem;
          font-weight: 500;
          text-align: left;
          transition: all 0.18s ease;
        }

        .noel-drawer-subhead:hover,
        .noel-drawer-subhead.active {
          background-color: #FFFFFF;
          border-color: rgba(200, 155, 60, 0.5);
          color: var(--noel-crimson);
          font-weight: 600;
        }

        @media (max-width: 991.98px) {
          .noel-navbar .container-fluid {
            padding-right: 1rem !important;
            padding-left: 1rem !important;
          }
        }

        @media (max-width: 575.98px) {
          .noel-login-icon {
            display: none;
          }

          .noel-brand-main {
            font-size: 1rem;
            letter-spacing: 0.12em;
          }

          .noel-brand-sub {
            font-size: 0.5rem;
            letter-spacing: 0.15em;
          }

          .noel-navbar .gap-2 {
            gap: 0.35rem !important;
          }

          .noel-login-btn {
            padding: 0.4rem 0.55rem;
          }

          .noel-hero-section {
            min-height: 500px;
          }

          .noel-hero-category-heading,
          .noel-hero-category-heading > div:first-child {
            flex-wrap: wrap;
          }

          .noel-hero-category-heading {
            align-items: flex-start !important;
          }
        }

        @media (max-width: 360px) {
          .noel-nav-icon-btn {
            width: 36px;
            height: 36px;
          }

          .noel-login-btn {
            padding: 0.4rem;
          }

          .noel-login-label {
            display: none;
          }

          .noel-login-icon {
            display: inline;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* =====================================================================
          1. STICKY 3-PART TOP NAVBAR (Left 2, Center Headline, Right 2)
      ====================================================================== */}
      <header className="noel-navbar sticky-top">
        <div className="container-fluid px-3 px-lg-5 py-2">
          <div className="row align-items-center g-0">
            {/* LEFT SECTION (2 items: Menu Toggle + Search Icon) */}
            <div className="col-4 d-flex align-items-center gap-2 gap-sm-3">
              {/* Item 1: Menu Toggle Button (bi-list) */}
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen((isOpen) => !isOpen);
                  setSearchOpen(false);
                }}
                aria-label={drawerOpen ? "Close categories menu" : "Open categories menu"}
                aria-expanded={drawerOpen}
                className={`noel-nav-icon-btn noel-mobile-menu-toggle d-lg-none ${drawerOpen ? "active" : ""}`}
              >
                <i className={`bi ${drawerOpen ? "bi-x-lg" : "bi-list"} fs-4`} />
              </button>

              {/* Item 2: Search Icon Button (bi-search) -> Immediately focuses input */}
              <button
                type="button"
                onClick={handleToggleSearch}
                aria-label="Search invitations and greeting cards"
                aria-expanded={searchOpen}
                className={`noel-nav-icon-btn ${searchOpen ? "active" : ""}`}
              >
                <i
                  className={`bi ${searchOpen ? "bi-x-lg" : "bi-search"} fs-5`}
                />
              </button>

              <span className="d-none xl-inline d-xl-inline-block small text-muted ms-1">
                {activeCategory}
              </span>
            </div>

            {/* CENTER SECTION: Brand Headline (Clicking smoothly scrolls to top) */}
            <div className="col-4 text-center">
              <a
                href="#top"
                onClick={handleScrollToTop}
                className="noel-brand-headline"
                aria-label="NOEL & CO. Scroll to top"
              >
                <span className="noel-brand-main">NOEL &amp; CO.</span>
                <span className="noel-brand-sub">Invitations &amp; Cards</span>
              </a>
            </div>

            {/* RIGHT SECTION (2 items: Login Section + Profile Section) */}
            <div className="col-4 d-flex align-items-center justify-content-end gap-2 gap-sm-3">
              {/* Item 1: Login Section */}
              <button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="noel-login-btn"
                aria-label={user ? "Switch account" : "Login"}
              >
                <i className="bi bi-box-arrow-in-right me-1 noel-login-icon" />
                <span className="noel-login-label">
                  {user ? "Switch Account" : "Login"}
                </span>
              </button>

              {/* Item 2: Profile Section */}
              <button
                type="button"
                onClick={() => setProfileModalOpen(true)}
                aria-label="Open profile details"
                className="noel-profile-btn position-relative"
              >
                <i
                  className="bi bi-person-circle fs-5"
                  style={{ color: "#8B1E24" }}
                />
                <span className="d-none d-md-inline">
                  {user ? user.name.split(" ")[0] : "Profile"}
                </span>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    backgroundColor: user ? "#198754" : "#C89B3C",
                    fontSize: "0.62rem",
                  }}
                >
                  {user ? user.savedCount : "Guest"}
                </span>
              </button>
            </div>
          </div>
          <nav
            className="noel-desktop-nav d-none d-lg-flex"
            aria-label="Main categories"
          >
            {[
              "Holiday",
              "Kids' Bday",
              "Adult Bday",
              "Wedding",
              "Baby",
              "Parties",
              "Greeting Card",
            ].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleSelectCategory(category)}
                className={`noel-desktop-nav-link ${activeCategory === category ? "active" : ""}`}
                aria-current={activeCategory === category ? "page" : undefined}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* ===================================================================
            EXPANDABLE SEARCH PANEL (Auto-focuses input + 12 overflowing boxes)
        ==================================================================== */}
        <div
          className={`noel-search-drawer ${searchOpen ? "open py-3" : "closed"}`}
        >
          <div className="container-fluid px-3 px-lg-5">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                {/* Input field kept mounted so .focus() triggers mobile keyboard immediately */}
                <div className="input-group input-group-lg mb-3">
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{ borderColor: "rgba(200, 155, 60, 0.55)" }}
                  >
                    <i className="bi bi-search" style={{ color: "#8B1E24" }} />
                  </span>
                  <input
                    ref={searchInputRef}
                    type="search"
                    inputMode="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search invitations & greeting cards (e.g., Wedding, Christmas Card, Kids' Bday)..."
                    aria-label="Search invitations and greeting cards"
                    className="form-control border-start-0 shadow-none"
                    style={{
                      borderColor: "rgba(200, 155, 60, 0.55)",
                      fontSize: "0.96rem",
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="btn btn-outline-secondary"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Horizontal Left-to-Right Overflowing Slider of all 12 Subhead Rectangles */}
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <span
                    className="text-uppercase fw-bold"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      color: "#6E151A",
                    }}
                  >
                    Quick Filter Categories ({filteredSearchSubheads.length})
                  </span>
                  <span className="small text-muted d-none d-sm-inline">
                    Swipe or scroll left to right →
                  </span>
                </div>

                <div className="noel-overflow-row">
                  {filteredSearchSubheads.length > 0 ? (
                    filteredSearchSubheads.map((item) => {
                      const isSelected = activeCategory === item.label;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() =>
                            handleSelectCategory(item.label, {
                              closeSearch: true,
                            })
                          }
                          className={`noel-search-rect-box ${isSelected ? "active" : ""}`}
                        >
                          <div
                            className="rect-group-tag text-uppercase fw-semibold"
                            style={{
                              fontSize: "0.62rem",
                              letterSpacing: "0.09em",
                              color: isSelected ? "#E6C77E" : "#8B1E24",
                            }}
                          >
                            {item.group}
                          </div>
                          <div className="fw-semibold small mt-1 d-flex align-items-center gap-1 text-nowrap">
                            <i className={`bi ${item.icon}`} />
                            <span>{item.label}</span>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="py-2 px-3 small text-muted">
                      No matching subheads for &ldquo;{searchQuery}&rdquo;. Try
                      &ldquo;Christmas&rdquo; or &ldquo;Wedding&rdquo;.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          2. MAIN HERO SECTION — FIRST HALF
          Background Video (video_1.mp4) + Horizontal Overflow Invitation Rectangles
      ====================================================================== */}
      <main>
        <section className="noel-hero-section py-4 py-md-5">
          {/* Background Video referencing video_1.mp4 with rich candlelit poster fallback */}
          <video
            key={customVideoUrl || "default-video-1"}
            autoPlay
            loop
            muted
            playsInline
            poster={CANDLELIT_POSTER_URI}
            className="hero-bg-video"
          >
            {customVideoUrl && <source src={customVideoUrl} type="video/mp4" />}
            <source src="video_1.mp4" type="video/mp4" />
            <source src="/video_1.mp4" type="video/mp4" />
          </video>

          {/* Warm Candlelit Gradient Overlay */}
          <div className="hero-candlelit-overlay" />

          {/* Hero Top & Center Editorial Copy */}
          <div className="container-fluid px-3 px-lg-5 hero-content-layer my-auto pt-3 pt-md-4">
            <div className="row justify-content-center text-center">
              <div className="col-12 col-lg-8">
                <span
                  className="badge rounded-pill px-3 py-2 mb-3 text-uppercase"
                  style={{
                    backgroundColor: "rgba(200, 155, 60, 0.22)",
                    border: "1px solid rgba(230, 199, 126, 0.55)",
                    color: "#E6C77E",
                    letterSpacing: "0.16em",
                    fontSize: "0.7rem",
                  }}
                >
                  <i className="bi bi-stars me-1" />
                  Winter &amp; Holiday Atelier 2026
                </span>

                <h1
                  className="font-serif-editorial text-white fw-bold mb-3"
                  style={{
                    fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                    lineHeight: 1.15,
                    textShadow: "0 4px 24px rgba(0, 0, 0, 0.45)",
                  }}
                >
                  Gather by Candlelight, Send with Warmth
                </h1>

                <p
                  className="mx-auto mb-4"
                  style={{
                    maxWidth: "640px",
                    color: "#FAF6F0",
                    opacity: 0.92,
                    fontSize: "clamp(0.96rem, 1.4vw, 1.12rem)",
                  }}
                >
                  Bespoke digital and foil-stamped invitations, wax-sealed
                  Christmas suites, and personalized greeting cards crafted for
                  every milestone on your calendar.
                </p>
              </div>
            </div>
          </div>

          {/* Hero Bottom: Horizontal Sliding / Overflow Invitation Rectangles Bar */}
          <div className="container-fluid px-3 px-lg-5 hero-content-layer pt-3 pb-2">
            <div className="noel-hero-category-heading d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center gap-2">
                <span
                  className="text-uppercase fw-bold"
                  style={{
                    color: "#E6C77E",
                    fontSize: "0.72rem",
                    letterSpacing: "0.16em",
                  }}
                >
                  Explore Invitation Suites
                </span>
                <span
                  className="badge rounded-pill"
                  style={{
                    backgroundColor: "rgba(250, 246, 240, 0.16)",
                    color: "#FAF6F0",
                    fontSize: "0.68rem",
                  }}
                >
                  Active: {activeCategory}
                </span>
              </div>

              {/* Subtle Desktop Left/Right Arrow Controls */}
              <div className="d-none d-md-flex align-items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollHeroSlider("left")}
                  aria-label="Scroll invitation rectangles left"
                  className="btn btn-sm rounded-circle"
                  style={{
                    width: "34px",
                    height: "34px",
                    backgroundColor: "rgba(250, 246, 240, 0.16)",
                    border: "1px solid rgba(230, 199, 126, 0.45)",
                    color: "#FAF6F0",
                  }}
                >
                  <i className="bi bi-chevron-left" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollHeroSlider("right")}
                  aria-label="Scroll invitation rectangles right"
                  className="btn btn-sm rounded-circle"
                  style={{
                    width: "34px",
                    height: "34px",
                    backgroundColor: "rgba(250, 246, 240, 0.16)",
                    border: "1px solid rgba(230, 199, 126, 0.45)",
                    color: "#FAF6F0",
                  }}
                >
                  <i className="bi bi-chevron-right" />
                </button>
              </div>
            </div>

            {/* Overflow-x Sliding Rectangles Row */}
            <div ref={heroSliderRef} className="noel-overflow-row pb-2">
              {HERO_RECTANGLES.map((rect) => {
                const isActive = activeCategory === rect.id;
                return (
                  <button
                    key={rect.id}
                    type="button"
                    onClick={() => handleSelectCategory(rect.id)}
                    className={`noel-hero-rect-card ${
                      rect.isUpload ? "upload-card" : ""
                    } ${isActive ? "active" : ""}`}
                  >
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <i
                        className={`bi ${rect.icon} fs-5`}
                        style={{
                          color: rect.isUpload
                            ? "#E6C77E"
                            : isActive
                              ? "#E6C77E"
                              : "#8B1E24",
                        }}
                      />
                      <span
                        className="badge rounded-pill"
                        style={{
                          fontSize: "0.62rem",
                          backgroundColor: rect.isUpload
                            ? "rgba(200, 155, 60, 0.25)"
                            : isActive
                              ? "rgba(255, 255, 255, 0.18)"
                              : "rgba(139, 30, 36, 0.1)",
                          color: rect.isUpload
                            ? "#E6C77E"
                            : isActive
                              ? "#FFFFFF"
                              : "#8B1E24",
                        }}
                      >
                        {rect.badge}
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="fw-bold" style={{ fontSize: "0.96rem" }}>
                        {rect.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.73rem",
                          opacity: isActive || rect.isUpload ? 0.85 : 0.72,
                        }}
                      >
                        {rect.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Discreet Bottom-Right Video Loader Control for Previewing Local video_1.mp4 */}
            <div className="d-flex justify-content-end mt-2">
              <input
                ref={videoInputRef}
                type="file"
                accept="video/mp4,video/*"
                onChange={handleLocalVideoUpload}
                className="d-none"
              />
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                className="btn btn-sm d-inline-flex align-items-center gap-1"
                style={{
                  backgroundColor: "rgba(35, 20, 14, 0.72)",
                  border: "1px solid rgba(200, 155, 60, 0.45)",
                  color: "#E6C77E",
                  fontSize: "0.72rem",
                  borderRadius: "8px",
                }}
                title="Load video_1.mp4 from your device to preview in the hero background"
              >
                <i className="bi bi-film" />
                <span>
                  {customVideoUrl
                    ? "Change Hero Video"
                    : "Preview Local video_1.mp4"}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. NEXT SECTION BELOW — 3-GRID LAYOUT (2 BY 1) WITH EMPTY 3RD LINK
        ====================================================================== */}
        <section className="py-5">
          <div className="container">
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-4">
              <div>
                <span
                  className="text-uppercase fw-bold d-block"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.16em",
                    color: "#8B1E24",
                  }}
                >
                  Curated Showcase
                </span>
                <h2
                  className="font-serif-editorial fw-bold mb-0"


























                  style={{ color: "#23140E" }}
                >
                  Featured Suites &amp; Custom Studio
                </h2>
              </div>
              <span className="small text-muted">
                Selected Filter:{" "}
                <strong style={{ color: "#8B1E24" }}>{activeCategory}</strong>
              </span>
            </div>

            {/* 2-by-1 Three-Card Grid (row g-4: Two col-md-6 cards on top, one full-width col-12 empty link below) */}
            <div className="row g-4">
              {/* GRID ITEM 1 (col-12 col-md-6): Featured Invitation Collection Card */}
              <div className="col-12 col-md-6">
                <div className="noel-grid-card h-100 p-4 p-lg-5 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                      <span
                        className="badge rounded-pill px-3 py-1 text-uppercase"
                        style={{
                          backgroundColor: "rgba(139, 30, 36, 0.1)",
                          color: "#8B1E24",
                          letterSpacing: "0.1em",
                          fontSize: "0.68rem",
                        }}
                      >
                        {currentCollection.eyebrow}
                      </span>
                      <span
                        className="small fw-semibold"
                        style={{ color: "#C89B3C" }}
                      >
                        {currentCollection.count}
                      </span>
                    </div>

                    {/* Bespoke Inline SVG Wax-Sealed Invitation Suite Artwork */}
                    <div
                      className="rounded-4 p-4 mb-4 d-flex align-items-center justify-content-center"
                      style={{
                        background:
                          "linear-gradient(135deg, #23140E 0%, #3D261C 60%, #592019 100%)",
                        border: "1px solid rgba(200, 155, 60, 0.45)",
                      }}
                    >
                      <svg
                        viewBox="0 0 360 175"
                        className="w-100"
                        style={{ maxHeight: "165px" }}
                        role="img"
                        aria-label={`${activeCategory} gold foil invitation card preview`}
                      >
                        {/* Back Crimson Envelope */}
                        <rect
                          x="28"
                          y="22"
                          width="180"
                          height="128"
                          rx="8"
                          fill={currentCollection.accentBg}
                          stroke="#C89B3C"
                          strokeWidth="1.5"
                        />
                        <polygon
                          points="28,22 118,90 208,22"
                          fill="none"
                          stroke="#E6C77E"
                          strokeWidth="1.2"
                        />
                        {/* Gold Wax Seal */}
                        <circle cx="118" cy="88" r="15" fill="#C89B3C" />
                        <circle
                          cx="118"
                          cy="88"
                          r="11"
                          fill="none"
                          stroke="#23140E"
                          strokeWidth="1"
                        />
                        {/* Front Ivory Foil Invitation Card */}
                        <rect
                          x="145"
                          y="14"
                          width="188"
                          height="146"
                          rx="8"
                          fill="#FAF6F0"
                          stroke="#C89B3C"
                          strokeWidth="2"
                        />
                        <rect
                          x="153"
                          y="22"
                          width="172"
                          height="130"
                          rx="4"
                          fill="none"
                          stroke="#C89B3C"
                          strokeDasharray="3 3"
                          strokeWidth="1"
                        />
                        <text
                          x="239"
                          y="55"
                          textAnchor="middle"
                          fill="#8B1E24"
                          fontSize="9"
                          fontWeight="700"
                          letterSpacing="2.5"
                        >
                          YOU&apos;RE INVITED
                        </text>
                        <text
                          x="239"
                          y="84"
                          textAnchor="middle"
                          fill="#23140E"
                          fontFamily="Playfair Display, Georgia, serif"
                          fontSize="16"
                          fontWeight="700"
                        >
                          {activeCategory}
                        </text>
                        <line
                          x1="194"
                          y1="98"
                          x2="284"
                          y2="98"
                          stroke="#C89B3C"
                          strokeWidth="1.2"
                        />
                        <text
                          x="239"
                          y="118"
                          textAnchor="middle"
                          fill="#5C4033"
                          fontSize="9"
                        >
                          NOEL &amp; CO. ATELIER EDITION
                        </text>
                        <text
                          x="239"
                          y="136"
                          textAnchor="middle"
                          fill="#8B1E24"
                          fontSize="8.5"
                          fontWeight="600"
                        >
                          RSVP • DIGITAL &amp; PRINT
                        </text>
                      </svg>
                    </div>

                    <h3
                      className="font-serif-editorial fw-bold mb-2"
                      style={{ fontSize: "1.45rem", color: "#23140E" }}
                    >
                      {currentCollection.title}
                    </h3>

                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "0.94rem", lineHeight: 1.6 }}
                    >
                      {currentCollection.description}
                    </p>
                  </div>

                  <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <span className="small text-muted">
                      <i
                        className="bi bi-award me-1"
                        style={{ color: "#C89B3C" }}
                      />
                      {currentCollection.paperSpec}
                    </span>

                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(true)}
                      className="btn btn-sm fw-semibold px-3 py-2"
                      style={{
                        backgroundColor: "#23140E",
                        color: "#FAF6F0",
                        borderRadius: "10px",
                      }}
                    >
                      Customize Suite <i className="bi bi-arrow-right ms-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* GRID ITEM 2 (col-12 col-md-6): Greeting Cards & Custom Upload Showcase Card */}
              <div className="col-12 col-md-6">
                <div className="noel-grid-card h-100 p-4 p-lg-5 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                      <span
                        className="badge rounded-pill px-3 py-1 text-uppercase"
                        style={{
                          backgroundColor: "rgba(200, 155, 60, 0.18)",
                          color: "#6E151A",
                          letterSpacing: "0.1em",
                          fontSize: "0.68rem",
                        }}
                      >
                        Greeting Cards &amp; Custom Studio
                      </span>
                      <span
                        className="small fw-semibold"
                        style={{ color: "#8B1E24" }}
                      >
                        {uploadedPreviewUrl
                          ? "Custom Artwork Ready"
                          : selectedGreetingTab}
                      </span>
                    </div>

                    {/* Greeting Card Category Pills */}
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {[
                        "Thanksgiving",
                        "Christmas Card",
                        "Holiday Card",
                        "New Year Card",
                      ].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => {
                            setSelectedGreetingTab(tab);
                            setActiveCategory(tab);
                          }}
                          className="btn btn-sm"
                          style={{
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            backgroundColor:
                              selectedGreetingTab === tab
                                ? "#8B1E24"
                                : "#FAF6F0",
                            color:
                              selectedGreetingTab === tab
                                ? "#FFFFFF"
                                : "#23140E",
                            border: "1px solid rgba(200, 155, 60, 0.45)",
                          }}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Preview Box: Shows Uploaded Design OR Seasonal Greeting Card */}
                    <div
                      className="rounded-4 p-3 mb-4 d-flex flex-column align-items-center justify-content-center text-center"
                      style={{
                        minHeight: "175px",
                        backgroundColor: "#FAF6F0",
                        border: "1.5px dashed rgba(200, 155, 60, 0.7)",
                      }}
                    >
                      {uploadedPreviewUrl ? (
                        <div className="w-100">
                          <img
                            src={uploadedPreviewUrl}
                            alt="Uploaded custom invitation design"
                            className="img-fluid rounded-3 shadow-sm mb-2"
                            style={{ maxHeight: "130px", objectFit: "contain" }}
                          />
                          <div className="small fw-semibold text-truncate px-2">
                            <i className="bi bi-check-circle-fill text-success me-1" />
                            {uploadedFileName}
                          </div>
                        </div>
                      ) : (
                        <div className="py-2 px-3">
                          <div
                            className="mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "48px",
                              height: "48px",
                              backgroundColor: "rgba(139, 30, 36, 0.1)",
                              color: "#8B1E24",
                            }}
                          >
                            <i className="bi bi-postcard-heart fs-4" />
                          </div>
                          <div className="font-serif-editorial fw-bold fs-5">
                            {selectedGreetingTab} Collection
                          </div>
                          <p className="small text-muted mb-0 mt-1">
                            Pair heartfelt holiday wishes with custom envelope
                            liners—or upload your own print-ready artwork below.
                          </p>
                        </div>
                      )}
                    </div>

                    <h3
                      className="font-serif-editorial fw-bold mb-2"
                      style={{ fontSize: "1.45rem", color: "#23140E" }}
                    >
                      Send Seasonal Cards or Upload Your Design
                    </h3>
                    <p
                      className="text-muted mb-3"
                      style={{ fontSize: "0.94rem", lineHeight: 1.6 }}
                    >
                      Have a bespoke illustration or family holiday photo ready?
                      Upload your design for instant envelope pairing, RSVP
                      tracking, and digital delivery.
                    </p>
                  </div>

                  <div className="pt-3 border-top d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <span className="small text-muted">
                      <i
                        className="bi bi-file-earmark-image me-1"
                        style={{ color: "#8B1E24" }}
                      />
                      Supports PNG, JPG &amp; SVG
                    </span>

                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(true)}
                      className="btn btn-sm fw-semibold px-3 py-2"
                      style={{
                        backgroundColor: "#8B1E24",
                        color: "#FFFFFF",
                        borderRadius: "10px",
                      }}
                    >
                      <i className="bi bi-cloud-arrow-up me-1" />
                      {uploadedPreviewUrl
                        ? "Change Custom Design"
                        : "Upload Your Own"}
                    </button>
                  </div>
                </div>
              </div>

              {/* GRID ITEM 3 (col-12 full-width bottom row completing the 2-by-1 3-grid):
                  Empty Anchor Link (<a href="#" onClick={(e) => e.preventDefault()}>) */}
              <div className="col-12">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Slot 3 Empty Link Ready for Next Update"
                  className="noel-empty-slot-link"
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "rgba(200, 155, 60, 0.16)",
                      color: "#8B1E24",
                    }}
                  >
                    <i className="bi bi-link-45deg fs-4" />
                  </div>
                  <span
                    className="text-uppercase fw-bold"
                    style={{
                      fontSize: "0.74rem",
                      letterSpacing: "0.16em",
                      color: "#8B1E24",
                    }}
                  >
                    Grid Slot 3 • Empty Link
                  </span>
                  <span className="small text-muted mt-1">
                    Placeholder anchor link ready for your next section update
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MINIMAL FOOTER
      ====================================================================== */}
      <footer
        className="py-4 mt-3"
        style={{
          borderTop: "1px solid rgba(200, 155, 60, 0.35)",
          backgroundColor: "#F2EBE0",
        }}
      >
        <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2">
          <span
            className="font-serif-editorial fw-bold"
            style={{ letterSpacing: "0.14em" }}
          >
            NOEL &amp; CO.
          </span>
          <span className="small text-muted">
            © {new Date().getFullYear()} Noel &amp; Co. Invitations &amp;
            Greeting Cards
          </span>
          <a
            href="#top"
            onClick={handleScrollToTop}
            className="small fw-semibold text-decoration-none"
            style={{ color: "#8B1E24" }}
          >
            Back to Top ↑
          </a>
        </div>
      </footer>

      {/* =====================================================================
          BOOTSTRAP OFFCANVAS / DRAWER MENU (Left Toggle: Head 1 & Head 2)
      ====================================================================== */}
      {drawerOpen && (
        <>
          <div
            className="offcanvas-backdrop fade show"
            onClick={() => setDrawerOpen(false)}
            style={{ zIndex: 1040 }}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Browse Invitations and Greeting Cards"
            className="offcanvas offcanvas-start show noel-offcanvas"
            style={{ visibility: "visible", zIndex: 1045 }}
          >
            <div
              className="offcanvas-header border-bottom"
              style={{ borderColor: "rgba(200, 155, 60, 0.35)" }}
            >
              <div>
                <h5 className="offcanvas-title font-serif-editorial fw-bold mb-0">
                  NOEL &amp; CO.
                </h5>
                <small className="text-muted">
                  Collections &amp; Stationery
                </small>
              </div>
              <button
                type="button"
                className="btn-close shadow-none"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              />
            </div>

            <div className="offcanvas-body">
              {MENU_CATEGORIES.map((category, idx) => (
                <div
                  key={category.id}
                  className={idx > 0 ? "mt-4 pt-3 border-top" : ""}
                >
                  <div className="d-flex align-items-center gap-2 mb-2 px-2">
                    <i
                      className={`bi ${category.icon}`}
                      style={{ color: "#8B1E24" }}
                    />
                    <h6
                      className="text-uppercase fw-bold mb-0"
                      style={{
                        fontSize: "0.74rem",
                        letterSpacing: "0.12em",
                        color: "#8B1E24",
                      }}
                    >
                      {category.head}
                    </h6>
                  </div>

                  <div className="d-flex flex-column gap-1">
                    {category.subheads.map((subhead) => {
                      const isSelected = activeCategory === subhead;
                      return (
                        <button
                          key={subhead}
                          type="button"
                          onClick={() =>
                            handleSelectCategory(subhead, { closeDrawer: true })
                          }
                          className={`noel-drawer-subhead ${isSelected ? "active" : ""}`}
                        >
                          <span>{subhead}</span>
                          <i className="bi bi-chevron-right small opacity-50" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </>
      )}

      {/* =====================================================================
          BOOTSTRAP MODAL: LOGIN SECTION
      ====================================================================== */}
      {loginModalOpen && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setLoginModalOpen(false)}
            style={{ zIndex: 1050 }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="loginModalTitle"
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ zIndex: 1055 }}
            onClick={() => setLoginModalOpen(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content border-0 shadow-lg"
                style={{ backgroundColor: "#FAF6F0", borderRadius: "18px" }}
              >
                <div
                  className="modal-header border-bottom"
                  style={{ borderColor: "rgba(200, 155, 60, 0.35)" }}
                >
                  <div>
                    <span
                      className="text-uppercase fw-bold d-block"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.14em",
                        color: "#8B1E24",
                      }}
                    >
                      Member Access
                    </span>
                    <h5
                      id="loginModalTitle"
                      className="modal-title font-serif-editorial fw-bold"
                    >
                      Sign In to Noel &amp; Co.
                    </h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close shadow-none"
                    aria-label="Close login modal"
                    onClick={() => setLoginModalOpen(false)}
                  />
                </div>

                <div className="modal-body p-4">
                  {user && (
                    <div
                      className="alert d-flex align-items-center justify-content-between py-2 px-3 mb-3"
                      style={{
                        backgroundColor: "rgba(200, 155, 60, 0.16)",
                        borderColor: "#C89B3C",
                        color: "#23140E",
                      }}
                    >
                      <span className="small">
                        Signed in as <strong>{user.name}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline-danger py-0 px-2"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleLoginSubmit} noValidate>
                    <div className="mb-3">
                      <label
                        htmlFor="loginEmail"
                        className="form-label small fw-semibold"
                      >
                        Email Address
                      </label>
                      <input
                        id="loginEmail"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        placeholder="clara@example.com"
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="loginPassword"
                        className="form-label small fw-semibold"
                      >
                        Password
                      </label>
                      <input
                        id="loginPassword"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="form-control"
                      />
                    </div>

                    {loginError && (
                      <div className="alert alert-danger py-2 small">
                        {loginError}
                      </div>
                    )}

                    <div className="d-grid gap-2 mt-4">
                      <button
                        type="submit"
                        className="btn fw-semibold py-2"
                        style={{
                          backgroundColor: "#8B1E24",
                          color: "#FFFFFF",
                          borderRadius: "10px",
                        }}
                      >
                        Sign In
                      </button>

                      <button
                        type="button"
                        onClick={handleDemoLogin}
                        className="btn fw-semibold py-2"
                        style={{
                          backgroundColor: "#FFFFFF",
                          color: "#23140E",
                          border: "1px solid rgba(200, 155, 60, 0.65)",
                          borderRadius: "10px",
                        }}
                      >
                        <i
                          className="bi bi-stars me-1"
                          style={{ color: "#C89B3C" }}
                        />
                        Instant Demo Sign-In (Clara Vance)
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          BOOTSTRAP MODAL: PROFILE SECTION
      ====================================================================== */}
      {profileModalOpen && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setProfileModalOpen(false)}
            style={{ zIndex: 1050 }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profileModalTitle"
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ zIndex: 1055 }}
            onClick={() => setProfileModalOpen(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content border-0 shadow-lg"
                style={{ backgroundColor: "#FAF6F0", borderRadius: "18px" }}
              >
                <div
                  className="modal-header border-bottom"
                  style={{ borderColor: "rgba(200, 155, 60, 0.35)" }}
                >
                  <h5
                    id="profileModalTitle"
                    className="modal-title font-serif-editorial fw-bold"
                  >
                    Account &amp; Saved Invitations
                  </h5>
                  <button
                    type="button"
                    className="btn-close shadow-none"
                    aria-label="Close profile modal"
                    onClick={() => setProfileModalOpen(false)}
                  />
                </div>

                <div className="modal-body p-4">
                  {user ? (
                    <div>
                      <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-white border mb-4">
                        <div
                          className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                          style={{
                            width: "54px",
                            height: "54px",
                            backgroundColor: "#8B1E24",
                            color: "#FAF6F0",
                            fontSize: "1.2rem",
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{user.name}</h6>
                          <div className="small text-muted">{user.email}</div>
                          <span
                            className="badge mt-1"
                            style={{
                              backgroundColor: "#C89B3C",
                              color: "#23140E",
                            }}
                          >
                            {user.tier}
                          </span>
                        </div>
                      </div>

                      <h6
                        className="text-uppercase fw-bold mb-2"
                        style={{
                          fontSize: "0.72rem",
                          letterSpacing: "0.12em",
                          color: "#8B1E24",
                        }}
                      >
                        Saved Suites &amp; Drafts
                      </h6>
                      <ul className="list-group mb-4">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Candlelit Christmas Eve Dinner</span>
                          <span className="badge bg-success-subtle text-success">
                            Ready to Send
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Gold Foil New Year Soirée</span>
                          <span className="badge bg-warning-subtle text-dark">
                            Draft
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <span>Active Category Selection</span>
                          <span className="fw-semibold small">
                            {activeCategory}
                          </span>
                        </li>
                      </ul>

                      <div className="d-flex justify-content-between gap-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="btn btn-outline-danger btn-sm px-3"
                        >
                          <i className="bi bi-box-arrow-right me-1" />
                          Sign Out
                        </button>
                        <button
                          type="button"
                          onClick={() => setProfileModalOpen(false)}
                          className="btn btn-sm px-4"
                          style={{
                            backgroundColor: "#23140E",
                            color: "#FAF6F0",
                          }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <i
                        className="bi bi-person-circle display-4 d-block mb-2"
                        style={{ color: "#C89B3C" }}
                      />
                      <h6 className="font-serif-editorial fw-bold fs-5">
                        You are browsing as a Guest
                      </h6>
                      <p className="small text-muted mb-4">
                        Sign in to save your favorite Christmas invitations,
                        manage guest RSVPs, and store custom uploaded artwork.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileModalOpen(false);
                          setLoginModalOpen(true);
                        }}
                        className="btn px-4 py-2 fw-semibold"
                        style={{
                          backgroundColor: "#8B1E24",
                          color: "#FFFFFF",
                          borderRadius: "10px",
                        }}
                      >
                        Open Login Window
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          BOOTSTRAP MODAL: UPLOAD YOUR OWN INVITATION STUDIO
      ====================================================================== */}
      {uploadModalOpen && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setUploadModalOpen(false)}
            style={{ zIndex: 1050 }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="uploadModalTitle"
            className="modal fade show d-block"
            tabIndex={-1}
            style={{ zIndex: 1055 }}
            onClick={() => setUploadModalOpen(false)}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="modal-content border-0 shadow-lg"
                style={{ backgroundColor: "#FAF6F0", borderRadius: "18px" }}
              >
                <div
                  className="modal-header border-bottom"
                  style={{ borderColor: "rgba(200, 155, 60, 0.35)" }}
                >
                  <div>
                    <span
                      className="text-uppercase fw-bold d-block"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.14em",
                        color: "#8B1E24",
                      }}
                    >
                      Custom Atelier
                    </span>
                    <h5
                      id="uploadModalTitle"
                      className="modal-title font-serif-editorial fw-bold"
                    >
                      Upload Your Own Invitation
                    </h5>
                  </div>
                  <button
                    type="button"
                    className="btn-close shadow-none"
                    aria-label="Close upload modal"
                    onClick={() => setUploadModalOpen(false)}
                  />
                </div>

                <div className="modal-body p-4 text-center">
                  <input
                    ref={cardUploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomCardUpload}
                    className="d-none"
                  />

                  <div
                    onClick={() => cardUploadInputRef.current?.click()}
                    className="p-4 rounded-4 mb-3"
                    style={{
                      border: "2px dashed #C89B3C",
                      backgroundColor: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    {uploadedPreviewUrl ? (
                      <>
                        <img
                          src={uploadedPreviewUrl}
                          alt="Custom card preview"
                          className="img-fluid rounded-3 mb-2 shadow-sm"
                          style={{ maxHeight: "190px" }}
                        />
                        <div className="small fw-semibold text-success">
                          Loaded: {uploadedFileName}
                        </div>
                      </>
                    ) : (
                      <>
                        <i
                          className="bi bi-cloud-arrow-up display-5 d-block mb-2"
                          style={{ color: "#8B1E24" }}
                        />
                        <div className="fw-semibold">
                          Click to Choose Your Card Artwork
                        </div>
                        <div className="small text-muted mt-1">
                          PNG, JPG, or SVG • Instant live preview in Grid Slot 2
                        </div>
                      </>
                    )}
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button
                      type="button"
                      onClick={() => cardUploadInputRef.current?.click()}
                      className="btn btn-outline-dark btn-sm px-3"
                    >
                      Select File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(false)}
                      className="btn btn-sm px-4 fw-semibold"
                      style={{ backgroundColor: "#8B1E24", color: "#FFFFFF" }}
                    >
                      Apply to Showcase
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
