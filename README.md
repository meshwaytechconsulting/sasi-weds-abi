# Sasidharan & Abinaya — Engagement Invitation

*Nitchayathartham · நிச்சயதார்த்தம் — an engagement, not a wedding. The
wording says so throughout: "&", never "weds".*

Four pages, each a whole screen, snapping one at a time. Static
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
| 1 | The film | 3.4s of the couple at the mandapam, the two names, the date |
| 2 | The families | both sets of parents |
| 3 | The ceremony | venue, date, time, address, countdown, map |
| 4 | The close | their short names, a pair of drawn rings, the hashtag, the date |

There was a blessing page between the ceremony and the close, carrying the
drawn rings. It is gone at the client's request. Its two backdrops,
`bg-rings-m.webp` and `bg-rings-d.webp`, stay in `assets/images/` unused, in
case it comes back; nothing references them.

Each page has its own backdrop, in two cuts — a 9:16 for a phone and a 16:9
for a wide screen, chosen by aspect ratio rather than by width.

The scroller is a box of its own (`.deck`) rather than the window, so a snap
point is always one whole screen and the drifting layer above it stays put
while the pages move underneath.

## The opening is a film

3.37 seconds of an illustrated couple at the mandapam, which **plays once and
then holds on its last frame** for as long as the page is open. It is not a
loop: a loop is wallpaper, and this is meant to happen once, the way arriving
somewhere happens once.

> The couple in it are a **generic illustration**, not photographs of
> Sasidharan and Abinaya — worth saying out loud given the client's "no need
> of their pics anywhere". If they meant no depiction of the couple at all
> rather than no photographs, this is the one thing in the build to check
> with them.

**What the source needed.** It arrived as 1920x1080 at 12 Mbps with an audio
track — but the animation inside it was 9:16, pillarboxed into the middle with
hard black bars either side. `cropdetect` agreed on `crop=608:1080:656:0`
across all 99 frames, so the bars came off and what is left is a true portrait
clip that covers a phone with nothing thrown away. Audio stripped (it is muted
regardless, and the page has its own music), re-encoded at CRF 27:

| | |
|---|---|
| source | 5,025 KB, 1920x1080, 12 Mbps, with audio |
| shipped | **326 KB**, 608x1080, 787 kb/s, silent |
| poster | 78 KB, the clip's own first frame |

That 94% saving is the difference between this opening and a guest on mobile
data giving up on it.

### The waiting state is the poster, and that is what keeps it simple

A `<video>` shows its poster until playback actually begins. The poster here is
the clip's **own first frame**, so a slow network, a refused autoplay and a tab
opened in the background all look identical: the opening frame, held, exactly
as if the film had not started yet. When it does start, it starts on that same
frame — nothing jumps.

An earlier version guessed instead: a 2.6s timer that swapped in a still if the
clip had not moved yet. Opened in a background tab, that timer fired and *then*
the video played, leaving the page showing the still with the film running
invisibly behind it. There is no timer now. Only two things hide the film —
reduced motion, and the media element reporting an outright failure. A rejected
`play()` promise (low power mode, data saver, some in-app browsers) needs no
handling at all; the page simply stays on the poster.

The same file serves as the `<img>` fallback, deliberately: the browser fetches
it once and reuses it, where a second still would have been 79 KB downloaded by
everybody for a case that almost never happens.

### The order of the opening

Each step waits for the one before it rather than all starting together:

1. **The film runs clean** — no wash, no type, for its first second and a half.
   Veiling the arch from frame one would be covering up the thing we were
   asked to show.
2. **The air comes alive** — banana leaves turning end over end, jasmine and
   blossom petals fluttering, pollen drifting upward into the light. Three
   shapes at three speeds, because one repeated sprite reads as a screensaver.
   The leaf's turn is faked by squashing it across its stem, so it reads as a
   thin sheet rather than a rotating blob.
2. **The light and the names together.** The shade comes up over the held
   frame the instant the film freezes — on the video's own `ended` event
   rather than a clock, so it stays in step if the clip is ever swapped — and
   the words follow 90ms behind it, which reads as one movement rather than
   two. At the first attempt the gap was 480ms and the shading announced
   itself as a separate beat.
3. **The music** comes in with the title.

Measured on a real load: **film ends 3414ms, shade 3414ms, names 3508ms.**

Each word reaches full opacity by 45% of its keyframe and only the movement
runs the full length. Fading across the whole keyframe left every word
half-there for most of its arrival, and with a stagger on top the line never
looked solid.

   The block sits in the arch above the couple, and it has been lifted twice.
At 17vh the date line sat across the groom's head. At 10vh it cleared him, but
the *shade* behind it still washed his face. Gridding the frame put his hair
at 42% and both faces at 44–58%, so the shade has to be gone by 42% — which
means the words have to finish by 34%. At 7vh the block runs 6–34% and the
ramp has room. **Nothing fades the couple.**

### Three bugs worth remembering

**The names were never gated on the freeze at all.** The opening section
carries `[data-view]` like every other page, so the IntersectionObserver
marked it on-view the moment it was on screen — at load — and its words
matched `.on-view .w` and animated in at ~300ms, over the running film.
`body.named` decided nothing. The rule now reads
`.on-view:not(.pg--open) .w`, and that `:not()` is load-bearing.

This one hid behind the instrumentation. Watching `document.body.className`
showed `frozen` and `named` firing in the right order, which looked like
proof. Sampling the words' **computed opacity** showed them at 1.00 while the
film still had two seconds to run. Measure the thing itself, not the flag
that is supposed to control it.

**A give-up timer cut across a running film.** A refused autoplay armed a
1.1s fallback; a tap before it fired started the film after all; the timer
was never cancelled and brought the shade and names up on top of the moving
picture. Every timer is now held in a variable and cleared the moment a frame
is shown (`stand(null)`), and nothing is scheduled with a bare `setTimeout`.

**And the watchdog could hang, then could never fire.** Its "still running"
branch returned without re-arming — so a stream that stalls while still
reporting `paused: false` stops sending `timeupdate`, nothing re-arms, and the
names wait forever. Re-arming fixed that but introduced the opposite bug: the
progress marker was declared *inside* `stand()`, so every re-arm reset it to
-1, `currentTime > -0.95` was always true, and it would have re-armed forever
without ever freezing. The marker lives outside the function now, and progress
is judged by the clock moving rather than by the `paused` flag.

**The names must appear.** An invitation that never says who is getting married
because a video stalled is not degraded, it is broken — so every path that can
stop the film ending has a way out. A refused autoplay freezes early, since we
know no `ended` is coming. A cap catches the rest: a stall, a dead connection,
a codec the device will not take.

One subtlety worth keeping: a page that loads in a **background tab** has its
autoplay refused for that reason alone. Treating that as final meant the guest
opened the tab to find the film already over before it started, so a refusal
made while `document.hidden` is not acted on — the page waits for first sight
and asks again, and the cap counts from then too.

Page 1 carries **Dr.** on both names, matching the family cards on page 2.
"Dr. Sasidharan" measures 293px inside a 327px line box at 375px wide, and the
size is set in `vw`, so the proportion holds as the screen narrows — no
overflow at 320px either.

### On a landscape screen the film is contained, not covered

The clip is 9:16 and the art column on a wide screen is about 4:5. Covering it
would cut the couple off at the ankles, so there it is `object-fit: contain`
and the whole frame survives, on the page's own paper.

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

**The deck is pinned to the top for the first half second.**
`history.scrollRestoration` covers the window, and the window never scrolls
here — the deck does. Chrome restores a scroller's position asynchronously,
after parsing and again after load, so one assignment is not enough and a
reload would drop a guest into the middle of the invitation with the opening
never played. Any real scroll input inside that window releases it at once:
pinning the deck under someone's thumb would be worse than the bug it fixes.

**The names wait on `document.fonts.ready`** as well as on their cue, capped at
2.2s. Cormorant at display size has very different metrics from the Georgia
standing in for it, and a swap landing mid-animation reads as the whole line
jumping.

### Why the names are the page's own ink, on a wash that runs edge to edge

The opening used to set the names in an olive-bronze that "matched the
background", on a radial veil 54% of the frame wide. Both halves of that were
wrong, and on a phone the result was simply unreadable.

The band a name crosses on a 375x812 screen runs from **L=0.06 to L=0.89** —
lamp flame and the shadow under the arch inside the same word. A mid-tone
olive scored **1.65:1** against the dark fifth of it. No halo on the glyphs
was going to rescue that. And a name set at `13.5vw` runs nearly the full
width of the screen, so both ends of "Sasidharan" hung outside a 54% veil
entirely.

So:

- **The veil is a vertical wash, edge to edge.** Heaviest at the top where
  the words are, gone by two thirds down — which leaves the aisle, the lamps
  and the garlands, the best part of the photograph, completely untouched.
  Over the band the names cross it takes the darkest pixel from L=0.12 to
  **L=0.74**.
- **The type is the page's own ink**, not a special case. Measured against
  the darkest pixel of the band each line crosses, with the veil applied:

| | | |
|---|---|---|
| names | `--ink` `#3A2A14` | **8.7:1** |
| Tamil | `--leaf-ink` `#4A5110` | 5.4:1 |
| "are getting engaged" | `--brass-ink` `#7A4A14` | 4.7:1 |
| eyebrow, date | `--ink-soft` `#6A5230` | 4.6:1 |

Dark type on a bright photograph needs **light** behind it, not shade, so the
wash is the paper's own colour and nothing resembling a dark scrim is ever
laid over the picture. Two tokens were added for this, `--leaf-ink` and
`--brass-ink`: the leaf and the brass taken down far enough to carry text.
Both also read at 8.0:1 and 7.0:1 on plain paper, so they work on every page.

**Measure against the worst pixel, not the average.** The average is what let
the olive pass review and then disappear on somebody's phone.

## The ground under pages two to four

Pages two to four sit on their own backdrops — the brass
Nandi among roses, tuberose and foliage.

> **Two things to check on that file.** It arrived as a phone screenshot: an
> app back-button top-left, a lens button bottom-right, and a
> `PICTURES / FILM. WEVA` studio watermark across the bottom. All three are
> cropped out (`crop top 106, bottom 96`, leaving 706x857), but the watermark
> means the photograph is a studio's work — worth confirming the couple have
> the right to use it before this goes out. Swapping in their own decor photo
> is a one-line change; the wash is tuned to the image's darkest pixel, not to
> this particular picture.
>
> It also **replaced the rings photograph on page five**, which was the
> previous request for that page. Easy to put back if page five should keep it.

It is a far darker frame than the mandapam was: median luminance .19 against
.38, and its darkest pixels reach zero. Re-measured against it the budget
barely moved, because both images bottom out in near-black — and `--brass-deep`
turns out to be the limiting colour, not the ink. The type zone holds at about
.10; the border runs at .30, up from .26, because the ask was for the decor
*around* the words rather than a whitish page.

Every page after the first keeps a photograph behind it. It used to be papered
down so hard that nothing survived — the image at `.24` under a scrim reaching
`.92`, which leaves about six percent of the picture showing, and the pages
read as blank.

One number governs this: **how much of the photograph survives at any point**.
Image at opacity `O` under a paper scrim at alpha `A` leaves a weight of
`O x (1 - A)`. Measured against the darkest pixel in the frame:

| weight | `--ink` | `--ink-soft` | `--brass-deep` |
|---|---|---|---|
| .12 | 9.9:1 | 5.3:1 | 4.4:1 |
| .16 | 9.0:1 | 4.8:1 | 4.0:1 |
| .26 | 7.0:1 | 3.7:1 | too far |

So each page is built to two weights at once: about **.095** across the band
the words occupy, and about **.26** at the top and bottom edges, where no type
goes. The picture is plainly there; it is never where a word is. The blur came
down from 3px to 1.4px as well — it was a smudge, and now it is a photograph
seen through morning light.

Note that **stacking scrims multiplies what gets through**: a `.74` radial over
a `.72` linear leaves `1 - .26 x .28` = 7%, not 28%. Getting that wrong is what
made the middle of every page read as blank paper on the first pass.

Each page takes a different crop of its photograph (`--wp`) and drifts it on a
46s cycle of its own, so five pages cut from one picture never read as one
still frame.

### The kolam

Behind each page, a pulli kolam in gold at a sixth of full strength — twenty-four
dots, sixteen petals turned around them, a lotus at the middle — turning once
every three minutes. It is vector, so unlike the photograph it can be bold in
the margins without costing a word anything, and it gives each page a shape of
its own. It is defined once as a `<symbol>` and used five times at five sizes.

Its paint is on the geometry as presentation attributes rather than in CSS: a
`<use>` instance is a shadow clone, and document selectors are not guaranteed
to reach inside it.

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
| `--rose` | `#C2566B` | the pink roses in the decor photograph |
| `--rose-deep` | `#9B2F45` | its deep reds — 6.9:1, carries text |
| `--crimson` | `#7E1B2E` | their shadow — 9.5:1 |

The roses are the one thing the palette was missing. The decor frame is mostly
green and brass, which it already had; the reds are 5.8% of that photograph,
and a 5.8% colour used sparingly is what stops a scheme of gold and leaf
reading as flat. They carry the ampersands, the relation labels, the lamp
flame, the sign-off line and the hashtag — nothing structural.

The paper is deliberately lighter than anything in the photograph, so the
photograph always reads as the brightest thing on screen.

**Contrast, against `--paper`:** ink 13.0 (AAA), ink-soft 6.9 (AA), brass-deep
5.8 (AA), leaf-deep 5.9 (AA). `--brass` is 3.8 and is used only at display
size; `--gold` is 2.2 and never carries text at all.

## Type — two faces, modern and light

This page has been through four settings. Cormorant Garamond 300 carried it
first and was too thin at display size. Marcellus with Cinzel replaced it and
was handsome, but Roman and antique — a monument rather than an invitation.
Instrument Serif was properly modern, but a Didone carries weight in its stems
and at display size that reads as forceful. The brief was modern **and light**,
which rules out every high-contrast serif, because contrast means weight
somewhere. So:

| | |
|---|---|
| **Outfit 200** | the display lines — names, headings, venue. A geometric sans is the one way to be large and genuinely **light** at once: the stroke is a single even weight, so nothing in the letter is ever thick. Near-circular bowls, open apertures, a little positive tracking so the thin strokes do not close up. The small capital lines take the same face at 400, because 200 at 9px disappears. |
| **Cormorant Garamond 300 italic** | the only other voice, and it only ever speaks in italic: "are getting engaged", the sign-off, and the ampersand joining their names. A fine serif italic against a light geometric sans is contrast doing the work instead of weight. |
| **Noto Sans Tamil 300** | நிச்சயதார்த்தம், at the same weight as everything round it. |

Two families where there were five.

Outfit sets wide. At 12.8vw "Dr. Sasidharan" filled 325px of a 327px line box
— not a margin, a coincidence. At 11.2vw it measures 284px, and since the size
is set in `vw` that proportion holds as the screen narrows.

## Assets

- `assets/video/opening.mp4` — 608x1080, 3.37s, silent, 326 KB. The opening
  film. Re-encode it from a new source with
  `crop=608:1080:656:0` only if the new source is pillarboxed the same way —
  run `cropdetect` rather than assuming.
- `assets/video/opening-poster.webp` — its first frame, 78 KB. Poster and
  fallback both.
- `assets/images/mandapam-open.webp` — 941x1672. The ground under pages two to
  four. No longer the opening plate.
- `assets/images/rings-close.webp` — 941x1672. Rings on a gold plate among
  jasmine, lotus and a kuthuvilakku; the ground under the closing page. Same
  wash and the same weights — worst pixel, `--ink` reads 10.2:1 there and the
  small caps 5.4:1.
- `assets/images/theme-decor.webp` — 706x857, 82 KB. The client's decor,
  cropped free of its screenshot chrome. The ground under the inner pages.
- `assets/audio/traditional-nadaswaram.mp3` — 50s, re-encoded 320 kb/s stereo
  down to 128 kb/s (1,958 KB to 783 KB). Replace with any file the browser
  plays.

### About "sound on by default"

This is as close to it as a browser permits, and the gap is worth stating
plainly. **Unmuted autoplay is blocked** by Chrome, Safari and Firefox alike
until the page has been interacted with. It is a platform rule, not a setting:
there is no flag, attribute or trick that turns it off for a public page. A
muted track would be allowed, but muted music is not music.

So the page asks as often as it is allowed to:

- once the film freezes — not at load, because calling `play()` forces the
  track to load and 783 KB of music competing with 326 KB of video would
  stutter the one thing the guest is watching;
- again on the first touch, scroll or key, which on a phone is almost always
  the first flick;
- again when a backgrounded tab comes back to the front.

Every early gesture is a fresh chance rather than one shot, so a refused
attempt does not burn the only try. The exception is deliberate: once the guest
has pressed the button to turn the music **off**, `hushed` makes sure the next
tap anywhere does not start it up again.

In practice a desktop visitor who has played media on the site before gets
sound from the moment the title appears; a phone visitor gets it on their first
scroll, which is a fraction of a second later.

## Accessibility & behaviour

- Words arrive by CSS animation rather than a scrubbed value, so a word always
  finishes where it belongs — nothing can be left half-revealed or clipped.
- **Every line on every page** arrives word by word now, not just the headings.
  Each word hinges up off the foot of its own line — translate, a `rotateX`
  about the baseline and a hair of scale, out of one keyframe. `--st` sets the
  gap between consecutive words per element: wide for a heading of three words,
  narrow for a paragraph of thirty, so a long sentence never outlasts its page.
- That animation no longer carries `filter: blur()`. It is the one property in
  it that cannot be composited, and with sixty words arriving in sequence it
  was the entire cost of the effect. Transform and opacity only.
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
