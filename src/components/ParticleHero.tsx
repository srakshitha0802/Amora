import React, { useState, useEffect, useRef } from 'react';
import { WHATSAPP_CATALOG_URL } from '../data/products';
import { playTactileClick } from '../utils/audio';

interface ParticleHeroProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  theme?: 'dark' | 'light';
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  onExplorePersonal,
  onExploreCorporate,
}) => {
  const [mounted, setMounted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Subtle mouse tilt interaction for the floating glass cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 4,
      y: x * 5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleScrollDown = () => {
    playTactileClick(1200, 0.03);
    const target =
      document.getElementById('orbit-showcase') ||
      document.getElementById('keepsakes') ||
      document.getElementById('shop');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[780px] lg:min-h-[850px] xl:min-h-[880px] flex flex-col justify-between overflow-hidden pt-28 sm:pt-32 lg:pt-34 pb-8 transition-colors duration-500 bg-[#F8F1E9]"
      style={{
        backgroundImage: "url('/assets/amora-hero-bg-clean-2x.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ─── MAIN HERO CONTAINER ─── */}
      <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ═════════════════════════════════════════════════════════════
              LEFT COLUMN: Editorial Typography, Taglines & Action CTAs
              (Approx 45% width on desktop)
              ═════════════════════════════════════════════════════════════ */}
          <div
            className={`lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Top Badge: ♥ A LITTLE THOUGHT. A LOT OF LOVE. */}
            <div className="mb-4 sm:mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] border shadow-xs bg-white/90 backdrop-blur-md border-[#702D58]/15 text-[#702D58]">
                <span className="material-symbols-outlined fill text-[#C77F98] text-[14px]">
                  favorite
                </span>
                <span>A Little Thought. A Lot of Love.</span>
              </div>
            </div>

            {/* Editorial Headline:
                Thoughtfully
                personalised.
                Beautifully branded. (in dusty rose italic with baseline underline flourish)
            */}
            <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[64px] xl:text-[72px] font-normal tracking-tight leading-[1.04] mb-5 sm:mb-6 text-[#34232F]">
              Thoughtfully<br />
              personalised.<br />
              <span className="relative inline-block italic font-normal text-[#C77F98]">
                Beautifully branded.
                {/* Curved underline flourish stroke matching reference mockup */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-full h-3 sm:h-4 text-[#C77F98]"
                  viewBox="0 0 320 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 4 14 C 80 4, 230 2, 316 13"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-[15px] sm:text-[16px] max-w-lg leading-relaxed mb-7 sm:mb-8 font-normal text-[#584552]">
              Amora is a creative studio for personalised gifts, custom merchandise and corporate gifting.
              From a single tactile polaroid tucked into a wax-sealed letter to 500-piece company onboarding kits — thoughtfully crafted in our Kalyan studio.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-3.5 items-center mb-4 w-full sm:w-auto">
              {/* Primary: Corporate Merchandise (MOQ 36) -> */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1600, 0.04);
                  onExploreCorporate();
                }}
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 inline-flex items-center gap-2.5 shadow-lg shadow-[#702D58]/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#702D58]/35 active:translate-y-0 cursor-pointer bg-[#702D58] text-white hover:bg-[#592345] border border-[#C77F98]/40 group"
              >
                <span>Corporate Merchandise (MOQ 36)</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1 text-white">
                  arrow_forward
                </span>
              </button>

              {/* Secondary: Personal Keepsakes (No MOQ) -> */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1800, 0.04);
                  onExplorePersonal();
                }}
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 inline-flex items-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border backdrop-blur-md bg-white/95 border-[#EBC5CC] hover:bg-white text-[#34232F] shadow-sm group"
              >
                <span>Personal Keepsakes (No MOQ)</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1 text-[#702D58]">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* Tertiary WhatsApp Catalog Button */}
            <div className="mb-6">
              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1400, 0.03)}
                className="rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 inline-flex items-center gap-2 hover:-translate-y-0.5 border shadow-2xs border-[#BDE8D3] text-[#1E683B] bg-[#E8F8F0] hover:bg-[#D9F4E5]"
              >
                <svg className="w-3.5 h-3.5 text-[#25D366] fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.123-.522-1.828-.76-3.003-2.617-3.094-2.739-.092-.122-.74-1.026-.74-1.956 0-.931.488-1.389.66-1.579.173-.19.377-.238.503-.238.125 0 .251.001.36.006.115.006.269-.044.421.323.157.38.536 1.309.583 1.405.047.095.078.207.016.333-.063.125-.094.204-.188.314-.094.111-.197.247-.282.332-.094.095-.192.198-.083.385.11.188.487.804 1.045 1.301.719.64 1.325.838 1.513.933.188.094.298.083.408-.043.111-.125.474-.551.6-.74.125-.188.251-.157.421-.094.172.063 1.09.514 1.278.608.188.094.314.141.36.22.046.078.046.454-.098.859z" />
                </svg>
                <span>WhatsApp Catalogue</span>
                <span className="material-symbols-outlined text-[14px] opacity-70">
                  arrow_outward
                </span>
              </a>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Floating Glass Cards & Accents
              Overlaid directly above the background photoshoot set
              (Approx 55% width on desktop)
              ═════════════════════════════════════════════════════════════ */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`lg:col-span-6 xl:col-span-7 w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[560px] relative transition-all duration-1000 delay-150 select-none ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ perspective: '1200px' }}
          >
            {/* Interactive container for cards */}
            <div
              className="relative w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* ─── 1. FLOATING CARD 1 (Upper Left of Arch): "Trusted by 500+ Brands" ─── */}
              <div
                onClick={() => {
                  playTactileClick(1500, 0.03);
                  onExploreCorporate();
                }}
                title="Click to explore Corporate Clients & Case Studies"
                className="absolute top-[10%] sm:top-[12%] lg:top-[14%] left-[2%] sm:left-[5%] lg:left-[4%] z-30 -rotate-6 hover:-rotate-2 hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{ transform: 'translateZ(35px)' }}
              >
                <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-[0_20px_45px_-6px_rgba(112,45,88,0.22)] relative">
                  {/* Tiny Heart Corner Icon */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#EBC5CC] border border-white text-[#702D58] flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined fill text-[#702D58] text-[11px]">
                      favorite
                    </span>
                  </div>

                  {/* Clean Realistic Photo of Ribbon Gift Package */}
                  <div className="w-24 sm:w-28 h-20 sm:h-24 rounded-xl overflow-hidden bg-[#FAF3EC] border border-[#EBC5CC]/40 relative">
                    <img
                      src="/assets/gift-box-clean.png"
                      alt="Amora Gift Package with Silk Ribbon"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Bottom Label Banner */}
                  <div className="mt-1.5 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#34232F]">
                    <span className="material-symbols-outlined text-[13px] text-[#702D58]">
                      group
                    </span>
                    <span>Trusted by 500+ Brands</span>
                  </div>
                </div>
              </div>

              {/* ─── 2. HANDWRITTEN BRAND ACCENT (Upper Right above flowers & box): "Make it yours ♡" ─── */}
              <div
                className="absolute top-[8%] sm:top-[10%] lg:top-[12%] right-[4%] sm:right-[6%] lg:right-[6%] z-20 pointer-events-none select-none -rotate-6"
                style={{ transform: 'translateZ(20px)' }}
              >
                <span className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#C77F98] drop-shadow-sm font-normal">
                  Make it yours ♡
                </span>
              </div>

              {/* ─── 3. FLOATING GLASS CARD 2 (Lower Right on Silk below box): "Corporate Gifting - MOQ 36 Pieces →" ─── */}
              <div
                onClick={() => {
                  playTactileClick(1600, 0.04);
                  onExploreCorporate();
                }}
                title="Corporate Gifting Studio - Minimum Order Quantity 36 Pieces"
                className="absolute bottom-[10%] sm:bottom-[12%] lg:bottom-[14%] right-[2%] sm:right-[4%] lg:right-[4%] z-30 hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer group"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-white/95 backdrop-blur-lg border border-white shadow-[0_20px_40px_rgba(112,45,88,0.18)] flex items-center gap-3">
                  {/* Deep Plum Briefcase Icon Container */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#702D58] text-white flex items-center justify-center shadow-xs shrink-0 group-hover:bg-[#592345] transition-colors">
                    <span className="material-symbols-outlined text-[20px] text-[#EBC5CC]">
                      work
                    </span>
                  </div>

                  {/* Text Hierarchy */}
                  <div className="text-left pr-1">
                    <p className="text-xs sm:text-sm font-bold text-[#34232F] leading-tight">
                      Corporate Gifting
                    </p>
                    <p className="text-[10px] sm:text-xs text-[#76636D] font-medium mt-0.5">
                      MOQ 36 Pieces
                    </p>
                  </div>

                  {/* Arrow using Google Material Symbol */}
                  <span className="material-symbols-outlined text-[16px] text-[#702D58] transition-transform duration-200 group-hover:translate-x-1 ml-1">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════
            BOTTOM SECTION: Trust Bar (Left) + Circular Scroll Indicator (Right)
            Exact placement matching reference mockup
            ═════════════════════════════════════════════════════════════ */}
        <div className="mt-8 sm:mt-10 lg:mt-6 w-full flex items-center justify-between gap-4">
          
          {/* Frosted Glass Trust Bar */}
          <div className="backdrop-blur-xl rounded-full px-5 sm:px-8 py-3 sm:py-3.5 border shadow-[0_10px_35px_rgba(112,45,88,0.08)] flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-[13px] bg-white/92 border-white/90 text-[#34232F]">
            {/* Item 1: Premium Quality */}
            <div className="flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[#702D58] text-[18px]">
                diamond
              </span>
              <span className="text-[#34232F]">Premium Quality</span>
            </div>

            <div className="hidden xs:block w-px h-3.5 bg-current opacity-20" />

            {/* Item 2: On-Time Delivery */}
            <div className="flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[#702D58] text-[18px]">
                local_shipping
              </span>
              <span className="text-[#34232F]">On-Time Delivery</span>
            </div>

            <div className="hidden xs:block w-px h-3.5 bg-current opacity-20" />

            {/* Item 3: Dedicated Support */}
            <div className="flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[#702D58] text-[18px]">
                support_agent
              </span>
              <span className="text-[#34232F]">Dedicated Support</span>
            </div>

            <div className="hidden xs:block w-px h-3.5 bg-current opacity-20" />

            {/* Item 4: Bulk Order Ready */}
            <div className="flex items-center gap-2 font-medium">
              <span className="material-symbols-outlined text-[#702D58] text-[18px]">
                verified_user
              </span>
              <span className="text-[#34232F]">Bulk Order Ready</span>
            </div>
          </div>

          {/* Circular Scroll Down Indicator "↓" */}
          <button
            type="button"
            onClick={handleScrollDown}
            aria-label="Scroll down to Catalog and Collections"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border border-white bg-white/90 backdrop-blur-md shadow-md hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer z-30 group shrink-0"
          >
            <span className="material-symbols-outlined text-[#702D58] text-[20px] transition-transform duration-200 group-hover:translate-y-0.5">
              arrow_downward
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ParticleHero;
