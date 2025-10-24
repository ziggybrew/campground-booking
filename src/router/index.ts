import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import AboutPage from '@/views/AboutPage.vue'
import BookingPage from '@/views/BookingPage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',        name: 'home',    component: LandingPage, meta: { breadcrumb: 'Home' } },
    { path: '/about',   name: 'about',   component: AboutPage,   meta: { breadcrumb: 'About Us' } },
    { path: '/booking', name: 'booking', component: BookingPage, meta: { breadcrumb: 'Booking' } },
  ],
  scrollBehavior: () => ({ top: 0 })
})