# Amora.co — Thoughtfully Personalised. Beautifully Branded.

Creative gifting, personalised printing, and corporate merchandise web application for **Amora.co** (Kalyan, Thane District, Maharashtra, India).

---

## Deploying to Vercel

This repository is configured for zero-config deployment to **Vercel** with full support for both the static Vite frontend and the serverless backend (`/api/*` endpoints):

1. Go to [vercel.com](https://vercel.com) and click **"Add New..." → "Project"**.
2. Import your GitHub repository (`srakshitha0802/Amora`).
3. Vercel will automatically detect the settings:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: *(Optional, for the AI Gift Stylist concierge)*
5. Click **Deploy**.

The frontend and serverless API endpoints (`/api/health`, `/api/quotations`, `/api/stylist`) will be deployed instantly.

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run full-stack dev server
npm run dev
```

The application will start locally on `http://localhost:3000`.
