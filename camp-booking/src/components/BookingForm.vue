<script setup>
import { ref } from 'vue'
import { 
  NForm, NFormItem, NInput, NSelect, NDatePicker, 
  NButton, NSpace, NRadioGroup, NRadioButton, 
  NInputNumber, NDivider, NCard
} from 'naive-ui'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({ ...props.modelValue })

// Keep local copy in sync with parent
function updateField(key, value) {
  form.value[key] = value
  emit('update:modelValue', { ...form.value })
}

function handleSubmit() {
  emit('submit', form.value)
}
</script>

<template>
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

      <template v-if="form.pets">
        <n-form-item label="Number of Pets">
          <n-input-number v-model:value="form.petCount" :min="1" />
        </n-form-item>
        <n-form-item label="Pet Types">
          <n-input v-model:value="form.petTypes" placeholder="e.g., 2 dogs, 1 cat" />
        </n-form-item>
      </template>

      <n-divider>Equipment</n-divider>
      <n-form-item label="Equipment Type">
        <n-select 
          v-model:value="form.equipmentType" 
          :options="[
            { label: 'RV', value: 'rv' },
            { label: 'Tent', value: 'tent' },
            { label: 'Other', value: 'other' }
          ]"
          placeholder="Select type"
        />
      </n-form-item>

      <n-form-item v-if="form.equipmentType === 'rv'" label="RV Subtype">
        <n-select 
          v-model:value="form.rvSubtype"
          :options="[
            { label: 'Class A', value: 'classA' },
            { label: 'Class B', value: 'classB' },
            { label: 'Class C', value: 'classC' },
            { label: 'Fifth Wheel', value: 'fifthWheel' },
            { label: 'Travel Trailer', value: 'travelTrailer' },
            { label: 'Other', value: 'other' }
          ]"
          placeholder="Select RV type"
        />
      </n-form-item>

      <n-space justify="end" style="margin-top: 1.25rem;">
        <n-button type="primary" @click="handleSubmit">Submit</n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<style scoped>
.booking-card {
  padding: 1rem;
}
</style>
