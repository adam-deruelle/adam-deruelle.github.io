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
| Couleurs et polices | `tailwind.config.js` |

## Ajouter un projet

*Section complétée à l'étape « Projets ».*
