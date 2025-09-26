<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo">双中心协同管控</div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link to="/">首页 (Home)</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/about">关于 (About)</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/dashboard">数据列表</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content style="padding: 0 50px">
      <div class="content-wrapper">
        <router-view />
      </div>
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      分布式云数一体化协同管控分系统 ©2025
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

// 根据当前路由路径，自动高亮对应的菜单项
const selectedKeys = ref(['1']);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('/dashboard')) {
      selectedKeys.value = ['3'];
    } else if (newPath.includes('/about')) {
      selectedKeys.value = ['2'];
    } else {
      selectedKeys.value = ['1'];
    }
  },
  { immediate: true } // 立即执行一次，保证刷新页面时也能高亮
);
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.logo {
  float: left;
  width: 180px;
  height: 31px;
  margin: 16px 24px 16px 0;
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.content-wrapper {
  background: #fff;
  padding: 24px;
  min-height: 280px;
  /* 让内容区域有最小高度，避免内容少时页脚飞起 */
  min-height: calc(100vh - 64px - 70px - 48px);
}
</style>
