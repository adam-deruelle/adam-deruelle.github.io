import { useI18n } from 'vue-i18n'

// Renvoie le texte dans la langue active pour une valeur { fr, en } (ou une simple chaîne).
export function useLoc() {
  const { locale } = useI18n()
  return (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[locale.value] ?? v.fr : v)
}
