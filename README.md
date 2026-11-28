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

## Studio Admin

Open `/admin` to sign in and manage the existing product catalogue. Products are seeded from `content/products.json` on first use in a browser; catalog edits and uploaded images are then stored in that browser's IndexedDB. Admin sessions use `sessionStorage` and end when the browser tab session ends. The catalog service in `src/services/productCatalog.ts` is the integration boundary for replacing browser persistence with a server-backed publishing API later.

Demo sign-in:
- Email: `admin@amora.com`
- Password: `amora2026`

**Important:** this is a frontend-only admin experience, not secure authentication. Its fixed-credential verifier and route checks are part of public client-side code and can be inspected or bypassed; do not use it to protect sensitive information. A server-side authentication service is required before using this as a real security boundary.

IndexedDB is local to a browser profile and device. Publishing a product makes it visible on the storefront in that same browser only; it does not update the deployed catalog or appear automatically for other visitors. A server-side catalog and image-storage service will be needed to publish changes globally.
