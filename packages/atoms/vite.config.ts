import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'NumlReact',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'tastycss', 'tastycss-react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
