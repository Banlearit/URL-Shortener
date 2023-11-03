import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Shortener from "@/views/Shortener.vue";
import ShortUrlDisplay from "@/components/ShortUrlDisplay.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shortener',
      component: Shortener
    },
    {
      path: '/shortUrlDisplay/:shortUrl',
      name: 'ShortUrlDisplay',
      component: ShortUrlDisplay,
      props: true
    }
  ]
})

export default router
