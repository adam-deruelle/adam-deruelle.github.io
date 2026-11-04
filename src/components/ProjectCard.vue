<script setup>
import { useI18n } from 'vue-i18n'
defineProps({ project: { type: Object, required: true } })
const { t, locale } = useI18n()
const loc = (v) => (v && typeof v === 'object' ? v[locale.value] ?? v.fr : v)
const typeClass = { pro: 'bg-[#FBE3DC] text-[#8A2E07]', perso: 'bg-[#D7EFEC] text-[#1B6A60]', cours: 'bg-[#FFF0CC] text-[#6B4A00]' }
</script>

<template>
  <router-link
    :to="'/projets/' + project.slug"
    class="group flex flex-col overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lg"
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
      <span class="self-start rounded-full px-2.5 py-0.5 text-xs font-bold" :class="typeClass[project.type]">{{ t('projects.types.' + project.type) }}</span>
      <h3 class="text-xl font-bold group-hover:text-orange">{{ loc(project.title) }}</h3>
      <p class="text-[15px] text-muted">{{ loc(project.summary) }}</p>
      <ul class="mt-auto flex flex-wrap gap-1.5 pt-2" :aria-label="t('projects.tags')">
        <li v-for="tag in project.tags" :key="loc(tag)" class="rounded bg-mist px-2 py-0.5 text-xs font-medium">{{ loc(tag) }}</li>
      </ul>
    </div>
  </router-link>
</template>
