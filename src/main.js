// main.js

// --- 第一部分：导入所有需要的模块 ---

// 导入你自己的全局样式文件
import './assets/main.css'

// 导入 Vue 的核心函数
import { createApp } from 'vue'

// 导入根组件
import App from './App.vue'

// 导入路由实例
import router from './router'

// 导入 Ant Design Vue 插件及其样式
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


// --- 第二部分：创建和配置应用实例 ---

// 1. 创建 Vue 应用实例
const app = createApp(App)

// 2. 注册所有插件 (use)
app.use(router) // 让整个应用支持路由功能
app.use(Antd)   // 让整个应用支持 Ant Design Vue 组件

// 3. 挂载应用 (mount)
app.mount('#app')
