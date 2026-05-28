import bannerImg from './assets/baner.jpg';
import doctorImg from './assets/doctor.jpg';
import smileDesignImg from './assets/image.jpg';
import case1Before from './assets/c1_before.jpg';
import case1After from './assets/c1_after.jpg';
import case2Before from './assets/c2_before.jpg';
import case2After from './assets/c2_after.jpg';
// ─────────────────────────────────────────────
// ⚠️ LEAD NOTE: Practice has an existing website (eastaustindental.com)
// Squarespace build, ~2014–2016 era. No online booking. Pitch as REBUILD, not new site.
// ─────────────────────────────────────────────

export const dentistConfig = {
  practiceName: "East Austin Dental",

  doctor: {
    name: "Dr. Adrian Bernal",
    credentials: "DDS",
    bio: "Dr. Bernal grew up in San Antonio and served 7 years in the U.S. Army as a combat engineer before earning his biology degree from UT San Antonio and his Doctor of Dental Surgery from UT Health Science Center San Antonio. He gives back to the community through volunteer work with Manos De Cristo, and brings the same precision he developed in the Army to every procedure. Outside the office, he paints, plays music, and competes in olympic-distance triathlons.",
    imagePath: doctorImg // ⚠️ No public doctor photo found - source manually or ask practice
  },

  logoPath: "", // ⚠️ Logo exists on their Squarespace (text-based PNG) - download from:
                // http://static1.squarespace.com/static/53f01311e4b08be4e39bda9c/t/57b71c438419c25f89b56406/1471618128902/EAST+AUSTIN+DENTAL-logo+%281%29+erase.png

  contact: {
    phone: "(512) 499-0067",
    email: "eastaustindental@gmail.com",
    address: "1000 E 5th St, Suite 110, Austin, TX 78702",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:ChIJtZ6Dkq-1RIYRgNWUxzwnGek",
    // ⚠️ Replace YOUR_API_KEY with a real Maps Embed API key before sending demo
    googleMapsLink: "https://www.google.com/maps/search/?api=1&query=East%20Austin%20Dental&query_place_id=ChIJtZ6Dkq-1RIYRgNWUxzwnGek"
  },

  hours: [
    { day: "Monday – Friday", time: "8:00 AM – 4:00 PM" },
    { day: "Saturday – Sunday", time: "Closed" }
  ],

  colors: {
    primary: "#1B2A3B",      // Deep navy - trust, stability, fits veteran identity
    secondary: "#B8860B",    // Dark goldenrod - warm, community, not flashy
    accent: "#F5F7FA",
    background: "#FFFFFF",
    textMuted: "#64748B"
  },

  socialMedia: {
    facebook: "https://www.facebook.com/eastaustindental",
    instagram: "https://www.instagram.com/eastaustindental",
    linkedin: "",
    twitter: ""
  },

  hero: {
    headline: "Dentistry Built on Service - Right Here in East Austin",
    subheadline: "Dr. Adrian Bernal and Dr. John Potter bring honest, thorough care to your neighborhood. No pressure. No unnecessary work. Just a healthy smile.",
    backgroundImage: bannerImg
  },

  smileDesign: {
    title: "Care You Can Trust - From Doctors Who Live It",
    description: "At East Austin Dental, every procedure is treated as a cosmetic one. Dr. Bernal and Dr. Potter work with state-of-the-art dental labs and digital X-ray technology to make sure your results look and feel right - not just checked off a list.",
    features: [
      "Veteran-owned practice with a commitment to precision and integrity",
      "Two experienced doctors - bilingual care available in English and Spanish",
      "Digital X-rays and modern lab partnerships for better outcomes"
    ],
    imagePath: smileDesignImg
  },

  amenities: {
    title: "What Makes Us Different",
    description: "A two-doctor practice in the heart of East Austin - with real community ties and no corporate pressure.",
    items: [
      { name: "Veteran-Owned Practice",         icon: "ShieldCheck" },
      { name: "Bilingual Care (Español)",        icon: "Globe" },
      { name: "Digital X-Ray Technology",        icon: "Activity" },
      { name: "CareCredit Financing Accepted",   icon: "CreditCard" },
      { name: "Community Volunteer Work",        icon: "Heart" },
      { name: "Two Experienced Doctors On-Site", icon: "Users" }
    ]
  },

  services: [
    {
      id: "s1",
      name: "Comprehensive Exams",
      description: "Thorough evaluation of all teeth and supporting structures using digital X-rays to catch what visual exams miss - cavities, infections, bone loss.",
      icon: "Stethoscope"
    },
    {
      id: "s2",
      name: "Cleanings & Gum Care",
      description: "Routine cleanings to prevent gingivitis, plus full periodontal evaluation and scaling/root planing therapy when deeper treatment is needed.",
      icon: "Sparkles"
    },
    {
      id: "s3",
      name: "Tooth-Colored Fillings",
      description: "Cavities treated with composite resin - strong, natural-looking, and free of the old silver amalgam look.",
      icon: "Smile"
    },
    {
      id: "s4",
      name: "Crowns & Bridges",
      description: "Custom crowns and bridges to restore teeth damaged by decay or fracture, using quality materials from state-of-the-art dental labs.",
      icon: "Award"
    },
    {
      id: "s5",
      name: "Root Canal Therapy",
      description: "Tooth-saving root canal treatment for infected or inflamed pulp, with success rates up to 90% when caught and treated properly.",
      icon: "HeartPulse"
    },
    {
      id: "s6",
      name: "Dental Implants",
      description: "Permanent tooth replacement that looks and functions like a natural tooth. Assessed individually to determine the best fit for your situation.",
      icon: "Wrench"
      // ⚠️ Implant dentistry confirmed via their own site nav - verify scope before demo
    },
    {
      id: "s7",
      name: "Emergency Dental Care",
      description: "Same-day or urgent care available for dental emergencies. Call the office directly to discuss your situation.",
      icon: "Calendar"
    },
    {
      id: "s8",
      name: "Veneers",
      description: "Porcelain veneers for smile enhancement - mentioned in their general dentistry offering alongside crowns and cosmetic work.",
      icon: "Sun"
      // ⚠️ Veneers mentioned in their own service copy - confirm they still offer this
    }
  ],

  reviews: [
    { 
      id: "r1",
      name: "Brian Lynch",
      rating: 5,
      text: "I cannot recommend East Austin Dental highly enough, especially for patients with complex dental histories. I came to the practice as a challenging case, having previously undergone extensive craniofacial and jaw surgery along with two …",
      date: "a month ago"
    },
    { 
      id: "r2",
      name: "Mike Anderson",
      rating: 5,
      text: "Dr Potter has been my dentist for a few years now and he and the staff at East Austin Dental are fantastic.  I actually look forward to the 6 month cleanings.  Dr Potter has replaced 3 old fillings with impressive skill.  One was likely to …",
      date: "5 months ago"
    },{ 
      id: "r3",
      name: "Benjamin Buzan",
      rating: 5,
      text: "Went in to get a cleaning and get fitted for trays (I have clenching issues) and I got held up at work and they were EXTREMELY kind and understanding and even saw me anyways when I got there a little late, way better attitude then I was … ",
      date: "5 months ago"
    }
  ],

  cases: [
    {
      id: "c1",
      title: "Crown Restoration",
      description: "Natural-looking ceramic crown replacing a cracked molar.",
      beforeImage: case1Before,
      afterImage: case1After
      // ⚠️ No before/after photos found publicly - use generic or hide this section
    },
    {
      id: "c2",
      title: "Smile Whitening",
      description: "Professional in-office whitening, visibly brighter in a single visit.",
      beforeImage: case2Before,
      afterImage: case2After
    }
  ]
};