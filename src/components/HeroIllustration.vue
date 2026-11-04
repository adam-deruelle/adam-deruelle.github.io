<script setup>
// Illustration flat provisoire, couleurs pilotées par le thème (variables --i-* dans styles.css) (automate, bras robotisé, voilier), à harmoniser avec la bannière LinkedIn.
defineProps({ label: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 520 400" role="img" :aria-label="label">
    <rect width="520" height="400" rx="28" style="fill:var(--i-bg)" />
    <circle cx="420" cy="88" r="42" style="fill:var(--i-sun)" />
    <path d="M0 300 Q130 270 260 300 T520 300 V400 H0Z" style="fill:var(--i-water)" opacity=".25" />
    <path d="M0 325 Q130 300 260 325 T520 325 V400 H0Z" style="fill:var(--i-water)" opacity=".45" />
    <!-- voilier -->
    <path d="M380 300 h90 l-14 20 h-62z" style="fill:var(--i-dark)" />
    <path d="M424 296 V180 L470 292Z" style="fill:var(--i-light);stroke:var(--i-dark)" stroke-width="3" />
    <path d="M420 296 V200 L384 292Z" style="fill:var(--i-a)" />
    <!-- automate -->
    <rect x="44" y="120" width="120" height="150" rx="10" style="fill:var(--i-dark)" />
    <rect x="58" y="136" width="92" height="38" rx="4" style="fill:var(--i-water)" />
    <rect x="64" y="144" width="40" height="5" rx="2" style="fill:var(--i-light)" opacity=".8" />
    <rect x="64" y="156" width="60" height="5" rx="2" style="fill:var(--i-light)" opacity=".5" />
    <g style="fill:var(--i-b)"><circle cx="66" cy="196" r="6" /><circle cx="86" cy="196" r="6" /></g>
    <g style="fill:var(--i-a)"><circle cx="106" cy="196" r="6" /><circle cx="126" cy="196" r="6" /></g>
    <g style="fill:var(--i-bg)" opacity=".6">
      <rect x="58" y="216" width="14" height="40" rx="2" /><rect x="78" y="216" width="14" height="40" rx="2" />
      <rect x="98" y="216" width="14" height="40" rx="2" /><rect x="118" y="216" width="14" height="40" rx="2" />
      <rect x="138" y="216" width="14" height="40" rx="2" />
    </g>
    <!-- bras robotisé -->
    <rect x="210" y="262" width="90" height="22" rx="6" style="fill:var(--i-dark)" />
    <rect x="236" y="236" width="38" height="30" rx="6" style="fill:var(--i-a)" />
    <path d="M255 246 L232 160" style="stroke:var(--i-dark)" stroke-width="20" stroke-linecap="round" />
    <path d="M232 160 L318 122" style="stroke:var(--i-a)" stroke-width="16" stroke-linecap="round" />
    <circle cx="255" cy="246" r="12" style="fill:var(--i-b)" /><circle cx="232" cy="160" r="11" style="fill:var(--i-b)" /><circle cx="318" cy="122" r="9" style="fill:var(--i-b)" />
    <path d="M318 122 l20 6 M318 122 l14 18" style="stroke:var(--i-dark)" stroke-width="6" stroke-linecap="round" />
    <path d="M164 180 C190 180 190 230 210 250" style="stroke:var(--i-joint)" stroke-width="3" fill="none" stroke-dasharray="6 6" />
  </svg>
</template>
