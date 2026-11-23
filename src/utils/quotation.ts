import type { QuotationTicket } from '../types';

export interface QuotationRequestInput {
  customerName: string;
  contactNumber: string;
  email: string;
  products: string[];
  quantity: number;
  finish?: string;
  requirements: string;
  deliveryLocation: string;
  artworkFileName?: string | null;
}

const BULK_UNIT_RATES: Record<string, number> = {
  'Custom Printed Water Bottles': 460,
  'Custom Printed Mugs': 265,
  'Custom Printed Mousepads': 195,
  'Custom Printed Keyboard Mats': 495,
  'Custom Mix / Employee Welcome Kit': 890,
};

/**
 * Deterministic B2B bulk quotation ticket builder (enforces strict MOQ 30+).
 * Used as a seamless client-side fallback when hosted statically on GitHub Pages.
 */
export function buildLocalQuotationTicket(
  input: QuotationRequestInput
): { ticket?: QuotationTicket; error?: string } {
  const customerName = input.customerName.trim();
  const contactNumber = input.contactNumber.trim();
  const email = input.email.trim();
  const deliveryLocation = input.deliveryLocation.trim();
  const requirements = input.requirements.trim();
  const finish = (input.finish || 'UV Print').trim();
  const products = input.products.map((p) => p.trim()).filter(Boolean);
  const quantity = Math.floor(Number(input.quantity));

  if (!customerName || !contactNumber || !email || !deliveryLocation) {
    return { error: 'Please complete all required contact and delivery fields.' };
  }
  if (products.length === 0) {
    return { error: 'Please select at least one corporate product.' };
  }
  if (!Number.isFinite(quantity) || quantity < 30) {
    return {
      error:
        'Corporate merchandise orders require a strict minimum order quantity (MOQ) of 30 pieces.',
    };
  }

  const tier =
    quantity >= 200
      ? { name: 'Enterprise Run (200+ pcs)', discount: 0.18 }
      : quantity >= 75
        ? { name: 'Growth Team (75–199 pcs)', discount: 0.1 }
        : { name: 'Starter Studio (30–74 pcs)', discount: 0 };

  const baseSum = products.reduce((sum, item) => sum + (BULK_UNIT_RATES[item] ?? 350), 0);
  const perUnitEstimate = Math.round(baseSum * (1 - tier.discount));
  const totalEstimateLow = Math.round(perUnitEstimate * quantity * 0.92);
  const totalEstimateHigh = Math.round(perUnitEstimate * quantity * 1.08);

  const now = new Date();
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `AMR-${now.getFullYear()}-${randomCode}`;

  return {
    ticket: {
      ticketId,
      createdAt: now.toISOString(),
      customerName,
      contactNumber,
      email,
      products,
      quantity,
      finish,
      requirements: requirements || 'Standard brand placement & proof review requested.',
      deliveryLocation,
      artworkFileName: input.artworkFileName ? String(input.artworkFileName) : null,
      tierName: tier.name,
      estimatedPerUnit: perUnitEstimate,
      estimatedTotalRange: {
        low: totalEstimateLow,
        high: totalEstimateHigh,
      },
    },
  };
}
