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
        <a-menu-item key="login" @click="showLoginModal">
          登录
        </a-menu-item>
        <a-menu-item key="dashboard">
          <router-link to="/dashboard">切换数据列表</router-link>
        </a-menu-item>
        <a-menu-item key="cluster-info">
          <router-link to="/cluster-info">集群信息列表</router-link>
        </a-menu-item>

        <a-menu-item key="rule-input" @click="showRuleInputModal">
          规则输入
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

  <LoginModal
    :open="isLoginModalVisible"
    @ok="handleLoginOk"
    @cancel="handleLoginCancel"
  />
  <RuleInputModal
    :open="isRuleInputModalVisible"
    @ok="handleRuleInputOk"
    @cancel="handleRuleInputCancel"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

// 导入我们刚刚创建的弹窗组件
import LoginModal from './components/LoginModal.vue';
import RuleInputModal from './components/RuleInputModal.vue';

// --- 菜单高亮逻辑 (根据路由变化) ---
const selectedKeys = ref(['dashboard']);
const route = useRoute();

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('/cluster-info')) {
      selectedKeys.value = ['cluster-info'];
    } else if (newPath.includes('/dashboard')) {
      selectedKeys.value = ['dashboard'];
    } else {
      selectedKeys.value = []; // 其他页面或弹窗时不高亮任何菜单
    }
  },
  { immediate: true }
);

// --- 弹窗状态管理 ---
const isLoginModalVisible = ref(false);
const isRuleInputModalVisible = ref(false);

const showLoginModal = () => {
  isLoginModalVisible.value = true;
};
const handleLoginOk = () => {
  isLoginModalVisible.value = false;
  // 在这里可以处理登录成功后的逻辑，比如刷新页面或更新用户信息
};
const handleLoginCancel = () => {
  isLoginModalVisible.value = false;
};

const showRuleInputModal = () => {
  isRuleInputModalVisible.value = true;
};
const handleRuleInputOk = () => {
  isRuleInputModalVisible.value = false;
};
const handleRuleInputCancel = () => {
  isRuleInputModalVisible.value = false;
};
</script>

<style>
/* 添加一个全局样式来实现背景模糊效果 */
.ant-modal-mask {
  /* backdrop-filter 是一个实验性属性，但主流浏览器支持良好 */
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}
</style>

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
  min-height: calc(100vh - 64px - 70px - 48px);
}
</style>
