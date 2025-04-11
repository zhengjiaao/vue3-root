import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import prismjs from 'vite-plugin-prismjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    prismjs({ // prismjs 自定义主题插件配置
      languages: ['javascript', 'typescript', 'css'],
      plugins: ['line-numbers', 'copy-to-clipboard', 'show-language'],
      theme: 'default', // 内置主题名称，可选，其它：'default', 'okaidia', 'twilight', 'coy-without-shadows', 'coy'
      css: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
