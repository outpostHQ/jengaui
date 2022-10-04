import { defineConfig } from 'tsup';

export default defineConfig({
  treeshake: true,
  format: ['cjs', 'esm'],
  outExtension({ format }) {
    return { js: `.${format}.js` };
  },
});
