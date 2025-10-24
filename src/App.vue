<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <AppLayout>
      <router-view />
    </AppLayout>
  </n-config-provider>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CampMap from '@/components/CampMap.vue'
import BookingForm from '@/components/booking/BookingForm.vue'
import { darkTheme } from 'naive-ui'
import { themeOverrides } from './theme'
import AppLayout from './components/layout/AppLayout.vue'

const siteOptions = ref<Array<{label:string; value:string}>>([])

const form = ref({
  siteNumber: '',
  checkIn: null,
  checkOut: null,
  numPeople: 1,
  pets: false,
  petCount: 0,
  petTypes: '',
  equipmentType: '',
  rvSubtype: '',
  rvNumSlides: 0,
  rvSlideSide: ''
})

function handleSubmit(data:any) {
  console.log('Booking submitted:', data)
  alert('Booking info logged to console for now.')
}
</script>
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
