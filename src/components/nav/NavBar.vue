<script setup lang="ts">
import ZwLogo from '@/components/branding/ZwLogo.vue'
defineProps<{ open: boolean }>()
defineEmits<{ (e:'toggle'): void }>()
</script>

<template>
  <header class="topbar">
    <ZwLogo />
    <button
      class="hamburger"
      :aria-expanded="open ? 'true' : 'false'"
      aria-controls="primary-menu"
      aria-label="Open navigation menu"
      @click="$emit('toggle')"
    >
      <span/><span/><span/>
    </button>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky; top: 0; z-index: 50; height: 64px; padding: 0 16px;
  display: flex; align-items: center; justify-content: space-between;
  background: linear-gradient(180deg, rgba(19,26,23,0.95), rgba(19,26,23,0.65));
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.hamburger {
  color: var(--zw-cream);             /* sets “currentColor” */
  width: 40px; height: 40px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.18);
  background: var(--zw-elev-1);
  display: grid; place-items: center; cursor: pointer;
  box-shadow: var(--zw-shadow);
}

.hamburger span {
  display: block; width: 18px; height: 2px; background: currentColor; /* visible bars */
  margin: 3px 0; transition: opacity .15s ease, transform .15s ease;
}

.hamburger:hover { border-color: rgba(255,255,255,.35); }
</style>