import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle, Heart, Box, Check } from 'lucide-react';
import type { Product } from '../types';
import { buildWhatsAppUrl, getProductImage } from '../data/products';
import { playTactileClick } from '../utils/audio';

interface CircularProductOrbitProps {
  products: Product[];
  onCustomiseProduct: (product: Product) => void;
  theme?: 'dark' | 'light';
}

// Curated 8 Signature Highlight Pieces for balanced 45-degree turntable layout
const FEATURED_RUNWAY_IDS = [
  'custom-printed-sipper-bottle-600ml',
  'custom-printed-coffee-mug',
  'custom-printed-keyboard-mat',
  'custom-printed-mousepad',
  'pack-of-16-matte-polaroids',
  'spotify-polaroids-set-of-3',
  'page-whisper',
  'cool-laptop-stickers',
];

export const CircularProductOrbit: React.FC<CircularProductOrbitProps> = ({
  products,
  onCustomiseProduct,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  // Filter curated products for the 360 runway
  const runwayProducts = useMemo(() => {
    const featured = FEATURED_RUNWAY_IDS.map((id) => products.find((p) => p.id === id)).filter(
      Boolean
    ) as Product[];
    return featured.length >= 6 ? featured : products.slice(0, 8);
  }, [products]);

  const total = runwayProducts.length;
  const angleStep = 360 / total;

  // Physics animation state refs (keeps animation 100% butter-smooth without React state lag)
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const idleTimerRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // React state for UI indicators & active card
  const [displayRotation, setDisplayRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(400);

  // Responsive radius calculation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) setRadius(280);
      else if (w < 1024) setRadius(340);
      else if (w < 1280) setRadius(380);
      else setRadius(420);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main High-Precision Physics Loop (Lerp + Momentum Inertia + Auto-Pan)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      if (!isDraggingRef.current) {
        // Apply inertia velocity decay
        if (Math.abs(velocityRef.current) > 0.005) {
          targetRotationRef.current += velocityRef.current * (dt / 16);
          velocityRef.current *= 0.92; // smooth exponential friction
        } else {
          velocityRef.current = 0;
          idleTimerRef.current += dt;

          // Gentle continuous turntable auto-pan when user is idle for 2.5s
          if (idleTimerRef.current > 2500 && !isMobile) {
            targetRotationRef.current += 0.045 * (dt / 16);
          }
        }
      } else {
        idleTimerRef.current = 0;
      }

      // Smooth Spring / Lerp towards target rotation
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.085;

      // Sync display state occasionally for active index calculation
      const curr = currentRotationRef.current;
      setDisplayRotation(curr);

      const normalized = ((-curr % 360) + 360) % 360;
      const nearestIdx = Math.round(normalized / angleStep) % total;
      setActiveIndex(nearestIdx);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [angleStep, total, isMobile]);

  // Pointer & Drag Interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    idleTimerRef.current = 0;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    const dx = e.clientX - lastPointerXRef.current;

    // Apply drag directly to target with sensitivity
    const dragFactor = isMobile ? 0.35 : 0.28;
    targetRotationRef.current -= dx * dragFactor;

    // Track instant velocity for inertia throw
    velocityRef.current = -dx / dt * 5.2;

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    playTactileClick(1400, 0.02);
  };

  // Step Buttons (Next / Prev with Smooth Spring Settling)
  const handleNext = useCallback(() => {
    playTactileClick(1600, 0.03);
    idleTimerRef.current = 0;
    velocityRef.current = 0;
    const currentNearest = Math.round(targetRotationRef.current / angleStep);
    targetRotationRef.current = (currentNearest + 1) * angleStep;
  }, [angleStep]);

  const handlePrev = useCallback(() => {
    playTactileClick(1600, 0.03);
    idleTimerRef.current = 0;
    velocityRef.current = 0;
    const currentNearest = Math.round(targetRotationRef.current / angleStep);
    targetRotationRef.current = (currentNearest - 1) * angleStep;
  }, [angleStep]);

  // Direct Card or Dot Click (Smooth Shortest-Path Spin)
  const handleSelectCard = (index: number) => {
    playTactileClick(1700, 0.03);
    idleTimerRef.current = 0;
    velocityRef.current = 0;

    const targetAngle = -index * angleStep;
    const curr = targetRotationRef.current;
    const currentNorm = ((curr % 360) + 360) % 360;
    const targetNorm = ((targetAngle % 360) + 360) % 360;

    let delta = targetNorm - currentNorm;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    targetRotationRef.current = curr + delta;
  };

  const activeProduct = runwayProducts[activeIndex] || runwayProducts[0];

  return (
    <section
      id="orbit-showcase"
      className="relative w-full py-18 sm:py-26 select-none overflow-hidden transition-colors duration-300"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    >
      {/* Studio Ambient Backdrops */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] pointer-events-none ${
          isDark ? 'bg-[#6D2E58]/18' : 'bg-[#C88DA0]/14'
        }`}
      />
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-[450px] h-[250px] rounded-full blur-[120px] pointer-events-none ${
          isDark ? 'bg-[#C88DA0]/10' : 'bg-[#6D2E58]/8'
        }`}
      />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10 sm:mb-14 relative z-10 pointer-events-none">
        <div
          className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-4 border shadow-xs ${
            isDark
              ? 'bg-white/5 border-white/15 text-[#C88DA0]'
              : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C88DA0]" />
          <span>360° Studio Runway · Kalyan Workshop</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
          Every product in <em className="italic text-[#C88DA0] font-normal">tactile 360° motion.</em>
        </h2>
        <p
          className={`mt-3 text-xs sm:text-base max-w-xl mx-auto leading-relaxed ${
            isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
          }`}
        >
          Drag horizontally to spin the studio turntable. Experience our confirmed corporate merchandise and handcrafted personal keepsakes from every angle.
        </p>
      </div>

      {/* ─── 3D PERSPECTIVE ORBIT STAGE ─── */}
      <div className="relative w-full h-[400px] sm:h-[460px] my-4 flex items-center justify-center orbit-cylinder-stage">
        
        {/* Studio Turntable Ground Ring Shadow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-28 sm:translate-y-36 w-[500px] sm:w-[650px] h-20 rounded-full blur-xl pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse, rgba(109,46,88,0.4) 0%, rgba(0,0,0,0) 70%)'
              : 'radial-gradient(ellipse, rgba(109,46,88,0.18) 0%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* 3D Rotating Ring Container */}
        <div
          className="orbit-cylinder-ring relative w-[240px] sm:w-[260px] h-[340px] sm:h-[370px]"
          style={{
            transform: `rotateY(${-displayRotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {runwayProducts.map((product, index) => {
            const cardAngle = index * angleStep;
            const relAngle = ((cardAngle - displayRotation) % 360 + 360) % 360;
            const rad = (relAngle * Math.PI) / 180;
            const cosVal = Math.cos(rad);

            // Hide cards pointing away (> 90 degrees back) to eliminate crowding and optimize rendering
            if (cosVal < 0.05) return null;

            const isFront = cosVal > 0.72;
            const isCurrentActive = index === activeIndex;
            const blurPx = Math.max(0, Math.round((1 - cosVal) * 2.5));
            const opacity = Math.max(0.4, cosVal);
            const scale = Math.max(0.85, 0.92 + cosVal * 0.12);
            const zIndex = Math.round((cosVal + 1) * 100);

            const imageSrc = product.imageUrl || getProductImage(product.id);

            return (
              <div
                key={product.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCard(index);
                }}
                className="orbit-card-item absolute inset-0 rounded-3xl overflow-hidden transition-all duration-150"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  filter: `blur(${blurPx}px)`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: isFront ? 'auto' : 'none',
                }}
              >
                <div
                  className={`w-full h-full p-3.5 sm:p-4 flex flex-col justify-between rounded-3xl relative overflow-hidden transition-all duration-300 border ${
                    isDark
                      ? 'bg-[#26202A]/95 border-white/15'
                      : 'bg-white/95 border-[#6D2E58]/20 shadow-[0_15px_35px_rgba(109,46,88,0.08)]'
                  } ${
                    isCurrentActive
                      ? 'ring-2 ring-[#C88DA0] shadow-[0_20px_45px_rgba(109,46,88,0.25)]'
                      : ''
                  }`}
                >
                  {/* Product Photography Container */}
                  <div className="relative w-full h-[60%] rounded-2xl overflow-hidden bg-black/10">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                          product.isBulkOnly
                            ? 'bg-[#6D2E58]/90 text-[#F8F4EA] border border-[#C88DA0]/40'
                            : 'bg-white/90 text-[#6D2E58] border border-[#6D2E58]/30'
                        }`}
                      >
                        {product.isBulkOnly ? (
                          <>
                            <Box className="w-2.5 h-2.5 text-[#EBC6CF]" />
                            <span>MOQ: 36 pcs</span>
                          </>
                        ) : (
                          <>
                            <Heart className="w-2.5 h-2.5 text-[#C88DA0] fill-[#C88DA0]" />
                            <span>No MOQ</span>
                          </>
                        )}
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-black/80 text-[#F8F4EA] backdrop-blur-md shadow-xs">
                        {product.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Editorial Info */}
                  <div className="pt-2.5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-lg font-semibold leading-tight line-clamp-1 group-hover:text-[#C88DA0]">
                        {product.name}
                      </h3>
                      <p
                        className={`text-[11px] line-clamp-1 mt-1 leading-relaxed ${
                          isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                        }`}
                      >
                        {product.description}
                      </p>
                    </div>

                    {/* Customise & Preview Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTactileClick(1800, 0.03);
                          onCustomiseProduct(product);
                        }}
                        className="w-full py-2 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] flex items-center justify-center gap-1.5"
                      >
                        <span>Customise &amp; Preview</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── FOCUSED PRODUCT BAR & STUDIO CONTROLS ─── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20">
        
        {/* Navigation Arrows & Dot Indicators */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full flex items-center justify-center border hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md ${
              isDark
                ? 'bg-[#26202A] border-white/20 text-[#F8F4EA] hover:bg-white/10'
                : 'bg-white border-[#6D2E58]/25 text-[#2E2A32] hover:bg-[#F8F4EA]'
            }`}
            title="Previous Piece"
            aria-label="Previous piece"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Dot Array */}
          <div className="flex items-center gap-1.5 px-2">
            {runwayProducts.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => handleSelectCard(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === activeIndex
                    ? 'w-6 h-2 bg-[#6D2E58] dark:bg-[#C88DA0]'
                    : 'w-2 h-2 bg-current opacity-30 hover:opacity-70'
                }`}
                aria-label={`Jump to item ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className={`w-10 h-10 rounded-full flex items-center justify-center border hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md ${
              isDark
                ? 'bg-[#26202A] border-white/20 text-[#F8F4EA] hover:bg-white/10'
                : 'bg-white border-[#6D2E58]/25 text-[#2E2A32] hover:bg-[#F8F4EA]'
            }`}
            title="Next Piece"
            aria-label="Next piece"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Focused Product WhatsApp Action */}
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-75 tabular-nums font-mono">
            0{activeIndex + 1} / 0{total}
          </span>
          <a
            href={buildWhatsAppUrl(
              `Hello Amora! I am viewing "${activeProduct?.name}" (${activeProduct?.priceLabel}) on your 360° Studio Runway and would like to enquire.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick(1700, 0.03)}
            className="rounded-full px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] border border-[#C88DA0]/40"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Enquire about {activeProduct?.shortName}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default CircularProductOrbit;
