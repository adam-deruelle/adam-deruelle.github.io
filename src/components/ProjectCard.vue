<script setup>
import { useI18n } from 'vue-i18n'
import { useLoc } from '@/i18n/loc'
import TypeBadge from './TypeBadge.vue'
defineProps({ project: { type: Object, required: true }, headingTag: { type: String, default: 'h3' } })
const { t } = useI18n()
const loc = useLoc()
</script>

<template>
  <router-link
    :to="'/projets/' + project.slug"
    class="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition hover:-translate-y-1 hover:shadow-lg"
  >
    <img
      v-if="project.image"
      :src="project.image"
      :alt="loc(project.imageAlt)"
      loading="lazy"
      decoding="async"
      width="1200"
      height="750"
      class="aspect-[16/10] w-full object-cover"
    />
    <div v-else class="placeholder aspect-[16/10] w-full px-4 text-center">
      {{ loc(project.imagePlaceholder) || t('projects.imageSoon') }}
    </div>
    <div class="flex flex-1 flex-col gap-2 p-5">
      <TypeBadge :type="project.type" class="self-start" />
      <component :is="headingTag" class="text-xl font-bold group-hover:text-link">{{ loc(project.title) }}</component>
      <p class="text-[15px] text-muted">{{ loc(project.summary) }}</p>
      <ul class="mt-auto flex flex-wrap gap-1.5 pt-2" :aria-label="t('projects.tags')">
        <li v-for="tag in project.tags" :key="loc(tag)" class="rounded bg-mist px-2 py-0.5 text-xs font-medium">{{ loc(tag) }}</li>
      </ul>
    </div>
  </router-link>
</template>
