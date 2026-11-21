// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://syntax.dev',
  integrations: [
    sitemap({
      filter: (page) => !['/404/', '/404.html'].includes(new URL(page).pathname),
    }),
  ],
});
