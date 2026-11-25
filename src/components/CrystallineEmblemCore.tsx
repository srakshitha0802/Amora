import React, { useEffect, useRef, useState } from 'react';

export type CrystallineFinish = 'rose-gold' | 'royal-plum' | 'champagne' | 'ceramic';

interface CrystallineEmblemCoreProps {
  finish: CrystallineFinish;
  theme?: 'dark' | 'light';
  isInteracting?: boolean;
}

export const CrystallineEmblemCore: React.FC<CrystallineEmblemCoreProps> = ({
  finish,
  theme = 'dark',
  isInteracting = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [targetTilt, setTargetTilt] = useState({ x: 0, y: 0 });

  const isDark = theme === 'dark';

  // Smooth mouse/touch parallax tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const ny = (e.clientY / innerHeight) * 2 - 1;
      setTargetTilt({
        x: -ny * 14, // rotateX degrees
        y: nx * 16,  // rotateY degrees
      });
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const nx = (touch.clientX / innerWidth) * 2 - 1;
        const ny = (touch.clientY / innerHeight) * 2 - 1;
        setTargetTilt({
          x: -ny * 12,
          y: nx * 14,
        });
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  // Smooth damping loop for organic tactile tilt
  useEffect(() => {
    let animId: number;
    const loop = () => {
      setTilt((prev) => ({
        x: prev.x + (targetTilt.x - prev.x) * 0.08,
        y: prev.y + (targetTilt.y - prev.y) * 0.08,
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetTilt]);

  // Subtle luxury aura glow & fine edge highlight per finish
  const finishStyles = {
    'rose-gold': {
      glow: isDark
        ? '0 0 45px rgba(227, 164, 174, 0.4), 0 15px 35px rgba(0, 0, 0, 0.5)'
        : '0 0 35px rgba(227, 164, 174, 0.35), 0 12px 28px rgba(118, 87, 123, 0.15)',
      edgeColor: 'rgba(227, 164, 174, 0.65)',
      specular: 'rgba(255, 235, 238, 0.35)',
    },
    'royal-plum': {
      glow: isDark
        ? '0 0 50px rgba(155, 110, 168, 0.45), 0 15px 35px rgba(0, 0, 0, 0.5)'
        : '0 0 35px rgba(118, 87, 123, 0.3), 0 12px 28px rgba(118, 87, 123, 0.18)',
      edgeColor: 'rgba(155, 110, 168, 0.6)',
      specular: 'rgba(240, 225, 248, 0.3)',
    },
    champagne: {
      glow: isDark
        ? '0 0 45px rgba(243, 198, 159, 0.45), 0 15px 35px rgba(0, 0, 0, 0.5)'
        : '0 0 35px rgba(243, 198, 159, 0.35), 0 12px 28px rgba(184, 118, 53, 0.15)',
      edgeColor: 'rgba(243, 198, 159, 0.7)',
      specular: 'rgba(255, 248, 235, 0.4)',
    },
    ceramic: {
      glow: isDark
        ? '0 0 45px rgba(203, 228, 249, 0.4), 0 15px 35px rgba(0, 0, 0, 0.5)'
        : '0 0 30px rgba(148, 163, 184, 0.3), 0 12px 28px rgba(148, 163, 184, 0.15)',
      edgeColor: 'rgba(203, 228, 249, 0.65)',
      specular: 'rgba(255, 255, 255, 0.45)',
    },
  }[finish];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{
        perspective: '1200px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* 3D Floating Group reacting to cursor tilt */}
      <div
        className="relative flex items-center justify-center transition-transform duration-75 will-change-transform"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isInteracting ? 1.03 : 1}, ${isInteracting ? 1.03 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient Back Glow matching crystal aura */}
        <div
          className="absolute rounded-full blur-2xl pointer-events-none transition-all duration-700"
          style={{
            width: '240px',
            height: '240px',
            boxShadow: finishStyles.glow,
            transform: 'translateZ(-20px)',
          }}
        />

        {/* ─── Creative 3D Luxury Artisan Keepsake Core (Replaces flat 2D logo) ─── */}
        <div
          className="relative w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] lg:w-[265px] lg:h-[265px] rounded-full overflow-hidden shadow-2xl transition-all duration-500 flex items-center justify-center"
          style={{
            boxShadow: finishStyles.glow,
            border: `2px solid ${finishStyles.edgeColor}`,
            transform: 'translateZ(12px)',
            background: isDark
              ? 'radial-gradient(circle at 35% 30%, #3B1B32 0%, #201321 60%, #120A14 100%)'
              : 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F8F1F5 55%, #EADBDF 100%)',
          }}
        >
          {/* Layer 1: Revolving Stardust Particle Ring Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60 animate-[spin_32s_linear_infinite]"
            style={{
              backgroundImage: 'url(/assets/catalog/corporate-merchandise/stardust-ring.png)',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1.15)',
              filter: isDark ? 'brightness(1.2)' : 'brightness(0.95)',
            }}
          />

          {/* Layer 2: Faceted Hexagonal Crystal Prism Halo */}
          <div
            className="absolute inset-4 rounded-full pointer-events-none transition-transform duration-100"
            style={{
              border: `1px dashed ${finishStyles.edgeColor}`,
              opacity: 0.5,
              transform: `rotate(${tilt.y * 2}deg) scale(0.95)`,
            }}
          />

          {/* Layer 3: Floating 3D Isometric Luxury Gift Box & Keepsake Gem (True 3D Z-Depth) */}
          <div
            className="relative z-10 flex flex-col items-center justify-center transition-transform duration-100"
            style={{
              transform: `translateZ(28px) translate(${tilt.y * 0.9}px, ${-tilt.x * 0.9}px)`,
            }}
          >
            {/* 3D Luxury Gift Box with Golden Silk Ribbon & Beveled Shimmer */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
              <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
                <defs>
                  {/* Luxury Primary Gradient */}
                  <linearGradient id="boxFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8E3C73" />
                    <stop offset="60%" stopColor="#6D2E58" />
                    <stop offset="100%" stopColor="#4A1E3C" />
                  </linearGradient>

                  {/* Top Lid Gradient */}
                  <linearGradient id="boxTopGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A85189" />
                    <stop offset="100%" stopColor="#C88DA0" />
                  </linearGradient>

                  {/* Side Depth Gradient */}
                  <linearGradient id="boxSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A1E3C" />
                    <stop offset="100%" stopColor="#2A1022" />
                  </linearGradient>

                  {/* Golden Silk Ribbon Ribbon Gradient */}
                  <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF3D6" />
                    <stop offset="45%" stopColor="#E5BE6C" />
                    <stop offset="75%" stopColor="#C5963E" />
                    <stop offset="100%" stopColor="#FDE39D" />
                  </linearGradient>

                  {/* Gem Facet Sheen */}
                  <linearGradient id="gemSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                  </linearGradient>
                </defs>

                {/* Isometric Cube - Top Face */}
                <polygon
                  points="80,32 124,56 80,80 36,56"
                  fill="url(#boxTopGrad)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="0.8"
                />

                {/* Isometric Cube - Left Face */}
                <polygon
                  points="36,56 80,80 80,128 36,104"
                  fill="url(#boxFrontGrad)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />

                {/* Isometric Cube - Right Face */}
                <polygon
                  points="80,80 124,56 124,104 80,128"
                  fill="url(#boxSideGrad)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />

                {/* Golden Vertical Ribbon on Front Left */}
                <polygon
                  points="55,67 61,70 61,118 55,114"
                  fill="url(#goldRibbonGrad)"
                />

                {/* Golden Vertical Ribbon on Front Right */}
                <polygon
                  points="99,70 105,67 105,114 99,118"
                  fill="url(#goldRibbonGrad)"
                />

                {/* Golden Ribbon across Top Lid */}
                <polygon
                  points="55,67 61,70 105,46 99,43"
                  fill="url(#goldRibbonGrad)"
                  opacity="0.95"
                />
                <polygon
                  points="58,45 64,48 102,69 96,66"
                  fill="url(#goldRibbonGrad)"
                  opacity="0.95"
                />

                {/* Ornate Golden Ribbon Knot / Keepsake Bow */}
                <circle cx="80" cy="57" r="7" fill="url(#goldRibbonGrad)" />
                <path
                  d="M80 57 C72 45 62 48 68 55 C74 61 78 58 80 57 Z"
                  fill="url(#goldRibbonGrad)"
                  stroke="#A67B2A"
                  strokeWidth="0.5"
                />
                <path
                  d="M80 57 C88 45 98 48 92 55 C86 61 82 58 80 57 Z"
                  fill="url(#goldRibbonGrad)"
                  stroke="#A67B2A"
                  strokeWidth="0.5"
                />

                {/* Central Monogram "A" Embossed on Front */}
                <text
                  x="58"
                  y="102"
                  fill="#F8F4EA"
                  fontFamily="Playfair Display, Cormorant Garamond, serif"
                  fontSize="18"
                  fontWeight="600"
                  opacity="0.9"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}
                >
                  A
                </text>

                {/* Specular Edge Highlight Shard */}
                <polygon
                  points="36,56 80,32 84,34 40,58"
                  fill="url(#gemSheen)"
                />
              </svg>
            </div>

            {/* Elegant Subtitle Moniker */}
            <div className="flex flex-col items-center mt-0.5">
              <span
                className={`text-[9px] uppercase tracking-[0.25em] font-semibold ${
                  isDark ? 'text-[#EBC6CF]' : 'text-[#6D2E58]'
                }`}
              >
                Atelier Keepsake
              </span>
              <span
                className={`text-[8px] font-mono tracking-wider opacity-70 ${
                  isDark ? 'text-white/60' : 'text-[#584F5E]'
                }`}
              >
                Custom Gift Studio
              </span>
            </div>
          </div>

          {/* Layer 4: Dynamic Specular Glass Glint across the spherical lens face */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-75 z-20"
            style={{
              background: `linear-gradient(${125 + tilt.y * 1.5}deg, ${finishStyles.specular} 0%, rgba(255,255,255,0.06) 42%, transparent 68%)`,
              transform: `translate(${tilt.y * 1.1}px, ${-tilt.x * 1.1}px)`,
            }}
          />

          {/* Layer 5: Delicate Tactile Glass Reflection Curvature */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none z-30"
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 4px rgba(255,255,255,0.5), inset 0 -3px 8px rgba(0,0,0,0.4)'
                : 'inset 0 1px 4px rgba(255,255,255,0.8), inset 0 -3px 8px rgba(118,87,123,0.18)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrystallineEmblemCore;
