<template>
  <n-card>
    <h1>Booking</h1>
    <p>Choose dates and a site to get started.</p>
    <BookingForm />
  </n-card>
</template>
<script setup lang="ts">
  import { NCard } from 'naive-ui'
  import BookingForm from '@/components/booking/BookingForm.vue'
</script>