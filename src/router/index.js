import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import SpellbookPage from '../components/SpellbookPage.vue'
import CreateSpellPage from '../components/CreateSpellPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/spellbook/:category?',
    name: 'Spellbook',
    component: SpellbookPage,
    props: route => ({ category: route.params.category, query: route.query.search })
  },
  {
    path: '/spellcreator',
    name: 'Spell Creator',
    component: CreateSpellPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
