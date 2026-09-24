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
      { icon: "fa-solid fa-phone",          label: "Telefoonnummer",       waarde: "0643424570" },
    ]
  },

  /* ── Korte introductie ─────────────────────── */
  introductie: `Hallo! Ik ben Jorik, een vriendelijk en gemotiveerd persoon met veel uiteenlopende passies. Hieronder vind je verschillende onderdelen van wie ik ben en wat ik kan.`,

  /* ── Profielschets ──────────────────────────── */
  profielschets: `Hallo, mijn naam is Jorik. Ik ben in 2004 geboren en woon op dit moment in mijn ouderlijk huis. Ik heb veel uiteenlopende passies en interesses waaronder politiek, geschiedenis, wetenschap, technologie, games, psychologie, sociale structuren en nog veel meer.
Ik ben een zeer betrouwbaar en nauwlettend persoon die erg gericht is op nauwkeurig en zorgvuldig werk. Daarnaast beschik ik over sterke en duidelijke communicatieve vaardigheden en kritisch denkvermogen. Ik heb een diagnose voor ASS en NAH, daarom komen mijn kwaliteiten het meest tot z'n recht als mijn arbeidsvoorwaarden worden gerespecteerd.
Hier zijn een aantal belangrijke voorwaarden die ik nodig heb om mijn werk goed uit te kunnen voeren:
- Mogelijkheid om op een vaste dag(en) thuis te werken en incidenteel thuis te werken.
- Werken in een rustige prikkelarme omgeving.
- Geen hoge werkdruk (niet teveel werk op mijn bordje).
- Maximaal 24 uur per week werken, 4 dagen in de week. 1 rustdag in de week is cruciaal.
- Genoeg tijd om opdrachten/projecten uit te kunnen voeren.
- Open en duidelijke communicatie.
- Een enthousiaste en positieve werksfeer.
Mijn beperkingen uiten zich het meeste in een tekort aan energie en een laag werktempo. Om deze redenen zijn deze arbeidsvoorwaarden van groot belang. Wanneer er aan deze voorwaarden wordt voldaan ben ik in staat om te werken en het beste uit mezelf te halen. Als dit niet zo is, ben ik minder productief of kan ik mijn werk helemaal niet doen.`,

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
      beschrijving: "Ik heb hier meegewerkt aan het ontwikkelen van LogisP's applicaties."
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
      "Krita",
    ],
    kwaliteiten: [
      { naam: "Nauwkeurigheid",      icon: "fa-solid fa-check-double", percentage: 92 },
      { naam: "Communicatie",        icon: "fa-solid fa-comments",      percentage: 88 },
      { naam: "Samenwerken",         icon: "fa-solid fa-users",         percentage: 77 },
      { naam: "Organisatie",         icon: "fa-solid fa-list-check",    percentage: 66 },
      { naam: "Verantwoordelijkheid",icon: "fa-solid fa-user-check",   percentage: 82 },
      { naam: "Flexibiliteit",       icon: "fa-solid fa-arrows-spin",  percentage: 28 },
    ]
  },

  /* ── Interesses & aanvullende informatie ──── */
  interesses: [
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
  aanvullend: `Mijn interesses lopen uiteen van technologie en design tot geschiedenis, maatschappij, filosofie en politiek. In mijn vrije tijd speel ik videogames, luister ik muziek en breng ik graag tijd door met vrienden.`,

};

export default CV_CONFIG;
