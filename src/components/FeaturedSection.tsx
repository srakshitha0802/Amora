import React from 'react';
import { ArrowUpRight, MessageCircle, Building2, Palette } from 'lucide-react';
import type { OrderMode, ProductCategory } from '../types';
import { WHATSAPP_CATALOG_URL } from '../data/products';

interface FeaturedSectionProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  onJumpToCategory: (category: ProductCategory, mode?: OrderMode) => void;
  theme?: 'dark' | 'light';
}

const B2C_CATEGORIES: Array<{
  title: string;
  subtitle: string;
  policy: string;
  category: ProductCategory;
}> = [
  {
    title: 'Polaroids & Photo Products',
    subtitle: 'Vintage-bordered instant prints & keepsake photostrips',
    policy: 'No MOQ · From 1 pc',
    category: 'Polaroids & Photo Products',
  },
  {
    title: 'Personalised Gifts',
    subtitle: 'Archival timber photo frames & bespoke gift sets',
    policy: 'No MOQ · Single orders welcome',
    category: 'Personalised Gifts',
  },
  {
    title: 'Stickers',
    subtitle: 'Waterproof kiss-cut matte vinyl sheets for journals & gear',
    policy: 'No MOQ · Precision kiss-cut',
    category: 'Stickers',
  },
  {
    title: 'Bookmarks & Stationery',
    subtitle: '350 GSM cotton-textured card with satin tassels',
    policy: 'No MOQ · Bespoke quotes',
    category: 'Bookmarks & Stationery',
  },
  {
    title: 'Posters & Prints',
    subtitle: 'Matte & velvet silk-laminated wall art & photocards',
    policy: 'No MOQ · High resolution',
    category: 'Posters & Prints',
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
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-b border-current/10 transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-[#6D2E58]/15' : 'bg-[#C88DA0]/10'
      }`} />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 border ${
            isDark
              ? 'bg-white/5 border-white/15 text-[#C88DA0]'
              : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
          }`}>
            <span>Two Distinct Tracks · One Studio Quality</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            Thoughtful personal keepsakes <br />
            <em className="italic text-[#C88DA0] font-normal">&amp; branded corporate merchandise.</em>
          </h2>
          <p className={`text-sm sm:text-base mt-3 leading-relaxed ${
            isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
          }`}>
            Whether ordering a single commemorative gift or 500 company welcome kits, Amora delivers handcrafted precision from Kalyan.
          </p>
        </div>

        {/* ─── B2B: AMORA BUSINESS (High Visibility Near Top) ─── */}
        <div className={`rounded-3xl p-6 sm:p-10 mb-14 border shadow-xl transition-all ${
          isDark
            ? 'bg-[#26202A]/70 border-[#F8F4EA]/15 text-[#F8F4EA]'
            : 'bg-white border-[#6D2E58]/20 text-[#2E2A32] shadow-[0_16px_36px_rgba(109,46,88,0.06)]'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-current/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#6D2E58] text-[#F8F4EA] flex items-center justify-center shrink-0 shadow-md">
                <Building2 className="w-5 h-5 text-[#EBC6CF]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C88DA0]">
                  B2B Solutions · Strict MOQ: 36 Pieces
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Amora Business
                </h3>
              </div>
            </div>

            {/* Clear Primary CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md ${
                  isDark
                    ? 'bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474]'
                    : 'bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#522142]'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Enquire for Bulk Orders</span>
              </a>
              <button
                type="button"
                onClick={onExploreCorporate}
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

          {/* Pillars List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {B2B_PILLARS.map((p, idx) => (
              <div
                key={p.label}
                className={`p-4 rounded-2xl border transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10'
                    : 'bg-[#F8F4EA]/60 border-[#6D2E58]/12'
                }`}
              >
                <span className="text-[10px] font-bold text-[#C88DA0] block mb-1">
                  0{idx + 1}
                </span>
                <h4 className="font-serif text-base font-semibold mb-1">{p.label}</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
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
              onClick={onExplorePersonal}
              className={`text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                isDark ? 'text-[#C88DA0] hover:text-[#F8F4EA]' : 'text-[#6D2E58] hover:text-[#2E2A32]'
              }`}
            >
              <span>View All Keepsakes</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {B2C_CATEGORIES.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => onJumpToCategory(item.category, 'personal')}
                className={`group text-left rounded-2xl p-5 border transition-all cursor-pointer shadow-sm hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#26202A]/50 border-white/10 hover:border-[#C88DA0]/40'
                    : 'bg-white border-[#6D2E58]/15 hover:border-[#6D2E58]/35'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isDark
                      ? 'bg-[#C88DA0]/20 text-[#C88DA0] border border-[#C88DA0]/30'
                      : 'bg-[#C88DA0]/15 text-[#6D2E58] border border-[#C88DA0]/30'
                  }`}>
                    {item.policy}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="font-serif text-lg font-semibold mb-1 group-hover:text-[#C88DA0] transition-colors">
                  {item.title}
                </h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
                  {item.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
