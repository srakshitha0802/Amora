import React, { useEffect, useRef, useState } from 'react';

export type CrystallineFinish = 'rose-gold' | 'royal-plum' | 'champagne' | 'ceramic';

interface CrystallineEmblemCoreProps {
  finish: CrystallineFinish;
  theme?: 'dark' | 'light';
  isInteracting?: boolean;
  sizeMultiplier?: number;
}

export const CrystallineEmblemCore: React.FC<CrystallineEmblemCoreProps> = ({
  finish,
  theme = 'dark',
  isInteracting = false,
  sizeMultiplier = 0.78,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [targetTilt, setTargetTilt] = useState({ x: 0, y: 0 });
  const [discSize, setDiscSize] = useState<number>(360);

  const isDark = theme === 'dark';

  // Responsive Measurement: Match the 3D model sphere diameter exactly
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const parent = el.parentElement || el;
      const rect = parent.getBoundingClientRect();
      const minDim = Math.min(rect.width || 450, rect.height || 520);
      // Math.min(width, height) * sizeMultiplier matches CrystalizedBall's exact radius * 2
      const targetSize = Math.round(minDim * sizeMultiplier);
      setDiscSize(Math.max(180, targetSize));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sizeMultiplier]);

  // Smooth mouse/touch parallax tracking
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const ny = (e.clientY / innerHeight) * 2 - 1;
      setTargetTilt({
        x: -ny * 12, // rotateX degrees
        y: nx * 14,  // rotateY degrees
      });
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        const nx = (touch.clientX / innerWidth) * 2 - 1;
        const ny = (touch.clientY / innerHeight) * 2 - 1;
        setTargetTilt({
          x: -ny * 10,
          y: nx * 12,
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
        ? '0 0 55px rgba(227, 164, 174, 0.45), 0 20px 40px rgba(0, 0, 0, 0.55)'
        : '0 0 40px rgba(227, 164, 174, 0.35), 0 15px 30px rgba(118, 87, 123, 0.15)',
      edgeColor: 'rgba(227, 164, 174, 0.75)',
      specular: 'rgba(255, 235, 238, 0.35)',
    },
    'royal-plum': {
      glow: isDark
        ? '0 0 60px rgba(155, 110, 168, 0.5), 0 20px 40px rgba(0, 0, 0, 0.55)'
        : '0 0 45px rgba(118, 87, 123, 0.35), 0 15px 30px rgba(118, 87, 123, 0.18)',
      edgeColor: 'rgba(155, 110, 168, 0.7)',
      specular: 'rgba(240, 225, 248, 0.3)',
    },
    champagne: {
      glow: isDark
        ? '0 0 55px rgba(243, 198, 159, 0.48), 0 20px 40px rgba(0, 0, 0, 0.55)'
        : '0 0 40px rgba(243, 198, 159, 0.38), 0 15px 30px rgba(184, 118, 53, 0.15)',
      edgeColor: 'rgba(243, 198, 159, 0.8)',
      specular: 'rgba(255, 248, 235, 0.4)',
    },
    ceramic: {
      glow: isDark
        ? '0 0 55px rgba(203, 228, 249, 0.45), 0 20px 40px rgba(0, 0, 0, 0.55)'
        : '0 0 35px rgba(148, 163, 184, 0.35), 0 15px 30px rgba(148, 163, 184, 0.15)',
      edgeColor: 'rgba(203, 228, 249, 0.75)',
      specular: 'rgba(255, 255, 255, 0.45)',
    },
  }[finish];

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center pointer-events-none select-none w-full h-full"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Floating Group reacting to cursor tilt */}
      <div
        className="relative flex items-center justify-center transition-transform duration-75 will-change-transform"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isInteracting ? 1.02 : 1}, ${isInteracting ? 1.02 : 1}, 1)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient Back Glow matching crystal aura (scaled to match model length) */}
        <div
          className="absolute rounded-full blur-2xl pointer-events-none transition-all duration-700"
          style={{
            width: `${discSize * 0.95}px`,
            height: `${discSize * 0.95}px`,
            boxShadow: finishStyles.glow,
            transform: 'translateZ(-15px)',
          }}
        />

        {/* ─── Official Amora Logo Disc: Exactly Sized to Match 3D Model Length ─── */}
        <div
          className="relative rounded-full overflow-hidden shadow-2xl transition-all duration-300"
          style={{
            width: `${discSize}px`,
            height: `${discSize}px`,
            boxShadow: finishStyles.glow,
            border: `1.5px solid ${finishStyles.edgeColor}`,
            transform: 'translateZ(10px)',
          }}
        >
          {/* Official Amora Logo Image - Perfectly Centered & Cropped to Full Length */}
          <img
            src="/assets/amora-logo-official.jpg"
            alt="Amora.co Official Logo"
            className="w-full h-full object-cover scale-[1.06] select-none pointer-events-none rounded-full"
            draggable={false}
          />

          {/* Dynamic Specular Glass Glint across the spherical lens face */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-75"
            style={{
              background: `linear-gradient(${125 + tilt.y * 1.5}deg, ${finishStyles.specular} 0%, rgba(255,255,255,0.06) 40%, transparent 68%)`,
              transform: `translate(${tilt.y * 1.1}px, ${-tilt.x * 1.1}px)`,
            }}
          />

          {/* Delicate Tactile Glass Reflection Curvature */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 4px rgba(255,255,255,0.45), inset 0 -3px 8px rgba(0,0,0,0.35)'
                : 'inset 0 1px 4px rgba(255,255,255,0.75), inset 0 -3px 8px rgba(118,87,123,0.16)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrystallineEmblemCore;
