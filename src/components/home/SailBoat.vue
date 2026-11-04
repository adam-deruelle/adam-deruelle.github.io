<script setup>
// Voilier d'après le modèle fourni : coque blanche à liston marine, espars en bois, voiles crème.
// Le point #bow (étrave) sert de départ à la chaîne de l'ancre.
defineProps({ label: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 330 330" role="img" :aria-label="label">
    <path class="fill-[#F4EEDF] stroke-[#D8CDB4]" stroke-width="1" d="M100 40 L26 238 L104 238 Z" />
    <path class="stroke-[#CFC3A6]" stroke-width="1" d="M88 74 L60 238 M78 104 L44 238" />
    <path class="fill-[#F4EEDF] stroke-[#D8CDB4]" stroke-width="1" d="M112 104 L222 30 L282 244 L118 246 Z" />
    <path class="stroke-[#CFC3A6]" stroke-width="1" d="M136 88 L178 245 M160 72 L210 245 M184 56 L240 244 M206 42 L262 244 M116 150 L250 130 M117 198 L268 186" />
    <rect class="fill-[#C68A4E]" x="107" y="36" width="7" height="230" rx="2" />
    <path class="fill-[#C68A4E]" d="M111 108 L224 26 L228 31 L115 113 Z" />
    <path class="fill-[#9A6534]" d="M104 244 L290 238 L290 244 L104 250 Z" />
    <path class="fill-[#C68A4E]" d="M2 252 L104 240 L104 246 L4 258 Z" />
    <path class="stroke-[#5A4630]" stroke-width="1.2" fill="none" d="M110 38 L2 254 M224 28 L150 6 L110 38 M113 60 L58 34" />
    <path class="fill-[#B97B42]" d="M30 262 L300 252 L296 268 L36 276 Z" />
    <path class="fill-[#FBFBF8]" d="M18 262 C40 262 200 258 312 250 C306 270 292 290 270 296 L84 300 C52 298 30 284 18 262 Z" />
    <path class="fill-[#16264A]" d="M20 266 C60 266 200 262 310 256 L308 262 C200 268 60 272 23 272 Z" />
    <path class="fill-[#16264A]" d="M44 290 C120 294 220 292 286 286 L280 293 L84 300 C66 299 54 296 44 290 Z" />
    <rect class="fill-[#9A6534]" x="180" y="250" width="50" height="6" />
    <circle id="bow" cx="40" cy="282" r="1" fill="none" />
  </svg>
</template>
