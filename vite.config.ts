import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: '127.0.0.1',
    host: 'localhost',
    port: 7979
  },
  plugins: [vue()],
  resolve: {
    alias: {
      // 路径别名
      '@': resolve((__dirname), 'src')
    },
    // 使用路径别名时想要省略的后缀名，可以自己 增减
    extensions: ['.js', '.json', '.ts']
  }
})
