<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <section class="container-site py-24 text-center">
    <p class="font-display text-6xl font-bold text-hl" aria-hidden="true">404</p>
    <h1 class="mt-4 text-3xl font-bold">{{ t('notFound.title') }}</h1>
    <router-link to="/" class="btn btn-primary mt-8">{{ t('notFound.back') }}</router-link>
  </section>
</template>
