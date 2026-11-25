import React from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  Info,
} from 'lucide-react';
import type { ShortlistItem } from '../types';
import { buildWhatsAppUrl } from '../data/products';

interface ShortlistDrawerProps {
  isOpen: boolean;
  items: ShortlistItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onSendBulkToQuoteForm: () => void;
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onSendBulkToQuoteForm,
}) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasBulkItems = items.some((i) => i.isBulkOnly);
  const estimatedSubtotal = items.reduce(
    (sum, item) => sum + item.unitPriceEstimate * item.quantity,
    0
  );

  const purchaseWhatsAppMessage = [
    `🛍️ *ORDER / PURCHASE REQUEST — AMORA.CO*`,
    ``,
    `Hello Amora Team! I would like to place an order for the following items from my cart:`,
    `────────────────────────`,
    ...items.map((item, idx) => {
      const lineTotal = item.unitPriceEstimate * item.quantity;
      const details = [
        `*${idx + 1}. ${item.name}*`,
        `   • Quantity: ${item.quantity} ${item.isBulkOnly ? '(Corporate Bulk · MOQ 36+)' : '(Personal Keepsake)'}`,
        `   • Unit Price: ₹${item.unitPriceEstimate.toLocaleString('en-IN')}`,
        `   • Subtotal: ₹${lineTotal.toLocaleString('en-IN')}`,
        item.customText ? `   • Custom Text: "${item.customText}"` : null,
        item.accentColor ? `   • Accent Shade: ${item.accentColor}` : null,
        item.finish ? `   • Finish: ${item.finish}` : null,
        item.artworkName ? `   • Artwork Attached: ${item.artworkName}` : null,
        item.notes ? `   • Special Notes: ${item.notes}` : null,
      ].filter(Boolean);
      return details.join('\n');
    }),
    `────────────────────────`,
    `📦 *Total Products*: ${items.length} items (${items.reduce((s, i) => s + i.quantity, 0)} units)`,
    `💰 *Estimated Order Value*: ₹${estimatedSubtotal.toLocaleString('en-IN')}`,
    ``,
    `📍 *Customer Details*:`,
    `• Name: [Please provide your name]`,
    `• Delivery City & Pincode: [Please provide delivery city/pincode]`,
    ``,
    `Please confirm quotation, production schedule, and payment details to proceed. Thank you!`,
  ].join('\n');

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(purchaseWhatsAppMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortlist-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md h-full bg-[#1A161E] text-[#F8F4EA] shadow-2xl border-l border-white/10 flex flex-col">
        {/* Header (Clean High-Contrast) */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#26202A]">
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-[#C88DA0]">
              Enquiry Basket
            </p>
            <h2
              id="shortlist-drawer-title"
              className="font-serif text-2xl font-semibold text-[#F8F4EA]"
            >
              Your Cart ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 text-[#F8F4EA] flex items-center justify-center hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Informative Disclaimer Banner */}
        <div className="px-5 py-2.5 bg-[#6D2E58]/20 border-b border-[#6D2E58]/30 flex items-start gap-2.5 text-xs text-[#EBC6CF]">
          <Info className="w-4 h-4 shrink-0 text-[#C88DA0] mt-0.5" />
          <p className="leading-snug">
            Amora uses an enquiry-based flow. No payment is charged now; your items are sent via WhatsApp for bespoke quote verification &amp; proofing.
          </p>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-[#6D2E58]/25 border border-[#C88DA0]/30 flex items-center justify-center text-[#C88DA0] mb-4">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#F8F4EA]">
                Your enquiry basket is empty
              </h3>
              <p className="text-sm text-[#D8C6E6] mt-2 max-w-xs leading-relaxed">
                Add personal keepsakes or corporate merchandise to compile an official WhatsApp enquiry in one click.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#6D2E58] text-[#F8F4EA] text-xs font-semibold hover:bg-[#8E4474] transition-colors cursor-pointer shadow-md"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#D8C6E6]">
                <span>{items.length} saved {items.length === 1 ? 'item' : 'items'}</span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-[#C88DA0] hover:text-[#F8F4EA] underline underline-offset-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#26202A] border border-white/10 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5 ${
                        item.isBulkOnly
                          ? 'bg-[#6D2E58]/30 text-[#C88DA0] border border-[#6D2E58]/50'
                          : 'bg-[#C88DA0]/20 text-[#EBC6CF] border border-[#C88DA0]/30'
                      }`}>
                        {item.isBulkOnly ? 'MOQ: 36+ Pieces (Corporate)' : 'No MOQ (Personal)'}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#F8F4EA] leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#C88DA0] font-semibold mt-0.5 tabular-nums">
                        ₹{item.unitPriceEstimate} / pc · Subtotal: ₹{(item.unitPriceEstimate * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-white/40 hover:text-[#E88A98] transition-colors p-1 cursor-pointer"
                      title="Remove item"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Customisation Specs */}
                  {(item.customText || item.finish || item.accentColor || item.artworkName) && (
                    <div className="text-[11px] bg-black/30 rounded-lg p-2.5 space-y-1 text-[#D8C6E6]">
                      {item.customText && (
                        <p><span className="text-white/60">Text / Caption:</span> "{item.customText}"</p>
                      )}
                      {item.finish && (
                        <p><span className="text-white/60">Finish:</span> {item.finish}</p>
                      )}
                      {item.accentColor && (
                        <p className="flex items-center gap-1.5">
                          <span className="text-white/60">Accent:</span>
                          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: item.accentColor }} />
                          <span>{item.accentColor}</span>
                        </p>
                      )}
                      {item.artworkName && (
                        <p><span className="text-white/60">Artwork:</span> {item.artworkName}</p>
                      )}
                    </div>
                  )}

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-xs text-white/60">Quantity</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= item.moq}
                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 text-white" />
                      </button>
                      <span className="text-xs font-bold tabular-nums min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 cursor-pointer transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#26202A] text-[#F8F4EA] space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#D8C6E6]">Estimated Subtotal</span>
                <p className="text-[10px] text-white/50">* Shipping &amp; tax excluded</p>
              </div>
              <span className="font-serif text-2xl font-semibold text-[#F8F4EA] tabular-nums">
                ~₹{estimatedSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <a
              href={buildWhatsAppUrl(purchaseWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-[#0A2E14] hover:bg-[#20bd5a] text-xs sm:text-sm font-bold transition-all inline-flex items-center justify-center gap-2.5 shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" aria-hidden="true" />
              <span>Purchase on WhatsApp (Submit Cart)</span>
            </a>

            <div className="grid grid-cols-1 gap-2">
              {hasBulkItems && (
                <button
                  type="button"
                  onClick={onSendBulkToQuoteForm}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 text-[#F8F4EA] border border-white/15 text-xs font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Transfer Bulk Items to B2B Form</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C88DA0]" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyAll}
                className="w-full py-2 px-4 rounded-xl border border-white/10 text-xs font-medium text-[#D8C6E6] hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#25D366]" aria-hidden="true" />
                    <span>Enquiry Text Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white/60" aria-hidden="true" />
                    <span>Copy Text Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortlistDrawer;
