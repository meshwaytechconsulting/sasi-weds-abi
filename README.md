# Sasidharan & Abinaya — Engagement Invitation

*Nitchayathartham · நிச்சயதார்த்தம் — an engagement, not a wedding. The
wording says so throughout: "&", never "weds".*

Five pages in daylight, each a whole screen, snapping one at a time. Static
site. No build step, no framework, no CDN beyond Google Fonts.

**Live:** GitHub Pages on `main` / root. `index.html` is the entry point.

---

## What this is, and what it deliberately is not

The match was made between two families. The invitation says so by showing the
**room** rather than the couple: there is no courtship narrative and there are
no portraits anywhere in the page. An earlier build had both — a twelve-beat
film of how they met, over their own photographs — and both were cut at the
client's request.

What replaced them is the mandapam itself, photographed in daylight, and a
page of warm paper underneath it.

> **Still in the repository.** The old story photographs, the couple's
> portraits among them, remain under `assets/story/` and
> `assets/story/_original/`. Nothing in `index.html` references them any more
> — but GitHub Pages serves every file in the repository, so they are still
> reachable by URL until they are deleted. Removing the files stops them being
> served; it does not remove them from git history, which needs a history
> rewrite.

## Structure

| # | Page | Carries |
|---|------|---------|
| 1 | The mandapam | the photograph, the two names, the date |
| 2 | The families | both sets of parents |
| 3 | The ceremony | venue, date, time, address, countdown, map |
| 4 | The blessing | the rings, then the words |
| 5 | The close | their short names, a smaller pair of rings, the hashtag, the date |

The scroller is a box of its own (`.deck`) rather than the window, so a snap
point is always one whole screen and the drifting layer above it stays put
while the pages move underneath.

## The opening

The order is the one the client asked for, and each step waits for the one
before it rather than all starting together:

1. **The photograph settles** — a 3.8s fade up out of a 1.11x scale, slow
   enough to watch, then a 38s drift that never stops. A single slow pass of
   sunlight crosses the aisle on an 11s cycle, angled to match the rays
   already in the frame.
2. **The air comes alive** — banana leaves turning end over end, jasmine and
   blossom petals fluttering, pollen drifting upward into the light. Three
   shapes at three speeds, because one repeated sprite reads as a screensaver.
   The leaf's turn is faked by squashing it across its stem, so it reads as a
   thin sheet rather than a rotating blob.
3. **The names arrive** — word by word, each rising out of its own small blur,
   in the lit window the arch frames between the garlands and the lamps. It is
   the one part of the picture carrying nothing, so it is where they go.

### Why the foliage in the photograph does not move

It did, briefly, and it was wrong. The only way to move leaves inside a flat
photograph is to lay a second copy of the plate over the first, mask it to the
foliage and rotate it. But wherever that mask fades, two slightly offset copies
of the same picture blend together — and a double image reads as **blur**. The
plate is single and sharp again; the life comes from the leaves and petals
drifting in *front* of it, which cost the picture nothing.

The entry scale was cut from 1.11 to 1.035 and the drift from 1.05 to 1.03 for
the same reason: the source is 941px wide and a phone at DPR 3 is already
enlarging it, so every extra percent of scale is pure softness.

Doing this properly needs the foliage separated onto its own layer, with the
background inpainted underneath it — not a duplicate of the whole frame. That
is a source-asset job, not a CSS one.

### Two things that must not be undone

**Every delayed animation carries `backwards`.** A delayed animation with no
fill contributes nothing while it waits, so anything on a delay sits at its
resting value and then jumps straight to its first keyframe — which on a phone
reads as a lurch a few seconds in. `backwards` holds the first frame from load,
so there is nothing left to jump to.

**The names wait on `document.fonts.ready`** as well as on their cue, capped at
2.2s. Cormorant at display size has very different metrics from the Georgia
standing in for it, and a swap landing mid-animation reads as the whole line
jumping.

Dark type on a bright photograph needs **light** behind it, not shade. The
names sit on a radial veil of the paper's own colour and carry a paper-coloured
halo, so nothing resembling a dark scrim is ever laid over the picture.

Type laid on the photograph has its own two tokens, `--on-art` `#46401A` and
`--on-art-soft` `#5A4A18`. Olive-bronze is what "matching the background" has to
mean when the background is gold **and** leaf at once. Measured against the
darkest 5% of the band it covers, behind the veil, `--on-art` reads at 7.0:1.

Every page after the first keeps the same photograph behind it, washed out
almost to paper — enough to warm the page, never enough to compete with the
words.

## The rings

The engagement itself, drawn rather than photographed, because there are no
photographs of the couple in this page. Two bands draw themselves on, a stone
lifts into place above them, and four sparks come and go on their own clocks so
the set never pulses in time with itself. Full size they lead the blessing page;
a smaller pair signs off the close.

## Colour — measured off the mandapam

Read out of the opening photograph rather than chosen. A third of that frame is
a single mid gold; what keeps the set from going flat is the banana leaf at 13%
and the blossom at under 3%. Those two are the colours to spend carefully.

| Token | Hex | Where it came from |
|---|---|---|
| `--paper` | `#FDF8EC` | the page itself, lifted a shade above the image's own lightest tone |
| `--paper-warm` | `#F7EEDC` | a second ground, for cards and bands |
| `--cream` | `#FEF5D0` | the image's highlight, 6% of the frame |
| `--sand` | `#F9D597` | its light wash, 15% |
| `--gold` | `#D1A45C` | the dominant mid tone, 33% |
| `--brass` | `#A8742E` | rules and ornament |
| `--brass-deep` | `#8A5520` | lit brass out of the light — carries text |
| `--ink` | `#3A2A14` | body copy |
| `--ink-soft` | `#6A5230` | secondary copy |
| `--leaf` | `#8F9721` | banana leaf, 13% |
| `--leaf-deep` | `#5E6616` | its shadow |
| `--blossom` | `#F59591` | the pink in the garlands, under 3% |

The paper is deliberately lighter than anything in the photograph, so the
photograph always reads as the brightest thing on screen.

**Contrast, against `--paper`:** ink 13.0 (AAA), ink-soft 6.9 (AA), brass-deep
5.8 (AA), leaf-deep 5.9 (AA). `--brass` is 3.8 and is used only at display
size; `--gold` is 2.2 and never carries text at all.

## Type

Cormorant Garamond 300 carries the whole identity — high contrast, wide
apertures, and it keeps its elegance at display size. Pinyon Script is the
calligraphic hand, used only for the ampersand that joins their names. Jost
carries the small uppercase lines. Noto Serif Tamil sets நிச்சயதார்த்தம்.

## Assets

- `assets/images/mandapam-open.webp` — 941x1672, the only photograph the page
  loads. It is the opening plate and, washed out, the ground under every page
  after it.
- `assets/audio/traditional-nadaswaram.mp3` — replace with any file the
  browser plays. Never autoplays: browsers refuse sound until the page has
  been touched, so the first tap or scroll is what offers it, and the corner
  button owns it after that.

## Accessibility & behaviour

- Words arrive by CSS animation rather than a scrubbed value, so a word always
  finishes where it belongs — nothing can be left half-revealed or clipped.
- `prefers-reduced-motion` stops every drift, the sunlight pass and the
  drifting air entirely, and puts all type at its resting position.
- `100svh` throughout, safe-area insets on all four edges, no horizontal
  scroll at any width.
- The countdown is a live `role="timer"`.

## Editing the details

Event data lives inline in the `EV` object at the top of the script in
`index.html`. `invitation-info.js` is kept as the documented source of truth
for names, dates and venue; it is not loaded by the page.

Page 1 carries the formal names, page 5 the short ones they actually go by —
Sasi & Abi, in the same Cormorant display face, not a second script line.

The hashtag on page 5 is `#SasiWedsAbi`. It replaced `#LoveGotPrescribed`,
which told a courtship story the client asked to remove — change it in the
markup if they would rather have something else.

## Legacy

`index-v1-legacy.html` + `styles.css` + `script.js` are an earlier build, kept
for reference. They are not used by `index.html` and can be deleted.
