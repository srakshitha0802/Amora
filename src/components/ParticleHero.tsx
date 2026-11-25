import React, { useRef, useMemo, useEffect, useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Box, MessageCircle } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';
import { HeroHeadlineRotator } from './HeroCraftWidget';
import { playTactileClick } from '../utils/audio';
import CrystalizedBall, { type CrystalizedBallPreset } from './CrystalizedBall';
import CrystallineEmblemCore, { type CrystallineFinish } from './CrystallineEmblemCore';

/* ─── Curated Amora Brand Colorways & Finishes for the Unified Crystalline Keepsake ─── */
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
    darkColor: '#E3A4AE',
    lightColor: '#C4576B',
    dotColor: '#D87A6E',
    fill: 0.52,
    crackle: 0.85,
    dustSpeed: 1.1,
    description: 'Mirror Rose-Gold Bezel with Blush Plasma Sparks'
  },
  {
    id: 'royal-plum',
    label: 'Royal Plum',
    preset: 'nebula',
    darkColor: '#9B6EA8',
    lightColor: '#54295D',
    dotColor: '#6E3B78',
    fill: 0.48,
    crackle: 0.95,
    dustSpeed: 1.2,
    description: 'Royal Plum Enamel with Celestial Cosmic Dust'
  },
  {
    id: 'champagne',
    label: 'Champagne',
    preset: 'solar',
    darkColor: '#F3C69F',
    lightColor: '#B26F2D',
    dotColor: '#F3C69F',
    fill: 0.55,
    crackle: 0.75,
    dustSpeed: 1.0,
    description: 'Amber Gold Bezel with Luminous Solar Halo'
  },
  {
    id: 'ceramic',
    label: 'Ceramic',
    preset: 'frost',
    darkColor: '#CBE4F9',
    lightColor: '#2B6CB0',
    dotColor: '#94A3B8',
    fill: 0.60,
    crackle: 0.45,
    dustSpeed: 0.85,
    description: 'Velvet Pearl Ceramic with Frost Silver Stardust'
  }
];

/* ─── Main Hero Component (Clean, Container-Free, Free-Floating Crystalline Keepsake) ─── */
interface ParticleHeroProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  theme?: 'dark' | 'light';
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  onExplorePersonal,
  onExploreCorporate,
  theme = 'dark',
}) => {
  const [mounted, setMounted] = useState(false);
  const [selectedFinish, setSelectedFinish] = useState<CrystallineFinish>('rose-gold');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const isDark = theme === 'dark';

  const currentConfig = useMemo(
    () => KEEPSAKE_CONFIGS.find((c) => c.id === selectedFinish) || KEEPSAKE_CONFIGS[0],
    [selectedFinish]
  );

  const handleFinishChange = (id: CrystallineFinish) => {
    playTactileClick(1600, 0.035);
    setSelectedFinish(id);
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Subtle luxury ambient glows */}
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-700 ${
        isDark ? 'bg-[#76577B]/16' : 'bg-[#E3A4AE]/12'
      }`} />
      <div className={`absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-700 ${
        isDark ? 'bg-[#E3A4AE]/14' : 'bg-[#76577B]/8'
      }`} />

      {/* Main Container: Editorial Left Column & Container-Free Floating 3D Right Column */}
      <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: Uncluttered Luxury Editorial Identity ─── */}
          <div
            className={`lg:col-span-6 flex flex-col items-start text-left transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Live Studio Status Pill */}
            <div className={`inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider mb-6 border shadow-xs ${
              isDark
                ? 'liquid-glass border-white/15 text-[#E3A4AE]'
                : 'bg-white border-[#76577B]/25 text-[#76577B]'
            }`}>
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
              <span>Kalyan Studio Live · Customised Prints &amp; Merchandise</span>
            </div>

            {/* Brand Logo & Wordmark Lockup */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#E3A4AE] shadow-lg shadow-[#76577B]/30 bg-[#FAF6F0] p-0.5 shrink-0">
                <img src={BRAND_LOGO_URL} alt="Amora.co" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className={`font-serif text-3xl sm:text-4xl font-semibold leading-none tracking-tight ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  amora<span className="text-[#E3A4AE]">.co</span>
                </span>
                <span className={`font-editorial italic text-xs sm:text-sm tracking-widest mt-1 ${
                  isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                }`}>
                  prints, &amp; pretty things
                </span>
              </div>
            </div>

            {/* Main Editorial Headline with Dynamic Word Rotator */}
            <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[0.98] mb-5 ${
              isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
            }`}>
              Thoughtfully <HeroHeadlineRotator theme={theme} /> <br />
              <em className="italic text-[#E3A4AE] font-normal">Beautifully branded.</em>
            </h1>

            {/* Subtitle */}
            <p className={`text-sm sm:text-base max-w-lg leading-relaxed mb-8 ${
              isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
            }`}>
              From a single tactile polaroid tucked into a wax-sealed letter to 500-piece company onboarding kits — thoughtfully crafted in our Kalyan studio.
            </p>

            {/* Dual-Track Primary Action CTAs */}
            <div className="flex flex-wrap gap-3.5 sm:gap-4 items-center mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1800, 0.04);
                  onExplorePersonal();
                }}
                className={`rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer border ${
                  isDark
                    ? 'liquid-glass-plum text-white border-[#E3A4AE]/40 hover:opacity-95'
                    : 'bg-[#76577B] text-white border-[#76577B] hover:bg-[#5E4462] shadow-[#76577B]/25'
                }`}
              >
                <span>Personal Keepsakes (No MOQ)</span>
                <ArrowRight className="w-4 h-4 text-[#FAF6F0]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1600, 0.04);
                  onExploreCorporate();
                }}
                className={`rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 hover:-translate-y-0.5 cursor-pointer border ${
                  isDark
                    ? 'liquid-glass border-white/20 hover:bg-white/10 text-[#FAF6F0]'
                    : 'bg-white border-[#76577B]/25 hover:bg-[#FAF6F0] text-[#161E24] shadow-md'
                }`}
              >
                <span>Corporate Merchandise (MOQ: 30+)</span>
                <ArrowRight className="w-4 h-4 text-[#76577B]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t w-full max-w-lg text-[11px] sm:text-xs ${
              isDark ? 'border-white/10 text-[#CBD5E1]' : 'border-[#76577B]/20 text-[#424D55]'
            }`}>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E3A4AE] shrink-0" />
                <span>No MOQ on Keepsakes</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Box className="w-4 h-4 text-[#F3C69F] shrink-0" />
                <span>MOQ: 30+ Corporate</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Kalyan Studio Live</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Unified Amora Crystalline Keepsake (Logo Fused Inside Crystal Sphere) ─── */}
          <div
            className={`lg:col-span-6 w-full h-[480px] sm:h-[540px] lg:h-[600px] relative transition-all duration-1000 delay-200 flex flex-col justify-between items-center select-none ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Top Micro-Controls: Single Luxury Identification Badge */}
            <div className="flex items-center justify-between w-full relative z-20 px-2 sm:px-4">
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider border shadow-xs ${
                isDark
                  ? 'liquid-glass border-white/15 text-[#E3A4AE] bg-black/40'
                  : 'bg-white border-[#76577B]/20 text-[#76577B] shadow-xs'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-[#F3C69F] shrink-0" />
                <span>Amora Crystalline Keepsake · Live Studio Core</span>
              </div>

              <div className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider border shadow-xs ${
                isDark ? 'liquid-glass border-white/15 text-[#E3A4AE]' : 'bg-white border-[#76577B]/20 text-[#76577B]'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3A4AE] animate-ping shrink-0" />
                <span>15k Stardust · Touch &amp; Flare</span>
              </div>
            </div>

            {/* Central Free-Floating Stage Area: Amora Logo Suspended Creatively INSIDE the Crystal Sphere */}
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Layer 1 (Physical Center): 3D Amora Keepsake Emblem with Parallax Tilt & Gyro Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <CrystallineEmblemCore
                  finish={selectedFinish}
                  theme={theme}
                  isInteracting={isHovered}
                />
              </div>

              {/* Layer 2 (Atmosphere & Rim): CrystalizedBall Plasma Rim, 15,000 Swirling Dust Particles & Cursor Flares */}
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

            {/* Bottom Floating Material & Aura Dock: Minimalist Glass Pill */}
            <div className="relative z-20 w-full flex flex-col items-center gap-2 mt-auto">
              <div className={`w-full max-w-sm p-1.5 rounded-full border flex items-center justify-between gap-1 shadow-lg ${
                isDark
                  ? 'liquid-glass border-white/15 bg-black/60 shadow-black/40'
                  : 'bg-white/95 border-[#76577B]/20 shadow-[0_8px_24px_rgba(118,87,123,0.12)]'
              }`}>
                {KEEPSAKE_CONFIGS.map((item) => {
                  const isSelected = selectedFinish === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleFinishChange(item.id)}
                      className={`flex-1 py-1.5 px-2 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? (isDark
                              ? 'bg-white text-black shadow-sm font-bold'
                              : 'bg-[#76577B] text-white shadow-sm font-bold')
                          : (isDark
                              ? 'text-white/70 hover:text-white hover:bg-white/5'
                              : 'text-[#424D55] hover:text-[#161E24] hover:bg-[#76577B]/5')
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border shrink-0"
                        style={{ backgroundColor: item.dotColor, borderColor: isSelected ? 'transparent' : 'rgba(128,128,128,0.4)' }}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <span className={`text-[10px] tracking-wider font-medium ${isDark ? 'text-white/50' : 'text-[#76577B]/70'}`}>
                Hover to flare crystal rim · Drag to swirl stardust over logo · Tilt in 3D
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParticleHero;
