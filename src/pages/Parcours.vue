<script setup>
import { useI18n } from 'vue-i18n'
import { timeline, skills } from '@/data/parcours'
import { getProject } from '@/data/projects'
import { useLoc } from '@/i18n/loc'
import PageHeader from '@/components/PageHeader.vue'

const { t } = useI18n()
const loc = useLoc()
const dot = { school: 'bg-navy', work: 'bg-coral', cert: 'bg-sun', goal: 'bg-teal' }
</script>

<template>
  <PageHeader :title="t('parcours.title')" :intro="t('parcours.intro')" />

  <section class="container-site py-12 md:py-16" aria-labelledby="timeline-title">
    <h2 id="timeline-title" class="sr-only">{{ t('parcours.timeline') }}</h2>
    <ol class="relative ml-2 border-l-2 border-line">
      <li v-for="(e, i) in timeline" :key="i" class="relative pb-10 pl-8 last:pb-0">
        <span class="absolute -left-[9px] top-1.5 h-4 w-4 rotate-45 rounded-sm ring-4 ring-white" :class="dot[e.kind]" aria-hidden="true"></span>
        <p class="text-sm font-semibold text-muted">
          <span class="uppercase tracking-wider">{{ t('parcours.kinds.' + e.kind) }}</span>
          <template v-if="e.period"> · <span class="tabular-nums">{{ loc(e.period) }}</span></template>
        </p>
        <h3 class="mt-1 text-xl font-bold">{{ loc(e.title) }}</h3>
        <p v-if="e.place" class="text-muted">{{ loc(e.place) }}</p>
        <p v-if="e.placeholder" class="placeholder mt-3 inline-block rounded-lg px-4 py-3">{{ loc(e.placeholder) }}</p>
        <ul v-if="e.points" class="mt-2 list-disc space-y-1 pl-5 marker:text-coral">
          <li v-for="(pt, j) in loc(e.points)" :key="j">{{ pt }}</li>
        </ul>
        <router-link v-if="e.link" :to="e.link" class="mt-2 inline-block text-sm font-semibold text-orange hover:underline">{{ t('parcours.see') }} →</router-link>
      </li>
    </ol>
  </section>

  <section class="bg-mist py-12 md:py-16" aria-labelledby="skills-title">
    <div class="container-site">
      <h2 id="skills-title" class="text-3xl font-bold">{{ t('parcours.skills') }}</h2>
      <p class="mt-2 text-muted">{{ t('parcours.skillsIntro') }}</p>
      <div class="mt-8 grid gap-5 md:grid-cols-2">
        <section v-for="(s, i) in skills" :key="i" class="rounded-xl bg-white p-6">
          <h3 class="text-xl font-bold">{{ loc(s.domain) }}</h3>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li v-for="(it, j) in s.items" :key="j" class="rounded-md bg-mist px-2.5 py-1 text-sm font-medium">{{ loc(it) }}</li>
          </ul>
          <p class="mt-4 text-sm text-muted">
            {{ t('parcours.usedIn') }} :
            <template v-for="(slug, k) in s.projects" :key="slug"><span v-if="k">, </span><router-link :to="'/projets/' + slug" class="font-semibold text-orange hover:underline">{{ loc(getProject(slug)?.title) }}</router-link></template>
          </p>
        </section>
      </div>
    </div>
  </section>
</template>
