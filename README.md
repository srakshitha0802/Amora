# Amora.co — Thoughtfully Personalised. Beautifully Branded.

Creative gifting, personalised printing, and corporate merchandise web application for **Amora.co** (Kalyan, Thane District, Maharashtra, India).

## Deploying to GitHub Pages (`github.io`)

This repository is pre-configured for zero-config static deployment to **GitHub Pages** (`https://<username>.github.io/<repo>/` or `https://<username>.github.io/`):

- Relative asset paths (`base: './'`) in `vite.config.ts` so all JS, CSS, and studio logo assets resolve cleanly on both root domains and project subpaths.
- Automatic `dist/.nojekyll` and `dist/404.html` generation during `npm run build`.
- Included GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.
- Full client-side support for the Shop Catalogue, Live Product Customiser (`FileReader`), Corporate Kit Estimator, Saved Shortlist / Quote Tray, and Smart B2B Bulk Quotation Form (with downloadable `.txt` Quotation Ticket and 1-click WhatsApp handoff).

### Quick Deploy Steps

1. Push this repository to GitHub (default branch `main`).
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or trigger **Actions → Deploy Amora.co to GitHub Pages → Run workflow**). Your site will publish automatically to `https://<username>.github.io/<repo-name>/`.

### Optional: Connecting the Live Gemini AI Gift & Merch Stylist on `github.io`

Because GitHub Pages serves static files only (and API keys must stay server-side), the Gemini-powered **Amora Gift & Merch Stylist** connects to `server.ts`:

1. Deploy `server.ts` to any Node host (Cloud Run, Render, Railway, etc.) with `GEMINI_API_KEY` set in its server environment (and optionally `ALLOWED_ORIGIN=https://<username>.github.io`).
2. In your GitHub repository, open **Settings → Secrets and variables → Actions → Variables** and add:
   - `VITE_API_BASE_URL` = `https://your-deployed-backend-url`
3. Re-run the GitHub Pages workflow.

Without `VITE_API_BASE_URL`, every storefront, customiser, estimator, quotation ticket, and WhatsApp Concierge workflow still works out of the box on `github.io`.

## Local Development

```bash
npm install
npm run dev
```

Runs the full-stack Express + Vite server on `http://localhost:3000`.
