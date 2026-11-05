<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'
import { featuredProjects } from '@/data/projects'
import { openContact } from '@/contact'
import { useLoc } from '@/i18n/loc'
import { useAnchorChain } from '@/composables/useAnchorChain'
import SailBoat from '@/components/home/SailBoat.vue'
import StoneRock from '@/components/home/StoneRock.vue'
import NowPlaying from '@/components/home/NowPlaying.vue'

const { t, tm, rt } = useI18n()
const loc = useLoc()
const list = (key) => tm(key).map((m) => rt(m))
const pairs = (key) => tm(key).map((f) => ({ k: rt(f.k), v: rt(f.v) }))

// Photo de profil (public/images/profil.webp) ; tant qu'elle manque, un rond « photo à venir »
const photoMissing = ref(!site.photo)

const page = ref(null)
const chain = ref(null)
useAnchorChain(page, chain)

function backToTop() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  document.getElementById('main')?.focus({ preventScroll: true })
}

// Faune : plus on descend, plus c'est gros (top en % de la hauteur de la mer)
const fauna = [
  { kind: 'fish', left: '70%', top: '3%', w: 34, t: '48s' },
  { kind: 'fish', left: '74%', top: '3.6%', w: 26, t: '48s' },
  { kind: 'fish', left: '78%', top: '3.2%', w: 30, t: '48s' },
  { kind: 'fish', left: '18%', top: '12%', w: 56, t: '60s', rev: true },
  { kind: 'fish', left: '24%', top: '13%', w: 44, t: '60s', rev: true },
  { kind: 'fish', left: '86%', top: '27%', w: 96, t: '64s' },
  { kind: 'fish', left: '-8%', top: '40%', w: 140, t: '72s', rev: true, o: 0.4 },
  { kind: 'shark', left: '92%', top: '52%', w: 280, t: '80s', o: 0.62 },
  { kind: 'shark', left: '-20%', top: '66%', w: 380, t: '95s', rev: true, o: 0.6 },
  { kind: 'lantern', left: '84%', top: '76%', w: 70, t: '70s' },
  { kind: 'lantern', left: '10%', top: '82%', w: 84, t: '85s', rev: true },
  { kind: 'lantern', left: '60%', top: '87%', w: 60, t: '75s' },
  { kind: 'angler', left: '30%', top: '90%', w: 130, t: '120s', rev: true }
]
// Fond marin : algues et cailloux (les éléments « desk » n'apparaissent que sur grand écran)
const W1 = 'M20 120 C6 90 32 70 18 40 C10 22 24 10 20 0'
const W2 = 'M20 120 C32 92 8 70 22 44 C30 26 16 12 22 0'
const W3 = 'M20 120 C12 100 28 84 20 64 C14 48 26 36 21 22'
const weeds = [
  { x: '44%', h: 120, d: W1, delay: '0s' }, { x: '46.5%', h: 90, d: W2, delay: '-2s' },
  { x: '35%', h: 70, d: W3, delay: '-1s', desk: true, c: '#245a47' }, { x: '36.5%', h: 100, d: W1, delay: '-3s', desk: true },
  { x: '66%', h: 110, d: W2, delay: '-1.5s', desk: true }, { x: '68%', h: 76, d: W3, delay: '-4s', desk: true, c: '#245a47' },
  { x: '69.5%', h: 130, d: W1, delay: '-2.5s', desk: true }, { x: '79%', h: 84, d: W2, delay: '-0.5s', desk: true, c: '#245a47' },
  { x: '2%', h: 90, d: W3, delay: '-3.5s', desk: true }, { x: '89%', h: 64, d: W3, delay: '-2s', desk: true }
]
const pebbles = [
  { x: '70%', w: 60, h: 34, b: 44 }, { x: '30%', w: 36, h: 20, b: 40 },
  { x: '50%', w: 44, h: 22, b: 46, desk: true, c: '#22384d' }, { x: '54%', w: 22, h: 14, b: 42, desk: true },
  { x: '60%', w: 72, h: 40, b: 38, desk: true, c: '#1b3044' }, { x: '64.5%', w: 26, h: 16, b: 44, desk: true, c: '#2b4459' },
  { x: '75%', w: 38, h: 22, b: 40, desk: true }, { x: '83%', w: 54, h: 30, b: 42, desk: true, c: '#22384d' },
  { x: '39%', w: 30, h: 18, b: 44, desk: true, c: '#2b4459' }, { x: '93%', w: 30, h: 18, b: 40, desk: true }
]
// Peu de bulles : petits chapelets qui remontent vers la surface
const bubbles = [
  { x: '12%', y: '380px', s: 7, d: '9s', delay: '0s' }, { x: '12.6%', y: '420px', s: 4, d: '9s', delay: '-3s' },
  { x: '57%', y: '900px', s: 9, d: '12s', delay: '-2s' }, { x: '57.8%', y: '950px', s: 5, d: '12s', delay: '-6s' },
  { x: '28%', y: '1900px', s: 6, d: '14s', delay: '-4s' }, { x: '73%', y: '2600px', s: 8, d: '13s', delay: '-1s' },
  { x: '73.5%', y: '2650px', s: 4, d: '13s', delay: '-7s' }, { x: '40%', y: '3400px', s: 6, d: '15s', delay: '-5s' }
]
const rays = [
  { l: '18%', w: 70, r: 14 }, { l: '30%', w: 120, r: 8 }, { l: '44%', w: 60, r: 2 },
  { l: '52%', w: 140, r: -4 }, { l: '66%', w: 80, r: -10 }, { l: '78%', w: 110, r: -16 }
]
</script>

<template>
  <div ref="page" class="page">
    <svg ref="chain" class="chain" aria-hidden="true"></svg>

    <!-- Ciel -->
    <header class="sky">
      <span class="sun" aria-hidden="true"></span>
      <span class="cloud" style="left: 8%; top: 130px; width: 120px" aria-hidden="true"></span>
      <span class="cloud" style="left: 58%; top: 92px; width: 150px; opacity: 0.8" aria-hidden="true"></span>
      <div class="container-site">
        <div class="hero-copy">
          <h1>Adam Deruelle</h1>
          <p class="tagline">{{ t('home.tagline') }}</p>
          <p class="sub">
            <template v-for="(s, i) in list('home.subtitle')" :key="i"><span v-if="i"> · </span><span class="nowrap">{{ s }}</span></template>
          </p>
          <router-link to="/projets" class="btn btn-primary mt-7">{{ t('home.seeProjects') }}</router-link>
        </div>
      </div>
      <div class="horizon" aria-hidden="true"></div>
      <SailBoat class="boat" :label="t('home.boatAlt')" />
        <svg class="surface" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path class="back" d="M0 22 C150 10 260 30 420 20 S700 6 860 22 S1160 34 1300 18 S1400 14 1440 20 V70 H0Z" />
          <path class="front" d="M0 34 C120 20 240 48 360 32 S600 16 720 32 S960 48 1080 30 S1320 16 1440 32 V70 H0Z" />
          <path class="glint" d="M0 34 C120 20 240 48 360 32 S600 16 720 32 S960 48 1080 30 S1320 16 1440 32" />
        </svg>
    </header>

    <!-- Mer -->
    <div class="sea">
      <div class="rays" aria-hidden="true">
        <span v-for="(r, i) in rays" :key="i" class="ray" :style="{ left: r.l, width: r.w + 'px', transform: `rotate(${r.r}deg)` }"></span>
      </div>
      <div class="bubbles" aria-hidden="true">
        <span v-for="(b, i) in bubbles" :key="'b' + i" class="bubble" :style="{ left: b.x, top: b.y, width: b.s + 'px', height: b.s + 'px', '--d': b.d, '--delay': b.delay }"></span>
      </div>
      <div
        v-for="(f, i) in fauna"
        :key="'f' + i"
        class="fauna"
        :class="[f.kind, { rev: f.rev }]"
        :style="{ left: f.left, top: f.top, '--w': f.w + 'px', '--t': f.t, '--o': f.o }"
        aria-hidden="true"
      >
        <svg v-if="f.kind === 'fish'" viewBox="0 0 56 22"><path d="M2 11 C12 1 30 0 42 11 C30 22 12 21 2 11 Z M40 11 L54 2 L51 11 L54 20 Z" /></svg>
        <svg v-else-if="f.kind === 'shark'" viewBox="0 0 200 70">
          <path d="M2 40 C24 28 64 21 104 22 L124 3 L132 22 C158 24 176 28 184 31 L198 12 L194 37 L200 58 L183 43 C168 47 148 51 118 51 L110 62 L102 51 C78 51 38 49 2 40 Z" />
          <path d="M66 46 L50 68 L82 49 Z" />
        </svg>
        <svg v-else-if="f.kind === 'lantern'" viewBox="0 0 60 24">
          <path d="M2 12 C10 3 28 1 42 10 L56 3 L53 12 L56 21 L42 14 C28 23 10 21 2 12 Z" />
          <circle class="eye" cx="10" cy="10" r="2.6" />
          <g class="glow"><circle cx="16" cy="15" r="1.4" /><circle cx="21" cy="16" r="1.4" /><circle cx="26" cy="16.4" r="1.4" /><circle cx="31" cy="16.2" r="1.4" /><circle cx="36" cy="15.4" r="1.4" /><circle cx="24" cy="8" r="1.2" /></g>
        </svg>
        <svg v-else viewBox="0 0 120 80">
          <path d="M14 46 C14 26 34 14 58 16 C80 18 94 30 100 40 L118 28 L114 46 L118 64 L100 54 C90 66 70 72 50 70 C30 68 14 62 14 46 Z M14 46 L28 50 L16 56 Z" />
          <path class="line" d="M40 18 C34 2 16 0 8 10" />
          <circle class="lure" cx="8" cy="12" r="3.2" />
          <path class="teeth" d="M15 48 L19 52 L22 47 L25 52 L28 47" />
        </svg>
      </div>

      <!-- transition : sous la surface -->
      <div class="lanepad container-site pt-[70px]">
        <img v-if="site.home.transitions[0]" :src="site.home.transitions[0]" alt="" class="transition-img" style="object-position: 50% 42%" loading="lazy" />
        <div v-else class="transition-ph">{{ t('home.imageSoon') }}</div>
      </div>

      <!-- À propos -->
      <section class="sec" aria-labelledby="about-title">
        <div class="lanepad container-site about">
          <div class="about-photo">
            <img v-if="!photoMissing" :src="site.photo" :alt="t('home.photoAlt')" width="160" height="160" loading="lazy" decoding="async" @error="photoMissing = true" />
            <span v-else class="photo-ph">{{ t('home.photoSoon') }}</span>
          </div>
          <div class="about-text">
            <p class="label">{{ t('home.about.eyebrow') }}</p>
            <h2 id="about-title">{{ t('home.about.title') }}</h2>
            <p class="mt-5 max-w-prose">{{ t('home.about.p1') }}</p>
            <p class="mt-4 max-w-prose">{{ t('home.about.p2') }}</p>
          </div>
          <dl class="about-facts">
            <div v-for="f in pairs('home.about.facts')" :key="f.k">
              <dt>{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div class="lanepad container-site">
        <img v-if="site.home.transitions[1]" :src="site.home.transitions[1]" alt="" class="transition-img illus" width="1568" height="392" loading="lazy" />
        <div v-else class="transition-ph">{{ t('home.imageSoon') }}</div>
      </div>

      <!-- Projets mis en avant : parcours en zigzag -->
      <section class="sec" aria-labelledby="projects-title">
        <div class="lanepad container-site">
          <p class="label">{{ t('home.featured.eyebrow') }}</p>
          <h2 id="projects-title">{{ t('home.featured.title') }}</h2>
          <div class="timeline">
            <article v-for="(p, i) in featuredProjects" :key="p.slug" class="stop" :class="i % 2 ? 'r' : 'l'">
              <div class="txt">
                <p class="meta">{{ p.context ? loc(p.context) : t('projects.types.' + p.type) }}</p>
                <h3>{{ loc(p.title) }}</h3>
                <p class="mt-3 max-w-[46ch] text-[#D3DEE9]">{{ loc(p.summary) }}</p>
                <p class="tags">{{ p.tags.map(loc).join(' · ') }}</p>
                <router-link :to="'/projets/' + p.slug" class="more">{{ t('home.read') }}<span class="sr-only"> : {{ loc(p.title) }}</span></router-link>
              </div>
              <div class="img">
                <img v-if="p.image" :src="p.image" :alt="loc(p.imageAlt)" :class="{ contain: p.imageFit === 'contain' }" :style="p.imagePosition ? { objectPosition: p.imagePosition } : null" loading="lazy" decoding="async" width="1200" height="900" />
                <span v-else>{{ loc(p.imagePlaceholder) || t('projects.imageSoon') }}</span>
              </div>
            </article>
          </div>
          <router-link to="/projets" class="btn mt-14">{{ t('home.featured.all') }}</router-link>
        </div>
      </section>

      <div class="lanepad container-site">
        <img v-if="site.home.transitions[2]" :src="site.home.transitions[2]" alt="" class="transition-img illus" width="1568" height="392" loading="lazy" />
        <div v-else class="transition-ph">{{ t('home.imageSoon') }}</div>
      </div>

      <!-- Je recherche -->
      <section class="sec" aria-labelledby="seek-title">
        <div class="lanepad container-site">
          <p class="label">{{ t('home.seek.eyebrow') }}</p>
          <h2 id="seek-title" class="max-w-[20ch]">{{ t('home.seek.title') }}</h2>
          <dl class="seek">
            <div v-for="f in pairs('home.seekFacts')" :key="f.k">
              <dt>{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
          <button type="button" class="btn btn-primary mt-9" @click="openContact">{{ t('home.seek.cta') }}</button>
        </div>
      </section>

      <!-- Fond marin -->
      <section class="floor" :aria-label="t('home.floor.label')">
        <div class="lanepad container-site">
          <NowPlaying class="now-playing" />
        </div>
        <div class="container-site">
          <div class="bed">
            <svg v-for="(w, i) in weeds" :key="'w' + i" class="weed" :class="{ desk: w.desk }" :style="{ left: w.x, height: w.h + 'px', animationDelay: w.delay, stroke: w.c }" viewBox="0 0 40 120" aria-hidden="true"><path :d="w.d" /></svg>
            <span v-for="(p, i) in pebbles" :key="'p' + i" class="pebble" :class="{ desk: p.desk }" :style="{ left: p.x, width: p.w + 'px', height: p.h + 'px', bottom: p.b + 'px', background: p.c }" aria-hidden="true"></span>
            <StoneRock class="rock r1" :shape="1" aria-hidden="true" />
            <StoneRock class="rock r2" :shape="2" aria-hidden="true" />
            <button type="button" class="anchor" :aria-label="t('home.floor.backTop')" @click="backToTop">
              <span class="tip" aria-hidden="true">{{ t('home.floor.tip') }}</span>
              <svg viewBox="0 0 96 124" aria-hidden="true">
                <circle id="anchor-ring" cx="48" cy="13" r="9" />
                <path d="M48 22 V110" /><path d="M28 40 H68" />
                <path d="M8 80 C14 104 30 114 48 114 C66 114 82 104 88 80" />
                <path d="M8 80 L2 92 M8 80 L20 86 M88 80 L94 92 M88 80 L76 86" />
              </svg>
            </button>
            <div class="sand" aria-hidden="true"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page {
  --lane: 120px;
  --sky: 580px;
  --surface: #3e93c0;
  position: relative;
  overflow: hidden;
}
.nowrap { white-space: nowrap; }
.lanepad { padding-right: calc(var(--lane) + 1.5rem); }

/* chaîne */
.chain { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 5; color: #c9d6e2; }

/* ciel */
.sky { position: relative; height: var(--sky); background: linear-gradient(to bottom, #7fbfd8, #d6ecf3); color: #000022; z-index: 1; }
.sun { position: absolute; right: 22%; top: 96px; width: 120px; height: 120px; border-radius: 50%; background: radial-gradient(circle, #fff6d8 0 35%, rgba(255, 236, 170, 0.55) 36%, rgba(255, 236, 170, 0) 70%); }
.cloud { position: absolute; height: 26px; border-radius: 30px; background: rgba(255, 255, 255, 0.75); }
.cloud::before, .cloud::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
.cloud::before { width: 44px; height: 44px; left: 18px; top: -22px; }
.cloud::after { width: 60px; height: 60px; left: 46px; top: -32px; }
.hero-copy { position: relative; z-index: 2; padding-top: 128px; max-width: 560px; }
.hero-copy h1 { color: #000022; font-size: clamp(40px, 6.4vw, 82px); font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.02; }
.tagline { font: 500 clamp(20px, 2.4vw, 28px) / 1.25 'Space Grotesk', system-ui, sans-serif; margin-top: 16px; }
.sub { margin-top: 12px; color: #16425b; font-weight: 500; }
.boat { position: absolute; right: 6%; bottom: 6px; width: min(330px, 38vw); z-index: 3; }

/* mer */
.sea { position: relative; background: linear-gradient(to bottom, var(--surface) 0, #2e7fae 2.5%, #1a5f8a 8%, #0e3f66 22%, #082a4a 45%, #041a33 70%, #020c1c 100%); }
.horizon { position: absolute; left: 0; right: 0; bottom: 0; height: 56px; background: linear-gradient(to bottom, #5aa6cf, #4a9cc8 50%, var(--surface)); z-index: 2; }
.horizon::before { content: ''; position: absolute; inset: 14px 0 auto; height: 1px; background: rgba(255, 255, 255, 0.28); filter: blur(0.6px); }
.surface { position: absolute; left: 0; bottom: 0; display: block; width: 100%; height: 70px; z-index: 4; pointer-events: none; }
.surface .back { fill: rgba(62, 147, 192, 0.55); }
.surface .front { fill: var(--surface); }
.surface .glint { fill: none; stroke: rgba(255, 255, 255, 0.8); stroke-width: 2; }
.rays { position: absolute; inset: 0 0 auto 0; height: 1300px; pointer-events: none; overflow: hidden; mix-blend-mode: screen; -webkit-mask-image: linear-gradient(to bottom, transparent, #000 90px); mask-image: linear-gradient(to bottom, transparent, #000 90px); }
.ray { position: absolute; top: -60px; height: 100%; transform-origin: 50% 0; background: linear-gradient(to bottom, rgba(214, 236, 243, 0.42), rgba(214, 236, 243, 0.12) 45%, rgba(214, 236, 243, 0) 85%); filter: blur(10px); }
.bubbles { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.bubble { position: absolute; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.55); background: radial-gradient(circle at 32% 30%, rgba(255, 255, 255, 0.85) 0 14%, rgba(255, 255, 255, 0.12) 22%, rgba(180, 225, 245, 0.06) 60%, rgba(255, 255, 255, 0.25) 100%); }
/* faune : silhouettes ; les poissons-lanternes et la baudroie ont des points lumineux */
.fauna { position: absolute; width: var(--w); opacity: var(--o, 0.45); pointer-events: none; z-index: 1; }
.fauna svg { display: block; width: 100%; height: auto; overflow: visible; fill: #010814; }
.fauna.rev svg { transform: scaleX(-1); }
.fauna.lantern, .fauna.angler { opacity: 1; }
.fauna.lantern svg > path, .fauna.angler svg > path:first-child { fill: #01060f; }
.fauna .glow circle, .fauna .eye { fill: #7fe3ff; filter: drop-shadow(0 0 3px #7fe3ff) drop-shadow(0 0 6px rgba(127, 227, 255, 0.6)); }
.fauna .line { fill: none; stroke: #01060f; stroke-width: 2; }
.fauna .lure { fill: #bff6ff; filter: drop-shadow(0 0 6px #7fe3ff) drop-shadow(0 0 14px rgba(127, 227, 255, 0.7)); }
.fauna .teeth { fill: none; stroke: rgba(200, 220, 230, 0.5); stroke-width: 1.2; }
@media (prefers-reduced-motion: no-preference) {
  .ray { animation: shimmer 7s ease-in-out infinite alternate; }
  .ray:nth-child(2n) { animation-duration: 9s; }
  .ray:nth-child(3n) { animation-delay: -3s; }
  .fauna { animation: swim var(--t, 40s) linear infinite; }
  .fauna.rev { animation-name: swimr; }
  .fauna .glow, .fauna .lure { animation: blink 3.5s ease-in-out infinite alternate; }
  .weed { transform-origin: 50% 100%; animation: sway 5s ease-in-out infinite alternate; }
  .bubble { animation: rise var(--d, 10s) linear var(--delay, 0s) infinite; }
}
@keyframes shimmer { from { opacity: 0.55; } to { opacity: 1; } }
@keyframes swim { from { transform: translateX(0); } to { transform: translateX(-120vw); } }
@keyframes swimr { from { transform: translateX(0); } to { transform: translateX(120vw); } }
@keyframes blink { from { opacity: 0.45; } to { opacity: 1; } }
@keyframes rise { 0% { transform: translate(0, 0); opacity: 0; } 10% { opacity: 1; } 50% { transform: translate(4px, -160px); } 90% { opacity: 1; } 100% { transform: translate(-3px, -320px); opacity: 0; } }
@keyframes sway { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }

.transition-ph { height: clamp(150px, 20vw, 240px); border: 1px solid rgba(230, 238, 246, 0.28); display: grid; place-items: center; font: 600 12px 'IBM Plex Mono', monospace; letter-spacing: 0.08em; color: #a3b4c8; background: rgba(0, 0, 34, 0.18); position: relative; z-index: 2; }
.transition-img { width: 100%; height: clamp(150px, 20vw, 240px); object-fit: cover; position: relative; z-index: 2; }
/* bandeaux illustrés (format 4:1) : affichés en entier à toutes les largeurs, sans recadrage */
.transition-img.illus { height: auto; aspect-ratio: 1568 / 392; object-fit: contain; }

.sec { position: relative; z-index: 2; padding-block: 80px; }
.label { font: 600 12px 'IBM Plex Mono', monospace; letter-spacing: 0.18em; text-transform: uppercase; color: #a3b4c8; display: flex; align-items: center; gap: 14px; }
.label::after { content: ''; height: 1px; background: rgba(230, 238, 246, 0.28); flex: 1; max-width: 220px; }
h2 { font-size: clamp(28px, 3.8vw, 46px); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 14px; line-height: 1.08; }

.about { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); grid-template-areas: 'text photo' 'text facts'; grid-template-rows: auto 1fr; column-gap: 48px; row-gap: 28px; align-items: start; }
.about-text { grid-area: text; }
.about-photo { grid-area: photo; padding-left: 24px; }
.about-facts { grid-area: facts; }
.about-photo img, .photo-ph { display: block; width: 160px; height: 160px; border-radius: 50%; border: 3px solid #ee6a4d; object-fit: cover; }
.photo-ph { display: grid; place-items: center; padding: 16px; text-align: center; background: rgba(0, 0, 34, 0.25); font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.06em; color: #a3b4c8; }
.about dl { margin: 0; border-left: 1px solid rgba(230, 238, 246, 0.28); padding-left: 24px; display: grid; gap: 18px; }
dt { font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #a3b4c8; }
dd { margin: 4px 0 0; font-weight: 500; }

.timeline { margin-top: 48px; display: grid; gap: 96px; }
.stop { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: center; position: relative; }
.stop.r .img { order: -1; }
.img { position: relative; aspect-ratio: 4 / 3; border: 1px solid rgba(230, 238, 246, 0.28); background: rgba(0, 0, 34, 0.25); display: grid; place-items: center; font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.08em; color: #a3b4c8; text-align: center; padding: 10px; }
.img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.img img.contain { object-fit: contain; padding: 18px; }
.meta { font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #a3b4c8; }
.stop h3 { font-size: clamp(22px, 2.4vw, 30px); font-weight: 600; letter-spacing: 0.03em; margin-top: 8px; }
.tags { margin-top: 12px; font: 500 12.5px 'IBM Plex Mono', monospace; color: #a3b4c8; }
.more { display: inline-block; margin-top: 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #ee6a4d; text-decoration: none; border-bottom: 1px solid currentColor; }
.more:hover { color: #f58a72; }

.seek { display: flex; flex-wrap: wrap; gap: 14px 40px; margin: 32px 0 0; }
.seek dd { font: 600 22px 'Space Grotesk', system-ui, sans-serif; letter-spacing: 0.02em; color: #fff; }

/* fond marin */
.floor { position: relative; z-index: 2; padding-top: 100px; }
.now-playing { margin-bottom: 60px; }
.bed { position: relative; height: 200px; }
.sand { position: absolute; left: -100vw; right: -100vw; bottom: 0; height: 90px; background: #0d1b2b; clip-path: polygon(0 40%, 8% 30%, 18% 38%, 30% 26%, 44% 36%, 58% 24%, 70% 34%, 84% 22%, 100% 32%, 100% 100%, 0 100%); }
.rock { position: absolute; bottom: 34px; z-index: 1; }
.rock.r1 { left: 0; width: min(250px, 34%); height: 150px; }
.rock.r2 { left: min(280px, 37%); width: min(185px, 26%); height: 112px; }
.pebble { position: absolute; bottom: 44px; border-radius: 50% 50% 40% 40%; background: #14263a; z-index: 1; box-shadow: inset -4px -5px 8px rgba(0, 0, 0, 0.45), inset 3px 3px 6px rgba(255, 255, 255, 0.06); }
.weed { position: absolute; bottom: 60px; width: 40px; height: 120px; fill: none; stroke: #1c4a3e; stroke-width: 5; stroke-linecap: round; }
.anchor { position: absolute; right: calc(var(--lane) / 2 - 48px); bottom: 46px; width: 96px; height: 124px; background: none; border: 0; padding: 0; cursor: pointer; color: #c9d6e2; z-index: 3; }
.anchor svg { width: 100%; height: 100%; }
.anchor svg * { fill: none; stroke: currentColor; stroke-width: 7; stroke-linecap: round; }
.anchor:hover { color: #ee6a4d; }
.tip { position: absolute; right: 100%; top: 30%; margin-right: 10px; white-space: nowrap; font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.12em; text-transform: uppercase; color: #a3b4c8; opacity: 0; transition: opacity 0.2s; }
.anchor:hover .tip, .anchor:focus-visible .tip { opacity: 1; }

@media (max-width: 860px) {
  .desk { display: none; }
  .fauna { width: calc(var(--w) * 0.6); }
  .page { --lane: 56px; --sky: 620px; }
  .lanepad { padding-right: calc(var(--lane) + 1rem); }
  .hero-copy { padding-top: 104px; }
  .about, .stop { grid-template-columns: 1fr; gap: 22px; }
  .about { grid-template-areas: 'photo' 'text' 'facts'; grid-template-rows: auto; }
  .about-photo { padding-left: 0; justify-self: center; }
  .stop.r .img { order: 0; }
  .timeline { gap: 64px; }
  .boat { width: min(230px, 55vw); right: 4%; }
  .rock.r1 { width: 42%; height: 104px; }
  .rock.r2 { left: 45%; width: 30%; height: 78px; }
  .bed { height: 180px; }
  .anchor { width: 64px; height: 84px; right: calc(var(--lane) / 2 - 32px); }
}
</style>
