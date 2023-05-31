import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isBuildLib = () => {
  return process.env.BUILD_TYPE === 'lib'
}

const outDir = isBuildLib() ? 'dist' : 'example'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  build: isBuildLib()
    ? {
        outDir,
        target: 'es2015',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/lib/main.ts'),
          name: 'VuePreviewableImage',
          // the proper extensions will be added
          fileName: 'vue-previewable-image',
          formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
          external: ['vue', 'viewerjs'],
          output: {
            globals: {
              vue: 'Vue',
              viewerjs: 'Viewer',
            },
          },
        },
        copyPublicDir: false,
      }
    : { outDir },
})
