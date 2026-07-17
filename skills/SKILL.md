---
name: motionsite-prompt-gen
description: >
  Generate production-ready, MotionSites.ai-style hero section and landing page prompts
  for AI website builders (Lovable, Bolt.new, v0, GPT-Engineer). Encodes the full DNA
  of premium animated website prompts — cinematic typography, glassmorphic navigation,
  video backgrounds, Framer Motion animations, ambient blobs, and responsive layouts.
  USE THIS SKILL whenever the user wants to:
  - Generate a "MotionSites-style" prompt
  - Build an animated hero section or landing page prompt
  - Create a Lovable / Bolt.new / v0 prompt for a premium-looking website
  - Design a SaaS hero, portfolio hero, agency hero, or dark-themed landing page prompt
  - Ask for "a prompt to build a website like MotionSites"
  - Request a visual/cinematic/premium web prompt for any industry
---

# MotionSite Prompt Generator

Generate premium, production-ready animated website prompts in the exact style of MotionSites.ai.
These prompts are designed to be pasted directly into Lovable, Bolt.new, v0, or Claude Artifacts.

---

## CORE CONCEPT

MotionSites prompts are hyper-detailed build instructions for AI coding tools. They are NOT
vague descriptions — they are precise, numbered, section-by-section specifications that describe:

- Every CSS value (colors as hex codes, font sizes in px/vw, blur in px)
- Every layout decision (flexbox vs absolute, z-index layering)
- Every animation (Framer Motion config, CSS keyframes, timing)
- Every interactive state (hover, active, selection)
- Every responsive breakpoint behavior (desktop vs mobile)

The result is a prompt so complete that an AI builder produces a near-finished result on the first
generation with minimal tweaking.

---

## THE PROMPT DNA — 6 MANDATORY SECTIONS

Every MotionSites-style prompt must contain these 6 sections, in this order:

### SECTION 1 — Tech Stack Declaration
Always start by declaring the stack. This sets the AI builder's context.

```
Build a [high-fidelity / high-end / cinematic] [Hero Section / Landing Page / Full Page]
using React + Vite + Tailwind CSS + TypeScript [+ shadcn/ui] [+ Framer Motion].
```

Supported stacks (pick based on complexity):
- Simple hero: `React + Tailwind CSS`
- Animated hero: `React + Tailwind CSS + Framer Motion`
- Full landing: `React + Vite + Tailwind CSS + TypeScript + shadcn/ui + Framer Motion`
- Dark/video: Above stack + `hls.js` for HLS video streams

---

### SECTION 2 — Global Styles & Theme

Always define these explicitly:

**Background:**
- Solid: `#000000` (dark) / `#0a0a0f` (near-black) / `#ffffff` (light)
- Gradient: specify direction + hex stops: `vertical gradient from #fd2601 (top) to #f37e1c (bottom)`
- Custom: `radial-gradient(ellipse at center, #1a0a2e 0%, #0d0d0d 70%)`

**Typography — always name the fonts:**
```
Headlines: "Anton" / "Space Grotesk" / "Instrument Serif" / "Syne" / "Clash Display"
Body/UI: "Inter" / "Manrope" / "DM Sans"
Monospace: "JetBrains Mono" / "Fira Code"
Import from Google Fonts.
```

**Color System — define all roles:**
```
Primary text: White (#ffffff) / near-white (#f0f0f0)
Accent: [hex] — used for glows, borders, highlights
Muted: rgba(255,255,255,0.5) or a gray
Selection state: background [accent], text [contrast]
```

**CSS Variables (required for dark themes):**
```css
--background: [HSL]
--foreground: [HSL]
--primary: [HSL]
--muted-foreground: [HSL]
--border: [HSL]
--accent: [HSL]
```

---

### SECTION 3 — Ambient Background Elements

This is what makes MotionSites premium. Choose 1–3 background layers:

**Option A — Gradient Blobs:**
```
Add ambient glowing blobs:
- Bottom-right: 300×300px, color [hex], blur 80px, opacity 0.5, mix-blend-screen
- Bottom-left: 600×300px, color [hex], blur 80px, opacity 0.4, mix-blend-screen
Use absolute positioning, pointer-events-none, z-0.
```

**Option B — Background Video (HLS Stream):**
```
Background Video (Crucial):
Source: [HLS .m3u8 URL]
Implementation: Create a memoized VideoPlayer component using hls.js.
Load hls.js via CDN. Attach to <video> ref. Proper cleanup on unmount.
Styling: 100% opacity. No dark overlays. autoPlay loop muted playsInline.
Position: absolute inset-0, w-full h-full, object-cover, z-0.
[Optional: height 80vh, absolute bottom-[35vh] for "floating" effect]
```

**Option C — Background Video (Direct MP4):**
```
Fullscreen <video> element: autoPlay loop muted playsInline
Source URL: [MP4 URL]
Positioned: absolute inset-0 w-full h-full object-cover z-0
```

**Option D — Ghost Text / SVG Watermark:**
```
Place a large faint background text "[WORD]" — absolute center, white, opacity 0.06,
blur 4px, font-size 20vw, pointer-events-none, z-0, uppercase tracking-widest.
```

**Option E — Noise / Grid Overlay:**
```
Add a subtle SVG grid or noise texture overlay: absolute inset-0, opacity 0.04,
z-1, pointer-events-none, background-image: repeating-linear-gradient(...).
```

---

### SECTION 4 — Navigation Bar

Always specify these details:

```
Navbar:
- Position: [fixed top-0 / absolute top-0], full width, z-50
- Background: [transparent / glass effect: backdrop-blur-md bg-white/5 border-b border-white/10]
- Left: Logo text "[NAME]" — font [X], tracking-tight/wide, text-[size], [color]
- Center (desktop only, hidden on mobile): Links [...] — text-sm, hover:opacity-80
  [Optional active state: underline / gradient border / color change]
- Right: CTA Button — "[LABEL]" — style: [rounded-full, border-white/30, px-5 py-2,
  text-sm, hover:bg-white hover:text-black transition-all]
```

**Glass Nav CSS (use when background needs to show through):**
```css
.glass-nav {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
```

---

### SECTION 5 — Hero Content

The main content area. Must specify all of these:

**Headline:**
```
Headline: "[YOUR HEADLINE TEXT]"
Font size: ~[8–14]vw desktop, max-[120–200]px, [weight]
Desktop: single line / "NEW" / "DESIGN" / "ERA" stacked
Mobile: stacked vertically, font-size scales to 12vw min
Letter-spacing: tracking-tight (-0.02em) / tracking-wide
Color: white / gradient via bg-clip-text text-transparent bg-gradient-to-r
```

**Subtext:**
```
Subtext: "[2-3 lines of description]"
Font: text-base / text-lg, text-muted-foreground, max-w-2xl, leading-relaxed, mt-6/8
```

**CTA Buttons (always 2, with contrast):**
```
Primary CTA: "[LABEL]" — [solid accent bg + white text / solid black + white border]
Secondary CTA: "[LABEL]" — [transparent glass style / outline]
Gap: gap-4, flex row on desktop, stack on mobile
```

**Z-Index Layering (for depth effects):**
```
z-0: background blobs / video
z-10: main headline text
z-20: portrait image / hero visual (positioned absolute center, overlapping text)
z-30: UI elements / CTAs
```

**Image Masking (for portrait cutouts):**
```
Central image: absolute centered, z-20
Apply CSS mask (paint-brush-stroke SVG shape) so image appears as rough cutout:
mask-image: url("data:image/svg+xml,...") or clip-path: polygon(...)
pointer-events-none
```

**Floating Elements (desktop only):**
```
Bottom-left floating text block: absolute bottom-[8%] left-[4%], text-sm, opacity-80
Right floating tagline: absolute right-[4%] middle, text-right, text-sm
Mobile: collapse these into a stacked layout below the main content
```

---

### SECTION 6 — Secondary Elements & Animations

**Logo/Brand Strip:**
```
Bottom brand strip: flex row of [5-7] logos / brand names
Desktop: justify-between, full width
Mobile: flex-wrap, justify-center
Style: opacity-40 to 0.6, grayscale, pointer-events-none
Use placeholder SVG icons if no real logos are available.
```

**Integration Badges:**
```
Row of [3-4] pill badges above headline:
Each badge: glass style, rounded-full, px-4 py-1.5, text-xs, flex items-center gap-2
Include [icon placeholder] + label text
Example: "Integrated with OpenAI" / "Powered by AWS"
```

**Framer Motion Animations:**
```
Use motion/react for staggered fade-in-up on mount:

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

Apply to: badges (custom=0), headline (custom=1), subtext (custom=2), buttons (custom=3)
```

**CSS Keyframe Animations (lightweight alternative):**
```css
@keyframes fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-rise   { animation: fade-rise 0.8s ease-out both; }
.animate-fade-rise-1 { animation: fade-rise 0.8s ease-out 0.15s both; }
.animate-fade-rise-2 { animation: fade-rise 0.8s ease-out 0.30s both; }
.animate-fade-rise-3 { animation: fade-rise 0.8s ease-out 0.45s both; }
```

**Liquid Glass Effect:**
```css
.liquid-glass {
  background: rgba(255,255,255,0.01);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%,  rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

**Logo Marquee (horizontal scroll strip):**
```
Logo marquee: overflow-hidden, flex, no-wrap
Inner: animate-[marquee_20s_linear_infinite], flex gap-12, w-max
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
Duplicate the logo list once for seamless loop.
```

---

## VISUAL CATEGORIES & THEIR DESIGN SIGNATURES

### 🌑 Dark / SaaS / AI
- Background: `#000000` or `#050508`
- Blobs: subtle purple/blue glow (opacity 0.3–0.5, mix-blend-screen)
- Fonts: Space Grotesk (headline), Inter (body)
- Nav: glass effect, backdrop-blur
- Headline size: 72–96px
- Animations: Framer Motion stagger, smooth ease curves
- Extras: dashboard UI mockup floating card, integration badges

### 🔥 Bold / Portfolio / Vibrant
- Background: gradient (orange, purple, red)
- Ambient: ghost text watermark + gradient blobs
- Fonts: Anton / Syne (headline), Inter (body)
- Typography: UPPERCASE, 10–14vw, tracking-[0.05em]
- Image: portrait with CSS mask/clip-path cutout, z-layered over text
- Floating elements: bio text bottom-left, tagline right-center

### 🎬 Cinematic / Agency / Video
- Background: fullscreen video (MP4 direct or HLS via hls.js)
- No overlays or blobs — video provides all depth
- Fonts: Instrument Serif / Cormorant Garamond (display), Inter (body)
- Headline style: poetic, mixed color (`<em className="not-italic text-muted-foreground">`)
- Effect: liquid-glass nav and CTA buttons
- CTA copy: evocative ("Begin Journey", "Enter the Studio")

### 💎 Luxury / Fintech / Web3
- Background: deep navy `#0a0f1e` or dark teal `#041a1f`
- Accents: gold `#c9a84c`, cyan `#00d4ff`, or emerald `#00ff87`
- Fonts: Cormorant Garamond / Playfair Display (headline), DM Sans (body)
- Text effects: gradient text (bg-clip-text, transparent)
- Extras: animated counter stats, floating glass cards with numbers

### 🚀 Startup / Landing Page
- Background: white or off-white with a colored gradient blob
- Accent: brand color (electric blue, lime, coral)
- Fonts: Cal Sans / Geist (headline), Geist Sans (body)
- Hero visual: product screenshot in browser frame or device mockup
- Extras: social proof bar ("Trusted by 10,000+ teams"), star ratings

---

## RESPONSIVE REQUIREMENTS (always include)

```
Responsive Rules:
- Headline font: clamp([mobile_min], [vw], [desktop_max]) or explicit
  Mobile: text-5xl, Desktop: text-8xl / 10vw
- Floating absolute elements: hidden on mobile (md:block), replaced by inline-block stacked layout
- Navbar links: hidden on mobile (hidden md:flex), add hamburger menu placeholder
- Grid/flex direction: flex-col on mobile, flex-row on desktop (md:flex-row)
- Background video: ensure it fills container on all screen sizes (object-cover)
- Padding: px-4 mobile, px-8 md, px-16 lg
- pointer-events-none on all decorative elements (blobs, ghost text, video)
```

---

## WORKFLOW: HOW TO GENERATE A PROMPT

When a user asks for a MotionSites-style prompt, follow these steps:

### Step 1 — Identify Context
Ask (or infer from context) these 4 things:
1. **Industry/Type**: Portfolio, SaaS, Agency, E-commerce, Fintech, EdTech, Web3, etc.
2. **Vibe/Aesthetic**: Dark & minimal, Bold & vibrant, Cinematic & poetic, Luxury, Brutalist, etc.
3. **Brand Name**: To use in logo, copy, and ghost text watermark
4. **Key message/headline**: What is the hero saying?

### Step 2 — Select Visual Category
Match to one of: Dark SaaS / Bold Portfolio / Cinematic Agency / Luxury / Startup

### Step 3 — Choose Background Type
- No brand video → use Gradient Blobs (Option A)
- Dark cinematic feel → use HLS Video (Option B) or MP4 Video (Option C)
- Typography-first → use Ghost Text Watermark (Option D)
- Minimal → use Noise/Grid Overlay (Option E) or no background layer

### Step 4 — Fill All 6 Sections
Write the prompt using the exact section format above. Be specific:
- Always include exact hex codes
- Always name the fonts explicitly
- Always specify animation timing values
- Always specify z-index layers when using image overlays
- Always include mobile behavior

### Step 5 — Output Format
Output the prompt as a single fenced code block (```plaintext) that the user can directly
copy-paste into Lovable / Bolt.new / v0 / Claude Artifacts.

---

## EXAMPLES OF GENERATED PROMPTS

### Example A — Dark SaaS Hero (minimal input: "dark AI SaaS hero")

```
Build a high-fidelity dark-themed Hero Section using React, Tailwind CSS, and Framer Motion.

1. Global Styles & Theme:
Background: solid black (#000000).
Fonts: "Space Grotesk" (headlines, font-bold), "Inter" (body, font-normal). Import from Google Fonts.
Colors: white text (#ffffff), accent indigo (#6366f1), muted gray (#94a3b8).
CSS variables: --bg: #000000; --fg: #ffffff; --accent: #6366f1; --muted: #94a3b8.

2. Ambient Background:
Add two glowing blobs (absolute, pointer-events-none, z-0):
- Top-center: 500×500px, #6366f1, blur 120px, opacity-30, mix-blend-screen.
- Bottom-right: 400×400px, #818cf8, blur 100px, opacity-20, mix-blend-screen.

3. Navbar (fixed top, z-50):
Glass effect: backdrop-blur-md, bg-white/5, border-b border-white/10.
Left: logo "Nexus" — text-xl, font-semibold, text-white, tracking-tight.
Center (hidden on mobile, md:flex gap-8): Links: Features, Pricing, About, Docs — text-sm text-muted-foreground hover:text-white.
Right: CTA "Get Early Access" — rounded-full, bg-indigo-600, px-5 py-2, text-sm text-white, hover:bg-indigo-500.

4. Hero Content (centered, z-10, pt-40 pb-24):
Badges row (flex gap-3, justify-center, mb-8):
3 glass badges (rounded-full, border border-white/15, px-4 py-1.5, text-xs text-white/70):
  "✦ YC-Backed", "✦ SOC2 Certified", "✦ 10k+ Teams".

Headline: "Ship AI Products\nThat Actually Scale."
Font: Space Grotesk, text-6xl md:text-8xl, font-bold, tracking-tight, text-white.
"That Actually Scale." wrapped in span with gradient: bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent.

Subtext (mt-6 max-w-2xl mx-auto text-center):
"Stop wrestling with infrastructure. Nexus gives your team a reliable, observable, and scalable AI pipeline — from prototype to production in hours."
text-muted-foreground, text-base md:text-lg, leading-relaxed.

Buttons (flex gap-4 mt-10 justify-center flex-wrap):
Primary: "Start Building Free" — bg-white, text-black, font-semibold, rounded-full, px-8 py-3, hover:opacity-90.
Secondary: "View Demo" — rounded-full, border border-white/25, text-white, px-8 py-3, glass effect, hover:bg-white/10.

5. Logo Marquee (mt-20, opacity-40):
Overflow-hidden strip. Marquee animation at 25s linear infinite.
8 company name text items: Vercel, Stripe, Linear, Notion, Figma, Supabase, GitHub, Resend.
Text: text-sm text-white/60, font-medium, tracking-wide.

6. Animations:
Use motion/react for stagger:
const spring = { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
Badges: initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ ...spring, delay:0 }}
Headline: delay: 0.12
Subtext: delay: 0.24
Buttons: delay: 0.36

Technical:
Fully responsive. Decorative blobs: pointer-events-none.
Fonts loaded via <link> in index.html.
Use Tailwind classes, no inline styles except for gradient blob widths/heights.
```

---

### Example B — Bold Portfolio Hero (input: "bold portfolio, name: Aryan")

```
Build a high-end, responsive Hero Section for a personal portfolio using React and Tailwind CSS.
Design should feel bold, modern, and energetic.

1. Global Styles & Theme:
Background: vertical gradient, #7c3aed (top) → #2563eb (bottom).
Fonts: "Syne" (headlines, weight 800), "Inter" (UI, weight 400). Import from Google Fonts.
Colors: all text white. Accent: #a78bfa.
Selection state: background #a78bfa, text #1e1b4b.

2. Ambient Background:
Ghost text watermark: "ARYAN" centered, absolute, white, opacity-[0.05], blur-[6px], font-size 18vw, font-bold, uppercase, tracking-[0.15em], pointer-events-none, z-0.
Blob bottom-right: 350×350px, #7c3aed, blur-[100px], opacity-40, mix-blend-screen.

3. Navbar (absolute top, z-20, w-full, px-8 py-6):
Left: "✱ ARYAN.DEV" — font-medium, tracking-[0.12em], text-sm.
Center (hidden on mobile): Links: WORK, BLOG, ABOUT, CONTACT — text-xs tracking-widest opacity-70 hover:opacity-100.
Right: "HIRE ME" text // followed by circular button (28px, border border-white/50, diagonal arrow icon ↗).
Hover: circle fills white, arrow turns purple.

4. Hero Content (min-h-screen relative overflow-hidden):
Headline: "BEYOND\nORDINARY\nDESIGN."
Desktop: ~11vw, max-280px, font-extrabold, uppercase, tracking-[-0.01em], leading-[0.88], z-10.
Mobile: text-[18vw], stacked.

Central image (absolute centered, z-20):
<img> of placeholder person. Apply clip-path: polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%) or
CSS mask with a brushstroke SVG for organic cutout. pointer-events-none.

Floating block (desktop only, absolute bottom-[10%] left-[5%], z-30):
"// I'm Aryan — a freelance product designer\nturning complex problems into clean interfaces."
text-xs leading-loose opacity-90, max-w-[200px].

Floating tagline (desktop only, absolute right-[5%] top-[50%], z-30, text-right):
"// DESIGN THAT\nSPEAKS YOUR BRAND"
text-xs tracking-widest opacity-80.

Mobile: above floating elements become display:block, margin-top: 2rem below main stack.

5. Brand Strip (bottom, py-6):
Flex row of 6 brand names: Behance, Dribbble, Awwwards, Lottie, Figma, Adobe.
opacity-60, text-xs tracking-widest. Desktop: justify-between. Mobile: flex-wrap, justify-center, gap-4.

6. Technical:
Fully responsive. Image pointer-events-none. Massive headline scales with clamp or vw units.
```

---

## QUALITY CHECKLIST

Before outputting a prompt, verify it includes:

- [ ] Tech stack declared in opening line
- [ ] All hex color codes included (no "use a nice blue")
- [ ] All font names specified (with import instructions)
- [ ] Background layer chosen and specified
- [ ] Navbar fully specified (position, left/center/right, hover states)
- [ ] Headline size in vw/px and responsive behavior described
- [ ] At least 2 CTA buttons with distinct styles
- [ ] Animation strategy (Framer Motion OR CSS keyframes, with timing values)
- [ ] Mobile layout behavior explicitly stated
- [ ] Z-index layers defined when using image overlays
- [ ] No vague instructions like "make it look nice" or "add some animations"
- [ ] Prompt fits in a single copy-paste block

---

## REFERENCE PROMPT TEMPLATES

Full prompt templates by category are in `references/` folder:
- `references/dark-saas.md` — Full dark SaaS hero (Synapse-style)
- `references/bold-portfolio.md` — Full bold portfolio hero (Viktor-style)  
- `references/cinematic-agency.md` — Full cinematic video agency (Velorah-style)
- `references/luxury-fintech.md` — Full luxury fintech / Web3 hero
- `references/startup-landing.md` — Full startup landing page with product screenshot

---

## NOTES FOR GRAVIT AGENCY USE

- For GRAVIT client projects: default to Dark SaaS or Cinematic Agency aesthetic
- GRAVIT brand colors: Ember #ff6a39, Field #6e7bff — use these as accents in GRAVIT-branded prompts
- Preferred fonts: Space Grotesk (headlines), Manrope (body), JetBrains Mono (code/labels)
- Default target builder: Lovable (for full-app generation) or Claude Artifacts (for hero demos)
- Always add "deployed as Next.js, optimized for Vercel" in tech requirements for client sites
