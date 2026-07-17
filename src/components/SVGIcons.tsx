import React from 'react';

// Star icon that has a slight imperfect, storybook hand-drawn feel
export const HandDrawnStar: React.FC<{
  className?: string;
  size?: number;
  filled?: boolean;
}> = ({ className = '', size = 24, filled = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} transition-transform duration-300 hover:scale-110`}
  >
    <path d="M12 2L14.85 8.35L21.8 9L16.55 13.55L18.1 20.35L12 16.75L5.9 20.35L7.45 13.55L2.2 9L9.15 8.35L12 2Z" />
  </svg>
);

// SVG for "Safety & Ratio" card (Star burst & shield container)
export const SafetyStarBurst: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} text-marigold`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Inner soft shield */}
    <path
      d="M50 15 C60 15, 75 18, 75 35 C75 55, 60 75, 50 85 C40 75, 25 55, 25 35 C25 18, 40 15, 50 15 Z"
      fill="none"
      stroke="#FFB84D"
      strokeWidth="2"
      strokeDasharray="4 3"
    />
    {/* Concentric protective circles */}
    <circle cx="50" cy="45" r="18" fill="#FFF8EC" stroke="#FF7A6B" strokeWidth="1.5" />
    {/* Cute center star */}
    <path
      d="M50 33 L53.5 41 L61.5 41.5 L55.5 47 L57 55 L50 51 L43 55 L44.5 47 L38.5 41.5 L46.5 41 Z"
      fill="#FFB84D"
      stroke="#FFB84D"
      strokeWidth="1.5"
    />
    {/* Sparkle lines */}
    <line x1="15" y1="45" x2="25" y2="45" stroke="#FF7A6B" />
    <line x1="85" y1="45" x2="75" y2="45" stroke="#FF7A6B" />
    <line x1="50" y1="10" x2="50" y2="20" stroke="#FF7A6B" />
    <line x1="30" y1="25" x2="36" y2="31" stroke="#FFB84D" />
    <line x1="70" y1="25" x2="64" y2="31" stroke="#FFB84D" />
  </svg>
);

// SVG for "Play-First Curriculum" card (Seedling sprout emerging from tactile winding stairs)
export const PlayGrowthPath: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} text-coral`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Winding path of play */}
    <path
      d="M20 75 C30 80, 45 60, 50 50 C55 40, 70 35, 80 40"
      stroke="#FF7A6B"
      strokeWidth="3"
      strokeDasharray="4 4"
    />
    {/* Small wooden nesting blocks forming stairs */}
    <rect x="15" y="65" width="14" height="14" rx="2" fill="#FFF8EC" stroke="#FFB84D" strokeWidth="2" />
    <rect x="29" y="55" width="12" height="12" rx="2" fill="#FFEFDA" stroke="#4FA179" strokeWidth="2" />
    {/* Cute sprouting seedling at the top */}
    <path d="M65 45 C65 25, 75 22, 75 22" stroke="#4FA179" strokeWidth="2.5" />
    <path d="M75 22 C75 22, 85 25, 80 35" stroke="#4FA179" strokeWidth="2.5" />
    {/* Sprout heart leaves */}
    <path d="M75 22 C67 15, 60 22, 65 27" fill="#4FA179" />
    <path d="M75 22 C83 15, 90 22, 85 27" fill="#4FA179" />
    {/* Sparkle drops */}
    <circle cx="48" cy="28" r="2.5" fill="#FFB84D" stroke="none" />
    <circle cx="85" cy="50" r="1.5" fill="#FFB84D" stroke="none" />
  </svg>
);

// SVG for "Small Class Sizes" (Cozy overlapping pebble circles with friendly star faces)
export const SmallGroupsCircles: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} text-meadow`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Overlapping organic circular shapes */}
    <circle cx="38" cy="55" r="22" fill="#FFEFDA" stroke="#4FA179" strokeWidth="2.5" />
    <circle cx="65" cy="52" r="18" fill="#FFF8EC" stroke="#FF7A6B" strokeWidth="2" />
    <circle cx="50" cy="35" r="15" fill="#FFF8EC" stroke="#FFB84D" strokeWidth="2" />
    
    {/* Little face dots representing a safe cohort */}
    <circle cx="34" cy="53" r="1.5" fill="#2D2A3D" />
    <circle cx="42" cy="53" r="1.5" fill="#2D2A3D" />
    <path d="M36 58 Q38 60 40 58" stroke="#2D2A3D" strokeWidth="1.5" />

    <circle cx="61" cy="50" r="1.5" fill="#2D2A3D" />
    <circle cx="69" cy="50" r="1.5" fill="#2D2A3D" />
    <path d="M63 54 Q65 56 67 54" stroke="#2D2A3D" strokeWidth="1.5" />

    <circle cx="47" cy="33" r="1" fill="#2D2A3D" />
    <circle cx="53" cy="33" r="1" fill="#2D2A3D" />
    <path d="M49 36 Q50 37.5 51 36" stroke="#2D2A3D" strokeWidth="1" />

    {/* Glowing star burst of growth */}
    <path
      d="M80 20 L82 25 L87 26 L83 29 L84 34 L80 31 L76 34 L77 29 L73 26 L78 25 Z"
      fill="#FFB84D"
      stroke="#FFB84D"
      strokeWidth="1"
    />
  </svg>
);

// SVG for "Daily Parent Updates" (Handwritten letter envelope with rising star sparkles)
export const UpdatesEnvelope: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg
    viewBox="0 0 100 100"
    className={`${className} text-twilight`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cute storybook envelope */}
    <rect x="20" y="35" width="60" height="42" rx="4" fill="#FFF8EC" stroke="#2B2A5C" strokeWidth="2.5" />
    {/* Envelope flap folded open */}
    <path d="M20 35 L50 60 L80 35" stroke="#2B2A5C" strokeWidth="2.5" />
    {/* Emerging card/digest with line writing */}
    <path d="M30 35 L30 20 L70 20 L70 35" fill="#FFF8EC" stroke="#FF7A6B" strokeWidth="2" />
    <line x1="38" y1="25" x2="62" y2="25" stroke="#FF7A6B" strokeWidth="1.5" />
    <line x1="38" y1="30" x2="54" y2="30" stroke="#FF7A6B" strokeWidth="1.5" />
    
    {/* Star stamp on the letter */}
    <path
      d="M62 27 L63.5 30 L66.5 30 L64 32 L65 35 L62 33 L59 35 L60 32 L57.5 30 L60.5 30 Z"
      fill="#FFB84D"
      stroke="none"
    />

    {/* Floating notification sparkle */}
    <circle cx="80" cy="22" r="4" fill="#FF7A6B" stroke="none" />
    <path d="M78 22 L82 22" stroke="#FFF8EC" strokeWidth="1" />
    <path d="M80 20 L80 24" stroke="#FFF8EC" strokeWidth="1" />
  </svg>
);

// STORY TIME illustration ("Under the reading oak, where stories come alive")
export const StoryCircleIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-40' }) => (
  <svg
    viewBox="0 0 160 120"
    className={`${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Background warm circle sun */}
    <circle cx="80" cy="55" r="42" fill="#FFEFDA" stroke="none" />
    
    {/* The Oak leaves overlay */}
    <path
      d="M25 40 C15 20, 50 10, 60 25 C70 10, 100 12, 105 28 C115 15, 145 25, 135 45 C148 60, 130 80, 115 75 C110 90, 80 95, 70 82 C55 92, 30 85, 35 68 C20 62, 18 48, 25 40 Z"
      fill="#4FA179"
      fillOpacity="0.85"
      stroke="#4FA179"
      strokeWidth="1"
    />
    {/* Oak trunk */}
    <path d="M76 80 L73 110" stroke="#2D2A3D" strokeWidth="6" />
    <path d="M84 80 L87 110" stroke="#2D2A3D" strokeWidth="6" />
    <path d="M70 105 L52 110" stroke="#2D2A3D" strokeWidth="3" />
    <path d="M90 105 L108 110" stroke="#2D2A3D" strokeWidth="3" />
    
    {/* Open story book floating */}
    <path d="M55 75 C65 72, 77 78, 80 82 C83 78, 95 72, 105 75 L108 95 C98 92, 86 98, 83 94 C80 98, 68 92, 58 95 Z" fill="#FFF8EC" stroke="#2B2A5C" strokeWidth="2" />
    <path d="M80 82 L80 94" stroke="#2B2A5C" strokeWidth="2" />
    
    {/* Book bookmark cord */}
    <path d="M80 94 Q85 102, 82 106" stroke="#FF7A6B" strokeWidth="1.5" />

    {/* Sparkle stars floating out of book */}
    <path d="M50 48 L52 52 L56 53 L53 56 L54 60 L50 58 L46 60 L47 56 L44 53 L48 52 Z" fill="#FFB84D" stroke="none" />
    <path d="M110 50 L111.5 53 L114.5 53.5 L112.5 55.5 L113 58.5 L110 57 L107 58.5 L107.5 55.5 L105.5 53.5 L108.5 53 Z" fill="#FFB84D" stroke="none" />
    <path d="M80 40 L81 42 L83 42.5 L81.5 44 L82 46 L80 45 L78 46 L78.5 44 L77 42.5 L79 42 Z" fill="#FF7A6B" stroke="none" />
  </svg>
);

// OUTDOOR DISCOVERY illustration ("Tiny hands exploring wild gardens")
export const OutdoorIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-40' }) => (
  <svg
    viewBox="0 0 160 120"
    className={`${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Background warm circle sun */}
    <circle cx="80" cy="55" r="42" fill="#FFEFDA" stroke="none" />
    
    {/* Ground with organic grass blades */}
    <path d="M20 100 C50 95, 110 105, 140 100" stroke="#4FA179" strokeWidth="3" />
    <path d="M35 100 L32 90" stroke="#4FA179" strokeWidth="2" />
    <path d="M38 101 L39 92" stroke="#4FA179" strokeWidth="2" />
    <path d="M115 101 L112 88" stroke="#4FA179" strokeWidth="2" />
    <path d="M120 100 L124 91" stroke="#4FA179" strokeWidth="2" />

    {/* Cute wildflowers */}
    {/* Flower 1 */}
    <path d="M50 100 L50 75" stroke="#4FA179" strokeWidth="2" />
    <circle cx="50" cy="71" r="5" fill="#FF7A6B" stroke="none" />
    <circle cx="50" cy="71" r="2" fill="#FFB84D" stroke="none" />
    <path d="M46 88 C40 85, 45 82, 50 85" stroke="#4FA179" strokeWidth="1.5" />

    {/* Flower 2 */}
    <path d="M100 100 Q95 85, 92 70" stroke="#4FA179" strokeWidth="2" />
    <circle cx="92" cy="65" r="6" fill="#FFB84D" stroke="none" />
    <circle cx="92" cy="65" r="2.5" fill="#FFF8EC" stroke="none" />

    {/* Magnifying Glass (The exploration aspect) */}
    <circle cx="75" cy="55" r="16" fill="rgba(255, 248, 236, 0.4)" stroke="#2B2A5C" strokeWidth="2.5" />
    {/* Handle */}
    <path d="M86 66 L102 82" stroke="#2B2A5C" strokeWidth="4" />
    {/* Little ladybug under the magnifying lens */}
    <circle cx="72" cy="54" r="5.5" fill="#FF7A6B" stroke="none" />
    {/* Ladybug head */}
    <circle cx="77.5" cy="51" r="2" fill="#2D2A3D" stroke="none" />
    {/* Ladybug split line */}
    <line x1="72" y1="49.5" x2="72" y2="59.5" stroke="#2D2A3D" strokeWidth="1" />
    {/* Ladybug dots */}
    <circle cx="70" cy="52" r="0.7" fill="#2D2A3D" stroke="none" />
    <circle cx="74" cy="56" r="0.7" fill="#2D2A3D" stroke="none" />

    {/* Little sparkles */}
    <path d="M125 40 L128 40" stroke="#FFB84D" strokeWidth="1.5" />
    <path d="M126.5 38.5 L126.5 41.5" stroke="#FFB84D" strokeWidth="1.5" />
  </svg>
);

// ART & CRAFT illustration ("Mini masterpieces with fingerpaint and boundless wonder")
export const ArtIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-40' }) => (
  <svg
    viewBox="0 0 160 120"
    className={`${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Background warm circle sun */}
    <circle cx="80" cy="55" r="42" fill="#FFEFDA" stroke="none" />

    {/* Painter palette */}
    <path
      d="M45 75 C35 60, 42 40, 65 35 C88 30, 115 42, 110 65 C105 85, 80 90, 70 85 C64 82, 58 87, 52 84 C46 81, 48 78, 45 75 Z"
      fill="#FFF8EC"
      stroke="#2B2A5C"
      strokeWidth="2.5"
    />
    
    {/* Thumb hole */}
    <circle cx="56" cy="72" r="4" fill="#FFEFDA" stroke="#2B2A5C" strokeWidth="1.5" />

    {/* Paint blobs */}
    <circle cx="60" cy="46" r="6" fill="#FF7A6B" stroke="none" />
    <circle cx="78" cy="42" r="5" fill="#FFB84D" stroke="none" />
    <circle cx="95" cy="50" r="5.5" fill="#4FA179" stroke="none" />
    <circle cx="88" cy="70" r="6.5" fill="#2B2A5C" stroke="none" />

    {/* Paint brush resting */}
    <path d="M40 95 L102 38" stroke="#2D2A3D" strokeWidth="3" />
    {/* Wooden handle collar */}
    <path d="M96 43 L100 40" stroke="#FFB84D" strokeWidth="2.5" />
    {/* Bristle tip with coral paint */}
    <path d="M100 40 C103 37, 107 35, 107 35 C107 35, 105 39, 102 42 Z" fill="#FF7A6B" stroke="#FF7A6B" strokeWidth="1" />

    {/* Happy splatters */}
    <path d="M120 70 C122 70, 122 74, 120 74 C118 74, 118 70, 120 70" fill="#4FA179" />
    <path d="M34 50 C36 50, 36 53, 34 53 C32 53, 32 50, 34 50" fill="#FFB84D" />
  </svg>
);

// Map Placeholder illustration (Creative hand-drawn map representing location of academy)
export const MapIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 200 130"
    className={`${className}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Board/paper outline */}
    <rect x="5" y="5" width="190" height="120" rx="6" fill="#FFEFDA" stroke="#2D2A3D" strokeWidth="2.5" />
    {/* Grid fold lines */}
    <line x1="68" y1="5" x2="68" y2="125" stroke="#F2992B" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="132" y1="5" x2="132" y2="125" stroke="#F2992B" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="5" y1="65" x2="195" y2="65" stroke="#F2992B" strokeWidth="1" strokeDasharray="3 3" />

    {/* Hand-drawn streets */}
    <path d="M10 45 C40 45, 60 20, 90 20 C120 20, 140 85, 190 85" stroke="#5B5770" strokeWidth="4" />
    <path d="M70 10 L70 115" stroke="#5B5770" strokeWidth="4" />
    <path d="M130 10 L130 115" stroke="#5B5770" strokeWidth="4" />
    <path d="M40 80 C80 80, 100 110, 160 110" stroke="#5B5770" strokeWidth="3" />

    {/* Greenery / Meadow Parks */}
    <path d="M15 15 C35 15, 30 35, 15 35 Z" fill="#4FA179" fillOpacity="0.4" stroke="#4FA179" strokeWidth="1.5" />
    <path d="M150 15 C175 10, 185 35, 160 40 Z" fill="#4FA179" fillOpacity="0.4" stroke="#4FA179" strokeWidth="1.5" />
    <circle cx="100" cy="100" r="12" fill="#4FA179" fillOpacity="0.3" stroke="#4FA179" strokeWidth="1.5" strokeDasharray="2 2" />

    {/* The Star Pin (Little Stars Academy location!) */}
    <circle cx="70" cy="65" r="16" fill="rgba(255, 122, 107, 0.2)" stroke="none" />
    <circle cx="70" cy="65" r="8" fill="#FF7A6B" stroke="none" />
    {/* Inner Star glowing */}
    <path
      d="M70 59 L71.5 63 L75 63.5 L72.5 66 L73 69.5 L70 68 L67 69.5 L67.5 66 L65 63.5 L68.5 63 Z"
      fill="#FFB84D"
      stroke="none"
    />
    <text x="88" y="70" fill="#2B2A5C" fontSize="11" fontWeight="700" fontFamily="Fredoka" stroke="none">
      LITTLE STARS
    </text>
    <text x="88" y="82" fill="#5B5770" fontSize="8.5" fontWeight="500" fontFamily="Karla" stroke="none">
      Academy Location
    </text>

    {/* Little directional compass */}
    <circle cx="170" cy="105" r="10" fill="#FFF8EC" stroke="#2D2A3D" strokeWidth="1.5" />
    <path d="M170 98 L170 112" stroke="#FF7A6B" strokeWidth="1.5" />
    <path d="M163 105 L177 105" stroke="#2D2A3D" strokeWidth="1" />
    <text x="168" y="96" fill="#2D2A3D" fontSize="7" fontWeight="700" stroke="none">N</text>
  </svg>
);
