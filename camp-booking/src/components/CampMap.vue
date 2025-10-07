<script setup>
import { ref, onMounted, watch } from 'vue'

// Props — siteNumber comes from parent (e.g., booking form)
const props = defineProps({
  modelValue: String // enables v-model from parent
})

// Emits — notify parent when site clicked
const emit = defineEmits(['update:modelValue'])

// Local state
const svgEl = ref(null)
import campMapSvg from '@/assets/sitemap_plain.svg?raw'

// Watch for external updates (e.g., parent changes site manually)
watch(
  () => props.modelValue,
  (newSite) => {
    highlightSelectedSite(newSite)
  }
)

// Attach event listeners on mount
onMounted(() => {
  const root = svgEl.value?.querySelector('svg')
  if (!root) return

  // Attach click listeners to all .site elements
  root.querySelectorAll('.site').forEach((el) => {
    const id = el.getAttribute('id')
    if (id) {
      el.style.cursor = 'pointer'
      el.addEventListener('click', () => {
        emit('update:modelValue', id)
        highlightSelectedSite(id)
      })
    }
  })

  // Initial highlight if one is already selected
  if (props.modelValue) highlightSelectedSite(props.modelValue)
})

// Helper: highlight selected site
function highlightSelectedSite(siteId) {
  const root = svgEl.value?.querySelector('svg')
  if (!root) return

  root.querySelectorAll('.site').forEach((el) => {
    el.style.stroke = '#333'
    el.style.strokeWidth = '1px'
    el.style.fillOpacity = '1'
  })

  if (!siteId) return

  const active = root.querySelector(`[id="${siteId}"]`)
  if (active) {
    active.style.stroke = '#00AEEF'
    active.style.strokeWidth = '3px'
    active.style.fillOpacity = '0.8'
  }
}
</script>

<template>
  <div class="camp-map" ref="svgEl" v-html="campMapSvg"></div>
</template>

<style scoped>
.camp-map {
  width: 100%;
  height: 100%;
  max-width: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.camp-map svg {
  width: 100%;
  height: auto;
  max-height: 80vh;
  user-select: none;
  object-fit: contain;
}

.camp-map .site:hover {
  transition: 0.2s ease;
  stroke: #00AEEF;
  stroke-width: 2px;
  fill-opacity: 0.9;
}
</style>
