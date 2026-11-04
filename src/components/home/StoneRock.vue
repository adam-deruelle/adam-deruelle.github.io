<script setup>
// Rocher sous-marin, couleur unie (bleu ardoise, éclairé par le haut).
// Le texte est gravé : sillon plus clair, bord haut dans l'ombre, lèvre basse éclairée.
const props = defineProps({
  shape: { type: Number, default: 1 }
})
const radius = {
  1: '46% 54% 38% 44% / 58% 52% 30% 32%',
  2: '52% 48% 40% 42% / 62% 58% 28% 30%'
}
</script>

<template>
  <div class="stone" :style="{ borderRadius: radius[props.shape] }">
    <div class="carved"><slot /></div>
  </div>
</template>

<style scoped>
.stone {
  background: radial-gradient(120% 90% at 30% 25%, #3a5570 0, #22384d 45%, #14263a 100%);
  box-shadow: inset -14px -18px 30px rgba(0, 0, 0, 0.45), inset 10px 10px 24px rgba(255, 255, 255, 0.05);
}
.carved {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 18% 10% 6%;
  font-family: 'Cinzel', 'Times New Roman', serif;
  color: #c9d6e2;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.8), 0 -2px 1px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.12);
}
.carved :deep(h3) { font: 700 clamp(13px, 1.5vw, 17px) 'Cinzel', serif; letter-spacing: 0.22em; color: #c9d6e2; text-transform: uppercase; }
.carved :deep(a), .carved :deep(p) { display: block; margin-top: 2px; line-height: 1.35; font: 700 clamp(11.5px, 1.35vw, 16px) 'Cinzel', serif; letter-spacing: 0.04em; text-decoration: none; overflow-wrap: anywhere; color: #c9d6e2; }
.carved :deep(a:hover) { text-decoration: underline; text-underline-offset: 3px; color: #fff; }
.carved :deep(.sep) { width: 46px; height: 2px; margin: 4px auto 2px; background: #c9d6e2; box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.8); }
</style>
