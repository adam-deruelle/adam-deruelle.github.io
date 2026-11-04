<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'
import SocialIcon from './SocialIcon.vue'

defineProps({ primary: { type: Boolean, default: true } })
const { locale, t } = useI18n()
// Le CV suit la langue du site (version une colonne).
const href = computed(() => site.cv[locale.value] ?? site.cv.fr)
</script>

<template>
  <a :href="href" target="_blank" rel="noopener" class="btn" :class="{ 'btn-primary': primary }" :aria-label="t('nav.cvLabel')">
    <SocialIcon name="download" class="h-4 w-4" />
    <slot>{{ t('nav.cv') }}</slot>
  </a>
</template>
