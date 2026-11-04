<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { site } from '@/data/site'
import { contactOpen, closeContact } from '@/contact'
import SocialIcon from './SocialIcon.vue'

const { t } = useI18n()
const dialog = ref(null)
const copied = ref(false)

// <dialog> natif : gestion du focus et de la touche Échap par le navigateur.
watch(contactOpen, (v) => {
  if (!dialog.value) return
  if (v && !dialog.value.open) dialog.value.showModal()
  if (!v && dialog.value.open) dialog.value.close()
  copied.value = false
})

function onBackdrop(e) { if (e.target === dialog.value) closeContact() }
async function copy() {
  try { await navigator.clipboard.writeText(site.email); copied.value = true } catch {}
}
</script>

<template>
  <dialog
    ref="dialog"
    aria-labelledby="contact-title"
    class="w-[min(92vw,28rem)] rounded-2xl p-0 text-navy shadow-2xl backdrop:bg-navy/50 backdrop:backdrop-blur-sm"
    @close="closeContact"
    @click="onBackdrop"
  >
    <div class="p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <h2 id="contact-title" class="text-2xl font-bold">{{ t('contact.title') }}</h2>
        <button type="button" class="grid h-9 w-9 place-items-center rounded-md hover:bg-mist" :aria-label="t('contact.close')" @click="closeContact">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <p class="mt-2 text-muted">{{ t('contact.intro') }}</p>

      <div class="mt-6 rounded-xl bg-mist p-4">
        <p class="text-xs font-bold uppercase tracking-wider text-muted">{{ t('contact.email') }}</p>
        <a :href="'mailto:' + site.email" class="mt-1 flex items-center gap-2 break-all font-semibold hover:text-orange">
          <SocialIcon name="mail" class="h-5 w-5 shrink-0" />{{ site.email }}
        </a>
        <button type="button" class="mt-3 text-sm font-semibold text-orange hover:underline" @click="copy">
          {{ copied ? t('contact.copied') : t('contact.copy') }}
        </button>
        <span class="sr-only" aria-live="polite">{{ copied ? t('contact.copied') : '' }}</span>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <a :href="site.linkedin" target="_blank" rel="noopener" class="btn"><SocialIcon name="linkedin" class="h-5 w-5" />LinkedIn<span class="sr-only"> ({{ t('social.linkedin') }})</span></a>
        <a :href="site.github" target="_blank" rel="noopener" class="btn"><SocialIcon name="github" class="h-5 w-5" />GitHub<span class="sr-only"> ({{ t('social.github') }})</span></a>
      </div>
    </div>
  </dialog>
</template>
