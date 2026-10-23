/**
 * SASI WEDS ABI — INVITATION INFO CONFIGURATION
 * Single source of truth for the Sasi Weds Abi Engagement E-Invitation.
 * All information strictly extracted and verified from the source Canva page:
 * https://preview.canva.site/6d916eaa-3cc6-465e-bd61-32b39120ae24/kismetstudios.com/sasiwedsabi/page-2
 *
 * Status Classifications:
 * - confirmed: Explicitly verified from Canva source.
 * - uncertain: Partially ambiguous in source (none currently).
 * - missing: Not provided in source (e.g. phone RSVP number, end date).
 * - not_applicable: Not relevant to this ceremony format.
 */

const INVITATION_INFO = {
  project: {
    name: "Sasi Weds Abi",
    status: "confirmed",
    hashtag: "#LoveGotPrescribed",
    hashtagStatus: "confirmed",
    tagline: "Together in Every Season",
    subTagline: "Two Hearts • A Beautiful Journey",
    eventType: "Our Engagement"
  },

  couple: {
    groom: {
      fullName: "Dr. Sasidharan S",
      shortName: "Sasi",
      title: "Dr.",
      role: "Groom",
      status: "confirmed",
      portraitImage: "assets/images/groom-portrait.webp",
      portraitFallback: "assets/images/groom-portrait.jpg"
    },
    bride: {
      fullName: "Dr. Abinaya M",
      shortName: "Abi",
      title: "Dr.",
      role: "Bride",
      status: "confirmed",
      portraitImage: "assets/images/bride-portrait.webp",
      portraitFallback: "assets/images/bride-portrait.jpg"
    },
    artwork: {
      heroLeaning: {
        webp: "assets/images/couple-leaning.webp",
        jpg: "assets/images/couple-leaning.jpg",
        alt: "Stylized artistic digital painting of Dr. Sasidharan and Dr. Abinaya in traditional South Indian attire"
      },
      standingCelebration: {
        webp: "assets/images/couple-standing.webp",
        jpg: "assets/images/couple-standing.jpg",
        alt: "Celebration portrait artwork of Dr. Sasidharan and Dr. Abinaya"
      },
      ringExchange: {
        webp: "assets/images/ring-exchange.webp",
        jpg: "assets/images/ring-exchange.jpg",
        alt: "Artistic close-up illustration of the South Indian engagement ring exchange with mehendi and gold jewelry"
      },
      urliDecor: {
        webp: "assets/images/urli-decor.webp",
        jpg: "assets/images/urli-decor.jpg",
        alt: "Traditional brass urli with floating jasmine flowers and lit oil lamps"
      }
    }
  },

  invitation: {
    headline: "Together in Every Season",
    statusHeadline: "confirmed",
    subheadline: "Two Hearts, A Beautiful Journey",
    statusSubheadline: "confirmed",
    messageOpening: "With the blessings of our families",
    statusMessageOpening: "confirmed",
    messageBody: "We heartily invite you to celebrate our Engagement",
    statusMessageBody: "confirmed",
    blessingClosing: "With your blessings, we begin a new chapter",
    statusBlessingClosing: "confirmed"
  },

  families: {
    groomFamily: {
      label: "Groom Family",
      status: "confirmed",
      father: {
        name: "Shri D. Sakthikumar",
        relation: "Father",
        status: "confirmed"
      },
      mother: {
        name: "Smt. S. Parimala",
        relation: "Mother",
        status: "confirmed"
      }
    },
    brideFamily: {
      label: "Bride Family",
      status: "confirmed",
      father: {
        name: "Shri K.N.Murugesan",
        relation: "Father",
        status: "confirmed"
      },
      mother: {
        name: "Smt. M.Anitha devi",
        relation: "Mother",
        status: "confirmed"
      }
    }
  },

  event: {
    date: {
      formatted: "15th November, 2026",
      dayOfWeek: "Sunday",
      isoDate: "2026-11-15",
      status: "confirmed",
      dayOfWeekVerified: true // 15 Nov 2026 is indeed a Sunday
    },
    time: {
      start: "6:00 PM",
      end: "7:30 PM",
      display: "6:00 PM - 7:30 PM",
      status: "confirmed",
      startIso: "2026-11-15T18:00:00+05:30",
      endIso: "2026-11-15T19:30:00+05:30"
    },
    venue: {
      name: "Amman Sakthi Mahal",
      city: "Thiruvarur",
      address: "No. 61c, Thiyagaraja Agraharam, Suntharvilagam Main Road, Thiruvarur - 610001.",
      status: "confirmed",
      googleMapsUrl: "https://maps.app.goo.gl/AVTojszWfjC1NAFr6",
      googleMapsEmbedUrl: "https://maps.google.com/maps?q=Amman+Sakthi+Mahal+Thiruvarur&t=&z=16&ie=UTF8&iwloc=&output=embed",
      statusDirections: "confirmed"
    }
  },

  rsvp: {
    status: "confirmed",
    method: "Digital Blessings & WhatsApp Wishes",
    note: "Your gracious presence and heartfelt blessings are our greatest gifts.",
    contactPhone: null, // missing in Canva source; we do NOT invent phone numbers
    phoneStatus: "missing",
    whatsappShareText: "Joining the celebration of Dr. Sasidharan & Dr. Abinaya's Engagement! #LoveGotPrescribed\nDate: Sunday, 15th November, 2026\nVenue: Amman Sakthi Mahal, Thiruvarur"
  },

  calendar: {
    title: "Dr. Sasidharan & Dr. Abinaya — Engagement Ceremony",
    description: "Engagement Ceremony of Dr. Sasidharan S and Dr. Abinaya M (#LoveGotPrescribed) at Amman Sakthi Mahal, Thiruvarur.",
    location: "Amman Sakthi Mahal, No. 61c, Thiyagaraja Agraharam, Suntharvilagam Main Road, Thiruvarur - 610001",
    startDate: "20261115T123000Z", // 18:00 IST = 12:30 UTC
    endDate: "20261115T140000Z"    // 19:30 IST = 14:00 UTC
  },

  culturalContext: {
    tradition: "South Indian Tamil Hindu Engagement (Nitchayathartham)",
    status: "confirmed",
    elements: [
      "Traditional Kanchipuram silk saree with royal violet/purple zari border",
      "Traditional South Indian temple gold jewelry & floral veni / malligai",
      "Sacred kuthu vilakku brass lamp lighting",
      "Ceremonial Engagement Ring exchange (Mothiram Mathuthal)",
      "Traditional Thiruvarur cultural heritage"
    ],
    musicReference: {
      status: "noted_from_canva_embed",
      url: "https://open.spotify.com/track/5DM9FesTYD1piLenjk4WBL?si=8378a5645d0946a5"
    }
  }
};

// Export for ES modules or global window attachment
if (typeof module !== "undefined" && module.exports) {
  module.exports = INVITATION_INFO;
}
if (typeof window !== "undefined") {
  window.INVITATION_INFO = INVITATION_INFO;
}
