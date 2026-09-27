import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three',
              test: /node_modules[\\/]three[\\/]src[\\/]/,
              minSize: 10000,
              maxSize: 400000,
              priority: 10,
            },
            {
              name: 'gsap',
              test: /node_modules[\\/]gsap[\\/]/,
              priority: 10,
            },
          ],
        },
      }
    }
  }
})
