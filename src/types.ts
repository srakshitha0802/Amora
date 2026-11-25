export type ProductCategory =
  | 'All'
  | 'Prints & Keepsakes'
  | 'Stickers & Photocards'
  | 'Corporate Merchandise (MOQ 30+)'
  | 'Customised Products';

export type OrderMode = 'all' | 'personal' | 'bulk';

export type ProductVisualType =
  | 'photo-frame'
  | 'bookmark'
  | 'photocards-posters'
  | 'polaroids'
  | 'sticker-sheet'
  | 'photostrips-letters'
  | 'water-bottle'
  | 'mug'
  | 'mousepad'
  | 'keyboard-mat';

export interface Product {
  id: string;
  name: string;
  shortName: string;
  categories: Exclude<ProductCategory, 'All'>[];
  primaryCategory: Exclude<ProductCategory, 'All'>;
  isBulkOnly: boolean;
  moq: number;
  priceLabel: string;
  unitPriceEstimate: number;
  unitLabel: string;
  description: string;
  specs: string[];
  visualType: ProductVisualType;
  defaultAccent: string;
  defaultSampleText: string;
  imageUrl?: string;
}

export type PrintingFinishId = 'uv' | 'screen' | 'sublimation' | 'laser';

export interface PrintingFinish {
  id: PrintingFinishId;
  name: string;
  bestFor: string;
  note: string;
  perUnitAdder: number;
}

export interface ShortlistItem {
  id: string;
  productId: string;
  name: string;
  isBulkOnly: boolean;
  moq: number;
  quantity: number;
  unitPriceEstimate: number;
  customText?: string;
  accentColor?: string;
  finish?: string;
  artworkName?: string;
  notes?: string;
}

export interface QuotationTicket {
  ticketId: string;
  createdAt: string;
  customerName: string;
  contactNumber: string;
  email: string;
  products: string[];
  quantity: number;
  finish: string;
  requirements: string;
  deliveryLocation: string;
  artworkFileName: string | null;
  tierName: string;
  estimatedPerUnit: number;
  estimatedTotalRange: {
    low: number;
    high: number;
  };
}

export interface CorporatePrefill {
  products: string[];
  quantity: number;
  finish: string;
  requirements?: string;
}
