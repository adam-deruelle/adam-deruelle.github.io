import { onBeforeUnmount, ref } from 'vue'

// true si le visiteur a demandé de réduire les animations (réglage de l'appareil), mis à jour en direct.
export function useReducedMotion() {
  const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
  const reduce = ref(mq ? mq.matches : false)
  const onChange = (e) => { reduce.value = e.matches }
  mq?.addEventListener?.('change', onChange)
  onBeforeUnmount(() => mq?.removeEventListener?.('change', onChange))
  return reduce
}
