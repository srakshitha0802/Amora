import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Box, MessageCircle, ExternalLink, Heart, MapPin, Award } from 'lucide-react';
import { BRAND_LOGO_URL, WHATSAPP_CATALOG_URL, buildWhatsAppUrl } from '../data/products';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === 'dark';

  // Smooth mouse tilt parallax for the physical showcase stage
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 10,
      y: x * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="relative w-full min-h-[92vh] flex items-center overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Warm Champagne Studio Glows */}
      <div
        className={`absolute top-1/4 left-1/12 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#6D2E58]/20' : 'bg-[#EBC6CF]/30'
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/12 w-[520px] h-[520px] rounded-full blur-[170px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#F3C69F]/14' : 'bg-[#F8F4EA]/80'
        }`}
      />

      {/* Main Grid Container */}
      <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ─── LEFT COLUMN: Humanised Editorial Brand Narrative ─── */}
          <div
            className={`lg:col-span-6 flex flex-col items-start text-left transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Tagline & Studio Origin Pill */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-xs ${
                  isDark
                    ? 'bg-white/5 border-white/15 text-[#EBC6CF]'
                    : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-[#C88DA0] fill-[#C88DA0]" />
                <span>A Little Thought. A Lot of Love.</span>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border ${
                  isDark ? 'border-white/10 text-white/60' : 'border-[#6D2E58]/15 text-[#584F5E] bg-white/60'
                }`}
              >
                <MapPin className="w-3 h-3 text-[#C88DA0]" />
                <span>Kalyan Studio · Est. June '25</span>
              </div>
            </div>

            {/* Brand Logo & Wordmark Lockup */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E5BE6C] shadow-md shadow-[#6D2E58]/20 bg-[#F8F4EA] p-0.5 shrink-0">
                <img src={BRAND_LOGO_URL} alt="Amora.co" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-3xl sm:text-4xl font-semibold leading-none tracking-tight ${
                    isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'
                  }`}
                >
                  amora<span className="text-[#C88DA0]">.co</span>
                </span>
                <span
                  className={`italic font-serif text-xs sm:text-sm tracking-widest mt-1 ${
                    isDark ? 'text-[#D8C6E6]' : 'text-[#6D2E58]'
                  }`}
                >
                  prints, &amp; pretty things
                </span>
              </div>
            </div>

            {/* Main Editorial Headline */}
            <h1
              className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.04] mb-5 ${
                isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'
              }`}
            >
              Thoughtfully personalised. <br />
              <em className="italic text-[#C88DA0] font-normal">Beautifully branded.</em>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-sm sm:text-base max-w-lg leading-relaxed mb-8 ${
                isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
              }`}
            >
              Amora is a creative studio for personalised gifts, custom merchandise and corporate gifting.
              From a single tactile polaroid tucked into a wax-sealed letter to 500-piece company onboarding kits — thoughtfully crafted in our Kalyan studio.
            </p>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap gap-3.5 sm:gap-4 items-center mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1600, 0.04);
                  onExploreCorporate();
                }}
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] border border-[#C88DA0]/40"
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
                className={`rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 hover:-translate-y-0.5 cursor-pointer border ${
                  isDark
                    ? 'border-white/20 hover:bg-white/10 text-[#F8F4EA]'
                    : 'bg-white border-[#6D2E58]/25 hover:bg-[#F8F4EA] text-[#2E2A32] shadow-sm'
                }`}
              >
                <span>Personal Keepsakes (No MOQ)</span>
                <ArrowRight className="w-4 h-4 text-[#6D2E58]" />
              </button>

              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1400, 0.03)}
                className={`rounded-full px-4 py-2.5 text-xs font-medium transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 border ${
                  isDark
                    ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
                    : 'border-emerald-600/30 text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>WhatsApp Catalogue</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Trust Badges */}
            <div
              className={`grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t w-full max-w-lg text-[11px] sm:text-xs ${
                isDark ? 'border-white/10 text-[#D8C6E6]' : 'border-[#6D2E58]/20 text-[#584F5E]'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C88DA0] shrink-0" />
                <span>No MOQ on Keepsakes</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Box className="w-4 h-4 text-[#EBC6CF] shrink-0" />
                <span>MOQ: 36+ Corporate</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>1,000+ Orders Done</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Humanised Champagne Keepsake Medallion & Scrapbook Stage ─── */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`lg:col-span-6 w-full flex items-center justify-center transition-all duration-1000 delay-150 select-none ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ perspective: '1200px' }}
          >
            {/* The Main Champagne Display Card */}
            <div
              className={`relative w-full max-w-[490px] h-[490px] sm:h-[530px] rounded-[36px] p-6 sm:p-8 flex items-center justify-center overflow-hidden transition-transform duration-200 ease-out border shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-b from-[#241C27] via-[#1B151F] to-[#140F17] border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
                  : 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE0] border-[#E5BE6C]/35 shadow-[0_25px_60px_rgba(109,46,88,0.1)]'
              }`}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Subtle Champagne Ambient Backlight */}
              <div
                className="absolute inset-0 rounded-full blur-3xl pointer-events-none opacity-50"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(243,198,159,0.35) 0%, rgba(200,141,160,0.15) 55%, transparent 75%)',
                  transform: 'translateZ(-20px)',
                }}
              />

              {/* ─── HAND-DRAWN PREMIUM DOODLES ─── */}
              {/* Doodle 1: Sparkle Stars (Top Left) */}
              <div className="absolute top-8 left-8 pointer-events-none text-[#E5BE6C] opacity-80" style={{ transform: 'translateZ(20px)' }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M20 0 L23 15 L38 20 L23 25 L20 40 L17 25 L2 20 L17 15 Z" fill="currentColor" opacity="0.85" />
                  <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="32" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Doodle 2: Handcrafted Botanical Jasmine Vine (Top Right) */}
              <div className="absolute top-6 right-6 pointer-events-none text-[#C88DA0] opacity-75" style={{ transform: 'translateZ(15px)' }}>
                <svg width="65" height="50" viewBox="0 0 65 50" fill="none">
                  <path d="M5 45 Q 25 20, 58 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M30 26 C 24 20, 20 28, 28 32 Z" fill="currentColor" opacity="0.7" />
                  <path d="M45 16 C 40 10, 36 18, 44 22 Z" fill="currentColor" opacity="0.7" />
                  <circle cx="58" cy="8" r="3" fill="#E5BE6C" />
                </svg>
              </div>

              {/* Doodle 3: Hand-Drawn Ribbon Loop & Heart (Bottom Left) */}
              <div className="absolute bottom-8 left-8 pointer-events-none text-[#C88DA0] opacity-80" style={{ transform: 'translateZ(25px)' }}>
                <svg width="55" height="40" viewBox="0 0 55 40" fill="none">
                  <path d="M10 32 C 10 20, 22 15, 26 25 C 30 15, 42 20, 42 32 C 42 38, 26 40, 26 40 C 26 40, 10 38, 10 32 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M26 10 Q 30 4, 38 7" stroke="#E5BE6C" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* ─── CORNER TACTILE CHIP 1: Executive Welcome Kit Preview (Top Right) ─── */}
              <div
                onClick={onExploreCorporate}
                className="absolute top-12 right-6 z-30 hidden sm:flex items-center gap-3 p-2.5 rounded-2xl bg-white/95 dark:bg-[#1C1621]/95 border border-[#E5BE6C]/40 shadow-xl cursor-pointer hover:scale-105 transition-transform"
                style={{ transform: 'translateZ(35px)' }}
              >
                <img
                  src="/assets/catalog/corporate-merchandise/executive-onboarding-kit.jpg"
                  alt="Executive Onboarding Kit"
                  className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#6D2E58]/20"
                />
                <div className="text-left pr-1.5">
                  <span className="text-[9px] uppercase tracking-wider bg-[#6D2E58] text-[#F8F4EA] px-1.5 py-0.5 rounded font-bold">
                    Main Highlight
                  </span>
                  <p className="text-[11px] font-bold font-serif leading-tight mt-0.5">Executive Kit</p>
                  <span className="text-[10px] text-[#6D2E58] dark:text-[#EBC6CF] font-mono font-semibold">
                    ₹1,199 · MOQ 36
                  </span>
                </div>
              </div>

              {/* ─── CORNER TACTILE CHIP 2: Handcrafted Polaroid (Bottom Left) ─── */}
              <div
                onClick={onExplorePersonal}
                className="absolute bottom-10 left-6 z-30 hidden sm:flex items-center gap-3 p-2.5 rounded-2xl bg-white/95 dark:bg-[#1C1621]/95 border border-[#C88DA0]/40 shadow-xl cursor-pointer hover:scale-105 transition-transform rotate-[-3deg]"
                style={{ transform: 'translateZ(35px)' }}
              >
                {/* Washi Tape Strip on Polaroid */}
                <div
                  className="absolute -top-2 left-6 w-12 h-4 opacity-80 rotate-[3deg] pointer-events-none"
                  style={{
                    background: 'rgba(200,141,160,0.85)',
                    clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80"
                  alt="Polaroid Keepsake"
                  className="w-11 h-11 rounded-xl object-cover shrink-0 border border-current/10"
                />
                <div className="text-left pr-1">
                  <p className="text-[11px] font-bold font-serif leading-tight">Matte Polaroids</p>
                  <span className="text-[10px] text-[#25D366] font-mono font-semibold">
                    From ₹125 · No MOQ
                  </span>
                </div>
              </div>

              {/* ─── CENTERPIECE: OFFICIAL AMORA LOGO CHAMPAGNE MEDALLION ─── */}
              <div
                className="relative flex items-center justify-center transition-transform duration-75"
                style={{
                  transform: 'translateZ(25px)',
                }}
              >
                {/* Champagne Gold Outer Bezel Ring */}
                <div
                  className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full p-2.5 flex items-center justify-center shadow-2xl transition-all"
                  style={{
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(243,198,159,0.7) 0%, rgba(109,46,88,0.5) 50%, rgba(229,190,108,0.8) 100%)'
                      : 'linear-gradient(135deg, #FFF6E5 0%, #E5BE6C 40%, #C5963E 70%, #FDE39D 100%)',
                    boxShadow: isDark
                      ? '0 0 60px rgba(243,198,159,0.35), 0 25px 50px rgba(0,0,0,0.6)'
                      : '0 0 50px rgba(229,190,108,0.35), 0 20px 45px rgba(109,46,88,0.15)',
                  }}
                >
                  {/* Subtle Inner Ring Inlay */}
                  <div
                    className="w-full h-full rounded-full p-1.5 flex items-center justify-center shadow-inner"
                    style={{
                      background: isDark
                        ? 'linear-gradient(135deg, #2A1F2D 0%, #17111A 100%)'
                        : 'linear-gradient(135deg, #FFFFFF 0%, #FAF4EB 100%)',
                    }}
                  >
                    {/* The Official Amora Logo Disc */}
                    <div className="w-full h-full rounded-full overflow-hidden relative shadow-lg">
                      <img
                        src="/assets/amora-logo-official.jpg"
                        alt="Amora.co Official Logo"
                        className="w-full h-full object-cover scale-[1.06] select-none pointer-events-none rounded-full"
                        draggable={false}
                      />

                      {/* Dynamic Specular Glass Glint across the logo face */}
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-75"
                        style={{
                          background: `linear-gradient(${125 + tilt.y * 1.5}deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.06) 38%, transparent 65%)`,
                          transform: `translate(${tilt.y * 1.2}px, ${-tilt.x * 1.2}px)`,
                        }}
                      />

                      {/* Delicate Tactile Glass Reflection Curvature */}
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          boxShadow: isDark
                            ? 'inset 0 1px 4px rgba(255,255,255,0.4), inset 0 -3px 8px rgba(0,0,0,0.4)'
                            : 'inset 0 1px 4px rgba(255,255,255,0.7), inset 0 -3px 8px rgba(118,87,123,0.15)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Champagne Seal Inscription */}
              <div
                className="absolute bottom-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider"
                style={{
                  background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.85)',
                  color: isDark ? '#E5BE6C' : '#6D2E58',
                  border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(109,46,88,0.15)',
                  transform: 'translateZ(30px)',
                }}
              >
                <Sparkles className="w-3 h-3 text-[#E5BE6C]" />
                <span>Champagne Edition · Studio Core</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParticleHero;
