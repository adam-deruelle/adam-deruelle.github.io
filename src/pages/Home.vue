<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'
import { featuredProjects } from '@/data/projects'
import { openContact } from '@/contact'
import SocialIcon from '@/components/SocialIcon.vue'
import CvButton from '@/components/CvButton.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import HeroIllustration from '@/components/HeroIllustration.vue'

const { t, tm, rt } = useI18n()
const list = (key) => tm(key).map((m) => (typeof m === 'object' && !m.type ? m : rt(m)))
const facts = () => tm('home.about.facts').map((f) => ({ k: rt(f.k), v: rt(f.v) }))
const about = ref(null)
const scrollDown = () => about.value?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <!-- Plein écran -->
  <section class="relative flex min-h-[calc(100svh-4rem)] items-center py-12">
    <div class="container-site grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
      <div>
        <img v-if="site.photo" :src="site.photo" :alt="t('home.photoAlt')" width="132" height="132" class="h-32 w-32 rounded-full border-4 border-coral object-cover" />
        <div v-else class="placeholder h-32 w-32 rounded-full border-4 border-coral px-3 text-center text-xs">{{ t('home.photoSoon') }}</div>

        <h1 class="mt-6 text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">Adam Deruelle</h1>
        <p class="mt-3 font-display text-2xl font-semibold text-orange sm:text-3xl">{{ t('home.tagline') }}</p>
        <p class="mt-4 max-w-xl text-lg text-muted">
          <template v-for="(s, i) in list('home.subtitle')" :key="i"><span v-if="i"> · </span><span class="whitespace-nowrap">{{ s }}</span></template>
        </p>

        <div class="mt-6 flex gap-3">
          <a :href="site.linkedin" target="_blank" rel="noopener" :aria-label="t('social.linkedin')" class="grid h-11 w-11 place-items-center rounded-full bg-mist transition-colors hover:bg-navy hover:text-white">
            <SocialIcon name="linkedin" class="h-5 w-5" />
          </a>
          <a :href="site.github" target="_blank" rel="noopener" :aria-label="t('social.github')" class="grid h-11 w-11 place-items-center rounded-full bg-mist transition-colors hover:bg-navy hover:text-white">
            <SocialIcon name="github" class="h-5 w-5" />
          </a>
        </div>

        <div class="mt-7 flex flex-wrap gap-3">
          <router-link to="/projets" class="btn btn-primary">{{ t('home.seeProjects') }}</router-link>
          <CvButton :primary="false">{{ t('home.cv') }}</CvButton>
        </div>
      </div>

      <HeroIllustration :label="t('home.illuAlt')" class="mx-auto w-full max-w-xs md:max-w-lg md:justify-self-end" />
    </div>

    <button type="button" class="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center text-xs font-medium hover:text-orange md:flex" :aria-label="t('home.scrollLabel')" @click="scrollDown">
      {{ t('home.discover') }}
      <svg viewBox="0 0 24 24" class="h-7 w-7 motion-safe:animate-bounce" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
    </button>
  </section>

  <!-- À propos -->
  <section ref="about" class="scroll-mt-16 bg-mist py-16 md:py-20">
    <div class="container-site grid gap-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
      <div>
        <p class="text-sm font-bold uppercase tracking-wider text-[#1F756B]">{{ t('home.about.eyebrow') }}</p>
        <h2 class="mt-1 text-3xl font-bold sm:text-4xl">{{ t('home.about.title') }}</h2>
      </div>
      <div class="max-w-prose space-y-3">
        <p>{{ t('home.about.p1') }}</p>
        <p>{{ t('home.about.p2') }}</p>
        <dl class="space-y-2 pt-2">
          <div v-for="f in facts()" :key="f.k" class="flex flex-col sm:flex-row sm:gap-3">
            <dt class="text-sm font-semibold uppercase tracking-wide text-muted sm:w-32 sm:shrink-0">{{ f.k }}</dt>
            <dd>{{ f.v }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <!-- Projets mis en avant -->
  <section class="py-16 md:py-20">
    <div class="container-site">
      <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-sm font-bold uppercase tracking-wider text-[#1F756B]">{{ t('home.featured.eyebrow') }}</p>
          <h2 class="mt-1 text-3xl font-bold sm:text-4xl">{{ t('home.featured.title') }}</h2>
        </div>
        <router-link to="/projets" class="font-semibold text-orange hover:underline">{{ t('home.featured.all') }} →</router-link>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <ProjectCard v-for="p in featuredProjects" :key="p.slug" :project="p" />
      </div>
    </div>
  </section>

  <!-- Je recherche -->
  <section class="bg-navy py-14 text-white">
    <div class="container-site grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
      <div>
        <p class="text-sm font-bold uppercase tracking-wider text-sun">{{ t('home.seek.eyebrow') }}</p>
        <h2 class="mt-1 text-3xl font-bold sm:text-4xl">{{ t('home.seek.title') }}</h2>
        <ul class="mt-5 flex flex-wrap gap-2.5">
          <li v-for="(it, i) in list('home.seek.items')" :key="i" class="rounded-full border border-white/40 px-3 py-1 text-sm">{{ it }}</li>
        </ul>
      </div>
      <button type="button" class="btn justify-self-start border-coral bg-coral text-navy hover:border-white hover:bg-white hover:text-navy md:justify-self-end" @click="openContact">
        <SocialIcon name="mail" class="h-5 w-5" />{{ t('home.seek.cta') }}
      </button>
    </div>
  </section>
</template>
