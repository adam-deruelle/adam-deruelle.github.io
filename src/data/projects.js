// Données des projets. Pour en ajouter un, voir le README (« Ajouter un projet »).
//
// Chaque texte affiché existe en { fr, en }. Une étiquette (tags) peut rester une simple chaîne.
// Sources : README des dépôts GitHub, brief et ancien site d'Adam. Rien d'inventé :
// un contenu manquant est laissé vide ou affiché en placeholder.
//
// Champs d'un projet :
//   slug        identifiant dans l'URL (#/projets/<slug>)
//   type        'pro' | 'perso' | 'cours'
//   featured    position sur l'accueil (1, 2, 3) ; absent = pas sur l'accueil
//   title, summary, context (ligne sous le titre), tags
//   image       image de la carte (WebP dans public/images/projets/<slug>/) ; null = placeholder
//   imageAlt, imagePlaceholder (texte du placeholder, facultatif)
//   github      lien du dépôt ; null = pas de lien
//   details     contenu de la fiche : intro, role[], tech[], results[], table, credits, gallery[]

export const TYPES = ['pro', 'perso', 'cours']

export const projects = [
  {
    slug: 'talos',
    type: 'perso',
    featured: 1,
    title: { fr: 'Talos, assistant robotique', en: 'Talos, robotic assistant' },
    summary: {
      fr: 'Projet de R&D au long cours : un robot capable de percevoir, de comprendre des instructions et de manipuler des objets.',
      en: 'Long-term R&D project: a robot that can perceive, understand instructions and manipulate objects.'
    },
    context: { fr: 'Projet personnel · Phase 1 en cours', en: 'Personal project · Phase 1 in progress' },
    tags: ['xArm 1S', 'Denavit–Hartenberg', 'Python', { fr: 'Architecture modulaire', en: 'Modular architecture' }],
    image: null,
    imageAlt: { fr: 'Bras robotisé xArm 1S du projet Talos', en: 'xArm 1S robot arm from the Talos project' },
    github: 'https://github.com/adam-deruelle/Talos',
    details: {
      intro: {
        fr: "Talos est mon laboratoire de robotique personnel. L'objectif n'est pas de construire rapidement un robot spectaculaire, mais une plateforme robuste, documentée et modulaire, que je pourrai faire évoluer pendant des années : nouveaux capteurs, nouveau bras, vision, langage, apprentissage. Chaque fonctionnalité est comprise, implémentée puis validée sur le matériel réel avant de passer à la suivante.",
        en: 'Talos is my personal robotics lab. The goal is not to build a spectacular robot fast, but a robust, documented and modular platform that I can extend over the years: new sensors, a new arm, vision, language, learning. Every capability is understood, implemented, then validated on real hardware before moving to the next one.'
      },
      role: {
        fr: [
          'Vision du projet, architecture et roadmap en 8 phases.',
          'Architecture en modules indépendants qui fonctionnent en boucle : Observer → Comprendre → Décider → Agir → Vérifier. Chaque module a une responsabilité unique et peut être remplacé sans toucher aux autres.',
          "Modèle cinématique du bras Hiwonder xArm 1S : mesure de chaque segment, définition des repères des articulations, paramètres de Denavit–Hartenberg, offsets angulaires et débattements utiles."
        ],
        en: [
          'Project vision, architecture and 8-phase roadmap.',
          'Architecture made of independent modules running in a closed loop: Observe → Understand → Decide → Act → Verify. Each module has a single responsibility and can be replaced without touching the others.',
          'Kinematic model of the Hiwonder xArm 1S arm: measuring each link, defining the joint frames, Denavit–Hartenberg parameters, joint offsets and useful ranges.'
        ]
      },
      tech: ['Hiwonder xArm 1S (6 servos, USB-HID)', 'Python', 'Tkinter', { fr: 'Console web HTTP/JS', en: 'HTTP/JS web console' }, { fr: 'Cinématique de Denavit–Hartenberg', en: 'Denavit–Hartenberg kinematics' }],
      table: {
        caption: {
          fr: 'Paramètres de Denavit–Hartenberg du xArm 1S. Bras tendu à la verticale, le repère du poignet est à z = 308 mm au-dessus de la base.',
          en: 'Denavit–Hartenberg parameters of the xArm 1S. Fully extended vertically, the wrist frame sits at z = 308 mm above the base.'
        },
        head: { fr: ['Articulation', 'Servo', 'α (°)', 'd (mm)', 'a (mm)'], en: ['Joint', 'Servo', 'α (°)', 'd (mm)', 'a (mm)'] },
        rows: [
          [{ fr: 'J1 — base', en: 'J1 — base' }, '6', '90', '32', '0'],
          [{ fr: 'J2 — épaule', en: 'J2 — shoulder' }, '5', '0', '0', '33'],
          [{ fr: 'J3 — coude', en: 'J3 — elbow' }, '4', '0', '0', '101'],
          [{ fr: 'J4 — flexion poignet', en: 'J4 — wrist flex' }, '3', '−90', '0', '90'],
          [{ fr: 'J5 — rotation poignet', en: 'J5 — wrist rotation' }, '2', '0', '0', '52'],
          [{ fr: 'Outil (pince)', en: 'Tool (gripper)' }, '1', '—', '—', '85']
        ]
      },
      results: {
        fr: [
          'Phase 0 (préparation : vision, architecture, roadmap, environnement) terminée.',
          'Phase 1 (Mk I, maîtrise du bras) en cours : mouvements manuels et programmés, poses, séquences, calibration.',
          "Le modèle cinématique est utilisé par le logiciel Talos Studio : cinématique directe et inverse, poses enregistrées, enregistrement et relecture de gestes, séquenceur par blocs, console web, pilotage par téléphone."
        ],
        en: [
          'Phase 0 (preparation: vision, architecture, roadmap, dev environment) completed.',
          'Phase 1 (Mk I, arm mastery) in progress: manual and programmed motion, poses, sequences, calibration.',
          'The kinematic model powers the Talos Studio software: forward and inverse kinematics, saved poses, gesture recording and replay, block-based sequencer, web console, phone control.'
        ]
      },
      credits: {
        fr: 'Vision, architecture et modèle cinématique : Adam Deruelle. Logiciel de contrôle Talos Studio : Harry Troule, développé avec Claude Code.',
        en: 'Vision, architecture and kinematic model: Adam Deruelle. Talos Studio control software: Harry Troule, developed with Claude Code.'
      },
      gallery: [{ src: null, placeholder: { fr: '[VIDÉO DU BRAS À VENIR]', en: '[ARM VIDEO COMING SOON]' } }]
    }
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
    context: { fr: 'Alternance · Groupe Rocher, service maintenance', en: 'Work-study · Groupe Rocher, maintenance department' },
    tags: ['Siemens Step 7', 'VAT', { fr: 'Électropneumatique', en: 'Electro-pneumatics' }, { fr: 'Mise en service', en: 'Commissioning' }],
    image: null,
    imageAlt: { fr: 'Armoire électropneumatique', en: 'Electro-pneumatic cabinet' },
    github: null,
    details: {
      intro: {
        fr: "Dans le cadre de mon alternance au service maintenance du Groupe Rocher, j'ai travaillé sur le revamping d'une armoire électropneumatique qui pilote environ 100 électrovannes.",
        en: 'As part of my work-study at the Groupe Rocher maintenance department, I worked on the revamping of an electro-pneumatic cabinet driving about 100 solenoid valves.'
      },
      role: {
        fr: [
          "Analyse de l'existant, menée en 5 étapes.",
          'Traçabilité complète de chaque électrovanne jusqu\'au relais puis à la sortie automate.',
          'Forçage des sorties automate (Siemens Step 7, VAT) pour identifier et vérifier chaque voie.',
          'Dimensionnement de la nouvelle installation : 11 modules de 9 électrovannes.',
          'Installation en 2 phases, pendant les arrêts techniques, pour ne pas bloquer la production.',
          '3 campagnes de tests, puis mise en service.'
        ],
        en: [
          'Survey of the existing installation, carried out in 5 steps.',
          'Full traceability from each solenoid valve to its relay and PLC output.',
          'Forcing PLC outputs (Siemens Step 7, VAT) to identify and check each channel.',
          'Sizing of the new installation: 11 modules of 9 solenoid valves.',
          'Installation in 2 phases during scheduled shutdowns, so production was not blocked.',
          '3 test campaigns, then commissioning.'
        ]
      },
      tech: ['Siemens Step 7', { fr: 'Table de visualisation (VAT)', en: 'Variable table (VAT)' }, { fr: 'Électropneumatique', en: 'Electro-pneumatics' }, { fr: 'Relais et sorties automate', en: 'Relays and PLC outputs' }],
      results: {
        fr: ['Mise en service complète de l\'armoire.'],
        en: ['Cabinet fully commissioned.']
      },
      gallery: [
        { src: null, placeholder: { fr: "[PHOTO DE L'ARMOIRE À VENIR]", en: '[CABINET PHOTO COMING SOON]' } },
        { src: null, placeholder: { fr: '[PHOTO DES MODULES À VENIR]', en: '[MODULES PHOTO COMING SOON]' } }
      ]
    }
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
    context: { fr: 'SAÉ 4, BUT GEII, 2025 · avec Melvin Allard', en: 'SAÉ 4 (university project), BUT GEII, 2025 · with Melvin Allard' },
    tags: ['GRAFCET', 'Raspberry Pi Pico', 'CircuitPython', 'CODESYS'],
    image: '/images/projets/feux/carte.webp',
    imageAlt: {
      fr: 'Carte du contrôleur de feux : Raspberry Pi Pico, écran OLED affichant « Mode : jour/nuit », LED de feux et boutons',
      en: 'Traffic light controller board: Raspberry Pi Pico, OLED screen showing day/night mode, light LEDs and buttons'
    },
    github: 'https://github.com/adam-deruelle/pico-traffic-light-controller',
    details: {
      intro: {
        fr: "Contrôleur de feux de circulation à deux voies, avec priorité piéton, modes jour/nuit, menu de réglage embarqué et détection de panne. La logique séquentielle a été conçue en GRAFCET, puis implémentée en CircuitPython et dans les langages IEC 61131-3 sous CODESYS.",
        en: 'Two-lane traffic light controller with pedestrian priority, day/night modes, on-board settings menu and fault detection. The sequential logic was designed as a GRAFCET, then implemented in CircuitPython and in IEC 61131-3 languages on CODESYS.'
      },
      role: {
        fr: [
          "Modélisation du comportement en GRAFCET, puis traduction étape par étape en code : chaque étape est une variable (X0, X10…), chaque transition une condition booléenne, et les sorties sont recalculées à chaque cycle, comme dans un programme d'automate.",
          'Classe TON qui reproduit sur microcontrôleur la temporisation au travail IEC 61131-3 des automates industriels.',
          'Priorité piéton (deux boutons), détection de véhicule, modes jour / nuit / automatique.',
          'Menu de réglage sur écran OLED SPI avec trois boutons (Menu / + / −) pour modifier en direct la durée de chaque feu.',
          "Détection de panne sur une entrée analogique (seuil > 3 V) : erreur affichée, feux figés ou éteints selon le mode.",
          'Même logique réécrite sous CODESYS en Ladder (LD), Structured Text (ST) et SFC.'
        ],
        en: [
          'Modelled the behaviour as a GRAFCET, then translated it step by step into code: each step is a variable (X0, X10…), each transition a boolean condition, and outputs are recomputed every cycle, like a PLC program.',
          'TON class reproducing the IEC 61131-3 on-delay timer of industrial PLCs on a microcontroller.',
          'Pedestrian priority (two buttons), vehicle detection, day / night / automatic modes.',
          'Settings menu on an SPI OLED screen with three buttons (Menu / + / −) to tune each light duration live.',
          'Fault detection on an analog input (threshold > 3 V): error displayed, lights frozen or switched off depending on the mode.',
          'Same logic rewritten on CODESYS in Ladder (LD), Structured Text (ST) and SFC.'
        ]
      },
      tech: ['Raspberry Pi Pico', 'CircuitPython', { fr: 'Écran OLED SPI', en: 'SPI OLED display' }, 'CODESYS (LD / ST / SFC)', 'GRAFCET'],
      table: {
        caption: { fr: 'Cycle principal du GRAFCET', en: 'Main GRAFCET cycle' },
        head: { fr: ['Étape', 'Voie 1', 'Voie 2'], en: ['Step', 'Lane 1', 'Lane 2'] },
        rows: [
          ['X0', { fr: 'Vert', en: 'Green' }, { fr: 'Rouge', en: 'Red' }],
          ['X10 → X20', { fr: 'Orange → Rouge', en: 'Amber → Red' }, { fr: 'Rouge', en: 'Red' }],
          ['X30 → X50', { fr: 'Rouge', en: 'Red' }, { fr: 'Vert → Orange', en: 'Green → Amber' }],
          ['X60', { fr: 'Rouge', en: 'Red' }, { fr: 'Rouge → retour à X0', en: 'Red → back to X0' }]
        ]
      },
      results: {
        fr: [
          'Programme complet et fonctionnel sur la carte (code6.py), construit en 6 versions successives, chacune testée avant la suivante.',
          'La même logique tourne sur microcontrôleur et en environnement automate.'
        ],
        en: [
          'Complete program running on the board (code6.py), built in 6 incremental versions, each tested before the next.',
          'The same logic runs on a microcontroller and in a PLC environment.'
        ]
      },
      gallery: [
        { src: '/images/projets/feux/carte.webp', alt: { fr: 'Carte en mode jour/nuit', en: 'Board in day/night mode' } },
        { src: '/images/projets/feux/carte-2.webp', alt: { fr: 'Carte en mode nuit, écran OLED affichant « Mode : nuit »', en: 'Board in night mode, OLED screen showing night mode' } }
      ]
    }
  },
  {
    slug: 'console',
    type: 'cours',
    title: { fr: 'Console de jeu portable', en: 'Handheld game console' },
    summary: {
      fr: 'PCB conçu sous Proteus, gravé, soudé et mis en boîtier 3D, avec 3 jeux en CircuitPython.',
      en: 'PCB designed in Proteus, etched, soldered and fitted in a 3D-printed case, with 3 games in CircuitPython.'
    },
    context: { fr: 'SAÉ 2, BUT GEII, 2024-25', en: 'SAÉ 2 (university project), BUT GEII, 2024-25' },
    tags: ['Proteus', 'Raspberry Pi Pico', 'ST7735', 'CircuitPython'],
    image: null,
    imageAlt: { fr: 'Console de jeu portable', en: 'Handheld game console' },
    github: null,
    details: {
      intro: {
        fr: "Conception et fabrication d'une console de jeu portable, de la carte électronique jusqu'aux jeux.",
        en: 'Design and build of a handheld game console, from the circuit board to the games.'
      },
      role: {
        fr: [
          'Conception du PCB sous Proteus : Raspberry Pi Pico, écran ST7735, croix directionnelle, haut-parleur.',
          'Fabrication : gravure et soudure de la carte, boîtier imprimé en 3D.',
          'Programmation de 3 jeux en CircuitPython. Les graphismes et les modules ont été fournis par l\'équipe pédagogique ; le code des jeux est le mien.'
        ],
        en: [
          'PCB design in Proteus: Raspberry Pi Pico, ST7735 screen, directional pad, speaker.',
          'Manufacturing: etching and soldering the board, 3D-printed case.',
          'Programming 3 games in CircuitPython. Graphics and modules were provided by the teaching staff; the game code is mine.'
        ]
      },
      tech: ['Proteus', 'Raspberry Pi Pico', { fr: 'Écran ST7735', en: 'ST7735 screen' }, 'CircuitPython', { fr: 'Impression 3D', en: '3D printing' }],
      results: null,
      gallery: [
        { src: null, placeholder: { fr: '[ROUTAGE DU PCB À VENIR]', en: '[PCB LAYOUT COMING SOON]' } },
        { src: null, placeholder: { fr: '[PHOTO DE LA CONSOLE À VENIR]', en: '[CONSOLE PHOTO COMING SOON]' } }
      ]
    }
  },
  {
    slug: 'acheron',
    type: 'cours',
    title: { fr: 'Acheron: Echoes of the Deep', en: 'Acheron: Echoes of the Deep' },
    summary: {
      fr: 'Escape game en réalité virtuelle à 2 joueurs (casque + carnet), avec des énigmes de génie électrique. En cours.',
      en: 'Two-player VR escape game (headset + logbook) with electrical-engineering puzzles. In progress.'
    },
    context: { fr: 'Projet universitaire, BUT GEII · équipe de 4 · en cours', en: 'University project, BUT GEII · team of 4 · in progress' },
    tags: ['Unity 6', 'Meta Quest 3', 'VR', 'OpenXR'],
    image: null,
    imageAlt: { fr: "Capture d'Acheron, escape game VR", en: 'Acheron VR escape game screenshot' },
    github: 'https://github.com/adam-deruelle/Acheron-Echoes-Of-The-Deep',
    details: {
      intro: {
        fr: "Escape game VR à deux joueurs dans une base sous-marine engloutie : un joueur dans le casque, l'autre à l'extérieur avec le carnet technique. Ils ne peuvent s'échapper qu'en communiquant. Objectif : un tutoriel jouable pour la journée portes ouvertes de l'IUT, en février 2027.",
        en: 'Two-player VR escape game set in a sunken underwater facility: one player in the headset, the other outside with the technical logbook. They can only escape by talking to each other. Target: a playable tutorial for the IUT open day in February 2027.'
      },
      role: {
        fr: [
          "Coopération asymétrique : le joueur en VR explore la base et interagit avec les machines ; l'autre tient le carnet avec les schémas et les données.",
          'Énigmes basées sur les notions de notre formation GEII, par exemple : équilibrer trois vannes à l\'aide des manomètres et de la pression maximale de la pompe, ou décoder six lampes en morse.',
          'Projet Unity VR créé et versionné sur GitHub.'
        ],
        en: [
          'Asymmetric co-op: the VR player explores the facility and interacts with machines; the other holds the logbook with schematics and data.',
          'Puzzles built on concepts from our electrical engineering degree, for example: balancing three valves using pressure gauges and the pump\'s maximum pressure, or decoding six Morse lamps.',
          'Unity VR project set up and versioned on GitHub.'
        ]
      },
      tech: ['Unity 6 (URP)', 'XR Interaction Toolkit 3.4', 'XR Hands', 'OpenXR', 'Meta Quest 3'],
      results: {
        fr: ['En développement : tutoriel (~5 min) visé pour la JPO de février 2027.'],
        en: ['In development: tutorial (~5 min) targeted for the February 2027 open day.']
      },
      credits: { fr: 'Équipe : Adam Deruelle, Lucas, Baptiste, Ewen.', en: 'Team: Adam Deruelle, Lucas, Baptiste, Ewen.' },
      gallery: [{ src: null, placeholder: { fr: '[CAPTURE DU CASQUE À VENIR]', en: '[HEADSET SCREENSHOT COMING SOON]' } }]
    }
  },
  {
    slug: 'fiches-survie',
    type: 'cours',
    title: { fr: 'Fiches de survie C et CircuitPython', en: 'C and CircuitPython survival sheets' },
    summary: {
      fr: 'Synthèses rédigées pour ma promo : PIC en C, mesure de distance, robot Zumo, I2C et accéléromètre.',
      en: 'Cheat sheets written for my class: PIC in C, distance measurement, Zumo robot, I2C and accelerometer.'
    },
    context: { fr: 'BUT GEII, 2025 · APP (apprentissages par problèmes)', en: 'BUT GEII, 2025 · problem-based learning modules' },
    tags: ['C', 'MPLAB X + MCC', 'CircuitPython', 'I2C', 'Pololu Zumo'],
    image: null,
    imageAlt: { fr: 'Fiches de survie', en: 'Survival sheets' },
    github: 'https://github.com/adam-deruelle/fiches_survie',
    details: {
      intro: {
        fr: "Chaque APP arrivait avec des dizaines de pages de cours, de datasheets et de code généré. J'en ai tiré des fiches pratiques pour ma promo, en ne gardant que l'essentiel : quoi inclure, quelle fonction fait quoi, et le chemin le plus court vers un code qui fonctionne.",
        en: 'Each module came with dozens of pages of course material, datasheets and generated code. I distilled them into hands-on sheets for my class, keeping only the essentials: what to include, which function does what, and the shortest path to working code.'
      },
      role: {
        fr: [
          'C embarqué (PIC, MPLAB X + MCC) : premiers pas avec MCC, lecture ADC, compteur, affichage, temporisations ; mesure de distance par trois méthodes ; déplacements du robot Zumo (moteurs, virages, rotation sur place, choix du mode).',
          "CircuitPython : scan du bus I2C, lecture de l'accéléromètre, calibration par moyennage.",
          'Structure identique pour chaque fiche : modules à importer, tableau des fonctions, tutos progressifs avec code commenté, pistes pour aller plus loin.'
        ],
        en: [
          'Embedded C (PIC, MPLAB X + MCC): first steps with MCC, ADC reading, counter, display, delays; distance measurement with three methods; Zumo robot motion (motors, turns, spin in place, mode selection).',
          'CircuitPython: I2C bus scan, accelerometer reading, calibration by averaging.',
          'Same structure for every sheet: modules to import, function reference table, progressive tutorials with commented code, ideas to go further.'
        ]
      },
      tech: ['C', 'MPLAB X + MCC', 'CircuitPython', 'I2C', 'Pololu Zumo'],
      results: {
        fr: ["Les rédiger m'a obligé à comprendre chaque sujet assez bien pour l'expliquer simplement, et elles ont fait gagner du temps de recherche à ma promo."],
        en: ['Writing them forced me to understand each topic well enough to explain it simply, and they saved my classmates a lot of searching time.']
      },
      gallery: []
    }
  },
  {
    slug: 'variateur',
    type: 'cours',
    title: { fr: 'Variateur LED sans contact', en: 'Contactless LED dimmer' },
    summary: {
      fr: 'Variateur de lumière à base de PIC16F18446, qui adapte la luminosité à l\'éclairage de la pièce.',
      en: 'Light dimmer built around a PIC16F18446 that adapts brightness to the room lighting.'
    },
    context: { fr: 'SAÉ 1, BUT GEII, 2024 · avec Antoine Conty', en: 'SAÉ 1 (university project), BUT GEII, 2024 · with Antoine Conty' },
    tags: ['PIC16F18446', 'LM2576', 'TEMT6000', 'TCRT5000', 'IRF520'],
    image: null,
    imageAlt: { fr: 'Variateur LED', en: 'LED dimmer' },
    github: null,
    details: {
      intro: {
        fr: "Prototype de variateur de lumière inspiré d'un produit existant, auquel nous avons ajouté la détection automatique de la luminosité à produire en fonction de l'éclairage de la pièce.",
        en: 'Light dimmer prototype inspired by an existing product, to which we added automatic adjustment of the light output based on the room lighting.'
      },
      role: {
        fr: [
          "Reprise d'un schéma existant et analyse fonctionnelle pour pouvoir prototyper la carte.",
          'Prototype autour du PIC16F18446 : régulateur LM2576, capteur de luminosité TEMT6000, capteur infrarouge TCRT5000, MOSFET IRF520.',
          'Tests de validation, de TP1 à TP11.',
          'Compte rendu avec un dossier de fabrication : les schémas réalisés, chacun accompagné d\'une explication.'
        ],
        en: [
          'Took over an existing schematic and carried out a functional analysis to prototype the board.',
          'Prototype built around the PIC16F18446: LM2576 regulator, TEMT6000 light sensor, TCRT5000 infrared sensor, IRF520 MOSFET.',
          'Validation tests, TP1 to TP11.',
          'Report including a manufacturing file: every schematic, each with an explanation.'
        ]
      },
      tech: ['PIC16F18446', 'LM2576', 'TEMT6000', 'TCRT5000', 'IRF520'],
      results: null,
      gallery: []
    }
  }
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured - b.featured)

export const getProject = (slug) => projects.find((p) => p.slug === slug)
