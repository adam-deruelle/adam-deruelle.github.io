<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LangSwitch from './LangSwitch.vue'
import CvButton from './CvButton.vue'
import { openContact } from '@/contact'

const { t } = useI18n()
const route = useRoute()
const open = ref(false)
watch(() => route.fullPath, () => { open.value = false })

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/projets', key: 'nav.projects' },
  { to: '/parcours', key: 'nav.path' }
]
const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
function contact() { open.value = false; openContact() }

// Sur l'accueil, tant qu'on est dans le ciel, la barre est transparente avec un texte foncé.
const scrollY = ref(0)
const onScroll = () => { scrollY.value = window.scrollY }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const onSky = computed(() => route.name === 'home' && scrollY.value < 380 && !open.value)
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300" :class="onSky ? 'on-sky border-transparent bg-transparent' : 'border-line bg-page/95 backdrop-blur'">
    <nav :aria-label="t('nav.main')" class="container-site flex h-16 items-center gap-2 sm:gap-4">
      <router-link to="/" class="mr-auto font-display text-[15px] font-bold uppercase tracking-[0.14em]">Adam Deruelle</router-link>

      <!-- Bureau -->
      <ul class="hidden items-center gap-6 md:flex">
        <li v-for="l in links" :key="l.to">
          <router-link
            :to="l.to"
            class="border-b-2 py-1 font-medium transition-colors hover:text-link"
            :class="isActive(l.to) ? 'border-hl' : 'border-transparent'"
            :aria-current="isActive(l.to) ? 'page' : undefined"
          >{{ t(l.key) }}</router-link>
        </li>
      </ul>
      <button type="button" class="btn hidden md:inline-flex" @click="contact">{{ t('nav.contact') }}</button>
      <CvButton class="hidden md:inline-flex" />
      <LangSwitch />

      <!-- Mobile -->
      <button
        type="button"
        class="grid h-9 w-9 place-items-center rounded-md border border-line md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? t('nav.closeMenu') : t('nav.openMenu')"
        @click="open = !open"
      >
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path v-if="!open" d="M4 7h16M4 12h16M4 17h16" />
          <path v-else d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </nav>

    <div v-show="open" id="mobile-menu" class="border-t border-line bg-page text-ink md:hidden">
      <ul class="container-site flex flex-col gap-1 py-3">
        <li v-for="l in links" :key="l.to">
          <router-link :to="l.to" class="block rounded-md px-2 py-2.5 font-medium hover:bg-mist" :aria-current="isActive(l.to) ? 'page' : undefined">{{ t(l.key) }}</router-link>
        </li>
        <li class="grid grid-cols-2 gap-2 pt-2">
          <button type="button" class="btn w-full" @click="contact">{{ t('nav.contact') }}</button>
          <CvButton class="w-full" />
        </li>
      </ul>
    </div>
  </header>
</template>
