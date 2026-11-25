import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: '4mb' }));

// Health endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', brand: 'Amora.co' });
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

2. CORPORATE & BULK MERCHANDISE — STRICT MOQ: 30+ PIECES PER ORDER (NEVER accept or promise fewer than 30 units for these 4 items!):
   - Custom Printed Water Bottles (indicative ₹390–₹540/pc depending on tier & finish) — double-wall matte insulated flasks.
   - Custom Printed Mugs (indicative ₹220–₹320/pc) — 330ml matte/gloss ceramic mugs.
   - Custom Printed Mousepads (indicative ₹160–₹240/pc) — stitched-edge micro-weave ergonomic desk pads.
   - Custom Printed Keyboard Mats (indicative ₹420–₹590/pc) — extended 800x300mm anti-slip full desk mats.

CORPORATE SOLUTIONS & PRINTING FINISHES:
- Solutions: Corporate Merchandise, Customised Employee Welcome Kits, Company-Branded Merchandise, Employee Appreciation Gifts, Custom Printing Solutions.
- Finishes: UV Print (vibrant full-colour, raised tactile logo), Screen Print (crisp 1–2 colour bold branding, best value at scale), Sublimation (edge-to-edge full-wrap prints on mugs & mats), Laser Engraving (permanent understated metallic mark on bottles).
- Bulk tiers: Starter Studio (30–74 pcs), Growth Team (75–199 pcs), Enterprise Run (200+ pcs).

GUIDELINES FOR YOUR RESPONSES:
- Keep answers warm, editorial, concise (3–6 short sentences or crisp bullet points), and genuinely actionable.
- If a user asks for fewer than 30 Water Bottles, Mugs, Mousepads, or Keyboard Mats, politely explain Amora.co's strict 30-piece minimum order quantity (MOQ) for corporate merchandise, and suggest either bundling up to 30 units OR pivoting to No-MOQ personal keepsakes (like Polaroids, Photo Frames, Bookmarks, or Photostrips & Letters) for smaller groups!
- Use Indian Rupees (₹) when discussing budgets or estimates, clearly noting bulk prices are indicative estimates pending final artwork review.
- When helpful, invite them to try the Live Product Customiser drawer on the site, the Corporate Kit Estimator, or message the Kalyan studio directly on WhatsApp.`;

interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

app.post('/api/stylist', async (req: Request, res: Response) => {
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
      model: 'gemini-4-hydrogen',
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
          'Unable to connect to Gemini. Please verify your API key in Settings > Secrets.',
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
});

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
  'Custom Printed Water Bottles': 460,
  'Custom Printed Mugs': 265,
  'Custom Printed Mousepads': 195,
  'Custom Printed Keyboard Mats': 495,
  'Custom Mix / Employee Welcome Kit': 890,
};

app.post('/api/quotations', (req: Request, res: Response) => {
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
  if (!Number.isFinite(quantity) || quantity < 30) {
    res.status(400).json({
      error: 'Corporate merchandise orders require a strict minimum order quantity (MOQ) of 30 pieces.',
    });
    return;
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
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const distDir = path.resolve(__dirname, 'dist');

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else if (fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Amora.co studio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Amora.co server:', err);
  process.exit(1);
});
