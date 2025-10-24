<template>
  <header class="topbar">
    <ZwLogo />

    <!-- Button pinned right, always visible -->
    <button
      class="hamburger"
      :aria-expanded="open ? 'true' : 'false'"
      aria-controls="primary-menu"
      :aria-label="open ? 'Close navigation menu' : 'Open navigation menu'"
      @click="$emit('toggle')"
    >
      <!-- Menu icon -->
      <svg v-if="!open" class="ico" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18M3 12h18M3 18h18" />
      </svg>
      <!-- Close icon -->
      <svg v-else class="ico" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6l-12 12" />
      </svg>
    </button>
  </header>
</template>

<script setup lang="ts">
import ZwLogo from '@/components/branding/ZwLogo.vue'
defineProps<{ open: boolean }>()
defineEmits<{ (e:'toggle'): void }>()
</script>

<style scoped>
.topbar {
  position: relative; z-index: 50;
  height: 64px; padding: 0 16px;
  display: flex; align-items: center;
  background: linear-gradient(180deg, rgba(19,26,23,0.95), rgba(19,26,23,0.65));
  border-bottom: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(6px);
}

/* Pin right + center contents precisely */
.hamburger {
  position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
  width: 40px; height: 40px; border-radius: 50%;
  display: grid; place-items: center;       /* perfect centering */
  box-sizing: border-box;
  padding: 0; margin: 0;
  background: #263129;                      /* chip bg */
  color: #fff;                               /* icon color */
  border: none;                              /* remove outline border */
  outline: none;                             /* remove default outline */
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0,0,0,.25);
  -webkit-tap-highlight-color: transparent;
}

/* keyboard-only focus ring (keeps a11y without the default outline) */
.hamburger:focus-visible {
  box-shadow: 0 0 0 3px rgba(124,196,255,.55), 0 6px 18px rgba(0,0,0,.25);
}

/* subtle hover */
.hamburger:hover { filter: brightness(1.05); }

/* SVG icon—center and prevent extra spacing */
.ico {
  display: block;
  width: 20px; height: 20px;
  stroke: currentColor; fill: none;
  stroke-width: 2; stroke-linecap: round; stroke-linejoin: round;
}
</style>