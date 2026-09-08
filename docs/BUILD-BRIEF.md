# spatics.in final build brief — "Khadi" coming-soon page

Decisions below were confirmed with the founder (Ashwath) on 2026-09-08. Build exactly this. Where the brief is silent, follow `Proto designs/research/V3-DIRECTIONS.md` section "03 — khadi" and `Proto designs/BRIEF-v3.md`.

Paths (absolute, Git Bash form):
- Repo (target): `G:/Other computers/My Computer/Projects/Sparrotronics/Learn/Website/spatics-in`
- Prototypes: `G:/Other computers/My Computer/Projects/Sparrotronics/Learn/Website/Proto designs`
  - v1 khadi parent: `designs/08-khadi-paper.html` — source of: loom texture on the body, woven bands as section rules, bordered cards with woven top bands, coloured thread bullets with dotted rules, button woven foot, selvedge.
  - v3 khadi parent: `designs-v3/03-khadi.html` — source of: fonts and type scale (Martel 800 96px h1, Halant lede 22px, Yantramanav UI), quiet 84px nav on pressed cloth with no border, spacing rhythm, hem band above footer, footer, rise reveal motion, narrow breakpoint pattern, font preload links.
  - Logo vectors: `assets/logo.svg`, `assets/logo-mono.svg` (copy both into the repo's `assets/`).
- Current live page (copy source): the repo's `index.html` at HEAD (Tailwind coming-soon page). Read it before you overwrite it. All copy, meta tags, the form, the status pill and IST clock come from it.

## What the page is
A single-page coming-soon site for SPATICS / Sparrotronics on khadi cloth. v1 texture and ornament, v3 typography and layout discipline, the live page's words and form. Light by default with a manual dark mode.

## Page structure, top to bottom (desktop 1440)
1. **Selvedge**: fixed 30px woven strip down the full left edge (v3 `.selvedge`, warp-v + sizing + weft-v). Page content offset by 30px.
2. **Nav** (v3): pressed ground `#F2EBDC`, 84px tall, no border. Left: full-colour logo 46px linking to `#top`. Right: theme toggle button (inline SVG sun/moon, `aria-label="Switch to dark mode"`/light, `aria-pressed`), then indigo "Talk to us" button linking to `#access`. **No section links.**
3. **Status row** (from live page, restyled to khadi): inside the measure, just under the nav. Left: a pill on pressed cloth with a slub border, pulsing saffron dot, text "V1.0 INITIALIZING". Right: "BHARAT" (saffron-tinted is NOT allowed on text; use ink-soft) then "/" then live `hh:mm:ss IST` clock. Set in Yantramanav 500, 12px, letter-spacing .14em, uppercase. This is the founder's deliberate exception to the "no mono/uppercase" rule; keep it to these two elements only.
4. **Hero**: h1 Martel 800, 96px, ink, two lines with a forced break: `Bharat's Sovereign` / `UAV Ancillary Provider`. No coloured word, no underline, no eyebrow. Lede in Halant 22px ink-soft, max 34em: "Indigenous UAV avionics, carbon-composite aerostructures, and Circute.ai, conversational AI-EDA for mission-critical aerospace electronics." (replace the em dash with a comma as written). 
5. **Access form** (`id="access"`), directly under the lede, max-width 560px, a v1-style card on pressed cloth with a woven top band:
   - Segmented radio "Enterprise / Defense" | "UAV Engineer" (`name="domain"`, first checked). Style as two flat tabs on khadi with the checked one on pressed cloth and an ink border; no icons.
   - Email input (`type=email required`, placeholder "Enter work email") + submit button "Request Access" as `.btn.btn--lg` with the 8px woven foot (the one large button on the page).
   - Footnote line, 13px ink-soft: "NDA confidentiality" left, "Priority testing cohort" right. Sentence case.
   - Success state replaces the form: "Access request registered" (Martel 700 23px) and "Your request has been queued. A technical briefing will follow." Error state: inline message "Could not send. Email us instead." with a mailto fallback if `CONFIG.FALLBACK_EMAIL` is set.
   - Submission: `js/form.js` POSTs `FormData` (email, domain, source="spatics.in") to `CONFIG.FORM_ENDPOINT` from `js/config.js`; if `CONFIG.FORM_ACCESS_KEY` is non-empty append it as `access_key` (Web3Forms convention; Formspree ignores extra fields). If `FORM_ENDPOINT` is empty, log a console warning and show the success state anyway so the page never looks broken before the endpoint is configured. Disable the button and show "Sending…" while in flight.
6. **Woven band** 20px (v1 `.band--wide`) separating hero from the cards section.
7. **What we build** section: h2 Martel 700 30px with the v1 woven rule trailing it (`h2::after`). No subtitle. Three equal cards (v1 `.card` exactly: pressed ground, 1px ink-alpha border, woven top band, Martel 700 23px indigo title with a two-line well, description, three capability lines with saffron / slub / green thread dashes and dotted rules between, khadi swatch plate at the bottom with a 13px sentence-case caption below the plate rather than a label inside it). Hover: border tint + 3px lift inside `prefers-reduced-motion: no-preference` (v1 kept it; founder chose v1 cards).
   - **UAV Avionics** — "STM32H7 flight computers, GaN ESCs, encrypted micro-telemetry." Lines: "STM32H7 flight computers" / "GaN ESCs" / "Encrypted micro-telemetry". Caption: "Flight computer, board detail".
   - **CAD & Structures** — "Topology-optimized carbon-composite modular airframes." Lines: "Topology-optimised airframes" / "Carbon-composite structures" / "Modular assemblies". Caption: "Airframe CAD, fuselage section".
   - **Circute.ai** — "Natural language to schematics, auto-routing & Gerber exports." Lines: "Natural language to schematic" / "Auto-routing" / "Gerber export". Caption: "Circute.ai, board layout in review".
   Card `id`s: `avionics`, `structures`, `circute`.
8. **Hem**: 20px woven band (v3 `.hem`) then **footer** on pressed cloth: logo 42px; "Sparrotronics Private Limited, Bengaluru, India."; "Make in India · 100% Sovereign IP · Bharat" (15px); "SPATICS is a registered trademark of Sparrotronics Pvt Ltd" and "© {year} All rights reserved." (13px, year from JS). Right column links: "What we build" → `#build`, "Request access" → `#access`. Page ends on the footer, no tail.

Nothing else: no full-bleed hero panel, no credentials strip, no leadership names, no Lucide icons, no sovereign badge pill, no Tailwind, no CDN scripts.

## Tokens (light)
Khadi `#E7DFCE` ground with v1's loom texture (the four repeating-linear-gradients from v1 `body`); Pressed `#F2EBDC`; Swatch `#CDC3AE`; Slub `#B8A98C`; Ink `#16143C`; Ink-soft `#3B3757`; Indigo `#1800C0` (CTA fill, links, card titles); Saffron `#F89830` and Green `#008000` thread only, never text. Weave gradients: v1 `--weave`/`--weft`/`--weft-soft` plus v3 `--warp-foot` and `--sizing`. Measure 1180px, 48px side padding.

## Dark mode ("indigo-black cloth")
`html[data-theme="dark"]` overrides the same custom properties; no other selectors change. Suggested values, tune for contrast (all body text ≥ 4.5:1, large text ≥ 3:1):
- ground `#16143C`, pressed `#1D1A4C`, swatch `#2B2760`, slub `#6B648E`, ink `#EDE6D6`, ink-soft `#C8C0AC`, CTA fill `#5B4BFF` with `#F2EBDC` text (hover `#6E60FF`), links `#A9A0FF`.
- Loom texture gradients switch to light rgba (e.g. `rgba(255,250,235,.045)`), same pitches. Weft tick stays light. Threads unchanged.
- Logo: keep the full-colour `logo.svg`, but in dark it sits on a small pressed-khadi plate (`#F2EBDC`, 6px 10px padding, 2px radius) in nav and footer so the indigo wordmark reads. Light mode has no plate.
- `meta[name=theme-color]` is updated by `theme.js` to match.
- Toggle: light is the default; no `prefers-color-scheme` logic. Persist in `localStorage["spatics-theme"]`. An inline `<script>` in `<head>` applies the stored theme before first paint. `theme.js` also honours `?theme=dark` in the URL (used for screenshots).

## Typography
Martel 800 (h1) / 700 (h2, h3, success heading); Halant 400 (lede, card descriptions); Yantramanav 400/500 (everything else). Google Fonts `<link>` plus the woff2 `<link rel=preload>` lines copied from the v3 file. Scale @1440: 96 / 30 / 23 / 22 / 17 / 15 / 13 / 12.

## Motion
Only inside `@media (prefers-reduced-motion: no-preference)`: v3 rise reveal on hero children (staggered), v1 shuttle pass on `.band` at load, button foot nudge on hover, card hover lift, colour transitions. Status dot pulse also inside that media query.

## Responsive
Desktop-first at 1440. One breakpoint at `max-width: 900px` following v3: selvedge 14px, nav stacks, h1 `min(44px, 9.5vw)` (do not drop below 40px on a 390 screen), form stacks, cards one column, footer stacks. Verify body scrollWidth = 390 at a 390px document width.

## Accessibility
Visible focus (`outline: 3px solid var(--indigo); outline-offset: 3px`) on every interactive element including radios' labels (`:focus-within`). Toggle and form controls have labels. Skip link not required. Live clock region `aria-live="off"`.

## File layout (edit-friendly; no build step)
```
index.html            markup only, comments marking each section
css/tokens.css        :root light tokens, dark overrides, weave gradients
css/base.css          reset, body texture, type, links, focus, motion media query
css/components.css    selvedge, band, btn, card, ph/caption, pill, form, toggle
css/sections.css      nav, status row, hero, build section, footer, responsive
js/config.js          FORM_ENDPOINT, FORM_ACCESS_KEY, FALLBACK_EMAIL (all strings, empty by default)
js/theme.js           toggle + persistence + theme-color
js/clock.js           IST clock + footer year
js/form.js            submit handling
assets/logo.svg, assets/logo-mono.svg, assets/favicon.svg, assets/images/ (keep existing PNGs)
docs/DESIGN.md        tokens, file map, how to change copy/colours/form endpoint, screenshot commands
docs/BUILD-BRIEF.md   this file
```
Favicon: rebuild `assets/favicon.svg` from the logo's saffron and green swooshes (extract the two swoosh paths from `assets/logo.svg`, drop the wordmark) on a transparent ground, 64×64 viewBox. Do not redraw the shapes.

## Infra
- `Dockerfile`: also `COPY css/ … /css/` and `COPY js/ … /js/`; keep port 3000 and the healthcheck.
- `nginx.conf`: add `/css/` and `/js/` to the 30-day cache rule alongside `/assets/`. Keep everything else.
- `Caddyfile` needs no change.
- `README.md`: replace the tech-stack section (no Tailwind, no Lucide), document the file layout, dark mode, and how to set the form endpoint in `js/config.js` (Web3Forms or Formspree).
- Remove nothing else from the repo.

## Head / SEO
Keep the live page's `<title>`, description, keywords, og:* tags. og:image stays `assets/images/spatics-logo-tricolor.png`. `theme-color` light `#E7DFCE`.

## Screenshots (self-check, mandatory)
Save under `G:/Other computers/My Computer/Projects/Sparrotronics/Learn/Website/Proto designs/shots-final/` (outside the repo):
```
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless --disable-gpu --hide-scrollbars --window-size=1440,900 --virtual-time-budget=5000 --screenshot="<abs>/shots-final/light-hero.png" "file:///<abs repo>/index.html"
```
Also `light-full.png` at 1440x2400, `dark-hero.png` and `dark-full.png` with `?theme=dark`, and a narrow shot at `--window-size=481,1800` (Edge floors width at ~481px; additionally verify the 390px case by measuring scrollWidth with `--dump-dom` or a forced-width copy). Look at every shot and fix what is wrong before finishing.

## Do-not list
No Tailwind, no icon CDN, no external JS. No mono uppercase beyond the status row. No saffron or green on text. No index numbers ("01 // AVIONICS"). No glow, glass, blur, spotlight, gradient text. No section links in the nav. Copy under 300 words. Only facts already on the live page or in the briefs.
