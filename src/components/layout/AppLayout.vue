<template>
  <div class="wrap">
    <header class="topbar">
      <router-link to="/" class="brand"><ZwLogo/></router-link>
      <Hamburger :open="open" @toggle="open = !open" />
    </header>

    <n-drawer v-model:show="open" placement="right" width="280" :trap-focus="false">
      <div class="drawer">
        <router-link to="/about" @click="open=false">About Us</router-link>
        <router-link to="/booking" @click="open=false">Booking</router-link>
        <router-link to="/map" @click="open=false">Camp Map (coming soon)</router-link>
        <router-link to="/gallery" @click="open=false">Gallery</router-link>
        <router-link to="/faq" @click="open=false">FAQ</router-link>
        <a href="https://ziggybrew.github.io/campground-booking/" target="_blank" rel="noopener">Live Site</a>
      </div>
    </n-drawer>

    <main class="content">
      <slot/>
    </main>

    <footer class="footer">
      <small>© {{year}} Ziggy’s Woods • Built with Vue & Naive UI</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ZwLogo from '@/components/branding/ZwLogo.vue'
import Hamburger from '@/components/nav/Hamburger.vue'

const open = ref(false)
const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.wrap { min-height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; }
.topbar {
  position: sticky; top: 0; z-index: 5; height: 64px; padding: 0 16px;
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(180deg, rgba(19,26,23,0.95), rgba(19,26,23,0.65));
  backdrop-filter: blur(6px); border-bottom: 1px solid rgba(255,255,255,0.06);
}
.brand { display:flex; align-items:center; gap:.5rem }
.content { padding: 24px; }
.footer {
  padding: 24px; text-align: center; color: rgba(233,239,233,.7);
  border-top: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(0deg, rgba(19,26,23,0.6), transparent);
}
.drawer {
  display: grid; gap: 12px; padding: 16px;
}
.drawer a, .drawer .router-link-active {
  color: var(--zw-cream); font-weight: 600;
}
</style>