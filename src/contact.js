import { ref } from 'vue'

// État partagé de la modale de contact (ouverte depuis la navbar, l'accueil, etc.)
export const contactOpen = ref(false)
export const openContact = () => { contactOpen.value = true }
export const closeContact = () => { contactOpen.value = false }
