import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  outDir: 'dist',
  bundle: false,
  splitting: false,
  sourcemap: true
})
