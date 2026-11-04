<script setup>
import { useI18n } from 'vue-i18n'
defineProps({ title: { type: String, required: true } })
const { t } = useI18n()
</script>

<template>
  <section class="container-site py-16">
    <h1 class="text-4xl font-bold">{{ title }}</h1>
    <div class="placeholder mt-8 h-48 rounded-xl">{{ t('wip') }}</div>
  </section>
</template>
