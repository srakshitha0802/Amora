import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { OrderMode, ProductCategory } from '../types';

interface FeaturedSectionProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  onJumpToCategory: (category: ProductCategory, mode?: OrderMode) => void;
  theme?: 'dark' | 'light';
}

const FEATURED_CATEGORIES: Array<{
  title: string;
  subtitle: string;
  policy: string;
  category: ProductCategory;
  mode: OrderMode;
  span?: string;
  glowColor: string;
}> = [
  {
    title: 'Prints & Keepsakes',
    subtitle: 'Polaroids, photo frames, bookmarks & letters',
    policy: 'No MOQ · From 1 piece',
    category: 'Prints & Keepsakes',
    mode: 'personal',
    span: 'sm:col-span-2',
    glowColor: 'hover:border-[#E3A4AE]/50',
  },
  {
    title: 'Stickers & Photocards',
    subtitle: 'Waterproof kiss-cut sheets & matte posters',
    policy: 'No MOQ · Custom art',
    category: 'Stickers & Photocards',
    mode: 'personal',
    glowColor: 'hover:border-[#76577B]/50',
  },
  {
    title: 'Corporate Drinkware',
    subtitle: 'Insulated bottles & studio ceramic mugs',
    policy: 'MOQ: 30+ Pieces',
    category: 'Corporate Merchandise (MOQ 30+)',
    mode: 'bulk',
    glowColor: 'hover:border-[#F3C69F]/50',
  },
  {
    title: 'Desk & Welcome Kits',
    subtitle: 'Stitched mousepads & extended keyboard mats',
    policy: 'MOQ: 30+ Pieces',
    category: 'Corporate Merchandise (MOQ 30+)',
    mode: 'bulk',
    span: 'sm:col-span-2',
    glowColor: 'hover:border-[#E8998D]/50',
  },
];

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  onExplorePersonal,
  onExploreCorporate,
  onJumpToCategory,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-b transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#76577B]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        {/* Brand positioning */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-semibold uppercase tracking-widest mb-3 ${
            isDark ? 'border border-[#E3A4AE]/30 text-[#E3A4AE]' : 'border border-[#76577B]/25 text-[#76577B] shadow-sm'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-[#F3C69F]" />
            <span>Dual-Track Product Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
            prints, &amp; pretty things — <em className="italic text-[#E3A4AE] font-normal">for moments &amp; brands.</em>
          </h2>
          <p className={`text-sm sm:text-base mt-2 max-w-xl mx-auto ${
            isDark ? 'text-[#FAF6F0]/70' : 'text-[#424D55]'
          }`}>
            Explore curated categories for both personal keepsakes and corporate merchandise orders.
          </p>
        </div>

        {/* Category Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {FEATURED_CATEGORIES.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => onJumpToCategory(item.category, item.mode)}
              className={`group text-left rounded-3xl p-7 hover:-translate-y-1 transition-all cursor-pointer shadow-lg ${
                isDark
                  ? 'liquid-glass border border-white/10 hover:border-white/25'
                  : 'bg-white border border-[#76577B]/15 hover:border-[#76577B]/30'
              } ${item.glowColor} ${item.span || ''}`}
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${
                    item.mode === 'bulk'
                      ? isDark
                        ? 'bg-[#F3C69F]/20 text-[#F3C69F] border border-[#F3C69F]/30'
                        : 'bg-[#F3C69F]/30 text-[#76577B] border border-[#F3C69F]/50 font-bold'
                      : isDark
                      ? 'bg-[#E3A4AE]/20 text-[#E3A4AE] border border-[#E3A4AE]/30'
                      : 'bg-[#E3A4AE]/25 text-[#76577B] border border-[#E3A4AE]/40 font-bold'
                  }`}
                >
                  {item.policy}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-1.5">{item.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-[#FAF6F0]/65' : 'text-[#424D55]'}`}>
                {item.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* B2C vs B2B Interactive Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT: Personal Keepsakes (Track A) */}
          <div className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[440px] shadow-xl ${
            isDark ? 'liquid-glass border border-white/10' : 'bg-white border border-[#76577B]/15'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#E3A4AE]/10 blur-[80px] pointer-events-none" />

            <div className={`relative z-10 flex items-center justify-between gap-4 text-xs mb-6 ${
              isDark ? 'text-[#FAF6F0]/60' : 'text-[#424D55]'
            }`}>
              <span className="font-semibold uppercase tracking-wider">01. Track A — Keepsakes</span>
              <span className="px-3 py-1 rounded-full bg-[#E3A4AE]/15 border border-[#E3A4AE]/30 text-[#E3A4AE] font-semibold">
                No Minimum Order
              </span>
            </div>

            {/* Visual representation */}
            <div className="relative my-6 flex-1 flex items-center justify-center py-4">
              {/* Tilted Envelope */}
              <div className={`relative -rotate-6 -mr-8 w-44 sm:w-52 h-32 sm:h-36 rounded-2xl shadow-xl p-4 flex flex-col justify-end animate-float-delayed ${
                isDark ? 'liquid-glass border border-white/20' : 'bg-[#FAF6F0] border border-[#76577B]/20'
              }`}>
                <div className="w-6 h-6 rounded-full bg-[#76577B] border border-[#E3A4AE]/40 mx-auto mb-2 shadow-md" />
                <p className="font-serif italic text-xs text-center">
                  Handwritten notes &amp; strips
                </p>
              </div>

              {/* Hero Polaroid */}
              <div className="relative z-20 rotate-2 w-44 sm:w-52 bg-[#FAF6F0] rounded-xl shadow-2xl p-3 pb-5 animate-float border border-[#76577B]/20 text-[#232E36]">
                <div className="aspect-square bg-gradient-to-br from-[#E3A4AE]/20 via-[#F3C69F]/15 to-[#76577B]/10 rounded flex items-center justify-center">
                  <span className="font-serif text-3xl text-[#76577B]/50">✿</span>
                </div>
                <p className="mt-3 text-center font-serif italic text-sm">
                  prints, &amp; pretty things
                </p>
              </div>

              {/* Bookmark */}
              <div className={`relative z-10 rotate-6 -ml-6 w-24 sm:w-28 h-44 sm:h-48 rounded-2xl shadow-xl p-3 flex flex-col items-center justify-between animate-float-slow ${
                isDark ? 'liquid-glass border border-white/20' : 'bg-[#FAF6F0] border border-[#76577B]/20'
              }`}>
                <div className="w-3 h-3 rounded-full bg-[#E3A4AE]/40 border border-[#76577B]/20" />
                <span className="font-serif italic text-xs">Bookmark</span>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-6 border-t border-current/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Keepsakes made for one
                </h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-[#FAF6F0]/70' : 'text-[#424D55]'}`}>
                  Polaroids, custom frames, bookmarks, sticker sheets &amp; letters — zero minimums.
                </p>
              </div>
              <button
                type="button"
                onClick={onExplorePersonal}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold hover:opacity-95 whitespace-nowrap shrink-0 cursor-pointer transition-all inline-flex items-center gap-1.5 shadow-md ${
                  isDark
                    ? 'liquid-glass-plum text-white border border-[#E3A4AE]/30'
                    : 'bg-[#76577B] text-white hover:bg-[#5E4462] shadow-sm'
                }`}
              >
                <span>Shop Keepsakes</span>
                <ArrowUpRight className="w-4 h-4 text-[#E3A4AE]" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* RIGHT: Corporate Studio (Track B) */}
          <div className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[440px] shadow-xl ${
            isDark ? 'liquid-glass border border-white/10' : 'bg-white border border-[#76577B]/15'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#76577B]/15 blur-[80px] pointer-events-none" />

            <div className={`relative z-10 flex items-center justify-between gap-4 text-xs mb-6 ${
              isDark ? 'text-[#FAF6F0]/60' : 'text-[#424D55]'
            }`}>
              <span className="font-semibold uppercase tracking-wider">02. Track B — Corporate Merch</span>
              <span className="px-3 py-1 rounded-full bg-[#F3C69F]/20 border border-[#F3C69F]/30 text-[#F3C69F] font-semibold">
                MOQ: 30+ Pieces
              </span>
            </div>

            {/* Corporate product illustrations */}
            <div className="relative z-10 my-6 flex-1 flex items-center justify-center py-4">
              <div className="relative w-full max-w-md flex items-end justify-center gap-4 sm:gap-6">
                {/* Bottle */}
                <div className="flex flex-col items-center animate-float">
                  <div className="w-9 h-4 rounded-t bg-gradient-to-r from-[#4A5A66] via-[#6B7B87] to-[#4A5A66]" />
                  <div className="w-20 sm:w-22 h-40 sm:h-44 rounded-t-2xl rounded-b-xl liquid-glass-plum border border-white/20 shadow-2xl flex flex-col items-center justify-center p-2.5">
                    <span className="font-serif text-sm font-semibold">amora</span>
                    <span className="text-[8px] font-semibold tracking-widest uppercase opacity-60 mt-1">
                      750ml Bottle
                    </span>
                  </div>
                </div>

                {/* Mug */}
                <div className="flex items-center animate-float-delayed">
                  <div className={`w-26 sm:w-30 h-26 sm:h-30 rounded-t-md rounded-b-2xl shadow-xl flex flex-col items-center justify-center p-3 border-t-4 border-[#76577B] ${
                    isDark ? 'liquid-glass border border-white/20' : 'bg-[#FAF6F0] border border-[#76577B]/20'
                  }`}>
                    <span className="font-serif italic text-base leading-none">welcome</span>
                    <span className="text-[8px] tracking-widest uppercase mt-1 opacity-60">
                      330ml Mug
                    </span>
                  </div>
                  <div className="w-5 h-16 -ml-1 rounded-r-full border-[5px] border-l-0 border-[#E3A4AE]/40" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-6 border-t border-current/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold">
                  Merchandise built for teams
                </h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-[#FAF6F0]/70' : 'text-[#424D55]'}`}>
                  Welcome kits, bottles, mugs, mousepads &amp; desk mats with UV, screen &amp; laser finishes.
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreCorporate}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all inline-flex items-center gap-1.5 shadow-md ${
                  isDark
                    ? 'liquid-glass border border-white/20 hover:bg-white/10'
                    : 'bg-[#232E36] text-[#FAF6F0] hover:bg-[#3A4750]'
                }`}
              >
                Estimate Bulk Kit
                <ArrowUpRight className="w-4 h-4 text-[#F3C69F]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
