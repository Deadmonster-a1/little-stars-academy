# Bold Portfolio Hero — Reference Template
> Style: Viktor / Olivia / Aethera — Vibrant Gradient, Heavy Type, Layered Depth
> Target: Lovable / Bolt.new / Claude Artifacts
> Stack: React + Tailwind CSS

---

## FULL PROMPT TEMPLATE

```plaintext
Build a high-end, responsive Hero Section for a personal portfolio website using React and Tailwind CSS.
The design should feel bold, modern, and energetic.

1. Global Styles & Theme:
Background: vertical gradient — [TOP_COLOR] at top → [BOTTOM_COLOR] at bottom.
  (Examples: #7c3aed → #2563eb / #fd2601 → #f37e1c / #0ea5e9 → #1d4ed8)
Typography:
  Headlines: "[HEADLINE_FONT e.g. Anton / Syne / Bebas Neue]" — massive, uppercase, tracking-wide.
    Import from Google Fonts.
  UI/Body: "Inter" — minimalist, clean, uppercase labels.
Colors: all text white. Icons white.
Selection state: background [ACCENT_COLOR], text [CONTRAST_COLOR].
Import Google Font in <style> or index.html:
  @import url('https://fonts.googleapis.com/css2?family=[FONT_IMPORT_STRING]&display=swap');

2. Ambient Background (absolute inset-0, overflow-hidden, z-0, pointer-events-none):
Ghost text watermark: "[DESIGNER_NAME or WORD]" — centered absolutely, white, opacity-[0.05], blur-[5px],
  font-size 16vw md:18vw, font-bold md:font-black, uppercase, tracking-[0.12em], z-0.
Blob bottom-right: 300×300px, [TOP_COLOR], blur 80px, opacity-50, mix-blend-mode screen.
Blob bottom-left: 600×300px, [BOTTOM_COLOR], blur 80px, opacity-50, mix-blend-mode screen.

3. Navbar (absolute top-0, w-full, z-30, px-6 md:px-10 py-5, flex items-center justify-between):
Background: transparent.
Left — Logo: "✱ [DESIGNER_HANDLE]" — font Inter, font-medium, tracking-[0.1em], text-sm uppercase, text-white.
Center (hidden md:flex gap-8) — Links: [NAV_1], [NAV_2], [NAV_3], [NAV_4] — text-xs tracking-widest uppercase opacity-70 hover:opacity-100 transition.
Right — CTA:
  "HIRE ME" text span (text-xs tracking-widest) + gap-2 + circular button:
  Circle: w-9 h-9, border border-white/50, rounded-full, flex items-center justify-center, text-white.
  Inside: diagonal arrow icon "↗" or SVG ArrowUpRight.
  Hover: circle bg-white, arrow color [ACCENT].

4. Hero Content (relative, min-h-screen, overflow-hidden):
Headline: "[IMPACT_WORD_1]\n[IMPACT_WORD_2]\n[IMPACT_WORD_3]."
  Font: [HEADLINE_FONT], font-weight 900, uppercase.
  Desktop: font-size clamp(80px, 11vw, 200px), z-10, relative.
  Mobile: font-size clamp(60px, 18vw, 120px), stacked.
  Line-height: 0.88–0.92. Letter-spacing: -0.01em.
  Color: white. Position: pt-[20vh] pl-4 md:pl-8.

Central Image (absolute, centered horizontally, top 10%, z-20):
  <img src="[PORTRAIT_URL or placeholder]" alt="[DESIGNER_NAME]"
    style={{ clipPath: "polygon(20% 0%, 80% 0%, 95% 100%, 5% 100%)" }}
    or use:
    maskImage: "url(\"data:image/svg+xml,...\")" for brushstroke effect.
  Width: 280px md:380px. pointer-events-none.

Floating block — Bottom Left (desktop only: absolute, bottom-[8%], left-[4%], z-30, max-w-[200px]):
  "// I'm [NAME] — a freelance [ROLE]\n[short tagline]"
  text-xs md:text-sm, leading-relaxed, opacity-90, text-white.
  Mobile: display:none — content shown inline below main content instead.

Floating block — Right (desktop only: absolute, right-[4%], top-[48%], z-30, text-right):
  "// [LINE_1]\n[LINE_2]"
  text-xs tracking-widest, leading-relaxed, opacity-80, text-white.
  Mobile: display:none.

Mobile stacked layout: below main headline, show a single block with bio + tagline inline.

5. Brand Strip (absolute bottom-0 / mt-auto, w-full, py-4 px-6):
Flex row of [5-7] items: text labels or placeholder SVG icons for brand names.
  "[BRAND_1]", "[BRAND_2]", "[BRAND_3]", "[BRAND_4]", "[BRAND_5]"
  text-xs, tracking-widest, opacity-60, text-white.
Desktop: justify-between, gap-4.
Mobile: flex-wrap, justify-center, gap-4.

6. Technical Requirements:
Use flexbox and absolute positioning for layout.
Headline must scale cleanly: use clamp() or vw units.
Image: pointer-events-none, so it doesn't block text selection/clicks.
Blobs and ghost text: pointer-events-none.
No JavaScript animation needed — all motion is CSS and layout-based.
Fully responsive: hero layout shifts from absolute/layered (desktop) → stacked block (mobile).
```

---

## HEADLINE FORMULA

Bold portfolio headlines use 3 single punchy words or short phrases:
- Format A: "[VERB]\n[NOUN]\n[ERA/MOVEMENT]." — "DESIGN\nBEYOND\nBORDERS."
- Format B: "[ADJECTIVE]\n[NOUN]\n[OUTCOME]." — "BOLD\nIDEAS\nSHIP."
- Format C: "[CONCEPT]\n[ACTION]\n[RESULT]." — "THINK\nBUILD\nLAUNCH."

Avoid: complete sentences, lowercase, soft words like "creative" or "passionate"

---

## COLOR PALETTE PRESETS

| Vibe | Top Color | Bottom Color | Ghost Word Color |
|---|---|---|---|
| Fire | #fd2601 | #f37e1c | white |
| Electric | #7c3aed | #2563eb | white |
| Midnight | #1e1b4b | #312e81 | #a5b4fc |
| Jungle | #064e3b | #065f46 | #6ee7b7 |
| Rose | #be123c | #9f1239 | white |
| Ocean | #0c4a6e | #0ea5e9 | white |
| Gold | #92400e | #b45309 | #fcd34d |

---

## CLIP-PATH PRESETS FOR PORTRAIT CUTOUT

```css
/* Organic brush stroke */
clip-path: polygon(8% 5%, 92% 0%, 88% 95%, 4% 100%);

/* Diamond */
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

/* Angled rectangle */
clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);

/* Hexagon */
clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

/* Rough cutout (most premium look) */
clip-path: polygon(0% 8%, 12% 0%, 88% 2%, 100% 0%, 96% 94%, 100% 100%, 6% 98%, 0% 100%);
```
