<script setup>
defineProps({ title: { type: String, required: true }, intro: { type: String, default: '' } })
</script>

<template>
  <header class="bg-mist">
    <div class="container-site py-12 md:py-16">
      <slot name="before" />
      <h1 class="text-4xl font-bold sm:text-5xl">{{ title }}</h1>
      <p v-if="intro" class="mt-3 max-w-2xl text-lg text-muted">{{ intro }}</p>
      <slot />
    </div>
  </header>
</template>
