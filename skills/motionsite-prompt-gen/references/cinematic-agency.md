# Cinematic Agency Hero — Reference Template
> Style: Velorah / Framelix / Logoisum — Video Background, Poetic Typography
> Target: Lovable / Bolt.new
> Stack: React + Vite + Tailwind CSS + TypeScript + shadcn/ui

---

## FULL PROMPT TEMPLATE

```plaintext
Create a single-page hero section with a fullscreen looping background video, glassmorphic navigation,
and cinematic typography. Use React + Vite + Tailwind CSS + TypeScript with shadcn/ui.

1. Global Styles & Theme:
Background: [DEEP_COLOR e.g. #010b14 deep navy / #0a0000 dark crimson / #000000 pure black].
Fonts:
  Display: "[DISPLAY_FONT e.g. Instrument Serif / Cormorant Garamond / Playfair Display]" from Google Fonts
  Body: "Inter" weights 400/500
  CSS: --font-display: '[DISPLAY_FONT]', serif; --font-body: 'Inter', sans-serif;
Colors (HSL CSS variables):
  --background: [HSL of deep bg color];
  --foreground: 0 0% 100%;
  --muted-foreground: 240 4% 66%;
  --primary: 0 0% 100%; --primary-foreground: 0 0% 4%;
  --border: 0 0% 18%; --input: 0 0% 18%;
  --accent: 0 0% 10%; --muted: 0 0% 10%;

2. Video Background:
Fullscreen <video>: autoPlay loop muted playsInline
Source: [VIDEO_URL — direct .mp4 CDN link]
Styled: position absolute, inset-0, w-full, h-full, object-cover, z-0
[If using HLS .m3u8 stream]:
  Create memoized VideoPlayer component using hls.js (load via CDN: https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js).
  Attach Hls instance to video ref in useEffect. Destroy on unmount for cleanup.
  Same absolute positioning as above.

3. Navigation Bar (relative, z-10, flex row, justify-between, px-6 md:px-10 py-6, max-w-[1400px] mx-auto):
Logo: "[BRAND_NAME]®" — "®" as <sup className="text-xs align-top">, text-2xl md:text-3xl, tracking-tight, font-normal, fontFamily: var(--font-display), text-white.
Nav links (hidden on mobile, md:flex gap-8):
  [LINK_1] (active: text-white), [LINK_2], [LINK_3], [LINK_4], [LINK_5] — all text-sm text-[--muted-foreground] hover:text-white transition-colors.
CTA Button: "[CTA_TEXT]" — liquid-glass class, rounded-full, px-6 py-2.5, text-sm text-white, hover:scale-[1.03] transition-transform cursor-pointer.

4. Hero Section (relative, z-10, flex flex-col items-center, text-center, px-6 pt-[clamp(80px,12vh,140px)] pb-[clamp(60px,10vh,120px)]):
Headline:
  "[POETIC_HEADLINE]"
  font-size: clamp(2.8rem, 7vw, 6rem), leading-[0.92], tracking-[-0.025em], font-normal.
  fontFamily: "'[DISPLAY_FONT]', serif". max-w-5xl mx-auto.
  [EMOTIONAL_WORDS] wrapped in <em className="not-italic text-[--muted-foreground]"> for color contrast on specific words.
  Apply animate-fade-rise class.

Subtext (text-[--muted-foreground] text-base sm:text-lg max-w-xl mx-auto mt-6 md:mt-8 leading-[1.6]):
  "[BRAND_DESCRIPTION — poetic, evocative, 2-3 short sentences]"
  Apply animate-fade-rise-delay class.

CTA Button:
  "[HERO_CTA_LABEL]" — liquid-glass class, rounded-full, px-12 md:px-14 py-4 md:py-5, text-base text-white, mt-10 md:mt-12, hover:scale-[1.03] transition-transform cursor-pointer.
  Apply animate-fade-rise-delay-2 class.

5. Liquid Glass CSS:
.liquid-glass {
  background: rgba(255,255,255,0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.10);
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
    rgba(255,255,255,0.45) 0%,  rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0.00) 40%, rgba(255,255,255,0.00) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

6. Animations (CSS — no Framer Motion needed):
@keyframes fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fade-rise         { animation: fade-rise 0.85s cubic-bezier(0.16,1,0.3,1) both; }
.animate-fade-rise-delay   { animation: fade-rise 0.85s cubic-bezier(0.16,1,0.3,1) 0.20s both; }
.animate-fade-rise-delay-2 { animation: fade-rise 0.85s cubic-bezier(0.16,1,0.3,1) 0.38s both; }

7. Layout Rules:
NO decorative blobs, radial gradients, or dark overlays — the video provides all visual depth.
Minimalist, vertically centered, cinematic. The video IS the design.
Page container: min-h-screen, overflow-hidden, display flex flex-col, bg-[--background].
Max-width wrapper: max-w-[1400px] mx-auto w-full.

Technical Requirements:
TypeScript. All event handlers typed. VideoPlayer in its own component file.
Accessibility: <main> wrapping hero, semantic heading order.
Mobile: Nav links hidden (md:flex), headline scales via clamp, CTA always visible.
Font: loaded via @import in global.css or <link> in index.html.
```

---

## HEADLINE FORMULA

Cinematic agency headlines follow this formula:
- **Poetic + Contrast**: Main verb phrase + philosophical payoff
- Some words in muted color for rhythm
- No punctuation overload — one period at most

Examples:
- `"Where [dreams/ideas/brands] rise through the [silence/noise/ordinary]."`
- `"We make the [invisible/impossible/unforgettable] [speak/move/breathe]."`
- `"Design that doesn't [shout/beg/follow] — it [leads/endures/transforms]."`
- `"The studio where [bold/raw/quiet] ideas become [motion/culture/icons]."`

---

## CTA COPY FORMULA

Avoid generic: "Get Started", "Sign Up"
Use evocative language:
- "Begin the Journey" / "Enter the Studio" / "Start the Story"
- "Let's Build Together" / "Open a Conversation" / "Commission Us"

---

## BRAND PERSONALITY PRESETS

| Brand Type | Display Font | Color Tone | Headline Style |
|---|---|---|---|
| Creative Studio | Instrument Serif | Navy/Midnight | Poetic, em-contrast |
| Film / Motion | Cormorant Garamond | Pure Black | 1-line dramatic |
| Architecture | Playfair Display | Charcoal | Structural, minimal |
| Luxury Fashion | Bodoni Moda | Deep Burgundy | Uppercase, wide tracking |
| Photography | EB Garamond | Forest Dark | Lowercase, intimate |
