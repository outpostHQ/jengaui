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
      external: [
        'react',
        'tastycss',
        'tastycss-react',
        '@react-types/shared',
        '@react-types/button',
        '@jenga-ui/core',
        '@jenga-ui/atoms',
      ],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
