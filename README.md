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

## How it moves

The invitation plays itself. On opening, a guided tour walks the whole story
and then stops; the moment a guest scrolls, swipes or presses a key it stands
down and never fights them for control again. The floating controls (pause,
mute) surface on any touch and fade out after a few seconds.

**The pacing rule:** a page finishes animating, *then* two seconds of
stillness, *then* it travels. The animation length is measured off the DOM at
runtime rather than hard-coded, so a scene that takes longer to settle
automatically gets a later departure. Travel itself is a 1.7s float with a
soft bank of cloud passing across, so a change of scene reads as weather
rather than a cut.

Measured walk (mobile, 375x812):

```
0.2s  names        6.2s  families
12.2s story p1    18.2s  story p2    24.2s story p3
29.1s couple      36.2s  the day     ...  venue -> blessings, then stops
```

The tour is built from one flat itinerary of stops, where **Our Story
contributes one stop per panel**. Sideways movement is therefore ordinary
tour progress rather than a special case inside the step function - which is
what kept breaking it.

**Our Story moves sideways.** A scroll or swipe on that scene pages the strip
horizontally; only once the last panel is reached does the gesture pass
through to the page, and scrolling back up pages left again before releasing
upward. The scene rewinds to its first panel whenever it leaves the screen,
so it is never re-entered half-told - on a refresh, from the dots, or when
the tour comes back round. Rewinding on *exit* rather than on entry means it
never yanks under a guest who is mid-way through reading it.

Every scene is built to fit a single screen; verified down to 360x640.

### A different arrival for every page

| # | Scene | Arrival |
|---|-------|---------|
| - | **Cover** | card breathes in, warm bloom, 18-28 gold motes scatter, cover lifts away |
| 01 | Names | rises and focuses, like a photograph developing |
| 02 | Families | the two cards fold in from their own sides |
| 03 | Our Story | each panel settles upward as it becomes the live one |
| 04 | The Couple | the pair lean in toward each other |
| 05 | The Day | the counter drops in, cell by cell |
| 06 | Venue | the mandapam draws itself, words arrive beneath |
| 07 | Blessings | everything eases back, like closing a book |

Photographs use the **framed arch card** everywhere except **The Couple**,
which is the one page that stays blended into the paper.

Running throughout: drifting petals, clouds crossing on 90-170s cycles, a
travelling highlight on the names, a slowly turning leaf on every divider,
floating countdown cells, breathing underlines, and photographs that never
sit perfectly still.

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
