# Startup Landing Page Hero — Reference Template
> Style: Digitwist / Bloom AI / Taskora — Light or Dark, Product Screenshot, Clean CTA
> Target: Lovable / v0 / Bolt.new
> Stack: React + Vite + Tailwind CSS + TypeScript + Framer Motion

---

## FULL PROMPT TEMPLATE

```plaintext
Build a high-converting, modern startup landing page hero section using React, Tailwind CSS, and Framer Motion.
Clean, professional, and optimized for signups. [Light / Dark] theme.

1. Global Styles & Theme:
Background: [#ffffff white / #fafafa off-white / #09090b near-black].
Primary accent: [BRAND_COLOR e.g. #3b82f6 blue / #8b5cf6 violet / #10b981 green / #f97316 orange].
Fonts:
  Headlines: "Cal Sans" / "Geist" / "Plus Jakarta Sans" — font-semibold/bold.
  Body: "Geist Sans" / "Inter" — font-normal.
  Import via Google Fonts or use system fallback.
Color tokens:
  --primary: [BRAND_COLOR];
  --primary-light: [LIGHTER_SHADE]; /* for hover states */
  --text: [#111827 light / #f9fafb dark];
  --text-muted: [#6b7280 light / #9ca3af dark];
  --bg-card: [#ffffff light / #18181b dark];
  --border: [#e5e7eb light / #27272a dark];

2. Announcement Banner (optional, top of page, above navbar):
  Thin strip: bg-[BRAND_COLOR]/10, text-[BRAND_COLOR], text-xs font-medium tracking-wide, py-2.5, text-center.
  Content: "✦ [ANNOUNCEMENT e.g. We just raised $4M 🎉] — [link text] →"
  Close button: X icon, absolute right-4.

3. Navbar (sticky top-0 z-50, w-full, bg-background/90 backdrop-blur-md, border-b border-[--border]):
  max-w-7xl mx-auto, px-4 md:px-8, h-16, flex items-center justify-between.
  Left — Logo: SVG icon + "[BRAND_NAME]" — text-lg font-bold text-[--text].
  Center (hidden md:flex gap-6) — Links: [LINK_1], [LINK_2], [LINK_3], [LINK_4] — text-sm text-[--text-muted] hover:text-[--text].
  Right (flex gap-3):
    Secondary: "Log in" — text-sm text-[--text-muted] hover:text-[--text] px-4 py-2.
    Primary CTA: "[PRIMARY_CTA]" — bg-[BRAND_COLOR] text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-[BRAND_COLOR]/90 shadow-sm.

4. Hero Content (max-w-7xl mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-8 flex flex-col items-center text-center):

  Social Proof pill (mb-6):
    Inline flex, rounded-full, bg-[BRAND_COLOR]/10, border border-[BRAND_COLOR]/20, px-4 py-1.5:
    Avatar stack (3 overlapping circles, -ml-2, w-6 h-6, rounded-full, bg-gradient placeholders) +
    "★ [RATING]/5 from [COUNT]+ [ROLE]" — text-xs text-[--text-muted] ml-3.

  Headline: "[HEADLINE_LINE_1]\n[HEADLINE_LINE_2]."
    text-4xl sm:text-5xl md:text-6xl lg:text-7xl, font-bold, tracking-tight, text-[--text], leading-[1.1].
    Key phrase highlight: wrap in <span className="bg-gradient-to-r from-[BRAND_COLOR] to-[BRAND_COLOR_2] bg-clip-text text-transparent">.
    max-w-4xl.

  Subtext (mt-6 max-w-2xl text-[--text-muted] text-base md:text-xl leading-[1.6]):
    "[PRODUCT_DESCRIPTION — 1-2 sentences max. Lead with the benefit, not the feature.]"

  CTA Group (mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center):
    Primary: "[PRIMARY_CTA]" — bg-[BRAND_COLOR] text-white font-semibold rounded-lg px-8 py-3.5 text-base hover:opacity-90 shadow-lg shadow-[BRAND_COLOR]/25.
    Secondary: "[SECONDARY_CTA]" — border border-[--border] text-[--text] rounded-lg px-8 py-3.5 text-base hover:bg-[--bg-card].
    Fine print: "No credit card required · Free plan available" — text-xs text-[--text-muted] mt-2.

  Trusted by strip (mt-12 flex flex-col items-center):
    "TRUSTED BY TEAMS AT" — text-xs tracking-widest text-[--text-muted] uppercase mb-6.
    Flex row of [5-6] company names/logos: opacity-40, grayscale, hover:opacity-70 transition.

5. Product Screenshot / App Mockup (mt-16 md:mt-20, relative):
  Outer frame: rounded-xl, border border-[--border], shadow-2xl overflow-hidden.
  Optional glow: before: absolute -inset-px, bg-gradient-to-b from-[BRAND_COLOR]/20 to-transparent, rounded-xl.
  
  [OPTION A — Browser mockup frame]:
  Header bar: bg-[--bg-card], h-9, px-3, flex items-center gap-2.
    3 dots: w-3 h-3 rounded-full: #ff5f57, #febc2e, #28c840.
    Address bar: bg-[--border]/50 rounded-md flex-1 mx-4 h-5.
  Content area: bg-[--bg-card], min-h-[280px] md:min-h-[400px], flex items-center justify-center.
    "[APP_UI_PLACEHOLDER text or colored blocks representing app interface]"
  
  [OPTION B — Floating feature cards (no screenshot)]:
  Center area bg gradient, with 3 floating glass cards positioned around:
    Card: rounded-xl, bg-[--bg-card], border border-[--border], shadow-xl, p-4.
    Each card shows an icon + feature name + short description.
    Position: absolute or grid with rotations (rotate-[-6deg], rotate-[4deg]).

6. Animations (Framer Motion):
  Headline: initial {{ opacity:0, y:24 }} animate {{ opacity:1, y:0 }} transition {{ duration:0.6, ease:'easeOut' }}.
  Subtext: same, delay 0.12.
  CTA group: delay 0.22.
  Trusted strip: delay 0.32.
  Screenshot: initial {{ opacity:0, y:48, scale:0.97 }} animate {{ opacity:1, y:0, scale:1 }} transition {{ duration:0.8, delay:0.4, ease:[0.25,0.46,0.45,0.94] }}.
  Floating feature cards: whileHover={{ y: -4, transition: { duration:0.2 } }}.

7. Technical:
  Fully responsive. Mobile: nav links hidden, headline 4xl, screenshot scaled 0.9.
  Lighthouse score target: 90+. No heavy libraries except Framer Motion.
  CTA forms: no actual form submission needed in prototype — onClick logs or shows toast.
  Tailwind arbitrary values fine for precise px values.
```

---

## HEADLINE TEMPLATES BY PRODUCT TYPE

| Product | Headline |
|---|---|
| AI Writing | "Write anything.\n10× faster." |
| Dev Tool | "Ship features,\nnot bugs." |
| Analytics | "See what's working.\nFix what isn't." |
| HR / Recruiting | "Hire better people,\nin less time." |
| Finance | "Your money,\nfully automated." |
| EdTech | "Learn anything.\nRemember everything." |
| Design Tool | "Design without\nlimits." |
| Marketing | "Go viral.\nStay on brand." |

---

## CTA COPY BY STAGE

| Stage | Primary CTA | Secondary CTA |
|---|---|---|
| Pre-launch | "Join the Waitlist" | "Learn More" |
| Beta | "Try for Free" | "View Demo" |
| Launched | "Start Free Trial" | "Watch Demo" |
| Mature | "Get Started" | "Talk to Sales" |
| Enterprise | "Book a Demo" | "View Pricing" |
