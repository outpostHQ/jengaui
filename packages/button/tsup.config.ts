import { defineConfig } from 'tsup';
import { findUpSync } from 'find-up';

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: false,
  clean: true,
  format: ['cjs', 'esm'],
  inject: process.env.JSX ? [findUpSync('react-shim.js')!] : undefined,
  external: ['react'],
  minify: true,
  treeshake: true,
});
