# Dark SaaS Hero — Reference Template
> Style: Synapse / Nexora / Apex — Dark, Minimal, AI/SaaS
> Target: Lovable / Bolt.new / Claude Artifacts
> Stack: React + Vite + Tailwind + TypeScript + Framer Motion

---

## FULL PROMPT TEMPLATE

```plaintext
Build a high-fidelity, dark-themed Hero Section using React, Tailwind CSS, and Framer Motion.

1. Global Styles & Theme:
Background: solid #000000.
Fonts: "Space Grotesk" (weight 700, headlines), "Inter" (weight 400, body). Import from Google Fonts via <link> in index.html.
Colors: primary white (#ffffff), accent [ACCENT_HEX e.g. #6366f1], muted (#94a3b8).
CSS variables in :root:
  --bg: #000000; --fg: #ffffff; --accent: [ACCENT_HEX]; --muted: #94a3b8; --glass: rgba(255,255,255,0.04);

2. Ambient Background (absolute inset-0, overflow-hidden, z-0, pointer-events-none):
Blob 1: width 500px, height 500px, background [ACCENT_HEX], border-radius 50%, filter blur(140px), opacity 0.25, top -100px, left 50%, translateX(-50%), mix-blend-mode screen.
Blob 2: width 400px, height 300px, background [ACCENT_SECONDARY e.g. #818cf8], filter blur(100px), opacity 0.18, bottom 0, right -50px, mix-blend-mode screen.

3. Navbar (fixed, top-0, left-0, right-0, z-50):
Style: backdrop-blur-md, background rgba(0,0,0,0.6), border-bottom 1px solid rgba(255,255,255,0.08).
Padding: px-6 md:px-12, h-16, flex items-center justify-between.
Left — Logo: "[BRAND_NAME]" — font Space Grotesk, font-semibold, text-lg, tracking-tight, text-white.
Center (hidden md:flex, gap-8) — Links: [LINK_1], [LINK_2], [LINK_3], [LINK_4] — text-sm text-[--muted] hover:text-white transition-colors duration-200.
Right — CTA: "[CTA_TEXT]" — rounded-full, bg-[ACCENT_HEX], px-5 py-2, text-sm font-medium text-white, hover:opacity-90 transition-opacity.

4. Hero Content (relative, z-10, min-h-screen, flex flex-col items-center justify-center, text-center, px-4 pt-20 pb-16):

Badges row (flex flex-wrap gap-3 justify-center mb-8):
  [3 badges] each: glass effect (bg-white/5 border border-white/15 rounded-full px-4 py-1.5 text-xs text-white/70 flex items-center gap-1.5)
  Badge text: "✦ [BADGE_1]", "✦ [BADGE_2]", "✦ [BADGE_3]"

Headline "[HEADLINE_LINE_1]\n[HEADLINE_LINE_2]":
  text-5xl sm:text-6xl md:text-8xl, font-bold, tracking-tight, leading-[1.0], text-white.
  Last word or phrase: wrap in <span> with bg-gradient-to-r from-[ACCENT_HEX] to-[ACCENT_SECONDARY] bg-clip-text text-transparent.

Subtext (mt-6 max-w-2xl mx-auto text-muted text-base md:text-lg leading-relaxed):
  "[DESCRIPTION — 2-3 sentences explaining the product's core value]"

Buttons row (mt-10 flex flex-wrap gap-4 justify-center):
  Primary: "[PRIMARY_CTA]" — bg-white text-black font-semibold rounded-full px-8 py-3 text-sm hover:opacity-90 transition.
  Secondary: "[SECONDARY_CTA]" — rounded-full border border-white/25 text-white px-8 py-3 text-sm backdrop-blur-sm hover:bg-white/10 transition.

Social proof (mt-8 text-xs text-muted):
  "★★★★★  Trusted by [NUMBER]+ [ROLE] worldwide"

5. Bottom Logo Marquee (mt-24, overflow-hidden):
  Flex row (flex gap-16 w-max animate-[marquee_28s_linear_infinite] items-center).
  @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
  8 brand names (text-sm text-white/40 font-medium tracking-wide) — duplicate list for seamless loop.
  Wrap with: "TRUSTED BY TEAMS AT" label above (text-xs text-muted/50 tracking-widest uppercase mb-4).

6. Animations (use motion/react, import { motion } from "motion/react"):
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }
})
Apply:
  Badges row: delay 0
  Headline: delay 0.15
  Subtext: delay 0.28
  Buttons: delay 0.40
  Social proof: delay 0.50

Technical Requirements:
  All decorative elements: pointer-events-none.
  Fonts loaded via index.html <link> (preconnect + stylesheet).
  Mobile: navbar links hidden, CTA visible, headline scales down, blobs half-opacity on mobile.
  No horizontal scroll. overflow-x-hidden on body.
  Fully accessible: proper heading hierarchy (h1 for headline), aria-labels on icon buttons.
```

---

## CUSTOMIZATION SLOTS

| Slot | Description | Examples |
|---|---|---|
| `[BRAND_NAME]` | Company logo text | Nexus, Synapse, Orbis |
| `[ACCENT_HEX]` | Primary accent color | #6366f1, #10b981, #f59e0b |
| `[ACCENT_SECONDARY]` | Gradient end color | #818cf8, #34d399, #fbbf24 |
| `[HEADLINE_LINE_1]` | First headline line | "Where Innovation", "Build Faster" |
| `[HEADLINE_LINE_2]` | Second headline line | "Meets Execution.", "Ship Smarter." |
| `[DESCRIPTION]` | Product description | 2-3 sentences max |
| `[PRIMARY_CTA]` | Main button text | "Get Started Free", "Start Building" |
| `[SECONDARY_CTA]` | Secondary button | "Watch Demo", "View Docs" |
| `[BADGE_1/2/3]` | Feature badges | "YC Backed", "SOC2", "10k+ Teams" |
| `[LINK_1/2/3/4]` | Nav links | Features, Pricing, About, Blog |
| `[NUMBER]` | Social proof count | 5,000, 12k, 50,000 |
| `[ROLE]` | Social proof role | developers, teams, startups |

---

## VISUAL VARIANTS

**Variant A — Purple/Indigo** (AI, SaaS): accent #6366f1 → #818cf8
**Variant B — Cyan/Teal** (Data, Analytics): accent #06b6d4 → #0891b2
**Variant C — Green/Emerald** (Growth, Finance): accent #10b981 → #059669
**Variant D — Orange/Amber** (Energy, Creator): accent #f59e0b → #d97706
**Variant E — Pure Mono** (Developer tools): all white accents, #ffffff border
