import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/main.ts'),
      name: 'VuePreviewableImage',
      // the proper extensions will be added
      fileName: 'vue-previewable-image',
    },
    rollupOptions: {
      external: ['vue', 'viewerjs', 'vue-demi'],
      output: {
        globals: {
          vue: 'Vue',
          viewerjs: 'Viewer',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
})
