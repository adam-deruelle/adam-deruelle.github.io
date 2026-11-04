# Portfolio d'Adam Deruelle

Site : https://adam-deruelle.github.io/ · Vue 3, Vite, Tailwind CSS, Vue Router, vue-i18n.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

## Déploiement

Chaque push sur `main` lance `.github/workflows/deploy.yml`, qui build le site et le publie sur GitHub Pages.
Dans le repo, il faut régler une fois **Settings → Pages → Source : GitHub Actions**.

## Où modifier quoi

| Quoi | Fichier |
|---|---|
| Textes de l'interface (FR / EN) | `src/i18n/fr.json`, `src/i18n/en.json` |
| E-mail, LinkedIn, GitHub, chemins des CV | `src/data/site.js` |
| CV PDF | `public/cv/` (`CV_Adam_Deruelle_FR.pdf`, `CV_Adam_Deruelle_EN.pdf`) |
| Projets | `src/data/projects.js` |
| Frise du parcours et compétences | `src/data/parcours.js` |
| Archive des auto-évaluations BUT | `src/data/competencesBut.js` |
| Photo de profil | `src/data/site.js` → `photo` |
| Couleurs et polices | `tailwind.config.js` |

Un contenu manquant s'affiche en placeholder visible (`[PHOTO À VENIR]`) : rien n'est inventé.

## Ajouter un projet

1. **Images** : créer `public/images/projets/<slug>/` et y mettre les images en **WebP** (1200 px de large suffit).
   Conversion rapide : `cwebp -q 78 -resize 1200 0 photo.jpg -o photo.webp`, ou squoosh.app.
2. **Données** : dans `src/data/projects.js`, copier un bloc existant dans le tableau `projects` et l'adapter :

```js
{
  slug: 'mon-projet',                 // URL : #/projets/mon-projet
  type: 'cours',                      // 'pro' | 'perso' | 'cours' (sert au filtre)
  featured: 2,                        // facultatif : position sur l'accueil (1 à 3)
  title:   { fr: 'Titre', en: 'Title' },
  summary: { fr: 'Une ligne de résumé.', en: 'One-line summary.' },
  context: { fr: 'SAÉ 5, 2026 · avec X', en: 'SAÉ 5, 2026 · with X' },
  tags: ['CircuitPython', { fr: 'Soudure', en: 'Soldering' }],
  image: '/images/projets/mon-projet/carte.webp',   // ou null → placeholder
  imageAlt: { fr: 'Description de l\'image', en: 'Image description' },
  github: 'https://github.com/adam-deruelle/mon-projet',  // ou null
  details: {
    intro:   { fr: 'Contexte…', en: 'Context…' },
    role:    { fr: ['Ce que j\'ai fait…'], en: ['What I did…'] },
    tech:    ['Raspberry Pi Pico', 'CircuitPython'],
    results: { fr: ['Résultat…'], en: ['Result…'] },   // ou null
    credits: [                                        // facultatif
      { name: 'Adam Deruelle', role: { fr: 'Ce que j\'ai fait', en: 'What I did' } },
      { name: 'Coéquipier' }                          // role facultatif
    ],
    table:   null,                                    // facultatif (voir Talos)
    gallery: [
      { src: '/images/projets/mon-projet/carte.webp', alt: { fr: '…', en: '…' } },
      { src: null, placeholder: { fr: '[PHOTO À VENIR]', en: '[PHOTO COMING SOON]' } }
    ]
  }
}
```

3. Vérifier avec `npm run dev`, puis commit et push sur `main` : le site se met à jour tout seul en 1 à 2 minutes.

Pour changer les projets de l'accueil, déplacer le champ `featured` (1, 2, 3) d'un projet à l'autre.
