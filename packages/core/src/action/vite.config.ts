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
        '@numl-react/core',
        '@numl-react/atoms',
        '@react-aria/button',
        '@react-aria/interactions',
        '@react-aria/utils',
        '@react-spectrum/utils',
        '@react-types/button',
        '@react-types/shared',
      ],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
})
