<script setup>
// Comparateur avant / après : l'image « après » est découpée par la poignée.
// Souris et doigt (pointer events), clavier (flèches, Pg préc./suiv., Début/Fin) sur la poignée.
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLoc } from '@/i18n/loc'

const props = defineProps({ before: { type: Object, required: true }, after: { type: Object, required: true } })
const { t } = useI18n()
const loc = useLoc()

const pos = ref(50) // % depuis la gauche : à gauche « avant », à droite « après »
const box = ref(null)
const dragging = ref(false)

const clamp = (v) => Math.min(100, Math.max(0, v))
function fromPointer(e) {
  const r = box.value.getBoundingClientRect()
  pos.value = clamp(((e.clientX - r.left) / r.width) * 100)
}
function down(e) {
  dragging.value = true
  try { box.value.setPointerCapture(e.pointerId) } catch {}
  fromPointer(e)
}
function move(e) { if (dragging.value) fromPointer(e) }
function up(e) {
  dragging.value = false
  try { box.value.releasePointerCapture(e.pointerId) } catch {}
}
function key(e) {
  const steps = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5, PageDown: -20, PageUp: 20 }
  if (e.key in steps) pos.value = clamp(pos.value + steps[e.key])
  else if (e.key === 'Home') pos.value = 0
  else if (e.key === 'End') pos.value = 100
  else return
  e.preventDefault()
}
const valueText = computed(() => t('compare.valueText', { before: Math.round(pos.value), after: Math.round(100 - pos.value) }))
</script>

<template>
  <figure class="ba">
    <div
      ref="box"
      class="frame"
      :class="{ dragging }"
      @pointerdown="down"
      @pointermove="move"
      @pointerup="up"
      @pointercancel="up"
    >
      <img :src="after.src" :alt="loc(after.alt)" class="img" draggable="false" loading="lazy" />
      <img
        :src="before.src"
        :alt="loc(before.alt)"
        class="img before"
        :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }"
        draggable="false"
        loading="lazy"
      />
      <span class="tag left" aria-hidden="true">{{ t('compare.before') }}</span>
      <span class="tag right" aria-hidden="true">{{ t('compare.after') }}</span>
      <div class="line" :style="{ left: pos + '%' }" aria-hidden="true"></div>
      <div
        class="handle"
        :style="{ left: pos + '%' }"
        role="slider"
        tabindex="0"
        :aria-label="t('compare.label')"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="Math.round(pos)"
        :aria-valuetext="valueText"
        @keydown="key"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>
      </div>
    </div>
    <figcaption class="mt-2 text-sm text-muted">{{ t('compare.caption') }}</figcaption>
  </figure>
</template>

<style scoped>
.frame {
  position: relative;
  aspect-ratio: 4 / 5;
  max-width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: #000;
  cursor: ew-resize;
  touch-action: pan-y; /* défilement vertical conservé, le glissement horizontal pilote le curseur */
  user-select: none;
  -webkit-user-select: none;
}
.img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.tag {
  position: absolute;
  top: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(2, 12, 28, 0.75);
  color: #fff;
  font: 600 12px 'IBM Plex Mono', monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.tag.left { left: 12px; }
.tag.right { right: 12px; }
.line { position: absolute; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: #fff; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25); pointer-events: none; }
.handle {
  position: absolute;
  top: 50%;
  width: 48px;
  height: 48px;
  margin: -24px 0 0 -24px;
  border-radius: 50%;
  background: #ee6a4d;
  color: #000022;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  cursor: ew-resize;
}
.handle svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.handle:focus-visible { outline: 3px solid #ffc857; outline-offset: 3px; }
</style>
