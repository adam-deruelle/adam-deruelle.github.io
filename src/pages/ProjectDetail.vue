<script setup>
import { useI18n } from 'vue-i18n'
import WipSection from '@/components/WipSection.vue'
const { t } = useI18n()
</script>

<template>
  <WipSection :title="t('nav.projects')" />
</template>
