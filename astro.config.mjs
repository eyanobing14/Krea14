// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/public/data/portfolio.json']
    }
  },
  vite: {
    plugins: [tailwindcss()]
  }
});