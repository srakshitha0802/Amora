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

  const consolidatedBrief = [
    `Hello Amora.co! Here is my consolidated Shortlist / Quote Tray enquiry:`,
    '',
    ...items.map((item, idx) => {
      const details = [
        `${idx + 1}. ${item.name} — Qty: ${item.quantity} ${item.isBulkOnly ? '(MOQ 30+ Bulk)' : '(Personal / No MOQ)'}`,
        item.customText ? `   Text: "${item.customText}"` : null,
        item.accentColor ? `   Accent: ${item.accentColor}` : null,
        item.finish ? `   Finish: ${item.finish}` : null,
        item.artworkName ? `   Artwork: ${item.artworkName}` : null,
        item.notes ? `   Notes: ${item.notes}` : null,
      ].filter(Boolean);
      return details.join('\n');
    }),
    '',
    `Indicative Studio Subtotal: ~₹${estimatedSubtotal.toLocaleString('en-IN')}`,
    `Please share final availability, digital proofs, and delivery timeline!`,
  ].join('\n');

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(consolidatedBrief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#232E36]/45 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortlist-drawer-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md h-full bg-[#0B0E14] text-[#FAF6F0] shadow-2xl border-l border-white/10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10 bg-[#F5F0E8]">
          <div>
            <p className="text-xs text-[#FAF6F0]/70">Consolidated Enquiry List</p>
            <h2
              id="shortlist-drawer-title"
              className="font-serif text-2xl font-semibold text-[#FAF6F0]"
            >
              Quote Tray ({items.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote tray"
            className="w-10 h-10 rounded-lg border border-white/10 bg-[#0B0E14] text-[#FAF6F0] flex items-center justify-center text-[#FAF6F0] hover:bg-[#E3A4AE/20] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-[#E3A4AE/20] border border-white/10 flex items-center justify-center text-[#FAF6F0] mb-4">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#FAF6F0]">
                Your quote tray is empty
              </h3>
              <p className="text-sm text-[#FAF6F0]/70 mt-2 max-w-xs">
                Save personal keepsakes or corporate bulk kits here to send everything together in
                one tidy brief.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-5 py-2.5 rounded-lg bg-[#232E36] text-[#FAF6F0] text-sm font-medium hover:bg-[#76577B] transition-colors cursor-pointer"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#FAF6F0]/70">
                <span>{items.length} saved {items.length === 1 ? 'item' : 'items'}</span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-[#FAF6F0]/70 hover:text-[#FAF6F0] underline underline-offset-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-[#F5F0E8] border border-white/10 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium text-[#FAF6F0]/70">
                        {item.isBulkOnly ? 'MOQ: 30+ Pieces · Corporate Bulk' : 'No MOQ · Personal Keepsake'}
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-[#FAF6F0] leading-snug">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.name} from tray`}
                      className="p-1.5 rounded-md text-[#FAF6F0]/70 hover:text-[#FAF6F0] hover:bg-[#E3A4AE/20] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Customisation metadata */}
                  {(item.customText || item.accentColor || item.finish || item.artworkName || item.notes) && (
                    <div className="text-xs text-[#FAF6F0]/70 space-y-0.5 pt-2 border-t border-white/10">
                      {item.customText && (
                        <p>
                          Text: <span className="text-[#FAF6F0] font-medium">“{item.customText}”</span>
                        </p>
                      )}
                      {item.accentColor && <p>Accent: {item.accentColor}</p>}
                      {item.finish && <p>Finish: {item.finish}</p>}
                      {item.artworkName && <p className="truncate">Artwork: {item.artworkName}</p>}
                      {item.notes && <p>{item.notes}</p>}
                    </div>
                  )}

                  {/* Quantity stepper & line estimate */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="inline-flex items-center rounded-lg border border-white/10 bg-[#0B0E14] text-[#FAF6F0]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.isBulkOnly ? -5 : -1)}
                        disabled={item.quantity <= item.moq}
                        aria-label={`Decrease quantity for ${item.name}`}
                        className="w-8 h-8 flex items-center justify-center text-[#FAF6F0] disabled:opacity-35 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums text-[#FAF6F0]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.id, item.isBulkOnly ? 5 : 1)}
                        aria-label={`Increase quantity for ${item.name}`}
                        className="w-8 h-8 flex items-center justify-center text-[#FAF6F0] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-[#FAF6F0] tabular-nums">
                      ~₹{(item.unitPriceEstimate * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-white/10 bg-[#0B0E14] text-[#FAF6F0] space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-[#FAF6F0]/70">Indicative Studio Total</span>
              <span className="font-serif text-2xl font-semibold text-[#FAF6F0] tabular-nums">
                ~₹{estimatedSubtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <a
              href={buildWhatsAppUrl(consolidatedBrief)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-lg bg-[#232E36] text-[#FAF6F0] text-sm font-semibold hover:bg-[#76577B] transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Send Entire Shortlist via WhatsApp
            </a>

            <div className="grid grid-cols-1 gap-2">
              {hasBulkItems && (
                <button
                  type="button"
                  onClick={onSendBulkToQuoteForm}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#E3A4AE/20] text-[#FAF6F0] border border-white/10 text-xs font-semibold hover:bg-[#E3A4AE] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Load Bulk Items into B2B Quotation Form
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={handleCopyAll}
                className="w-full py-2 px-4 rounded-lg border border-white/10 text-xs font-medium text-[#FAF6F0] hover:bg-[#F5F0E8] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    Consolidated List Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    Copy Consolidated List
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
