import { ref } from 'vue'

// Thème clair (Baltique) ou sombre (Marine nuit). Le script de index.html pose la classe au chargement.
const root = document.documentElement
const media = matchMedia('(prefers-color-scheme: dark)')
export const isDark = ref(root.classList.contains('dark'))

function apply(dark) {
  isDark.value = dark
  root.classList.toggle('dark', dark)
}

function saved() {
  try { return localStorage.getItem('theme') } catch { return null }
}

export function toggleTheme() {
  apply(!isDark.value)
  try { localStorage.setItem('theme', isDark.value ? 'dark' : 'light') } catch {}
}

// Sans choix mémorisé, on suit l'appareil s'il change de mode.
media.addEventListener('change', (e) => { if (!saved()) apply(e.matches) })
