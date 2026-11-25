import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Box, MessageCircle, ExternalLink, Check } from 'lucide-react';
import { BRAND_LOGO_URL, WHATSAPP_CATALOG_URL, buildWhatsAppUrl } from '../data/products';
import { playTactileClick } from '../utils/audio';

type StudioSuite = 'corporate' | 'creative';
type CorporateFinish = 'plum' | 'obsidian' | 'steel' | 'champagne';
type KeepsakeFinish = 'vintage-matte' | 'vivid-gloss' | 'velour' | 'pastel';

interface FinishOption<T> {
  id: T;
  label: string;
  color: string;
  desc: string;
}

const CORPORATE_FINISHES: FinishOption<CorporateFinish>[] = [
  { id: 'plum', label: 'Royal Plum', color: '#6D2E58', desc: 'Signature Amora Plum with laser-etched rose finish' },
  { id: 'obsidian', label: 'Obsidian Matte', color: '#26222A', desc: 'Sleek matte charcoal with subtle gloss imprint' },
  { id: 'steel', label: 'Brushed Steel', color: '#94A3B8', desc: 'Silver stainless finish with crisp black mark' },
  { id: 'champagne', label: 'Champagne Gold', color: '#C88DA0', desc: 'Warm metallic sheen with champagne deboss' },
];

const KEEPSAKE_FINISHES: FinishOption<KeepsakeFinish>[] = [
  { id: 'vintage-matte', label: '300 GSM Matte', color: '#F8F4EA', desc: 'Smooth archival matte, zero glare, tactile touch' },
  { id: 'vivid-gloss', label: 'Vivid Gloss UV', color: '#EBC6CF', desc: 'High-saturation gloss with protective UV lamination' },
  { id: 'velour', label: 'Velour Texture', color: '#6D2E58', desc: 'Textured cotton paper with hand-tied silk ribbon' },
  { id: 'pastel', label: 'Pastel Tint', color: '#D8C6E6', desc: 'Soft editorial lavender & blush tones' },
];

interface ParticleHeroProps {
  onExplorePersonal: () => void;
  onExploreCorporate: () => void;
  theme?: 'dark' | 'light';
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  onExplorePersonal,
  onExploreCorporate,
  theme = 'light',
}) => {
  const [activeSuite, setActiveSuite] = useState<StudioSuite>('corporate');
  const [corpFinish, setCorpFinish] = useState<CorporateFinish>('plum');
  const [keepsakeFinish, setKeepsakeFinish] = useState<KeepsakeFinish>('vintage-matte');
  const [brandText, setBrandText] = useState('ACME CORP');
  const [keepsakeText, setKeepsakeText] = useState('Forever & Always');

  const isDark = theme === 'dark';

  const handleSuiteToggle = (suite: StudioSuite) => {
    playTactileClick(1500, 0.04);
    setActiveSuite(suite);
  };

  const currentCorpFinish = CORPORATE_FINISHES.find((f) => f.id === corpFinish) || CORPORATE_FINISHES[0];
  const currentKeepsakeFinish = KEEPSAKE_FINISHES.find((f) => f.id === keepsakeFinish) || KEEPSAKE_FINISHES[0];

  const handleCorporateEnquiry = () => {
    playTactileClick(1700, 0.04);
    const msg = `Hello Amora! I am looking for a corporate merchandise quote for "${brandText || 'Our Company'}" with ${currentCorpFinish.label} finish. MOQ: 36+ pieces.`;
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleKeepsakeEnquiry = () => {
    playTactileClick(1700, 0.04);
    const msg = `Hello Amora! I would like to order a personalised keepsake with custom caption: "${keepsakeText || 'Personal Dedication'}" on ${currentKeepsakeFinish.label}.`;
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden pt-28 sm:pt-32 pb-16">
      {/* Editorial Studio Ambient Glows */}
      <div
        className={`absolute top-1/4 left-1/6 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#6D2E58]/18' : 'bg-[#C88DA0]/16'
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/6 w-[480px] h-[480px] rounded-full blur-[160px] pointer-events-none transition-opacity duration-700 ${
          isDark ? 'bg-[#C88DA0]/12' : 'bg-[#6D2E58]/10'
        }`}
      />

      {/* Main Container */}
      <div className="max-w-[1400px] w-full mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: Editorial Brand Narrative ─── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Live Studio Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider mb-6 border shadow-xs transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/15 text-[#EBC6CF]'
                  : 'bg-white border-[#6D2E58]/20 text-[#6D2E58]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
              <span>Kalyan Studio Live · Customised Prints &amp; Merchandise</span>
            </div>

            {/* Brand Logo & Lockup */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#C88DA0] shadow-md shadow-[#6D2E58]/20 bg-[#F8F4EA] p-0.5 shrink-0">
                <img src={BRAND_LOGO_URL} alt="Amora.co" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-3xl sm:text-4xl font-semibold leading-none tracking-tight ${
                    isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'
                  }`}
                >
                  amora<span className="text-[#C88DA0]">.co</span>
                </span>
                <span
                  className={`italic font-serif text-xs sm:text-sm tracking-widest mt-1 ${
                    isDark ? 'text-[#D8C6E6]' : 'text-[#6D2E58]'
                  }`}
                >
                  prints, &amp; pretty things
                </span>
              </div>
            </div>

            {/* Main Editorial Headline */}
            <h1
              className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.02] mb-5 ${
                isDark ? 'text-[#F8F4EA]' : 'text-[#2E2A32]'
              }`}
            >
              Thoughtfully personalised. <br />
              <em className="italic text-[#C88DA0] font-normal">Beautifully branded.</em>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-sm sm:text-base max-w-lg leading-relaxed mb-8 ${
                isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
              }`}
            >
              A creative studio for personalised gifts, custom merchandise and corporate gifting.
              From a single tactile polaroid tucked into a wax-sealed letter to 500-piece company onboarding kits — thoughtfully crafted in our Kalyan studio.
            </p>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap gap-3.5 sm:gap-4 items-center mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  playTactileClick(1600, 0.04);
                  onExploreCorporate();
                }}
                className="rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5 cursor-pointer bg-[#6D2E58] text-[#F8F4EA] hover:bg-[#8E4474] border border-[#C88DA0]/40"
              >
                <span>Enquire for Bulk Orders (MOQ 36)</span>
                <ArrowRight className="w-4 h-4 text-[#F8F4EA]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileClick(1800, 0.04);
                  onExplorePersonal();
                }}
                className={`rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2.5 hover:-translate-y-0.5 cursor-pointer border ${
                  isDark
                    ? 'border-white/20 hover:bg-white/10 text-[#F8F4EA]'
                    : 'bg-white border-[#6D2E58]/25 hover:bg-[#F8F4EA] text-[#2E2A32] shadow-sm'
                }`}
              >
                <span>Personal Keepsakes (No MOQ)</span>
                <ArrowRight className="w-4 h-4 text-[#6D2E58]" />
              </button>

              <a
                href={WHATSAPP_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTactileClick(1400, 0.03)}
                className={`rounded-full px-4 py-2.5 text-xs font-medium transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 border ${
                  isDark
                    ? 'border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10'
                    : 'border-emerald-600/30 text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>WhatsApp Catalogue (28 Products)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Trust Badges */}
            <div
              className={`grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t w-full max-w-lg text-[11px] sm:text-xs ${
                isDark ? 'border-white/10 text-[#D8C6E6]' : 'border-[#6D2E58]/20 text-[#584F5E]'
              }`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C88DA0] shrink-0" />
                <span>No MOQ on Keepsakes</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Box className="w-4 h-4 text-[#EBC6CF] shrink-0" />
                <span>MOQ: 36+ Corporate</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Kalyan Studio Dispatch</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Tactile Product Studio Showcase ─── */}
          <div className="lg:col-span-6 w-full flex flex-col items-center">
            
            {/* Dual Studio Switcher Tabs */}
            <div
              className={`w-full max-w-md p-1.5 rounded-full border mb-6 flex items-center justify-between gap-1 shadow-md transition-colors ${
                isDark
                  ? 'bg-[#26202A] border-white/15'
                  : 'bg-white border-[#6D2E58]/20 shadow-[0_4px_20px_rgba(109,46,88,0.08)]'
              }`}
            >
              <button
                type="button"
                onClick={() => handleSuiteToggle('corporate')}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeSuite === 'corporate'
                    ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md font-bold'
                    : isDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-[#584F5E] hover:text-[#2E2A32]'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Amora Business (MOQ 36)</span>
              </button>

              <button
                type="button"
                onClick={() => handleSuiteToggle('creative')}
                className={`flex-1 py-2 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeSuite === 'creative'
                    ? 'bg-[#6D2E58] text-[#F8F4EA] shadow-md font-bold'
                    : isDark
                    ? 'text-white/70 hover:text-white'
                    : 'text-[#584F5E] hover:text-[#2E2A32]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Amora Creative (No MOQ)</span>
              </button>
            </div>

            {/* Interactive Showcase Stage Card */}
            <div
              className={`w-full rounded-3xl border p-6 sm:p-8 transition-all duration-500 shadow-2xl relative overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-b from-[#26202A] to-[#1A161E] border-white/15'
                  : 'bg-gradient-to-b from-[#FFFFFF] to-[#FDFBF7] border-[#6D2E58]/20 shadow-[0_20px_50px_rgba(109,46,88,0.1)]'
              }`}
            >
              {/* Top Studio Stage Tag */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C88DA0] animate-ping" />
                  <span
                    className={`text-xs font-semibold tracking-wider uppercase ${
                      isDark ? 'text-[#EBC6CF]' : 'text-[#6D2E58]'
                    }`}
                  >
                    {activeSuite === 'corporate'
                      ? 'Executive Corporate Showcase'
                      : 'Handcrafted Keepsake Showcase'}
                  </span>
                </div>
                <span
                  className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                    activeSuite === 'corporate'
                      ? 'bg-[#6D2E58]/10 text-[#6D2E58] border-[#6D2E58]/20 dark:text-[#EBC6CF] dark:border-white/15'
                      : 'bg-[#C88DA0]/10 text-[#C88DA0] border-[#C88DA0]/20'
                  }`}
                >
                  {activeSuite === 'corporate' ? 'MOQ: 36 Pieces' : 'No Minimum Order'}
                </span>
              </div>

              {/* ─── DISPLAY STAGE ─── */}
              {activeSuite === 'corporate' ? (
                /* Corporate Executive Suite Visual Stage */
                <div className="flex flex-col items-center">
                  {/* Visual Composition: Extended Desk Mat + Bottle + Ceramic Mug */}
                  <div className="w-full h-56 sm:h-64 relative rounded-2xl overflow-hidden flex items-center justify-center p-4 bg-gradient-to-tr from-black/5 to-black/0 border border-current/5">
                    
                    {/* Desk Mat Surface Base */}
                    <div
                      className="absolute inset-x-4 bottom-4 h-36 rounded-xl border border-white/20 shadow-2xl transition-colors duration-500 flex items-end justify-between p-4"
                      style={{
                        backgroundColor:
                          corpFinish === 'plum'
                            ? '#4A1D3A'
                            : corpFinish === 'obsidian'
                            ? '#1E1B22'
                            : corpFinish === 'steel'
                            ? '#334155'
                            : '#523A44',
                      }}
                    >
                      <div className="flex items-center gap-2 opacity-80">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <span className="text-[10px] font-mono tracking-widest text-white uppercase">
                          Extended Desk Mat · 800×300mm · Anti-Fray Stitched Edge
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-white/90 tracking-wider">₹299 / pc</span>
                    </div>

                    {/* Insulated Sipper Bottle (Center-Left) */}
                    <div className="relative z-10 flex flex-col items-center -translate-y-2 -translate-x-12 sm:-translate-x-16 transition-transform duration-300 hover:scale-105">
                      {/* Bottle Cap */}
                      <div className="w-7 h-5 rounded-t-md bg-[#D4D4D8] border border-black/20 shadow-sm flex items-center justify-center">
                        <div className="w-4 h-1.5 rounded-full bg-neutral-600" />
                      </div>
                      <div className="w-5 h-2 bg-neutral-700" />
                      {/* Bottle Body */}
                      <div
                        className="w-16 h-36 rounded-2xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-between p-2.5 border border-white/20 transition-colors duration-500"
                        style={{
                          backgroundColor:
                            corpFinish === 'plum'
                              ? '#6D2E58'
                              : corpFinish === 'obsidian'
                              ? '#26222A'
                              : corpFinish === 'steel'
                              ? '#64748B'
                              : '#8C5669',
                        }}
                      >
                        {/* Metallic reflection highlight */}
                        <div className="absolute top-0 left-2 w-2 h-full bg-white/20 blur-[1px] rounded-full pointer-events-none" />
                        <span className="text-[9px] tracking-widest text-white/60 uppercase font-mono">600ml Steel</span>
                        <div className="my-auto text-center px-1">
                          <p className="text-[11px] font-bold tracking-wider text-white uppercase break-all line-clamp-2">
                            {brandText || 'AMORA'}
                          </p>
                          <span className="text-[8px] text-white/70 tracking-widest uppercase block mt-0.5">Laser Etched</span>
                        </div>
                        <span className="text-[8px] font-mono text-white/60">₹350 / pc</span>
                      </div>
                    </div>

                    {/* Heavyweight Ceramic Mug (Center-Right) */}
                    <div className="relative z-10 flex items-center translate-y-3 translate-x-12 sm:translate-x-16 transition-transform duration-300 hover:scale-105">
                      {/* Mug Cylinder Body */}
                      <div
                        className="w-24 h-24 rounded-2xl shadow-xl relative overflow-hidden flex flex-col items-center justify-between p-2.5 border border-white/25 transition-colors duration-500"
                        style={{
                          backgroundColor:
                            corpFinish === 'plum'
                              ? '#5A2447'
                              : corpFinish === 'obsidian'
                              ? '#1C1920'
                              : corpFinish === 'steel'
                              ? '#475569'
                              : '#6E4554',
                        }}
                      >
                        <div className="absolute top-0 left-2 w-2 h-full bg-white/15 blur-[2px] rounded-full" />
                        <span className="text-[8px] tracking-wider text-white/60 uppercase font-mono">330ml Ceramic</span>
                        <div className="my-auto text-center px-1">
                          <p className="text-[10px] font-bold tracking-wider text-white uppercase truncate max-w-[80px]">
                            {brandText || 'AMORA'}
                          </p>
                          <span className="text-[7px] text-[#EBC6CF] tracking-widest block">Pantone Wrap</span>
                        </div>
                        <span className="text-[8px] font-mono text-white/80">₹199 / pc</span>
                      </div>
                      {/* Mug Handle */}
                      <div className="w-5 h-16 rounded-r-2xl border-4 border-l-0 border-white/30 -ml-1" />
                    </div>
                  </div>

                  {/* Interactive Personalisation Input */}
                  <div className="w-full mt-5">
                    <label
                      htmlFor="corp-brand-input"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                      }`}
                    >
                      Preview Your Company / Team Branding:
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="corp-brand-input"
                        type="text"
                        value={brandText}
                        maxLength={24}
                        onChange={(e) => setBrandText(e.target.value.toUpperCase())}
                        placeholder="ENTER COMPANY NAME"
                        className={`flex-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl border focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-black/30 border-white/20 text-[#F8F4EA] focus:border-[#C88DA0]'
                            : 'bg-white border-[#6D2E58]/30 text-[#2E2A32] focus:border-[#6D2E58]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Finish Selector */}
                  <div className="w-full mt-4">
                    <span
                      className={`block text-xs font-semibold mb-2 ${
                        isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                      }`}
                    >
                      Executive Finish &amp; Imprint:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CORPORATE_FINISHES.map((f) => {
                        const isSelected = corpFinish === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => {
                              playTactileClick(1600, 0.03);
                              setCorpFinish(f.id);
                            }}
                            className={`px-3 py-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#6D2E58] bg-[#6D2E58]/10 ring-2 ring-[#6D2E58]/30 dark:border-[#C88DA0] dark:bg-[#C88DA0]/10'
                                : isDark
                                ? 'border-white/10 hover:border-white/25 bg-black/20'
                                : 'border-[#6D2E58]/15 hover:border-[#6D2E58]/35 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: f.color }}
                              />
                              {isSelected && <Check className="w-3 h-3 text-[#6D2E58] dark:text-[#C88DA0]" />}
                            </div>
                            <span
                              className={`text-[11px] font-semibold leading-tight ${
                                isDark ? 'text-white' : 'text-[#2E2A32]'
                              }`}
                            >
                              {f.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Footer & CTA */}
                  <div className="w-full mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-left w-full sm:w-auto">
                      <span className="text-[11px] block font-mono text-[#25D366] font-semibold">
                        ● Minimum Order: 36 pieces
                      </span>
                      <span className={`text-[11px] ${isDark ? 'text-white/60' : 'text-[#584F5E]'}`}>
                        Mug ₹199 · Bottle ₹350 · Mat ₹299 · Mousepad ₹99
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCorporateEnquiry}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#6D2E58] hover:bg-[#8E4474] text-[#F8F4EA] text-xs font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Request Quote on WhatsApp</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Amora Creative Keepsake Visual Stage */
                <div className="flex flex-col items-center">
                  {/* Visual Composition: Vintage Polaroid + Spotify Print + Bookmark with Ribbon */}
                  <div className="w-full h-56 sm:h-64 relative rounded-2xl overflow-hidden flex items-center justify-center p-4 bg-gradient-to-tr from-[#EBC6CF]/20 to-transparent border border-current/5">
                    
                    {/* Layer 1: Textured Bookmark with Ribbon Tassel (Left Angled) */}
                    <div className="absolute left-6 sm:left-12 top-6 w-20 h-44 rounded-lg bg-[#FAF7F2] border border-[#6D2E58]/20 shadow-lg -rotate-12 flex flex-col items-center justify-between p-2.5 transition-transform duration-300 hover:rotate-0">
                      {/* Silk Ribbon loop */}
                      <div className="w-3 h-6 -mt-5 rounded-t-full bg-[#6D2E58] shadow-sm" />
                      <div className="text-center my-auto">
                        <span className="font-serif italic text-[11px] text-[#6D2E58] block leading-tight">Velour</span>
                        <span className="text-[8px] uppercase font-mono tracking-widest text-[#C88DA0]">Bookmark</span>
                      </div>
                      <span className="text-[8px] font-mono text-neutral-500">₹129</span>
                    </div>

                    {/* Layer 2: Polaroid Print (Center Front) */}
                    <div className="relative z-10 w-44 sm:w-48 h-52 bg-white rounded-xl shadow-2xl p-3 pb-4 border border-black/10 flex flex-col justify-between transition-transform duration-300 hover:scale-105">
                      {/* Photo Area */}
                      <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#6D2E58] via-[#C88DA0] to-[#EBC6CF] relative overflow-hidden flex flex-col items-center justify-center text-center p-2">
                        <div className="w-8 h-8 rounded-full border border-white/50 bg-white/20 backdrop-blur-xs flex items-center justify-center mb-1">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/90">Amora Keepsake</span>
                        <span className="text-[8px] text-white/80 font-serif italic">300 GSM Archival</span>
                      </div>
                      {/* Polaroid Caption Area */}
                      <div className="text-center pt-1.5">
                        <p className="font-serif italic text-xs text-[#2E2A32] font-semibold truncate px-1">
                          "{keepsakeText || 'Forever & Always'}"
                        </p>
                        <span className="text-[8px] tracking-widest text-neutral-400 uppercase font-mono block mt-0.5">
                          Kalyan Studio · No MOQ
                        </span>
                      </div>
                    </div>

                    {/* Layer 3: Spotify Strip (Right Angled) */}
                    <div className="absolute right-6 sm:right-12 top-8 w-24 h-44 rounded-xl bg-neutral-900 border border-white/20 shadow-xl rotate-12 flex flex-col items-center justify-between p-3 transition-transform duration-300 hover:rotate-0">
                      <div className="w-full h-16 rounded-md bg-[#6D2E58]/40 border border-white/10 flex items-center justify-center">
                        <span className="text-[9px] font-mono text-[#EBC6CF]">MUSIC</span>
                      </div>
                      <div className="w-full flex items-end justify-center gap-0.5 h-6">
                        <span className="w-1 h-3 bg-[#1DB954] rounded-full" />
                        <span className="w-1 h-5 bg-[#1DB954] rounded-full" />
                        <span className="w-1 h-2 bg-[#1DB954] rounded-full" />
                        <span className="w-1 h-6 bg-[#1DB954] rounded-full" />
                        <span className="w-1 h-4 bg-[#1DB954] rounded-full" />
                        <span className="w-1 h-5 bg-[#1DB954] rounded-full" />
                      </div>
                      <span className="text-[9px] font-mono text-neutral-300">₹149 / set</span>
                    </div>

                  </div>

                  {/* Interactive Caption Input */}
                  <div className="w-full mt-5">
                    <label
                      htmlFor="keepsake-caption-input"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                      }`}
                    >
                      Personalise Your Handwritten Polaroid Caption:
                    </label>
                    <input
                      id="keepsake-caption-input"
                      type="text"
                      value={keepsakeText}
                      maxLength={32}
                      onChange={(e) => setKeepsakeText(e.target.value)}
                      placeholder="e.g. For My Best Friend, 2024"
                      className={`w-full px-4 py-2 text-xs font-medium rounded-xl border focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-black/30 border-white/20 text-[#F8F4EA] focus:border-[#C88DA0]'
                          : 'bg-white border-[#6D2E58]/30 text-[#2E2A32] focus:border-[#6D2E58]'
                      }`}
                    />
                  </div>

                  {/* Finish Selector */}
                  <div className="w-full mt-4">
                    <span
                      className={`block text-xs font-semibold mb-2 ${
                        isDark ? 'text-[#D8C6E6]' : 'text-[#584F5E]'
                      }`}
                    >
                      Archival Paper &amp; Finish:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {KEEPSAKE_FINISHES.map((f) => {
                        const isSelected = keepsakeFinish === f.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => {
                              playTactileClick(1600, 0.03);
                              setKeepsakeFinish(f.id);
                            }}
                            className={`px-3 py-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'border-[#6D2E58] bg-[#6D2E58]/10 ring-2 ring-[#6D2E58]/30 dark:border-[#C88DA0] dark:bg-[#C88DA0]/10'
                                : isDark
                                ? 'border-white/10 hover:border-white/25 bg-black/20'
                                : 'border-[#6D2E58]/15 hover:border-[#6D2E58]/35 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: f.color }}
                              />
                              {isSelected && <Check className="w-3 h-3 text-[#6D2E58] dark:text-[#C88DA0]" />}
                            </div>
                            <span
                              className={`text-[11px] font-semibold leading-tight ${
                                isDark ? 'text-white' : 'text-[#2E2A32]'
                              }`}
                            >
                              {f.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary Footer & CTA */}
                  <div className="w-full mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-left w-full sm:w-auto">
                      <span className="text-[11px] block font-mono text-[#25D366] font-semibold">
                        ● No Minimum Order (From 1 Piece)
                      </span>
                      <span className={`text-[11px] ${isDark ? 'text-white/60' : 'text-[#584F5E]'}`}>
                        Polaroids from ₹125 · Stickers from ₹89 · Bookmarks from ₹99
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleKeepsakeEnquiry}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#6D2E58] hover:bg-[#8E4474] text-[#F8F4EA] text-xs font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Order on WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ParticleHero;
