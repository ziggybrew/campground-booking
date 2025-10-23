<template>
  <button
    class="hamburger"
    :aria-expanded="open ? 'true' : 'false'"
    aria-label="Open menu"
    @click="$emit('toggle')"
  >
    <span/><span/><span/>
  </button>
</template>

<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ (e:'toggle'): void }>()
</script>

<style scoped>
.hamburger { 
  width: 40px; height: 40px; border: 1px solid rgba(255,255,255,.12);
  border-radius: 50%; background: var(--zw-elev-1); display: grid; place-items: center;
  cursor: pointer; box-shadow: var(--zw-shadow);
}
.hamburger span {
  display: block; width: 18px; height: 2px; background: var(--zw-cream); margin: 3px 0;
  transition: all .2s ease;
}
</style>