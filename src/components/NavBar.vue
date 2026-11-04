<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LangSwitch from './LangSwitch.vue'
import ThemeSwitch from './ThemeSwitch.vue'
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
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 border-b border-line bg-page/95 backdrop-blur">
    <nav :aria-label="t('nav.main')" class="container-site flex h-16 items-center gap-2 sm:gap-4">
      <router-link to="/" class="mr-auto flex items-center gap-2 font-display text-xl font-bold">
        <span class="inline-block h-3 w-3 rotate-45 rounded-sm bg-hl" aria-hidden="true"></span>
        Adam Deruelle
      </router-link>

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
        <li>
          <button type="button" class="border-b-2 border-transparent py-1 font-medium transition-colors hover:text-link" @click="contact">
            {{ t('nav.contact') }}
          </button>
        </li>
      </ul>
      <CvButton class="hidden md:inline-flex" />
      <LangSwitch />
      <ThemeSwitch />

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

    <div v-show="open" id="mobile-menu" class="border-t border-line bg-page md:hidden">
      <ul class="container-site flex flex-col gap-1 py-3">
        <li v-for="l in links" :key="l.to">
          <router-link :to="l.to" class="block rounded-md px-2 py-2.5 font-medium hover:bg-mist" :aria-current="isActive(l.to) ? 'page' : undefined">{{ t(l.key) }}</router-link>
        </li>
        <li><button type="button" class="block w-full rounded-md px-2 py-2.5 text-left font-medium hover:bg-mist" @click="contact">{{ t('nav.contact') }}</button></li>
        <li class="pt-2"><CvButton class="w-full" /></li>
      </ul>
    </div>
  </header>
</template>
