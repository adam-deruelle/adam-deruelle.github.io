<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'
import { featuredProjects } from '@/data/projects'
import { openContact } from '@/contact'
import { useLoc } from '@/i18n/loc'
import { useAnchorChain } from '@/composables/useAnchorChain'
import SailBoat from '@/components/home/SailBoat.vue'

const { t, tm, rt } = useI18n()
const loc = useLoc()
const list = (key) => tm(key).map((m) => rt(m))
const pairs = (key) => tm(key).map((f) => ({ k: rt(f.k), v: rt(f.v) }))

const page = ref(null)
const chain = ref(null)
useAnchorChain(page, chain)

function backToTop() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  document.getElementById('main')?.focus({ preventScroll: true })
}

const fish = [
  { left: '70%', top: '260px', w: 70, t: '55s' },
  { left: '84%', top: '300px', w: 40, t: '48s' },
  { left: '-10%', top: '1450px', w: 120, t: '70s', rev: true, o: 0.35 },
  { left: '90%', top: '2300px', w: 90, t: '60s' },
  { left: '-6%', top: '3200px', w: 60, t: '52s', rev: true }
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
      <SailBoat class="boat" :label="t('home.boatAlt')" />
    </header>

    <!-- Mer -->
    <div class="sea">
      <svg class="surface" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true">
        <path class="w1" d="M0 26 C120 10 240 40 360 24 S600 8 720 24 S960 40 1080 22 S1320 8 1440 24 V46 H0Z" />
        <path class="w2" d="M0 26 C120 10 240 40 360 24 S600 8 720 24 S960 40 1080 22 S1320 8 1440 24" />
      </svg>
      <div class="rays" aria-hidden="true">
        <span v-for="(r, i) in rays" :key="i" class="ray" :style="{ left: r.l, width: r.w + 'px', transform: `rotate(${r.r}deg)` }"></span>
      </div>
      <div aria-hidden="true">
        <span class="bubble" style="left: 12%; top: 60px; width: 8px; height: 8px"></span>
        <span class="bubble" style="left: 13.4%; top: 90px; width: 5px; height: 5px"></span>
        <span class="bubble" style="left: 36%; top: 110px; width: 6px; height: 6px"></span>
        <span class="bubble" style="left: 61%; top: 70px; width: 9px; height: 9px"></span>
        <span class="bubble" style="left: 62%; top: 104px; width: 4px; height: 4px"></span>
      </div>
      <svg
        v-for="(f, i) in fish"
        :key="'f' + i"
        class="fish"
        :class="{ rev: f.rev }"
        :style="{ left: f.left, top: f.top, width: f.w + 'px', '--t': f.t, opacity: f.o }"
        viewBox="0 0 56 22"
        aria-hidden="true"
      >
        <path d="M2 11 C12 1 30 0 42 11 C30 22 12 21 2 11 Z M40 11 L54 2 L51 11 L54 20 Z" />
      </svg>

      <!-- transition : sous la surface -->
      <div class="lanepad container-site pt-[70px]">
        <img v-if="site.home.transitions[0]" :src="site.home.transitions[0]" alt="" class="transition-img" loading="lazy" />
        <div v-else class="transition-ph">{{ t('home.imageSoon') }}</div>
      </div>

      <!-- À propos -->
      <section class="sec" aria-labelledby="about-title">
        <div class="lanepad container-site about">
          <div>
            <p class="label">{{ t('home.about.eyebrow') }}</p>
            <h2 id="about-title">{{ t('home.about.title') }}</h2>
            <p class="mt-5 max-w-prose">{{ t('home.about.p1') }}</p>
            <p class="mt-4 max-w-prose">{{ t('home.about.p2') }}</p>
          </div>
          <dl>
            <div v-for="f in pairs('home.about.facts')" :key="f.k">
              <dt>{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <div class="lanepad container-site">
        <img v-if="site.home.transitions[1]" :src="site.home.transitions[1]" alt="" class="transition-img" loading="lazy" />
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
                <img v-if="p.image" :src="p.image" :alt="loc(p.imageAlt)" loading="lazy" decoding="async" width="1200" height="900" />
                <span v-else>{{ loc(p.imagePlaceholder) || t('projects.imageSoon') }}</span>
                <span class="pin" aria-hidden="true"></span>
              </div>
            </article>
          </div>
          <router-link to="/projets" class="btn mt-14">{{ t('home.featured.all') }}</router-link>
        </div>
      </section>

      <div class="lanepad container-site">
        <img v-if="site.home.transitions[2]" :src="site.home.transitions[2]" alt="" class="transition-img" loading="lazy" />
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
          <img v-if="site.home.seabed" :src="site.home.seabed" alt="" class="seabed-img" loading="lazy" />
          <div v-else class="transition-ph seabed-ph">{{ t('home.imageSoon') }}</div>
        </div>
        <div class="container-site">
          <div class="bed">
            <svg class="weed" style="left: 44%" viewBox="0 0 40 120" aria-hidden="true"><path d="M20 120 C6 90 32 70 18 40 C10 22 24 10 20 0" /></svg>
            <svg class="weed" style="left: 47%; height: 90px; animation-delay: -2s" viewBox="0 0 40 120" aria-hidden="true"><path d="M20 120 C32 92 8 70 22 44 C30 26 16 12 22 0" /></svg>
            <span class="pebble" style="left: 70%; width: 60px; height: 34px" aria-hidden="true"></span>
            <span class="pebble" style="left: 30%; width: 36px; height: 20px; bottom: 40px" aria-hidden="true"></span>
            <div class="rock r1">
              <h3>{{ t('home.floor.networks') }}</h3>
              <a :href="site.linkedin" target="_blank" rel="noopener">LinkedIn</a>
              <a :href="site.github" target="_blank" rel="noopener">GitHub</a>
              <a :href="'mailto:' + site.email">{{ site.email }}</a>
            </div>
            <div class="rock r2">
              <h3>{{ t('home.floor.address') }}</h3>
              <p>{{ site.location }}</p>
            </div>
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
  --sky: 540px;
  --surface: #2e7fae;
  position: relative;
  overflow: hidden;
}
.nowrap { white-space: nowrap; }
.lanepad { padding-right: calc(var(--lane) + 1.5rem); }

/* chaîne */
.chain { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 2; color: #c9d6e2; }

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
.boat { position: absolute; right: 6%; bottom: -34px; width: min(330px, 38vw); z-index: 3; }

/* mer */
.sea { position: relative; background: linear-gradient(to bottom, var(--surface) 0, #1a5f8a 7%, #0e3f66 22%, #082a4a 45%, #041a33 70%, #020c1c 100%); }
.surface { display: block; width: 100%; height: 46px; margin-top: -45px; position: relative; z-index: 2; }
.surface .w1 { fill: var(--surface); }
.surface .w2 { fill: none; stroke: rgba(255, 255, 255, 0.55); stroke-width: 2; }
.rays { position: absolute; inset: 0 0 auto 0; height: 1300px; pointer-events: none; overflow: hidden; mix-blend-mode: screen; }
.ray { position: absolute; top: -60px; height: 100%; transform-origin: 50% 0; background: linear-gradient(to bottom, rgba(214, 236, 243, 0.42), rgba(214, 236, 243, 0.12) 45%, rgba(214, 236, 243, 0) 85%); filter: blur(10px); }
.bubble { position: absolute; border: 1.5px solid rgba(255, 255, 255, 0.5); border-radius: 50%; }
.fish { position: absolute; fill: #010814; opacity: 0.45; pointer-events: none; z-index: 1; }
.fish.rev { transform: scaleX(-1); }
@media (prefers-reduced-motion: no-preference) {
  .ray { animation: shimmer 7s ease-in-out infinite alternate; }
  .ray:nth-child(2n) { animation-duration: 9s; }
  .ray:nth-child(3n) { animation-delay: -3s; }
  .fish { animation: swim var(--t, 40s) linear infinite; }
  .fish.rev { animation-name: swimr; }
  .weed { transform-origin: 50% 100%; animation: sway 5s ease-in-out infinite alternate; }
}
@keyframes shimmer { from { opacity: 0.55; } to { opacity: 1; } }
@keyframes swim { from { transform: translateX(0); } to { transform: translateX(-120vw); } }
@keyframes swimr { from { transform: translateX(0) scaleX(-1); } to { transform: translateX(120vw) scaleX(-1); } }
@keyframes sway { from { transform: rotate(-4deg); } to { transform: rotate(4deg); } }

.transition-ph { height: clamp(150px, 20vw, 240px); border: 1px solid rgba(230, 238, 246, 0.28); display: grid; place-items: center; font: 600 12px 'IBM Plex Mono', monospace; letter-spacing: 0.08em; color: #a3b4c8; background: rgba(0, 0, 34, 0.18); position: relative; z-index: 2; }
.transition-img { width: 100%; height: clamp(150px, 20vw, 240px); object-fit: cover; position: relative; z-index: 2; }

.sec { position: relative; z-index: 2; padding-block: 80px; }
.label { font: 600 12px 'IBM Plex Mono', monospace; letter-spacing: 0.18em; text-transform: uppercase; color: #a3b4c8; display: flex; align-items: center; gap: 14px; }
.label::after { content: ''; height: 1px; background: rgba(230, 238, 246, 0.28); flex: 1; max-width: 220px; }
h2 { font-size: clamp(28px, 3.8vw, 46px); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 14px; line-height: 1.08; }

.about { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 48px; align-items: start; }
.about dl { margin: 0; border-left: 1px solid rgba(230, 238, 246, 0.28); padding-left: 24px; display: grid; gap: 18px; }
dt { font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #a3b4c8; }
dd { margin: 4px 0 0; font-weight: 500; }

.timeline { margin-top: 48px; display: grid; gap: 96px; }
.stop { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: center; position: relative; }
.stop.r .img { order: -1; }
.img { position: relative; aspect-ratio: 4 / 3; border: 1px solid rgba(230, 238, 246, 0.28); background: rgba(0, 0, 34, 0.25); display: grid; place-items: center; font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.08em; color: #a3b4c8; text-align: center; padding: 10px; }
.img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.pin { position: absolute; bottom: -26px; width: 52px; height: 52px; border-radius: 50%; background: #041a33; border: 1px solid rgba(230, 238, 246, 0.28); display: grid; place-items: center; }
.pin::after { content: ''; width: 14px; height: 14px; border-radius: 50%; background: #ee6a4d; box-shadow: 0 0 0 6px rgba(238, 106, 77, 0.22); }
.stop.l .pin { right: -26px; }
.stop.r .pin { left: -26px; }
.meta { font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #a3b4c8; }
.stop h3 { font-size: clamp(22px, 2.4vw, 30px); font-weight: 600; letter-spacing: 0.03em; margin-top: 8px; }
.tags { margin-top: 12px; font: 500 12.5px 'IBM Plex Mono', monospace; color: #a3b4c8; }
.more { display: inline-block; margin-top: 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #ee6a4d; text-decoration: none; border-bottom: 1px solid currentColor; }
.more:hover { color: #f58a72; }

.seek { display: flex; flex-wrap: wrap; gap: 14px 40px; margin: 32px 0 0; }
.seek dd { font: 600 22px 'Space Grotesk', system-ui, sans-serif; letter-spacing: 0.02em; color: #fff; }

/* fond marin */
.floor { position: relative; z-index: 2; padding-top: 100px; }
.seabed-ph, .seabed-img { height: 120px; margin-bottom: 60px; }
.seabed-img { width: 100%; object-fit: cover; }
.bed { position: relative; height: 260px; }
.sand { position: absolute; left: -100vw; right: -100vw; bottom: 0; height: 90px; background: #0d1b2b; clip-path: polygon(0 40%, 8% 30%, 18% 38%, 30% 26%, 44% 36%, 58% 24%, 70% 34%, 84% 22%, 100% 32%, 100% 100%, 0 100%); }
.rock { position: absolute; bottom: 40px; z-index: 1; color: #e6eef6; background: radial-gradient(120% 90% at 30% 25%, #3a5570 0, #22384d 45%, #14263a 100%); box-shadow: inset -14px -18px 30px rgba(0, 0, 0, 0.45), inset 10px 10px 24px rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; justify-content: center; padding: 26px 34px; }
.rock h3 { font: 600 12px 'IBM Plex Mono', monospace; letter-spacing: 0.18em; text-transform: uppercase; color: #a3b4c8; }
.rock a, .rock p { display: block; margin-top: 6px; font-weight: 500; text-decoration: none; overflow-wrap: anywhere; }
.rock a:hover { color: #ee6a4d; }
.rock.r1 { left: 0; width: min(340px, 48%); height: 210px; border-radius: 46% 54% 38% 44% / 58% 52% 30% 32%; }
.rock.r2 { left: min(380px, 52%); width: min(250px, 40%); height: 150px; border-radius: 52% 48% 40% 42% / 62% 58% 28% 30%; }
.pebble { position: absolute; bottom: 44px; border-radius: 50% 50% 40% 40%; background: #14263a; z-index: 1; }
.weed { position: absolute; bottom: 60px; width: 40px; height: 120px; fill: none; stroke: #1c4a3e; stroke-width: 5; stroke-linecap: round; }
.anchor { position: absolute; right: calc(var(--lane) / 2 - 48px); bottom: 46px; width: 96px; height: 124px; background: none; border: 0; padding: 0; cursor: pointer; color: #c9d6e2; z-index: 3; }
.anchor svg { width: 100%; height: 100%; }
.anchor svg * { fill: none; stroke: currentColor; stroke-width: 7; stroke-linecap: round; }
.anchor:hover { color: #ee6a4d; }
.tip { position: absolute; right: 100%; top: 30%; margin-right: 10px; white-space: nowrap; font: 600 11px 'IBM Plex Mono', monospace; letter-spacing: 0.12em; text-transform: uppercase; color: #a3b4c8; opacity: 0; transition: opacity 0.2s; }
.anchor:hover .tip, .anchor:focus-visible .tip { opacity: 1; }

@media (max-width: 860px) {
  .page { --lane: 56px; --sky: 620px; }
  .lanepad { padding-right: calc(var(--lane) + 1rem); }
  .hero-copy { padding-top: 104px; }
  .about, .stop { grid-template-columns: 1fr; gap: 22px; }
  .stop.r .img { order: 0; }
  .timeline { gap: 64px; }
  .stop .pin, .stop.r .pin { left: auto; right: -14px; bottom: auto; top: -14px; width: 40px; height: 40px; }
  .boat { width: min(230px, 55vw); right: 4%; }
  .rock.r1 { width: 62%; }
  .rock.r2 { left: auto; right: calc(var(--lane) + 30px); width: 44%; bottom: 150px; }
  .bed { height: 340px; }
  .anchor { width: 64px; height: 84px; right: calc(var(--lane) / 2 - 32px); }
}
@media (max-width: 520px) {
  .rock { padding: 18px 20px; }
  .rock.r1 { width: 78%; }
  .rock.r2 { width: 60%; right: var(--lane); bottom: 190px; }
  .bed { height: 400px; }
}
</style>
