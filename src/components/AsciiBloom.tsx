import React, { useEffect, useRef } from "react";

interface AsciiBloomProps {
  className?: string;
  theme?: "dark" | "light";
}

export const AsciiBloom: React.FC<AsciiBloomProps> = ({
  className = "",
  theme = "dark",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const charSize = 14; // Grid cell size in px

    // Luxury typographic particle density scale
    const CHARS = [" ", ".", ":", "+", "x", "X", "S", "8", "0", "#", "@", "%", "$"];

    const resize = () => {
      const rect =
        canvas.parentElement?.getBoundingClientRect() ||
        canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      cols = Math.ceil(width / charSize);
      rows = Math.ceil(height / charSize);
    };

    resize();
    window.addEventListener("resize", resize);

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseleave", onPointerLeave);

    let time = 0;
    const isDark = theme === "dark";

    const render = () => {
      time += 0.018;
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${charSize - 3}px "SF Mono", "Fira Code", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxDim = Math.max(width, height) * 0.75;

      // 3 Organic Floral Bloom Nodes (Reference: media_1795434815270_28ef9ee9.jpg)
      const b1x = width * (0.42 + Math.sin(time * 0.25) * 0.04);
      const b1y = height * (0.38 + Math.cos(time * 0.3) * 0.04);

      const b2x = width * (0.62 + Math.cos(time * 0.22) * 0.05);
      const b2y = height * (0.32 + Math.sin(time * 0.28) * 0.04);

      const b3x = width * (0.48 + Math.sin(time * 0.35 + 1) * 0.04);
      const b3y = height * (0.58 + Math.cos(time * 0.2) * 0.04);

      for (let r = 0; r < rows; r++) {
        const py = r * charSize + charSize * 0.5;

        for (let c = 0; c < cols; c++) {
          const px = c * charSize + charSize * 0.5;

          // Gaussian Floral Bloom Nodes with harmonic petal modulation
          const d1 = Math.hypot(px - b1x, py - b1y);
          const a1 = Math.atan2(py - b1y, px - b1x);
          const petalMod1 = 1 + Math.cos(a1 * 5 + time * 0.6) * 0.22;
          const bloom1 = Math.exp(-Math.pow(d1 / (maxDim * 0.24 * petalMod1), 2)) * 0.9;

          const d2 = Math.hypot(px - b2x, py - b2y);
          const a2 = Math.atan2(py - b2y, px - b2x);
          const petalMod2 = 1 + Math.sin(a2 * 6 - time * 0.5) * 0.2;
          const bloom2 = Math.exp(-Math.pow(d2 / (maxDim * 0.2 * petalMod2), 2)) * 0.8;

          const d3 = Math.hypot(px - b3x, py - b3y);
          const a3 = Math.atan2(py - b3y, px - b3x);
          const petalMod3 = 1 + Math.cos(a3 * 4 + time * 0.4) * 0.18;
          const bloom3 = Math.exp(-Math.pow(d3 / (maxDim * 0.26 * petalMod3), 2)) * 0.7;

          // Continuous harmonic wave formula for ambient background particles
          const wave1 = Math.sin(px * 0.006 + time * 0.6) * Math.cos(py * 0.006 - time * 0.4) * 0.2;
          const wave2 = Math.sin((px * 0.004 + py * 0.004) + time * 0.3) * 0.15;

          // Smooth radial falloff to zero at outer screen boundaries
          const distCenter = Math.hypot(px - centerX, py - centerY) / maxDim;
          const vignette = Math.max(0, 1 - Math.pow(distCenter, 1.5));

          // Interactive cursor ripple
          let mouseWake = 0;
          if (mouse.active) {
            const distMouse = Math.hypot(px - mouse.x, py - mouse.y);
            if (distMouse < 220) {
              mouseWake = (1 - distMouse / 220) * 0.65;
            }
          }

          // Composite continuous floral density (Zero hard boundaries)
          const rawDensity = (bloom1 + bloom2 + bloom3 + 0.18 + wave1 + wave2 + mouseWake) * vignette;
          const density = Math.max(0, Math.min(1, rawDensity));

          if (density > 0.07) {
            const charIdx = Math.min(
              CHARS.length - 1,
              Math.floor(density * CHARS.length)
            );
            const char = CHARS[charIdx];

            let rCol: number, gCol: number, bCol: number, alpha: number;

            if (isDark) {
              // Luminous Amora Floral Palette (Rose-Coral, Blush, Plum, Champagne)
              const floralWeight = Math.max(bloom1, Math.max(bloom2, bloom3));
              
              if (floralWeight > 0.45) {
                // Vibrant Blooming Core (Coral Blush #FF758C / #E3A4AE)
                rCol = 245; gCol = 135; bCol = 145;
              } else if (floralWeight > 0.2) {
                // Orchid Violet / Plum Glow #B388BA
                rCol = 179; gCol = 136; bCol = 186;
              } else {
                // Warm Champagne Rose #F3C69F
                rCol = 243; gCol = 198; bCol = 159;
              }

              // Mouse interaction brightness boost
              if (mouseWake > 0.05) {
                rCol = Math.min(255, rCol + Math.floor(mouseWake * 70));
                gCol = Math.min(255, gCol + Math.floor(mouseWake * 70));
                bCol = Math.min(255, bCol + Math.floor(mouseWake * 80));
              }

              alpha = Math.min(0.55, 0.12 + density * 0.55);
            } else {
              // Light Mode: Refined plum watermark on warm linen
              const floralWeight = Math.max(bloom1, Math.max(bloom2, bloom3));
              if (floralWeight > 0.3) {
                // Deep Plum #76577B
                rCol = 118; gCol = 87; bCol = 123;
              } else {
                // Soft Blush Rose #D18D9A
                rCol = 175; gCol = 115; bCol = 130;
              }

              alpha = Math.min(0.24, 0.08 + density * 0.2);
            }

            ctx.fillStyle = `rgba(${rCol}, ${gCol}, ${bCol}, ${alpha.toFixed(3)})`;
            ctx.fillText(char, px, py);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [theme]);

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default AsciiBloom;
