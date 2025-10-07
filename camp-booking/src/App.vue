<script setup>
import { ref } from 'vue'

// Example of app-wide reactive state
const currentStep = ref(1)
const totalSteps = 3
</script>

<template>
  <main class="booking-app">
    <header>
      <h1>Campground Booking</h1>
      <p>Reserve your favorite campsite quickly and easily.</p>
    </header>

    <!-- Step content (we'll build this next) -->
    <section class="step-container">
      <div v-if="currentStep === 1">
        <h2>Select Site</h2>
        <p>Site selection UI goes here...</p>
      </div>
      <div v-else-if="currentStep === 2">
        <h2>Select Dates</h2>
        <p>Date picker UI goes here...</p>
      </div>
      <div v-else-if="currentStep === 3">
        <h2>Confirm & Pay</h2>
        <p>Payment instructions (Venmo) go here...</p>
      </div>
    </section>

    <footer class="stepper">
      <button :disabled="currentStep === 1" @click="currentStep--">Back</button>
      <button :disabled="currentStep === totalSteps" @click="currentStep++">Next</button>
    </footer>
  </main>
</template>

<style scoped>
.booking-app {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Inter, sans-serif;
  background: #fff;
  color: #111;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #e5e7eb;
}
header {
  text-align: center;
  margin-bottom: 1.5rem;
}
header h1 {
  margin: 0 0 0.25rem;
  font-weight: 700;
}
header p {
  color: #6b7280;
  font-size: 0.95rem;
}
.step-container {
  min-height: 200px;
  margin-bottom: 1.5rem;
}
footer.stepper {
  display: flex;
  justify-content: space-between;
}
button {
  background: #111827;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
