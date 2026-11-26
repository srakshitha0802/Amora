import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle, ExternalLink, Heart, ChevronDown } from 'lucide-react';
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
  theme = 'light',
}) => {
  const [mounted, setMounted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === 'dark';

  // Smooth mouse tilt parallax for the 3D physical stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 8,
      y: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleScrollDown = () => {
    playTactileClick(1200, 0.03);
    const orbitSection = document.getElementById('orbit-showcase') || document.getElementById('keepsakes') || document.getElementById('shop');
    orbitSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className={`relative w-full min-h-[96vh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-10 transition-colors duration-500 ${
        isDark
          ? 'bg-gradient-to-br from-[#1C1621] via-[#16121B] to-[#120E15]'
          : 'bg-gradient-to-br from-[#FAF2EE] via-[#F8EDEA] to-[#F5E2E6]'
      }`}
    >
      {/* ─── BOTANICAL PALM FROND SHADOW (Top-Left Sunlit Cast matching reference mockup) ─── */}
      <div
        className={`absolute -top-10 -left-10 w-[380px] sm:w-[480px] lg:w-[580px] pointer-events-none select-none transition-opacity duration-700 z-0 ${
          isDark ? 'opacity-[0.06] mix-blend-screen' : 'opacity-[0.22] mix-blend-multiply'
        }`}
      >
        <svg viewBox="0 0 500 500" fill="none" className="w-full h-auto text-[#4A3B44]">
          {/* Palm Frond 1 */}
          <path
            d="M 20 -40 C 90 40, 220 120, 360 210 M 80 15 C 150 15, 230 45, 290 85 M 120 45 C 190 55, 270 95, 330 145 M 160 80 C 230 100, 310 145, 370 205 M 200 120 C 270 145, 340 195, 395 260 M 240 160 C 300 190, 365 245, 410 315"
            stroke="currentColor"
            strokeWidth="18"
            strokeLinecap="round"
            filter="blur(16px)"
          />
          {/* Palm Frond 2 */}
          <path
            d="M -30 60 C 60 120, 180 230, 260 380 M 30 100 C 90 120, 160 180, 210 250 M 70 140 C 130 170, 200 235, 245 310 M 110 190 C 165 225, 230 300, 270 380"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
            filter="blur(14px)"
          />
          {/* Palm Frond 3 Accent */}
          <path
            d="M 40 -60 C 110 10, 200 80, 280 160 M 90 0 C 150 15, 220 50, 270 95"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            filter="blur(12px)"
          />
        </svg>
      </div>

      {/* Warm Ambient Glows */}
      <div
        className={`absolute top-1/4 left-1/10 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#6D2E58]/20' : 'bg-[#EBC6CF]/40'
        }`}
      />
      <div
        className={`absolute bottom-1/5 right-1/10 w-[480px] h-[480px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#C88DA0]/10' : 'bg-[#F8F4EA]/90'
        }`}
      />

      {/* ─── MAIN HERO CONTENT CONTAINER ─── */}
      <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ═════════════════════════════════════════════════════════════
              LEFT COLUMN: Editorial Typography, Taglines & CTAs
              ═════════════════════════════════════════════════════════════ */}
          <div
            className={`lg:col-span-6 flex flex-col items-start text-left transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Tagline Pill: ♥ A LITTLE THOUGHT. A LOT OF LOVE. */}
            <div className="mb-5 sm:mb-6">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider border shadow-xs transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-[#EBC6CF]'
                    : 'bg-white/80 backdrop-blur-md border-[#6D2E58]/15 text-[#6D2E58]'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-[#C88DA0] fill-[#C88DA0]" />
                <span className="tracking-[0.16em]">A Little Thought. A Lot of Love.</span>
              </div>
            </div>

            {/* Editorial Headline:
                Thoughtfully
                personalised.
                Beautifully branded. (with underline flourish)
            */}
            <h1
              className={`font-serif text-[42px] sm:text-[62px] lg:text-[72px] font-normal tracking-tight leading-[1.05] mb-6 ${
                isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'
              }`}
            >
              Thoughtfully<br />
              personalised.<br />
              <span className="relative inline-block italic font-normal text-[#C88DA0]">
                Beautifully branded.
                {/* Handcrafted Curved Underline Stroke Flashing Underneath */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-3 sm:h-4 text-[#C88DA0]"
                  viewBox="0 0 320 18"
                  fill="none"
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

            {/* Subtitle Paragraph */}
            <p
              className={`text-sm sm:text-base max-w-lg leading-relaxed mb-8 font-normal ${
                isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
              }`}
            >
              Amora is a creative studio for personalised gifts, custom merchandise and corporate gifting.
              From a single tactile polaroid tucked into a wax-sealed letter to 500-piece company onboarding kits — thoughtfully crafted in our Kalyan studio.
            </p>

            {/* CTAs: Corporate Merchandise (MOQ 36) + Personal Keepsakes (No MOQ) */}
            <div className="flex flex-wrap gap-3.5 sm:gap-4 items-center mb-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1600, 0.04);
                  onExploreCorporate();
                }}
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 shadow-lg shadow-[#6D2E58]/20 hover:-translate-y-0.5 cursor-pointer bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#582447] border border-[#C88DA0]/40"
              >
                <span>Corporate Merchandise (MOQ 36)</span>
                <ArrowRight className="w-4 h-4 text-[#F8F4EA]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1800, 0.04);
                  onExplorePersonal();
                }}
                className={`rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 hover:-translate-y-0.5 cursor-pointer border backdrop-blur-sm ${
                  isDark
                    ? 'border-white/20 hover:bg-white/10 text-[#F8F4EA]'
                    : 'bg-white/80 border-[#6D2E58]/25 hover:bg-white text-[#2E2A32] shadow-xs'
                }`}
              >
                <span>Personal Keepsakes (No MOQ)</span>
                <ArrowRight className="w-4 h-4 text-[#6D2E58]" />
              </button>
            </div>

            {/* Tertiary Action: WhatsApp Catalogue */}
            <div className="mb-2">
              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1400, 0.03)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 border shadow-2xs ${
                  isDark
                    ? 'border-emerald-500/30 text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40'
                    : 'border-emerald-600/25 text-[#1B7339] bg-[#E3F6EB] hover:bg-[#D4EFE0]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp Catalogue</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════════
              RIGHT COLUMN: The Exact Physical 3D Showcase Stage
              ═════════════════════════════════════════════════════════════ */}
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`lg:col-span-6 w-full flex items-center justify-center transition-all duration-1000 delay-150 select-none relative ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ perspective: '1200px' }}
          >
            {/* Interactive 3D Stage Composition */}
            <div
              className="relative w-full max-w-[560px] flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Clean Cropped Rendered Stage from Client Reference */}
              <div className="relative w-full rounded-3xl overflow-visible">
                <img
                  src="/assets/hero-stage-clean.png"
                  alt="Amora Product Stage - Mug, Bottle, Gift Box on Terrazzo Podium with Silk Drapery"
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl rounded-3xl"
                  draggable={false}
                />

                {/* ─── INTERACTIVE CLICK HOTSPOTS OVER STAGE ELEMENTS ─── */}
                
                {/* 1. Floating Polaroid Top-Left: "Trusted by 500+ Brands" */}
                <div
                  onClick={() => {
                    playTactileClick(1500, 0.03);
                    onExploreCorporate();
                  }}
                  title="Click to view Corporate Gifting & Client Showcase"
                  className="absolute top-[16%] left-[4%] w-[32%] h-[38%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#C88DA0]/50 transition-all z-20 group"
                  aria-label="Trusted by 500+ Brands"
                >
                  <span className="sr-only">Explore Brands & Corporate Gifting</span>
                </div>

                {/* 2. Floating Frosted Card Bottom-Right: "Corporate Gifting - MOQ 36 Pieces →" */}
                <div
                  onClick={() => {
                    playTactileClick(1600, 0.04);
                    onExploreCorporate();
                  }}
                  title="Corporate Gifting - MOQ 36 Pieces"
                  className="absolute bottom-[8%] right-[4%] w-[38%] h-[20%] rounded-2xl cursor-pointer hover:ring-2 hover:ring-[#6D2E58]/50 transition-all z-20 group"
                  aria-label="Corporate Gifting MOQ 36 Pieces"
                >
                  <span className="sr-only">Corporate Gifting MOQ 36 Pieces</span>
                </div>

                {/* 3. Bottom Right Circular Scroll Down Button "↓" */}
                <button
                  type="button"
                  onClick={handleScrollDown}
                  aria-label="Scroll down to 3D Orbit and Catalog"
                  className={`absolute -bottom-2 right-2 sm:right-4 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer z-30 ${
                    isDark
                      ? 'bg-black/50 border-white/20 text-[#F8F4EA] hover:bg-black/70'
                      : 'bg-white/80 border-[#6D2E58]/20 text-[#2E2A32] hover:bg-white shadow-[0_4px_16px_rgba(109,46,88,0.12)]'
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-[#6D2E58] dark:text-[#EBC6CF] animate-bounce" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════
            BOTTOM FEATURE BAR (Matching Reference Mockup Exactly)
            [💎 Premium Quality] [🚚 On-Time Delivery] [🎧 Dedicated Support] [🛡️ Bulk Order Ready]
            ═════════════════════════════════════════════════════════════ */}
        <div className="mt-10 sm:mt-12 w-full max-w-4xl mx-auto">
          <div
            className={`backdrop-blur-md rounded-full px-5 sm:px-8 py-3 sm:py-3.5 border shadow-sm flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-[13px] transition-colors ${
              isDark
                ? 'bg-[#251D2A]/80 border-white/10 text-[#D8C6E6] shadow-black/40'
                : 'bg-white/75 border-white/80 text-[#584F5E] shadow-[0_8px_24px_rgba(109,46,88,0.06)]'
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              <span className="text-sm">💎</span>
              <span className={isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'}>Premium Quality</span>
            </div>

            <div className="hidden xs:block w-px h-3.5 bg-current opacity-20" />

            <div className="flex items-center gap-2 font-medium">
              <span className="text-sm">🚚</span>
              <span className={isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'}>On-Time Delivery</span>
            </div>

            <div className="hidden xs:block w-px h-3.5 bg-current opacity-20" />

            <div className="flex items-center gap-2 font-medium">
              <span className="text-sm">🎧</span>
              <span className={isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'}>Dedicated Support</span>
            </div>

            <div className="hidden xs:block w-px h-3.5 bg-current opacity-20" />

            <div className="flex items-center gap-2 font-medium">
              <span className="text-sm">🛡️</span>
              <span className={isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'}>Bulk Order Ready</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ParticleHero;
