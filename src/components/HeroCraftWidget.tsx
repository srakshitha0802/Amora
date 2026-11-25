import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Feather, Heart, Layers, Shield } from 'lucide-react';

interface HeroCraftWidgetProps {
  theme?: 'dark' | 'light';
}

const ROTATING_WORDS = ['personalised.', 'designed.', 'curated.', 'crafted.'];

const CRAFT_PILLS = [
  {
    id: 'paper',
    icon: Feather,
    label: '350 GSM Cotton Paper',
    description: 'Heavyweight tactile archival cardstock with velvety vintage hand-feel.',
    tag: 'Keepsake Standard',
  },
  {
    id: 'wax',
    icon: Heart,
    label: 'Botanical Wax Seals',
    description: 'Hand-poured plum wax seals stamped over custom photostrip envelopes.',
    tag: 'Artisan Touch',
  },
  {
    id: 'foil',
    icon: Sparkles,
    label: 'Rose-Gold Hot Foil',
    description: 'Specular metallic debossing for typography, initials, and company crests.',
    tag: 'Studio Finish',
  },
  {
    id: 'b2b',
    icon: Layers,
    label: 'Strict 30+ B2B MOQ',
    description: 'Colour-calibrated UV printing across workspace drinkware & desk mats.',
    tag: 'Corporate Run',
  },
];

export const HeroHeadlineRotator: React.FC<{ theme?: 'dark' | 'light' }> = ({ theme = 'dark' }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const isDark = theme === 'dark';

  return (
    <span className="inline-block relative overflow-hidden align-baseline min-w-[280px] sm:min-w-[420px]">
      <span
        key={ROTATING_WORDS[index]}
        className={`inline-block transition-all duration-700 transform animate-in fade-in slide-in-from-bottom-3 ${
          isDark
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FAF6F0] via-[#E3A4AE] to-[#F3C69F]'
            : 'text-transparent bg-clip-text bg-gradient-to-r from-[#161E24] via-[#76577B] to-[#E8998D]'
        }`}
      >
        {ROTATING_WORDS[index]}
      </span>
    </span>
  );
};

export const HeroCraftWidget: React.FC<HeroCraftWidgetProps> = ({ theme = 'dark' }) => {
  const [activePill, setActivePill] = useState(0);
  const isDark = theme === 'dark';
  const current = CRAFT_PILLS[activePill];

  return (
    <div className="w-full max-w-xl my-6">
      {/* Interactive Craft Strip Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {CRAFT_PILLS.map((pill, idx) => {
          const Icon = pill.icon;
          const isActive = idx === activePill;
          return (
            <button
              key={pill.id}
              type="button"
              onClick={() => setActivePill(idx)}
              onMouseEnter={() => setActivePill(idx)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                isActive
                  ? isDark
                    ? 'bg-[#76577B]/40 text-white border-[#E3A4AE] shadow-[0_0_15px_rgba(227,164,174,0.3)] scale-[1.03]'
                    : 'bg-[#76577B] text-white border-[#76577B] shadow-md scale-[1.03]'
                  : isDark
                    ? 'bg-white/5 text-[#CBD5E1] border-white/10 hover:border-white/20 hover:text-white'
                    : 'bg-white text-[#424D55] border-[#76577B]/20 hover:border-[#76577B]/40 hover:text-[#161E24] shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? (isDark ? 'text-[#E3A4AE]' : 'text-white') : 'text-[#76577B]'}`} />
              <span>{pill.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tactile Preview Card */}
      <div
        className={`rounded-2xl p-3.5 sm:p-4 border transition-all duration-300 flex items-start gap-3.5 ${
          isDark
            ? 'liquid-glass border-white/15 bg-white/[0.03]'
            : 'bg-white border-[#76577B]/20 shadow-md'
        }`}
      >
        <div className={`p-2.5 rounded-xl shrink-0 ${
          isDark ? 'bg-[#76577B]/25 text-[#E3A4AE]' : 'bg-[#76577B]/10 text-[#76577B]'
        }`}>
          <current.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-xs font-bold tracking-wide uppercase ${
              isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
            }`}>
              {current.label}
            </span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isDark ? 'bg-white/10 text-[#E3A4AE]' : 'bg-[#76577B]/10 text-[#76577B]'
            }`}>
              {current.tag}
            </span>
          </div>
          <p className={`text-xs mt-1 leading-relaxed ${
            isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
          }`}>
            {current.description}
          </p>
        </div>
      </div>
    </div>
  );
};
