import React from 'react';
import { Check, Plus, Sparkles } from 'lucide-react';
import type { OrderMode, Product, ProductCategory } from '../types';
import { CATEGORY_TABS } from '../data/products';
import { ProductVisual } from './ProductVisual';

interface ShopSectionProps {
  products: Product[];
  activeCategory: ProductCategory;
  orderMode: OrderMode;
  onCategoryChange: (category: ProductCategory) => void;
  onOrderModeChange: (mode: OrderMode) => void;
  onOpenCustomiser: (product: Product) => void;
  onQuickAddShortlist: (product: Product) => void;
  onScrollToCorporate: () => void;
  shortlistedProductIds: Set<string>;
  theme?: 'dark' | 'light';
}

const ORDER_MODES: Array<{ id: OrderMode; label: string }> = [
  { id: 'all', label: 'All Orders' },
  { id: 'personal', label: 'Personal (No MOQ)' },
  { id: 'bulk', label: 'Corporate (MOQ 30+)' },
];

/* ─── 3D Tilt Card wrapper with Specular Spotlight ─── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState('');
  const [glowPosition, setGlowPosition] = React.useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 12;
    const rotateX = (0.5 - y) * 10;
    setTransform(`perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    setGlowPosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0) rotateY(0) scale(1)');
    setGlowPosition({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className || ''}`}
      style={{
        transform,
        transition: 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(227,164,174,0.18) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  activeCategory,
  orderMode,
  onCategoryChange,
  onOrderModeChange,
  onOpenCustomiser,
  onQuickAddShortlist,
  onScrollToCorporate,
  shortlistedProductIds,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === 'All' || product.categories.includes(activeCategory);
      const modeMatch =
        orderMode === 'all' ||
        (orderMode === 'personal' && !product.isBulkOnly) ||
        (orderMode === 'bulk' && product.isBulkOnly);
      return categoryMatch && modeMatch;
    });
  }, [products, activeCategory, orderMode]);

  return (
    <section id="shop" className="py-24 lg:py-32 relative overflow-hidden border-t border-b transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#E3A4AE]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#76577B]/12 blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold uppercase tracking-wider mb-4 ${
              isDark ? 'border border-[#E3A4AE]/30 text-[#E3A4AE]' : 'border border-[#76577B]/25 text-[#76577B] shadow-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#F3C69F]" />
              Interactive 3D Product Catalogue
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.05]">
              Curated prints, keepsakes <br />
              <em className="text-[#E3A4AE] italic font-normal">&amp; corporate merchandise.</em>
            </h2>
            <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-[#FAF6F0]/75' : 'text-[#424D55]'}`}>
              Hover to tilt in real-time 3D. Personal keepsakes have zero minimum order; corporate items require a minimum of 30 pieces.
            </p>
          </div>

          {/* Order Mode Pill Toggle */}
          <div className={`flex items-center gap-1.5 p-1.5 rounded-full border self-start lg:self-end ${
            isDark ? 'liquid-glass border-white/15' : 'bg-white border-[#76577B]/20 shadow-sm'
          }`}>
            {ORDER_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onOrderModeChange(mode.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  orderMode === mode.id
                    ? isDark
                      ? 'bg-white text-[#0B0E14] shadow-md scale-100'
                      : 'bg-[#232E36] text-[#FAF6F0] shadow-md scale-100'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? isDark
                    ? 'liquid-glass-plum text-white border border-[#E3A4AE]/60 shadow-lg'
                    : 'bg-[#76577B] text-white border border-[#76577B] shadow-md'
                  : isDark
                    ? 'liquid-glass text-[#CBD5E1] hover:text-white border border-white/10'
                    : 'bg-white text-[#424D55] hover:text-[#161E24] hover:bg-[#FAF6F0] border border-[#76577B]/20 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isShortlisted = shortlistedProductIds.has(product.id);

            return (
              <TiltCard
                key={product.id}
                className={`rounded-3xl p-5 border flex flex-col justify-between group shadow-xl transition-all duration-300 ${
                  isDark
                    ? 'liquid-glass border-white/10 hover:border-[#E3A4AE]/40'
                    : 'bg-white border-[#76577B]/15 hover:border-[#76577B]/35 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        product.isBulkOnly
                          ? 'bg-[#F3C69F]/20 text-[#F3C69F] border border-[#F3C69F]/30'
                          : 'bg-[#E3A4AE]/20 text-[#E3A4AE] border border-[#E3A4AE]/30'
                      }`}
                    >
                      {product.isBulkOnly ? 'MOQ: 30+ Pieces' : 'No Minimum Order'}
                    </span>
                    <span className="font-serif text-sm font-semibold">
                      {product.priceLabel}
                    </span>
                  </div>

                  {/* 3D Visual Mockup */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/20 border border-current/10 flex items-center justify-center p-3 mb-4 group-hover:scale-[1.02] transition-transform duration-300">
                    <ProductVisual
                      visualType={product.visualType}
                      accentColor={product.defaultAccent}
                      customText={product.defaultSampleText}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl font-semibold mb-1.5 group-hover:text-[#E3A4AE] transition-colors">
                    {product.name}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${
                    isDark ? 'text-[#FAF6F0]/65' : 'text-[#424D55]'
                  }`}>
                    {product.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-current/10">
                  <button
                    type="button"
                    onClick={() => onOpenCustomiser(product)}
                    className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-transform hover:scale-[1.02] text-center cursor-pointer shadow-sm ${
                      isDark
                        ? 'bg-white text-[#0B0E14] hover:bg-[#FAF6F0]'
                        : 'bg-[#232E36] text-[#FAF6F0] hover:bg-[#3A4750]'
                    }`}
                  >
                    Customise &amp; Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => onQuickAddShortlist(product)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                      isShortlisted
                        ? 'bg-[#E3A4AE] text-[#0B0E14] border-[#E3A4AE]'
                        : isDark
                        ? 'liquid-glass text-white/80 hover:text-white border-white/15'
                        : 'bg-[#FAF6F0] text-[#76577B] hover:bg-white border-[#76577B]/20'
                    }`}
                    title={isShortlisted ? 'In Quote Tray' : 'Add to Quote Tray'}
                  >
                    {isShortlisted ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
