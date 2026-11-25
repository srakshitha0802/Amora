import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { OrderMode, ProductCategory } from '../types';
import { BRAND_LOGO_URL } from '../data/products';

interface HeroSectionProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  onJumpToCategory: (category: ProductCategory, mode?: OrderMode) => void;
}

const FEATURED_CATEGORIES: Array<{
  title: string;
  subtitle: string;
  policy: string;
  category: ProductCategory;
  mode: OrderMode;
}> = [
  {
    title: 'Prints & Keepsakes',
    subtitle: 'Polaroids, photo frames, bookmarks & letters',
    policy: 'No MOQ · From 1 piece',
    category: 'Prints & Keepsakes',
    mode: 'personal',
  },
  {
    title: 'Stickers & Photocards',
    subtitle: 'Waterproof kiss-cut sheets & matte posters',
    policy: 'No MOQ · Custom art',
    category: 'Stickers & Photocards',
    mode: 'personal',
  },
  {
    title: 'Corporate Drinkware',
    subtitle: 'Insulated bottles & studio ceramic mugs',
    policy: 'MOQ: 30+ Pieces',
    category: 'Corporate Merchandise (MOQ 30+)',
    mode: 'bulk',
  },
  {
    title: 'Desk & Welcome Kits',
    subtitle: 'Stitched mousepads & extended keyboard mats',
    policy: 'MOQ: 30+ Pieces',
    category: 'Customised Products',
    mode: 'bulk',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePersonal,
  onExploreCorporate,
  onJumpToCategory,
}) => {
  return (
    <section id="home" className="paper-grain pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EBDCE4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Top Editorial Masthead */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-8">
            <p className="text-xs sm:text-sm font-medium text-[#6E5D66] mb-3 tracking-wide">
              Kalyan, Maharashtra · Personal Keepsakes &amp; Corporate Merchandise Studio
            </p>
            <h1
              className="font-editorial font-semibold text-[#3B0D27] leading-[1.03] tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)',
                textWrap: 'balance',
              }}
            >
              Thoughtfully Personalised. Beautifully Branded.
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end lg:text-right">
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#6E5D66] max-w-md">
              From a single polaroid keepsake tucked inside a handwritten letter to 300-piece
              company onboarding kits — crafted with tactile precision at Amora.co.
            </p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <button
                type="button"
                onClick={onExplorePersonal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg bg-[#3B0D27] text-[#FDFBF7] hover:bg-[#59163C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B0D27]"
              >
                Explore Personal Gifting
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onExploreCorporate}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg bg-[#FCE7F3] text-[#3B0D27] border border-[#EBDCE4] hover:bg-[#F9D8E6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B0D27]"
              >
                Corporate Bulk Enquiry (MOQ 30+)
              </button>
            </div>
          </div>
        </div>

        {/* Dual-Audience Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* LEFT: Individual Keepsakes */}
          <div className="relative rounded-2xl bg-[#FCE7F3]/65 border border-[#EBDCE4] p-7 sm:p-9 flex flex-col justify-between overflow-hidden min-h-[390px]">
            <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-[#6E5D66] mb-6">
              <span className="font-semibold text-[#3B0D27]">01. Individual Keepsakes</span>
              <span>No Minimum Order · Personal Gifting</span>
            </div>

            {/* Tactile Floating Polaroids & Envelope Composition */}
            <div className="relative my-2 flex-1 flex items-center justify-center py-4">
              {/* Tilted Wax-Sealed Envelope */}
              <div className="relative -rotate-6 -mr-8 sm:-mr-6 w-40 sm:w-48 h-28 sm:h-32 rounded-lg bg-[#FDFBF7] border border-[#EBDCE4] shadow-[0_14px_28px_-12px_rgba(59,13,39,0.18)] p-3 flex flex-col justify-end transition-transform duration-300 hover:-rotate-3">
                <svg viewBox="0 0 180 62" className="absolute top-0 left-0 w-full" aria-hidden="true">
                  <path d="M0 0 L90 48 L180 0" fill="#FAF5EE" stroke="#EBDCE4" strokeWidth="1" />
                </svg>
                <div className="w-5 h-5 rounded-full bg-[#3B0D27] mx-auto mb-2 shadow-sm" />
                <p className="font-editorial italic text-xs text-center text-[#3B0D27]">
                  Handwritten notes &amp; strips
                </p>
              </div>

              {/* Hero Polaroid Card */}
              <div className="relative z-20 rotate-2 w-40 sm:w-48 bg-[#FDFBF7] border border-[#EBDCE4] shadow-[0_22px_40px_-16px_rgba(59,13,39,0.26)] p-2.5 pb-4 transition-transform duration-300 hover:rotate-0 hover:-translate-y-1">
                <div className="aspect-square bg-[#FAF5EE] overflow-hidden relative flex items-center justify-center">
                  <img
                    src={BRAND_LOGO_URL}
                    alt="Amora.co studio emblem — prints and pretty things"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2.5 text-center font-editorial italic text-sm text-[#3B0D27]">
                  prints, &amp; pretty things
                </p>
              </div>

              {/* Bookmark Card */}
              <div className="relative z-10 rotate-6 -ml-6 sm:-ml-4 w-20 sm:w-24 h-40 sm:h-44 rounded-xl bg-[#FDFBF7] border border-[#EBDCE4] shadow-[0_14px_26px_-10px_rgba(59,13,39,0.2)] p-2.5 flex flex-col items-center justify-between transition-transform duration-300 hover:rotate-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FCE7F3] border border-[#EBDCE4]" />
                <div className="w-full flex-1 my-2 rounded-md bg-gradient-to-b from-[#FCE7F3] to-[#FAF5EE] flex items-center justify-center">
                  <svg viewBox="0 0 40 70" className="w-8 h-14" aria-hidden="true">
                    <path d="M20 62 L20 12" stroke="#3B0D27" strokeWidth="1.2" />
                    <path d="M20 44 C10 40 9 32 13 28 C17 31 19 37 20 44 Z" fill="#E6A4B8" />
                    <path d="M20 32 C30 28 31 20 27 16 C23 19 21 25 20 32 Z" fill="#3B0D27" opacity="0.75" />
                  </svg>
                </div>
                <span className="font-editorial italic text-[10px] text-[#3B0D27]">Bookmark</span>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-[#E5C9D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3B0D27]">
                  Keepsakes made for one
                </h2>
                <p className="text-sm text-[#6E5D66] mt-1">
                  Polaroids, custom frames, bookmarks, sticker sheets &amp; letters — zero minimums.
                </p>
              </div>
              <button
                type="button"
                onClick={onExplorePersonal}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B0D27] hover:text-[#59163C] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Shop Keepsakes
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* RIGHT: Corporate Branding */}
          <div className="relative rounded-2xl bg-[#3B0D27] text-[#FDFBF7] p-7 sm:p-9 flex flex-col justify-between overflow-hidden min-h-[390px]">
            <div
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{
                background:
                  'radial-gradient(circle at 80% 18%, rgba(249,216,230,0.32) 0%, transparent 55%)',
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-[#F9D8E6]/85 mb-6">
              <span className="font-semibold text-[#FDFBF7]">02. Corporate Studio</span>
              <span>Strict MOQ: 30+ Pieces · B2B Kits</span>
            </div>

            {/* Executive Corporate Welcome Kit Flat-lay */}
            <div className="relative z-10 my-2 flex-1 flex items-center justify-center py-4">
              <div className="relative w-full max-w-md flex items-end justify-center gap-4 sm:gap-5">
                {/* Matte Insulated Bottle */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-4 rounded-t bg-gradient-to-r from-[#D5CCD0] via-[#F2ECEF] to-[#B8AEB3]" />
                  <div className="w-18 sm:w-20 h-38 sm:h-42 rounded-t-[16px] rounded-b-[10px] bg-gradient-to-b from-[#FAF5EE] to-[#EEDFE7] text-[#3B0D27] shadow-xl flex flex-col items-center justify-center p-2">
                    <div className="w-6 h-6 rounded-full border border-[#3B0D27]/30 flex items-center justify-center mb-1.5">
                      <span className="font-editorial text-xs font-semibold">a</span>
                    </div>
                    <span className="text-[8px] font-semibold tracking-widest uppercase text-[#3B0D27]">
                      BOTTLE
                    </span>
                  </div>
                </div>

                {/* Ceramic Studio Mug */}
                <div className="flex items-center">
                  <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-t-[6px] rounded-b-[14px] bg-[#FCE7F3] text-[#3B0D27] shadow-xl flex flex-col items-center justify-center p-2 border-t-4 border-[#59163C]">
                    <span className="font-editorial italic text-base leading-none">welcome</span>
                    <span className="text-[8px] tracking-widest uppercase mt-1 text-[#6E5D66]">
                      330ml Mug
                    </span>
                  </div>
                  <div className="w-5 h-14 -ml-1 rounded-r-full border-[5px] border-l-0 border-[#F4D0E1]" />
                </div>

                {/* Extended Keyboard Desk Mat */}
                <div className="hidden sm:flex flex-col justify-between w-36 h-24 rounded-xl bg-[#59163C] border border-dashed border-[#F9D8E6]/45 p-3 shadow-xl">
                  <div className="flex gap-1 opacity-40">
                    <span className="w-3 h-2 rounded-[2px] bg-[#FDFBF7]" />
                    <span className="w-3 h-2 rounded-[2px] bg-[#FDFBF7]" />
                    <span className="w-3 h-2 rounded-[2px] bg-[#FDFBF7]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-widest uppercase text-[#F9D8E6]/85">
                      800×300mm
                    </p>
                    <p className="font-editorial text-sm text-[#FDFBF7]">Desk Mat</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-[#FDFBF7]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#FDFBF7]">
                  Merchandise built for teams
                </h2>
                <p className="text-sm text-[#F9D8E6]/85 mt-1">
                  Welcome kits, bottles, mugs, mousepads &amp; desk mats with UV, screen &amp; laser finishes.
                </p>
              </div>
              <button
                type="button"
                onClick={onExploreCorporate}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FCE7F3] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Estimate Bulk Kit
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Category Quick-Filter Jump Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {FEATURED_CATEGORIES.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => onJumpToCategory(item.category, item.mode)}
              className="group text-left rounded-xl bg-[#FDFBF7] border border-[#EBDCE4] p-5 hover:border-[#3B0D27]/40 hover:bg-[#FAF5EE] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B0D27]"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#6E5D66] mb-1.5">
                <span className="font-medium">{item.policy}</span>
                <ArrowUpRight
                  className="w-4 h-4 text-[#3B0D27] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-editorial text-xl font-semibold text-[#3B0D27]">{item.title}</h3>
              <p className="text-xs text-[#6E5D66] mt-1 leading-relaxed">{item.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
