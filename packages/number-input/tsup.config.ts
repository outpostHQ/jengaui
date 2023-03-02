import { defineConfig } from 'tsup';
import { findUpSync } from 'find-up';
import packageJSON from './package.json';

export default defineConfig({
  clean: true,
  format: ['cjs', 'esm'],
  inject: process.env.JSX ? [findUpSync('react-shim.js')!] : undefined,
  treeshake: true,
  minify: true,
  dts: true,
  external: [
    ...Object.keys(packageJSON['dependencies']),
    ...Object.keys(packageJSON['devDependencies']),
    ...Object.keys(packageJSON['peerDependencies']),
  ],
});