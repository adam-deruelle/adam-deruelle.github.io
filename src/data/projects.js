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
//   imageFit    'contain' pour afficher l'image en entier (rendu détouré) ; sinon recadrée
//   cardVideo   { src, poster } : vidéo muette en boucle à la place de l'image sur les cartes (poster seul si animation réduite)
//   imagePosition  point de cadrage, ex. '50% 20%' (facultatif)
//   gallery[]   { src, alt } ; options : fit: 'contain', tall: true (photo verticale),
//               wide: true (sur toute la largeur), pixel: true (pixel art, sans lissage)
//               vidéo : { video, poster, alt } (fichier MP4 sans piste audio)
//   details.story[]  section « En détail » : { title: { fr, en }, body: { fr, en } }
//               le bloc dont le titre commence par « Ce que j'en retiens » devient la carte mise en avant
//   details.stats[]  chiffres clés : { value (texte ou { fr, en }), label: { fr, en } }
//   details.lesson   citation de la carte « Ce que j'en retiens » : { fr, en }
//   details.compare  comparateur avant/après : { before: { src, alt }, after: { src, alt } }
//   gallery[].link   true = l'image s'ouvre en grand au clic
//               body = paragraphes séparés par une ligne vide ; **gras** et *italique* autorisés
//   github      lien du dépôt ; null = pas de lien
//   details     contenu de la fiche : intro, role[], tech[], results[], table, credits[], gallery[]
//               credits = [{ name, role: { fr, en } }] (role facultatif)

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
    image: '/images/projets/talos/xarm.webp',
    cardVideo: { src: '/images/projets/talos/talos-boucle.mp4', poster: '/images/projets/talos/talos-boucle-poster.webp' },
    imageFit: 'contain', // rendu détouré : affiché en entier
    imageAlt: { fr: 'Bras robotisé Hiwonder xArm 1S utilisé dans Talos', en: 'Hiwonder xArm 1S robot arm used in Talos' },
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
      credits: [
        { name: 'Adam Deruelle', role: { fr: 'Vision, architecture et roadmap · modèle cinématique du bras', en: 'Vision, architecture and roadmap · kinematic model of the arm' } },
        { name: 'Harry Troule', role: { fr: 'Logiciel de contrôle Talos Studio, développé avec Claude Code', en: 'Talos Studio control software, developed with Claude Code' } }
      ],
      stats: [
        { value: '6', label: { fr: 'servos', en: 'servos' } },
        { value: '8', label: { fr: 'phases', en: 'phases' } },
        { value: 'z\u00a0=\u00a0308\u00a0mm', label: { fr: 'validation du modèle', en: 'model check' } }
      ],
      lesson: {
        fr: 'Un modèle cinématique propre sert de base à tout le reste.',
        en: 'A clean kinematic model is the foundation for everything else.'
      },
      story: [
        {
          title: {
            fr: "Le point de départ",
            en: "The starting point"
          },
          body: {
            fr: "Je voulais un projet de robotique à moi, qui dure plus qu'un semestre : un assistant capable, à terme, de percevoir son environnement, de comprendre une demande et de manipuler des objets. Plutôt que viser tout de suite un robot spectaculaire, j'ai choisi de construire une plateforme que je fais grandir étape par étape.",
            en: "I wanted a robotics project of my own, one that lasts longer than a semester: an assistant that can eventually perceive its surroundings, understand a request and handle objects. Instead of aiming straight for a spectacular robot, I chose to build a platform that grows step by step."
          }
        },
        {
          title: {
            fr: "Ma démarche",
            en: "My approach"
          },
          body: {
            fr: "**Poser le cadre avant de coder.** La phase 0 a servi à écrire la vision, l'architecture (des modules indépendants qui tournent en boucle : Observer → Comprendre → Décider → Agir → Vérifier) et une roadmap en 8 phases. Une règle s'applique à tout : chaque capacité est comprise, implémentée puis validée sur le vrai matériel avant de passer à la suivante.\n\n**Commencer par un bras accessible.** Pour la phase 1, j'ai pris le Hiwonder xArm 1S, un bras à 6 servos. J'ai mesuré chaque segment, placé les repères de chaque articulation bras tendu à la verticale, puis construit dans un tableur la table de Denavit–Hartenberg et les matrices de transformation. Elles donnent la position et l'orientation de la pince à partir des angles des servos.",
            en: "**Set the frame before coding.** Phase 0 was for writing the vision, the architecture (independent modules running in a loop: Observe → Understand → Decide → Act → Verify) and an 8-phase roadmap. One rule applies throughout: every capability is understood, implemented, then validated on real hardware before moving on.\n\n**Start with an affordable arm.** For phase 1, I picked the Hiwonder xArm 1S, a 6-servo arm. I measured every link, placed the frame of each joint with the arm fully extended upright, then built the Denavit–Hartenberg table and the transformation matrices in a spreadsheet. They give the position and orientation of the gripper from the servo angles."
          }
        },
        {
          title: {
            fr: "Ce qui a coincé",
            en: "What went wrong"
          },
          body: {
            fr: "Faire coïncider le modèle et le vrai bras : l'offset de 90° sur l'épaule, le sens de rotation de chaque servo, les débattements réels. Mon test de validation : bras tendu à la verticale, le modèle doit donner x = 0, y = 0 et z = 308 mm au poignet.",
            en: "Getting the model to match the real arm: the 90° offset on the shoulder, the rotation direction of each servo, the real joint ranges. My validation test: with the arm fully extended upright, the model must give x = 0, y = 0 and z = 308 mm at the wrist."
          }
        },
        {
          title: {
            fr: "Ce que j'en retiens, et la suite",
            en: "What I took away, and what's next"
          },
          body: {
            fr: "Un modèle cinématique propre sert de base à tout le reste. C'est sur lui que s'appuie Talos Studio, le logiciel de contrôle développé par Harry Troule (cinématique inverse, séquences, pilotage). Prochaines étapes : fiabiliser la calibration et les séquences, puis passer au Mk II (bras sur rail) et à la vision.",
            en: "A clean kinematic model is the foundation for everything else. It is what Talos Studio, the control software developed by Harry Troule, is built on (inverse kinematics, sequences, control). Next steps: make calibration and sequences reliable, then move on to the Mk II (arm on a rail) and to vision."
          }
        }
      ],
      gallery: [
        { src: '/images/projets/talos/xarm.webp', fit: 'contain', alt: { fr: 'Le bras Hiwonder xArm 1S', en: 'The Hiwonder xArm 1S arm' } },
        { video: '/images/projets/talos/talos-demo.mp4', poster: '/images/projets/talos/talos-demo-poster.webp', tall: true, alt: { fr: 'Le bras xArm 1S piloté depuis Talos Studio (vidéo sans son)', en: 'The xArm 1S arm driven from Talos Studio (silent video)' } }
      ]
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
    image: '/images/projets/armoire/armoire.webp',
    imagePosition: '50% 20%', // photo verticale : cadrage sur les modules du haut
    imageAlt: { fr: "La nouvelle armoire électropneumatique après le revamping : modules d'électrovannes et câblage", en: 'The new electro-pneumatic cabinet after the revamping: solenoid valve modules and wiring' },
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
        fr: [
          "Mise en service complète de l'armoire (≈ 100 électrovannes, 11 modules) en 2 arrêts techniques",
          '≈ 7 000 € de matériel, contre un devis de 11 000 € pour une dizaine d\'électrovannes seulement',
          'Documentation (schémas, PID, PCVue) remise en cohérence avec le terrain'
        ],
        en: [
          'Cabinet fully commissioned (≈ 100 solenoid valves, 11 modules) over 2 maintenance shutdowns',
          '≈ €7,000 of hardware, versus an €11,000 quote for only ten or so solenoid valves',
          'Documentation (wiring diagrams, P&ID, PCVue) brought back in line with the field'
        ]
      },
      stats: [
        { value: '≈\u00a0100', label: { fr: 'électrovannes', en: 'solenoid valves' } },
        { value: '11', label: { fr: 'modules', en: 'modules' } },
        { value: { fr: '≈\u00a07\u00a0000\u00a0€', en: '≈\u00a0€7,000' }, label: { fr: 'de matériel', en: 'of hardware' } },
        { value: '2', label: { fr: 'arrêts techniques', en: 'maintenance shutdowns' } }
      ],
      lesson: {
        fr: "Un fichier de suivi ne vaut que s'il est mis à jour à chaque modification.",
        en: "A tracking file is only worth something if it's updated after every change."
      },
      story: [
        {
          title: {
            fr: "Le point de départ",
            en: "The starting point"
          },
          body: {
            fr: "Au pontage de la zone de fabrication, une armoire pilote les vannes de lavage d'une quarantaine de cuves, les vannes autour des pompes de transfert et le système d'obus de nettoyage des tuyauteries. Après une inondation en 2008 qui avait effacé la plupart des repérages, et des années de dépannages provisoires peu documentés, plus personne ne savait précisément quelle électrovanne pilotait quelle vanne. Certaines n'étaient plus raccordées, d'autres commandaient des vannes supprimées, et les raccordements se trouvaient dans un couloir de 50 cm entre une cloison et un mur.\n\nUn prestataire chiffrait environ **11 000 €** le remplacement d'une dizaine d'électrovannes seulement. L'entreprise a choisi de mener le projet en interne et me l'a confié, encadré par l'équipe maintenance.",
            en: "At the transfer station of the production area, a cabinet drives the cleaning valves of about forty tanks, the valves around the transfer pumps and the pipe-pigging system. A flood in 2008 had wiped out most of the labels, and years of undocumented temporary fixes had followed: nobody knew exactly which solenoid valve drove which valve anymore. Some were no longer wired, others drove valves that had been removed, and the connections sat in a 50 cm corridor between a partition and a wall.\n\nA contractor quoted about **€11,000** to replace only ten or so solenoid valves. The company chose to run the project in-house and gave it to me, supervised by the maintenance team."
          }
        },
        {
          title: {
            fr: "Ma démarche",
            en: "My approach"
          },
          body: {
            fr: "**Cartographier avant de toucher.** J'ai relevé chaque vanne sur le terrain, puis remonté toute la chaîne : tuyau, électrovanne, fil, relais, sortie automate. J'ai comparé le résultat aux schémas papier et numériques, au PID et à la supervision PCVue. Comme la production tournait, aucune mesure n'était possible sous tension : j'ai validé chaque correspondance en forçant les sorties automate (tables VAT sous Step 7) pendant la fermeture trimestrielle.\n\n**Dimensionner pour la maintenance.** Un fichier Excel calcule la taille de l'armoire et la répartition des électrovannes. J'ai choisi 11 modules de 9, pour qu'un module se remplace vite en cas de panne.\n\n**Préparer pour que l'arrêt ne serve qu'au basculement.** Pendant les 3 semaines d'avant, j'ai posé la plaque, les rails, les chemins de câbles et les tuyaux repérés. Le jour J, en binôme : je câblais l'électrique pendant que mon collègue démontait le pneumatique, grâce à mes étiquettes.",
            en: "**Map everything before touching anything.** I surveyed every valve in the field, then traced the whole chain: pipe, solenoid valve, wire, relay, PLC output. I cross-checked the result against the paper and digital wiring diagrams, the P&ID and the PCVue supervision. Since production was running, no live measurement was possible: I validated every mapping by forcing PLC outputs (VAT tables in Step 7) during the quarterly shutdown.\n\n**Design for maintenance.** An Excel tool sizes the cabinet and lays out the solenoid valves. I chose 11 modules of 9, so a faulty module can be swapped quickly.\n\n**Prepare so the shutdown is only for the switch-over.** In the 3 weeks before, I fitted the back plate, the rails, the cable trays and the labelled pipes. On the day, working in pairs: I did the electrical wiring while my colleague removed the pneumatics, using my labels."
          }
        },
        {
          title: {
            fr: "Ce qui a coincé",
            en: "What went wrong"
          },
          body: {
            fr: "Je comptais alimenter deux modules de 9 avec un câble de 19 conducteurs, le dernier servant de commun. Sauf que le 19ᵉ conducteur était la terre : j'ai ajouté un câble de 5 conducteurs dédié aux communs.\n\nLes trois campagnes de tests ont ensuite révélé des joints absents sur des électrovannes neuves, des blocs mal serrés qui fuyaient sous pression, et deux vannes inversées. Celle-là venait de moi : j'avais modifié un repérage sans le reporter dans mon fichier de suivi.",
            en: "I planned to feed two 9-valve modules with one 19-core cable, the last core being the common. Except the 19th core was the earth: I added a dedicated 5-core cable for the commons.\n\nThe three test campaigns then revealed missing seals on brand-new valves, loose blocks leaking under pressure, and two swapped valves. That one was my fault: I had changed a label without updating my tracking file."
          }
        },
        {
          title: {
            fr: "Ce que j'en retiens",
            en: "What I took away"
          },
          body: {
            fr: "L'analyse de l'existant a dû être refaite deux fois avant d'être fiable, et c'est elle qui a rendu la mise en service sans surprise. J'ai appris à planifier (diagramme de Gantt, fichiers de suivi), à être précis avec les fournisseurs, et qu'un fichier de suivi ne vaut que s'il est mis à jour à chaque modification.",
            en: "The survey of the existing system had to be redone twice before it was reliable, and that is what made commissioning free of surprises. I learned to plan (Gantt chart, tracking files), to be precise with suppliers, and that a tracking file is only worth something if it is updated after every change."
          }
        }
      ],
      compare: {
        before: { src: '/images/projets/armoire/ancienne-armoire.webp', alt: { fr: "L'ancienne armoire avant le revamping", en: 'The old cabinet before the revamping' } },
        after: { src: '/images/projets/armoire/armoire.webp', alt: { fr: "La nouvelle armoire après le revamping : modules d'électrovannes et câblage", en: 'The new cabinet after the revamping: solenoid valve modules and wiring' } }
      },
      gallery: [
        { src: '/images/projets/armoire/ancienne-armoire.webp', tall: true, fit: 'contain', link: true, alt: { fr: "L'ancienne armoire avant le revamping, avec le repérage des zones : cuves, NEP, lignes de conditionnement, réserve", en: 'The old cabinet before the revamping, with the zones marked: tanks, CIP, packaging lines, spare' } }

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
      stats: [
        { value: '6', label: { fr: 'versions', en: 'versions' } },
        { value: '2', label: { fr: 'voies', en: 'lanes' } },
        { value: '3', label: { fr: 'langages CODESYS (LD, ST, SFC)', en: 'CODESYS languages (LD, ST, SFC)' } }
      ],
      lesson: {
        fr: 'Une logique bien modélisée se transpose facilement.',
        en: 'Well-modelled logic carries over easily.'
      },
      story: [
        {
          title: {
            fr: "Le point de départ",
            en: "The starting point"
          },
          body: {
            fr: "Le sujet de la SAÉ : piloter un carrefour à deux voies, avec priorité piéton, boucle magnétique de détection et modes jour/nuit, d'abord sur une Raspberry Pi Pico en CircuitPython, puis sous CODESYS. Le défi : raisonner en automaticien, mais sans automate.",
            en: "The project brief: control a two-lane crossroads with pedestrian priority, a magnetic detection loop and day/night modes, first on a Raspberry Pi Pico in CircuitPython, then in CODESYS. The challenge: think like a PLC programmer, without a PLC."
          }
        },
        {
          title: {
            fr: "Ma démarche",
            en: "My approach"
          },
          body: {
            fr: "**Le GRAFCET d'abord, le code ensuite.** Chaque étape devient une variable, chaque transition une condition, et la boucle principale se comporte comme un cycle automate.\n\n**Reconstruire ce qui manque.** CircuitPython n'a pas de temporisation TON comme un automate : on l'a construite sous forme de classe réutilisable. Un GRAFCET superviseur choisit entre le cycle normal et le clignotement orange, pour qu'un seul tourne à la fois.\n\n**Avancer par petites versions.** Le programme a été construit en 6 versions, chacune testée sur plaque d'essai avant la suivante, puis complété par le menu OLED et la détection de panne.",
            en: "**GRAFCET first, code second.** Each step becomes a variable, each transition a condition, and the main loop behaves like a PLC scan cycle.\n\n**Rebuild what's missing.** CircuitPython has no TON timer like a PLC, so we built one as a reusable class. A supervisor GRAFCET switches between the normal cycle and flashing amber, so only one runs at a time.\n\n**Move forward in small versions.** The program was built in 6 versions, each tested on a breadboard before the next, then completed with the OLED menu and fault detection."
          }
        },
        {
          title: {
            fr: "Ce que j'en retiens",
            en: "What I took away"
          },
          body: {
            fr: "Une logique bien modélisée se transpose facilement. Réécrire le programme en Ladder, ST et SFC sous CODESYS a surtout consisté à traduire le GRAFCET, pas à repenser le fonctionnement.",
            en: "Well-modelled logic carries over easily. Rewriting the program in Ladder, ST and SFC in CODESYS was mostly a matter of translating the GRAFCET, not rethinking how it works."
          }
        }
      ],
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
    context: { fr: 'SAÉ 2, BUT GEII, nov. 2024 – janv. 2025', en: 'SAÉ 2 (university project), BUT GEII, Nov. 2024 – Jan. 2025' },
    tags: ['Proteus', 'Raspberry Pi Pico', 'ST7735', 'CircuitPython'],
    image: '/images/projets/console/carte.webp',
    imagePosition: '50% 65%', // cadrage sur l'écran
    imageAlt: { fr: "La carte de la console en marche, l'écran affiche Space Rescue", en: 'The console board running, the screen shows Space Rescue' },
    github: 'https://github.com/adam-deruelle/pico-retro-handheld',
    details: {
      intro: {
        fr: "Conception et fabrication d'une console de jeu portable, de la carte électronique jusqu'aux jeux.",
        en: 'Design and build of a handheld game console, from the circuit board to the games.'
      },
      role: {
        fr: [
          'Conception du PCB sous Proteus : Raspberry Pi Pico, écran TFT ST7735S 1,8″ (128 × 160), croix directionnelle, joystick, haut-parleur et réglage du volume.',
          'Fabrication : gravure et soudure de la carte, boîtier imprimé en 3D.',
          'Programmation de 3 jeux en CircuitPython : Christmas Pong, Gunfight et Space Rescue. Les graphismes et les modules ont été fournis par l\'équipe pédagogique ; le code des jeux est le mien.'
        ],
        en: [
          'PCB design in Proteus: Raspberry Pi Pico, 1.8″ ST7735S TFT screen (128 × 160), directional pad, joystick, speaker and volume control.',
          'Manufacturing: etching and soldering the board, 3D-printed case.',
          'Programming 3 games in CircuitPython: Christmas Pong, Gunfight and Space Rescue. Graphics and modules were provided by the teaching staff; the game code is mine.'
        ]
      },
      tech: ['Proteus', 'Raspberry Pi Pico', { fr: 'Écran ST7735', en: 'ST7735 screen' }, 'CircuitPython', { fr: 'Impression 3D', en: '3D printing' }],
      results: {
        fr: ['Projet mené du 4 novembre 2024 au 24 janvier 2025, de la rétro-ingénierie et du schéma sous Proteus jusqu\'à la carte soudée, aux jeux, au boîtier imprimé et au bilan technique oral.'],
        en: ['Project run from 4 November 2024 to 24 January 2025, from reverse engineering and the Proteus schematic to the soldered board, the games, the printed case and the final technical review.']
      },
      stats: [
        { value: '3', label: { fr: 'jeux', en: 'games' } },
        { value: '14', label: { fr: 'points de test', en: 'test points' } },
        { value: '3', label: { fr: 'mois', en: 'months' } }
      ],
      lesson: {
        fr: 'Vérifier le schéma fonction par fonction avant de router.',
        en: 'Check the schematic function by function before routing.'
      },
      story: [
        {
          title: {
            fr: "Le point de départ",
            en: "The starting point"
          },
          body: {
            fr: "Le sujet de la SAÉ : concevoir une carte offrant les fonctions de base d'une console rétro, et la possibilité de créer ses propres jeux, avec un microcontrôleur bon marché, de novembre 2024 à janvier 2025. Mon binôme ayant quitté le projet après la première semaine, je l'ai mené seul.",
            en: "The project brief: design a board with the core features of a retro console, plus the ability to create your own games, using a low-cost microcontroller, from November 2024 to January 2025. My teammate left the project after the first week, so I carried it on alone."
          }
        },
        {
          title: {
            fr: "Ma démarche",
            en: "My approach"
          },
          body: {
            fr: "J'ai suivi le cycle complet d'un produit : carte mentale des besoins et analyse fonctionnelle, schéma puis routage sous Proteus (Pico, écran ST7735S, croix directionnelle, joystick, haut-parleur, réglage du volume, 14 points de test), gravure, perçage, soudure, tests électriques, puis les jeux en CircuitPython et le boîtier imprimé en 3D.\n\nLes trois jeux suivent la même structure (écran titre, règles, partie, fin) et libèrent la mémoire entre chaque écran, car la RAM de la Pico est vite saturée par les images.",
            en: "I went through a full product cycle: needs mind map and functional analysis, schematic then routing in Proteus (Pico, ST7735S screen, D-pad, joystick, speaker, volume control, 14 test points), etching, drilling, soldering, electrical tests, then the games in CircuitPython and the 3D-printed case.\n\nAll three games share the same structure (title screen, rules, game, end) and free memory between screens, because the Pico's RAM fills up fast with images."
          }
        },
        {
          title: {
            fr: "Ce qui a coincé",
            en: "What went wrong"
          },
          body: {
            fr: "Pendant les essais, l'un des axes du joystick ne répondait pas. En reprenant mon schéma fonctionnel, j'ai trouvé la cause : cet axe n'était tout simplement pas alimenté. La carte fonctionnait, mais un axe restait inutilisable en jeu. C'était une erreur de conception, pas de soudure.",
            en: "During testing, one of the joystick axes didn't respond. Going back to my functional diagram, I found the cause: that axis simply wasn't powered. The board worked, but one axis was unusable in game. It was a design error, not a soldering one."
          }
        },
        {
          title: {
            fr: "Ce que j'en retiens",
            en: "What I took away"
          },
          body: {
            fr: "Vérifier le schéma fonction par fonction avant de router, et placer des points de test là où ils servent vraiment au diagnostic. Et surtout, j'ai vécu un projet du besoin jusqu'au produit fini, avec un planning (Gantt) à tenir.",
            en: "Check the schematic function by function before routing, and place test points where they actually help diagnosis. Above all, I lived a project from the initial need to the finished product, with a schedule (Gantt chart) to keep."
          }
        }
      ],
      gallery: [
        { video: '/images/projets/console/demo-space-rescue.mp4', poster: '/images/projets/console/demo-space-rescue-poster.webp', wide: true, alt: { fr: 'La console en marche : partie de Space Rescue (vidéo sans son)', en: 'The console running: a game of Space Rescue (silent video)' } },
        { src: '/images/projets/console/implantation.webp', fit: 'contain', wide: true, alt: { fr: "Schéma d'implantation de la carte (Proteus)", en: 'Board component layout (Proteus)' } },
        { src: '/images/projets/console/carte.webp', alt: { fr: 'La carte soudée : Pico 2, écran ST7735S, joystick et haut-parleur', en: 'The soldered board: Pico 2, ST7735S screen, joystick and speaker' } },
        { src: '/images/projets/console/christmas-pong.webp', fit: 'contain', pixel: true, alt: { fr: "Écran titre de Christmas Pong", en: 'Christmas Pong title screen' } },
        { src: '/images/projets/console/gunfight.webp', fit: 'contain', pixel: true, alt: { fr: 'Écran titre de Gunfight', en: 'Gunfight title screen' } },
        { src: '/images/projets/console/space-rescue.webp', fit: 'contain', pixel: true, alt: { fr: 'Écran titre de Space Rescue', en: 'Space Rescue title screen' } },
        { src: '/images/projets/console/planning.webp', fit: 'contain', wide: true, alt: { fr: 'Planning du projet (diagramme de Gantt)', en: 'Project schedule (Gantt chart)' } }
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
      credits: [{ name: 'Adam Deruelle' }, { name: 'Lucas' }, { name: 'Baptiste' }, { name: 'Ewen' }],
      stats: [
        { value: '2', label: { fr: 'joueurs', en: 'players' } },
        { value: '4', label: { fr: 'étudiants', en: 'students' } },
        { value: { fr: 'févr.\u00a02027', en: 'Feb.\u00a02027' }, label: { fr: 'JPO', en: 'open day' } }
      ],
      story: [
        {
          title: {
            fr: "Le concept",
            en: "The concept"
          },
          body: {
            fr: "Un escape game coopératif inspiré de l'ambiance de *BioShock*, jouable à deux. Un joueur, dans le casque, explore une base sous-marine engloutie et manipule les machines ; l'autre, sans casque, tient le carnet technique avec les schémas et les données. Aucun des deux ne peut résoudre les énigmes seul. Les énigmes reposent sur des notions de notre formation : équilibrer des vannes à l'aide de manomètres, ou décoder des lampes en morse.",
            en: "A co-op escape game inspired by the atmosphere of *BioShock*, played by two. One player, in the headset, explores a sunken underwater base and operates the machines; the other, without a headset, holds the technical logbook with the schematics and data. Neither can solve the puzzles alone. The puzzles build on concepts from our degree: balancing valves using pressure gauges, or decoding lamps in Morse code."
          }
        },
        {
          title: {
            fr: "Où on en est",
            en: "Where we are"
          },
          body: {
            fr: "Le projet démarre : le projet Unity VR est créé et versionné sur GitHub, et les premières énigmes sont en conception, à quatre. Objectif : un tutoriel d'environ 5 minutes jouable pour la journée portes ouvertes de février 2027.",
            en: "The project is just starting: the Unity VR project is set up and versioned on GitHub, and the first puzzles are being designed by the four of us. Goal: a tutorial of about 5 minutes, playable for the IUT open day in February 2027."
          }
        }
      ],
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
    image: '/images/projets/fiches-survie/logos.svg', // logos C et Python (icônes Devicon, licence MIT)
    imageAlt: { fr: 'Logos des langages C et Python', en: 'C and Python language logos' },
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
      stats: [
        { value: '4', label: { fr: 'APP', en: 'modules' } },
        { value: '2', label: { fr: 'langages (C, CircuitPython)', en: 'languages (C, CircuitPython)' } }
      ],
      lesson: {
        fr: 'Expliquer simplement oblige à comprendre vraiment.',
        en: 'Explaining simply forces you to really understand.'
      },
      story: [
        {
          title: {
            fr: "Le point de départ",
            en: "The starting point"
          },
          body: {
            fr: "Chaque APP de C embarqué et de CircuitPython arrivait avec des dizaines de pages de cours, de datasheets et de code généré par MCC. Retrouver la bonne fonction prenait souvent plus de temps que d'écrire le code.",
            en: "Every embedded C and CircuitPython module came with dozens of pages of course notes, datasheets and MCC-generated code. Finding the right function often took longer than writing the code."
          }
        },
        {
          title: {
            fr: "Ma démarche",
            en: "My approach"
          },
          body: {
            fr: "Une fiche par module, toujours avec la même structure : les modules à importer, un tableau des fonctions utiles, des tutos progressifs avec du code commenté, et des pistes pour aller plus loin. Par exemple : faire avancer, tourner et pivoter sur place le robot Pololu Zumo, ou calibrer un accéléromètre I2C par moyennage.",
            en: "One sheet per module, always with the same structure: modules to import, a table of useful functions, step-by-step tutorials with commented code, and ideas to go further. For example: making the Pololu Zumo robot drive, turn and spin in place, or calibrating an I2C accelerometer by averaging."
          }
        },
        {
          title: {
            fr: "Ce qui a coincé",
            en: "What went wrong"
          },
          body: {
            fr: "Le plus dur n'était pas d'écrire, mais de choisir : garder ce qui sert vraiment en TP, et renvoyer au cours pour le reste.",
            en: "The hardest part wasn't writing, it was choosing: keeping what really helps in the lab, and pointing to the course for the rest."
          }
        },
        {
          title: {
            fr: "Ce que j'en retiens",
            en: "What I took away"
          },
          body: {
            fr: "Expliquer simplement oblige à comprendre vraiment. Les fiches sont en ligne sur GitHub et ont fait gagner du temps à ma promo, et à moi aussi quand je reviens sur un sujet.",
            en: "Explaining simply forces you to really understand. The sheets are on GitHub and saved my classmates time, and me too when I come back to a topic."
          }
        }
      ],
      gallery: []
    }
  }
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.featured - b.featured)

export const getProject = (slug) => projects.find((p) => p.slug === slug)
