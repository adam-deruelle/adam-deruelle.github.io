// Frise du parcours (page Parcours). Textes { fr, en }.
// kind : 'school' (formation), 'work' (entreprise), 'cert' (habilitation), 'goal' (objectif)

export const timeline = [
  {
    kind: 'school',
    period: '2023',
    title: { fr: 'Baccalauréat général', en: 'French Baccalauréat (general)' },
    place: 'Lycée Saint Joseph',
    points: {
      fr: ['Spécialités Mathématiques et Numérique et sciences informatiques (NSI)', 'Physique-chimie en 1ʳᵉ'],
      en: ['Majors: Mathematics and Computer Science (NSI)', 'Physics-chemistry in 11th grade']
    }
  },
  {
    kind: 'school',
    period: '2023 – 2024',
    title: { fr: 'BUT Informatique, 1ʳᵉ année', en: 'BUT in Computer Science, 1st year' },
    place: 'IUT de Lannion',
    points: {
      fr: ['Développement web et logiciel', 'Bases de données', 'Administration système'],
      en: ['Web and software development', 'Databases', 'System administration']
    }
  },
  {
    kind: 'school',
    period: '2024 – 2027',
    title: { fr: 'BUT GEII (Génie électrique et informatique industrielle)', en: 'BUT GEII (Electrical Engineering and Industrial Computing)' },
    place: 'IUT de Rennes',
    points: {
      fr: ['Énergie et maîtrise de l\'électricité', 'Automatisme et informatique industrielle', 'Électronique et systèmes embarqués'],
      en: ['Energy and electrical power', 'Automation and industrial computing', 'Electronics and embedded systems']
    }
  },
  {
    kind: 'work',
    period: '2025 – 2027',
    title: { fr: 'Alternance, service maintenance', en: 'Work-study, maintenance department' },
    place: 'Groupe Rocher, La Gacilly',
    points: {
      fr: ['Maintenance et automatisme sur les équipements de production', "Revamping d'une armoire électropneumatique (environ 100 électrovannes)"],
      en: ['Maintenance and automation on production equipment', 'Revamping of an electro-pneumatic cabinet (about 100 solenoid valves)']
    },
    link: '/projets/armoire'
  },
  {
    kind: 'cert',
    period: null,
    title: { fr: 'Habilitations', en: 'Certifications' },
    place: null,
    points: { fr: ['H0V, BR, BC, B2V'], en: ['French electrical habilitations H0V, BR, BC, B2V'] }
  },
  {
    kind: 'goal',
    period: { fr: 'Septembre 2027', en: 'September 2027' },
    title: { fr: "École d'ingénieur en alternance (FISA)", en: 'Work-study engineering degree (FISA)' },
    place: { fr: 'Robotique ou mécatronique · toute la France', en: 'Robotics or mechatronics · anywhere in France' },
    points: null
  }
]

// Compétences par domaine. Chaque entrée renvoie aux projets où elle a été mise en œuvre.
export const skills = [
  {
    domain: { fr: 'Automatisme', en: 'Automation' },
    items: ['Siemens Step 7', 'CODESYS (LD / ST / SFC)', 'GRAFCET', { fr: 'Forçage et diagnostic de sorties automate', en: 'PLC output forcing and diagnostics' }],
    projects: ['armoire', 'feux']
  },
  {
    domain: { fr: 'Maintenance industrielle', en: 'Industrial maintenance' },
    items: [{ fr: 'Électropneumatique', en: 'Electro-pneumatics' }, { fr: 'Analyse de l\'existant et traçabilité', en: 'Survey and traceability of existing systems' }, { fr: 'Campagnes de tests', en: 'Test campaigns' }, { fr: 'Mise en service', en: 'Commissioning' }],
    projects: ['armoire']
  },
  {
    domain: { fr: 'Robotique', en: 'Robotics' },
    items: [{ fr: 'Modélisation de Denavit–Hartenberg', en: 'Denavit–Hartenberg modelling' }, { fr: 'Architecture logicielle modulaire', en: 'Modular software architecture' }, 'Hiwonder xArm 1S', 'Pololu Zumo'],
    projects: ['talos', 'fiches-survie']
  },
  {
    domain: { fr: 'Électronique et embarqué', en: 'Electronics and embedded systems' },
    items: [{ fr: 'Conception de PCB (Proteus)', en: 'PCB design (Proteus)' }, { fr: 'Gravure et soudure', en: 'Etching and soldering' }, 'PIC (C, MPLAB X + MCC)', 'Raspberry Pi Pico', 'I2C, SPI'],
    projects: ['console', 'feux', 'fiches-survie']
  },
  {
    domain: { fr: 'Programmation', en: 'Programming' },
    items: ['Python / CircuitPython', 'C', 'Unity 6 (VR)', 'Git / GitHub'],
    projects: ['feux', 'console', 'acheron', 'talos']
  }
]
