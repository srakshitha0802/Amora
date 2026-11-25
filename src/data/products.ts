import type { PrintingFinish, Product, ProductCategory } from '../types';

export const BRAND_LOGO_URL = '/assets/aistudio/PHOTO-2026-11-21-11-46-55_ece32d0a.jpg';
export const INSTAGRAM_URL = 'https://www.instagram.com/amora.co._?dmpr=eDcycW4yZm1qNzM%3D';
export const INSTAGRAM_HANDLE = '@amora.co._';
export const STUDIO_EMAIL = 'amora.copap@gmail.com';
export const WHATSAPP_NUMBER = '919819442335';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CATEGORY_TABS: ProductCategory[] = [
  'All',
  'Prints & Keepsakes',
  'Stickers & Photocards',
  'Corporate Merchandise (MOQ 30+)',
  'Customised Products',
];

export const ACCENT_SWATCHES = [
  { name: 'Lavender Plum', hex: '#76577B' },
  { name: 'Blush Rose', hex: '#E3A4AE' },
  { name: 'Warm Ivory', hex: '#FAF6F0' },
  { name: 'Deep Charcoal', hex: '#232E36' },
  { name: 'Rose Gold', hex: '#E8998D' },
  { name: 'Champagne', hex: '#F3C69F' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'photo-frames',
    name: 'Customised Photo Frames',
    shortName: 'Photo Frames',
    categories: ['Prints & Keepsakes', 'Customised Products'],
    primaryCategory: 'Prints & Keepsakes',
    isBulkOnly: false,
    moq: 1,
    priceLabel: 'From ₹449',
    unitPriceEstimate: 449,
    unitLabel: 'per frame',
    description:
      'Gallery-grade archival matte prints mounted in warm timber or frosted acrylic frames with bespoke typographic borders.',
    specs: ['No Minimum Order', '300 GSM archival matte', 'Tabletop & wall ready'],
    visualType: 'photo-frame',
    defaultAccent: '#76577B',
    defaultSampleText: 'Kalyan · Monsoon 2026',
  },
  {
    id: 'bookmarks',
    name: 'Personalised Bookmarks',
    shortName: 'Bookmarks',
    categories: ['Prints & Keepsakes', 'Customised Products'],
    primaryCategory: 'Prints & Keepsakes',
    isBulkOnly: false,
    moq: 1,
    priceLabel: 'From ₹149',
    unitPriceEstimate: 149,
    unitLabel: 'per piece',
    description:
      'Tactile 350 GSM cotton-textured bookmarks finished with silk tassels, pressed florals, or your favourite passage.',
    specs: ['No Minimum Order', '350 GSM textured card', 'Optional satin tassel'],
    visualType: 'bookmark',
    defaultAccent: '#76577B',
    defaultSampleText: 'One more chapter',
  },
  {
    id: 'photocards-posters',
    name: 'Custom Photocards & Posters',
    shortName: 'Photocards & Posters',
    categories: ['Stickers & Photocards', 'Prints & Keepsakes'],
    primaryCategory: 'Stickers & Photocards',
    isBulkOnly: false,
    moq: 1,
    priceLabel: 'From ₹199',
    unitPriceEstimate: 199,
    unitLabel: 'per set',
    description:
      'Richly saturated matte and silk-laminated wall posters and rounded-corner collector photocards printed to order.',
    specs: ['No Minimum Order', 'Velvet matte lamination', 'A4 / A3 / Pocket sizes'],
    visualType: 'photocards-posters',
    defaultAccent: '#232E36',
    defaultSampleText: 'GOLDEN HOUR EDITION',
  },
  {
    id: 'polaroids',
    name: 'Personalised Polaroids',
    shortName: 'Polaroids',
    categories: ['Prints & Keepsakes', 'Customised Products'],
    primaryCategory: 'Prints & Keepsakes',
    isBulkOnly: false,
    moq: 1,
    priceLabel: 'From ₹179',
    unitPriceEstimate: 179,
    unitLabel: 'set of 10',
    description:
      'Classic thick-border instant-style photo prints with custom captions, date stamps, and warm film tonal calibration.',
    specs: ['No Minimum Order', 'Set of 10 or 20 prints', 'Custom bottom captions'],
    visualType: 'polaroids',
    defaultAccent: '#76577B',
    defaultSampleText: 'Sunday coffee & slow mornings',
  },
  {
    id: 'sticker-sheets',
    name: 'Custom Sticker Sheets',
    shortName: 'Sticker Sheets',
    categories: ['Stickers & Photocards', 'Customised Products'],
    primaryCategory: 'Stickers & Photocards',
    isBulkOnly: false,
    moq: 1,
    priceLabel: 'From ₹159',
    unitPriceEstimate: 159,
    unitLabel: 'per A5 sheet',
    description:
      'Waterproof, kiss-cut matte vinyl sticker sheets featuring your illustrations, inside jokes, monograms, or brand icons.',
    specs: ['No Minimum Order', 'Waterproof matte vinyl', 'Precision kiss-cut'],
    visualType: 'sticker-sheet',
    defaultAccent: '#E3A4AE',
    defaultSampleText: 'amora studio pack',
  },
  {
    id: 'photostrips-letters',
    name: 'Personalised Photostrips & Letters',
    shortName: 'Photostrips & Letters',
    categories: ['Prints & Keepsakes', 'Customised Products'],
    primaryCategory: 'Prints & Keepsakes',
    isBulkOnly: false,
    moq: 1,
    priceLabel: 'From ₹249',
    unitPriceEstimate: 249,
    unitLabel: 'per keepsake set',
    description:
      'Nostalgic 4-frame photo booth strips tucked alongside a custom typeset keepsake letter in a blush wax-sealed envelope.',
    specs: ['No Minimum Order', '4-frame strip + envelope', 'Custom message typesetting'],
    visualType: 'photostrips-letters',
    defaultAccent: '#76577B',
    defaultSampleText: 'For the days worth keeping',
  },
  {
    id: 'water-bottles',
    name: 'Custom Printed Water Bottles',
    shortName: 'Water Bottles',
    categories: ['Corporate Merchandise (MOQ 30+)', 'Customised Products'],
    primaryCategory: 'Corporate Merchandise (MOQ 30+)',
    isBulkOnly: true,
    moq: 30,
    priceLabel: 'Custom Corporate Quote',
    unitPriceEstimate: 460,
    unitLabel: 'MOQ: 30+ pcs',
    description:
      'Double-wall vacuum insulated stainless bottles in matte executive finishes with precision UV printing or laser engraving.',
    specs: ['MOQ: 30+ Pieces', '750ml insulated matte steel', 'UV Print / Laser Engraving'],
    visualType: 'water-bottle',
    defaultAccent: '#232E36',
    defaultSampleText: 'ACME STUDIO',
  },
  {
    id: 'mugs',
    name: 'Custom Printed Mugs',
    shortName: 'Printed Mugs',
    categories: ['Corporate Merchandise (MOQ 30+)', 'Customised Products'],
    primaryCategory: 'Corporate Merchandise (MOQ 30+)',
    isBulkOnly: true,
    moq: 30,
    priceLabel: 'Custom Corporate Quote',
    unitPriceEstimate: 265,
    unitLabel: 'MOQ: 30+ pcs',
    description:
      'Heavyweight 330ml studio ceramic mugs engineered for sharp logo reproduction, pantone-matched wraps, and daily desk durability.',
    specs: ['MOQ: 30+ Pieces', '330ml dishwasher-safe ceramic', 'Sublimation / Screen Print'],
    visualType: 'mug',
    defaultAccent: '#232E36',
    defaultSampleText: 'WELCOME ABOARD',
  },
  {
    id: 'mousepads',
    name: 'Custom Printed Mousepads',
    shortName: 'Mousepads',
    categories: ['Corporate Merchandise (MOQ 30+)'],
    primaryCategory: 'Corporate Merchandise (MOQ 30+)',
    isBulkOnly: true,
    moq: 30,
    priceLabel: 'Custom Corporate Quote',
    unitPriceEstimate: 195,
    unitLabel: 'MOQ: 30+ pcs',
    description:
      'Low-friction micro-weave desk mousepads with anti-fray stitched borders and edge-to-edge full-colour company branding.',
    specs: ['MOQ: 30+ Pieces', '3mm anti-slip rubber base', 'Stitched edge sublimation'],
    visualType: 'mousepad',
    defaultAccent: '#232E36',
    defaultSampleText: 'BUILT TOGETHER',
  },
  {
    id: 'keyboard-mats',
    name: 'Custom Printed Keyboard Mats',
    shortName: 'Keyboard Mats',
    categories: ['Corporate Merchandise (MOQ 30+)', 'Customised Products'],
    primaryCategory: 'Corporate Merchandise (MOQ 30+)',
    isBulkOnly: true,
    moq: 30,
    priceLabel: 'Custom Corporate Quote',
    unitPriceEstimate: 495,
    unitLabel: 'MOQ: 30+ pcs',
    description:
      'Expansive 800×300mm workspace mats that anchor onboarding kits with crisp typographic layouts, subtle grids, or brand artwork.',
    specs: ['MOQ: 30+ Pieces', '800×300mm stitched desk mat', 'Edge-to-edge dye sublimation'],
    visualType: 'keyboard-mat',
    defaultAccent: '#232E36',
    defaultSampleText: 'DESIGNED FOR FOCUS',
  },
];

export const BULK_PRODUCTS = PRODUCTS.filter((p) => p.isBulkOnly);

export const PRINTING_FINISHES: PrintingFinish[] = [
  {
    id: 'uv',
    name: 'UV Print',
    bestFor: 'Full-colour logos & tactile matte pop on bottles',
    note: 'Crisp multi-colour reproduction with raised ink feel.',
    perUnitAdder: 35,
  },
  {
    id: 'screen',
    name: 'Screen Print',
    bestFor: 'Clean 1–2 colour corporate logos at scale',
    note: 'Cost-efficient solid Pantone-matched ink coverage.',
    perUnitAdder: 0,
  },
  {
    id: 'sublimation',
    name: 'Sublimation',
    bestFor: 'Edge-to-edge artwork on mugs, mousepads & mats',
    note: 'Permanent heat-infused colour that never peels or cracks.',
    perUnitAdder: 20,
  },
  {
    id: 'laser',
    name: 'Laser Engraving',
    bestFor: 'Understated executive finish on metal bottles',
    note: 'Permanent metallic etch ideal for leadership & client gifting.',
    perUnitAdder: 45,
  },
];

export const CORPORATE_PILLARS = [
  {
    number: '01',
    title: 'Customised Employee Welcome Kits',
    description:
      'Cohesive Day-1 onboarding boxes pairing insulated bottles, ceramic mugs, desk mats, and a personalised welcome note card.',
  },
  {
    number: '02',
    title: 'Company-Branded Merchandise',
    description:
      'Colour-accurate utility essentials built for tech teams, agencies, conferences, and studio offsites — strictly from 30+ pieces.',
  },
  {
    number: '03',
    title: 'Employee Appreciation Gifts',
    description:
      'Work anniversaries, Diwali festive hampers, and milestone recognitions finished with thoughtful editorial packaging.',
  },
  {
    number: '04',
    title: 'Custom Printing Solutions',
    description:
      'In-house pre-press proofing across UV, screen, sublimation, and laser engraving so every shade matches your brand manual.',
  },
];

export const INSTAGRAM_LOOKBOOK = [
  {
    id: 'ig-1',
    title: 'Monsoon Polaroid Keepsake Set',
    caption: 'Warm matte borders & custom date notes — ordered as a single gift.',
    category: 'No MOQ',
    visualType: 'polaroids' as const,
    accent: '#76577B',
    sampleText: 'Rainy evenings · Kalyan',
  },
  {
    id: 'ig-2',
    title: 'Q3 Onboarding Welcome Box',
    caption: '65 matte plum bottles & stitched keyboard mats dispatched to Mumbai.',
    category: 'Corporate 65 pcs',
    visualType: 'water-bottle' as const,
    accent: '#232E36',
    sampleText: 'NORTHSTAR LABS',
  },
  {
    id: 'ig-3',
    title: 'Pressed Petal Silk Bookmarks',
    caption: '350 GSM cotton stock with hand-knotted plum satin tassels.',
    category: 'Personal Gift',
    visualType: 'bookmark' as const,
    accent: '#76577B',
    sampleText: 'Read slowly, keep well',
  },
  {
    id: 'ig-4',
    title: 'Booth Strips & Wax-Sealed Notes',
    caption: 'Anniversary memory strips paired with textured letter envelopes.',
    category: 'Keepsake Suite',
    visualType: 'photostrips-letters' as const,
    accent: '#76577B',
    sampleText: 'Three years & counting',
  },
  {
    id: 'ig-5',
    title: 'Studio Ceramic Mug Run',
    caption: '120 minimalist cream & plum desk mugs for an architecture firm.',
    category: 'Corporate 120 pcs',
    visualType: 'mug' as const,
    accent: '#232E36',
    sampleText: 'ATELIER K',
  },
  {
    id: 'ig-6',
    title: 'Botanical Vinyl Sticker Sheets',
    caption: 'Kiss-cut matte laptop & journal stickers from our Kalyan desk.',
    category: 'Stickers',
    visualType: 'sticker-sheet' as const,
    accent: '#E3A4AE',
    sampleText: 'pretty things',
  },
];
