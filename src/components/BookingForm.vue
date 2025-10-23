<script setup lang="ts">
  import { ref, watch, computed, h } from 'vue'
  import { 
    NForm, NFormItem, NSelect, NDatePicker, 
    NButton, NSpace, NRadioGroup, NRadioButton, 
    NInputNumber, NDivider, NCard
  } from 'naive-ui'

  const props = defineProps({
    modelValue: Object,
    // optional: if you later pass site options from the map, we’ll use them
    siteOptions: {
      type: Array,
      default: () => []
    }
  })

  const emit = defineEmits(['update:modelValue','submit'])
  const form = ref({ ...props.modelValue })
  watch(() => props.modelValue, v => { form.value = { ...v } }, { deep: true })

  function handleSubmit() { emit('submit', form.value) }

  /* ---------- SITE OPTIONS WITH ICONS ---------- */

  const primitiveSet = new Set(['1','TS','48','50','52','54','56'])

  const allSites = [
    // numbers
    '1','2','4','5','6','7','8','8.5','9','9.5','10','11','12','13','14','15','16',
    '17','18','19','20','22','23','24','25','27','28','29','30','31','33','35','36',
    '37','38','39','41','47','48','49','50','51','52','53','54','56',
    // the heights
    'H1','H2','H3','H4','H5','H6','H7','H8','H9','H10',
    // Tent city
    'T1','T2','T3','T4','T5','T6','T7',
    // extra primitive tag from map
    'TS'
  ]

  // natural sort: H1, H2, H10 etc.
  function naturalSort(a, b) {
    const ax = a.match(/\d+|\D+/g) || [a]
    const bx = b.match(/\d+|\D+/g) || [b]
    const len = Math.max(ax.length, bx.length)
    for (let i = 0; i < len; i++) {
      const ac = ax[i] ?? '', bc = bx[i] ?? ''
      const an = Number(ac), bn = Number(bc)
      const aNum = !Number.isNaN(an), bNum = !Number.isNaN(bn)
      if (aNum && bNum) { if (an !== bn) return an - bn }
      else if (ac !== bc) return ac.localeCompare(bc)
    }
    return 0
  }

  // If props.siteOptions provided later from the map, prefer those.
  // Otherwise build from our list and tag primitive/full.
  const computedSiteOptions = computed(() => {
    const base = (props.siteOptions?.length
      ? props.siteOptions.map(o => o.value ?? o.label)
      : allSites.slice()
    ).sort(naturalSort)

    return base.map(s => ({
      label: s,
      value: s,
      kind: primitiveSet.has(String(s)) ? 'primitive' : 'full'
    }))
  })

  // Custom label renderer with icons
  const renderSiteLabel = (option) => {
    const icons = option.kind === 'full'
      ? ['⚡','💧','🚽']        // electric, water, sewer
      : []                    // primitive: no utilities
    return h(
      'div',
      { class: 'site-opt' },
      [
        h('span', { class: 'site-name' }, option.label),
        ...icons.map(i => h('span', { class: 'site-ico' }, i))
      ]
    )
  }
</script>

<template>
  <n-card title="Book Your Campsite" class="booking-card">
    <n-form :model="form" label-placement="top">
      <n-divider>Trip Information</n-divider>
      <n-form-item label="Site Number *">
        <n-select
          v-model:value="form.siteNumber"
          :options="computedSiteOptions"
          :render-label="renderSiteLabel"
          filterable
          placeholder="Select a site"
        />
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

      <template v-if="form.equipmentType === 'rv'">
  <n-grid
    responsive="screen"
    :x-gap="16"
    :y-gap="8"
    cols="1 s:2 m:3"
    class="rv-grid"
  >
    <n-gi>
      <n-form-item label="RV Subtype">
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
    </n-gi>

    <n-gi>
      <n-form-item label="Number of Slideouts">
        <n-input-number v-model:value="form.rvNumSlides" :min="0" />
      </n-form-item>
    </n-gi>

    <n-gi>
      <n-form-item label="Slideout(s) Location">
        <n-select 
          v-model:value="form.rvSlideSide"
          :options="[
            { label: 'Driver Side', value: 'driver' },
            { label: 'Passenger Side', value: 'passenger' },
            { label: 'Both Sides', value: 'both' }
          ]"
          placeholder="Select location"
        />
      </n-form-item>
    </n-gi>
  </n-grid>
</template>


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

.rv-grid {
  width: 100%;
}

.site-opt {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.site-name {
  font-weight: 600;
  min-width: 2.2ch; /* keeps H10 aligned with single-digit numbers */
}
.site-ico {
  opacity: 0.85;
  font-size: 0.9rem;
  line-height: 1;
}
</style>
