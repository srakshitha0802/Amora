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
            width: '230px',
            height: '230px',
            boxShadow: finishStyles.glow,
            transform: 'translateZ(-15px)',
          }}
        />

        {/* Pure Official Amora Logo Disc (Clean, Borderless, Insanely Beautiful) */}
        <div
          className="relative w-[205px] h-[205px] sm:w-[235px] sm:h-[235px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden shadow-2xl transition-all duration-500"
          style={{
            boxShadow: finishStyles.glow,
            border: `1.5px solid ${finishStyles.edgeColor}`,
            transform: 'translateZ(10px)',
          }}
        >
          {/* Official Amora Logo Image from user attachment */}
          <img
            src="/assets/amora-logo-official.jpg"
            alt="Amora.co Official Logo"
            className="w-full h-full object-cover scale-[1.08] select-none pointer-events-none"
            draggable={false}
          />

          {/* Dynamic Specular Glass Glint across the logo face */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none transition-transform duration-75"
            style={{
              background: `linear-gradient(${125 + tilt.y * 1.5}deg, ${finishStyles.specular} 0%, rgba(255,255,255,0.04) 40%, transparent 65%)`,
              transform: `translate(${tilt.y * 1.1}px, ${-tilt.x * 1.1}px)`,
            }}
          />

          {/* Delicate Tactile Glass Reflection Curvature */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: isDark
                ? 'inset 0 1px 3px rgba(255,255,255,0.45), inset 0 -2px 6px rgba(0,0,0,0.3)'
                : 'inset 0 1px 3px rgba(255,255,255,0.7), inset 0 -2px 6px rgba(118,87,123,0.15)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrystallineEmblemCore;
