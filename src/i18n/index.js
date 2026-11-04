import { createI18n } from 'vue-i18n'
import fr from './fr.json'
import en from './en.json'

const KEY = 'lang'
export const LOCALES = ['fr', 'en']

function initialLocale() {
  try {
    const saved = localStorage.getItem(KEY)
    if (LOCALES.includes(saved)) return saved
  } catch {}
  return 'fr' // français par défaut
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale(),
  fallbackLocale: 'fr',
  messages: { fr, en }
})

export function setLocale(locale) {
  if (!LOCALES.includes(locale)) return
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  try { localStorage.setItem(KEY, locale) } catch {}
}

document.documentElement.lang = i18n.global.locale.value
