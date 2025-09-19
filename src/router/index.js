import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 1. 导入你刚刚创建的组件
import SwitchList from '../views/SwitchList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // 2. 在这里添加新页面的路由规则
    {
      path: '/switch-list', // 定义访问路径
      name: 'switch-list', // 定义一个名字
      component: SwitchList // 指定使用哪个组件
    }
  ]
})

export default router
