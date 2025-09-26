import { createRouter, createWebHistory } from 'vue-router'
// 导入您刚刚创建的视图组件
import SwitchPlanDashboardView from '../views/SwitchPlanDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ... 您可能还有其他路由，比如 HomeView
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      // 定义这个页面的访问路径，例如 /dashboard
      path: '/dashboard',
      name: 'dashboard',
      // 将路径和您的视图组件关联起来
      component: SwitchPlanDashboardView
    }
  ]
})

export default router
