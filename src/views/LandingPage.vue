<template>
  <section class="hero">
    <div class="card">
      <h1>Ziggy’s Woods</h1>
      <p>Find your perfect campsite among whispering pines, stargaze by the fire, and wake to birdsong.</p>
      <div class="cta">
        <router-link to="/booking">
          <n-button type="primary" size="large" strong>Book a Site</n-button>
        </router-link>
        <router-link to="/about">
          <n-button size="large" tertiary>About Us</n-button>
        </router-link>
      </div>
    </div>
  </section>

  <section class="features">
    <n-card size="huge">
      <h2 class="kicker">What you’ll love</h2>
      <ul class="grid">
        <li><strong>Forest & trails</strong><span>Explore miles of dog-friendly paths.</span></li>
        <li><strong>Full-hookup RV sites</strong><span>Electric, water, and sewer options.</span></li>
        <li><strong>Primitive tent sites</strong><span>Cozy, quiet, and close to nature.</span></li>
        <li><strong>Modern amenities</strong><span>Clean restrooms, hot showers, Wi-Fi.</span></li>
      </ul>
    </n-card>
  </section>
</template>

<script setup lang="ts">
import { NCard, NButton } from 'naive-ui'
</script>

<style scoped>
.hero {
  padding: 56px 16px 24px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(1000px 500px at 85% -10%, rgba(124,196,255,0.09), transparent),
    radial-gradient(800px 400px at 10% -20%, rgba(63,133,99,0.20), transparent);
}
.card {
  max-width: 880px;
  background: linear-gradient(180deg, rgba(19,26,23,.85), rgba(19,26,23,.65));
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--zw-radius);
  padding: 32px;
  box-shadow: var(--zw-shadow);
}
h1 {
  margin: 0 0 8px 0;
  font-family: var(--zw-font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.1;
}
p { color: rgba(233,239,233,.85); margin: 0 0 20px 0; }
.cta { display: flex; gap: 12px; flex-wrap: wrap; }

.features { padding: 24px 16px 56px; }
.kicker { margin: 0 0 16px; font-family: var(--zw-font-display) }
.grid {
  list-style: none; padding: 0; margin: 0;
  display: grid; gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.grid li {
  padding: 16px; border: 1px solid rgba(255,255,255,.06);
  border-radius: 12px; background: var(--zw-elev-1);
}
.grid strong { display:block; color: var(--zw-cream) }
.grid span { color: rgba(233,239,233,.8) }
</style>