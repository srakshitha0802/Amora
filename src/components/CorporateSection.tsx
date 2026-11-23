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
  API_BASE_URL,
  BULK_PRODUCTS,
  CORPORATE_PILLARS,
  PRINTING_FINISHES,
  buildWhatsAppUrl,
} from '../data/products';
import { buildLocalQuotationTicket } from '../utils/quotation';
import type {
  CorporatePrefill,
  PrintingFinishId,
  QuotationTicket,
  ShortlistItem,
} from '../types';

interface CorporateSectionProps {
  prefill: CorporatePrefill | null;
  onAddKitToShortlist: (items: Omit<ShortlistItem, 'id'>[]) => void;
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
    const requestPayload = {
      customerName,
      contactNumber,
      email,
      products: selectedFormProducts,
      quantity: Math.floor(parsedFormQty),
      finish: formFinish,
      requirements,
      deliveryLocation,
      artworkFileName,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/quotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });
      const contentType = res.headers.get('content-type') || '';

      // Static hosts (e.g. GitHub Pages) return 404/405 or HTML instead of JSON API
      if (res.status === 404 || res.status === 405 || !contentType.includes('application/json')) {
        const local = buildLocalQuotationTicket(requestPayload);
        if (local.error || !local.ticket) {
          setFormError(local.error || 'Could not generate quotation summary.');
          return;
        }
        setTicket(local.ticket);
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Could not generate quotation summary.');
        return;
      }
      setTicket(data.ticket as QuotationTicket);
    } catch {
      // Static GitHub Pages fallback when no API server is attached
      const local = buildLocalQuotationTicket(requestPayload);
      if (local.ticket) {
        setTicket(local.ticket);
      } else {
        setFormError(
          local.error || 'Network issue while generating your quotation ticket. Please try again.'
        );
      }
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

  return (
    <section id="corporate" className="py-16 lg:py-24 bg-[#FAF5EE] border-b border-[#EBDCE4]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* B2B Intro Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium text-[#6E5D66] mb-2">
              Corporate &amp; Businesses Portal · Strict MOQ 30+ Units
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-semibold text-[#3B0D27] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Executive merchandise designed like a boutique gift
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm sm:text-[15px] text-[#6E5D66] leading-relaxed">
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
              className="rounded-2xl bg-[#FDFBF7] border border-[#EBDCE4] p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-[#6E5D66] tabular-nums">
                  {pillar.number}.
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#3B0D27] mt-2 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#6E5D66] mt-2.5 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Corporate Kit Estimator */}
        <div className="rounded-2xl bg-[#FDFBF7] border border-[#EBDCE4] overflow-hidden mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Configurator Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#EBDCE4]">
              <p className="text-xs font-medium text-[#6E5D66] mb-1">
                Interactive B2B Configurator
              </p>
              <h3 className="font-editorial text-3xl font-semibold text-[#3B0D27]">
                Corporate Kit Estimator
              </h3>
              <p className="text-sm text-[#6E5D66] mt-1.5">
                Combine any of our 4 bulk merchandise essentials, set your team size (30+ minimum),
                and preview instant volume tier guidance.
              </p>

              {/* Step 1: Select Bulk Items */}
              <div className="mt-7">
                <span className="block text-xs font-semibold text-[#3B0D27] mb-3">
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
                        className={`text-left p-4 rounded-xl border transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                          checked
                            ? 'bg-[#FCE7F3]/55 border-[#3B0D27]'
                            : 'bg-[#FAF5EE]/60 border-[#EBDCE4] hover:border-[#3B0D27]/40'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#3B0D27]">{product.shortName}</p>
                          <p className="text-xs text-[#6E5D66] mt-0.5 tabular-nums">
                            Base ~{formatInr(product.unitPriceEstimate)} / pc
                          </p>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                            checked
                              ? 'bg-[#3B0D27] border-[#3B0D27] text-[#FDFBF7]'
                              : 'bg-white border-[#D6C2CD]'
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
                    className="text-xs font-semibold text-[#3B0D27]"
                  >
                    2. Team size / quantity (Minimum 30 units)
                  </label>
                  <span className="text-xs font-semibold text-[#3B0D27] tabular-nums">
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
                    className="flex-1 accent-[#3B0D27] cursor-pointer"
                  />
                  <input
                    id="estimator-team-size"
                    type="number"
                    min={1}
                    value={teamSizeInput}
                    onChange={(e) => setTeamSizeInput(e.target.value)}
                    className="w-24 px-3 py-2 text-sm font-semibold tabular-nums rounded-lg border border-[#EBDCE4] bg-[#FAF5EE] text-[#3B0D27] focus:outline-none focus:border-[#3B0D27]"
                  />
                </div>
                {isEstimatorBelowMoq && (
                  <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#8C1D40]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    Corporate merchandise carries a strict 30-piece MOQ. Estimate below is anchored to 30 kits.
                  </p>
                )}
              </div>

              {/* Step 3: Printing Finish */}
              <div className="mt-7">
                <span className="block text-xs font-semibold text-[#3B0D27] mb-3">
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
                        className={`px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer text-center whitespace-nowrap ${
                          isSelected
                            ? 'bg-[#3B0D27] text-[#FDFBF7] border-[#3B0D27]'
                            : 'bg-[#FAF5EE] text-[#3B0D27] border-[#EBDCE4] hover:border-[#3B0D27]/40'
                        }`}
                      >
                        {finish.name}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#6E5D66] mt-2.5">
                  <span className="font-semibold text-[#3B0D27]">{activeFinish.name}:</span>{' '}
                  {activeFinish.bestFor} — {activeFinish.note}
                </p>
              </div>
            </div>

            {/* Right Live Bulk Tier Guidance Panel */}
            <div className="lg:col-span-5 bg-[#3B0D27] text-[#FDFBF7] p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#F9D8E6]/85 pb-4 border-b border-[#FDFBF7]/15">
                  <span>Instant Bulk Tier Guidance</span>
                  <span className="tabular-nums">{estimatorSummary.tier.discountLabel}</span>
                </div>

                <h4 className="font-editorial text-3xl font-semibold mt-5">
                  {estimatorSummary.tier.name}
                </h4>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#F9D8E6]/80">Selected Items</dt>
                    <dd className="text-right font-medium">
                      {estimatorSummary.selectedProducts.map((p) => p.shortName).join(' + ')}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#F9D8E6]/80">Printing Finish</dt>
                    <dd className="text-right font-medium">{activeFinish.name}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#F9D8E6]/80">Order Volume</dt>
                    <dd className="text-right font-medium tabular-nums">
                      {effectiveTeamSize} complete kits
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 pt-3 border-t border-[#FDFBF7]/15">
                    <dt className="text-[#F9D8E6]/80">Indicative Rate / Kit</dt>
                    <dd className="text-right text-lg font-semibold tabular-nums">
                      ~{formatInr(estimatorSummary.perKit)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 rounded-xl bg-[#FDFBF7]/10 p-5">
                  <p className="text-xs text-[#F9D8E6]/85">Estimated Project Budget Range</p>
                  <p className="font-editorial text-3xl sm:text-4xl font-semibold mt-1 tabular-nums">
                    {formatInr(estimatorSummary.totalLow)} – {formatInr(estimatorSummary.totalHigh)}
                  </p>
                  <p className="text-[11px] text-[#F9D8E6]/75 mt-2 leading-relaxed">
                    Indicative studio estimate excluding GST &amp; shipping. Exact pricing confirmed
                    after logo &amp; packaging proof review.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleLoadKitIntoForm}
                  className="w-full py-3 px-4 rounded-lg bg-[#FCE7F3] text-[#3B0D27] text-sm font-semibold hover:bg-[#F9D8E6] transition-colors cursor-pointer"
                >
                  Request Official Quote for This Kit
                </button>
                <button
                  type="button"
                  onClick={handleSaveKitToShortlist}
                  className="w-full py-2.5 px-4 rounded-lg border border-[#FDFBF7]/25 text-[#FDFBF7] text-xs sm:text-sm font-medium hover:bg-[#FDFBF7]/10 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {kitAddedFeedback ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
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
          className="scroll-mt-24 rounded-2xl bg-[#FDFBF7] border border-[#EBDCE4] p-6 sm:p-8 lg:p-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#EBDCE4]">
            <div>
              <p className="text-xs font-medium text-[#6E5D66] mb-1">
                Direct B2B Desk · Kalyan Studio
              </p>
              <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#3B0D27]">
                Smart Bulk Quotation Brief
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#6E5D66] max-w-md">
              Submit your brief to generate an instant downloadable Quotation Summary Ticket and
              one-click WhatsApp handoff.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <form onSubmit={handleFormSubmit} className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="b2b-name" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                    Customer / Company Name *
                  </label>
                  <input
                    id="b2b-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Riya Deshmukh · Verve Tech"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/50 text-[#3B0D27] placeholder:text-[#6E5D66]/65 focus:outline-none focus:border-[#3B0D27]"
                  />
                </div>
                <div>
                  <label htmlFor="b2b-phone" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                    Contact Number (WhatsApp preferred) *
                  </label>
                  <input
                    id="b2b-phone"
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/50 text-[#3B0D27] placeholder:text-[#6E5D66]/65 focus:outline-none focus:border-[#3B0D27]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="b2b-email" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                    Work Email Address *
                  </label>
                  <input
                    id="b2b-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="procurement@company.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/50 text-[#3B0D27] placeholder:text-[#6E5D66]/65 focus:outline-none focus:border-[#3B0D27]"
                  />
                </div>
                <div>
                  <label htmlFor="b2b-location" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                    Delivery Location (City / Pincode) *
                  </label>
                  <input
                    id="b2b-location"
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Thane West / Mumbai 400051"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/50 text-[#3B0D27] placeholder:text-[#6E5D66]/65 focus:outline-none focus:border-[#3B0D27]"
                  />
                </div>
              </div>

              {/* Multi-select Products Required */}
              <div>
                <span className="block text-xs font-semibold text-[#3B0D27] mb-2">
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
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#3B0D27] text-[#FDFBF7] border-[#3B0D27]'
                            : 'bg-[#FAF5EE] text-[#3B0D27] border-[#EBDCE4] hover:border-[#3B0D27]/40'
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
                  <label htmlFor="b2b-qty" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                    Quantity Required (Strict MOQ: 30+) *
                  </label>
                  <input
                    id="b2b-qty"
                    type="number"
                    min={1}
                    required
                    value={quantityInput}
                    onChange={(e) => setQuantityInput(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-sm font-semibold tabular-nums rounded-lg border bg-[#FAF5EE]/50 text-[#3B0D27] focus:outline-none ${
                      isFormBelowMoq
                        ? 'border-[#B4234B] focus:border-[#B4234B]'
                        : 'border-[#EBDCE4] focus:border-[#3B0D27]'
                    }`}
                  />
                  {isFormBelowMoq && (
                    <p className="mt-1.5 inline-flex items-start gap-1.5 text-xs font-medium text-[#8C1D40]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
                      Quantity must be at least 30 pieces for corporate merchandise. For smaller
                      orders, explore our No-MOQ keepsakes.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="b2b-finish" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                    Preferred Printing Finish
                  </label>
                  <select
                    id="b2b-finish"
                    value={formFinish}
                    onChange={(e) => setFormFinish(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/50 text-[#3B0D27] focus:outline-none focus:border-[#3B0D27]"
                  >
                    {PRINTING_FINISHES.map((finish) => (
                      <option key={finish.id} value={finish.name}>
                        {finish.name}
                      </option>
                    ))}
                    <option value="Studio Recommendation">Not sure — Recommend best finish</option>
                  </select>
                </div>
              </div>

              {/* Customisation & Printing Requirements */}
              <div>
                <label htmlFor="b2b-notes" className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                  Customisation &amp; Printing Requirements
                </label>
                <textarea
                  id="b2b-notes"
                  rows={3}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Share brand hex colours, logo placement, individual name personalisation, or target delivery date..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#EBDCE4] bg-[#FAF5EE]/50 text-[#3B0D27] placeholder:text-[#6E5D66]/65 focus:outline-none focus:border-[#3B0D27]"
                />
              </div>

              {/* Logo / Artwork File Upload */}
              <div>
                <span className="block text-xs font-semibold text-[#3B0D27] mb-1.5">
                  Logo / Artwork File Upload (PNG, SVG, JPG, PDF)
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-[#C7AEBC] bg-[#FAF5EE] text-xs sm:text-sm font-medium text-[#3B0D27] hover:bg-[#FCE7F3]/50 transition-colors cursor-pointer">
                    <FileUp className="w-4 h-4" aria-hidden="true" />
                    Choose Artwork File
                    <input
                      type="file"
                      accept="image/*,.pdf,.svg,.ai,.eps"
                      onChange={handleArtworkUpload}
                      className="sr-only"
                    />
                  </label>

                  {artworkFileName && (
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#FCE7F3]/60 border border-[#EBDCE4]">
                      {artworkPreviewUrl && (
                        <img
                          src={artworkPreviewUrl}
                          alt="Uploaded logo thumbnail"
                          className="w-7 h-7 rounded object-contain bg-white border border-[#EBDCE4]"
                        />
                      )}
                      <span className="text-xs font-medium text-[#3B0D27] max-w-[180px] truncate">
                        {artworkFileName}
                      </span>
                      <button
                        type="button"
                        onClick={clearArtwork}
                        aria-label="Remove artwork file"
                        className="text-[#6E5D66] hover:text-[#3B0D27] cursor-pointer"
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
                  className="rounded-lg bg-[#FCE7F3] border border-[#D497B2] px-4 py-3 text-xs sm:text-sm font-medium text-[#3B0D27] flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#8C1D40]" aria-hidden="true" />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isFormBelowMoq}
                className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#3B0D27] text-[#FDFBF7] text-sm font-semibold hover:bg-[#59163C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Generating Quotation Ticket...' : 'Generate Quotation Summary Ticket'}
              </button>
            </form>

            {/* Right Column: Official Quotation Summary Ticket */}
            <div className="lg:col-span-5 flex flex-col">
              {ticket ? (
                <div className="rounded-2xl bg-[#FAF5EE] border border-[#3B0D27]/30 p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#EBDCE4]">
                      <div>
                        <p className="text-xs font-semibold text-[#3B0D27]">
                          Official Quotation Summary Ticket
                        </p>
                        <p className="font-mono text-sm font-semibold text-[#3B0D27] mt-0.5 tabular-nums">
                          {ticket.ticketId}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-[#6E5D66]">MOQ Verified</span>
                    </div>

                    <dl className="mt-4 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6E5D66]">Client</dt>
                        <dd className="font-medium text-[#3B0D27] text-right">{ticket.customerName}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6E5D66]">Contact</dt>
                        <dd className="font-medium text-[#3B0D27] text-right tabular-nums">
                          {ticket.contactNumber}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6E5D66]">Products</dt>
                        <dd className="font-medium text-[#3B0D27] text-right">
                          {ticket.products.join(', ')}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6E5D66]">Volume &amp; Finish</dt>
                        <dd className="font-medium text-[#3B0D27] text-right tabular-nums">
                          {ticket.quantity} pcs · {ticket.finish}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[#6E5D66]">Delivery</dt>
                        <dd className="font-medium text-[#3B0D27] text-right">
                          {ticket.deliveryLocation}
                        </dd>
                      </div>
                      {ticket.artworkFileName && (
                        <div className="flex justify-between gap-3">
                          <dt className="text-[#6E5D66]">Artwork</dt>
                          <dd className="font-medium text-[#3B0D27] text-right truncate max-w-[180px]">
                            {ticket.artworkFileName}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-5 rounded-xl bg-[#FDFBF7] border border-[#EBDCE4] p-4">
                      <p className="text-xs text-[#6E5D66]">{ticket.tierName}</p>
                      <p className="font-editorial text-2xl font-semibold text-[#3B0D27] mt-0.5 tabular-nums">
                        {formatInr(ticket.estimatedTotalRange.low)} –{' '}
                        {formatInr(ticket.estimatedTotalRange.high)}
                      </p>
                      <p className="text-[11px] text-[#6E5D66] mt-1">
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
                      className="w-full py-3 px-4 rounded-lg bg-[#3B0D27] text-[#FDFBF7] text-sm font-semibold hover:bg-[#59163C] transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      Send Brief via WhatsApp
                    </a>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={handleCopyTicket}
                        className="py-2.5 px-3 rounded-lg border border-[#EBDCE4] bg-[#FDFBF7] text-xs font-medium text-[#3B0D27] hover:bg-[#FCE7F3]/60 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        {copiedTicket ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
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
                        className="py-2.5 px-3 rounded-lg border border-[#EBDCE4] bg-[#FDFBF7] text-xs font-medium text-[#3B0D27] hover:bg-[#FCE7F3]/60 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        Download .txt
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#FAF5EE] border border-[#EBDCE4] p-7 flex flex-col justify-between h-full">
                  <div>
                    <p className="text-xs font-semibold text-[#3B0D27] mb-2">
                      How our B2B workflow works
                    </p>
                    <h4 className="font-editorial text-2xl font-semibold text-[#3B0D27]">
                      From artwork proof to doorstep delivery
                    </h4>
                    <ol className="mt-5 space-y-4 text-sm text-[#6E5D66]">
                      <li>
                        <span className="font-semibold text-[#3B0D27]">01. Brief &amp; Ticket —</span>{' '}
                        Complete the quotation form to generate your structured reference ticket.
                      </li>
                      <li>
                        <span className="font-semibold text-[#3B0D27]">02. Digital Proofing —</span>{' '}
                        Our Kalyan studio prepares colour-calibrated mockups before a single piece is
                        printed.
                      </li>
                      <li>
                        <span className="font-semibold text-[#3B0D27]">03. Dispatch &amp; Boxing —</span>{' '}
                        Individually packed kits shipped across Mumbai, Thane, Pune, and pan-India.
                      </li>
                    </ol>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#EBDCE4] text-xs text-[#6E5D66]">
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
