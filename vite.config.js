import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})


// // vite.config.js
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       // 字符串简写写法
//       // '/api': 'http://192.168.1.100:8080' // 假设这是你后端的真实地址和端口

//       // 选项写法，更灵活
//       '/api': {
//         target: 'http://后端真实IP地址:端口号', // 替换为您的后端服务地址
//         changeOrigin: true, // 必须设置为true
//         rewrite: (path) => path.replace(/^\/api/, ''), // 如果后端接口不带/api，则需要重写
//       },
//     }
//   }
// })
