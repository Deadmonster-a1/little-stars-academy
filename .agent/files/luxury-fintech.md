# Luxury Fintech / Web3 Hero — Reference Template
> Style: Wealth / DeFi / ClubX — Dark Premium, Gold Accents, Stats & Numbers
> Target: Lovable / Bolt.new
> Stack: React + Vite + Tailwind + TypeScript + Framer Motion

---

## FULL PROMPT TEMPLATE

```plaintext
Build a high-fidelity luxury fintech hero section using React, Tailwind CSS, and Framer Motion.
Dark, premium, and data-driven. Inspired by elite wealth management and DeFi platforms.

1. Global Styles & Theme:
Background: #08090d (near-black with a hint of blue-gray).
Accent: [ACCENT — e.g. #c9a84c gold / #00ff87 neon-green / #00d4ff cyan].
Fonts:
  "Cormorant Garamond" weight 300/600 (headlines) — italic optional for key words.
  "DM Sans" weight 400/500 (body, labels, numbers).
  Import from Google Fonts.
Colors:
  text-primary: #f5f5f0 (warm white)
  text-muted: rgba(245,245,240,0.5)
  accent: [ACCENT_HEX]
  border: rgba(255,255,255,0.08)
CSS selection: background [ACCENT], text #08090d.

2. Ambient Background (absolute, inset-0, z-0, pointer-events-none, overflow-hidden):
Radial gradient: background radial-gradient(ellipse 600px 400px at 70% 50%, rgba([ACCENT_RGB],0.12) 0%, transparent 70%).
Noise texture overlay: pseudo-element or SVG filter for grain — opacity 0.04.
Top line: 1px solid rgba(255,255,255,0.06) at y=0 — acts as a "stage edge".

3. Navbar (fixed, z-50, top-0, w-full, px-8 md:px-16 py-5):
Style: bg-[#08090d]/80, backdrop-blur-xl, border-b border-[rgba(255,255,255,0.05)].
Left — Logo: "[BRAND_NAME]" — Cormorant Garamond, font-light, text-2xl, tracking-widest, text-[#f5f5f0], uppercase + letter-spacing 0.2em.
Center (md:flex gap-10, text-xs tracking-[0.18em] uppercase):
  [LINK_1], [LINK_2], [LINK_3], [LINK_4] — text-muted, hover:text-primary, transition.
Right: [ACCENT]-bordered rounded-full button "[CTA]" — px-6 py-2, text-xs tracking-widest, border border-[ACCENT]/60, text-[ACCENT], hover:bg-[ACCENT] hover:text-[#08090d] transition.

4. Hero Content (min-h-screen, flex flex-col, justify-center, px-8 md:px-16, pt-32 pb-16, max-w-[1400px] mx-auto):

Left column (max-w-2xl):
  Eyebrow label (mb-8): small horizontal rule (w-8 h-px bg-[ACCENT] inline-block mr-3) + "[CATEGORY LABEL e.g. WEALTH INTELLIGENCE]" in text-xs tracking-[0.25em] text-[ACCENT].

  Headline: "[PART_1]\n[PART_2]."
    Cormorant Garamond, font-light, text-5xl md:text-[80px] leading-[1.05], tracking-[-0.01em], text-primary.
    [KEY_WORD] in italic font-normal for emphasis.

  Subtext (mt-6 max-w-md):
    "[DESCRIPTION]" — DM Sans, text-sm md:text-base, line-height 1.7, text-muted.

  Buttons (mt-10 flex gap-4):
    Primary: "[CTA_PRIMARY]" — bg-[ACCENT] text-[#08090d] font-medium px-8 py-3 text-sm tracking-wide hover:opacity-90.
    Secondary: "[CTA_SECONDARY]" — border border-[rgba(255,255,255,0.18)] text-primary px-8 py-3 text-sm tracking-wide hover:border-white/40 transition.

  Stats row (mt-16 flex gap-10 border-t border-[rgba(255,255,255,0.08)] pt-8):
    [3 stats]:
      Number: "[$VALUE e.g. $2.4B / 94% / 12k+]" — Cormorant Garamond, font-light, text-3xl, text-primary.
      Label: "[STAT_LABEL]" — text-xs tracking-[0.15em] text-muted uppercase, mt-1.

Right column (hidden md:flex, absolute right-8 top-32, or grid col):
  Floating glass card (blur card):
    bg-white/4, backdrop-blur-2xl, border border-white/10, rounded-2xl, p-6, w-80.
    Show a live-looking metric UI:
      Line item: label + value + change indicator.
      "[METRIC_1]" — value "[NUM_1]" — badge "+[CHANGE_1]%" (green/red).
      "[METRIC_2]" — value "[NUM_2]" — badge "+[CHANGE_2]%".
    Animated pulsing dot (relative, w-2 h-2, bg-[ACCENT], rounded-full):
      @keyframes pulse { 0%,100%{ opacity:1 } 50%{ opacity:0.4 } }
      "LIVE" label text-xs text-[ACCENT] next to dot.

5. Animations (Framer Motion):
Left column items: stagger fade-in-up (delay 0, 0.15, 0.30, 0.45s), ease: [0.25,0.46,0.45,0.94], duration: 0.7.
Glass card: fade-in from right (x: 30, opacity: 0) → (x: 0, opacity: 1), delay: 0.5.
Stats: count-up animation: use useEffect with requestAnimationFrame to animate numbers from 0 to target over 1500ms, starting when in view (use IntersectionObserver or motion's whileInView).

6. Technical:
pointer-events-none on all decorative elements.
Mobile: hide right glass card, stats row wraps to 2-col, headline scales to text-4xl.
Import Cormorant Garamond via @import in global CSS, DM Sans same.
Ensure all hover transitions use transition-all duration-200.
```

---

## STAT PRESETS BY INDUSTRY

| Industry | Stat 1 | Stat 2 | Stat 3 |
|---|---|---|---|
| Wealth Management | $2.4B AUM | 94% Retention | 12k+ Clients |
| DeFi / Crypto | $890M TVL | 340% APY | 48k Wallets |
| Real Estate | ₹4,200Cr Volume | 96% Occupancy | 280 Properties |
| Fintech SaaS | $1.2B Processed | 99.98% Uptime | 230k Users |
| Investment Club | 38% IRR | $500M Deployed | 120 Deals |

---

## ACCENT COLOR PRESETS

| Theme | Accent Hex | Mood |
|---|---|---|
| Old Gold | #c9a84c | Classic luxury, wealth |
| Neon Green | #00ff87 | DeFi, crypto, growth |
| Ice Blue | #7dd3fc | Clean fintech, VC |
| Warm Amber | #fbbf24 | Premium, editorial |
| Signal Red | #ef4444 | Bold, aggressive growth |
| Pure White | #ffffff | Ultra-minimal luxury |
