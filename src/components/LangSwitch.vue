<script setup>
import { useI18n } from 'vue-i18n'
import { LOCALES, setLocale } from '@/i18n'
const { locale, t } = useI18n()
</script>

<template>
  <div role="group" :aria-label="t('lang.label')" class="flex overflow-hidden rounded-md border border-line text-sm font-semibold">
    <button
      v-for="l in LOCALES"
      :key="l"
      type="button"
      :lang="l"
      :aria-pressed="locale === l"
      :aria-label="t('lang.' + l)"
      class="px-2.5 py-1.5 uppercase transition-colors"
      :class="locale === l ? 'bg-title text-page' : 'text-muted hover:text-link'"
      @click="setLocale(l)"
    >
      {{ l }}
    </button>
  </div>
</template>
