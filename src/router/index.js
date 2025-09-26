// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import SwitchPlanDashboardView from '../views/SwitchPlanDashboardView.vue'
import ClusterInfoView from '../views/ClusterInfoView.vue' // 导入新视图

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: SwitchPlanDashboardView
    },
    {
      // 添加新路由,网页地址栏访问这个
      path: '/cluster-info',
      name: 'cluster-info',
      component: ClusterInfoView
    },
    // 其他路由...
  ]
})


export default router
