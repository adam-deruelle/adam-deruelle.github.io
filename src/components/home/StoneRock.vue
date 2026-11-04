<script setup>
// Rocher sous-marin : pierre calcaire poreuse (texture procédurale SVG, éclairée par le haut),
// quelques taches d'algues, et un contenu « gravé » dans la pierre.
import { useId } from 'vue'

const props = defineProps({
  shape: { type: Number, default: 1 },
  seed: { type: Number, default: 3 }
})
const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
const shapes = {
  1: 'M14 196 C4 150 10 104 34 74 C52 50 70 46 86 30 C104 12 132 6 156 16 C176 24 186 12 210 14 C246 18 274 40 294 70 C316 102 334 140 328 176 C324 196 310 208 286 212 L48 214 C30 212 18 206 14 196 Z',
  2: 'M10 150 C2 120 12 84 38 58 C60 36 86 30 110 18 C138 6 172 8 196 24 C226 44 246 72 248 108 C250 132 244 150 228 156 L30 158 C20 158 13 156 10 150 Z'
}
const faces = {
  1: 'M62 92 C110 80 230 78 286 94 L292 186 C230 198 112 200 52 188 Z',
  2: 'M46 74 C90 64 168 62 214 74 L220 140 C170 150 90 152 40 142 Z'
}
// zone de texte = face taillée (en % du rocher)
const insets = { 1: { top: '40%', bottom: '13%', left: '17%', right: '15%' }, 2: { top: '42%', bottom: '10%', left: '17%', right: '15%' } }
const box = { 1: '0 0 340 220', 2: '0 0 256 162' }
</script>

<template>
  <div class="stone">
    <svg class="shape" :viewBox="box[props.shape]" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient :id="'g' + uid" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stop-color="#D9D7C6" />
          <stop offset="0.5" stop-color="#ABB0A2" />
          <stop offset="1" stop-color="#55666A" />
        </linearGradient>
        <filter :id="'f' + uid" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">
          <!-- relief : bosses + grain fin -->
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="4" :seed="props.seed" result="lumps" />
          <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="3" :seed="props.seed + 7" result="grain" />
          <feComposite in="lumps" in2="grain" operator="arithmetic" k2="0.8" k3="0.35" result="bump" />
          <feDiffuseLighting in="bump" surfaceScale="4.5" lighting-color="#F2EEDC" result="lit">
            <feDistantLight azimuth="255" elevation="52" />
          </feDiffuseLighting>
          <feComposite in="lit" in2="SourceGraphic" operator="arithmetic" k1="1.25" result="tex" />
          <!-- taches d'algues -->
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="3" :seed="props.seed + 21" result="moss" />
          <feColorMatrix in="moss" type="matrix" values="0 0 0 0 0.42  0 0 0 0 0.5  0 0 0 0 0.36  0 0 0 7 -4.4" result="mossA" />
          <feComposite in="mossA" in2="tex" operator="atop" result="mossy" />
          <feBlend in="mossy" in2="tex" mode="multiply" result="all" />
          <feComposite in="all" in2="SourceGraphic" operator="in" />
        </filter>
        <filter :id="'p' + uid" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" :seed="props.seed + 3" result="fine" />
          <feDiffuseLighting in="fine" surfaceScale="0.6" lighting-color="#F6F2E2" result="lit">
            <feDistantLight azimuth="255" elevation="62" />
          </feDiffuseLighting>
          <feComposite in="lit" in2="SourceGraphic" operator="arithmetic" k1="1.12" result="tex" />
          <feComposite in="tex" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <path :d="shapes[props.shape]" :fill="'url(#g' + uid + ')'" :filter="'url(#f' + uid + ')'" />
      <!-- face taillée, plus lisse, où le texte est gravé -->
      <path :d="faces[props.shape]" fill="#CFCDBB" :filter="'url(#p' + uid + ')'" />
      <path :d="faces[props.shape]" fill="none" stroke="rgba(40,40,30,0.45)" stroke-width="1.5" />
    </svg>
    <div class="carved" :style="insets[props.shape]"><slot /></div>
  </div>
</template>

<style scoped>
.stone { position: relative; }
.shape { position: absolute; inset: 0; width: 100%; height: 100%; filter: brightness(0.84) saturate(0.8); }
.carved {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Cinzel', 'Times New Roman', serif;
  color: #23261d;
  /* gravure : lèvre basse éclairée, bord haut dans l'ombre */
  text-shadow: 0 1px 0 rgba(255, 252, 235, 0.45), 0 -1px 1px rgba(0, 0, 0, 0.55);
}
.carved :deep(h3) { font: 700 clamp(12px, 1.4vw, 15px) 'Cinzel', serif; letter-spacing: 0.22em; color: #1d241f; text-transform: uppercase; }
.carved :deep(a), .carved :deep(p) { display: block; margin-top: 2px; line-height: 1.35; font: 600 clamp(11px, 1.3vw, 15px) 'Cinzel', serif; letter-spacing: 0.04em; text-decoration: none; overflow-wrap: anywhere; color: #1d241f; }
.carved :deep(a:hover) { text-decoration: underline; text-underline-offset: 3px; color: #000; }
.carved :deep(.sep) { width: 46px; height: 2px; margin: 4px auto 2px; background: rgba(0, 0, 0, 0.35); box-shadow: 0 1px 0 rgba(255, 252, 235, 0.4); }
</style>
