// Typographie des textes longs (section « En détail »).
// En français : espace insécable fine (U+202F) avant : ; ! ? et à l'intérieur des guillemets « … »,
// espace insécable (U+00A0) dans les nombres (11 000) et entre un nombre et son unité (50 cm, 308 mm).
// Les données restent écrites normalement ; la mise en forme se fait à l'affichage.

const NNBSP = ' '
const NBSP = ' '
const UNITS = '€|cm|mm|km|m|kg|g|mA|A|V|W|%|°|Go|Mo|Ko|ms|s|min|h'

export function frTypo(text) {
  if (!text) return text
  let t = text
    .replace(/ ([:;!?])/g, `${NNBSP}$1`)
    .replace(/« ?/g, `«${NNBSP}`)
    .replace(/ ?»/g, `${NNBSP}»`)
    .replace(/≈ /g, `≈${NBSP}`)
  // nombres à plusieurs groupes : 11 000, 1 250 000
  let prev
  do {
    prev = t
    t = t.replace(/(\d) (\d{3})(?!\d)/g, `$1${NBSP}$2`)
  } while (t !== prev)
  // nombre + unité
  t = t.replace(new RegExp(`(\\d) (${UNITS})(?=[\\s.,;:!?)*\\u202F]|$)`, 'g'), `$1${NBSP}$2`)
  return t
}

export const typo = (text, locale) => (locale === 'fr' ? frTypo(text) : text)

const escape = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Paragraphes séparés par une ligne vide ; **gras** et *italique*. Le texte est échappé avant mise en forme.
export function paragraphs(text, locale) {
  return (text || '')
    .split(/\n\s*\n/)
    .map((p) => escape(typo(p.trim(), locale)).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'))
    .filter(Boolean)
}
