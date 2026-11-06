<script setup>
// Visuel d'une carte projet : vidéo en boucle (cardVideo), sinon image, sinon cadre « à venir ».
// La vidéo est muette, sans piste audio, et remplacée par son image d'aperçu si l'animation est réduite.
import { useI18n } from 'vue-i18n'
import { useLoc } from '@/i18n/loc'
import { useReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps({ project: { type: Object, required: true }, imgClass: { type: [String, Array, Object], default: '' } })
const { t } = useI18n()
const loc = useLoc()
const reduce = useReducedMotion()
</script>

<template>
  <video
    v-if="project.cardVideo && !reduce"
    :src="project.cardVideo.src"
    :poster="project.cardVideo.poster"
    :aria-label="loc(project.imageAlt)"
    autoplay
    muted
    loop
    playsinline
    preload="metadata"
    disablepictureinpicture
    :class="imgClass"
  ></video>
  <img
    v-else-if="project.cardVideo"
    :src="project.cardVideo.poster"
    :alt="loc(project.imageAlt)"
    loading="lazy"
    decoding="async"
    :class="imgClass"
  />
  <img
    v-else-if="project.image"
    :src="project.image"
    :alt="loc(project.imageAlt)"
    loading="lazy"
    decoding="async"
    width="1200"
    height="900"
    :class="imgClass"
    :style="project.imagePosition ? { objectPosition: project.imagePosition } : null"
  />
  <span v-else>{{ loc(project.imagePlaceholder) || t('projects.imageSoon') }}</span>
</template>
