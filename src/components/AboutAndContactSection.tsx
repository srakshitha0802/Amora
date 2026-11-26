import React from 'react';
import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Heart,
  Sparkles,
} from 'lucide-react';
import {
  BRAND_LOGO_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  INSTAGRAM_LOOKBOOK,
  STUDIO_EMAIL,
  WHATSAPP_CATALOG_URL,
  buildWhatsAppUrl,
} from '../data/products';
import { ProductVisual } from './ProductVisual';

interface AboutAndContactSectionProps {
  theme?: 'dark' | 'light';
}

export const AboutAndContactSection: React.FC<AboutAndContactSectionProps> = ({
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  const conciergeWhatsApp = buildWhatsAppUrl(
    'Hello Amora.co team! I would love to discuss a personalised gift or corporate merchandise enquiry.'
  );

  return (
    <>
      {/* CONTACT & SOCIAL HUB */}
      <section id="contact" className={`py-20 lg:py-32 border-b border-current/10 transition-colors duration-300 ${
        isDark ? 'bg-[#18131B] text-[#F8F4EA]' : 'bg-[#FAF6F0] text-[#2E2A32]'
      }`}>
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-[#76577B]/10 text-[#76577B] border border-[#76577B]/20">
                Contact &amp; Social Lookbook · {INSTAGRAM_HANDLE}
              </div>
              <h2
                className={`font-serif text-3xl sm:text-5xl font-semibold leading-tight ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}
                style={{ textWrap: 'balance' } as React.CSSProperties}
              >
                Start a conversation with our Kalyan studio
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <a
                href={conciergeWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#25D366]/25"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp Concierge
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 border ${
                  isDark
                    ? 'liquid-glass border-white/20 text-[#FAF6F0] hover:bg-white/10'
                    : 'bg-white border-[#76577B]/25 text-[#161E24] hover:bg-[#FAF6F0] shadow-md'
                }`}
              >
                <Instagram className="w-4 h-4 text-[#E3A4AE]" aria-hidden="true" />
                Follow {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            <a
              href={conciergeWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-2xl p-7 transition-all flex flex-col justify-between gap-5 border hover:-translate-y-1 ${
                isDark
                  ? 'liquid-glass border-white/10 hover:border-[#E3A4AE]/40'
                  : 'bg-white border-[#76577B]/20 hover:border-[#76577B]/50 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                </div>
                <ArrowUpRight className={`w-4 h-4 transition-colors ${
                  isDark ? 'text-[#CBD5E1] group-hover:text-[#E3A4AE]' : 'text-[#424D55] group-hover:text-[#76577B]'
                }`} aria-hidden="true" />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>Direct Order &amp; Proofing Desk</p>
                <p className={`font-serif text-2xl font-semibold mt-1 ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                  WhatsApp Concierge
                </p>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>
                  Fastest for sending photos, captions &amp; logo files
                </p>
              </div>
            </a>

            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className={`group rounded-2xl p-7 transition-all flex flex-col justify-between gap-5 border hover:-translate-y-1 ${
                isDark
                  ? 'liquid-glass border-white/10 hover:border-[#E3A4AE]/40'
                  : 'bg-white border-[#76577B]/20 hover:border-[#76577B]/50 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#E3A4AE]/15 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#E3A4AE]" aria-hidden="true" />
                </div>
                <ArrowUpRight className={`w-4 h-4 transition-colors ${
                  isDark ? 'text-[#CBD5E1] group-hover:text-[#E3A4AE]' : 'text-[#424D55] group-hover:text-[#76577B]'
                }`} aria-hidden="true" />
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>Corporate Procurement &amp; Press</p>
                <p className={`font-serif text-2xl font-semibold mt-1 ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                  {STUDIO_EMAIL}
                </p>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>
                  GST invoices, POs &amp; vector artwork submissions
                </p>
              </div>
            </a>

            <div className={`group rounded-2xl p-7 transition-all flex flex-col justify-between gap-5 border ${
              isDark
                ? 'liquid-glass border-white/10'
                : 'bg-white border-[#76577B]/20 shadow-md'
            }`}>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F3C69F]/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#F3C69F]" aria-hidden="true" />
                </div>
                <span className={`text-xs ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>Maharashtra, India</span>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>Studio Location</p>
                <p className={`font-serif text-2xl font-semibold mt-1 ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                  Kalyan, Thane District
                </p>
                <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>
                  Local studio pickup by appointment · Pan-India delivery
                </p>
              </div>
            </div>
          </div>

          {/* Instagram Lookbook */}
          <div className={`rounded-3xl p-7 sm:p-10 border transition-all ${
            isDark
              ? 'liquid-glass border-white/10'
              : 'bg-white border-[#76577B]/20 shadow-xl'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className={`font-serif text-2xl sm:text-3xl font-semibold flex items-center gap-2 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  <Sparkles className="w-5 h-5 text-[#F3C69F]" aria-hidden="true" />
                  Fresh off the studio table
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>
                  Explore recent personalised prints, unboxings, and team kits on Instagram{' '}
                  <span className="font-semibold text-[#76577B]">{INSTAGRAM_HANDLE}</span>
                </p>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#76577B] hover:opacity-80 whitespace-nowrap shrink-0 transition-opacity"
              >
                Open Instagram Feed
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {INSTAGRAM_LOOKBOOK.map((post) => (
                <a
                  key={post.id}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group rounded-2xl overflow-hidden border flex flex-col hover:-translate-y-1 transition-all ${
                    isDark
                      ? 'border-white/10 bg-[#1A161E] hover:border-white/20'
                      : 'border-[#76577B]/15 bg-[#F8F4EA] hover:border-[#76577B]/30 shadow-md'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden border-b border-inherit">
                    <ProductVisual
                      visualType={post.visualType}
                      accentColor={post.accent}
                      customText={post.sampleText}
                      imageUrl={post.imageUrl}
                      alt={post.title}
                      mode="card"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className={`flex items-center justify-between text-[11px] mb-1.5 ${
                        isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
                      }`}>
                        <span>{INSTAGRAM_HANDLE}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#76577B]/10 text-[#76577B] font-medium">
                          {post.category}
                        </span>
                      </div>
                      <h4 className={`font-serif text-xl font-semibold transition-colors ${
                        isDark ? 'text-[#FAF6F0] group-hover:text-[#E3A4AE]' : 'text-[#161E24] group-hover:text-[#76577B]'
                      }`}>
                        {post.title}
                      </h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${
                        isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
                      }`}>{post.caption}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E2A32] text-[#F8F4EA] pt-14 pb-28 md:pb-14">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 mb-8 border-b border-white/10">
            <div>
              <p className="font-serif text-3xl font-semibold">amora.co</p>
              <p className="text-sm text-[#C88DA0] mt-1 font-serif italic">
                Thoughtfully Personalised. Beautifully Branded.
              </p>
              <p className="text-xs text-white/60 mt-1">
                A creative studio for personalised gifts, custom merchandise and corporate gifting.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6D2E58] text-[#F8F4EA] text-xs font-semibold hover:bg-[#8E4474] transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                <span>WhatsApp Catalog</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-[#F8F4EA] text-xs font-semibold hover:bg-white/15 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/60">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#shop" className="hover:text-white transition-colors">Catalogue</a>
              <a href="#corporate" className="hover:text-white transition-colors">Corporate Merchandise (MOQ 36+)</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Amora.co · Founded by Achintya Gurba · Kalyan, Maharashtra
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
