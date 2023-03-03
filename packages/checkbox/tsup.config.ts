import { defineConfig } from 'tsup';
import { findUpSync } from 'find-up';

import packageJSON from './package.json';

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  entry: ['./src/**/*'],
  inject: process.env.JSX ? [findUpSync('react-shim.js')!] : undefined,
  treeshake: true,
  minify: true,
  dts: true,
  legacyOutput: true
});