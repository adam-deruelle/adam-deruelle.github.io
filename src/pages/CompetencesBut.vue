<script setup>
import { useI18n } from 'vue-i18n'
import { competencesBut } from '@/data/competencesBut'
import PageHeader from '@/components/PageHeader.vue'
const { t, locale } = useI18n()
</script>

<template>
  <PageHeader :title="t('but.title')" :intro="t('but.intro')">
    <p v-if="locale !== 'fr'" class="mt-2 text-sm text-muted">{{ t('but.onlyFr') }}</p>
  </PageHeader>

  <div class="container-site space-y-12 py-12" lang="fr">
    <section v-for="c in competencesBut" :key="c.code" :aria-labelledby="'c-' + c.code">
      <h2 :id="'c-' + c.code" class="text-2xl font-bold"><span class="text-orange">{{ c.code }}</span> · {{ c.title }}</h2>
      <ul class="mt-5 space-y-4">
        <li v-for="(it, i) in c.items" :key="i" class="rounded-xl border border-line p-5">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <h3 class="font-sans text-base font-semibold">{{ it.skill }}</h3>
            <span class="flex shrink-0 gap-1" role="img" :aria-label="t('but.level', { n: it.level })" :lang="locale">
              <span v-for="n in 5" :key="n" class="h-3 w-3 rounded-full" :class="n <= it.level ? 'bg-coral' : 'border border-line bg-mist'"></span>
            </span>
          </div>
          <p class="mt-2 text-muted">{{ it.text }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
