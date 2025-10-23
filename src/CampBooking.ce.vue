<script setup lang="ts">
import { ref } from 'vue'

const site = ref('')
const from = ref('')
const to = ref('')
const status = ref('idle')

function checkAvailability() {
  status.value = 'checking'
  setTimeout(() => {
    status.value = 'available'
  }, 1000)
}
</script>

<template>
  <div class="booking-widget">
    <h3>Book a Campsite</h3>
    <label>Site
      <select v-model="site">
        <option disabled value="">Select a site...</option>
        <option>H1</option>
        <option>H2</option>
        <option>Cabin</option>
      </select>
    </label>

    <label>From <input type="date" v-model="from" /></label>
    <label>To <input type="date" v-model="to" /></label>

    <button :disabled="!site || !from || !to" @click="checkAvailability">Check Availability</button>

    <div v-if="status === 'checking'">Checking...</div>
    <div v-if="status === 'available'">✅ Site available!</div>
  </div>
</template>

<style scoped>
.booking-widget {
  font-family: system-ui, sans-serif;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #ccc;
  max-width: 420px;
}
label {
  display: block;
  margin-bottom: 0.75rem;
}
button {
  background: #0f172a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
