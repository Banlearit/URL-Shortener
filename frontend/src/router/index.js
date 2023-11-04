import { createRouter, createWebHistory } from 'vue-router'
import Shortener from "@/views/Shortener.vue";
import ShortUrlDisplay from "@/components/ShortUrlDisplay.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shortener',
      component: Shortener
    }
  ]
})

export default router
