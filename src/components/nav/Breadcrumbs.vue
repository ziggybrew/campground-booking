<template>
  <div class="crumb-wrap">
    <n-breadcrumb>
      <n-breadcrumb-item>
        <RouterLink to="/">Home</RouterLink>
      </n-breadcrumb-item>

      <n-breadcrumb-item
        v-for="(c, i) in trail"
        :key="i"
      >
        <RouterLink v-if="i < trail.length - 1" :to="c.to">{{ c.label }}</RouterLink>
        <span v-else aria-current="page">{{ c.label }}</span>
      </n-breadcrumb-item>
    </n-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

type Crumb = { label: string; to: { name?: string; path?: string; params?: any; query?: any } }

const route = useRoute()

// Build crumbs from matched records (works with nested routes too)
const trail = computed<Crumb[]>(() => {
  const matched = route.matched.filter(r => r.path !== '/')
  // Map to label + link; keep params/query so links stay relevant
  return matched.map(r => ({
    label: (r.meta?.breadcrumb as string) || (r.name as string) || r.path.replace('/', ''),
    to: r.name
      ? { name: r.name as string, params: route.params, query: route.query }
      : { path: r.path }
  }))
})
</script>

<style scoped>
.crumb-wrap {
  position: sticky;
  top: 64px;           /* match your navbar height */
  z-index: 40;
  padding: 10px 16px;
  background: linear-gradient(180deg, rgba(19,26,23,.85), rgba(19,26,23,.65));
  border-bottom: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);
}

/* Tweak Naive breadcrumb spacing/colors to fit your theme */
:deep(.n-breadcrumb) {
  color: rgba(233,239,233,.85);
}
:deep(.n-breadcrumb-item__link) {
  color: var(--zw-cream);
  font-weight: 600;
  text-decoration: none;
}
:deep(.n-breadcrumb-item:last-child .n-breadcrumb-item__link),
:deep(.n-breadcrumb-item:last-child .n-breadcrumb-item__separator) {
  color: rgba(233,239,233,.7);
  pointer-events: none;
}
</style>