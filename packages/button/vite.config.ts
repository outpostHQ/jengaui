import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'jenga-ui',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'tastycss', '@jenga-ui//utils'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
