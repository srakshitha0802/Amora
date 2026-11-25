"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const DEFAULT_IMAGE_URLS = [
  // Curated corporate merchandise & premium product imagery
  "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80", // Insulated Matte Bottle
  "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80", // Studio Ceramic Mug
  "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80", // Stitched Desk Mat
  "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80", // Welcome Gift Box
  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", // Hardbound Debossed Notebook
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80", // Polaroid Keepsake Set
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", // Executive Audio & Accessories
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80", // Custom Laser Engraving
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80", // Minimalist Desk Setup
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", // Studio Ceramic Ware
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", // Archival Art Prints
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80", // Luxury Box Packaging
];

const Z_FAR = -2400;
const Z_NEAR = 780;
const RANGE = Z_NEAR - Z_FAR;
const DURATION = 16;
const FADE_IN = 0.06;
const FADE_OUT = 0.04;

const css = `
.endless-root,
.endless-root *,
.endless-root *::before,
.endless-root *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.endless-root {
  position: relative;
  width: 100%;
  height: 100svh;
  background-color: #06080C;
  overflow: hidden;
}

.endless-scene {
  position: absolute;
  inset: 0;
  perspective: 1100px;
  perspective-origin: 50% 50%;
  pointer-events: none;
}

.endless-world {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}

.endless-plane {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 50% 50%;
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid rgba(227, 164, 174, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  will-change: transform, opacity;
}

.endless-plane img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  filter: saturate(1.1) brightness(0.92);
}

.endless-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  padding: 1.5rem;
  text-align: center;
}

.endless-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  background: rgba(118, 87, 123, 0.2);
  border: 1px solid rgba(227, 164, 174, 0.3);
  color: #E3A4AE;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 1.25rem;
  backdrop-filter: blur(8px);
}

.endless-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  line-height: 1;
  color: #FAF6F0;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.9);
  margin-bottom: 1rem;
}

.endless-title em {
  font-style: italic;
  color: #E3A4AE;
}

.endless-caption {
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  font-size: clamp(0.9rem, 1.8vw, 1.15rem);
  color: rgba(250, 246, 240, 0.7);
  max-w: 600px;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
}

.endless-cta {
  pointer-events: auto;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 2rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #76577B 0%, #8E6C94 100%);
  color: #FAF6F0;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  border: 1px solid rgba(227, 164, 174, 0.4);
  box-shadow: 0 10px 30px rgba(118, 87, 123, 0.35);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.endless-cta:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 15px 40px rgba(118, 87, 123, 0.5);
  border-color: #E3A4AE;
}

/* iOS WebKit flattens nested 3D when an ancestor uses overflow: hidden. */
@supports (-webkit-touch-callout: none) {
  .endless-root {
    overflow: visible;
    -webkit-clip-path: inset(0);
    clip-path: inset(0);
  }
}
`;

function opacityForProgress(progress: number) {
  if (progress < FADE_IN) return Math.max(0, progress / FADE_IN);
  if (progress > 1 - FADE_OUT) return Math.max(0, (1 - progress) / FADE_OUT);
  return 1;
}

function getLayout() {
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const planeW = width < 768 ? Math.min(width * 0.32, 220) : Math.min(width * 0.26, 440);
  return {
    planeW,
    planeH: planeW * (4 / 3),
    offsetX: width * 0.33,
    angle: 24,
  };
}

export interface EndlessProps {
  title?: string;
  italicWord?: string;
  subtitle?: string;
  badge?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  images?: string[];
  className?: string;
}

export default function Endless({
  title = "Precision Branded",
  italicWord = "Merchandise",
  subtitle = "Bottles, ceramic mugs, desk mats & onboarding kits engineered for high-growth teams. Direct from our Kalyan studio.",
  badge = "Track B • Strict MOQ: 30+ Pieces",
  ctaText = "Configure Corporate Kit Estimator ↓",
  onCtaClick,
  images = DEFAULT_IMAGE_URLS,
  className = "",
}: EndlessProps) {
  const worldRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;

    const planes = Array.from(world.querySelectorAll<HTMLElement>(".endless-plane"));
    const tweens: gsap.core.Tween[] = [];

    gsap.ticker.lagSmoothing(0);
    gsap.set(world, { force3D: true });

    const applyLayout = () => {
      const { planeW, planeH, offsetX, angle } = getLayout();
      planes.forEach((plane, index) => {
        const isLeft = index % 2 === 0;
        plane.style.width = `${planeW}px`;
        plane.style.height = `${planeH}px`;
        gsap.set(plane, {
          xPercent: -50,
          yPercent: -50,
          x: isLeft ? -offsetX : offsetX,
          y: 0,
          rotationY: isLeft ? angle : -angle,
          force3D: true,
        });
      });
    };

    applyLayout();

    planes.forEach((plane, index) => {
      const startProgress = index / total;

      gsap.set(plane, { z: Z_FAR + startProgress * RANGE });

      const tween = gsap.fromTo(
        plane,
        { z: Z_FAR },
        {
          z: Z_NEAR,
          duration: DURATION,
          ease: "none",
          repeat: -1,
          onUpdate() {
            const raw = tween.progress();
            const currentProgress = (raw + startProgress) % 1;
            const targetZ = Z_FAR + currentProgress * RANGE;
            gsap.set(plane, {
              z: targetZ,
              opacity: opacityForProgress(currentProgress),
            });
          },
        },
      );

      tween.progress(startProgress);
      tweens.push(tween);
    });

    window.addEventListener("resize", applyLayout);

    return () => {
      window.removeEventListener("resize", applyLayout);
      tweens.forEach((tween) => tween.kill());
      gsap.killTweensOf(planes);
    };
  }, [total]);

  return (
    <section className={`endless-root relative ${className}`} aria-label="Amora Corporate 3D Runway">
      <style>{css}</style>
      <div className="endless-scene">
        <div className="endless-world" ref={worldRef}>
          {images.map((url, idx) => (
            <div className="endless-plane" key={`${url}-${idx}`}>
              <img src={url} alt={`Corporate merchandise ${idx + 1}`} loading="eager" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      <div className="endless-overlay">
        <div className="endless-badge">{badge}</div>
        <h2 className="endless-title">
          {title} <em>{italicWord}</em>
        </h2>
        <p className="endless-caption">{subtitle}</p>
        {onCtaClick && (
          <button type="button" onClick={onCtaClick} className="endless-cta">
            {ctaText}
          </button>
        )}
      </div>
    </section>
  );
}

export { Endless as Component };
