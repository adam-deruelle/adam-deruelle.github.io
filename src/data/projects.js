// Données des projets. Pour en ajouter un, voir le README (« Ajouter un projet »).
// Chaque texte affiché existe en { fr, en } (une étiquette peut rester une simple chaîne). Une image à null affiche un placeholder.
// Sources des textes : README des dépôts GitHub et CV d'Adam. Rien d'inventé.

export const TYPES = ['pro', 'perso', 'cours']

export const projects = [
  {
    slug: 'talos',
    type: 'perso',
    featured: 1, // ordre d'apparition sur l'accueil (absent = pas mis en avant)
    title: { fr: 'Talos, assistant robotique', en: 'Talos, robotic assistant' },
    summary: {
      fr: 'Projet de R&D au long cours : un robot capable de percevoir, de comprendre des instructions et de manipuler des objets.',
      en: 'Long-term R&D project: a robot that can perceive, understand instructions and manipulate objects.'
    },
    context: null,
    tags: ['xArm 1S', 'Denavit–Hartenberg', 'Python', { fr: 'Architecture modulaire', en: 'Modular architecture' }],
    image: null,
    imageAlt: { fr: 'Bras robotisé xArm 1S du projet Talos', en: 'xArm 1S robot arm from the Talos project' },
    github: 'https://github.com/adam-deruelle/Talos'
  },
  {
    slug: 'armoire',
    type: 'pro',
    featured: 2,
    title: { fr: "Revamping d'une armoire électropneumatique", en: 'Revamping an electro-pneumatic cabinet' },
    summary: {
      fr: "Environ 100 électrovannes : analyse de l'existant, dimensionnement, installation pendant les arrêts techniques et mise en service.",
      en: 'About 100 solenoid valves: survey of the existing system, sizing, installation during shutdowns and commissioning.'
    },
    context: { fr: 'Alternance, Groupe Rocher', en: 'Work-study, Groupe Rocher' },
    tags: ['Siemens Step 7', 'VAT', { fr: 'Électropneumatique', en: 'Electro-pneumatics' }, { fr: 'Mise en service', en: 'Commissioning' }],
    image: null, // photos uniquement après accord du tuteur
    imageAlt: { fr: 'Armoire électropneumatique', en: 'Electro-pneumatic cabinet' },
    imagePlaceholder: { fr: "[PHOTO SOUS RÉSERVE D'ACCORD]", en: '[PHOTO PENDING APPROVAL]' },
    github: null
  },
  {
    slug: 'feux',
    type: 'cours',
    featured: 3,
    title: { fr: 'Contrôleur de feux de circulation', en: 'Traffic light controller' },
    summary: {
      fr: 'Feux à deux voies avec priorité piéton, modes jour/nuit, menu OLED et détection de panne. Du GRAFCET au CircuitPython et à CODESYS.',
      en: 'Two-lane lights with pedestrian priority, day/night modes, OLED menu and fault detection. From GRAFCET to CircuitPython and CODESYS.'
    },
    context: { fr: 'SAÉ 4, 2025 · avec Melvin Allard', en: 'SAÉ 4 (university project), 2025 · with Melvin Allard' },
    tags: ['GRAFCET', 'Raspberry Pi Pico', 'CircuitPython', 'CODESYS'],
    image: '/images/projets/feux/carte.webp',
    imageAlt: {
      fr: 'Carte du contrôleur de feux : Raspberry Pi Pico, écran OLED affichant « Mode : jour/nuit », LED de feux et boutons',
      en: 'Traffic light controller board: Raspberry Pi Pico, OLED screen showing day/night mode, light LEDs and buttons'
    },
    github: 'https://github.com/adam-deruelle/pico-traffic-light-controller'
  },
  {
    slug: 'console',
    type: 'cours',
    title: { fr: 'Console de jeu portable', en: 'Handheld game console' },
    summary: {
      fr: 'PCB conçu sous Proteus, gravé, soudé et mis en boîtier 3D, avec 3 jeux en CircuitPython.',
      en: 'PCB designed in Proteus, etched, soldered and fitted in a 3D-printed case, with 3 games in CircuitPython.'
    },
    context: { fr: 'SAÉ 2, 2024-25', en: 'SAÉ 2 (university project), 2024-25' },
    tags: ['Proteus', 'Raspberry Pi Pico', 'ST7735', 'CircuitPython'],
    image: null,
    imageAlt: { fr: 'Console de jeu portable', en: 'Handheld game console' },
    github: null
  },
  {
    slug: 'acheron',
    type: 'cours',
    title: { fr: 'Acheron: Echoes of the Deep', en: 'Acheron: Echoes of the Deep' },
    summary: {
      fr: 'Escape game en réalité virtuelle à 2 joueurs (casque + carnet), avec des énigmes GEII. En cours.',
      en: 'Two-player VR escape game (headset + notebook) with electrical-engineering puzzles. In progress.'
    },
    context: { fr: 'Projet en équipe de 4, objectif JPO février 2027', en: 'Team of 4, target: open day, February 2027' },
    tags: ['Unity 6', 'Meta Quest 3', 'VR'],
    image: null,
    imageAlt: { fr: 'Acheron, escape game VR', en: 'Acheron VR escape game' },
    github: 'https://github.com/adam-deruelle/Acheron-Echoes-Of-The-Deep'
  },
  {
    slug: 'fiches-survie',
    type: 'cours',
    title: { fr: 'Fiches de survie C et CircuitPython', en: 'C and CircuitPython survival sheets' },
    summary: {
      fr: 'Synthèses rédigées pour la promo : PIC/MCC, capteurs de distance, robot Zumo, I2C et accéléromètre.',
      en: 'Summary sheets written for my class: PIC/DC motor, distance sensors, Zumo robot, I2C and accelerometer.'
    },
    context: null,
    tags: ['C', 'CircuitPython', 'PIC', 'I2C'],
    image: null,
    imageAlt: { fr: 'Fiches de survie', en: 'Survival sheets' },
    github: 'https://github.com/adam-deruelle/fiches_survie'
  },
  {
    slug: 'variateur',
    type: 'cours',
    title: { fr: 'Variateur LED sans contact', en: 'Contactless LED dimmer' },
    summary: {
      fr: 'Variateur de lumière à base de PIC16F18446, avec capteur de luminosité et capteur infrarouge.',
      en: 'Light dimmer built around a PIC16F18446, with an ambient light sensor and an infrared sensor.'
    },
    context: { fr: 'SAÉ 1, 2024 · avec Antoine Conty', en: 'SAÉ 1 (university project), 2024 · with Antoine Conty' },
    tags: ['PIC16F18446', 'LM2576', 'TEMT6000', 'TCRT5000'],
    image: null,
    imageAlt: { fr: 'Variateur LED', en: 'LED dimmer' },
    github: null
  }
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured - b.featured)

export const getProject = (slug) => projects.find((p) => p.slug === slug)
