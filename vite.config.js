const { resolve } = require('path')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue'

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        testapi: resolve(__dirname, 'testapi.html'),
        test: resolve(__dirname, 'test.html')
      }
    }
  }
})