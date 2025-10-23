import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import BookingPage from '@/views/BookingPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: LandingPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/booking', name: 'booking', component: BookingPage },
  ],
  scrollBehavior: () => ({ top: 0 })
})
