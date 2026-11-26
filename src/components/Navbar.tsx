import React from 'react';
import { Menu, ShoppingBag, X, Sun, Moon, MessageCircle } from 'lucide-react';
import { BRAND_LOGO_URL, WHATSAPP_CATALOG_URL } from '../data/products';

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
  theme = 'dark',
  onToggleTheme,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 40);

      if (currentY > lastScrollY.current && currentY > 320) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;
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
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] max-w-[1180px] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
        }`}
      >
        <nav
          className={`flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 border shadow-xl relative ${
            isDark
              ? (isScrolled
                  ? 'backdrop-blur-xl bg-[#1A161E]/90 border-[#F8F4EA]/15 text-[#F8F4EA] shadow-black/60'
                  : 'backdrop-blur-md bg-[#26202A]/80 border-[#F8F4EA]/15 text-[#F8F4EA]')
              : (isScrolled
                  ? 'backdrop-blur-xl bg-white/95 border-[#6D2E58]/20 text-[#2E2A32] shadow-[0_12px_32px_rgba(109,46,88,0.12)]'
                  : 'bg-[#F8F4EA]/90 border-[#6D2E58]/18 text-[#2E2A32] shadow-[0_8px_24px_rgba(109,46,88,0.08)] backdrop-blur-md')
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`flex items-center gap-2 sm:gap-2.5 px-1 py-1 font-serif text-lg sm:text-2xl font-semibold tracking-tight whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity shrink-0 ${
              isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'
            }`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#C88DA0]/50 shadow-sm flex items-center justify-center bg-[#F8F4EA] p-0.5 shrink-0">
              <img src={BRAND_LOGO_URL} alt="Amora.co" className="w-full h-full object-cover rounded-full" />
            </div>
            <span>
              amora<span className="text-[#C88DA0]">.co</span>
            </span>
          </button>

          {/* Primary Desktop Navigation Links: Home, About, Cart, Contact */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 min-w-0">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                isDark
                  ? 'text-[#F8F4EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#584F5E] hover:text-[#2E2A32] hover:bg-[#6D2E58]/10'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                isDark
                  ? 'text-[#F8F4EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#584F5E] hover:text-[#2E2A32] hover:bg-[#6D2E58]/10'
              }`}
            >
              Our Story
            </button>

            <button
              type="button"
              onClick={handleCartClick}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer inline-flex items-center gap-1.5 ${
                isDark
                  ? 'text-[#F8F4EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#584F5E] hover:text-[#2E2A32] hover:bg-[#6D2E58]/10'
              }`}
            >
              <span>Cart</span>
              {shortlistCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#6D2E58] text-[#F8F4EA] font-bold text-[10px] flex items-center justify-center">
                  {shortlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                isDark
                  ? 'text-[#F8F4EA]/80 hover:text-white hover:bg-white/10'
                  : 'text-[#584F5E] hover:text-[#2E2A32] hover:bg-[#6D2E58]/10'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                  isDark
                    ? 'border-white/20 text-[#EBC6CF] hover:bg-white/10'
                    : 'bg-white border-[#6D2E58]/20 text-[#6D2E58] hover:bg-[#F8F4EA] shadow-xs'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EBC6CF]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6D2E58]" />
                )}
              </button>
            )}

            {/* Cart / Enquiry Tray Pill */}
            {onOpenShortlist && (
              <button
                type="button"
                onClick={onOpenShortlist}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  isDark
                    ? 'border-[#C88DA0]/40 text-[#F8F4EA] bg-white/5 hover:bg-white/10'
                    : 'bg-white border-[#6D2E58]/25 text-[#2E2A32] hover:bg-[#F8F4EA] shadow-xs'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#C88DA0]" aria-hidden="true" />
                <span className="hidden sm:inline">Enquiry Cart</span>
                {shortlistCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#6D2E58] text-[#F8F4EA] font-bold text-[10px] flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </button>
            )}

            {/* Official WhatsApp Catalog CTA */}
            <a
              href={WHATSAPP_CATALOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap shadow-md ${
                isDark
                  ? 'bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] shadow-[#6D2E58]/30'
                  : 'bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#522142] shadow-[#6D2E58]/25'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
              <span>WhatsApp Catalog</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="md:hidden p-1.5 sm:p-2 rounded-full opacity-80 hover:opacity-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Dropdown Menu */}
        {isMobileOpen && (
          <div
            className={`md:hidden mt-2 p-4 rounded-3xl border shadow-2xl flex flex-col gap-2 ${
              isDark
                ? 'border-white/15 bg-[#1A161E]/95 text-[#F8F4EA] backdrop-blur-xl'
                : 'bg-white/95 border-[#6D2E58]/20 text-[#2E2A32] backdrop-blur-xl'
            }`}
          >
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-[#F8F4EA]' : 'hover:bg-[#6D2E58]/10 text-[#2E2A32]'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-[#F8F4EA]' : 'hover:bg-[#6D2E58]/10 text-[#2E2A32]'
              }`}
            >
              Our Story (Founder Note)
            </button>

            <button
              type="button"
              onClick={handleCartClick}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between ${
                isDark ? 'hover:bg-white/10 text-[#F8F4EA]' : 'hover:bg-[#6D2E58]/10 text-[#2E2A32]'
              }`}
            >
              <span>Cart (Enquiry Basket)</span>
              {shortlistCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#6D2E58] text-[#F8F4EA] font-bold text-xs">
                  {shortlistCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNav('contact')}
              className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                isDark ? 'hover:bg-white/10 text-[#F8F4EA]' : 'hover:bg-[#6D2E58]/10 text-[#2E2A32]'
              }`}
            >
              Contact
            </button>

            <div className="pt-2 border-t border-current/10 flex flex-col gap-2">
              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 text-xs font-bold rounded-xl text-center shadow-md bg-[#6D2E58] text-[#F8F4EA] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Open WhatsApp Catalog</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
