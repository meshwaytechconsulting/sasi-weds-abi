# Sasi Weds Abi — Animated South Indian Engagement E-Invitation 💍

[![GitHub Pages Deployment](https://img.shields.io/badge/deployment-GitHub%20Pages-brightgreen?style=flat-square&logo=github)](https://docs.github.com/en/pages)
[![Hashtag](https://img.shields.io/badge/hashtag-%23LoveGotPrescribed-gold?style=flat-square)](#)
[![Theme](https://img.shields.io/badge/theme-South%20Indian%20Engagement-purple?style=flat-square)](#)
[![Mobile First](https://img.shields.io/badge/design-Mobile%20First-blue?style=flat-square)](#)

A premium, cinematic, mobile-first animated engagement e-invitation website created for **Dr. Sasidharan S** and **Dr. Abinaya M** celebrating their Engagement on **Sunday, 15th November 2026** at **Amman Sakthi Mahal, Thiruvarur**.

---

## 🌟 Visual Direction & Cultural Highlights

- **Heritage Palette:** Royal Kanchipuram silk aubergine (`#260b24`), shimmering temple gold zari (`#d4af37`), sacred kumkum maroon (`#831826`), and soft ivory silk (`#faf5eb`).
- **Original Couple Art:** Transformed client-supplied reference photographs into masterclass digital paintings that honor the bride's champagne gold and royal purple silk saree, temple jewelry, the groom's lilac shirt, and their genuine expressions.
- **Signature Ring Exchange Sequence (*Mothiram Mathuthal*):** An emotional and culturally authentic sequence celebrating the engagement ring exchange with gold solitaire brilliance, bridal henna (mehendi), traditional bangles (*valayal*), and floating jasmine petals (*mallipoo*).
- **Physician Touch:** Subtle, affectionate nod to the couple's medical doctor background with the hashtag **`#LoveGotPrescribed`**.
- **Mobile-First Responsiveness:** Flawless rendering from 320px, 360px, 390px, to 430px up to 4K displays with 0 horizontal overflow.
- **Motion Accessibility:** Fully supports `prefers-reduced-motion` and includes an on-page interactive **Motion Toggle** to ensure comfort for all guests.

---

## 📋 Verified Invitation Info (Single Source of Truth)

All event information has been extracted and cross-verified from the source Canva page:

| Field | Verified Detail | Audit Status |
| :--- | :--- | :--- |
| **Project Name** | Sasi Weds Abi (`#LoveGotPrescribed`) | **Confirmed** |
| **Groom** | Dr. Sasidharan S | **Confirmed** |
| **Bride** | Dr. Abinaya M | **Confirmed** |
| **Invitation Headline** | Together in Every Season | **Confirmed** |
| **Invitation Message** | *“With the blessings of our families, we heartily invite you to celebrate our Engagement. With your blessings, we begin a new chapter.”* | **Confirmed** |
| **Groom's Parents** | Father: Shri D. Sakthikumar • Mother: Smt. S. Parimala | **Confirmed** |
| **Bride's Parents** | Father: Shri K.N.Murugesan • Mother: Smt. M.Anitha devi | **Confirmed** |
| **Date & Day** | **15th November, 2026 (Sunday)** — *Day verified against Gregorian calendar* | **Confirmed** |
| **Time** | **6:00 PM – 7:30 PM** | **Confirmed** |
| **Venue** | **Amman Sakthi Mahal** | **Confirmed** |
| **Address** | No. 61c, Thiyagaraja Agraharam, Suntharvilagam Main Road, Thiruvarur – 610001 | **Confirmed** |
| **Directions** | [Google Maps Navigation Link](https://maps.app.goo.gl/AVTojszWfjC1NAFr6) | **Confirmed** |
| **RSVP** | Digital Wishes & WhatsApp sharing enabled (phone contact unlisted in Canva source) | **Confirmed / Phone Missing in Source** |
| **Language** | English (as presented in source) | **Confirmed** |

---

## 🗂️ Project Structure

```text
Wedding Invite Project/
├── index.html                   # Semantic HTML5, meta tags, and 8 connected scenes
├── styles.css                   # Mobile-first design system with CSS custom properties
├── script.js                    # Interactive controller (countdown, ring sequence, sharing, .ics)
├── invitation-info.js           # Single source of truth configuration file
├── README.md                    # Project documentation & GitHub Pages deployment guide
└── assets/
    ├── images/                  # Optimized WebP and fallback JPEG artwork
    │   ├── couple-leaning.webp  # Hero couple portrait painting
    │   ├── couple-standing.webp # Standing celebration couple painting
    │   ├── ring-exchange.webp   # Sacred ring exchange ceremony painting
    │   ├── bride-portrait.webp  # Dr. Abinaya solo portrait painting
    │   ├── groom-portrait.webp  # Dr. Sasidharan solo portrait painting
    │   └── urli-decor.webp      # Brass urli with floating jasmine & lamps
    ├── illustrations/           # Scalable SVG cultural motifs
    │   ├── kolam-mandala.svg    # Geometric 8-petal traditional kolam
    │   ├── kuthu-vilakku.svg    # South Indian brass five-face oil lamp
    │   ├── temple-arch.svg      # Temple toranam entrance arch
    │   └── rings-pair.svg       # Interlocking gold & diamond engagement rings
    └── icons/                   # Action icons
```

> **Privacy Note:** In strict compliance with the project specifications, original client reference photographs are kept in private archive outside the public assets directory. Only approved artistic transformations are deployed.

---

## 🚀 How to Run Locally

Because this project is built on standard static web technologies (HTML5, Vanilla CSS, and modern JavaScript), no complex build process is required!

### Option 1: Python HTTP Server (Recommended)
Open a terminal in the project directory:
```bash
python -m http.server 8080
```
Then visit [http://localhost:8080](http://localhost:8080) in your web browser.

### Option 2: Node.js `npx serve`
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click on `index.html` and select **"Open with Live Server"**.

---

## 🛠️ How to Customize & Update Details

### 1. Update Event Information
All content is centralized in [`invitation-info.js`](invitation-info.js). To edit any names, dates, or venue details, simply modify the configuration object:
```javascript
const INVITATION_INFO = {
  event: {
    date: {
      formatted: "15th November, 2026",
      dayOfWeek: "Sunday",
      isoDate: "2026-11-15"
    },
    venue: {
      name: "Amman Sakthi Mahal",
      address: "No. 61c, Thiyagaraja Agraharam, Suntharvilagam Main Road, Thiruvarur - 610001."
    }
  }
  // ...
};
```

### 2. Replace or Update Artwork
Place optimized images into `assets/images/`:
- `couple-leaning.webp` / `couple-leaning.jpg` (Hero composition)
- `couple-standing.webp` / `couple-standing.jpg` (Celebration composition)
- `ring-exchange.webp` / `ring-exchange.jpg` (Ring exchange ceremony)
- `bride-portrait.webp` / `groom-portrait.webp` (Portraits)

---

## 🌐 GitHub Pages Deployment Guide

Follow these steps to deploy the website live on GitHub Pages for free:

### Step 1: Initialize Git Repository
In your project directory:
```bash
git init
git add .
git commit -m "feat: Initial commit for Sasi Weds Abi animated engagement invitation"
```

### Step 2: Push to GitHub
Create a new repository on GitHub (e.g., `sasi-weds-abi`) and push:
```bash
git branch -M main
git remote add origin https://github.com/<your-username>/sasi-weds-abi.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (under "Code and automation" in the left sidebar).
3. Under **Build and deployment**:
   - **Source:** Select `Deploy from a branch`.
   - **Branch:** Select `main` branch and `/ (root)` folder.
   - Click **Save**.
4. GitHub Pages will build and deploy the site in approximately 1-2 minutes.
5. Your live invitation URL will be:
   ```text
   https://<your-username>.github.io/sasi-weds-abi/
   ```

### Step 4: Verify Subpath Compatibility
All asset references in `index.html`, `styles.css`, and `script.js` use **relative paths** (e.g., `assets/images/...`), ensuring seamless functionality on GitHub Pages subpaths without broken links.

---

## 🧪 Acceptance & Verification Report

- **Mobile Viewport Testing:** Inspected on 360px and 390px (iPhone 12/13/14/15 profile). Verified 0 horizontal overflow (`scrollWidth === clientWidth`).
- **Interactive Ring Exchange:** Validated both Act I (interlocking vector rings) and Act II (sacred exchange painting with gold halo bloom), as well as manual step switching and replay controls.
- **Countdown Engine:** Live calculation based on `2026-11-15T18:00:00+05:30`.
- **Calendar Download:** Tested `.ics` generation; produces standard iCalendar file with title, location, and UTC timestamps.
- **Console Integrity:** Verified **zero console errors or warnings** during browser audits.
- **Reduced Motion:** Verified `@media (prefers-reduced-motion)` and header Motion Toggle.

---

## 💖 Credits & Acknowledgments
- **Couple:** Dr. Sasidharan S & Dr. Abinaya M
- **Hashtag:** `#LoveGotPrescribed`
- **Location:** Thiruvarur, Tamil Nadu
- **Celebration Date:** 15th November 2026
