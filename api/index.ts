import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const app = express();

app.use(express.json({ limit: '4mb' }));

// Enable CORS for external access if needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

const AMORA_SYSTEM_INSTRUCTION = `You are the "Amora Gift & Merch Stylist" — the warm, tasteful creative concierge for Amora.co, a personalised gifting, creative printing, and corporate merchandise studio founded by Achintya Gurba in Kalyan, Thane District, Maharashtra, India.

Brand tagline: "Thoughtfully Personalised. Beautifully Branded."
Instagram: @amora.co._

PRODUCT CATALOG & STRICT MOQ RULES (ALWAYS ENFORCE THESE ACCURATELY):
1. PERSONAL KEEPSAKES — NO MINIMUM ORDER QUANTITY (Single / Personal Orders welcome from 1 piece!):
   - Customised Photo Frames (starting ₹449) — archival matte print in warm wood or minimalist acrylic frame.
   - Personalised Bookmarks (starting ₹149) — 350 GSM textured cotton card with satin tassel or foil touch.
   - Custom Photocards & Posters (starting ₹199) — matte/silk finish aesthetic wall posters & K-pop/memory photocard sets.
   - Personalised Polaroids (starting ₹179 for set of 10) — vintage-bordered instant-style prints with optional handwritten-style captions.
   - Custom Sticker Sheets (starting ₹159) — waterproof kiss-cut matte vinyl sheets for laptops, journals, and gifting.
   - Personalised Photostrips & Letters (starting ₹249) — classic 4-frame photo booth strips paired with textured letterpress-style keepsake envelopes.

2. CORPORATE & BULK MERCHANDISE — STRICT MOQ: 36+ PIECES PER ORDER (NEVER accept or promise fewer than 36 units for corporate merchandise!):
   - Custom Printed Mousepad (₹99 per piece) — standard low-friction desk mousepad with anti-slip rubber base.
   - Custom Printed Round Mousepad (₹99 per piece) — round 200mm circular micro-weave mousepad with stitched rim.
   - Custom Printed Keyboard / Table Mat (₹299 per piece) — extended 800x300mm anti-slip full desk mat.
   - Custom Printed Coffee Mug (₹199 per piece) — 330ml studio ceramic mug with vivid wrap imprint.
   - Custom Printed Sipper Bottle — 600 ml (₹350 per piece) — stainless steel sipper flask with leak-proof flip nozzle cap.
   - Custom Printed Sports Bottle — 750 ml (₹350 per piece) — double-wall insulated sports bottle with carabiner loop lid.

CORPORATE SOLUTIONS & PRINTING FINISHES:
- Solutions: Corporate Merchandise, Customised Employee Welcome Kits, Company-Branded Merchandise, Employee Appreciation Gifts, Custom Printing Solutions.
- Finishes: UV Print (vibrant full-colour, raised tactile logo), Screen Print (crisp 1–2 colour bold branding, best value at scale), Sublimation (edge-to-edge full-wrap prints on mugs & mats), Laser Engraving (permanent understated metallic mark on bottles).
- Bulk tiers: Starter Studio (36–74 pcs), Growth Team (75–199 pcs), Enterprise Run (200+ pcs).

GUIDELINES FOR YOUR RESPONSES:
- Keep answers warm, editorial, concise (3–6 short sentences or crisp bullet points), and genuinely actionable.
- If a user asks for fewer than 36 pieces of corporate merchandise, politely explain Amora.co's strict 36-piece minimum order quantity (MOQ) for corporate merchandise, and suggest either bundling up to 36 units OR pivoting to No-MOQ personal keepsakes (like Polaroids, Photo Frames, Bookmarks, or Photostrips & Letters) for smaller groups!
- Note that shipping charges are excluded and final quotations depend on quantity and customisation requirements.
- Use Indian Rupees (₹) when discussing budgets or estimates.
- When helpful, invite them to try the Live Product Customiser drawer on the site, the Corporate Kit Estimator, or message the Kalyan studio directly on WhatsApp.`;

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

// Health Handler
const handleHealth = (_req: Request, res: Response) => {
  res.json({ status: 'ok', brand: 'Amora.co' });
};

// Stylist AI Handler
const handleStylist = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        error:
          'The Amora Gift Stylist requires a Gemini API key in Settings > Secrets to respond.',
      });
      return;
    }

    const body = req.body as { message?: string; history?: ChatTurn[]; mode?: string };
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    if (!message || message.length > 2000) {
      res.status(400).json({ error: 'Please enter a message (under 2,000 characters).' });
      return;
    }

    const history = Array.isArray(body.history)
      ? body.history
          .filter(
            (turn): turn is ChatTurn =>
              (turn.role === 'user' || turn.role === 'model') &&
              typeof turn.text === 'string' &&
              turn.text.trim().length > 0
          )
          .slice(-10)
      : [];

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const contents = [
      ...history.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: AMORA_SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      res.status(502).json({
        error: 'The stylist returned an empty response. Please try asking again.',
      });
      return;
    }

    res.json({ reply });
  } catch (err: unknown) {
    const rawMessage = err instanceof Error ? err.message : 'Unknown upstream error';
    console.error('[Amora Stylist Error]:', rawMessage);

    if (rawMessage.includes('API_KEY_INVALID') || rawMessage.includes('PERMISSION_DENIED') || rawMessage.includes('403')) {
      res.status(403).json({
        error:
          'Unable to connect to Gemini. Please verify your API key in environment variables.',
      });
      return;
    }
    if (rawMessage.includes('RESOURCE_EXHAUSTED') || rawMessage.includes('429')) {
      res.status(429).json({
        error:
          'The stylist is momentarily busy due to API rate limits. Please try again in a few seconds.',
      });
      return;
    }

    res.status(500).json({
      error: 'Could not reach the Amora Gift & Merch Stylist right now. Please try again shortly.',
    });
  }
};

interface QuotationPayload {
  customerName: string;
  contactNumber: string;
  email: string;
  products: string[];
  quantity: number;
  finish?: string;
  requirements: string;
  deliveryLocation: string;
  artworkFileName?: string;
}

const BULK_UNIT_RATES: Record<string, number> = {
  'Custom Printed Mousepad': 99,
  'Custom Printed Round Mousepad': 99,
  'Custom Printed Keyboard / Table Mat': 299,
  'Custom Printed Coffee Mug': 199,
  'Custom Printed Sipper Bottle': 350,
  'Custom Printed Sports Bottle': 350,
  'Custom Mix / Employee Welcome Kit': 890,
};

// Quotation Handler
const handleQuotations = (req: Request, res: Response) => {
  const payload = req.body as Partial<QuotationPayload>;
  const customerName = String(payload.customerName || '').trim();
  const contactNumber = String(payload.contactNumber || '').trim();
  const email = String(payload.email || '').trim();
  const deliveryLocation = String(payload.deliveryLocation || '').trim();
  const requirements = String(payload.requirements || '').trim();
  const finish = String(payload.finish || 'UV Print').trim();
  const products = Array.isArray(payload.products)
    ? payload.products.map((p) => String(p).trim()).filter(Boolean)
    : [];
  const quantity = Number(payload.quantity);

  if (!customerName || !contactNumber || !email || !deliveryLocation) {
    res.status(400).json({ error: 'Please complete all required contact and delivery fields.' });
    return;
  }
  if (products.length === 0) {
    res.status(400).json({ error: 'Please select at least one corporate product.' });
    return;
  }
  if (!Number.isFinite(quantity) || quantity < 36) {
    res.status(400).json({
      error: 'Corporate merchandise orders require a strict minimum order quantity (MOQ) of 36 pieces.',
    });
    return;
  }

  const tier =
    quantity >= 200
      ? { name: 'Enterprise Run (200+ pcs)', discount: 0.18 }
      : quantity >= 75
        ? { name: 'Growth Team (75–199 pcs)', discount: 0.1 }
        : { name: 'Starter Studio (36–74 pcs)', discount: 0 };

  const baseSum = products.reduce((sum, item) => sum + (BULK_UNIT_RATES[item] ?? 350), 0);
  const perUnitEstimate = Math.round(baseSum * (1 - tier.discount));
  const totalEstimateLow = Math.round(perUnitEstimate * quantity * 0.92);
  const totalEstimateHigh = Math.round(perUnitEstimate * quantity * 1.08);

  const now = new Date();
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `AMR-${now.getFullYear()}-${randomCode}`;

  const ticket = {
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
    artworkFileName: payload.artworkFileName ? String(payload.artworkFileName) : null,
    tierName: tier.name,
    estimatedPerUnit: perUnitEstimate,
    estimatedTotalRange: {
      low: totalEstimateLow,
      high: totalEstimateHigh,
    },
  };

  res.status(201).json({ ticket });
};

// Route mapping
const router = express.Router();
router.get('/health', handleHealth);
router.post('/stylist', handleStylist);
router.post('/quotations', handleQuotations);

// Mount to both '/api' and '/' to ensure robustness on Vercel and local Express
app.use('/api', router);
app.use('/', router);

export { app };
export default app;
