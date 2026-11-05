<script setup>
// Carte « En ce moment j'écoute ».
// Aucun appel à Spotify au chargement : l'API iFrame n'est chargée qu'au premier clic sur ▶.
// Le lecteur Spotify officiel reste visible une fois chargé (conditions d'utilisation de Spotify).
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'

const { t } = useI18n()
const track = site.nowPlaying
const uri = `spotify:track:${track.spotifyId}`
const openUrl = `https://open.spotify.com/track/${track.spotifyId}`

const state = ref('idle') // idle | loading | ready | error
const playing = ref(false)
const host = ref(null)
let controller = null

// Hauteurs du spectre (fixes, pour un rendu identique à chaque chargement)
const bars = [38, 62, 80, 54, 92, 70, 46, 84, 100, 66, 52, 76, 94, 58, 40, 72, 88, 60, 48, 82, 96, 64, 44, 74, 56, 86, 68, 50, 78, 42]

const label = computed(() =>
  playing.value ? t('nowPlaying.pause', { title: track.title }) : t('nowPlaying.listen', { title: track.title, artist: track.artist })
)

function loadApi() {
  return new Promise((resolve, reject) => {
    if (window.__spotifyIFrameAPI) return resolve(window.__spotifyIFrameAPI)
    window.onSpotifyIframeApiReady = (api) => {
      window.__spotifyIFrameAPI = api
      resolve(api)
    }
    const s = document.createElement('script')
    s.src = 'https://open.spotify.com/embed/iframe-api/v1'
    s.async = true
    s.onerror = () => reject(new Error('spotify'))
    document.head.appendChild(s)
  })
}

async function onClick() {
  if (controller) {
    controller.togglePlay()
    return
  }
  if (state.value === 'loading') return
  state.value = 'loading'
  try {
    const api = await loadApi()
    api.createController(host.value, { uri, width: '100%', height: 80, theme: 'dark' }, (c) => {
      controller = c
      c.addListener('ready', () => {
        state.value = 'ready'
        c.play()
      })
      c.addListener('playback_update', (e) => {
        const d = e.data || {}
        const ended = d.duration > 0 && d.position >= d.duration
        playing.value = d.isPaused === false && !ended
      })
    })
  } catch {
    state.value = 'error'
  }
}

onBeforeUnmount(() => {
  try { controller?.destroy() } catch {}
})
</script>

<template>
  <section class="np" :class="{ playing }" aria-labelledby="np-title">
    <div class="spectrum" aria-hidden="true">
      <span v-for="(h, i) in bars" :key="i" :style="{ '--h': h + '%', '--d': (i % 7) * 0.11 + 's' }"></span>
    </div>

    <div class="row">
      <button type="button" class="play" :aria-label="label" :aria-pressed="playing" :disabled="state === 'loading'" @click="onClick">
        <svg v-if="!playing" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" /></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /></svg>
      </button>
      <div class="meta">
        <p class="kicker"><span aria-hidden="true">🎧 </span>{{ t('nowPlaying.label') }}</p>
        <h3 id="np-title">{{ track.title }}</h3>
        <p class="artist">{{ track.artist }}</p>
      </div>
    </div>

    <!-- le contrôleur Spotify remplace ce bloc par l'iframe du lecteur officiel -->
    <div v-show="state !== 'idle'" class="player">
      <div ref="host"></div>
    </div>
    <p v-if="state === 'error'" class="err">
      {{ t('nowPlaying.error') }} <a :href="openUrl" target="_blank" rel="noopener">{{ t('nowPlaying.open') }}</a>
    </p>
    <p v-else-if="state !== 'idle'" class="note">{{ t('nowPlaying.preview') }}</p>
  </section>
</template>

<style scoped>
.np {
  position: relative;
  z-index: 2;
  border: 1px solid rgba(230, 238, 246, 0.28);
  background: rgba(0, 6, 22, 0.9);
  padding: 22px 24px 20px;
  overflow: hidden;
}
.spectrum { display: flex; align-items: flex-end; gap: 4px; height: 64px; margin-bottom: 18px; }
.spectrum span {
  flex: 1;
  height: var(--h);
  background: linear-gradient(to top, #ee6a4d, #f6a58f);
  border-radius: 2px 2px 0 0;
  opacity: 0.85;
  transform-origin: 50% 100%;
}
@media (prefers-reduced-motion: no-preference) {
  .np.playing .spectrum span { animation: eq 0.9s ease-in-out var(--d) infinite alternate; }
}
@keyframes eq { 0% { transform: scaleY(0.25); } 50% { transform: scaleY(1); } 100% { transform: scaleY(0.55); } }

.row { display: flex; align-items: center; gap: 18px; }
.play {
  flex: none;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 0;
  background: #ee6a4d;
  color: #000022;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}
.play:hover { background: #f58a72; }
.play:active { transform: scale(0.96); }
.play:disabled { opacity: 0.7; cursor: progress; }
.play svg { width: 28px; height: 28px; fill: currentColor; }
.meta { min-width: 0; }
.kicker { font: 600 12px 'IBM Plex Mono', monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #a3b4c8; }
.meta h3 { margin-top: 4px; font-size: clamp(22px, 2.6vw, 30px); font-weight: 600; letter-spacing: 0.04em; color: #fff; overflow-wrap: anywhere; }
.artist { margin-top: 2px; color: #d3dee9; font-weight: 500; }
.player { margin-top: 18px; min-height: 80px; }
.player :deep(iframe) { display: block; width: 100%; border: 0; border-radius: 12px; }
.note, .err { margin-top: 8px; font: 500 12px 'IBM Plex Mono', monospace; color: #a3b4c8; }
.err a { color: #ee6a4d; }

@media (max-width: 520px) {
  .np { padding: 18px 16px 16px; }
  .play { width: 56px; height: 56px; }
}
</style>
