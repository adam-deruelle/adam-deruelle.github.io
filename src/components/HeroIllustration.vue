<script setup>
// Illustration flat provisoire (automate, bras robotisé, voilier), à harmoniser avec la bannière LinkedIn.
defineProps({ label: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 520 400" role="img" :aria-label="label">
    <rect width="520" height="400" rx="28" fill="#EEF1F5" />
    <circle cx="420" cy="88" r="42" fill="#FFC857" />
    <path d="M0 300 Q130 270 260 300 T520 300 V400 H0Z" fill="#2A9D8F" opacity=".25" />
    <path d="M0 325 Q130 300 260 325 T520 325 V400 H0Z" fill="#2A9D8F" opacity=".45" />
    <!-- voilier -->
    <path d="M380 300 h90 l-14 20 h-62z" fill="#1E3A5F" />
    <path d="M424 296 V180 L470 292Z" fill="#fff" stroke="#1E3A5F" stroke-width="3" />
    <path d="M420 296 V200 L384 292Z" fill="#EE6A4D" />
    <!-- automate -->
    <rect x="44" y="120" width="120" height="150" rx="10" fill="#1E3A5F" />
    <rect x="58" y="136" width="92" height="38" rx="4" fill="#2A9D8F" />
    <rect x="64" y="144" width="40" height="5" rx="2" fill="#fff" opacity=".8" />
    <rect x="64" y="156" width="60" height="5" rx="2" fill="#fff" opacity=".5" />
    <g fill="#FFC857"><circle cx="66" cy="196" r="6" /><circle cx="86" cy="196" r="6" /></g>
    <g fill="#EE6A4D"><circle cx="106" cy="196" r="6" /><circle cx="126" cy="196" r="6" /></g>
    <g fill="#EEF1F5" opacity=".6">
      <rect x="58" y="216" width="14" height="40" rx="2" /><rect x="78" y="216" width="14" height="40" rx="2" />
      <rect x="98" y="216" width="14" height="40" rx="2" /><rect x="118" y="216" width="14" height="40" rx="2" />
      <rect x="138" y="216" width="14" height="40" rx="2" />
    </g>
    <!-- bras robotisé -->
    <rect x="210" y="262" width="90" height="22" rx="6" fill="#1E3A5F" />
    <rect x="236" y="236" width="38" height="30" rx="6" fill="#EE6A4D" />
    <path d="M255 246 L232 160" stroke="#1E3A5F" stroke-width="20" stroke-linecap="round" />
    <path d="M232 160 L318 122" stroke="#EE6A4D" stroke-width="16" stroke-linecap="round" />
    <circle cx="255" cy="246" r="12" fill="#FFC857" /><circle cx="232" cy="160" r="11" fill="#FFC857" /><circle cx="318" cy="122" r="9" fill="#FFC857" />
    <path d="M318 122 l20 6 M318 122 l14 18" stroke="#1E3A5F" stroke-width="6" stroke-linecap="round" />
    <path d="M164 180 C190 180 190 230 210 250" stroke="#B4420B" stroke-width="3" fill="none" stroke-dasharray="6 6" />
  </svg>
</template>
