import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      fix: true
      // include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  base: './',
  resolve: {
    alias: { '@/': `${path.resolve(__dirname, 'src')}/` }
  }
})
