# SPATICS™ — Bharat’s Sovereign UAV Ancillary Provider

Official coming-soon landing page for **Sparrotronics Private Limited** ([spatics.in](https://spatics.in)).

Bharat’s Sovereign UAV Ancillary Provider: indigenous UAV avionics, carbon-composite
aerostructures, and Circute.ai, our conversational AI-EDA for mission-critical
aerospace electronics.

---

## Tech Stack
- **Structure**: hand-written HTML5 (`index.html`), no build step, no framework
- **Styling**: four plain stylesheets in `css/` — no Tailwind, no CDN
- **Scripts**: four small vanilla files in `js/` — no libraries, no icon CDN
- **Fonts**: Martel, Halant and Yantramanav (Google Fonts, woff2 preloaded)
- **Container Server**: Nginx Alpine (`Dockerfile` + `nginx.conf`)

---

## File layout

```
index.html            markup only; a comment marks each section
css/tokens.css        every colour, weave gradient and measure (light + dark)
css/base.css          reset, body texture, type scale, links, focus, motion
css/components.css    selvedge, band/hem, buttons, cards, plates, pill, form, toggle
css/sections.css      nav, status row, hero, "what we build", footer, responsive
js/config.js          form endpoint and keys — the one file you edit to go live
js/theme.js           light/dark toggle, persistence, meta[theme-color]
js/clock.js           IST clock + footer year
js/form.js            access-request submission
assets/               logo.svg, logo-mono.svg, favicon.svg, images/
docs/DESIGN.md        tokens, how to change copy/colours/endpoint, screenshot recipe
docs/BUILD-BRIEF.md   the specification this was built to
Dockerfile            nginx:alpine image, port 3000, container healthcheck
nginx.conf            gzip, security headers, cache rules, /health + /healthz
Caddyfile             alternative single-binary server, unchanged
health, healthz       static fallbacks for the health endpoints
.dockerignore         what stays out of the build context
```

Stylesheets load in that order; `tokens.css` must come first.

---

## Dark mode

Light is the default. The header carries a sun/moon toggle; the choice persists in
`localStorage["spatics-theme"]` and an inline script in `<head>` applies it before
first paint. `prefers-color-scheme` is deliberately not consulted. Append
`?theme=dark` to the URL to force a theme (used for screenshots).

Dark mode re-declares the same custom properties on `html[data-theme="dark"]` in
`css/tokens.css` and changes no other selector — including the toggle's own
sun/moon swap, which is driven by `--sun-display` / `--moon-display`.

---

## Wiring up the access form

The form is inert until you give it an endpoint. Edit `js/config.js`:

```js
window.CONFIG = {
  FORM_ENDPOINT: "https://api.web3forms.com/submit",  // or https://formspree.io/f/xxxxxxx
  FORM_ACCESS_KEY: "your-web3forms-access-key",       // leave "" for Formspree
  FALLBACK_EMAIL: "hello@spatics.in"                  // mailto shown if the POST fails
};
```

It POSTs `FormData` with `email`, `domain` and `source="spatics.in"`, adding
`access_key` only when it is non-empty — Web3Forms requires it, Formspree ignores
unknown fields, so one code path serves both. With `FORM_ENDPOINT` empty the page
warns in the console and still shows the success state, so it never looks broken.

---

## Deploying on Coolify

This repository is pre-configured for zero-config deployment on **[Coolify](https://coolify.io)**:

1. **New Application in Coolify**:
   - Go to your Coolify dashboard.
   - Click **+ Create New Resource** -> **Application**.
   - Select **Public Repository** (or **GitHub App / Private Repository** if private).
   - Enter your repository URL: `https://github.com/Spatics/spatics-in`
   - Branch: `main`

2. **Build Pack**:
   - Coolify will automatically detect the **`Dockerfile`**.
   - If prompted for Build Pack, select **Dockerfile**.
   - Port: `3000` (pre-configured).

3. **Health Check**:
   - Docker Container Healthcheck is pre-configured in the Dockerfile using port 3000 (`http://127.0.0.1:3000/healthz`).
   - In Coolify Application Settings -> **Health Check**:
     - **Health Check Path**: `/healthz` (returns `200 OK`) or `/health` (returns JSON status).
     - **Port**: `3000`

4. **Domain & SSL**:
   - Set your domain in Coolify (e.g. `https://spatics.in` or `https://www.spatics.in`).
   - Coolify will automatically provision free Let's Encrypt SSL certificates and forward traffic to internal port `3000`.

5. **Deploy**:
   - Click **Deploy**.
   - The Nginx Alpine container will build and serve on port `3000` instantly with automatic caching and gzip compression.

---

## Local Development

You can serve this page locally with any static web server:

```bash
# Python 3
python3 -m http.server 3000

# or Docker
docker build -t spatics-in .
docker run -p 3000:3000 spatics-in
```

Visit `http://localhost:3000/`.
