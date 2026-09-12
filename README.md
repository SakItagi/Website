# PrintX Website

Marketing website for **PrintX** — premium signage, branding and visual communication solutions.

Plain HTML/CSS/JS, no build step required.

## Structure

```
index.html                   Homepage
privacy-policy.html          Privacy Policy
terms-and-conditions.html    Terms & Conditions
assets/css/style.css         All styles
assets/js/main.js            Header scroll state, mobile menu, scroll reveals,
                              animated stat counters, quote form handling
assets/img/favicon.svg       Site favicon
.github/workflows/deploy.yml GitHub Pages deployment workflow
```

## Local preview

No build tools needed — any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

or simply open `index.html` directly in a browser.

## Hosting

### Option A — GitHub Pages (workflow included)

This repo already includes `.github/workflows/deploy.yml`, which deploys the
site to GitHub Pages on every push to `main`.

One-time setup (repo admin, in the GitHub UI):

1. Merge this branch into `main` (or point Pages at this branch instead — see step 2).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or re-run the workflow) — the site will publish at
   `https://<owner>.github.io/<repo>/`.

If you'd rather deploy straight from this feature branch without merging,
change `branches: [main]` in `.github/workflows/deploy.yml` to this branch's
name and push.

### Option B — Netlify / Vercel (drag-and-drop or Git import)

Both support static sites with zero configuration:

- **Netlify**: drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo with build command left empty and publish directory set to `/`.
- **Vercel**: import the GitHub repo, framework preset "Other", no build command, output directory `/`.

### Option C — Any static host

Since this is plain HTML/CSS/JS, it can be uploaded as-is to any static
hosting provider (S3 + CloudFront, Cloudflare Pages, a shared hosting `public_html` folder, etc.) — just copy the whole folder.

## Notes / follow-ups

- Contact details, phone numbers, services and case studies are sourced from
  the PrintX company profile. Confirm business hours before going live —
  they're currently a placeholder.
- The quote form on the Contact section submits client-side only (no backend
  wired up yet). Connect it to an email service, form backend (e.g. Formspree,
  Netlify Forms) or your own API before relying on it to collect real leads.
- Individual **Project Detail pages** (per-project photo galleries, materials,
  before/after) and a full **Projects** listing page are not built yet — the
  homepage currently links "View All Projects" back to the Contact section as
  a placeholder.
- Photography throughout is illustrative (SVG/CSS), standing in for real
  project photography — swap in actual signage photos when available.
