import React from 'react';
import { Menu, ShoppingBag, X, Sun, Moon } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/products';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  shortlistCount?: number;
  onOpenShortlist?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: '3D Runway', id: 'orbit-showcase' },
  { label: 'Keepsakes', id: 'keepsakes' },
  { label: 'Catalogue', id: 'shop' },
  { label: 'Corporate', id: 'corporate' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

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

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[94%] max-w-[1220px] ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
        }`}
      >
        <nav
          className={`flex items-center justify-between px-3 sm:px-4 xl:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 border shadow-2xl relative overflow-hidden ${
            isDark
              ? (isScrolled
                  ? 'backdrop-blur-xl bg-black/85 border-white/15 text-[#FAF6F0] shadow-black/60'
                  : 'liquid-glass border-white/15 text-[#FAF6F0]')
              : (isScrolled
                  ? 'backdrop-blur-xl bg-white/95 border-[#76577B]/25 text-[#161E24] shadow-[0_12px_32px_rgba(118,87,123,0.12)]'
                  : 'bg-white/90 border-[#76577B]/20 text-[#161E24] shadow-[0_8px_24px_rgba(118,87,123,0.08)] backdrop-blur-md')
          }`}
        >
          {/* Brand Logo & Wordmark */}
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`flex items-center gap-2 sm:gap-2.5 px-1 py-1 font-serif text-lg sm:text-2xl font-semibold tracking-tight whitespace-nowrap cursor-pointer hover:opacity-90 transition-opacity shrink-0 ${
              isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
            }`}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#E3A4AE]/40 shadow-sm flex items-center justify-center bg-[#FAF6F0] p-0.5 shrink-0">
              <img src={BRAND_LOGO_URL} alt="Amora.co" className="w-full h-full object-cover rounded-full" />
            </div>
            <span>
              amora<span className="text-[#E3A4AE]">.co</span>
            </span>
          </button>

          {/* Desktop Nav Links (Cleanly positioned on xl+ screens so overflow is mathematically impossible) */}
          <div className="hidden xl:flex items-center gap-1 2xl:gap-1.5 min-w-0">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className={`px-2.5 py-1 text-xs uppercase tracking-wider font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  isDark
                    ? 'text-[#FAF6F0]/80 hover:text-white hover:bg-white/10'
                    : 'text-[#424D55] hover:text-[#161E24] hover:bg-[#76577B]/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action CTAs: Guaranteed to stay strictly inside the pill container */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Dark / Light Mode Toggle Pill */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                  isDark
                    ? 'liquid-glass border-white/20 text-[#F3C69F] hover:bg-white/10'
                    : 'bg-white border-[#76577B]/25 text-[#76577B] hover:bg-[#FAF6F0] shadow-xs'
                }`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F3C69F]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#76577B]" />
                )}
              </button>
            )}

            {/* Quote Tray Pill */}
            {onOpenShortlist && (
              <button
                type="button"
                onClick={onOpenShortlist}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                  isDark
                    ? 'liquid-glass border-[#E3A4AE]/30 text-[#FAF6F0] hover:bg-white/10'
                    : 'bg-white border-[#76577B]/25 text-[#161E24] hover:bg-[#FAF6F0] shadow-xs'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#E3A4AE]" aria-hidden="true" />
                <span className="hidden sm:inline">Quote Tray</span>
                {shortlistCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#E3A4AE] text-[#0B0E14] font-bold text-[10px] flex items-center justify-center">
                    {shortlistCount}
                  </span>
                )}
              </button>
            )}

            {/* Book a Bulk Quote CTA */}
            <button
              type="button"
              onClick={() => handleNav('corporate')}
              className={`hidden sm:inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-bold rounded-full transition-all hover:scale-105 cursor-pointer whitespace-nowrap shadow-md ${
                isDark
                  ? 'bg-[#FAF6F0] text-[#161E24] hover:bg-[#E3A4AE] hover:text-[#161E24] shadow-white/10'
                  : 'bg-[#76577B] text-white hover:bg-[#5E4462] shadow-[#76577B]/25 border border-[#76577B]'
              }`}
            >
              <span>Bulk Quote ↗</span>
            </button>

            {/* Hamburger Button for mobile & tablet screens (< xl) */}
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="xl:hidden p-1.5 sm:p-2 rounded-full opacity-80 hover:opacity-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Dropdown Drawer */}
        {isMobileOpen && (
          <div className={`xl:hidden mt-2 p-4 rounded-3xl border shadow-2xl flex flex-col gap-2 ${
            isDark
              ? 'liquid-glass border-white/15 bg-black/95 text-[#FAF6F0]'
              : 'bg-white/95 border-[#76577B]/25 text-[#161E24] backdrop-blur-xl'
          }`}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNav(link.id)}
                className={`text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                  isDark
                    ? 'hover:bg-white/10 text-[#FAF6F0]'
                    : 'hover:bg-[#76577B]/10 text-[#161E24]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-current/10 flex flex-col gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => handleNav('corporate')}
                className={`w-full py-2.5 text-xs font-bold rounded-xl text-center shadow-md ${
                  isDark ? 'bg-[#FAF6F0] text-[#161E24]' : 'bg-[#76577B] text-white'
                }`}
              >
                Book a Bulk Quote ↗
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
