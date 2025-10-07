<script setup>
import { ref } from 'vue'
import CampMap from '@/components/CampMap.vue'
import BookingForm from '@/components/BookingForm.vue'

const form = ref({
  siteNumber: '',
  checkIn: null,
  checkOut: null,
  numPeople: 1,
  pets: false,
  petCount: 0,
  petTypes: '',
  equipmentType: '',
  rvSubtype: ''
})

function handleSubmit(data) {
  console.log('Booking submitted:', data)
  alert('Booking info logged to console for now.')
}
</script>

<template>
  <div class="booking-wrapper">
    <div class="map-section">
      <camp-map v-model="form.siteNumber" />
    </div>

    <booking-form v-model="form" @submit="handleSubmit" />
  </div>
</template>

<style scoped>
.booking-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 2rem;
  margin: 0 auto;
}
.map-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}
@media (max-width: 900px) {
  .booking-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
