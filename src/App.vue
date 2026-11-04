<script setup>
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import ContactModal from './components/ContactModal.vue'

const { t } = useI18n()
const route = useRoute()
const isHome = computed(() => route.name === 'home')
// Titre par défaut ; une fiche projet le remplace par le nom du projet.
watchEffect(() => { route.fullPath; document.title = t('meta.title') })
</script>

<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
     @click.prevent="$refs.main.focus()">{{ t('nav.skip') }}</a>
  <NavBar />
  <main id="main" ref="main" tabindex="-1" :class="['min-h-screen outline-none', isHome ? '' : 'pt-16']">
    <router-view />
  </main>
  <SiteFooter :sand="isHome" />
  <ContactModal />
</template>
