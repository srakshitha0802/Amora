import React from 'react';
import { WHATSAPP_CATALOG_URL } from '../data/products';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  shortlistCount?: number;
  onOpenShortlist?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  shortlistCount = 0,
  onOpenShortlist,
  theme = 'light',
  onToggleTheme,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<'home' | 'about' | 'shop' | 'contact'>('home');
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 30);

      if (currentY > lastScrollY.current && currentY > 340) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;

      // Determine active section based on scroll position
      const shopEl = document.getElementById('shop');
      const aboutEl = document.getElementById('about');
      const contactEl = document.getElementById('contact');

      if (contactEl && contactEl.getBoundingClientRect().top < 300) {
        setActiveSection('contact');
      } else if (aboutEl && aboutEl.getBoundingClientRect().top < 300) {
        setActiveSection('about');
      } else if (shopEl && shopEl.getBoundingClientRect().top < 300) {
        setActiveSection('shop');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMobileOpen(false);
  };

  const handleCartClick = () => {
    setIsMobileOpen(false);
    onOpenShortlist?.();
  };

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-3 sm:top-4 md:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] max-w-[1240px] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
        }`}
      >
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 border shadow-lg relative min-h-[60px] sm:min-h-[68px] ${
            isDark
              ? (isScrolled
                  ? 'backdrop-blur-xl bg-[#1A161E]/92 border-white/15 text-[#F8F1E9] shadow-[0_16px_36px_rgba(0,0,0,0.55)]'
                  : 'backdrop-blur-md bg-[#241E28]/85 border-white/12 text-[#F8F1E9] shadow-[0_8px_24px_rgba(0,0,0,0.35)]')
              : (isScrolled
                  ? 'backdrop-blur-xl bg-[#FFF9F4]/92 border-white/90 text-[#34232F] shadow-[0_14px_36px_rgba(112,45,88,0.1)]'
                  : 'backdrop-blur-md bg-[#FFF9F4]/80 border-white/80 text-[#34232F] shadow-[0_8px_28px_rgba(112,45,88,0.06)]')
          }`}
        >
          {/* Left: Amora logo + amora.co wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`flex items-center gap-2.5 sm:gap-3 px-1 py-1 font-serif text-xl sm:text-2xl font-semibold tracking-tight whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity shrink-0 ${isDark ? 'text-[#F8F1E9]' : 'text-[#34232F]'
              }`}
          >
            {/* Genuine Original Amora Emblem Logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#C77F98]/40 shadow-xs flex items-center justify-center bg-white relative shrink-0">
              <img
                src="/assets/amora-emblem-clean.png"
                alt="Amora"
                className="w-full h-full object-cover"
              />
            </div>
            <span>
              amora<span className="text-[#C77F98]">.co</span>
            </span>
          </button>

          {/* Centre: HOME, OUR STORY, CATALOG (badge), CONTACT */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 min-w-0">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${activeSection === 'home'
                ? isDark
                  ? 'text-[#F8F1E9] font-bold'
                  : 'text-[#34232F] font-bold'
                : isDark
                  ? 'text-[#F8F1E9]/75 hover:text-white hover:bg-white/10'
                  : 'text-[#76636D] hover:text-[#34232F] hover:bg-[#702D58]/10'
                }`}
            >
              <span>Home</span>
              {activeSection === 'home' && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#702D58] dark:bg-[#C77F98] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${activeSection === 'about'
                ? isDark
                  ? 'text-[#F8F1E9] font-bold'
                  : 'text-[#34232F] font-bold'
                : isDark
                  ? 'text-[#F8F1E9]/75 hover:text-white hover:bg-white/10'
                  : 'text-[#76636D] hover:text-[#34232F] hover:bg-[#702D58]/10'
                }`}
            >
              <span>Our Story</span>
              {activeSection === 'about' && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#702D58] dark:bg-[#C77F98] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('shop')}
              className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 ${activeSection === 'shop'
                ? isDark
                  ? 'text-[#F8F1E9] font-bold'
                  : 'text-[#34232F] font-bold'
                : isDark
                  ? 'text-[#F8F1E9]/75 hover:text-white hover:bg-white/10'
                  : 'text-[#76636D] hover:text-[#34232F] hover:bg-[#702D58]/10'
                }`}
            >
              <span>Catalog</span>
              {activeSection === 'shop' && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#702D58] dark:bg-[#C77F98] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all cursor-pointer whitespace-nowrap ${activeSection === 'contact'
                ? isDark
                  ? 'text-[#F8F1E9] font-bold'
                  : 'text-[#34232F] font-bold'
                : isDark
                  ? 'text-[#F8F1E9]/75 hover:text-white hover:bg-white/10'
                  : 'text-[#76636D] hover:text-[#34232F] hover:bg-[#702D58]/10'
                }`}
            >
              <span>Contact</span>
              {activeSection === 'contact' && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#702D58] dark:bg-[#C77F98] rounded-full" />
              )}
            </button>
          </div>

          {/* Right: Theme Toggle, Enquiry Cart, WhatsApp Catalog button */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Theme Toggle Button using Google Material Symbol */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'border-white/20 text-[#EBC5CC] hover:bg-white/10'
                    : 'bg-white/90 border-[#702D58]/15 text-[#702D58] hover:bg-white shadow-xs'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {isDark ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
            )}

            {/* Enquiry Cart Pill */}
            {onOpenShortlist && (
              <button
                type="button"
                onClick={onOpenShortlist}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${isDark
                  ? 'border-[#C77F98]/40 text-[#F8F1E9] bg-white/5 hover:bg-white/10'
                  : 'bg-white/90 border-[#702D58]/20 text-[#34232F] hover:bg-white shadow-xs'
                  }`}
              >
                <span className="material-symbols-outlined text-[#C77F98] text-[18px]">
                  shopping_bag
                </span>
                <span className="hidden sm:inline">Enquiry Cart</span>
                {shortlistCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#702D58] text-[#F8F1E9] font-bold text-[10px] flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </button>
            )}

            {/* WhatsApp Catalog button (Deep Plum Pill with WhatsApp green icon and arrow ->) */}
            <a
              href={WHATSAPP_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-4.5 py-2 sm:py-2.5 text-xs font-bold rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer whitespace-nowrap shadow-md bg-[#702D58] text-white hover:bg-[#592345] shadow-[#702D58]/25 group"
            >
              <svg className="w-3.5 h-3.5 text-[#25D366] fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.123-.522-1.828-.76-3.003-2.617-3.094-2.739-.092-.122-.74-1.026-.74-1.956 0-.931.488-1.389.66-1.579.173-.19.377-.238.503-.238.125 0 .251.001.36.006.115.006.269-.044.421.323.157.38.536 1.309.583 1.405.047.095.078.207.016.333-.063.125-.094.204-.188.314-.094.111-.197.247-.282.332-.094.095-.192.198-.083.385.11.188.487.804 1.045 1.301.719.64 1.325.838 1.513.933.188.094.298.083.408-.043.111-.125.474-.551.6-.74.125-.188.251-.157.421-.094.172.063 1.09.514 1.278.608.188.094.314.141.36.22.046.078.046.454-.098.859z" />
              </svg>
              <span>WhatsApp Catalog</span>
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover:translate-x-0.5 text-white/90">
                arrow_forward
              </span>
            </a>

            {/* Mobile Hamburger Button using Google Material Symbol */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-full opacity-80 hover:opacity-100 cursor-pointer flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Dropdown Menu */}
        {isMobileOpen && (
          <div
            className={`md:hidden mt-2 p-4 rounded-3xl border shadow-2xl flex flex-col gap-2 ${isDark
              ? 'border-white/15 bg-[#1A161E]/95 text-[#F8F1E9] backdrop-blur-xl'
              : 'bg-[#FFF9F4]/95 border-[#702D58]/15 text-[#34232F] backdrop-blur-xl shadow-[0_16px_40px_rgba(112,45,88,0.15)]'
              }`}
          >
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-[#F8F1E9]' : 'hover:bg-[#702D58]/10 text-[#34232F]'
                }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-[#F8F1E9]' : 'hover:bg-[#702D58]/10 text-[#34232F]'
                }`}
            >
              Our Story
            </button>

            <button
              type="button"
              onClick={() => handleNav('shop')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${isDark ? 'hover:bg-white/10 text-[#F8F1E9]' : 'hover:bg-[#702D58]/10 text-[#34232F]'
                }`}
            >
              <span>Catalog</span>
              {shortlistCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#702D58] text-[#F8F1E9] font-bold text-xs flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${isDark ? 'hover:bg-white/10 text-[#F8F1E9]' : 'hover:bg-[#702D58]/10 text-[#34232F]'
                }`}
            >
              Contact
            </button>

            <div className="pt-2 border-t border-current/10 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleCartClick}
                className="w-full py-2.5 px-4 rounded-xl border border-current/20 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[#C77F98] text-[18px]">
                  shopping_bag
                </span>
                <span>Enquiry Cart{shortlistCount > 0 ? ` (${shortlistCount})` : ''}</span>
              </button>

              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#702D58] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4 text-[#25D366] fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.123-.522-1.828-.76-3.003-2.617-3.094-2.739-.092-.122-.74-1.026-.74-1.956 0-.931.488-1.389.66-1.579.173-.19.377-.238.503-.238.125 0 .251.001.36.006.115.006.269-.044.421.323.157.38.536 1.309.583 1.405.047.095.078.207.016.333-.063.125-.094.204-.188.314-.094.111-.197.247-.282.332-.094.095-.192.198-.083.385.11.188.487.804 1.045 1.301.719.64 1.325.838 1.513.933.188.094.298.083.408-.043.111-.125.474-.551.6-.74.125-.188.251-.157.421-.094.172.063 1.09.514 1.278.608.188.094.314.141.36.22.046.078.046.454-.098.859z" />
                </svg>
                <span>WhatsApp Catalog →</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
