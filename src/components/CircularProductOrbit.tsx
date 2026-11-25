import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, MessageCircle, Heart, Box } from 'lucide-react';
import type { Product } from '../types';
import { buildWhatsAppUrl } from '../data/products';

interface CircularProductOrbitProps {
  products: Product[];
  onCustomiseProduct: (product: Product) => void;
  theme?: 'dark' | 'light';
}

// Curated high-res editorial photos for each product
const PRODUCT_EDITORIAL_IMAGES: Record<string, string> = {
  'photo-frames': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  'bookmarks': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'photocards-posters': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  'polaroids': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
  'sticker-sheets': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'photostrips-letters': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
  'water-bottles': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
  'mugs': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
  'mousepads': 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80',
  'keyboard-mats': 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
};

export const CircularProductOrbit: React.FC<CircularProductOrbitProps> = ({
  products,
  onCustomiseProduct,
  theme = 'dark',
}) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const dragStartRef = useRef<{ x: number; rotation: number }>({ x: 0, rotation: 0 });
  const touchStartRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = products.length;
  const angleStep = 360 / total;

  // Responsive device mode and radius
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius] = useState(420);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const mobile = w < 768;
      setIsMobile(mobile);
      if (w < 1024) setRadius(350);
      else if (w < 1280) setRadius(390);
      else setRadius(420);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth continuous auto-rotation on desktop when idle
  useEffect(() => {
    if (isMobile || !isAutoRotating || isDragging) return;

    const tick = () => {
      setRotation((prev) => (prev + 0.12) % 360);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isMobile, isAutoRotating, isDragging]);

  // Pointer drag events on desktop
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return;
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartRef.current = {
      x: e.clientX,
      rotation: rotation,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isMobile) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const nextRotation = dragStartRef.current.rotation - deltaX * 0.42;
    setRotation(nextRotation);
  };

  const handlePointerUp = () => {
    if (isMobile) return;
    setIsDragging(false);
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 4500);
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      touchStartRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0]?.clientX;
    if (touchEnd !== undefined) {
      const diff = touchStartRef.current - touchEnd;
      if (diff > 40) {
        handleNext();
      } else if (diff < -40) {
        handlePrev();
      }
    }
    touchStartRef.current = null;
  };

  // Step controls
  const handleNext = () => {
    setIsAutoRotating(false);
    setRotation((prev) => Math.round((prev + angleStep) / angleStep) * angleStep);
  };

  const handlePrev = () => {
    setIsAutoRotating(false);
    setRotation((prev) => Math.round((prev - angleStep) / angleStep) * angleStep);
  };

  const handleCardClick = (index: number) => {
    setIsAutoRotating(false);
    const targetAngle = -index * angleStep;
    const currentNorm = ((rotation % 360) + 360) % 360;
    const targetNorm = ((targetAngle % 360) + 360) % 360;
    let diff = targetNorm - currentNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    setRotation(rotation + diff);
  };

  // Active front card index
  const activeIndex = useMemo(() => {
    const norm = ((-rotation % 360) + 360) % 360;
    return Math.round(norm / angleStep) % total;
  }, [rotation, angleStep, total]);

  const activeProduct = products[activeIndex] || products[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 select-none overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: !isMobile && isDragging ? 'grabbing' : !isMobile ? 'grab' : 'default' }}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#76577B]/12 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-[#E3A4AE]/12 blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-6 sm:mb-8 relative z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full liquid-glass border border-[#E3A4AE]/30 text-[#E3A4AE] text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#F3C69F]" />
          <span>Interactive 3D Orbit Runway · Spin to Explore</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight">
          Every piece in <em className="italic text-[#E3A4AE] font-normal">360° motion.</em>
        </h2>
        <p className="mt-3 text-xs sm:text-base text-current opacity-70 max-w-xl mx-auto">
          {isMobile
            ? 'Swipe or use arrows to discover keepsakes & corporate merchandise.'
            : 'Drag horizontally, flick, or use the controls below to rotate the 3D showcase.'}
        </p>
      </div>

      {isMobile ? (
        /* ─── MOBILE TOUCH CAROUSEL: Zero Overlap, 100% Crisp & Responsive ─── */
        <div
          className="relative w-full px-5 max-w-[340px] mx-auto z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`w-full rounded-2xl p-3.5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 shadow-xl border ${
              theme === 'dark'
                ? 'bg-[#0B0E14]/95 border-white/15'
                : 'bg-white border-[#76577B]/20 shadow-xl'
            }`}
          >
            {/* Product Image Area */}
            <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-black/20 mb-3">
              <img
                src={PRODUCT_EDITORIAL_IMAGES[activeProduct.id] || PRODUCT_EDITORIAL_IMAGES['photo-frames']}
                alt={activeProduct.name}
                className="w-full h-full object-cover"
              />

              {/* Badge Pill */}
              <div className="absolute top-2 left-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                    activeProduct.isBulkOnly
                      ? 'bg-[#232E36]/90 text-[#F3C69F] border border-[#F3C69F]/40'
                      : 'bg-white/90 text-[#76577B] border border-[#E3A4AE]/40'
                  }`}
                >
                  {activeProduct.isBulkOnly ? (
                    <>
                      <Box className="w-2.5 h-2.5 text-[#F3C69F]" />
                      MOQ: 30+
                    </>
                  ) : (
                    <>
                      <Heart className="w-2.5 h-2.5 text-[#E3A4AE] fill-[#E3A4AE]" />
                      No MOQ
                    </>
                  )}
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-2 right-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-black/70 text-[#FAF6F0] backdrop-blur-md">
                  {activeProduct.priceLabel}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-lg font-semibold leading-tight line-clamp-1">
                  {activeProduct.name}
                </h3>
                <p className="text-[11px] opacity-75 mt-1 leading-relaxed line-clamp-2">
                  {activeProduct.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onCustomiseProduct(activeProduct)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer shadow-sm ${
                    theme === 'dark'
                      ? 'bg-white text-[#06080C] hover:bg-[#FAF6F0]'
                      : 'bg-[#76577B] text-white hover:bg-[#5E4462]'
                  }`}
                >
                  Customise &amp; Preview
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="text-center mt-3 text-[11px] opacity-60">
            Swipe left or right · {activeIndex + 1} of {total}
          </div>
        </div>
      ) : (
        /* ─── DESKTOP 3D ORBIT CYLINDER: Front-Focused, Elegantly Proportioned ─── */
        <div className="relative w-full h-[420px] sm:h-[450px] my-2 flex items-center justify-center orbit-cylinder-stage">
          <div
            className="orbit-cylinder-ring relative w-[230px] h-[320px]"
            style={{
              transform: `rotateY(${-rotation}deg)`,
            }}
          >
            {products.map((product, index) => {
              const cardAngle = index * angleStep;
              const relAngle = ((cardAngle - rotation) % 360 + 360) % 360;
              const rad = (relAngle * Math.PI) / 180;
              const cosVal = Math.cos(rad);

              // Hide back-facing cards to eliminate overlapping clutter
              if (cosVal < 0.05) return null;

              const isFront = cosVal > 0.65;
              const blurPx = Math.max(0, Math.round((1 - cosVal) * 3));
              const opacity = Math.max(0.45, cosVal);
              const scale = Math.max(0.88, 0.94 + cosVal * 0.06);

              const isCurrentActive = index === activeIndex;
              const imageSrc = PRODUCT_EDITORIAL_IMAGES[product.id] || PRODUCT_EDITORIAL_IMAGES['photo-frames'];

              return (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(index)}
                  className="orbit-card-item absolute inset-0 rounded-2xl overflow-hidden shadow-xl transition-all duration-200"
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(${radius}px) scale(${scale})`,
                    filter: `blur(${blurPx}px)`,
                    opacity: opacity,
                    zIndex: Math.round((cosVal + 1) * 100),
                    pointerEvents: isFront ? 'auto' : 'none',
                  }}
                >
                  <div
                    className={`w-full h-full p-3 flex flex-col justify-between rounded-2xl relative overflow-hidden transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-[#0B0E14]/92 border border-white/15'
                        : 'bg-white/95 border border-[#76577B]/20 shadow-xl'
                    } ${isCurrentActive ? 'ring-2 ring-[#E3A4AE]/60 shadow-[0_15px_35px_rgba(118,87,123,0.3)]' : ''}`}
                  >
                    {/* Product Image Area */}
                    <div className="relative w-full h-[58%] rounded-xl overflow-hidden bg-black/20">
                      <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />

                      {/* Badge Pill */}
                      <div className="absolute top-2 left-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-sm ${
                            product.isBulkOnly
                              ? 'bg-[#232E36]/85 text-[#F3C69F] border border-[#F3C69F]/40'
                              : 'bg-white/85 text-[#76577B] border border-[#E3A4AE]/40'
                          }`}
                        >
                          {product.isBulkOnly ? (
                            <>
                              <Box className="w-2.5 h-2.5 text-[#F3C69F]" />
                              MOQ: 30+
                            </>
                          ) : (
                            <>
                              <Heart className="w-2.5 h-2.5 text-[#E3A4AE] fill-[#E3A4AE]" />
                              No MOQ
                            </>
                          )}
                        </span>
                      </div>

                      {/* Price Tag */}
                      <div className="absolute bottom-2 right-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-[#FAF6F0] backdrop-blur-md">
                          {product.priceLabel}
                        </span>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="pt-2 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-serif text-base font-semibold leading-snug line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-[11px] opacity-70 line-clamp-1 mt-0.5">
                          {product.description}
                        </p>
                      </div>

                      {/* Primary Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onCustomiseProduct(product);
                          }}
                          className={`w-full py-1.5 px-3 text-[11px] font-semibold rounded-lg transition-all cursor-pointer shadow-sm ${
                            theme === 'dark'
                              ? 'bg-white text-[#06080C] hover:bg-[#FAF6F0]'
                              : 'bg-[#76577B] text-white hover:bg-[#5E4462]'
                          }`}
                        >
                          Customise &amp; Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Orbit Navigation Controls & Active Product Focal Bar */}
      <div className="max-w-xl mx-auto px-6 mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full flex items-center justify-center border hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md ${
              theme === 'dark'
                ? 'liquid-glass border-white/20 text-white'
                : 'bg-white border-[#76577B]/25 text-[#161E24]'
            }`}
            title="Previous Product"
            aria-label="Previous product"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`w-10 h-10 rounded-full flex items-center justify-center border hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md ${
              theme === 'dark'
                ? 'liquid-glass border-white/20 text-white'
                : 'bg-white border-[#76577B]/25 text-[#161E24]'
            }`}
            title="Next Product"
            aria-label="Next product"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-xs opacity-70 tracking-wider tabular-nums font-semibold">
            {activeIndex + 1} / {total}
          </span>
        </div>

        {/* Quick WhatsApp Inquiry for Current Focus Product */}
        <a
          href={buildWhatsAppUrl(
            `Hi Achintya! I'm interested in ordering/customising "${activeProduct?.name}" at Amora.co.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full px-5 py-2.5 text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer shadow-md ${
            theme === 'dark'
              ? 'liquid-glass-plum text-white border border-[#E3A4AE]/40 hover:opacity-90'
              : 'bg-[#76577B] text-white hover:bg-[#5E4462] shadow-[#76577B]/25 border border-[#76577B]'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>Enquire about {activeProduct?.shortName}</span>
        </a>
      </div>
    </div>
  );
};

export default CircularProductOrbit;
