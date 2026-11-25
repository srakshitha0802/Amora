import React from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl, getProductImage } from '../data/products';
import type { Product } from '../types';

interface KeepsakeShowcaseProps {
  onCustomiseProduct: (product: Product) => void;
  products: Product[];
  theme?: 'dark' | 'light';
}

export const KeepsakeShowcase: React.FC<KeepsakeShowcaseProps> = ({
  onCustomiseProduct,
  products,
  theme = 'light',
}) => {
  const keepsakeProducts = products.filter((p) => !p.isBulkOnly);
  const isDark = theme === 'dark';

  return (
    <section id="keepsakes" className="py-24 lg:py-32 relative overflow-hidden border-t border-b border-current/10 transition-colors duration-300">
      {/* Background ambient radial glows */}
      <div
        className={`absolute top-10 left-10 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none ${
          isDark ? 'bg-[#6D2E58]/16' : 'bg-[#C88DA0]/12'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-[#C88DA0]/12' : 'bg-[#6D2E58]/8'
        }`}
      />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border ${
                isDark
                  ? 'bg-white/5 border-white/15 text-[#C88DA0]'
                  : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C88DA0]" />
              <span>Amora Creative · Handcrafted Keepsakes · No Minimum Order</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.05]">
              Thoughtful keepsakes, <br />
              <em className="text-[#C88DA0] italic font-normal">crafted one piece at a time.</em>
            </h2>
            <p
              className={`mt-4 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
              }`}
            >
              Each polaroid, film strip, and ribbon bookmark is individually inspected and hand-packed with signature Amora wax-seal packaging in our Kalyan studio. Order from a single piece.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl(
              'Hello Amora! I would like to order a personalised keepsake (Polaroids / Bookmark / Spotify Print) from your Kalyan studio.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-7 py-3.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-xl inline-flex items-center gap-2.5 whitespace-nowrap self-start md:self-end cursor-pointer bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] border border-[#C88DA0]/30"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Personalise on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 text-[#EBC6CF]" />
          </a>
        </div>

        {/* Humanised Artisan Process Bar */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl mb-12 border ${
            isDark
              ? 'bg-[#26202A]/60 border-white/10 text-[#D8C6E6]'
              : 'bg-white/80 border-[#6D2E58]/15 text-[#584F5E] shadow-sm'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#6D2E58]/15 text-[#6D2E58] dark:text-[#C88DA0] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              01
            </span>
            <div>
              <p className="text-xs font-semibold text-current">300 GSM Archival Stock</p>
              <p className="text-[11px] opacity-75">Anti-glare velvet matte &amp; vivid gloss UV paper</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#6D2E58]/15 text-[#6D2E58] dark:text-[#C88DA0] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              02
            </span>
            <div>
              <p className="text-xs font-semibold text-current">Hand-Inspected in Kalyan</p>
              <p className="text-[11px] opacity-75">Every print proofed under 5000K daylight</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#6D2E58]/15 text-[#6D2E58] dark:text-[#C88DA0] flex items-center justify-center font-serif font-bold text-sm shrink-0">
              03
            </span>
            <div>
              <p className="text-xs font-semibold text-current">Wax-Sealed Packaging</p>
              <p className="text-[11px] opacity-75">Arrives gift-ready in textured envelopes</p>
            </div>
          </div>
        </div>

        {/* Keepsake Cards with Genuine Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {keepsakeProducts.slice(0, 9).map((item) => {
            const imageSrc = item.imageUrl || getProductImage(item.id);

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl border ${
                  isDark
                    ? 'bg-[#26202A] border-white/10 hover:border-[#C88DA0]/40'
                    : 'bg-white border-[#6D2E58]/15 hover:border-[#6D2E58]/35 shadow-[0_10px_30px_rgba(109,46,88,0.05)]'
                }`}
              >
                <div>
                  {/* Photo area */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-black/10">
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#6D2E58] border border-[#6D2E58]/20 text-[11px] font-semibold shadow-sm backdrop-blur-md">
                        <Heart className="w-3 h-3 text-[#C88DA0] fill-[#C88DA0]" />
                        <span>No Minimum Order</span>
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/80 text-[#F8F4EA] backdrop-blur-md shadow-sm">
                        {item.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Product Title & Description */}
                  <h3 className="font-serif text-2xl font-semibold mb-2 group-hover:text-[#C88DA0] transition-colors">
                    {item.name}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-5 ${
                      isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Specs Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-[#D8C6E6]'
                            : 'bg-[#F8F4EA] border-[#6D2E58]/15 text-[#6D2E58]'
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-current/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] opacity-75">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Wax-sealed packaging</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCustomiseProduct(item)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#6D2E58] hover:bg-[#8E4474] text-[#F8F4EA] transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    Customise &amp; Preview
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeepsakeShowcase;
