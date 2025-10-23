import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue({ customElement: true })],
  base: '/camp-booking/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: 'src/main.ce.ts',
      name: 'CampBooking',
      formats: ['es'],
      fileName: () => `camp-booking.js`
    }
  }
})
