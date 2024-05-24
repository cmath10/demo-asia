import { defineConfig } from 'vite'

import common from './vite.config.common'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  ...common,

  plugins: [
    vueDevTools(),
    vue(),
  ],
})
