<script setup>
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
import ContactModal from './components/ContactModal.vue'

const { t } = useI18n()
const route = useRoute()
// Titre par défaut ; une fiche projet le remplace par le nom du projet.
watchEffect(() => { route.fullPath; document.title = t('meta.title') })
</script>

<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
     @click.prevent="$refs.main.focus()">{{ t('nav.skip') }}</a>
  <NavBar />
  <main id="main" ref="main" tabindex="-1" class="min-h-screen pt-16 outline-none">
    <router-view />
  </main>
  <SiteFooter />
  <ContactModal />
</template>
