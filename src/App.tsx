import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Moon, 
  Sun, 
  BookOpen, 
  Terminal, 
  Briefcase, 
  Disc, 
  Film, 
  X, 
  Plus, 
  Minus, 
  ArrowRight, 
  Check, 
  Sparkles,
  RefreshCw,
  Sliders,
  Info
} from 'lucide-react';

// --- SUBCULTURE ARCHETYPES FOR THE HERO SWITCHER ---
const ARCHETYPES = [
  {
    id: 'philosophy',
    label: 'Overthinkers & Stoics',
    pack: 'Philosophy',
    edition: 'Subculture No. 01 · Existential Dread, Dressed Well',
    featuredTitle: 'The Ship of Theseus Heavyweight Hoodie',
    quote: '“If you replace every item in your wardrobe, are you still the same person?”',
    story: 'Plutarch’s ancient thought experiment about a ship that gets every wooden plank replaced one by one. For people who reinvent their entire personality every autumn—now on 450gsm organic cotton.',
    graphicType: 'theseus',
    canvasType: 'hoodie',
    swatch: '#1E3A2F'
  },
  {
    id: 'tech',
    label: '127.0.0.1 Dwellers',
    pack: 'Tech',
    edition: 'Subculture No. 02 · Chronically Compiling',
    featuredTitle: 'The Localhost Ceramic Mug',
    quote: '“There is no place like 127.0.0.1.”',
    story: 'In computer networking, 127.0.0.1 is the universal IP address for "home" (your own machine). Even if you aren’t a software engineer, it’s the ultimate polite signal that you’d rather be at home with your coffee.',
    graphicType: 'localhost',
    canvasType: 'mug',
    swatch: '#1C1B18'
  },
  {
    id: 'corporate',
    label: '9-to-5 Diplomats',
    pack: 'Corporate',
    edition: 'Subculture No. 03 · Weaponized Politeness',
    featuredTitle: 'The "Per My Last" Linen Tote',
    quote: '“See Attached · Fig. 14 · Warmest Regards”',
    story: 'Translates the sharpest phrase in modern office diplomacy into a calm, museum-grade architectural diagram. Looks like an Oxford bookshop tote; hits like a calendar invite on a Friday afternoon.',
    graphicType: 'email',
    canvasType: 'tote',
    swatch: '#232B38'
  },
  {
    id: 'rock',
    label: 'Vinyl Snobs & 7/8 Purists',
    pack: 'Rock',
    edition: 'Subculture No. 04 · Allergic to 4/4 Time',
    featuredTitle: 'The Odd-Meter 7/8 Studio Hoodie',
    quote: '“Counted in [ 2 + 2 + 3 ] · Because 4/4 is too predictable.”',
    story: 'Most pop music marches in a neat 1-2-3-4. Some of the coolest tracks in history skip a half-beat in 7/8 time—creating that hypnotic rhythm that makes prog-rock and jazz fans nod their heads slightly off-beat.',
    graphicType: 'metronome',
    canvasType: 'hoodie',
    swatch: '#6B2D26'
  },
  {
    id: 'cinema',
    label: 'Letterboxd Auteurs',
    pack: 'Cinema',
    edition: 'Subculture No. 05 · "Actually, It’s Shot on 35mm"',
    featuredTitle: 'The Anamorphic Frame Notebook',
    quote: '“2.35:1 Widescreen · Main character proportions.”',
    story: 'Drawn from classic 35mm cinema viewfinder marks. Built for the friend who stays through the entire end credits to read the gaffer’s name—or anyone who wants their daily to-do list to feel cinematic.',
    graphicType: 'aspect',
    canvasType: 'notebook',
    swatch: '#EAE6DF'
  }
];

// --- WELCOMING CURATED PRODUCTS ---
const PRODUCTS = [
  {
    id: 'ts-phil-01',
    edition: 'No. 01',
    title: 'The Ship of Theseus Hoodie',
    category: '450gsm Brushed Organic Hoodie',
    pack: 'Philosophy',
    price: 118,
    canvasType: 'hoodie',
    defaultColor: '#1E3A2F',
    graphicType: 'theseus',
    shortConcept: 'Plutarch’s Identity Crisis (c. 75 AD)',
    footnote: 'If a wooden ship has every plank replaced over time, is it still the same ship? A sharp nod to constant self-reinvention—even if you haven’t touched a philosophy book since freshman year.',
    deepStory: 'Recorded by the Greek historian Plutarch, the Ship of Theseus asks what actually makes something stay itself through change. Printed in fine bone ink with zero external brand logos, so the idea gets all the credit.',
    specs: ['450gsm Combed Organic Cotton', 'Relaxed Academic Drop-Shoulder', 'Zero External Brand Tags'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'ts-tech-01',
    edition: 'No. 02',
    title: 'The Localhost Ceramic Mug',
    category: '12oz Hand-Glazed Stoneware',
    pack: 'Tech',
    price: 32,
    canvasType: 'mug',
    defaultColor: '#EAE6DF',
    graphicType: 'localhost',
    shortConcept: '127.0.0.1 · Nerd for "Home Sweet Home"',
    footnote: 'In computer networks, 127.0.0.1 always points right back to your own machine. The classiest way to say "my code works on my computer" or simply "I prefer staying home."',
    deepStory: 'Every computer has a secret loopback address reserved solely for talking to itself: 127.0.0.1, known as "localhost." Whether you write software, essays, or grocery lists, this stoneware mug is built for quiet desk rituals.',
    specs: ['Matte Parchment Stoneware', 'Kiln-Fired Graphic', 'Dishwasher & Microwave Safe'],
    sizes: ['12 oz']
  },
  {
    id: 'ts-phil-02',
    edition: 'No. 03',
    title: 'The Sisyphus Camus Notebook',
    category: 'Lay-Flat Linen Hardcover (A5)',
    pack: 'Philosophy',
    price: 34,
    canvasType: 'notebook',
    defaultColor: '#232B38',
    graphicType: 'sisyphus',
    shortConcept: 'Albert Camus · Loving the Daily Grind',
    footnote: 'Sisyphus was cursed to roll a boulder up a hill forever—and French philosopher Albert Camus famously concluded, "One must imagine Sisyphus happy." Perfect for your never-ending to-do list.',
    deepStory: 'In his 1942 essay, Camus turned an ancient myth of endless repetition into the ultimate flex of human resilience. Bound in woven bookcloth with 120gsm archival paper that handles fountain pens and frantic Monday notes alike.',
    specs: ['Woven Archival Bookcloth', '192 Dotted & Ruled Pages', '180° Lay-Flat Smyth Binding'],
    sizes: ['A5 Standard']
  },
  {
    id: 'ts-corp-01',
    edition: 'No. 04',
    title: 'The "Per My Last" Architectural Tote',
    category: '16oz Unbleached Canvas Carryall',
    pack: 'Corporate',
    price: 48,
    canvasType: 'tote',
    defaultColor: '#EAE6DF',
    graphicType: 'email',
    shortConcept: 'Corporate Jiu-Jitsu · Fig. 04',
    footnote: 'Turns the most politely devastating phrase in office email history into a refined Latin architectural diagram. Fits a 16" laptop, two hardcovers, and your patience.',
    deepStory: 'Styled after mid-century academic manuscripts ("Cf. Epistula Prior"), this heavyweight canvas tote lets you carry a dry inside joke about modern work culture while looking like you just stepped out of an art library.',
    specs: ['16oz Heavyweight Bull Denim', 'Internal Suspended Laptop Pocket', 'Reinforced Bridle Handles'],
    sizes: ['One Size']
  },
  {
    id: 'ts-rock-01',
    edition: 'No. 05',
    title: 'The 7/8 Odd-Meter Studio Hoodie',
    category: '450gsm Brushed Organic Hoodie',
    pack: 'Rock',
    price: 118,
    canvasType: 'hoodie',
    defaultColor: '#1C1B18',
    graphicType: 'metronome',
    shortConcept: 'Rhythm Theory · [ 1-2, 1-2, 1-2-3 ]',
    footnote: 'Visualizes the lopsided 7/8 time signature behind iconic prog-rock, math-rock, and jazz records. Even if you don’t read sheet music, it’s a badge for marching a half-beat off the crowd.',
    deepStory: 'From Pink Floyd and Radiohead to Dave Brubeck, odd time signatures create a forward-leaning groove that refuses to sit still. Our minimalist acoustic bar diagram celebrates the beauty of asymmetry.',
    specs: ['450gsm Combed Organic Cotton', 'Pre-Shrunk Garment Wash', 'Zero External Brand Tags'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'ts-cine-01',
    edition: 'No. 06',
    title: 'The 2.35:1 CinemaScope Tote',
    category: '16oz Archival Canvas Tote',
    pack: 'Cinema',
    price: 48,
    canvasType: 'tote',
    defaultColor: '#1E3A2F',
    graphicType: 'aspect',
    shortConcept: '35mm Widescreen Viewfinder Marks',
    footnote: 'Printed with the exact optical framing proportions of classic widescreen cinema—for people who judge movies by their cinematography and treat grocery runs like a tracking shot.',
    deepStory: 'Introduced in the 1950s using anamorphic lenses, the 2.35:1 aspect ratio gave filmmakers a sweeping horizontal stage. Crisp registration marks give this everyday tote the poise of a film-school archive piece.',
    specs: ['16oz Dyed Cotton Canvas', 'Interior Key & Pen Slip', 'Water-Based Archival Ink'],
    sizes: ['One Size']
  },
  {
    id: 'ts-phil-03',
    edition: 'No. 07',
    title: 'The Freudian Slip Brass Rollerball',
    category: 'Solid Machined Pen · 0.5mm',
    pack: 'Philosophy',
    price: 52,
    canvasType: 'notebook',
    defaultColor: '#EAE6DF',
    graphicType: 'freudpen',
    shortConcept: 'When You Say One Thing & Mean Your Mother',
    footnote: 'Engraved with "Lapsus Calami" (slip of the pen) and a tiny caliper measuring the gap between what you meant to write and what your subconscious accidentally spilled.',
    deepStory: 'Sigmund Freud loved those accidental moments when an honest truth slips past our polite filter. Machined from solid brass to develop a rich patina over years of journaling, sketching, and accidental honesty.',
    specs: ['Solid Unlacquered Brass & Matte Sleeve', 'Japanese 0.5mm Ceramic Gel Refill', 'Presented in Monograph Box'],
    sizes: ['0.5mm Fine']
  },
  {
    id: 'ts-corp-02',
    edition: 'No. 08',
    title: 'The Adjusted EBITDA Twill Cap',
    category: 'Unstructured Brushed Cotton Cap',
    pack: 'Corporate',
    price: 44,
    canvasType: 'cap',
    defaultColor: '#232B38',
    graphicType: 'ebitda',
    shortConcept: 'Wall Street’s Favorite Fairy Tale',
    footnote: 'Features a subtle embroidered curve showing how creative accounting turns a terrible quarter into "record growth" by ignoring every actual expense.',
    deepStory: 'Charlie Munger famously remarked that every time you read "Adjusted EBITDA," you should replace it with "bullshit earnings." We turned that dry financial truth into an effortlessly clean weekend cap.',
    specs: ['100% Brushed Organic Twill', 'Solid Antiqued Brass Clasp', 'Fine Micro-Embroidery'],
    sizes: ['Adjustable']
  },
  {
    id: 'ts-cine-02',
    edition: 'No. 09',
    title: 'The Hitchcock MacGuffin Notebook',
    category: 'Lay-Flat Linen Hardcover (A5)',
    pack: 'Cinema',
    price: 34,
    canvasType: 'notebook',
    defaultColor: '#6B2D26',
    graphicType: 'macguffin',
    shortConcept: 'The Plot Device Everyone Chases',
    footnote: 'Named after Alfred Hitchcock’s word for the mysterious briefcase or statue that every character chases in a thriller—even if the audience never learns what’s inside.',
    deepStory: 'Whether it’s the glowing briefcase in Pulp Fiction or the Maltese Falcon, the "MacGuffin" is the excuse that starts the adventure. Carry it around like your notes hold classified plot twists.',
    specs: ['Burgundy Linen Bookcloth', '120gsm Ivory Acid-Free Paper', 'Woven Ribbon Bookmark'],
    sizes: ['A5 Standard']
  }
];

// --- COLOR SWATCH PALETTE FOR OBJECT PREVIEWS ---
const ACADEMIC_SWATCHES = [
  { id: 'parchment', name: 'Warm Parchment', hex: '#EAE6DF', lightInk: false },
  { id: 'forest', name: 'Oxford Forest', hex: '#1E3A2F', lightInk: true },
  { id: 'navy', name: 'Bodleian Navy', hex: '#232B38', lightInk: true },
  { id: 'espresso', name: 'Library Espresso', hex: '#1C1B18', lightInk: true },
  { id: 'burgundy', name: 'Monograph Wine', hex: '#6B2D26', lightInk: true }
];

// --- DELICATE EDITORIAL LINE-ART GRAPHICS ---
const EditorialGraphic = ({ type, inkColor = '#1C1B18' }) => {
  switch (type) {
    case 'theseus':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.2">
            {/* Classical minimal vessel with architectural dotted replacement lines */}
            <path d="M 38 78 L 122 78 L 108 94 L 52 94 Z" />
            <path d="M 44 68 L 116 68" strokeDasharray="2 2" strokeWidth="0.9" opacity="0.7" />
            <line x1="80" y1="26" x2="80" y2="78" />
            <path d="M 82 30 L 112 62 L 82 62 Z" />
            <path d="M 78 36 L 52 62 L 78 62 Z" strokeDasharray="3 2" opacity="0.8" />
          </g>
          <text x="80" y="109" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="9.5" letterSpacing="0.5">
            Fig. I — Identitas &amp; Mutatio
          </text>
        </svg>
      );
    case 'localhost':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.1">
            <rect x="34" y="34" width="92" height="50" rx="2" />
            <line x1="34" y1="45" x2="126" y2="45" strokeWidth="0.8" opacity="0.6" />
            <circle cx="41" cy="39.5" r="1.3" fill={inkColor} />
            <circle cx="46" cy="39.5" r="1.3" fill={inkColor} />
            <path d="M 65 92 C 80 98, 80 98, 95 92" opacity="0.5" />
          </g>
          <text x="80" y="67" textAnchor="middle" fill={inkColor} fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="1.2">
            127.0.0.1
          </text>
          <text x="80" y="106" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="9.5">
            Domus · Localhost
          </text>
        </svg>
      );
    case 'sisyphus':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.2">
            <line x1="32" y1="88" x2="128" y2="38" />
            <line x1="32" y1="88" x2="128" y2="88" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.6" />
            <circle cx="96" cy="46.5" r="7.5" />
          </g>
          <text x="80" y="106" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="9.5">
            Camus · MCMXLII
          </text>
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.1">
            <rect x="36" y="30" width="88" height="58" />
            <line x1="46" y1="42" x2="82" y2="42" opacity="0.5" />
            <line x1="46" y1="50" x2="114" y2="50" opacity="0.5" />
            <rect x="44" y="58" width="72" height="16" strokeDasharray="2 1.5" />
          </g>
          <text x="80" y="69" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="9">
            Cf. Epistula Prior
          </text>
          <text x="80" y="105" textAnchor="middle" fill={inkColor} fontFamily="JetBrains Mono, monospace" fontSize="6.5" letterSpacing="1">
            SEE ATTACHED · LINE 14
          </text>
        </svg>
      );
    case 'metronome':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const tall = i === 0 || i === 2 || i === 4;
              const x = 41 + i * 13;
              const h = tall ? 38 : 22;
              const y = 80 - h;
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2={x} y2="80" strokeWidth={tall ? '2' : '1'} />
                  <circle cx={x} cy={y} r={tall ? '2' : '1.2'} fill={inkColor} />
                </g>
              );
            })}
            <line x1="34" y1="80" x2="126" y2="80" strokeWidth="0.8" opacity="0.5" />
          </g>
          <text x="80" y="102" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="10">
            Tempus 7/8 · [ 2 + 2 + 3 ]
          </text>
        </svg>
      );
    case 'aspect':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.1">
            <rect x="26" y="42" width="108" height="46" />
            {/* Corner viewfinder brackets */}
            <path d="M 32 48 L 40 48 M 32 48 L 32 56" strokeWidth="0.9" opacity="0.7" />
            <path d="M 128 48 L 120 48 M 128 48 L 128 56" strokeWidth="0.9" opacity="0.7" />
            <path d="M 32 82 L 40 82 M 32 82 L 32 74" strokeWidth="0.9" opacity="0.7" />
            <path d="M 128 82 L 120 82 M 128 82 L 128 74" strokeWidth="0.9" opacity="0.7" />
            <line x1="77" y1="65" x2="83" y2="65" strokeWidth="0.8" />
            <line x1="80" y1="62" x2="80" y2="68" strokeWidth="0.8" />
          </g>
          <text x="80" y="104" textAnchor="middle" fill={inkColor} fontFamily="JetBrains Mono, monospace" fontSize="7.5" letterSpacing="1.5">
            2.35 : 1 ANAMORPHIC
          </text>
        </svg>
      );
    case 'freudpen':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.1">
            <rect x="28" y="56" width="90" height="10" />
            <polygon points="118,56 136,61 118,66" />
            <line x1="45" y1="48" x2="98" y2="48" strokeWidth="0.8" strokeDasharray="2 2" />
            <line x1="72" y1="53" x2="72" y2="69" />
          </g>
          <text x="80" y="96" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="10">
            Lapsus Calami · Fig. VII
          </text>
        </svg>
      );
    case 'ebitda':
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.1">
            <line x1="35" y1="78" x2="125" y2="78" strokeWidth="0.8" />
            <path d="M 42 78 Q 65 92, 82 65 T 118 42" />
            <circle cx="118" cy="42" r="2.2" fill={inkColor} />
          </g>
          <text x="80" y="100" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="9.5">
            ebitda · &ldquo;Adjusted Reality&rdquo;
          </text>
        </svg>
      );
    case 'macguffin':
    default:
      return (
        <svg viewBox="0 0 160 120" className="w-full h-full">
          <g stroke={inkColor} fill="none" strokeWidth="1.1">
            <rect x="46" y="42" width="68" height="44" rx="2" />
            <path d="M 68 42 L 68 35 L 92 35 L 92 42" />
            <line x1="46" y1="62" x2="114" y2="62" strokeWidth="0.8" />
            <circle cx="80" cy="62" r="3" fill={inkColor} />
          </g>
          <text x="80" y="104" textAnchor="middle" fill={inkColor} fontFamily="Cormorant Garamond, serif" fontStyle="italic" fontSize="9.5">
            The MacGuffin · Act I
          </text>
        </svg>
      );
  }
};

// --- REALISTIC ARCHITECTURAL PRODUCT SILHOUETTE WITH EMBEDDED THESIS ---
const ProductIllustration = ({ canvasType = 'hoodie', graphicType = 'theseus', colorHex = '#1E3A2F' }) => {
  // Determine if the garment/object color is light or dark so the print ink contrasts softly
  const isLightSurface = colorHex === '#EAE6DF' || colorHex === '#FAF8F5' || colorHex === '#F3F1EC';
  const inkColor = isLightSurface ? '#1C1B18' : '#F3F1EC';
  const seamColor = isLightSurface ? 'rgba(28,27,24,0.18)' : 'rgba(243,241,236,0.18)';
  const outlineColor = isLightSurface ? 'rgba(28,27,24,0.35)' : 'rgba(28,27,24,0.5)';

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none p-4">
      <svg viewBox="0 0 280 260" className="w-full h-full max-h-64 drop-shadow-xs">
        {canvasType === 'hoodie' && (
          <g>
            {/* Refined architectural hoodie silhouette */}
            <path
              d="M 102 44 C 118 28, 162 28, 178 44 L 228 72 L 246 178 L 216 184 L 204 112 L 204 226 L 76 226 L 76 112 L 64 184 L 34 178 L 52 72 Z"
              fill={colorHex}
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            {/* Hood collar & subtle kangaroo pocket seam */}
            <path d="M 106 44 C 122 66, 158 66, 174 44" fill="none" stroke={seamColor} strokeWidth="1.2" />
            <path d="M 102 178 L 178 178 L 188 216 L 92 216 Z" fill="none" stroke={seamColor} strokeWidth="1" />
            <line x1="76" y1="216" x2="204" y2="216" stroke={seamColor} strokeWidth="1" />
          </g>
        )}

        {canvasType === 'mug' && (
          <g>
            {/* Ceramic Mug Handle & Body */}
            <path
              d="M 182 88 L 214 88 C 228 88, 228 168, 214 168 L 182 168"
              fill="none"
              stroke={colorHex}
              strokeWidth="12"
            />
            <path
              d="M 182 88 L 214 88 C 228 88, 228 168, 214 168 L 182 168"
              fill="none"
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            <rect
              x="72"
              y="64"
              width="116"
              height="134"
              rx="6"
              fill={colorHex}
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            <ellipse cx="130" cy="64" rx="58" ry="8" fill={isLightSurface ? '#DFDBD2' : '#2C2A26'} stroke={outlineColor} strokeWidth="1" />
          </g>
        )}

        {canvasType === 'notebook' && (
          <g>
            {/* Hardcover Monograph Book */}
            <rect
              x="74"
              y="36"
              width="132"
              height="188"
              rx="4"
              fill={colorHex}
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            {/* Bookcloth spine crease */}
            <line x1="90" y1="36" x2="90" y2="224" stroke={seamColor} strokeWidth="1.5" />
            {/* Ribbon marker */}
            <path d="M 136 224 L 136 242 L 142 237 L 148 242 L 148 224" fill="#6B2D26" />
          </g>
        )}

        {canvasType === 'tote' && (
          <g>
            {/* Canvas Tote Handles & Body */}
            <path
              d="M 110 78 L 110 34 C 110 24, 170 24, 170 34 L 170 78"
              fill="none"
              stroke={colorHex}
              strokeWidth="9"
            />
            <path
              d="M 110 78 L 110 34 C 110 24, 170 24, 170 34 L 170 78"
              fill="none"
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            <polygon
              points="70,76 210,76 202,226 78,226"
              fill={colorHex}
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            <line x1="72" y1="88" x2="208" y2="88" stroke={seamColor} strokeWidth="1" />
          </g>
        )}

        {canvasType === 'cap' && (
          <g>
            {/* Unstructured Dad Cap */}
            <path
              d="M 68 145 C 68 82, 198 82, 198 145 Z"
              fill={colorHex}
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            <path
              d="M 66 144 C 115 138, 175 138, 232 158 C 195 172, 115 166, 66 144 Z"
              fill={colorHex}
              stroke={outlineColor}
              strokeWidth="1.2"
            />
            <path d="M 133 88 C 122 110, 120 130, 120 144" fill="none" stroke={seamColor} strokeWidth="1" />
          </g>
        )}
      </svg>

      {/* Positioned Visual Thesis Graphic on the Product */}
      <div
        className={`absolute pointer-events-none flex items-center justify-center transition-all duration-500 ${
          canvasType === 'hoodie'
            ? 'w-28 h-24 top-[31%]'
            : canvasType === 'mug'
            ? 'w-28 h-24 top-[35%] -ml-2'
            : canvasType === 'notebook'
            ? 'w-32 h-28 top-[32%] ml-2'
            : canvasType === 'cap'
            ? 'w-24 h-16 top-[35%] -ml-2'
            : 'w-32 h-28 top-[40%]'
        }`}
      >
        <EditorialGraphic type={graphicType} inkColor={inkColor} />
      </div>
    </div>
  );
};

export default function App() {
  // --- STATE ---
  const [eveningMode, setEveningMode] = useState(false);
  const [archetypeIdx, setArchetypeIdx] = useState(0);
  const [selectedPack, setSelectedPack] = useState('All');
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [modalSelectedSize, setModalSelectedSize] = useState('L');
  const [modalSelectedSwatch, setModalSelectedSwatch] = useState(null);

  // Shopping Bag State
  const [bag, setBag] = useState([
    { ...PRODUCTS[0], qty: 1, selectedSize: 'L' },
    { ...PRODUCTS[1], qty: 1, selectedSize: '12 oz' }
  ]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const currentArchetype = ARCHETYPES[archetypeIdx];

  // Filtered Catalog
  const filteredProducts = useMemo(() => {
    if (selectedPack === 'All') return PRODUCTS;
    return PRODUCTS.filter((p) => p.pack === selectedPack);
  }, [selectedPack]);

  // Bag Helpers
  const addToBag = (product, size = product.sizes?.[0] || 'Standard', customColor = null) => {
    const itemKey = `${product.id}-${size}-${customColor || product.defaultColor}`;
    setBag((prev) => {
      const exists = prev.find((i) => i.itemKey === itemKey);
      if (exists) {
        return prev.map((i) => (i.itemKey === itemKey ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          ...product,
          itemKey,
          selectedSize: size,
          defaultColor: customColor || product.defaultColor,
          qty: 1
        }
      ];
    });
    setActiveProductModal(null);
    setIsBagOpen(true);
  };

  const updateBagQty = (idOrKey, delta) => {
    setBag((prev) =>
      prev
        .map((item) =>
          (item.itemKey || item.id) === idOrKey ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const bagCount = bag.reduce((sum, i) => sum + i.qty, 0);
  const bagSubtotal = bag.reduce((sum, i) => sum + i.price * i.qty, 0);

  const openProductDetail = (product) => {
    setActiveProductModal(product);
    setModalSelectedSize(product.sizes?.[1] || product.sizes?.[0] || 'Standard');
    setModalSelectedSwatch(product.defaultColor);
  };

  // Theme Tokens
  const bgMain = eveningMode ? 'bg-[#141311] text-[#F2EFE9]' : 'bg-[#FAF8F5] text-[#1C1B18]';
  const bgCard = eveningMode ? 'bg-[#1C1A17]' : 'bg-[#F3F1EC]';
  const bgElevated = eveningMode ? 'bg-[#22201C]' : 'bg-[#FFFFFF]';
  const borderHairline = eveningMode ? 'border-[#2C2925]' : 'border-[#E6E4DD]';
  const textMuted = eveningMode ? 'text-[#9E9A90]' : 'text-[#6E6A63]';
  const accentPill = eveningMode
    ? 'bg-[#F2EFE9] text-[#141311]'
    : 'bg-[#1E3A2F] text-[#FAF8F5]';

  // Hero Separated Zone Palette (Deep Oxford Bookcloth vs Warm Alabaster Catalog below)
  const heroBg = eveningMode ? 'bg-[#1A241E]' : 'bg-[#1E3A2F]';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgMain} antialiased selection:bg-[#1E3A2F] selection:text-white`}>
      {/* Load Classical Editorial Serif + Clean Sans + Subtle Mono */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-serif-editorial { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-clean { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-mono-subtle { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* 1. CALM SEPARATED LANDING ZONE (HEADER + CENTERED HERO STAGE) */}
      <div id="top" className={`relative overflow-hidden ${heroBg} text-[#FAF8F5] transition-colors duration-500`}>
        {/* Subtle Classical Architectural Watermark in the Background (3.5% Opacity) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
           viewBox="0 0 1200 700"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="600" cy="350" r="280" />
          <circle cx="600" cy="350" r="190" strokeDasharray="4 6" />
          <circle cx="600" cy="350" r="95" />
          <line x1="150" y1="350" x2="1050" y2="350" />
          <line x1="600" y1="40" x2="600" y2="660" />
          <rect x="320" y="150" width="560" height="400" />
          <line x1="320" y1="150" x2="880" y2="550" strokeDasharray="3 5" />
          <line x1="880" y1="150" x2="320" y2="550" strokeDasharray="3 5" />
        </svg>

        {/* Minimalist Top Bar (Like Cotton Bureau's top hairline bar) */}
        <header className="relative z-10 border-b border-[#FAF8F5]/12">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Left: Quick Minimal Directions */}
            <div className="flex items-center gap-5 text-xs font-sans-clean text-[#FAF8F5]/75">
              <button
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Shop All Packs
              </button>
              <span className="opacity-30">·</span>
              <button
                onClick={() => setHowItWorksOpen(!howItWorksOpen)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                How the Lore Works
              </button>
            </div>

            {/* Center: Single-Line Academic Wordmark + Crest */}
            <a
              href="#top"
              className="font-serif-editorial text-2xl sm:text-3xl font-semibold tracking-tight text-[#FAF8F5]"
            >
              Thesis Supply
            </a>

            {/* Right: Reading Light & Bag */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setEveningMode(!eveningMode)}
                className="flex items-center gap-1.5 text-xs font-sans-clean px-3 py-1.5 rounded-full border border-[#FAF8F5]/20 text-[#FAF8F5]/80 hover:text-white hover:border-[#FAF8F5]/50 transition-colors cursor-pointer"
                title="Toggle Reading Light"
              >
                {eveningMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span className="hidden sm:inline">Daylight</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Night Owl</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setIsBagOpen(true)}
                className="flex items-center gap-2 text-xs font-sans-clean py-1.5 px-3.5 rounded-full border border-[#FAF8F5]/25 hover:border-[#FAF8F5] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bag</span>
                <span className="font-mono-subtle text-[11px] px-1.5 py-0.2 rounded-full bg-[#FAF8F5] text-[#1E3A2F] font-medium">
                  {bagCount}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Calm, Centered Hero Stage */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 sm:py-28 text-center">
          {/* Interactive Subculture Switcher Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5]/10 border border-[#FAF8F5]/15 text-[11px] font-mono-subtle uppercase tracking-widest text-[#FAF8F5]/80 mb-6">
            <span>{currentArchetype.edition}</span>
          </div>

          {/* Main Centered Title */}
          <h1 className="font-serif-editorial text-4xl sm:text-6xl lg:text-[68px] font-normal leading-[1.08] tracking-tight">
            A Republic of{' '}
            <button
              onClick={() => setArchetypeIdx((prev) => (prev + 1) % ARCHETYPES.length)}
              className="inline-flex items-baseline gap-2.5 italic text-[#E5D6B8] border-b border-[#E5D6B8]/40 hover:border-[#E5D6B8] pb-0.5 transition-all group cursor-pointer"
              title="Click to switch subculture"
            >
              <span>{currentArchetype.label}.</span>
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500 self-center" />
            </button>
          </h1>

          {/* The Unbranded Manifesto Subheadline */}
          <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#FAF8F5]/95 mt-6">
            “We don’t print our company name on your chest.”
          </p>

          <p className="font-sans-clean text-sm sm:text-base text-[#FAF8F5]/75 max-w-2xl mx-auto mt-3 leading-relaxed">
            You’re already paying for the hoodie—you shouldn’t have to be a walking billboard
            for our logo too. We put sharp visual references from philosophy, tech, music,
            and cinema onto heavyweight goods, and include the footnote so everyone’s in on the joke.
          </p>

          {/* Quick Subculture Selector Dots */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            <span className="font-mono-subtle text-[11px] uppercase tracking-wider text-[#FAF8F5]/50 mr-1">
              Subculture:
            </span>
            {ARCHETYPES.map((arch, idx) => {
              const active = archetypeIdx === idx;
              return (
                <button
                  key={arch.id}
                  onClick={() => setArchetypeIdx(idx)}
                  className={`px-3.5 py-1 rounded-full text-xs font-sans-clean transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FAF8F5] text-[#1E3A2F] font-medium'
                      : 'bg-[#FAF8F5]/8 text-[#FAF8F5]/75 hover:bg-[#FAF8F5]/15 hover:text-white'
                  }`}
                >
                  {arch.pack}
                </button>
              );
            })}
          </div>

          {/* Cotton Bureau-Inspired Dual Action Split with Centered "OR" Circle */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            <button
              onClick={() => {
                setSelectedPack('All');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-56 py-4 px-6 rounded-full bg-[#FAF8F5] text-[#1E3A2F] font-sans-clean text-xs font-semibold uppercase tracking-widest hover:bg-[#E5D6B8] transition-colors cursor-pointer shadow-sm"
            >
              Browse the Packs
            </button>

            <div className="relative z-10 sm:-mx-3 w-10 h-10 rounded-full border border-[#FAF8F5]/30 bg-[#1E3A2F] flex items-center justify-center font-serif-editorial italic text-xs text-[#FAF8F5]/80 shrink-0">
              or
            </div>

            <button
              onClick={() => setHowItWorksOpen(!howItWorksOpen)}
              className="w-full sm:w-56 py-4 px-6 rounded-full bg-[#142820] text-[#FAF8F5] border border-[#FAF8F5]/25 font-sans-clean text-xs font-semibold uppercase tracking-widest hover:border-[#FAF8F5] transition-colors cursor-pointer"
            >
              {howItWorksOpen ? 'Hide the Concept' : 'How the Lore Works'}
            </button>
          </div>

          {/* Expandable "How the Lore Works" Drawer inside the Calm Zone */}
          {howItWorksOpen && (
            <div className="mt-10 pt-8 border-t border-[#FAF8F5]/15 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left animate-fadeIn">
              <div className="p-5 rounded-xl bg-[#FAF8F5]/6 border border-[#FAF8F5]/12">
                <div className="font-mono-subtle text-xs text-[#E5D6B8] mb-1">01 · ZERO LOGOS</div>
                <div className="font-serif-editorial text-xl font-medium mb-1">
                  No Corporate Branding
                </div>
                <p className="font-sans-clean text-xs text-[#FAF8F5]/75 leading-relaxed">
                  You won’t find “Thesis Supply” splashed across the front or back. Only the
                  visual diagram or reference itself is printed.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF8F5]/6 border border-[#FAF8F5]/12">
                <div className="font-mono-subtle text-xs text-[#E5D6B8] mb-1">02 · THE FOOTNOTE</div>
                <div className="font-serif-editorial text-xl font-medium mb-1">
                  Zero Gatekeeping
                </div>
                <p className="font-sans-clean text-xs text-[#FAF8F5]/75 leading-relaxed">
                  Don’t know the reference yet? Every item on our site—and every physical box
                  we ship—comes with a warm, 20-second backstory card.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#FAF8F5]/6 border border-[#FAF8F5]/12">
                <div className="font-mono-subtle text-xs text-[#E5D6B8] mb-1">03 · ARCHIVAL GRADE</div>
                <div className="font-serif-editorial text-xl font-medium mb-1">
                  Heavyweight Goods
                </div>
                <p className="font-sans-clean text-xs text-[#FAF8F5]/75 leading-relaxed">
                  450gsm organic cotton hoodies, Smyth-sewn linen notebooks, and kiln-fired
                  stoneware built to outlast trends.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. CLEAN TRANSITION BAR + CURATED CATALOG (LIKE THE WHITE ZONE BELOW COTTON BUREAU'S HERO) */}
      <section id="catalog" className={`py-14 lg:py-20 border-b ${borderHairline}`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Minimalist Horizontal Tab Strip (Direct nod to Cotton Bureau's bottom tab bar) */}
          <div className={`flex flex-wrap items-center justify-between gap-4 pb-5 mb-12 border-b ${borderHairline}`}>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              {[
                { id: 'All', label: 'All Packs' },
                { id: 'Philosophy', label: 'Philosophy' },
                { id: 'Tech', label: 'Nerd / Tech' },
                { id: 'Corporate', label: 'Corporate' },
                { id: 'Rock', label: 'Rock & Audio' },
                { id: 'Cinema', label: 'Cinema' }
              ].map((pack) => {
                const active = selectedPack === pack.id;
                return (
                  <button
                    key={pack.id}
                    onClick={() => setSelectedPack(pack.id)}
                    className={`relative pb-5 -mb-5 font-sans-clean text-xs sm:text-sm transition-colors cursor-pointer ${
                      active
                        ? 'font-semibold text-current'
                        : `${textMuted} hover:text-current`
                    }`}
                  >
                    <span>{pack.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A2F] dark:bg-[#E5D6B8] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className={`font-mono-subtle text-xs ${textMuted} hidden md:block`}>
              Showing {filteredProducts.length} Editions · Footnotes Included
            </div>
          </div>

          {/* Airy 3-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`group rounded-2xl border ${borderHairline} ${bgCard} p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-md`}
              >
                <div>
                  {/* Edition & Category Header */}
                  <div className="flex items-center justify-between text-xs font-mono-subtle mb-4">
                    <span className={textMuted}>Edition {product.edition}</span>
                    <span className={`px-2.5 py-0.5 rounded-full border ${borderHairline} ${bgElevated} text-[11px] font-sans-clean`}>
                      {product.pack}
                    </span>
                  </div>

                  {/* Clickable Product Illustration Plate */}
                  <div
                    onClick={() => openProductDetail(product)}
                    className={`cursor-pointer rounded-xl ${bgElevated} border ${borderHairline} h-60 flex items-center justify-center mb-5 overflow-hidden relative group-hover:border-current/30 transition-colors`}
                  >
                    <ProductIllustration
                      canvasType={product.canvasType}
                      graphicType={product.graphicType}
                      colorHex={product.defaultColor}
                    />
                    <span className={`absolute bottom-3 right-3 text-[11px] font-sans-clean px-2.5 py-1 rounded-full ${bgCard} border ${borderHairline} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      Full Backstory →
                    </span>
                  </div>

                  {/* Product Title & Price */}
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <span className={`text-xs font-sans-clean ${textMuted} block`}>
                        {product.category}
                      </span>
                      <h3
                        onClick={() => openProductDetail(product)}
                        className="font-serif-editorial text-2xl font-semibold tracking-tight mt-0.5 cursor-pointer hover:underline underline-offset-4"
                      >
                        {product.title}
                      </h3>
                    </div>
                    <span className="font-mono-subtle text-sm font-medium shrink-0">
                      ${product.price}
                    </span>
                  </div>

                  {/* Always-Visible Welcoming "Footnote" Box */}
                  <div className={`mt-4 p-4 rounded-xl ${bgElevated} border ${borderHairline}`}>
                    <div className="flex items-center gap-1.5 font-serif-editorial italic text-sm font-medium mb-1">
                      <BookOpen className="w-3.5 h-3.5 opacity-70 shrink-0" />
                      <span>The Footnote: {product.shortConcept}</span>
                    </div>
                    <p className={`font-sans-clean text-xs leading-relaxed ${textMuted}`}>
                      {product.footnote}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Read Story & Quick Add */}
                <div className={`mt-5 pt-4 border-t ${borderHairline} flex items-center justify-between gap-3`}>
                  <button
                    onClick={() => openProductDetail(product)}
                    className={`text-xs font-sans-clean ${textMuted} hover:text-current underline underline-offset-4 cursor-pointer`}
                  >
                    Specs &amp; Backstory
                  </button>

                  <button
                    onClick={() => addToBag(product)}
                    className={`px-4 py-2 rounded-full font-sans-clean text-xs font-medium flex items-center gap-1.5 transition-opacity hover:opacity-90 cursor-pointer ${accentPill}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WARM EDITORIAL FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-16 font-sans-clean text-sm">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b ${borderHairline}`}>
          <div className="md:col-span-2 space-y-3">
            <div className="font-serif-editorial text-2xl font-semibold">
              Thesis Supply
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${textMuted}`}>
              Dressed like an Oxford monograph, written like an inside joke. We make
              unbranded essentials for overthinkers, builders, film buffs, and anyone
              who enjoys a good reference.
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="font-mono-subtle text-xs uppercase tracking-wider">
              Subculture Packs
            </div>
            <ul className={`space-y-2 text-xs ${textMuted}`}>
              <li>The Philosophy Pack</li>
              <li>The Nerd / Tech Pack</li>
              <li>The Corporate Pack</li>
              <li>The Rock &amp; Audio Pack</li>
              <li>The Cinema Pack</li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <div className="font-mono-subtle text-xs uppercase tracking-wider">
              House Rules
            </div>
            <ul className={`space-y-2 text-xs ${textMuted}`}>
              <li>Zero External Brand Logos</li>
              <li>Printed Lore Card in Every Box</li>
              <li>450gsm Combed Organic Cotton</li>
              <li>No Gatekeeping Allowed</li>
            </ul>
          </div>
        </div>

        <div className={`pt-8 flex flex-wrap items-center justify-between gap-4 text-xs ${textMuted}`}>
          <span>© 2026 Thesis Supply. All rights reserved.</span>
          <span className="font-serif-editorial italic text-sm">
            “We don’t print our company name on your chest.”
          </span>
        </div>
      </footer>

      {/* 5. PRODUCT STORY & EDITION DETAIL MODAL */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div
            className={`w-full max-w-2xl rounded-2xl border ${borderHairline} ${bgMain} p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl`}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-current/10">
              <div>
                <span className={`font-mono-subtle text-xs ${textMuted}`}>
                  Edition {activeProductModal.edition} · {activeProductModal.pack} Collection
                </span>
                <h3 className="font-serif-editorial text-3xl font-semibold mt-0.5">
                  {activeProductModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className={`p-2 rounded-full border ${borderHairline} hover:border-current`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 items-center">
              <div className={`rounded-xl ${bgCard} border ${borderHairline} h-64 flex items-center justify-center`}>
                <ProductIllustration
                  canvasType={activeProductModal.canvasType}
                  graphicType={activeProductModal.graphicType}
                  colorHex={modalSelectedSwatch || activeProductModal.defaultColor}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="font-serif-editorial italic text-lg font-medium">
                    {activeProductModal.shortConcept}
                  </div>
                  <p className={`font-sans-clean text-xs leading-relaxed mt-2 ${textMuted}`}>
                    {activeProductModal.deepStory}
                  </p>
                </div>

                {/* Colorway Switcher inside Modal */}
                <div>
                  <span className="font-sans-clean text-xs font-medium block mb-2">
                    Colorway:
                  </span>
                  <div className="flex items-center gap-2">
                    {ACADEMIC_SWATCHES.map((sw) => (
                      <button
                        key={sw.id}
                        onClick={() => setModalSelectedSwatch(sw.hex)}
                        className={`w-6 h-6 rounded-full border ${
                          modalSelectedSwatch === sw.hex ? 'ring-2 ring-offset-2 ring-current' : 'opacity-75'
                        }`}
                        style={{ backgroundColor: sw.hex }}
                        title={sw.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                {activeProductModal.sizes && (
                  <div>
                    <span className="font-sans-clean text-xs font-medium block mb-2">
                      Select Size:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProductModal.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setModalSelectedSize(sz)}
                          className={`px-3 py-1 rounded-lg font-mono-subtle text-xs border ${
                            modalSelectedSize === sz
                              ? accentPill + ' border-transparent'
                              : `${borderHairline} ${textMuted}`
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Craftsmanship Specs */}
            <div className={`p-4 rounded-xl ${bgCard} border ${borderHairline} mb-6`}>
              <div className="font-mono-subtle text-[11px] uppercase tracking-wider mb-2">
                Craftsmanship &amp; Details
              </div>
              <div className="flex flex-wrap gap-2">
                {activeProductModal.specs.map((spec) => (
                  <span
                    key={spec}
                    className={`text-xs font-sans-clean px-3 py-1 rounded-full ${bgElevated} border ${borderHairline}`}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className={`text-xs block ${textMuted}`}>Edition Price</span>
                <span className="font-mono-subtle text-xl font-medium">
                  ${activeProductModal.price}.00
                </span>
              </div>

              <button
                onClick={() =>
                  addToBag(activeProductModal, modalSelectedSize, modalSelectedSwatch)
                }
                className={`px-7 py-3.5 rounded-full font-sans-clean text-sm font-medium ${accentPill} hover:opacity-90 transition-opacity`}
              >
                Add Edition to Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. SLIDE-OUT SHOPPING BAG DRAWER */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div
            className={`w-full max-w-md h-full flex flex-col justify-between border-l ${borderHairline} ${bgMain} p-6 sm:p-8 overflow-y-auto shadow-2xl`}
          >
            <div>
              <div className={`flex items-center justify-between pb-5 border-b ${borderHairline}`}>
                <div>
                  <span className={`font-mono-subtle text-[11px] uppercase tracking-widest ${textMuted}`}>
                    Your Selection
                  </span>
                  <h3 className="font-serif-editorial text-2xl font-semibold">
                    Reading &amp; Wardrobe Bag ({bagCount})
                  </h3>
                </div>
                <button
                  onClick={() => setIsBagOpen(false)}
                  className={`p-2 rounded-full border ${borderHairline} hover:border-current`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {bag.length === 0 ? (
                <div className={`py-20 text-center font-serif-editorial italic text-xl ${textMuted}`}>
                  Your bag is currently empty.
                </div>
              ) : (
                <div className={`divide-y ${borderHairline} my-4`}>
                  {bag.map((item) => {
                    const key = item.itemKey || item.id;
                    return (
                      <div key={key} className="py-4 flex gap-4 items-center">
                        <div className={`w-20 h-20 rounded-xl border ${borderHairline} ${bgCard} shrink-0 overflow-hidden`}>
                          <ProductIllustration
                            canvasType={item.canvasType}
                            graphicType={item.graphicType}
                            colorHex={item.defaultColor}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-serif-editorial text-lg font-medium truncate">
                            {item.title}
                          </div>
                          <div className={`font-sans-clean text-xs ${textMuted}`}>
                            Size: {item.selectedSize || 'Standard'} · ${item.price}
                          </div>
                        </div>
                        <div className={`flex items-center rounded-full border ${borderHairline} font-mono-subtle text-xs`}>
                          <button
                            onClick={() => updateBagQty(key, -1)}
                            className="px-2.5 py-1 hover:opacity-60"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2">{item.qty}</span>
                          <button
                            onClick={() => updateBagQty(key, 1)}
                            className="px-2.5 py-1 hover:opacity-60"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {bag.length > 0 && (
              <div className={`pt-5 border-t ${borderHairline} space-y-4`}>
                <div className={`p-3.5 rounded-xl ${bgCard} border ${borderHairline} text-xs font-sans-clean ${textMuted}`}>
                  Every order arrives with a letterpress Monograph Card detailing the
                  history and origin of your chosen pieces.
                </div>

                <div className="space-y-1.5 font-sans-clean text-sm">
                  <div className={`flex justify-between ${textMuted}`}>
                    <span>Subtotal</span>
                    <span className="font-mono-subtle">${bagSubtotal}.00</span>
                  </div>
                  <div className={`flex justify-between ${textMuted}`}>
                    <span>Archival Courier</span>
                    <span className="font-mono-subtle">Complimentary</span>
                  </div>
                  <div className={`flex justify-between text-base font-medium pt-2 border-t ${borderHairline}`}>
                    <span>Total</span>
                    <span className="font-mono-subtle">${bagSubtotal}.00</span>
                  </div>
                </div>

                {orderConfirmed && (
                  <div className="p-3 rounded-xl bg-[#1E3A2F] text-white text-xs font-sans-clean flex items-center justify-between">
                    <span>Thank you. Your edition is being prepared for dispatch.</span>
                    <Check className="w-4 h-4 shrink-0" />
                  </div>
                )}

                <button
                  onClick={() => {
                    setOrderConfirmed(true);
                    setTimeout(() => setOrderConfirmed(false), 3500);
                  }}
                  className={`w-full py-4 rounded-full font-sans-clean text-sm font-medium transition-opacity hover:opacity-90 ${accentPill}`}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}