<script setup>
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { getProject, projects } from '@/data/projects'
import { useLoc } from '@/i18n/loc'
import PageHeader from '@/components/PageHeader.vue'
import TypeBadge from '@/components/TypeBadge.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import StoryCards from '@/components/StoryCards.vue'
import BeforeAfter from '@/components/BeforeAfter.vue'

const props = defineProps({ slug: { type: String, required: true } })
const { t } = useI18n()
const loc = useLoc()
const p = computed(() => getProject(props.slug))
const d = computed(() => p.value?.details ?? {})
// Projets précédent / suivant (ordre de projects.js, en boucle)
const neighbours = computed(() => {
  const i = projects.findIndex((x) => x.slug === props.slug)
  if (i < 0) return null
  const n = projects.length
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] }
})
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase()

watchEffect(() => {
  if (p.value) document.title = `${loc(p.value.title)} · Adam Deruelle`
})
</script>

<template>
  <template v-if="p">
    <PageHeader :title="loc(p.title)" :intro="loc(p.summary)">
      <template #before>
        <router-link to="/projets" class="mb-5 inline-flex items-center gap-1 text-sm font-semibold text-link hover:underline">← {{ t('project.back') }}</router-link>
        <div class="mb-3 flex flex-wrap items-center gap-3">
          <TypeBadge :type="p.type" />
          <span v-if="p.context" class="text-sm text-muted">{{ loc(p.context) }}</span>
        </div>
      </template>
      <a v-if="p.github" :href="p.github" target="_blank" rel="noopener" class="btn btn-primary mt-6">
        <SocialIcon name="github" class="h-5 w-5" />{{ t('project.github') }}
      </a>
    </PageHeader>

    <article class="container-site grid gap-12 py-12 lg:grid-cols-[1fr_18rem]">
      <div class="min-w-0 space-y-10">
        <section v-if="d.intro">
          <h2 class="text-2xl font-bold">{{ t('project.context') }}</h2>
          <p class="mt-3 max-w-prose">{{ loc(d.intro) }}</p>
        </section>

        <section v-if="d.role">
          <h2 class="text-2xl font-bold">{{ t('project.role') }}</h2>
          <ul class="mt-3 max-w-prose space-y-2">
            <li v-for="(r, i) in loc(d.role)" :key="i" class="flex gap-3">
              <span class="mt-2 h-2 w-2 shrink-0 rotate-45 bg-hl" aria-hidden="true"></span><span>{{ r }}</span>
            </li>
          </ul>
        </section>

        <section v-if="d.table">
          <div class="overflow-x-auto rounded-xl border border-line">
            <table class="w-full min-w-[28rem] text-left text-sm tabular-nums">
              <caption class="caption-bottom px-4 py-3 text-left text-sm text-muted">{{ loc(d.table.caption) }}</caption>
              <thead class="bg-mist">
                <tr><th v-for="h in loc(d.table.head)" :key="h" scope="col" class="px-4 py-2.5 font-semibold">{{ h }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in d.table.rows" :key="i" class="border-t border-line">
                  <td v-for="(c, j) in row" :key="j" class="px-4 py-2.5" :class="{ 'font-medium': j === 0 }">{{ loc(c) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section v-if="d.results">
          <h2 class="text-2xl font-bold">{{ t('project.results') }}</h2>
          <ul class="mt-3 max-w-prose space-y-2">
            <li v-for="(r, i) in loc(d.results)" :key="i" class="flex gap-3">
              <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true"></span><span>{{ r }}</span>
            </li>
          </ul>
        </section>

        <section v-if="d.gallery?.length || d.compare">
          <h2 class="text-2xl font-bold">{{ t('project.images') }}</h2>
          <BeforeAfter v-if="d.compare" :before="d.compare.before" :after="d.compare.after" class="mt-4 max-w-[560px]" />
          <div v-if="d.gallery?.length" class="mt-4 grid gap-4 sm:grid-cols-2">
            <figure v-for="(g, i) in d.gallery" :key="i" :class="{ 'sm:col-span-2': g.wide }">
              <!-- vidéo : sans piste audio, muette, jamais en lecture automatique -->
              <video
                v-if="g.video"
                :src="g.video"
                :poster="g.poster"
                :aria-label="loc(g.alt)"
                controls
                muted
                playsinline
                preload="none"
                width="960"
                height="540"
                class="aspect-video w-full rounded-xl bg-black"
              ></video>
              <a v-else-if="g.src && g.link" :href="g.src" target="_blank" rel="noopener" class="block rounded-xl" :aria-label="t('project.openImage', { alt: loc(g.alt) })">
                <img
                  :src="g.src"
                  :alt="loc(g.alt)"
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="900"
                  class="w-full rounded-xl transition-opacity hover:opacity-90"
                  :class="[g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]', g.fit === 'contain' ? 'bg-mist object-contain p-4' : 'object-cover']"
                />
              </a>
              <img
                v-else-if="g.src"
                :src="g.src"
                :alt="loc(g.alt)"
                loading="lazy"
                decoding="async"
                width="1200"
                height="900"
                class="w-full rounded-xl"
                :class="[g.wide ? 'h-auto' : g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]', g.fit === 'contain' ? 'bg-mist object-contain p-4' : 'object-cover', { '[image-rendering:pixelated]': g.pixel }]"
              />
              <div v-else class="placeholder aspect-[4/3] w-full rounded-xl px-4 text-center">{{ loc(g.placeholder) }}</div>
              <figcaption v-if="(g.src || g.video) && g.alt" class="mt-2 text-sm text-muted">{{ loc(g.alt) }}<template v-if="g.link"> · {{ t('project.clickToEnlarge') }}</template></figcaption>
            </figure>
          </div>
        </section>

        <StoryCards v-if="d.story?.length" :details="d" />
      </div>

      <aside class="space-y-8 lg:sticky lg:top-24 lg:self-start">
        <section v-if="d.tech">
          <h2 class="text-sm font-bold uppercase tracking-wider text-muted">{{ t('project.tech') }}</h2>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li v-for="(x, i) in d.tech" :key="i" class="rounded-md bg-mist px-2.5 py-1 text-sm font-medium">{{ loc(x) }}</li>
          </ul>
        </section>
        <section v-if="d.credits">
          <h2 class="text-sm font-bold uppercase tracking-wider text-muted">{{ t('project.credits') }}</h2>
          <ul class="mt-3 space-y-3">
            <li v-for="c in d.credits" :key="c.name" class="flex gap-3" :class="c.role ? 'items-start' : 'items-center'">
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist text-xs font-bold text-title" aria-hidden="true">{{ initials(c.name) }}</span>
              <div class="min-w-0 text-sm">
                <p class="font-semibold text-title">{{ c.name }}</p>
                <p v-if="c.role" class="text-muted">{{ loc(c.role) }}</p>
              </div>
            </li>
          </ul>
        </section>
      </aside>
    </article>

    <nav v-if="neighbours" class="container-site pb-16" :aria-label="t('project.otherProjects')">
      <div class="grid gap-4 sm:grid-cols-2">
        <router-link
          v-for="(n, k) in [{ p: neighbours.prev, label: t('project.prev'), cls: '' }, { p: neighbours.next, label: t('project.next'), cls: 'sm:text-right sm:flex-row-reverse' }]"
          :key="k"
          :to="'/projets/' + n.p.slug"
          class="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-primary"
          :class="n.cls"
        >
          <img
            v-if="n.p.image"
            :src="n.p.image"
            alt=""
            loading="lazy"
            class="h-20 w-28 shrink-0 rounded-xl"
            :class="n.p.imageFit === 'contain' ? 'bg-mist object-contain p-1.5' : 'object-cover'"
            :style="n.p.imagePosition ? { objectPosition: n.p.imagePosition } : null"
          />
          <span v-else class="placeholder h-20 w-28 shrink-0 rounded-xl" aria-hidden="true"></span>
          <span class="min-w-0">
            <span class="block font-mono text-xs font-semibold uppercase tracking-wider text-link">{{ n.label }}</span>
            <span class="mt-1 block font-display text-lg font-semibold text-title group-hover:text-link">{{ loc(n.p.title) }}</span>
            <span v-if="n.p.context" class="block text-sm text-muted">{{ loc(n.p.context) }}</span>
          </span>
        </router-link>
      </div>
    </nav>
  </template>

  <section v-else class="container-site py-24 text-center">
    <h1 class="text-3xl font-bold">{{ t('project.notFound') }}</h1>
    <router-link to="/projets" class="btn btn-primary mt-8">{{ t('project.back') }}</router-link>
  </section>
</template>

