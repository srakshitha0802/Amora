import React from 'react';
import { Compass, RotateCw, Volume2, VolumeX } from 'lucide-react';
import { playTactileClick, isAudioEnabled, setAudioEnabled } from '../utils/audio';

export type CameraPreset = 'front' | 'profile' | 'orbit' | 'kinetic';

interface HeroAnglePresetsProps {
  currentPreset: CameraPreset;
  onSelectPreset: (preset: CameraPreset) => void;
  theme?: 'dark' | 'light';
}

export const HeroAnglePresets: React.FC<HeroAnglePresetsProps> = ({
  currentPreset,
  onSelectPreset,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const [soundOn, setSoundOn] = React.useState(isAudioEnabled);

  const handlePreset = (preset: CameraPreset) => {
    playTactileClick(1700, 0.03);
    onSelectPreset(preset);
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setAudioEnabled(next);
    if (next) playTactileClick(2000, 0.04);
  };

  const presets: { id: CameraPreset; label: string }[] = [
    { id: 'front', label: 'Front' },
    { id: 'profile', label: 'Profile' },
    { id: 'orbit', label: 'Orbit' },
    { id: 'kinetic', label: 'Spin' },
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Sound Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        className={`p-1.5 rounded-full border transition-all cursor-pointer ${
          isDark
            ? 'liquid-glass border-white/15 text-white/70 hover:text-white'
            : 'bg-white border-[#76577B]/20 text-[#76577B] shadow-xs'
        }`}
        title={soundOn ? 'Mute tactile clicks' : 'Enable tactile clicks'}
        aria-label="Toggle tactile clicks"
      >
        {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 opacity-60" />}
      </button>

      {/* Angle Presets Pill Group */}
      <div className={`inline-flex items-center p-0.5 rounded-full border ${
        isDark ? 'liquid-glass border-white/15' : 'bg-white border-[#76577B]/20 shadow-xs'
      }`}>
        <div className="px-2 py-1 text-[10px] font-semibold opacity-60 uppercase tracking-widest hidden sm:inline flex items-center gap-1">
          <Compass className="w-3 h-3" />
        </div>
        {presets.map((p) => {
          const isActive = currentPreset === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePreset(p.id)}
              className={`px-2.5 py-1 text-[10px] font-semibold rounded-full transition-all cursor-pointer ${
                isActive
                  ? (isDark ? 'bg-white text-black shadow-xs' : 'bg-[#76577B] text-white shadow-xs')
                  : (isDark ? 'text-white/70 hover:text-white' : 'text-[#424D55] hover:text-[#161E24]')
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroAnglePresets;
