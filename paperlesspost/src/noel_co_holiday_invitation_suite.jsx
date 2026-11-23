import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Check,
  X,
  ChevronDown,
  ArrowUp,
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';

/**
 * ============================================================================
 * HOLIDAY THEME CONFIGURATIONS — NOEL & CO. EDITORIAL SUITE (BOOTSTRAP 5)
 * ============================================================================
 * Curated palettes, ambient HTML5 canvas particle modes, wax seal finishes,
 * and bespoke seasonal copy for each Noel & Co. celebration.
 */
const HOLIDAY_THEMES = {
  christmas: {
    id: 'christmas',
    label: 'Christmas',
    badge: 'Winter Edition',
    title: 'The Christmas Eve Candlelight Soirée',
    subtitle: 'AN INTIMATE EVENING OF WINTER WARMTH & REVELRY',
    formalIntro: 'Noel & Co. cordially invites you to',
    hostNote:
      'As winter settles softly over the estate, join us by candlelight for seasonal tasting courses, aged vintages, and fireside conversation.',
    dateShort: 'Dec 24 • 7:30 PM',
    date: 'December 24, 2026',
    time: '7:30 PM until Midnight',
    location: 'The Grand Conservatory, Noel & Co. Estate',
    dressCode: 'Black Tie & Deep Velvet Accents',
    colors: {
      pageBg: '#F9F6F0',
      pageText: '#0F291E',
      mutedText: '#465A51',
      primary: '#0F291E', // Deep Pine
      secondary: '#8B1E24', // Berry Crimson
      accent: '#D4AF37', // Champagne Gold
      accentLight: '#F1E1A6',
      envelopeBody: '#0F291E',
      envelopeFlap: '#163829',
      envelopePocket: '#0B2017',
      waxSeal: '#8B1E24',
      cardBg: '#FFFDF9',
      cardBorder: '#D4AF37',
      particleColors: ['#FFFFFF', '#F3E5C2', '#D4AF37'],
    },
    particleMode: 'snow',
    crestSymbol: '✦',
  },
  nye: {
    id: 'nye',
    label: "New Year's Eve",
    badge: 'Midnight Edition',
    title: 'Midnight Gala & Countdown',
    subtitle: 'RINGING IN A NEW CHAPTER IN CHAMPAGNE GOLD & STARLIGHT',
    formalIntro: 'Noel & Co. cordially invites you to',
    hostNote:
      'Rise above the city skyline as the final hours of the year slip away. Expect vintage cuvées, chamber strings, and a midnight toast beneath the glass atrium.',
    dateShort: 'Dec 31 • 9:00 PM',
    date: 'December 31, 2026',
    time: '9:00 PM — Midnight Countdown',
    location: 'The Sky Atrium, Noel & Co. Tower',
    dressCode: 'Midnight Formal & Metallic Foil',
    colors: {
      pageBg: '#F6F5F2',
      pageText: '#0B0E17',
      mutedText: '#495061',
      primary: '#0B0E17', // Midnight Obsidian
      secondary: '#262E42', // Slate Indigo
      accent: '#E5C158', // Champagne Gold
      accentLight: '#F5E4AE',
      envelopeBody: '#0B0E17',
      envelopeFlap: '#141929',
      envelopePocket: '#070910',
      waxSeal: '#9E7D28',
      cardBg: '#FFFDF9',
      cardBorder: '#E5C158',
      particleColors: ['#E5C158', '#C0C8D8', '#FEF08A'],
    },
    particleMode: 'sparkle',
    crestSymbol: '✧',
  },
  diwali: {
    id: 'diwali',
    label: 'Diwali',
    badge: 'Festival of Lights',
    title: 'Festival of Lights Soirée',
    subtitle: 'AN EVENING OF GOLDEN LAMPS, SPICE & RADIANT HARMONY',
    formalIntro: 'Noel & Co. cordially invites you to',
    hostNote:
      'In celebration of light triumphing over shadow, gather in a courtyard illuminated by a thousand hand-poured diyas, artisanal sweets, and celebratory music.',
    dateShort: 'Nov 8 • 7:00 PM',
    date: 'November 8, 2026',
    time: '7:00 PM onwards',
    location: 'The Lantern Courtyard, Noel & Co. House',
    dressCode: 'Festive Silk & Royal Jewel Tones',
    colors: {
      pageBg: '#FCF7F0',
      pageText: '#1E0B1A',
      mutedText: '#583750',
      primary: '#1E0B1A', // Royal Plum
      secondary: '#BE185D', // Lotus Crimson
      accent: '#F59E0B', // Saffron Gold
      accentLight: '#FDE68A',
      envelopeBody: '#1E0B1A',
      envelopeFlap: '#2D1127',
      envelopePocket: '#150712',
      waxSeal: '#BE185D',
      cardBg: '#FFFDF9',
      cardBorder: '#F59E0B',
      particleColors: ['#F59E0B', '#FDE68A', '#FB7185'],
    },
    particleMode: 'diya',
    crestSymbol: '❖',
  },
  autumn: {
    id: 'autumn',
    label: 'Autumn Harvest',
    badge: 'Harvest Table',
    title: 'Candlelit Harvest Supper',
    subtitle: 'A SEASONAL FEAST OF GRATITUDE, HEARTH & OAK',
    formalIntro: 'Noel & Co. cordially invites you to',
    hostNote:
      'Gathered around a single long cedar table dressed in linen and heirloom botanicals, share an unhurried evening of harvest fare and warm fellowship.',
    dateShort: 'Nov 26 • 6:30 PM',
    date: 'November 26, 2026',
    time: '6:30 PM — Fireside Supper',
    location: 'The Orchard Orangery, Noel & Co. Manor',
    dressCode: 'Autumnal Tailored & Cashmere',
    colors: {
      pageBg: '#FAF5EE',
      pageText: '#23110D',
      mutedText: '#59443E',
      primary: '#23110D', // Espresso Burgundy
      secondary: '#4D5E46', // Sage Olive
      accent: '#D97706', // Burnished Copper
      accentLight: '#F6D399',
      envelopeBody: '#23110D',
      envelopeFlap: '#331913',
      envelopePocket: '#190C09',
      waxSeal: '#4D5E46',
      cardBg: '#FFFDF9',
      cardBorder: '#D97706',
      particleColors: ['#D97706', '#B45309', '#4D5E46'],
    },
    particleMode: 'leaves',
    crestSymbol: '❦',
  },
};

/**
 * ============================================================================
 * CUSTOM HOOK: INTERSECTION OBSERVER FOR SCROLL REVEALS
 * ============================================================================
 */
function useInView(threshold = 0.22) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

/**
 * ============================================================================
 * AMBIENT HOLIDAY CANVAS & CELEBRATION BURST ENGINE
 * ============================================================================
 * Renders smooth 60fps theme-specific particles (snowflakes, champagne
 * sparkles, glowing diya embers, or drifting autumn leaves) plus gold burst
 * particles when the guest clicks "I'll Come".
 */
const AmbientParticleCanvas = ({ theme, burstTrigger }) => {
  const canvasRef = useRef(null);
  const burstParticlesRef = useRef([]);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Spawn celebratory gold/festive burst particles on "I'll Come"
  useEffect(() => {
    if (!burstTrigger) return;
    const { x, y } = burstTrigger;
    const palette = [
      '#D4AF37',
      '#E5C158',
      themeRef.current.colors.accent,
      themeRef.current.colors.primary,
      '#FFFDF9',
    ];

    for (let i = 0; i < 48; i++) {
      const angle = (Math.PI * 2 * i) / 48 + (Math.random() - 0.5) * 0.25;
      const speed = 2.2 + Math.random() * 5.6;
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

    const particleCount = width < 640 ? 28 : 46;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 3.2,
      speedY: 0.25 + Math.random() * 0.65,
      speedX: (Math.random() - 0.5) * 0.45,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.28 + Math.random() * 0.45,
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
          ctx.globalAlpha = p.alpha * 0.8;
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
          const s = p.r * 1.45;
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
          ctx.globalAlpha = p.alpha * glow * 0.72;
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
          ctx.globalAlpha = p.alpha * 0.68;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 1.85, p.r * 0.85, 0, 0, Math.PI * 2);
          ctx.fill();
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

  return <canvas ref={canvasRef} className="noel-particle-canvas" aria-hidden="true" />;
};

/**
 * ============================================================================
 * ORNATE CORNER FILIGREE SVG COMPONENT
 * ============================================================================
 */
const CornerFiligree = ({ color, positionClass = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`noel-corner-filigree ${positionClass}`}
    aria-hidden="true"
  >
    <path
      d="M4 60V16C4 9.37258 9.37258 4 16 4H60"
      stroke={color}
      strokeWidth="1.25"
      strokeOpacity="0.88"
    />
    <path
      d="M10 52V20C10 14.4772 14.4772 10 20 10H52"
      stroke={color}
      strokeWidth="0.75"
      strokeOpacity="0.58"
    />
    <circle cx="16" cy="16" r="2.3" fill={color} fillOpacity="0.88" />
    <path
      d="M22 10C22 14.5 18.5 18 14 18"
      stroke={color}
      strokeWidth="0.95"
      strokeOpacity="0.78"
    />
  </svg>
);

/**
 * ============================================================================
 * FLOATING MULTI-HOLIDAY THEME SWITCHER BAR (BOOTSTRAP 5 PILL NAV)
 * ============================================================================
 */
const HolidaySwitcher = ({ activeHolidayId, onSelectHoliday, theme }) => {
  const holidays = Object.values(HOLIDAY_THEMES);

  return (
    <header className="position-fixed top-0 start-0 end-0 d-flex justify-content-center px-2 pt-3 pt-sm-4 noel-nav-wrapper">
      <nav
        aria-label="Select Holiday Invitation"
        className="d-inline-flex align-items-center gap-1 p-1 rounded-pill shadow-lg border noel-nav-bar"
        style={{
          backgroundColor: 'rgba(255, 253, 249, 0.9)',
          borderColor: `${theme.colors.accent}66`,
        }}
      >
        {holidays.map((holiday) => {
          const isActive = holiday.id === activeHolidayId;
          return (
            <button
              key={holiday.id}
              type="button"
              onClick={() => onSelectHoliday(holiday.id)}
              className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 fw-medium noel-nav-pill"
              style={{
                backgroundColor: isActive ? theme.colors.primary : 'transparent',
                color: isActive ? '#FAF7F2' : theme.colors.pageText,
                borderColor: 'transparent',
                boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.16)' : 'none',
              }}
            >
              {isActive && (
                <span
                  className="rounded-circle noel-active-dot"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              )}
              <span>{holiday.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};

/**
 * ============================================================================
 * LIVING INBOX & 3D ENVELOPE OPENING EXPERIENCE
 * ============================================================================
 * Features an idle floating envelope with 3D mouse-tilt parallax, diagonal
 * foil shimmer, "NEW INVITATION" status pill, 180deg hinged top flap, and
 * unfolded cream-ivory invitation card.
 */
const LivingEnvelopeStage = ({ theme, isOpen, onOpen, onClose, onScrollPromptClick }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [cardElevated, setCardElevated] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setCardElevated(true);
      }, 380);
    } else {
      setCardElevated(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 8.5,
      rotateY: x * 10.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      aria-label="Holiday Invitation Envelope"
      className="container min-vh-100 d-flex flex-column align-items-center justify-content-between pt-5 pb-3 position-relative noel-hero-stage"
    >
      {/* Top Status Badge ("NEW INVITATION" when sealed) */}
      <div className="d-flex flex-column align-items-center text-center mt-4 mt-sm-5">
        <span
          className="badge rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 fw-medium border noel-status-badge"
          style={{
            borderColor: `${theme.colors.accent}70`,
            color: theme.colors.primary,
            backgroundColor: 'rgba(255, 253, 249, 0.85)',
          }}
        >
          <span
            className="rounded-circle noel-pulse-dot"
            style={{ backgroundColor: theme.colors.accent }}
          />
          <span>
            {isOpen ? `NOEL & CO. • ${theme.badge.toUpperCase()}` : 'NEW INVITATION'}
          </span>
        </span>
      </div>

      {/* Center Stage: Sealed/Opening 3D Envelope OR Unfolded Invitation Card */}
      <div className="w-100 d-flex align-items-center justify-content-center my-auto py-3 position-relative noel-envelope-stage-wrap">
        {/* ================================================================
            STATE A: SEALED / OPENING 3D ENVELOPE
           ================================================================ */}
        <div
          className={`w-100 d-flex flex-column align-items-center noel-state-transition ${
            cardElevated ? 'noel-state-hidden' : 'noel-state-visible'
          }`}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={`Open ${theme.title} invitation envelope`}
            onClick={onOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen();
              }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`position-relative user-select-none noel-envelope-wrapper ${
              !isOpen ? 'noel-envelope-float' : ''
            }`}
          >
            {/* Soft Ground Elevation Shadow */}
            <div
              className="position-absolute start-50 translate-middle-x rounded-pill noel-envelope-shadow"
              style={{ backgroundColor: theme.colors.primary }}
            />

            {/* 3D Perspective Envelope Assembly */}
            <div
              className="position-relative w-100 h-100 rounded-4 noel-envelope-3d"
              style={{
                transform: isOpen
                  ? 'rotateX(0deg) rotateY(0deg)'
                  : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              {/* 1. Envelope Back Wall */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-4 shadow-lg border noel-envelope-back"
                style={{
                  backgroundColor: theme.colors.envelopeBody,
                  borderColor: `${theme.colors.accent}55`,
                }}
              />

              {/* 2. Inner Metallic Liner */}
              <div
                className="position-absolute rounded-3 border noel-envelope-liner"
                style={{
                  borderColor: `${theme.colors.accent}45`,
                  background: `linear-gradient(145deg, ${theme.colors.envelopeFlap}, ${theme.colors.envelopeBody})`,
                }}
              />

              {/* 3. Rising Invitation Card Preview Inside Pocket */}
              <div
                className="position-absolute rounded-3 shadow-sm border d-flex flex-column align-items-center justify-content-start pt-3 px-3 text-center noel-card-peek"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: theme.colors.cardBorder,
                  transform: isOpen ? 'translateY(-48%)' : 'translateY(0%)',
                  zIndex: isOpen ? 15 : 2,
                }}
              >
                <span
                  className="noel-font-display fw-semibold noel-peek-brand"
                  style={{ color: theme.colors.accent }}
                >
                  NOEL &amp; CO.
                </span>
                <p
                  className="noel-font-serif fw-semibold mt-1 mb-1 noel-peek-title"
                  style={{ color: theme.colors.pageText }}
                >
                  {theme.title}
                </p>
                <span
                  className="d-inline-block mt-1 noel-peek-rule"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>

              {/* 4. Envelope Front Pocket Folds */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-4 overflow-hidden noel-envelope-pocket"
                style={{ zIndex: 10 }}
              >
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 noel-pocket-left"
                  style={{ backgroundColor: theme.colors.envelopePocket }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 noel-pocket-right"
                  style={{ backgroundColor: theme.colors.envelopePocket }}
                />
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 noel-pocket-bottom"
                  style={{ backgroundColor: theme.colors.envelopeBody }}
                />

                {/* Champagne Gold Hairline Seam */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="position-absolute top-0 start-0 w-100 h-100"
                >
                  <polyline
                    points="0,100 50,44 100,100"
                    fill="none"
                    stroke={theme.colors.accent}
                    strokeWidth="0.48"
                    strokeOpacity="0.7"
                  />
                </svg>

                {/* Foil Addressee Stamp */}
                <div className="position-absolute bottom-0 start-0 p-3 p-sm-4 text-start">
                  <p
                    className="mb-0 text-uppercase noel-pocket-kicker"
                    style={{ color: theme.colors.accentLight }}
                  >
                    Private Invitation
                  </p>
                  <p className="mb-0 noel-font-serif fst-italic text-white noel-pocket-edition">
                    {theme.label} &bull; {theme.dateShort}
                  </p>
                </div>

                {/* Diagonal Foil Shimmer Sweep */}
                <div className="position-absolute top-0 start-0 w-100 h-100 noel-foil-shimmer" />
              </div>

              {/* 5. Top Triangular Envelope Flap (180deg 3D Hinged) */}
              <div
                className="position-absolute top-0 start-0 w-100 noel-envelope-flap"
                style={{
                  zIndex: isOpen ? 1 : 20,
                  transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
              >
                <div
                  className="w-100 h-100 rounded-top-4 noel-flap-shape"
                  style={{ backgroundColor: theme.colors.envelopeFlap }}
                />
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="position-absolute top-0 start-0 w-100 h-100"
                >
                  <polyline
                    points="0,0 50,100 100,0"
                    fill="none"
                    stroke={theme.colors.accent}
                    strokeWidth="0.58"
                    strokeOpacity="0.8"
                  />
                </svg>
              </div>

              {/* 6. Embossed "N&C" Wax Seal */}
              <div
                className={`position-absolute start-50 translate-middle noel-wax-seal-wrap ${
                  isOpen ? 'noel-wax-seal-hidden' : ''
                }`}
                style={{ zIndex: 30 }}
              >
                <span
                  className="position-absolute top-0 start-0 w-100 h-100 rounded-circle noel-wax-seal-pulse"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <div
                  className="position-relative rounded-circle d-flex align-items-center justify-content-center shadow-lg noel-wax-seal"
                  style={{
                    backgroundColor: theme.colors.waxSeal,
                    borderColor: theme.colors.accent,
                  }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center border noel-wax-seal-inner"
                    style={{ borderColor: `${theme.colors.accent}90` }}
                  >
                    <span
                      className="noel-font-display fw-semibold noel-wax-monogram"
                      style={{ color: theme.colors.accentLight }}
                    >
                      N&amp;C
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tap to Open Prompt */}
          <button
            type="button"
            onClick={onOpen}
            className="btn btn-sm mt-4 d-inline-flex align-items-center gap-2 border-0 noel-open-prompt"
            style={{ color: theme.colors.mutedText }}
          >
            <Sparkles size={14} style={{ color: theme.colors.accent }} />
            <span>Tap the N&amp;C wax seal to open</span>
          </button>
        </div>

        {/* ================================================================
            STATE B: UNFOLDED ORNATE CREAM-IVORY INVITATION CARD
           ================================================================ */}
        <article
          aria-live="polite"
          className={`w-100 noel-card-container noel-state-transition ${
            cardElevated ? 'noel-card-visible' : 'noel-card-hidden'
          }`}
        >
          <div
            className="position-relative rounded-4 p-4 p-md-5 shadow-lg border overflow-hidden noel-invitation-card"
            style={{
              backgroundColor: theme.colors.cardBg,
              borderColor: `${theme.colors.cardBorder}88`,
            }}
          >
            {/* Inner Gold Hairline Frame */}
            <div
              className="position-absolute rounded-3 border noel-card-inner-frame"
              style={{ borderColor: `${theme.colors.accent}4D` }}
            />

            {/* Four Corner Ornamental Filigrees */}
            <CornerFiligree color={theme.colors.accent} positionClass="noel-corner-tl" />
            <CornerFiligree color={theme.colors.accent} positionClass="noel-corner-tr" />
            <CornerFiligree color={theme.colors.accent} positionClass="noel-corner-bl" />
            <CornerFiligree color={theme.colors.accent} positionClass="noel-corner-br" />

            {/* Top Right "Seal Envelope" Replay Button */}
            <div className="position-relative d-flex justify-content-end mb-2 noel-card-z">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 border noel-seal-btn"
                style={{
                  borderColor: `${theme.colors.accent}66`,
                  color: theme.colors.mutedText,
                  backgroundColor: `${theme.colors.pageBg}CC`,
                }}
                title="Close card back into envelope"
              >
                <RotateCcw size={12} style={{ color: theme.colors.accent }} />
                <span>Seal Envelope</span>
              </button>
            </div>

            {/* Card Formal Editorial Body */}
            <div className="position-relative d-flex flex-column align-items-center text-center px-2 px-sm-4 pt-1 pb-2 noel-card-z">
              {/* Brand Crest Header */}
              <div className="d-flex align-items-center gap-3 mb-2">
                <span
                  className="noel-gold-rule"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <span
                  className="noel-font-display fw-semibold text-uppercase noel-card-brand"
                  style={{ color: theme.colors.accent }}
                >
                  Noel &amp; Co.
                </span>
                <span
                  className="noel-gold-rule"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>

              {/* Formal Wording */}
              <p
                className="noel-font-serif fst-italic mb-2 noel-formal-intro"
                style={{ color: theme.colors.mutedText }}
              >
                {theme.formalIntro}
              </p>

              {/* Grand Holiday Title */}
              <h1
                className="noel-font-serif fw-semibold mb-2 noel-card-title"
                style={{ color: theme.colors.pageText }}
              >
                {theme.title}
              </h1>

              {/* Tracked Subtitle */}
              <p
                className="text-uppercase fw-medium mb-3 noel-card-subtitle"
                style={{ color: theme.colors.mutedText }}
              >
                {theme.subtitle}
              </p>

              {/* Holiday Emblem Divider */}
              <div className="d-flex align-items-center gap-3 my-2">
                <span
                  className="noel-gold-rule"
                  style={{ backgroundColor: `${theme.colors.accent}80` }}
                />
                <span
                  className="noel-crest-symbol"
                  style={{ color: theme.colors.accent }}
                  aria-hidden="true"
                >
                  {theme.crestSymbol}
                </span>
                <span
                  className="noel-gold-rule"
                  style={{ backgroundColor: `${theme.colors.accent}80` }}
                />
              </div>

              {/* Personal Host Note */}
              <p
                className="noel-font-serif fst-italic mt-2 mb-4 noel-host-note"
                style={{ color: theme.colors.mutedText }}
              >
                &ldquo;{theme.hostNote}&rdquo;
              </p>

              {/* Event Logistics Grid (Bootstrap 5 Row & Columns) */}
              <div
                className="w-100 pt-4 border-top text-start"
                style={{ borderColor: `${theme.colors.accent}48` }}
              >
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <Calendar
                        size={16}
                        className="mt-1 flex-shrink-0"
                        style={{ color: theme.colors.accent }}
                      />
                      <div>
                        <p
                          className="mb-0 text-uppercase fw-medium noel-meta-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Date
                        </p>
                        <p
                          className="mb-0 noel-font-serif fw-semibold noel-meta-value"
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
                          className="mb-0 text-uppercase fw-medium noel-meta-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Time
                        </p>
                        <p
                          className="mb-0 noel-font-serif fw-semibold noel-meta-value"
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
                          className="mb-0 text-uppercase fw-medium noel-meta-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Venue
                        </p>
                        <p
                          className="mb-0 noel-font-serif fw-semibold noel-meta-value"
                          style={{ color: theme.colors.pageText }}
                        >
                          {theme.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={theme.colors.accent}
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="16"
                        height="16"
                        className="mt-1 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M3 8l7 4-7 4V8z" />
                        <path d="M21 8l-7 4 7 4V8z" />
                        <rect x="10" y="10" width="4" height="4" rx="1" />
                      </svg>
                      <div>
                        <p
                          className="mb-0 text-uppercase fw-medium noel-meta-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Attire
                        </p>
                        <p
                          className="mb-0 noel-font-serif fw-semibold noel-meta-value"
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
          </div>
        </article>
      </div>

      {/* Gentle Scroll-Down Cue */}
      <button
        type="button"
        onClick={onScrollPromptClick}
        className="btn btn-sm d-flex flex-column align-items-center gap-1 pt-2 pb-1 border-0 noel-scroll-cue"
      >
        <span
          className="text-uppercase fw-medium noel-scroll-cue-text"
          style={{ color: theme.colors.mutedText }}
        >
          Scroll down to respond &darr;
        </span>
        <ChevronDown
          size={16}
          className="noel-bounce-arrow"
          style={{ color: theme.colors.accent }}
        />
      </button>
    </section>
  );
};

/**
 * ============================================================================
 * SCROLL STAGE 1: COMPACT TWO-BUTTON RSVP ("I'll Come" / "I Won't Come")
 * ============================================================================
 */
const RsvpScrollStage = ({
  sectionRef,
  theme,
  rsvpStatus,
  onSelectRsvp,
  guestName,
  setGuestName,
  savedName,
  onSaveName,
}) => {
  const [revealRef, isVisible] = useInView(0.24);

  return (
    <section
      ref={sectionRef}
      aria-label="RSVP Response"
      className="container d-flex flex-column align-items-center justify-content-center py-5 position-relative noel-rsvp-stage"
    >
      <div
        ref={revealRef}
        className={`w-100 d-flex flex-column align-items-center text-center noel-rsvp-box noel-rsvp-reveal ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        {/* Connecting Vertical Gold Thread */}
        <div
          className="mb-4 noel-vertical-thread"
          style={{
            background: `linear-gradient(to bottom, transparent, ${theme.colors.accent})`,
          }}
        />

        <span
          className="text-uppercase fw-medium mb-2 noel-rsvp-kicker"
          style={{ color: theme.colors.accent }}
        >
          Kindly Respond
        </span>

        <h2
          className="noel-font-serif fw-semibold mb-4 noel-rsvp-heading"
          style={{ color: theme.colors.pageText }}
        >
          Will you be joining us?
        </h2>

        {/* Compact Side-by-Side Bootstrap 5 Buttons ("I'll Come" / "I Won't Come") */}
        <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-3">
          <button
            type="button"
            onClick={(e) => onSelectRsvp('yes', e)}
            className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2 fw-medium shadow-sm noel-rsvp-btn"
            style={{
              backgroundColor:
                rsvpStatus === 'yes' ? theme.colors.primary : 'rgba(255, 253, 249, 0.94)',
              color: rsvpStatus === 'yes' ? '#FAF7F2' : theme.colors.primary,
              border: `1.5px solid ${
                rsvpStatus === 'yes' ? theme.colors.accent : `${theme.colors.primary}4D`
              }`,
              boxShadow:
                rsvpStatus === 'yes' ? `0 8px 22px -4px ${theme.colors.primary}55` : undefined,
            }}
          >
            <Check
              size={14}
              style={{
                color: rsvpStatus === 'yes' ? theme.colors.accent : theme.colors.primary,
              }}
            />
            <span>I&apos;ll Come</span>
          </button>

          <button
            type="button"
            onClick={(e) => onSelectRsvp('no', e)}
            className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2 fw-medium shadow-sm noel-rsvp-btn"
            style={{
              backgroundColor:
                rsvpStatus === 'no' ? theme.colors.secondary : 'rgba(255, 253, 249, 0.94)',
              color: rsvpStatus === 'no' ? '#FAF7F2' : theme.colors.mutedText,
              border: `1.5px solid ${
                rsvpStatus === 'no' ? theme.colors.secondary : `${theme.colors.mutedText}48`
              }`,
            }}
          >
            <X size={14} />
            <span>I Won&apos;t Come</span>
          </button>
        </div>

        {/* Dynamic Confirmation & Place-Card Personalization Area */}
        <div className="w-100 mt-4 d-flex flex-column align-items-center noel-rsvp-feedback-slot">
          {rsvpStatus === 'yes' && (
            <div
              className="w-100 rounded-4 p-4 border shadow-sm noel-fade-in-up"
              style={{
                backgroundColor: theme.colors.cardBg,
                borderColor: `${theme.colors.accent}70`,
              }}
            >
              <p
                className="noel-font-serif fst-italic mb-3 noel-feedback-quote"
                style={{ color: theme.colors.pageText }}
              >
                Delighted to have you join us at the Noel &amp; Co. table.
              </p>

              {/* Bootstrap 5 Compact Input Group for Guest Place Card */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSaveName();
                }}
                className="d-flex align-items-center gap-2"
              >
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your name for the place card (optional)"
                  aria-label="Guest name for place card"
                  className="form-control form-control-sm rounded-pill px-3"
                  style={{
                    borderColor: `${theme.colors.accent}75`,
                    color: theme.colors.pageText,
                    backgroundColor: '#FFFDF9',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-sm rounded-pill px-3 fw-medium flex-shrink-0 noel-save-btn"
                  style={{
                    backgroundColor: theme.colors.accent,
                    color: '#FFFDF9',
                    borderColor: theme.colors.accent,
                  }}
                >
                  Save
                </button>
              </form>

              {savedName && (
                <div className="mt-3">
                  <span
                    className="badge rounded-pill px-3 py-2 fw-medium noel-placecard-badge"
                    style={{
                      backgroundColor: `${theme.colors.accent}22`,
                      color: theme.colors.primary,
                      border: `1px solid ${theme.colors.accent}66`,
                    }}
                  >
                    Place card reserved for {savedName} &bull; {theme.dateShort} ✦
                  </span>
                </div>
              )}
            </div>
          )}

          {rsvpStatus === 'no' && (
            <div
              className="w-100 rounded-4 p-4 border shadow-sm noel-fade-in-up"
              style={{
                backgroundColor: theme.colors.cardBg,
                borderColor: `${theme.colors.accent}50`,
              }}
            >
              <p
                className="noel-font-serif fst-italic mb-2 noel-feedback-quote"
                style={{ color: theme.colors.pageText }}
              >
                You will be warmly missed — we&apos;ll raise a glass in your honor.
              </p>
              <p className="mb-2 noel-farewell-sub" style={{ color: theme.colors.mutedText }}>
                Should your seasonal plans change, you are always welcome at our table.
              </p>
              <button
                type="button"
                onClick={(e) => onSelectRsvp('yes', e)}
                className="btn btn-sm p-0 border-0 text-decoration-underline noel-update-link"
                style={{ color: theme.colors.accent }}
              >
                Update RSVP to &ldquo;I&apos;ll Come&rdquo;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/**
 * ============================================================================
 * SCROLL STAGE 2: EDITORIAL WEBSITE BRAND REVEAL ("NOEL & CO.")
 * ============================================================================
 */
const BrandRevealStage = ({ theme, scrollProgress, onBackToTop }) => {
  const [revealRef, isVisible] = useInView(0.24);

  const bottomFactor = Math.max(0, Math.min(1, (scrollProgress - 0.65) / 0.35));
  const parallaxY = (1 - bottomFactor) * 26;
  const subtleScale = 0.95 + bottomFactor * 0.05;

  return (
    <footer
      ref={revealRef}
      aria-label="Noel and Co. Brand Signature"
      className="container-fluid d-flex flex-column align-items-center justify-content-center py-5 px-3 px-sm-5 position-relative overflow-hidden noel-brand-stage"
    >
      {/* Ambient Radial Halo */}
      <div
        className="position-absolute rounded-circle noel-brand-halo"
        style={{
          background: `radial-gradient(circle, ${theme.colors.accent}28 0%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <div
        className="container d-flex flex-column align-items-center text-center position-relative noel-brand-reveal"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? parallaxY : 38}px) scale(${
            isVisible ? subtleScale : 0.94
          })`,
        }}
      >
        {/* N&C Monogram Crest */}
        <div
          className="rounded-circle border d-flex align-items-center justify-content-center mb-4 noel-brand-crest"
          style={{
            borderColor: `${theme.colors.accent}88`,
            color: theme.colors.accent,
          }}
        >
          <span className="noel-font-display fw-semibold noel-crest-text">N&amp;C</span>
        </div>

        {/* Top Expanding Champagne-Gold Horizontal Rule */}
        <div
          className={`w-100 mb-4 mb-sm-5 noel-brand-rule ${isVisible ? 'is-expanded' : ''}`}
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
          }}
        />

        {/* Grand Editorial Brand Wordmark: NOEL & CO. */}
        <h2
          className="noel-font-display fw-medium text-uppercase user-select-none mb-0 noel-brand-title"
          style={{
            letterSpacing: isVisible ? '0.22em' : '0.12em',
            paddingLeft: '0.22em',
            color: theme.colors.pageText,
          }}
        >
          NOEL &amp; CO.
        </h2>

        {/* Bottom Expanding Champagne-Gold Horizontal Rule */}
        <div
          className={`w-100 mt-4 mt-sm-5 mb-4 noel-brand-rule noel-brand-rule-delay ${
            isVisible ? 'is-expanded' : ''
          }`}
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
          }}
        />

        {/* Tracked Editorial Tagline */}
        <p
          className="text-uppercase fw-medium mb-0 noel-brand-tagline"
          style={{ color: theme.colors.mutedText }}
        >
          CURATED GATHERINGS &amp; TIMELESS CELEBRATIONS &bull; EST. NOEL &amp; CO.
        </p>

        {/* Smooth Scroll-to-Top Bootstrap Button */}
        <button
          type="button"
          onClick={onBackToTop}
          className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2 mt-5 border noel-top-btn"
          style={{
            borderColor: `${theme.colors.accent}66`,
            color: theme.colors.mutedText,
            backgroundColor: 'rgba(255, 253, 249, 0.75)',
          }}
        >
          <ArrowUp size={14} style={{ color: theme.colors.accent }} />
          <span>Return to Invitation</span>
        </button>
      </div>
    </footer>
  );
};

/**
 * ============================================================================
 * MAIN APPLICATION COMPONENT: NOEL & CO. BOOTSTRAP 5 HOLIDAY SUITE
 * ============================================================================
 */
export default function App() {
  const [activeHolidayId, setActiveHolidayId] = useState('christmas');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null); // 'yes' | 'no' | null
  const [guestName, setGuestName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [burstTrigger, setBurstTrigger] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const rsvpSectionRef = useRef(null);
  const theme = HOLIDAY_THEMES[activeHolidayId] || HOLIDAY_THEMES.christmas;

  // Ensure Bootstrap 5.3.3 stylesheet is available in document head if not already loaded
  useEffect(() => {
    const existingBootstrap = document.querySelector('link[href*="bootstrap"]');
    if (!existingBootstrap) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      link.integrity =
        'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }, []);

  // Track normalized vertical scroll progress (0 -> 1)
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSelectHoliday = useCallback((holidayId) => {
    setActiveHolidayId(holidayId);
  }, []);

  const handleSelectRsvp = useCallback((choice, event) => {
    setRsvpStatus(choice);
    if (choice === 'yes' && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setBurstTrigger({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        timestamp: Date.now(),
      });
    }
  }, []);

  const handleSaveName = useCallback(() => {
    const trimmed = guestName.trim();
    if (trimmed) {
      setSavedName(trimmed);
    }
  }, [guestName]);

  const scrollToRsvp = () => {
    rsvpSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="position-relative w-100 overflow-hidden noel-app-root"
      style={{
        backgroundColor: theme.colors.pageBg,
        color: theme.colors.pageText,
      }}
    >
      {/* Bootstrap 5.3.3 CSS, Google Fonts ('Cinzel', 'Cormorant Garamond', 'Plus Jakarta Sans'), & Scoped 3D CSS */}
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        .noel-app-root {
          min-height: 250vh;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: background-color 0.7s ease, color 0.7s ease;
        }

        .noel-font-display {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
        }

        .noel-font-serif {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        /* Subtle Tactile Paper Grain & Top Scroll Thread */
        .noel-paper-grain {
          pointer-events: none;
          opacity: 0.032;
          z-index: 30;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .noel-scroll-progress {
          height: 3px;
          z-index: 50;
          transition: width 0.15s ease-out, background-color 0.5s ease;
        }

        .noel-particle-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }

        /* Floating Holiday Switcher Bar */
        .noel-nav-wrapper {
          z-index: 40;
          pointer-events: none;
        }

        .noel-nav-bar {
          pointer-events: auto;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .noel-nav-bar::-webkit-scrollbar {
          display: none;
        }

        .noel-nav-pill {
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          padding: 0.42rem 0.95rem;
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .noel-active-dot {
          width: 6px;
          height: 6px;
          display: inline-block;
        }

        /* Hero Envelope Stage */
        .noel-hero-stage {
          z-index: 20;
        }

        .noel-status-badge {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          backdrop-filter: blur(8px);
        }

        .noel-pulse-dot {
          width: 7px;
          height: 7px;
          display: inline-block;
          animation: noelPulseDot 1.8s ease-in-out infinite;
        }

        @keyframes noelPulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.35); }
        }

        .noel-envelope-stage-wrap {
          max-width: 560px;
          min-height: 360px;
        }

        .noel-state-transition {
          transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .noel-state-visible {
          opacity: 1;
          transform: scale(1);
          position: relative;
        }

        .noel-state-hidden {
          opacity: 0;
          transform: scale(0.94);
          pointer-events: none;
          position: absolute;
        }

        /* 3D Living Envelope Dimensions & Idle Float */
        .noel-envelope-wrapper {
          width: 92vw;
          max-width: 460px;
          aspect-ratio: 1.48 / 1;
          perspective: 1400px;
          cursor: pointer;
        }

        @keyframes noelEnvelopeFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }

        .noel-envelope-float {
          animation: noelEnvelopeFloat 4.6s ease-in-out infinite;
        }

        .noel-envelope-shadow {
          bottom: -22px;
          width: 84%;
          height: 28px;
          filter: blur(18px);
          opacity: 0.28;
          transition: width 0.5s ease, opacity 0.5s ease;
        }

        .noel-envelope-wrapper:hover .noel-envelope-shadow {
          width: 88%;
          opacity: 0.38;
        }

        .noel-envelope-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        .noel-envelope-back {
          transition: background-color 0.5s ease, border-color 0.5s ease;
        }

        .noel-envelope-liner {
          inset: 8px;
          transition: border-color 0.5s ease;
        }

        .noel-card-peek {
          left: 6%;
          right: 6%;
          bottom: 6%;
          height: 86%;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.5s ease;
        }

        .noel-peek-brand {
          font-size: 0.65rem;
          letter-spacing: 0.24em;
        }

        .noel-peek-title {
          font-size: 1.15rem;
        }

        .noel-peek-rule {
          width: 44px;
          height: 1px;
        }

        .noel-envelope-pocket {
          pointer-events: none;
        }

        .noel-pocket-left {
          clip-path: polygon(0 0, 52% 54%, 0 100%);
          opacity: 0.94;
          transition: background-color 0.5s ease;
        }

        .noel-pocket-right {
          clip-path: polygon(100% 0, 48% 54%, 100% 100%);
          opacity: 0.94;
          transition: background-color 0.5s ease;
        }

        .noel-pocket-bottom {
          clip-path: polygon(0 100%, 50% 44%, 100% 100%);
          transition: background-color 0.5s ease;
        }

        .noel-pocket-kicker {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
        }

        .noel-pocket-edition {
          font-size: 0.85rem;
          opacity: 0.92;
        }

        /* Diagonal Foil Shimmer Sweep */
        @keyframes noelFoilShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .noel-foil-shimmer {
          opacity: 0.22;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 248, 225, 0.58) 48%,
            rgba(212, 175, 55, 0.45) 52%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: noelFoilShimmer 6s ease-in-out infinite;
        }

        /* 3D Hinged Triangular Top Flap */
        .noel-envelope-flap {
          height: 58%;
          transform-origin: top center;
          transform-style: preserve-3d;
          pointer-events: none;
          transition: transform 0.7s ease-in-out;
        }

        .noel-flap-shape {
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          transition: background-color 0.5s ease;
        }

        /* Embossed N&C Wax Seal */
        .noel-wax-seal-wrap {
          top: 53%;
          transition: opacity 0.45s ease, transform 0.45s ease;
        }

        .noel-wax-seal-hidden {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.45) !important;
          pointer-events: none;
        }

        .noel-envelope-wrapper:hover .noel-wax-seal-wrap:not(.noel-wax-seal-hidden) {
          transform: translate(-50%, -50%) scale(1.08);
        }

        .noel-wax-seal-pulse {
          opacity: 0.28;
          animation: noelSealAura 2.4s ease-out infinite;
        }

        @keyframes noelSealAura {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(1.45); opacity: 0; }
        }

        .noel-wax-seal {
          width: 62px;
          height: 62px;
          border: 2px solid;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.38),
            inset 0 2px 6px rgba(255, 255, 255, 0.24),
            inset 0 -3px 6px rgba(0, 0, 0, 0.35);
          transition: background-color 0.5s ease, border-color 0.5s ease;
        }

        .noel-wax-seal-inner {
          width: 46px;
          height: 46px;
        }

        .noel-wax-monogram {
          font-size: 0.88rem;
          letter-spacing: 0.08em;
        }

        .noel-open-prompt {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        /* Unfolded Invitation Card */
        .noel-card-container {
          max-width: 540px;
        }

        .noel-card-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          position: relative;
        }

        .noel-card-hidden {
          opacity: 0;
          transform: translateY(28px) scale(0.95);
          pointer-events: none;
          position: absolute;
        }

        .noel-invitation-card {
          box-shadow: 0 24px 60px -15px rgba(15, 41, 30, 0.18) !important;
          transition: background-color 0.5s ease, border-color 0.5s ease;
        }

        .noel-card-inner-frame {
          inset: 12px;
          pointer-events: none;
        }

        .noel-card-z {
          z-index: 5;
        }

        .noel-corner-filigree {
          position: absolute;
          width: 44px;
          height: 44px;
          pointer-events: none;
        }

        .noel-corner-tl { top: 14px; left: 14px; }
        .noel-corner-tr { top: 14px; right: 14px; transform: rotate(90deg); }
        .noel-corner-bl { bottom: 14px; left: 14px; transform: rotate(-90deg); }
        .noel-corner-br { bottom: 14px; right: 14px; transform: rotate(180deg); }

        .noel-seal-btn {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .noel-gold-rule {
          display: inline-block;
          width: 38px;
          height: 1px;
        }

        .noel-card-brand {
          font-size: 0.85rem;
          letter-spacing: 0.28em;
        }

        .noel-formal-intro {
          font-size: 1.05rem;
        }

        .noel-card-title {
          font-size: clamp(1.85rem, 4.5vw, 2.55rem);
          line-height: 1.14;
        }

        .noel-card-subtitle {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
        }

        .noel-crest-symbol {
          font-size: 0.95rem;
        }

        .noel-host-note {
          font-size: 1.1rem;
          line-height: 1.62;
          max-width: 420px;
        }

        .noel-meta-label {
          font-size: 0.64rem;
          letter-spacing: 0.2em;
        }

        .noel-meta-value {
          font-size: 1.02rem;
        }

        .noel-scroll-cue-text {
          font-size: 0.68rem;
          letter-spacing: 0.24em;
        }

        .noel-bounce-arrow {
          animation: noelBounce 2s infinite;
        }

        @keyframes noelBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        /* Scroll Stage 1: Compact Two-Button RSVP */
        .noel-rsvp-stage {
          min-height: 72vh;
          z-index: 20;
        }

        .noel-rsvp-box {
          max-width: 460px;
        }

        .noel-rsvp-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition: opacity 0.95s ease-out, transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .noel-rsvp-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .noel-vertical-thread {
          width: 1px;
          height: 48px;
        }

        .noel-rsvp-kicker {
          font-size: 0.68rem;
          letter-spacing: 0.26em;
        }

        .noel-rsvp-heading {
          font-size: clamp(1.55rem, 3.6vw, 2.05rem);
        }

        .noel-rsvp-btn {
          font-size: 0.76rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: all 0.28s ease;
        }

        .noel-rsvp-btn:active {
          transform: scale(0.96);
        }

        .noel-rsvp-feedback-slot {
          min-height: 135px;
        }

        .noel-feedback-quote {
          font-size: 1.18rem;
          line-height: 1.4;
        }

        .noel-save-btn {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .noel-placecard-badge {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
        }

        .noel-farewell-sub {
          font-size: 0.82rem;
        }

        .noel-update-link {
          font-size: 0.76rem;
          letter-spacing: 0.08em;
        }

        @keyframes noelFadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .noel-fade-in-up {
          animation: noelFadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Scroll Stage 2: Website Brand Reveal ("NOEL & CO.") */
        .noel-brand-stage {
          min-height: 82vh;
          z-index: 20;
        }

        .noel-brand-halo {
          width: min(85vw, 620px);
          height: min(85vw, 620px);
          filter: blur(48px);
          pointer-events: none;
          transition: opacity 1s ease;
        }

        .noel-brand-reveal {
          transition: opacity 1s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .noel-brand-crest {
          width: 46px;
          height: 46px;
        }

        .noel-crest-text {
          font-size: 0.82rem;
          letter-spacing: 0.12em;
        }

        .noel-brand-rule {
          max-width: 640px;
          height: 1px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }

        .noel-brand-rule-delay {
          transition-delay: 0.3s;
        }

        .noel-brand-rule.is-expanded {
          transform: scaleX(1);
        }

        .noel-brand-title {
          font-size: clamp(2.6rem, 9vw, 6.25rem);
          line-height: 1.05;
          transition: letter-spacing 1s ease, color 0.5s ease;
        }

        .noel-brand-tagline {
          font-size: 0.68rem;
          letter-spacing: 0.28em;
        }

        .noel-top-btn {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
      `}</style>

      {/* Tactile Fine-Paper Grain Overlay */}
      <div className="position-fixed top-0 start-0 w-100 h-100 noel-paper-grain" aria-hidden="true" />

      {/* Champagne Gold Scroll Progress Bar */}
      <div
        className="position-fixed top-0 start-0 noel-scroll-progress"
        style={{
          width: `${scrollProgress * 100}%`,
          backgroundColor: theme.colors.accent,
        }}
        aria-hidden="true"
      />

      {/* Ambient Holiday Particles & Celebratory Burst Canvas */}
      <AmbientParticleCanvas theme={theme} burstTrigger={burstTrigger} />

      {/* Floating Bootstrap 5 Pill Theme Switcher */}
      <HolidaySwitcher
        activeHolidayId={activeHolidayId}
        onSelectHoliday={handleSelectHoliday}
        theme={theme}
      />

      {/* Main Editorial Flow */}
      <main>
        {/* Hero: Living 3D Inbox Envelope & Unfolded Card */}
        <LivingEnvelopeStage
          theme={theme}
          isOpen={isEnvelopeOpen}
          onOpen={() => setIsEnvelopeOpen(true)}
          onClose={() => setIsEnvelopeOpen(false)}
          onScrollPromptClick={scrollToRsvp}
        />

        {/* Scroll Stage 1: Compact Two-Button RSVP */}
        <RsvpScrollStage
          sectionRef={rsvpSectionRef}
          theme={theme}
          rsvpStatus={rsvpStatus}
          onSelectRsvp={handleSelectRsvp}
          guestName={guestName}
          setGuestName={setGuestName}
          savedName={savedName}
          onSaveName={handleSaveName}
        />

        {/* Scroll Stage 2: Website Brand Reveal ("NOEL & CO.") */}
        <BrandRevealStage
          theme={theme}
          scrollProgress={scrollProgress}
          onBackToTop={scrollToTop}
        />
      </main>
    </div>
  );
}