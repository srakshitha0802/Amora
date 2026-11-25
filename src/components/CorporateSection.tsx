import React from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Download,
  FileUp,
  MessageCircle,
  Plus,
  X,
} from 'lucide-react';
import {
  BULK_PRODUCTS,
  CORPORATE_PILLARS,
  PRINTING_FINISHES,
  buildWhatsAppUrl,
} from '../data/products';
import type {
  CorporatePrefill,
  PrintingFinishId,
  QuotationTicket,
  ShortlistItem,
} from '../types';

interface CorporateSectionProps {
  prefill: CorporatePrefill | null;
  onAddKitToShortlist: (items: Omit<ShortlistItem, 'id'>[]) => void;
  theme?: 'dark' | 'light';
}

const BULK_PRODUCT_OPTIONS = [
  'Custom Printed Water Bottles',
  'Custom Printed Mugs',
  'Custom Printed Mousepads',
  'Custom Printed Keyboard Mats',
  'Custom Mix / Employee Welcome Kit',
];

function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const CorporateSection: React.FC<CorporateSectionProps> = ({
  prefill,
  onAddKitToShortlist,
  theme = 'dark',
}) => {
  // Interactive Corporate Kit Estimator State
  const [selectedKitIds, setSelectedKitIds] = React.useState<string[]>([
    'water-bottles',
    'mugs',
    'keyboard-mats',
  ]);
  const [teamSizeInput, setTeamSizeInput] = React.useState<string>('50');
  const [selectedFinishId, setSelectedFinishId] = React.useState<PrintingFinishId>('uv');
  const [kitAddedFeedback, setKitAddedFeedback] = React.useState(false);

  // Smart B2B Bulk Quotation Form State
  const [customerName, setCustomerName] = React.useState('');
  const [contactNumber, setContactNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [selectedFormProducts, setSelectedFormProducts] = React.useState<string[]>([
    'Custom Printed Water Bottles',
    'Custom Printed Mugs',
  ]);
  const [quantityInput, setQuantityInput] = React.useState<string>('50');
  const [formFinish, setFormFinish] = React.useState<string>('UV Print');
  const [requirements, setRequirements] = React.useState('');
  const [deliveryLocation, setDeliveryLocation] = React.useState('');
  const [artworkFileName, setArtworkFileName] = React.useState<string | null>(null);
  const [artworkPreviewUrl, setArtworkPreviewUrl] = React.useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [ticket, setTicket] = React.useState<QuotationTicket | null>(null);
  const [copiedTicket, setCopiedTicket] = React.useState(false);

  // Sync external prefill (from Estimator or Shortlist Tray)
  React.useEffect(() => {
    if (!prefill) return;
    if (prefill.products.length > 0) {
      setSelectedFormProducts(prefill.products);
    }
    setQuantityInput(String(Math.max(30, prefill.quantity)));
    if (prefill.finish) {
      setFormFinish(prefill.finish);
    }
    if (prefill.requirements) {
      setRequirements(prefill.requirements);
    }
  }, [prefill]);

  // Estimator Calculations
  const parsedTeamSize = Number(teamSizeInput);
  const isEstimatorBelowMoq = !Number.isFinite(parsedTeamSize) || parsedTeamSize < 30;
  const effectiveTeamSize = isEstimatorBelowMoq ? 30 : Math.floor(parsedTeamSize);

  const activeFinish =
    PRINTING_FINISHES.find((f) => f.id === selectedFinishId) ?? PRINTING_FINISHES[0];

  const estimatorSummary = React.useMemo(() => {
    const selectedProducts = BULK_PRODUCTS.filter((p) => selectedKitIds.includes(p.id));
    const tier =
      effectiveTeamSize >= 200
        ? { name: 'Enterprise Run (200+ pcs)', discountLabel: '18% volume savings', discount: 0.18 }
        : effectiveTeamSize >= 75
          ? { name: 'Growth Team (75–199 pcs)', discountLabel: '10% volume savings', discount: 0.1 }
          : { name: 'Starter Studio (30–74 pcs)', discountLabel: 'Standard bulk tier', discount: 0 };

    const rawKitPrice = selectedProducts.reduce(
      (sum, item) => sum + item.unitPriceEstimate + activeFinish.perUnitAdder,
      0
    );
    const discountedKitPrice = Math.round(rawKitPrice * (1 - tier.discount));
    const totalLow = Math.round(discountedKitPrice * effectiveTeamSize * 0.94);
    const totalHigh = Math.round(discountedKitPrice * effectiveTeamSize * 1.06);

    return {
      selectedProducts,
      tier,
      perKit: discountedKitPrice,
      totalLow,
      totalHigh,
    };
  }, [selectedKitIds, effectiveTeamSize, activeFinish]);

  const toggleKitItem = (id: string) => {
    setSelectedKitIds((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const handleLoadKitIntoForm = () => {
    const productNames = estimatorSummary.selectedProducts.map((p) => p.name);
    setSelectedFormProducts(productNames);
    setQuantityInput(String(effectiveTeamSize));
    setFormFinish(activeFinish.name);
    setRequirements(
      `Welcome kit bundle (${productNames.join(', ')}) with ${activeFinish.name} finish for ${effectiveTeamSize} team members.`
    );
    const formEl = document.getElementById('bulk-quote-form');
    formEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSaveKitToShortlist = () => {
    const itemsToAdd: Omit<ShortlistItem, 'id'>[] = estimatorSummary.selectedProducts.map((p) => ({
      productId: p.id,
      name: p.name,
      isBulkOnly: true,
      moq: 30,
      quantity: effectiveTeamSize,
      unitPriceEstimate: Math.round((p.unitPriceEstimate + activeFinish.perUnitAdder) * (1 - estimatorSummary.tier.discount)),
      finish: activeFinish.name,
      notes: `Corporate Kit Estimator · ${estimatorSummary.tier.name}`,
    }));
    onAddKitToShortlist(itemsToAdd);
    setKitAddedFeedback(true);
    window.setTimeout(() => setKitAddedFeedback(false), 2200);
  };

  // Form Logic
  const parsedFormQty = Number(quantityInput);
  const isFormBelowMoq = quantityInput.trim() !== '' && (!Number.isFinite(parsedFormQty) || parsedFormQty < 30);

  const toggleFormProduct = (label: string) => {
    setSelectedFormProducts((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setArtworkFileName(`${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setArtworkPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setArtworkPreviewUrl(null);
    }
  };

  const clearArtwork = () => {
    setArtworkFileName(null);
    setArtworkPreviewUrl(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!customerName.trim() || !contactNumber.trim() || !email.trim() || !deliveryLocation.trim()) {
      setFormError('Please fill in your name/company, phone, email, and delivery location.');
      return;
    }
    if (selectedFormProducts.length === 0) {
      setFormError('Select at least one bulk merchandise product.');
      return;
    }
    if (!Number.isFinite(parsedFormQty) || parsedFormQty < 30) {
      setFormError('Minimum Order Quantity for corporate merchandise is 30 pieces.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          contactNumber,
          email,
          products: selectedFormProducts,
          quantity: Math.floor(parsedFormQty),
          finish: formFinish,
          requirements,
          deliveryLocation,
          artworkFileName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Could not generate quotation summary.');
        return;
      }
      setTicket(data.ticket as QuotationTicket);
    } catch {
      setFormError('Network issue while generating your quotation ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildTicketPlainText = (t: QuotationTicket) => {
    return [
      `AMORA.CO — CORPORATE BULK QUOTATION BRIEF`,
      `Ticket ID: ${t.ticketId}`,
      `Date: ${new Date(t.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      `----------------------------------------`,
      `Client / Company: ${t.customerName}`,
      `Phone: ${t.contactNumber}`,
      `Email: ${t.email}`,
      `Delivery Location: ${t.deliveryLocation}`,
      `----------------------------------------`,
      `Products Requested: ${t.products.join(', ')}`,
      `Quantity: ${t.quantity} pieces (MOQ 30+ verified)`,
      `Preferred Finish: ${t.finish}`,
      `Tier Guidance: ${t.tierName}`,
      `Indicative Estimate: ${formatInr(t.estimatedTotalRange.low)} – ${formatInr(t.estimatedTotalRange.high)} (~${formatInr(t.estimatedPerUnit)}/set)`,
      `Artwork Attached: ${t.artworkFileName ?? 'To be shared on WhatsApp/Email'}`,
      `Brief & Notes: ${t.requirements}`,
      `----------------------------------------`,
      `Studio: Amora.co, Kalyan, Thane District, Maharashtra`,
    ].join('\n');
  };

  const handleCopyTicket = async () => {
    if (!ticket) return;
    try {
      await navigator.clipboard.writeText(buildTicketPlainText(ticket));
      setCopiedTicket(true);
      window.setTimeout(() => setCopiedTicket(false), 2200);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleDownloadTicket = () => {
    if (!ticket) return;
    const blob = new Blob([buildTicketPlainText(ticket)], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ticket.ticketId}-Amora-Quotation-Brief.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isDark = theme === 'dark';

  return (
    <section id="corporate" className={`py-16 lg:py-24 border-b border-current/10 transition-colors duration-300 ${
      isDark ? 'bg-[#06080C] text-[#FAF6F0]' : 'bg-[#FAF6F0] text-[#161E24]'
    }`}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* B2B Intro Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-[#76577B]/10 text-[#76577B] border border-[#76577B]/20">
              Corporate &amp; Businesses Portal · Strict MOQ 30+ Units
            </div>
            <h2
              className={`font-serif text-3xl sm:text-5xl font-semibold leading-tight ${
                isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
              }`}
              style={{ textWrap: 'balance' }}
            >
              Executive merchandise designed like a boutique gift
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className={`text-sm sm:text-[15px] leading-relaxed ${
              isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
            }`}>
              We partner with HR teams, founders, and brand managers across Thane, Mumbai, and
              pan-India to craft company-branded welcome kits and appreciation gifts that employees
              actually keep on their desks.
            </p>
          </div>
        </div>

        {/* 4 B2B Pillars (Editorial Numbering, Clean Hairline Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {CORPORATE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                isDark
                  ? 'liquid-glass border-white/10'
                  : 'bg-white border-[#76577B]/20 shadow-md'
              }`}
            >
              <div>
                <span className={`text-xs font-semibold tabular-nums ${
                  isDark ? 'text-[#E3A4AE]' : 'text-[#76577B]'
                }`}>
                  {pillar.number}.
                </span>
                <h3 className={`font-serif text-2xl font-semibold mt-2 leading-snug ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  {pillar.title}
                </h3>
                <p className={`text-sm mt-2.5 leading-relaxed ${
                  isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
                }`}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Corporate Kit Estimator */}
        <div className={`rounded-2xl overflow-hidden mb-14 border transition-all ${
          isDark
            ? 'liquid-glass border-white/10'
            : 'bg-white border-[#76577B]/20 shadow-xl'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Configurator Controls */}
            <div className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r ${
              isDark ? 'border-white/10' : 'border-[#76577B]/15'
            }`}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#76577B]/10 text-[#76577B]">
                Interactive B2B Configurator
              </div>
              <h3 className={`font-serif text-3xl font-semibold ${
                isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
              }`}>
                Corporate Kit Estimator
              </h3>
              <p className={`text-sm mt-1.5 ${
                isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'
              }`}>
                Combine any of our 4 bulk merchandise essentials, set your team size (30+ minimum),
                and preview instant volume tier guidance.
              </p>

              {/* Step 1: Select Bulk Items */}
              <div className="mt-7">
                <span className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  1. Select items for your kit (MOQ 30+ each)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BULK_PRODUCTS.map((product) => {
                    const checked = selectedKitIds.includes(product.id);
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => toggleKitItem(product.id)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          checked
                            ? (isDark
                                ? 'bg-[#76577B]/30 border-[#E3A4AE] text-white shadow-md'
                                : 'bg-[#76577B]/10 border-[#76577B] text-[#161E24] shadow-sm')
                            : (isDark
                                ? 'bg-white/5 border-white/10 text-[#CBD5E1] hover:border-white/20'
                                : 'bg-[#FAF6F0] border-[#76577B]/15 text-[#424D55] hover:border-[#76577B]/30')
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-semibold ${
                            checked
                              ? (isDark ? 'text-white' : 'text-[#161E24]')
                              : (isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]')
                          }`}>{product.shortName}</p>
                          <p className={`text-xs mt-0.5 tabular-nums ${
                            isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                          }`}>
                            Base ~{formatInr(product.unitPriceEstimate)} / pc
                          </p>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                            checked
                              ? 'bg-[#76577B] border-[#76577B] text-white'
                              : (isDark ? 'bg-black/30 border-white/20' : 'bg-white border-[#76577B]/20')
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Team Size (Enforces 30+ MOQ) */}
              <div className="mt-7">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <label
                    htmlFor="estimator-team-size"
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                    }`}
                  >
                    2. Team size / quantity (Minimum 30 units)
                  </label>
                  <span className={`text-xs font-bold tabular-nums px-2.5 py-0.5 rounded-full ${
                    isDark ? 'bg-white/10 text-[#FAF6F0]' : 'bg-[#76577B]/10 text-[#76577B]'
                  }`}>
                    {effectiveTeamSize} kits
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={30}
                    max={500}
                    step={5}
                    value={Math.min(500, Math.max(30, effectiveTeamSize))}
                    onChange={(e) => setTeamSizeInput(e.target.value)}
                    aria-label="Team size slider"
                    className="flex-1 accent-[#76577B] cursor-pointer"
                  />
                  <input
                    id="estimator-team-size"
                    type="number"
                    min={1}
                    value={teamSizeInput}
                    onChange={(e) => setTeamSizeInput(e.target.value)}
                    className={`w-24 px-3 py-2 text-sm font-semibold tabular-nums rounded-lg border focus:outline-none focus:border-[#76577B] ${
                      isDark
                        ? 'bg-black/40 border-white/20 text-white'
                        : 'bg-[#FAF6F0] border-[#76577B]/30 text-[#161E24]'
                    }`}
                  />
                </div>
                {isEstimatorBelowMoq && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C1D40]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    Corporate merchandise carries a strict 30-piece MOQ. Estimate below is anchored to 30 kits.
                  </p>
                )}
              </div>

              {/* Step 3: Printing Finish */}
              <div className="mt-7">
                <span className={`block text-xs font-semibold uppercase tracking-wider mb-3 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  3. Choose printing finish
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {PRINTING_FINISHES.map((finish) => {
                    const isSelected = selectedFinishId === finish.id;
                    return (
                      <button
                        key={finish.id}
                        type="button"
                        onClick={() => setSelectedFinishId(finish.id)}
                        className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-all cursor-pointer text-center whitespace-nowrap ${
                          isSelected
                            ? (isDark
                                ? 'bg-[#76577B] text-white border-[#E3A4AE]/50 shadow-md'
                                : 'bg-[#76577B] text-white border-[#76577B] shadow-sm')
                            : (isDark
                                ? 'bg-white/5 text-[#CBD5E1] border-white/10 hover:border-white/25'
                                : 'bg-[#FAF6F0] text-[#424D55] border-[#76577B]/20 hover:border-[#76577B]/40')
                        }`}
                      >
                        {finish.name}
                      </button>
                    );
                  })}
                </div>
                <p className={`text-xs mt-2.5 ${isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}`}>
                  <span className={`font-semibold ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>{activeFinish.name}:</span>{' '}
                  {activeFinish.bestFor} — {activeFinish.note}
                </p>
              </div>
            </div>

            {/* Right Live Bulk Tier Guidance Panel */}
            <div className={`lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
              isDark ? 'bg-[#0B0E14] text-[#FAF6F0]' : 'bg-[#F5F0E8] text-[#161E24]'
            }`}>
              <div>
                <div className={`flex items-center justify-between gap-2 text-xs pb-4 border-b font-medium ${
                  isDark ? 'text-[#E3A4AE] border-white/10' : 'text-[#76577B] border-[#76577B]/20'
                }`}>
                  <span>Instant Bulk Tier Guidance</span>
                  <span className="tabular-nums font-semibold">{estimatorSummary.tier.discountLabel}</span>
                </div>

                <h4 className={`font-serif text-3xl font-semibold mt-5 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  {estimatorSummary.tier.name}
                </h4>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Selected Items</dt>
                    <dd className={`text-right font-medium ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                      {estimatorSummary.selectedProducts.map((p) => p.shortName).join(' + ')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Printing Finish</dt>
                    <dd className={`text-right font-medium ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>{activeFinish.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Order Volume</dt>
                    <dd className={`text-right font-medium tabular-nums ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                      {effectiveTeamSize} complete kits
                    </dd>
                  </div>
                  <div className={`flex justify-between gap-4 pt-3 border-t ${
                    isDark ? 'border-white/10' : 'border-[#76577B]/20'
                  }`}>
                    <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Indicative Rate / Kit</dt>
                    <dd className={`text-right text-lg font-bold tabular-nums ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                      ~{formatInr(estimatorSummary.perKit)}
                    </dd>
                  </div>
                </dl>

                <div className={`mt-6 rounded-xl p-5 border ${
                  isDark
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white border-[#76577B]/20 shadow-sm'
                }`}>
                  <p className={`text-xs font-medium ${isDark ? 'text-[#E3A4AE]' : 'text-[#76577B]'}`}>
                    Estimated Project Budget Range
                  </p>
                  <p className={`font-serif text-3xl sm:text-4xl font-semibold mt-1 tabular-nums ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    {formatInr(estimatorSummary.totalLow)} – {formatInr(estimatorSummary.totalHigh)}
                  </p>
                  <p className={`text-[11px] mt-2 leading-relaxed ${isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}`}>
                    Indicative studio estimate excluding GST &amp; shipping. Exact pricing confirmed
                    after logo &amp; packaging proof review.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleLoadKitIntoForm}
                  className="w-full py-3 px-4 rounded-xl liquid-glass-plum text-white text-sm font-semibold hover:opacity-95 transition-all shadow-md cursor-pointer border border-[#E3A4AE]/40"
                >
                  Request Official Quote for This Kit
                </button>
                <button
                  type="button"
                  onClick={handleSaveKitToShortlist}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer border ${
                    isDark
                      ? 'border-white/20 text-[#FAF6F0] hover:bg-white/10'
                      : 'border-[#76577B]/25 text-[#161E24] bg-white hover:bg-[#FAF6F0] shadow-xs'
                  }`}
                >
                  {kitAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                      Kit Added to Quote Tray
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      Save Kit to Shortlist Tray
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Smart B2B Bulk Quotation Form */}
        <div
          id="bulk-quote-form"
          className={`scroll-mt-24 rounded-2xl p-6 sm:p-8 lg:p-10 border transition-all ${
            isDark
              ? 'liquid-glass border-white/10'
              : 'bg-white border-[#76577B]/20 shadow-xl'
          }`}
        >
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b ${
            isDark ? 'border-white/10' : 'border-[#76577B]/15'
          }`}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 bg-[#76577B]/10 text-[#76577B]">
                Direct B2B Desk · Kalyan Studio
              </div>
              <h3 className={`font-serif text-3xl sm:text-4xl font-semibold ${
                isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
              }`}>
                Smart Bulk Quotation Brief
              </h3>
            </div>
            <p className={`text-xs sm:text-sm max-w-md ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>
              Submit your brief to generate an instant downloadable Quotation Summary Ticket and
              one-click WhatsApp handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="b2b-name" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    Customer / Company Name *
                  </label>
                  <input
                    id="b2b-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Riya Deshmukh · Verve Tech"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#76577B] transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/15 text-white placeholder-white/30'
                        : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24] placeholder-[#424D55]/50'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="b2b-phone" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    Contact Number (WhatsApp preferred) *
                  </label>
                  <input
                    id="b2b-phone"
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#76577B] transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/15 text-white placeholder-white/30'
                        : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24] placeholder-[#424D55]/50'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="b2b-email" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    Work Email Address *
                  </label>
                  <input
                    id="b2b-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#76577B] transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/15 text-white placeholder-white/30'
                        : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24] placeholder-[#424D55]/50'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor="b2b-location" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    Delivery Location (City / Pincode) *
                  </label>
                  <input
                    id="b2b-location"
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Thane West / Mumbai 400051"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#76577B] transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/15 text-white placeholder-white/30'
                        : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24] placeholder-[#424D55]/50'
                    }`}
                  />
                </div>
              </div>

              {/* Multi-select Products Required */}
              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  Products Required (Select all that apply) *
                </span>
                <div className="flex flex-wrap gap-2">
                  {BULK_PRODUCT_OPTIONS.map((option) => {
                    const active = selectedFormProducts.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleFormProduct(option)}
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                          active
                            ? (isDark
                                ? 'bg-[#76577B] text-white border-[#E3A4AE]/50 shadow-md'
                                : 'bg-[#76577B] text-white border-[#76577B] shadow-sm')
                            : (isDark
                                ? 'bg-white/5 text-[#CBD5E1] border-white/10 hover:border-white/25'
                                : 'bg-[#FAF6F0] text-[#424D55] border-[#76577B]/20 hover:border-[#76577B]/40')
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity & Printing Finish */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="b2b-qty" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    Quantity Required (Strict MOQ: 30+) *
                  </label>
                  <input
                    id="b2b-qty"
                    type="number"
                    min={1}
                    required
                    value={quantityInput}
                    onChange={(e) => setQuantityInput(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm font-semibold tabular-nums rounded-lg border focus:outline-none transition-colors ${
                      isFormBelowMoq
                        ? 'border-[#B4234B] bg-[#B4234B]/10 text-[#8C1D40]'
                        : (isDark
                            ? 'bg-black/40 border-white/15 text-white focus:border-[#76577B]'
                            : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24] focus:border-[#76577B]')
                    }`}
                  />
                  {isFormBelowMoq && (
                    <p className="mt-1.5 inline-flex items-start gap-1.5 text-xs font-semibold text-[#8C1D40]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                      Quantity must be at least 30 pieces for corporate merchandise. For smaller
                      orders, explore our No-MOQ keepsakes.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="b2b-finish" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                    isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                  }`}>
                    Preferred Printing Finish
                  </label>
                  <select
                    id="b2b-finish"
                    value={formFinish}
                    onChange={(e) => setFormFinish(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#76577B] transition-colors ${
                      isDark
                        ? 'bg-black/40 border-white/15 text-white'
                        : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24]'
                    }`}
                  >
                    {PRINTING_FINISHES.map((finish) => (
                      <option key={finish.id} value={finish.name} className={isDark ? 'bg-[#0B0E14] text-white' : 'bg-white text-[#161E24]'}>
                        {finish.name}
                      </option>
                    ))}
                    <option value="Studio Recommendation" className={isDark ? 'bg-[#0B0E14] text-white' : 'bg-white text-[#161E24]'}>
                      Not sure — Recommend best finish
                    </option>
                  </select>
                </div>
              </div>

              {/* Customisation & Printing Requirements */}
              <div>
                <label htmlFor="b2b-notes" className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  Customisation &amp; Printing Requirements
                </label>
                <textarea
                  id="b2b-notes"
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Share brand hex colours, logo placement, individual name personalisation, or target delivery date..."
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border focus:outline-none focus:border-[#76577B] transition-colors ${
                    isDark
                      ? 'bg-black/40 border-white/15 text-white placeholder-white/30'
                      : 'bg-[#FAF6F0] border-[#76577B]/25 text-[#161E24] placeholder-[#424D55]/50'
                  }`}
                />
              </div>

              {/* Logo / Artwork File Upload */}
              <div>
                <span className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'
                }`}>
                  Logo / Artwork File Upload (PNG, SVG, JPG, PDF)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    isDark
                      ? 'border-white/25 bg-white/5 text-[#FAF6F0] hover:bg-white/10'
                      : 'border-[#76577B]/30 bg-[#FAF6F0] text-[#161E24] hover:bg-[#76577B]/10'
                  }`}>
                    <FileUp className="w-4 h-4 text-[#76577B]" aria-hidden="true" />
                    Choose Artwork File
                    <input
                      type="file"
                      accept="image/*,.pdf,.svg,.ai,.eps"
                      onChange={handleArtworkUpload}
                      className="sr-only"
                    />
                  </label>

                  {artworkFileName && (
                    <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg border ${
                      isDark
                        ? 'bg-white/10 border-white/15 text-white'
                        : 'bg-[#76577B]/10 border-[#76577B]/20 text-[#161E24]'
                    }`}>
                      {artworkPreviewUrl && (
                        <img
                          src={artworkPreviewUrl}
                          alt="Uploaded logo thumbnail"
                          className="w-7 h-7 rounded object-contain bg-white/10 border border-current/20"
                        />
                      )}
                      <span className="text-xs font-medium max-w-[180px] truncate">
                        {artworkFileName}
                      </span>
                      <button
                        type="button"
                        onClick={clearArtwork}
                        aria-label="Remove artwork file"
                        className="opacity-75 hover:opacity-100 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="rounded-lg bg-[#B4234B]/15 border border-[#B4234B]/30 px-4 py-3 text-xs sm:text-sm font-medium text-[#8C1D40] flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#8C1D40]" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isFormBelowMoq}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl liquid-glass-plum text-white text-sm font-semibold hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer border border-[#E3A4AE]/40"
              >
                {isSubmitting ? 'Generating Quotation Ticket...' : 'Generate Quotation Summary Ticket'}
              </button>
            </form>

            {/* Right Column: Official Quotation Summary Ticket */}
            <div className="lg:col-span-5 flex flex-col">
              {ticket ? (
                <div className={`rounded-2xl p-6 flex flex-col justify-between h-full border ${
                  isDark
                    ? 'liquid-glass border-white/15'
                    : 'bg-[#FAF6F0] border-[#76577B]/20 shadow-md text-[#161E24]'
                }`}>
                  <div>
                    <div className={`flex items-center justify-between gap-2 pb-4 border-b ${
                      isDark ? 'border-white/10' : 'border-[#76577B]/15'
                    }`}>
                      <div>
                        <p className={`text-xs font-semibold ${isDark ? 'text-[#FAF6F0]' : 'text-[#161E24]'}`}>
                          Official Quotation Summary Ticket
                        </p>
                        <p className={`font-mono text-sm font-semibold mt-0.5 tabular-nums ${
                          isDark ? 'text-[#E3A4AE]' : 'text-[#76577B]'
                        }`}>
                          {ticket.ticketId}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366]">
                        MOQ Verified
                      </span>
                    </div>

                    <dl className="mt-4 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Client</dt>
                        <dd className={`font-medium text-right ${isDark ? 'text-white' : 'text-[#161E24]'}`}>{ticket.customerName}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Contact</dt>
                        <dd className={`font-medium text-right tabular-nums ${isDark ? 'text-white' : 'text-[#161E24]'}`}>
                          {ticket.contactNumber}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Products</dt>
                        <dd className={`font-medium text-right ${isDark ? 'text-white' : 'text-[#161E24]'}`}>
                          {ticket.products.join(', ')}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Volume &amp; Finish</dt>
                        <dd className={`font-medium text-right tabular-nums ${isDark ? 'text-white' : 'text-[#161E24]'}`}>
                          {ticket.quantity} pcs · {ticket.finish}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Delivery</dt>
                        <dd className={`font-medium text-right ${isDark ? 'text-white' : 'text-[#161E24]'}`}>
                          {ticket.deliveryLocation}
                        </dd>
                      </div>
                      {ticket.artworkFileName && (
                        <div className="flex justify-between gap-3">
                          <dt className={isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}>Artwork</dt>
                          <dd className={`font-medium text-right truncate max-w-[180px] ${isDark ? 'text-white' : 'text-[#161E24]'}`}>
                            {ticket.artworkFileName}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className={`mt-5 rounded-xl p-4 border ${
                      isDark
                        ? 'bg-white/5 border-white/10'
                        : 'bg-white border-[#76577B]/20 shadow-xs'
                    }`}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-[#E3A4AE]' : 'text-[#76577B]'}`}>{ticket.tierName}</p>
                      <p className={`font-serif text-2xl font-semibold mt-0.5 tabular-nums ${
                        isDark ? 'text-white' : 'text-[#161E24]'
                      }`}>
                        {formatInr(ticket.estimatedTotalRange.low)} –{' '}
                        {formatInr(ticket.estimatedTotalRange.high)}
                      </p>
                      <p className={`text-[11px] mt-1 ${isDark ? 'text-[#CBD5E1]' : 'text-[#64748B]'}`}>
                        Estimated ~{formatInr(ticket.estimatedPerUnit)} per set · Final quote sent
                        within 1 business day.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <a
                      href={buildWhatsAppUrl(buildTicketPlainText(ticket))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all inline-flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/25"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Send Brief via WhatsApp
                    </a>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopyTicket}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDark
                            ? 'border-white/15 bg-white/5 text-[#FAF6F0] hover:bg-white/10'
                            : 'border-[#76577B]/20 bg-white text-[#161E24] hover:bg-[#FAF6F0] shadow-xs'
                        }`}
                      >
                        {copiedTicket ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            Copy Ticket
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadTicket}
                        className={`py-2.5 px-3 rounded-lg border text-xs font-medium transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDark
                            ? 'border-white/15 bg-white/5 text-[#FAF6F0] hover:bg-white/10'
                            : 'border-[#76577B]/20 bg-white text-[#161E24] hover:bg-[#FAF6F0] shadow-xs'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        Download .txt
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`rounded-2xl p-7 flex flex-col justify-between h-full border ${
                  isDark
                    ? 'liquid-glass border-white/10 text-[#FAF6F0]'
                    : 'bg-[#FAF6F0] border-[#76577B]/20 text-[#161E24] shadow-md'
                }`}>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-[#76577B]/10 text-[#76577B]">
                      Studio Workflow
                    </div>
                    <h4 className={`font-serif text-2xl font-semibold ${isDark ? 'text-white' : 'text-[#161E24]'}`}>
                      From artwork proof to doorstep delivery
                    </h4>
                    <ol className={`mt-5 space-y-4 text-sm ${isDark ? 'text-[#CBD5E1]' : 'text-[#424D55]'}`}>
                      <li>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#161E24]'}`}>01. Brief &amp; Ticket —</span>{' '}
                        Complete the quotation form to generate your structured reference ticket.
                      </li>
                      <li>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#161E24]'}`}>02. Digital Proofing —</span>{' '}
                        Our Kalyan studio prepares colour-calibrated mockups before a single piece is
                        printed.
                      </li>
                      <li>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#161E24]'}`}>03. Dispatch &amp; Boxing —</span>{' '}
                        Individually packed kits shipped across Mumbai, Thane, Pune, and pan-India.
                      </li>
                    </ol>
                  </div>

                  <div className={`mt-6 pt-5 border-t text-xs ${
                    isDark ? 'border-white/10 text-[#CBD5E1]' : 'border-[#76577B]/15 text-[#64748B]'
                  }`}>
                    Need faster turnaround for an upcoming event or offsite? Share your target date
                    in the requirements box above.
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
