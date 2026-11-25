import React from 'react';
import { Sparkles } from 'lucide-react';
import type { EmblemFinish } from '../types/material';
import { EMBLEM_FINISHES } from '../types/material';
import { playTactileClick } from '../utils/audio';

interface HeroMaterialSelectorProps {
  currentFinish: EmblemFinish;
  onSelectFinish: (finish: EmblemFinish) => void;
  theme?: 'dark' | 'light';
}

export const HeroMaterialSelector: React.FC<HeroMaterialSelectorProps> = ({
  currentFinish,
  onSelectFinish,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const handleSelect = (id: EmblemFinish) => {
    playTactileClick(1500, 0.035);
    onSelectFinish(id);
  };

  return (
    <div className="w-full mt-6 mb-7">
      <div className="flex items-center justify-between mb-2.5">
        <span className={`text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1.5 ${
          isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
        }`}>
          <Sparkles className="w-3 h-3 text-[#E3A4AE]" />
          <span>Interactive 3D Physical Finish (Live Switch)</span>
        </span>
        <span className={`text-[10px] font-medium tracking-widest ${
          isDark ? 'text-[#E3A4AE]' : 'text-[#76577B]'
        }`}>
          TOUCH TO RENDER
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(Object.keys(EMBLEM_FINISHES) as EmblemFinish[]).map((finishId) => {
          const finish = EMBLEM_FINISHES[finishId];
          const isSelected = currentFinish === finishId;

          return (
            <button
              key={finishId}
              type="button"
              onClick={() => handleSelect(finishId)}
              className={`group p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? (isDark
                      ? 'bg-white/12 border-[#E3A4AE] shadow-[0_4px_20px_rgba(227,164,174,0.25)] scale-[1.02]'
                      : 'bg-white border-[#76577B] shadow-md scale-[1.02]')
                  : (isDark
                      ? 'bg-black/30 border-white/10 hover:border-white/25 hover:bg-white/5'
                      : 'bg-white/60 border-[#76577B]/15 hover:border-[#76577B]/30 hover:bg-white')
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className="w-3.5 h-3.5 rounded-full border shadow-xs shrink-0"
                  style={{
                    backgroundColor: finish.bezelColor,
                    borderColor: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                  }}
                />
                <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${
                  isSelected
                    ? (isDark ? 'bg-[#E3A4AE] text-[#06080C]' : 'bg-[#76577B] text-white')
                    : (isDark ? 'bg-white/10 text-white/70' : 'bg-[#76577B]/10 text-[#76577B]')
                }`}>
                  {finish.badge}
                </span>
              </div>
              <p className={`text-xs font-semibold tracking-tight transition-colors ${
                isSelected
                  ? (isDark ? 'text-white' : 'text-[#161E24]')
                  : (isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]')
              }`}>
                {finish.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroMaterialSelector;
