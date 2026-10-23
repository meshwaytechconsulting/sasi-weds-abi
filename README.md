# Sasi weds Abi — Engagement E-Invitation

A single-page, mobile-first invitation for the engagement of
**Dr. Sasidharan S** and **Dr. Abinaya M** — Sunday, 15 November 2026,
Amman Sakthi Mahal, Thiruvarur. `#LoveGotPrescribed`

---

## Theme — "Deepam" (temple at dusk)

Deep plum ink, lamp gold and silk violet, taken from the violet-and-gold
Kanchipuram saree in the artwork. Every section is a **full-bleed scene**
with one of the commissioned paintings faded behind it, so the artwork is
the design rather than a thumbnail inside a card.

| | |
|---|---|
| Ink | `#140812` → `#2e1129` |
| Lamp gold | `#e0bd74`, highlight `#f8e7b8` |
| Ivory | `#f4ead9` |
| Display | Cormorant Garamond |
| Headings | Marcellus |
| Body | Outfit |
| Tamil | Noto Serif Tamil |

## One scroll, one scene

The whole invitation is a deck of seven cards. `scroll-snap-type: y mandatory`
plus `scroll-snap-stop: always` means **one flick moves exactly one scene** —
a fast swipe cannot skip past one, and nothing ever halts half-way between two.

Every scene is built to fit a single screen; verified down to 360 × 640, where
the tallest needs 496 px of 640. If a scene ever did outgrow the screen it
would simply get taller and take two flicks — nothing is clipped.

| # | Scene | Backdrop | Reveal |
|---|-------|----------|--------|
| — | **The Gate** | plain, unbroken | kolam draws itself, flame lights; on tap the carved doors appear, *then* part |
| 01 | Hero — names | `couple-leaning` | names rise letter by letter |
| 02 | Invitation words | `urli-decor` | lines wipe in left→right over a slow lamp-glow |
| 03 | The Couple | `couple-standing` | portraits unfold upward in temple-arch frames, gold sheen sweeps across |
| 04 | Engagement | `ring-exchange` | full-bleed ken-burns, diamond sparkle fires every 2.6 s |
| 05 | Date & countdown | `urli-decor` | live countdown, each digit pops on change |
| 06 | Venue | `couple-leaning` | temple arch draws in, map link |
| 07 | Blessings | `couple-standing` | closing kolam draws, names and blessing fade up |

The two portraits sit **side by side at every width**, phone included — the
pairing is the point, so it never stacks into two separate people. The figures
use `display: contents` so the frames share one grid row and the captions
share another; the portraits then line up exactly however long the parents'
names run.

Running throughout: drifting jasmine petals, rising lamp embers, film grain,
and gold scene dots down the right edge showing which card you are on (tap one
to jump). The first scene carries a single chevron that fades after you move.

## Files

```
index.html          markup — one section per scene
styles.css          all styling, tokens at the top
script.js           reveal engine, parallax, countdown, gate, music
invitation-info.js  single source of truth for names/date/venue — edit here
assets/images/      the commissioned paintings (.webp + .jpg fallback)
assets/illustrations/  toranam, kolam, kuthu vilakku, temple arch, rings
```

**No framework and no CDN for behaviour** — GSAP was dropped in favour of
`IntersectionObserver` + CSS transitions, so the invitation works offline
and cannot be broken by a CDN outage. Google Fonts is the only external
request and it degrades to Georgia / system fonts.

## Changing the details

Edit **`invitation-info.js`** — the countdown, the Google Calendar link and
the WhatsApp share text all read from it. Names and copy that appear in the
page itself are in `index.html`.

## Background music

Put the file here:

```
D:\Wedding Invite Project\assets\audio\traditional-nadaswaram.mp3
```

The folder already exists. The name must match exactly, or update the
`<source>` in `index.html`.

> **Windows gotcha.** File Explorer hides known extensions, so renaming a file
> to `traditional-nadaswaram.mp3` actually produces `traditional-nadaswaram.mp3.mp3`
> and the page silently finds nothing. Turn on **View → Show → File name
> extensions** before renaming, or check the real name with:
>
> ```bash
> ls assets/audio/
> ```

There is no floating player. The music starts on the tap of **Open the
Invitation** — that tap is the user gesture browsers require before audio may
play, so this is the one moment it can begin. Volume starts at 55%. With no
file present the call fails silently and nothing on the page breaks.

Note: with the player removed there is no way for a guest to mute it from
inside the page — only their phone's own volume control.

## Notes

- **`assets/images/engagement-rings-natural.jpg` is deliberately unused.**
  The rings in that image are engraved *"SNEHA & VISHAL 10-10-2025"*. It was
  on display in the previous version. `ring-exchange.jpg` carries that scene
  instead.
- Respects `prefers-reduced-motion`: snap scrolling, petals, grain and music
  all switch off, the gate opens straight away, and every reveal renders in
  its final state.
- Prints cleanly — the gate, music disc and ambient layers drop out.

## Local preview

```bash
python -m http.server 5178
```

Then open <http://localhost:5178>. Opening `index.html` straight off disk
works too; only the WhatsApp share link behaves differently (it omits the
page URL, since `file://` paths mean nothing to a recipient).
