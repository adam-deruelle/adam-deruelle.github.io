import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

// URL en #/… : les liens directs et les rechargements marchent sur GitHub Pages.
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/projets', name: 'projects', component: () => import('@/pages/Projects.vue') },
  { path: '/projets/:slug', name: 'project', component: () => import('@/pages/ProjectDetail.vue'), props: true },
  { path: '/parcours', name: 'path', component: () => import('@/pages/Parcours.vue') },
  { path: '/competences-but', name: 'but', component: () => import('@/pages/CompetencesBut.vue') },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: () => import('@/pages/NotFound.vue') }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0 }
  }
})
