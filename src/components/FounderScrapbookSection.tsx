import React from 'react';
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
      id="about"
      className={`py-20 lg:py-28 relative overflow-hidden transition-colors duration-300 border-t border-b border-current/10 ${
        isDark ? 'bg-[#18131B] text-[#F8F1E9]' : 'bg-[#FAF6F0] text-[#34232F]'
      }`}
    >
      {/* Ambient Warm Studio Lighting */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none ${
          isDark ? 'bg-[#702D58]/20' : 'bg-[#EBC5CC]/30'
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none ${
          isDark ? 'bg-[#C77F98]/15' : 'bg-[#FFF9F4]/60'
        }`}
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header with Hand-Drawn Flourish */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border shadow-xs bg-white/90 border-[#702D58]/20 text-[#702D58]">
            <span className="material-symbols-outlined fill text-[#C77F98] text-[15px]">
              favorite
            </span>
            <span>A Note from the Founder · Our Story</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.08] mb-4 text-[#34232F] dark:text-[#FFF9F4]">
            A Little Thought. <br />
            <em className="italic text-[#C77F98] font-normal">A Lot of Love.</em>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#584552] dark:text-[#E8DCE4]">
            Where it all began — little keepsakes made for the people who mattered.
            A personal journey from a family living room to over 1,000+ fulfilled stories.
          </p>

          {/* Hand-Drawn Little Heart Flourish Doodle */}
          <div className="flex justify-center mt-3 opacity-80">
            <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="text-[#C77F98]">
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
              ? 'bg-[#241A25] border-white/20 shadow-[0_24px_60px_rgba(0,0,0,0.6)]'
              : 'bg-[#FFFDF9] border-[#702D58]/18 shadow-[0_24px_60px_rgba(112,45,88,0.1)]'
          }`}
          style={{
            backgroundImage: isDark
              ? 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)'
              : 'radial-gradient(circle at 50% 50%, rgba(112,45,88,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          {/* Decorative Corner Washi Tapes */}
          <div
            className="absolute -top-3 left-10 w-28 h-7 rounded-sm opacity-85 rotate-[-3deg] pointer-events-none shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(199,127,152,0.85), rgba(235,197,204,0.95))',
              clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
            }}
          />
          <div
            className="absolute -top-3 right-12 w-24 h-7 rounded-sm opacity-85 rotate-[4deg] pointer-events-none shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(112,45,88,0.85), rgba(142,60,115,0.95))',
              clipPath: 'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ─── LEFT COLUMN: SCRAPBOOK POLAROIDS & SISTER MEMO PINBOARD (5 Cols) ─── */}
            <div className="lg:col-span-5 flex flex-col gap-6 relative">
              {/* Polaroid 1: The Beginning (June '25) */}
              <div className="p-4 pb-5 rounded-2xl border shadow-xl relative transition-transform duration-300 hover:rotate-0 rotate-[-2deg] bg-white border-[#702D58]/15">
                {/* Washi Tape Strip */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 opacity-85 rotate-[1deg] pointer-events-none"
                  style={{
                    background: 'rgba(199,127,152,0.85)',
                    clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
                  }}
                />

                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-black/10 relative mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80"
                    alt="Handcrafted personal polaroids from June 2025"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#702D58] text-white text-[10px] font-mono font-bold shadow-sm">
                    June '25
                  </div>
                </div>

                <div className="text-center">
                  <p className="font-serif italic text-lg sm:text-xl font-bold text-[#702D58]">
                    Where it all began...
                  </p>
                  <p className="text-xs mt-1 text-[#4A3B44] font-medium">
                    Little keepsakes made for the people who mattered most.
                  </p>
                </div>
              </div>

              {/* Polaroid 2 / Sister Dedication Note: Rajashree & Harshini */}
              <div className="p-5 rounded-2xl border shadow-xl relative transition-transform duration-300 hover:rotate-0 rotate-[2deg] bg-gradient-to-br from-[#FFF5F7] to-[#FAF0F3] border-[#702D58]/25 text-[#34232F]">
                {/* Paperclip Doodle */}
                <div className="absolute -top-4 right-6 w-6 h-10 pointer-events-none">
                  <svg viewBox="0 0 24 40" fill="none" className="w-full h-full text-[#C77F98]">
                    <path
                      d="M8 12 V28 C8 32, 16 32, 16 28 V8 C16 3, 4 3, 4 8 V30 C4 37, 20 37, 20 30 V12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#702D58]" />
                  <span className="text-[11px] uppercase font-bold tracking-widest text-[#702D58]">
                    The Eureka Moment
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl font-normal leading-snug mb-2 text-[#34232F]">
                  Encouraged by my elder sisters,{' '}
                  <span className="font-bold text-[#702D58]">
                    Rajashree &amp; Harshini
                  </span>
                </h4>

                <p className="text-xs sm:text-[13px] leading-relaxed italic text-[#34232F] font-medium">
                  “They saw the love poured into every gift and gently pushed me:
                  ‘Take this beyond our own family. The world needs this feeling.’ That was the spark that gave birth to Amora.”
                </p>

                {/* Hand-Drawn Arrow Doodle */}
                <div className="flex justify-end mt-2 pr-2 opacity-80">
                  <svg width="45" height="18" viewBox="0 0 45 18" fill="none" className="text-[#702D58]">
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
                <div className="p-3.5 rounded-2xl border text-center relative overflow-hidden transition-all bg-white border-[#702D58]/20 shadow-sm">
                  <span className="material-symbols-outlined text-[#702D58] text-[20px] mb-1">
                    calendar_today
                  </span>
                  <span className="font-serif text-2xl font-bold block text-[#702D58]">
                    June '25
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#34232F]">
                    The Beginning
                  </span>
                </div>

                {/* Stamp 2: 1,000+ Orders */}
                <div className="p-3.5 rounded-2xl border text-center relative overflow-hidden transition-all bg-white border-[#702D58]/20 shadow-sm">
                  <span className="material-symbols-outlined text-[#25D366] text-[20px] mb-1">
                    emoji_events
                  </span>
                  <span className="font-serif text-2xl font-bold block text-[#702D58]">
                    1,000+
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#34232F]">
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
                <div className="flex items-center gap-2 text-xs text-[#702D58] font-mono font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    location_on
                  </span>
                  <span>Kalyan Studio, Thane District, Maharashtra</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight leading-tight text-[#34232F] dark:text-[#FFF9F4]">
                  “Amora began with something simple:{' '}
                  <span className="italic text-[#702D58] dark:text-[#EBC5CC]">
                    the joy of making the people we love feel special.”
                  </span>
                </h3>

                {/* Body Paragraphs with 100% visible high-contrast typography */}
                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#2E2028] dark:text-[#F8F1E9] font-normal">
                  <p>
                    What started in 2025 as my own way of turning ordinary printouts into thoughtfully curated photo cards and personalised gifts for the people who mattered most slowly became something bigger. I wanted every little detail to say what words sometimes couldn't — <strong className="font-bold text-[#702D58] dark:text-[#EBC5CC]">you are special, you are remembered, and you matter.</strong>
                  </p>

                  <p>
                    The idea of turning this little passion into a business came from my elder sisters, <strong className="font-bold text-[#702D58] dark:text-[#EBC5CC]">Rajashree and Harshini</strong>, who encouraged me to take it beyond gifting my own loved ones. That became my eureka moment.
                  </p>

                  <p>
                    I started Amora from scratch in <strong className="font-bold text-[#702D58] dark:text-[#EBC5CC]">June 2025</strong>, with nothing but an idea, a lot of enthusiasm and the desire to create something meaningful. Since then, we've grown across products, crossed 1,000+ orders and evolved into corporate gifting and customised merchandise.
                  </p>

                  <p>
                    But even as Amora grows, its purpose remains unchanged: to make people feel special, seen and cared for — whether it's a gift for someone you love or a thoughtful gesture from a business to its people.
                  </p>
                </div>

                {/* Handcrafted Botanical Jasmine Doodle Branch */}
                <div className="py-2 flex items-center gap-3 opacity-80">
                  <svg width="180" height="24" viewBox="0 0 180 24" fill="none" className="text-[#C77F98]">
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
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#702D58] font-bold">
                    Handcrafted with care
                  </span>
                </div>

                {/* ─── PULL QUOTE BANNER ─── */}
                <div className="p-6 sm:p-7 rounded-2xl border relative my-4 shadow-md bg-[#FFF5F8] border-[#702D58]/25 text-[#34232F]">
                  <blockquote className="font-serif italic text-lg sm:text-2xl leading-relaxed text-[#702D58] font-medium">
                    “Because behind every creation is a little thought, and behind every little thought is love.”
                  </blockquote>

                  {/* Founder Signature & Title */}
                  <div className="mt-4 pt-3 border-t border-[#702D58]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-serif font-bold text-base sm:text-lg block text-[#34232F]">
                        — Achintya Gurba
                      </span>
                      <span className="text-xs text-[#702D58] font-bold tracking-wide">
                        Founder, Amora.co
                      </span>
                    </div>

                    <span className="text-xs font-mono font-semibold text-[#584552]">
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all hover:scale-105 shadow-md bg-[#702D58] text-white hover:bg-[#592345]"
                  >
                    <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.123-.522-1.828-.76-3.003-2.617-3.094-2.739-.092-.122-.74-1.026-.74-1.956 0-.931.488-1.389.66-1.579.173-.19.377-.238.503-.238.125 0 .251.001.36.006.115.006.269-.044.421.323.157.38.536 1.309.583 1.405.047.095.078.207.016.333-.063.125-.094.204-.188.314-.094.111-.197.247-.282.332-.094.095-.192.198-.083.385.11.188.487.804 1.045 1.301.719.64 1.325.838 1.513.933.188.094.298.083.408-.043.111-.125.474-.551.6-.74.125-.188.251-.157.421-.094.172.063 1.09.514 1.278.608.188.094.314.141.36.22.046.078.046.454-.098.859z" />
                    </svg>
                    <span>Message the Studio on WhatsApp</span>
                  </a>

                  <a
                    href={WHATSAPP_CATALOG_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick(1400, 0.03)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-semibold border transition-all hover:scale-105 border-[#702D58]/25 text-[#34232F] bg-white hover:bg-[#FAF6F0] shadow-xs"
                  >
                    <span>View 1000+ Order Catalogue</span>
                    <span className="material-symbols-outlined text-[16px] text-[#702D58]">
                      arrow_outward
                    </span>
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
