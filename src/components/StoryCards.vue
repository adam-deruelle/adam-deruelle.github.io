<script setup>
// Section « En détail » d'une fiche projet : chiffres clés, blocs du récit en cartes,
// et carte mise en avant « Ce que j'en retiens » (citation + texte).
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLoc } from '@/i18n/loc'
import { paragraphs, typo } from '@/utils/typo'

const props = defineProps({ details: { type: Object, required: true } })
const { t, locale } = useI18n()
const loc = useLoc()

const isLesson = (b) => /^Ce que j['’]en retiens/i.test(b.title?.fr || '')
const lessonBlock = computed(() => props.details.story.find(isLesson) || null)
const cards = computed(() => props.details.story.filter((b) => !isLesson(b)))

// Icône selon le bloc (mêmes traits que les autres icônes du site)
const ICONS = {
  clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  list: 'M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01',
  alert: 'M12 9v4M12 17h.01M10.3 3.9 1.8 18.5A2 2 0 0 0 3.5 21.5h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'
}
function iconFor(b) {
  const fr = b.title?.fr || ''
  if (/^(Le point de départ|Le concept)/i.test(fr)) return ICONS.clock
  if (/^(Ma démarche|Où on en est)/i.test(fr)) return ICONS.list
  if (/^Ce qui a coincé/i.test(fr)) return ICONS.alert
  return null
}

const num = (i) => String(i + 1).padStart(2, '0')
const fullWidth = (i) => cards.value.length % 2 === 1 && i === cards.value.length - 1
const quote = computed(() => {
  const q = loc(props.details.lesson)
  if (!q) return ''
  return locale.value === 'fr' ? typo(`« ${q} »`, 'fr') : `“${q}”`
})
</script>

<template>
  <section class="story" aria-labelledby="story-title">
    <p class="kicker">{{ t('project.storyKicker') }}</p>
    <h2 id="story-title" class="text-2xl font-bold sm:text-3xl">{{ t('project.storyTitle') }}</h2>

    <ul v-if="details.stats?.length" class="stats" :aria-label="t('project.keyFigures')">
      <li v-for="(s, i) in details.stats" :key="i">
        <span class="v">{{ typo(loc(s.value), locale) }}</span>
        <span class="l">{{ typo(loc(s.label), locale) }}</span>
      </li>
    </ul>

    <div class="grid">
      <article v-for="(b, i) in cards" :key="i" class="card" :class="{ wide: fullWidth(i) }">
        <span v-if="iconFor(b)" class="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path :d="iconFor(b)" /></svg>
        </span>
        <p class="num" aria-hidden="true">{{ num(i) }}</p>
        <h3>{{ typo(loc(b.title), locale) }}</h3>
        <p v-for="(para, j) in paragraphs(loc(b.body), locale)" :key="j" class="txt" v-html="para"></p>
      </article>

      <article v-if="lessonBlock" class="card lesson">
        <h3 class="lesson-kicker">{{ typo(loc(lessonBlock.title), locale) }}</h3>
        <p v-if="quote" class="quote">{{ quote }}</p>
        <p v-for="(para, j) in paragraphs(loc(lessonBlock.body), locale)" :key="j" class="txt" v-html="para"></p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.kicker {
  display: flex;
  align-items: center;
  gap: 14px;
  font: 600 12px 'IBM Plex Mono', monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #a3b4c8;
}
.kicker::after { content: ''; height: 1px; background: rgba(230, 238, 246, 0.28); flex: 1; max-width: 220px; }
#story-title { margin-top: 10px; }

.stats { display: flex; flex-wrap: wrap; gap: 10px; margin: 20px 0 0; padding: 0; list-style: none; }
.stats li {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(159, 216, 240, 0.14);
  background: rgba(255, 255, 255, 0.045);
}
.stats .v { font: 700 18px 'Space Grotesk', system-ui, sans-serif; color: #ee6a4d; white-space: nowrap; }
.stats .l { font-size: 14px; color: #fff; }

.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; margin-top: 24px; }
.card {
  position: relative;
  min-width: 0;
  padding: 26px;
  border-radius: 18px;
  border: 1px solid rgba(159, 216, 240, 0.14);
  background: rgba(255, 255, 255, 0.045);
}
.card.wide, .card.lesson { grid-column: 1 / -1; }
.num { font: 600 13px 'Space Grotesk', system-ui, sans-serif; letter-spacing: 0.08em; color: #ee6a4d; }
.card h3 { margin-top: 6px; padding-right: 52px; font-size: 19px; font-weight: 600; color: #fff; line-height: 1.25; }
.icon {
  position: absolute;
  top: 22px;
  right: 22px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(238, 106, 77, 0.14);
}
.icon svg { width: 20px; height: 20px; fill: none; stroke: #ee6a4d; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.txt { margin-top: 12px; font-size: 14.5px; line-height: 1.6; color: #d3dee9; }
.txt :deep(strong) { color: #fff; font-weight: 600; }

.lesson {
  background: linear-gradient(135deg, rgba(238, 106, 77, 0.16), rgba(238, 106, 77, 0.04));
  border-color: rgba(238, 106, 77, 0.45);
}
.lesson-kicker { margin-top: 0 !important; padding-right: 0 !important; font: 600 12px 'IBM Plex Mono', monospace !important; letter-spacing: 0.18em; text-transform: uppercase; color: #ee6a4d !important; }
.quote { margin-top: 12px; font: 500 21px/1.35 'Space Grotesk', system-ui, sans-serif; color: #ffd9cf; text-wrap: balance; }

@media (min-width: 768px) {
  .txt { text-align: justify; -webkit-hyphens: auto; hyphens: auto; }
}
@media (max-width: 767px) {
  .grid { grid-template-columns: 1fr; }
  .card { padding: 22px; }
  .txt { text-align: left; }
}
</style>
