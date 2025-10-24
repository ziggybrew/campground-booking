<template>
  <div class="wrap">
    <NavBar :open="open" @toggle="open = !open" />

    <n-drawer
      v-model:show="open"
      placement="right"
      width="280"
      :trap-focus="false"
      :block-scroll="true"
    >
      <nav id="primary-menu" class="drawer">
        <RouterLink to="/about" @click="open = false">About Us</RouterLink>
        <RouterLink to="/booking" @click="open = false">Booking</RouterLink>
        <RouterLink to="/map" @click="open = false">Camp Map (coming soon)</RouterLink>
        <RouterLink to="/gallery" @click="open = false">Gallery</RouterLink>
        <RouterLink to="/faq" @click="open = false">FAQ</RouterLink>
        <RouterLink to="/" @click="open = false">Home</RouterLink>
      </nav>
    </n-drawer>

    <main>
      <slot />
    </main>

    <footer class="footer">
      <small>© {{ year }} Ziggy’s Woods • Built with Vue</small>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import NavBar from '@/components/nav/NavBar.vue'
import { NDrawer, NDrawerContent } from 'naive-ui'

const open = ref(false)
const year = computed(() => new Date().getFullYear())
</script>

<style scoped>
.wrap { min-height: 100dvh; display: grid; grid-template-rows: auto 1fr auto; }
.content { padding: 24px; }
.footer {
  padding: 24px; text-align: center; color: rgba(233,239,233,.7);
  border-top: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(0deg, rgba(19,26,23,0.6), transparent);
}
.drawer {
  display: grid; gap: 12px; padding: 16px;
}
.drawer a {
  color: var(--zw-cream);
  font-weight: 600;
  text-decoration: none;
}
.drawer a.router-link-active { text-decoration: underline; }
</style>