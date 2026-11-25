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

// Dedicated High-Resolution Genuine Product Images
export const PRODUCT_IMAGES: Record<string, string> = {
  // Corporate Merchandise (Confirmed Studio Photos from WhatsApp)
  'custom-printed-mousepad': '/assets/catalog/corporate-merchandise/standard-mousepad.jpg',
  'custom-printed-round-mousepad': '/assets/catalog/corporate-merchandise/round-mousepad.jpg',
  'custom-printed-keyboard-mat': '/assets/catalog/corporate-merchandise/keyboard-mat.jpg',
  'custom-printed-coffee-mug': '/assets/catalog/corporate-merchandise/coffee-mug.jpg',
  'custom-printed-sipper-bottle-600ml': '/assets/catalog/corporate-merchandise/sipper-bottle-600ml.jpg',
  'custom-printed-sports-bottle-750ml': '/assets/catalog/corporate-merchandise/sports-bottle-750ml.jpg',

  // Matte Polaroids
  'pack-of-5-matte-polaroids': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
  'pack-of-8-matte-polaroids': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  'pack-of-16-matte-polaroids': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',

  // Glossy Polaroids
  'pack-of-5-glossy-polaroids': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
  'pack-of-8-glossy-polaroids': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'pack-of-16-glossy-polaroids': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',

  // Special Photo Products & Keepsakes
  'k-pop-group-pack': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  'film-strips-set-of-3': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  'spotify-polaroids-set-of-3': 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=800&q=80',
  'spotify-polaroids-set-of-5': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
  'photobooth-strips-set-of-3': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',

  // Stickers
  'goofy-cat-stickers': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
  'demon-slayer-stickers': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
  'cool-laptop-stickers': 'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=800&q=80',
  'bts-stickers': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
  'aesthetic-stickers': 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  'one-piece-stickers': 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=800&q=80',
  'custom-stickers-transparent': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  'custom-stickers-paper-based': 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',

  // Bookmarks & Reading Accessories
  'page-whisper': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'velour-mark': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
  'whispered-duo': 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
  'classic-matte-duo': 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',

  // Posters & Wall Art
  'a4-glossy-vivid-gloss-edition': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'a3-matte-grande-matte-edition': 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=800&q=80',
  'a3-glossy-grande-gloss-edition': 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80',
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
