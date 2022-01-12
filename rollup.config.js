import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: !production,
    format: 'es',
    name: 'deliberative.eu',
    dir: production ? 'dist' : 'public/build',
    manualChunks: (moduleName) => {
      // Every module whose name includes `node_modules` should be in vendor:
      if (moduleName.includes('node_modules')) {
        return 'vendor';
      }
      // Every other module will be in the chunk based on its entry point!
    },
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        typescript: {
          tsconfigFile: './tsconfig.json',
        },
        postcss: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      }),
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({
      output: 'bundle.css',
      mangle: production,
      compress: production,
    }),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production &&
      serve({
        open: true,
        host: 'localhost',
        port: 5000,
        contentBase: 'public',
        verbose: true,
      }),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production &&
      livereload({
        watch: 'public',
        verbose: true,
      }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production &&
      terser({
        compress: production,
        mangle: production,
      }),

    production &&
      html({
        fileName: 'index.html',
        title: 'Deliberative is a blockchain democracy infrastructure provider.',
        meta: [
          {
            charset: 'utf8',
          },
          {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0',
          },
          {
            name: 'description',
            content:
              'We use liquid voting and tokenomics in order to create the infrastructure for resilient, internet-era democracies',
          },
          { name: 'robots', content: 'index,follow' },
          {
            name: 'keywords',
            content:
              'substrate,delib,dlb,democracy,liquid democracy,liquid voting,generalized liquid voting,approval voting,generalized approval voting,deliberative democracy,deliberate,europe,voting,blockchain,blockchain voting,cryptocurrency',
          },
          {
            'http-equiv': 'X-UA-Compatible',
            content: 'ie=edge',
          },
        ],
        attributes: {
          html: {
            lang: 'en',
            // class: 'dark',
          },
        },
      }),
  ],
  watch: {
    clearScreen: false,
  },
};
