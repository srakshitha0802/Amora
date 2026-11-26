import React from 'react';
import { Heart, Sparkles, MapPin, Calendar, Award, ArrowUpRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_CATALOG_URL, buildWhatsAppUrl } from '../data/products';
import { playTactileClick } from '../utils/audio';

interface FounderScrapbookSectionProps {
  theme?: 'dark' | 'light';
}

export const FounderScrapbookSection: React.FC<FounderScrapbookSectionProps> = ({
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="our-story"
      className={`py-20 lg:py-32 relative overflow-hidden transition-colors duration-300 border-t border-b border-current/10 ${
        isDark ? 'bg-[#18131B] text-[#F8F4EA]' : 'bg-[#FAF6F0] text-[#2E2A32]'
      }`}
    >
      {/* Ambient Warm Studio Lighting */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none ${
          isDark ? 'bg-[#6D2E58]/18' : 'bg-[#EBC6CF]/25'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-[#C88DA0]/10' : 'bg-[#F8F4EA]/40'
        }`}
      />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header with Hand-Drawn Flourish */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border shadow-xs ${
              isDark
                ? 'bg-white/5 border-white/15 text-[#C88DA0]'
                : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] shadow-xs'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-[#C88DA0] fill-[#C88DA0]" />
            <span>A Note from the Founder · Our Story</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.08] mb-4">
            A Little Thought. <br />
            <em className="italic text-[#C88DA0] font-normal">A Lot of Love.</em>
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
            }`}
          >
            Where it all began — little keepsakes made for the people who mattered.
            A personal journey from a family living room to over 1,000+ fulfilled stories.
          </p>

          {/* Hand-Drawn Little Heart Flourish Doodle */}
          <div className="flex justify-center mt-3 opacity-60">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-[#C88DA0]">
              <path
                d="M5 10 Q 15 2, 25 10 T 45 10 T 55 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M30 6 C 28 3, 25 5, 27 8 L 30 11 L 33 8 C 35 5, 32 3, 30 6 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* ─── THE CREATIVE SCRAPBOOK BOARD ─── */}
        <div
          className={`rounded-[36px] p-6 sm:p-10 lg:p-14 relative shadow-2xl border transition-all ${
            isDark
              ? 'bg-[#221B25]/95 border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.6)]'
              : 'bg-[#FFFDF9] border-[#6D2E58]/18 shadow-[0_24px_60px_rgba(109,46,88,0.08)]'
          }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)'
              : 'radial-gradient(circle at 50% 50%, rgba(109,46,88,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Decorative Corner Washi Tapes */}
          <div
            className="absolute -top-3 left-10 w-28 h-7 rounded-sm opacity-85 rotate-[-3deg] pointer-events-none shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(200,141,160,0.75), rgba(235,198,207,0.85))',
              clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
            }}
          />
          <div
            className="absolute -top-3 right-12 w-24 h-7 rounded-sm opacity-85 rotate-[4deg] pointer-events-none shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(109,46,88,0.7), rgba(142,60,115,0.8))',
              clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ─── LEFT COLUMN: SCRAPBOOK POLAROIDS & SISTER MEMO PINBOARD (5 Cols) ─── */}
            <div className="lg:col-span-5 flex flex-col gap-6 relative">
              {/* Polaroid 1: The Beginning (June '25) */}
              <div
                className={`p-4 pb-5 rounded-2xl border shadow-xl relative transition-transform duration-300 hover:rotate-0 rotate-[-2deg] ${
                  isDark ? 'bg-[#1C171F] border-white/10' : 'bg-white border-[#6D2E58]/15'
                }`}
              >
                {/* Washi Tape Strip */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 opacity-80 rotate-[1deg] pointer-events-none"
                  style={{
                    background: 'rgba(200,141,160,0.8)',
                    clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
                  }}
                />

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/10 relative mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80"
                    alt="Handcrafted personal polaroids from June 2025"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-semibold">
                    June '25
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-serif italic text-base sm:text-lg text-[#6D2E58] dark:text-[#EBC6CF]">
                    Where it all began...
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-white/60' : 'text-[#584F5E]'}`}>
                    Little keepsakes made for the people who mattered most.
                  </p>
                </div>
              </div>

              {/* Polaroid 2 / Sister Dedication Note: Rajashree & Harshini */}
              <div
                className={`p-5 rounded-2xl border shadow-xl relative transition-transform duration-300 hover:rotate-0 rotate-[2deg] ${
                  isDark
                    ? 'bg-gradient-to-br from-[#2D1B28] to-[#1F1521] border-[#C88DA0]/30'
                    : 'bg-gradient-to-br from-[#FFF5F7] to-[#FAF0F3] border-[#6D2E58]/20'
                }`}
              >
                {/* Paperclip Doodle */}
                <div className="absolute -top-4 right-6 w-6 h-10 pointer-events-none">
                  <svg viewBox="0 0 24 40" fill="none" className="w-full h-full text-[#C88DA0]">
                    <path
                      d="M8 12 V28 C8 32, 16 32, 16 28 V8 C16 3, 4 3, 4 8 V30 C4 37, 20 37, 20 30 V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#C88DA0]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C88DA0]">
                    The Eureka Moment
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl font-normal leading-snug mb-2">
                  Encouraged by my elder sisters,{' '}
                  <span className="font-semibold text-[#6D2E58] dark:text-[#EBC6CF]">
                    Rajashree &amp; Harshini
                  </span>
                </h4>

                <p className={`text-xs leading-relaxed italic ${isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'}`}>
                  “They saw the love poured into every gift and gently pushed me:
                  ‘Take this beyond our own family. The world needs this feeling.’ That was the spark that gave birth to Amora.”
                </p>

                {/* Hand-Drawn Arrow Doodle */}
                <div className="flex justify-end mt-2 pr-2 opacity-70">
                  <svg width="45" height="18" viewBox="0 0 45 18" fill="none" className="text-[#6D2E58] dark:text-[#C88DA0]">
                    <path
                      d="M2 12 Q 20 16, 38 6 M 32 3 L 42 6 L 36 14"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Milestone Stamps Deck */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* Stamp 1: June '25 */}
                <div
                  className={`p-3.5 rounded-2xl border text-center relative overflow-hidden transition-all ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#6D2E58]/15 shadow-sm'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-[#C88DA0] mx-auto mb-1" />
                  <span className="font-serif text-2xl font-bold block text-[#6D2E58] dark:text-[#F8F4EA]">
                    June '25
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-mono ${isDark ? 'text-white/60' : 'text-[#584F5E]'}`}>
                    The Beginning
                  </span>
                </div>

                {/* Stamp 2: 1,000+ Orders */}
                <div
                  className={`p-3.5 rounded-2xl border text-center relative overflow-hidden transition-all ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#6D2E58]/15 shadow-sm'
                  }`}
                >
                  <Award className="w-4 h-4 text-[#25D366] mx-auto mb-1" />
                  <span className="font-serif text-2xl font-bold block text-[#6D2E58] dark:text-[#F8F4EA]">
                    1,000+
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-mono ${isDark ? 'text-white/60' : 'text-[#584F5E]'}`}>
                    Orders Fulfilled
                  </span>
                </div>
              </div>
            </div>

            {/* ─── RIGHT COLUMN: THE FOUNDER LETTER & QUOTE (7 Cols) ─── */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full lg:pl-4">
              {/* The Genuine Founder Story Written by Achintya */}
              <div className="space-y-5">
                {/* Location Badge */}
                <div className="flex items-center gap-2 text-xs text-[#C88DA0] font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Kalyan Studio, Thane District, Maharashtra</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight leading-tight">
                  “Amora began with something simple:{' '}
                  <span className="italic text-[#C88DA0]">
                    the joy of making the people we love feel special.”
                  </span>
                </h3>

                {/* Body Paragraphs */}
                <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-[#D8C6E6]' : 'text-[#4A404E]'
                }`}>
                  <p>
                    What started in 2025 as my own way of turning ordinary printouts into thoughtfully curated photo cards and personalised gifts for the people who mattered most slowly became something bigger. I wanted every little detail to say what words sometimes couldn't — <strong className="font-semibold text-[#6D2E58] dark:text-[#F8F4EA]">you are special, you are remembered, and you matter.</strong>
                  </p>

                  <p>
                    The idea of turning this little passion into a business came from my elder sisters, <strong className="font-semibold text-[#6D2E58] dark:text-[#F8F4EA]">Rajashree and Harshini</strong>, who encouraged me to take it beyond gifting my own loved ones. That became my eureka moment.
                  </p>

                  <p>
                    I started Amora from scratch in <strong className="font-semibold">June 2025</strong>, with nothing but an idea, a lot of enthusiasm and the desire to create something meaningful. Since then, we've grown across products, crossed 1,000+ orders and evolved into corporate gifting and customised merchandise.
                  </p>

                  <p>
                    But even as Amora grows, its purpose remains unchanged: to make people feel special, seen and cared for — whether it's a gift for someone you love or a thoughtful gesture from a business to its people.
                  </p>
                </div>

                {/* Handcrafted Botanical Jasmine Doodle Branch */}
                <div className="py-2 flex items-center gap-3 opacity-60">
                  <svg width="180" height="24" viewBox="0 0 180 24" fill="none" className="text-[#C88DA0]">
                    <path
                      d="M2 12 Q 40 4, 90 12 T 178 12"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <circle cx="45" cy="8" r="3" fill="currentColor" opacity="0.6" />
                    <circle cx="85" cy="14" r="3" fill="currentColor" opacity="0.6" />
                    <circle cx="135" cy="9" r="3" fill="currentColor" opacity="0.6" />
                    <path d="M45 8 C 42 4, 36 6, 40 10 Z" fill="currentColor" />
                    <path d="M85 14 C 88 18, 94 16, 90 12 Z" fill="currentColor" />
                    <path d="M135 9 C 132 5, 126 7, 130 11 Z" fill="currentColor" />
                  </svg>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C88DA0]">Handcrafted with care</span>
                </div>

                {/* ─── PULL QUOTE BANNER ─── */}
                <div
                  className={`p-6 sm:p-7 rounded-2xl border relative my-4 shadow-md ${
                    isDark
                      ? 'bg-black/35 border-[#C88DA0]/30 text-[#F8F4EA]'
                      : 'bg-[#FFF8FA] border-[#6D2E58]/20 text-[#2E2A32]'
                  }`}
                >
                  <blockquote className="font-serif italic text-lg sm:text-2xl leading-relaxed text-[#6D2E58] dark:text-[#EBC6CF]">
                    “Because behind every creation is a little thought, and behind every little thought is love.”
                  </blockquote>

                  {/* Founder Signature & Title */}
                  <div className="mt-4 pt-3 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-serif font-bold text-base sm:text-lg block text-[#2E2A32] dark:text-[#F8F4EA]">
                        — Achintya Gurba
                      </span>
                      <span className="text-xs text-[#C88DA0] font-medium tracking-wide">
                        Founder, Amora.co
                      </span>
                    </div>

                    <span className="text-[11px] font-mono opacity-60">
                      Kalyan Studio · Established 2025
                    </span>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-3">
                  <a
                    href={buildWhatsAppUrl(
                      'Hello Achintya! I read your story on the Amora website and would love to collaborate / order custom gifts.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick(1600, 0.04)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Message the Studio on WhatsApp</span>
                  </a>

                  <a
                    href={WHATSAPP_CATALOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick(1400, 0.03)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all hover:scale-105 ${
                      isDark
                        ? 'border-white/20 text-[#F8F4EA] hover:bg-white/10'
                        : 'border-[#6D2E58]/25 text-[#2E2A32] bg-white hover:bg-[#F8F4EA]'
                    }`}
                  >
                    <span>View 1000+ Order Catalogue</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderScrapbookSection;
