import React from 'react';
import Lenis from 'lenis';
import { FileText, MessageCircle } from 'lucide-react';
import type {
  CorporatePrefill,
  OrderMode,
  Product,
  ProductCategory,
  ShortlistItem,
} from './types';
import { PRODUCTS, buildWhatsAppUrl } from './data/products';
import { Navbar } from './components/Navbar';
import { ParticleHero } from './components/ParticleHero';
import { CircularProductOrbit } from './components/CircularProductOrbit';
import { FeaturedSection } from './components/FeaturedSection';
import { KeepsakeShowcase } from './components/KeepsakeShowcase';
import { ShopSection } from './components/ShopSection';
import { CorporateSection } from './components/CorporateSection';
import { AboutAndContactSection } from './components/AboutAndContactSection';
import { CustomiserDrawer } from './components/CustomiserDrawer';
import { ShortlistDrawer } from './components/ShortlistDrawer';
import { StylistWidget } from './components/StylistWidget';

const SHORTLIST_STORAGE_KEY = 'amora_shortlist_v2';
const THEME_STORAGE_KEY = 'amora_theme_preference';

function loadInitialShortlist(): ShortlistItem[] {
  try {
    const raw = window.localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ShortlistItem[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activeCategory, setActiveCategory] = React.useState<ProductCategory>('All');
  const [orderMode, setOrderMode] = React.useState<OrderMode>('all');
  const [customisingProduct, setCustomisingProduct] = React.useState<Product | null>(null);
  const [isShortlistOpen, setIsShortlistOpen] = React.useState(false);
  const [shortlist, setShortlist] = React.useState<ShortlistItem[]>(loadInitialShortlist);
  const [corporatePrefill, setCorporatePrefill] = React.useState<CorporatePrefill | null>(null);
  const [toastText, setToastText] = React.useState<string | null>(null);

  // Dual Theme Engine (Dark & Light Mode)
  const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Initialize Lenis Smooth Scroll
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(shortlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [shortlist]);

  const showToast = (message: string) => {
    setToastText(message);
    window.setTimeout(() => {
      setToastText((current) => (current === message ? null : current));
    }, 2600);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleExplorePersonal = () => {
    scrollToSection('keepsakes');
  };

  const handleExploreCorporate = () => {
    scrollToSection('corporate');
  };

  const handleJumpToCategory = (category: ProductCategory, mode: OrderMode = 'all') => {
    setActiveCategory(category);
    setOrderMode(mode);
    scrollToSection('shop');
  };

  const handleAddShortlistItem = (draft: Omit<ShortlistItem, 'id'>) => {
    setShortlist((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === draft.productId &&
          (item.customText ?? '') === (draft.customText ?? '') &&
          (item.accentColor ?? '') === (draft.accentColor ?? '') &&
          (item.finish ?? '') === (draft.finish ?? '')
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + draft.quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          ...draft,
          id: `${draft.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        },
      ];
    });
    showToast(`Added ${draft.name} to Quote Tray`);
  };

  const handleQuickAddProduct = (product: Product) => {
    handleAddShortlistItem({
      productId: product.id,
      name: product.name,
      isBulkOnly: product.isBulkOnly,
      moq: product.moq,
      quantity: product.moq,
      unitPriceEstimate: product.unitPriceEstimate,
    });
  };

  const handleAddKitToShortlist = (kitItems: Omit<ShortlistItem, 'id'>[]) => {
    setShortlist((prev) => [
      ...prev,
      ...kitItems.map((item) => ({
        ...item,
        id: `${item.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      })),
    ]);
    showToast(`Added ${kitItems.length} corporate kit items to Quote Tray`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setShortlist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.moq, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setShortlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearShortlist = () => {
    setShortlist([]);
  };

  const handleSendBulkToQuoteForm = () => {
    const bulkItems = shortlist.filter((item) => item.isBulkOnly);
    if (bulkItems.length === 0) return;

    const uniqueNames = Array.from(new Set(bulkItems.map((b) => b.name)));
    const maxQty = Math.max(30, ...bulkItems.map((b) => b.quantity));
    const finish = bulkItems.find((b) => b.finish)?.finish ?? 'UV Print';
    const notes = bulkItems
      .map((b) => {
        const extra = [b.customText ? `Text: "${b.customText}"` : null, b.notes]
          .filter(Boolean)
          .join(' · ');
        return `${b.name} (${b.quantity} pcs${extra ? ` — ${extra}` : ''})`;
      })
      .join('; ');

    setCorporatePrefill({
      products: uniqueNames,
      quantity: maxQty,
      finish,
      requirements: `Transferred from Quote Tray: ${notes}`,
    });
    setIsShortlistOpen(false);
    scrollToSection('bulk-quote-form');
  };

  const shortlistedProductIds = React.useMemo(
    () => new Set(shortlist.map((item) => item.productId)),
    [shortlist]
  );

  const quickWhatsAppUrl = buildWhatsAppUrl(
    'Hello Amora.co! I would like to enquire about personalised gifting or corporate bulk merchandise.'
  );

  return (
    <div
      className={`min-h-screen relative selection:bg-[#76577B] selection:text-[#FAF6F0] transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#06080C] text-[#FAF6F0]' : 'bg-[#F5F1EB] text-[#161E24]'
      }`}
    >
      {/* Floating Glassmorphic Pill Navbar */}
      <Navbar
        onNavigate={scrollToSection}
        shortlistCount={shortlist.length}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Single-Page 3D Experience */}
      <main>
        {/* 1. Signature 3D Particle Hero with Rotating Amora Yin-Yang Emblem */}
        <ParticleHero
          onExplorePersonal={handleExplorePersonal}
          onExploreCorporate={handleExploreCorporate}
          theme={theme}
        />

        {/* 2. Interactive 3D Circular Orbit Runway (Requested Ring Carousel) */}
        <div id="orbit-showcase" className="border-t border-b border-current/10">
          <CircularProductOrbit
            products={PRODUCTS}
            onCustomiseProduct={setCustomisingProduct}
            theme={theme}
          />
        </div>

        {/* 3. Brand Positioning & Featured Categories Bento Grid + B2C/B2B Split */}
        <FeaturedSection
          onExplorePersonal={handleExplorePersonal}
          onExploreCorporate={handleExploreCorporate}
          onJumpToCategory={handleJumpToCategory}
          theme={theme}
        />

        {/* 4. Dedicated Track A: Personalised Prints & Keepsakes (No MOQ) Showcase */}
        <KeepsakeShowcase
          products={PRODUCTS}
          onCustomiseProduct={setCustomisingProduct}
          theme={theme}
        />

        {/* 5. Complete Filterable Shop with 3D Tilt Cards */}
        <ShopSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          orderMode={orderMode}
          onCategoryChange={setActiveCategory}
          onOrderModeChange={setOrderMode}
          onOpenCustomiser={setCustomisingProduct}
          onQuickAddShortlist={handleQuickAddProduct}
          onScrollToCorporate={() => scrollToSection('corporate')}
          shortlistedProductIds={shortlistedProductIds}
          theme={theme}
        />

        {/* 6. Dedicated Track B: Corporate B2B Studio & Bulk Quotation Form (Strict MOQ 30+) */}
        <CorporateSection
          prefill={corporatePrefill}
          onAddKitToShortlist={handleAddKitToShortlist}
          theme={theme}
        />

        {/* 7. About Us (Achintya Gurba / Kalyan Studio) & Contact / Instagram Lookbook */}
        <AboutAndContactSection theme={theme} />
      </main>

      {/* Shortlist Toast Notification */}
      {toastText && (
        <div
          role="status"
          aria-live="polite"
          className="fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-6 z-50 px-5 py-3 rounded-full bg-[#232E36] text-[#FAF6F0] text-xs sm:text-sm font-medium shadow-2xl border border-[#76577B]/20 whitespace-nowrap animate-fade-in-up"
        >
          {toastText}
        </div>
      )}

      {/* Slide-Over Live Product Customiser Drawer */}
      <CustomiserDrawer
        product={customisingProduct}
        onClose={() => setCustomisingProduct(null)}
        onAddToShortlist={handleAddShortlistItem}
      />

      {/* Slide-Over Saved Shortlist / Quote Tray */}
      <ShortlistDrawer
        isOpen={isShortlistOpen}
        items={shortlist}
        onClose={() => setIsShortlistOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearShortlist}
        onSendBulkToQuoteForm={handleSendBulkToQuoteForm}
      />

      {/* Floating AI Gift & Merch Stylist (Gemini API) */}
      <StylistWidget />

      {/* Mobile Sticky Bottom Quick-Action Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 glass border-t border-[#76577B]/12 px-3 flex items-center gap-2.5">
        <a
          href={quickWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-10 rounded-xl bg-[#232E36] text-[#FAF6F0] text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
          WhatsApp
        </a>
        <button
          type="button"
          onClick={() => scrollToSection('bulk-quote-form')}
          className="flex-1 h-10 rounded-xl bg-[#E3A4AE]/20 text-[#232E36] border border-[#E3A4AE]/30 text-xs font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#76577B]" aria-hidden="true" />
          Bulk Quote
        </button>
      </div>
    </div>
  );
}
