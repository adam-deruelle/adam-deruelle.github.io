/** @type {import('tailwindcss').Config} */
// Les couleurs sont des rôles ; leurs valeurs (clair = Baltique, sombre = Marine nuit)
// sont définies dans src/assets/styles.css.
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        'page': 'rgb(var(--c-page) / <alpha-value>)',
        'mist': 'rgb(var(--c-mist) / <alpha-value>)',
        'surface': 'rgb(var(--c-surface) / <alpha-value>)',
        'ink': 'rgb(var(--c-ink) / <alpha-value>)',
        'title': 'rgb(var(--c-title) / <alpha-value>)',
        'muted': 'rgb(var(--c-muted) / <alpha-value>)',
        'line': 'rgb(var(--c-line) / <alpha-value>)',
        'primary': 'rgb(var(--c-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--c-on-primary) / <alpha-value>)',
        'primary-hover': 'rgb(var(--c-primary-hover) / <alpha-value>)',
        'link': 'rgb(var(--c-link) / <alpha-value>)',
        'hl': 'rgb(var(--c-hl) / <alpha-value>)',
        'eyebrow': 'rgb(var(--c-eyebrow) / <alpha-value>)',
        'tag': 'rgb(var(--c-tag) / <alpha-value>)',
        'band': 'rgb(var(--c-band) / <alpha-value>)',
        'on-band': 'rgb(var(--c-on-band) / <alpha-value>)',
        'band-accent': 'rgb(var(--c-band-accent) / <alpha-value>)',
        'band-btn': 'rgb(var(--c-band-btn) / <alpha-value>)',
        'on-band-btn': 'rgb(var(--c-on-band-btn) / <alpha-value>)',
        'pro': 'rgb(var(--c-pro) / <alpha-value>)',
        'on-pro': 'rgb(var(--c-on-pro) / <alpha-value>)',
        'perso': 'rgb(var(--c-perso) / <alpha-value>)',
        'on-perso': 'rgb(var(--c-on-perso) / <alpha-value>)',
        'cours': 'rgb(var(--c-cours) / <alpha-value>)',
        'on-cours': 'rgb(var(--c-on-cours) / <alpha-value>)'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
