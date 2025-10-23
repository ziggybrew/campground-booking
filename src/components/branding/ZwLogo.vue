<template>
  <div class="logo" aria-label="Ziggy's Woods logo">
    <svg width="36" height="36" viewBox="0 0 64 64" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3aa06b"/>
          <stop offset="100%" stop-color="#2f855a"/>
        </linearGradient>
      </defs>
      <!-- trees -->
      <path d="M20 46 L32 18 L44 46 Z" fill="url(#g)"/>
      <rect x="30" y="46" width="4" height="10" rx="1" fill="#6b4e3d"/>
      <path d="M10 52 L20 32 L30 52 Z" fill="#276749"/>
      <rect x="18" y="52" width="3" height="6" rx="1" fill="#6b4e3d"/>
      <path d="M34 52 L44 32 L54 52 Z" fill="#276749"/>
      <rect x="42" y="52" width="3" height="6" rx="1" fill="#6b4e3d"/>
      <!-- moon -->
      <circle cx="50" cy="14" r="6" fill="#f3efe6" opacity="0.9"/>
    </svg>
    <span class="word">Ziggy’s Woods</span>
  </div>
</template>

<style scoped>
.logo {
  display: inline-flex; align-items: center; gap: .6rem;
  font-family: var(--zw-font-display); font-weight: 700; letter-spacing: .2px;
  color: var(--zw-cream);
}
.word { font-size: 1.2rem }
</style>