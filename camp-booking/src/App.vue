<script setup>
import { ref } from 'vue'
import { 
  NForm, NFormItem, NInput, NSelect, NDatePicker, 
  NButton, NSpace, NRadioGroup, NRadioButton, NInputNumber, NDivider, NCard
} from 'naive-ui'
import sitemap from '@/assets/sitemap_plain.svg'

// Reactive booking form data
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

// Equipment options
const equipmentOptions = [
  { label: 'RV', value: 'rv' },
  { label: 'Tent', value: 'tent' },
  { label: 'Other', value: 'other' }
]

// RV subtype options
const rvTypes = [
  { label: 'Class A', value: 'classA' },
  { label: 'Class B', value: 'classB' },
  { label: 'Class C', value: 'classC' },
  { label: 'Fifth Wheel', value: 'fifthWheel' },
  { label: 'Travel Trailer', value: 'travelTrailer' },
  { label: 'Other', value: 'other' }
]

// Submit handler (for now just logs)
function handleSubmit () {
  console.log('Booking data:', form.value)
  alert('Booking info logged to console for now.')
}

// Example handler: when you click a site on the map later
function handleSiteClick(siteId) {
  form.value.siteNumber = siteId
}
</script>

<template>
  <div class="booking-wrapper">
    <div class="map-section">
      <!-- Later replace this <img> with inline SVG so each site can be clickable -->
      <img :src="sitemap" alt="Camp Map" class="camp-map" />
    </div>

    <n-card title="Book Your Campsite" class="booking-card">
      <n-form :model="form" label-placement="top">
        <n-form-item label="Site Number *">
          <n-input v-model:value="form.siteNumber" placeholder="e.g., H4" />
        </n-form-item>

        <n-form-item label="Check-in Date *">
          <n-date-picker v-model:value="form.checkIn" type="date" clearable />
        </n-form-item>

        <n-form-item label="Check-out Date *">
          <n-date-picker v-model:value="form.checkOut" type="date" clearable />
        </n-form-item>

        <n-form-item label="Number of People">
          <n-input-number v-model:value="form.numPeople" :min="1" />
        </n-form-item>

        <n-divider>Pets</n-divider>
        <n-form-item label="Bringing Pets?">
          <n-radio-group v-model:value="form.pets">
            <n-radio-button :value="false">No</n-radio-button>
            <n-radio-button :value="true">Yes</n-radio-button>
          </n-radio-group>
        </n-form-item>

        <n-form-item v-if="form.pets" label="Number of Pets">
          <n-input-number v-model:value="form.petCount" :min="1" />
        </n-form-item>

        <n-form-item v-if="form.pets" label="Pet Types">
          <n-input v-model:value="form.petTypes" placeholder="e.g., 2 dogs, 1 cat" />
        </n-form-item>

        <n-divider>Equipment</n-divider>
        <n-form-item label="Equipment Type">
          <n-select 
            v-model:value="form.equipmentType" 
            :options="equipmentOptions" 
            placeholder="Select type" 
          />
        </n-form-item>

        <n-form-item v-if="form.equipmentType === 'rv'" label="RV Subtype">
          <n-select 
            v-model:value="form.rvSubtype" 
            :options="rvTypes" 
            placeholder="Select RV type" 
          />
        </n-form-item>

        <n-space justify="end" style="margin-top: 1.25rem;">
          <n-button type="primary" @click="handleSubmit">Submit</n-button>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<style scoped>
.booking-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}
.map-section {
  display: flex;
  align-items: center;
  justify-content: center;
}
.camp-map {
  width: 100%;
  max-width: 520px;
  border-radius: 10px;
  border: 1px solid #ccc;
}
.booking-card {
  padding: 1rem;
}
@media (max-width: 900px) {
  .booking-wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
