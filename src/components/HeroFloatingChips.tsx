import React, { useEffect, useState } from 'react';
import { Camera, Sparkles, Feather, Printer } from 'lucide-react';

interface HeroFloatingChipsProps {
  theme?: 'dark' | 'light';
}

export const HeroFloatingChips: React.FC<HeroFloatingChipsProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 24;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const chips = [
    {
      icon: Feather,
      title: '350 GSM Cotton Paper',
      sub: 'Archival & Acid-Free',
      color: '#E8998D',
      position: 'top-8 left-4 sm:left-8',
      factor: 0.8,
    },
    {
      icon: Sparkles,
      title: 'Botanical Wax Seals',
      sub: 'Hand-Poured in Studio',
      color: '#E3A4AE',
      position: 'top-12 right-4 sm:right-10',
      factor: -0.9,
    },
    {
      icon: Camera,
      title: 'Instant Polaroid Keepsakes',
      sub: 'Tactile Gloss Border',
      color: '#F3C69F',
      position: 'bottom-16 left-6 sm:left-12',
      factor: -0.7,
    },
    {
      icon: Printer,
      title: '1200 DPI UV Precision',
      sub: 'Corporate Bulk Certified',
      color: '#76577B',
      position: 'bottom-10 right-4 sm:right-8',
      factor: 1.1,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 hidden md:block overflow-hidden">
      {chips.map((chip, idx) => {
        const Icon = chip.icon;
        const tx = offset.x * chip.factor;
        const ty = offset.y * chip.factor;

        return (
          <div
            key={idx}
            className={`absolute ${chip.position} transition-transform duration-500 ease-out`}
            style={{
              transform: `translate3d(${tx}px, ${ty}px, 0)`,
            }}
          >
            <div
              className={`p-2.5 sm:p-3 rounded-2xl flex items-center gap-2.5 backdrop-blur-md shadow-xl border transition-all duration-300 pointer-events-auto hover:scale-105 cursor-pointer ${
                isDark
                  ? 'bg-black/50 border-white/15 text-white'
                  : 'bg-white/90 border-[#76577B]/20 text-[#161E24] shadow-md'
              }`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: `${chip.color}25`, color: chip.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-tight">{chip.title}</span>
                <span className="text-[10px] opacity-70 tracking-wide font-medium">{chip.sub}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroFloatingChips;
