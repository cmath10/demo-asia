import {
  dirname,
  resolve,
} from 'node:path'

import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  plugins: [
    vueDevTools(),
    vue(),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
