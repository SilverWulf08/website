/**
 * ============================================
 *  CV CONFIGURATIE BESTAND
 *  Pas hieronder alle gegevens aan.
 *  De website haalt alles automatisch op.
 * ============================================
 */

const CV_CONFIG = {

  /* ── Persoonlijke gegevens ─────────────────── */
  persoonlijk: {
    naam: "Jorik Roosjen",
    foto: "", // pad naar foto, bijv. "foto.jpg" (laat leeg voor initialen-avatar)
    gegevens: [
      { icon: "fa-solid fa-calendar",       label: "Geboortedatum", waarde: "12 November 2004" },
      { icon: "fa-solid fa-location-dot",   label: "Woonplaats",    waarde: "Meppel" },
      { icon: "fa-solid fa-envelope",       label: "E-mail",        waarde: "roosjenjj@gmail.com" },
      { icon: "fa-solid fa-lock",             label: "Session Private messenger",       waarde: "05a4585dc76b46e5c0bc10b44f59066f39742d65edcf58d422241860aeaba91d46" },
    ]
  },

  /* ── Korte introductie ─────────────────────── */
  introductie: `Hallo! Ik ben Jorik, een vriendelijk en gemotiveerd persoon met veel uiteenlopende passies. Hieronder vind je verschillende onderdelen van wie ik ben en wat ik kan.`,

  /* ── Opleidingen ───────────────────────────── */
  opleidingen: [
    {
      titel: "Havo",
      instituut: "VSO de Twijn Zwolle",
      periode: "2017 – 2025",
      beschrijving: "Havo profiel: Natuur en Gezondheid."
    },
  ],

  /* ── Trainingen & Cursussen ────────────────── */
  trainingen: [
    { naam: "Harvard CS50x: Introduction to Computer Science", jaar: "2023 - 2025", link: "https://courses.edx.org/certificates/80f920d4d8eb4264a6cf5989284e5051" },
  ],

  /* ── Werkervaring ──────────────────────────── */
  werkervaring: [
    {
      functie: "Junior software developer",
      bedrijf: "LogisP Zwolle",
      periode: "2025 – 2026",
      beschrijving: "Ik heb hier meegewerkt aan het ontwikkelen van LogisP's applicaties, waarbij ik voornamelijk kleine opdrachten en bugfixes heb uitgevoerd."
    },
    {
      functie: "Stagiair",
      bedrijf: "Deltion College Zwolle",
      periode: "2021 – 2022",
      beschrijving: "Monitoren vervangen, problemen oplossen, laptops imagen, en andere IT-gerelateerde taken uitvoeren."
    },
  ],

  /* ── Vaardigheden ──────────────────────────── */
  vaardigheden: {
    taalbeheersing: [
      { taal: "Nederlands", niveau: "Moedertaal" },
      { taal: "Engels",     niveau: "Vloeiend" },
    ],
    software: [
      "VS Code",
      "Kantoorprogramma's (tekstverwerkers, spreadsheets, Presentaties)",
      "Jira",
      "Azure DevOps",
      "Git & GitHub",
      "verschillende sociale media platforms",
      "Teams outlook en andere Microsoft apps",
      "Audacity",
      "Gimp",
      "Linux",
      "Unity (minimale ervaring)",
    ],
    programmeertalen: [
      { naam: "HTML",        icon: "fa-brands fa-html5",     percentage: 33 },
      { naam: "CSS",         icon: "fa-brands fa-css3-alt",  percentage: 30 },
      { naam: "JavaScript",  icon: "fa-brands fa-js",        percentage: 28 },
      { naam: "TypeScript",  icon: "fa-brands fa-js",        percentage: 23 },
      { naam: "Angular",     icon: "fa-brands fa-angular",   percentage: 10 },
      { naam: "Svelte",      icon: "fa-solid fa-code",       percentage: 5 },
    ]
  },

  /* ── Interesses & aanvullende informatie ──── */
  interesses: [
    "Webontwikkeling",
    "Design",
    "Technologie",
    "Geschiedenis",
    "Maatschappij",
    "Filosofie",
    "Politiek",
    "Videogames",
    "Muziek",
    "Vrienden",
  ],
  aanvullend: `Mijn interesses lopen uiteen van webontwikkeling en design tot technologie, geschiedenis, maatschappij, filosofie en politiek. In mijn vrije tijd speel ik videogames, luister ik muziek en breng ik graag tijd door met vrienden.`,

};

export default CV_CONFIG;
