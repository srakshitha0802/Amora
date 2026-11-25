import type { PrintingFinish, Product, ProductCategory } from '../types';
import rawProducts from '../../content/products.json';

export const BRAND_LOGO_URL = '/assets/aistudio/PHOTO-2026-11-21-11-46-55_ece32d0a.jpg';
export const INSTAGRAM_URL = 'https://www.instagram.com/amora.co._?dmpr=eDcycW4yZm1qNzM%3D';
export const INSTAGRAM_HANDLE = '@amora.co._';
export const STUDIO_EMAIL = 'amora.copap@gmail.com';
export const WHATSAPP_NUMBER = '919819442335';
export const WHATSAPP_CATALOG_URL = 'https://wa.me/c/919819442335';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductEnquiryWhatsAppUrl(productName: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Amora.co, I would like to enquire about ${productName}.`
  )}`;
}

export const CATEGORY_TABS: ProductCategory[] = [
  'All',
  'Corporate Merchandise',
  'Polaroids & Photo Products',
  'Personalised Gifts',
  'Stickers',
  'Bookmarks & Stationery',
  'Posters & Prints',
];

export const ACCENT_SWATCHES = [
  { name: 'Amora Plum', hex: '#6D2E58' },
  { name: 'Dusty Rose', hex: '#C88DA0' },
  { name: 'Blush', hex: '#EBC6CF' },
  { name: 'Ivory', hex: '#F8F4EA' },
  { name: 'Lilac', hex: '#D8C6E6' },
  { name: 'Charcoal', hex: '#2E2A32' },
];

export const PRODUCTS: Product[] = rawProducts as Product[];

export const BULK_PRODUCTS = PRODUCTS.filter((p) => p.isBulkOnly);

export const PRINTING_FINISHES: PrintingFinish[] = [
  {
    id: 'uv',
    name: 'UV Print',
    bestFor: 'Full-colour logos & tactile pop on bottles and mugs',
    note: 'Crisp multi-colour reproduction with raised tactile ink feel.',
    perUnitAdder: 25,
  },
  {
    id: 'screen',
    name: 'Screen Print',
    bestFor: 'Crisp 1–2 colour bold corporate logos at scale',
    note: 'Cost-efficient solid Pantone-matched ink coverage.',
    perUnitAdder: 0,
  },
  {
    id: 'sublimation',
    name: 'Sublimation',
    bestFor: 'Edge-to-edge full artwork on mugs, mousepads & mats',
    note: 'Permanent heat-infused colour that never peels or cracks.',
    perUnitAdder: 15,
  },
  {
    id: 'laser',
    name: 'Laser Engraving',
    bestFor: 'Understated executive finish on metal drinkware',
    note: 'Permanent metallic mark ideal for leadership & client gifting.',
    perUnitAdder: 35,
  },
];

export const CORPORATE_PILLARS = [
  {
    number: '01',
    title: 'Customised Employee Welcome Kits',
    description:
      'Cohesive Day-1 onboarding boxes pairing sipper bottles, ceramic mugs, desk mats, and a personalised welcome note card.',
  },
  {
    number: '02',
    title: 'Company-Branded Merchandise',
    description:
      'Colour-accurate utility essentials built for tech teams, agencies, conferences, and studio offsites — strictly from 36+ pieces.',
  },
  {
    number: '03',
    title: 'Employee Appreciation Gifts',
    description:
      'Work anniversaries, milestone recognitions, and festive hampers finished with thoughtful editorial packaging.',
  },
  {
    number: '04',
    title: 'Custom Printing Solutions',
    description:
      'In-house proofing across UV, screen, sublimation, and laser engraving so every shade matches your brand identity.',
  },
];

export const INSTAGRAM_LOOKBOOK = [
  {
    id: 'ig-1',
    title: 'Monsoon Polaroid Keepsake Set',
    caption: 'Warm matte borders & custom date notes — ordered as a single gift.',
    category: 'No MOQ',
    visualType: 'polaroids' as const,
    accent: '#6D2E58',
    sampleText: 'Rainy evenings · Kalyan',
  },
  {
    id: 'ig-2',
    title: 'Q3 Onboarding Welcome Box',
    caption: '75 matte sipper bottles & stitched keyboard mats dispatched to Mumbai.',
    category: 'Corporate 75 pcs',
    visualType: 'sports-bottle' as const,
    accent: '#2E2A32',
    sampleText: 'NORTHSTAR LABS',
  },
  {
    id: 'ig-3',
    title: 'Pressed Petal Silk Bookmarks',
    caption: '350 GSM cotton stock with hand-knotted plum satin tassels.',
    category: 'Personal Gift',
    visualType: 'bookmark' as const,
    accent: '#6D2E58',
    sampleText: 'Read slowly, keep well',
  },
  {
    id: 'ig-4',
    title: 'Booth Strips & Wax-Sealed Notes',
    caption: 'Anniversary memory strips paired with textured letter envelopes.',
    category: 'Keepsake Suite',
    visualType: 'photostrips-letters' as const,
    accent: '#6D2E58',
    sampleText: 'Three years & counting',
  },
  {
    id: 'ig-5',
    title: 'Studio Ceramic Mug Run',
    caption: '120 minimalist cream & plum desk mugs for an architecture firm.',
    category: 'Corporate 120 pcs',
    visualType: 'mug' as const,
    accent: '#2E2A32',
    sampleText: 'ATELIER K',
  },
  {
    id: 'ig-6',
    title: 'Botanical Vinyl Sticker Sheets',
    caption: 'Kiss-cut matte laptop & journal stickers from our Kalyan desk.',
    category: 'Stickers',
    visualType: 'sticker-sheet' as const,
    accent: '#C88DA0',
    sampleText: 'pretty things',
  },
];
