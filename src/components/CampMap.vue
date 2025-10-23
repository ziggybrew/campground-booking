<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// v-model for selected site
const props = defineProps<{ modelValue?: string | null }>()
const emit = defineEmits<{
  'update:modelValue':[string | null],
  'sites-ready':[Array<{label:string; value:string}>]
}>()

import campMapSvg from '@/assets/sitemap_plain.svg?raw'
const svgEl = ref<HTMLDivElement|null>(null)

watch(() => props.modelValue, (val) => highlight(val || null))

onMounted(() => {
  const svg = svgEl.value?.querySelector('svg')
  if (!svg) return

  // CLICK handlers for selecting sites
  svg.querySelectorAll<SVGGraphicsElement>('.site, rect[id]').forEach(el => {
    const id = el.getAttribute('id')
    if (!id) return
    el.style.cursor = 'pointer'
    el.addEventListener('click', () => {
      emit('update:modelValue', id)
      highlight(id)
    })
  })

  // Extract site list and emit up
  const options = extractSiteOptions(svg)
  emit('sites-ready', options)

  // Initial highlight
  if (props.modelValue) highlight(props.modelValue)
})

function highlight(id: string | null) {
  const svg = svgEl.value?.querySelector('svg')
  if (!svg) return
  svg.querySelectorAll<SVGGraphicsElement>('.site, rect[id]').forEach(el => {
    el.style.stroke = '#333'
    el.style.strokeWidth = '1px'
    el.style.fillOpacity = '1'
  })
  if (!id) return
  const active = svg.querySelector<SVGGraphicsElement>(`[id="${CSS.escape(id)}"]`)
  if (active) {
    active.style.stroke = '#00AEEF'
    active.style.strokeWidth = '3px'
    active.style.fillOpacity = '0.85'
  }
}

// Natural sort: H1, H2, H10 (not H1, H10, H2)
function naturalSort(a:string, b:string) {
  const ax = a.match(/\d+|\D+/g) || [a]
  const bx = b.match(/\d+|\D+/g) || [b]
  const len = Math.max(ax.length, bx.length)
  for (let i=0;i<len;i++){
    const ac = ax[i] ?? ''
    const bc = bx[i] ?? ''
    const an = Number(ac), bn = Number(bc)
    const aNum = !Number.isNaN(an), bNum = !Number.isNaN(bn)
    if (aNum && bNum) { if (an !== bn) return an - bn }
    else if (ac !== bc) return ac.localeCompare(bc)
  }
  return 0
}

// Pull rects, detect modal (width,height), return options
function extractSiteOptions(svg: SVGSVGElement) {
  const rects = Array.from(svg.querySelectorAll('rect[id]')) as SVGRectElement[]
  if (rects.length === 0) return []

  const sizes = new Map<string, {w:number,h:number,count:number}>()
  for (const r of rects) {
    const w = Number(r.getAttribute('width') ?? 'NaN')
    const h = Number(r.getAttribute('height') ?? 'NaN')
    if (Number.isFinite(w) && Number.isFinite(h)) {
      const key = `${w}x${h}`
      const entry = sizes.get(key) || { w, h, count:0 }
      entry.count++
      sizes.set(key, entry)
    }
  }
  // most common size (mode)
  const modal = Array.from(sizes.values()).sort((a,b)=>b.count-a.count)[0]
  if (!modal) return []

  const candidates = rects.filter(r => {
    const w = Number(r.getAttribute('width') ?? 'NaN')
    const h = Number(r.getAttribute('height') ?? 'NaN')
    return Math.abs(w - modal.w) < 0.001 && Math.abs(h - modal.h) < 0.001
  })

  const ids = candidates.map(r => r.id).filter(Boolean)
  ids.sort(naturalSort)
  return ids.map(id => ({ label: id, value: id }))
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
