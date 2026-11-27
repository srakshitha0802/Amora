import React from 'react';
import { ArrowUpRight, MessageCircle, Building2, Palette, ShieldCheck, Box } from 'lucide-react';
import type { OrderMode, ProductCategory } from '../types';
import { WHATSAPP_CATALOG_URL } from '../data/products';
import { playTactileClick } from '../utils/audio';

interface FeaturedSectionProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  onJumpToCategory: (category: ProductCategory, mode?: OrderMode) => void;
  theme?: 'dark' | 'light';
}

const B2B_HIGHLIGHT_KIT = {
  id: 'executive-onboarding-kit',
  name: 'Executive Onboarding Welcome Kit',
  subtitle: 'The Definitive Day-1 Employee & Client Gifting Hamper',
  price: '₹1,199 / kit',
  moq: 'Strict MOQ: 36 Kits',
  image: '/assets/catalog/corporate-merchandise/executive-onboarding-kit.jpg',
  itemsIncluded: [
    'Custom Illustrated Magnetic Gift Box with Brand Art',
    'Matte Black Temperature Insulated Bottle (500ml)',
    'Heavy Ceramic Coffee Mug with High-Gloss Sublimation',
    'Executive Diary (232 Pages) with Metallic Lock & Pen',
    'Premium Hook Leather Keychain with Engraved Metal Bar',
    'Solid Metal Adjustable Mobile / Desk Stand',
  ],
  tag: 'Top Most Highlight · 100% Customisable',
};

const B2B_CONFIRMED_ITEMS = [
  {
    name: 'A++ White Ceramic Mug',
    price: '₹199 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/white-ceramic-mug.jpg',
    tag: 'Grade A++ · Basic White Mug',
  },
  {
    name: 'Imported Black Patch Mug',
    price: '₹299 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/black-patch-mug.jpg',
    tag: 'Dual Tone Photo Window',
  },
  {
    name: 'Executive Notebook & Pen Set',
    price: '₹399 / set',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/notebook-pen-gift-set.jpg',
    tag: 'Textured Linen · Pen & Box',
  },
  {
    name: 'Premium Lock Diary (232 Pgs)',
    price: '₹399 / set',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/premium-lock-diary.jpg',
    tag: 'Brass Buckle Clasp · Pen Included',
  },
  {
    name: 'Premium PU Laptop Sleeve (15.6")',
    price: '₹399 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/premium-laptop-sleeve.jpg',
    tag: 'Water-Resistant · Top Handles',
  },
  {
    name: 'Multipurpose Corporate Backpack',
    price: '₹449 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/corporate-backpack.jpg',
    tag: 'Laptop Compartment · Dual Pocket',
  },
  {
    name: 'MDF Sublimation Fridge Magnets',
    price: '₹149 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/fridge-magnets.jpg',
    tag: 'Any Custom Silhouette Possible',
  },
  {
    name: 'Mobile Touch Stylus Pen',
    price: '₹99 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/mobile-touch-pen.jpg',
    tag: '2-in-1 Pen & Touch Stylus',
  },
  {
    name: 'Executive Metal Ball Pen',
    price: '₹69 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/executive-metal-pen.jpg',
    tag: 'Solid Metal · Laser Engraved',
  },
  {
    name: 'Premium Hook Leather Keychain',
    price: '₹129 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/hook-leather-keychain.jpg',
    tag: 'Carabiner Clasp · Maroon & Black',
  },
  {
    name: 'Stainless Steel Shape Keychain',
    price: '₹179 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/steel-shape-keychain.jpg',
    tag: '304 Steel · Laser Cut Silhouette',
  },
  {
    name: 'Personalised UV Acrylic Keychain',
    price: '₹149 / pc',
    moq: 'MOQ: 36 pcs',
    image: '/assets/catalog/corporate-merchandise/acrylic-keychain.jpg',
    tag: 'Clear Optical Acrylic · Tassel Charm',
  },
];

const B2C_CATEGORIES: Array<{
  title: string;
  subtitle: string;
  policy: string;
  category: ProductCategory;
  image: string;
}> = [
  {
    title: 'Spotify Couple Frame',
    subtitle: 'Golden standing frame with scannable Spotify waveform & photo',
    policy: 'No MOQ · Custom Song',
    category: 'Personalised Gifts',
    image: '/assets/catalog/b2c/spotify-frame.jpg',
  },
  {
    title: 'Polaroids & Photo Products',
    subtitle: 'Warm acrylic LED plaques, vintage-bordered prints & strips',
    policy: 'No MOQ · From ₹125',
    category: 'Polaroids & Photo Products',
    image: '/assets/catalog/b2c/polaroids.jpg',
  },
  {
    title: 'Personalised Gifts',
    subtitle: 'Glow LED photo cushions & bespoke memory keepsakes',
    policy: 'No MOQ · Customised',
    category: 'Personalised Gifts',
    image: '/assets/catalog/b2c/personalised-gifts.jpg',
  },
  {
    title: 'Stickers & Decals',
    subtitle: 'Waterproof kiss-cut matte & clear vinyl for laptops & mugs',
    policy: 'No MOQ · From ₹89',
    category: 'Stickers',
    image: '/assets/catalog/b2c/stickers.jpg',
  },
  {
    title: 'Bookmarks & Stationery',
    subtitle: 'Resin floral & 300 GSM cotton cards with silk satin tassels',
    policy: 'No MOQ · From ₹99',
    category: 'Bookmarks & Stationery',
    image: '/assets/catalog/b2c/bookmarks.jpg',
  },
  {
    title: 'Posters & Wall Art',
    subtitle: 'Gallery aesthetic matte & velvet silk framed wall art prints',
    policy: 'No MOQ · From ₹149',
    category: 'Posters & Prints',
    image: '/assets/catalog/b2c/posters.jpg',
  },
];

const B2B_PILLARS = [
  { label: 'Corporate Gifting', desc: 'Curated premium gift boxes for clients & leadership' },
  { label: 'Customised Merchandise', desc: 'Utility desk essentials with sharp Pantone matching' },
  { label: 'Employee Gifting', desc: 'Day-1 onboarding packs & appreciation tokens' },
  { label: 'Event Merchandise', desc: 'Conferences, summits, offsites & milestone runs' },
  { label: 'Bulk Printing & Branding', desc: 'UV print, screen print, sublimation & laser etch' },
];

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  onExplorePersonal,
  onExploreCorporate,
  onJumpToCategory,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-b border-current/10 transition-colors duration-300">
      {/* Background ambient lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-[#6D2E58]/15' : 'bg-[#C88DA0]/10'
        }`}
      />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 border ${
              isDark
                ? 'bg-white/5 border-white/15 text-[#C88DA0]'
                : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
            }`}
          >
            <span>Two Distinct Tracks · One Studio Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            Thoughtful personal keepsakes <br />
            <em className="italic text-[#C88DA0] font-normal">&amp; branded corporate merchandise.</em>
          </h2>
          <p
            className={`text-sm sm:text-base mt-3 leading-relaxed ${
              isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
            }`}
          >
            Whether ordering a single commemorative gift or 500 company welcome kits, Amora delivers handcrafted precision from our Kalyan studio.
          </p>
        </div>

        {/* ─── B2B: AMORA BUSINESS (High Visibility Near Top) ─── */}
        <div
          className={`rounded-3xl p-6 sm:p-10 mb-14 border shadow-xl transition-all ${
            isDark
              ? 'bg-[#26202A]/80 border-[#F8F4EA]/15 text-[#F8F4EA]'
              : 'bg-white border-[#6D2E58]/20 text-[#2E2A32] shadow-[0_16px_36px_rgba(109,46,88,0.06)]'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-current/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#6D2E58] text-[#F8F4EA] flex items-center justify-center shrink-0 shadow-md">
                <Building2 className="w-5 h-5 text-[#EBC6CF]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C88DA0]">
                  B2B Corporate Studio · Strict MOQ: 36 Pieces
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Amora Business
                </h3>
              </div>
            </div>

            {/* Clear Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1500, 0.03)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire for Bulk Orders</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1600, 0.03);
                  onExploreCorporate();
                }}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? 'border-white/20 hover:bg-white/10 text-[#F8F4EA]'
                    : 'bg-[#F8F4EA] border-[#6D2E58]/25 text-[#2E2A32] hover:bg-white'
                }`}
              >
                Estimate Corporate Kit ↗
              </button>
            </div>
          </div>

          {/* ─── TOP MOST MAIN HIGHLIGHT: EXECUTIVE ONBOARDING WELCOME KIT (₹1,199 · MOQ 36) ─── */}
          <div
            className={`rounded-3xl p-6 sm:p-8 mb-10 border shadow-2xl relative overflow-hidden transition-all ${
              isDark
                ? 'bg-gradient-to-br from-[#301B2B] via-[#201524] to-[#160E18] border-[#C88DA0]/30'
                : 'bg-gradient-to-br from-[#FFF9F6] via-white to-[#FDF4F6] border-[#6D2E58]/25 shadow-[0_20px_50px_rgba(109,46,88,0.09)]'
            }`}
          >
            {/* Top Spotlight Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-current/10">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#6D2E58] text-[#F8F4EA] flex items-center gap-1.5 shadow-md">
                  <Box className="w-3.5 h-3.5 text-[#EBC6CF]" />
                  <span>Main Highlight · Top Recommended</span>
                </span>
                <span className="text-xs font-medium opacity-80">
                  Strict MOQ: 36 Kits · 100% Customisable
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider opacity-70">Day-1 Welcome Kit</span>
                <span className="font-serif text-2xl font-bold text-[#6D2E58] dark:text-[#EBC6CF]">
                  {B2B_HIGHLIGHT_KIT.price}
                </span>
              </div>
            </div>

            {/* Split Grid: Photo & Comprehensive Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Product Photograph Showcase */}
              <div className="lg:col-span-6 relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#6D2E58]/20 shadow-xl bg-black/10">
                  <img
                    src={B2B_HIGHLIGHT_KIT.image}
                    alt={B2B_HIGHLIGHT_KIT.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Actual Client Production Unit</span>
                </div>
              </div>

              {/* Kit Details & Inclusions */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight mb-2">
                    {B2B_HIGHLIGHT_KIT.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                      isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                    }`}
                  >
                    Curated executive onboarding suite engineered for day-1 employee welcome, leadership offsites, and premier client gifting. Every single item in the hamper is branded with your bespoke company identity and pantone palette.
                  </p>

                  {/* Bulleted Inclusions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {B2B_HIGHLIGHT_KIT.itemsIncluded.map((item) => (
                      <div
                        key={item}
                        className={`p-2.5 rounded-xl border text-[11px] font-medium flex items-center gap-2 ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-white/90'
                            : 'bg-white border-[#6D2E58]/15 text-[#2E2A32] shadow-2xs'
                        }`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-current/10">
                  <a
                    href={`https://wa.me/919819442335?text=${encodeURIComponent(
                      'Hello Amora.co, I would like to order the Executive Onboarding Welcome Kit (₹1199, MOQ 36).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick(1600, 0.04)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-lg bg-[#25D366] text-black font-bold hover:bg-[#20ba59]"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Enquire Kit on WhatsApp (₹1,199)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick(1500, 0.03);
                      onExploreCorporate();
                    }}
                    className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                      isDark
                        ? 'border-white/20 hover:bg-white/10 text-[#F8F4EA]'
                        : 'bg-white border-[#6D2E58]/25 text-[#2E2A32] hover:bg-[#F8F4EA]'
                    }`}
                  >
                    Customise in B2B Estimator ↗
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── BELOW IT: COMPLETE CUSTOMISABLE PRODUCTS CATALOGUE (MOQ 36) ─── */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-semibold">
                Individual Customisable Essentials
              </h4>
              <p className={`text-xs ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
                All products below are fully customizable with your company logos and delivered with a strict MOQ of 36 pieces.
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#6D2E58]/15 text-[#C88DA0] border border-[#6D2E58]/20 self-start sm:self-auto">
              12 Confirmed Products
            </span>
          </div>

          {/* Genuine Studio Photography Showcase for Corporate Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {B2B_CONFIRMED_ITEMS.map((item) => (
              <div
                key={item.name}
                className={`rounded-2xl overflow-hidden border p-3 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-black/25 border-white/10' : 'bg-[#F8F4EA]/60 border-[#6D2E58]/15'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-black/10">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#6D2E58]/90 text-[#F8F4EA] shadow-xs">
                    {item.moq}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[11px] font-bold bg-black/75 text-white">
                    {item.price}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold leading-tight mb-1">{item.name}</h4>
                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-75 text-[#C88DA0]">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6 border-t border-current/10">
            {B2B_PILLARS.map((p, idx) => (
              <div
                key={p.label}
                className={`p-3.5 rounded-2xl border transition-colors ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#6D2E58]/10'
                }`}
              >
                <span className="text-[10px] font-bold text-[#C88DA0] block mb-1">
                  0{idx + 1}
                </span>
                <h4 className="font-serif text-sm font-semibold mb-1">{p.label}</h4>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── B2C: AMORA CREATIVE (Distinct Section for Individual Customers) ─── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#C88DA0]/20 text-[#6D2E58] flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C88DA0]">
                  B2C Keepsakes · No Minimum Order
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                  Amora Creative
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                playTactileClick(1600, 0.03);
                onExplorePersonal();
              }}
              className={`text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                isDark ? 'text-[#C88DA0] hover:text-[#F8F4EA]' : 'text-[#6D2E58] hover:text-[#2E2A32]'
              }`}
            >
              <span>View All Keepsakes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            {B2C_CATEGORIES.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  playTactileClick(1700, 0.03);
                  onJumpToCategory(item.category, 'personal');
                }}
                className={`group text-left rounded-2xl p-3.5 border transition-all cursor-pointer shadow-sm hover:-translate-y-1 flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#26202A]/60 border-white/10 hover:border-[#C88DA0]/40'
                    : 'bg-white border-[#6D2E58]/15 hover:border-[#6D2E58]/35 shadow-[0_8px_20px_rgba(109,46,88,0.04)]'
                }`}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-black/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/catalog/b2c/polaroids.jpg';
                    }}
                  />
                  <span className={`absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isDark ? 'bg-black/75 text-[#EBC6CF]' : 'bg-white/90 text-[#6D2E58]'
                  }`}>
                    {item.policy}
                  </span>
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold mb-1 group-hover:text-[#C88DA0] transition-colors">
                    {item.title}
                  </h4>
                  <p className={`text-[11px] leading-relaxed line-clamp-2 ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
                    {item.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;
