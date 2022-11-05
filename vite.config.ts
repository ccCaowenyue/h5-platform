import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// vite.config.js
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@import "@/assets/main.scss";'
        //👆这样写是不行的。因为如果项目中其他的css文件有@forward关键字，就会提示错误
       additionalData: '@use "@/assets/main.scss" as *;'
       //👆这样写是可以的，但是要注意
       //!!!!一定要将其他地方引入该css文件的地方删除，如index.html,否则会提示已经加载该module的错误！！！
      }
    }
  }
})