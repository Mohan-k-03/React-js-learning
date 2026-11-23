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
  Gift,
  Heart,
  Star,
} from 'lucide-react';

/**
 * ============================================================================
 * PLAYFUL PASTEL STORYBOOK THEMES — BABY'S 1ST BIRTHDAY SUITE (BOOTSTRAP 5)
 * ============================================================================
 * Completely distinct from the dark-pine/gold Christmas aesthetic:
 * uses cheerful rounded typography ('Fredoka' & 'Quicksand'), scalloped edges,
 * blinking fairy lights, and waving cartoon baby illustrations.
 */
const BABY_THEMES = {
  sunnyTeddy: {
    id: 'sunnyTeddy',
    label: 'Sunny Teddy',
    badge: 'Sweet One • Honey & Cream',
    babyName: 'Baby Aarav',
    ageLabel: '1st',
    title: "Aarav's First Birthday Bash!",
    subtitle: 'ONE WHOLE YEAR OF GIGGLES, CUDDLES & FIRST STEPS',
    storyNote:
      'Come join us for balloons, smash cake, bubble machines, and lots of hugs as our little sunshine turns ONE!',
    dateShort: 'Sat, Dec 12 • 4:00 PM',
    date: 'Saturday, December 12, 2026',
    time: '4:00 PM — Cake Smash at 5:30 PM',
    location: 'Sunshine Garden Pavilion, Blossom Lane',
    dressCode: 'Comfy Pastel Casual & Party Socks',
    treatsNote: 'Mini Cupcakes, Fruit Pops & Bubble Play Zone',
    colors: {
      pageBg: '#FFFDF7',
      pageText: '#4A3728',
      mutedText: '#7D6654',
      primary: '#F59E0B', // Warm Honey Gold
      secondary: '#FB7185', // Coral Cheek Pink
      accent: '#38BDF8', // Sky Balloon Blue
      mint: '#34D399', // Soft Mint
      lavender: '#A78BFA',
      coverBg: '#FEF3C7', // Butter Cream Cover
      coverBorder: '#FBBF24',
      innerBg: '#FFFFFF',
      innerCardTint: '#FFFBEB',
      skinTone: '#FCD5B5',
      cheekColor: '#FDA4AF',
      onesieColor: '#38BDF8',
      onesieAccent: '#FDE047',
      bulbs: ['#FB7185', '#FBBF24', '#34D399', '#38BDF8', '#A78BFA'],
    },
  },
  cloudDream: {
    id: 'cloudDream',
    label: 'Cloud Dream',
    badge: 'Little Star • Sky & Mint',
    babyName: 'Baby Leo',
    ageLabel: '1st',
    title: "Leo's Cloud Nine 1st Birthday!",
    subtitle: 'FLOATING AMONG CLOUDS, STARS & SWEET TREATS',
    storyNote:
      'Twelve months of tiny toes and big smiles! Float over to celebrate our little dreamer’s very first trip around the sun.',
    dateShort: 'Sun, Dec 13 • 3:30 PM',
    date: 'Sunday, December 13, 2026',
    time: '3:30 PM — Wish & Candle at 5:00 PM',
    location: 'The Cloud Loft Playroom, Meadow Park',
    dressCode: 'Sky Blue, White & Mint Pastels',
    treatsNote: 'Cloud Cotton Candy, Berry Tarts & Soft Play',
    colors: {
      pageBg: '#F4FBFF',
      pageText: '#1E3A5F',
      mutedText: '#537194',
      primary: '#0EA5E9', // Cheerful Sky Blue
      secondary: '#10B981', // Fresh Mint
      accent: '#F59E0B', // Starlight Yellow
      mint: '#6EE7B7',
      lavender: '#818CF8',
      coverBg: '#E0F2FE', // Powder Sky Cover
      coverBorder: '#7DD3FC',
      innerBg: '#FFFFFF',
      innerCardTint: '#F0F9FF',
      skinTone: '#F8CFA9',
      cheekColor: '#FCA5A5',
      onesieColor: '#34D399',
      onesieAccent: '#FEF08A',
      bulbs: ['#38BDF8', '#34D399', '#FBBF24', '#FB7185', '#818CF8'],
    },
  },
  berryBlossom: {
    id: 'berryBlossom',
    label: 'Berry Blossom',
    badge: 'Wildflower One • Peach & Lilac',
    babyName: 'Baby Maya',
    ageLabel: '1st',
    title: "Maya's Berry Sweet 1st Party!",
    subtitle: 'CUPCAKES, BUTTERFLIES & ONE MAGICAL YEAR',
    storyNote:
      'Our sweetest little berry is turning one! Bring your brightest smiles for storytime, confetti pops, and strawberry cake.',
    dateShort: 'Sat, Dec 19 • 4:00 PM',
    date: 'Saturday, December 19, 2026',
    time: '4:00 PM — First Candle at 5:30 PM',
    location: 'The Rosewater Conservatory, Willow Street',
    dressCode: 'Peach, Lilac & Floral Pastels',
    treatsNote: 'Strawberry Shortcake, Macarons & Ball Pit',
    colors: {
      pageBg: '#FFF8FA',
      pageText: '#4C283B',
      mutedText: '#82586E',
      primary: '#F43F5E', // Strawberry Coral
      secondary: '#A855F7', // Soft Lilac
      accent: '#FBBF24', // Buttercup Gold
      mint: '#34D399',
      lavender: '#C084FC',
      coverBg: '#FFE4E6', // Blush Peach Cover
      coverBorder: '#FDA4AF',
      innerBg: '#FFFFFF',
      innerCardTint: '#FFF1F2',
      skinTone: '#F6C6A5',
      cheekColor: '#FB7185',
      onesieColor: '#C084FC',
      onesieAccent: '#FDE68A',
      bulbs: ['#F43F5E', '#A855F7', '#FBBF24', '#34D399', '#38BDF8'],
    },
  },
};

/**
 * ============================================================================
 * CUSTOM HOOK: INTERSECTION OBSERVER FOR SCROLL-TRIGGERED STAGES
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
 * FLOATING PASTEL CONFETTI & POP BURST CANVAS
 * ============================================================================
 * Renders gentle floating pastel stars, bubbles, and confetti shapes in the
 * background, plus a joyful rainbow pastel confetti burst when the card
 * opens or when a guest clicks "I'll Come".
 */
const PastelConfettiCanvas = ({ theme, burstTrigger }) => {
  const canvasRef = useRef(null);
  const burstRef = useRef([]);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Trigger a celebratory pastel confetti pop
  useEffect(() => {
    if (!burstTrigger) return;
    const { x, y } = burstTrigger;
    const colors = [
      '#FB7185',
      '#FBBF24',
      '#34D399',
      '#38BDF8',
      '#A78BFA',
      '#F472B6',
    ];

    for (let i = 0; i < 55; i++) {
      const angle = (Math.PI * 2 * i) / 55 + (Math.random() - 0.5) * 0.3;
      const speed = 2.5 + Math.random() * 6.5;
      burstRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.6,
        size: 4 + Math.random() * 4.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'star' : 'ribbon',
        alpha: 1,
        decay: 0.013 + Math.random() * 0.01,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.18,
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

    const count = width < 640 ? 22 : 36;
    const floaters = Array.from({ length: count }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 3 + Math.random() * 4.5,
      vy: 0.25 + Math.random() * 0.45,
      vx: (Math.random() - 0.5) * 0.35,
      phase: Math.random() * Math.PI * 2,
      kind: idx % 3 === 0 ? 'bubble' : idx % 3 === 1 ? 'star' : 'dot',
      colorIdx: idx % 5,
    }));

    const drawMiniStar = (cx, cy, spikes, outerR, innerR) => {
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;
      ctx.beginPath();
      ctx.moveTo(cx, cy - outerR);
      for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
        rot += step;
        ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
        rot += step;
      }
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const bulbs = themeRef.current.colors.bulbs;

      // Ambient drifting bubbles & stars
      floaters.forEach((f) => {
        f.phase += 0.025;
        f.y -= f.vy;
        f.x += Math.sin(f.phase) * 0.45 + f.vx * 0.2;

        if (f.y < -20) {
          f.y = height + 20;
          f.x = Math.random() * width;
        }

        const color = bulbs[f.colorIdx % bulbs.length];
        ctx.save();
        ctx.globalAlpha = 0.28 + 0.14 * Math.sin(f.phase);

        if (f.kind === 'bubble') {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r * 1.4, 0, Math.PI * 2);
          ctx.stroke();
        } else if (f.kind === 'star') {
          ctx.fillStyle = color;
          drawMiniStar(f.x, f.y, 5, f.r * 1.25, f.r * 0.55);
        } else {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r * 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // Celebratory confetti bursts
      for (let i = burstRef.current.length - 1; i >= 0; i--) {
        const b = burstRef.current[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.14;
        b.vx *= 0.985;
        b.alpha -= b.decay;
        b.rotation += b.vRot;

        if (b.alpha <= 0) {
          burstRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        ctx.globalAlpha = Math.max(0, b.alpha);
        ctx.fillStyle = b.color;

        if (b.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, b.size * 0.65, 0, Math.PI * 2);
          ctx.fill();
        } else if (b.shape === 'star') {
          drawMiniStar(0, 0, 5, b.size, b.size * 0.45);
        } else {
          ctx.fillRect(-b.size / 2, -b.size / 3, b.size, b.size * 0.55);
        }
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
      className="baby-bday-confetti-canvas"
      aria-hidden="true"
    />
  );
};

/**
 * ============================================================================
 * LIVING BLINKING FAIRY LIGHTS STRING (TOP OF OUTER CARD)
 * ============================================================================
 * Draped garland wire with colorful glowing pastel bulbs that continuously
 * blink and twinkle in staggered rhythms.
 */
const BlinkingFairyLights = ({ bulbColors }) => {
  const bulbs = [
    { cx: 28, cy: 24, delay: '0s', dur: '1.4s' },
    { cx: 68, cy: 33, delay: '0.35s', dur: '1.7s' },
    { cx: 112, cy: 38, delay: '0.7s', dur: '1.3s' },
    { cx: 158, cy: 36, delay: '0.15s', dur: '1.6s' },
    { cx: 204, cy: 29, delay: '0.55s', dur: '1.5s' },
    { cx: 250, cy: 36, delay: '0.9s', dur: '1.35s' },
    { cx: 296, cy: 38, delay: '0.25s', dur: '1.75s' },
    { cx: 340, cy: 32, delay: '0.65s', dur: '1.45s' },
    { cx: 378, cy: 22, delay: '0.4s', dur: '1.6s' },
  ];

  return (
    <svg
      viewBox="0 0 400 58"
      className="w-100 baby-bday-lights-svg"
      aria-hidden="true"
    >
      {/* Draped Garland Cord */}
      <path
        d="M 0 12 Q 100 46 200 24 Q 300 46 400 12"
        fill="none"
        stroke="#8D6E63"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {bulbs.map((b, idx) => {
        const color = bulbColors[idx % bulbColors.length];
        return (
          <g key={idx} transform={`translate(${b.cx}, ${b.cy})`}>
            {/* Socket Cap */}
            <rect
              x="-3.5"
              y="-5"
              width="7"
              height="6"
              rx="1.5"
              fill="#6D4C41"
            />
            {/* Outer Blinking Halo */}
            <circle
              cx="0"
              cy="7"
              r="11"
              fill={color}
              className="baby-bday-bulb-halo"
              style={{
                animationDelay: b.delay,
                animationDuration: b.dur,
              }}
            />
            {/* Glowing Bulb Body */}
            <ellipse
              cx="0"
              cy="7"
              rx="5.5"
              ry="7.5"
              fill={color}
              className="baby-bday-bulb-core"
              style={{
                animationDelay: b.delay,
                animationDuration: b.dur,
              }}
            />
            {/* Specular White Sparkle */}
            <circle cx="-1.8" cy="4.5" r="1.5" fill="#FFFFFF" opacity="0.85" />
          </g>
        );
      })}
    </svg>
  );
};

/**
 * ============================================================================
 * LIVING CARTOON BABY ILLUSTRATION (SHAKING/WAVING HANDS + BLINKING EYES)
 * ============================================================================
 * Custom vector cartoon baby wearing a striped party hat with pom-pom,
 * rosy cheeks, cute hair curl, blinking eyes, and two animated waving hands
 * holding a festive rattle and floating balloon!
 */
const LivingCartoonBaby = ({ theme }) => {
  const { colors } = theme;

  return (
    <svg
      viewBox="0 0 280 235"
      className="baby-bday-cartoon-svg"
      role="img"
      aria-label={`Cute cartoon illustration of ${theme.babyName} waving hands`}
    >
      {/* Floating Pastel Balloon Tethered to Right Hand */}
      <g className="baby-bday-balloon-bob">
        <path
          d="M 225 118 Q 236 92 232 68"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="1.6"
          strokeDasharray="3 2"
        />
        <ellipse cx="232" cy="44" rx="20" ry="24" fill={colors.accent} />
        <ellipse
          cx="225"
          cy="36"
          rx="5"
          ry="8"
          fill="#FFFFFF"
          opacity="0.45"
          transform="rotate(-20 225 36)"
        />
        <polygon points="232,68 228,73 236,73" fill={colors.accent} />
        <text
          x="232"
          y="49"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="15"
          fontWeight="700"
          fontFamily="Fredoka, sans-serif"
        >
          1
        </text>
      </g>

      {/* Cute Soft Shadow Beneath Baby */}
      <ellipse
        cx="140"
        cy="218"
        rx="68"
        ry="11"
        fill={colors.pageText}
        opacity="0.1"
      />

      {/* Left Waving Cartoon Arm & Hand (Animated Shaking/Waving) */}
      <g className="baby-bday-hand-left">
        {/* Sleeve */}
        <path
          d="M 96 156 Q 68 142 56 122"
          fill="none"
          stroke={colors.onesieColor}
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Chubby Cartoon Hand */}
        <circle cx="53" cy="117" r="12" fill={colors.skinTone} />
        {/* Tiny Waving Fingers */}
        <circle cx="44" cy="109" r="4" fill={colors.skinTone} />
        <circle cx="52" cy="105" r="4" fill={colors.skinTone} />
        <circle cx="60" cy="108" r="4" fill={colors.skinTone} />
        {/* Playful Motion Lines around Waving Hand */}
        <path
          d="M 32 104 Q 28 114 33 123"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2.2"
          strokeLinecap="round"
          className="baby-bday-wave-arc"
        />
        <path
          d="M 25 108 Q 22 115 26 121"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="2"
          strokeLinecap="round"
          className="baby-bday-wave-arc"
        />
      </g>

      {/* Right Waving Cartoon Arm & Hand Holding Star Rattle */}
      <g className="baby-bday-hand-right">
        {/* Sleeve */}
        <path
          d="M 184 156 Q 212 142 224 122"
          fill="none"
          stroke={colors.onesieColor}
          strokeWidth="18"
          strokeLinecap="round"
        />
        {/* Cute Star Rattle */}
        <rect
          x="222"
          y="96"
          width="5"
          height="24"
          rx="2.5"
          fill="#FBBF24"
          transform="rotate(18 224 108)"
        />
        <circle cx="229" cy="92" r="10" fill={colors.secondary} />
        <circle cx="229" cy="92" r="4.5" fill="#FEF08A" />
        {/* Chubby Cartoon Hand */}
        <circle cx="226" cy="118" r="12" fill={colors.skinTone} />
        <circle cx="235" cy="110" r="4" fill={colors.skinTone} />
        <circle cx="227" cy="106" r="4" fill={colors.skinTone} />
        {/* Motion Lines */}
        <path
          d="M 248 106 Q 252 115 247 124"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2.2"
          strokeLinecap="round"
          className="baby-bday-wave-arc"
        />
      </g>

      {/* Chubby Baby Onesie Torso */}
      <path
        d="M 94 146 C 88 182, 98 208, 140 208 C 182 208, 192 182, 186 146 Z"
        fill={colors.onesieColor}
      />
      {/* Cute Yellow Star Bib */}
      <path
        d="M 114 146 Q 140 176 166 146 Z"
        fill={colors.onesieAccent}
      />
      <text
        x="140"
        y="186"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="16"
        fontWeight="700"
        fontFamily="Fredoka, sans-serif"
      >
        ★ 1 ★
      </text>

      {/* Cute Chubby Baby Feet / Booties */}
      <ellipse cx="114" cy="209" rx="16" ry="10" fill={colors.secondary} />
      <ellipse cx="166" cy="209" rx="16" ry="10" fill={colors.secondary} />
      <circle cx="110" cy="208" r="3" fill="#FFFFFF" opacity="0.7" />
      <circle cx="162" cy="208" r="3" fill="#FFFFFF" opacity="0.7" />

      {/* Baby Ears */}
      <circle cx="88" cy="104" r="11" fill={colors.skinTone} />
      <circle cx="192" cy="104" r="11" fill={colors.skinTone} />
      <circle cx="88" cy="104" r="5" fill={colors.cheekColor} opacity="0.55" />
      <circle cx="192" cy="104" r="5" fill={colors.cheekColor} opacity="0.55" />

      {/* Round Chubby Baby Head */}
      <ellipse cx="140" cy="102" rx="52" ry="47" fill={colors.skinTone} />

      {/* Adorable Signature Baby Curl of Hair */}
      <path
        d="M 136 56 C 130 42, 148 38, 146 50 C 145 55, 139 54, 141 49"
        fill="none"
        stroke="#6D4C41"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Festive Striped Party Hat with Fluffy Pom-Pom */}
      <g transform="translate(140, 56) rotate(-8)">
        <polygon points="-24,4 24,4 0,-42" fill={colors.secondary} />
        <polygon points="-16,-10 16,-10 10,-22 -10,-22" fill="#FDE047" />
        {/* Fluffy Pom-Pom */}
        <circle cx="0" cy="-44" r="7.5" fill="#FFFFFF" />
        <circle cx="-3" cy="-46" r="4" fill={colors.accent} opacity="0.6" />
      </g>

      {/* Rosy Chubby Cheeks */}
      <ellipse
        cx="108"
        cy="112"
        rx="10"
        ry="6.5"
        fill={colors.cheekColor}
        opacity="0.72"
      />
      <ellipse
        cx="172"
        cy="112"
        rx="10"
        ry="6.5"
        fill={colors.cheekColor}
        opacity="0.72"
      />

      {/* Big Sparkling Cartoon Eyes (With Periodic Blink Animation) */}
      <g className="baby-bday-eyes">
        {/* Left Eye */}
        <circle cx="118" cy="99" r="7.5" fill="#2D1E17" />
        <circle cx="115.5" cy="96.5" r="2.7" fill="#FFFFFF" />
        <circle cx="120.5" cy="101" r="1.2" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="162" cy="99" r="7.5" fill="#2D1E17" />
        <circle cx="159.5" cy="96.5" r="2.7" fill="#FFFFFF" />
        <circle cx="164.5" cy="101" r="1.2" fill="#FFFFFF" />
      </g>

      {/* Cute Button Nose */}
      <path
        d="M 137 107 Q 140 110 143 107"
        fill="none"
        stroke="#C58B68"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Happy Giggling Smile */}
      <path
        d="M 128 118 Q 140 131 152 118 Z"
        fill="#FB7185"
      />
      <path
        d="M 133 123 Q 140 128 147 123"
        fill="#FDA4AF"
      />
    </svg>
  );
};

/**
 * ============================================================================
 * CUTE CARTOON BIRTHDAY CAKE & BUNTING SVG (INSIDE INVITATION CARD)
 * ============================================================================
 */
const CartoonBirthdayCake = ({ colors }) => (
  <svg
    viewBox="0 0 120 105"
    width="86"
    height="76"
    aria-hidden="true"
    className="mx-auto"
  >
    {/* Candle */}
    <rect x="56" y="22" width="8" height="20" rx="3" fill="#38BDF8" />
    <line x1="56" y1="28" x2="64" y2="31" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="56" y1="35" x2="64" y2="38" stroke="#FFFFFF" strokeWidth="2" />
    {/* Flickering Candle Flame */}
    <path
      d="M 60 6 C 65 13, 65 19, 60 21 C 55 19, 55 13, 60 6 Z"
      fill="#FBBF24"
      className="baby-bday-flame"
    />
    <circle cx="60" cy="15" r="2.5" fill="#FEF9C3" />

    {/* Top Cake Tier */}
    <rect x="34" y="42" width="52" height="22" rx="8" fill="#FDE68A" />
    <path
      d="M 34 48 Q 42 56 50 48 Q 58 56 66 48 Q 74 56 86 48 L 86 44 Q 86 40 78 40 L 42 40 Q 34 40 34 44 Z"
      fill="#FB7185"
    />

    {/* Bottom Cake Tier */}
    <rect x="22" y="64" width="76" height="26" rx="10" fill={colors.primary} />
    <path
      d="M 22 71 Q 32 80 42 71 Q 52 80 62 71 Q 72 80 82 71 Q 90 80 98 71 L 98 66 Q 98 62 88 62 L 32 62 Q 22 62 22 66 Z"
      fill="#FFFFFF"
    />

    {/* Cake Plate */}
    <rect x="14" y="90" width="92" height="6" rx="3" fill="#CBD5E1" />
  </svg>
);

/**
 * ============================================================================
 * TOP FLOATING PASTEL THEME PILL BAR (BOOTSTRAP 5)
 * ============================================================================
 */
const BabyThemeBar = ({ activeThemeId, onSelectTheme, theme }) => {
  const themes = Object.values(BABY_THEMES);

  return (
    <header className="position-fixed top-0 start-0 end-0 d-flex justify-content-center px-2 pt-3 baby-bday-nav-wrap">
      <nav
        aria-label="Choose Baby Birthday Storybook Theme"
        className="d-inline-flex align-items-center gap-1 p-1 rounded-pill shadow-sm border baby-bday-nav-pillbox"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderColor: theme.colors.coverBorder,
        }}
      >
        {themes.map((item) => {
          const active = item.id === activeThemeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTheme(item.id)}
              className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 fw-semibold baby-bday-nav-btn"
              style={{
                backgroundColor: active ? theme.colors.primary : 'transparent',
                color: active ? '#FFFFFF' : theme.colors.pageText,
                borderColor: 'transparent',
              }}
            >
              <span
                className="rounded-circle baby-bday-theme-dot"
                style={{
                  backgroundColor: active ? '#FFFFFF' : item.colors.primary,
                }}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};

/**
 * ============================================================================
 * HERO STAGE: LIVING OUTER CARTOON CARD -> OPENS INNER BIRTHDAY INVITATION
 * ============================================================================
 * Features a folded storybook outer card with blinking fairy lights, waving
 * cartoon baby, and 3D mouse-tilt parallax. Clicking opens the cover like a
 * storybook to reveal the full inner birthday invitation!
 */
const LivingStorybookStage = ({
  theme,
  isOpen,
  onOpenCard,
  onCloseCard,
  onScrollToRsvp,
}) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [showInside, setShowInside] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setShowInside(true), 360);
    } else {
      setShowInside(false);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: -y * 8,
      rotateY: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section
      aria-label="Baby First Birthday Interactive Card"
      className="container min-vh-100 d-flex flex-column align-items-center justify-content-between pt-5 pb-3 position-relative baby-bday-hero"
    >
      {/* Top Playful Badge */}
      <div className="mt-4 pt-2 text-center">
        <span
          className="badge rounded-pill d-inline-flex align-items-center gap-2 px-3 py-2 shadow-sm border baby-bday-top-badge"
          style={{
            backgroundColor: '#FFFFFF',
            color: theme.colors.pageText,
            borderColor: theme.colors.coverBorder,
          }}
        >
          <Sparkles size={14} style={{ color: theme.colors.primary }} />
          <span>
            {isOpen
              ? `${theme.babyName.toUpperCase()} • ${theme.badge.toUpperCase()}`
              : 'YOU HAVE A CUTE PARTY INVITATION!'}
          </span>
        </span>
      </div>

      {/* Center Stage: Living Outer Card OR Open Inner Invitation */}
      <div className="w-100 d-flex align-items-center justify-content-center my-auto py-3 position-relative baby-bday-stage-box">
        {/* ================================================================
            1. LIVING OUTER CARTOON BABY CARD (CLOSED STATE)
           ================================================================ */}
        <div
          className={`w-100 d-flex flex-column align-items-center baby-bday-transition ${
            showInside ? 'baby-bday-hidden' : 'baby-bday-visible'
          }`}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={`Open ${theme.babyName}'s 1st Birthday Card`}
            onClick={onOpenCard}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenCard();
              }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="position-relative user-select-none baby-bday-outer-perspective"
          >
            {/* Soft Pastel Ground Shadow */}
            <div
              className="position-absolute start-50 translate-middle-x rounded-pill baby-bday-card-shadow"
              style={{ backgroundColor: theme.colors.primary }}
            />

            {/* 3D Storybook Cover Assembly */}
            <div
              className={`position-relative w-100 rounded-5 shadow-lg overflow-hidden baby-bday-outer-card ${
                isOpen ? 'is-opening' : 'baby-bday-card-breathe'
              }`}
              style={{
                backgroundColor: theme.colors.coverBg,
                border: `4px solid ${theme.colors.coverBorder}`,
                transform: isOpen
                  ? 'perspective(1400px) rotateY(-155deg) scale(0.96)'
                  : `perspective(1400px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              }}
            >
              {/* Storybook Spine Binding Accent on Left */}
              <div
                className="position-absolute top-0 bottom-0 start-0 baby-bday-book-spine"
                style={{ backgroundColor: theme.colors.coverBorder }}
              />

              {/* Top Blinking Fairy Lights Garland */}
              <div className="position-relative pt-1 px-2">
                <BlinkingFairyLights bulbColors={theme.colors.bulbs} />
              </div>

              {/* Cover Headline */}
              <div className="text-center px-3 mt-1">
                <span
                  className="badge rounded-pill px-3 py-1 mb-1 baby-bday-age-pill"
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: '#FFFFFF',
                  }}
                >
                  Turning {theme.ageLabel}!
                </span>
                <h1
                  className="baby-bday-font-display fw-bold mb-0 baby-bday-cover-title"
                  style={{ color: theme.colors.pageText }}
                >
                  {theme.babyName}&apos;s
                </h1>
                <p
                  className="baby-bday-font-display fw-semibold mb-1 baby-bday-cover-sub"
                  style={{ color: theme.colors.primary }}
                >
                  1st Birthday Party
                </p>
              </div>

              {/* Living Waving & Blinking Cartoon Baby Character */}
              <div className="d-flex justify-content-center px-3">
                <LivingCartoonBaby theme={theme} />
              </div>

              {/* Interactive Ribbon Clasp Button on Front Cover */}
              <div className="pb-4 pt-1 text-center px-3">
                <span
                  className="btn btn-sm rounded-pill px-4 py-2 fw-bold shadow-sm d-inline-flex align-items-center gap-2 baby-bday-open-clasp"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: '#FFFFFF',
                  }}
                >
                  <Gift size={16} />
                  <span>Tap to Open Invitation!</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            2. OPENED INNER BIRTHDAY INVITATION SPREAD
           ================================================================ */}
        <article
          aria-live="polite"
          className={`w-100 baby-bday-inner-wrap baby-bday-transition ${
            showInside ? 'baby-bday-inner-visible' : 'baby-bday-inner-hidden'
          }`}
        >
          <div
            className="position-relative rounded-5 p-4 p-md-5 shadow-lg overflow-hidden baby-bday-inner-card"
            style={{
              backgroundColor: theme.colors.innerBg,
              border: `4px solid ${theme.colors.coverBorder}`,
            }}
          >
            {/* Top Festive Bunting Flags SVG */}
            <svg
              viewBox="0 0 480 34"
              className="position-absolute top-0 start-0 w-100"
              aria-hidden="true"
            >
              <path
                d="M 0 4 Q 240 22 480 4"
                fill="none"
                stroke={theme.colors.coverBorder}
                strokeWidth="2"
              />
              {[25, 75, 125, 175, 225, 275, 325, 375, 425].map((x, idx) => (
                <polygon
                  key={x}
                  points={`${x},7 ${x + 30},9 ${x + 15},28`}
                  fill={theme.colors.bulbs[idx % theme.colors.bulbs.length]}
                />
              ))}
            </svg>

            {/* Top Row: "Close Card" Replay Button */}
            <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
              <span
                className="badge rounded-pill px-3 py-1 fw-semibold"
                style={{
                  backgroundColor: theme.colors.coverBg,
                  color: theme.colors.pageText,
                }}
              >
                ★ {theme.babyName} Turns 1!
              </span>

              <button
                type="button"
                onClick={onCloseCard}
                className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-1 fw-semibold border baby-bday-close-btn"
                style={{
                  backgroundColor: theme.colors.innerCardTint,
                  borderColor: theme.colors.coverBorder,
                  color: theme.colors.mutedText,
                }}
              >
                <RotateCcw size={13} style={{ color: theme.colors.primary }} />
                <span>Close Cover</span>
              </button>
            </div>

            {/* Inner Card Centerpiece: Cartoon Birthday Cake + Headline */}
            <div className="text-center px-1 px-sm-3">
              <CartoonBirthdayCake colors={theme.colors} />

              <p
                className="text-uppercase fw-bold mb-1 mt-1 baby-bday-inner-kicker"
                style={{ color: theme.colors.secondary }}
              >
                {theme.subtitle}
              </p>

              <h2
                className="baby-bday-font-display fw-bold mb-2 baby-bday-inner-title"
                style={{ color: theme.colors.pageText }}
              >
                {theme.title}
              </h2>

              <p
                className="fw-medium mb-4 mx-auto baby-bday-story-note"
                style={{ color: theme.colors.mutedText }}
              >
                {theme.storyNote}
              </p>

              {/* Bootstrap 5 Grid of Party Details */}
              <div
                className="rounded-4 p-3 p-sm-4 text-start"
                style={{
                  backgroundColor: theme.colors.innerCardTint,
                  border: `2px dashed ${theme.colors.coverBorder}`,
                }}
              >
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <span
                        className="rounded-circle p-2 d-inline-flex flex-shrink-0"
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <Calendar
                          size={16}
                          style={{ color: theme.colors.primary }}
                        />
                      </span>
                      <div>
                        <small
                          className="d-block text-uppercase fw-bold baby-bday-detail-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Party Date
                        </small>
                        <span
                          className="fw-bold baby-bday-detail-val"
                          style={{ color: theme.colors.pageText }}
                        >
                          {theme.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <span
                        className="rounded-circle p-2 d-inline-flex flex-shrink-0"
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <Clock
                          size={16}
                          style={{ color: theme.colors.secondary }}
                        />
                      </span>
                      <div>
                        <small
                          className="d-block text-uppercase fw-bold baby-bday-detail-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Cake &amp; Play Time
                        </small>
                        <span
                          className="fw-bold baby-bday-detail-val"
                          style={{ color: theme.colors.pageText }}
                        >
                          {theme.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <span
                        className="rounded-circle p-2 d-inline-flex flex-shrink-0"
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <MapPin
                          size={16}
                          style={{ color: theme.colors.accent }}
                        />
                      </span>
                      <div>
                        <small
                          className="d-block text-uppercase fw-bold baby-bday-detail-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Party Spot
                        </small>
                        <span
                          className="fw-bold baby-bday-detail-val"
                          style={{ color: theme.colors.pageText }}
                        >
                          {theme.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="d-flex align-items-start gap-2">
                      <span
                        className="rounded-circle p-2 d-inline-flex flex-shrink-0"
                        style={{ backgroundColor: '#FFFFFF' }}
                      >
                        <Gift
                          size={16}
                          style={{ color: theme.colors.mint }}
                        />
                      </span>
                      <div>
                        <small
                          className="d-block text-uppercase fw-bold baby-bday-detail-label"
                          style={{ color: theme.colors.mutedText }}
                        >
                          Fun &amp; Treats
                        </small>
                        <span
                          className="fw-bold baby-bday-detail-val"
                          style={{ color: theme.colors.pageText }}
                        >
                          {theme.treatsNote}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Gentle Scroll Cue */}
      <button
        type="button"
        onClick={onScrollToRsvp}
        className="btn btn-sm d-flex flex-column align-items-center gap-1 border-0 pt-2 pb-1 baby-bday-scroll-cue"
      >
        <span
          className="text-uppercase fw-bold baby-bday-cue-text"
          style={{ color: theme.colors.mutedText }}
        >
          Scroll down to RSVP &darr;
        </span>
        <ChevronDown
          size={18}
          className="baby-bday-bounce"
          style={{ color: theme.colors.primary }}
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
const BabyRsvpStage = ({
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
      aria-label="Birthday Party RSVP"
      className="container d-flex flex-column align-items-center justify-content-center py-5 position-relative baby-bday-rsvp-stage"
    >
      <div
        ref={revealRef}
        className={`w-100 d-flex flex-column align-items-center text-center baby-bday-rsvp-box baby-bday-reveal ${
          isVisible ? 'is-visible' : ''
        }`}
      >
        {/* Playful Star Divider */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <Star
            size={14}
            fill={theme.colors.accent}
            style={{ color: theme.colors.accent }}
          />
          <Heart
            size={16}
            fill={theme.colors.secondary}
            style={{ color: theme.colors.secondary }}
          />
          <Star
            size={14}
            fill={theme.colors.accent}
            style={{ color: theme.colors.accent }}
          />
        </div>

        <span
          className="text-uppercase fw-bold mb-1 baby-bday-rsvp-kicker"
          style={{ color: theme.colors.secondary }}
        >
          Count Us In For Cake!
        </span>

        <h2
          className="baby-bday-font-display fw-bold mb-4 baby-bday-rsvp-title"
          style={{ color: theme.colors.pageText }}
        >
          Will you come celebrate with {theme.babyName}?
        </h2>

        {/* Compact Bootstrap 5 Pill Buttons ("I'll Come" / "I Won't Come") */}
        <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-3">
          <button
            type="button"
            onClick={(e) => onSelectRsvp('yes', e)}
            className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2 fw-bold shadow-sm baby-bday-rsvp-btn"
            style={{
              backgroundColor:
                rsvpStatus === 'yes' ? theme.colors.primary : '#FFFFFF',
              color: rsvpStatus === 'yes' ? '#FFFFFF' : theme.colors.pageText,
              border: `2px solid ${theme.colors.primary}`,
            }}
          >
            <Check
              size={15}
              style={{
                color:
                  rsvpStatus === 'yes' ? '#FFFFFF' : theme.colors.primary,
              }}
            />
            <span>I&apos;ll Come</span>
          </button>

          <button
            type="button"
            onClick={(e) => onSelectRsvp('no', e)}
            className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2 fw-bold shadow-sm baby-bday-rsvp-btn"
            style={{
              backgroundColor:
                rsvpStatus === 'no' ? theme.colors.secondary : '#FFFFFF',
              color:
                rsvpStatus === 'no' ? '#FFFFFF' : theme.colors.mutedText,
              border: `2px solid ${
                rsvpStatus === 'no'
                  ? theme.colors.secondary
                  : theme.colors.coverBorder
              }`,
            }}
          >
            <X size={15} />
            <span>I Won&apos;t Come</span>
          </button>
        </div>

        {/* Dynamic Playful Feedback Card */}
        <div className="w-100 mt-4 d-flex flex-column align-items-center baby-bday-feedback-slot">
          {rsvpStatus === 'yes' && (
            <div
              className="w-100 rounded-4 p-4 shadow-sm baby-bday-pop-in"
              style={{
                backgroundColor: '#FFFFFF',
                border: `2.5px solid ${theme.colors.coverBorder}`,
              }}
            >
              <p
                className="baby-bday-font-display fw-semibold mb-3 baby-bday-feedback-msg"
                style={{ color: theme.colors.pageText }}
              >
                Yay!! Party hats &amp; cupcakes are waiting for you! 🎈
              </p>

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
                  placeholder="Guest / Family name for party badge"
                  aria-label="Guest or family name"
                  className="form-control form-control-sm rounded-pill px-3"
                  style={{
                    borderColor: theme.colors.coverBorder,
                    color: theme.colors.pageText,
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-sm rounded-pill px-3 fw-bold flex-shrink-0"
                  style={{
                    backgroundColor: theme.colors.secondary,
                    color: '#FFFFFF',
                    borderColor: theme.colors.secondary,
                  }}
                >
                  Save
                </button>
              </form>

              {savedName && (
                <div className="mt-3">
                  <span
                    className="badge rounded-pill px-3 py-2 fw-bold"
                    style={{
                      backgroundColor: theme.colors.coverBg,
                      color: theme.colors.pageText,
                      border: `1.5px solid ${theme.colors.coverBorder}`,
                    }}
                  >
                    VIP Party Pass: {savedName} &bull; {theme.dateShort} ★
                  </span>
                </div>
              )}
            </div>
          )}

          {rsvpStatus === 'no' && (
            <div
              className="w-100 rounded-4 p-4 shadow-sm baby-bday-pop-in"
              style={{
                backgroundColor: '#FFFFFF',
                border: `2.5px solid ${theme.colors.coverBorder}`,
              }}
            >
              <p
                className="baby-bday-font-display fw-semibold mb-1 baby-bday-feedback-msg"
                style={{ color: theme.colors.pageText }}
              >
                Sending big baby hugs from {theme.babyName}! 🧸
              </p>
              <p
                className="mb-2 small fw-medium"
                style={{ color: theme.colors.mutedText }}
              >
                We&apos;ll miss you at the cake smash, and we&apos;ll share
                photos soon!
              </p>
              <button
                type="button"
                onClick={(e) => onSelectRsvp('yes', e)}
                className="btn btn-sm p-0 border-0 fw-bold text-decoration-underline"
                style={{ color: theme.colors.primary }}
              >
                Changed your mind? Tap &ldquo;I&apos;ll Come&rdquo;
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
 * SCROLL STAGE 2: WEBSITE BRAND REVEAL ("NOEL & CO.")
 * ============================================================================
 */
const BrandSignatureStage = ({ theme, scrollProgress, onBackToTop }) => {
  const [revealRef, isVisible] = useInView(0.24);

  const bottomFactor = Math.max(0, Math.min(1, (scrollProgress - 0.65) / 0.35));
  const parallaxY = (1 - bottomFactor) * 24;

  return (
    <footer
      ref={revealRef}
      aria-label="Noel and Co. Studio Signature"
      className="container-fluid d-flex flex-column align-items-center justify-content-center py-5 px-3 position-relative overflow-hidden baby-bday-brand-stage"
    >
      {/* Soft Pastel Radial Glow */}
      <div
        className="position-absolute rounded-circle baby-bday-brand-glow"
        style={{
          background: `radial-gradient(circle, ${theme.colors.coverBg} 0%, transparent 70%)`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <div
        className="container d-flex flex-column align-items-center text-center position-relative baby-bday-brand-inner"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? parallaxY : 32}px)`,
        }}
      >
        {/* Cute Pastel Star & Heart Emblem */}
        <div
          className="rounded-pill px-3 py-1 mb-3 d-inline-flex align-items-center gap-2 shadow-sm border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: theme.colors.coverBorder,
            color: theme.colors.primary,
          }}
        >
          <Sparkles size={14} />
          <span className="fw-bold small">LITTLE MOMENTS EDITION</span>
        </div>

        {/* Website Name Reveal: NOEL & CO. */}
        <h2
          className="baby-bday-font-display fw-bold text-uppercase mb-2 baby-bday-brand-name"
          style={{ color: theme.colors.pageText }}
        >
          NOEL &amp; CO.
        </h2>

        <p
          className="fw-semibold mb-4 baby-bday-brand-sub"
          style={{ color: theme.colors.mutedText }}
        >
          CELEBRATING FIRST MILESTONES &amp; JOYFUL GATHERINGS
        </p>

        {/* Return to Top Button */}
        <button
          type="button"
          onClick={onBackToTop}
          className="btn btn-sm rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2 fw-bold shadow-sm border"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: theme.colors.coverBorder,
            color: theme.colors.pageText,
          }}
        >
          <ArrowUp size={15} style={{ color: theme.colors.primary }} />
          <span>Back to {theme.babyName}&apos;s Card</span>
        </button>
      </div>
    </footer>
  );
};

/**
 * ============================================================================
 * MAIN APPLICATION: BABY'S 1ST BIRTHDAY CARTOON INVITATION (BOOTSTRAP 5)
 * ============================================================================
 */
export default function App() {
  const [activeThemeId, setActiveThemeId] = useState('sunnyTeddy');
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [savedName, setSavedName] = useState('');
  const [burstTrigger, setBurstTrigger] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const rsvpSectionRef = useRef(null);
  const theme = BABY_THEMES[activeThemeId] || BABY_THEMES.sunnyTeddy;

  // Ensure Bootstrap 5.3.3 CSS is loaded in document head
  useEffect(() => {
    const existingBootstrap = document.querySelector('link[href*="bootstrap"]');
    if (!existingBootstrap) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
      link.integrity =
        'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  }, []);

  // Track vertical scroll progress (0 -> 1)
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
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

  const handleOpenCard = useCallback(() => {
    setIsCardOpen(true);
    setBurstTrigger({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.42,
      timestamp: Date.now(),
    });
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
    rsvpSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="position-relative w-100 overflow-hidden baby-bday-root"
      style={{
        backgroundColor: theme.colors.pageBg,
        color: theme.colors.pageText,
      }}
    >
      {/* Bootstrap 5.3.3, Rounded Cartoon Fonts ('Fredoka' & 'Quicksand'), & Living Animations */}
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Quicksand:wght@500;600;700&display=swap');

        .baby-bday-root {
          min-height: 245vh;
          font-family: 'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: background-color 0.6s ease, color 0.6s ease;
        }

        .baby-bday-font-display {
          font-family: 'Fredoka', 'Quicksand', sans-serif;
        }

        /* Polka-dot Pastel Storybook Backdrop Pattern */
        .baby-bday-polka-bg {
          pointer-events: none;
          opacity: 0.35;
          z-index: 1;
          background-image: radial-gradient(circle, rgba(251, 191, 36, 0.28) 2px, transparent 2.5px);
          background-size: 34px 34px;
        }

        .baby-bday-progress-bar {
          height: 4px;
          z-index: 50;
          transition: width 0.15s ease-out, background-color 0.5s ease;
        }

        .baby-bday-confetti-canvas {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 10;
        }

        /* Top Theme Switcher Bar */
        .baby-bday-nav-wrap {
          z-index: 40;
          pointer-events: none;
        }

        .baby-bday-nav-pillbox {
          pointer-events: auto;
          backdrop-filter: blur(10px);
          max-width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .baby-bday-nav-pillbox::-webkit-scrollbar {
          display: none;
        }

        .baby-bday-nav-btn {
          font-size: 0.8rem;
          padding: 0.38rem 0.9rem;
          white-space: nowrap;
          transition: all 0.25s ease;
        }

        .baby-bday-theme-dot {
          width: 8px;
          height: 8px;
          display: inline-block;
        }

        /* Hero Section */
        .baby-bday-hero {
          z-index: 20;
        }

        .baby-bday-top-badge {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
        }

        .baby-bday-stage-box {
          max-width: 560px;
          min-height: 430px;
        }

        .baby-bday-transition {
          transition: opacity 0.55s ease, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .baby-bday-visible {
          opacity: 1;
          transform: scale(1);
          position: relative;
        }

        .baby-bday-hidden {
          opacity: 0;
          transform: scale(0.92);
          pointer-events: none;
          position: absolute;
        }

        /* Living Outer Storybook Card */
        .baby-bday-outer-perspective {
          width: 92vw;
          max-width: 410px;
          cursor: pointer;
        }

        .baby-bday-card-shadow {
          bottom: -18px;
          width: 80%;
          height: 24px;
          filter: blur(16px);
          opacity: 0.26;
        }

        .baby-bday-outer-card {
          transform-origin: left center;
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            background-color 0.5s ease,
            border-color 0.5s ease;
        }

        @keyframes babyCardBreathe {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .baby-bday-card-breathe {
          animation: babyCardBreathe 4s ease-in-out infinite;
        }

        .baby-bday-book-spine {
          width: 14px;
          opacity: 0.45;
          z-index: 5;
        }

        /* Blinking Fairy Lights Keyframes */
        @keyframes babyBulbBlink {
          0%, 100% { opacity: 1; filter: brightness(1.15); }
          50% { opacity: 0.35; filter: brightness(0.75); }
        }

        @keyframes babyHaloPulse {
          0%, 100% { opacity: 0.42; transform: scale(1.15); }
          50% { opacity: 0.05; transform: scale(0.7); }
        }

        .baby-bday-bulb-core {
          animation: babyBulbBlink 1.5s ease-in-out infinite;
        }

        .baby-bday-bulb-halo {
          transform-origin: center;
          animation: babyHaloPulse 1.5s ease-in-out infinite;
        }

        /* Living Cartoon Baby Animations: Waving Hands, Blinking Eyes, Floating Balloon */
        @keyframes babyWaveLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-16deg); }
          50% { transform: rotate(6deg); }
          75% { transform: rotate(-14deg); }
        }

        @keyframes babyWaveRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(16deg); }
          50% { transform: rotate(-6deg); }
          75% { transform: rotate(14deg); }
        }

        .baby-bday-hand-left {
          transform-origin: 96px 156px;
          animation: babyWaveLeft 1.75s ease-in-out infinite;
        }

        .baby-bday-hand-right {
          transform-origin: 184px 156px;
          animation: babyWaveRight 1.75s ease-in-out infinite 0.2s;
        }

        @keyframes babyWaveArcFade {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 0.2; }
        }

        .baby-bday-wave-arc {
          animation: babyWaveArcFade 0.85s ease-in-out infinite;
        }

        @keyframes babyEyesBlink {
          0%, 44%, 48%, 92%, 96%, 100% { transform: scaleY(1); }
          46%, 94% { transform: scaleY(0.08); }
        }

        .baby-bday-eyes {
          transform-origin: 140px 99px;
          animation: babyEyesBlink 4.8s ease-in-out infinite;
        }

        @keyframes babyBalloonBob {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-7px) rotate(3deg); }
        }

        .baby-bday-balloon-bob {
          transform-origin: 225px 118px;
          animation: babyBalloonBob 3.2s ease-in-out infinite;
        }

        .baby-bday-cartoon-svg {
          width: 245px;
          max-width: 78%;
          height: auto;
        }

        .baby-bday-age-pill {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
        }

        .baby-bday-cover-title {
          font-size: clamp(1.75rem, 5vw, 2.25rem);
          line-height: 1.1;
        }

        .baby-bday-cover-sub {
          font-size: 1.15rem;
        }

        @keyframes babyClaspBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .baby-bday-open-clasp {
          font-size: 0.86rem;
          animation: babyClaspBounce 2s ease-in-out infinite;
        }

        /* Opened Inner Birthday Invitation */
        .baby-bday-inner-wrap {
          max-width: 530px;
        }

        .baby-bday-inner-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          position: relative;
        }

        .baby-bday-inner-hidden {
          opacity: 0;
          transform: translateY(22px) scale(0.94);
          pointer-events: none;
          position: absolute;
        }

        @keyframes babyFlameFlicker {
          0%, 100% { transform: scale(1) rotate(-2deg); }
          50% { transform: scale(1.12) rotate(3deg); }
        }

        .baby-bday-flame {
          transform-origin: 60px 21px;
          animation: babyFlameFlicker 0.9s ease-in-out infinite;
        }

        .baby-bday-close-btn {
          font-size: 0.75rem;
        }

        .baby-bday-inner-kicker {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
        }

        .baby-bday-inner-title {
          font-size: clamp(1.65rem, 4.5vw, 2.25rem);
          line-height: 1.15;
        }

        .baby-bday-story-note {
          font-size: 0.96rem;
          max-width: 420px;
          line-height: 1.55;
        }

        .baby-bday-detail-label {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
        }

        .baby-bday-detail-val {
          font-size: 0.9rem;
        }

        .baby-bday-cue-text {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
        }

        @keyframes babyBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }

        .baby-bday-bounce {
          animation: babyBounce 1.8s infinite;
        }

        /* Scroll Stage 1: Compact RSVP */
        .baby-bday-rsvp-stage {
          min-height: 70vh;
          z-index: 20;
        }

        .baby-bday-rsvp-box {
          max-width: 460px;
        }

        .baby-bday-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.85s ease-out, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .baby-bday-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .baby-bday-rsvp-kicker {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
        }

        .baby-bday-rsvp-title {
          font-size: clamp(1.45rem, 3.8vw, 1.95rem);
        }

        .baby-bday-rsvp-btn {
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          transition: transform 0.2s ease, background-color 0.25s ease;
        }

        .baby-bday-rsvp-btn:active {
          transform: scale(0.95);
        }

        .baby-bday-feedback-slot {
          min-height: 135px;
        }

        .baby-bday-feedback-msg {
          font-size: 1.05rem;
        }

        @keyframes babyPopIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .baby-bday-pop-in {
          animation: babyPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Scroll Stage 2: Website Brand Reveal */
        .baby-bday-brand-stage {
          min-height: 75vh;
          z-index: 20;
        }

        .baby-bday-brand-glow {
          width: min(85vw, 540px);
          height: min(85vw, 540px);
          filter: blur(45px);
          pointer-events: none;
          transition: opacity 0.9s ease;
        }

        .baby-bday-brand-inner {
          transition: opacity 0.9s ease-out, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .baby-bday-brand-name {
          font-size: clamp(2.5rem, 8.5vw, 5.2rem);
          letter-spacing: 0.12em;
          padding-left: 0.12em;
        }

        .baby-bday-brand-sub {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
        }
      `}</style>

      {/* Subtle Pastel Polka-Dot Storybook Texture */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100 baby-bday-polka-bg"
        aria-hidden="true"
      />

      {/* Top Scroll Progress Line */}
      <div
        className="position-fixed top-0 start-0 baby-bday-progress-bar"
        style={{
          width: `${scrollProgress * 100}%`,
          backgroundColor: theme.colors.primary,
        }}
        aria-hidden="true"
      />

      {/* Floating Pastel Bubbles & Celebratory Confetti Canvas */}
      <PastelConfettiCanvas theme={theme} burstTrigger={burstTrigger} />

      {/* Top Floating Pastel Theme Switcher */}
      <BabyThemeBar
        activeThemeId={activeThemeId}
        onSelectTheme={setActiveThemeId}
        theme={theme}
      />

      {/* Main Content Flow */}
      <main>
        {/* Hero Stage: Living Outer Cartoon Card -> Opens Inner Invitation */}
        <LivingStorybookStage
          theme={theme}
          isOpen={isCardOpen}
          onOpenCard={handleOpenCard}
          onCloseCard={() => setIsCardOpen(false)}
          onScrollToRsvp={scrollToRsvp}
        />

        {/* Scroll Stage 1: Compact Two-Button RSVP ("I'll Come" / "I Won't Come") */}
        <BabyRsvpStage
          sectionRef={rsvpSectionRef}
          theme={theme}
          rsvpStatus={rsvpStatus}
          onSelectRsvp={handleSelectRsvp}
          guestName={guestName}
          setGuestName={setGuestName}
          savedName={savedName}
          onSaveName={handleSaveName}
        />

        {/* Scroll Stage 2: Website Brand Signature Reveal ("NOEL & CO.") */}
        <BrandSignatureStage
          theme={theme}
          scrollProgress={scrollProgress}
          onBackToTop={scrollToTop}
        />
      </main>
    </div>
  );
}