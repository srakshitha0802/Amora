import React from 'react';
import { Check, Plus, MessageCircle, Sparkles, Building2, Heart } from 'lucide-react';
import type { OrderMode, Product, ProductCategory } from '../types';
import { CATEGORY_TABS, buildProductEnquiryWhatsAppUrl } from '../data/products';
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
  { id: 'all', label: 'All Products' },
  { id: 'bulk', label: 'Corporate Merchandise (MOQ 36+)' },
  { id: 'personal', label: 'Personal Keepsakes (No MOQ)' },
];

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  activeCategory,
  orderMode,
  onCategoryChange,
  onOrderModeChange,
  onOpenCustomiser,
  onQuickAddShortlist,
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
    <section id="shop" className="py-20 lg:py-28 relative overflow-hidden border-t border-b border-current/10 transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className={`absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-[#6D2E58]/12' : 'bg-[#C88DA0]/10'
      }`} />
      <div className={`absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-[#C88DA0]/10' : 'bg-[#6D2E58]/8'
      }`} />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
              isDark
                ? 'bg-white/5 border-white/15 text-[#C88DA0]'
                : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#C88DA0]" />
              <span>Studio Product Catalogue</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight leading-[1.08]">
              Personalised gifts, custom merchandise <br />
              <em className="text-[#C88DA0] italic font-normal">&amp; print solutions.</em>
            </h2>
            <p className={`mt-3 text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
            }`}>
              Select from consumer keepsakes with no minimum order or explore our confirmed corporate merchandise catalogue (strict MOQ: 36 pieces).
            </p>
          </div>

          {/* Order Mode Pill Toggle */}
          <div className={`flex items-center gap-1.5 p-1.5 rounded-full border self-start lg:self-end ${
            isDark ? 'bg-[#26202A]/80 border-white/15' : 'bg-white border-[#6D2E58]/20 shadow-xs'
          }`}>
            {ORDER_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onOrderModeChange(mode.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  orderMode === mode.id
                    ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md scale-100'
                    : 'opacity-75 hover:opacity-100'
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
              className={`px-4.5 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md border border-[#6D2E58]'
                  : isDark
                  ? 'bg-white/5 text-[#D8C6E6] hover:text-white border border-white/10'
                  : 'bg-white text-[#584F5E] hover:text-[#2E2A32] hover:bg-[#F8F4EA] border border-[#6D2E58]/15 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isShortlisted = shortlistedProductIds.has(product.id);
            const isCorporate = product.isBulkOnly || product.primaryCategory === 'Corporate Merchandise';
            const enquiryWhatsAppUrl = buildProductEnquiryWhatsAppUrl(
              `${product.name} (${product.shortName})`
            );

            return (
              <div
                key={product.id}
                className={`rounded-3xl p-5 border flex flex-col justify-between group shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#26202A]/70 border-white/10 hover:border-[#C88DA0]/40'
                    : 'bg-white border-[#6D2E58]/15 hover:border-[#6D2E58]/35 shadow-[0_8px_24px_rgba(109,46,88,0.04)]'
                }`}
              >
                <div>
                  {/* Top Badge & Confirmed Price */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                        isCorporate
                          ? 'bg-[#6D2E58]/15 text-[#C88DA0] border border-[#6D2E58]/30'
                          : 'bg-[#C88DA0]/15 text-[#6D2E58] border border-[#C88DA0]/30'
                      }`}
                    >
                      {isCorporate ? (
                        <>
                          <Building2 className="w-3 h-3 text-[#C88DA0]" />
                          <span>MOQ: 36 Pieces</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-3 h-3 text-[#C88DA0]" />
                          <span>No MOQ (From 1 pc)</span>
                        </>
                      )}
                    </span>
                    <span className="font-serif text-base font-semibold text-[#6D2E58]">
                      {product.priceLabel}
                    </span>
                  </div>

                  {/* Visual Mockup Container */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black/10 border border-current/10 flex items-center justify-center p-3 mb-4 group-hover:scale-[1.01] transition-transform duration-300">
                    <ProductVisual
                      visualType={product.visualType}
                      accentColor={product.defaultAccent}
                      customText={product.defaultSampleText}
                      imageUrl={product.imageUrl}
                      alt={product.name}
                    />
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-serif text-xl font-semibold mb-1.5 group-hover:text-[#C88DA0] transition-colors">
                    {product.name}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 mb-3 ${
                    isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                  }`}>
                    {product.description}
                  </p>

                  {/* Specifications & Custom Branding Information */}
                  <div className="space-y-1 mb-4">
                    {product.customisationInfo && (
                      <p className={`text-[11px] leading-tight font-medium ${
                        isDark ? 'text-[#C88DA0]' : 'text-[#6D2E58]'
                      }`}>
                        <span className="font-semibold">Customisation:</span> {product.customisationInfo}
                      </p>
                    )}
                    {isCorporate && (
                      <p className={`text-[10px] italic ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>
                        * Shipping charges are excluded. Final quotations depend on quantity &amp; artwork requirements.
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-col gap-2 pt-3 border-t border-current/10">
                  {isCorporate ? (
                    <div className="flex items-center gap-2">
                      {/* Enquire for Bulk Orders button (Direct WhatsApp enquiry route) */}
                      <a
                        href={enquiryWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl text-center shadow-md bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Enquire for Bulk Orders</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => onQuickAddShortlist(product)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                          isShortlisted
                            ? 'bg-[#C88DA0] text-[#1A161E] border-[#C88DA0]'
                            : isDark
                            ? 'bg-white/5 text-[#F8F4EA]/80 hover:text-white border-white/15'
                            : 'bg-[#F8F4EA] text-[#6D2E58] hover:bg-white border-[#6D2E58]/20'
                        }`}
                        title={isShortlisted ? 'In Enquiry Cart' : 'Add to Enquiry Cart'}
                        aria-label="Add to Enquiry Cart"
                      >
                        {isShortlisted ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenCustomiser(product)}
                        className={`flex-1 py-2.5 px-3 text-xs font-semibold rounded-xl transition-transform hover:scale-[1.01] text-center cursor-pointer shadow-sm ${
                          isDark
                            ? 'bg-[#F8F4EA] text-[#1A161E] hover:bg-[#EBC6CF]'
                            : 'bg-[#2E2A32] text-[#F8F4EA] hover:bg-[#453F4B]'
                        }`}
                      >
                        Customise &amp; Preview
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickAddShortlist(product)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                          isShortlisted
                            ? 'bg-[#C88DA0] text-[#1A161E] border-[#C88DA0]'
                            : isDark
                            ? 'bg-white/5 text-[#F8F4EA]/80 hover:text-white border-white/15'
                            : 'bg-[#F8F4EA] text-[#6D2E58] hover:bg-white border-[#6D2E58]/20'
                        }`}
                        title={isShortlisted ? 'In Enquiry Cart' : 'Add to Enquiry Cart'}
                        aria-label="Add to Enquiry Cart"
                      >
                        {isShortlisted ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>

                      <a
                        href={enquiryWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                          isDark
                            ? 'bg-white/5 text-[#25D366] hover:bg-white/10 border-white/15'
                            : 'bg-[#F8F4EA] text-[#25D366] hover:bg-white border-[#6D2E58]/20'
                        }`}
                        title="Enquire on WhatsApp"
                        aria-label="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
