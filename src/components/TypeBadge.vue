<script setup>
import { useI18n } from 'vue-i18n'
defineProps({ type: { type: String, required: true } })
const { t } = useI18n()
const cls = { pro: 'bg-pro text-on-pro', perso: 'bg-perso text-on-perso', cours: 'bg-cours text-on-cours' }
</script>

<template>
  <span class="rounded-full px-2.5 py-0.5 text-xs font-bold" :class="cls[type]">{{ t('projects.types.' + type) }}</span>
</template>
