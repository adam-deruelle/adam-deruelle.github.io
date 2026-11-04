<script setup>
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'
import SocialIcon from './SocialIcon.vue'
defineProps({ sand: { type: Boolean, default: false } })
const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer :class="sand ? 'bg-[#0D1B2B]' : 'border-t border-line bg-band'">
    <div class="container-site flex flex-col gap-6 py-8 text-sm text-muted md:flex-row md:items-end md:justify-between">
      <figure class="max-w-md">
        <blockquote class="italic" lang="fr">« {{ t('footer.quote') }} »</blockquote>
        <figcaption class="mt-1">{{ t('footer.quoteAuthor') }}, <cite>{{ t('footer.quoteBook') }}</cite></figcaption>
      </figure>
      <div class="flex flex-col gap-2 md:items-end">
        <div class="flex gap-3">
          <a :href="site.linkedin" target="_blank" rel="noopener" class="hover:text-link" :aria-label="t('social.linkedin')"><SocialIcon name="linkedin" class="h-5 w-5" /></a>
          <a :href="site.github" target="_blank" rel="noopener" class="hover:text-link" :aria-label="t('social.github')"><SocialIcon name="github" class="h-5 w-5" /></a>
        </div>
        <p>© {{ year }} {{ t('footer.rights') }} · {{ t('footer.location') }}</p>
        <router-link to="/competences-but" class="underline-offset-2 hover:text-link hover:underline">{{ t('footer.archive') }}</router-link>
      </div>
    </div>
  </footer>
</template>
