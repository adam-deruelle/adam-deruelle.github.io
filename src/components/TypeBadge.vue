<script setup>
import { useI18n } from 'vue-i18n'
defineProps({ type: { type: String, required: true } })
const { t } = useI18n()
const cls = { pro: 'bg-[#FBE3DC] text-[#8A2E07]', perso: 'bg-[#D7EFEC] text-[#1B6A60]', cours: 'bg-[#FFF0CC] text-[#6B4A00]' }
</script>

<template>
  <span class="rounded-full px-2.5 py-0.5 text-xs font-bold" :class="cls[type]">{{ t('projects.types.' + type) }}</span>
</template>
