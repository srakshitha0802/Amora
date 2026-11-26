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

// Curated Signature Highlight Pieces for 360-degree runway turntable
const FEATURED_RUNWAY_IDS = [
  'executive-onboarding-kit',
  'basic-white-mug',
  'black-patch-mug',
  'notebook-pen-gift-set',
  'premium-lock-diary',
  'premium-laptop-sleeve',
  'corporate-backpack',
  'fridge-magnets',
  'hook-leather-keychain',
  'steel-shape-keychain',
  'acrylic-keychain',
  'custom-printed-sipper-bottle',
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
    return featured.length >= 6 ? featured : products.slice(0, 10);
  }, [products]);

  const total = runwayProducts.length;
  const angleStep = 360 / total;

  // Physics animation state refs (100% butter-smooth)
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
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
      if (w < 640) setRadius(270);
      else if (w < 1024) setRadius(340);
      else if (w < 1280) setRadius(390);
      else setRadius(440);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main High-Precision Physics Loop (Lerp + Momentum Inertia + Gentle Auto-Pan)
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = Math.min(32, time - lastTime);
      lastTime = time;

      if (!isDraggingRef.current) {
        // Apply inertia velocity decay
        if (Math.abs(velocityRef.current) > 0.005) {
          targetRotationRef.current += velocityRef.current * (dt / 16);
          velocityRef.current *= 0.94; // Smooth exponential friction
        } else {
          velocityRef.current = 0;
          idleTimerRef.current += dt;

          // Gentle turntable auto-pan when user is idle for 2.8s
          if (idleTimerRef.current > 2800 && !isMobile) {
            targetRotationRef.current += 0.04 * (dt / 16);
          }
        }
      } else {
        idleTimerRef.current = 0;
      }

      // Smooth Spring / Lerp towards target rotation
      const diff = targetRotationRef.current - currentRotationRef.current;
      currentRotationRef.current += diff * 0.095;

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

  // Pointer & Drag Interactions with PointerCapture
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    velocityRef.current = 0;
    idleTimerRef.current = 0;
    dragStartXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    const dx = e.clientX - lastPointerXRef.current;

    // Apply drag directly to target with sensitivity
    const dragFactor = isMobile ? 0.32 : 0.25;
    targetRotationRef.current -= dx * dragFactor;

    // Track instant velocity for smooth momentum release
    velocityRef.current = (-dx / dt) * 4.8;

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    playTactileClick(1400, 0.02);
  };

  // Step Buttons (Next / Prev with Smooth Settling)
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
      className="relative w-full py-16 sm:py-24 select-none overflow-hidden transition-colors duration-300"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        touchAction: 'pan-y',
      }}
    >
      {/* Studio Ambient Backdrops */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[170px] pointer-events-none ${
          isDark ? 'bg-[#6D2E58]/18' : 'bg-[#EBC6CF]/22'
        }`}
      />
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 w-[450px] h-[250px] rounded-full blur-[130px] pointer-events-none ${
          isDark ? 'bg-[#F3C69F]/10' : 'bg-[#F8F4EA]/60'
        }`}
      />

      {/* Section Header with Hand-Drawn Flourish */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-8 sm:mb-12 relative z-10 pointer-events-none">
        <div
          className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3 border shadow-xs ${
            isDark
              ? 'bg-white/5 border-white/15 text-[#C88DA0]'
              : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C88DA0]" />
          <span>360° Studio Runway · Touch &amp; Drag Turntable</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
          Every piece in <em className="italic text-[#C88DA0] font-normal">tactile 360° motion.</em>
        </h2>

        <p className={`text-xs sm:text-sm mt-2 max-w-md mx-auto ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
          Drag horizontally or swipe to spin the handcrafted catalogue. Click any item to explore.
        </p>
      </div>

      {/* ─── 3D CYLINDRICAL TURNTABLE STAGE ─── */}
      <div
        className="relative w-full h-[400px] sm:h-[450px] flex items-center justify-center overflow-visible"
        style={{
          perspective: isMobile ? '950px' : '1350px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Subtle Turntable Shadow Disc */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${radius * 1.8}px`,
            height: '110px',
            bottom: '20px',
            background: isDark
              ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 72%)'
              : 'radial-gradient(ellipse at center, rgba(109,46,88,0.12) 0%, transparent 72%)',
            transform: 'rotateX(75deg)',
          }}
        />

        {/* 3D Rotating Ring Container */}
        <div
          className="orbit-cylinder-ring relative w-[230px] sm:w-[250px] h-[330px] sm:h-[360px]"
          style={{
            transform: `rotateY(${-displayRotation}deg)`,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {runwayProducts.map((product, index) => {
            const cardAngle = index * angleStep;
            const relAngle = ((cardAngle - displayRotation) % 360 + 360) % 360;
            const rad = (relAngle * Math.PI) / 180;
            const cosVal = Math.cos(rad);

            // Keep in DOM with visibility hidden to prevent layout thrash
            const isVisible = cosVal >= -0.15;
            const isFront = cosVal > 0.70;
            const isCurrentActive = index === activeIndex;
            const blurPx = Math.max(0, Math.round((1 - cosVal) * 2));
            const opacity = Math.max(0, Math.min(1, (cosVal + 0.15) * 1.1));
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
                className="orbit-card-item absolute inset-0 rounded-3xl overflow-hidden transition-all duration-100"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  filter: `blur(${blurPx}px)`,
                  opacity: isVisible ? opacity : 0,
                  visibility: isVisible ? 'visible' : 'hidden',
                  zIndex: zIndex,
                  pointerEvents: isFront ? 'auto' : 'none',
                }}
              >
                <div
                  className={`w-full h-full p-3 sm:p-3.5 flex flex-col justify-between rounded-3xl relative overflow-hidden transition-all duration-200 border ${
                    isDark
                      ? 'bg-[#221B25]/95 border-white/15'
                      : 'bg-white/95 border-[#6D2E58]/20 shadow-[0_15px_35px_rgba(109,46,88,0.08)]'
                  } ${
                    isCurrentActive
                      ? 'ring-2 ring-[#C88DA0] shadow-[0_20px_45px_rgba(109,46,88,0.22)]'
                      : ''
                  }`}
                >
                  {/* Product Photography Container */}
                  <div className="relative w-full h-[58%] rounded-2xl overflow-hidden bg-black/10">
                    <img
                      src={imageSrc}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />

                    {/* Category / MOQ Pill */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                          product.isBulkOnly
                            ? 'bg-[#6D2E58]/90 text-[#F8F4EA] border border-[#C88DA0]/40'
                            : 'bg-white/90 text-[#6D2E58] border border-[#6D2E58]/30'
                        }`}
                      >
                        {product.isBulkOnly ? (
                          <>
                            <Box className="w-2.5 h-2.5 text-[#EBC6CF]" />
                            <span>MOQ: 36</span>
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
                    <div className="absolute bottom-2 right-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/80 text-[#F8F4EA] backdrop-blur-md shadow-xs font-mono">
                        {product.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Editorial Info */}
                  <div className="pt-2 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-semibold leading-tight line-clamp-1">
                        {product.name}
                      </h3>
                      <p
                        className={`text-[10px] sm:text-[11px] line-clamp-1 mt-0.5 leading-relaxed ${
                          isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                        }`}
                      >
                        {product.description}
                      </p>
                    </div>

                    {/* Customise & Preview Action */}
                    <div className="pt-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playTactileClick(1800, 0.03);
                          onCustomiseProduct(product);
                        }}
                        className="w-full py-1.5 px-3 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-sm bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] flex items-center justify-center gap-1.5"
                      >
                        <span>Preview &amp; Customise</span>
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
            0{activeIndex + 1} / {total < 10 ? `0${total}` : total}
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
