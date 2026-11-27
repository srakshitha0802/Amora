import type { PrintingFinish, Product, ProductCategory } from '../types';
import rawProducts from '../../content/products.json';

export const BRAND_LOGO_URL = '/assets/amora-emblem-clean.png';
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

// Dedicated High-Resolution Genuine Product Images
export const PRODUCT_IMAGES: Record<string, string> = {
  // Client Confirmed Highlight & Corporate Products
  'executive-onboarding-kit': '/assets/catalog/corporate-merchandise/executive-onboarding-kit.jpg',
  'basic-white-mug': '/assets/catalog/corporate-merchandise/white-ceramic-mug.jpg',
  'black-patch-mug': '/assets/catalog/corporate-merchandise/black-patch-mug.jpg',
  'notebook-pen-gift-set': '/assets/catalog/corporate-merchandise/notebook-pen-gift-set.jpg',
  'premium-lock-diary': '/assets/catalog/corporate-merchandise/premium-lock-diary.jpg',
  'premium-laptop-sleeve': '/assets/catalog/corporate-merchandise/premium-laptop-sleeve.jpg',
  'corporate-backpack': '/assets/catalog/corporate-merchandise/corporate-backpack.jpg',
  'fridge-magnets': '/assets/catalog/corporate-merchandise/fridge-magnets.jpg',
  'hook-leather-keychain': '/assets/catalog/corporate-merchandise/hook-leather-keychain.jpg',
  'steel-shape-keychain': '/assets/catalog/corporate-merchandise/steel-shape-keychain.jpg',
  'acrylic-keychain': '/assets/catalog/corporate-merchandise/acrylic-keychain.jpg',
  'mobile-touch-pen': '/assets/catalog/corporate-merchandise/mobile-touch-pen.jpg',
  'executive-metal-pen': '/assets/catalog/corporate-merchandise/executive-metal-pen.jpg',

  // Corporate Merchandise (Confirmed Studio Photos from WhatsApp)
  'custom-printed-mousepad': '/assets/catalog/corporate-merchandise/standard-mousepad.jpg',
  'custom-printed-round-mousepad': '/assets/catalog/corporate-merchandise/round-mousepad.jpg',
  'custom-printed-keyboard-mat': '/assets/catalog/corporate-merchandise/keyboard-mat.jpg',
  'custom-printed-coffee-mug': '/assets/catalog/corporate-merchandise/coffee-mug.jpg',
  'custom-printed-sipper-bottle': '/assets/catalog/corporate-merchandise/sipper-bottle-600ml.jpg',
  'custom-printed-sports-bottle': '/assets/catalog/corporate-merchandise/sports-bottle-750ml.jpg',

  // Matte Polaroids
  'matte-polaroids-5': '/assets/catalog/b2c/polaroids.jpg',
  'matte-polaroids-8': '/assets/catalog/b2c/polaroids.jpg',
  'matte-polaroids-16': '/assets/catalog/b2c/polaroids.jpg',

  // Glossy Polaroids
  'glossy-polaroids-5': '/assets/catalog/b2c/polaroids.jpg',
  'glossy-polaroids-8': '/assets/catalog/b2c/polaroids.jpg',
  'glossy-polaroids-16': '/assets/catalog/b2c/polaroids.jpg',

  // Special Photo Products & Keepsakes
  'spotify-couple-photo-frame': '/assets/catalog/b2c/spotify-frame.jpg',
  'personalised-photo-cushion': '/assets/catalog/b2c/personalised-gifts.jpg',
  'kpop-group-pack': '/assets/catalog/b2c/polaroids.jpg',
  'film-strips-3': '/assets/catalog/b2c/polaroids.jpg',
  'spotify-polaroids-3': '/assets/catalog/b2c/spotify-frame.jpg',
  'spotify-polaroids-5': '/assets/catalog/b2c/spotify-frame.jpg',
  'photobooth-strips-3': '/assets/catalog/b2c/polaroids.jpg',

  // Stickers & Decals
  'goofy-cat-stickers': '/assets/catalog/b2c/stickers.jpg',
  'demon-slayer-stickers': '/assets/catalog/b2c/stickers.jpg',
  'cool-laptop-stickers': '/assets/catalog/b2c/stickers.jpg',
  'bts-stickers': '/assets/catalog/b2c/stickers.jpg',
  'aesthetic-stickers-transparent': '/assets/catalog/b2c/stickers.jpg',
  'one-piece-stickers-transparent': '/assets/catalog/b2c/stickers.jpg',
  'custom-stickers-transparent': '/assets/catalog/b2c/stickers.jpg',
  'custom-stickers-paper': '/assets/catalog/b2c/stickers.jpg',

  // Bookmarks & Reading Accessories
  'page-whisper': '/assets/catalog/b2c/bookmarks.jpg',
  'velour-mark': '/assets/catalog/b2c/bookmarks.jpg',
  'whispered-duo': '/assets/catalog/b2c/bookmarks.jpg',
  'classic-matte-duo': '/assets/catalog/b2c/bookmarks.jpg',

  // Posters & Wall Art
  'a3-matte-grande': '/assets/catalog/b2c/posters.jpg',
  'a4-glossy-vivid': '/assets/catalog/b2c/posters.jpg',
  'a3-glossy-grande': '/assets/catalog/b2c/posters.jpg',
};

export function getProductImage(productId: string): string {
  return PRODUCT_IMAGES[productId] || '/assets/aistudio/PHOTO-2026-11-21-11-46-55_ece32d0a.jpg';
}

export const PRODUCTS: Product[] = (rawProducts as Product[]).map((p) => ({
  ...p,
  imageUrl: PRODUCT_IMAGES[p.id] || (p as unknown as { image?: string }).image || p.imageUrl,
}));

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
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'ig-2',
    title: 'Q3 Onboarding Welcome Box',
    caption: '75 matte sipper bottles & stitched keyboard mats dispatched to Mumbai.',
    category: 'Corporate 75 pcs',
    visualType: 'sports-bottle' as const,
    accent: '#2E2A32',
    sampleText: 'NORTHSTAR LABS',
    imageUrl: '/assets/catalog/corporate-merchandise/sipper-bottle-600ml.jpg',
  },
  {
    id: 'ig-3',
    title: 'Pressed Petal Silk Bookmarks',
    caption: '300 GSM cotton stock with hand-knotted plum satin tassels.',
    category: 'Personal Gift',
    visualType: 'bookmark' as const,
    accent: '#6D2E58',
    sampleText: 'Read slowly, keep well',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'ig-4',
    title: 'Booth Strips & Wax-Sealed Notes',
    caption: 'Anniversary memory strips paired with textured letter envelopes.',
    category: 'Keepsake Suite',
    visualType: 'photostrips-letters' as const,
    accent: '#6D2E58',
    sampleText: 'Three years & counting',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 'ig-5',
    title: 'Studio Ceramic Mug Run',
    caption: '120 minimalist cream & plum desk mugs for an architecture firm.',
    category: 'Corporate 120 pcs',
    visualType: 'mug' as const,
    accent: '#2E2A32',
    sampleText: 'ATELIER K',
    imageUrl: '/assets/catalog/corporate-merchandise/coffee-mug.jpg',
  },
  {
    id: 'ig-6',
    title: 'Botanical Vinyl Sticker Sheets',
    caption: 'Kiss-cut matte laptop & journal stickers from our Kalyan desk.',
    category: 'Stickers',
    visualType: 'sticker-sheet' as const,
    accent: '#C88DA0',
    sampleText: 'pretty things',
    imageUrl: 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=700&q=80',
  },
];
