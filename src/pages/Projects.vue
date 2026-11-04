<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { projects, TYPES } from '@/data/projects'
import PageHeader from '@/components/PageHeader.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// Le filtre est gardé dans l'URL (#/projets?type=pro) pour pouvoir partager le lien.
const active = computed(() => (TYPES.includes(route.query.type) ? route.query.type : 'all'))
const filters = ['all', ...TYPES]
const shown = computed(() => (active.value === 'all' ? projects : projects.filter((p) => p.type === active.value)))
const select = (f) => router.replace({ query: f === 'all' ? {} : { type: f } })
</script>

<template>
  <PageHeader :title="t('projects.title')" :intro="t('projects.intro')">
    <div role="group" :aria-label="t('projects.filterLabel')" class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="f in filters"
        :key="f"
        type="button"
        :aria-pressed="active === f"
        class="rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors"
        :class="active === f ? 'border-title bg-title text-page' : 'border-line bg-surface hover:border-primary-hover hover:text-link'"
        @click="select(f)"
      >
        {{ f === 'all' ? t('projects.all') : t('projects.types.' + f) }}
      </button>
    </div>
  </PageHeader>

  <section class="container-site py-10 md:py-14">
    <p class="mb-6 text-sm text-muted" aria-live="polite">{{ t('projects.count', { n: shown.length }, shown.length) }}</p>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="p in shown" :key="p.slug" :project="p" heading-tag="h2" />
    </div>
  </section>
</template>
