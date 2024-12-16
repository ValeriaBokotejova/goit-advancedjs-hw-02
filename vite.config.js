import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  return {
    define: {
      global: {},
    },
    root: 'src',
    base: isDev ? '/' : '/goit-advancedjs-hw-02/',
    build: {
      rollupOptions: {
        input: glob.sync('./src/*.html'),
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});
