# Sasidharan & Abinaya — Engagement Invitation

*Nitchayathartham · நிச்சயதார்த்தம் — an engagement, not a wedding. The
wording says so throughout: "&", never "weds".*

A scroll-scrubbed cinematic film of how they met, closing on the invitation itself.
Static site. No build step, no framework, no CDN beyond Google Fonts.

**Live:** enable GitHub Pages on `main` / root. `index.html` is the entry point.

---

## Structure

**Part I — the film.** One tap, then it plays itself: 12 chapters on a timed
timeline, about 56 seconds end to end. Each chapter receives live progress values
(`--t` raw, `--e1/2/3` staggered eased arrivals, `--x` exit) and arrives by ~34%,
holds, then leaves, so the middle of every chapter is a composed, held frame.

Time is accumulated step by step with each step clamped to 120 ms, never read off
the wall clock — a backgrounded tab resumes where it stopped instead of jumping
several chapters. A 220 ms watchdog drives the clock if `requestAnimationFrame`
is being starved (low-power mode, embedded views), so the film can never freeze
on its first chapter; at 60fps the watchdog never fires.

Beats do not cross-fade. Entering and leaving are different gestures — `push`
(a dolly in), `rise`, `drift` (a lateral pan whose direction alternates), `iris`
(the aperture opening on the reveal) and `tilt` — each driving only the picture
layer, so the words never distort. **Every one of them moves transform and
opacity only.** An animated `filter: blur()` across a full-screen photograph has
to be re-rastered each frame, and on a phone that is what showed up as flicker
on the cut; the softness now lives in the bed behind, blurred once and never
touched again. There are no SVG filters left in the page at all.

Story photographs have **no frame and no crop**. Every frame tried before — the
box, the torn edge, the gopuram arch — took a bite out of the picture to put
something of its own around it, and the arch was the worst, because cropping to
portrait threw away whichever half of a wide photograph it did not want. Each
plate is now shown whole, at its own aspect ratio, with nothing but its own
shadow to lift it off the bed. The lead plate breaks out of the chapter gutter
and runs the full width of the phone: an uncropped wide photograph has only its
width to work with, so it takes all of it. Past 780px the pair moves side by
side.

One beat keeps a frame. The ring gets the torn print — a displacement map chews
the photograph and its cream mount together, so the edge is a tear rather than a
cut, which suits a ring box and a pair of hands and suits nothing else in the
film. The second print clips the corner of the first and nothing more. Those two
`feTurbulence` filters are the only SVG filters left in the page, and the filter
sits on an inner wrapper while the movement sits on the outer one, so the ragged
edge is rasterised once instead of on every frame.

Words arrive one at a time, each rising out of its own blur on a short stagger.
That is a CSS animation rather than a scrubbed value, so a word always finishes
where it belongs — nothing can be left half-revealed or clipped mid-line.

Navigation: tap the left or right half to move, press and hold to pause, arrow
keys and space on a desktop. Nothing is drawn over the picture to track
progress.

**Part II — the invitation.** Four pages that snap one whole screen at a time
(`scroll-snap-type: y mandatory` on the document itself, not the window), each
over its own photograph thrown far back. IntersectionObserver reveals, live
countdown, Google Calendar link, Maps link. The blessing page carries its words
and nothing else — no share buttons, no gallery.

## Scenes

| # | Beat | Source |
|---|------|--------|
| 1 | Act I — their story | type only |
| 2–3 | Medical college, the hospital | `hall` `notes` `corridor` `rounds` `study` |
| 4 | Act II — the years between | type only |
| 5–6 | The road, the town | `journey` `rain` `campus` `cycle` |
| 7–8 | The evenings | `marina` (full frame) `ride` `shore` |
| 9 | Act III — the question | type only |
| 10 | The rings | `ringbox` `rings2` `parapet` |
| 11 | **The reveal** — full frame, no border | `couple` |
| 12 | The announcement | `tank` (full frame) |

Chapter durations live in the `SECS` array at the top of the script.

## Assets

`assets/story/*.webp` — 24 images, ~605 KB total.
Most were cropped out of the supplied storyboard collages; `couple.webp` is the
couple's own photograph and is the only source for how they look.

### Music

Put your file in `assets/audio/` and point the `<audio>` tag near the bottom of
`index.html` at it:

```html
<audio id="au" loop preload="auto" src="assets/audio/YOUR-FILE.mp3"></audio>
```

Keep the `id="au"` — the script finds it by that. `.mp3`, `.m4a` and `.ogg` all
work; `.mp3` is the safest across phones. Aim for under about 4 MB so it starts
quickly on mobile data, and use a track that loops without an obvious seam, since
it repeats for the length of the visit.

The file currently referenced is `traditional-nadaswaram.mp3`, which was already
in the repository — **check its licensing before public use.** Music never
autoplays: it starts only on the "Begin" tap, and there is a mute toggle in the
lower right throughout.

### Deliberately excluded

- `assets/images/engagement-rings-natural.*` — the rings are engraved
  "SNEHA & VISHAL · 10-10-2025". Someone else's names, legible at full size.
- `assets/images/{couple-leaning,couple-standing,bride-portrait,groom-portrait}.*`
  — painted artwork that does not resemble the couple in the photograph.

## The gate

Before the film, the mandapam the client is building stands behind the title and
covers the screen outright, at every size. A 16:9 plate on a 9:19.5 phone shows
about a quarter of its width — but this one frame has no subject to lose: it is
a symmetrical backdrop, so the crop lands on the dark centre of the stage with
the garlands above and the floor below, which is where the names want to be
anyway. The one plate that can afford to be cropped is the one that is only a
room.

Behind every beat lies the same arrangement: the photograph it belongs to,
thrown so far out of focus it is only colour. It is what fills a phone edge to
edge without a black bar anywhere, and because it is the picture's own light the
join never reads as a join. It is deliberately **static** — a 40px blur that is
also being transformed every frame is the most expensive thing a phone can be
asked to composite. An even film grain over everything (also static) is what
lets the enlargements read as filmic rather than soft.

**The landscape plates.** A 16:9 photograph and a 9:19.5 phone cannot both be
satisfied: covering the screen throws away three quarters of the width. There
are two answers in the page and the choice is per-beat.

The **tank** uses the fitted treatment: the plate is shown nearly whole at
`--fill` of the viewport width, its top and bottom edges feathered into a bed of
itself out of focus. The screen is covered corner to corner, nothing is lost,
and there is no band because the band dissolves into its own blurred
continuation. That beat needs it — the couple sits off to one side, and covering
cut the groom in half.

The **sea wall** uses `.bleed--full`, which simply covers, with `--pos` choosing
what survives. It fills the phone, at the price of the coat, the motorcycle and
the sun falling outside the crop; the tea glass and the books stay. Swap the
class for the other treatment if that trade ever stops being worth it.

Past a square viewport both simply cover.

**The reveal.** `couple` is portrait and fills the phone. Its upper left is deep
foliage in shadow and carries nothing, which is where the names go.

**Resolution.** The source plates ran from 184x169 to 584x222 — a fivefold
enlargement to fill a phone. `assets/story/_original/` holds them untouched;
what the page loads is a Lanczos enlargement capped at 4x with a measured
unsharp pass, which invents no detail but keeps the browser's own bilinear mush
out of the picture. Re-run that step from the originals if a sharper source ever
arrives.

## Type

Cormorant Garamond 300 carries the whole identity — high contrast, wide
apertures, and it holds its elegance at display size. Pinyon Script is the
calligraphic hand, used only for the joining words ("weds", the ampersands).
Jost sets the small letterspaced labels and all UI. Noto Serif Tamil for Tamil.

## Colour — the Sasi & Abi palette

Measured, not chosen, from two sources that agree almost exactly: the couple's
own photograph and the mandapam the client is building. 100% of the stage's
colour sits between hue 15° and 44°; its shadows measure S85–93, so the
near-black is warm brown and never grey; lit brass is 14% of that frame. Lilac
appears in neither the stage nor the room — it is only ever their clothes,
which is why it stays the one cool note.

```
field   #0A0502  #1A0C02  #2F1A06  #5A250A  #754012
gold    #8B4915  #B46B27  #C78A39  #D99D4F  #E8B464  #FDE3B4
lilac   #6F4359  #B58FA7  #CDADC4  #E7CEE1
jasmine #FCF0D6  #F3E3C6
accent  #9A3328  #3E3D02  #98931C
```

All body and heading colours clear WCAG AA on `#1A0C02`: jasmine 16.9:1, zari
8.1:1, gold 6.5:1, brass 4.6:1. `--brass-deep` (2.8:1), `--kumkum` (2.6:1),
`--lilac-deep` and `--leaf` are decorative only and never carry text.

## Accessibility & behaviour

- Full `prefers-reduced-motion` path: the film still plays on the same timeline,
  it simply stops moving — chapters cross-fade and every element sits at rest.
- Mobile-first. All 12 chapters measured at 390×844: each fits the viewport with
  clearance on every edge, and the page never scrolls sideways.
- `100svh` with a `100vh` fallback, safe-area insets on all four edges.
- Music off by default. Nothing autoplays.

## Editing the details

Event data lives inline in the `EV` object at the top of the script in
`index.html`. `invitation-info.js` is kept as the documented source of truth
for names, dates and venue; it is not loaded by the page.

## Legacy

`index-v1-legacy.html` + `styles.css` + `script.js` are the earlier light-themed
build, kept for reference. They are not used by `index.html` and can be deleted.
