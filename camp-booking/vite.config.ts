import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ customElement: true })],
  build: {
    lib: {
      entry: 'src/main.ce.ts',
      name: 'CampBooking',
      formats: ['es'],
      fileName: () => `camp-booking.js`
    }
  }
})
