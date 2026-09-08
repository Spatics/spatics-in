# spatics.in — design notes

A single-page coming-soon site on khadi cloth. No build step, no framework, no CDN
scripts: four stylesheets and four small scripts, all hand-editable.

The full specification this was built to is `docs/BUILD-BRIEF.md`. This file is the
working map: where things live and how to change them.

---

## File map

```
index.html            markup only; a comment marks each section
css/tokens.css        every colour, weave gradient and measure (light + dark)
css/base.css          reset, body texture, type scale, links, focus, motion
css/components.css    selvedge, band/hem, buttons, cards, plates, pill, form, toggle
css/sections.css      nav, status row, hero, "what we build", footer, responsive
js/config.js          form endpoint and keys — the only file you edit to go live
js/theme.js           light/dark toggle, persistence, meta[theme-color]
js/clock.js           IST clock in the status row + the footer year
js/form.js            access-request submission
assets/logo.svg       full-colour SPATICS mark (used in nav and footer)
assets/logo-mono.svg  single-colour mark (currentColor), kept for future use
assets/favicon.svg    the mark's two swooshes, wordmark dropped, 64x64
assets/images/        the original PNG logos; og:image points at the tricolour one
Dockerfile,
nginx.conf, Caddyfile deployment; nginx caches /assets/, /css/ and /js/ for 30 days
health, healthz       static fallbacks behind nginx's /health and /healthz
```

Load order matters: `tokens.css` first (everything else reads its custom
properties), then `base`, `components`, `sections`.

---

## Tokens

All in `css/tokens.css`. Dark mode re-declares **the same properties** on
`html[data-theme="dark"]` and touches no other selector — so a colour change is a
one-line edit in two places, and no component ever needs a dark variant. The two
theme differences that are not colours go through tokens as well: the logo's
pressed-khadi chip (`--plate-bg` / `--plate-pad`) and the toggle's sun/moon swap
(`--sun-display` / `--moon-display`).

| Token | Light | Dark | Used for |
|---|---|---|---|
| `--khadi` | `#E7DFCE` | `#16143C` | page ground |
| `--pressed` | `#F2EBDC` | `#1D1A4C` | nav, cards, selvedge, footer |
| `--swatch` | `#CDC3AE` | `#2B2760` | image plates |
| `--slub` | `#B8A98C` | `#6B648E` | undyed thread in the weave and button foot |
| `--line` | `#8A7B5C` | `#7A72A0` | input, tab, toggle, pill and footer-link borders |
| `--ink` | `#16143C` | `#EDE6D6` | headings, strong text |
| `--ink-soft` | `#3B3757` | `#C8C0AC` | lede, descriptions, captions |
| `--indigo` | `#1800C0` | `#A9A0FF` | links, card titles, focus ring |
| `--cta` / `--cta-hover` / `--cta-text` | `#1800C0` / `#2A19D4` / `#F2EBDC` | `#5B4BFF` / `#4C3AF0` / `#F2EBDC` | the buttons |
| `--saffron`, `--green` | `#F89830`, `#008000` | unchanged | **thread only, never text** |

Geometry: `--measure: 1180px`, `--gutter: 48px`, `--selvedge: 30px` (14px / 20px
below the 900px breakpoint).

The weave gradients — `--warp-h`, `--warp-v`, `--warp-foot`, `--weft`,
`--weft-soft`, `--weft-v`, `--sizing` — build every tricolour band from a 10px
warp unit (3px saffron, 3px green, 1px slub). `--loom` is the four-gradient
handloom texture on the body. Change a pitch here and every band follows.

`--sizing` is the pressed-cloth wash that the selvedge and the hem lay over their
threads; the bare `.band`, the `h2::after` rule and the button foot do not use it.
v3's .50 wash left those two surfaces reading as a different cloth from the bands
(pastel in light, brown in dark), so it is dialled back to .28 light / .22 dark:
still softer than a bare band, still recognisably saffron and green.

Contrast: all body text clears 4.5:1 in both themes; the lowest pair is the button
label on `--cta` in dark at 4.5:1. Control *boundaries* are a separate token:
`--slub` is a thread tone and only manages 1.74:1 on khadi, so anything whose
outline is its only affordance (email field, segmented tabs, toggle, status pill,
footer links) is drawn in `--line`, which clears the 3:1 of WCAG 1.4.11.

### Type

Martel 800 (h1) / 700 (h2, h3, success heading) · Halant 400 (lede, card
descriptions) · Yantramanav 400/500 (everything else). Scale at 1440:
96 / 30 / 23 / 22 / 17 / 15 / 13 / 12.

The h1 is `clamp(48px, 6.9vw, 96px)` with `letter-spacing:-.022em`. The briefed
96px is kept, but it is paid for in tracking: at the inherited -.015em, Martel 800
sets "UAV Ancillary Provider" in 1095px and the 1180 measure only offers 1084, so
the headline broke onto a third line. -.022em brings it to ~1080px. The `6.9vw`
term reaches the 96px cap at about 1392px and tracks the measure below that, so
narrower desktops never overflow.

The woff2 files are `<link rel=preload>`ed in the head. Remove those lines and a
cold load — including any headless screenshot — falls back to Georgia.

---

## How to change things

**Copy.** All of it is in `index.html`; there is no templating. Keep the page under
300 words and stick to facts already published.

**Focus.** One ring, `outline:3px solid var(--indigo)`, in `css/base.css`. The
segmented tabs use `label:has(:focus-visible)` rather than the brief's
`:focus-within`, so a mouse click on a tab does not leave the ring stuck on.

**Colours.** `css/tokens.css` only. Never put saffron or green on text — they are
thread colours and appear only in the selvedge, bands, hem, button foot and the
capability dashes.

**The form endpoint.** Edit `js/config.js`:

```js
window.CONFIG = {
  FORM_ENDPOINT: "https://api.web3forms.com/submit",  // or https://formspree.io/f/xxxxxxx
  FORM_ACCESS_KEY: "your-web3forms-access-key",       // leave "" for Formspree
  FALLBACK_EMAIL: "hello@spatics.in"                  // shown as a mailto if the POST fails
};
```

`js/form.js` POSTs `FormData` with `email`, `domain` and `source="spatics.in"`, and
appends `access_key` only when it is non-empty (Web3Forms needs it; Formspree
ignores unknown fields). With `FORM_ENDPOINT` empty the page logs a console warning
and shows the success state anyway, so it never looks broken before launch.

**Dark mode.** Light is the default and `prefers-color-scheme` is deliberately
ignored. The choice persists in `localStorage["spatics-theme"]`, and an inline
script in `<head>` applies it before first paint so a stored dark choice never
flashes light. `?theme=dark` in the URL forces a theme without persisting it —
that is how the screenshots below are taken.

**Adding a card.** Copy an `<article class="card">` block; the woven top band, the
two-line title well, the thread dashes and the plate are all in the markup. Three
across is the grid; a fourth wraps.

---

## Where the build departs from the brief

Deliberate deviations, recorded here rather than in the code:

- **`--line`.** The brief lists `--slub` as the input-border colour. It fails WCAG
  1.4.11 at that job in light mode, so the UI boundary is a separate token.
- **`Enterprise / Defence`.** The brief and the old live page spell it "Defense".
  On a page built on Bharat sovereignty the Indian Ministry of Defence spelling is
  the right one, so both the visible label and the posted `domain` value changed —
  safe to do while `FORM_ENDPOINT` is still empty. Founder to confirm.
- **`Topology-optimised`, `Natural language to schematic`, and the lede's "our".**
  The brief's strings mixed US and Indian spellings inside one card and plural
  against singular inside another; the page is now consistently Indian English,
  and one word ("our") separates the lede's list from its appositive.
- **`SPATICS™ is a trademark of…`.** The footer previously asserted a *registered*
  mark while the title used ™. The weaker of the two claims is the safe one until
  the founder confirms registration has been granted; if it has, switch the title
  and og:title to SPATICS® and put "registered" back.
- **Focus on the segmented tabs** uses `:has(:focus-visible)`, not `:focus-within`.

Two review findings were deliberately **not** actioned, because the brief mandates
the thing being complained about:

- The card title well (`.card h3{min-height:2.5em}`) is empty at every width, since
  no card title wraps — but brief item 7 asks for a two-line well.
- `.band--wide` and the `h2::after` flourish sit ~100px apart and read as one
  ornament printed twice — but brief items 6 and 7 mandate both at full width.

Both are founder calls; the one-line fixes are `min-height:1.6em` and
`.build h2::after{flex:0 0 220px}`.

- **Placeholder plates.** The three `.ph--card` swatches are captioned as
  photographs that do not exist yet. That is the brief's intent, but it is a launch
  blocker: before going live, swap each `.ph` for an `<img>` carrying the caption
  text as `alt`, or delete the `.plate` block so the cards end on the capability
  lines.

---

## Screenshots (self-check)

`Proto designs/shots-final/shoot.sh` runs the whole set. Individually:

```sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
OUT=".../Proto designs/shots-final"
URL="file:///G:/.../spatics-in/index.html"

"$EDGE" --headless --disable-gpu --hide-scrollbars --window-size=1440,900 \
  --virtual-time-budget=20000 --screenshot="$OUT/light-hero.png" "$URL"
```

Then `light-full.png` at `1440,2400`; `dark-hero.png` / `dark-full.png` with
`"$URL?theme=dark"`; and `narrow.png` at `481,1800`.

Two gotchas:

- **Budget 20s, not 5s.** The fonts come from Google Fonts and a short budget
  screenshots the Georgia fallback. If the h1 looks high-contrast and thin instead
  of heavy and slabbed, Martel did not arrive.
- **Edge floors the window at ~481px**, so a true 390px layout cannot be shot
  directly. Measure it instead: load the page in a 390px-wide iframe with
  `--allow-file-access-from-files` and read `body.scrollWidth` (it must be 390).
