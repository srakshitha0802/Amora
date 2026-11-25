import React from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/products';
import type { Product } from '../types';

interface KeepsakeShowcaseProps {
  onCustomiseProduct: (product: Product) => void;
  products: Product[];
  theme?: 'dark' | 'light';
}

const KEEPSAKE_IMAGES: Record<string, string> = {
  'photo-frames': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80',
  'bookmarks': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
  'photocards-posters': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=700&q=80',
  'polaroids': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80',
  'sticker-sheets': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80',
  'photostrips-letters': 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=700&q=80',
};

export const KeepsakeShowcase: React.FC<KeepsakeShowcaseProps> = ({
  onCustomiseProduct,
  products,
  theme = 'dark',
}) => {
  const keepsakeProducts = products.filter((p) => !p.isBulkOnly);
  const isDark = theme === 'dark';

  return (
    <section id="keepsakes" className="py-24 lg:py-32 relative overflow-hidden border-t border-b transition-colors duration-300">
      {/* Background ambient radial glows */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full bg-[#E3A4AE]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#76577B]/15 blur-[140px] pointer-events-none" />

      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs font-semibold uppercase tracking-wider mb-4 ${
              isDark ? 'border border-[#E3A4AE]/30 text-[#E3A4AE]' : 'border border-[#76577B]/25 text-[#76577B] shadow-sm'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#F3C69F]" />
              Track A · Personalised Prints &amp; Keepsakes · No MOQ
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.05]">
              Thoughtful keepsakes, <br />
              <em className="text-[#E3A4AE] italic font-normal">crafted one piece at a time.</em>
            </h2>
            <p className={`mt-4 text-base leading-relaxed ${
              isDark ? 'text-[#FAF6F0]/75' : 'text-[#424D55]'
            }`}>
              Suitable for personal gifting, birthdays, anniversaries, celebrations, and intimate moments. Each piece is printed with archival inks and hand-inspected in our Kalyan studio.
            </p>
          </div>

          <a
            href={buildWhatsAppUrl("Hi Achintya! I would like to personalise a keepsake (Polaroids / Frame / Bookmark / Photostrip) at Amora.co.")}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-xl inline-flex items-center gap-2.5 whitespace-nowrap self-start md:self-end cursor-pointer ${
              isDark
                ? 'liquid-glass-plum text-white hover:opacity-90 border border-[#E3A4AE]/40'
                : 'bg-[#76577B] text-white hover:bg-[#5E4462] shadow-[#76577B]/25 border border-[#76577B]'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Personalise on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 text-[#E3A4AE]" />
          </a>
        </div>

        {/* 6 Grid Keepsake Cards with Luxury Editorial Polish */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {keepsakeProducts.map((item) => {
            const imageSrc = KEEPSAKE_IMAGES[item.id] || KEEPSAKE_IMAGES['photo-frames'];

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-lg hover:shadow-2xl ${
                  isDark
                    ? 'liquid-glass border border-white/10 hover:border-[#E3A4AE]/40'
                    : 'bg-white border border-[#76577B]/15 hover:border-[#76577B]/35 shadow-sm'
                }`}
              >
                <div>
                  {/* Photo area */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 bg-black/20">
                    <img
                      src={imageSrc}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badge Overlay */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 text-[#76577B] border border-[#E3A4AE]/30 text-xs font-semibold shadow-sm backdrop-blur-md">
                        <Heart className="w-3 h-3 text-[#E3A4AE] fill-[#E3A4AE]" />
                        No Minimum Order
                      </span>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-black/75 text-[#FAF6F0] backdrop-blur-md shadow-sm">
                        {item.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Product Title & Description */}
                  <h3 className="font-serif text-2xl font-semibold mb-2 group-hover:text-[#E3A4AE] transition-colors">
                    {item.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-5 ${
                    isDark ? 'text-[#FAF6F0]/70' : 'text-[#424D55]'
                  }`}>
                    {item.description}
                  </p>

                  {/* Specs Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className={`px-2.5 py-1 rounded-md text-xs ${
                          isDark
                            ? 'bg-white/5 border border-white/10 text-[#FAF6F0]/80'
                            : 'bg-[#FAF6F0] border border-[#76577B]/15 text-[#76577B]'
                        }`}
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-5 border-t border-current/10">
                  <button
                    type="button"
                    onClick={() => onCustomiseProduct(item)}
                    className={`flex-1 py-3 px-4 text-xs font-semibold rounded-xl transition-transform hover:scale-[1.02] text-center cursor-pointer shadow-md ${
                      isDark
                        ? 'bg-white text-[#0B0E14] hover:bg-[#FAF6F0]'
                        : 'bg-[#232E36] text-[#FAF6F0] hover:bg-[#3A4750]'
                    }`}
                  >
                    Customise &amp; Preview
                  </button>
                  <a
                    href={buildWhatsAppUrl(`Hi Achintya! I want to order/customise "${item.name}" from Amora.co.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl transition-colors flex items-center justify-center cursor-pointer shadow-sm ${
                      isDark
                        ? 'liquid-glass text-[#FAF6F0] hover:bg-white/10 border border-white/15'
                        : 'bg-[#FAF6F0] text-[#76577B] hover:bg-white border border-[#76577B]/20'
                    }`}
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </a>
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
