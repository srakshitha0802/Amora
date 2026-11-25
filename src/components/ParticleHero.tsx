import React, { useState, useMemo, useEffect } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Box, MessageCircle, ExternalLink, Heart } from 'lucide-react';
import { BRAND_LOGO_URL, WHATSAPP_CATALOG_URL, buildWhatsAppUrl } from '../data/products';
import { playTactileClick } from '../utils/audio';
import CrystalizedBall, { type CrystalizedBallPreset } from './CrystalizedBall';
import CrystallineEmblemCore, { type CrystallineFinish } from './CrystallineEmblemCore';

/* ─── Curated Amora Brand Colorways & Finishes for the 3D Movable Object ─── */
interface KeepsakeConfig {
  id: CrystallineFinish;
  label: string;
  preset: CrystalizedBallPreset;
  darkColor: string;
  lightColor: string;
  dotColor: string;
  fill: number;
  crackle: number;
  dustSpeed: number;
  description: string;
}

const KEEPSAKE_CONFIGS: KeepsakeConfig[] = [
  {
    id: 'rose-gold',
    label: 'Rose-Gold',
    preset: 'plasma',
    darkColor: '#C88DA0',
    lightColor: '#C88DA0',
    dotColor: '#C88DA0',
    fill: 0.52,
    crackle: 0.85,
    dustSpeed: 1.1,
    description: 'Mirror Rose-Gold Bezel with Blush Plasma Sparks',
  },
  {
    id: 'royal-plum',
    label: 'Royal Plum',
    preset: 'nebula',
    darkColor: '#6D2E58',
    lightColor: '#6D2E58',
    dotColor: '#6D2E58',
    fill: 0.48,
    crackle: 0.95,
    dustSpeed: 1.2,
    description: 'Royal Plum Enamel with Amora Cosmic Dust',
  },
  {
    id: 'champagne',
    label: 'Champagne',
    preset: 'solar',
    darkColor: '#F8F4EA',
    lightColor: '#EBC6CF',
    dotColor: '#F8F4EA',
    fill: 0.55,
    crackle: 0.75,
    dustSpeed: 1.0,
    description: 'Amber Gold Bezel with Warm Solar Halo',
  },
  {
    id: 'ceramic',
    label: 'Ceramic',
    preset: 'frost',
    darkColor: '#D8C6E6',
    lightColor: '#D8C6E6',
    dotColor: '#D8C6E6',
    fill: 0.60,
    crackle: 0.45,
    dustSpeed: 0.85,
    description: 'Velvet Pearl Ceramic with Frost Silver Stardust',
  },
];

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
  const [selectedFinish, setSelectedFinish] = useState<CrystallineFinish>('royal-plum');
  const [isHovered, setIsHovered] = useState(false);
  const [heroView, setHeroView] = useState<'3d-object' | 'products'>('3d-object');

  // Product suite state
  const [brandText, setBrandText] = useState('ACME CORP');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === 'dark';

  const currentConfig = useMemo(
    () => KEEPSAKE_CONFIGS.find((c) => c.id === selectedFinish) || KEEPSAKE_CONFIGS[1],
    [selectedFinish]
  );

  const handleFinishChange = (id: CrystallineFinish) => {
    playTactileClick(1600, 0.035);
    setSelectedFinish(id);
  };

  const handleWhatsAppCustomise3D = () => {
    playTactileClick(1700, 0.04);
    const msg = `Hello Amora! I am interacting with your 3D Keepsake Core on the website and would like to order a custom gift in the ${currentConfig.label} finish.`;
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Studio Ambient Glows */}
      <div
        className={`absolute top-1/4 left-1/6 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#6D2E58]/18' : 'bg-[#C88DA0]/16'
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/6 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#C88DA0]/12' : 'bg-[#6D2E58]/10'
        }`}
      />

      {/* Main Grid Container */}
      <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: Editorial Brand Narrative ─── */}
          <div
            className={`lg:col-span-6 flex flex-col items-start text-left transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Live Studio Status Pill */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider mb-6 border shadow-xs transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/15 text-[#EBC6CF]'
                  : 'bg-white border-[#6D2E58]/20 text-[#6D2E58]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
              <span>Kalyan Studio Live · Customised Prints &amp; Merchandise</span>
            </div>

            {/* Brand Logo & Wordmark Lockup */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C88DA0] shadow-md shadow-[#6D2E58]/20 bg-[#F8F4EA] p-0.5 shrink-0">
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
              className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.02] mb-5 ${
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
              A creative studio for personalised gifts, custom merchandise and corporate gifting.
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
                <span>Enquire for Bulk Orders (MOQ 36)</span>
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
                <span>WhatsApp Catalogue (28 Products)</span>
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
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Kalyan Studio Dispatch</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: 3D Interactive Movable Object Studio Stage ─── */}
          <div
            className={`lg:col-span-6 w-full flex flex-col items-center transition-all duration-1000 delay-200 select-none ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* View Switcher Pill (3D Interactive Core vs Product Suite) */}
            <div
              className={`w-full max-w-md p-1.5 rounded-full border mb-4 flex items-center justify-between gap-1 shadow-md transition-colors ${
                isDark
                  ? 'bg-[#26202A] border-white/15'
                  : 'bg-white border-[#6D2E58]/20 shadow-[0_4px_20px_rgba(109,46,88,0.08)]'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1500, 0.03);
                  setHeroView('3d-object');
                }}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  heroView === '3d-object'
                    ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md font-bold'
                    : isDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-[#584F5E] hover:text-[#2E2A32]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Interactive Keepsake</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1500, 0.03);
                  setHeroView('products');
                }}
                className={`flex-1 py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  heroView === 'products'
                    ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md font-bold'
                    : isDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-[#584F5E] hover:text-[#2E2A32]'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Product Studio Suite</span>
              </button>
            </div>

            {/* Central Display Card */}
            {heroView === '3d-object' ? (
              /* ─── 3D MOVABLE INTERACTIVE OBJECT ─── */
              <div
                className={`w-full h-[480px] sm:h-[530px] rounded-3xl border p-4 sm:p-6 transition-all duration-500 shadow-2xl relative flex flex-col justify-between items-center overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-b from-[#26202A] to-[#1A161E] border-white/15'
                    : 'bg-gradient-to-b from-white to-[#FDFBF7] border-[#6D2E58]/20 shadow-[0_20px_50px_rgba(109,46,88,0.12)]'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between w-full relative z-20 px-2">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider border shadow-xs ${
                      isDark
                        ? 'bg-black/40 border-white/15 text-[#EBC6CF]'
                        : 'bg-white border-[#6D2E58]/20 text-[#6D2E58]'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C88DA0]" />
                    <span>3D Amora Emblem Core · Drag &amp; Gyro Tilt</span>
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider opacity-70">
                    Live 3D Renderer
                  </span>
                </div>

                {/* Corner Floating Real Product Chip: Executive Onboarding Kit (Main Highlight) (Top-Right) */}
                <div
                  onClick={onExploreCorporate}
                  className="absolute top-14 right-3 z-20 hidden sm:flex items-center gap-2.5 p-2 rounded-2xl bg-white/95 dark:bg-[#1A161E]/95 border border-[#C88DA0]/40 shadow-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src="/assets/catalog/corporate-merchandise/executive-onboarding-kit.jpg"
                    alt="Executive Onboarding Kit"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-[#6D2E58]/20"
                  />
                  <div className="text-left pr-1">
                    <div className="flex items-center gap-1">
                      <span className="text-[8px] uppercase tracking-wider bg-[#6D2E58] text-[#F8F4EA] px-1.5 py-0.2 rounded font-bold">Top Highlight</span>
                    </div>
                    <p className="text-[10px] font-bold font-serif leading-tight mt-0.5">Executive Kit</p>
                    <span className="text-[9px] text-[#6D2E58] dark:text-[#C88DA0] font-mono font-semibold">₹1,199 · MOQ 36</span>
                  </div>
                </div>

                {/* Corner Floating Real Product Chip: Polaroid (Bottom-Left) */}
                <div
                  onClick={onExplorePersonal}
                  className="absolute bottom-20 left-3 z-20 hidden sm:flex items-center gap-2.5 p-2 rounded-2xl bg-white/95 dark:bg-[#1A161E]/95 border border-[#6D2E58]/20 shadow-xl cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80"
                    alt="Polaroid Keepsake"
                    className="w-10 h-10 rounded-xl object-cover shrink-0"
                  />
                  <div className="text-left pr-1">
                    <p className="text-[10px] font-bold font-serif leading-tight">Matte Polaroids</p>
                    <span className="text-[9px] text-[#25D366] font-mono font-semibold">From ₹125 · No MOQ</span>
                  </div>
                </div>

                {/* Central Free-Floating 3D Movable Object */}
                <div
                  className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Layer 1: 3D Amora Emblem Core with Dynamic Parallax Tilt */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <CrystallineEmblemCore
                      finish={selectedFinish}
                      theme={theme}
                      isInteracting={isHovered}
                    />
                  </div>

                  {/* Layer 2: 3D Swirling Stardust & Interactive Cursor Halo */}
                  <div className="w-full h-full relative pointer-events-auto z-10">
                    <CrystalizedBall
                      key={`keepsake-${currentConfig.id}-${theme}`}
                      preset={currentConfig.preset}
                      color={isDark ? currentConfig.darkColor : currentConfig.lightColor}
                      theme={theme}
                      size={0.78}
                      crackle={currentConfig.crackle}
                      fill={currentConfig.fill}
                      interactive={true}
                      hoverStrength={0.85}
                      dustSpeed={currentConfig.dustSpeed}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Bottom Material & Aura Dock */}
                <div className="relative z-20 w-full flex flex-col items-center gap-2 mt-auto">
                  <div
                    className={`w-full max-w-sm p-1.5 rounded-full border flex items-center justify-between gap-1 shadow-lg ${
                      isDark
                        ? 'bg-black/70 border-white/15 shadow-black/40'
                        : 'bg-white/95 border-[#6D2E58]/20 shadow-[0_8px_24px_rgba(109,46,88,0.12)]'
                    }`}
                  >
                    {KEEPSAKE_CONFIGS.map((item) => {
                      const isSelected = selectedFinish === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleFinishChange(item.id)}
                          className={`flex-1 py-1.5 px-2 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md font-bold'
                              : isDark
                              ? 'text-white/70 hover:text-white hover:bg-white/5'
                              : 'text-[#584F5E] hover:text-[#2E2A32] hover:bg-[#6D2E58]/5'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border shrink-0"
                            style={{
                              backgroundColor: item.dotColor,
                              borderColor: isSelected ? '#FFFFFF' : 'rgba(128,128,128,0.4)',
                            }}
                          />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] tracking-wider font-medium ${
                        isDark ? 'text-white/60' : 'text-[#584F5E]'
                      }`}
                    >
                      Drag in 3D to swirl stardust · Tilt cursor for perspective
                    </span>
                    <button
                      type="button"
                      onClick={handleWhatsAppCustomise3D}
                      className="text-[10px] font-bold text-[#6D2E58] dark:text-[#C88DA0] hover:underline cursor-pointer"
                    >
                      Order this finish ↗
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ─── STUDIO PRODUCT SUITE (Real Photography Showcase) ─── */
              <div
                className={`w-full rounded-3xl border p-6 sm:p-8 transition-all duration-500 shadow-2xl relative overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-b from-[#26202A] to-[#1A161E] border-white/15'
                    : 'bg-gradient-to-b from-white to-[#FDFBF7] border-[#6D2E58]/20 shadow-[0_20px_50px_rgba(109,46,88,0.1)]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6D2E58] dark:text-[#C88DA0]">
                    Real Studio Products · Kalyan Workshop
                  </span>
                  <span className="text-[11px] font-semibold text-[#25D366]">MOQ: 36 pcs</span>
                </div>

                {/* 3 Real Product Photo Showcase */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="rounded-2xl overflow-hidden border border-current/10 aspect-square relative group">
                    <img
                      src="/assets/catalog/corporate-merchandise/sipper-bottle-600ml.jpg"
                      alt="Sipper Bottle"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/75 text-[10px] font-bold text-white text-center">
                      Sipper Bottle · ₹350
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-current/10 aspect-square relative group">
                    <img
                      src="/assets/catalog/corporate-merchandise/coffee-mug.jpg"
                      alt="Ceramic Mug"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/75 text-[10px] font-bold text-white text-center">
                      Ceramic Mug · ₹199
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-current/10 aspect-square relative group">
                    <img
                      src="/assets/catalog/corporate-merchandise/keyboard-mat.jpg"
                      alt="Extended Desk Mat"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/75 text-[10px] font-bold text-white text-center">
                      Desk Mat · ₹299
                    </div>
                  </div>
                </div>

                {/* Interactive Brand Customiser Input */}
                <div className="mb-4">
                  <label
                    htmlFor="preview-brand-input"
                    className="block text-xs font-semibold mb-1 opacity-80"
                  >
                    Preview Your Company / Team Branding:
                  </label>
                  <input
                    id="preview-brand-input"
                    type="text"
                    value={brandText}
                    maxLength={24}
                    onChange={(e) => setBrandText(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border border-current/20 bg-black/5 dark:bg-black/30 focus:outline-none"
                    placeholder="ENTER YOUR COMPANY NAME"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-current/10">
                  <div className="text-left text-[11px] opacity-75">
                    <p className="font-semibold">Custom text: "{brandText}"</p>
                    <p>Free digital mockup proof within 24h</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick(1700, 0.04);
                      window.open(
                        buildWhatsAppUrl(
                          `Hello Amora! I would like to request a corporate merchandise quote for "${brandText}". MOQ: 36 pieces.`
                        ),
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }}
                    className="px-4 py-2 rounded-full bg-[#6D2E58] hover:bg-[#8E4474] text-[#F8F4EA] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Get Quote on WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParticleHero;
