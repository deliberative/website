import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: true,
      strict: true
    }),
    prerender: {
      entries: [
        '/',
        '/wallet',
        '/wallet/generate',
        '/wallet/restore',
        '/faq',
        '/privacy',
        '/terms',
        '/blog/2023-05-09',
        '/blog/2023-05-09/introducing-deliberative-crypto-package',
        '/blog/2023-05-17',
        '/blog/2023-05-17/reversing-secret-voting-power'
      ]
    }
  }
};

export default config;
