<script setup>
// Rocher sous-marin décoratif, couleur unie (bleu ardoise, éclairé par le haut).
const props = defineProps({
  shape: { type: Number, default: 1 }
})
const radius = {
  1: '46% 54% 38% 44% / 58% 52% 30% 32%',
  2: '52% 48% 40% 42% / 62% 58% 28% 30%'
}
</script>

<template>
  <div class="stone" :style="{ borderRadius: radius[props.shape] }"></div>
</template>

<style scoped>
.stone {
  background: radial-gradient(120% 90% at 30% 25%, #3a5570 0, #22384d 45%, #14263a 100%);
  box-shadow: inset -14px -18px 30px rgba(0, 0, 0, 0.45), inset 10px 10px 24px rgba(255, 255, 255, 0.05);
}
</style>
